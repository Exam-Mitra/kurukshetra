/* ============================================
   KURUKSHETRA V3 — Main App Controller
   Pure study hub — no game mechanics
   ============================================ */

const App = {
  state: null,
  _subject: null,
  _chapter: null,
  _tab: 'notes',

  init() {
    this.state = Storage.load();
    window.appState = this.state;
    this.applyTheme();
    this.applyFont();

    K.el('logoBtn')?.addEventListener('click', () => this.goHome());
    K.el('homeBtn')?.addEventListener('click', () => this.goHome());
    K.el('bookmarksBtn')?.addEventListener('click', () => this.showBookmarks());
    K.el('settingsBtn')?.addEventListener('click', () => this.showSettings());
    K.el('themeToggle')?.addEventListener('click', () => this.toggleTheme());

    FileViewer.init?.();
    VideoPlayer.init?.();
    Search.init?.(this.state);

    this.render();
  },

  applyTheme() {
    const theme = this.state?.settings?.theme || 'dark';
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(theme === 'light' ? 'theme-light' : 'theme-dark');
  },

  applyFont() {
    const size = this.state?.settings?.fontSize || 'medium';
    document.body.classList.remove('font-small', 'font-medium', 'font-large');
    document.body.classList.add('font-' + size);
  },

  setTheme(theme) {
    this.state.settings.theme = theme;
    this.applyTheme();
    Storage.save(this.state);
  },

  setFontSize(size) {
    this.state.settings.fontSize = size;
    this.applyFont();
    Storage.save(this.state);
  },

  toggleTheme() {
    const next = this.state.settings.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  },

  showView(id) {
    K.showView(id);
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

  render() {
    this._renderHero();
    this._renderSubjects();
    this._renderRecent();
  },

  _renderHero() {
    const hero = K.el('homeHero');
    if (!hero) return;
    hero.innerHTML = `
      <div class="hero-orb"></div>
      <h1 class="hero-title">Kurukshetra Study</h1>
      <p class="hero-sub">Pure glassmorphism study hub for <b>JEE 2028</b> — 40 chapters × 8 resource tabs.</p>
      <div class="hero-stats">
        <span>40 Chapters</span><span>Notes & Mind Maps</span>
        <span>Cheat Sheets</span><span>PYQ Practice</span>
        <span>Best Videos</span><span>Topper Notes</span>
      </div>`;
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
    recents.sort((a, b) => (b.lastVisited || '').localeCompare(a.lastVisited || ''));
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
            <div class="chapter-meta"><span>Last visited: ${r.lastVisited}</span></div>
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
        <button class="btn-back" id="backHome">← Back to Home</button>
        <h1>${K.subjEmoji(subject)} ${K.subjName(subject)}</h1>
        <p class="muted">${chapters.length} chapters · click a row to open study tabs</p>
        <div class="chapters-list" id="chaptersList"></div>
      </div>`;
    K.el('backHome').onclick = () => this.goHome();
    const list = K.el('chaptersList');
    chapters.forEach((ch, i) => {
      const prog = this.state.progress?.[subject]?.[ch.id] || {};
      const sections = ['notesViewed', 'mindMapViewed', 'cheatSheetViewed', 'summaryViewed', 'videoWatched']
        .filter(k => prog[k]).length;
      const bm = Bookmarks.isBookmarked(subject, ch.id);
      const row = K.create('div', { class: 'chapter-row' });
      row.innerHTML = `
        <div class="chapter-num">${i + 1}</div>
        <div class="chapter-info">
          <div class="chapter-name">${ch.name}</div>
          <div class="chapter-meta">
            <span>📚 ${sections}/5</span>
            <span>📝 ${prog.pyqsAttempted || 0} PYQs</span>
            <span>⚖️ Weight ${ch.weight}/5</span>
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
        if (e.target.closest('.chapter-actions')) {
          if (e.target.closest('.bookmark-btn')) return;
        }
        this.openChapter(subject, ch.id);
      };
      list.appendChild(row);
    });
  },

  openChapter(subject, chapterId) {
    this._subject = subject;
    this._chapter = chapterId;
    this.state.progress[subject] = this.state.progress[subject] || {};
    this.state.progress[subject][chapterId] = this.state.progress[subject][chapterId] || {};
    this.state.progress[subject][chapterId].lastVisited = K.todayKey();
    Storage.save(this.state);
    this.showView('chapter');
    this._renderChapterView();
    this._switchTab('notes');
  },

  _renderChapterView() {
    const view = K.el('view-chapter');
    const subject = this._subject;
    const chapterId = this._chapter;
    const ch = SYLLABUS[subject]?.chapters?.find(c => c.id === chapterId);
    const name = ch?.name || chapterId;
    const bm = Bookmarks.isBookmarked(subject, chapterId);
    view.innerHTML = `
      <div class="view-pad">
        <button class="btn-back" id="backSubject">← Back</button>
        <div class="chapter-view-top">
          <div>
            <div class="chapter-kicker">${K.subjEmoji(subject)} ${K.subjName(subject)} · ${chapterId.toUpperCase()}</div>
            <h1 id="chapterTitle">${name}</h1>
            <div class="chapter-meta" id="chapterMeta">Weight ${ch?.weight || '—'}/5 · 8 study tabs</div>
          </div>
          <button class="bookmark-btn-lg ${bm ? 'active' : ''}" id="chBookmark">${bm ? '🔖 Bookmarked' : '📑 Bookmark'}</button>
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
        </div>
        <div class="tab-content" id="tabContent"></div>
      </div>`;
    K.el('backSubject').onclick = () => this.openSubject(subject);
    K.el('chBookmark').onclick = () => {
      Bookmarks.toggle(subject, chapterId, name);
      this._renderChapterView();
      this._switchTab(this._tab);
    };
    K.qsa('#resourceTabs .res-tab').forEach(btn => {
      btn.onclick = () => this._switchTab(btn.dataset.tab);
    });
  },

  _switchTab(tab) {
    this._tab = tab;
    K.qsa('#resourceTabs .res-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
    const subject = this._subject;
    const chapterId = this._chapter;
    const tabContent = K.el('tabContent');
    if (!tabContent) return;

    // progress flags
    const map = {
      notes: 'notesViewed', mindmap: 'mindMapViewed', cheatsheet: 'cheatSheetViewed',
      summary: 'summaryViewed', video: 'videoWatched'
    };
    if (map[tab]) {
      this.state.progress[subject] = this.state.progress[subject] || {};
      this.state.progress[subject][chapterId] = this.state.progress[subject][chapterId] || {};
      this.state.progress[subject][chapterId][map[tab]] = true;
      Storage.save(this.state);
    }

    switch (tab) {
      case 'notes': Notes.render(subject, chapterId, tabContent); break;
      case 'mindmap': MindMap.render(subject, chapterId, tabContent); break;
      case 'cheatsheet': CheatSheet.render(subject, chapterId, tabContent); break;
      case 'summary': Summary.render(subject, chapterId, tabContent); break;
      case 'pyqs': PYQs.render(subject, chapterId, tabContent); break;
      case 'video': VideoPlayer.render(subject, chapterId, tabContent); break;
      case 'topper': TopperNotes.render(subject, chapterId, tabContent); break;
      case 'resources': Resources.render(subject, chapterId, tabContent); break;
      default: tabContent.innerHTML = '';
    }
  },

  renderSettings() {
    const view = K.el('view-settings');
    if (!view) return;
    const theme = this.state.settings.theme || 'dark';
    const font = this.state.settings.fontSize || 'medium';
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
          <div class="setting-actions">
            <button class="btn" id="exportData">📤 Export Progress</button>
            <button class="btn" id="importDataBtn">📥 Import Progress</button>
            <input type="file" id="importData" accept="application/json" class="hidden"/>
            <button class="btn btn-danger" id="resetAll">🗑️ Reset All Progress</button>
          </div>
        </div>
      </div>`;
    K.el('setBack').onclick = () => this.goHome();
    K.el('themeSelect').onchange = e => this.setTheme(e.target.value);
    K.el('fontSizeSelect').onchange = e => this.setFontSize(e.target.value);
    K.el('exportData').onclick = () => Storage.export(this.state);
    K.el('importDataBtn').onclick = () => K.el('importData').click();
    K.el('importData').onchange = e => {
      const file = e.target.files?.[0];
      if (!file) return;
      Storage.import(file, d => { this.state = d; window.appState = d; this.applyTheme(); this.applyFont(); this.goHome(); });
    };
    K.el('resetAll').onclick = () => {
      if (confirm('Reset all progress?')) {
        this.state = Storage.reset();
        window.appState = this.state;
        location.reload();
      }
    };
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
window.App = App;
