/* ============================================
   KURUKSHETRA V3.1 — App Controller (40 features)
   ============================================ */

const App = {
  state: null,
  _subject: null,
  _chapter: null,
  _tab: 'notes',
  _mq: null,

  init() {
    this.state = Storage.load();
    window.appState = this.state;
    this.applyTheme();
    this.applyFont();
    this.applyAccent();

    // Header
    K.el('logoBtn')?.addEventListener('click', () => this.goHome());
    K.el('homeBtn')?.addEventListener('click', () => this.goHome());
    K.el('bookmarksBtn')?.addEventListener('click', () => this.showBookmarks());
    K.el('settingsBtn')?.addEventListener('click', () => this.showSettings());
    K.el('themeToggle')?.addEventListener('click', () => this.cycleTheme());
    K.el('menuBtn')?.addEventListener('click', () => this.toggleSidebar(true));
    K.el('sidebarClose')?.addEventListener('click', () => this.toggleSidebar(false));
    K.el('fontDown')?.addEventListener('click', () => this.nudgeFont(-1));
    K.el('fontReset')?.addEventListener('click', () => this.setFontSize('medium'));
    K.el('fontUp')?.addEventListener('click', () => this.nudgeFont(1));

    // Nav hub buttons
    document.querySelectorAll('[data-nav]').forEach(b => {
      b.addEventListener('click', () => this.navigate(b.dataset.nav));
    });

    FileViewer.init?.();
    VideoPlayer.init?.();
    Search.init?.(this.state);
    Shortcuts.init?.();

    this._mq = window.matchMedia('(prefers-color-scheme: dark)');
    this._mq.addEventListener?.('change', () => {
      if (this.state.settings.theme === 'auto') this.applyTheme();
    });

    this._buildSidebar();
    this._maybeBackupReminder();
    this.render();
  },

  navigate(id) {
    const map = {
      home: () => this.goHome(),
      formulas: () => this.showFormulas(),
      textbooks: () => this.showTextbooks(),
      papers: () => this.showPapers(),
      mistakes: () => this.showMistakes(),
      rapid: () => this.showRapid(),
      analytics: () => this.showAnalytics(),
      plans: () => this.showPlans(),
      myformulas: () => this.showMyFormulas(),
      bookmarks: () => this.showBookmarks(),
      settings: () => this.showSettings(),
      resourceHealth: () => this.showResourceHealth()
    };
    (map[id] || map.home)();
    this.toggleSidebar(false);
  },

  applyTheme() {
    let theme = this.state?.settings?.theme || 'dark';
    document.body.classList.remove('theme-dark', 'theme-light', 'theme-sepia');
    if (theme === 'auto') {
      theme = this._mq?.matches ? 'dark' : 'light';
    }
    if (theme === 'sepia') document.body.classList.add('theme-sepia');
    else document.body.classList.add(theme === 'light' ? 'theme-light' : 'theme-dark');
  },

  applyFont() {
    const size = this.state?.settings?.fontSize || 'medium';
    document.body.classList.remove('font-small', 'font-medium', 'font-large');
    document.body.classList.add('font-' + size);
  },

  applyAccent() {
    const c = this.state?.settings?.accent || '#6366f1';
    document.documentElement.style.setProperty('--accent-1', c);
    // derive a soft gradient end
    document.documentElement.style.setProperty('--accent-grad', `linear-gradient(135deg, ${c}, #a855f7, #ec4899)`);
  },

  setTheme(theme) {
    this.state.settings.theme = theme;
    this.applyTheme();
    Storage.save(this.state);
  },

  cycleTheme() {
    const order = ['dark', 'light', 'sepia', 'auto'];
    const cur = this.state.settings.theme || 'dark';
    const next = order[(order.indexOf(cur) + 1) % order.length];
    this.setTheme(next);
    K.toast('Theme: ' + next);
  },

  setFontSize(size) {
    this.state.settings.fontSize = size;
    this.applyFont();
    Storage.save(this.state);
  },

  nudgeFont(dir) {
    const order = ['small', 'medium', 'large'];
    const i = Math.max(0, Math.min(2, order.indexOf(this.state.settings.fontSize || 'medium') + dir));
    this.setFontSize(order[i]);
  },

  setAccent(color) {
    this.state.settings.accent = color;
    this.applyAccent();
    Storage.save(this.state);
  },

  showView(id) {
    Tracker.stop();
    K.showView(id);
    this._highlightNav(id);
  },

  _highlightNav(id) {
    document.querySelectorAll('[data-nav]').forEach(b => {
      b.classList.toggle('active', b.dataset.nav === id || (id === 'home' && b.dataset.nav === 'home'));
    });
  },

  goHome() {
    this.showView('home');
    this.render();
  },

  showBookmarks() {
    this.showView('bookmarks');
    Bookmarks.render(K.el('view-bookmarks'));
  },

  showSettings() {
    this.showView('settings');
    this.renderSettings();
  },

  showFormulas() {
    this.showView('formulas');
    FormulaLibrary.render(K.el('view-formulas'));
  },

  showMyFormulas() {
    this.showView('my-formulas');
    FormulaLibrary.renderMyFormulas(K.el('view-my-formulas'));
  },

  showTextbooks() {
    this.showView('textbooks');
    Textbooks.render(K.el('view-textbooks'));
  },

  showPapers() {
    this.showView('papers');
    Papers.render(K.el('view-papers'));
  },

  showMistakes() {
    this.showView('mistakes');
    Mistakes.render(K.el('view-mistakes'));
  },

  showRapid() {
    this.showView('rapid');
    RapidFire.render(K.el('view-rapid'));
  },

  showAnalytics() {
    this.showView('analytics');
    Analytics.render(K.el('view-analytics'));
  },

  showPlans() {
    this.showView('plans');
    Plans.render(K.el('view-plans'));
  },

  showResourceHealth() {
    this.showView('resource-health');
    const view = K.el('view-resource-health');
    if (!view) return;
    const esc = s => String(s ?? '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));
    const videos = Object.entries(window.BEST_VIDEOS || {}).flatMap(([subject, chapters]) =>
      Object.entries(chapters || {}).map(([chapterId, v]) => ({
        url: `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${v.videoId}&format=json`,
        openUrl: `https://www.youtube.com/watch?v=${v.videoId}`,
        name: v.title,
        type: 'video',
        subject,
        chapterId
      }))
    );
    const resources = Object.entries(window.BEST_RESOURCES || {}).flatMap(([subject, chapters]) =>
      Object.entries(chapters || {}).flatMap(([chapterId, arr]) => (arr || []).map(r => ({
        url: r.url,
        openUrl: r.url,
        name: r.name,
        type: r.type || 'web',
        subject,
        chapterId
      })))
    );
    const all = [...videos, ...resources];
    view.innerHTML = `
      <div class="view-pad">
        <button class="btn-back" id="healthBack">← Settings</button>
        <h1>🩺 Resource health</h1>
        <p class="muted">Checks YouTube oEmbed normally. Web resources are checked with browser fetch; some sites block CORS, so “Open directly” is still the source of truth.</p>
        <div class="health-summary">
          <span class="chip chip-blue">Total: ${all.length}</span>
          <span class="chip chip-green" id="healthOk">OK: 0</span>
          <span class="chip chip-red" id="healthBad">Broken: 0</span>
          <span class="chip" id="healthPending">Pending: ${all.length}</span>
        </div>
        <div class="toolbar-row">
          <button class="btn btn-primary" id="runHealth">Run check</button>
          <button class="btn" id="openCheckerDoc">CLI: node tools/check-urls.js</button>
        </div>
        <div class="health-table-wrap glass-card">
          <table class="health-table">
            <thead><tr><th>Status</th><th>Name</th><th>Type</th><th>URL</th><th>Action</th></tr></thead>
            <tbody>${all.map((item, i) => `
              <tr data-i="${i}">
                <td><span class="health-dot" id="hStatus${i}">Pending</span></td>
                <td>${esc(item.name)}<br><small class="muted">${esc(item.subject)} / ${esc(item.chapterId)}</small></td>
                <td>${esc(item.type)}</td>
                <td class="health-url">${esc(item.openUrl)}</td>
                <td><a class="btn btn-sm" href="${esc(item.openUrl)}" target="_blank" rel="noopener">Open ↗</a></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
    K.el('healthBack').onclick = () => this.showSettings();
    K.el('openCheckerDoc').onclick = () => K.toast('Run in repo: node tools/check-urls.js', 4500);
    const setStatus = (i, label, cls) => {
      const node = K.el('hStatus' + i);
      if (!node) return;
      node.className = 'health-dot ' + cls;
      node.textContent = label;
      const ok = document.querySelectorAll('.health-dot.ok').length;
      const bad = document.querySelectorAll('.health-dot.bad').length;
      const pending = all.length - ok - bad - document.querySelectorAll('.health-dot.warn').length;
      K.el('healthOk').textContent = 'OK: ' + ok;
      K.el('healthBad').textContent = 'Broken: ' + bad;
      K.el('healthPending').textContent = 'Pending: ' + Math.max(0, pending);
    };
    const check = (item, i) => {
      setStatus(i, 'Checking…', '');
      const isVideo = item.type === 'video';
      const url = item.url;
      const timer = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 7000));
      const req = isVideo
        ? fetch(url).then(r => { if (!r.ok) throw new Error(String(r.status)); return r; })
        : fetch(item.openUrl, { method: 'HEAD', mode: 'no-cors', cache: 'no-store' });
      return Promise.race([req, timer])
        .then(() => setStatus(i, isVideo ? 'OK' : 'Reachable', 'ok'))
        .catch(() => {
          if (isVideo) setStatus(i, 'Broken', 'bad');
          else setStatus(i, 'Open directly', 'warn');
        });
    };
    K.el('runHealth').onclick = async () => {
      for (let i = 0; i < all.length; i += 6) {
        await Promise.all(all.slice(i, i + 6).map((item, offset) => check(item, i + offset)));
      }
      K.toast('Resource health check complete');
    };
  },

  toggleSidebar(force) {
    const sb = K.el('sidebar');
    if (!sb) return;
    const open = force ?? !sb.classList.contains('open');
    sb.classList.toggle('open', open);
    document.body.classList.toggle('sidebar-open', open);
  },

  _buildSidebar() {
    const tree = K.el('sidebarTree');
    if (!tree) return;
    tree.innerHTML = ['physics', 'chemistry', 'maths'].map(subj => {
      const chs = SYLLABUS[subj]?.chapters || [];
      return `<details class="sb-subject" open>
        <summary>${K.subjEmoji(subj)} ${K.subjName(subj)}</summary>
        <div class="sb-chapters">${chs.map(ch =>
          `<button class="sb-ch" data-s="${subj}" data-c="${ch.id}">${ch.name}</button>`
        ).join('')}</div>
      </details>`;
    }).join('');
    tree.querySelectorAll('.sb-ch').forEach(b => {
      b.onclick = () => {
        this.openChapter(b.dataset.s, b.dataset.c);
        this.toggleSidebar(false);
      };
    });
  },

  render() {
    this._renderHero();
    this._renderResume();
    this._renderFOTD();
    this._renderFormulaCounts();
    this._renderSRS();
    this._renderRecommend();
    this._renderSubjects();
    this._renderRecent();
    this._renderWeekStrip();
  },

  _renderHero() {
    const hero = K.el('homeHero');
    if (!hero) return;
    const streak = this.state.studyStreak?.current || 0;
    hero.innerHTML = `
      <div class="hero-orb"></div>
      <h1 class="hero-title">Kurukshetra Study</h1>
      <p class="hero-sub">Pure glassmorphism study hub for <b>JEE 2028</b> — 40 chapters × 9 resource tabs + smart tools.</p>
      <div class="hero-stats">
        <span>40 Chapters</span><span>${(window.FORMULA_LIBRARY || []).length} Formulas</span>
        <span>🔥 ${streak}-day streak</span><span>🧠 ${SRS.countDue(this.state)} due</span>
      </div>
      <div class="hero-actions">
        <button class="btn btn-primary" id="btnWhatStudy">🎯 What should I study today?</button>
        <button class="btn" id="btnRapidHome">⚡ Rapid Fire</button>
        <button class="btn" id="btnFormulasHome">📐 Formula Library</button>
      </div>`;
    K.el('btnWhatStudy')?.addEventListener('click', () => this.recommendToday(true));
    K.el('btnRapidHome')?.addEventListener('click', () => this.showRapid());
    K.el('btnFormulasHome')?.addEventListener('click', () => this.showFormulas());
  },

  _renderResume() {
    const box = K.el('resumeCard');
    if (!box) return;
    const r = this.state.lastResume;
    if (!r?.subject || !r?.chapterId) { box.innerHTML = ''; return; }
    const ch = SYLLABUS[r.subject]?.chapters?.find(c => c.id === r.chapterId);
    const p = this.state.progress?.[r.subject]?.[r.chapterId] || {};
    const sections = ['notesViewed', 'mindMapViewed', 'cheatSheetViewed', 'summaryViewed', 'videoWatched'].filter(k => p[k]).length;
    box.innerHTML = `<div class="resume-card glass-card" id="resumeClick">
      <div class="resume-kicker">Continue where you left off</div>
      <h2>${K.subjEmoji(r.subject)} ${ch?.name || r.chapterId}</h2>
      <p class="muted">${(r.tab || 'notes')} tab · ${sections * 20}% sections · ${K.relativeDays(r.at || p.lastVisited)}</p>
      <button class="btn btn-primary">Resume →</button>
    </div>`;
    K.el('resumeClick').onclick = () => this.openChapter(r.subject, r.chapterId, r.tab || 'notes');
  },

  _renderFOTD() {
    const box = K.el('fotdCard');
    if (!box) return;
    const f = FormulaLibrary.formulaOfDay();
    if (!f) { box.innerHTML = ''; return; }
    box.innerHTML = `<div class="fotd glass-card" id="fotdClick">
      <div class="resume-kicker">📐 Formula of the Day</div>
      <div class="cheat-name">${f.name}</div>
      <div class="cheat-formula">${f.formula}</div>
      <p class="muted">${K.subjEmoji(f.subject)} ${f.chapterName} · click for cheat sheet</p>
    </div>`;
    K.el('fotdClick').onclick = () => this.openChapter(f.subject, f.chapterId, 'cheatsheet');
  },

  _renderFormulaCounts() {
    const box = K.el('formulaCounts');
    if (!box) return;
    const c = FormulaLibrary.counts(this.state);
    box.innerHTML = `<div class="formula-stats-row home-counts">
      <button class="chip chip-btn" data-nav-f="physics">⚛️ Physics: ${c.total.physics} · ★ ${c.starred.physics || 0}</button>
      <button class="chip chip-btn" data-nav-f="chemistry">🧪 Chemistry: ${c.total.chemistry} · ★ ${c.starred.chemistry || 0}</button>
      <button class="chip chip-btn" data-nav-f="maths">📐 Maths: ${c.total.maths} · ★ ${c.starred.maths || 0}</button>
      <button class="chip chip-btn chip-purple" id="openLib">Open library →</button>
    </div>`;
    K.el('openLib')?.addEventListener('click', () => this.showFormulas());
    box.querySelectorAll('[data-nav-f]').forEach(b => b.onclick = () => this.showFormulas());
  },

  _renderSRS() {
    const box = K.el('srsCard');
    if (!box) return;
    const n = SRS.countDue(this.state);
    box.innerHTML = `<div class="glass-card srs-card">
      <div class="resume-kicker">🧠 Spaced Repetition</div>
      <h2>Review Queue: ${n} question${n === 1 ? '' : 's'} due today</h2>
      <p class="muted">Intervals: 1d → 3d → 7d → 14d → 30d</p>
      <button class="btn btn-primary" id="srsStart" ${n ? '' : 'disabled'}>Start review</button>
    </div>`;
    K.el('srsStart')?.addEventListener('click', () => {
      const due = SRS.dueToday(this.state)[0];
      if (due?.subject && due?.chapterId) this.openChapter(due.subject, due.chapterId, 'pyqs');
      else this.showRapid();
    });
  },

  _renderRecommend() {
    const box = K.el('recommendCard');
    if (!box) return;
    const rec = this.recommendToday(false);
    if (!rec) { box.innerHTML = ''; return; }
    const ch = SYLLABUS[rec.subject]?.chapters?.find(c => c.id === rec.chapterId);
    box.innerHTML = `<div class="glass-card">
      <div class="resume-kicker">🎯 Suggested for today</div>
      <h2>${K.subjEmoji(rec.subject)} ${ch?.name || rec.chapterId}</h2>
      <p class="muted">${rec.reason}</p>
      <button class="btn btn-primary" id="recOpen">Study now →</button>
    </div>`;
    K.el('recOpen').onclick = () => this.openChapter(rec.subject, rec.chapterId);
  },

  recommendToday(open) {
    const scored = [];
    ['physics', 'chemistry', 'maths'].forEach(subj => {
      (SYLLABUS[subj]?.chapters || []).forEach(ch => {
        const p = this.state.progress?.[subj]?.[ch.id] || {};
        const conf = p.confidence ?? 3;
        const att = p.pyqsAttempted || 0;
        const acc = att ? (p.pyqsCorrect || 0) / att : 0.4;
        const age = p.lastVisited ? K.daysBetween(String(p.lastVisited).slice(0, 10), K.todayKey()) : 60;
        const dueBoost = SRS.dueToday(this.state).some(d => d.chapterId === ch.id) ? 5 : 0;
        const score = (5 - conf) * 2 + (1 - acc) * 3 + Math.min(age, 45) / 8 + dueBoost + (ch.weight || 1) * 0.2;
        scored.push({
          subject: subj, chapterId: ch.id, score,
          reason: dueBoost ? 'Has SRS reviews due' :
            age > 14 ? `Last studied ${K.relativeDays(p.lastVisited)}` :
              conf <= 2 ? 'Low confidence' :
                acc < 0.5 && att ? 'Low accuracy' : 'High weight / needs coverage'
        });
      });
    });
    scored.sort((a, b) => b.score - a.score);
    const top = scored[0];
    if (open && top) this.openChapter(top.subject, top.chapterId);
    return top;
  },

  _renderWeekStrip() {
    const box = K.el('weekStrip');
    if (!box) return;
    const week = Tracker.weekSeconds(this.state);
    const heat = Tracker.heatmapDays(this.state, 14);
    const maxS = Math.max(1, ...heat.map(d => d.seconds));
    box.innerHTML = `<div class="glass-card week-strip">
      <div class="week-strip-head">
        <b>You studied ${K.fmtDuration(week.total)} this week</b>
        <span class="muted">${week.topSubject ? 'mostly ' + K.subjName(week.topSubject) : ''}</span>
        <button class="btn btn-sm" id="openAnalytics">Analytics</button>
      </div>
      <div class="week-heat">${heat.map(d => {
        const level = d.seconds === 0 ? 0 : Math.ceil((d.seconds / maxS) * 4);
        return `<div class="wh-cell l${level}" title="${d.date}: ${K.fmtDuration(d.seconds)}"></div>`;
      }).join('')}</div>
      <p class="muted">🔥 Study streak: ${this.state.studyStreak?.current || 0} day(s) (best ${this.state.studyStreak?.best || 0})</p>
    </div>`;
    K.el('openAnalytics')?.addEventListener('click', () => this.showAnalytics());
  },

  _subjectProgress(subject) {
    const chapters = SYLLABUS[subject]?.chapters || [];
    let visited = 0;
    chapters.forEach(ch => {
      if (this.state.progress?.[subject]?.[ch.id]?.lastVisited) visited++;
    });
    return { visited, total: chapters.length, pct: chapters.length ? Math.round(visited / chapters.length * 100) : 0 };
  },

  _renderSubjects() {
    const grid = K.el('subjectsGrid');
    if (!grid) return;
    const cards = [
      { id: 'physics', icon: '⚛️', title: 'Physics', desc: '14 chapters · Mechanics, Thermo, Waves' },
      { id: 'chemistry', icon: '🧪', title: 'Chemistry', desc: '13 chapters · Physical, Organic, Inorganic' },
      { id: 'maths', icon: '📐', title: 'Maths', desc: '13 chapters · Algebra, Calc, Coordinate' }
    ];
    grid.innerHTML = cards.map(c => {
      const p = this._subjectProgress(c.id);
      return `<div class="subject-card" data-subject="${c.id}">
        <div class="subject-orb"></div>
        <div class="subject-icon">${c.icon}</div>
        <h2>${c.title}</h2>
        <p>${c.desc}</p>
        <div class="subject-progress"><div class="fill" style="width:${p.pct}%"></div></div>
        <div class="subject-progress-label">${p.visited}/${p.total} chapters · ${p.pct}%</div>
        <button class="btn btn-primary">Open ${c.title} →</button>
      </div>`;
    }).join('');
    grid.querySelectorAll('.subject-card').forEach(card => {
      card.onclick = () => this.openSubject(card.dataset.subject);
    });
  },

  _renderRecent() {
    const box = K.el('recentChapters');
    if (!box) return;
    const recents = [];
    ['physics', 'chemistry', 'maths'].forEach(subject => {
      Object.entries(this.state.progress?.[subject] || {}).forEach(([chId, prog]) => {
        if (prog.lastVisited) recents.push({ subject, chapterId: chId, lastVisited: prog.lastVisited });
      });
    });
    recents.sort((a, b) => String(b.lastVisited).localeCompare(String(a.lastVisited)));
    const top = recents.slice(0, 5);
    if (!top.length) { box.innerHTML = ''; return; }
    box.innerHTML = `<h2 class="section-title">📖 Continue Learning</h2>
      <div class="chapters-list">${top.map(r => {
        const ch = SYLLABUS[r.subject]?.chapters?.find(c => c.id === r.chapterId);
        if (!ch) return '';
        return `<div class="chapter-row" data-s="${r.subject}" data-c="${r.chapterId}">
          <div class="chapter-num">${K.subjEmoji(r.subject)}</div>
          <div class="chapter-info">
            <div class="chapter-name">${ch.name}</div>
            <div class="chapter-meta"><span>Last studied ${K.relativeDays(r.lastVisited)}</span></div>
          </div>
          <button class="btn btn-primary btn-sm">Open →</button>
        </div>`;
      }).join('')}</div>`;
    box.querySelectorAll('.chapter-row').forEach(row => {
      row.onclick = () => this.openChapter(row.dataset.s, row.dataset.c);
    });
  },

  openSubject(subject) {
    this._subject = subject;
    this.showView('subject');
    this.renderChapters(subject);
  },

  renderChapters(subject) {
    const view = K.el('view-subject');
    if (!view) return;
    const chapters = SYLLABUS[subject]?.chapters || [];
    view.innerHTML = `
      <div class="view-pad">
        <div class="breadcrumb"><a href="#" id="bcHome">Home</a> / <span>${K.subjName(subject)}</span></div>
        <button class="btn-back" id="backHome">← Back to Home</button>
        <h1>${K.subjEmoji(subject)} ${K.subjName(subject)}</h1>
        <p class="muted">${chapters.length} chapters · last-studied timestamps help re-entry</p>
        <div class="chapters-list" id="chaptersList"></div>
      </div>`;
    K.el('backHome').onclick = () => this.goHome();
    K.el('bcHome').onclick = e => { e.preventDefault(); this.goHome(); };
    const list = K.el('chaptersList');
    chapters.forEach((ch, i) => {
      const prog = this.state.progress?.[subject]?.[ch.id] || {};
      const sections = ['notesViewed', 'mindMapViewed', 'cheatSheetViewed', 'summaryViewed', 'videoWatched']
        .filter(k => prog[k]).length;
      const bm = Bookmarks.isBookmarked(subject, ch.id);
      const conf = prog.confidence ?? 0;
      const hasNotes = !!(this.state.notes?.[`${subject}:${ch.id}`]);
      const row = K.create('div', { class: 'chapter-row' });
      row.innerHTML = `
        <div class="chapter-num">${i + 1}</div>
        <div class="chapter-info">
          <div class="chapter-name">${ch.name} ${hasNotes ? '<span class="notes-pill">📝 notes</span>' : ''}</div>
          <div class="chapter-meta">
            <span>📚 ${sections}/5</span>
            <span>📝 ${prog.pyqsAttempted || 0} PYQs</span>
            <span>⚖️ ${ch.weight}/5</span>
            <span>🕐 ${K.relativeDays(prog.lastVisited)}</span>
            ${prog.difficultyRating ? `<span>⭐ ${prog.difficultyRating}/5</span>` : ''}
            ${conf ? `<span>Confidence ${conf}/5</span>` : ''}
          </div>
          <div class="mini-progress"><div class="fill" style="width:${sections * 20}%"></div></div>
        </div>
        <div class="chapter-actions">
          <button class="bookmark-btn ${bm ? 'active' : ''}" title="Bookmark">${bm ? '🔖' : '📑'}</button>
          <button class="btn btn-primary btn-sm">Open →</button>
        </div>`;
      row.querySelector('.bookmark-btn').onclick = (e) => {
        e.stopPropagation();
        Bookmarks.toggle(subject, ch.id, ch.name);
        this.renderChapters(subject);
      };
      row.onclick = (e) => {
        if (e.target.closest('.bookmark-btn')) return;
        this.openChapter(subject, ch.id);
      };
      list.appendChild(row);
    });
  },

  openChapter(subject, chapterId, tab = 'notes') {
    this._subject = subject;
    this._chapter = chapterId;
    this.state.progress[subject] = this.state.progress[subject] || {};
    this.state.progress[subject][chapterId] = this.state.progress[subject][chapterId] || {};
    this.state.progress[subject][chapterId].lastVisited = K.todayKey();
    this.state.progress[subject][chapterId].lastVisitedAt = new Date().toISOString();
    this.state.lastResume = { subject, chapterId, tab, at: K.todayKey() };
    Storage.save(this.state);
    this.showView('chapter');
    this._renderChapterView();
    this._switchTab(tab || 'notes');
  },

  _renderChapterView() {
    const view = K.el('view-chapter');
    const subject = this._subject;
    const chapterId = this._chapter;
    const ch = SYLLABUS[subject]?.chapters?.find(c => c.id === chapterId);
    const name = ch?.name || chapterId;
    const bm = Bookmarks.isBookmarked(subject, chapterId);
    const prog = this.state.progress?.[subject]?.[chapterId] || {};
    const noteKey = `${subject}:${chapterId}`;
    const noteText = this.state.notes?.[noteKey] || '';
    const related = (window.RELATED_CHAPTERS?.[subject]?.[chapterId] || []).slice(0, 3);

    view.innerHTML = `
      <div class="view-pad chapter-layout">
        <div class="breadcrumb">
          <a href="#" id="bcHome2">Home</a> /
          <a href="#" id="bcSubj">${K.subjName(subject)}</a> /
          <span>${name}</span>
        </div>
        <button class="btn-back" id="backSubject">← Back</button>
        <div class="chapter-view-top">
          <div>
            <div class="chapter-kicker">${K.subjEmoji(subject)} ${K.subjName(subject)} · ${chapterId.toUpperCase()} · Last studied ${K.relativeDays(prog.lastVisited)}</div>
            <h1 id="chapterTitle">${name}</h1>
            <div class="chapter-meta" id="chapterMeta">Weight ${ch?.weight || '—'}/5 · 9 study tabs</div>
          </div>
          <div class="chapter-top-actions">
            <button class="bookmark-btn-lg ${bm ? 'active' : ''}" id="chBookmark">${bm ? '🔖 Bookmarked' : '📑 Bookmark'}</button>
            <button class="btn btn-sm" id="exportCh">🖨️ PDF</button>
          </div>
        </div>
        <div class="resource-tabs" id="resourceTabs">
          <button class="res-tab active" data-tab="notes"><span class="tab-ico">📖</span><span class="tab-lbl">Notes</span></button>
          <button class="res-tab" data-tab="mindmap"><span class="tab-ico">🧠</span><span class="tab-lbl">Mind Map</span></button>
          <button class="res-tab" data-tab="cheatsheet"><span class="tab-ico">📋</span><span class="tab-lbl">Cheat Sheet</span></button>
          <button class="res-tab" data-tab="summary"><span class="tab-ico">🎯</span><span class="tab-lbl">Summary</span></button>
          <button class="res-tab" data-tab="pyqs"><span class="tab-ico">📚</span><span class="tab-lbl">PYQs</span></button>
          <button class="res-tab" data-tab="video"><span class="tab-ico">🎥</span><span class="tab-lbl">Best Video</span></button>
          <button class="res-tab" data-tab="topper"><span class="tab-ico">📑</span><span class="tab-lbl">Topper Notes</span></button>
          <button class="res-tab" data-tab="resources"><span class="tab-ico">🔗</span><span class="tab-lbl">Resources</span></button>
          <button class="res-tab" data-tab="ncert"><span class="tab-ico">📗</span><span class="tab-lbl">NCERT Sol</span></button>
        </div>
        <div class="tab-content" id="tabContent">${K.skeleton(5)}</div>

        <div class="meta-panels">
          <div class="glass-card meta-panel">
            <h3>🧠 Confidence</h3>
            <input type="range" min="0" max="5" step="1" id="confSlider" value="${prog.confidence ?? 3}" />
            <div class="muted" id="confLabel">I understand this: ${prog.confidence ?? 3}/5</div>
          </div>
          <div class="glass-card meta-panel">
            <h3>⭐ Difficulty</h3>
            <div class="star-rate" id="diffRate">
              ${[1,2,3,4,5].map(n => `<button data-r="${n}" class="${(prog.difficultyRating||0)>=n?'on':''}">★</button>`).join('')}
            </div>
            <div class="muted">How hard was this chapter?</div>
          </div>
        </div>

        <div class="glass-card personal-notes">
          <h3>📝 Personal Notes ${noteText ? '<span class="notes-pill">You have notes</span>' : ''}</h3>
          <textarea id="personalNotes" rows="4" placeholder="Write your own notes for this chapter… (auto-saves)">${noteText.replace(/</g,'&lt;')}</textarea>
        </div>

        ${related.length ? `<div class="related-block">
          <h3 class="section-title">🔗 Related chapters</h3>
          <div class="chapters-list">${related.map(cid => {
            const rc = SYLLABUS[subject]?.chapters?.find(c => c.id === cid);
            return `<div class="chapter-row rel-ch" data-c="${cid}">
              <div class="chapter-num">${K.subjEmoji(subject)}</div>
              <div class="chapter-info"><div class="chapter-name">${rc?.name || cid}</div></div>
              <button class="btn btn-primary btn-sm">Open</button>
            </div>`;
          }).join('')}</div>
        </div>` : ''}
      </div>`;

    K.el('backSubject').onclick = () => this.openSubject(subject);
    K.el('bcHome2').onclick = e => { e.preventDefault(); this.goHome(); };
    K.el('bcSubj').onclick = e => { e.preventDefault(); this.openSubject(subject); };
    K.el('chBookmark').onclick = () => {
      Bookmarks.toggle(subject, chapterId, name);
      this._renderChapterView();
      this._switchTab(this._tab);
    };
    K.el('exportCh').onclick = () => this.exportChapterPDF(subject, chapterId);
    K.qsa('#resourceTabs .res-tab').forEach(btn => {
      btn.onclick = () => this._switchTab(btn.dataset.tab);
    });
    K.el('confSlider').oninput = e => {
      const v = +e.target.value;
      this.state.progress[subject][chapterId].confidence = v;
      K.el('confLabel').textContent = `I understand this: ${v}/5`;
      Storage.save(this.state);
    };
    K.qsa('#diffRate button').forEach(b => {
      b.onclick = () => {
        this.state.progress[subject][chapterId].difficultyRating = +b.dataset.r;
        Storage.save(this.state);
        this._renderChapterView();
        this._switchTab(this._tab);
        K.toast('Difficulty saved');
      };
    });
    const ta = K.el('personalNotes');
    ta?.addEventListener('input', K.debounce(() => {
      this.state.notes[noteKey] = ta.value;
      Storage.save(this.state);
    }, 400));
    view.querySelectorAll('.rel-ch').forEach(r => {
      r.onclick = () => this.openChapter(subject, r.dataset.c);
    });
  },

  _switchTab(tab) {
    this._tab = tab;
    K.qsa('#resourceTabs .res-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
    const subject = this._subject;
    const chapterId = this._chapter;
    const tabContent = K.el('tabContent');
    if (!tabContent) return;

    tabContent.innerHTML = K.skeleton(4);

    const map = {
      notes: 'notesViewed', mindmap: 'mindMapViewed', cheatsheet: 'cheatSheetViewed',
      summary: 'summaryViewed', video: 'videoWatched'
    };
    if (map[tab]) {
      this.state.progress[subject] = this.state.progress[subject] || {};
      this.state.progress[subject][chapterId] = this.state.progress[subject][chapterId] || {};
      this.state.progress[subject][chapterId][map[tab]] = true;
      this.state.progress[subject][chapterId].lastTab = tab;
      this.state.lastResume = { subject, chapterId, tab, at: K.todayKey() };
      Storage.save(this.state);
    }

    Tracker.start(subject, chapterId, tab);

    // slight delay for skeleton feel
    setTimeout(() => {
      switch (tab) {
        case 'notes': Notes.render(subject, chapterId, tabContent); break;
        case 'mindmap': MindMap.render(subject, chapterId, tabContent); break;
        case 'cheatsheet': CheatSheet.render(subject, chapterId, tabContent); break;
        case 'summary': Summary.render(subject, chapterId, tabContent); break;
        case 'pyqs': PYQs.render(subject, chapterId, tabContent); break;
        case 'video': VideoPlayer.render(subject, chapterId, tabContent); break;
        case 'topper': TopperNotes.render(subject, chapterId, tabContent); break;
        case 'resources': Resources.render(subject, chapterId, tabContent); break;
        case 'ncert': NcertSolutions.render(subject, chapterId, tabContent); break;
        default: tabContent.innerHTML = '';
      }
    }, 60);
  },

  enterReadingMode() {
    document.body.classList.add('reading-mode');
    K.toast('Reading mode · Esc to exit');
  },

  exitReadingMode() {
    document.body.classList.remove('reading-mode');
  },

  exportChapterPDF(subject, chapterId) {
    const ch = SYLLABUS[subject]?.chapters?.find(c => c.id === chapterId);
    const content = window.STUDY_CONTENT?.[subject]?.[chapterId];
    const w = window.open('', '_blank');
    if (!w) { window.print(); return; }
    const formulas = (content?.cheatsheet || []).map(c =>
      `<div class="f"><b>${c.name}</b>: <code>${c.formula}</code></div>`).join('');
    const summary = (content?.summary || []).map(s => `<li>${s}</li>`).join('');
    w.document.write(`<!doctype html><html><head><title>${ch?.name || chapterId}</title>
      <style>body{font-family:system-ui;padding:24px;max-width:800px;margin:auto;color:#111}
      h1{color:#4338ca}.f{margin:8px 0;padding:8px;border-left:4px solid #6366f1;background:#f5f3ff}
      </style></head><body>
      <h1>${ch?.name || chapterId}</h1>
      <p>${K.subjName(subject)} · Kurukshetra Study</p>
      <h2>Notes</h2>${content?.notesHtml || '<p>No notes</p>'}
      <h2>Formulas</h2>${formulas}
      <h2>Summary</h2><ul>${summary}</ul>
      <script>onload=()=>print()</script>
      </body></html>`);
    w.document.close();
  },

  _maybeBackupReminder() {
    const last = this.state.settings.lastBackupReminder;
    const today = K.todayKey();
    if (last && K.daysBetween(last, today) < 7) return;
    // soft reminder once per week after some progress exists
    const hasProgress = Object.values(this.state.progress || {}).some(s => Object.keys(s || {}).length);
    if (!hasProgress) return;
    setTimeout(() => {
      if (confirm('Weekly reminder: export your progress JSON backup?')) {
        Storage.export(this.state);
      }
      this.state.settings.lastBackupReminder = today;
      Storage.save(this.state);
    }, 2500);
  },

  renderSettings() {
    const view = K.el('view-settings');
    if (!view) return;
    const theme = this.state.settings.theme || 'dark';
    const font = this.state.settings.fontSize || 'medium';
    const accent = this.state.settings.accent || '#6366f1';
    const insight = Tracker.bestHourInsight(this.state);
    const presets = ['#6366f1', '#2563eb', '#7c3aed', '#db2777', '#059669', '#d97706', '#dc2626', '#0ea5e9'];
    view.innerHTML = `
      <div class="view-pad">
        <button class="btn-back" id="setBack">← Home</button>
        <h1>⚙️ Settings</h1>
        <div class="settings-list glass-card">
          <div class="setting-row">
            <span>Theme</span>
            <select id="themeSelect">
              <option value="dark" ${theme === 'dark' ? 'selected' : ''}>Dark</option>
              <option value="light" ${theme === 'light' ? 'selected' : ''}>Light</option>
              <option value="sepia" ${theme === 'sepia' ? 'selected' : ''}>Sepia / Cream</option>
              <option value="auto" ${theme === 'auto' ? 'selected' : ''}>Auto (system)</option>
            </select>
          </div>
          <div class="setting-row">
            <span>Font Size</span>
            <select id="fontSizeSelect">
              <option value="small" ${font === 'small' ? 'selected' : ''}>Small</option>
              <option value="medium" ${font === 'medium' ? 'selected' : ''}>Medium</option>
              <option value="large" ${font === 'large' ? 'selected' : ''}>Large</option>
            </select>
          </div>
          <div class="setting-row accent-row">
            <span>Accent color</span>
            <div class="accent-presets">
              ${presets.map(c => `<button class="accent-swatch ${c === accent ? 'on' : ''}" data-c="${c}" style="background:${c}"></button>`).join('')}
              <input type="color" id="accentPicker" value="${accent}" />
            </div>
          </div>
          <div class="setting-row">
            <span>Time-of-day insight</span>
            <span class="muted">${insight ? `Best accuracy around ${insight.hour}:00 (${insight.accuracy}%)` : 'Practice more to unlock'}</span>
          </div>
          <div class="setting-actions">
            <button class="btn" id="exportData">📤 Export full progress</button>
            <button class="btn" id="exportBm">🔖 Export bookmarks only</button>
            <button class="btn" id="importDataBtn">📥 Import</button>
            <input type="file" id="importData" accept="application/json" class="hidden"/>
            <button class="btn" id="checkResources">🩺 Check Resources</button>
            <button class="btn" id="showSc">⌨️ Keyboard shortcuts</button>
            <button class="btn btn-danger" id="resetAll">🗑️ Reset All Progress</button>
          </div>
        </div>
      </div>`;
    K.el('setBack').onclick = () => this.goHome();
    K.el('themeSelect').onchange = e => this.setTheme(e.target.value);
    K.el('fontSizeSelect').onchange = e => this.setFontSize(e.target.value);
    K.el('exportData').onclick = () => Storage.export(this.state);
    K.el('exportBm').onclick = () => Storage.exportBookmarks(this.state);
    K.el('importDataBtn').onclick = () => K.el('importData').click();
    K.el('importData').onchange = e => {
      const file = e.target.files?.[0];
      if (!file) return;
      Storage.import(file, d => {
        this.state = d; window.appState = d;
        this.applyTheme(); this.applyFont(); this.applyAccent(); this.goHome();
      });
    };
    K.el('checkResources').onclick = () => this.showResourceHealth();
    K.el('showSc').onclick = () => Shortcuts.showHelp();
    K.el('resetAll').onclick = () => {
      if (confirm('Reset all progress?')) {
        this.state = Storage.reset();
        window.appState = this.state;
        location.reload();
      }
    };
    view.querySelectorAll('.accent-swatch').forEach(b => {
      b.onclick = () => this.setAccent(b.dataset.c);
    });
    K.el('accentPicker').oninput = e => this.setAccent(e.target.value);
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
window.App = App;
