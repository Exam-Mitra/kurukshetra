/* KURUKSHETRA V3.1 — PYQ player + important + bookmarks + SRS + mistakes */
const PYQs = {
  render(subject, chapterId, container) {
    const el = container || K.el('tabContent');
    if (!el) return;
    this.subject = subject;
    this.chapterId = chapterId;
    this.container = el;
    this.session = null;
    const bank = this._getBank(subject, chapterId);
    const st = window.appState || {};
    const prog = st.progress?.[subject]?.[chapterId] || {};
    el.innerHTML = `
      <h2>📚 Previous Year Questions</h2>
      <p class="muted">${bank.length} questions available for this chapter</p>
      <div class="pyq-stats">
        <span class="chip chip-green">✅ Correct: <b>${prog.pyqsCorrect || 0}</b></span>
        <span class="chip chip-red">❌ Wrong: <b>${Math.max(0, (prog.pyqsAttempted || 0) - (prog.pyqsCorrect || 0))}</b></span>
        <span class="chip chip-blue">📊 Attempted: <b>${prog.pyqsAttempted || 0}</b></span>
        <span class="chip chip-purple">🎯 Accuracy: <b>${prog.pyqsAttempted ? ((prog.pyqsCorrect || 0) / prog.pyqsAttempted * 100).toFixed(0) + '%' : '—'}</b></span>
      </div>
      <div class="pyq-modes">
        <button class="mode-card" data-mode="mixed">🎲<span>Mixed</span></button>
        <button class="mode-card" data-mode="basic">⭐<span>Basic</span></button>
        <button class="mode-card" data-mode="medium">🔥<span>Medium</span></button>
        <button class="mode-card" data-mode="advanced">💀<span>Advanced</span></button>
        <button class="mode-card" data-mode="dpp">⏱️<span>DPP</span></button>
        <button class="mode-card" data-mode="important">📌<span>Must-Do</span></button>
        <button class="mode-card" data-mode="srs">🧠<span>SRS Due</span></button>
      </div>
      <div id="pyqPlayArea"><p class="muted" style="text-align:center;padding:32px">Choose a mode to start practicing.</p></div>`;
    el.querySelectorAll('.mode-card').forEach(btn => {
      btn.onclick = () => this.start(btn.dataset.mode);
    });
  },

  _getBank(subject, chapterId) {
    const out = [];
    const push = arr => { if (Array.isArray(arr)) out.push(...arr); };
    const base = {
      physics: typeof PHYSICS_DATA !== 'undefined' ? PHYSICS_DATA : window.PHYSICS_DATA,
      chemistry: typeof CHEMISTRY_DATA !== 'undefined' ? CHEMISTRY_DATA : window.CHEMISTRY_DATA,
      maths: typeof MATHS_DATA !== 'undefined' ? MATHS_DATA : window.MATHS_DATA
    }[subject];
    if (base?.[chapterId]) {
      const ch = base[chapterId];
      push(ch.questions);
      ['basic', 'medium', 'advanced', 'mcq', 'numerical'].forEach(k => push(ch[k]));
    }
    const pyqGlobals = [];
    try { if (typeof PYQ_PHYSICS !== 'undefined') pyqGlobals.push(PYQ_PHYSICS); } catch (e) {}
    try { if (typeof PYQ_PHYSICS_FULL !== 'undefined') pyqGlobals.push(PYQ_PHYSICS_FULL); } catch (e) {}
    try { if (typeof PYQ_CHEMISTRY !== 'undefined') pyqGlobals.push(PYQ_CHEMISTRY); } catch (e) {}
    try { if (typeof PYQ_MATHS !== 'undefined') pyqGlobals.push(PYQ_MATHS); } catch (e) {}
    pyqGlobals.forEach(b => {
      if (!b) return;
      if (b[chapterId]) push(Array.isArray(b[chapterId]) ? b[chapterId] : b[chapterId].questions);
    });
    try {
      const c = typeof CURATED_BANK !== 'undefined' ? CURATED_BANK : window.CURATED_BANK;
      if (c) {
        if (c[subject]?.[chapterId]) push(c[subject][chapterId]);
        if (c[chapterId]) push(Array.isArray(c[chapterId]) ? c[chapterId] : []);
      }
    } catch (e) {}
    const seen = new Set();
    return out.filter(q => {
      if (!q || typeof q !== 'object') return false;
      const k = q.id || q.q;
      if (!k || seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  },

  important(subject, chapterId) {
    // Curated "must-do": prefer medium/advanced, take 12 unique
    let bank = this._getBank(subject, chapterId);
    const pref = bank.filter(q => ['medium', 'advanced'].includes(q.diff || q.difficulty));
    const pool = pref.length >= 8 ? pref : bank;
    return K.shuffle(pool).slice(0, 12);
  },

  isQBookmarked(qid) {
    return (window.appState?.questionBookmarks || []).includes(qid);
  },

  toggleQBookmark(q, subject, chapterId) {
    const st = window.appState;
    if (!st || !q) return;
    const id = q.id || (subject + '_' + chapterId + '_' + String(q.q || '').slice(0, 24));
    st.questionBookmarks = st.questionBookmarks || [];
    const i = st.questionBookmarks.indexOf(id);
    if (i >= 0) st.questionBookmarks.splice(i, 1);
    else {
      st.questionBookmarks.push(id);
      st.bookmarks = st.bookmarks || [];
      if (!st.bookmarks.find(b => b.id === id)) {
        st.bookmarks.push({
          type: 'question', id, title: String(q.q || q.question || id).slice(0, 80),
          subject, chapterId, savedAt: K.todayKey(), q
        });
      }
    }
    Storage.save(st);
    K.toast(i >= 0 ? 'Question unbookmarked' : '📌 Question saved to Must-Revise');
  },

  start(mode) {
    let bank = this._getBank(this.subject, this.chapterId);
    if (mode === 'basic' || mode === 'medium' || mode === 'advanced') {
      bank = bank.filter(q => (q.diff || q.difficulty || 'medium') === mode || (q.diff || '') === mode[0]);
    } else if (mode === 'important') {
      bank = this.important(this.subject, this.chapterId);
    } else if (mode === 'srs') {
      const due = SRS.dueToday(window.appState).filter(h =>
        h.chapterId === this.chapterId || h.subject === this.subject
      );
      const map = new Map(bank.map(q => [q.id, q]));
      bank = due.map(d => map.get(d.id)).filter(Boolean);
      if (!bank.length) bank = this._getBank(this.subject, this.chapterId).slice(0, 5);
    }
    if (!bank.length) {
      bank = [{
        id: 'sample1', diff: 'basic', type: 'mcq',
        q: 'Sample: SI unit of force is?',
        options: ['Newton', 'Joule', 'Watt', 'Pascal'],
        answer: 0, solution: 'F = ma → kg·m/s² = Newton.'
      }];
    }
    bank = K.shuffle(bank).slice(0, mode === 'dpp' ? 10 : Math.min(15, bank.length));
    this.session = { mode, qs: bank, i: 0, correct: 0, wrong: 0, t0: Date.now() };
    this._showQ();
  },

  _showQ() {
    const area = K.el('pyqPlayArea');
    const s = this.session;
    if (!area || !s) return;
    if (s.i >= s.qs.length) return this._finish();
    const q = s.qs[s.i];
    const opts = q.options || q.opts || [];
    const letters = ['A', 'B', 'C', 'D', 'E'];
    const qid = q.id || (this.chapterId + '_' + s.i);
    const bm = this.isQBookmarked(qid);
    area.innerHTML = `
      <div class="q-card">
        <div class="q-top">
          <span class="q-badge">${s.i + 1} / ${s.qs.length}</span>
          <span class="q-badge">${q.diff || q.difficulty || 'mixed'}</span>
          <span class="q-badge">${s.mode}</span>
          <button class="star-btn ${bm ? 'on' : ''}" id="qBm" title="Bookmark question">${bm ? '★' : '☆'}</button>
        </div>
        <div class="q-text">${q.q || q.question}</div>
        <div class="q-options" id="qOptions">
          ${opts.map((o, i) => `<button class="q-option" data-i="${i}"><b>${letters[i]}.</b> ${o}</button>`).join('')}
        </div>
        <div id="qSolution" class="hidden"></div>
        <div class="q-actions">
          <button class="btn btn-primary hidden" id="qNext">Next →</button>
        </div>
      </div>`;
    K.el('qBm').onclick = () => {
      q.id = qid;
      this.toggleQBookmark(q, this.subject, this.chapterId);
      this._showQ();
    };
    const ans = typeof q.answer === 'number' ? q.answer : (typeof q.ans === 'number' ? q.ans : 0);
    area.querySelectorAll('.q-option').forEach(btn => {
      btn.onclick = () => {
        if (s._locked) return;
        s._locked = true;
        const pick = +btn.dataset.i;
        area.querySelectorAll('.q-option').forEach((b, i) => {
          b.disabled = true;
          if (i === ans) b.classList.add('correct');
          if (i === pick && pick !== ans) b.classList.add('wrong');
        });
        const ok = pick === ans;
        if (ok) s.correct++; else {
          s.wrong++;
          Mistakes.add({
            subject: this.subject, chapterId: this.chapterId,
            q: q.q || q.question, options: opts,
            picked: pick, pickedLabel: opts[pick],
            answer: ans, correctLabel: opts[ans],
            solution: q.solution || q.sol || '',
            id: qid
          });
        }
        this._track(ok, qid, q);
        const sol = K.el('qSolution');
        sol.classList.remove('hidden');
        sol.innerHTML = `<div class="solution-box"><b>${ok ? '✅ Correct' : '❌ Wrong'}</b>
          <p>${q.solution || q.sol || ''}</p>
          ${q.trick ? `<p><span class="trick">TRICK</span> ${q.trick}</p>` : ''}</div>`;
        const next = K.el('qNext');
        next.classList.remove('hidden');
        next.onclick = () => { s.i++; s._locked = false; this._showQ(); };
      };
    });
  },

  _track(ok, qid, q) {
    const st = window.appState;
    if (!st) return;
    st.progress[this.subject] = st.progress[this.subject] || {};
    const p = st.progress[this.subject][this.chapterId] = st.progress[this.subject][this.chapterId] || {};
    p.pyqsAttempted = (p.pyqsAttempted || 0) + 1;
    if (ok) p.pyqsCorrect = (p.pyqsCorrect || 0) + 1;
    SRS.review(st, qid, ok, { subject: this.subject, chapterId: this.chapterId });
    Tracker.recordAnswerTimeOfDay(st, ok);
    Storage.save(st);
  },

  _finish() {
    const s = this.session;
    const area = K.el('pyqPlayArea');
    const total = s.correct + s.wrong;
    const acc = total ? Math.round(s.correct / total * 100) : 0;
    const mins = Math.max(0.1, (Date.now() - s.t0) / 60000);
    const v = (total / mins).toFixed(1);
    const st = window.appState;
    const p = st.progress?.[this.subject]?.[this.chapterId];
    if (p) {
      p.lastVelocity = +v;
      Storage.save(st);
    }
    area.innerHTML = `<div class="q-finish">
      <h2>🏁 Session Complete</h2>
      <div class="pyq-stats">
        <span class="chip chip-green">✅ ${s.correct}</span>
        <span class="chip chip-red">❌ ${s.wrong}</span>
        <span class="chip chip-blue">📊 ${total}</span>
        <span class="chip chip-purple">🎯 ${acc}%</span>
        <span class="chip">⚡ ${v} Q/min</span>
      </div>
      <button class="btn btn-primary" id="pyqRestart">Practice again</button>
    </div>`;
    K.el('pyqRestart').onclick = () => this.render(this.subject, this.chapterId, this.container);
  }
};
window.PYQs = PYQs;
window.Pyqs = PYQs;
