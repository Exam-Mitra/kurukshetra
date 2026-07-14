# Kurukshetra — JEE 2028 Study Hub (V3)

**Pure glassmorphism study hub for JEE 2028. 40 chapters × 8 resource tabs. No game mechanics — just focused study.**

## What's inside

| Subject | Chapters |
|---------|----------|
| Physics | 14 |
| Chemistry | 13 |
| Maths | 13 |

For every chapter you get:

1. **📖 Notes** — JEE-level study notes (full for Units & Measurements and Motion in a Straight Line; framework + formulas for all others)
2. **🧠 Mind Map** — SVG radial concept map
3. **📋 Cheat Sheet** — formulas with click-to-copy
4. **🎯 Summary** — 15-point revision list
5. **📚 PYQs** — self-contained practice player (mixed / basic / medium / advanced / DPP)
6. **🎥 Best Video** — curated YouTube lesson with modal player
7. **📑 Topper Notes** — links to topper resources
8. **🔗 Resources** — NCERT PDF, PW material, Examside PYQs, LearnCBSE solutions

## Features

- Glassmorphism UI (light / dark themes)
- Global search across chapters, formulas, and videos
- Chapter bookmarks + progress tracking (localStorage `kurukshetra_v3`)
- Export / import progress JSON
- PWA manifest (installable)
- Fully static — open `index.html` or serve via GitHub Pages

## Run locally

```bash
# any static server, e.g.
python3 -m http.server 8080
# then open http://localhost:8080
```

## Project layout

```
index.html
manifest.json
css/study.css
js/
  app.js
  data/          # syllabus, chapter Q banks, PYQs, study-content, videos, resources
  storage/save.js
  utils/helpers.js
  ui/            # notes, mindmap, cheatsheet, summary, pyqs, video, resources, ...
```

## Storage

Progress is stored under `localStorage` key **`kurukshetra_v3`**:

- `progress[subject][chapterId]` — notes/mindmap/cheatsheet/summary/video flags, PYQ counts, lastVisited
- `bookmarks` / `warrior.bookmarkedChapters`
- `settings.theme`, `settings.fontSize`

## License

Educational use for JEE aspirants.
