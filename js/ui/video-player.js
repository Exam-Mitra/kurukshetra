/* KURUKSHETRA V3.1 — Video player modal + tab card */
const VideoPlayer = {
  _token: 0,
  init() {
    const close = K.el('videoModalClose');
    const modal = K.el('videoModal');
    const frame = K.el('videoModalFrame');
    if (frame) frame.setAttribute('loading', 'lazy');
    if (close) close.onclick = () => this.close();
    if (modal) modal.addEventListener('click', e => { if (e.target === modal) this.close(); });
  },
  _esc(s) {
    return String(s ?? '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));
  },
  open(video) {
    if (!video?.videoId) return;
    const token = ++this._token;
    const t = K.el('videoModalTitle');
    const frame = K.el('videoModalFrame');
    const meta = K.el('videoModalMeta');
    const desc = K.el('videoModalDesc');
    const modal = K.el('videoModal');
    const body = frame?.closest('.video-modal-body');
    body?.querySelector('.video-fallback-screen')?.remove();
    if (t) t.textContent = video.title || 'Video';
    if (meta) meta.innerHTML = `<span>📺 ${this._esc(video.channel || '')}</span>
      <span>⏱️ ${this._esc(video.duration || '')}</span><span>👁️ ${this._esc(video.views || '')}</span>
      <span>⭐ ${this._esc(video.rating || '')}/5</span><span>🌐 ${this._esc(video.language || '')}</span>`;
    if (desc) desc.textContent = video.description || '';
    if (frame) {
      frame.classList.add('hidden');
      frame.src = 'about:blank';
      frame.setAttribute('loading', 'lazy');
    }
    if (modal) modal.classList.remove('hidden');

    const showFallback = () => {
      if (token !== this._token) return;
      const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent((video.title || '') + ' ' + (video.channel || ''))}`;
      const watchUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(video.videoId)}`;
      if (frame) {
        frame.src = 'about:blank';
        frame.classList.add('hidden');
      }
      body?.querySelector('.video-fallback-screen')?.remove();
      const fallback = document.createElement('div');
      fallback.className = 'video-fallback-screen';
      fallback.innerHTML = `
        <div class="video-fallback-emoji">🎥</div>
        <h3>Video not available</h3>
        <p>The video "${this._esc(video.title)}" could not be verified with YouTube.</p>
        <div class="video-actions-row">
          <a href="${watchUrl}" target="_blank" rel="noopener" class="btn btn-primary">Open on YouTube ↗</a>
          <a href="${searchUrl}" target="_blank" rel="noopener" class="btn">Search on YouTube →</a>
        </div>`;
      if (body && desc) body.insertBefore(fallback, desc);
    };

    const loadEmbed = () => {
      if (token !== this._token || !frame) return;
      body?.querySelector('.video-fallback-screen')?.remove();
      frame.classList.remove('hidden');
      frame.src = `https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`;
    };

    const controller = window.AbortController ? new AbortController() : null;
    const timer = setTimeout(() => controller?.abort(), 6000);
    fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${encodeURIComponent(video.videoId)}&format=json`, {
      signal: controller?.signal
    })
      .then(r => {
        if (!r.ok) throw new Error('Video not found');
        loadEmbed();
      })
      .catch(showFallback)
      .finally(() => clearTimeout(timer));
  },
  close() {
    this._token++;
    const modal = K.el('videoModal');
    const frame = K.el('videoModalFrame');
    const body = frame?.closest('.video-modal-body');
    body?.querySelector('.video-fallback-screen')?.remove();
    if (frame) {
      frame.src = 'about:blank';
      frame.classList.remove('hidden');
    }
    if (modal) modal.classList.add('hidden');
  },
  render(subject, chapterId, container) {
    const el = container || K.el('tabContent');
    if (!el) return;
    const video = (window.BEST_VIDEOS || {})[subject]?.[chapterId];
    if (!video) {
      el.innerHTML = `<div class="empty-state"><h2>🎥 Best Video — Coming Soon</h2></div>`;
      return;
    }
    const thumb = `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;
    const title = this._esc(video.title);
    el.innerHTML = `<div class="video-card" id="bestVideoCard">
      <div class="video-thumb-wrap">
        <img class="video-thumb" loading="lazy" src="${thumb}" alt="${title}"
          onerror="this.onerror=null; this.style.display='none'; this.parentElement.classList.add('video-fallback');"/>
        <div class="video-play">▶</div>
      </div>
      <div class="video-info">
        <h2>${title}</h2>
        <div class="video-meta">
          <span>📺 ${this._esc(video.channel)}</span><span>⏱️ ${this._esc(video.duration)}</span>
          <span>👁️ ${this._esc(video.views)}</span><span>⭐ ${this._esc(video.rating)}/5</span>
          <span>🌐 ${this._esc(video.language)}</span>
        </div>
        <p class="muted">${this._esc(video.description || '')}</p>
        <div class="video-actions-row">
          <button class="btn btn-primary" id="playBestVideo">▶ Play</button>
          <a class="btn btn-ghost" href="https://www.youtube.com/watch?v=${video.videoId}" target="_blank" rel="noopener">Open on YouTube ↗</a>
        </div>
      </div>
    </div>`;
    const play = () => VideoPlayer.open(video);
    K.el('playBestVideo')?.addEventListener('click', play);
    el.querySelector('.video-thumb-wrap')?.addEventListener('click', play);
  }
};
window.VideoPlayer = VideoPlayer;
