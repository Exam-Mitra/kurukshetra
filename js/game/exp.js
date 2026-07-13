/* ============================================
   KURUKSHETRA — EXP & Level System
   Fixed + Variable + Combo + All
   ============================================ */

const EXP = {
  // Base rewards
  REWARDS: {
    CORRECT_BASIC: 5,
    CORRECT_MEDIUM: 15,
    CORRECT_ADVANCED: 30,
    CORRECT_BOSS: 100,
    CHAPTER_COMPLETE: 50,
    DAILY_LOGIN: 10,
    MISSION_DONE: 20,
    STREAK_DAILY: 5
  },

  // Combo multiplier
  COMBO_STEPS: [
    { min: 3, mult: 1.5 },
    { min: 5, mult: 2.0 },
    { min: 10, mult: 3.0 },
    { min: 15, mult: 5.0 }
  ],

  // Award EXP for a correct answer
  award(state, difficulty, combo) {
    const baseKey = 'CORRECT_' + difficulty.toUpperCase();
    let amount = this.REWARDS[baseKey] || 10;

    // Combo bonus
    const comboMult = this.comboMult(combo);
    amount = Math.round(amount * comboMult);

    // Add EXP
    this._addExp(state, amount);
    return { amount, comboMult };
  },

  comboMult(combo) {
    let mult = 1;
    for (const step of this.COMBO_STEPS) {
      if (combo >= step.min) mult = step.mult;
    }
    return mult;
  },

  _addExp(state, amount) {
    const before = state.warrior.level;
    state.warrior.exp += amount;
    state.warrior.totalExp += amount;

    // Level up check
    while (state.warrior.exp >= K.expForLevel(state.warrior.level)) {
      state.warrior.exp -= K.expForLevel(state.warrior.level);
      state.warrior.level++;
    }

    // Trigger level up if changed
    if (state.warrior.level > before) {
      setTimeout(() => this._onLevelUp(state, before, state.warrior.level), 100);
    }
  },

  _onLevelUp(state, from, to) {
    // Animate
    Animations.levelUp(to);
    Sounds.play('levelup');
    K.toast(`🎉 Level ${to} reached! Keep going, warrior!`, 4000);

    // Check rank up
    const oldRank = K.rankForLevel(from);
    const newRank = K.rankForLevel(to);
    if (newRank.name !== oldRank.name) {
      setTimeout(() => {
        Animations.rankUp(newRank);
        Sounds.play('rankup');
        K.toast(`⚜️ RANK UP: ${newRank.icon} ${newRank.name}!`, 5000);
      }, 1500);
    }
  },

  // Spend EXP (not really used, but available)
  spend(state, amount) {
    if (state.warrior.totalExp < amount) return false;
    state.warrior.totalExp -= amount;
    return true;
  }
};
