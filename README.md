# ⚔️ KURUKSHETRA — JEE 2028 Sigma Edition

A complete gamified JEE prep app for Class 11 (Physics, Chemistry, Maths).

## 🎮 Features (30+)
- ✅ Avatar system (8 warrior skins, unlock by level)
- ✅ EXP & Level system (with combo multipliers)
- ✅ 8 Ranks: Bronze → Silver → Gold → Platinum → Diamond → Master → Grandmaster → Legend
- ✅ Daily streak with 1 day grace per week
- ✅ Daily login bonus + loot boxes
- ✅ 3 random daily missions + completion rewards
- ✅ Adaptive timer (gets faster as you level up)
- ✅ All 4 question types: MCQ single, MCQ multi, Numeric, Subjective
- ✅ Mixed difficulty sessions: Basic + Medium + Advanced + Boss
- ✅ Tricks inventory — locked until unlocked through questions
- ✅ Cheat sheets for every chapter
- ✅ Weakness Vault — auto-tags weak topics
- ✅ Battle Calendar — 30-day streak visualization
- ✅ War Map — visual chapter progress (linear path)
- ✅ Competition Arena: Solo PB, Vs AI Bot, Vs Friend (link)
- ✅ Certificates (Chapter, Rank, Subject)
- ✅ Code-only animations (CSS + Canvas confetti)
- ✅ Web Audio API sounds (no asset files needed)
- ✅ Daily 8:15 PM reminder + streak warnings
- ✅ School Mode (Sunday — lighter tasks, revision only)
- ✅ LocalStorage save + Export/Import JSON
- ✅ Dark/Light theme toggle
- ✅ Responsive (mobile, tablet, desktop)
- ✅ Full Class 11 syllabus: 14 Physics + 13 Chemistry + 13 Maths chapters
- ✅ 5+ questions per chapter with JEE-pattern solutions
- ✅ 3+ killer tricks per chapter (the "trick that works on all questions of that type")
- ✅ Honest teaching on every wrong answer

## 📂 File Structure
```
Kurukshetra/
├── index.html
├── css/
│   ├── style.css         (main theme + layout)
│   ├── game.css          (animations, certificates, level up)
│   └── responsive.css    (mobile breakpoints)
├── js/
│   ├── app.js            (main controller)
│   ├── data/
│   │   ├── syllabus.js   (Class 11 full syllabus)
│   │   ├── physics.js    (Physics: 14 chapters, questions, tricks, cheatsheets)
│   │   ├── chemistry.js  (Chemistry: 13 chapters)
│   │   └── maths.js      (Maths: 13 chapters)
│   ├── game/
│   │   ├── exp.js        (EXP, level, combo)
│   │   ├── streak.js     (1-day grace streak)
│   │   ├── timer.js      (adaptive timer)
│   │   ├── tasks.js      (HW, DPP, lectures)
│   │   ├── questions.js  (question player — 4 types)
│   │   ├── tricks.js     (locked tricks inventory)
│   │   ├── weak.js       (weakness vault)
│   │   ├── missions.js   (3 random daily missions)
│   │   ├── school.js     (Sunday school mode)
│   │   ├── competition.js(solo, vs AI bot, vs friend link)
│   │   ├── avatar.js     (8 warrior skins)
│   │   └── certificates.js (downloadable certificates)
│   ├── storage/
│   │   └── save.js       (localStorage + import/export)
│   ├── ui/
│   │   ├── dashboard.js  (top bar, subject tiles, calendar)
│   │   ├── war-map.js    (chapter progress map)
│   │   ├── calendar.js   (30-day streak grid)
│   │   ├── sounds.js     (Web Audio API tones)
│   │   ├── animations.js (CSS + Canvas confetti)
│   │   └── notifications.js (8:15 PM daily reminder)
│   └── utils/
│       └── helpers.js    (K object — date, DOM, math, ranks)
└── README.md
```

## 🚀 How to Run

### Option 1: Just open `index.html`
- Double-click `index.html` — it works directly in any modern browser.
- Data saves in browser localStorage.

### Option 2: Host free (recommended for cross-device)
1. **GitHub Pages** (free):
   - Push the `Kurukshetra/` folder to a GitHub repo
   - Settings → Pages → select main branch → Save
   - Access at `https://yourname.github.io/repo-name/`
2. **Netlify Drop** (zero signup):
   - Visit https://app.netlify.com/drop
   - Drag the `Kurukshetra/` folder
   - Get instant URL
3. **Vercel** (free):
   - `npx vercel` in the folder
   - Get URL

### Option 3: Run locally with a simple server
```bash
cd Kurukshetra
python3 -m http.server 8000
# Open http://localhost:8000
```

## 📚 Content Scope

**Class 11 — Full NTA JEE 2028 syllabus** with:
- Each chapter: 4-6 questions (Basic/Medium/Advanced/Boss)
- Each chapter: 3-5 "killer tricks" (locked until you solve a question of that type)
- Each chapter: 8-12 cheat sheet formulas
- All questions follow JEE Mains + Advanced pattern
- All solutions show the trick that "works on all questions of that type"
- AI-generated (the app is your teacher)

## 🎯 Daily Workflow (recommended)

1. **8:15 PM reminder** fires — "Time to fight, warrior"
2. Open app, complete **3 daily missions** (+50-100 EXP)
3. Go to **Today's subject** (Mon/Thu Physics, Tue/Fri Chemistry, Wed/Sat Maths)
4. **War Map** shows which chapter is unlocked — tap it
5. **Learn tab**: read intro, check cheat sheet
6. **Practice tab**: Mixed session (Basic + Medium + Advanced + Boss)
7. Get 70%+ accuracy to unlock next chapter
8. Wrong answers: app shows solution + unlocks the trick in your **inventory**
9. **Tricks** tab in bottom nav: review your unlocked tricks

## 🛠️ Tech Stack
- Pure HTML + CSS + Vanilla JS (zero dependencies)
- localStorage for save
- Web Audio API for sounds
- CSS animations + Canvas for confetti
- No frameworks, no build step

## 💰 Cost
- ₹0 — fully self-contained

---

Built for JEE 2028. Forge your legend. ⚔️🔥
