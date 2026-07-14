/* KURUKSHETRA V3 — Global search */
const Search = {
  init(state) {
    this.state = state;
    const input = K.el('globalSearch');
    const box = K.el('searchResults');
    if (!input || !box) return;
    let t;
    input.addEventListener('input', e => {
      clearTimeout(t);
      t = setTimeout(() => this.perform(e.target.value), 250);
    });
    input.addEventListener('focus', () => {
      if (input.value.length >= 2) this.perform(input.value);
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('.search-wrap')) box.classList.add('hidden');
    });
  },
  perform(query) {
    const box = K.el('searchResults');
    if (!box) return;
    if (!query || query.length < 2) { box.classList.add('hidden'); box.innerHTML = ''; return; }
    const results = this.search(query);
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
    box.querySelectorAll('.search-result').forEach((el, i) => {
      el.onclick = () => {
        const r = results[i];
        box.classList.add('hidden');
        K.el('globalSearch').value = '';
        if (r.subject && r.chapterId) App.openChapter(r.subject, r.chapterId);
      };
    });
  },
  search(query) {
    const q = query.toLowerCase();
    const results = [];
    const syl = window.SYLLABUS || {};
    Object.keys(syl).forEach(subject => {
      (syl[subject].chapters || []).forEach(ch => {
        if ((ch.name || '').toLowerCase().includes(q) || (ch.id || '').includes(q)) {
          results.push({ type: 'chapter', subject, chapterId: ch.id, name: ch.name,
            icon: K.subjEmoji(subject), meta: K.subjName(subject) });
        }
      });
    });
    const SC = window.STUDY_CONTENT || {};
    Object.keys(SC).forEach(subject => {
      Object.entries(SC[subject] || {}).forEach(([chId, content]) => {
        (content.cheatsheet || []).forEach(c => {
          if ((c.name || '').toLowerCase().includes(q) || (c.formula || '').toLowerCase().includes(q)) {
            results.push({ type: 'formula', subject, chapterId: chId, name: c.name,
              icon: '📋', meta: c.formula });
          }
        });
      });
    });
    const BV = window.BEST_VIDEOS || {};
    Object.keys(BV).forEach(subject => {
      Object.entries(BV[subject] || {}).forEach(([chId, video]) => {
        if ((video.title || '').toLowerCase().includes(q) || (video.channel || '').toLowerCase().includes(q)) {
          results.push({ type: 'video', subject, chapterId: chId, name: video.title,
            icon: '🎥', meta: video.channel });
        }
      });
    });
    return results.slice(0, 20);
  }
};
window.Search = Search;
