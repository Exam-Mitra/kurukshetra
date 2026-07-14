/* KURUKSHETRA V3 — File / PDF viewer modal */
const FileViewer = {
  init() {
    const close = K.el('fileModalClose');
    const modal = K.el('fileModal');
    if (close) close.onclick = () => this.close();
    if (modal) modal.addEventListener('click', e => { if (e.target === modal) this.close(); });
  },
  open(title, url) {
    const t = K.el('fileModalTitle');
    const link = K.el('fileModalLink');
    const frame = K.el('fileModalFrame');
    const modal = K.el('fileModal');
    if (t) t.textContent = title || 'Resource';
    if (link) { link.href = url; link.classList.remove('hidden'); }
    if (frame) frame.src = url;
    if (modal) modal.classList.remove('hidden');
  },
  close() {
    const modal = K.el('fileModal');
    const frame = K.el('fileModalFrame');
    if (frame) frame.src = 'about:blank';
    if (modal) modal.classList.add('hidden');
  }
};
window.FileViewer = FileViewer;
