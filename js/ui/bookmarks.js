/* KURUKSHETRA V3 — Chapter bookmarks */
const Bookmarks = {
  key(subject, chapterId) { return `${subject}:${chapterId}`; },
  isBookmarked(subject, chapterId) {
    const st = window.appState;
    if (!st) return false;
    const k = this.key(subject, chapterId);
    return (st.warrior?.bookmarkedChapters || []).includes(k) ||
      (st.bookmarks || []).some(b => b.type === 'chapter' && b.id === k);
  },
  add(subject, chapterId, name) {
    const st = window.appState;
    if (!st) return;
    st.warrior = st.warrior || { bookmarkedChapters: [] };
    st.warrior.bookmarkedChapters = st.warrior.bookmarkedChapters || [];
    st.bookmarks = st.bookmarks || [];
    const k = this.key(subject, chapterId);
    if (!st.warrior.bookmarkedChapters.includes(k)) st.warrior.bookmarkedChapters.push(k);
    if (!st.bookmarks.find(b => b.id === k)) {
      st.bookmarks.push({ type: 'chapter', id: k, title: name, subject, chapterId, savedAt: K.todayKey() });
    }
    Storage.save(st);
    K.toast('🔖 Bookmarked!');
  },
  remove(subject, chapterId) {
    const st = window.appState;
    if (!st) return;
    const k = this.key(subject, chapterId);
    if (st.warrior?.bookmarkedChapters) {
      st.warrior.bookmarkedChapters = st.warrior.bookmarkedChapters.filter(x => x !== k);
    }
    st.bookmarks = (st.bookmarks || []).filter(b => b.id !== k);
    Storage.save(st);
    K.toast('Bookmark removed');
  },
  toggle(subject, chapterId, name) {
    if (this.isBookmarked(subject, chapterId)) this.remove(subject, chapterId);
    else this.add(subject, chapterId, name);
  },
  render(container) {
    const el = container || K.el('view-bookmarks');
    if (!el) return;
    const st = window.appState;
    const list = (st?.bookmarks || []).filter(b => b.type === 'chapter');
    if (!list.length) {
      el.innerHTML = `<div class="view-pad"><h1>🔖 Bookmarks</h1>
        <p class="muted" style="text-align:center;padding:40px">No bookmarked chapters yet.</p></div>`;
      return;
    }
    el.innerHTML = `<div class="view-pad"><h1>🔖 Bookmarks</h1>
      <div class="chapters-list">${list.map((b, i) => `
        <div class="chapter-row" data-i="${i}">
          <div class="chapter-num">${K.subjEmoji(b.subject)}</div>
          <div class="chapter-info">
            <div class="chapter-name">${b.title}</div>
            <div class="chapter-meta"><span>${K.subjName(b.subject)}</span><span>Saved ${b.savedAt || ''}</span></div>
          </div>
          <div class="chapter-actions">
            <button class="btn btn-primary btn-sm bm-open">Open →</button>
            <button class="btn btn-danger btn-sm bm-rm">Remove</button>
          </div>
        </div>`).join('')}</div></div>`;
    el.querySelectorAll('.chapter-row').forEach((row, i) => {
      const b = list[i];
      row.querySelector('.bm-open').onclick = () => App.openChapter(b.subject, b.chapterId);
      row.querySelector('.bm-rm').onclick = () => { this.remove(b.subject, b.chapterId); this.render(el); };
    });
  }
};
window.Bookmarks = Bookmarks;
