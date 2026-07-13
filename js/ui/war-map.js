/* ============================================
   KURUKSHETRA — War Map
   Visual chapter progress
   ============================================ */

const WarMap = {
  renderMini(state) {
    const cont = K.el('warMapMini');
    if (!cont) return;
    cont.innerHTML = '';

    let chapterIdx = 0;
    ['physics', 'chemistry', 'maths'].forEach(subj => {
      SYLLABUS[subj].chapters.forEach(ch => {
        chapterIdx++;
        const p = state.progress[subj][ch.id];
        const isFirst = chapterIdx === 1;
        const prevChapterId = this._prevChapter(chapterIdx);
        const prevDone = prevChapterId ? this._isDone(state, prevChapterId) : true;
        const isLocked = !isFirst && !prevDone;

        let cls = 'warmap-cell';
        if (isLocked) cls += ' locked';
        else if (p && p.done) cls += ' done';
        else if (p && p.total > 0) cls += ' partial';

        const cell = K.create('div', { class: cls, title: `${K.subjName(subj)}: ${ch.name}` });
        cell.textContent = ch.name.split(' ')[0].slice(0, 6);
        if (!isLocked) {
          cell.onclick = () => {
            appState.currentSubject = subj;
            appState.currentChapter = ch.id;
            ChapterView.open(state, subj, ch.id);
          };
        }
        cont.appendChild(cell);
      });
    });
  },

  _prevChapter(idx) {
    // Linear order: all physics, then chemistry, then maths
    if (idx <= 1) return null;
    const order = [
      ...SYLLABUS.physics.chapters.map(c => ({ sub: 'physics', id: c.id })),
      ...SYLLABUS.chemistry.chapters.map(c => ({ sub: 'chemistry', id: c.id })),
      ...SYLLABUS.maths.chapters.map(c => ({ sub: 'maths', id: c.id }))
    ];
    return idx - 2 < order.length ? order[idx - 2] : null;
  },

  _isDone(state, prev) {
    const p = state.progress[prev.sub][prev.id];
    return p && (p.done || (p.total > 0 && (p.correct / p.total) >= 0.7));
  },

  openFull(state) {
    K.modal(`
      <h2>🗺️ Full War Map</h2>
      <p style="color:var(--text-secondary); margin:8px 0;">Tap a chapter to begin. Must complete previous chapter first.</p>
      <div class="warmap-mini" style="grid-template-columns:repeat(auto-fill, minmax(80px,1fr));">
        ${['physics', 'chemistry', 'maths'].map(subj => {
          return SYLLABUS[subj].chapters.map(ch => {
            const p = state.progress[subj][ch.id];
            const cls = p && p.done ? 'done' : p && p.total > 0 ? 'partial' : '';
            return `<div class="warmap-cell ${cls}" data-sub="${subj}" data-ch="${ch.id}">
              <div style="font-size:1.4em;">${K.subjEmoji(subj)}</div>
              <div style="font-size:0.7em;">${ch.name}</div>
            </div>`;
          }).join('');
        }).join('')}
      </div>
      <button class="btn-primary" style="margin-top:14px;" onclick="K.closeModal()">Close</button>
    `);
    K.el('modalContent').qsa = K.el('modalContent').querySelectorAll.bind(K.el('modalContent'));
    K.el('modalContent').querySelectorAll('.warmap-cell').forEach(c => {
      if (!c.classList.contains('locked')) {
        c.onclick = () => {
          K.closeModal();
          appState.currentSubject = c.dataset.sub;
          appState.currentChapter = c.dataset.ch;
          ChapterView.open(state, c.dataset.sub, c.dataset.ch);
        };
      }
    });
  }
};
