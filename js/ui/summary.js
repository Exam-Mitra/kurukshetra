/* KURUKSHETRA V3 — Summary */
const Summary = {
  render(subject, chapterId, container) {
    const el = container || K.el('tabContent');
    if (!el) return;
    const content = (window.STUDY_CONTENT || {})[subject]?.[chapterId];
    const points = content?.summary || [];
    if (!points.length) {
      el.innerHTML = `<div class="empty-state"><h2>🎯 Summary — Coming Soon</h2></div>`;
      return;
    }
    const items = points.map(p => `
      <div class="summary-item"><span class="summary-bullet">▸</span><span>${p}</span></div>`).join('');
    el.innerHTML = `<h2>🎯 Quick Summary</h2>
      <p class="muted">Revision in 5 minutes — all key points</p>
      <div class="summary-list">${items}</div>`;
  }
};
window.Summary = Summary;
