const Papers = {
  render(container) {
    const el = container || K.el('view-papers');
    if (!el) return;
    const papers = window.JEE_PAPERS || [];
    el.innerHTML = `<div class="view-pad">
      <button class="btn-back" id="jpBack">← Home</button>
      <h1>📄 JEE Papers Archive</h1>
      <p class="muted">JEE Main & Advanced 2015–2024 · via Examside</p>
      <div class="papers-list">${papers.slice().reverse().map(p => `
        <div class="paper-year glass-card">
          <h2>${p.year}</h2>
          <div class="paper-cols">
            <div>
              <h3>JEE Main</h3>
              ${p.mains.map(l => `<a class="paper-link" href="${l.url}" target="_blank" rel="noopener">${l.name} ↗</a>`).join('')}
            </div>
            <div>
              <h3>JEE Advanced</h3>
              ${p.advanced.map(l => `<a class="paper-link" href="${l.url}" target="_blank" rel="noopener">${l.name} ↗</a>`).join('')}
            </div>
          </div>
        </div>`).join('')}
      </div>
    </div>`;
    K.el('jpBack').onclick = () => App.goHome();
  }
};
window.Papers = Papers;
