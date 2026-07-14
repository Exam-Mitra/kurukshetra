/* KURUKSHETRA V3 — Cheat Sheet */
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
    const cards = items.map((item, i) => `
      <div class="cheat-card" data-formula="${this._esc(item.formula)}" title="Click to copy">
        <div class="cheat-num">${i + 1}</div>
        <div class="cheat-body">
          <div class="cheat-name">${item.name}</div>
          <div class="cheat-formula">${item.formula}</div>
          ${item.proof ? `<div class="cheat-proof">${item.proof}</div>` : ''}
        </div>
      </div>`).join('');
    el.innerHTML = `<div class="cheat-head"><h2>📋 Cheat Sheet</h2>
      <p class="muted">Click any card to copy the formula</p></div>
      <div class="cheat-grid">${cards}</div>`;
    el.querySelectorAll('.cheat-card').forEach(c => {
      c.onclick = () => {
        navigator.clipboard?.writeText(c.dataset.formula || '');
        K.toast('📋 Copied!');
      };
    });
  },
  _esc(s) { return String(s || '').replace(/"/g, '&quot;'); }
};
window.CheatSheet = CheatSheet;
