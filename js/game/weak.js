/* ============================================
   KURUKSHETRA — Weakness Vault
   Auto-tag weak topics + force revision
   ============================================ */

const Weak = {
  render(state) {
    const list = K.el('weakList');
    if (!state.weak || state.weak.length === 0) {
      list.innerHTML = '<p class="empty-msg">No weak topics yet. Keep fighting! 💪</p>';
      K.el('weakCount').textContent = '0 weak topics';
      return;
    }

    // Sort by mistake count (most weak first)
    const sorted = [...state.weak].sort((a, b) => b.mistakeCount - a.mistakeCount);
    K.el('weakCount').textContent = `${sorted.length} weak topic${sorted.length !== 1 ? 's' : ''}`;

    list.innerHTML = '';
    sorted.slice(0, 10).forEach(w => {
      const subj = w.subject;
      const chapterData = this._getChapterData(subj, w.chapter);
      const chapterName = chapterData ? chapterData.name : w.chapter;
      const row = K.create('div', { class: 'weak-item' });
      row.innerHTML = `
        <div>
          <div style="font-weight:700;">${K.subjEmoji(subj)} ${chapterName}</div>
          <div style="font-size:0.8em; color:var(--text-muted);">${w.mistakeCount} mistake${w.mistakeCount !== 1 ? 's' : ''} · last: ${K.formatDate(w.lastWrong)}</div>
        </div>
        <button>Practice Now</button>
      `;
      row.querySelector('button').onclick = () => {
        Questions.startSession(state, subj, w.chapter, 'practice');
      };
      list.appendChild(row);
    });
  },

  // Get weak topics that need force-revision (≥3 mistakes in 7 days)
  needsForceRevision(state) {
    const sevenDaysAgo = K.daysAgo(7);
    return (state.weak || []).filter(w => {
      return w.mistakeCount >= 3 && w.lastWrong >= sevenDaysAgo;
    });
  },

  _getChapterData(subject, chapterId) {
    if (subject === 'physics') return PHYSICS_DATA[chapterId];
    if (subject === 'chemistry') return CHEMISTRY_DATA[chapterId];
    if (subject === 'maths') return MATHS_DATA[chapterId];
    return null;
  }
};
