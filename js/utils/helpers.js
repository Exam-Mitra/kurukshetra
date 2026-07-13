/* ============================================
   KURUKSHETRA — Utility Helpers
   ============================================ */

const K = {
  // Date helpers
  todayKey() {
    const d = new Date();
    return d.toISOString().split('T')[0]; // YYYY-MM-DD
  },
  formatDate(d) {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  },
  daysAgo(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().split('T')[0];
  },
  // DOM helpers
  el(id) { return document.getElementById(id); },
  qsa(sel) { return document.querySelectorAll(sel); },
  qs(sel) { return document.querySelector(sel); },
  create(tag, attrs = {}, html = '') {
    const e = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'class') e.className = v;
      else if (k === 'onclick') e.onclick = v;
      else e.setAttribute(k, v);
    });
    if (html) e.innerHTML = html;
    return e;
  },
  // Random helpers
  rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; },
  pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; },
  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  // Math helpers for adaptive timer
  // Adaptive time = base time * difficulty multiplier * level multiplier
  adaptiveTime(difficulty, level) {
    const base = { basic: 60, medium: 120, advanced: 180, boss: 300 }; // seconds
    const levelMult = Math.max(0.6, 1 - (level - 1) * 0.05); // gets faster as you level up
    return Math.round(base[difficulty] * levelMult);
  },
  // Format time mm:ss
  fmtTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  },
  // Toast notification
  toast(msg, duration = 3000) {
    const t = K.el('toast');
    t.textContent = msg;
    t.classList.remove('hidden');
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => t.classList.add('hidden'), duration);
  },
  // Modal
  modal(html) {
    K.el('modalContent').innerHTML = html;
    K.el('modal').classList.remove('hidden');
  },
  closeModal() {
    K.el('modal').classList.add('hidden');
  },
  // Show view, hide others
  showView(viewId) {
    K.qsa('.view').forEach(v => v.classList.add('hidden'));
    K.el('view-' + viewId).classList.remove('hidden');
    K.qsa('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === viewId));
    window.scrollTo(0, 0);
    if (window.appState) window.appState.currentView = viewId;
  },
  // Day of week (0 = Sun, 1 = Mon, ..., 6 = Sat)
  dayOfWeek() { return new Date().getDay(); },
  isSchoolDay() { return K.dayOfWeek() === 0; }, // Sunday
  // Today subject based on day
  todaySubject() {
    const d = K.dayOfWeek();
    if (d === 1 || d === 4) return 'physics';
    if (d === 2 || d === 5) return 'chemistry';
    if (d === 3 || d === 6) return 'maths';
    return null; // Sunday
  },
  // Subject emoji
  subjEmoji(s) { return s === 'physics' ? '⚛️' : s === 'chemistry' ? '🧪' : '📐'; },
  subjName(s) { return s === 'physics' ? 'Physics' : s === 'chemistry' ? 'Chemistry' : 'Maths'; },
  // EXP to next level (increasing curve)
  expForLevel(level) {
    return Math.floor(100 * Math.pow(1.15, level - 1));
  },
  // Rank based on level
  rankForLevel(level) {
    const ranks = [
      { min: 1, name: 'Bronze', icon: '🥉' },
      { min: 5, name: 'Silver', icon: '🥈' },
      { min: 10, name: 'Gold', icon: '🥇' },
      { min: 20, name: 'Platinum', icon: '💠' },
      { min: 35, name: 'Diamond', icon: '💎' },
      { min: 55, name: 'Master', icon: '👑' },
      { min: 80, name: 'Grandmaster', icon: '⚜️' },
      { min: 120, name: 'Legend', icon: '🌟' }
    ];
    return ranks.filter(r => level >= r.min).pop() || ranks[0];
  }
};
