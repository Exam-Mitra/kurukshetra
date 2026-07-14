/* KURUKSHETRA V3.1 — File / web resource viewer modal */
const FileViewer = {
  _token: 0,
  init() {
    const close = K.el('fileModalClose');
    const modal = K.el('fileModal');
    if (close) close.onclick = () => this.close();
    if (modal) modal.addEventListener('click', e => { if (e.target === modal) this.close(); });
  },
  open(title, url) {
    if (!url) return;
    const token = ++this._token;
    const t = K.el('fileModalTitle');
    const link = K.el('fileModalLink');
    const notice = K.el('fileModalNotice');
    const noticeLink = K.el('fileModalNoticeLink');
    const frame = K.el('fileModalFrame');
    const modal = K.el('fileModal');
    if (t) t.textContent = title || 'Resource';
    if (link) {
      link.href = url;
      link.textContent = 'Open in new tab ↗';
      link.classList.remove('hidden', 'btn-ghost');
      link.classList.add('btn-primary');
    }
    if (notice) {
      notice.classList.remove('warn');
      notice.innerHTML = `💡 If the preview is blank, the site may block embedding. <a id="fileModalNoticeLink" href="${url}" target="_blank" rel="noopener">Open directly →</a>`;
    }
    if (noticeLink) noticeLink.href = url;
    if (frame) {
      frame.onload = () => {
        if (token !== this._token) return;
        try {
          const doc = frame.contentDocument;
          if (doc && !doc.body?.innerText && !doc.body?.children?.length) {
            this._showLoadWarning(url);
          }
        } catch (e) {
          // Cross-origin frames are expected. If onload fires, the browser reached the resource.
        }
      };
      frame.onerror = () => this._showLoadWarning(url);
      frame.src = 'about:blank';
      setTimeout(() => {
        if (token === this._token) frame.src = url;
      }, 0);
    }
    if (modal) modal.classList.remove('hidden');
    setTimeout(() => {
      if (token !== this._token) return;
      if (modal && !modal.classList.contains('hidden')) {
        K.toast('⚠️ If the preview is blank, use Open in new tab', 4000);
        this._showLoadWarning(url, false);
      }
    }, 3500);
  },
  _showLoadWarning(url, toast = true) {
    const notice = K.el('fileModalNotice');
    if (notice) {
      notice.classList.add('warn');
      notice.innerHTML = `⚠️ This resource may not load in the preview. <a href="${url}" target="_blank" rel="noopener">Open in new tab →</a>`;
    }
    if (toast) K.toast('⚠️ This resource is not loading. Try opening in a new tab.', 4000);
  },
  close() {
    this._token++;
    const modal = K.el('fileModal');
    const frame = K.el('fileModalFrame');
    if (frame) {
      frame.onload = null;
      frame.onerror = null;
      frame.src = 'about:blank';
    }
    if (modal) modal.classList.add('hidden');
  }
};
window.FileViewer = FileViewer;
