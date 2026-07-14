/* KURUKSHETRA V3 — Video player modal + tab card */
const VideoPlayer = {
  init() {
    const close = K.el('videoModalClose');
    const modal = K.el('videoModal');
    if (close) close.onclick = () => this.close();
    if (modal) modal.addEventListener('click', e => { if (e.target === modal) this.close(); });
  },
  open(video) {
    if (!video) return;
    const t = K.el('videoModalTitle');
    const frame = K.el('videoModalFrame');
    const meta = K.el('videoModalMeta');
    const desc = K.el('videoModalDesc');
    const modal = K.el('videoModal');
    if (t) t.textContent = video.title || 'Video';
    if (meta) meta.innerHTML = `<span>📺 ${video.channel || ''}</span>
      <span>⏱️ ${video.duration || ''}</span><span>👁️ ${video.views || ''}</span>
      <span>⭐ ${video.rating || ''}/5</span><span>🌐 ${video.language || ''}</span>`;
    if (desc) desc.textContent = video.description || '';
    if (frame) frame.src = `https://www.youtube.com/embed/${video.videoId}?autoplay=1`;
    if (modal) modal.classList.remove('hidden');
  },
  close() {
    const modal = K.el('videoModal');
    const frame = K.el('videoModalFrame');
    if (frame) frame.src = 'about:blank';
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
    const thumb = `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`;
    el.innerHTML = `<div class="video-card" id="bestVideoCard">
      <div class="video-thumb-wrap">
        <img class="video-thumb" src="${thumb}" alt="${video.title}"
          onerror="this.src='https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg'"/>
        <div class="video-play">▶</div>
      </div>
      <div class="video-info">
        <h2>${video.title}</h2>
        <div class="video-meta">
          <span>📺 ${video.channel}</span><span>⏱️ ${video.duration}</span>
          <span>👁️ ${video.views}</span><span>⭐ ${video.rating}/5</span>
          <span>🌐 ${video.language}</span>
        </div>
        <p class="muted">${video.description || ''}</p>
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
