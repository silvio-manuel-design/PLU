# PANTAM LEARNING UNIVERSE (PLU) — Agent Guide

> **For contributors:** This is an internal guide for AI agents and developers working on PLU.  
> **License:** Code: MIT • Content: CC BY-NC-SA 4.0

---

## 📚 Dokumentation

Alle Entwickler-Dokumentation befindet sich im `docs/`-Ordner:

| Dokument | Inhalt |
|----------|--------|
| `docs/01-ARCHITECTURE.md` | Gesamtarchitektur, Vite-Bundling, Verzeichnisstruktur |
| `docs/02-DESIGN-SYSTEM.md` | Design Tokens, Farbpsychologie, Accessibility, Breakpoints |
| `docs/03-TUTORIAL-AUTHORING-GUIDE.md` | Schritt-für-Schritt: Neues Tutorial erstellen |
| `docs/04-VIDEO-LAB-REFERENCE.md` | Video Lab als Referenzprojekt im Detail |
| `docs/05-STARTER-TEMPLATE.md` | Kopierbarer Skeleton für neue Tutorials |

**Tutorial-spezifische Guides:**
- `tutorials/pansonic-video-lab/AGENTS.md` — Video Lab Konventionen & Module

## Project Structure

```
PLU Future/                   ← Server root (matches production)
├── .htaccess                 ← Apache config (must stay at server root)
├── 404.html / 404-en.html    ← Error pages (DE/EN)
├── index.html                ← Preloader / redirect to /tutorials/
├── start-dev-server.ps1      ← Local dev server launcher
├── LICENSE                   ← Dual license: MIT (Code) + CC BY-NC-SA 4.0 (Content)
├── README.md                 ← Project documentation for GitHub
├── DEPLOYMENT.md             ← Server deployment secrets (NOT in git)
├── .gitignore                ← Ignores dist/, node_modules/, videos, etc.
│
└── tutorials/                ← Main content directory
    ├── index.html            ← PLU platform homepage
    ├── css/                  ← Shared design system (tokens, reset, modes)
    ├── js/                   ← Shared JS modules (theme, nav, etc.)
    ├── assets/               ← Shared assets (logos, images, fonts)
    ├── pages/                ← Shared pages (lexikon, vision, spenden, etc.)
    │
    ├── pansonic-video-lab/   ← 🎬 REFERENCE PROJECT (see below)
    ├── ki-academy-junior/    ← 🎓 Junior academy
    ├── ki-academy-senior/    ← 🎓 Senior academy
    ├── ki-academy-premium/   ← 🎓 Premium academy
    ├── html-css-classic/     ← 💻 HTML/CSS tutorials
    ├── js-classic/           ← 💻 JavaScript tutorials
    ├── backend-training/     ← 💻 Backend tutorials
    ├── backend-modern/       ← 💻 Modern backend
    ├── grafik-training/      ← 🎨 Graphics tutorials
    ├── grafik-modern/        ← 🎨 Modern graphics
    ├── audio-training/       ← 🎵 Audio tutorials
    └── js/                   ← 💻 JS tutorials
```

---

## 🎬 Pansonic Video Lab — Reference Project

The **Pansonic Video Lab** is PLU's flagship reference project. It serves as the **template and gold standard** for all future tutorials. Every new tutorial should follow its conventions.

### Reference Standards

| Standard | Implementation |
|----------|---------------|
| **CSS Architecture** | ITCSS + `@layer` (tokens → utilities) |
| **Naming** | BEM with prefixes: `video-*`, `sim-*`, `o-*`, `u-*`, `is-*`, `has-*` |
| **JS** | Vanilla ES6 modules, **0 inline scripts** |
| **Build** | Vite 6 with gzip/brotli precompression |
| **i18n** | Bi-lingual (DE/EN) with hreflang & canonical URLs |
| **a11y** | Skip-links, ARIA, focus-trap, keyboard nav |
| **Theme** | Dark/Light mode with design tokens |
| **Mobile** | Bottom action bar, thumb-zone navigation |

### Key Files

```
tutorials/pansonic-video-lab/
├── css/video-lab.css              ← ITCSS import hub
├── css/00-settings/video-tokens.css
├── css/05-components/
│   ├── bottom-bar.css             ← Mobile navigation
│   ├── checklist.css              ← Interactive checklists
│   ├── reflection.css             ← Learning reflection
│   └── ...
├── js/entry-global.js             ← Global entry point
├── js/entry-chapter.js            ← Module entry point
├── js/modules/
│   ├── bottom-bar.js              ← Mobile bottom bar
│   ├── checklist.js               ← Checklist logic
│   ├── reflection.js              ← Learning reflection
│   ├── quiz.js                    ← Mini quiz
│   └── ...
├── module/                        ← 12 DE + 12 EN modules
├── pages/                         ← Glossary, library, player
└── tools/                         ← Interactive tools
```

---

## Critical: Root-Relative Paths

All **resource paths** in modern PLU tutorials use **root-relative** paths (`/tutorials/...`).
This eliminates `../` directory traversals that school proxies may block.

### Path Rules

| Resource Type | Example |
|---------------|---------|
| Shared CSS | `/tutorials/css/00-design-system/tokens.css` |
| Academy CSS | `/tutorials/ki-academy-premium/css/...` |
| Academy JS | `/tutorials/ki-academy-premium/js/academy-main.js` |
| Academy Assets | `/tutorials/ki-academy-premium/assets/images/...` |
| Video Lab CSS | `/tutorials/pansonic-video-lab/css/video-lab.css` |
| Video Lab JS | `/tutorials/pansonic-video-lab/js/entry-chapter.js` |

### What NOT to use

❌ `../css/...`  
❌ `../../../js/...`  
❌ `../../../../assets/...`

---

## Local Development

**You MUST use a local web server.** Root-relative paths do not work with `file://`.

```powershell
# Option 1: PowerShell script (auto-detects Python/Node/PHP)
.\start-dev-server.ps1

# Option 2: Python
python -m http.server 8080

# Option 3: Node.js
npx serve . -p 8080
```

Then open: `http://localhost:8080/tutorials/`

### Vite Build (Video Lab only)

```bash
cd tutorials/pansonic-video-lab
npm install
npx vite build
```

---

## BEM Namespace Convention

All CSS classes MUST use prefixes to avoid collisions across tutorials:

| Prefix | Purpose | Example |
|--------|---------|---------|
| `.video-*` | Video Lab components | `.video-checklist`, `.video-card` |
| `.sim-*` | Simulation components | `.sim-camera`, `.sim-timeline` |
| `.o-*` | ITCSS layout objects | `.o-container`, `.o-stack` |
| `.u-*` | Utility / helper classes | `.u-hidden`, `.u-sr-only` |
| `.is-*` | State modifiers (JS-toggled) | `.is-active`, `.is-hidden` |
| `.has-*` | Parent state hooks | `.has-bottom-nav` |

**Forbidden:** Generic unprefixed class names like `.checklist`, `.modal`, `.header`.

**z-Index:** Always use tokens (`--video-z-*`). Never hardcode magic numbers.

**Breakpoints:** 640px / 768px / 1024px / 1200px (documented in tokens, hardcoded in `@media`).

---

## Open Source & Deployment

### GitHub Repository

- **Do NOT commit** `DEPLOYMENT.md` (contains server secrets)
- **Do NOT commit** `dist/` or `node_modules/`
- **Do NOT commit** large videos (`*.mp4`, `*.webm` in `assets/videos/library/`)
- **Do NOT commit** e-mail addresses or PayPal business IDs

### Platzhalter (replaced on server)

| Platzhalter | Server-Wert | Dateien |
|-------------|-------------|---------|
| `deine-email@domain.at` | `info@pantam.at` | email.svg, impressum, datenschutz, spenden |

See `DEPLOYMENT.md` for the full deployment checklist.

---

## Academy-Specific Notes

- **ki-academy-premium** uses `data-reveal` scroll animations. If CSS/JS fails to load, sections remain invisible (`opacity: 0`).
- Each academy is self-contained but may reference shared resources from `/tutorials/css/` and `/tutorials/js/`.
- `.htaccess` must stay at project root (production server root).
- The `pansonic-video-lab` uses module-level accents (each module has its own `--module-accent` color).
