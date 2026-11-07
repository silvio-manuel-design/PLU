# Pansonic Video Lab — Reference Implementation

> **Das Flaggschiff-Projekt von PLU**  
> **Verwendung:** Als Template und Gold-Standard für alle neuen Tutorials  
> **Ort:** `tutorials/pansonic-video-lab/`

---

## 🎯 Warum Video Lab als Referenz?

Das Pansonic Video Lab ist das **am weitesten entwickelte** PLU-Tutorial. Es demonstriert:

- Vollständige ITCSS-Implementierung mit `@layer`
- Alle UX-Patterns (Checklisten, Quiz, Reflection, Bottom Bar)
- Bi-linguale Struktur (DE/EN)
- Vite-Multi-Page-Build
- Accessibility (a11y) Best Practices
- Mobile-First Design

**Neue Tutorials sollten dies als Ausgangspunkt kopieren und anpassen.**

---

## 📁 Komplette Datei-Struktur

```
tutorials/pansonic-video-lab/
├── package.json                    # NPM-Config
├── package-lock.json
├── vite.config.js                  # 7 Entry Points, gzip/br
├── index.html                      # DE-Homepage
├── index-en.html                   # EN-Homepage
│
├── css/
│   ├── video-lab.css               # 🎨 ITCSS Import-Hub
│   ├── 00-settings/
│   │   ├── video-tokens.css        # Design Tokens
│   │   └── sim-tokens.css          # Simulations-Tokens
│   ├── 01-generic/
│   │   └── reset.css               # CSS Reset + Reduced Motion
│   ├── 02-layout/
│   │   └── grid.css                # Container, Grid, Stack
│   ├── 03-objects/
│   │   └── layout-objects.css      # Layout-Patterns
│   ├── 04-components/
│   │   ├── header.css              # Header + Mobile Toggle
│   │   ├── footer.css              # Footer + Lizenz
│   │   └── nav-status.css          # Navigations-Status
│   ├── 05-components/              # 🏗️ Hauptkomponenten
│   │   ├── bottom-bar.css          # Mobile Bottom Bar
│   │   ├── buttons.css             # Button-Variants
│   │   ├── cards.css               # Modul-Karten, Tool-Karten
│   │   ├── checklist.css           # Interactive Checklisten
│   │   ├── connections.css         # Verbindungs-Linien
│   │   ├── fab.css                 # Floating Action Button
│   │   ├── gamification.css        # Fortschritt, Badges
│   │   ├── global-progress.css     # Globaler Fortschrittsbalken
│   │   ├── glossary-advanced.css   # Glossar-Styles
│   │   ├── modal.css               # Modal-System
│   │   ├── module-colors.css       # Modul-Akzent-Farben
│   │   ├── nav-status.css          # Nav-Status-Indikatoren
│   │   ├── quiz.css                # Mini-Quiz
│   │   ├── reflection.css          # Lern-Reflexion
│   │   ├── tool-modal.css          # Tool-Modale
│   │   ├── track-selector.css      # Track-Auswahl
│   │   └── video-player.css        # Video-Player
│   ├── 06-pages/
│   │   └── chapter.css             # Modul-Seiten-Layout
│   ├── 07-animations/
│   │   └── animations.css          # Reveal, Fade, Slide
│   ├── 08-modes/
│   │   └── classroom-mode.css      # Classroom/Dark/Light
│   └── 09-utilities/
│       └── utilities.css           # Helper-Klassen
│
├── js/
│   ├── entry-global.js             # 🚀 Global (alle Seiten)
│   ├── entry-chapter.js            # 🚀 Modul-Seiten
│   ├── entry-home.js               # 🚀 Homepage
│   ├── entry-glossary.js           # 🚀 Glossar
│   ├── entry-player.js             # 🚀 Video-Player
│   ├── entry-bibliothek.js         # 🚀 Bibliothek
│   ├── entry-tools.js              # 🚀 Tools
│   ├── video-main.js               # Legacy (nicht mehr verwendet)
│   ├── video-player.js             # Video-Player-Logik (DE)
│   ├── video-player-en.js          # Video-Player-Logik (EN)
│   └── modules/                    # 📦 ES6-Module
│       ├── bottom-bar.js           # Mobile Bottom Navigation
│       ├── camera.js               # Sim: Kamera-Simulator
│       ├── checklist.js            # Checklisten-Logik
│       ├── classroom.js            # Classroom-Mode
│       ├── color-swipe.js          # Sim: Color-Matcher
│       ├── composition.js          # Sim: Kompositions-Tool
│       ├── connections.js          # Verbindungs-Linien
│       ├── focus-trap.js           # Focus-Trap (a11y)
│       ├── gamification.js         # Fortschritt & Badges
│       ├── glossary.js             # Glossar-Logik
│       ├── image-fallback.js       # Bild-Fallback
│       ├── interactive-checklist.js# Interaktive Checklisten (Legacy)
│       ├── lighting.js             # Sim: Licht-Playground
│       ├── modal.js                # Modal-System
│       ├── nav-status.js           # Nav-Status
│       ├── navigation.js           # Header-Navigation
│       ├── progress.js             # Progress-Tracking
│       ├── quiz.js                 # Mini-Quiz + Quiz-Reflexion
│       ├── reflection.js           # Universelle Lern-Reflexion
│       ├── reveal.js               # Scroll-Animationen
│       ├── scenario-tabs.js        # Scenario-Tab-Wechsel
│       ├── scroll.js               # Scroll-Utilities
│       ├── scroll-progress.js      # Scroll-Fortschritt
│       ├── storage.js              # localStorage-Wrapper
│       ├── swipe-nav.js            # Swipe-Navigation
│       ├── theme.js                # Dark/Light Mode
│       ├── timeline.js             # Sim: Timeline-Editor
│       ├── tool-modal.js           # Tool-Modale
│       └── track-selector.js       # Track-Auswahl
│
├── module/                         # 📚 24 Module (12 DE + 12 EN)
│   ├── 00-willkommen.html
│   ├── 00-welcome.html
│   ├── 01-kamera-basics.html
│   ├── 01-camera-basics.html
│   ├── 02-licht.html
│   ├── 02-light.html
│   ├── 03-komposition.html
│   ├── 03-composition.html
│   ├── 04-schnitt.html
│   ├── 04-editing.html
│   ├── 05-farbkorrektur.html
│   ├── 05-color.html
│   ├── 06-audio-sound.html
│   ├── 06-audio.html
│   ├── 07-motion-graphics.html
│   ├── 07-motion.html
│   ├── 08-ki-workflows.html
│   ├── 08-ai-workflows.html
│   ├── 09-export.html
│   ├── 09-export-en.html
│   ├── 10-storytelling.html
│   ├── 10-storytelling-en.html
│   ├── 11-capstone.html
│   └── 11-capstone-en.html
│
├── pages/                          # 📄 Zusatzseiten
│   ├── bibliothek.html             # DE: Video-Bibliothek
│   ├── bibliothek-en.html          # EN: Video Library
│   ├── glossar.html                # DE: Glossar
│   ├── glossary.html               # EN: Glossary
│   ├── player.html                 # DE: Video-Player
│   └── player-en.html              # EN: Video Player
│
├── tools/                          # 🛠️ Interaktive Tools
│   ├── davinci-resolve.html        # DE: DaVinci Resolve Guide
│   ├── davinci-resolve-en.html     # EN: DaVinci Resolve Guide
│   ├── shotcut.html                # DE: Shotcut Guide
│   ├── shotcut-en.html             # EN: Shotcut Guide
│   ├── ki-video.html               # DE: KI-Video-Tools
│   └── ai-video.html               # EN: AI Video Tools
│
└── assets/
    ├── favicon.svg
    ├── images/                     # Modul-Bilder, Hero-Bilder
    ├── videos/
    │   └── library/                # Video-Bibliothek (nicht im Repo)
    └── ...
```

---

## 🏗️ Architektonische Highlights

### 1. ITCSS mit @layer

```css
/* video-lab.css */
@layer tokens, generic, layout, objects, components, pages, animations, modes, utilities;

@import url('./00-settings/video-tokens.css') layer(tokens);
@import url('./05-components/checklist.css') layer(components);
@import url('./06-pages/chapter.css') layer(pages);
/* ... */
```

**Vorteil:** Klare Spezifitäts-Hierarchie. Ein Utility überschreibt immer ein Component, egal wie spezifisch der Selector ist.

### 2. Multi-Entry Vite Build

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
  plugins: [
    compression({ algorithm: 'gzip' }),
    compression({ algorithm: 'brotliCompress', ext: '.br' }),
  ],
}
```

**7 Entry Points** erzeugen 7 JS/CSS-Paare. Jedes HTML lädt nur das, was es braucht.

### 3. Modul-Akzent-Farben

```html
<!-- Jedes Modul hat eigene Akzentfarbe -->
<body data-module="m01" style="--module-accent: #FF5A5A;">
```

```css
/* CSS verwendet die Modul-Farbe */
.video-btn--primary {
  background: var(--module-accent, var(--video-accent-teal));
}
```

**Vorteil:** Konsistente Farbgebung pro Modul ohne extra CSS-Klassen.

### 4. 0 Inline-Scripts Policy

```html
<!-- ✅ Korrekt: Externes Modul -->
<script type="module" src="/tutorials/pansonic-video-lab/js/entry-chapter.js"></script>

<!-- ❌ Verboten -->
<script>alert('Never!');</script>
```

Alle Interaktivität läuft über ES6-Module mit `type="module"`.

### 5. localStorage-Wrapper

```javascript
// js/modules/storage.js
const STORAGE_PREFIX = 'pansonic-';

export function setStorage(key, value) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch {
    // Silently fail (private mode, quota exceeded)
  }
}

export function getStorage(key, defaultValue = null) {
  try {
    const value = localStorage.getItem(STORAGE_PREFIX + key);
    return value ? JSON.parse(value) : defaultValue;
  } catch {
    return defaultValue;
  }
}
```

**Vorteil:** Konsistenter Namespace, Graceful Degradation bei Fehlern.

---

## 🎨 UX-Patterns (kopierbar)

### Pattern 1: Checkliste

**Files:** `css/05-components/checklist.css` + `js/modules/checklist.js`

```html
<div class="video-checklist" data-checklist>
  <div class="video-checklist__item">
    <button class="video-checklist__checkbox" aria-label="Markieren"></button>
    <span class="video-checklist__label">Ich verstehe das Konzept</span>
  </div>
</div>
```

**Features:**
- localStorage-Persistenz
- Auto-Save
- Progress-Anzeige
- Completion-State (Gold-Glow)
- Success-Grün für checked

### Pattern 2: Lern-Reflexion

**Files:** `css/05-components/reflection.css` + `js/modules/reflection.js`

```html
<div id="moduleReflection"></div>
```

**Features:**
- 3 metakognitive Fragen (DE/EN)
- Auto-Save (800ms Debounce)
- 500 Zeichen Limit
- Char-Counter

### Pattern 3: Mobile Bottom Bar

**Files:** `css/05-components/bottom-bar.css` + `js/modules/bottom-bar.js`

```html
<div id="mobileBottomBar" class="video-bottom-bar"></div>
```

**Features:**
- Nur auf Mobile (< 768px)
- Icon-Only Navigation (← / Ring / →)
- Progress-Ring mit Modul-Nummer
- Modul-Name
- Safe-Area-Support (iPhone Notch)

### Pattern 4: Quiz

**Files:** `css/05-components/quiz.css` + `js/modules/quiz.js`

```html
<div class="video-quiz" data-quiz data-module="m01"></div>
```

**Features:**
- Multiple Choice
- Sofort-Feedback
- Quiz-Reflexion nach Abschluss
- localStorage-Persistenz

### Pattern 5: Modal-System

**Files:** `css/05-components/modal.css` + `js/modules/modal.js`

```html
<button data-modal-target="my-modal">Öffnen</button>

<div id="my-modal" class="video-modal" role="dialog" aria-modal="true" hidden>
  <div class="video-modal__backdrop"></div>
  <div class="video-modal__content">
    <button class="video-modal__close" aria-label="Schließen">×</button>
    <h2>Modal-Titel</h2>
    <p>Inhalt...</p>
  </div>
</div>
```

**Features:**
- Focus-Trap
- ESC zum Schließen
- Backdrop-Click
- ARIA-Attribute
- `hidden` Attribut (kein `display: none`)

---

## 🌍 Bi-linguale Struktur

### Datei-Namen

| DE | EN |
|----|----|
| `index.html` | `index-en.html` |
| `00-willkommen.html` | `00-welcome.html` |
| `01-kamera-basics.html` | `01-camera-basics.html` |
| `glossar.html` | `glossary.html` |
| `bibliothek.html` | `bibliothek-en.html` |

### Sprach-Wechsel

```html
<!-- DE-Seite -->
<html lang="de">
  <a href="00-welcome.html" hreflang="en" aria-label="Switch to English">EN</a>
</html>

<!-- EN-Seite -->
<html lang="en">
  <a href="00-willkommen.html" hreflang="de" aria-label="Auf Deutsch wechseln">DE</a>
</html>
```

### JS-Spracherkennung

```javascript
const isEn = document.documentElement.lang === 'en';
const lang = isEn ? 'en' : 'de';
```

---

## ♿ Accessibility (a11y) Highlights

| Feature | Implementierung |
|---------|----------------|
| **Skip-Link** | `<a href="#main-content" class="u-skip-link">` |
| **Focus-Trap** | `js/modules/focus-trap.js` |
| **ARIA-Labels** | Alle Icon-Buttons, Navigationen, Modale |
| **Keyboard-Nav** | ESC für Modale, Tab durch Checklisten |
| **Reduced Motion** | `@media (prefers-reduced-motion: reduce)` |
| **Color Contrast** | WCAG 2.1 AA (14.8:1 für Primärtext) |
| **Semantic HTML** | `<main>`, `<nav>`, `<section>`, `<article>` |

---

## 🎓 Pädagogische Struktur (TEACH-Modell)

Jedes Video-Lab-Modul folgt dem TEACH-Modell:

```
T — Trigger      → Neugier wecken (Problemstellung)
E — Explain      → Theorie vermitteln (max. 3 Minuten)
A — Apply        → Hands-on Übung (Checkliste, Simulation)
C — Check        → Selbstbewertung (Quiz, Checkliste)
H — Habit        → Verinnerlichen (Reflection, nächstes Modul)
```

### Progression (Scaffolding)

| Phase | Module | Stil |
|-------|--------|------|
| Guide me | M00 | Alles vorgegeben |
| Show me | M01-M03 | Beispiele, Vorlagen |
| Help me | M04-M06 | Hinweise, Tipps |
| Let me | M07-M09 | Freie Wahl |
| Watch me | M10-M11 | Komplett eigenständig |

---

## 📋 Wie kopiere ich Video Lab für ein neues Tutorial?

### Option A: Manuelles Kopieren

1. `tutorials/pansonic-video-lab/` → `tutorials/mein-tutorial/` kopieren
2. Alle `video-*` Klassen in `mein-*` umbenennen
3. `pansonic` → `mein-tutorial` in Pfaden ersetzen
4. Inhalte anpassen
5. `npm install` + `npx vite build`

### Option B: Starter-Template verwenden

Siehe `05-STARTER-TEMPLATE.md` für einen minimalen Skeleton.

---

## 🔗 Verwandte Dokumente

- `01-ARCHITECTURE.md` — Gesamtarchitektur
- `02-DESIGN-SYSTEM.md` — Design Tokens & Farbpsychologie
- `03-TUTORIAL-AUTHORING-GUIDE.md` — Schritt-für-Schritt Anleitung
- `05-STARTER-TEMPLATE.md` — Kopierbarer Skeleton
