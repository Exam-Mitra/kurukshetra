/* ============================================
   KURUKSHETRA — Battle Calendar
   30-day streak visualization
   ============================================ */

const Calendar = {
  render(state) {
    const grid = K.el('calendarGrid');
    if (!grid) return;
    grid.innerHTML = '';

    // Last 30 days (oldest first)
    for (let i = 29; i >= 0; i--) {
      const date = K.daysAgo(i);
      const data = state.calendar[date];
      const today = K.todayKey();
      let cls = 'cal-day';
      if (date === today) cls += ' today';
      if (data) {
        if (data.questionsAttempted >= 5) cls += ' done';
        else if (data.questionsAttempted > 0) cls += ' partial';
        else cls += ' missed';
      }
      const cell = K.create('div', { class: cls, title: `${date} — ${data ? (data.questionsAttempted || 0) + ' questions' : 'no data'}` });
      grid.appendChild(cell);
    }
  }
};
