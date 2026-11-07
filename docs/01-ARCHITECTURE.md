# PLU Architecture Guide

> **PANTAM Learning Universe (PLU)** — Zentrale Plattform & Tutorial-Ökosystem  
> **Version:** 2.0  
> **Letzte Aktualisierung:** 2026-04

---

## 🏛️ Philosophie: Plattform + Satelliten

PLU ist keine monolithische Anwendung, sondern ein **Ökosystem** aus:

```
┌─────────────────────────────────────────────────────────────┐
│                    PLU PLATFORM                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │ 404     │  │Preloader│  │ Homepage│  │ Shared  │        │
│  │ Pages   │  │ index   │  │ index   │  │Resources│        │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘        │
│                                                             │
│  Shared: css/  js/  assets/  pages/                         │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   ┌────▼────┐          ┌────▼────┐          ┌────▼────┐
   │Tutorial │          │Tutorial │          │Tutorial │
   │Satellit │          │Satellit │          │Satellit │
   │(Video)  │          │(Foto)   │          │(Audio)  │
   └─────────┘          └─────────┘          └─────────┘
   Eigenständige        Eigenständige        Eigenständige
   Website mit          Website mit          Website mit
   eigenem Build        eigenem Build        eigenem Build
```

**Jedes Tutorial ist eine eigenständige Website** — mit eigener `package.json`, eigenem Vite-Build, eigenem CSS-Hub und eigenem JS-Entry-Point. Sie teilen sich lediglich das Design-System und einige Assets von der PLU-Plattform.

---

## 📁 Verzeichnisstruktur

### Root-Ebene (PLU Plattform)

```
PLU Future/
├── .htaccess                 # Apache-Konfiguration (Server-Root)
├── index.html                # Preloader → leitet zu /tutorials/
├── 404.html / 404-en.html    # Fehlerseiten
├── start-dev-server.ps1      # Lokaler Dev-Server
│
├── docs/                     # 📚 Dokumentation (dieser Ordner)
│   ├── 01-ARCHITECTURE.md
│   ├── 02-DESIGN-SYSTEM.md
│   ├── 03-TUTORIAL-AUTHORING-GUIDE.md
│   ├── 04-VIDEO-LAB-REFERENCE.md
│   └── 05-STARTER-TEMPLATE.md
│
├── tutorials/                # 🎓 Alle Inhalte
│   ├── index.html            # PLU Homepage (Akademie-Übersicht)
│   │
│   ├── css/                  # 🎨 Shared Design System
│   │   └── 00-design-system/
│   │       ├── tokens.css
│   │       └── ...
│   │
│   ├── js/                   # ⚙️ Shared JS-Module
│   │   ├── theme.js
│   │   ├── navigation.js
│   │   └── ...
│   │
│   ├── assets/               # 🖼️ Shared Assets
│   │   ├── logo/
│   │   ├── images/
│   │   └── fonts/
│   │
│   ├── pages/                # 📄 Shared Pages
│   │   ├── impressum.html
│   │   ├── datenschutz.html
│   │   ├── spenden.html
│   │   └── ...
│   │
│   ├── pansonic-video-lab/   # 🎬 REFERENZPROJEKT
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   ├── css/
│   │   ├── js/
│   │   ├── module/
│   │   ├── pages/
│   │   ├── tools/
│   │   └── assets/
│   │
│   ├── ki-academy-senior/    # 🎓 KI-Akademie Senior
│   ├── ki-academy-junior/    # 🎓 KI-Akademie Junior
│   ├── ki-academy-premium/   # 🎓 KI-Akademie Premium
│   ├── html-css-classic/     # 💻 Tutorial
│   ├── js-classic/           # 💻 Tutorial
│   └── ...                   # weitere Tutorials
```

### Tutorial-Ebene (jeder Satellit)

```
tutorials/pansonic-video-lab/          # Beispiel: Video Lab
├── package.json                       # NPM-Dependencies & Scripts
├── package-lock.json
├── vite.config.js                     # Vite-Konfiguration
├── index.html                         # Tutorial-Homepage
├── index-en.html                      # Englische Homepage
│
├── css/
│   ├── video-lab.css                  # 🎨 ITCSS Import-Hub
│   ├── 00-settings/
│   │   ├── video-tokens.css           # Design Tokens
│   │   └── sim-tokens.css             # Simulations-Tokens
│   ├── 01-generic/
│   │   └── reset.css
│   ├── 02-layout/
│   │   └── grid.css
│   ├── 03-objects/
│   │   └── layout-objects.css
│   ├── 04-components/
│   │   ├── header.css
│   │   ├── footer.css
│   │   └── nav-status.css
│   ├── 05-components/                 # Hauptkomponenten
│   │   ├── bottom-bar.css             # Mobile Bottom Bar
│   │   ├── checklist.css              # Checklisten
│   │   ├── reflection.css             # Lern-Reflexion
│   │   ├── quiz.css                   # Quiz
│   │   ├── cards.css                  # Karten
│   │   ├── modal.css                  # Modale
│   │   └── ...
│   ├── 06-pages/
│   │   └── chapter.css
│   ├── 07-animations/
│   │   └── animations.css
│   ├── 08-modes/
│   │   └── classroom-mode.css
│   └── 09-utilities/
│       └── utilities.css
│
├── js/
│   ├── entry-global.js                # 🚀 Globaler Entry Point
│   ├── entry-chapter.js               # 🚀 Modul-Entry Point
│   ├── entry-home.js                  # 🚀 Homepage Entry Point
│   ├── entry-glossary.js              # 🚀 Glossar Entry Point
│   ├── entry-player.js                # 🚀 Player Entry Point
│   ├── entry-bibliothek.js            # 🚀 Bibliothek Entry Point
│   ├── entry-tools.js                 # 🚀 Tools Entry Point
│   ├── video-main.js                  # Legacy-Entry
│   ├── video-player.js                # Video-Player-Logik
│   ├── video-player-en.js             # EN-Video-Player
│   └── modules/                       # 📦 ES6-Module
│       ├── bottom-bar.js              # Mobile Navigation
│       ├── checklist.js               # Checklisten-Logik
│       ├── reflection.js              # Lern-Reflexion
│       ├── quiz.js                    # Mini-Quiz
│       ├── gamification.js            # Fortschritt & Badges
│       ├── progress.js                # Progress-Tracking
│       ├── navigation.js              # Header-Navigation
│       ├── reveal.js                  # Scroll-Animationen
│       ├── theme.js                   # Dark/Light Mode
│       ├── storage.js                 # localStorage-Wrapper
│       ├── modal.js                   # Modal-System
│       ├── focus-trap.js              # Focus-Trap für a11y
│       ├── image-fallback.js          # Bild-Fallback
│       ├── composition.js             # Sim: Komposition
│       ├── camera.js                  # Sim: Kamera
│       ├── lighting.js                # Sim: Licht
│       ├── color-swipe.js             # Sim: Farbe
│       ├── timeline.js                # Sim: Timeline
│       └── ...
│
├── module/                            # 📚 12 DE + 12 EN Module
│   ├── 00-willkommen.html
│   ├── 00-welcome.html
│   ├── 01-kamera-basics.html
│   ├── 01-camera-basics.html
│   └── ... (24 Module total)
│
├── pages/                             # 📄 Zusatzseiten
│   ├── glossar.html
│   ├── glossary.html
│   ├── bibliothek.html
│   ├── bibliothek-en.html
│   ├── player.html
│   └── player-en.html
│
├── tools/                             # 🛠️ Interaktive Tools
│   ├── davinci-resolve.html
│   ├── davinci-resolve-en.html
│   ├── shotcut.html
│   ├── shotcut-en.html
│   ├── ki-video.html
│   └── ai-video.html
│
└── assets/
    ├── images/
    ├── videos/
    │   └── library/
    └── favicon.svg
```

---

## 🔗 Shared Resources vs. Tutorial-Spezifisch

### Was kommt von der PLU-Plattform (shared)?

| Ressource | Pfad | Nutzung |
|-----------|------|---------|
| **Design Tokens** | `/tutorials/css/00-design-system/tokens.css` | Von ALLEM importiert |
| **Shared JS** | `/tutorials/js/theme.js` | Theme-Init (wenn benötigt) |
| **Logo** | `/tutorials/assets/logo/` | PLU-Logo, Favicon |
| **Impressum** | `/tutorials/pages/impressum.html` | Rechtliche Seiten |
| **Fonts** | Google Fonts CDN | Globale Schriften |
| **Icons** | Phosphor Icons CDN | Globale Icons |

### Was ist tutorial-spezifisch?

| Ressource | Beispiel-Pfad | Erklärung |
|-----------|---------------|-----------|
| **CSS Hub** | `/tutorials/pansonic-video-lab/css/video-lab.css` | Jeder Tutorial hat eigenen Import-Hub |
| **JS Entry** | `/tutorials/pansonic-video-lab/js/entry-global.js` | Jeder Tutorial hat eigene Entry Points |
| **Modul-HTML** | `/tutorials/pansonic-video-lab/module/...` | Modul-Inhalte |
| **Assets** | `/tutorials/pansonic-video-lab/assets/...` | Bilder, Videos, etc. |
| **Vite-Config** | `tutorials/pansonic-video-lab/vite.config.js` | Build-Konfiguration |

---

## ⚡ Vite-Bundling-Architektur

### Warum Vite?

PLU-Tutorials sind **Multi-Page Apps (MPAs)**, keine SPAs. Vite bietet:
- Schnelles Bundling für mehrere Entry Points
- CSS-Minifizierung
- JS-Chunking
- gzip/brotli Precompression
- Sourcemaps

### Entry Points (Video Lab Beispiel)

```javascript
// vite.config.js
export default {
  base: '/tutorials/pansonic-video-lab/',
  build: {
    rollupOptions: {
      input: {
        global: 'js/entry-global.js',
        chapter: 'js/entry-chapter.js',
        home: 'js/entry-home.js',
        glossary: 'js/entry-glossary.js',
        player: 'js/entry-player.js',
        bibliothek: 'js/entry-bibliothek.js',
        tools: 'js/entry-tools.js',
      },
    },
  },
}
```

Jeder Entry Point erzeugt:
- Einen **JS-Chunk** (`entry-global-[hash].js`)
- Einen **CSS-Chunk** (`entry-global-[hash].css`)
- **Sourcemaps** (`.js.map`, `.css.map`)
- **Precompressed** Varianten (`.gz`, `.br`)

### Wie HTML die Bundles lädt

```html
<!-- In jedem Modul-HTML -->
<script type="module" src="/tutorials/pansonic-video-lab/js/entry-chapter.js"></script>
<link rel="stylesheet" href="/tutorials/pansonic-video-lab/css/video-lab.css">
```

Vite ersetzt diese Pfade beim Build durch die gehashten Dateien:
```html
<!-- Nach dem Build -->
<script type="module" src="/tutorials/pansonic-video-lab/assets/entry-chapter-AbC123.js"></script>
<link rel="stylesheet" href="/tutorials/pansonic-video-lab/assets/entry-chapter-AbC123.css">
```

### Build-Prozess

```bash
cd tutorials/pansonic-video-lab
npm install          # Einmalig
npx vite build       # Produktions-Build
```

Output:
```
dist/
├── assets/
│   ├── entry-global-xxx.js      (+ .js.gz, .js.br, .js.map)
│   ├── entry-global-xxx.css     (+ .css.gz, .css.br, .css.map)
│   ├── entry-chapter-xxx.js
│   ├── entry-chapter-xxx.css
│   └── ... (weitere Chunks)
├── module/
│   └── 00-willkommen.html       (HTML mit ersetzten Pfaden)
├── pages/
│   └── glossar.html
├── index.html
└── ...
```

### Wichtig: Keine Inline-Scripts

PLU-Policy: **0 Inline-Scripts**. Alle Interaktivität läuft über ES6-Module:

```javascript
// ✅ Richtig: Externes Modul
import { initChecklist } from './modules/checklist.js';
document.addEventListener('DOMContentLoaded', initChecklist);
```

```html
<!-- ❌ Verboten: Inline-Script -->
<script>alert('Das ist nicht erlaubt!');</script>
```

---

## 🎨 CSS-Architektur: ITCSS + @layer

### Layer-Hierarchie

```css
/* video-lab.css — der Import-Hub */
@layer tokens, generic, layout, objects, components, pages, animations, modes, utilities;

@import url('./00-settings/video-tokens.css') layer(tokens);
@import url('./00-settings/sim-tokens.css') layer(tokens);
@import url('./01-generic/reset.css') layer(generic);
@import url('./02-layout/grid.css') layer(layout);
@import url('./03-objects/layout-objects.css') layer(objects);
@import url('./04-components/header.css') layer(components);
@import url('./04-components/footer.css') layer(components);
@import url('./05-components/bottom-bar.css') layer(components);
@import url('./05-components/checklist.css') layer(components);
@import url('./05-components/reflection.css') layer(components);
@import url('./05-components/quiz.css') layer(components);
@import url('./05-components/cards.css') layer(components);
@import url('./05-components/modal.css') layer(components);
@import url('./06-pages/chapter.css') layer(pages);
@import url('./07-animations/animations.css') layer(animations);
@import url('./08-modes/classroom-mode.css') layer(modes);
@import url('./09-utilities/utilities.css') layer(utilities);
```

### Layer-Spezifität

| Layer | Spezifität | Beispiel |
|-------|-----------|----------|
| `tokens` | Niedrigste | CSS-Variablen |
| `generic` | Sehr niedrig | Reset, Normalize |
| `layout` | Niedrig | Grid, Container |
| `objects` | Niedrig | Layout-Objekte |
| `components` | Mittel | Buttons, Cards, Header |
| `pages` | Mittel | Seiten-spezifische Styles |
| `animations` | Mittel | Keyframes |
| `modes` | Hoch | Dark/Light, Classroom |
| `utilities` | Höchste | `.u-hidden`, `.u-sr-only` |

**Regel:** Ein späteres Layer überschreibt ein früheres Layer bei gleicher Spezifität.

---

## 🏷️ BEM-Namespace-Konvention

### Prefix-System

Jeder Tutorial **MUSS** ein eindeutiges Prefix verwenden, um Kollisionen mit anderen PLU-Tutorials zu vermeiden:

| Prefix | Zweck | Beispiel |
|--------|-------|----------|
| `.video-*` | Video Lab Komponenten | `.video-checklist`, `.video-card` |
| `.sim-*` | Simulationen | `.sim-camera`, `.sim-timeline` |
| `.o-*` | ITCSS Layout-Objekte | `.o-container`, `.o-stack` |
| `.u-*` | Utility-Klassen | `.u-hidden`, `.u-sr-only` |
| `.is-*` | JS-Zustände | `.is-active`, `.is-completed` |
| `.has-*` | Parent-States | `.has-bottom-nav` |

### Für ein neues Tutorial (z.B. Fotografie)

Wähle ein neues Prefix:

```css
/* Fotografie-Tutorial */
.foto-hero { }
.foto-gallery { }
.foto-exif-table { }
.foto-sim-aperture { }    /* Simulation */
```

```javascript
// JS-Module
import { initGallery } from './modules/gallery.js';
import { initExifSim } from './modules/exif-sim.js';
```

---

## 🌍 Root-Relative Pfade

### Warum root-relative?

Schul-Proxies blockieren oft `../`-Traversierungen. Root-relative Pfade (`/tutorials/...`) umgehen dieses Problem.

### Pfad-Regeln

| Ressource-Typ | Richtig | Falsch |
|---------------|---------|--------|
| Shared CSS | `/tutorials/css/...` | `../../css/...` |
| Tutorial CSS | `/tutorials/fotografie/css/...` | `./css/...` |
| Tutorial JS | `/tutorials/fotografie/js/...` | `../js/...` |
| Shared Assets | `/tutorials/assets/...` | `../../../assets/...` |
| Tutorial Assets | `/tutorials/fotografie/assets/...` | `./assets/...` |

### Ausnahme: Interne Navigation

Navigation zwischen Modulen **darf** relativ bleiben:

```html
<!-- Von Modul 01 zu Modul 02 -->
<a href="../02-licht/module-02.html">Nächstes Modul</a>
```

Dies ist OK, da es keine Proxy-Probleme verursacht.

---

## 📱 Responsive Breakpoints

| Name | Wert | Nutzung |
|------|------|---------|
| **xs** | 320px | Kleinstes Mobile |
| **sm** | 480px | Mobile |
| **md** | 768px | Tablet (Mobile Bottom Bar ab hier aus) |
| **lg** | 1024px | Desktop |
| **xl** | 1200px | Breiter Desktop |
| **xxl** | 1440px | Ultra-wide |

**Wichtig:** Breakpoints sind in `video-tokens.css` als Referenz dokumentiert, aber in `@media`-Queries **hardcodiert** (CSS Custom Properties funktionieren nicht in `@media`).

---

## 🔄 Zusammenfassung: Neues Tutorial erstellen

1. **Ordner erstellen:** `tutorials/mein-tutorial/`
2. **package.json:** NPM-Dependencies + Vite
3. **vite.config.js:** Entry Points definieren
4. **CSS-Hub:** `css/mein-tutorial.css` mit ITCSS-Importen
5. **JS-Entry:** `js/entry-global.js`, `js/entry-chapter.js`
6. **BEM-Prefix:** Eindeutiges Prefix wählen (z.B. `foto-*`)
7. **Module:** `module/01-modul.html`, etc.
8. **Build:** `npx vite build`

Siehe `03-TUTORIAL-AUTHORING-GUIDE.md` für die detaillierte Schritt-für-Schritt-Anleitung.
