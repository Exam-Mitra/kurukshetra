/* ============================================
   KURUKSHETRA — Animations
   Code-only: CSS + Canvas
   ============================================ */

const Animations = {
  // Floating EXP gain
  expGain(amount) {
    const el = document.createElement('div');
    el.className = 'exp-float';
    el.textContent = `+${amount} EXP`;
    el.style.left = (window.innerWidth / 2 - 50) + 'px';
    el.style.top = (window.innerHeight / 2) + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  },

  // Combo popup
  comboPopup(combo) {
    const el = document.createElement('div');
    el.className = 'combo-popup';
    el.textContent = `${combo}x COMBO!`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  },

  // Correct/wrong flash
  flash(type) {
    const el = document.createElement('div');
    el.className = type + '-flash';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 600);
  },

  // Level up animation
  levelUp(level) {
    const overlay = document.createElement('div');
    overlay.className = 'level-up-overlay';
    overlay.innerHTML = `
      <div class="level-up-particles" id="luParticles"></div>
      <div class="level-up-content">
        <p style="color:var(--text-primary); font-size:1.2em;">⚔️ LEVEL UP ⚔️</p>
        <div class="lvl-num">${level}</div>
        <p>You have grown stronger, warrior!</p>
      </div>
    `;
    document.body.appendChild(overlay);
    this._spawnParticles('luParticles', 30);
    setTimeout(() => overlay.remove(), 3000);
    overlay.onclick = () => overlay.remove();
  },

  // Rank up animation
  rankUp(rank) {
    const overlay = document.createElement('div');
    overlay.className = 'rank-up';
    overlay.innerHTML = `
      <div class="rank-up-content">
        <div class="rank-icon">${rank.icon}</div>
        <h1>RANK UP</h1>
        <p style="font-size:1.5em; font-weight:900; color:var(--accent-gold);">${rank.name}</p>
        <p>The battlefield bows to you.</p>
      </div>
    `;
    document.body.appendChild(overlay);
    this._spawnConfetti();
    setTimeout(() => overlay.remove(), 3500);
    overlay.onclick = () => overlay.remove();
  },

  // Trick unlock
  trickUnlock(name) {
    const el = document.createElement('div');
    el.className = 'trick-unlock';
    el.innerHTML = `
      <h2>🪄 TRICK UNLOCKED</h2>
      <div class="trick-icon">✨</div>
      <div class="trick-name">${name}</div>
      <p style="color:var(--text-secondary); font-size:0.9em; margin-top:6px;">Saved in your inventory</p>
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2500);
  },

  // Achievement popup
  achievement(title, text) {
    const el = document.createElement('div');
    el.className = 'achievement';
    el.innerHTML = `
      <div class="ach-icon">🏆</div>
      <div class="ach-text">
        <h4>${title}</h4>
        <p>${text}</p>
      </div>
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4500);
  },

  // Confetti burst
  _spawnConfetti() {
    const canvas = document.createElement('canvas');
    canvas.className = 'confetti-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const particles = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12 - 5,
        r: Math.random() * 5 + 2,
        color: ['#ffd700', '#ff6b35', '#ff4500', '#ff9933'][Math.floor(Math.random() * 4)],
        life: 1
      });
    }
    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3;
        p.life -= 0.015;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      frame++;
      if (frame < 120) requestAnimationFrame(animate);
      else { canvas.remove(); }
    };
    animate();
  },

  // Particle spawner for level up
  _spawnParticles(id, count) {
    const cont = K.el(id);
    if (!cont) return;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'lu-particle';
      p.style.left = '50%';
      p.style.top = '50%';
      p.style.setProperty('--tx', (Math.random() - 0.5) * 800 + 'px');
      p.style.setProperty('--ty', (Math.random() - 0.5) * 600 + 'px');
      p.style.animationDelay = Math.random() * 0.5 + 's';
      cont.appendChild(p);
    }
  }
};
