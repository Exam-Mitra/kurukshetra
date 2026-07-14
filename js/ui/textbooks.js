const Textbooks = {
  render(container) {
    const el = container || K.el('view-textbooks');
    if (!el) return;
    const st = window.appState;
    const books = window.TEXTBOOK_LIBRARY?.books || [];
    const chapters = [];
    ['physics','chemistry','maths'].forEach(subj => {
      (SYLLABUS[subj]?.chapters || []).forEach(ch => {
        const res = (window.BEST_RESOURCES?.[subj]?.[ch.id] || []).find(r => r.type === 'pdf');
        if (res) chapters.push({ ...res, subject: subj, chapterId: ch.id, chapterName: ch.name });
      });
    });
    el.innerHTML = `<div class="view-pad">
      <button class="btn-back" id="tbBack">← Home</button>
      <h1>📘 PDF Textbook Library</h1>
      <h2 class="section-title">Full NCERT books</h2>
      <div class="resource-list">${books.map((b,i) => {
        const last = st.pdfLastViewed?.[b.url];
        return `<div class="resource-item">
          <div class="resource-icon">${b.icon}</div>
          <div class="resource-info">
            <div class="resource-name">${b.name}</div>
            <div class="resource-desc">${last ? 'Last viewed ' + K.relativeDays(last) : 'Not opened yet'}</div>
          </div>
          <button class="btn btn-primary btn-sm tb-open" data-i="${i}">Open</button>
        </div>`;
      }).join('')}</div>
      <h2 class="section-title">Chapter-wise NCERT PDFs</h2>
      <div class="resource-list" id="tbChapters">${chapters.map((c,i) => {
        const last = st.pdfLastViewed?.[c.url];
        return `<div class="resource-item">
          <div class="resource-icon">${K.subjEmoji(c.subject)}</div>
          <div class="resource-info">
            <div class="resource-name">${c.chapterName}</div>
            <div class="resource-desc">${K.subjName(c.subject)}${last ? ' · Last viewed ' + K.relativeDays(last) : ''}</div>
          </div>
          <button class="btn btn-primary btn-sm tb-ch" data-i="${i}">Open PDF</button>
        </div>`;
      }).join('')}</div>
    </div>`;
    K.el('tbBack').onclick = () => App.goHome();
    el.querySelectorAll('.tb-open').forEach(btn => {
      btn.onclick = () => {
        const b = books[+btn.dataset.i];
        st.pdfLastViewed = st.pdfLastViewed || {};
        st.pdfLastViewed[b.url] = new Date().toISOString();
        Storage.save(st);
        window.open(b.url, '_blank', 'noopener');
      };
    });
    el.querySelectorAll('.tb-ch').forEach(btn => {
      btn.onclick = () => {
        const c = chapters[+btn.dataset.i];
        st.pdfLastViewed = st.pdfLastViewed || {};
        st.pdfLastViewed[c.url] = new Date().toISOString();
        Storage.save(st);
        FileViewer.open(c.name || c.chapterName, c.url);
      };
    });
  }
};
window.Textbooks = Textbooks;
