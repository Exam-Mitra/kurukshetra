/* KURUKSHETRA V3 — Mind Map (SVG radial) */
const MindMap = {
  render(subject, chapterId, container) {
    const el = container || K.el('tabContent');
    if (!el) return;
    const content = (window.STUDY_CONTENT || {})[subject]?.[chapterId];
    if (!content || !content.mindmap) {
      el.innerHTML = `<div class="empty-state"><h2>🧠 Mind Map — Coming Soon</h2></div>`;
      return;
    }
    const central = content.central || content.name || chapterId;
    const nodes = Array.isArray(content.mindmap) ? content.mindmap : (content.mindmap.nodes || []);
    el.innerHTML = `<div class="mindmap-container">${this._buildSVG(central, nodes)}</div>`;
  },
  _buildSVG(central, nodes) {
    const W = 1000, H = 640, cx = W / 2, cy = H / 2;
    const n = Math.max(nodes.length, 1);
    const R = 220;
    let svg = `<svg class="mindmap-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs><filter id="glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6366f1"/><stop offset="100%" stop-color="#a855f7"/></linearGradient>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#818cf8"/><stop offset="100%" stop-color="#c084fc"/></linearGradient></defs>`;
    nodes.forEach((node, i) => {
      const ang = (i / n) * Math.PI * 2 - Math.PI / 2;
      const x = cx + R * Math.cos(ang), y = cy + R * Math.sin(ang);
      svg += `<line class="mm-line" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`;
      svg += `<circle class="mm-branch" cx="${x}" cy="${y}" r="48" filter="url(#glow)"/>`;
      svg += `<text class="mm-text" x="${x}" y="${y}" dy="0.35em">${this._wrap(node.label, 12)}</text>`;
      const kids = node.children || [];
      kids.forEach((sub, j) => {
        const sa = ang + (j - (kids.length - 1) / 2) * 0.45;
        const sx = x + 110 * Math.cos(sa), sy = y + 110 * Math.sin(sa);
        svg += `<line class="mm-line mm-dash" x1="${x}" y1="${y}" x2="${sx}" y2="${sy}"/>`;
        svg += `<circle class="mm-child" cx="${sx}" cy="${sy}" r="28"/>`;
        svg += `<text class="mm-text mm-text-sm" x="${sx}" y="${sy}" dy="0.35em">${this._wrap(sub.label, 10)}</text>`;
      });
    });
    svg += `<circle class="mm-central" cx="${cx}" cy="${cy}" r="70" filter="url(#glow)"/>`;
    svg += `<text class="mm-text mm-text-c" x="${cx}" y="${cy}" dy="0.35em">${this._wrap(central, 14)}</text></svg>`;
    return svg;
  },
  _wrap(t, max) {
    if (!t) return '';
    if (t.length <= max) return t.replace(/&/g,'&amp;').replace(/</g,'&lt;');
    const words = t.split(' ');
    let line = '', lines = [];
    words.forEach(w => {
      if ((line + ' ' + w).trim().length > max && line) { lines.push(line); line = w; }
      else line = (line + ' ' + w).trim();
    });
    if (line) lines.push(line);
    return lines.map((l, i) => `<tspan x="0" dy="${i === 0 ? 0 : 14}">${l.replace(/&/g,'&amp;')}</tspan>`).join('')
      .replace(/x="0"/g, '') // simplified: single line truncate
      || t.slice(0, max);
  }
};
// Fix wrap to simple truncate for tspan issues
MindMap._wrap = function(t, max) {
  if (!t) return '';
  const s = String(t);
  const out = s.length > max + 2 ? s.slice(0, max) + '…' : s;
  return out.replace(/&/g,'&amp;').replace(/</g,'&lt;');
};
window.MindMap = MindMap;
