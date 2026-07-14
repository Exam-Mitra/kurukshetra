/* KURUKSHETRA V3.1 — Cheat Sheet with formula stars */
const CheatSheet = {
  render(subject, chapterId, container) {
    const el = container || K.el('tabContent');
    if (!el) return;
    const content = (window.STUDY_CONTENT || {})[subject]?.[chapterId];
    const items = content?.cheatsheet || [];
    if (!items.length) {
      el.innerHTML = `<div class="empty-state"><h2>📋 Cheat Sheet — Coming Soon</h2></div>`;
      return;
    }
    const cards = items.map((item, i) => {
      const fid = `${subject}_${chapterId}_f${i}`;
      const star = FormulaLibrary.isStarred(fid);
      return `
      <div class="cheat-card" data-formula="${this._esc(item.formula)}" data-fid="${fid}">
        <div class="cheat-num">${i + 1}</div>
        <div class="cheat-body">
          <div class="cheat-name">${item.name}</div>
          <div class="cheat-formula">${item.formula}</div>
          ${item.proof ? `<div class="cheat-proof">${item.proof}</div>` : ''}
        </div>
        <button class="star-btn ${star ? 'on' : ''}" data-star="${fid}" title="Bookmark formula">${star ? '★' : '☆'}</button>
      </div>`;
    }).join('');
    el.innerHTML = `<div class="cheat-head"><h2>📋 Cheat Sheet</h2>
      <p class="muted">Click formula to copy · star to save · print for PDF</p>
      <button class="btn btn-sm" id="csPrint">🖨️ Export / Print</button>
      </div>
      <div class="cheat-grid">${cards}</div>`;
    el.querySelectorAll('.cheat-card').forEach(c => {
      c.onclick = (e) => {
        if (e.target.closest('[data-star]')) return;
        navigator.clipboard?.writeText(c.dataset.formula || '');
        K.toast('📋 Copied!');
      };
    });
    el.querySelectorAll('[data-star]').forEach(b => {
      b.onclick = (e) => {
        e.stopPropagation();
        FormulaLibrary.toggleStar(b.dataset.star);
        this.render(subject, chapterId, el);
      };
    });
    K.el('csPrint')?.addEventListener('click', () => {
      document.body.classList.add('print-cheatsheet');
      window.print();
      setTimeout(() => document.body.classList.remove('print-cheatsheet'), 500);
    });
  },
  _esc(s) { return String(s || '').replace(/"/g, '&quot;'); }
};
window.CheatSheet = CheatSheet;
