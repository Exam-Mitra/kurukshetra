/* ============================================
   KURUKSHETRA — Notifications
   8:15 PM daily + streak warnings
   ============================================ */

const Notifications = {
  init(state) {
    // Request permission
    if ('Notification' in window && Notification.permission === 'default') {
      // Don't auto-request, just be ready
    }
    this._scheduleDaily(state);
    this._scheduleStreakCheck(state);
  },

  _scheduleDaily(state) {
    const check = () => {
      const now = new Date();
      const hhmm = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
      const target = state.settings.reminderTime || '20:15';
      if (hhmm === target) {
        this._showDaily(state);
      }
    };
    setInterval(check, 60000); // check every minute
    check();
  },

  _scheduleStreakCheck(state) {
    // Check every 30 minutes
    setInterval(() => {
      const now = new Date();
      // Only warn between 8 PM and 11 PM
      if (now.getHours() >= 20 && now.getHours() <= 23) {
        Streak.checkWarning(state);
      }
    }, 30 * 60 * 1000);
  },

  _showDaily(state) {
    const subject = K.todaySubject();
    const msg = subject
      ? `⚔️ Kurukshetra awaits! Today's battlefield: ${K.subjName(subject)}. Time to study.`
      : `📚 School day — use Kurukshetra for revision and weak-topic practice.`;
    this._notify('⚔️ Kurukshetra — Time to fight', msg);
  },

  _notify(title, body) {
    // Try browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '⚔️' });
    }
    // Also toast
    K.toast(`🔔 ${body}`, 6000);
  },

  requestPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }
};
