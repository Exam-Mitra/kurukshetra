/* ============================================
   KURUKSHETRA — Tricks & Cheat Sheets
   Locked until unlocked through questions
   ============================================ */

const Tricks = {
  // Render tricks inventory
  renderInventory(state) {
    const cont = K.el('tricksInventory');
    cont.innerHTML = '';

    // Group by subject
    ['physics', 'chemistry', 'maths'].forEach(subj => {
      const subjName = K.subjName(subj);
      const subjEmoji = K.subjEmoji(subj);
      const tricks = Object.entries(state.tricks).filter(([_, t]) => t.subject === subj);

      if (tricks.length > 0) {
        const header = K.create('h2', { style: 'grid-column:1/-1; margin-top:20px; color:var(--accent-gold);' }, `${subjEmoji} ${subjName} Tricks`);
        cont.appendChild(header);
        tricks.forEach(([id, t]) => {
          const card = K.create('div', { class: 'inv-trick' });
          card.innerHTML = `
            <h4>🪄 ${t.name}</h4>
            <p>${t.body || t.text || ''}</p>
            ${t.when ? `<div class="inv-meta"><b>Use when:</b> ${t.when}</div>` : ''}
            <div class="inv-meta">Unlocked: ${K.formatDate(t.unlockedAt)}</div>
          `;
          cont.appendChild(card);
        });
      }
    });

    if (Object.keys(state.tricks).length === 0) {
      cont.innerHTML = '<p class="empty-msg" style="grid-column:1/-1;">No tricks unlocked yet. Solve questions to unlock them! 🔓</p>';
    }
  },

  // Render tricks for a chapter (in chapter view)
  renderChapterTricks(state, subject, chapterId) {
    const chapterData = this._getChapterData(subject, chapterId);
    if (!chapterData || !chapterData.tricks) {
      return '<p class="empty-msg">No tricks for this chapter yet. Solve questions to unlock them!</p>';
    }
    let html = '';
    chapterData.tricks.forEach(trick => {
      const unlocked = state.tricks[trick.id];
      if (unlocked) {
        html += `
          <div class="trick-card">
            <h4>🪄 ${trick.name}</h4>
            <div class="trick-body">${trick.body}</div>
            <div class="trick-when"><b>Use when:</b> ${trick.when}</div>
          </div>
        `;
      } else {
        html += `
          <div class="trick-locked">
            <div class="lock-icon">🔒</div>
            <p><b>${trick.name}</b></p>
            <p style="font-size:0.85em; margin-top:4px;">Solve questions of this type to unlock</p>
          </div>
        `;
      }
    });
    return html || '<p class="empty-msg">No tricks yet.</p>';
  },

  // Render cheat sheet for a chapter
  renderCheatSheet(subject, chapterId) {
    const chapterData = this._getChapterData(subject, chapterId);
    if (!chapterData || !chapterData.cheatsheet) {
      return '<p class="empty-msg">No cheat sheet for this chapter yet.</p>';
    }
    let html = '<div class="cheat-grid">';
    chapterData.cheatsheet.forEach(c => {
      html += `
        <div class="cheat-card">
          <div class="cheat-title">${c.title}</div>
          <div class="cheat-formula">${c.formula}</div>
        </div>
      `;
    });
    html += '</div>';
    return html;
  },

  // Render learn content (intro + concepts)
  renderLearn(subject, chapterId) {
    const chapterData = this._getChapterData(subject, chapterId);
    if (!chapterData) return '<p class="empty-msg">Chapter data not found.</p>';
    if (chapterData.learn) return chapterData.learn;
    // Default learn content
    return `
      <div class="learn-section">
        <h3>📖 Introduction</h3>
        <p>This is <b>${chapterData.name}</b>. Study the key concepts, then attempt the questions to unlock tricks.</p>
        <h3>🎯 Approach</h3>
        <ul>
          <li>Read your Arjuna 2.0 lecture notes for this chapter</li>
          <li>Watch 2-3 lectures as planned</li>
          <li>Attempt 5-10 questions here in KURUKSHETRA</li>
          <li>Review the tricks you unlock</li>
          <li>Move to the next chapter only when accuracy &gt; 70%</li>
        </ul>
        <h3>📝 Key Concepts to Master</h3>
        <p>Open the <b>Cheat Sheet</b> tab for a one-page summary of formulae and patterns.</p>
      </div>
    `;
  },

  _getChapterData(subject, chapterId) {
    if (subject === 'physics') return PHYSICS_DATA[chapterId];
    if (subject === 'chemistry') return CHEMISTRY_DATA[chapterId];
    if (subject === 'maths') return MATHS_DATA[chapterId];
    return null;
  }
};
