/* ============================================
   KURUKSHETRA — Storage System
   localStorage + export/import
   ============================================ */

const Storage = {
  KEY: 'kurukshetra_data_v1',

  // Default state
  defaultState() {
    return {
      // User
      warrior: {
        name: 'Warrior',
        year: 2028,
        skin: 'arjuna',
        level: 1,
        exp: 0,
        totalExp: 0
      },
      // Streak
      streak: {
        current: 0,
        best: 0,
        lastActive: null,
        graceUsed: 0,         // grace days used this week
        graceWeekStart: null
      },
      // Calendar: { 'YYYY-MM-DD': { missionsDone, questionsAttempted, correct, exp, isSchool } }
      calendar: {},
      // Subject progress: { physics: { chapterId: { done, questionsCorrect, totalQuestions, tricksUnlocked } } }
      progress: {
        physics: {},
        chemistry: {},
        maths: {}
      },
      // Tricks inventory: { trickId: { subject, chapter, name, body, when, unlockedAt } }
      tricks: {},
      // Weak topics: [ { subject, chapter, mistakeCount, lastWrong } ]
      weak: [],
      // Missions: { 'YYYY-MM-DD': [ {id, text, reward, done} ] }
      missions: {},
      // Settings
      settings: {
        reminderTime: '20:15',
        soundVolume: 60,
        theme: 'dark',
        gracePerWeek: 1
      },
      // Achievements
      achievements: {},
      // Certificates
      certificates: [],
      // AI Bot scores (for vs AI mode)
      botScores: []
    };
  },

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) return this.defaultState();
      const data = JSON.parse(raw);
      // Merge with default to handle new fields
      return this._mergeDeep(this.defaultState(), data);
    } catch (e) {
      console.error('Load failed', e);
      return this.defaultState();
    }
  },

  save(state) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      console.error('Save failed', e);
      return false;
    }
  },

  reset() {
    localStorage.removeItem(this.KEY);
    return this.defaultState();
  },

  export(state) {
    const dataStr = JSON.stringify(state, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kurukshetra_backup_${K.todayKey()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    K.toast('📤 Data exported!');
  },

  import(file, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.warrior && data.progress) {
          this.save(data);
          K.toast('📥 Data imported!');
          callback(data);
        } else {
          K.toast('❌ Invalid file');
        }
      } catch (err) {
        K.toast('❌ Failed to parse file');
      }
    };
    reader.readAsText(file);
  },

  _mergeDeep(defaults, data) {
    if (typeof defaults !== 'object' || defaults === null || Array.isArray(defaults)) return data;
    const out = { ...defaults };
    for (const key in data) {
      if (typeof data[key] === 'object' && data[key] !== null && !Array.isArray(data[key]) && typeof defaults[key] === 'object') {
        out[key] = this._mergeDeep(defaults[key], data[key]);
      } else {
        out[key] = data[key];
      }
    }
    return out;
  }
};
