/* Keyboard shortcuts */
const Shortcuts = {
  init() {
    this.buffer = '';
    this._timer = null;
    document.addEventListener('keydown', e => this.onKey(e));
  },

  onKey(e) {
    const tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable) {
      if (e.key === 'Escape') e.target.blur();
      return;
    }
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      K.el('globalSearch')?.focus();
      return;
    }
    if (e.key === '?' || (e.shiftKey && e.key === '/')) {
      e.preventDefault();
      this.showHelp();
      return;
    }
    if (e.key === 'Escape') {
      if (document.body.classList.contains('reading-mode')) App.exitReadingMode();
      FileViewer.close?.();
      VideoPlayer.close?.();
      K.el('shortcutsModal')?.classList.add('hidden');
      return;
    }
    // tab 1-9
    if (e.key >= '1' && e.key <= '9' && App._chapter) {
      const tabs = ['notes','mindmap','cheatsheet','summary','pyqs','video','topper','resources','ncert'];
      const t = tabs[+e.key - 1];
      if (t) App._switchTab(t);
      return;
    }
    // g chord
    if (e.key === 'g') {
      this.buffer = 'g';
      clearTimeout(this._timer);
      this._timer = setTimeout(() => { this.buffer = ''; }, 800);
      return;
    }
    if (this.buffer === 'g') {
      this.buffer = '';
      if (e.key === 'h') App.goHome();
      else if (e.key === 's') App.showSettings();
      else if (e.key === 'b') App.showBookmarks();
      else if (e.key === 'f') App.showFormulas();
      else if (e.key === 'm') App.showMistakes();
      else if (e.key === 'a') App.showAnalytics();
      else if (e.key === 'p') App.showPapers();
      else if (e.key === 'r') App.showRapid();
    }
  },

  showHelp() {
    let m = K.el('shortcutsModal');
    if (!m) {
      m = document.createElement('div');
      m.id = 'shortcutsModal';
      m.className = 'modal';
      m.innerHTML = `<div class="modal-box" style="max-width:520px">
        <div class="modal-head"><h3>⌨️ Keyboard Shortcuts</h3>
        <button class="modal-close" id="scClose">✕</button></div>
        <div class="modal-body" style="padding:16px">
          <div class="shortcut-grid">
            <div><kbd>/</kbd> Search</div>
            <div><kbd>g</kbd> <kbd>h</kbd> Home</div>
            <div><kbd>g</kbd> <kbd>s</kbd> Settings</div>
            <div><kbd>g</kbd> <kbd>b</kbd> Bookmarks</div>
            <div><kbd>g</kbd> <kbd>f</kbd> Formulas</div>
            <div><kbd>g</kbd> <kbd>m</kbd> Mistakes</div>
            <div><kbd>g</kbd> <kbd>a</kbd> Analytics</div>
            <div><kbd>g</kbd> <kbd>p</kbd> Papers</div>
            <div><kbd>g</kbd> <kbd>r</kbd> Rapid Fire</div>
            <div><kbd>1</kbd>–<kbd>9</kbd> Switch tabs</div>
            <div><kbd>?</kbd> This help</div>
            <div><kbd>Esc</kbd> Close / exit reading</div>
          </div>
        </div>
      </div>`;
      document.body.appendChild(m);
      m.addEventListener('click', e => { if (e.target === m) m.classList.add('hidden'); });
      K.el('scClose').onclick = () => m.classList.add('hidden');
    }
    m.classList.remove('hidden');
  }
};
window.Shortcuts = Shortcuts;
