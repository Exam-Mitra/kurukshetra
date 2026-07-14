/* 9th tab — NCERT exercise solutions */
const NcertSolutions = {
  render(subject, chapterId, container) {
    const el = container || K.el('tabContent');
    if (!el) return;
    const ch = SYLLABUS[subject]?.chapters?.find(c => c.id === chapterId);
    const name = ch?.name || chapterId;
    const num = parseInt(String(chapterId).replace(/\D/g, ''), 10) || 1;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const subjSlug = subject === 'maths' ? 'maths' : subject;
    const links = [
      {
        name: `LearnCBSE — ${name} Solutions`,
        url: `https://www.learncbse.in/ncert-solutions-class-11-${subjSlug}-chapter-${num}-${slug}/`,
        icon: '📘'
      },
      {
        name: 'NCERT Official Textbooks',
        url: 'https://ncert.nic.in/textbook.php',
        icon: '🏫'
      },
      {
        name: `Examside JEE PYQs — ${name}`,
        url: (window.BEST_RESOURCES?.[subject]?.[chapterId] || []).find(r => (r.url || '').includes('examside'))?.url
          || `https://www.examside.com/exam/jee-main`,
        icon: '📝'
      }
    ];
    el.innerHTML = `
      <h2>📗 NCERT Solutions</h2>
      <p class="muted">Exercise solutions and official textbook links for <b>${name}</b>.</p>
      <div class="resource-list">${links.map((l, i) => `
        <div class="resource-item">
          <div class="resource-icon">${l.icon}</div>
          <div class="resource-info">
            <div class="resource-name">${l.name}</div>
            <div class="resource-desc">Opens in new tab / viewer</div>
          </div>
          <button class="btn btn-primary btn-sm ns-open" data-i="${i}">Open →</button>
        </div>`).join('')}
      </div>`;
    el.querySelectorAll('.ns-open').forEach(b => {
      b.onclick = () => {
        const l = links[+b.dataset.i];
        if ((l.url || '').endsWith('.pdf')) FileViewer.open(l.name, l.url);
        else window.open(l.url, '_blank', 'noopener');
      };
    });
  }
};
window.NcertSolutions = NcertSolutions;
