/* Notes tab + NCERT page refs + reading mode */
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
    const pages = window.NCERT_PAGES?.[subject]?.[chapterId] || [];
    const pageHtml = pages.length ? `
      <div class="ncert-refs glass-card">
        <h3>📘 NCERT Page References</h3>
        <ul>${pages.map(p => {
          const pdf = (window.BEST_RESOURCES?.[subject]?.[chapterId] || []).find(r => r.type === 'pdf');
          const start = (p.pages || '').split('-')[0];
          return `<li>
            <b>${p.topic}</b>: NCERT p. ${p.pages}
            ${pdf ? `<button class="btn btn-sm ncert-jump" data-url="${pdf.url}" data-page="${start}">Open PDF</button>` : ''}
          </li>`;
        }).join('')}</ul>
      </div>` : '';

    el.innerHTML = `
      <div class="notes-toolbar">
        <button class="btn btn-sm" id="readingModeBtn">📖 Reading mode</button>
        <button class="btn btn-sm" id="exportChapterBtn">🖨️ Export chapter PDF</button>
      </div>
      ${pageHtml}
      <div class="notes-content" id="notesContent">${content.notesHtml}</div>`;
    this._enhance();
    K.el('readingModeBtn')?.addEventListener('click', () => App.enterReadingMode());
    K.el('exportChapterBtn')?.addEventListener('click', () => App.exportChapterPDF(subject, chapterId));
    el.querySelectorAll('.ncert-jump').forEach(b => {
      b.onclick = () => {
        const st = window.appState;
        st.pdfLastViewed = st.pdfLastViewed || {};
        st.pdfLastViewed[b.dataset.url] = new Date().toISOString();
        Storage.save(st);
        // PDF page deep-link (#page=N) works in many viewers
        FileViewer.open('NCERT', b.dataset.url + '#page=' + (b.dataset.page || '1'));
      };
    });
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
