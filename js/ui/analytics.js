const Analytics = {
  render(container) {
    const el = container || K.el('view-analytics');
    if (!el) return;
    const st = window.appState;
    const week = Tracker.weekSeconds(st);
    const heat = Tracker.heatmapDays(st, 28);
    const maxS = Math.max(1, ...heat.map(d => d.seconds));
    const insight = Tracker.bestHourInsight(st);
    const streak = st.studyStreak || {};

    // accuracy grid
    let cells = '';
    ['physics','chemistry','maths'].forEach(subj => {
      (SYLLABUS[subj]?.chapters || []).forEach(ch => {
        const p = st.progress?.[subj]?.[ch.id] || {};
        const att = p.pyqsAttempted || 0;
        const cor = p.pyqsCorrect || 0;
        const acc = att ? cor / att : -1;
        let cls = 'hm-empty';
        if (acc < 0) cls = 'hm-empty';
        else if (acc >= 0.8) cls = 'hm-good';
        else if (acc >= 0.5) cls = 'hm-mid';
        else cls = 'hm-bad';
        cells += `<button class="hm-cell ${cls}" title="${ch.name}: ${att?Math.round(acc*100)+'%':'—'}" data-s="${subj}" data-c="${ch.id}"></button>`;
      });
    });

    el.innerHTML = `<div class="view-pad">
      <button class="btn-back" id="anBack">← Home</button>
      <h1>📊 Analytics</h1>
      <div class="stats-grid">
        <div class="glass-card stat-card">
          <div class="stat-label">This week</div>
          <div class="stat-value">${K.fmtDuration(week.total)}</div>
          <div class="muted">${week.topSubject ? 'Mostly ' + K.subjName(week.topSubject) : 'No data yet'}</div>
        </div>
        <div class="glass-card stat-card">
          <div class="stat-label">Study streak</div>
          <div class="stat-value">🔥 ${streak.current || 0}</div>
          <div class="muted">Best ${streak.best || 0} days</div>
        </div>
        <div class="glass-card stat-card">
          <div class="stat-label">SRS due</div>
          <div class="stat-value">${SRS.countDue(st)}</div>
          <div class="muted">questions today</div>
        </div>
        <div class="glass-card stat-card">
          <div class="stat-label">Time-of-day</div>
          <div class="stat-value">${insight ? insight.hour + ':00' : '—'}</div>
          <div class="muted">${insight ? insight.accuracy + '% accuracy (' + insight.samples + ' Qs)' : 'Need more data'}</div>
        </div>
      </div>
      <h2 class="section-title">28-day study heatmap</h2>
      <div class="week-heat">${heat.map(d => {
        const level = d.seconds === 0 ? 0 : Math.ceil((d.seconds / maxS) * 4);
        return `<div class="wh-cell l${level}" title="${d.date}: ${K.fmtDuration(d.seconds)}"></div>`;
      }).join('')}</div>
      <h2 class="section-title">Question accuracy (chapters)</h2>
      <p class="muted">Green high · Amber mid · Red low · Grey no attempts</p>
      <div class="acc-heatmap">${cells}</div>
    </div>`;
    K.el('anBack').onclick = () => App.goHome();
    el.querySelectorAll('.hm-cell[data-s]').forEach(b => {
      b.onclick = () => App.openChapter(b.dataset.s, b.dataset.c, 'pyqs');
    });
  }
};
window.Analytics = Analytics;
