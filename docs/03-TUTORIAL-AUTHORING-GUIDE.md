# Tutorial Authoring Guide

> **Schritt-für-Schritt-Anleitung für neue PLU-Tutorials**  
> **Voraussetzung:** Du hast `01-ARCHITECTURE.md` und `02-DESIGN-SYSTEM.md` gelesen  
> **Zeitaufwand:** ~2-3 Stunden Setup, dann Content-Erstellung

---

## 🚀 Schnellstart: "Ich will ein Fotografie-Tutorial erstellen"

```bash
# 1. Neuer Ordner
cd tutorials
mkdir fotografie-lab
cd fotografie-lab

# 2. package.json kopieren (von Video Lab)
cp ../pansonic-video-lab/package.json .

# 3. vite.config.js anpassen
# 4. CSS-Ordnerstruktur erstellen
# 5. JS-Entry Points erstellen
# 6. Erstes Modul schreiben
# 7. Build testen
```

Der Rest dieser Anleitung erklärt jeden Schritt im Detail.

---

## Phase 1: Setup (30 Minuten)

### Schritt 1.1: Ordnerstruktur erstellen

```
tutorials/fotografie-lab/
├── package.json
├── package-lock.json
├── vite.config.js
├── index.html
├── index-en.html
│
├── css/
│   ├── fotografie-lab.css          # ← ITCSS Import-Hub
│   ├── 00-settings/
│   │   └── foto-tokens.css
│   ├── 01-generic/
│   │   └── reset.css
│   ├── 02-layout/
│   ├── 03-objects/
│   ├── 04-components/
│   ├── 05-components/
│   ├── 06-pages/
│   ├── 07-animations/
│   ├── 08-modes/
│   └── 09-utilities/
│
├── js/
│   ├── entry-global.js
│   ├── entry-chapter.js
│   ├── entry-home.js
│   └── modules/
│       ├── navigation.js
│       ├── theme.js
│       ├── checklist.js
│       ├── reflection.js
│       └── ...
│
├── module/
│   ├── 00-willkommen.html
│   ├── 00-welcome.html
│   └── ...
│
├── pages/
│   └── (optional: Glossar, Bibliothek, etc.)
│
└── assets/
    ├── images/
    ├── favicon.svg
    └── (keine Videos im Repo — siehe 01-ARCHITECTURE.md)
```

### Schritt 1.2: package.json

```json
{
  "name": "fotografie-lab",
  "version": "1.0.0",
  "description": "PLU Fotografie-Lab — Interaktives Fotografie-Tutorial",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "vite-plugin-compression": "^0.5.1"
  }
}
```

### Schritt 1.3: vite.config.js

```javascript
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';

export default defineConfig({
  // Wichtig: Muss zur Server-Pfad-Struktur passen
  base: '/tutorials/fotografie-lab/',

  build: {
    outDir: 'dist',

    rollupOptions: {
      input: {
        // Jeder Entry Point = ein HTML-Typ
        global: './js/entry-global.js',
        chapter: './js/entry-chapter.js',
        home: './js/entry-home.js',
      },
    },

    // Asset-Hashing für Cache-Busting
    assetsDir: 'assets',
    cssCodeSplit: true,
    sourcemap: true,
  },

  plugins: [
    // gzip + brotli Precompression
    compression({ algorithm: 'gzip' }),
    compression({ algorithm: 'brotliCompress', ext: '.br' }),
  ],
});
```

**Wichtig:** `base` muss exakt zur Server-Pfad-Struktur passen. Wenn das Tutorial unter `https://pantam.at/tutorials/fotografie-lab/` erreichbar ist, dann ist `base: '/tutorials/fotografie-lab/'` korrekt.

### Schritt 1.4: npm installieren

```bash
cd tutorials/fotografie-lab
npm install
```

---

## Phase 2: Design-System einrichten (45 Minuten)

### Schritt 2.1: Tokens erstellen

```css
/* css/00-settings/foto-tokens.css */

:root {
  /* === Primärfarbe (Fotografie = Orange/Warm) === */
  --foto-accent: #FF6B35;
  --foto-accent-dim: rgba(255, 107, 53, 0.1);
  --foto-accent-glow: rgba(255, 107, 53, 0.3);

  /* === Semantische Farben === */
  --foto-accent-success: #2ecc71;
  --foto-accent-success-dim: rgba(46, 204, 113, 0.1);
  --foto-accent-warning: #F59E0B;
  --foto-accent-error: #EF4444;

  /* === Hintergründe === */
  --foto-bg-base: #0a0c10;
  --foto-bg-elevated: #13161f;
  --foto-bg-surface: #1a1e2e;
  --foto-bg-overlay: rgba(0, 0, 0, 0.7);

  /* === Text === */
  --foto-text-primary: #e8eef1;
  --foto-text-secondary: #8b949e;
  --foto-text-tertiary: #6e7681;
  --foto-text-inverse: #0a0c10;

  /* === Border === */
  --foto-border-subtle: rgba(255, 255, 255, 0.06);
  --foto-border-default: rgba(255, 255, 255, 0.1);

  /* === Abstände (identisch zu Video Lab) === */
  --foto-space-1: 0.25rem;
  --foto-space-2: 0.5rem;
  --foto-space-3: 0.75rem;
  --foto-space-4: 1rem;
  --foto-space-5: 1.25rem;
  --foto-space-6: 1.5rem;
  --foto-space-8: 2rem;
  --foto-space-10: 2.5rem;
  --foto-space-12: 3rem;
  --foto-space-16: 4rem;
  --foto-space-20: 5rem;
  --foto-space-24: 6rem;

  /* === Schrift === */
  --foto-font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --foto-font-mono: 'JetBrains Mono', monospace;

  --foto-text-xs: 0.75rem;
  --foto-text-sm: 0.875rem;
  --foto-text-md: 1rem;
  --foto-text-lg: 1.125rem;
  --foto-text-xl: 1.25rem;
  --foto-text-2xl: 1.5rem;
  --foto-text-3xl: 1.875rem;
  --foto-text-4xl: 2.25rem;

  --foto-font-weight-normal: 400;
  --foto-font-weight-medium: 500;
  --foto-font-weight-semibold: 600;
  --foto-font-weight-bold: 700;

  /* === Radius === */
  --foto-radius-sm: 4px;
  --foto-radius-md: 8px;
  --foto-radius-lg: 12px;
  --foto-radius-xl: 16px;
  --foto-radius-full: 9999px;

  /* === z-Index === */
  --foto-z-dropdown: 100;
  --foto-z-sticky: 200;
  --foto-z-modal: 300;
  --foto-z-popover: 400;
  --foto-z-toast: 500;
}

/* === Light Mode === */
[data-theme="light"] {
  --foto-bg-base: #f5f5f5;
  --foto-bg-elevated: #ffffff;
  --foto-bg-surface: #fafafa;
  --foto-text-primary: #1a1a1a;
  --foto-text-secondary: #666666;
  --foto-text-tertiary: #888888;
  --foto-border-subtle: rgba(0, 0, 0, 0.06);
  --foto-border-default: rgba(0, 0, 0, 0.1);
}
```

### Schritt 2.2: CSS-Import-Hub erstellen

```css
/* css/fotografie-lab.css */

@layer tokens, generic, layout, objects, components, pages, animations, modes, utilities;

/* Tokens */
@import url('./00-settings/foto-tokens.css') layer(tokens);

/* Generics */
@import url('./01-generic/reset.css') layer(generic);

/* Layout */
@import url('./02-layout/grid.css') layer(layout);

/* Objects */
@import url('./03-objects/layout-objects.css') layer(objects);

/* Components */
@import url('./04-components/header.css') layer(components);
@import url('./04-components/footer.css') layer(components);

/* Main Components */
@import url('./05-components/checklist.css') layer(components);
@import url('./05-components/reflection.css') layer(components);
@import url('./05-components/cards.css') layer(components);
@import url('./05-components/modal.css') layer(components);

/* Pages */
@import url('./06-pages/chapter.css') layer(pages);

/* Animations */
@import url('./07-animations/animations.css') layer(animations);

/* Modes */
@import url('./08-modes/classroom-mode.css') layer(modes);

/* Utilities */
@import url('./09-utilities/utilities.css') layer(utilities);
```

### Schritt 2.3: Reset kopieren

Kopiere `reset.css` vom Video Lab und passe ggf. an:

```css
/* css/01-generic/reset.css */

@layer generic {
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-family: var(--foto-font-family);
    font-size: 16px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background: var(--foto-bg-base);
    color: var(--foto-text-primary);
    min-height: 100vh;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul, ol {
    list-style: none;
  }

  /* Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}
```

---

## Phase 3: JavaScript-Architektur (45 Minuten)

### Schritt 3.1: Entry Points erstellen

```javascript
// js/entry-global.js
// Wird auf allen Seiten geladen (Homepage, Glossar, etc.)

import { initTheme } from './modules/theme.js';
import { initNavigation } from './modules/navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
});
```

```javascript
// js/entry-chapter.js
// Wird auf Modul-Seiten geladen

import { initTheme } from './modules/theme.js';
import { initNavigation } from './modules/navigation.js';
import { initChecklist } from './modules/checklist.js';
import { initReflection } from './modules/reflection.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initChecklist();
  initReflection();
});
```

```javascript
// js/entry-home.js
// Wird auf der Homepage geladen

import { initTheme } from './modules/theme.js';
import { initNavigation } from './modules/navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
});
```

### Schritt 3.2: Theme-Modul

```javascript
// js/modules/theme.js

export function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', theme);

  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }
}
```

### Schritt 3.3: Checklisten-Modul (Minimal-Version)

```javascript
// js/modules/checklist.js

const STORAGE_PREFIX = 'foto-checklist-';

export function initChecklist() {
  const container = document.querySelector('.foto-checklist');
  if (!container) return;

  const moduleId = document.body.getAttribute('data-module') || 'unknown';
  const storageKey = STORAGE_PREFIX + moduleId;

  // Gespeicherten Zustand laden
  let checked = [];
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) checked = JSON.parse(saved);
  } catch { /* ignore */ }

  // Items rendern
  const items = container.querySelectorAll('.foto-checklist__item');
  items.forEach((item, index) => {
    const checkbox = item.querySelector('.foto-checklist__checkbox');
    const label = item.querySelector('.foto-checklist__label');

    // Gespeicherten Zustand anwenden
    if (checked.includes(index)) {
      item.classList.add('is-checked');
    }

    // Click-Handler
    checkbox.addEventListener('click', () => {
      item.classList.toggle('is-checked');

      if (item.classList.contains('is-checked')) {
        checked.push(index);
      } else {
        checked = checked.filter(i => i !== index);
      }

      localStorage.setItem(storageKey, JSON.stringify(checked));
      updateProgress(container, items.length, checked.length);
    });
  });

  updateProgress(container, items.length, checked.length);
}

function updateProgress(container, total, completed) {
  const progress = container.querySelector('.foto-checklist__progress');
  if (progress) {
    progress.textContent = `${completed}/${total}`;
  }

  if (completed === total) {
    container.classList.add('is-completed');
  }
}
```

### Schritt 3.4: Reflection-Modul (Minimal-Version)

```javascript
// js/modules/reflection.js

const STORAGE_PREFIX = 'foto-reflection-';

const REFLECTION_DATA = {
  de: {
    title: 'Lern-Reflexion',
    subtitle: 'Nimm dir einen Moment Zeit, um über das Gelernte nachzudenken.',
    questions: [
      'Was war für dich die wichtigste Erkenntnis in diesem Modul?',
      'Welches Konzept möchtest du als Nächstes ausprobieren?',
      'Was hat dir noch gefehlt oder war unklar?'
    ]
  },
  en: {
    title: 'Learning Reflection',
    subtitle: 'Take a moment to reflect on what you learned.',
    questions: [
      'What was the most important insight for you in this module?',
      'Which concept do you want to try next?',
      'What was missing or unclear?'
    ]
  }
};

export function initReflection() {
  const container = document.getElementById('moduleReflection');
  if (!container) return;

  const isEn = document.documentElement.lang === 'en';
  const lang = isEn ? 'en' : 'de';
  const moduleId = document.body.getAttribute('data-module') || 'unknown';
  const data = REFLECTION_DATA[lang];

  // HTML rendern
  container.innerHTML = `
    <div class="foto-reflection">
      <h3 class="foto-reflection__title">${data.title}</h3>
      <p class="foto-reflection__subtitle">${data.subtitle}</p>
      <div class="foto-reflection__questions">
        ${data.questions.map((q, i) => `
          <div class="foto-reflection__question">
            <label class="foto-reflection__label">${q}</label>
            <textarea
              class="foto-reflection__input"
              data-question="${i}"
              rows="3"
              maxlength="500"
              placeholder="${isEn ? 'Your thoughts...' : 'Deine Gedanken...'}"
            ></textarea>
            <span class="foto-reflection__counter">0 / 500</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Event-Handler
  const textareas = container.querySelectorAll('.foto-reflection__input');
  textareas.forEach((ta, index) => {
    // Gespeicherten Wert laden
    const saved = localStorage.getItem(`${STORAGE_PREFIX}${moduleId}-${index}`);
    if (saved) {
      ta.value = saved;
      updateCounter(ta);
    }

    // Input-Handler mit Debounce
    let timeout;
    ta.addEventListener('input', () => {
      updateCounter(ta);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        localStorage.setItem(`${STORAGE_PREFIX}${moduleId}-${index}`, ta.value);
      }, 800);
    });
  });
}

function updateCounter(textarea) {
  const counter = textarea.nextElementSibling;
  if (counter) {
    counter.textContent = `${textarea.value.length} / 500`;
  }
}
```

---

## Phase 4: HTML-Modul-Template (30 Minuten)

### Schritt 4.1: Modul-Skeleton

```html
<!-- module/01-belichtung.html -->
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modul 01: Belichtung | Fotografie-Lab</title>
  <meta name="description" content="Lerne die Grundlagen der Belichtung in der Fotografie.">

  <!-- Phosphor Icons -->
  <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css">

  <!-- Tutorial CSS -->
  <link rel="stylesheet" href="/tutorials/fotografie-lab/css/fotografie-lab.css">
</head>
<body data-module="f01" data-theme="dark" style="--module-accent: #FF6B35;">

  <!-- Skip Link -->
  <a href="#main-content" class="u-skip-link">Zum Hauptinhalt springen</a>

  <!-- Header -->
  <header class="foto-header">
    <div class="foto-header__container o-container">
      <a href="/tutorials/fotografie-lab/" class="foto-header__logo">
        <img src="/tutorials/assets/logo/plu-logo.svg" alt="PLU Logo" width="32" height="32">
        <span>Fotografie-Lab</span>
      </a>
      <nav class="foto-header__nav" aria-label="Hauptnavigation">
        <a href="/tutorials/fotografie-lab/">Übersicht</a>
        <a href="../02-blende/module-02.html">Nächstes Modul →</a>
      </nav>
      <button id="theme-toggle" class="foto-header__btn" aria-label="Theme wechseln">
        <i class="ph ph-moon" aria-hidden="true"></i>
      </button>
    </div>
  </header>

  <!-- Main Content -->
  <main id="main-content">

    <!-- Hero Section -->
    <section class="foto-hero">
      <div class="o-container">
        <span class="foto-hero__badge">Modul 01</span>
        <h1 class="foto-hero__title">Belichtung</h1>
        <p class="foto-hero__lead">
          Das Herzstück jeder Fotografie. Lerne, wie Licht dein Bild formt.
        </p>
      </div>
    </section>

    <!-- Content Section -->
    <section class="foto-content o-container">
      <h2>Was ist Belichtung?</h2>
      <p>Belichtung ist die Menge an Licht, die auf den Sensor trifft...</p>

      <!-- Interaktive Simulation -->
      <div class="foto-sim-exposure">
        <h3>Belichtungs-Dreieck</h3>
        <!-- Hier kommt deine Interaktion -->
      </div>
    </section>

    <!-- Checklist Section -->
    <section class="foto-checklist-section o-container">
      <h2>Checkliste: Belichtung verstanden?</h2>
      <div class="foto-checklist" data-checklist>
        <div class="foto-checklist__item">
          <button class="foto-checklist__checkbox" aria-label="Markieren"></button>
          <span class="foto-checklist__label">Ich verstehe das Belichtungsdreieck</span>
        </div>
        <div class="foto-checklist__item">
          <button class="foto-checklist__checkbox" aria-label="Markieren"></button>
          <span class="foto-checklist__label">Ich kann Über- und Unterbelichtung erkennen</span>
        </div>
        <div class="foto-checklist__item">
          <button class="foto-checklist__checkbox" aria-label="Markieren"></button>
          <span class="foto-checklist__label">Ich kenne den Unterschied zwischen Blende, Verschlusszeit und ISO</span>
        </div>
      </div>
    </section>

    <!-- Reflection Section -->
    <section class="foto-reflection-section o-container">
      <div id="moduleReflection"></div>
    </section>

    <!-- CTA Section -->
    <section class="foto-cta o-container">
      <a href="../02-blende/module-02.html" class="foto-btn foto-btn--primary">
        Nächstes Modul: Blende →
      </a>
    </section>

  </main>

  <!-- Footer -->
  <footer class="foto-footer">
    <div class="o-container">
      <p>© 2026 PANTAM Learning Universe</p>
      <p>Content: CC BY-NC-SA 4.0 • Code: MIT License</p>
    </div>
  </footer>

  <!-- Mobile Bottom Bar -->
  <div id="mobileBottomBar" class="foto-bottom-bar"></div>

  <!-- JS Entry Point -->
  <script type="module" src="/tutorials/fotografie-lab/js/entry-chapter.js"></script>

</body>
</html>
```

### Schritt 4.2: Wichtige HTML-Konventionen

```html
<!-- 1. data-module für JS-Module-Identifikation -->
<body data-module="f01">

<!-- 2. data-theme auf <html>, nicht <body> -->
<html lang="de" data-theme="dark">

<!-- 3. --module-accent für Modul-Farbe -->
<body style="--module-accent: #FF6B35;">

<!-- 4. Skip-Link am Anfang des body -->
<a href="#main-content" class="u-skip-link">...</a>

<!-- 5. main mit id="main-content" -->
<main id="main-content">

<!-- 6. 0 Inline-Scripts — alles über ES6-Module -->
<script type="module" src="/tutorials/fotografie-lab/js/entry-chapter.js"></script>

<!-- 7. ARIA-Labels für Icon-Buttons -->
<button aria-label="Menü öffnen">
  <i class="ph ph-list" aria-hidden="true"></i>
</button>

<!-- 8. Root-relative Pfade für Ressourcen -->
<link rel="stylesheet" href="/tutorials/fotografie-lab/css/fotografie-lab.css">
```

---

## Phase 5: CSS-Komponenten (30 Minuten)

### Schritt 5.1: Checklisten-CSS

```css
/* css/05-components/checklist.css */

@layer components {
  .foto-checklist {
    display: flex;
    flex-direction: column;
    gap: var(--foto-space-3);
  }

  .foto-checklist__item {
    display: flex;
    align-items: flex-start;
    gap: var(--foto-space-3);
    padding: var(--foto-space-4);
    background: var(--foto-bg-elevated);
    border: 1px solid var(--foto-border-default);
    border-radius: var(--foto-radius-md);
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .foto-checklist__item:hover {
    border-color: var(--foto-border-default);
    background: rgba(255, 255, 255, 0.03);
  }

  .foto-checklist__checkbox {
    width: 24px;
    height: 24px;
    border: 2px solid var(--foto-border-default);
    border-radius: var(--foto-radius-sm);
    background: transparent;
    cursor: pointer;
    flex-shrink: 0;
    margin-top: 2px;
    transition: all 0.2s ease;
  }

  .foto-checklist__item.is-checked {
    background: var(--foto-accent-success-dim);
    border-color: var(--foto-accent-success);
  }

  .foto-checklist__item.is-checked .foto-checklist__checkbox {
    background: var(--foto-accent-success);
    border-color: var(--foto-accent-success);
    box-shadow: 0 0 12px var(--foto-accent-success-glow);
  }

  .foto-checklist__item.is-checked .foto-checklist__label {
    color: var(--foto-text-secondary);
    text-decoration: line-through;
    text-decoration-color: var(--foto-border-subtle);
    text-decoration-thickness: 1px;
  }

  .foto-checklist__label {
    font-size: var(--foto-text-md);
    color: var(--foto-text-primary);
    line-height: var(--foto-line-height-normal);
  }

  .foto-checklist.is-completed {
    border-color: var(--foto-accent-success);
    box-shadow: 0 0 20px var(--foto-accent-success-glow);
  }
}
```

### Schritt 5.2: Reflection-CSS

```css
/* css/05-components/reflection.css */

@layer components {
  .foto-reflection {
    background: var(--foto-bg-elevated);
    border: 1px solid var(--foto-border-default);
    border-radius: var(--foto-radius-lg);
    padding: var(--foto-space-8);
  }

  .foto-reflection__title {
    font-size: var(--foto-text-2xl);
    font-weight: var(--foto-font-weight-bold);
    color: var(--foto-text-primary);
    margin-bottom: var(--foto-space-2);
  }

  .foto-reflection__subtitle {
    font-size: var(--foto-text-md);
    color: var(--foto-text-secondary);
    margin-bottom: var(--foto-space-6);
  }

  .foto-reflection__questions {
    display: flex;
    flex-direction: column;
    gap: var(--foto-space-6);
  }

  .foto-reflection__question {
    display: flex;
    flex-direction: column;
    gap: var(--foto-space-2);
  }

  .foto-reflection__label {
    font-size: var(--foto-text-md);
    font-weight: var(--foto-font-weight-semibold);
    color: var(--foto-text-primary);
  }

  .foto-reflection__input {
    width: 100%;
    padding: var(--foto-space-3);
    background: var(--foto-bg-base);
    border: 1px solid var(--foto-border-default);
    border-radius: var(--foto-radius-md);
    color: var(--foto-text-primary);
    font-size: var(--foto-text-md);
    resize: vertical;
    min-height: 80px;
  }

  .foto-reflection__input:focus {
    outline: 2px solid var(--foto-accent);
    outline-offset: 2px;
    border-color: var(--foto-accent);
  }

  .foto-reflection__counter {
    font-size: var(--foto-text-sm);
    color: var(--foto-text-tertiary);
    text-align: right;
  }
}
```

---

## Phase 6: Build & Test (15 Minuten)

### Schritt 6.1: Dev-Server starten

```bash
cd tutorials/fotografie-lab
npx vite
```

Öffne: `http://localhost:5173/tutorials/fotografie-lab/module/01-belichtung.html`

### Schritt 6.2: Produktions-Build

```bash
npx vite build
```

Prüfe den `dist/`-Ordner:
- HTML-Dateien mit ersetzten Pfaden
- JS/CSS-Chunks mit Hash
- gzip/br-Dateien
- Sourcemaps

### Schritt 6.3: Preview

```bash
npx vite preview
```

---

## ✅ Checkliste: Tutorial-Setup komplett?

| # | Aufgabe | Status |
|---|---------|--------|
| 1 | Ordnerstruktur erstellt | ☐ |
| 2 | `package.json` mit Vite | ☐ |
| 3 | `vite.config.js` mit korrektem `base` | ☐ |
| 4 | `npm install` ausgeführt | ☐ |
| 5 | Tokens erstellt (`--foto-*`) | ☐ |
| 6 | CSS-Import-Hub mit `@layer` | ☐ |
| 7 | JS-Entry Points erstellt | ☐ |
| 8 | Erstes Modul-HTML geschrieben | ☐ |
| 9 | Checklisten-CSS + JS | ☐ |
| 10 | Reflection-CSS + JS | ☐ |
| 11 | Skip-Link + ARIA-Labels | ☐ |
| 12 | Root-relative Pfade | ☐ |
| 13 | `data-module` auf `<body>` | ☐ |
| 14 | `data-theme="dark"` auf `<html>` | ☐ |
| 15 | `0 Inline-Scripts` | ☐ |
| 16 | Build erfolgreich | ☐ |
| 17 | Mobile Bottom Bar (optional) | ☐ |
| 18 | Lizenz-Footer im HTML | ☐ |

---

## 🎓 Pädagogische Struktur pro Modul

Jedes Modul sollte folgende Sektionen enthalten:

```
1. Hero
   - Modul-Nummer, Titel, 1-Satz-Lernziel

2. Trigger (Neugier wecken)
   - Problemstellung, "Was wäre wenn?", Challenge

3. Explain (Theorie)
   - Kernkonzepte erklären
   - Max. 3 Kernkonzepte pro Modul
   - Interaktive Elemente alle 3 Minuten

4. Apply (Übung)
   - Hands-on Übung
   - Mini-Projekt
   - Interaktive Simulation

5. Check (Selbstbewertung)
   - Checkliste mit 3-5 Punkten
   - Auto-Save in localStorage

6. Reflect (Lern-Reflexion)
   - 3 metakognitive Fragen
   - Auto-Save, 500 Zeichen Limit

7. CTA (Nächster Schritt)
   - Link zum nächsten Modul
   - Oder: Zurück zur Übersicht
```

---

## 🔗 Verwandte Dokumente

- `01-ARCHITECTURE.md` — Gesamtarchitektur & Vite-Bundling
- `02-DESIGN-SYSTEM.md` — Design Tokens, Farbpsychologie, Accessibility
- `04-VIDEO-LAB-REFERENCE.md` — Referenz-Implementierung im Detail
- `05-STARTER-TEMPLATE.md` — Kopierbarer Skeleton-Ordner
