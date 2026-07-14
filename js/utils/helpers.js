/* ============================================
   KURUKSHETRA V3 — Utility Helpers
   ============================================ */

const K = {
  todayKey() {
    const d = new Date();
    return d.toISOString().split('T')[0];
  },
  formatDate(d) {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  },
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
  toast(msg, duration = 3000) {
    const t = K.el('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.remove('hidden');
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => t.classList.add('hidden'), duration);
  },
  modal(html) {
    const mc = K.el('modalContent');
    const m = K.el('modal');
    if (mc) mc.innerHTML = html;
    if (m) m.classList.remove('hidden');
  },
  closeModal() {
    const m = K.el('modal');
    if (m) m.classList.add('hidden');
  },
  showView(viewId) {
    K.qsa('.view').forEach(v => v.classList.add('hidden'));
    const el = K.el('view-' + viewId);
    if (el) el.classList.remove('hidden');
    window.scrollTo(0, 0);
    if (window.appState) window.appState.currentView = viewId;
  },
  subjEmoji(s) { return s === 'physics' ? '⚛️' : s === 'chemistry' ? '🧪' : '📐'; },
  subjName(s) { return s === 'physics' ? 'Physics' : s === 'chemistry' ? 'Chemistry' : 'Maths'; }
};

window.K = K;
