const Mistakes = {
  add(entry) {
    const st = window.appState;
    if (!st) return;
    st.mistakes = st.mistakes || [];
    st.mistakes.unshift({ ...entry, at: new Date().toISOString(), id: entry.id || ('m_' + Date.now()) });
    st.mistakes = st.mistakes.slice(0, 500);
    Storage.save(st);
  },

  render(container) {
    const el = container || K.el('view-mistakes');
    if (!el) return;
    const list = window.appState?.mistakes || [];
    el.innerHTML = `<div class="view-pad">
      <button class="btn-back" id="mkBack">← Home</button>
      <h1>❌ Mistakes Notebook</h1>
      <p class="muted">${list.length} wrong answers collected automatically from PYQs & Rapid Fire</p>
      <div class="mistakes-list">${list.map((m, i) => `
        <div class="mistake-card glass-card">
          <div class="q-top">
            <span class="q-badge">${K.subjEmoji(m.subject)} ${m.chapterId || ''}</span>
            <span class="q-badge">${m.at ? K.relativeDays(m.at.slice(0,10)) : ''}</span>
          </div>
          <div class="q-text">${m.q || ''}</div>
          <p><b class="bad">Your answer:</b> ${m.pickedLabel || m.picked}</p>
          <p><b class="ok">Correct:</b> ${m.correctLabel || m.answer}</p>
          ${m.solution ? `<div class="solution-box">${m.solution}</div>` : ''}
          <div class="q-actions">
            <button class="btn btn-sm btn-primary mk-open" data-s="${m.subject}" data-c="${m.chapterId}">Open chapter</button>
            <button class="btn btn-sm btn-danger mk-rm" data-i="${i}">Remove</button>
          </div>
        </div>`).join('') || '<p class="muted" style="padding:40px;text-align:center">No mistakes yet — keep practicing!</p>'}
      </div>
    </div>`;
    K.el('mkBack').onclick = () => App.goHome();
    el.querySelectorAll('.mk-open').forEach(b => b.onclick = () => {
      if (b.dataset.s && b.dataset.c) App.openChapter(b.dataset.s, b.dataset.c, 'pyqs');
    });
    el.querySelectorAll('.mk-rm').forEach(b => b.onclick = () => {
      const st = window.appState;
      st.mistakes.splice(+b.dataset.i, 1);
      Storage.save(st);
      this.render(el);
    });
  }
};
window.Mistakes = Mistakes;
