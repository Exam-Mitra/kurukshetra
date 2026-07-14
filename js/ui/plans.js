const Plans = {
  render(container) {
    const el = container || K.el('view-plans');
    if (!el) return;
    const st = window.appState;
    const plans = window.STUDY_PLANS || [];
    const active = st.activePlan;

    el.innerHTML = `<div class="view-pad">
      <button class="btn-back" id="plBack">← Home</button>
      <h1>🗓️ Study Plans</h1>
      ${active ? `<div class="glass-card plan-active">
        <h3>Active: ${plans.find(p=>p.id===active.id)?.name || active.id}</h3>
        <p class="muted">Started ${active.started} · ${active.completed?.length || 0} chapters done</p>
        <button class="btn btn-danger btn-sm" id="plClear">Stop plan</button>
      </div>` : ''}
      <div class="plans-grid">${plans.map(p => `
        <div class="glass-card plan-card">
          <h2>${p.name}</h2>
          <p class="muted">${p.desc}</p>
          <p><b>${p.days}</b> days ${p.dynamic ? '· dynamic' : '· fixed schedule'}</p>
          <button class="btn btn-primary" data-plan="${p.id}">Start plan</button>
        </div>`).join('')}
      </div>
      <div id="plToday"></div>
    </div>`;
    K.el('plBack').onclick = () => App.goHome();
    K.el('plClear')?.addEventListener('click', () => {
      st.activePlan = null; Storage.save(st); this.render(el);
    });
    el.querySelectorAll('[data-plan]').forEach(b => b.onclick = () => {
      const plan = plans.find(p => p.id === b.dataset.plan);
      st.activePlan = { id: plan.id, started: K.todayKey(), completed: [] };
      if (plan.dynamic) {
        st.activePlan.schedule = this._dynamicSchedule(st, plan.days);
      } else {
        st.activePlan.schedule = plan.schedule || [];
      }
      Storage.save(st);
      K.toast('Plan started!');
      this.render(el);
    });
    if (active?.schedule) {
      const dayNum = Math.min(K.daysBetween(active.started, K.todayKey()) + 1, 999);
      const todayItems = active.schedule.filter(x => x.day === dayNum).slice(0, 5);
      const box = K.el('plToday');
      if (box) {
        box.innerHTML = `<h2 class="section-title">Today (Day ${dayNum})</h2>
          <div class="chapters-list">${todayItems.map(it => {
            const ch = SYLLABUS[it.subject]?.chapters?.find(c => c.id === it.chapterId);
            return `<div class="chapter-row" data-s="${it.subject}" data-c="${it.chapterId}">
              <div class="chapter-num">${K.subjEmoji(it.subject)}</div>
              <div class="chapter-info"><div class="chapter-name">${ch?.name || it.chapterId}</div></div>
              <button class="btn btn-primary btn-sm">Open</button>
            </div>`;
          }).join('') || '<p class="muted">No items scheduled today — pick any weak chapter.</p>'}</div>`;
        box.querySelectorAll('.chapter-row').forEach(r => r.onclick = () => App.openChapter(r.dataset.s, r.dataset.c));
      }
    }
  },

  _dynamicSchedule(st, days) {
    const scored = [];
    ['physics','chemistry','maths'].forEach(subj => {
      (SYLLABUS[subj]?.chapters || []).forEach(ch => {
        const p = st.progress?.[subj]?.[ch.id] || {};
        const conf = p.confidence ?? 3;
        const att = p.pyqsAttempted || 0;
        const acc = att ? (p.pyqsCorrect || 0) / att : 0.5;
        const age = p.lastVisited ? K.daysBetween(String(p.lastVisited).slice(0,10), K.todayKey()) : 99;
        const score = (5 - conf) * 2 + (1 - acc) * 3 + Math.min(age, 30) / 10;
        scored.push({ subject: subj, chapterId: ch.id, score });
      });
    });
    scored.sort((a, b) => b.score - a.score);
    const schedule = [];
    for (let d = 1; d <= days; d++) {
      const item = scored[(d - 1) % scored.length];
      schedule.push({ day: d, subject: item.subject, chapterId: item.chapterId });
    }
    return schedule;
  }
};
window.Plans = Plans;
