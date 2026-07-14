/* KURUKSHETRA V3.1 — Resources tab with health/report actions */
const Resources = {
  _esc(s) {
    return String(s ?? '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));
  },
  _isAllowlisted(url) {
    try {
      const host = new URL(url).hostname.replace(/^www\./, '');
      const list = window.VERIFIED_URLS?.web || [];
      return list.some(item => {
        try {
          return new URL(item).hostname.replace(/^www\./, '') === host;
        } catch (e) {
          return String(item).includes(host);
        }
      });
    } catch (e) {
      return false;
    }
  },
  _reportUrl(resource, subject, chapterId) {
    const title = encodeURIComponent(`Broken resource: ${subject}/${chapterId} ${resource.name}`);
    const body = encodeURIComponent(`Resource name: ${resource.name}\nURL: ${resource.url}\nChapter: ${subject}/${chapterId}\n\nWhat happened?`);
    return `https://github.com/Exam-Mitra/kurukshetra/issues/new?title=${title}&body=${body}`;
  },
  render(subject, chapterId, container) {
    const el = container || K.el('tabContent');
    if (!el) return;
    const list = (window.BEST_RESOURCES || {})[subject]?.[chapterId] || [];
    if (!list.length) {
      el.innerHTML = `<div class="empty-state"><h2>🔗 Resources — Coming Soon</h2></div>`;
      return;
    }
    const items = list.map((r, i) => {
      const allow = this._isAllowlisted(r.url);
      return `
      <div class="resource-item" data-idx="${i}">
        <div class="resource-icon">${this._esc(r.icon || '🔗')}</div>
        <div class="resource-info">
          <div class="resource-name">${this._esc(r.name)}</div>
          <div class="resource-desc">${r.type === 'pdf' ? 'PDF document' : 'Web resource'} · ${this._esc(new URL(r.url).hostname.replace(/^www\./, ''))}</div>
          <div class="resource-health ${allow ? 'health-good' : 'health-pending'}" data-health="${i}">
            ${allow ? '● Verified source' : '○ Ready to check'}
          </div>
        </div>
        <div class="resource-actions">
          <button class="btn btn-primary btn-sm res-open">Open ↗</button>
          <button class="btn btn-sm res-preview">Preview</button>
          <a class="btn btn-ghost btn-sm res-report" href="${this._reportUrl(r, subject, chapterId)}" target="_blank" rel="noopener">Report</a>
        </div>
      </div>`;
    }).join('');
    el.innerHTML = `<h2>🔗 Best Free Resources</h2>
      <p class="muted">Vedantu solutions, NCERT mirrors, Examside PYQs, and eSaral notes. Open-in-new-tab is primary because many education sites block iframe previews.</p>
      <div class="resource-list">${items}</div>`;
    el.querySelectorAll('.resource-item').forEach((row, i) => {
      const r = list[i];
      row.querySelector('.res-open').onclick = () => window.open(r.url, '_blank', 'noopener');
      row.querySelector('.res-preview').onclick = () => FileViewer.open(r.name, r.url);
    });
    this._checkVisibleLinks(el, list);
  },
  _checkVisibleLinks(el, list) {
    list.forEach((r, i) => {
      const badge = el.querySelector(`[data-health="${i}"]`);
      if (!badge || this._isAllowlisted(r.url)) return;
      badge.textContent = '○ Checking…';
      fetch(r.url, { method: 'HEAD', mode: 'no-cors', cache: 'no-store' })
        .then(() => {
          badge.textContent = '● Browser can reach source';
          badge.classList.remove('health-pending', 'health-bad');
          badge.classList.add('health-good');
        })
        .catch(() => {
          badge.textContent = '● Open directly if blocked';
          badge.classList.remove('health-pending');
          badge.classList.add('health-warn');
        });
    });
  }
};
window.Resources = Resources;
