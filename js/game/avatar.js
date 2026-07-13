/* ============================================
   KURUKSHETRA — Warrior Skins / Avatars
   Unlock new warrior skins with EXP
   ============================================ */

const Avatar = {
  SKINS: [
    { id: 'arjuna', name: 'Arjuna', emoji: '🏹', minLevel: 1, cost: 0 },
    { id: 'karna', name: 'Karna', emoji: '🛡️', minLevel: 5, cost: 0 },
    { id: 'bhima', name: 'Bhima', emoji: '🔨', minLevel: 10, cost: 0 },
    { id: 'krishna', name: 'Krishna', emoji: '🪈', minLevel: 15, cost: 0 },
    { id: 'eklavya', name: 'Eklavya', emoji: '🎯', minLevel: 20, cost: 0 },
    { id: 'abhimanyu', name: 'Abhimanyu', emoji: '⚔️', minLevel: 30, cost: 0 },
    { id: 'bhishma', name: 'Bhishma', emoji: '🏛️', minLevel: 50, cost: 0 },
    { id: 'drona', name: 'Drona', emoji: '📚', minLevel: 80, cost: 0 }
  ],

  // Get all available skins for the current level
  available(level) {
    return this.SKINS.filter(s => level >= s.minLevel);
  },

  // Get current skin emoji
  current(skinId) {
    const skin = this.SKINS.find(s => s.id === skinId);
    return skin ? skin.emoji : '🏹';
  },

  // Render skin selector (could be used in settings)
  render(state) {
    const avail = this.available(state.warrior.level);
    let html = '<div class="skin-selector">';
    this.SKINS.forEach(s => {
      const locked = state.warrior.level < s.minLevel;
      const active = state.warrior.skin === s.id;
      html += `
        <div class="skin-opt ${locked ? 'locked' : ''} ${active ? 'active' : ''}" data-skin="${s.id}">
          <span class="skin-emoji">${locked ? '🔒' : s.emoji}</span>
          <span>${s.name}</span>
          ${locked ? `<span style="display:block; font-size:0.7em; color:var(--text-muted);">Lv.${s.minLevel}</span>` : ''}
        </div>
      `;
    });
    html += '</div>';
    return html;
  },

  // Change skin
  set(state, skinId) {
    const skin = this.SKINS.find(s => s.id === skinId);
    if (!skin) return false;
    if (state.warrior.level < skin.minLevel) {
      K.toast(`🔒 Unlock at level ${skin.minLevel}`);
      return false;
    }
    state.warrior.skin = skinId;
    K.toast(`${skin.emoji} ${skin.name} selected!`);
    return true;
  }
};
