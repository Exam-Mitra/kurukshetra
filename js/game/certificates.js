/* ============================================
   KURUKSHETRA — Certificates
   Generate certificates for chapter/rank/subject
   ============================================ */

const Certificates = {
  // Generate a certificate
  generate(state, type, data) {
    const cert = {
      id: 'cert_' + Date.now(),
      type, // 'chapter' | 'rank' | 'subject'
      data,
      date: K.todayKey(),
      name: state.warrior.name,
      level: state.warrior.level
    };
    state.certificates.push(cert);
    Storage.save(state);
    this.show(cert);
    return cert;
  },

  // Display certificate in modal
  show(cert) {
    let title = '', achievement = '', stats = '';
    if (cert.type === 'chapter') {
      title = 'Chapter Conquered';
      achievement = `Completed <b>${cert.data.chapterName}</b> in ${K.subjName(cert.data.subject)}`;
      stats = `
        <div class="cert-stat"><div class="stat-num">${cert.data.correct}/${cert.data.total}</div><div class="stat-label">Accuracy</div></div>
        <div class="cert-stat"><div class="stat-num">${cert.data.tricksUnlocked}</div><div class="stat-label">Tricks Unlocked</div></div>
      `;
    } else if (cert.type === 'rank') {
      title = 'Rank Achieved';
      achievement = `Reached the rank of <b>${cert.data.rank.icon} ${cert.data.rank.name}</b>`;
      stats = `
        <div class="cert-stat"><div class="stat-num">Lv.${cert.data.level}</div><div class="stat-label">Warrior Level</div></div>
        <div class="cert-stat"><div class="stat-num">${cert.data.totalExp}</div><div class="stat-label">Total EXP</div></div>
      `;
    } else if (cert.type === 'subject') {
      title = 'Subject Master';
      achievement = `Completed all chapters of <b>${K.subjName(cert.data.subject)}</b>`;
      stats = `
        <div class="cert-stat"><div class="stat-num">${cert.data.chaptersCompleted}</div><div class="stat-label">Chapters</div></div>
        <div class="cert-stat"><div class="stat-num">${cert.data.tricksCount}</div><div class="stat-label">Tricks</div></div>
      `;
    }

    K.modal(`
      <div class="cert-preview">
        <div class="cert-header">
          <div class="cert-title">⚔️ KURUKSHETRA ⚔️</div>
          <div class="cert-subtitle">CERTIFICATE OF ${title.toUpperCase()}</div>
        </div>
        <div class="cert-body">
          <p style="color:var(--text-secondary);">This is to certify that</p>
          <div class="cert-name">${cert.name}</div>
          <div class="cert-achievement">${achievement}</div>
          <div class="cert-stats">${stats}</div>
        </div>
        <div class="cert-footer">
          Awarded on ${K.formatDate(cert.date)}<br>
          "A warrior's strength is forged in discipline."
        </div>
      </div>
      <div style="display:flex; gap:10px; margin-top:14px; justify-content:center;">
        <button class="btn-primary" id="downloadCert">📥 Download</button>
        <button class="btn-secondary" onclick="K.closeModal()">Close</button>
      </div>
    `);
    K.el('downloadCert').onclick = () => this.download(cert);
  },

  // Download as image (use html2canvas or simple print)
  download(cert) {
    // Simple: print the certificate
    const w = window.open('', '_blank');
    w.document.write(`
      <html><head><title>Kurukshetra Certificate</title>
      <style>
        body { font-family: 'Segoe UI', sans-serif; background: linear-gradient(135deg, #1a1a28 0%, #2a1a3d 100%); color: #f4e9d0; padding: 40px; text-align: center; }
        .cert { max-width: 700px; margin: 0 auto; border: 4px solid #ffd700; border-radius: 16px; padding: 40px; background: #1a1a28; }
        h1 { background: linear-gradient(135deg, #ff6b35, #ffd700); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; font-size: 2.5em; letter-spacing: 4px; }
        h2 { color: #ffd700; margin: 20px 0; }
        .footer { color: #6b6354; margin-top: 30px; font-size: 0.9em; }
      </style></head>
      <body><div class="cert">
        <h1>⚔️ KURUKSHETRA ⚔️</h1>
        <h2>Certificate — ${cert.type.toUpperCase()}</h2>
        <p>${cert.name}</p>
        <p>Level ${cert.level} · ${K.formatDate(cert.date)}</p>
        <p class="footer">"A warrior's strength is forged in discipline."</p>
      </div>
      <script>window.print();</script>
      </body></html>
    `);
    w.document.close();
  }
};
