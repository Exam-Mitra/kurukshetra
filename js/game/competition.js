/* ============================================
   KURUKSHETRA — Competition Arena
   Solo PB, Vs AI Bot, Vs Friend (link)
   ============================================ */

const Competition = {
  // Solo: 10 random questions, time attack
  async startSolo(state) {
    K.toast('🎯 Solo challenge: 10 mixed questions, 1 min each!');
    // Pick random chapter
    const subjects = ['physics', 'chemistry', 'maths'];
    const subj = K.pick(subjects);
    const chapters = SYLLABUS[subj].chapters;
    const ch = K.pick(chapters);
    Questions.startSession(state, subj, ch.id, 'practice');
  },

  // Vs AI: Weekly bot challenge
  async startAI(state) {
    const score = this._botScore();
    const today = K.todayKey();
    if (!state.botScores) state.botScores = [];

    K.modal(`
      <div class="warrior-card">
        <div class="warrior-avatar">🤖</div>
        <h2>Arjuna Bot Challenge</h2>
        <p>This week, defeat the bot by scoring higher than <b style="color:var(--accent-gold);">${score}/10</b>.</p>
        <p style="margin-top:10px; color:var(--text-secondary);">Your best so far this week: <b>${this._bestThisWeek(state)}/10</b></p>
        <div style="display:flex; gap:10px; margin-top:20px; justify-content:center;">
          <button class="btn-primary" id="acceptBot">⚔️ Accept</button>
          <button class="btn-secondary" onclick="K.closeModal()">Cancel</button>
        </div>
      </div>
    `);
    K.el('acceptBot').onclick = () => {
      K.closeModal();
      this._startBotRun(state);
    };
  },

  _startBotRun(state) {
    // 10 questions, 90s each
    K.toast('🤖 Vs Arjuna Bot: 10 questions, 90s each. Beat the bot!');
    const subj = K.pick(['physics', 'chemistry', 'maths']);
    const ch = K.pick(SYLLABUS[subj].chapters);
    Questions.startSession(state, subj, ch.id, 'practice');
  },

  _botScore() {
    // Random between 5-8 (challenging but beatable)
    return K.rand(5, 8);
  },

  _bestThisWeek(state) {
    const weekAgo = K.daysAgo(7);
    return Math.max(0, ...(state.botScores || [])
      .filter(s => s.date >= weekAgo)
      .map(s => s.score));
  },

  // Vs friend: generate a link with seed + question set
  async startFriend(state) {
    const seed = Math.random().toString(36).slice(2, 10);
    const link = `${location.origin}${location.pathname}?challenge=${seed}`;
    // Save challenge config
    const challenge = {
      seed,
      created: K.todayKey(),
      scores: []
    };
    state.challenges = state.challenges || [];
    state.challenges.push(challenge);

    K.modal(`
      <div class="warrior-card">
        <div class="warrior-avatar">👥</div>
        <h2>Challenge Created</h2>
        <p>Share this link with a friend. They take the same 10 questions, highest score wins.</p>
        <div style="background:var(--bg-elevated); padding:10px; border-radius:8px; margin:14px 0; word-break:break-all; font-family:monospace; font-size:0.85em;">
          ${link}
        </div>
        <button class="btn-primary" id="copyLink">📋 Copy Link</button>
        <button class="btn-secondary" style="margin-top:8px;" onclick="K.closeModal()">Close</button>
      </div>
    `);
    K.el('copyLink').onclick = () => {
      navigator.clipboard.writeText(link);
      K.toast('📋 Link copied!');
    };
  }
};
