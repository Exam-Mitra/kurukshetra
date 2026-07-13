/* ============================================
   KURUKSHETRA — Daily Missions
   3 random missions per day + bonuses
   ============================================ */

const Missions = {
  POOL: [
    { id: 'm1', text: 'Watch 2 Arjuna 2.0 lectures', reward: 30, type: 'lectures', target: 2 },
    { id: 'm2', text: 'Watch 3 Arjuna 2.0 lectures', reward: 50, type: 'lectures', target: 3 },
    { id: 'm3', text: 'Solve 5 HW questions', reward: 25, type: 'hw', target: 5 },
    { id: 'm4', text: 'Solve 10 HW questions', reward: 50, type: 'hw', target: 10 },
    { id: 'm5', text: 'Complete 1 DPP (5 questions)', reward: 40, type: 'dpp', target: 1 },
    { id: 'm6', text: 'Get 80% accuracy on 5 questions', reward: 35, type: 'accuracy', target: 80 },
    { id: 'm7', text: 'Unlock 1 new trick', reward: 30, type: 'trick', target: 1 },
    { id: 'm8', text: 'Practice today\'s subject for 15 min', reward: 25, type: 'time', target: 15 },
    { id: 'm9', text: 'Defeat 1 boss-level question', reward: 60, type: 'boss', target: 1 },
    { id: 'm10', text: 'Revisit a weak topic', reward: 30, type: 'weak', target: 1 },
    { id: 'm11', text: 'Read cheat sheet of current chapter', reward: 15, type: 'cheat', target: 1 },
    { id: 'm12', text: 'Solve 3 numerical-type questions', reward: 30, type: 'numeric', target: 3 }
  ],

  // Generate today's missions
  generate(state) {
    const today = K.todayKey();
    if (state.missions[today]) return state.missions[today];

    const isSchool = K.isSchoolDay();
    let pool = this.POOL;

    // On school day, lighter missions
    if (isSchool) {
      pool = this.POOL.filter(m => m.target <= 5);
    }

    // Pick 3 random
    const picks = K.shuffle(pool).slice(0, 3).map(m => ({
      ...m, done: false
    }));

    state.missions[today] = picks;
    return picks;
  },

  // Render today's missions
  render(state) {
    const missions = this.generate(state);
    const list = K.el('missionsList');
    list.innerHTML = '';

    // Date display
    K.el('missionDate').textContent = K.formatDate(new Date());

    missions.forEach(m => {
      const row = K.create('div', { class: 'mission' + (m.done ? ' done' : '') });
      row.innerHTML = `
        <div class="mission-check">${m.done ? '✓' : ''}</div>
        <div class="mission-text">${m.text}</div>
        <div class="mission-reward">+${m.reward} EXP</div>
      `;
      const check = row.querySelector('.mission-check');
      if (!m.done) {
        check.onclick = () => this._complete(state, m, missions);
      }
      list.appendChild(row);
    });
  },

  // Mark a mission as done (auto via tracking)
  autoComplete(state, type) {
    const today = K.todayKey();
    const missions = state.missions[today];
    if (!missions) return;

    // Update calendar tracking
    if (!state.calendar[today]) state.calendar[today] = {};
    state.calendar[today][type] = (state.calendar[today][type] || 0) + 1;

    // Check mission completion
    missions.forEach(m => {
      if (m.done) return;
      if (m.type !== type) return;
      const current = state.calendar[today][type] || 0;
      if (m.type === 'accuracy') {
        // accuracy: track best
        const acc = state.calendar[today].lastAccuracy || 0;
        if (acc >= m.target && !m.done) {
          m.done = true;
          this._award(state, m);
        }
      } else if (current >= m.target) {
        m.done = true;
        this._award(state, m);
      }
    });
  },

  _complete(state, mission, missions) {
    mission.done = true;
    this._award(state, mission);
    this.render(state);
  },

  _award(state, mission) {
    EXP._addExp(state, mission.reward);
    K.toast(`✅ Mission done! +${mission.reward} EXP`);
    Sounds.play('correct');
    Storage.save(state);
    UI.update(state);
  }
};
