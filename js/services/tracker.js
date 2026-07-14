/* Study time, streak, time-of-day analytics */
const Tracker = {
  _timer: null,
  _tickSubject: null,
  _tickChapter: null,
  _tickTab: null,

  start(subject, chapterId, tab) {
    this.stop();
    this._tickSubject = subject;
    this._tickChapter = chapterId;
    this._tickTab = tab || 'notes';
    this._timer = setInterval(() => this._tick(5), 5000);
    this.recordOpen();
  },

  stop() {
    if (this._timer) clearInterval(this._timer);
    this._timer = null;
  },

  _tick(seconds) {
    const st = window.appState;
    if (!st || !this._tickSubject) return;
    const day = K.todayKey();
    st.studyLog = st.studyLog || {};
    st.studyLog[day] = st.studyLog[day] || { seconds: 0, subjects: {}, opens: 0 };
    st.studyLog[day].seconds += seconds;
    st.studyLog[day].subjects[this._tickSubject] = (st.studyLog[day].subjects[this._tickSubject] || 0) + seconds;

    st.progress[this._tickSubject] = st.progress[this._tickSubject] || {};
    const p = st.progress[this._tickSubject][this._tickChapter] = st.progress[this._tickSubject][this._tickChapter] || {};
    p.studySeconds = p.studySeconds || {};
    p.studySeconds[this._tickTab] = (p.studySeconds[this._tickTab] || 0) + seconds;
    p.studySeconds.total = (p.studySeconds.total || 0) + seconds;
    Storage.save(st);
  },

  recordOpen() {
    const st = window.appState;
    if (!st) return;
    const day = K.todayKey();
    st.studyLog = st.studyLog || {};
    st.studyLog[day] = st.studyLog[day] || { seconds: 0, subjects: {}, opens: 0 };
    st.studyLog[day].opens = (st.studyLog[day].opens || 0) + 1;
    this._updateStreak(st, day);
    Storage.save(st);
  },

  _updateStreak(st, day) {
    st.studyStreak = st.studyStreak || { current: 0, best: 0, lastDay: null };
    const last = st.studyStreak.lastDay;
    if (last === day) return;
    if (last && K.daysBetween(last, day) === 1) st.studyStreak.current += 1;
    else st.studyStreak.current = 1;
    st.studyStreak.lastDay = day;
    st.studyStreak.best = Math.max(st.studyStreak.best || 0, st.studyStreak.current);
  },

  weekSeconds(st) {
    let total = 0;
    const subjects = { physics: 0, chemistry: 0, maths: 0 };
    for (let i = 0; i < 7; i++) {
      const d = K.addDays(K.todayKey(), -i);
      const log = st.studyLog?.[d];
      if (!log) continue;
      total += log.seconds || 0;
      Object.keys(subjects).forEach(s => { subjects[s] += log.subjects?.[s] || 0; });
    }
    const top = Object.entries(subjects).sort((a, b) => b[1] - a[1])[0];
    return { total, subjects, topSubject: top?.[1] ? top[0] : null };
  },

  heatmapDays(st, n = 28) {
    const days = [];
    for (let i = n - 1; i >= 0; i--) {
      const d = K.addDays(K.todayKey(), -i);
      days.push({ date: d, seconds: st.studyLog?.[d]?.seconds || 0 });
    }
    return days;
  },

  recordAnswerTimeOfDay(st, correct) {
    const h = new Date().getHours();
    st.timeOfDayStats = st.timeOfDayStats || {};
    st.timeOfDayStats[h] = st.timeOfDayStats[h] || { attempts: 0, correct: 0 };
    st.timeOfDayStats[h].attempts++;
    if (correct) st.timeOfDayStats[h].correct++;
  },

  bestHourInsight(st) {
    const stats = st.timeOfDayStats || {};
    let best = null, bestAcc = -1, bestN = 0;
    Object.entries(stats).forEach(([h, v]) => {
      if ((v.attempts || 0) < 5) return;
      const acc = v.correct / v.attempts;
      if (acc > bestAcc) { bestAcc = acc; best = +h; bestN = v.attempts; }
    });
    if (best == null) return null;
    return { hour: best, accuracy: Math.round(bestAcc * 100), samples: bestN };
  },

  chapterVelocity(st, subject, chapterId) {
    const p = st.progress?.[subject]?.[chapterId];
    if (!p) return null;
    const attempted = p.pyqsAttempted || 0;
    const sec = p.studySeconds?.pyqs || p.studySeconds?.total || 0;
    if (!attempted || !sec) return null;
    return attempted / (sec / 60); // qpm
  }
};

window.Tracker = Tracker;
