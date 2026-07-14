/* ============================================
   KURUKSHETRA V3 — Simplified Storage
   Progress only — no game mechanics
   ============================================ */

const Storage = {
  KEY: 'kurukshetra_v3',

  defaultState() {
    return {
      warrior: { name: 'Scholar', bookmarkedChapters: [] },
      progress: { physics: {}, chemistry: {}, maths: {} },
      questionHistory: {},
      bookmarks: [],
      notes: {},
      settings: { theme: 'dark', fontSize: 'medium' },
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

  export(state) {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kurukshetra_backup_${K.todayKey()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    K.toast('📤 Data exported!');
  },

  import(file, cb) {
    const r = new FileReader();
    r.onload = (e) => {
      try {
        const d = JSON.parse(e.target.result);
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
