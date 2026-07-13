/* ============================================
   KURUKSHETRA — Sound System
   Uses Web Audio API to generate sounds (no assets needed)
   ============================================ */

const Sounds = {
  ctx: null,
  volume: 0.6,

  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Audio not supported');
    }
  },

  // Play a sound effect
  play(name) {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const vol = this.volume;
    const t = this.ctx.currentTime;

    switch (name) {
      case 'correct':
        this._tone(660, 0.1, vol * 0.3, t);
        this._tone(880, 0.15, vol * 0.3, t + 0.05);
        break;
      case 'wrong':
        this._tone(220, 0.2, vol * 0.3, t);
        this._tone(180, 0.3, vol * 0.2, t + 0.1);
        break;
      case 'levelup':
        this._tone(523, 0.1, vol * 0.3, t);
        this._tone(659, 0.1, vol * 0.3, t + 0.1);
        this._tone(784, 0.1, vol * 0.3, t + 0.2);
        this._tone(1047, 0.3, vol * 0.3, t + 0.3);
        break;
      case 'rankup':
        this._tone(392, 0.15, vol * 0.3, t);
        this._tone(523, 0.15, vol * 0.3, t + 0.15);
        this._tone(659, 0.15, vol * 0.3, t + 0.3);
        this._tone(784, 0.4, vol * 0.3, t + 0.45);
        break;
      case 'unlock':
        this._tone(800, 0.05, vol * 0.2, t);
        this._tone(1000, 0.05, vol * 0.2, t + 0.05);
        this._tone(1200, 0.1, vol * 0.3, t + 0.1);
        break;
      case 'click':
        this._tone(440, 0.03, vol * 0.15, t);
        break;
    }
  },

  // Generate a tone
  _tone(freq, dur, vol, time) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(vol, time + 0.01);
    gain.gain.linearRampToValueAtTime(0, time + dur);
    osc.start(time);
    osc.stop(time + dur);
  },

  setVolume(v) { this.volume = v / 100; }
};
