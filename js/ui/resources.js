/* KURUKSHETRA V3 — Resources tab */
const Resources = {
  render(subject, chapterId, container) {
    const el = container || K.el('tabContent');
    if (!el) return;
    const list = (window.BEST_RESOURCES || {})[subject]?.[chapterId] || [];
    if (!list.length) {
      el.innerHTML = `<div class="empty-state"><h2>🔗 Resources — Coming Soon</h2></div>`;
      return;
    }
    const items = list.map((r, i) => `
      <div class="resource-item" data-idx="${i}">
        <div class="resource-icon">${r.icon || '🔗'}</div>
        <div class="resource-info">
          <div class="resource-name">${r.name}</div>
          <div class="resource-desc">${r.type === 'pdf' ? 'PDF document' : 'Web resource'}</div>
        </div>
        <button class="btn btn-primary btn-sm res-open">Open →</button>
      </div>`).join('');
    el.innerHTML = `<h2>🔗 Best Free Resources</h2>
      <p class="muted">NCERT, PW, PYQs, and solutions</p>
      <div class="resource-list">${items}</div>`;
    el.querySelectorAll('.resource-item').forEach((row, i) => {
      row.querySelector('.res-open').onclick = () => {
        const r = list[i];
        if (r.type === 'pdf') FileViewer.open(r.name, r.url);
        else window.open(r.url, '_blank', 'noopener');
      };
    });
  }
};
window.Resources = Resources;
