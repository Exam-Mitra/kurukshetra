/* ============================================
   KURUKSHETRA — Main App Controller
   ============================================ */

window.appState = null;

const App = {
  init() {
    // Load state
    this.state = Storage.load();
    window.appState = this.state;

    // Hide loader
    setTimeout(() => this._onLoaded(), 2500);
  },

  _onLoaded() {
    K.el('loader').classList.add('hidden');
    // Check if onboarded
    if (!this.state.warrior.name || this.state.warrior.name === 'Warrior') {
      this._showOnboarding();
    } else {
      this._showApp();
    }
  },

  _showOnboarding() {
    K.el('onboarding').classList.remove('hidden');
    // Avatar picker
    K.qsa('.avatar-opt').forEach(opt => {
      opt.onclick = () => {
        K.qsa('.avatar-opt').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
      };
    });
    // Start button
    K.el('startWarriorBtn').onclick = () => this._onboard();
  },

  _onboard() {
    const name = K.el('warriorName').value.trim() || 'Warrior';
    const year = parseInt(K.el('targetYear').value) || 2028;
    const selectedSkin = K.qs('.avatar-opt.selected');
    const skin = selectedSkin ? selectedSkin.dataset.skin : 'arjuna';

    this.state.warrior = {
      name, year, skin,
      level: 1, exp: 0, totalExp: 0
    };
    Storage.save(this.state);
    K.toast(`Welcome, ${name}! Your battlefield awaits. ⚔️`);
    K.el('onboarding').classList.add('hidden');
    this._showApp();
  },

  _showApp() {
    K.el('app').classList.remove('hidden');
    this._bindUI();
    this._renderDashboard();
    this._checkDailyBonus();
    Notifications.init(this.state);
  },

  _bindUI() {
    // Bottom nav
    K.qsa('.nav-btn').forEach(btn => {
      btn.onclick = () => {
        const view = btn.dataset.view;
        if (view === 'subject') this._openSubjectList();
        else if (view === 'tricks') this._openTricks();
        else if (view === 'compete') K.showView('compete');
        else if (view === 'settings') this._openSettings();
        else this._renderDashboard();
      };
    });

    // Top bar buttons
    K.el('themeToggle').onclick = () => this._toggleTheme();
    K.el('settingsBtn').onclick = () => this._openSettings();

    // Subject tiles
    K.qsa('.subj-tile').forEach(tile => {
      tile.onclick = () => this._openSubject(tile.dataset.subject);
    });

    // Back buttons
    K.el('backFromSubject').onclick = () => this._renderDashboard();
    K.el('backFromChapter').onclick = () => this._openSubject(this.state._currentSubj || K.todaySubject());
    K.el('backFromQuestions').onclick = () => this._openChapter(this.state._currentSubj, this.state._currentChapter);
    K.el('backFromTricks').onclick = () => this._renderDashboard();
    K.el('backFromCompete').onclick = () => this._renderDashboard();
    K.el('backFromSettings').onclick = () => this._renderDashboard();

    // Open war map full
    K.el('openWarMap').onclick = () => WarMap.openFull(this.state);

    // Compete buttons
    K.el('competeSolo').onclick = () => Competition.startSolo(this.state);
    K.el('competeAI').onclick = () => Competition.startAI(this.state);
    K.el('competeFriend').onclick = () => Competition.startFriend(this.state);

    // Settings handlers
    K.el('themeSelect').onchange = (e) => {
      this.state.settings.theme = e.target.value;
      document.body.className = 'theme-' + e.target.value;
      Storage.save(this.state);
    };
    K.el('reminderTime').onchange = (e) => {
      this.state.settings.reminderTime = e.target.value;
      Storage.save(this.state);
    };
    K.el('soundVolume').oninput = (e) => {
      Sounds.setVolume(e.target.value);
      this.state.settings.soundVolume = parseInt(e.target.value);
      Storage.save(this.state);
    };
    K.el('graceDays').onchange = (e) => {
      this.state.settings.gracePerWeek = parseInt(e.target.value) || 1;
      Storage.save(this.state);
    };
    K.el('exportData').onclick = () => Storage.export(this.state);
    K.el('importData').onclick = () => K.el('importFile').click();
    K.el('importFile').onchange = (e) => {
      if (e.target.files[0]) {
        Storage.import(e.target.files[0], (data) => {
          this.state = data;
          window.appState = this.state;
          this._renderDashboard();
        });
      }
    };
    K.el('resetAll').onclick = () => {
      if (confirm('⚠️ Reset all data? This cannot be undone.')) {
        this.state = Storage.reset();
        window.appState = this.state;
        location.reload();
      }
    };

    // Modal close on bg click
    K.el('modalBg').onclick = () => K.closeModal();
  },

  _renderDashboard() {
    K.showView('dashboard');
    UI.update(this.state);
    Missions.render(this.state);
    // School mode banner
    const dash = K.el('view-dashboard');
    const existing = dash.querySelector('.school-banner');
    if (existing) existing.remove();
    if (School.isActive()) {
      const banner = K.create('div', { class: 'card school-banner', style: 'background: linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(255, 215, 0, 0.05)); border-color: var(--info);' });
      banner.innerHTML = `
        <h2>📚 School Day Mode</h2>
        <p style="color:var(--text-secondary); margin-top:8px;">
          Sunday — light revision mode. Solve weak topics, read cheat sheets.
        </p>
      `;
      dash.insertBefore(banner, dash.firstChild.nextSibling);
    }
  },

  _openSubject(subject) {
    this.state._currentSubj = subject;
    const title = `${K.subjEmoji(subject)} ${K.subjName(subject)}`;
    K.el('subjectTitle').textContent = title;
    const list = K.el('chapterList');
    list.innerHTML = '';

    let chapterIdx = 0;
    let prevDone = true;
    SYLLABUS[subject].chapters.forEach(ch => {
      chapterIdx++;
      const p = this.state.progress[subject][ch.id];
      const isFirst = chapterIdx === 1;
      const locked = !isFirst && !prevDone;
      const isDone = p && (p.done || (p.total > 0 && p.correct / p.total >= 0.7));

      const row = K.create('div', { class: 'chapter-row' + (locked ? ' locked' : '') + (isDone ? ' done' : '') });
      row.innerHTML = `
        <div class="chapter-num">${chapterIdx}</div>
        <div class="chapter-info">
          <div class="chapter-name">${ch.name}</div>
          <div class="chapter-meta">${p ? `${p.correct}/${p.total} correct · ${(p.tricksUnlocked || []).length} tricks` : 'Not started'} · Weight: ${ch.weight}</div>
        </div>
        <div class="chapter-status">${locked ? '🔒' : isDone ? '✅' : '⚔️'}</div>
      `;
      if (!locked) {
        row.onclick = () => this._openChapter(subject, ch.id);
      }
      list.appendChild(row);
      prevDone = isDone || (p && p.total > 0);
    });

    K.showView('subject');
  },

  _openChapter(subject, chapterId) {
    this.state._currentSubj = subject;
    this.state.currentChapter = chapterId;
    const chapterData = this._getChapterData(subject, chapterId);
    K.el('chapterTitle').textContent = `${K.subjEmoji(subject)} ${chapterData.name}`;

    // Tabs
    K.qsa('.tab-btn').forEach(btn => {
      btn.onclick = () => {
        K.qsa('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this._renderTab(btn.dataset.tab, subject, chapterId);
      };
    });

    // Default: Learn tab
    K.qsa('.tab-btn').forEach(b => b.classList.remove('active'));
    K.qs('.tab-btn[data-tab="learn"]').classList.add('active');
    this._renderTab('learn', subject, chapterId);

    K.showView('chapter');
  },

  _renderTab(tab, subject, chapterId) {
    const cont = K.el('tabContent');
    if (tab === 'learn') {
      cont.innerHTML = Tricks.renderLearn(subject, chapterId);
      // Add practice button
      cont.innerHTML += `
        <div style="margin-top:20px; display:flex; gap:10px; flex-wrap:wrap;">
          <button class="btn-primary" id="goPractice">🎯 Mixed Practice</button>
          <button class="btn-secondary" id="goBasic">⭐ Basic</button>
          <button class="btn-secondary" id="goMedium">🔥 Medium</button>
          <button class="btn-secondary" id="goAdvanced">💀 Advanced</button>
          <button class="btn-primary" id="goDPP">⏱️ DPP (Timed)</button>
        </div>
      `;
      K.el('goPractice').onclick = () => Questions.startSession(this.state, subject, chapterId, 'practice');
      K.el('goBasic').onclick = () => Questions.startSession(this.state, subject, chapterId, 'practice', 'basic');
      K.el('goMedium').onclick = () => Questions.startSession(this.state, subject, chapterId, 'practice', 'medium');
      K.el('goAdvanced').onclick = () => Questions.startSession(this.state, subject, chapterId, 'practice', 'advanced');
      K.el('goDPP').onclick = () => Questions.startSession(this.state, subject, chapterId, 'dpp');
    } else if (tab === 'tricks') {
      cont.innerHTML = Tricks.renderChapterTricks(this.state, subject, chapterId);
    } else if (tab === 'cheatsheet') {
      cont.innerHTML = Tricks.renderCheatSheet(subject, chapterId);
    } else if (tab === 'practice') {
      cont.innerHTML = `
        <div class="card">
          <h3>🎯 Choose a Practice Mode</h3>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:10px; margin-top:14px;">
            <button class="btn-primary" onclick="Questions.startSession(appState, '${subject}', '${chapterId}', 'practice', 'basic')">⭐ Basic (Unlock tricks)</button>
            <button class="btn-primary" onclick="Questions.startSession(appState, '${subject}', '${chapterId}', 'practice', 'medium')">🔥 Medium</button>
            <button class="btn-primary" onclick="Questions.startSession(appState, '${subject}', '${chapterId}', 'practice', 'advanced')">💀 Advanced</button>
            <button class="btn-primary" onclick="Questions.startSession(appState, '${subject}', '${chapterId}', 'dpp')">⏱️ DPP</button>
          </div>
        </div>
      `;
    } else if (tab === 'dpp') {
      cont.innerHTML = `
        <div class="card">
          <h3>⏱️ Daily Practice Paper</h3>
          <p style="color:var(--text-secondary); margin:10px 0;">8 questions, 90s each, mixed difficulty. Simulates a JEE-Mains style test for this chapter.</p>
          <button class="btn-primary" onclick="Questions.startSession(appState, '${subject}', '${chapterId}', 'dpp')">🚀 Start DPP</button>
        </div>
      `;
    }
  },

  _openSubjectList() {
    // Show subject picker first
    this._renderDashboard();
    K.showView('dashboard');
    setTimeout(() => {
      const today = K.todaySubject();
      if (today) this._openSubject(today);
      else {
        // Sunday — let user pick
        K.modal(`
          <h2>📚 Pick a subject to study</h2>
          <p style="color:var(--text-secondary); margin:8px 0;">Today is Sunday. Pick a subject for revision.</p>
          <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:14px;">
            <button class="btn-primary" onclick="K.closeModal(); App._openSubject('physics')">⚛️ Physics</button>
            <button class="btn-primary" onclick="K.closeModal(); App._openSubject('chemistry')">🧪 Chemistry</button>
            <button class="btn-primary" onclick="K.closeModal(); App._openSubject('maths')">📐 Maths</button>
          </div>
        `);
      }
    }, 100);
  },

  _openTricks() {
    Tricks.renderInventory(this.state);
    K.showView('tricks');
  },

  _openSettings() {
    K.el('themeSelect').value = this.state.settings.theme;
    K.el('reminderTime').value = this.state.settings.reminderTime;
    K.el('soundVolume').value = this.state.settings.soundVolume;
    K.el('graceDays').value = this.state.settings.gracePerWeek;
    K.showView('settings');
  },

  _toggleTheme() {
    const newTheme = this.state.settings.theme === 'dark' ? 'light' : 'dark';
    this.state.settings.theme = newTheme;
    document.body.className = 'theme-' + newTheme;
    Storage.save(this.state);
    K.toast(`🌓 Theme: ${newTheme}`);
  },

  _checkDailyBonus() {
    const today = K.todayKey();
    const lastBonus = this.state._lastBonus;
    if (lastBonus === today) return;

    // Mark streak first
    Streak.update(this.state);

    // Daily login bonus
    this.state._lastBonus = today;
    EXP._addExp(this.state, EXP.REWARDS.DAILY_LOGIN);
    Storage.save(this.state);

    // Show daily bonus popup
    setTimeout(() => {
      K.modal(`
        <div class="daily-bonus-popup">
          <div class="loot-box">🎁</div>
          <h2>Daily Login Bonus</h2>
          <p style="color:var(--text-secondary); margin:14px 0;">+${EXP.REWARDS.DAILY_LOGIN} EXP claimed!</p>
          <p style="color:var(--accent-gold); font-weight:700; font-size:1.2em;">🔥 Current streak: ${this.state.streak.current} days</p>
          <p style="color:var(--text-secondary); margin-top:14px;">Best: ${this.state.streak.best} days</p>
          <button class="btn-primary" style="margin-top:14px;" onclick="K.closeModal()">Let's go! ⚔️</button>
        </div>
      `);
      Sounds.play('levelup');
      Animations.expGain(EXP.REWARDS.DAILY_LOGIN);
    }, 800);

    // First-time achievement
    if (this.state.streak.current === 1 && !this.state.achievements.first_login) {
      this.state.achievements.first_login = true;
      setTimeout(() => Animations.achievement('First Login', 'You\'ve entered the battlefield!'), 2500);
    }
  },

  _getChapterData(subject, chapterId) {
    if (subject === 'physics') return PHYSICS_DATA[chapterId];
    if (subject === 'chemistry') return CHEMISTRY_DATA[chapterId];
    if (subject === 'maths') return MATHS_DATA[chapterId];
    return null;
  }
};

// Boot
document.addEventListener('DOMContentLoaded', () => App.init());
