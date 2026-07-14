/* 9th tab — NCERT exercise solutions */
const NcertSolutions = {
  render(subject, chapterId, container) {
    const el = container || K.el('tabContent');
    if (!el) return;
    const ch = SYLLABUS[subject]?.chapters?.find(c => c.id === chapterId);
    const name = ch?.name || chapterId;
    const resources = (window.BEST_RESOURCES || {})[subject]?.[chapterId] || [];
    const vedantu = resources.find(r => (r.url || '').includes('vedantu.com'));
    const archive = resources.find(r => (r.url || '').includes('archive.org'));
    const pyq = resources.find(r => (r.url || '').includes('examside.com'));
    const links = [
      {
        name: vedantu?.name || `Vedantu — ${name} Solutions`,
        url: vedantu?.url || `https://www.vedantu.com/ncert-solutions/ncert-solutions-class-11-${subject === 'maths' ? 'maths' : subject}`,
        icon: '📘'
      },
      {
        name: archive?.name || 'NCERT Official Textbook Selector',
        url: archive?.url || 'https://ncert.nic.in/textbook.php',
        icon: '🏛️'
      },
      {
        name: pyq?.name || `Examside JEE PYQs — ${name}`,
        url: pyq?.url || 'https://www.examside.com/exam/jee-main',
        icon: '📝'
      }
    ];
    el.innerHTML = `
      <h2>📗 NCERT Solutions</h2>
      <p class="muted">Exercise solutions, NCERT book mirrors, and PYQs for <b>${name}</b>.</p>
      <div class="resource-list">${links.map((l, i) => `
        <div class="resource-item">
          <div class="resource-icon">${l.icon}</div>
          <div class="resource-info">
            <div class="resource-name">${l.name}</div>
            <div class="resource-desc">Verified replacement for old NCERT/LearnCBSE links</div>
          </div>
          <button class="btn btn-primary btn-sm ns-open" data-i="${i}">Open ↗</button>
          <button class="btn btn-sm ns-preview" data-i="${i}">Preview</button>
        </div>`).join('')}
      </div>`;
    el.querySelectorAll('.ns-open').forEach(b => {
      b.onclick = () => {
        const l = links[+b.dataset.i];
        window.open(l.url, '_blank', 'noopener');
      };
    });
    el.querySelectorAll('.ns-preview').forEach(b => {
      b.onclick = () => {
        const l = links[+b.dataset.i];
        FileViewer.open(l.name, l.url);
      };
    });
  }
};
window.NcertSolutions = NcertSolutions;
