/* ============================================
   KURUKSHETRA V3.1 — Storage (features-aware)
   ============================================ */

const Storage = {
  KEY: 'kurukshetra_v3',

  defaultState() {
    return {
      warrior: { name: 'Scholar', bookmarkedChapters: [] },
      progress: { physics: {}, chemistry: {}, maths: {} },
      // progress[s][ch] = {
      //   notesViewed, mindMapViewed, cheatSheetViewed, summaryViewed, videoWatched,
      //   pyqsAttempted, pyqsCorrect, lastVisited, lastTab, lastVisitedAt,
      //   difficultyRating (1-5), confidence (0-5), notesHtml flag via notes{}
      //   studySeconds: { notes:0, ... total:0 }
      // }
      questionHistory: {},
      // questionHistory[qid] = { subject, chapterId, seen, correct, wrong, lastSeen, nextReview, interval, ease, bookmarked }
      bookmarks: [],
      formulaBookmarks: [], // formula ids
      questionBookmarks: [], // question ids
      notes: {}, // `${subject}:${chapterId}` -> text
      mistakes: [], // { id, subject, chapterId, q, options, picked, answer, solution, at }
      srs: { queue: [] },
      studyLog: {}, // YYYY-MM-DD -> { seconds, subjects: {physics: s}, opens: n }
      studyStreak: { current: 0, best: 0, lastDay: null },
      searchHistory: [],
      pdfLastViewed: {}, // url -> ISO date
      activePlan: null, // { id, started, completed: [] }
      lastResume: null, // { subject, chapterId, tab, at }
      settings: {
        theme: 'dark', // dark | light | auto | sepia
        fontSize: 'medium',
        accent: '#6366f1',
        lastBackupReminder: null
      },
      timeOfDayStats: {}, // hour -> { attempts, correct }
      importVersion: 3
    };
  },

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) return this.defaultState();
      return this._mergeDeep(this.defaultState(), JSON.parse(raw));
    } catch (e) {
      return this.defaultState();
    }
  },

  save(state) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      return false;
    }
  },

  reset() {
    localStorage.removeItem(this.KEY);
    return this.defaultState();
  },

  export(state, filename) {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || `kurukshetra_backup_${K.todayKey()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    K.toast('📤 Data exported!');
  },

  exportBookmarks(state) {
    const data = {
      type: 'kurukshetra_bookmarks',
      version: 1,
      bookmarks: state.bookmarks || [],
      formulaBookmarks: state.formulaBookmarks || [],
      questionBookmarks: state.questionBookmarks || [],
      warrior: { bookmarkedChapters: state.warrior?.bookmarkedChapters || [] }
    };
    this.export(data, `kurukshetra_bookmarks_${K.todayKey()}.json`);
  },

  import(file, cb) {
    const r = new FileReader();
    r.onload = (e) => {
      try {
        const d = JSON.parse(e.target.result);
        if (d.type === 'kurukshetra_bookmarks') {
          const st = this.load();
          st.bookmarks = d.bookmarks || [];
          st.formulaBookmarks = d.formulaBookmarks || [];
          st.questionBookmarks = d.questionBookmarks || [];
          st.warrior = st.warrior || {};
          st.warrior.bookmarkedChapters = d.warrior?.bookmarkedChapters || [];
          this.save(st);
          cb(st);
          K.toast('📥 Bookmarks imported!');
          return;
        }
        if (d.progress) {
          this.save(d);
          cb(d);
          K.toast('📥 Data imported!');
        } else K.toast('❌ Invalid file');
      } catch (err) {
        K.toast('❌ Failed to parse');
      }
    };
    r.readAsText(file);
  },

  _mergeDeep(d, data) {
    if (typeof d !== 'object' || d === null || Array.isArray(d)) return data;
    const out = { ...d };
    for (const k in data) {
      out[k] = (typeof data[k] === 'object' && data[k] !== null && !Array.isArray(data[k]) && typeof d[k] === 'object')
        ? this._mergeDeep(d[k], data[k])
        : data[k];
    }
    return out;
  }
};

window.Storage = Storage;
