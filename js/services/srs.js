/* Spaced repetition — 1d → 3d → 7d → 14d → 30d */
const SRS = {
  INTERVALS: [1, 3, 7, 14, 30],

  ensure(st, qid, meta = {}) {
    st.questionHistory = st.questionHistory || {};
    if (!st.questionHistory[qid]) {
      st.questionHistory[qid] = {
        subject: meta.subject,
        chapterId: meta.chapterId,
        seen: 0,
        correct: 0,
        wrong: 0,
        lastSeen: null,
        nextReview: null,
        intervalIndex: -1,
        bookmarked: false
      };
    }
    return st.questionHistory[qid];
  },

  review(st, qid, wasCorrect, meta = {}) {
    const h = this.ensure(st, qid, meta);
    h.seen = (h.seen || 0) + 1;
    h.lastSeen = K.todayKey();
    if (wasCorrect) {
      h.correct = (h.correct || 0) + 1;
      h.intervalIndex = Math.min((h.intervalIndex ?? -1) + 1, this.INTERVALS.length - 1);
    } else {
      h.wrong = (h.wrong || 0) + 1;
      h.intervalIndex = 0; // reset to 1 day
    }
    const days = this.INTERVALS[Math.max(0, h.intervalIndex)];
    h.nextReview = K.addDays(h.lastSeen, days);
    Storage.save(st);
    return h;
  },

  dueToday(st) {
    const today = K.todayKey();
    const due = [];
    Object.entries(st.questionHistory || {}).forEach(([id, h]) => {
      if (!h.nextReview) return;
      if (h.nextReview <= today) due.push({ id, ...h });
    });
    return due;
  },

  countDue(st) {
    return this.dueToday(st).length;
  }
};

window.SRS = SRS;
