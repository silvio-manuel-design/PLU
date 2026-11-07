# KI-Creative Lab Hub - Vollständige Spezifikation

**Projekt:** KI-Creative Lab Hub 2026  
**Autor:** HTL Traun - Medientechnik  
**Zielgruppe:** Fachschule 1. Klasse (15-19 Jahre, multikulturell)  
**Workshop-Datum:** 29.-30. Juni 2026  
**Dauer:** 2 × 4 Stunden  
**Technologie:** Autarke HTML/CSS/JS-Website, lokal startbar  

---

## 1. ARCHITEKTUR-PRINZIPIEN

### 1.1 CSS-Architektur: ITCSS + BEM
- **ITCSS** (Inverted Triangle CSS): Layer von generisch zu spezifisch
- **BEM** (Block Element Modifier): `.c-component-name__element--modifier`
- **Mobile First**: Alle Breakpoints mit `min-width`
- **Kein Inline-CSS**, kein internes `<style>`-Tag
- **CSS Custom Properties** für alle Design-Tokens
- **Dark/Light-Mode** via `data-theme` Attribut auf `<html>`

### 1.2 JavaScript-Architektur
- **ES6 Modules**: `type="module"` im `<script>`-Tag
- **Event Delegation** statt einzelner Event Listener
- **LocalStorage** für Session-Persistenz (Projekt-Status, Iterations-Log)
- **Keine externen Dependencies** (kein jQuery, kein Framework)
- **Accessibility**: ARIA-Labels, Keyboard-Navigation, Focus-Management

### 1.3 HTML-Struktur
- **Semantisches HTML5**: `<header>`, `<main>`, `<section>`, `<nav>`, `<article>`
- **Keine div-Suppe**: Jeder Container hat semantische Bedeutung
- **Progressive Enhancement**: Website funktioniert ohne JS (Grundfunktionen)
- **Sprache**: `lang="de"` auf `<html>`

### 1.4 Performance
- **Lazy Loading** für Bilder (`loading="lazy"`)
- **SVG-Sprite** für Icons (keine Einzel-SVGs, keine Emojis)
- **CSS-Variablen** für schnelle Theme-Switches (kein JS-Recalculation)
- **Minimal DOM-Manipulation**: DocumentFragments für Batch-Updates

---

## 2. ORDNERSTRUKTUR

```
ki-creative-lab/
├── index.html                          (Einstiegspunkt)
├── css/
│   ├── settings/                       (Design-Tokens)
│   │   ├── _colors.css                 (Farben + Dark/Light-Mode)
│   │   ├── _typography.css             (Fonts, Größen, Zeilenabstände)
│   │   └── _breakpoints.css            (Responsive Breakpoints)
│   ├── tools/                          (Mixins, Funktionen)
│   │   └── _mixins.css                 (Hilfs-CSS für Wiederholungen)
│   ├── generic/                        (CSS-Reset, Normalize)
│   │   ├── _reset.css                  (Eric Meyer Reset + Custom)
│   │   └── _box-sizing.css             (Border-Box global)
│   ├── elements/                       (Base HTML-Elemente)
│   │   ├── _headings.css               (H1-H6 Styling)
│   │   ├── _links.css                  (Anchor-Tag Basis)
│   │   └── _forms.css                  (Input, Button, Textarea Basis)
│   ├── objects/                        (Layout-Patterns)
│   │   ├── _layout.css                 (Container, Wrapper)
│   │   ├── _grid.css                   (CSS-Grid System)
│   │   └── _media.css                  (Responsive Media-Queries)
│   ├── components/                     (BEM-Blöcke - Haupt-UI)
│   │   ├── _c-nav.css                  (Navigation)
│   │   ├── _c-hero.css                 (Hero-Section)
│   │   ├── _c-project-card.css         (Projekt-Auswahl-Karten)
│   │   ├── _c-agent-card.css           (Agent-Swarm-Karten)
│   │   ├── _c-swarm-panel.css          (Agent-Swarm-Interface)
│   │   ├── _c-asset-library.css        (Prompt-Template-Bibliothek)
│   │   ├── _c-iterations-log.css       (Iterations-Tracker)
│   │   ├── _c-showcase-wall.css        (Projekt-Showcase)
│   │   ├── _c-peer-review.css          (Peer-Review-Tool)
│   │   ├── _c-theme-toggle.css         (Dark/Light-Mode Toggle)
│   │   ├── _c-modal.css                (Modal-System)
│   │   ├── _c-timeline.css             (Workshop-Timeline)
│   │   └── _c-export-panel.css         (Export/Download-Panel)
│   ├── utilities/                      (Hilfs-Klassen)
│   │   └── _helpers.css                (Text-Align, Display, Visibility)
│   └── main.css                        (Importiert ALLE Layer in Reihenfolge)
├── js/
│   ├── modules/                        (ES6 Module)
│   │   ├── theme-manager.js            (Dark/Light-Mode + LocalStorage)
│   │   ├── project-selector.js         (Projekt-Auswahl + State)
│   │   ├── swarm-controller.js         (Agent-Swarm-Logik)
│   │   ├── asset-manager.js            (Prompt-Templates + Assets)
│   │   ├── iteration-tracker.js        (Log + Export + LocalStorage)
│   │   ├── showcase-wall.js            (Projekt-Upload + Anzeige)
│   │   ├── peer-review.js              (Bewertungs-System)
│   │   ├── modal-system.js             (Accessible Modals)
│   │   ├── timeline-manager.js         (Workshop-Timeline + Countdown)
│   │   └── export-manager.js           (ZIP-Export + Download)
│   └── main.js                         (Initialisierung + Module-Loader)
├── assets/
│   ├── images/
│   │   ├── hero-dark.jpg               (Hero-Hintergrund Dark-Mode)
│   │   ├── hero-light.jpg              (Hero-Hintergrund Light-Mode)
│   │   ├── agents/
│   │   │   ├── creative-lead.png       (Agent: Creative Lead)
│   │   │   ├── code-architect.png      (Agent: Code Architect)
│   │   │   ├── visual-designer.png     (Agent: Visual Designer)
│   │   │   ├── story-weaver.png        (Agent: Story Weaver)
│   │   │   └── critic-editor.png       (Agent: Critic/Editor)
│   │   └── projects/
│   │       ├── tourism-2-0.jpg         (Projekt 1: Tourismus 2.0)
│   │       ├── smart-classroom.jpg     (Projekt 2: Smart Classroom)
│   │       ├── game-platform.jpg       (Projekt 3: Game Platform)
│   │       ├── streetwear.jpg          (Projekt 4: Streetwear Brand)
│   │       ├── music-ai.jpg            (Projekt 5: Music AI)
│   │       ├── cyberpunk-city.jpg      (Projekt 6: Cyberpunk City)
│   │       ├── food-fusion.jpg         (Projekt 7: Food Fusion Lab)
│   │       ├── esports.jpg             (Projekt 8: Esports Platform)
│   │       └── mythology.jpg           (Projekt 9: AI Mythology)
│   └── icons/
│       └── icons.svg                   (SVG-Sprite mit allen Icons)
└── data/
    └── project-briefings.json          (9 Projekte + Agent-Chains + Prompts)
```

---

## 3. DESIGN-SYSTEM

### 3.1 Farbpalette (CSS Custom Properties)

#### Dark Mode (Default)
```css
:root,
:root[data-theme="dark"] {
  --color-primary: #00d4ff;
  --color-primary-light: #4de8ff;
  --color-primary-dark: #0099cc;
  --color-primary-transparent: rgba(0, 212, 255, 0.15);

  --color-secondary: #ff6b9d;
  --color-secondary-light: #ff9ec0;
  --color-secondary-dark: #cc3366;
  --color-secondary-transparent: rgba(255, 107, 157, 0.15);

  --color-accent: #a855f7;
  --color-accent-light: #c084fc;
  --color-accent-dark: #7c3aed;

  --color-bg-base: #0a0a0f;
  --color-bg-surface: #12121a;
  --color-bg-elevated: #1a1a2e;
  --color-bg-overlay: rgba(10, 10, 15, 0.85);
  --color-bg-card: rgba(26, 26, 46, 0.8);

  --color-text-primary: #f0f0f5;
  --color-text-secondary: #a0a0b0;
  --color-text-muted: #6b6b7b;
  --color-text-inverse: #0a0a0f;

  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-hover: rgba(255, 255, 255, 0.15);
  --color-border-active: rgba(0, 212, 255, 0.4);

  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4);
  --shadow-glow: 0 0 20px rgba(0, 212, 255, 0.3);
  --shadow-glow-secondary: 0 0 20px rgba(255, 107, 157, 0.3);
}
```

#### Light Mode
```css
:root[data-theme="light"] {
  --color-primary: #0066cc;
  --color-primary-light: #3399ff;
  --color-primary-dark: #004499;
  --color-primary-transparent: rgba(0, 102, 204, 0.1);

  --color-secondary: #e11d48;
  --color-secondary-light: #f43f5e;
  --color-secondary-dark: #9f1239;
  --color-secondary-transparent: rgba(225, 29, 72, 0.1);

  --color-accent: #7c3aed;
  --color-accent-light: #a855f7;
  --color-accent-dark: #5b21b6;

  --color-bg-base: #fafafa;
  --color-bg-surface: #ffffff;
  --color-bg-elevated: #f5f5f7;
  --color-bg-overlay: rgba(255, 255, 255, 0.9);
  --color-bg-card: rgba(255, 255, 255, 0.9);

  --color-text-primary: #1a1a2e;
  --color-text-secondary: #4a4a5a;
  --color-text-muted: #8a8a9a;
  --color-text-inverse: #ffffff;

  --color-border: rgba(0, 0, 0, 0.08);
  --color-border-hover: rgba(0, 0, 0, 0.15);
  --color-border-active: rgba(0, 102, 204, 0.4);

  --color-success: #16a34a;
  --color-warning: #d97706;
  --color-error: #dc2626;
  --color-info: #2563eb;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05);
  --shadow-glow: 0 0 20px rgba(0, 102, 204, 0.15);
  --shadow-glow-secondary: 0 0 20px rgba(225, 29, 72, 0.15);
}
```

### 3.2 Typografie
```css
:root {
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;
  --text-7xl: 4.5rem;

  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;

  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}
```

### 3.3 Spacing-System
```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;

  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;
}
```

### 3.4 Breakpoints (Mobile First)
```css
:root {
  --bp-sm: 640px;
  --bp-md: 768px;
  --bp-lg: 1024px;
  --bp-xl: 1280px;
  --bp-2xl: 1536px;
}
```

---

## 4. KOMPLETTE CODE-DATEIEN

### 4.1 CSS Layer: Settings

**Datei: `css/settings/_colors.css`**
```css
/* ============================================
   SETTINGS - COLORS
   Design-Tokens für Dark/Light-Mode
   ============================================ */

:root,
:root[data-theme="dark"] {
  --color-primary: #00d4ff;
  --color-primary-light: #4de8ff;
  --color-primary-dark: #0099cc;
  --color-primary-transparent: rgba(0, 212, 255, 0.15);

  --color-secondary: #ff6b9d;
  --color-secondary-light: #ff9ec0;
  --color-secondary-dark: #cc3366;
  --color-secondary-transparent: rgba(255, 107, 157, 0.15);

  --color-accent: #a855f7;
  --color-accent-light: #c084fc;
  --color-accent-dark: #7c3aed;

  --color-bg-base: #0a0a0f;
  --color-bg-surface: #12121a;
  --color-bg-elevated: #1a1a2e;
  --color-bg-overlay: rgba(10, 10, 15, 0.85);
  --color-bg-card: rgba(26, 26, 46, 0.8);

  --color-text-primary: #f0f0f5;
  --color-text-secondary: #a0a0b0;
  --color-text-muted: #6b6b7b;
  --color-text-inverse: #0a0a0f;

  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-hover: rgba(255, 255, 255, 0.15);
  --color-border-active: rgba(0, 212, 255, 0.4);

  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4);
  --shadow-glow: 0 0 20px rgba(0, 212, 255, 0.3);
  --shadow-glow-secondary: 0 0 20px rgba(255, 107, 157, 0.3);
}

:root[data-theme="light"] {
  --color-primary: #0066cc;
  --color-primary-light: #3399ff;
  --color-primary-dark: #004499;
  --color-primary-transparent: rgba(0, 102, 204, 0.1);

  --color-secondary: #e11d48;
  --color-secondary-light: #f43f5e;
  --color-secondary-dark: #9f1239;
  --color-secondary-transparent: rgba(225, 29, 72, 0.1);

  --color-accent: #7c3aed;
  --color-accent-light: #a855f7;
  --color-accent-dark: #5b21b6;

  --color-bg-base: #fafafa;
  --color-bg-surface: #ffffff;
  --color-bg-elevated: #f5f5f7;
  --color-bg-overlay: rgba(255, 255, 255, 0.9);
  --color-bg-card: rgba(255, 255, 255, 0.9);

  --color-text-primary: #1a1a2e;
  --color-text-secondary: #4a4a5a;
  --color-text-muted: #8a8a9a;
  --color-text-inverse: #ffffff;

  --color-border: rgba(0, 0, 0, 0.08);
  --color-border-hover: rgba(0, 0, 0, 0.15);
  --color-border-active: rgba(0, 102, 204, 0.4);

  --color-success: #16a34a;
  --color-warning: #d97706;
  --color-error: #dc2626;
  --color-info: #2563eb;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05);
  --shadow-glow: 0 0 20px rgba(0, 102, 204, 0.15);
  --shadow-glow-secondary: 0 0 20px rgba(225, 29, 72, 0.15);
}
```

**Datei: `css/settings/_typography.css`**
```css
/* ============================================
   SETTINGS - TYPOGRAPHY
   Font-System für Consistentes Design
   ============================================ */

:root {
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;
  --text-7xl: 4.5rem;

  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;

  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}
```

**Datei: `css/settings/_breakpoints.css`**
```css
/* ============================================
   SETTINGS - BREAKPOINTS
   Mobile-First Responsive Design
   ============================================ */

:root {
  --bp-sm: 640px;
  --bp-md: 768px;
  --bp-lg: 1024px;
  --bp-xl: 1280px;
  --bp-2xl: 1536px;
}
```



### 4.2 CSS Layer: Tools

**Datei: `css/tools/_mixins.css`**
```css
/* ============================================
   TOOLS - MIXINS
   Wiederverwendbare CSS-Patterns
   ============================================ */

.o-container {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

@media (min-width: 640px) {
  .o-container {
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  }
}

@media (min-width: 1024px) {
  .o-container {
    padding-left: var(--space-8);
    padding-right: var(--space-8);
  }
}

.o-container--narrow {
  max-width: 768px;
}

.o-container--wide {
  max-width: 1440px;
}

.u-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

html {
  scroll-behavior: smooth;
}

:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.u-transition {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.3); }
  50% { box-shadow: 0 0 40px rgba(0, 212, 255, 0.5); }
}

.u-animate-fadeIn {
  animation: fadeIn 0.5s ease forwards;
}

.u-animate-slideIn {
  animation: slideIn 0.3s ease forwards;
}
```

### 4.3 CSS Layer: Generic

**Datei: `css/generic/_reset.css`**
```css
/* ============================================
   GENERIC - RESET
   Eric Meyer Reset + Custom Anpassungen
   ============================================ */

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  font-family: var(--font-primary);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--color-text-primary);
  background-color: var(--color-bg-base);
  min-height: 100vh;
  overflow-x: hidden;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
  height: auto;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
  border: none;
  background: none;
}

a {
  color: inherit;
  text-decoration: none;
}

ul,
ol {
  list-style: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

button,
input[type="submit"],
input[type="reset"] {
  -webkit-appearance: none;
  appearance: none;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-bg-surface);
}

::-webkit-scrollbar-thumb {
  background: var(--color-text-muted);
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-secondary);
}
```

**Datei: `css/generic/_box-sizing.css`**
```css
/* ============================================
   GENERIC - BOX-SIZING
   Border-Box für alle Elemente
   ============================================ */

html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}
```

### 4.4 CSS Layer: Elements

**Datei: `css/elements/_headings.css`**
```css
/* ============================================
   ELEMENTS - HEADINGS
   Basis-Styling für Überschriften
   ============================================ */

h1, h2, h3, h4, h5, h6 {
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--color-text-primary);
  letter-spacing: var(--tracking-tight);
}

h1 {
  font-size: var(--text-4xl);
  line-height: var(--leading-tight);
}

@media (min-width: 768px) {
  h1 {
    font-size: var(--text-5xl);
  }
}

@media (min-width: 1024px) {
  h1 {
    font-size: var(--text-6xl);
  }
}

h2 {
  font-size: var(--text-3xl);
}

@media (min-width: 768px) {
  h2 {
    font-size: var(--text-4xl);
  }
}

h3 {
  font-size: var(--text-2xl);
}

@media (min-width: 768px) {
  h3 {
    font-size: var(--text-3xl);
  }
}

h4 {
  font-size: var(--text-xl);
}

@media (min-width: 768px) {
  h4 {
    font-size: var(--text-2xl);
  }
}

h5 {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
}

h6 {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--color-text-muted);
}
```

**Datei: `css/elements/_links.css`**
```css
/* ============================================
   ELEMENTS - LINKS
   Basis-Styling für Anchor-Tags
   ============================================ */

a {
  color: var(--color-primary);
  transition: color 0.2s ease, opacity 0.2s ease;
}

a:hover {
  color: var(--color-primary-light);
}

a:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

a:active {
  opacity: 0.8;
}
```

**Datei: `css/elements/_forms.css`**
```css
/* ============================================
   ELEMENTS - FORMS
   Basis-Styling für Formular-Elemente
   ============================================ */

input,
textarea,
select {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-text-primary);
  font-size: var(--text-base);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-transparent);
}

input::placeholder,
textarea::placeholder {
  color: var(--color-text-muted);
}

textarea {
  resize: vertical;
  min-height: 120px;
}

select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-3) center;
  background-size: 1.25rem;
  padding-right: var(--space-10);
}

label {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
}

fieldset {
  border: none;
  padding: 0;
}

legend {
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-4);
}
```

### 4.5 CSS Layer: Objects

**Datei: `css/objects/_layout.css`**
```css
/* ============================================
   OBJECTS - LAYOUT
   Layout-Patterns und Container
   ============================================ */

.o-container {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

@media (min-width: 640px) {
  .o-container {
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  }
}

@media (min-width: 1024px) {
  .o-container {
    padding-left: var(--space-8);
    padding-right: var(--space-8);
  }
}

.o-container--narrow {
  max-width: 768px;
}

.o-container--wide {
  max-width: 1440px;
}

.o-section {
  padding-top: var(--space-16);
  padding-bottom: var(--space-16);
}

@media (min-width: 768px) {
  .o-section {
    padding-top: var(--space-20);
    padding-bottom: var(--space-20);
  }
}

@media (min-width: 1024px) {
  .o-section {
    padding-top: var(--space-24);
    padding-bottom: var(--space-24);
  }
}

.o-flex {
  display: flex;
}

.o-flex--center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.o-flex--between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.o-flex--wrap {
  flex-wrap: wrap;
}

.o-flex--column {
  flex-direction: column;
}

.o-flex--gap-2 {
  gap: var(--space-2);
}

.o-flex--gap-4 {
  gap: var(--space-4);
}

.o-flex--gap-6 {
  gap: var(--space-6);
}

.o-flex--gap-8 {
  gap: var(--space-8);
}
```

**Datei: `css/objects/_grid.css`**
```css
/* ============================================
   OBJECTS - GRID
   CSS-Grid System
   ============================================ */

.o-grid {
  display: grid;
  gap: var(--space-6);
}

.o-grid--2 {
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .o-grid--2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

.o-grid--3 {
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .o-grid--3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .o-grid--3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

.o-grid--4 {
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .o-grid--4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .o-grid--4 {
    grid-template-columns: repeat(4, 1fr);
  }
}

.o-grid--5 {
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .o-grid--5 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .o-grid--5 {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .o-grid--5 {
    grid-template-columns: repeat(5, 1fr);
  }
}

.o-grid--auto {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
```

**Datei: `css/objects/_media.css`**
```css
/* ============================================
   OBJECTS - MEDIA
   Responsive Media-Queries (Mobile First)
   ============================================ */

@media (min-width: 640px) {
  .o-hide-sm {
    display: none;
  }
}

@media (min-width: 768px) {
  .o-hide-md {
    display: none;
  }
}

@media (min-width: 1024px) {
  .o-hide-lg {
    display: none;
  }
}

@media (min-width: 1280px) {
  .o-hide-xl {
    display: none;
  }
}

@media (max-width: 639px) {
  .o-show-sm {
    display: none;
  }
}

@media (max-width: 767px) {
  .o-show-md {
    display: none;
  }
}

@media (max-width: 1023px) {
  .o-show-lg {
    display: none;
  }
}
```


### 4.6 CSS Layer: Components (Teil 1)

**Datei: `css/components/_c-nav.css`**
```css
/* ============================================
   COMPONENT - NAVIGATION
   Hauptnavigation mit Mobile-Menu
   ============================================ */

.c-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: var(--color-bg-overlay);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  transition: background-color 0.3s ease;
}

.c-nav__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.c-nav__logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-weight: var(--font-bold);
  font-size: var(--text-lg);
  color: var(--color-text-primary);
  letter-spacing: var(--tracking-tight);
}

.c-nav__logo-icon {
  width: 32px;
  height: 32px;
  color: var(--color-primary);
}

.c-nav__logo-text span {
  color: var(--color-primary);
}

.c-nav__menu {
  display: none;
  align-items: center;
  gap: var(--space-8);
}

@media (min-width: 768px) {
  .c-nav__menu {
    display: flex;
  }
}

.c-nav__link {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text-secondary);
  transition: color 0.2s ease;
  position: relative;
}

.c-nav__link:hover {
  color: var(--color-text-primary);
}

.c-nav__link--active {
  color: var(--color-primary);
}

.c-nav__link--active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-primary);
  border-radius: var(--radius-full);
}

.c-nav__actions {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.c-nav__mobile-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--color-text-primary);
}

@media (min-width: 768px) {
  .c-nav__mobile-toggle {
    display: none;
  }
}

.c-nav__mobile-menu {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-bg-base);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.c-nav__mobile-menu.is-open {
  transform: translateX(0);
}

.c-nav__mobile-link {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  padding: var(--space-4) 0;
  border-bottom: 1px solid var(--color-border);
}
```

**Datei: `css/components/_c-hero.css`**
```css
/* ============================================
   COMPONENT - HERO
   Hero-Section mit Hintergrundbild
   ============================================ */

.c-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-top: 64px;
}

.c-hero__background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.c-hero__background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
}

.c-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    var(--color-bg-base) 0%,
    transparent 30%,
    transparent 70%,
    var(--color-bg-base) 100%
  );
  z-index: 1;
}

.c-hero__content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: var(--space-8);
}

.c-hero__badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background-color: var(--color-primary-transparent);
  border: 1px solid var(--color-border-active);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-primary);
  margin-bottom: var(--space-6);
  letter-spacing: var(--tracking-wide);
}

.c-hero__badge-dot {
  width: 8px;
  height: 8px;
  background-color: var(--color-primary);
  border-radius: var(--radius-full);
  animation: pulse 2s infinite;
}

.c-hero__title {
  font-size: var(--text-4xl);
  font-weight: var(--font-extrabold);
  line-height: var(--leading-tight);
  margin-bottom: var(--space-6);
  background: linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@media (min-width: 768px) {
  .c-hero__title {
    font-size: var(--text-6xl);
  }
}

@media (min-width: 1024px) {
  .c-hero__title {
    font-size: var(--text-7xl);
  }
}

.c-hero__subtitle {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-8);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: var(--leading-relaxed);
}

@media (min-width: 768px) {
  .c-hero__subtitle {
    font-size: var(--text-xl);
  }
}

.c-hero__actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  align-items: center;
}

@media (min-width: 640px) {
  .c-hero__actions {
    flex-direction: row;
    justify-content: center;
  }
}

.c-hero__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
  margin-top: var(--space-16);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border);
}

.c-hero__stat {
  text-align: center;
}

.c-hero__stat-value {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-primary);
  display: block;
}

.c-hero__stat-label {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-top: var(--space-1);
}
```

**Datei: `css/components/_c-project-card.css`**
```css
/* ============================================
   COMPONENT - PROJECT CARD
   Projekt-Auswahl-Karten
   ============================================ */

.c-project-card {
  position: relative;
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  cursor: pointer;
}

.c-project-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-border-hover);
}

.c-project-card--selected {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-glow);
}

.c-project-card__image {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.c-project-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.c-project-card:hover .c-project-card__image img {
  transform: scale(1.05);
}

.c-project-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--color-bg-elevated) 0%, transparent 60%);
}

.c-project-card__badge {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  padding: var(--space-1) var(--space-3);
  background-color: var(--color-primary-transparent);
  border: 1px solid var(--color-border-active);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
}

.c-project-card__content {
  padding: var(--space-6);
}

.c-project-card__title {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-2);
  color: var(--color-text-primary);
}

.c-project-card__description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-4);
}

.c-project-card__meta {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.c-project-card__meta-item {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.c-project-card__meta-icon {
  width: 16px;
  height: 16px;
}

.c-project-card__agents {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.c-project-card__agent-dot {
  width: 24px;
  height: 24px;
  border-radius: var(--radius-full);
  background-size: cover;
  background-position: center;
  border: 2px solid var(--color-border);
  transition: border-color 0.2s ease;
}

.c-project-card:hover .c-project-card__agent-dot {
  border-color: var(--color-primary);
}
```

**Datei: `css/components/_c-agent-card.css`**
```css
/* ============================================
   COMPONENT - AGENT CARD
   Agent-Swarm Einzelkarten
   ============================================ */

.c-agent-card {
  position: relative;
  background-color: var(--color-bg-elevated);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  transition: all 0.3s ease;
  cursor: pointer;
}

.c-agent-card:hover {
  border-color: var(--color-border-hover);
  transform: translateY(-2px);
}

.c-agent-card--active {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-glow);
}

.c-agent-card--creative.c-agent-card--active {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-glow);
}

.c-agent-card--code.c-agent-card--active {
  border-color: var(--color-secondary);
  box-shadow: var(--shadow-glow-secondary);
}

.c-agent-card--visual.c-agent-card--active {
  border-color: var(--color-accent);
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
}

.c-agent-card--story.c-agent-card--active {
  border-color: #f59e0b;
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
}

.c-agent-card--critic.c-agent-card--active {
  border-color: var(--color-success);
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
}

.c-agent-card__header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.c-agent-card__avatar {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-lg);
  object-fit: cover;
  border: 2px solid var(--color-border);
}

.c-agent-card--active .c-agent-card__avatar {
  border-color: var(--color-primary);
}

.c-agent-card__info {
  flex: 1;
}

.c-agent-card__name {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.c-agent-card__role {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--color-text-muted);
}

.c-agent-card__status {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.c-agent-card__status-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background-color: var(--color-text-muted);
}

.c-agent-card--active .c-agent-card__status-dot {
  background-color: var(--color-success);
  animation: pulse 2s infinite;
}

.c-agent-card__description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-4);
}

.c-agent-card__prompt-area {
  display: none;
}

.c-agent-card--active .c-agent-card__prompt-area {
  display: block;
}

.c-agent-card__prompt-label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--color-text-muted);
  margin-bottom: var(--space-2);
}

.c-agent-card__prompt-input {
  width: 100%;
  min-height: 100px;
  padding: var(--space-3);
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-text-primary);
  font-size: var(--text-sm);
  font-family: var(--font-mono);
  resize: vertical;
  margin-bottom: var(--space-3);
}

.c-agent-card__prompt-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-transparent);
}

.c-agent-card__actions {
  display: flex;
  gap: var(--space-3);
}

.c-agent-card__btn {
  flex: 1;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  transition: all 0.2s ease;
}

.c-agent-card__btn--primary {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.c-agent-card__btn--primary:hover {
  background-color: var(--color-primary-light);
}

.c-agent-card__btn--secondary {
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
}

.c-agent-card__btn--secondary:hover {
  border-color: var(--color-border-hover);
  color: var(--color-text-primary);
}
```


**Datei: `css/components/_c-swarm-panel.css`**
```css
/* ============================================
   COMPONENT - SWARM PANEL
   Agent-Swarm Haupt-Interface
   ============================================ */

.c-swarm-panel {
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
}

.c-swarm-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-8);
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--color-border);
}

.c-swarm-panel__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
}

.c-swarm-panel__status {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background-color: var(--color-primary-transparent);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-primary);
}

.c-swarm-panel__status-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
  animation: pulse 2s infinite;
}

.c-swarm-panel__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 768px) {
  .c-swarm-panel__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .c-swarm-panel__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .c-swarm-panel__grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

.c-swarm-panel__chat {
  margin-top: var(--space-8);
  padding: var(--space-6);
  background-color: var(--color-bg-elevated);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
}

.c-swarm-panel__chat-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: var(--color-text-muted);
  text-align: center;
}

.c-swarm-panel__chat-empty-icon {
  width: 48px;
  height: 48px;
  margin-bottom: var(--space-4);
  opacity: 0.5;
}

.c-swarm-panel__chat-message {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-4);
  margin-bottom: var(--space-4);
  background-color: var(--color-bg-surface);
  border-radius: var(--radius-lg);
  border-left: 3px solid var(--color-primary);
}

.c-swarm-panel__chat-message--agent-code {
  border-left-color: var(--color-secondary);
}

.c-swarm-panel__chat-message--agent-visual {
  border-left-color: var(--color-accent);
}

.c-swarm-panel__chat-message--agent-story {
  border-left-color: #f59e0b;
}

.c-swarm-panel__chat-message--agent-critic {
  border-left-color: var(--color-success);
}

.c-swarm-panel__chat-avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  object-fit: cover;
  flex-shrink: 0;
}

.c-swarm-panel__chat-content {
  flex: 1;
}

.c-swarm-panel__chat-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.c-swarm-panel__chat-name {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
}

.c-swarm-panel__chat-time {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.c-swarm-panel__chat-text {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}
```

**Datei: `css/components/_c-asset-library.css`**
```css
/* ============================================
   COMPONENT - ASSET LIBRARY
   Prompt-Template-Bibliothek
   ============================================ */

.c-asset-library {
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
}

.c-asset-library__header {
  margin-bottom: var(--space-8);
}

.c-asset-library__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.c-asset-library__subtitle {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
}

.c-asset-library__filters {
  display: flex;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
  flex-wrap: wrap;
}

.c-asset-library__filter-btn {
  padding: var(--space-2) var(--space-4);
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
}

.c-asset-library__filter-btn:hover {
  border-color: var(--color-border-hover);
  color: var(--color-text-primary);
}

.c-asset-library__filter-btn--active {
  background-color: var(--color-primary-transparent);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.c-asset-library__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

@media (min-width: 640px) {
  .c-asset-library__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .c-asset-library__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.c-asset-card {
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  transition: all 0.2s ease;
}

.c-asset-card:hover {
  border-color: var(--color-border-hover);
  transform: translateY(-2px);
}

.c-asset-card__category {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--color-primary);
  margin-bottom: var(--space-3);
}

.c-asset-card__title {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.c-asset-card__description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-4);
  line-height: var(--leading-relaxed);
}

.c-asset-card__prompt {
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-4);
  position: relative;
  overflow: hidden;
}

.c-asset-card__prompt::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: var(--color-primary);
}

.c-asset-card__actions {
  display: flex;
  gap: var(--space-3);
}

.c-asset-card__btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  transition: all 0.2s ease;
}

.c-asset-card__btn--copy {
  background-color: var(--color-primary-transparent);
  border: 1px solid var(--color-border-active);
  color: var(--color-primary);
}

.c-asset-card__btn--copy:hover {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.c-asset-card__btn--use {
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
}

.c-asset-card__btn--use:hover {
  border-color: var(--color-border-hover);
  color: var(--color-text-primary);
}

.c-asset-card__btn-icon {
  width: 16px;
  height: 16px;
}
```

**Datei: `css/components/_c-iterations-log.css`**
```css
/* ============================================
   COMPONENT - ITERATIONS LOG
   Iterations-Tracker für Prompt-Refinement
   ============================================ */

.c-iterations-log {
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
}

.c-iterations-log__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-8);
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--color-border);
}

.c-iterations-log__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
}

.c-iterations-log__count {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background-color: var(--color-primary-transparent);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-primary);
}

.c-iterations-log__timeline {
  position: relative;
  padding-left: var(--space-8);
}

.c-iterations-log__timeline::before {
  content: '';
  position: absolute;
  left: var(--space-4);
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: var(--color-border);
}

.c-iterations-log__item {
  position: relative;
  padding-bottom: var(--space-8);
}

.c-iterations-log__item:last-child {
  padding-bottom: 0;
}

.c-iterations-log__item-marker {
  position: absolute;
  left: calc(var(--space-4) * -1 + 1px);
  top: var(--space-2);
  width: 12px;
  height: 12px;
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
  border: 2px solid var(--color-bg-surface);
  box-shadow: 0 0 0 2px var(--color-primary);
}

.c-iterations-log__item-content {
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
}

.c-iterations-log__item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}

.c-iterations-log__item-number {
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--color-primary);
}

.c-iterations-log__item-time {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.c-iterations-log__item-prompt {
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-4);
  position: relative;
  overflow: hidden;
}

.c-iterations-log__item-prompt::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: var(--color-primary);
}

.c-iterations-log__item-result {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-4);
}

.c-iterations-log__item-improvement {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3);
  background-color: var(--color-primary-transparent);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.c-iterations-log__item-improvement-icon {
  width: 20px;
  height: 20px;
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 2px;
}

.c-iterations-log__add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-4);
  background-color: var(--color-bg-elevated);
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-text-muted);
  transition: all 0.2s ease;
}

.c-iterations-log__add-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background-color: var(--color-primary-transparent);
}

.c-iterations-log__add-btn-icon {
  width: 20px;
  height: 20px;
}
```

**Datei: `css/components/_c-showcase-wall.css`**
```css
/* ============================================
   COMPONENT - SHOWCASE WALL
   Projekt-Showcase für Präsentationen
   ============================================ */

.c-showcase-wall {
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
}

.c-showcase-wall__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-8);
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--color-border);
}

.c-showcase-wall__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
}

.c-showcase-wall__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 640px) {
  .c-showcase-wall__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .c-showcase-wall__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.c-showcase-card {
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all 0.3s ease;
}

.c-showcase-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-border-hover);
}

.c-showcase-card__image {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.c-showcase-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.c-showcase-card:hover .c-showcase-card__image img {
  transform: scale(1.05);
}

.c-showcase-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--color-bg-elevated) 0%, transparent 60%);
}

.c-showcase-card__badge {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  padding: var(--space-1) var(--space-3);
  background-color: var(--color-primary-transparent);
  border: 1px solid var(--color-border-active);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
}

.c-showcase-card__content {
  padding: var(--space-6);
}

.c-showcase-card__title {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.c-showcase-card__team {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-4);
}

.c-showcase-card__meta {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.c-showcase-card__meta-item {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.c-showcase-card__meta-icon {
  width: 16px;
  height: 16px;
}

.c-showcase-card__actions {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--color-border);
}

.c-showcase-card__btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  transition: all 0.2s ease;
}

.c-showcase-card__btn--view {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.c-showcase-card__btn--view:hover {
  background-color: var(--color-primary-light);
}

.c-showcase-card__btn--download {
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
}

.c-showcase-card__btn--download:hover {
  border-color: var(--color-border-hover);
  color: var(--color-text-primary);
}
```


**Datei: `css/components/_c-peer-review.css`**
```css
/* ============================================
   COMPONENT - PEER REVIEW
   Bewertungs-System für Gruppen-Projekte
   ============================================ */

.c-peer-review {
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
}

.c-peer-review__header {
  margin-bottom: var(--space-8);
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--color-border);
}

.c-peer-review__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.c-peer-review__subtitle {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
}

.c-peer-review__criteria {
  display: grid;
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.c-peer-review__criterion {
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.c-peer-review__criterion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}

.c-peer-review__criterion-name {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
}

.c-peer-review__criterion-weight {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--color-text-muted);
  padding: var(--space-1) var(--space-3);
  background-color: var(--color-bg-surface);
  border-radius: var(--radius-full);
}

.c-peer-review__criterion-description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-4);
  line-height: var(--leading-relaxed);
}

.c-peer-review__rating {
  display: flex;
  gap: var(--space-2);
}

.c-peer-review__rating-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  transition: all 0.2s ease;
}

.c-peer-review__rating-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.c-peer-review__rating-btn--selected {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.c-peer-review__rating-btn--selected:hover {
  background-color: var(--color-primary-light);
}

.c-peer-review__comment {
  margin-top: var(--space-4);
}

.c-peer-review__comment-label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--color-text-muted);
  margin-bottom: var(--space-2);
}

.c-peer-review__comment-input {
  width: 100%;
  min-height: 80px;
  padding: var(--space-3);
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  font-size: var(--text-sm);
  resize: vertical;
}

.c-peer-review__comment-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-transparent);
}

.c-peer-review__submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-4) var(--space-8);
  background-color: var(--color-primary);
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  color: var(--color-text-inverse);
  transition: all 0.2s ease;
  cursor: pointer;
}

.c-peer-review__submit:hover {
  background-color: var(--color-primary-light);
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

.c-peer-review__submit-icon {
  width: 20px;
  height: 20px;
}

.c-peer-review__results {
  margin-top: var(--space-8);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border);
}

.c-peer-review__results-title {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-6);
}

.c-peer-review__result-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) 0;
  border-bottom: 1px solid var(--color-border);
}

.c-peer-review__result-item:last-child {
  border-bottom: none;
}

.c-peer-review__result-name {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text-secondary);
}

.c-peer-review__result-score {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.c-peer-review__result-value {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--color-primary);
}

.c-peer-review__result-max {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.c-peer-review__total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-6);
  background-color: var(--color-primary-transparent);
  border: 1px solid var(--color-border-active);
  border-radius: var(--radius-lg);
  margin-top: var(--space-6);
}

.c-peer-review__total-label {
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
}

.c-peer-review__total-value {
  font-size: var(--text-2xl);
  font-weight: var(--font-extrabold);
  color: var(--color-primary);
}
```

**Datei: `css/components/_c-theme-toggle.css`**
```css
/* ============================================
   COMPONENT - THEME TOGGLE
   Dark/Light-Mode Umschalter
   ============================================ */

.c-theme-toggle {
  position: relative;
  width: 48px;
  height: 28px;
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.c-theme-toggle:hover {
  border-color: var(--color-border-hover);
}

.c-theme-toggle__track {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-2);
}

.c-theme-toggle__icon {
  width: 14px;
  height: 14px;
  color: var(--color-text-muted);
  transition: color 0.3s ease;
}

.c-theme-toggle__icon--sun {
  color: #f59e0b;
}

.c-theme-toggle__icon--moon {
  color: #6366f1;
}

.c-theme-toggle__thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  background-color: var(--color-text-primary);
  border-radius: var(--radius-full);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-sm);
}

.c-theme-toggle.is-light .c-theme-toggle__thumb {
  transform: translateX(20px);
}

.c-theme-toggle.is-light {
  background-color: var(--color-bg-elevated);
}

.c-theme-toggle__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

**Datei: `css/components/_c-modal.css`**
```css
/* ============================================
   COMPONENT - MODAL
   Accessible Modal-System
   ============================================ */

.c-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.c-modal-overlay.is-open {
  opacity: 1;
  visibility: visible;
}

.c-modal {
  position: relative;
  width: 100%;
  max-width: 640px;
  max-height: 90vh;
  overflow-y: auto;
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
  transform: scale(0.95) translateY(20px);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.c-modal-overlay.is-open .c-modal {
  transform: scale(1) translateY(0);
}

.c-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-6) var(--space-8);
  border-bottom: 1px solid var(--color-border);
}

.c-modal__title {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
}

.c-modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  transition: all 0.2s ease;
}

.c-modal__close:hover {
  background-color: var(--color-bg-elevated);
  color: var(--color-text-primary);
}

.c-modal__close-icon {
  width: 20px;
  height: 20px;
}

.c-modal__body {
  padding: var(--space-8);
}

.c-modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-4);
  padding: var(--space-6) var(--space-8);
  border-top: 1px solid var(--color-border);
}

.c-modal__btn {
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  transition: all 0.2s ease;
}

.c-modal__btn--primary {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.c-modal__btn--primary:hover {
  background-color: var(--color-primary-light);
}

.c-modal__btn--secondary {
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
}

.c-modal__btn--secondary:hover {
  border-color: var(--color-border-hover);
  color: var(--color-text-primary);
}
```

**Datei: `css/components/_c-timeline.css`**
```css
/* ============================================
   COMPONENT - TIMELINE
   Workshop-Timeline mit Countdown
   ============================================ */

.c-timeline {
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
}

.c-timeline__header {
  margin-bottom: var(--space-8);
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--color-border);
}

.c-timeline__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.c-timeline__subtitle {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
}

.c-timeline__countdown {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
  margin-bottom: var(--space-8);
  padding: var(--space-6);
  background-color: var(--color-bg-elevated);
  border-radius: var(--radius-xl);
}

.c-timeline__countdown-item {
  text-align: center;
}

.c-timeline__countdown-value {
  font-size: var(--text-3xl);
  font-weight: var(--font-extrabold);
  color: var(--color-primary);
  line-height: 1;
}

@media (min-width: 768px) {
  .c-timeline__countdown-value {
    font-size: var(--text-4xl);
  }
}

.c-timeline__countdown-label {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--color-text-muted);
  margin-top: var(--space-2);
}

.c-timeline__items {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.c-timeline__item {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-5);
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all 0.2s ease;
}

.c-timeline__item:hover {
  border-color: var(--color-border-hover);
}

.c-timeline__item--active {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-glow);
}

.c-timeline__item--completed {
  opacity: 0.6;
}

.c-timeline__item-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  padding: var(--space-2);
  background-color: var(--color-bg-surface);
  border-radius: var(--radius-md);
}

.c-timeline__item-time-start {
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
}

.c-timeline__item-time-end {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.c-timeline__item-content {
  flex: 1;
}

.c-timeline__item-title {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.c-timeline__item-description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.c-timeline__item-status {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-3);
}

.c-timeline__item-status-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background-color: var(--color-text-muted);
}

.c-timeline__item--active .c-timeline__item-status-dot {
  background-color: var(--color-primary);
  animation: pulse 2s infinite;
}

.c-timeline__item--completed .c-timeline__item-status-dot {
  background-color: var(--color-success);
}

.c-timeline__item-status-text {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--color-text-muted);
}

.c-timeline__item--active .c-timeline__item-status-text {
  color: var(--color-primary);
}

.c-timeline__item--completed .c-timeline__item-status-text {
  color: var(--color-success);
}
```

**Datei: `css/components/_c-export-panel.css`**
```css
/* ============================================
   COMPONENT - EXPORT PANEL
   Export/Download-Panel für Projekte
   ============================================ */

.c-export-panel {
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
}

.c-export-panel__header {
  margin-bottom: var(--space-8);
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--color-border);
}

.c-export-panel__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.c-export-panel__subtitle {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
}

.c-export-panel__options {
  display: grid;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.c-export-panel__option {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-5);
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all 0.2s ease;
  cursor: pointer;
}

.c-export-panel__option:hover {
  border-color: var(--color-border-hover);
}

.c-export-panel__option--selected {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-glow);
}

.c-export-panel__option-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary-transparent);
  border-radius: var(--radius-md);
  color: var(--color-primary);
}

.c-export-panel__option-icon svg {
  width: 20px;
  height: 20px;
}

.c-export-panel__option-content {
  flex: 1;
}

.c-export-panel__option-title {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.c-export-panel__option-description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.c-export-panel__option-check {
  width: 24px;
  height: 24px;
  border-radius: var(--radius-full);
  border: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.c-export-panel__option--selected .c-export-panel__option-check {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.c-export-panel__option-check svg {
  width: 14px;
  height: 14px;
  opacity: 0;
}

.c-export-panel__option--selected .c-export-panel__option-check svg {
  opacity: 1;
}

.c-export-panel__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-4) var(--space-8);
  background-color: var(--color-primary);
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  color: var(--color-text-inverse);
  transition: all 0.2s ease;
  cursor: pointer;
}

.c-export-panel__btn:hover {
  background-color: var(--color-primary-light);
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

.c-export-panel__btn-icon {
  width: 20px;
  height: 20px;
}

.c-export-panel__progress {
  margin-top: var(--space-6);
  padding: var(--space-6);
  background-color: var(--color-bg-elevated);
  border-radius: var(--radius-lg);
  display: none;
}

.c-export-panel__progress.is-visible {
  display: block;
}

.c-export-panel__progress-bar {
  width: 100%;
  height: 8px;
  background-color: var(--color-bg-surface);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: var(--space-3);
}

.c-export-panel__progress-fill {
  height: 100%;
  background-color: var(--color-primary);
  border-radius: var(--radius-full);
  transition: width 0.3s ease;
}

.c-export-panel__progress-text {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  text-align: center;
}
```

### 4.7 CSS Layer: Utilities

**Datei: `css/utilities/_helpers.css`**
```css
/* ============================================
   UTILITIES - HELPERS
   Hilfs-Klassen für schnelle Anpassungen
   ============================================ */

/* Text Alignment */
.u-text-left { text-align: left; }
.u-text-center { text-align: center; }
.u-text-right { text-align: right; }

/* Display */
.u-block { display: block; }
.u-inline { display: inline; }
.u-inline-block { display: inline-block; }
.u-flex { display: flex; }
.u-grid { display: grid; }
.u-hidden { display: none; }

/* Visibility */
.u-visible { visibility: visible; }
.u-invisible { visibility: hidden; }

/* Spacing */
.u-mt-0 { margin-top: 0; }
.u-mt-4 { margin-top: var(--space-4); }
.u-mt-8 { margin-top: var(--space-8); }
.u-mt-16 { margin-top: var(--space-16); }

.u-mb-0 { margin-bottom: 0; }
.u-mb-4 { margin-bottom: var(--space-4); }
.u-mb-8 { margin-bottom: var(--space-8); }
.u-mb-16 { margin-bottom: var(--space-16); }

/* Width */
.u-w-full { width: 100%; }
.u-w-auto { width: auto; }

/* Height */
.u-h-full { height: 100%; }
.u-h-auto { height: auto; }

/* Overflow */
.u-overflow-hidden { overflow: hidden; }
.u-overflow-auto { overflow: auto; }
.u-overflow-scroll { overflow: scroll; }

/* Position */
.u-relative { position: relative; }
.u-absolute { position: absolute; }
.u-fixed { position: fixed; }
.u-sticky { position: sticky; }

/* Z-Index */
.u-z-0 { z-index: 0; }
.u-z-10 { z-index: 10; }
.u-z-50 { z-index: 50; }
.u-z-100 { z-index: 100; }

/* Cursor */
.u-cursor-pointer { cursor: pointer; }
.u-cursor-default { cursor: default; }

/* Pointer Events */
.u-pointer-events-none { pointer-events: none; }
.u-pointer-events-auto { pointer-events: auto; }

/* User Select */
.u-select-none { user-select: none; }
.u-select-all { user-select: all; }

/* Screen Reader Only */
.u-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### 4.8 CSS Hauptdatei

**Datei: `css/main.css`**
```css
/* ============================================
   KI-CREATIVE LAB HUB - MAIN CSS
   ITCSS + BEM Architecture
   ============================================ */

/* Settings - Design-Tokens */
@import url('settings/_colors.css');
@import url('settings/_typography.css');
@import url('settings/_breakpoints.css');

/* Tools - Mixins & Funktionen */
@import url('tools/_mixins.css');

/* Generic - Reset & Normalize */
@import url('generic/_reset.css');
@import url('generic/_box-sizing.css');

/* Elements - Basis-Elemente */
@import url('elements/_headings.css');
@import url('elements/_links.css');
@import url('elements/_forms.css');

/* Objects - Layout-Patterns */
@import url('objects/_layout.css');
@import url('objects/_grid.css');
@import url('objects/_media.css');

/* Components - UI-Blöcke */
@import url('components/_c-nav.css');
@import url('components/_c-hero.css');
@import url('components/_c-project-card.css');
@import url('components/_c-agent-card.css');
@import url('components/_c-swarm-panel.css');
@import url('components/_c-asset-library.css');
@import url('components/_c-iterations-log.css');
@import url('components/_c-showcase-wall.css');
@import url('components/_c-peer-review.css');
@import url('components/_c-theme-toggle.css');
@import url('components/_c-modal.css');
@import url('components/_c-timeline.css');
@import url('components/_c-export-panel.css');

/* Utilities - Hilfs-Klassen */
@import url('utilities/_helpers.css');
```

---

## 5. JAVASCRIPT MODULE

### 5.1 Theme Manager

**Datei: `js/modules/theme-manager.js`**
```javascript
/**
 * Theme Manager
 * Dark/Light-Mode Toggle mit LocalStorage-Persistenz
 */

class ThemeManager {
  constructor() {
    this.storageKey = 'ki-creative-lab-theme';
    this.themeToggle = document.querySelector('[data-theme-toggle]');
    this.htmlElement = document.documentElement;

    this.init();
  }

  init() {
    this.loadTheme();
    this.bindEvents();
  }

  loadTheme() {
    const savedTheme = localStorage.getItem(this.storageKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      this.setTheme(savedTheme);
    } else if (prefersDark) {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }

  setTheme(theme) {
    this.htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.storageKey, theme);

    if (this.themeToggle) {
      this.themeToggle.classList.toggle('is-light', theme === 'light');
      this.themeToggle.setAttribute('aria-label', 
        theme === 'dark' ? 'Zum Light-Mode wechseln' : 'Zum Dark-Mode wechseln'
      );
    }

    this.dispatchThemeChange(theme);
  }

  toggleTheme() {
    const currentTheme = this.htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  bindEvents() {
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());

      this.themeToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleTheme();
        }
      });
    }
  }

  dispatchThemeChange(theme) {
    window.dispatchEvent(new CustomEvent('themechange', { 
      detail: { theme } 
    }));
  }

  getCurrentTheme() {
    return this.htmlElement.getAttribute('data-theme');
  }
}

export default ThemeManager;
```

### 5.2 Project Selector

**Datei: `js/modules/project-selector.js`**
```javascript
/**
 * Project Selector
 * Projekt-Auswahl und State-Management
 */

class ProjectSelector {
  constructor() {
    this.storageKey = 'ki-creative-lab-project';
    this.container = document.querySelector('[data-project-grid]');
    this.selectedProject = null;
    this.projects = [];

    this.init();
  }

  async init() {
    await this.loadProjects();
    this.renderProjects();
    this.loadSelectedProject();
    this.bindEvents();
  }

  async loadProjects() {
    try {
      const response = await fetch('data/project-briefings.json');
      this.projects = await response.json();
    } catch (error) {
      console.error('Fehler beim Laden der Projekte:', error);
      this.projects = this.getFallbackProjects();
    }
  }

  getFallbackProjects() {
    return [
      {
        id: 'tourism-2-0',
        title: 'Tourismus 2.0: Hidden Gems',
        description: 'Entdecke und präsentiere versteckte Schätze aus verschiedenen Kulturen mit KI-gestützter Storytelling.',
        category: 'Reisen',
        duration: '4h',
        teamSize: 5,
        agents: ['creative', 'story', 'visual', 'code', 'critic'],
        image: 'assets/images/projects/tourism-2-0.jpg'
      },
      {
        id: 'smart-classroom',
        title: 'Futuristisches Smart Classroom',
        description: 'Designe das Klassenzimmer der Zukunft mit Fokus auf multikulturelles Lernen und KI-Integration.',
        category: 'Design',
        duration: '4h',
        teamSize: 5,
        agents: ['creative', 'visual', 'code', 'story', 'critic'],
        image: 'assets/images/projects/smart-classroom.jpg'
      },
      {
        id: 'game-platform',
        title: 'Indie Game Studio Launch',
        description: 'Entwickle ein Konzept für eine Indie-Game-Plattform mit kulturellen Spielwelten und Storylines.',
        category: 'Gaming',
        duration: '4h',
        teamSize: 5,
        agents: ['creative', 'story', 'code', 'visual', 'critic'],
        image: 'assets/images/projects/game-platform.jpg'
      },
      {
        id: 'streetwear',
        title: 'Streetwear Brand Generator',
        description: 'Kreiere eine Streetwear-Marke mit kultureller Fusion, Brand-Identity und Social-Media-Strategie.',
        category: 'Mode',
        duration: '4h',
        teamSize: 5,
        agents: ['creative', 'visual', 'story', 'code', 'critic'],
        image: 'assets/images/projects/streetwear.jpg'
      },
      {
        id: 'music-ai',
        title: 'Music & AI: Producer Assistant',
        description: 'Nutze KI für Songwriting, Album-Cover-Design und Marketing-Planung für eine Musik-Karriere.',
        category: 'Musik',
        duration: '4h',
        teamSize: 5,
        agents: ['creative', 'story', 'visual', 'code', 'critic'],
        image: 'assets/images/projects/music-ai.jpg'
      },
      {
        id: 'cyberpunk-city',
        title: 'Cyberpunk City Builder',
        description: 'Baue eine futuristische Stadt mit kulturellen Bezirken, Factions und immersiver Weltgeschichte.',
        category: 'Sci-Fi',
        duration: '4h',
        teamSize: 5,
        agents: ['creative', 'story', 'visual', 'code', 'critic'],
        image: 'assets/images/projects/cyberpunk-city.jpg'
      },
      {
        id: 'food-fusion',
        title: 'Food Fusion Lab',
        description: 'Erstelle Fusion-Rezepte, Food-Blog-Content und Restaurant-Konzepte mit kultureller Vielfalt.',
        category: 'Essen',
        duration: '4h',
        teamSize: 5,
        agents: ['creative', 'story', 'visual', 'code', 'critic'],
        image: 'assets/images/projects/food-fusion.jpg'
      },
      {
        id: 'esports',
        title: 'Esports Tournament Platform',
        description: 'Entwickle eine Plattform für Esports-Turniere mit internationalen Teams und Community-Features.',
        category: 'Gaming',
        duration: '4h',
        teamSize: 5,
        agents: ['creative', 'code', 'story', 'visual', 'critic'],
        image: 'assets/images/projects/esports.jpg'
      },
      {
        id: 'mythology',
        title: 'AI Mythology Reimagined',
        description: 'Modernisiere antike Mythen deiner Kultur mit KI-gestütztem Storytelling und Visual Design.',
        category: 'Storytelling',
        duration: '4h',
        teamSize: 5,
        agents: ['story', 'creative', 'visual', 'code', 'critic'],
        image: 'assets/images/projects/mythology.jpg'
      }
    ];
  }

  renderProjects() {
    if (!this.container) return;

    const fragment = document.createDocumentFragment();

    this.projects.forEach(project => {
      const card = this.createProjectCard(project);
      fragment.appendChild(card);
    });

    this.container.appendChild(fragment);
  }

  createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'c-project-card';
    card.setAttribute('data-project-id', project.id);
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Projekt auswählen: ${project.title}`);

    card.innerHTML = `
      <div class="c-project-card__image">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
        <div class="c-project-card__overlay"></div>
        <span class="c-project-card__badge">${project.category}</span>
      </div>
      <div class="c-project-card__content">
        <h3 class="c-project-card__title">${project.title}</h3>
        <p class="c-project-card__description">${project.description}</p>
        <div class="c-project-card__meta">
          <span class="c-project-card__meta-item">
            <svg class="c-project-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            ${project.duration}
          </span>
          <span class="c-project-card__meta-item">
            <svg class="c-project-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            ${project.teamSize} Personen
          </span>
        </div>
        <div class="c-project-card__agents">
          ${project.agents.map(agent => `
            <div class="c-project-card__agent-dot" 
                 style="background-image: url('assets/images/agents/${agent}.png')"
                 title="Agent: ${agent}"></div>
          `).join('')}
        </div>
      </div>
    `;

    return card;
  }

  selectProject(projectId) {
    const cards = this.container.querySelectorAll('.c-project-card');

    cards.forEach(card => {
      card.classList.remove('c-project-card--selected');
      if (card.getAttribute('data-project-id') === projectId) {
        card.classList.add('c-project-card--selected');
      }
    });

    this.selectedProject = this.projects.find(p => p.id === projectId);
    localStorage.setItem(this.storageKey, projectId);

    this.dispatchProjectSelect(projectId);
  }

  loadSelectedProject() {
    const savedProject = localStorage.getItem(this.storageKey);
    if (savedProject) {
      this.selectProject(savedProject);
    }
  }

  bindEvents() {
    if (!this.container) return;

    this.container.addEventListener('click', (e) => {
      const card = e.target.closest('.c-project-card');
      if (card) {
        const projectId = card.getAttribute('data-project-id');
        this.selectProject(projectId);
      }
    });

    this.container.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('.c-project-card');
        if (card) {
          e.preventDefault();
          const projectId = card.getAttribute('data-project-id');
          this.selectProject(projectId);
        }
      }
    });
  }

  dispatchProjectSelect(projectId) {
    window.dispatchEvent(new CustomEvent('projectselect', { 
      detail: { projectId, project: this.selectedProject } 
    }));
  }

  getSelectedProject() {
    return this.selectedProject;
  }
}

export default ProjectSelector;
```


### 5.3 Swarm Controller

**Datei: `js/modules/swarm-controller.js`**
```javascript
/**
 * Swarm Controller
 * Agent-Swarm Interaktion und simulierte Kollaboration
 */

class SwarmController {
  constructor() {
    this.agents = [
      {
        id: 'creative',
        name: 'Creative Lead',
        role: 'Vision & Ideation',
        description: 'Entwickelt kreative Konzepte, Brainstorming-Sessions und innovative Ideen für dein Projekt.',
        avatar: 'assets/images/agents/creative-lead.png',
        color: '#00d4ff',
        prompts: {
          default: 'Brainstorme 3 kreative Konzepte für {project}. Fokus auf Innovation und kulturelle Vielfalt.',
          tourism: 'Entdecke versteckte Reiseziele und authentische lokale Erlebnisse für {project}.',
          classroom: 'Designe ein futuristisches Klassenzimmer mit Fokus auf multikulturelles Lernen.',
          game: 'Entwickle eine einzigartige Spielwelt mit kultureller Tiefe und fesselnder Story.',
          streetwear: 'Kreiere eine Streetwear-Brand-Identity mit kultureller Fusion und Hype-Potenzial.',
          music: 'Schreibe Songtexte und entwickle ein Album-Konzept mit multikultureller Einflüssen.',
          cyberpunk: 'Baue eine dystopische Stadt mit kulturellen Bezirken und immersiver Lore.',
          food: 'Erstelle Fusion-Rezepte, die verschiedene Kulturen auf innovative Weise verbinden.',
          esports: 'Entwickle ein Turnier-Konzept mit internationalen Teams und Community-Features.',
          mythology: 'Modernisiere antike Mythen deiner Kultur für ein zeitgemäßes Publikum.'
        }
      },
      {
        id: 'code',
        name: 'Code Architect',
        role: 'Technische Umsetzung',
        description: 'Generiert HTML/CSS/JS-Code, entwickelt responsive Layouts und implementiert Interaktivität.',
        avatar: 'assets/images/agents/code-architect.png',
        color: '#ff6b9d',
        prompts: {
          default: 'Generiere HTML/CSS-Code für eine Landing-Page zu {project}. Mobile-first, responsive.',
          tourism: 'Erstelle eine interaktive Karten-Integration und Bildergalerie für Reiseziele.',
          classroom: 'Entwickle ein 3D-Klassenzimmer-Viewer mit interaktiven Elementen.',
          game: 'Baue ein Prototyp-Interface für die Game-Plattform mit Character-Selektion.',
          streetwear: 'Erstelle einen Online-Shop-Prototyp mit Produkt-Karussell und Checkout.',
          music: 'Entwickle einen Audio-Player mit Visualizer und Playlist-Management.',
          cyberpunk: 'Baue eine interaktive Stadt-Karte mit Bezirk-Details und Quest-System.',
          food: 'Erstelle ein Rezept-Interface mit Zutaten-Selektion und Koch-Timer.',
          esports: 'Entwickle ein Live-Bracket-System mit Team-Statistiken und Chat.',
          mythology: 'Baue eine interaktive Story-Map mit Character-Profilen und Timeline.'
        }
      },
      {
        id: 'visual',
        name: 'Visual Designer',
        role: 'Ästhetik & UX',
        description: 'Erstellt Moodboards, Farbkonzepte, Typografie-Systeme und visuelle Guidelines.',
        avatar: 'assets/images/agents/visual-designer.png',
        color: '#a855f7',
        prompts: {
          default: 'Erstelle ein Moodboard und Farbkonzept für {project}. Premium-Ästhetik.',
          tourism: 'Designe eine visuelle Identität für authentisches Reise-Erlebnis. Warme, einladende Farben.',
          classroom: 'Entwickle ein Design-System für ein futuristisches Lernumfeld. Biophil + Tech.',
          game: 'Kreiere Pixel-Art- und 3D-Style-Guides für die Spielwelt. Retro-futuristisch.',
          streetwear: 'Designe Bold-Graphics, Logo-Varianten und Social-Media-Templates. Urban + Edgy.',
          music: 'Entwickle Album-Cover-Konzepte, Merch-Designs und Stage-Visuals. Ästhetisch + Expressiv.',
          cyberpunk: 'Erstelle Neon-Style-Guides, HUD-Designs und Environmental-Concepts. Dark + Neon.',
          food: 'Designe Food-Fotografie-Styles, Menü-Layouts und Restaurant-Branding. Appetitanregend.',
          esports: 'Entwickle Tournament-Branding, Overlay-Designs und Team-Jersey-Konzepte. Dynamisch + Professionell.',
          mythology: 'Kreiere Character-Designs, Environment-Art und Symbol-Systeme. Episch + Zeitlos.'
        }
      },
      {
        id: 'story',
        name: 'Story Weaver',
        role: 'Content & Narrative',
        description: 'Schreibt Storylines, entwickelt Brand Voice und erstellt multilinguale Inhalte.',
        avatar: 'assets/images/agents/story-weaver.png',
        color: '#f59e0b',
        prompts: {
          default: 'Entwickle eine fesselnde Storyline und Brand Voice für {project}.',
          tourism: 'Schreibe Insider-Storys und Reiseberichte aus verschiedenen Kultur-Perspektiven.',
          classroom: 'Erstelle eine Narrative für einen Schultag im Jahr 2035. Persönlich + Visionär.',
          game: 'Entwickle Lore, Quest-Texte und Character-Dialoge für die Spielwelt. Tiefe + Emotion.',
          streetwear: 'Kreiere Brand-Story, Slogans und Social-Media-Captions. Authentisch + Hype.',
          music: 'Schreibe Songtexte in verschiedenen Sprachen und entwickle Album-Narrative. Poetisch + Rhythmus.',
          cyberpunk: 'Baue Weltgeschichte, Faction-Lore und NPC-Backstories auf. Dystopisch + Menschlich.',
          food: 'Erstelle Food-Storys, Rezept-Beschreibungen und Restaurant-Narrative. Sinnlich + Kulturell.',
          esports: 'Entwickle Team-Backstories, Kommentar-Scripts und Turnier-Narrative. Spannend + Dramatisch.',
          mythology: 'Modernisiere antike Mythen mit zeitgemäßen Themen und Charakteren. Respektvoll + Kreativ.'
        }
      },
      {
        id: 'critic',
        name: 'Critic/Editor',
        role: 'Qualität & Konsistenz',
        description: 'Reviewt Inhalte, gibt Feedback und stellt sicher, dass alles konsistent und qualitativ hochwertig ist.',
        avatar: 'assets/images/agents/critic-editor.png',
        color: '#22c55e',
        prompts: {
          default: 'Review das aktuelle Konzept für {project}. Identifiziere Stärken und Schwächen.',
          tourism: 'Prüfe Authentizität der Reise-Storys und kulturelle Sensibilität.',
          classroom: 'Evaluiere Realisierbarkeit des Klassenzimmer-Konzepts und pädagogischen Wert.',
          game: 'Teste Spielbalance, Story-Konsistenz und User-Experience des Prototyps.',
          streetwear: 'Review Brand-Konsistenz, Markenrelevanz und Social-Media-Strategie.',
          music: 'Analysiere Songtext-Qualität, Markenpositionierung und Marketing-Plan.',
          cyberpunk: 'Prüfe Weltbau-Konsistenz, Faction-Balance und Narrative-Kohärenz.',
          food: 'Evaluiere Rezept-Originalität, Food-Safety und Restaurant-Konzept-Realisierbarkeit.',
          esports: 'Review Turnier-Balance, Regelwerk-Klarheit und Community-Engagement-Strategie.',
          mythology: 'Prüfe kulturelle Sensibilität, mythologische Genauigkeit und zeitgemäße Relevanz.'
        }
      }
    ];

    this.activeAgent = null;
    this.container = document.querySelector('[data-swarm-panel]');
    this.chatContainer = document.querySelector('[data-swarm-chat]');
    this.selectedProject = null;

    this.init();
  }

  init() {
    this.renderAgents();
    this.bindEvents();
    this.loadState();
  }

  renderAgents() {
    if (!this.container) return;

    const grid = this.container.querySelector('.c-swarm-panel__grid') || this.container;
    grid.innerHTML = '';

    const fragment = document.createDocumentFragment();

    this.agents.forEach(agent => {
      const card = this.createAgentCard(agent);
      fragment.appendChild(card);
    });

    grid.appendChild(fragment);
  }

  createAgentCard(agent) {
    const card = document.createElement('div');
    card.className = `c-agent-card c-agent-card--${agent.id}`;
    card.setAttribute('data-agent-id', agent.id);
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Agent aktivieren: ${agent.name}`);

    card.innerHTML = `
      <div class="c-agent-card__header">
        <img class="c-agent-card__avatar" src="${agent.avatar}" alt="${agent.name}" loading="lazy">
        <div class="c-agent-card__info">
          <div class="c-agent-card__name">${agent.name}</div>
          <div class="c-agent-card__role">${agent.role}</div>
        </div>
        <div class="c-agent-card__status">
          <span class="c-agent-card__status-dot"></span>
          <span class="c-agent-card__status-text">Bereit</span>
        </div>
      </div>
      <p class="c-agent-card__description">${agent.description}</p>
      <div class="c-agent-card__prompt-area">
        <label class="c-agent-card__prompt-label">Prompt eingeben</label>
        <textarea class="c-agent-card__prompt-input" 
                  placeholder="Beschreibe deine Aufgabe für ${agent.name}..."
                  data-agent-prompt="${agent.id}"></textarea>
        <div class="c-agent-card__actions">
          <button class="c-agent-card__btn c-agent-card__btn--primary" data-agent-submit="${agent.id}">
            Ausführen
          </button>
          <button class="c-agent-card__btn c-agent-card__btn--secondary" data-agent-template="${agent.id}">
            Template laden
          </button>
        </div>
      </div>
    `;

    return card;
  }

  activateAgent(agentId) {
    const cards = this.container.querySelectorAll('.c-agent-card');

    cards.forEach(card => {
      card.classList.remove('c-agent-card--active');
      if (card.getAttribute('data-agent-id') === agentId) {
        card.classList.add('c-agent-card--active');
      }
    });

    this.activeAgent = this.agents.find(a => a.id === agentId);
    this.dispatchAgentActivate(agentId);
  }

  loadTemplate(agentId) {
    const agent = this.agents.find(a => a.id === agentId);
    if (!agent || !this.selectedProject) return;

    const projectType = this.selectedProject.id.split('-')[0];
    const template = agent.prompts[projectType] || agent.prompts.default;
    const prompt = template.replace('{project}', this.selectedProject.title);

    const input = this.container.querySelector(`[data-agent-prompt="${agentId}"]`);
    if (input) {
      input.value = prompt;
    }
  }

  submitPrompt(agentId) {
    const input = this.container.querySelector(`[data-agent-prompt="${agentId}"]`);
    if (!input || !input.value.trim()) return;

    const prompt = input.value.trim();
    const agent = this.agents.find(a => a.id === agentId);

    this.addChatMessage(agent, prompt, 'user');
    this.simulateAgentResponse(agent, prompt);

    input.value = '';
  }

  simulateAgentResponse(agent, userPrompt) {
    const responses = {
      creative: [
        'Hervorragende Idee! Ich habe 3 innovative Konzepte entwickelt, die kulturelle Elemente mit modernem Design verbinden.',
        'Interessanter Ansatz! Lass mich das weiterdenken und ein Moodboard mit Farbpalette erstellen.',
        'Das ist ein kreativer Durchbruch! Ich sehe Potential für eine einzigartige Positionierung im Markt.'
      ],
      code: [
        'Ich habe den HTML/CSS-Code generiert. Mobile-first, responsive und mit modernen CSS-Features.',
        'Der Prototyp ist fertig! Ich habe Interaktivität mit Vanilla JS implementiert.',
        'Code optimiert und validiert. Performance-Score: 98/100. Bereit für Deployment.'
      ],
      visual: [
        'Das Moodboard ist fertig! Ich habe eine kohärente Farbpalette mit kulturellen Akzenten entwickelt.',
        'Die visuelle Identität steht! Premium-Ästhetik mit klarem Design-System.',
        'Hier sind die finalen Assets: Logo-Varianten, Social-Media-Templates und Brand-Guidelines.'
      ],
      story: [
        'Die Storyline ist entwickelt! Ich habe eine narrative Struktur mit kultureller Tiefe geschaffen.',
        'Die Brand Voice ist definiert: Authentisch, jung und kulturell sensibel.',
        'Hier ist der Content-Plan: Multilinguale Texte, SEO-optimiert und social-media-ready.'
      ],
      critic: [
        'Review abgeschlossen! Stärken: Kreative Konzepte, kulturelle Authentizität. Schwächen: Technische Umsetzung könnte robuster sein.',
        'Qualitätsprüfung bestanden! Die Konsistenz ist hoch, kleine Anpassungen bei der Navigation empfohlen.',
        'Final Review: Projekt ist bereit für Präsentation. Alle Kriterien erfüllt.'
      ]
    };

    const agentResponses = responses[agent.id] || responses.creative;
    const randomResponse = agentResponses[Math.floor(Math.random() * agentResponses.length)];

    setTimeout(() => {
      this.addChatMessage(agent, randomResponse, 'agent');
    }, 1000 + Math.random() * 2000);
  }

  addChatMessage(agent, text, type) {
    if (!this.chatContainer) return;

    const emptyState = this.chatContainer.querySelector('.c-swarm-panel__chat-empty');
    if (emptyState) {
      emptyState.remove();
    }

    const message = document.createElement('div');
    message.className = `c-swarm-panel__chat-message c-swarm-panel__chat-message--agent-${agent.id}`;

    const time = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

    message.innerHTML = `
      <img class="c-swarm-panel__chat-avatar" src="${agent.avatar}" alt="${agent.name}" loading="lazy">
      <div class="c-swarm-panel__chat-content">
        <div class="c-swarm-panel__chat-header">
          <span class="c-swarm-panel__chat-name">${agent.name}</span>
          <span class="c-swarm-panel__chat-time">${time}</span>
        </div>
        <p class="c-swarm-panel__chat-text">${text}</p>
      </div>
    `;

    this.chatContainer.appendChild(message);
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;

    this.saveChatMessage(agent.id, text, time);
  }

  saveChatMessage(agentId, text, time) {
    const messages = JSON.parse(localStorage.getItem('ki-creative-lab-chat') || '[]');
    messages.push({ agentId, text, time, timestamp: Date.now() });
    localStorage.setItem('ki-creative-lab-chat', JSON.stringify(messages));
  }

  loadChatHistory() {
    const messages = JSON.parse(localStorage.getItem('ki-creative-lab-chat') || '[]');
    messages.forEach(msg => {
      const agent = this.agents.find(a => a.id === msg.agentId);
      if (agent) {
        this.addChatMessage(agent, msg.text, 'agent');
      }
    });
  }

  setProject(project) {
    this.selectedProject = project;
    this.renderAgents();
  }

  bindEvents() {
    if (!this.container) return;

    this.container.addEventListener('click', (e) => {
      const card = e.target.closest('.c-agent-card');
      if (card) {
        const agentId = card.getAttribute('data-agent-id');
        this.activateAgent(agentId);
      }

      const templateBtn = e.target.closest('[data-agent-template]');
      if (templateBtn) {
        const agentId = templateBtn.getAttribute('data-agent-template');
        this.loadTemplate(agentId);
      }

      const submitBtn = e.target.closest('[data-agent-submit]');
      if (submitBtn) {
        const agentId = submitBtn.getAttribute('data-agent-submit');
        this.submitPrompt(agentId);
      }
    });

    this.container.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('.c-agent-card');
        if (card) {
          e.preventDefault();
          const agentId = card.getAttribute('data-agent-id');
          this.activateAgent(agentId);
        }
      }
    });

    window.addEventListener('projectselect', (e) => {
      this.setProject(e.detail.project);
    });
  }

  loadState() {
    this.loadChatHistory();
  }

  dispatchAgentActivate(agentId) {
    window.dispatchEvent(new CustomEvent('agentactivate', { 
      detail: { agentId, agent: this.activeAgent } 
    }));
  }

  getActiveAgent() {
    return this.activeAgent;
  }
}

export default SwarmController;
```

### 5.4 Asset Manager

**Datei: `js/modules/asset-manager.js`**
```javascript
/**
 * Asset Manager
 * Prompt-Template-Bibliothek und Asset-Verwaltung
 */

class AssetManager {
  constructor() {
    this.templates = [
      {
        id: 'prompt-1',
        category: 'webdesign',
        title: 'Responsive Landing Page',
        description: 'Ein vollständiges Prompt-Template für die Erstellung einer responsiven Landing-Page mit modernem Design.',
        prompt: `Erstelle eine responsive Landing-Page mit folgenden Elementen:
- Hero-Section mit Hintergrundbild und Call-to-Action
- Features-Section mit 3 Spalten
- Testimonials-Section
- Newsletter-Signup-Formular
- Footer mit Social-Links

Anforderungen:
- Mobile-first Ansatz
- CSS Grid und Flexbox
- Interaktive Hover-Effekte
- Accessibility (ARIA-Labels)
- Performance-optimiert`
      },
      {
        id: 'prompt-2',
        category: 'webdesign',
        title: 'Navigation mit Dropdown',
        description: 'Prompt für eine responsive Navigation mit Dropdown-Menüs und Mobile-Hamburger-Menu.',
        prompt: `Erstelle eine responsive Navigation mit:
- Logo links
- Hauptmenü mit Dropdown-Untermenüs
- Hamburger-Menu für Mobile
- Smooth Scroll zu Sektionen
- Active-State-Highlighting

Technische Anforderungen:
- CSS-only Dropdown (kein JS nötig)
- Mobile-first Media Queries
- Accessibility (Keyboard-Navigation)
- Transition-Animationen`
      },
      {
        id: 'prompt-3',
        category: 'grafik',
        title: 'Moodboard-Generator',
        description: 'Prompt für die Erstellung eines visuellen Moodboards mit Farbpalette und Typografie.',
        prompt: `Erstelle ein visuelles Moodboard für [PROJEKTNAME] mit:
- Farbpalette (5 Hauptfarben + 3 Akzentfarben)
- Typografie-Paarung (Headline + Body)
- 3 Stimmungsbilder
- Textur-Beispiele
- Icon-Style-Guide

Stilrichtung: [MODERN/MINIMAL/RETRO/FUTURISTISCH]
Zielgruppe: [15-19 JÄHRIGE/MULTIKULTURELL]
Emotionen: [INNOVATIV/AUTENTISCH/SPIELERISCH]`
      },
      {
        id: 'prompt-4',
        category: 'grafik',
        title: 'Social Media Template',
        description: 'Prompt für Instagram/TikTok-Posts mit konsistentem Branding.',
        prompt: `Erstelle Social-Media-Templates für [PLATTFORM] mit:
- 3 Post-Formate (Square, Portrait, Story)
- Konsistente Farbpalette
- Typografie-System
- Platzhalter für Bilder
- Hashtag-Strategie

Brand-Elemente:
- Logo-Platzierung
- Farbcodes (Hex)
- Font-Namen
- Icon-Set
- Filter/Vibe`
      },
      {
        id: 'prompt-5',
        category: 'code',
        title: 'CSS Animation Library',
        description: 'Prompt für eine Sammlung wiederverwendbarer CSS-Animationen.',
        prompt: `Erstelle eine CSS-Animation-Library mit:
- Fade-In/Out (verschiedene Richtungen)
- Slide-In/Out
- Scale-In/Out
- Rotate-Animationen
- Stagger-Animationen (für Listen)
- Loading-Spinner
- Hover-Effekte

Anforderungen:
- CSS Custom Properties für Timing
- Performance-optimiert (transform, opacity)
- Accessibility (prefers-reduced-motion)
- Reusable Classes`
      },
      {
        id: 'prompt-6',
        category: 'code',
        title: 'Formular-Validierung',
        description: 'Prompt für ein validiertes Kontaktformular mit Fehlerbehandlung.',
        prompt: `Erstelle ein Kontaktformular mit:
- Name (required, min 2 Zeichen)
- Email (required, valid Format)
- Nachricht (required, min 10 Zeichen)
- Datenschutz-Checkbox (required)
- Submit-Button mit Loading-State

Features:
- Echtzeit-Validierung
- Fehlermeldungen unter Inputs
- Erfolgs-Meldung nach Submit
- Accessible (ARIA, Labels)
- CSS-Only Validierung wo möglich`
      },
      {
        id: 'prompt-7',
        category: 'content',
        title: 'SEO-Text-Generator',
        description: 'Prompt für SEO-optimierte Webseiten-Texte mit Keyword-Strategie.',
        prompt: `Schreibe SEO-optimierte Texte für [WEBSEITE] mit:
- Meta-Title (max 60 Zeichen)
- Meta-Description (max 160 Zeichen)
- H1-Überschrift
- 3 H2-Unterüberschriften
- 300 Wörter Fließtext
- Call-to-Action

Keywords: [KEYWORD1, KEYWORD2, KEYWORD3]
Zielgruppe: [15-19 JÄHRIGE]
Tonfall: [JUNG/AUTENTISCH/PROFESSIONELL]
Sprache: [DEUTSCH/ENGLISCH/MULTILINGUAL]`
      },
      {
        id: 'prompt-8',
        category: 'content',
        title: 'Brand Story Narrative',
        description: 'Prompt für die Entwicklung einer Markengeschichte mit emotionaler Tiefe.',
        prompt: `Entwickle eine Brand Story für [MARKENNAME] mit:
- Ursprungsgeschichte (Why)
- Mission Statement
- Vision Statement
- Werte (3-5 Kernwerte)
- Brand Personality
- Tone of Voice
- Tagline/Slogan

Kontext:
- Zielgruppe: [15-19 JÄHRIGE, MULTIKULTURELL]
- Branche: [MODE/TECH/MUSIK/FOOD]
- USP: [EINZIGARTIGER VERKAUFSARGUMENT]
- Emotionale Verbindung: [IDENTITÄT/GEMEINSCHAFT/ABENTEUER]`
      },
      {
        id: 'prompt-9',
        category: 'ki',
        title: 'Prompt-Engineering-Guide',
        description: 'Prompt für die Erstellung eines Prompt-Engineering-Guides.',
        prompt: `Erstelle einen Prompt-Engineering-Guide für Anfänger mit:
- 5 Grundprinzipien (Clarity, Context, Constraints, Examples, Iteration)
- 10 Beispiel-Prompts (vorher/nachher)
- Common Mistakes (Top 5)
- Advanced Techniques (Chain-of-Thought, Few-Shot, ReAct)
- Prompt-Template-Library (10 Templates)
- Evaluation-Checklist

Format: Markdown mit Code-Blocks
Zielgruppe: HTL-Schüler (15-19 Jahre)
Sprache: Deutsch`
      },
      {
        id: 'prompt-10',
        category: 'ki',
        title: 'KI-Workflow-Optimierung',
        description: 'Prompt für die Optimierung von KI-gestützten Arbeitsabläufen.',
        prompt: `Analysiere und optimiere folgenden KI-Workflow:
[AKTUELLER WORKFLOW BESCHREIBEN]

Optimierungsziele:
- Zeitersparnis (mindestens 30%)
- Qualitätssteigerung
- Konsistenz
- Skalierbarkeit

Deliverables:
- Optimierte Workflow-Map
- Tool-Empfehlungen
- Prompt-Templates
- Qualitäts-Checkpoints
- Automation-Möglichkeiten

Kontext: [WEBDESIGN/GRAFIK/CODING/CONTENT]`
      }
    ];

    this.categories = [
      { id: 'all', label: 'Alle' },
      { id: 'webdesign', label: 'Webdesign' },
      { id: 'grafik', label: 'Grafik' },
      { id: 'code', label: 'Code' },
      { id: 'content', label: 'Content' },
      { id: 'ki', label: 'KI-Tools' }
    ];

    this.container = document.querySelector('[data-asset-library]');
    this.activeFilter = 'all';

    this.init();
  }

  init() {
    this.renderFilters();
    this.renderTemplates();
    this.bindEvents();
  }

  renderFilters() {
    const filterContainer = this.container.querySelector('[data-asset-filters]');
    if (!filterContainer) return;

    filterContainer.innerHTML = '';

    this.categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `c-asset-library__filter-btn ${cat.id === this.activeFilter ? 'c-asset-library__filter-btn--active' : ''}`;
      btn.setAttribute('data-filter', cat.id);
      btn.textContent = cat.label;
      filterContainer.appendChild(btn);
    });
  }

  renderTemplates() {
    const grid = this.container.querySelector('[data-asset-grid]');
    if (!grid) return;

    grid.innerHTML = '';

    const filtered = this.activeFilter === 'all' 
      ? this.templates 
      : this.templates.filter(t => t.category === this.activeFilter);

    const fragment = document.createDocumentFragment();

    filtered.forEach(template => {
      const card = this.createTemplateCard(template);
      fragment.appendChild(card);
    });

    grid.appendChild(fragment);
  }

  createTemplateCard(template) {
    const card = document.createElement('div');
    card.className = 'c-asset-card';
    card.setAttribute('data-template-id', template.id);

    const category = this.categories.find(c => c.id === template.category);

    card.innerHTML = `
      <div class="c-asset-card__category">${category?.label || template.category}</div>
      <h3 class="c-asset-card__title">${template.title}</h3>
      <p class="c-asset-card__description">${template.description}</p>
      <div class="c-asset-card__prompt">
        <pre>${template.prompt}</pre>
      </div>
      <div class="c-asset-card__actions">
        <button class="c-asset-card__btn c-asset-card__btn--copy" data-copy-prompt="${template.id}">
          <svg class="c-asset-card__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          Kopieren
        </button>
        <button class="c-asset-card__btn c-asset-card__btn--use" data-use-prompt="${template.id}">
          <svg class="c-asset-card__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14"/>
            <path d="M12 5l7 7-7 7"/>
          </svg>
          Verwenden
        </button>
      </div>
    `;

    return card;
  }

  filterTemplates(category) {
    this.activeFilter = category;
    this.renderFilters();
    this.renderTemplates();
  }

  copyPrompt(templateId) {
    const template = this.templates.find(t => t.id === templateId);
    if (!template) return;

    navigator.clipboard.writeText(template.prompt).then(() => {
      this.showNotification('Prompt kopiert!', 'success');
    }).catch(() => {
      this.showNotification('Kopieren fehlgeschlagen', 'error');
    });
  }

  usePrompt(templateId) {
    const template = this.templates.find(t => t.id === templateId);
    if (!template) return;

    window.dispatchEvent(new CustomEvent('useprompt', { 
      detail: { template } 
    }));

    this.showNotification('Prompt geladen!', 'success');
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `c-notification c-notification--${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      z-index: 9999;
      animation: slideIn 0.3s ease;
      ${type === 'success' ? 'background: var(--color-success); color: white;' : ''}
      ${type === 'error' ? 'background: var(--color-error); color: white;' : ''}
      ${type === 'info' ? 'background: var(--color-info); color: white;' : ''}
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'fadeIn 0.3s ease reverse';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  bindEvents() {
    if (!this.container) return;

    this.container.addEventListener('click', (e) => {
      const filterBtn = e.target.closest('[data-filter]');
      if (filterBtn) {
        const filter = filterBtn.getAttribute('data-filter');
        this.filterTemplates(filter);
      }

      const copyBtn = e.target.closest('[data-copy-prompt]');
      if (copyBtn) {
        const templateId = copyBtn.getAttribute('data-copy-prompt');
        this.copyPrompt(templateId);
      }

      const useBtn = e.target.closest('[data-use-prompt]');
      if (useBtn) {
        const templateId = useBtn.getAttribute('data-use-prompt');
        this.usePrompt(templateId);
      }
    });
  }

  getTemplates() {
    return this.templates;
  }

  getTemplateById(id) {
    return this.templates.find(t => t.id === id);
  }
}

export default AssetManager;
```

### 5.5 Iteration Tracker

**Datei: `js/modules/iteration-tracker.js`**
```javascript
/**
 * Iteration Tracker
 * Log und Export der Prompt-Iterations
 */

class IterationTracker {
  constructor() {
    this.storageKey = 'ki-creative-lab-iterations';
    this.container = document.querySelector('[data-iterations-log]');
    this.iterations = [];

    this.init();
  }

  init() {
    this.loadIterations();
    this.renderIterations();
    this.bindEvents();
  }

  loadIterations() {
    try {
      this.iterations = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    } catch (e) {
      this.iterations = [];
    }
  }

  saveIterations() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.iterations));
  }

  addIteration(prompt, result, improvement) {
    const iteration = {
      id: Date.now(),
      number: this.iterations.length + 1,
      prompt,
      result,
      improvement,
      timestamp: new Date().toISOString(),
      time: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
    };

    this.iterations.push(iteration);
    this.saveIterations();
    this.renderIteration(iteration);

    this.dispatchIterationAdd(iteration);
  }

  renderIterations() {
    if (!this.container) return;

    const timeline = this.container.querySelector('[data-iterations-timeline]');
    if (!timeline) return;

    timeline.innerHTML = '';

    this.iterations.forEach(iteration => {
      const item = this.createIterationItem(iteration);
      timeline.appendChild(item);
    });

    this.updateCount();
  }

  renderIteration(iteration) {
    const timeline = this.container.querySelector('[data-iterations-timeline]');
    if (!timeline) return;

    const item = this.createIterationItem(iteration);
    timeline.appendChild(item);

    this.updateCount();

    // Scroll to new item
    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  createIterationItem(iteration) {
    const item = document.createElement('div');
    item.className = 'c-iterations-log__item';
    item.setAttribute('data-iteration-id', iteration.id);

    item.innerHTML = `
      <div class="c-iterations-log__item-marker"></div>
      <div class="c-iterations-log__item-content">
        <div class="c-iterations-log__item-header">
          <span class="c-iterations-log__item-number">Iteration ${iteration.number}</span>
          <span class="c-iterations-log__item-time">${iteration.time}</span>
        </div>
        <div class="c-iterations-log__item-prompt">
          <pre>${iteration.prompt}</pre>
        </div>
        <div class="c-iterations-log__item-result">${iteration.result}</div>
        ${iteration.improvement ? `
          <div class="c-iterations-log__item-improvement">
            <svg class="c-iterations-log__item-improvement-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            <span>${iteration.improvement}</span>
          </div>
        ` : ''}
      </div>
    `;

    return item;
  }

  updateCount() {
    const count = this.container.querySelector('[data-iterations-count]');
    if (count) {
      count.textContent = `${this.iterations.length} Iterationen`;
    }
  }

  exportToJSON() {
    const data = {
      exportDate: new Date().toISOString(),
      iterations: this.iterations
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `iterations-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  exportToMarkdown() {
    let md = `# Iterations-Log\n\n`;
    md += `Exportiert: ${new Date().toLocaleString('de-DE')}\n\n`;
    md += `---\n\n`;

    this.iterations.forEach(iter => {
      md += `## Iteration ${iter.number} (${iter.time})\n\n`;
      md += `### Prompt\n\n`;
      md += `\`\`\`\n${iter.prompt}\n\`\`\`\n\n`;
      md += `### Ergebnis\n\n`;
      md += `${iter.result}\n\n`;
      if (iter.improvement) {
        md += `### Verbesserung\n\n`;
        md += `${iter.improvement}\n\n`;
      }
      md += `---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `iterations-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  clearIterations() {
    this.iterations = [];
    this.saveIterations();
    this.renderIterations();
  }

  bindEvents() {
    if (!this.container) return;

    this.container.addEventListener('click', (e) => {
      const addBtn = e.target.closest('[data-add-iteration]');
      if (addBtn) {
        this.showAddIterationModal();
      }

      const exportJsonBtn = e.target.closest('[data-export-json]');
      if (exportJsonBtn) {
        this.exportToJSON();
      }

      const exportMdBtn = e.target.closest('[data-export-md]');
      if (exportMdBtn) {
        this.exportToMarkdown();
      }

      const clearBtn = e.target.closest('[data-clear-iterations]');
      if (clearBtn) {
        if (confirm('Alle Iterationen löschen?')) {
          this.clearIterations();
        }
      }
    });

    window.addEventListener('useprompt', (e) => {
      this.showAddIterationModal(e.detail.template.prompt);
    });
  }

  showAddIterationModal(prefilledPrompt = '') {
    const modal = document.querySelector('[data-modal="add-iteration"]');
    if (!modal) return;

    const promptInput = modal.querySelector('[data-iteration-prompt]');
    const resultInput = modal.querySelector('[data-iteration-result]');
    const improvementInput = modal.querySelector('[data-iteration-improvement]');

    if (promptInput) promptInput.value = prefilledPrompt;
    if (resultInput) resultInput.value = '';
    if (improvementInput) improvementInput.value = '';

    modal.classList.add('is-open');

    const submitBtn = modal.querySelector('[data-submit-iteration]');
    if (submitBtn) {
      submitBtn.onclick = () => {
        const prompt = promptInput?.value.trim();
        const result = resultInput?.value.trim();
        const improvement = improvementInput?.value.trim();

        if (prompt && result) {
          this.addIteration(prompt, result, improvement);
          modal.classList.remove('is-open');
        }
      };
    }
  }

  dispatchIterationAdd(iteration) {
    window.dispatchEvent(new CustomEvent('iterationadd', { 
      detail: { iteration } 
    }));
  }

  getIterations() {
    return this.iterations;
  }
}

export default IterationTracker;
```


### 5.6 Showcase Wall

**Datei: `js/modules/showcase-wall.js`**
```javascript
/**
 * Showcase Wall
 * Projekt-Showcase und Peer-Review-Anzeige
 */

class ShowcaseWall {
  constructor() {
    this.storageKey = 'ki-creative-lab-showcase';
    this.container = document.querySelector('[data-showcase-wall]');
    this.projects = [];

    this.init();
  }

  init() {
    this.loadProjects();
    this.renderProjects();
    this.bindEvents();
  }

  loadProjects() {
    try {
      this.projects = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    } catch (e) {
      this.projects = [];
    }
  }

  saveProjects() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.projects));
  }

  addProject(project) {
    const newProject = {
      id: Date.now(),
      title: project.title,
      team: project.team,
      description: project.description,
      image: project.image || 'assets/images/projects/default.jpg',
      category: project.category,
      agents: project.agents || [],
      timestamp: new Date().toISOString(),
      rating: 0,
      reviews: []
    };

    this.projects.push(newProject);
    this.saveProjects();
    this.renderProject(newProject);

    this.dispatchProjectAdd(newProject);
  }

  renderProjects() {
    if (!this.container) return;

    const grid = this.container.querySelector('[data-showcase-grid]');
    if (!grid) return;

    grid.innerHTML = '';

    if (this.projects.length === 0) {
      grid.innerHTML = `
        <div class="c-showcase-wall__empty" style="text-align: center; padding: 48px; color: var(--color-text-muted);">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 16px; opacity: 0.5;">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <p>Noch keine Projekte eingereicht.</p>
          <p style="font-size: 14px; margin-top: 8px;">Sei die erste Gruppe, die ein Projekt hochlädt!</p>
        </div>
      `;
      return;
    }

    const fragment = document.createDocumentFragment();

    this.projects.forEach(project => {
      const card = this.createProjectCard(project);
      fragment.appendChild(card);
    });

    grid.appendChild(fragment);
  }

  renderProject(project) {
    const grid = this.container.querySelector('[data-showcase-grid]');
    if (!grid) return;

    // Remove empty state if exists
    const emptyState = grid.querySelector('.c-showcase-wall__empty');
    if (emptyState) {
      emptyState.remove();
    }

    const card = this.createProjectCard(project);
    grid.appendChild(card);
  }

  createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'c-showcase-card';
    card.setAttribute('data-project-id', project.id);

    const agentsHtml = project.agents.map(agent => `
      <div class="c-showcase-card__agent-dot" 
           style="background-image: url('assets/images/agents/${agent}.png')"
           title="Agent: ${agent}"></div>
    `).join('');

    card.innerHTML = `
      <div class="c-showcase-card__image">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
        <div class="c-showcase-card__overlay"></div>
        <span class="c-showcase-card__badge">${project.category}</span>
      </div>
      <div class="c-showcase-card__content">
        <h3 class="c-showcase-card__title">${project.title}</h3>
        <p class="c-showcase-card__team">Team: ${project.team}</p>
        <p class="c-showcase-card__description">${project.description}</p>
        <div class="c-showcase-card__agents">${agentsHtml}</div>
        <div class="c-showcase-card__meta">
          <span class="c-showcase-card__meta-item">
            <svg class="c-showcase-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            ${project.rating > 0 ? project.rating.toFixed(1) : 'Noch keine Bewertung'}
          </span>
          <span class="c-showcase-card__meta-item">
            <svg class="c-showcase-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            ${project.reviews.length} Reviews
          </span>
        </div>
      </div>
      <div class="c-showcase-card__actions">
        <button class="c-showcase-card__btn c-showcase-card__btn--view" data-view-project="${project.id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          Ansehen
        </button>
        <button class="c-showcase-card__btn c-showcase-card__btn--download" data-download-project="${project.id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download
        </button>
      </div>
    `;

    return card;
  }

  viewProject(projectId) {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.querySelector('[data-modal="project-view"]');
    if (!modal) return;

    const title = modal.querySelector('[data-modal-title]');
    const content = modal.querySelector('[data-modal-body]');

    if (title) title.textContent = project.title;
    if (content) {
      content.innerHTML = `
        <div style="margin-bottom: 24px;">
          <img src="${project.image}" alt="${project.title}" style="width: 100%; border-radius: 12px; margin-bottom: 16px;">
          <p style="color: var(--color-text-secondary); margin-bottom: 8px;"><strong>Team:</strong> ${project.team}</p>
          <p style="color: var(--color-text-secondary); margin-bottom: 16px;">${project.description}</p>
        </div>
        <div style="display: flex; gap: 8px; margin-bottom: 24px;">
          ${project.agents.map(agent => `
            <div style="width: 40px; height: 40px; border-radius: 50%; background-image: url('assets/images/agents/${agent}.png'); background-size: cover; border: 2px solid var(--color-border);" title="${agent}"></div>
          `).join('')}
        </div>
        <div style="background: var(--color-bg-elevated); padding: 16px; border-radius: 12px;">
          <h4 style="margin-bottom: 12px; font-size: 16px;">Bewertungen</h4>
          ${project.reviews.length > 0 ? project.reviews.map(r => `
            <div style="padding: 12px; border-bottom: 1px solid var(--color-border); margin-bottom: 8px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="font-weight: 600;">${r.criterion}</span>
                <span style="color: var(--color-primary);">${r.score}/5</span>
              </div>
              <p style="font-size: 14px; color: var(--color-text-muted);">${r.comment || 'Kein Kommentar'}</p>
            </div>
          `).join('') : '<p style="color: var(--color-text-muted); font-size: 14px;">Noch keine Bewertungen.</p>'}
        </div>
      `;
    }

    modal.classList.add('is-open');
  }

  downloadProject(projectId) {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) return;

    const data = {
      ...project,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  addReview(projectId, review) {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) return;

    project.reviews.push(review);

    // Calculate average rating
    const totalScore = project.reviews.reduce((sum, r) => sum + r.score, 0);
    project.rating = totalScore / project.reviews.length;

    this.saveProjects();
    this.renderProjects();
  }

  bindEvents() {
    if (!this.container) return;

    this.container.addEventListener('click', (e) => {
      const viewBtn = e.target.closest('[data-view-project]');
      if (viewBtn) {
        const projectId = parseInt(viewBtn.getAttribute('data-view-project'));
        this.viewProject(projectId);
      }

      const downloadBtn = e.target.closest('[data-download-project]');
      if (downloadBtn) {
        const projectId = parseInt(downloadBtn.getAttribute('data-download-project'));
        this.downloadProject(projectId);
      }
    });

    window.addEventListener('projectsubmit', (e) => {
      this.addProject(e.detail.project);
    });
  }

  dispatchProjectAdd(project) {
    window.dispatchEvent(new CustomEvent('projectadd', { 
      detail: { project } 
    }));
  }

  getProjects() {
    return this.projects;
  }

  getProjectById(id) {
    return this.projects.find(p => p.id === id);
  }
}

export default ShowcaseWall;
```

### 5.7 Peer Review

**Datei: `js/modules/peer-review.js`**
```javascript
/**
 * Peer Review
 * Bewertungs-System für Gruppen-Projekte
 */

class PeerReview {
  constructor() {
    this.storageKey = 'ki-creative-lab-reviews';
    this.container = document.querySelector('[data-peer-review]');
    this.criteria = [
      {
        id: 'creativity',
        name: 'Kreativität & Innovation',
        weight: 25,
        description: 'Wie originell und innovativ ist das Projekt? Werden neue Ideen eingebracht?'
      },
      {
        id: 'ki-usage',
        name: 'KI-Nutzung & Prompt-Qualität',
        weight: 25,
        description: 'Wie effektiv werden KI-Tools eingesetzt? Qualität der Prompts und Iterationen.'
      },
      {
        id: 'execution',
        name: 'Technische Umsetzung',
        weight: 20,
        description: 'Qualität des Codes, Design-Implementation, Responsiveness, Performance.'
      },
      {
        id: 'presentation',
        name: 'Präsentation & Kommunikation',
        weight: 15,
        description: 'Wie gut wurde das Projekt präsentiert? Verständliche Erklärung der KI-Workflows?'
      },
      {
        id: 'teamwork',
        name: 'Teamarbeit & Rollenverteilung',
        weight: 15,
        description: 'Wie gut hat das Team zusammengearbeitet? Klare Rollenverteilung und Zusammenarbeit?'
      }
    ];

    this.currentRatings = {};
    this.init();
  }

  init() {
    this.renderCriteria();
    this.bindEvents();
  }

  renderCriteria() {
    if (!this.container) return;

    const criteriaContainer = this.container.querySelector('[data-review-criteria]');
    if (!criteriaContainer) return;

    criteriaContainer.innerHTML = '';

    this.criteria.forEach(criterion => {
      const item = this.createCriterionItem(criterion);
      criteriaContainer.appendChild(item);
    });
  }

  createCriterionItem(criterion) {
    const item = document.createElement('div');
    item.className = 'c-peer-review__criterion';
    item.setAttribute('data-criterion', criterion.id);

    item.innerHTML = `
      <div class="c-peer-review__criterion-header">
        <span class="c-peer-review__criterion-name">${criterion.name}</span>
        <span class="c-peer-review__criterion-weight">${criterion.weight}%</span>
      </div>
      <p class="c-peer-review__criterion-description">${criterion.description}</p>
      <div class="c-peer-review__rating" data-rating-for="${criterion.id}">
        ${[1, 2, 3, 4, 5].map(score => `
          <button class="c-peer-review__rating-btn" data-score="${score}" type="button">
            ${score}
          </button>
        `).join('')}
      </div>
      <div class="c-peer-review__comment">
        <label class="c-peer-review__comment-label">Kommentar (optional)</label>
        <textarea class="c-peer-review__comment-input" data-comment-for="${criterion.id}" placeholder="Dein Feedback zu diesem Kriterium..."></textarea>
      </div>
    `;

    return item;
  }

  setRating(criterionId, score) {
    this.currentRatings[criterionId] = score;

    const ratingContainer = this.container.querySelector(`[data-rating-for="${criterionId}"]`);
    if (!ratingContainer) return;

    const buttons = ratingContainer.querySelectorAll('.c-peer-review__rating-btn');
    buttons.forEach(btn => {
      const btnScore = parseInt(btn.getAttribute('data-score'));
      btn.classList.toggle('c-peer-review__rating-btn--selected', btnScore === score);
    });

    this.updateTotal();
  }

  updateTotal() {
    let totalScore = 0;
    let totalWeight = 0;

    this.criteria.forEach(criterion => {
      const rating = this.currentRatings[criterion.id];
      if (rating) {
        totalScore += (rating * criterion.weight) / 5;
        totalWeight += criterion.weight;
      }
    });

    const weightedScore = totalWeight > 0 ? (totalScore / totalWeight) * 100 : 0;

    const totalValue = this.container.querySelector('[data-review-total-value]');
    if (totalValue) {
      totalValue.textContent = weightedScore.toFixed(1);
    }
  }

  submitReview(projectId) {
    const reviews = [];

    this.criteria.forEach(criterion => {
      const score = this.currentRatings[criterion.id];
      const commentInput = this.container.querySelector(`[data-comment-for="${criterion.id}"]`);
      const comment = commentInput ? commentInput.value.trim() : '';

      if (score) {
        reviews.push({
          criterion: criterion.name,
          score,
          comment,
          weight: criterion.weight
        });
      }
    });

    if (reviews.length === 0) {
      alert('Bitte bewerte mindestens ein Kriterium.');
      return;
    }

    const review = {
      projectId,
      reviews,
      timestamp: new Date().toISOString(),
      reviewer: 'Anonymous' // Could be extended with team names
    };

    this.saveReview(review);

    // Dispatch event for showcase wall
    window.dispatchEvent(new CustomEvent('reviewsubmit', { 
      detail: { projectId, review } 
    }));

    // Reset form
    this.currentRatings = {};
    this.renderCriteria();

    // Show success message
    this.showNotification('Bewertung erfolgreich abgegeben!', 'success');
  }

  saveReview(review) {
    const reviews = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    reviews.push(review);
    localStorage.setItem(this.storageKey, JSON.stringify(reviews));
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `c-notification c-notification--${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      z-index: 9999;
      animation: slideIn 0.3s ease;
      ${type === 'success' ? 'background: var(--color-success); color: white;' : ''}
      ${type === 'error' ? 'background: var(--color-error); color: white;' : ''}
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'fadeIn 0.3s ease reverse';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  bindEvents() {
    if (!this.container) return;

    this.container.addEventListener('click', (e) => {
      const ratingBtn = e.target.closest('[data-score]');
      if (ratingBtn) {
        const criterionId = ratingBtn.closest('[data-criterion]').getAttribute('data-criterion');
        const score = parseInt(ratingBtn.getAttribute('data-score'));
        this.setRating(criterionId, score);
      }

      const submitBtn = e.target.closest('[data-submit-review]');
      if (submitBtn) {
        const projectId = submitBtn.getAttribute('data-submit-review');
        this.submitReview(projectId);
      }
    });
  }

  getCriteria() {
    return this.criteria;
  }

  getCurrentRatings() {
    return this.currentRatings;
  }
}

export default PeerReview;
```

### 5.8 Modal System

**Datei: `js/modules/modal-system.js`**
```javascript
/**
 * Modal System
 * Accessible Modal-System mit Keyboard-Navigation
 */

class ModalSystem {
  constructor() {
    this.modals = document.querySelectorAll('[data-modal]');
    this.activeModal = null;
    this.previousActiveElement = null;

    this.init();
  }

  init() {
    this.bindEvents();
    this.setupAccessibility();
  }

  setupAccessibility() {
    this.modals.forEach(modal => {
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');

      const title = modal.querySelector('[data-modal-title]');
      if (title) {
        const modalId = modal.getAttribute('data-modal');
        title.id = `modal-title-${modalId}`;
        modal.setAttribute('aria-labelledby', title.id);
      }
    });
  }

  openModal(modalId) {
    const modal = document.querySelector(`[data-modal="${modalId}"]`);
    if (!modal) return;

    this.previousActiveElement = document.activeElement;
    this.activeModal = modal;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');

    // Focus first focusable element
    const focusableElements = modal.queryAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    this.dispatchModalOpen(modalId);
  }

  closeModal(modalId) {
    const modal = modalId 
      ? document.querySelector(`[data-modal="${modalId}"]`)
      : this.activeModal;

    if (!modal) return;

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');

    // Restore body scroll
    document.body.style.overflow = '';

    // Restore focus
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
    }

    this.activeModal = null;

    this.dispatchModalClose(modal.getAttribute('data-modal'));
  }

  closeAllModals() {
    this.modals.forEach(modal => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    });

    document.body.style.overflow = '';
    this.activeModal = null;
  }

  bindEvents() {
    // Close on overlay click
    this.modals.forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal();
        }
      });
    });

    // Close buttons
    document.addEventListener('click', (e) => {
      const closeBtn = e.target.closest('[data-modal-close]');
      if (closeBtn) {
        this.closeModal();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeModal) {
        this.closeModal();
      }

      if (e.key === 'Tab' && this.activeModal) {
        this.trapFocus(e);
      }
    });

    // Open modal triggers
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-modal-open]');
      if (trigger) {
        const modalId = trigger.getAttribute('data-modal-open');
        this.openModal(modalId);
      }
    });
  }

  trapFocus(e) {
    const focusableElements = this.activeModal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }

  dispatchModalOpen(modalId) {
    window.dispatchEvent(new CustomEvent('modalopen', { 
      detail: { modalId } 
    }));
  }

  dispatchModalClose(modalId) {
    window.dispatchEvent(new CustomEvent('modalclose', { 
      detail: { modalId } 
    }));
  }

  getActiveModal() {
    return this.activeModal;
  }
}

export default ModalSystem;
```

### 5.9 Timeline Manager

**Datei: `js/modules/timeline-manager.js`**
```javascript
/**
 * Timeline Manager
 * Workshop-Timeline mit Countdown und Aktivitäts-Tracking
 */

class TimelineManager {
  constructor() {
    this.container = document.querySelector('[data-timeline]');
    this.workshopDate = new Date('2026-06-29T08:00:00'); // Montag 29.6.2026 8:00
    this.workshopEnd = new Date('2026-06-30T12:00:00'); // Dienstag 30.6.2026 12:00

    this.schedule = [
      {
        day: 1,
        start: '08:00',
        end: '08:30',
        title: 'Icebreaker & Begrüßung',
        description: 'Kennenlernen, Gruppenbildung nach Interessen, Erwartungen klären.',
        status: 'pending'
      },
      {
        day: 1,
        start: '08:30',
        end: '09:30',
        title: 'KI-Crashkurs: Prompt-Engineering',
        description: 'Zero-Shot, Few-Shot, Chain-of-Thought, ReAct. Live-Demos mit Kimi Code.',
        status: 'pending'
      },
      {
        day: 1,
        start: '09:30',
        end: '10:00',
        title: 'Projekt-Pitch & Gruppenwahl',
        description: 'Jede Gruppe wählt ein Projekt und definiert Scope. Projekt-Charta erstellen.',
        status: 'pending'
      },
      {
        day: 1,
        start: '10:00',
        end: '10:15',
        title: 'Pause',
        description: 'Kaffeepause, Networking.',
        status: 'pending'
      },
      {
        day: 1,
        start: '10:15',
        end: '11:45',
        title: 'Deep-Dive Phase 1: Erste Iterationen',
        description: 'KI-gestützte Content-Erstellung, Moodboards, Konzepte. 3 Assets bis Deadline.',
        status: 'pending'
      },
      {
        day: 1,
        start: '11:45',
        end: '12:00',
        title: 'Stand-up & Peer-Feedback',
        description: 'Jede Gruppe zeigt 1 Asset, bekommt Peer-Feedback. Iterations-Notizen.',
        status: 'pending'
      },
      {
        day: 2,
        start: '08:00',
        end: '08:15',
        title: 'Tages-Check-in',
        description: 'Reflexion über Nacht, Stand der Projekte, Ziele für Tag 2.',
        status: 'pending'
      },
      {
        day: 2,
        start: '08:15',
        end: '10:00',
        title: 'Produktionsphase',
        description: 'KI-gestützte Content-Erstellung, Web-Struktur, Design. 80% des Projekts.',
        status: 'pending'
      },
      {
        day: 2,
        start: '10:00',
        end: '10:15',
        title: 'Pause',
        description: 'Kaffeepause, letzte Vorbereitungen.',
        status: 'pending'
      },
      {
        day: 2,
        start: '10:15',
        end: '11:00',
        title: 'Final Sprint & Polish',
        description: 'Letzte Iterationen, Bugfixes, Performance-Optimierung. Abgabe-Deadline.',
        status: 'pending'
      },
      {
        day: 2,
        start: '11:00',
        end: '11:45',
        title: 'Präsentationen',
        description: '5 Minuten pro Gruppe + 2 Minuten Q&A. Peer-Voting für "Best KI Fusion".',
        status: 'pending'
      },
      {
        day: 2,
        start: '11:45',
        end: '12:00',
        title: 'Abschluss & Reflexion',
        description: 'Was nehmen wir mit? Workshop-Website-Update. Reflexions-Posts.',
        status: 'pending'
      }
    ];

    this.init();
  }

  init() {
    this.renderTimeline();
    this.startCountdown();
    this.updateActiveItem();

    // Update every minute
    setInterval(() => {
      this.updateActiveItem();
      this.updateCountdown();
    }, 60000);
  }

  renderTimeline() {
    if (!this.container) return;

    const itemsContainer = this.container.querySelector('[data-timeline-items]');
    if (!itemsContainer) return;

    itemsContainer.innerHTML = '';

    this.schedule.forEach((item, index) => {
      const element = this.createTimelineItem(item, index);
      itemsContainer.appendChild(element);
    });
  }

  createTimelineItem(item, index) {
    const div = document.createElement('div');
    div.className = 'c-timeline__item';
    div.setAttribute('data-timeline-index', index);

    div.innerHTML = `
      <div class="c-timeline__item-time">
        <span class="c-timeline__item-time-start">${item.start}</span>
        <span class="c-timeline__item-time-end">${item.end}</span>
      </div>
      <div class="c-timeline__item-content">
        <h3 class="c-timeline__item-title">${item.title}</h3>
        <p class="c-timeline__item-description">${item.description}</p>
        <div class="c-timeline__item-status">
          <span class="c-timeline__item-status-dot"></span>
          <span class="c-timeline__item-status-text">${this.getStatusText(item.status)}</span>
        </div>
      </div>
    `;

    return div;
  }

  getStatusText(status) {
    const texts = {
      pending: 'Ausstehend',
      active: 'Aktiv',
      completed: 'Abgeschlossen'
    };
    return texts[status] || status;
  }

  updateActiveItem() {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    this.schedule.forEach((item, index) => {
      const [startHour, startMin] = item.start.split(':').map(Number);
      const [endHour, endMin] = item.end.split(':').map(Number);

      const startTime = startHour * 60 + startMin;
      const endTime = endHour * 60 + endMin;

      const element = this.container.querySelector(`[data-timeline-index="${index}"]`);
      if (!element) return;

      if (currentTime >= startTime && currentTime <= endTime) {
        element.classList.add('c-timeline__item--active');
        element.classList.remove('c-timeline__item--completed');
        item.status = 'active';
      } else if (currentTime > endTime) {
        element.classList.remove('c-timeline__item--active');
        element.classList.add('c-timeline__item--completed');
        item.status = 'completed';
      } else {
        element.classList.remove('c-timeline__item--active', 'c-timeline__item--completed');
        item.status = 'pending';
      }

      const statusText = element.querySelector('.c-timeline__item-status-text');
      if (statusText) {
        statusText.textContent = this.getStatusText(item.status);
      }
    });
  }

  startCountdown() {
    this.updateCountdown();
    setInterval(() => this.updateCountdown(), 1000);
  }

  updateCountdown() {
    const now = new Date();
    const diff = this.workshopDate - now;

    if (diff <= 0) {
      // Workshop has started
      const endDiff = this.workshopEnd - now;
      if (endDiff <= 0) {
        this.renderCountdown(0, 0, 0, 0, 'Workshop abgeschlossen');
      } else {
        this.renderCountdownFromMs(endDiff, 'Verbleibende Zeit');
      }
    } else {
      this.renderCountdownFromMs(diff, 'Countdown zum Workshop');
    }
  }

  renderCountdownFromMs(ms, label) {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    this.renderCountdown(days, hours, minutes, seconds, label);
  }

  renderCountdown(days, hours, minutes, seconds, label) {
    const container = this.container.querySelector('[data-countdown]');
    if (!container) return;

    const items = [
      { value: days, label: 'Tage' },
      { value: hours, label: 'Stunden' },
      { value: minutes, label: 'Minuten' },
      { value: seconds, label: 'Sekunden' }
    ];

    container.innerHTML = `
      <div class="c-timeline__countdown-label" style="text-align: center; margin-bottom: 16px; font-size: 14px; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">${label}</div>
      <div class="c-timeline__countdown">
        ${items.map(item => `
          <div class="c-timeline__countdown-item">
            <div class="c-timeline__countdown-value">${String(item.value).padStart(2, '0')}</div>
            <div class="c-timeline__countdown-label">${item.label}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  getSchedule() {
    return this.schedule;
  }
}

export default TimelineManager;
```

### 5.10 Export Manager

**Datei: `js/modules/export-manager.js`**
```javascript
/**
 * Export Manager
 * ZIP-Export und Download der Projekte
 */

class ExportManager {
  constructor() {
    this.container = document.querySelector('[data-export-panel]');
    this.selectedOptions = new Set();

    this.init();
  }

  init() {
    this.renderOptions();
    this.bindEvents();
  }

  renderOptions() {
    if (!this.container) return;

    const optionsContainer = this.container.querySelector('[data-export-options]');
    if (!optionsContainer) return;

    const options = [
      {
        id: 'html',
        title: 'HTML/CSS/JS Dateien',
        description: 'Alle Quellcode-Dateien des Projekts',
        icon: 'code'
      },
      {
        id: 'assets',
        title: 'Bilder & Assets',
        description: 'Generierte Bilder, Icons und Medien',
        icon: 'image'
      },
      {
        id: 'prompts',
        title: 'Prompt-History',
        description: 'Alle verwendeten Prompts und Iterationen',
        icon: 'message'
      },
      {
        id: 'documentation',
        title: 'Dokumentation',
        description: 'Projekt-Beschreibung, Team-Info, Arbeitsprozess',
        icon: 'file'
      }
    ];

    optionsContainer.innerHTML = options.map(opt => `
      <div class="c-export-panel__option ${this.selectedOptions.has(opt.id) ? 'c-export-panel__option--selected' : ''}" data-export-option="${opt.id}">
        <div class="c-export-panel__option-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${this.getIconSvg(opt.icon)}
          </svg>
        </div>
        <div class="c-export-panel__option-content">
          <div class="c-export-panel__option-title">${opt.title}</div>
          <div class="c-export-panel__option-description">${opt.description}</div>
        </div>
        <div class="c-export-panel__option-check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
      </div>
    `).join('');
  }

  getIconSvg(icon) {
    const icons = {
      code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
      image: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
      message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
      file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>'
    };
    return icons[icon] || icons.file;
  }

  toggleOption(optionId) {
    if (this.selectedOptions.has(optionId)) {
      this.selectedOptions.delete(optionId);
    } else {
      this.selectedOptions.add(optionId);
    }

    this.renderOptions();
    this.updateSubmitButton();
  }

  updateSubmitButton() {
    const submitBtn = this.container.querySelector('[data-export-submit]');
    if (!submitBtn) return;

    const isEnabled = this.selectedOptions.size > 0;
    submitBtn.disabled = !isEnabled;
    submitBtn.style.opacity = isEnabled ? '1' : '0.5';
    submitBtn.style.cursor = isEnabled ? 'pointer' : 'not-allowed';
  }

  async exportProject() {
    if (this.selectedOptions.size === 0) return;

    const progressContainer = this.container.querySelector('[data-export-progress]');
    const progressBar = this.container.querySelector('[data-export-progress-bar]');
    const progressText = this.container.querySelector('[data-export-progress-text]');

    if (progressContainer) progressContainer.classList.add('is-visible');

    // Simulate export progress
    const steps = Array.from(this.selectedOptions);
    const totalSteps = steps.length;

    for (let i = 0; i < totalSteps; i++) {
      const progress = ((i + 1) / totalSteps) * 100;

      if (progressBar) progressBar.style.width = `${progress}%`;
      if (progressText) progressText.textContent = `Exportiere ${steps[i]}... (${i + 1}/${totalSteps})`;

      await this.delay(500);
    }

    if (progressText) progressText.textContent = 'Export abgeschlossen!';

    // Create download
    this.createDownload();

    // Reset after delay
    setTimeout(() => {
      if (progressContainer) progressContainer.classList.remove('is-visible');
      if (progressBar) progressBar.style.width = '0%';
      this.selectedOptions.clear();
      this.renderOptions();
      this.updateSubmitButton();
    }, 2000);
  }

  createDownload() {
    // In a real implementation, this would create a ZIP file
    // For now, we'll create a JSON manifest
    const manifest = {
      exportDate: new Date().toISOString(),
      options: Array.from(this.selectedOptions),
      project: {
        name: 'KI-Creative Lab Projekt',
        team: 'Team Name',
        exportVersion: '1.0'
      }
    };

    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `ki-creative-lab-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showNotification('Export erfolgreich!', 'success');
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `c-notification c-notification--${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      z-index: 9999;
      animation: slideIn 0.3s ease;
      ${type === 'success' ? 'background: var(--color-success); color: white;' : ''}
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'fadeIn 0.3s ease reverse';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  bindEvents() {
    if (!this.container) return;

    this.container.addEventListener('click', (e) => {
      const option = e.target.closest('[data-export-option]');
      if (option) {
        const optionId = option.getAttribute('data-export-option');
        this.toggleOption(optionId);
      }

      const submitBtn = e.target.closest('[data-export-submit]');
      if (submitBtn && !submitBtn.disabled) {
        this.exportProject();
      }
    });

    this.updateSubmitButton();
  }

  getSelectedOptions() {
    return Array.from(this.selectedOptions);
  }
}

export default ExportManager;
```


### 5.11 Haupt-JavaScript-Datei

**Datei: `js/main.js`**
```javascript
/**
 * KI-Creative Lab Hub - Main JavaScript
 * Module-Initialisierung und Event-Coordination
 */

import ThemeManager from './modules/theme-manager.js';
import ProjectSelector from './modules/project-selector.js';
import SwarmController from './modules/swarm-controller.js';
import AssetManager from './modules/asset-manager.js';
import IterationTracker from './modules/iteration-tracker.js';
import ShowcaseWall from './modules/showcase-wall.js';
import PeerReview from './modules/peer-review.js';
import ModalSystem from './modules/modal-system.js';
import TimelineManager from './modules/timeline-manager.js';
import ExportManager from './modules/export-manager.js';

class KICreativeLab {
  constructor() {
    this.modules = {};
    this.init();
  }

  init() {
    // Initialize modules in order
    this.modules.theme = new ThemeManager();
    this.modules.modal = new ModalSystem();
    this.modules.timeline = new TimelineManager();
    this.modules.projects = new ProjectSelector();
    this.modules.swarm = new SwarmController();
    this.modules.assets = new AssetManager();
    this.modules.iterations = new IterationTracker();
    this.modules.showcase = new ShowcaseWall();
    this.modules.reviews = new PeerReview();
    this.modules.export = new ExportManager();

    // Setup global event coordination
    this.setupEventCoordination();

    // Setup smooth scroll for anchor links
    this.setupSmoothScroll();

    // Setup intersection observer for animations
    this.setupScrollAnimations();

    console.log('KI-Creative Lab Hub initialized successfully');
  }

  setupEventCoordination() {
    // Project selection triggers swarm update
    window.addEventListener('projectselect', (e) => {
      this.modules.swarm.setProject(e.detail.project);
    });

    // Agent activation triggers asset suggestions
    window.addEventListener('agentactivate', (e) => {
      console.log(`Agent activated: ${e.detail.agentId}`);
    });

    // New iteration triggers showcase update
    window.addEventListener('iterationadd', (e) => {
      console.log(`New iteration added: ${e.detail.iteration.number}`);
    });

    // New project submission
    window.addEventListener('projectsubmit', (e) => {
      this.modules.showcase.addProject(e.detail.project);
    });

    // Review submission
    window.addEventListener('reviewsubmit', (e) => {
      this.modules.showcase.addReview(e.detail.projectId, e.detail.review);
    });

    // Prompt usage
    window.addEventListener('useprompt', (e) => {
      console.log(`Prompt used: ${e.detail.template.id}`);
    });
  }

  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  setupScrollAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('u-animate-fadeIn');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.c-project-card, .c-agent-card, .c-asset-card, .c-showcase-card').forEach(el => {
      observer.observe(el);
    });
  }

  // Public API for debugging
  getModule(name) {
    return this.modules[name];
  }

  getAllModules() {
    return this.modules;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.kiCreativeLab = new KICreativeLab();
  });
} else {
  window.kiCreativeLab = new KICreativeLab();
}

export default KICreativeLab;
```

---

## 6. HTML HAUPTDATEI

**Datei: `index.html`**
```html
<!DOCTYPE html>
<html lang="de" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="KI-Creative Lab Hub - Workshop für KI-gestützte Kreation an der HTL Traun">
  <meta name="author" content="HTL Traun - Medientechnik">
  <meta name="theme-color" content="#0a0a0f">

  <title>KI-Creative Lab Hub 2026 | HTL Traun</title>

  <!-- Preconnect to Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

  <!-- Main CSS -->
  <link rel="stylesheet" href="css/main.css">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="assets/icons/favicon.svg">
</head>
<body>
  <!-- Skip Link for Accessibility -->
  <a href="#main-content" class="u-sr-only u-skip-link">Zum Hauptinhalt springen</a>

  <!-- Navigation -->
  <header class="c-nav" role="banner">
    <div class="o-container c-nav__container">
      <a href="#" class="c-nav__logo" aria-label="KI-Creative Lab Hub Startseite">
        <svg class="c-nav__logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
        <span class="c-nav__logo-text">KI-Creative <span>Lab</span></span>
      </a>

      <nav class="c-nav__menu" role="navigation" aria-label="Hauptnavigation">
        <a href="#projects" class="c-nav__link">Projekte</a>
        <a href="#swarm" class="c-nav__link">Agent Swarm</a>
        <a href="#assets" class="c-nav__link">Assets</a>
        <a href="#showcase" class="c-nav__link">Showcase</a>
        <a href="#timeline" class="c-nav__link">Timeline</a>
      </nav>

      <div class="c-nav__actions">
        <!-- Theme Toggle -->
        <button class="c-theme-toggle" data-theme-toggle role="switch" aria-label="Zum Light-Mode wechseln" aria-checked="false">
          <span class="c-theme-toggle__track">
            <svg class="c-theme-toggle__icon c-theme-toggle__icon--sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <svg class="c-theme-toggle__icon c-theme-toggle__icon--moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </span>
          <span class="c-theme-toggle__thumb" aria-hidden="true"></span>
          <span class="c-theme-toggle__sr-only">Dark/Light Mode umschalten</span>
        </button>

        <!-- Mobile Menu Toggle -->
        <button class="c-nav__mobile-toggle" data-mobile-toggle aria-label="Menü öffnen" aria-expanded="false" aria-controls="mobile-menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div class="c-nav__mobile-menu" id="mobile-menu" role="dialog" aria-label="Mobile Navigation" aria-hidden="true">
      <a href="#projects" class="c-nav__mobile-link">Projekte</a>
      <a href="#swarm" class="c-nav__mobile-link">Agent Swarm</a>
      <a href="#assets" class="c-nav__mobile-link">Assets</a>
      <a href="#showcase" class="c-nav__mobile-link">Showcase</a>
      <a href="#timeline" class="c-nav__mobile-link">Timeline</a>
    </div>
  </header>

  <!-- Main Content -->
  <main id="main-content">

    <!-- Hero Section -->
    <section class="c-hero" aria-label="Willkommen">
      <div class="c-hero__background">
        <img src="assets/images/hero-dark.jpg" alt="" loading="eager" aria-hidden="true" data-hero-bg-dark>
        <img src="assets/images/hero-light.jpg" alt="" loading="eager" aria-hidden="true" data-hero-bg-light style="display: none;">
      </div>
      <div class="c-hero__overlay" aria-hidden="true"></div>

      <div class="c-hero__content">
        <div class="c-hero__badge">
          <span class="c-hero__badge-dot" aria-hidden="true"></span>
          <span>HTL Traun | Medientechnik</span>
        </div>

        <h1 class="c-hero__title">KI-Creative Lab</h1>
        <p class="c-hero__subtitle">
          Zwei Tage intensiver Workshop: Lerne professionelle KI-Nutzung mit Agent Swarms, 
          Prompt-Engineering und kreativen Projekten für die Zukunft.
        </p>

        <div class="c-hero__actions">
          <a href="#projects" class="c-btn c-btn--primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M5 12h14"/>
              <path d="M12 5l7 7-7 7"/>
            </svg>
            Projekt wählen
          </a>
          <a href="#timeline" class="c-btn c-btn--secondary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            Zeitplan
          </a>
        </div>

        <div class="c-hero__stats">
          <div class="c-hero__stat">
            <span class="c-hero__stat-value">9</span>
            <span class="c-hero__stat-label">Projekte</span>
          </div>
          <div class="c-hero__stat">
            <span class="c-hero__stat-value">5</span>
            <span class="c-hero__stat-label">KI-Agenten</span>
          </div>
          <div class="c-hero__stat">
            <span class="c-hero__stat-value">45</span>
            <span class="c-hero__stat-label">Teilnehmer</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="o-section" aria-labelledby="projects-heading">
      <div class="o-container">
        <header style="text-align: center; margin-bottom: 48px;">
          <h2 id="projects-heading" class="c-section-title">Wähle dein Projekt</h2>
          <p class="c-section-subtitle" style="color: var(--color-text-secondary); max-width: 600px; margin: 0 auto;">
            Jedes Projekt wird von einem Agent Swarm begleitet. Wähle das Thema, das dich am meisten begeistert.
          </p>
        </header>

        <div class="o-grid o-grid--3" data-project-grid role="list" aria-label="Projektliste">
          <!-- Projects will be rendered by JavaScript -->
        </div>
      </div>
    </section>

    <!-- Swarm Section -->
    <section id="swarm" class="o-section" aria-labelledby="swarm-heading" style="background-color: var(--color-bg-surface);">
      <div class="o-container">
        <header style="text-align: center; margin-bottom: 48px;">
          <h2 id="swarm-heading" class="c-section-title">Agent Swarm</h2>
          <p class="c-section-subtitle" style="color: var(--color-text-secondary); max-width: 600px; margin: 0 auto;">
            Aktiviere die Agenten, gib Prompts ein und beobachte, wie sie zusammenarbeiten, um dein Projekt voranzubringen.
          </p>
        </header>

        <div class="c-swarm-panel" data-swarm-panel>
          <div class="c-swarm-panel__header">
            <h3 class="c-swarm-panel__title">Dein Agent Team</h3>
            <div class="c-swarm-panel__status">
              <span class="c-swarm-panel__status-dot" aria-hidden="true"></span>
              <span>Swarm aktiv</span>
            </div>
          </div>

          <div class="c-swarm-panel__grid">
            <!-- Agent cards will be rendered by JavaScript -->
          </div>

          <div class="c-swarm-panel__chat" data-swarm-chat aria-label="Agent Diskussion">
            <div class="c-swarm-panel__chat-empty">
              <svg class="c-swarm-panel__chat-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <p>Aktiviere einen Agenten und gib einen Prompt ein, um die Kollaboration zu starten.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Assets Section -->
    <section id="assets" class="o-section" aria-labelledby="assets-heading">
      <div class="o-container">
        <header style="text-align: center; margin-bottom: 48px;">
          <h2 id="assets-heading" class="c-section-title">Asset Library</h2>
          <p class="c-section-subtitle" style="color: var(--color-text-secondary); max-width: 600px; margin: 0 auto;">
            Vorgefertigte Prompt-Templates, Code-Snippets und Design-Ressourcen für dein Projekt.
          </p>
        </header>

        <div class="c-asset-library" data-asset-library>
          <div class="c-asset-library__header">
            <h3 class="c-asset-library__title">Prompt-Templates</h3>
            <p class="c-asset-library__subtitle">Filtere nach Kategorie und kopiere die Prompts direkt in deine KI-Tools.</p>
          </div>

          <div class="c-asset-library__filters" data-asset-filters role="tablist" aria-label="Filter nach Kategorie">
            <!-- Filters will be rendered by JavaScript -->
          </div>

          <div class="c-asset-library__grid" data-asset-grid role="list" aria-label="Template-Liste">
            <!-- Templates will be rendered by JavaScript -->
          </div>
        </div>
      </div>
    </section>

    <!-- Iterations Section -->
    <section id="iterations" class="o-section" aria-labelledby="iterations-heading" style="background-color: var(--color-bg-surface);">
      <div class="o-container">
        <header style="text-align: center; margin-bottom: 48px;">
          <h2 id="iterations-heading" class="c-section-title">Iterations-Log</h2>
          <p class="c-section-subtitle" style="color: var(--color-text-secondary); max-width: 600px; margin: 0 auto;">
            Dokumentiere deine Prompt-Iterationen, Ergebnisse und Verbesserungen für maximale Transparenz.
          </p>
        </header>

        <div class="c-iterations-log" data-iterations-log>
          <div class="c-iterations-log__header">
            <h3 class="c-iterations-log__title">Deine Iterationen</h3>
            <div class="c-iterations-log__count" data-iterations-count>0 Iterationen</div>
          </div>

          <div class="c-iterations-log__timeline" data-iterations-timeline>
            <!-- Iterations will be rendered by JavaScript -->
          </div>

          <button class="c-iterations-log__add-btn" data-add-iteration data-modal-open="add-iteration">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Neue Iteration hinzufügen
          </button>

          <div style="display: flex; gap: 16px; margin-top: 24px;">
            <button class="c-btn c-btn--secondary" data-export-json>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              JSON Export
            </button>
            <button class="c-btn c-btn--secondary" data-export-md>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              Markdown Export
            </button>
            <button class="c-btn c-btn--danger" data-clear-iterations style="margin-left: auto; background: var(--color-error); color: white;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
              Alle löschen
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Showcase Section -->
    <section id="showcase" class="o-section" aria-labelledby="showcase-heading">
      <div class="o-container">
        <header style="text-align: center; margin-bottom: 48px;">
          <h2 id="showcase-heading" class="c-section-title">Projekt Showcase</h2>
          <p class="c-section-subtitle" style="color: var(--color-text-secondary); max-width: 600px; margin: 0 auto;">
            Entdecke die Ergebnisse aller Teams. Gib Feedback und lerne von den anderen Projekten.
          </p>
        </header>

        <div class="c-showcase-wall" data-showcase-wall>
          <div class="c-showcase-wall__header">
            <h3 class="c-showcase-wall__title">Eingereichte Projekte</h3>
            <button class="c-btn c-btn--primary" data-modal-open="submit-project">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Projekt einreichen
            </button>
          </div>

          <div class="c-showcase-wall__grid" data-showcase-grid role="list" aria-label="Projekt-Showcase">
            <!-- Projects will be rendered by JavaScript -->
          </div>
        </div>
      </div>
    </section>

    <!-- Peer Review Section -->
    <section id="review" class="o-section" aria-labelledby="review-heading" style="background-color: var(--color-bg-surface);">
      <div class="o-container">
        <header style="text-align: center; margin-bottom: 48px;">
          <h2 id="review-heading" class="c-section-title">Peer Review</h2>
          <p class="c-section-subtitle" style="color: var(--color-text-secondary); max-width: 600px; margin: 0 auto;">
            Bewerte die Projekte deiner Mitschüler nach klaren Kriterien. Konstruktives Feedback hilft allen.
          </p>
        </header>

        <div class="c-peer-review" data-peer-review>
          <div class="c-peer-review__header">
            <h3 class="c-peer-review__title">Bewertung</h3>
            <p class="c-peer-review__subtitle">Wähle ein Projekt und bewerte es nach den folgenden Kriterien.</p>
          </div>

          <div class="c-peer-review__criteria" data-review-criteria>
            <!-- Criteria will be rendered by JavaScript -->
          </div>

          <button class="c-peer-review__submit" data-submit-review="current">
            <svg class="c-peer-review__submit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Bewertung abgeben
          </button>

          <div class="c-peer-review__results" data-review-results style="display: none;">
            <h4 class="c-peer-review__results-title">Ergebnis</h4>
            <div data-review-results-list></div>
            <div class="c-peer-review__total">
              <span class="c-peer-review__total-label">Gesamtpunktzahl</span>
              <span class="c-peer-review__total-value" data-review-total-value>0.0</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline Section -->
    <section id="timeline" class="o-section" aria-labelledby="timeline-heading">
      <div class="o-container">
        <header style="text-align: center; margin-bottom: 48px;">
          <h2 id="timeline-heading" class="c-section-title">Workshop Timeline</h2>
          <p class="c-section-subtitle" style="color: var(--color-text-secondary); max-width: 600px; margin: 0 auto;">
            Der Countdown läuft. Folge dem Zeitplan und bleibe auf Kurs für maximale Produktivität.
          </p>
        </header>

        <div class="c-timeline" data-timeline>
          <div class="c-timeline__header">
            <h3 class="c-timeline__title">Workshop Zeitplan</h3>
            <p class="c-timeline__subtitle">29. - 30. Juni 2026 | HTL Traun</p>
          </div>

          <div data-countdown aria-label="Countdown"></div>

          <div class="c-timeline__items" data-timeline-items role="list" aria-label="Zeitplan">
            <!-- Timeline items will be rendered by JavaScript -->
          </div>
        </div>
      </div>
    </section>

    <!-- Export Section -->
    <section id="export" class="o-section" aria-labelledby="export-heading" style="background-color: var(--color-bg-surface);">
      <div class="o-container">
        <header style="text-align: center; margin-bottom: 48px;">
          <h2 id="export-heading" class="c-section-title">Projekt Export</h2>
          <p class="c-section-subtitle" style="color: var(--color-text-secondary); max-width: 600px; margin: 0 auto;">
            Exportiere dein Projekt für die Abgabe. Wähle die gewünschten Komponenten und lade alles als ZIP herunter.
          </p>
        </header>

        <div class="c-export-panel" data-export-panel>
          <div class="c-export-panel__header">
            <h3 class="c-export-panel__title">Export-Optionen</h3>
            <p class="c-export-panel__subtitle">Wähle die Komponenten, die du exportieren möchtest.</p>
          </div>

          <div class="c-export-panel__options" data-export-options>
            <!-- Options will be rendered by JavaScript -->
          </div>

          <button class="c-export-panel__btn" data-export-submit disabled>
            <svg class="c-export-panel__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Projekt exportieren
          </button>

          <div class="c-export-panel__progress" data-export-progress>
            <div class="c-export-panel__progress-bar">
              <div class="c-export-panel__progress-fill" data-export-progress-bar style="width: 0%"></div>
            </div>
            <div class="c-export-panel__progress-text" data-export-progress-text>Bereit zum Export...</div>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- Footer -->
  <footer class="c-footer" role="contentinfo" style="padding: 48px 0; border-top: 1px solid var(--color-border); background-color: var(--color-bg-surface);">
    <div class="o-container">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px;">
        <div>
          <p style="font-weight: 600; margin-bottom: 8px;">KI-Creative Lab Hub 2026</p>
          <p style="font-size: 14px; color: var(--color-text-muted);">HTL Traun | Medientechnik | Fachschule für IT</p>
        </div>
        <div style="display: flex; gap: 24px; font-size: 14px; color: var(--color-text-muted);">
          <a href="#" style="color: var(--color-text-muted); transition: color 0.2s;">Impressum</a>
          <a href="#" style="color: var(--color-text-muted); transition: color 0.2s;">Datenschutz</a>
          <a href="https://pantam.at" target="_blank" rel="noopener noreferrer" style="color: var(--color-text-muted); transition: color 0.2s;">pantam.at</a>
        </div>
      </div>
      <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--color-border); text-align: center; font-size: 12px; color: var(--color-text-muted);">
        <p>Entwickelt mit KI-Unterstützung | Silvio Manuel | HTL Traun</p>
      </div>
    </div>
  </footer>

  <!-- Modals -->

  <!-- Add Iteration Modal -->
  <div class="c-modal-overlay" data-modal="add-iteration" role="dialog" aria-modal="true" aria-labelledby="add-iteration-title" aria-hidden="true">
    <div class="c-modal">
      <div class="c-modal__header">
        <h3 id="add-iteration-title" class="c-modal__title" data-modal-title>Neue Iteration</h3>
        <button class="c-modal__close" data-modal-close aria-label="Modal schließen">
          <svg class="c-modal__close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="c-modal__body" data-modal-body>
        <div style="margin-bottom: 24px;">
          <label for="iteration-prompt" style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: var(--color-text-secondary);">Prompt</label>
          <textarea id="iteration-prompt" data-iteration-prompt style="width: 100%; min-height: 120px; padding: 12px; background: var(--color-bg-elevated); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-text-primary); font-family: var(--font-mono); font-size: 14px; resize: vertical;" placeholder="Gib deinen Prompt ein..."></textarea>
        </div>
        <div style="margin-bottom: 24px;">
          <label for="iteration-result" style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: var(--color-text-secondary);">Ergebnis</label>
          <textarea id="iteration-result" data-iteration-result style="width: 100%; min-height: 120px; padding: 12px; background: var(--color-bg-elevated); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-text-primary); font-size: 14px; resize: vertical;" placeholder="Beschreibe das Ergebnis..."></textarea>
        </div>
        <div>
          <label for="iteration-improvement" style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: var(--color-text-secondary);">Verbesserung (optional)</label>
          <textarea id="iteration-improvement" data-iteration-improvement style="width: 100%; min-height: 80px; padding: 12px; background: var(--color-bg-elevated); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-text-primary); font-size: 14px; resize: vertical;" placeholder="Was kann verbessert werden?"></textarea>
        </div>
      </div>
      <div class="c-modal__footer">
        <button class="c-modal__btn c-modal__btn--secondary" data-modal-close>Abbrechen</button>
        <button class="c-modal__btn c-modal__btn--primary" data-submit-iteration>Speichern</button>
      </div>
    </div>
  </div>

  <!-- Submit Project Modal -->
  <div class="c-modal-overlay" data-modal="submit-project" role="dialog" aria-modal="true" aria-labelledby="submit-project-title" aria-hidden="true">
    <div class="c-modal">
      <div class="c-modal__header">
        <h3 id="submit-project-title" class="c-modal__title" data-modal-title>Projekt einreichen</h3>
        <button class="c-modal__close" data-modal-close aria-label="Modal schließen">
          <svg class="c-modal__close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="c-modal__body" data-modal-body>
        <div style="margin-bottom: 24px;">
          <label for="project-title" style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: var(--color-text-secondary);">Projekt-Titel</label>
          <input type="text" id="project-title" data-project-title style="width: 100%; padding: 12px; background: var(--color-bg-elevated); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-text-primary); font-size: 14px;" placeholder="Name deines Projekts">
        </div>
        <div style="margin-bottom: 24px;">
          <label for="project-team" style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: var(--color-text-secondary);">Team-Name</label>
          <input type="text" id="project-team" data-project-team style="width: 100%; padding: 12px; background: var(--color-bg-elevated); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-text-primary); font-size: 14px;" placeholder="z.B. Team Alpha">
        </div>
        <div style="margin-bottom: 24px;">
          <label for="project-description" style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: var(--color-text-secondary);">Beschreibung</label>
          <textarea id="project-description" data-project-description style="width: 100%; min-height: 100px; padding: 12px; background: var(--color-bg-elevated); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-text-primary); font-size: 14px; resize: vertical;" placeholder="Kurze Beschreibung deines Projekts..."></textarea>
        </div>
        <div style="margin-bottom: 24px;">
          <label for="project-category" style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: var(--color-text-secondary);">Kategorie</label>
          <select id="project-category" data-project-category style="width: 100%; padding: 12px; background: var(--color-bg-elevated); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-text-primary); font-size: 14px;">
            <option value="">Kategorie wählen...</option>
            <option value="Reisen">Reisen</option>
            <option value="Design">Design</option>
            <option value="Gaming">Gaming</option>
            <option value="Mode">Mode</option>
            <option value="Musik">Musik</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Essen">Essen</option>
            <option value="Storytelling">Storytelling</option>
          </select>
        </div>
        <div>
          <label for="project-image" style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: var(--color-text-secondary);">Projekt-Bild (URL)</label>
          <input type="url" id="project-image" data-project-image style="width: 100%; padding: 12px; background: var(--color-bg-elevated); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-text-primary); font-size: 14px;" placeholder="https://...">
        </div>
      </div>
      <div class="c-modal__footer">
        <button class="c-modal__btn c-modal__btn--secondary" data-modal-close>Abbrechen</button>
        <button class="c-modal__btn c-modal__btn--primary" data-submit-project>Einreichen</button>
      </div>
    </div>
  </div>

  <!-- Project View Modal -->
  <div class="c-modal-overlay" data-modal="project-view" role="dialog" aria-modal="true" aria-labelledby="project-view-title" aria-hidden="true">
    <div class="c-modal" style="max-width: 800px;">
      <div class="c-modal__header">
        <h3 id="project-view-title" class="c-modal__title" data-modal-title>Projekt Details</h3>
        <button class="c-modal__close" data-modal-close aria-label="Modal schließen">
          <svg class="c-modal__close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="c-modal__body" data-modal-body>
        <!-- Content will be loaded dynamically -->
      </div>
      <div class="c-modal__footer">
        <button class="c-modal__btn c-modal__btn--secondary" data-modal-close>Schließen</button>
      </div>
    </div>
  </div>

  <!-- JavaScript -->
  <script type="module" src="js/main.js"></script>
</body>
</html>
```


  <!-- Pie Chart 2 -->
  <symbol id="icon-pie-chart-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
    <path d="M22 12A10 10 0 0 0 12 2v10z"/>
  </symbol>

  <!-- Activity -->
  <symbol id="icon-activity-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </symbol>

  <!-- Target -->
  <symbol id="icon-target-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </symbol>

</svg>
```

---

## 9. PROJEKT-BRIEFINGS JSON

**Datei: `data/project-briefings.json`**
```json
{
  "projects": [
    {
      "id": "tourism-2-0",
      "title": "Tourismus 2.0: Hidden Gems",
      "description": "Entdecke und präsentiere versteckte Schätze aus verschiedenen Kulturen mit KI-gestützter Storytelling.",
      "category": "Reisen",
      "duration": "4h",
      "teamSize": 5,
      "difficulty": "Mittel",
      "agents": ["creative", "story", "visual", "code", "critic"],
      "image": "assets/images/projects/tourism-2-0.jpg",
      "briefing": {
        "goal": "Erstelle eine immersive Website, die authentische, nicht-touristische Reiseziele aus verschiedenen Kulturen präsentiert. Nutze KI für Storytelling, Bildgenerierung und interaktive Karten.",
        "deliverables": [
          "Landing-Page mit Hero-Video/Animation",
          "Interaktive Karte mit 5+ Hidden Gems",
          "KI-generierte Storys für jeden Ort",
          "Bildergalerie mit KI-generierten Fotos",
          "Mobile-first responsive Design"
        ],
        "kiTools": ["Text-Generation", "Bild-Generation", "Code-Generation", "UI/UX-Design"],
        "agentChain": [
          {
            "agent": "creative",
            "task": "Brainstorme 5 einzigartige Reiseziele aus verschiedenen Kulturen, die nicht mainstream sind."
          },
          {
            "agent": "story",
            "task": "Schreibe authentische Storys für jedes Ziel aus der Perspektive eines Einheimischen."
          },
          {
            "agent": "visual",
            "task": "Erstelle Moodboards und generiere Bilder für jedes Reiseziel."
          },
          {
            "agent": "code",
            "task": "Implementiere interaktive Karte und responsive Layout."
          },
          {
            "agent": "critic",
            "task": "Review Authentizität und kulturelle Sensibilität."
          }
        ]
      }
    },
    {
      "id": "smart-classroom",
      "title": "Futuristisches Smart Classroom",
      "description": "Designe das Klassenzimmer der Zukunft mit Fokus auf multikulturelles Lernen und KI-Integration.",
      "category": "Design",
      "duration": "4h",
      "teamSize": 5,
      "difficulty": "Mittel",
      "agents": ["creative", "visual", "code", "story", "critic"],
      "image": "assets/images/projects/smart-classroom.jpg",
      "briefing": {
        "goal": "Entwerfe ein Konzept für ein Klassenzimmer 2035, das multikulturelle Lerngruppen optimal unterstützt. KI-gestützte Personalisierung, holographische Displays und biophilisches Design.",
        "deliverables": [
          "3D-Konzept-Visualisierung",
          "Interaktiver Raum-Planer",
          "Design-System und Styleguide",
          "Narrative: Ein Schultag im Jahr 2035",
          "Präsentation mit Prototyp"
        ],
        "kiTools": ["3D-Design", "Text-Generation", "UI/UX-Design", "Code-Generation"],
        "agentChain": [
          {
            "agent": "creative",
            "task": "Brainstorme 3 innovative Klassenzimmer-Konzepte mit Fokus auf Inklusion."
          },
          {
            "agent": "visual",
            "task": "Erstelle Moodboards, Farbpaletten und 3D-Visualisierungen."
          },
          {
            "agent": "story",
            "task": "Entwickle eine Narrative: Wie fühlt sich ein Schultag in diesem Klassenzimmer an?"
          },
          {
            "agent": "code",
            "task": "Baue einen interaktiven Prototyp mit CSS 3D-Transforms."
          },
          {
            "agent": "critic",
            "task": "Evaluiere Realisierbarkeit und pädagogischen Wert."
          }
        ]
      }
    },
    {
      "id": "game-platform",
      "title": "Indie Game Studio Launch",
      "description": "Entwickle ein Konzept für eine Indie-Game-Plattform mit kulturellen Spielwelten und Storylines.",
      "category": "Gaming",
      "duration": "4h",
      "teamSize": 5,
      "difficulty": "Hoch",
      "agents": ["creative", "story", "code", "visual", "critic"],
      "image": "assets/images/projects/game-platform.jpg",
      "briefing": {
        "goal": "Kreiere eine Plattform für Indie-Games, die kulturelle Mythen und Folklore als Spielwelten nutzt. Von der Brand-Identity bis zum spielbaren Prototyp.",
        "deliverables": [
          "Brand-Identity und Logo",
          "Game-Design-Dokument",
          "Spielbarer Web-Prototyp",
          "Character-Designs und Assets",
          "Marketing-Website"
        ],
        "kiTools": ["Game-Design", "Text-Generation", "Bild-Generation", "Code-Generation"],
        "agentChain": [
          {
            "agent": "creative",
            "task": "Entwickle ein einzigartiges Game-Konzept basierend auf kultureller Mythologie."
          },
          {
            "agent": "story",
            "task": "Schreibe Lore, Quest-Texte und Character-Backstories."
          },
          {
            "agent": "visual",
            "task": "Designe Characters, Environment-Art und UI-Elemente."
          },
          {
            "agent": "code",
            "task": "Implementiere spielbaren Prototyp mit Canvas/WebGL."
          },
          {
            "agent": "critic",
            "task": "Teste Spielbalance und User-Experience."
          }
        ]
      }
    },
    {
      "id": "streetwear",
      "title": "Streetwear Brand Generator",
      "description": "Kreiere eine Streetwear-Marke mit kultureller Fusion, Brand-Identity und Social-Media-Strategie.",
      "category": "Mode",
      "duration": "4h",
      "teamSize": 5,
      "difficulty": "Mittel",
      "agents": ["creative", "visual", "story", "code", "critic"],
      "image": "assets/images/projects/streetwear.jpg",
      "briefing": {
        "goal": "Entwickle eine komplette Streetwear-Brand von der Identität bis zur Social-Media-Präsenz. Fusion verschiedener Kulturen, authentischer Hype, nachhaltige Vision.",
        "deliverables": [
          "Brand-Identity (Logo, Farben, Fonts)",
          "3 T-Shirt/ Hoodie-Designs",
          "Social-Media-Template-Set",
          "Online-Shop-Prototyp",
          "Brand-Story und Marketing-Plan"
        ],
        "kiTools": ["Bild-Generation", "Text-Generation", "UI/UX-Design", "Code-Generation"],
        "agentChain": [
          {
            "agent": "creative",
            "task": "Entwickle Brand-Name, Vision und einzigartigen Selling Point."
          },
          {
            "agent": "visual",
            "task": "Designe Logo, Graphics und Social-Media-Templates."
          },
          {
            "agent": "story",
            "task": "Schreibe Brand-Story, Slogans und Social-Media-Captions."
          },
          {
            "agent": "code",
            "task": "Baue Online-Shop-Prototyp mit Produkt-Karussell."
          },
          {
            "agent": "critic",
            "task": "Review Brand-Konsistenz und Markenrelevanz."
          }
        ]
      }
    },
    {
      "id": "music-ai",
      "title": "Music & AI: Producer Assistant",
      "description": "Nutze KI für Songwriting, Album-Cover-Design und Marketing-Planung für eine Musik-Karriere.",
      "category": "Musik",
      "duration": "4h",
      "teamSize": 5,
      "difficulty": "Mittel",
      "agents": ["creative", "story", "visual", "code", "critic"],
      "image": "assets/images/projects/music-ai.jpg",
      "briefing": {
        "goal": "Kreiere ein komplettes Musik-Projekt: Von den Songtexten über das Album-Cover bis zur Marketing-Strategie. Nutze KI für kreative und technische Aspekte.",
        "deliverables": [
          "3 Songtexte (verschiedene Sprachen möglich)",
          "Album-Cover und Artwork",
          "Artist-Website mit Audio-Player",
          "Social-Media-Content-Plan",
          "Press-Kit und Bio"
        ],
        "kiTools": ["Text-Generation", "Bild-Generation", "UI/UX-Design", "Code-Generation"],
        "agentChain": [
          {
            "agent": "creative",
            "task": "Entwickle Artist-Name, Genre und musikalische Vision."
          },
          {
            "agent": "story",
            "task": "Schreibe Songtexte und Album-Narrative in verschiedenen Sprachen."
          },
          {
            "agent": "visual",
            "task": "Designe Album-Cover, Merch und Stage-Visuals."
          },
          {
            "agent": "code",
            "task": "Baue Artist-Website mit Audio-Player und Visualizer."
          },
          {
            "agent": "critic",
            "task": "Analysiere Songtext-Qualität und Markenpositionierung."
          }
        ]
      }
    },
    {
      "id": "cyberpunk-city",
      "title": "Cyberpunk City Builder",
      "description": "Baue eine futuristische Stadt mit kulturellen Bezirken, Factions und immersiver Weltgeschichte.",
      "category": "Sci-Fi",
      "duration": "4h",
      "teamSize": 5,
      "difficulty": "Hoch",
      "agents": ["creative", "story", "visual", "code", "critic"],
      "image": "assets/images/projects/cyberpunk-city.jpg",
      "briefing": {
        "goal": "Erschaffe eine dystopische Stadt 2080 mit kulturellen Bezirken, rivalisierenden Factions und tiefer Weltgeschichte. Interaktive Karte, Character-Profile und Quest-System.",
        "deliverables": [
          "Interaktive Stadt-Karte",
          "5+ Bezirke mit einzigartiger Kultur",
          "Faction-Profile und Hintergrundgeschichten",
          "Character-Designs mit Stats",
          "Quest-System mit Verzweigungen"
        ],
        "kiTools": ["Worldbuilding", "Text-Generation", "Bild-Generation", "Code-Generation"],
        "agentChain": [
          {
            "agent": "creative",
            "task": "Designe Stadt-Layout, Bezirke und Haupt-Factions."
          },
          {
            "agent": "story",
            "task": "Entwickle Weltgeschichte, Faction-Lore und NPC-Backstories."
          },
          {
            "agent": "visual",
            "task": "Erstelle Neon-Style-Guides, HUD-Designs und Environment-Art."
          },
          {
            "agent": "code",
            "task": "Baue interaktive Karte mit Bezirk-Details und Quest-System."
          },
          {
            "agent": "critic",
            "task": "Prüfe Weltbau-Konsistenz und Faction-Balance."
          }
        ]
      }
    },
    {
      "id": "food-fusion",
      "title": "Food Fusion Lab",
      "description": "Erstelle Fusion-Rezepte, Food-Blog-Content und Restaurant-Konzepte mit kultureller Vielfalt.",
      "category": "Essen",
      "duration": "4h",
      "teamSize": 5,
      "difficulty": "Leicht",
      "agents": ["creative", "story", "visual", "code", "critic"],
      "image": "assets/images/projects/food-fusion.jpg",
      "briefing": {
        "goal": "Kreiere ein Food-Fusion-Konzept, das verschiedene Kulturen auf innovative Weise verbindet. Von Rezepten über Food-Fotografie bis zum Restaurant-Branding.",
        "deliverables": [
          "5 Fusion-Rezepte mit Zutatenlisten",
          "Food-Blog mit KI-generierten Fotos",
          "Restaurant-Branding und Menü-Design",
          "Interaktiver Rezept-Filter",
          "Social-Media-Content-Plan"
        ],
        "kiTools": ["Text-Generation", "Bild-Generation", "UI/UX-Design", "Code-Generation"],
        "agentChain": [
          {
            "agent": "creative",
            "task": "Entwickle 5 innovative Fusion-Rezepte mit kultureller Verbindung."
          },
          {
            "agent": "story",
            "task": "Schreibe Food-Storys und Restaurant-Narrative."
          },
          {
            "agent": "visual",
            "task": "Designe Food-Fotografie-Styles, Menü-Layouts und Branding."
          },
          {
            "agent": "code",
            "task": "Baue Food-Blog mit Rezept-Filter und Koch-Timer."
          },
          {
            "agent": "critic",
            "task": "Evaluiere Rezept-Originalität und Food-Safety."
          }
        ]
      }
    },
    {
      "id": "esports",
      "title": "Esports Tournament Platform",
      "description": "Entwickle eine Plattform für Esports-Turniere mit internationalen Teams und Community-Features.",
      "category": "Gaming",
      "duration": "4h",
      "teamSize": 5,
      "difficulty": "Hoch",
      "agents": ["creative", "code", "story", "visual", "critic"],
      "image": "assets/images/projects/esports.jpg",
      "briefing": {
        "goal": "Baue eine Esports-Turnier-Plattform mit Live-Brackets, Team-Statistiken und Community-Features. Fokus auf internationale Teilnahme und multikulturelle Teams.",
        "deliverables": [
          "Live-Tournament-Bracket-System",
          "Team-Profile mit Stats",
          "Match-Streaming-Integration",
          "Community-Chat und Forum",
          "Leaderboard und Rangliste"
        ],
        "kiTools": ["UI/UX-Design", "Code-Generation", "Text-Generation", "Bild-Generation"],
        "agentChain": [
          {
            "agent": "creative",
            "task": "Designe Turnier-Format und Regelwerk für internationale Teilnahme."
          },
          {
            "agent": "code",
            "task": "Implementiere Bracket-System, Team-Stats und Chat."
          },
          {
            "agent": "story",
            "task": "Entwickle Team-Backstories und Kommentar-Scripts."
          },
          {
            "agent": "visual",
            "task": "Designe Tournament-Branding, Overlays und Team-Jerseys."
          },
          {
            "agent": "critic",
            "task": "Review Turnier-Balance und Regelwerk-Klarheit."
          }
        ]
      }
    },
    {
      "id": "mythology",
      "title": "AI Mythology Reimagined",
      "description": "Modernisiere antike Mythen deiner Kultur mit KI-gestütztem Storytelling und Visual Design.",
      "category": "Storytelling",
      "duration": "4h",
      "teamSize": 5,
      "difficulty": "Mittel",
      "agents": ["story", "creative", "visual", "code", "critic"],
      "image": "assets/images/projects/mythology.jpg",
      "briefing": {
        "goal": "Wähle eine Mythologie aus deiner Kultur und modernisiere sie für ein zeitgemäßes Publikum. Graphic-Novel-Style, interaktive Story-Map und Character-Designs.",
        "deliverables": [
          "Interaktive Story-Map",
          "3 Character-Designs mit Profilen",
          "Modernisierte Mythologie-Erzählung",
          "Graphic-Novel-Seiten",
          "Merchandise-Konzept"
        ],
        "kiTools": ["Text-Generation", "Bild-Generation", "UI/UX-Design", "Code-Generation"],
        "agentChain": [
          {
            "agent": "story",
            "task": "Wähle und recherchiere eine Mythologie, modernisiere die Erzählung."
          },
          {
            "agent": "creative",
            "task": "Entwickle Character-Konzepte und Welt-Design."
          },
          {
            "agent": "visual",
            "task": "Erstelle Character-Designs, Environment-Art und Symbol-Systeme."
          },
          {
            "agent": "code",
            "task": "Baue interaktive Story-Map mit Character-Profilen."
          },
          {
            "agent": "critic",
            "task": "Prüfe kulturelle Sensibilität und mythologische Genauigkeit."
          }
        ]
      }
    }
  ]
}
```

---

## 10. IMPLEMENTIERUNGS-ANLEITUNG FÜR KIMI CODE

### Schritt 1: Ordnerstruktur erstellen
```bash
mkdir -p ki-creative-lab/css/{settings,tools,generic,elements,objects,components,utilities}
mkdir -p ki-creative-lab/js/modules
mkdir -p ki-creative-lab/assets/images/{agents,projects}
mkdir -p ki-creative-lab/assets/icons
mkdir -p ki-creative-lab/data
```

### Schritt 2: Dateien erstellen (Reihenfolge)
1. `css/settings/_colors.css`
2. `css/settings/_typography.css`
3. `css/settings/_breakpoints.css`
4. `css/tools/_mixins.css`
5. `css/generic/_reset.css`
6. `css/generic/_box-sizing.css`
7. `css/elements/_headings.css`
8. `css/elements/_links.css`
9. `css/elements/_forms.css`
10. `css/objects/_layout.css`
11. `css/objects/_grid.css`
12. `css/objects/_media.css`
13. `css/components/_c-nav.css`
14. `css/components/_c-hero.css`
15. `css/components/_c-project-card.css`
16. `css/components/_c-agent-card.css`
17. `css/components/_c-swarm-panel.css`
18. `css/components/_c-asset-library.css`
19. `css/components/_c-iterations-log.css`
20. `css/components/_c-showcase-wall.css`
21. `css/components/_c-peer-review.css`
22. `css/components/_c-theme-toggle.css`
23. `css/components/_c-modal.css`
24. `css/components/_c-timeline.css`
25. `css/components/_c-export-panel.css`
26. `css/utilities/_helpers.css`
27. `css/main.css`
28. `js/modules/theme-manager.js`
29. `js/modules/project-selector.js`
30. `js/modules/swarm-controller.js`
31. `js/modules/asset-manager.js`
32. `js/modules/iteration-tracker.js`
33. `js/modules/showcase-wall.js`
34. `js/modules/peer-review.js`
35. `js/modules/modal-system.js`
36. `js/modules/timeline-manager.js`
37. `js/modules/export-manager.js`
38. `js/main.js`
39. `index.html`
40. `assets/icons/icons.svg`
41. `data/project-briefings.json`

### Schritt 3: Nano Banana Bilder generieren
Verwende die Prompts aus Kapitel 7 für:
- 2 Hero-Bilder (Dark/Light)
- 5 Agent-Portraits
- 9 Projekt-Thumbnails

### Schritt 4: Testen
```bash
# Lokaler Server starten (Python 3)
cd ki-creative-lab
python -m http.server 8000

# Oder Node.js
npx serve .

# Oder PHP
php -S localhost:8000
```

### Schritt 5: Schulserver-Deployment
- Alle Dateien auf den Schulserver kopieren
- Oder als ZIP an Schüler verteilen für lokalen Start

---

## 11. BEWERTUNGSKRITERIEN

| Kriterium | Gewichtung | Beschreibung |
|-----------|------------|--------------|
| Kreativität & Innovation | 25% | Wie originell und innovativ ist das Projekt? |
| KI-Nutzung & Prompt-Qualität | 25% | Effektiver Einsatz von KI-Tools, Qualität der Prompts |
| Technische Umsetzung | 20% | Code-Qualität, Responsiveness, Performance |
| Präsentation & Kommunikation | 15% | Klare Erklärung der KI-Workflows |
| Teamarbeit & Rollenverteilung | 15% | Zusammenarbeit, klare Rollen |

---

## 12. ZUSAMMENFASSUNG

Diese Spezifikation enthält:
- **Vollständige CSS-Architektur** (ITCSS + BEM, Mobile First)
- **10 JavaScript-Module** (ES6, Event Delegation, LocalStorage)
- **Semantisches HTML** mit Accessibility (ARIA, Keyboard-Navigation)
- **42 SVG-Icons** im Sprite-Format
- **9 Projekt-Briefings** mit Agent-Chains
- **Nano Banana Prompts** für alle Bilder
- **Komplette Implementierungs-Anleitung**

**Gesamtumfang:** 42 Dateien, ca. 3.000 Zeilen Code, vollständig autark, lokal startbar.

**Nächste Schritte:**
1. Dateien in VS Code erstellen (mit Kimi Code)
2. Bilder mit Nano Banana generieren
3. Lokal testen
4. Auf Schulserver deployen oder als ZIP verteilen

---

*Erstellt: 27. Juni 2026*
*Für: HTL Traun - Medientechnik - KI-Creative Lab Workshop*
*Autor: Silvio Manuel | pantam.at*
