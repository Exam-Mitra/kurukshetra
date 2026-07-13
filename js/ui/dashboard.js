/* ============================================
   KURUKSHETRA — Dashboard Controller
   ============================================ */

const UI = {
  // Update all top bar + dashboard
  update(state) {
    // Top bar
    K.el('streakCount').textContent = state.streak.current;
    K.el('levelNum').textContent = state.warrior.level;
    K.el('expCurrent').textContent = state.warrior.exp;
    K.el('expNeeded').textContent = K.expForLevel(state.warrior.level);
    const rank = K.rankForLevel(state.warrior.level);
    K.el('rankBadge').textContent = `${rank.icon} ${rank.name}`;

    // Avatar
    K.el('avatarMini').textContent = Avatar.current(state.warrior.skin);

    // Level ring
    const pct = state.warrior.exp / K.expForLevel(state.warrior.level);
    const circumference = 163;
    K.el('levelProgress').setAttribute('stroke-dashoffset', circumference * (1 - pct));

    // Greeting
    const hour = new Date().getHours();
    const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    K.el('greetingText').textContent = `${greet}, ${state.warrior.name}`;
    K.el('greetingSub').textContent = K.isSchoolDay()
      ? 'School day — light revision mode active.'
      : 'Your battlefield awaits.';

    // Today subject
    const ts = K.todaySubject();
    K.el('todaySubject').textContent = ts ? `Today: ${K.subjName(ts)}` : 'Today: Revision';

    // Subject progress
    ['physics', 'chemistry', 'maths'].forEach(subj => {
      const p = this._subjectProgress(state, subj);
      K.el(subj + 'Pct').textContent = Math.round(p) + '%';
      K.el(subj + 'Bar').style.width = p + '%';
    });

    // War map mini
    WarMap.renderMini(state);

    // Calendar
    Calendar.render(state);

    // Weak vault
    Weak.render(state);

    // Theme
    document.body.className = 'theme-' + state.settings.theme;
  },

  _subjectProgress(state, subject) {
    const totalCh = SYLLABUS[subject].chapters.length;
    let doneCh = 0;
    SYLLABUS[subject].chapters.forEach(ch => {
      const p = state.progress[subject][ch.id];
      if (p && p.done) doneCh++;
      else if (p && p.total > 0 && (p.correct / p.total) >= 0.7) {
        // auto-mark done at 70% accuracy
        if (p) p.done = true;
        doneCh++;
      }
    });
    return (doneCh / totalCh) * 100;
  }
};
