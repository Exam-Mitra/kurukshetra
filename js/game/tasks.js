/* ============================================
   KURUKSHETRA — Task Tracker
   (Tasks handled inline in app.js; this is a
   stub to satisfy the script reference)
   ============================================ */

const Tasks = {
  // Track a lecture watched today
  logLecture(state, subject, lectureName) {
    const today = K.todayKey();
    if (!state.calendar[today]) state.calendar[today] = {};
    if (!state.calendar[today].lectures) state.calendar[today].lectures = [];
    state.calendar[today].lectures.push({ subject, name: lectureName, time: new Date().toISOString() });
    Missions.autoComplete(state, 'lectures');
    Storage.save(state);
    K.toast(`📺 Logged: ${lectureName}`);
  },

  // Track HW solved
  logHW(state, count = 1) {
    const today = K.todayKey();
    if (!state.calendar[today]) state.calendar[today] = {};
    state.calendar[today].hw = (state.calendar[today].hw || 0) + count;
    Missions.autoComplete(state, 'hw');
    Storage.save(state);
  },

  // Track DPP completion
  logDPP(state) {
    const today = K.todayKey();
    if (!state.calendar[today]) state.calendar[today] = {};
    state.calendar[today].dpp = (state.calendar[today].dpp || 0) + 1;
    Missions.autoComplete(state, 'dpp');
    Storage.save(state);
  }
};
