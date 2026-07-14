/* KURUKSHETRA V3 — Notes tab */
const Notes = {
  render(subject, chapterId, container) {
    const el = container || K.el('tabContent');
    if (!el) return;
    const content = (window.STUDY_CONTENT || {})[subject]?.[chapterId];
    if (!content || !content.notesHtml) {
      el.innerHTML = `<div class="empty-state"><h2>📖 Notes — Coming Soon</h2>
        <p>Check Cheat Sheet, Summary, and Best Video tabs.</p></div>`;
      return;
    }
    el.innerHTML = `<div class="notes-content">${content.notesHtml}</div>`;
    this._enhance();
  },
  _enhance() {
    K.qsa('.formula').forEach(f => {
      f.style.cursor = 'pointer';
      f.title = 'Click to copy';
      f.onclick = () => {
        navigator.clipboard?.writeText(f.textContent.trim());
        K.toast('📋 Formula copied!');
      };
    });
  }
};
window.Notes = Notes;
