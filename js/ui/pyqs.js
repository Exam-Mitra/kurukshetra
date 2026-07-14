/* KURUKSHETRA V3 — Self-contained PYQ player */
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
      </div>
      <div id="pyqPlayArea"><p class="muted" style="text-align:center;padding:32px">Choose a mode to start practicing.</p></div>`;
    el.querySelectorAll('.mode-card').forEach(btn => {
      btn.onclick = () => this.start(btn.dataset.mode);
    });
  },
  _getBank(subject, chapterId) {
    const out = [];
    const push = arr => { if (Array.isArray(arr)) out.push(...arr); };
    // Base chapter question banks (physics.js / chemistry.js / maths.js)
    const base = {
      physics: typeof PHYSICS_DATA !== 'undefined' ? PHYSICS_DATA : window.PHYSICS_DATA,
      chemistry: typeof CHEMISTRY_DATA !== 'undefined' ? CHEMISTRY_DATA : window.CHEMISTRY_DATA,
      maths: typeof MATHS_DATA !== 'undefined' ? MATHS_DATA : window.MATHS_DATA
    }[subject];
    if (base?.[chapterId]) {
      const ch = base[chapterId];
      push(ch.questions);
      // also flatten nested difficulty buckets if present
      ['basic', 'medium', 'advanced', 'mcq', 'numerical'].forEach(k => push(ch[k]));
    }
    // Dedicated PYQ files
    const pyqGlobals = [];
    try { if (typeof PYQ_PHYSICS !== 'undefined') pyqGlobals.push(PYQ_PHYSICS); } catch (e) {}
    try { if (typeof PYQ_PHYSICS_FULL !== 'undefined') pyqGlobals.push(PYQ_PHYSICS_FULL); } catch (e) {}
    try { if (typeof PYQ_CHEMISTRY !== 'undefined') pyqGlobals.push(PYQ_CHEMISTRY); } catch (e) {}
    try { if (typeof PYQ_MATHS !== 'undefined') pyqGlobals.push(PYQ_MATHS); } catch (e) {}
    pyqGlobals.forEach(b => {
      if (!b) return;
      if (b[chapterId]) push(Array.isArray(b[chapterId]) ? b[chapterId] : b[chapterId].questions);
    });
    // Curated bank: { physics: { p3: [...] }, ... }
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
  start(mode) {
    let bank = this._getBank(this.subject, this.chapterId);
    if (mode === 'basic' || mode === 'medium' || mode === 'advanced') {
      bank = bank.filter(q => (q.diff || q.difficulty || 'medium') === mode || (q.diff || '') === mode[0]);
    }
    if (!bank.length) {
      // fallback sample
      bank = [{
        id: 'sample1', diff: 'basic', type: 'mcq',
        q: 'Sample: SI unit of force is?',
        options: ['Newton', 'Joule', 'Watt', 'Pascal'],
        answer: 0, solution: 'F = ma → kg·m/s² = Newton.'
      }];
    }
    bank = K.shuffle(bank).slice(0, mode === 'dpp' ? 10 : Math.min(15, bank.length));
    this.session = { mode, qs: bank, i: 0, correct: 0, wrong: 0, done: false };
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
    area.innerHTML = `
      <div class="q-card">
        <div class="q-top">
          <span class="q-badge">${s.i + 1} / ${s.qs.length}</span>
          <span class="q-badge">${q.diff || q.difficulty || 'mixed'}</span>
          <span class="q-badge">${s.mode}</span>
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
        if (ok) s.correct++; else s.wrong++;
        this._track(ok);
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
  _track(ok) {
    const st = window.appState;
    if (!st) return;
    st.progress[this.subject] = st.progress[this.subject] || {};
    const p = st.progress[this.subject][this.chapterId] = st.progress[this.subject][this.chapterId] || {};
    p.pyqsAttempted = (p.pyqsAttempted || 0) + 1;
    if (ok) p.pyqsCorrect = (p.pyqsCorrect || 0) + 1;
    Storage.save(st);
  },
  _finish() {
    const s = this.session;
    const area = K.el('pyqPlayArea');
    const total = s.correct + s.wrong;
    const acc = total ? Math.round(s.correct / total * 100) : 0;
    area.innerHTML = `<div class="q-finish">
      <h2>🏁 Session Complete</h2>
      <div class="pyq-stats">
        <span class="chip chip-green">✅ ${s.correct}</span>
        <span class="chip chip-red">❌ ${s.wrong}</span>
        <span class="chip chip-blue">📊 ${total}</span>
        <span class="chip chip-purple">🎯 ${acc}%</span>
      </div>
      <button class="btn btn-primary" id="pyqRestart">Practice again</button>
    </div>`;
    K.el('pyqRestart').onclick = () => this.render(this.subject, this.chapterId, this.container);
  }
};
window.PYQs = PYQs;
window.Pyqs = PYQs;
