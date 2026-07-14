/* Quick Revision Mode — 30s timer, no solutions, score only */
const RapidFire = {
  render(container) {
    const el = container || K.el('view-rapid');
    if (!el) return;
    this.el = el;
    el.innerHTML = `<div class="view-pad">
      <button class="btn-back" id="rfBack">← Home</button>
      <h1>⚡ Rapid Fire</h1>
      <p class="muted">One question at a time · 30s each · no solutions · score at the end</p>
      <div class="pyq-modes" id="rfPick">
        <button class="mode-card" data-s="physics">⚛️<span>Physics</span></button>
        <button class="mode-card" data-s="chemistry">🧪<span>Chemistry</span></button>
        <button class="mode-card" data-s="maths">📐<span>Maths</span></button>
        <button class="mode-card" data-s="all">🎲<span>Mixed</span></button>
      </div>
      <div id="rfArea"></div>
    </div>`;
    K.el('rfBack').onclick = () => { this._clearTimer(); App.goHome(); };
    el.querySelectorAll('#rfPick .mode-card').forEach(b => b.onclick = () => this.start(b.dataset.s));
  },

  _bank(subject) {
    const subjects = subject === 'all' ? ['physics','chemistry','maths'] : [subject];
    let all = [];
    subjects.forEach(s => {
      (SYLLABUS[s]?.chapters || []).forEach(ch => {
        const qs = PYQs._getBank(s, ch.id) || [];
        qs.forEach(q => all.push({ ...q, _subject: s, _chapter: ch.id }));
      });
    });
    return K.shuffle(all).slice(0, 15);
  },

  start(subject) {
    const qs = this._bank(subject);
    if (!qs.length) { K.toast('No questions available'); return; }
    this.session = { qs, i: 0, correct: 0, wrong: 0, subject };
    this._show();
  },

  _clearTimer() {
    if (this._t) clearInterval(this._t);
    this._t = null;
  },

  _show() {
    this._clearTimer();
    const s = this.session;
    const area = K.el('rfArea');
    if (!area) return;
    if (s.i >= s.qs.length) return this._finish();
    const q = s.qs[s.i];
    const opts = q.options || q.opts || [];
    let left = 30;
    area.innerHTML = `
      <div class="q-card rf-card">
        <div class="q-top">
          <span class="q-badge">${s.i+1}/${s.qs.length}</span>
          <span class="q-badge" id="rfTimer">⏱️ 30</span>
          <span class="q-badge">${K.subjEmoji(q._subject)} ${q._chapter}</span>
        </div>
        <div class="q-text">${q.q || q.question}</div>
        <div class="q-options">${opts.map((o,i)=>`<button class="q-option" data-i="${i}">${o}</button>`).join('')}</div>
      </div>`;
    const ans = typeof q.answer === 'number' ? q.answer : 0;
    let locked = false;
    const answer = (pick) => {
      if (locked) return;
      locked = true;
      this._clearTimer();
      const ok = pick === ans;
      if (ok) s.correct++; else {
        s.wrong++;
        Mistakes.add({
          subject: q._subject, chapterId: q._chapter,
          q: q.q || q.question, options: opts,
          picked: pick, pickedLabel: opts[pick],
          answer: ans, correctLabel: opts[ans],
          solution: q.solution || ''
        });
      }
      SRS.review(window.appState, q.id || (q._chapter + '_' + s.i), ok, { subject: q._subject, chapterId: q._chapter });
      Tracker.recordAnswerTimeOfDay(window.appState, ok);
      // progress
      const st = window.appState;
      st.progress[q._subject] = st.progress[q._subject] || {};
      const p = st.progress[q._subject][q._chapter] = st.progress[q._subject][q._chapter] || {};
      p.pyqsAttempted = (p.pyqsAttempted || 0) + 1;
      if (ok) p.pyqsCorrect = (p.pyqsCorrect || 0) + 1;
      Storage.save(st);
      s.i++;
      setTimeout(() => this._show(), 350);
    };
    area.querySelectorAll('.q-option').forEach(b => b.onclick = () => answer(+b.dataset.i));
    this._t = setInterval(() => {
      left--;
      const t = K.el('rfTimer');
      if (t) t.textContent = `⏱️ ${left}`;
      if (left <= 0) answer(-1);
    }, 1000);
  },

  _finish() {
    const s = this.session;
    const total = s.correct + s.wrong;
    K.el('rfArea').innerHTML = `<div class="q-finish">
      <h2>🏁 Rapid Fire Done</h2>
      <div class="pyq-stats">
        <span class="chip chip-green">✅ ${s.correct}</span>
        <span class="chip chip-red">❌ ${s.wrong}</span>
        <span class="chip chip-purple">🎯 ${total ? Math.round(s.correct/total*100) : 0}%</span>
      </div>
      <button class="btn btn-primary" id="rfAgain">Again</button>
    </div>`;
    K.el('rfAgain').onclick = () => this.start(s.subject);
  }
};
window.RapidFire = RapidFire;
