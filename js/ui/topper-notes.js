/* KURUKSHETRA V3 — Topper Notes */
const TopperNotes = {
  render(subject, chapterId, container) {
    const el = container || K.el('tabContent');
    if (!el) return;
    const content = (window.STUDY_CONTENT || {})[subject]?.[chapterId];
    const list = content?.topperNotes || [];
    if (!list.length) {
      el.innerHTML = `<div class="empty-state"><h2>📑 Topper Notes — Coming Soon</h2></div>`;
      return;
    }
    const cards = list.map((t, i) => `
      <div class="topper-card" data-idx="${i}">
        <div class="topper-thumb">${t.icon || '📑'}</div>
        <div class="topper-info">
          <div class="topper-title">${t.name}</div>
          <div class="topper-meta">Click to open</div>
        </div>
      </div>`).join('');
    el.innerHTML = `<h2>📑 Topper's Notes</h2>
      <div class="topper-grid">${cards}</div>`;
    el.querySelectorAll('.topper-card').forEach((c, i) => {
      c.onclick = () => FileViewer.open(list[i].name, list[i].url);
    });
  }
};
window.TopperNotes = TopperNotes;
