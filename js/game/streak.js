/* ============================================
   KURUKSHETRA — Streak System
   1 day grace per week
   ============================================ */

const Streak = {
  // Update streak based on today's activity
  update(state) {
    const today = K.todayKey();
    const yesterday = K.daysAgo(1);

    if (state.streak.lastActive === today) {
      // Already active today
      return state.streak;
    }

    // Check if streak should continue
    if (state.streak.lastActive === yesterday) {
      // Continuing streak
      state.streak.current++;
    } else if (state.streak.lastActive === null) {
      // First time
      state.streak.current = 1;
    } else {
      // Missed days — check if can use grace
      if (this._canUseGrace(state)) {
        state.streak.graceUsed++;
        // Grace used, don't break
        if (state.streak.lastActive !== today) state.streak.current++;
        K.toast(`🎯 Grace day used. Streak saved at ${state.streak.current}!`);
      } else {
        // Streak broken
        if (state.streak.current > state.streak.best) {
          state.streak.best = state.streak.current;
        }
        state.streak.current = 1;
        K.toast(`💔 Streak broken. New streak started.`, 4000);
      }
    }

    state.streak.lastActive = today;

    // Best streak
    if (state.streak.current > state.streak.best) {
      state.streak.best = state.streak.current;
    }

    return state.streak;
  },

  // Check if user did enough today to maintain streak
  markTodayActive(state) {
    const today = K.todayKey();
    // Update streak
    this.update(state);
    // Mark calendar
    if (!state.calendar[today]) state.calendar[today] = {};
    state.calendar[today].missionsDone = state.calendar[today].missionsDone || 0;
  },

  // Check grace eligibility
  _canUseGrace(state) {
    const grace = state.settings.gracePerWeek || 1;
    if (state.streak.graceUsed >= grace) return false;
    // Reset grace weekly
    const now = new Date();
    const weekStart = this._weekStart(now);
    if (state.streak.graceWeekStart !== weekStart) {
      state.streak.graceWeekStart = weekStart;
      state.streak.graceUsed = 0;
    }
    return state.streak.graceUsed < grace;
  },

  _weekStart(date) {
    const d = new Date(date);
    d.setDate(d.getDate() - d.getDay()); // Sunday
    return d.toISOString().split('T')[0];
  },

  // Check if streak is at risk (2 hours before midnight)
  checkWarning(state) {
    if (!state.streak.lastActive) return;
    if (state.streak.lastActive === K.todayKey()) return;

    const now = new Date();
    const hoursLeft = 24 - now.getHours();
    if (hoursLeft <= 2 && state.streak.current >= 3) {
      K.toast(`⚠️ ${Math.round(hoursLeft)}h left! Complete a mission to save your ${state.streak.current}-day streak!`, 6000);
    }
  }
};
