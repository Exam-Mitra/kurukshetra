/* Global search + formula expression + recent queries */
const Search = {
  init(state) {
    this.state = state;
    const input = K.el('globalSearch');
    const box = K.el('searchResults');
    if (!input || !box) return;
    input.addEventListener('input', K.debounce(e => this.perform(e.target.value), 220));
    input.addEventListener('focus', () => {
      if (input.value.length >= 2) this.perform(input.value);
      else this.showRecent();
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('.search-wrap')) box.classList.add('hidden');
    });
  },

  remember(query) {
    const st = window.appState;
    if (!st || !query || query.length < 2) return;
    st.searchHistory = st.searchHistory || [];
    st.searchHistory = [query, ...st.searchHistory.filter(x => x !== query)].slice(0, 10);
    Storage.save(st);
  },

  showRecent() {
    const box = K.el('searchResults');
    const hist = window.appState?.searchHistory || [];
    if (!hist.length) return;
    box.innerHTML = `<div class="search-result muted"><b>Recent</b></div>` +
      hist.map(q => `<div class="search-result recent-q" data-q="${q.replace(/"/g, '&quot;')}">
        <span class="search-icon">🕐</span>
        <div class="search-info"><div class="search-title">${q}</div></div>
      </div>`).join('');
    box.classList.remove('hidden');
    box.querySelectorAll('.recent-q').forEach(el => {
      el.onclick = () => {
        K.el('globalSearch').value = el.dataset.q;
        this.perform(el.dataset.q);
      };
    });
  },

  perform(query) {
    const box = K.el('searchResults');
    if (!box) return;
    if (!query || query.length < 2) { this.showRecent(); return; }
    const results = this.search(query);
    this.remember(query);
    if (!results.length) {
      box.innerHTML = `<div class="search-result muted">No results for "${query}"</div>`;
      box.classList.remove('hidden');
      return;
    }
    box.innerHTML = results.map((r, i) => `
      <div class="search-result" data-i="${i}">
        <span class="search-icon">${r.icon}</span>
        <div class="search-info">
          <div class="search-title">${r.name}</div>
          <div class="search-meta">${r.meta || ''}</div>
        </div>
      </div>`).join('');
    box.classList.remove('hidden');
    box.querySelectorAll('.search-result[data-i]').forEach((el, i) => {
      el.onclick = () => {
        const r = results[i];
        box.classList.add('hidden');
        K.el('globalSearch').value = '';
        if (r.subject && r.chapterId) App.openChapter(r.subject, r.chapterId, r.tab || 'notes');
        else if (r.action) r.action();
      };
    });
  },

  search(query) {
    const q = query.toLowerCase().replace(/\s+/g, '');
    const qRaw = query.toLowerCase();
    const results = [];
    const syl = window.SYLLABUS || {};
    Object.keys(syl).forEach(subject => {
      (syl[subject].chapters || []).forEach(ch => {
        if ((ch.name || '').toLowerCase().includes(qRaw) || (ch.id || '').includes(qRaw)) {
          results.push({ type: 'chapter', subject, chapterId: ch.id, name: ch.name,
            icon: K.subjEmoji(subject), meta: K.subjName(subject) });
        }
      });
    });
    // Formula expression search (feature 25)
    (window.FORMULA_LIBRARY || []).forEach(f => {
      const hay = ((f.name || '') + ' ' + (f.formula || '') + ' ' + (f.proof || '')).toLowerCase();
      const compact = hay.replace(/\s+/g, '');
      if (hay.includes(qRaw) || compact.includes(q) ||
          (f.formula || '').toLowerCase().replace(/\s+/g, '').includes(q)) {
        results.push({
          type: 'formula', subject: f.subject, chapterId: f.chapterId, tab: 'cheatsheet',
          name: f.name, icon: '📋', meta: f.formula
        });
      }
    });
    const BV = window.BEST_VIDEOS || {};
    Object.keys(BV).forEach(subject => {
      Object.entries(BV[subject] || {}).forEach(([chId, video]) => {
        if ((video.title || '').toLowerCase().includes(qRaw) || (video.channel || '').toLowerCase().includes(qRaw)) {
          results.push({ type: 'video', subject, chapterId: chId, tab: 'video', name: video.title,
            icon: '🎥', meta: video.channel });
        }
      });
    });
    // dedupe by name+chapter
    const seen = new Set();
    return results.filter(r => {
      const k = r.type + r.name + (r.chapterId || '');
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    }).slice(0, 20);
  }
};
window.Search = Search;
