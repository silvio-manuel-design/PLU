# Starter Template

> **Minimaler Skeleton für neue PLU-Tutorials**  
> **Kopiere diesen Ordner und passe an:** `tutorials/TEMPLATE-starter/`  
> **Detaillierte Anleitung:** `03-TUTORIAL-AUTHORING-GUIDE.md`

---

## 📁 Ordnerstruktur

```
tutorials/TEMPLATE-starter/
├── package.json
├── vite.config.js
├── index.html
├── index-en.html
│
├── css/
│   ├── TEMPLATE.css              # ← Dein Import-Hub
│   ├── 00-settings/
│   │   └── TEMPLATE-tokens.css   # ← Deine Tokens
│   ├── 01-generic/
│   │   └── reset.css
│   ├── 02-layout/
│   │   └── grid.css
│   ├── 03-objects/
│   │   └── layout-objects.css
│   ├── 04-components/
│   │   ├── header.css
│   │   └── footer.css
│   ├── 05-components/
│   │   ├── checklist.css
│   │   ├── reflection.css
│   │   └── cards.css
│   ├── 06-pages/
│   │   └── chapter.css
│   ├── 07-animations/
│   │   └── animations.css
│   ├── 08-modes/
│   │   └── theme-mode.css
│   └── 09-utilities/
│       └── utilities.css
│
├── js/
│   ├── entry-global.js
│   ├── entry-chapter.js
│   ├── entry-home.js
│   └── modules/
│       ├── theme.js
│       ├── navigation.js
│       ├── checklist.js
│       └── reflection.js
│
├── module/
│   ├── 00-willkommen.html
│   └── 00-welcome.html
│
└── assets/
    └── favicon.svg
```

---

## 📄 Datei-Inhalte

### package.json

```json
{
  "name": "TEMPLATE-starter",
  "version": "1.0.0",
  "description": "PLU Tutorial Starter",
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

### vite.config.js

```javascript
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';

export default defineConfig({
  base: '/tutorials/TEMPLATE-starter/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        global: './js/entry-global.js',
        chapter: './js/entry-chapter.js',
        home: './js/entry-home.js',
      },
    },
    assetsDir: 'assets',
    cssCodeSplit: true,
    sourcemap: true,
  },
  plugins: [
    compression({ algorithm: 'gzip' }),
    compression({ algorithm: 'brotliCompress', ext: '.br' }),
  ],
});
```

### css/TEMPLATE.css

```css
@layer tokens, generic, layout, objects, components, pages, animations, modes, utilities;

@import url('./00-settings/TEMPLATE-tokens.css') layer(tokens);
@import url('./01-generic/reset.css') layer(generic);
@import url('./02-layout/grid.css') layer(layout);
@import url('./03-objects/layout-objects.css') layer(objects);
@import url('./04-components/header.css') layer(components);
@import url('./04-components/footer.css') layer(components);
@import url('./05-components/checklist.css') layer(components);
@import url('./05-components/reflection.css') layer(components);
@import url('./05-components/cards.css') layer(components);
@import url('./06-pages/chapter.css') layer(pages);
@import url('./07-animations/animations.css') layer(animations);
@import url('./08-modes/theme-mode.css') layer(modes);
@import url('./09-utilities/utilities.css') layer(utilities);
```

### css/00-settings/TEMPLATE-tokens.css

```css
:root {
  /* === Primärfarbe (ANPASSEN!) === */
  --tpl-accent: #FF6B35;
  --tpl-accent-dim: rgba(255, 107, 53, 0.1);
  --tpl-accent-glow: rgba(255, 107, 53, 0.3);

  /* === Semantische Farben === */
  --tpl-accent-success: #2ecc71;
  --tpl-accent-success-dim: rgba(46, 204, 113, 0.1);
  --tpl-accent-warning: #F59E0B;
  --tpl-accent-error: #EF4444;

  /* === Hintergründe === */
  --tpl-bg-base: #0a0c10;
  --tpl-bg-elevated: #13161f;
  --tpl-bg-surface: #1a1e2e;

  /* === Text === */
  --tpl-text-primary: #e8eef1;
  --tpl-text-secondary: #8b949e;
  --tpl-text-tertiary: #6e7681;

  /* === Border === */
  --tpl-border-subtle: rgba(255, 255, 255, 0.06);
  --tpl-border-default: rgba(255, 255, 255, 0.1);

  /* === Abstände === */
  --tpl-space-1: 0.25rem;
  --tpl-space-2: 0.5rem;
  --tpl-space-3: 0.75rem;
  --tpl-space-4: 1rem;
  --tpl-space-6: 1.5rem;
  --tpl-space-8: 2rem;
  --tpl-space-12: 3rem;
  --tpl-space-16: 4rem;

  /* === Schrift === */
  --tpl-font-family: 'Inter', -apple-system, sans-serif;
  --tpl-text-sm: 0.875rem;
  --tpl-text-md: 1rem;
  --tpl-text-lg: 1.125rem;
  --tpl-text-xl: 1.25rem;
  --tpl-text-2xl: 1.5rem;

  /* === Radius === */
  --tpl-radius-sm: 4px;
  --tpl-radius-md: 8px;
  --tpl-radius-lg: 12px;
  --tpl-radius-full: 9999px;
}

[data-theme="light"] {
  --tpl-bg-base: #f5f5f5;
  --tpl-bg-elevated: #ffffff;
  --tpl-text-primary: #1a1a1a;
  --tpl-text-secondary: #666666;
  --tpl-border-subtle: rgba(0, 0, 0, 0.06);
  --tpl-border-default: rgba(0, 0, 0, 0.1);
}
```

### js/entry-global.js

```javascript
import { initTheme } from './modules/theme.js';
import { initNavigation } from './modules/navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
});
```

### js/entry-chapter.js

```javascript
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

### js/entry-home.js

```javascript
import { initTheme } from './modules/theme.js';
import { initNavigation } from './modules/navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
});
```

### module/00-willkommen.html

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Willkommen | TEMPLATE</title>
  <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css">
  <link rel="stylesheet" href="/tutorials/TEMPLATE-starter/css/TEMPLATE.css">
</head>
<body data-module="m00" data-theme="dark" style="--module-accent: #FFD700;">

  <a href="#main-content" class="u-skip-link">Zum Hauptinhalt springen</a>

  <header class="tpl-header">
    <div class="o-container">
      <a href="/tutorials/TEMPLATE-starter/" class="tpl-header__logo">TEMPLATE</a>
      <button id="theme-toggle" class="tpl-header__btn" aria-label="Theme wechseln">
        <i class="ph ph-moon" aria-hidden="true"></i>
      </button>
    </div>
  </header>

  <main id="main-content">
    <section class="tpl-hero">
      <div class="o-container">
        <h1>Willkommen</h1>
        <p>Dein Lern-Template ist bereit!</p>
      </div>
    </section>

    <section class="tpl-checklist-section o-container">
      <div class="tpl-checklist" data-checklist>
        <div class="tpl-checklist__item">
          <button class="tpl-checklist__checkbox" aria-label="Markieren"></button>
          <span class="tpl-checklist__label">Setup verstanden</span>
        </div>
      </div>
    </section>

    <section class="tpl-reflection-section o-container">
      <div id="moduleReflection"></div>
    </section>
  </main>

  <footer class="tpl-footer">
    <div class="o-container">
      <p>Content: CC BY-NC-SA 4.0 • Code: MIT License</p>
    </div>
  </footer>

  <script type="module" src="/tutorials/TEMPLATE-starter/js/entry-chapter.js"></script>
</body>
</html>
```

---

## 🚀 Schnellstart

```bash
# 1. Kopieren
cd tutorials
cp -r TEMPLATE-starter mein-tutorial
cd mein-tutorial

# 2. Anpassen
# - Ordnername: TEMPLATE-starter → mein-tutorial
# - package.json: name → "mein-tutorial"
# - vite.config.js: base → "/tutorials/mein-tutorial/"
# - CSS: --tpl-* → --mein-*
# - HTML: Pfade anpassen

# 3. Installieren
npm install

# 4. Dev-Server
npx vite

# 5. Build
npx vite build
```

---

## 🔗 Verwandte Dokumente

- `03-TUTORIAL-AUTHORING-GUIDE.md` — Detaillierte Schritt-für-Schritt-Anleitung
- `01-ARCHITECTURE.md` — Gesamtarchitektur
- `02-DESIGN-SYSTEM.md` — Design Tokens & Farbpsychologie
- `04-VIDEO-LAB-REFERENCE.md` — Vollständige Referenz-Implementierung
