/* ============================================
   KURUKSHETRA — Question Player
   MCQ single, MCQ multi, Numeric, Subjective
   Adaptive timer, EXP, weak tracking
   ============================================ */

const Questions = {
  current: null,
  session: null,
  state: null,
  combo: 0,
  correct: 0,
  wrong: 0,
  qIndex: 0,
  questions: [],
  currentSubject: null,
  currentChapter: null,
  currentDifficulty: null,

  // Start a session (random mix of difficulties from a chapter/subject)
  async startSession(state, subject, chapterId, mode = 'practice', difficulty = null) {
    this.state = state;
    this.currentSubject = subject;
    this.currentChapter = chapterId;
    this.combo = 0;
    this.correct = 0;
    this.wrong = 0;
    this.qIndex = 0;

    // Get questions
    const chapterData = this._getChapterData(subject, chapterId);
    if (!chapterData) {
      K.toast('❌ Chapter data not found');
      return;
    }
    let allQ = chapterData.questions || [];

    if (mode === 'dpp') {
      // DPP: full chapter, 90 seconds each, 5-10 questions
      this.questions = K.shuffle(allQ).slice(0, Math.min(8, allQ.length));
    } else if (difficulty) {
      this.questions = allQ.filter(q => q.diff === difficulty);
    } else {
      // Mixed: 1-2 basic, 2-3 medium, 1-2 advanced, 1 boss
      this.questions = this._mixedQuestions(allQ);
    }

    if (this.questions.length === 0) {
      K.toast('❌ No questions in this chapter yet. Pick another!');
      return;
    }

    K.showView('questions');
    this._render();
  },

  _mixedQuestions(allQ) {
    const basic = allQ.filter(q => q.diff === 'basic');
    const medium = allQ.filter(q => q.diff === 'medium');
    const advanced = allQ.filter(q => q.diff === 'advanced');
    const boss = allQ.filter(q => q.diff === 'boss');

    const result = [];
    result.push(...K.shuffle(basic).slice(0, 1));
    result.push(...K.shuffle(medium).slice(0, 2));
    result.push(...K.shuffle(advanced).slice(0, 1));
    if (boss.length) result.push(boss[0]);
    return result.length ? result : K.shuffle(allQ).slice(0, 5);
  },

  _getChapterData(subject, chapterId) {
    if (subject === 'physics') return PHYSICS_DATA[chapterId];
    if (subject === 'chemistry') return CHEMISTRY_DATA[chapterId];
    if (subject === 'maths') return MATHS_DATA[chapterId];
    return null;
  },

  _render() {
    const q = this.questions[this.qIndex];
    if (!q) {
      this._endSession();
      return;
    }
    this.current = q;
    this.currentDifficulty = q.diff;

    K.el('qDiff').textContent = q.diff.toUpperCase();
    K.el('qDiff').className = 'q-diff ' + q.diff;
    K.el('qCounter').textContent = `Q ${this.qIndex + 1} / ${this.questions.length}`;
    K.el('qCorrect').textContent = this.correct;
    K.el('qWrong').textContent = this.wrong;
    K.el('qCombo').textContent = this.combo;

    const body = K.el('qplayerBody');
    body.innerHTML = '';

    // Stripe
    const stripe = K.create('div', { class: 'q-stripe ' + q.diff });
    body.appendChild(stripe);

    // Question text
    const qText = K.create('div', { class: 'q-text' });
    qText.innerHTML = q.q;
    body.appendChild(qText);

    // Render based on type
    if (q.type === 'mcq-single' || q.type === 'mcq-multi') {
      if (q.type === 'mcq-multi') {
        const hint = K.create('div', { class: 'q-multi-hint' }, '⚠️ Select all correct options');
        body.appendChild(hint);
      }
      const opts = K.create('div', { class: 'q-options' });
      q.options.forEach((opt, i) => {
        const btn = K.create('button', { class: 'q-option' }, `<b>${String.fromCharCode(65 + i)}.</b> ${opt}`);
        btn.onclick = () => this._selectOption(btn, i, q.type);
        opts.appendChild(btn);
      });
      body.appendChild(opts);
    } else if (q.type === 'numeric') {
      const wrap = K.create('div', { class: 'q-numeric-input' });
      const input = K.create('input', { type: 'number', step: 'any', placeholder: 'Enter your answer' });
      input.id = 'numericAnswer';
      wrap.appendChild(input);
      body.appendChild(wrap);
      input.focus();
      input.onkeydown = (e) => { if (e.key === 'Enter') this._submitNumeric(); };
    } else if (q.type === 'subjective') {
      const wrap = K.create('div');
      const ta = K.create('textarea', {
        style: 'width:100%; min-height:120px; background:var(--bg-elevated); color:var(--text-primary); border:2px solid var(--border); border-radius:8px; padding:12px; font-family:inherit; font-size:1em;'
      });
      ta.placeholder = 'Write your step-by-step solution here…';
      ta.id = 'subjectiveAnswer';
      wrap.appendChild(ta);
      body.appendChild(wrap);
    }

    // Actions
    const actions = K.create('div', { class: 'q-actions' });
    if (q.type !== 'subjective') {
      const submit = K.create('button', { class: 'btn-primary' }, '✅ Submit');
      submit.onclick = () => this._submit();
      actions.appendChild(submit);
    } else {
      const submit = K.create('button', { class: 'btn-primary' }, '✅ Submit Solution');
      submit.onclick = () => this._submitSubjective();
      actions.appendChild(submit);
    }
    const skip = K.create('button', { class: 'btn-secondary' }, '⏭️ Skip');
    skip.onclick = () => this._next(false);
    actions.appendChild(skip);

    if (q.hint) {
      const hintBtn = K.create('button', { class: 'btn-mini' }, '💡 Hint (-5 EXP)');
      hintBtn.onclick = () => {
        K.toast('💡 ' + q.hint, 5000);
        this.state.warrior.totalExp = Math.max(0, this.state.warrior.totalExp - 5);
      };
      actions.appendChild(hintBtn);
    }
    body.appendChild(actions);

    // Start timer (adaptive)
    const adaptiveTime = K.adaptiveTime(q.diff, this.state.warrior.level);
    Timer.start(adaptiveTime, () => this._onTimeOut());
  },

  _selectOption(btn, idx, type) {
    if (type === 'mcq-single') {
      K.qsa('.q-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      this._selectedOption = idx;
    } else {
      // multi
      btn.classList.toggle('selected');
      if (!this._selectedOptions) this._selectedOptions = [];
      const i = this._selectedOptions.indexOf(idx);
      if (i >= 0) this._selectedOptions.splice(i, 1);
      else this._selectedOptions.push(idx);
      this._selectedOptions.sort();
    }
  },

  _submit() {
    const q = this.current;
    let isCorrect = false;
    let userAns;

    if (q.type === 'mcq-single') {
      if (this._selectedOption === undefined) {
        K.toast('⚠️ Select an option first');
        return;
      }
      isCorrect = this._selectedOption === q.answer;
      userAns = q.options[this._selectedOption];
    } else {
      // multi
      if (!this._selectedOptions || this._selectedOptions.length === 0) {
        K.toast('⚠️ Select at least one option');
        return;
      }
      isCorrect = JSON.stringify(this._selectedOptions) === JSON.stringify(q.answer);
      userAns = this._selectedOptions.map(i => q.options[i]).join(', ');
    }
    this._processAnswer(isCorrect, userAns);
  },

  _submitNumeric() {
    const q = this.current;
    const input = K.el('numericAnswer');
    const val = parseFloat(input.value);
    if (isNaN(val)) {
      K.toast('⚠️ Enter a valid number');
      return;
    }
    const tolerance = q.tolerance || 0.01;
    const isCorrect = Math.abs(val - q.answer) <= tolerance;
    this._processAnswer(isCorrect, val);
  },

  _submitSubjective() {
    const ta = K.el('subjectiveAnswer');
    const text = ta.value.trim();
    if (text.length < 10) {
      K.toast('⚠️ Write at least a few steps');
      return;
    }
    // Subjective — show solution regardless, mark as "reviewed"
    this._showExplanation(text);
  },

  _onTimeOut() {
    K.toast('⏰ Time up!');
    this._processAnswer(false, null, true);
  },

  _processAnswer(isCorrect, userAns, timedOut = false) {
    Timer.stop();
    const q = this.current;

    // Update stats
    if (isCorrect) {
      this.correct++;
      this.combo++;
      const reward = EXP.award(this.state, q.diff, this.combo);
      Animations.expGain(reward.amount);
      Sounds.play('correct');
      Animations.flash('correct');
    } else {
      this.wrong++;
      this.combo = 0;
      this._markWeak();
      Sounds.play('wrong');
      Animations.flash('wrong');
    }

    // Combo popup
    if (this.combo >= 3 && isCorrect) {
      Animations.comboPopup(this.combo);
    }

    // Update progress
    this._updateProgress(isCorrect);

    // Show explanation
    this._showExplanation(userAns, isCorrect, timedOut);

    // Mark option visually
    if (q.type === 'mcq-single') {
      K.qsa('.q-option').forEach((b, i) => {
        if (i === q.answer) b.classList.add('correct');
        else if (b.classList.contains('selected')) b.classList.add('wrong');
      });
    } else if (q.type === 'mcq-multi') {
      K.qsa('.q-option').forEach((b, i) => {
        if (q.answer.includes(i)) b.classList.add('correct');
      });
    }

    // Replace actions with Next
    const actions = K.qs('.q-actions');
    actions.innerHTML = '';
    const next = K.create('button', { class: 'btn-primary' }, this.qIndex + 1 < this.questions.length ? 'Next →' : '✅ Finish');
    next.onclick = () => this._next(isCorrect);
    actions.appendChild(next);
  },

  _showExplanation(userAns, isCorrect = null, timedOut = false) {
    const q = this.current;
    const body = K.el('qplayerBody');
    const exp = K.create('div', { class: 'q-explanation' });

    let title = '📖 Solution';
    if (isCorrect === true) title = '✅ Correct!';
    else if (isCorrect === false) title = timedOut ? '⏰ Time up' : '❌ Incorrect';
    else if (isCorrect === null) title = '📖 Reference Solution';

    let html = `<h4>${title}</h4>`;
    if (userAns !== null && userAns !== undefined) {
      html += `<p><b>Your answer:</b> ${userAns}</p>`;
    }
    html += `<p><b>Correct answer:</b> ${this._formatAnswer(q)}</p>`;
    if (q.solution) html += `<p>${q.solution}</p>`;
    if (q.trick) {
      html += `<div class="trick-hint">🪄 <b>Killer Trick:</b> ${q.trick}</div>`;
      // Unlock the trick in inventory
      this._unlockTrickFromQ(q);
    }
    exp.innerHTML = html;
    body.appendChild(exp);
  },

  _formatAnswer(q) {
    if (q.type === 'mcq-single') return q.options[q.answer];
    if (q.type === 'mcq-multi') return q.answer.map(i => q.options[i]).join(', ');
    return q.answer;
  },

  _next(wasCorrect) {
    this.qIndex++;
    this._selectedOption = undefined;
    this._selectedOptions = null;
    if (this.qIndex >= this.questions.length) {
      this._endSession();
    } else {
      this._render();
    }
  },

  _endSession() {
    Timer.stop();
    const total = this.questions.length;
    const pct = Math.round((this.correct / total) * 100);
    const accuracy = pct;

    // Calendar update
    const today = K.todayKey();
    if (!this.state.calendar[today]) this.state.calendar[today] = {};
    this.state.calendar[today].questionsAttempted = (this.state.calendar[today].questionsAttempted || 0) + total;
    this.state.calendar[today].correct = (this.state.calendar[today].correct || 0) + this.correct;
    this.state.calendar[today].exp = (this.state.calendar[today].exp || 0) + this.state.warrior.exp;

    // Streak check
    if (this.correct > 0) Streak.update(this.state);

    // Save
    Storage.save(this.state);

    // Show summary
    K.modal(`
      <div class="warrior-card">
        <div class="warrior-avatar">⚔️</div>
        <h2>Session Complete</h2>
        <p>You fought bravely, warrior.</p>
        <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin:20px 0;">
          <div class="cert-stat">
            <div class="stat-num">${this.correct}/${total}</div>
            <div class="stat-label">Correct</div>
          </div>
          <div class="cert-stat">
            <div class="stat-num">${accuracy}%</div>
            <div class="stat-label">Accuracy</div>
          </div>
          <div class="cert-stat">
            <div class="stat-num">${this.state.warrior.level}</div>
            <div class="stat-label">Level</div>
          </div>
        </div>
        <button class="btn-primary" onclick="K.closeModal(); K.showView('chapter');">Back to chapter</button>
      </div>
    `);
  },

  _markWeak() {
    const w = this.state.weak;
    const key = `${this.currentSubject}-${this.currentChapter}`;
    const existing = w.find(x => x.key === key);
    if (existing) {
      existing.mistakeCount++;
      existing.lastWrong = K.todayKey();
    } else {
      w.push({ key, subject: this.currentSubject, chapter: this.currentChapter, mistakeCount: 1, lastWrong: K.todayKey() });
    }
  },

  _updateProgress(isCorrect) {
    const p = this.state.progress[this.currentSubject];
    if (!p[this.currentChapter]) {
      p[this.currentChapter] = { correct: 0, total: 0, tricksUnlocked: [], done: false };
    }
    p[this.currentChapter].total++;
    if (isCorrect) p[this.currentChapter].correct++;
  },

  _unlockTrickFromQ(q) {
    if (!q.trickId) return;
    if (this.state.tricks[q.trickId]) return; // already unlocked
    const trickData = this._getTrickData(q.trickId);
    if (!trickData) return;

    this.state.tricks[q.trickId] = {
      ...trickData,
      unlockedAt: K.todayKey(),
      subject: this.currentSubject,
      chapter: this.currentChapter
    };

    // Mark as unlocked in chapter progress
    const cp = this.state.progress[this.currentSubject][this.currentChapter];
    if (cp && !cp.tricksUnlocked.includes(q.trickId)) {
      cp.tricksUnlocked.push(q.trickId);
    }

    // Show celebration
    Animations.trickUnlock(trickData.name);
    Sounds.play('unlock');
  },

  _getTrickData(id) {
    if (window.TRICK_DATA && TRICK_DATA[id]) return TRICK_DATA[id];
    return null;
  }
};
