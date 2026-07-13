/* ============================================
   KURUKSHETRA — Adaptive Timer
   Time varies by difficulty + player level
   ============================================ */

const Timer = {
  interval: null,
  remaining: 0,
  onExpire: null,

  start(seconds, onExpire) {
    this.stop();
    this.remaining = seconds;
    this.onExpire = onExpire;
    this._updateDisplay();
    this.interval = setInterval(() => this._tick(), 1000);
  },

  _tick() {
    this.remaining--;
    this._updateDisplay();
    if (this.remaining <= 0) {
      this.stop();
      if (this.onExpire) this.onExpire();
    }
  },

  stop() {
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
  },

  pause() { this.stop(); },
  resume(seconds) { this.start(seconds || this.remaining, this.onExpire); },

  _updateDisplay() {
    const el = K.el('qTimer');
    if (!el) return;
    el.textContent = K.fmtTime(this.remaining);
    if (this.remaining <= 30) el.classList.add('warning');
    else el.classList.remove('warning');
  }
};
