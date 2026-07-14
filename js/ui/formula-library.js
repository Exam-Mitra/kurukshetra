/* Global Formula Library + formula of the day + bookmarks */
const FormulaLibrary = {
  all() { return window.FORMULA_LIBRARY || []; },

  isStarred(id) {
    return (window.appState?.formulaBookmarks || []).includes(id);
  },

  toggleStar(id) {
    const st = window.appState;
    if (!st) return;
    st.formulaBookmarks = st.formulaBookmarks || [];
    const i = st.formulaBookmarks.indexOf(id);
    if (i >= 0) st.formulaBookmarks.splice(i, 1);
    else st.formulaBookmarks.push(id);
    Storage.save(st);
    K.toast(i >= 0 ? 'Removed formula bookmark' : '⭐ Formula bookmarked');
  },

  formulaOfDay() {
    const list = this.all();
    if (!list.length) return null;
    const key = K.todayKey().replace(/-/g, '');
    const idx = parseInt(key, 10) % list.length;
    return list[idx];
  },

  counts(st) {
    const total = window.FORMULA_COUNTS || { physics: 0, chemistry: 0, maths: 0 };
    const starred = st?.formulaBookmarks || [];
    const bySubj = { physics: 0, chemistry: 0, maths: 0 };
    this.all().forEach(f => {
      if (starred.includes(f.id)) bySubj[f.subject] = (bySubj[f.subject] || 0) + 1;
    });
    return { total, starred: bySubj, starredTotal: starred.length };
  },

  render(container) {
    const el = container || K.el('view-formulas');
    if (!el) return;
    el.innerHTML = K.skeleton(6);
    setTimeout(() => this._paint(el), 40);
  },

  _paint(el) {
    const st = window.appState;
    const counts = this.counts(st);
    let filter = 'all';
    let q = '';
    let onlyStarred = false;

    const paint = () => {
      let list = this.all();
      if (filter !== 'all') list = list.filter(f => f.subject === filter);
      if (onlyStarred) list = list.filter(f => this.isStarred(f.id));
      if (q) {
        const s = q.toLowerCase();
        list = list.filter(f =>
          (f.name || '').toLowerCase().includes(s) ||
          (f.formula || '').toLowerCase().includes(s) ||
          (f.proof || '').toLowerCase().includes(s) ||
          (f.chapterName || '').toLowerCase().includes(s)
        );
      }
      el.innerHTML = `
        <div class="view-pad">
          <button class="btn-back" id="flBack">← Home</button>
          <h1>📐 Global Formula Library</h1>
          <p class="muted">${this.all().length} formulas across 40 chapters · ${counts.starredTotal} starred</p>
          <div class="formula-stats-row">
            <span class="chip">⚛️ Physics: ${counts.total.physics} <small>(★ ${counts.starred.physics || 0})</small></span>
            <span class="chip">🧪 Chemistry: ${counts.total.chemistry} <small>(★ ${counts.starred.chemistry || 0})</small></span>
            <span class="chip">📐 Maths: ${counts.total.maths} <small>(★ ${counts.starred.maths || 0})</small></span>
          </div>
          <div class="toolbar-row">
            <input type="search" id="flSearch" placeholder="Search name or expression e.g. u²sin2θ/g or [M L T" value="${q.replace(/"/g,'&quot;')}" />
            <select id="flFilter">
              <option value="all" ${filter==='all'?'selected':''}>All subjects</option>
              <option value="physics" ${filter==='physics'?'selected':''}>Physics</option>
              <option value="chemistry" ${filter==='chemistry'?'selected':''}>Chemistry</option>
              <option value="maths" ${filter==='maths'?'selected':''}>Maths</option>
            </select>
            <label class="check-label"><input type="checkbox" id="flStarred" ${onlyStarred?'checked':''}/> Starred only</label>
          </div>
          <div class="cheat-grid" id="flGrid">
            ${list.slice(0, 200).map(f => `
              <div class="cheat-card formula-lib-card" data-id="${f.id}">
                <button class="star-btn ${this.isStarred(f.id)?'on':''}" data-star="${f.id}" title="Bookmark formula">${this.isStarred(f.id)?'★':'☆'}</button>
                <div class="cheat-body">
                  <div class="cheat-name">${f.name}</div>
                  <div class="cheat-formula">${f.formula}</div>
                  <div class="cheat-proof">${K.subjEmoji(f.subject)} ${f.chapterName}${f.proof ? ' · ' + f.proof : ''}</div>
                </div>
                <div class="card-actions">
                  <button class="btn btn-sm fl-copy" data-f="${encodeURIComponent(f.formula)}">Copy</button>
                  <button class="btn btn-sm btn-primary fl-open" data-s="${f.subject}" data-c="${f.chapterId}">Open</button>
                </div>
              </div>`).join('') || '<p class="muted">No formulas match.</p>'}
          </div>
          ${list.length > 200 ? `<p class="muted">Showing 200 of ${list.length}. Refine search.</p>` : ''}
        </div>`;
      K.el('flBack').onclick = () => App.goHome();
      K.el('flSearch').oninput = K.debounce(e => { q = e.target.value; paint(); }, 200);
      K.el('flFilter').onchange = e => { filter = e.target.value; paint(); };
      K.el('flStarred').onchange = e => { onlyStarred = e.target.checked; paint(); };
      el.querySelectorAll('[data-star]').forEach(b => b.onclick = (e) => {
        e.stopPropagation();
        this.toggleStar(b.dataset.star);
        paint();
      });
      el.querySelectorAll('.fl-copy').forEach(b => b.onclick = () => {
        navigator.clipboard?.writeText(decodeURIComponent(b.dataset.f));
        K.toast('📋 Copied!');
      });
      el.querySelectorAll('.fl-open').forEach(b => b.onclick = () => {
        App.openChapter(b.dataset.s, b.dataset.c, 'cheatsheet');
      });
    };
    paint();
  },

  renderMyFormulas(container) {
    const el = container || K.el('view-my-formulas');
    if (!el) return;
    const ids = new Set(window.appState?.formulaBookmarks || []);
    const list = this.all().filter(f => ids.has(f.id));
    el.innerHTML = `<div class="view-pad">
      <button class="btn-back" id="mfBack">← Home</button>
      <h1>⭐ My Formulas</h1>
      <p class="muted">${list.length} starred formulas</p>
      <div class="cheat-grid">${list.map(f => `
        <div class="cheat-card">
          <div class="cheat-body">
            <div class="cheat-name">${f.name}</div>
            <div class="cheat-formula">${f.formula}</div>
            <div class="cheat-proof">${f.chapterName}</div>
          </div>
          <button class="btn btn-sm btn-primary" data-s="${f.subject}" data-c="${f.chapterId}">Open</button>
        </div>`).join('') || '<p class="muted">Star formulas from the library or cheat sheets.</p>'}
      </div></div>`;
    K.el('mfBack').onclick = () => App.goHome();
    el.querySelectorAll('[data-s]').forEach(b => b.onclick = () => App.openChapter(b.dataset.s, b.dataset.c, 'cheatsheet'));
  }
};
window.FormulaLibrary = FormulaLibrary;
