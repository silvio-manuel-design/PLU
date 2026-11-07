# PLU Design System

> **Visuelle Sprache, Design Tokens & Farbpsychologie** für alle PLU-Tutorials  
> **Basis:** ITCSS-Architektur mit `@layer`  
> **Referenz-Implementierung:** `pansonic-video-lab/css/`

---

## 🎯 Design-Philosophie

PLU-Tutorials folgen einem **einheitlichen, aber anpassbaren** Design-System:

- **Dark Mode First** — Primär dunkles Theme, Light Mode als Alternative
- **Cinematic** — Filmische Ästhetik mit Gradienten, Glows, Tiefen
- **Accessible** — WCAG 2.1 AA Kontrast, Screenreader-Support, Keyboard-Navigation
- **Mobile-First** — Primärer Use-Case ist Smartphone (da Inhalte oft mobile Skills lehren)
- **Gamified** — Subtile Gamification-Elemente (Progress-Ringe, Badges, Checklisten)

---

## 🎨 Farbpsychologie & Semantik

### Primärfarben

| Farbe | Hex-Token | Psychologische Wirkung | Verwendung |
|-------|-----------|------------------------|------------|
| **Coral** | `#FF5A5A` | Energie, Dringlichkeit, Aktion | Primäre CTAs, Links, Hover-States |
| **Teal** | `#00D4AA` | Klarheit, Wachstum, Fortschritt | Progress-Bars, Erfolgs-States, Akzente |
| **Gold** | `#FFD700` | Exzellenz, Belohnung, Prestige | Achievements, Abzeichen, Highlights |
| **Violet** | `#8B5CF6` | Kreativität, Innovation, KI | KI-Module, Premium-Content, Innovation |

### Warum diese Farben?

#### Coral (`#FF5A5A`)
- **Warm & auffällig** — zieht die Aufmerksamkeit auf primäre Aktionen
- **Emotional** — assoziiert mit Energie und Handlungsdrang
- **Aber:** Nicht für Success-States verwenden (rote Haken = kontraintuitiv)

#### Teal (`#00D4AA`)
- **Beruhigend & vertrauensvoll** — ideal für Lern-Fortschritt
- **Natürlich** — assoziiert mit Wachstum und positiver Entwicklung
- **Gut für Checklisten** — grüne Haken sind universell verständlich

#### Gold (`#FFD700`)
- **Belohnung & Exzellenz** — aktiviert intrinsische Motivation
- **Premium-Gefühl** — hebt besondere Erfolge hervor
- **Sparingly verwenden** — zu viel Gold entwertet die Wirkung

#### Violet (`#8B5CF6`)
- **Kreativität & Zukunft** — perfekt für KI- und Innovations-Module
- **Intellektuell** — assoziiert mit Weisheit und Technologie

### Farb-Entscheidungen (Historie)

| Entscheidung | Vorher | Nachher | Begründung |
|--------------|--------|---------|------------|
| Checklisten-Haken | Coral `#FF5A5A` | Success-Grün `#2ecc71` | Grüne Haken = universelles Success-Symbol. Rote Haken = kontraintuitiv |
| Checklisten-Glow | Coral-Glow | Success-Glow | Konsistenz mit Success-Farbe |
| Checklisten-Streichung | Rot 2px | Grau 1px | Weniger aggressiv, subtiler |
| Progress-Bar | Coral | Teal | Fortschritt = Wachstum = Grün/Teal |
| CTA "Mission starten" | Standard | Gold + Social Proof | Gold aktiviert Belohnungserwartung |

### Emotionaler Farb-Map

```
Erfolg/Positiv  →  Teal (#00D4AA) + Success-Grün (#2ecc71)
Aktion/CTA      →  Coral (#FF5A5A)
Belohnung/High  →  Gold (#FFD700)
KI/Innovation   →  Violet (#8B5CF6)
Warnung         →  Orange (#F59E0B)
Fehler          →  Rot (#EF4444)
Info            →  Blau (#3B82F6)
```

---

## 🧮 Design Tokens

### Farb-Tokens

```css
/* === Primärfarben === */
--video-accent-coral: #FF5A5A;
--video-accent-coral-dim: rgba(255, 90, 90, 0.1);
--video-accent-coral-glow: rgba(255, 90, 90, 0.3);

--video-accent-teal: #00D4AA;
--video-accent-teal-dim: rgba(0, 212, 170, 0.1);
--video-accent-teal-glow: rgba(0, 212, 170, 0.3);

--video-accent-gold: #FFD700;
--video-accent-gold-dim: rgba(255, 215, 0, 0.1);
--video-accent-gold-glow: rgba(255, 215, 0, 0.3);

--video-accent-violet: #8B5CF6;
--video-accent-violet-dim: rgba(139, 92, 246, 0.1);
--video-accent-violet-glow: rgba(139, 92, 246, 0.3);

/* === Semantische Farben === */
--video-accent-success: #2ecc71;
--video-accent-success-dim: rgba(46, 204, 113, 0.1);
--video-accent-success-glow: rgba(46, 204, 113, 0.3);

--video-accent-warning: #F59E0B;
--video-accent-error: #EF4444;
--video-accent-info: #3B82F6;

/* === Hintergründe === */
--video-bg-base: #0a0c10;
--video-bg-elevated: #13161f;
--video-bg-surface: #1a1e2e;
--video-bg-overlay: rgba(0, 0, 0, 0.7);

/* === Text === */
--video-text-primary: #e8eef1;
--video-text-secondary: #8b949e;
--video-text-tertiary: #6e7681;
--video-text-inverse: #0a0c10;

/* === Border === */
--video-border-subtle: rgba(255, 255, 255, 0.06);
--video-border-default: rgba(255, 255, 255, 0.1);
--video-border-success: rgba(46, 204, 113, 0.3);
```

### Typografie-Tokens

```css
/* === Schriftfamilie === */
--video-font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--video-font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* === Schriftgrößen === */
--video-text-xs: 0.75rem;    /* 12px — Caption, Labels */
--video-text-sm: 0.875rem;   /* 14px — Secondary Text */
--video-text-md: 1rem;       /* 16px — Body (Base) */
--video-text-lg: 1.125rem;   /* 18px — Lead Paragraph */
--video-text-xl: 1.25rem;    /* 20px — Subheadings */
--video-text-2xl: 1.5rem;    /* 24px — H3 */
--video-text-3xl: 1.875rem;  /* 30px — H2 */
--video-text-4xl: 2.25rem;   /* 36px — H1 (Mobile) */
--video-text-5xl: 3rem;      /* 48px — H1 (Desktop) */

/* === Schriftgewichte === */
--video-font-weight-normal: 400;
--video-font-weight-medium: 500;
--video-font-weight-semibold: 600;
--video-font-weight-bold: 700;

/* === Zeilenhöhen === */
--video-line-height-tight: 1.25;
--video-line-height-normal: 1.5;
--video-line-height-relaxed: 1.75;
```

### Abstand-Tokens (Spacing)

```css
/* === Abstand-Skala (8px Basis) === */
--video-space-1: 0.25rem;   /* 4px */
--video-space-2: 0.5rem;    /* 8px */
--video-space-3: 0.75rem;   /* 12px */
--video-space-4: 1rem;      /* 16px */
--video-space-5: 1.25rem;   /* 20px */
--video-space-6: 1.5rem;    /* 24px */
--video-space-8: 2rem;      /* 32px */
--video-space-10: 2.5rem;   /* 40px */
--video-space-12: 3rem;     /* 48px */
--video-space-16: 4rem;     /* 64px */
--video-space-20: 5rem;     /* 80px */
--video-space-24: 6rem;     /* 96px */
```

### Radius-Tokens

```css
--video-radius-sm: 4px;
--video-radius-md: 8px;
--video-radius-lg: 12px;
--video-radius-xl: 16px;
--video-radius-2xl: 24px;
--video-radius-full: 9999px;
```

### z-Index-Tokens

```css
--video-z-base: 0;
--video-z-dropdown: 100;
--video-z-sticky: 200;
--video-z-modal: 300;
--video-z-popover: 400;
--video-z-toast: 500;
```

**Wichtig:** Nie Magic Numbers verwenden. Immer Tokens nutzen:

```css
/* ✅ Richtig */
.video-modal {
  z-index: var(--video-z-modal);
}

/* ❌ Falsch */
.video-modal {
  z-index: 9999;
}
```

---

## 🌗 Dark / Light Mode

### Dark Mode (Default)

```css
--video-bg-base: #0a0c10;
--video-bg-elevated: #13161f;
--video-text-primary: #e8eef1;
--video-text-secondary: #8b949e;
```

### Light Mode

```css
[data-theme="light"] {
  --video-bg-base: #f5f5f5;
  --video-bg-elevated: #ffffff;
  --video-text-primary: #1a1a1a;
  --video-text-secondary: #666666;
}
```

### Theme-Toggle

```javascript
// theme.js
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}
```

**Wichtig:** `data-theme="light"` wird auf `<html>` gesetzt, nicht auf `<body>`, damit CSS-Variablen global verfügbar sind.

---

## 📐 Responsive Breakpoints

| Name | Wert | Typische Nutzung |
|------|------|-----------------|
| **xs** | 320px | Kleinstes Mobile (iPhone SE) |
| **sm** | 480px | Mobile (Standard-Smartphone) |
| **md** | 768px | Tablet / Mobile Landscape |
| **lg** | 1024px | Desktop |
| **xl** | 1200px | Breiter Desktop |
| **xxl** | 1440px | Ultra-wide / MacBook Pro |

### Breakpoint-Nutzung

```css
/* Mobile-First: Basis-Styles für Mobile */
.video-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--video-space-4);
}

/* Tablet */
@media (min-width: 768px) {
  .video-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .video-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--video-space-6);
  }
}
```

**Hinweis:** Breakpoints sind in Tokens dokumentiert, aber in `@media`-Queries **hardcodiert** (CSS Custom Properties funktionieren nicht in Media Queries).

---

## 🎭 Modul-Akzent-Farben

Jedes Modul im Video Lab hat eine eigene Akzentfarbe (`--module-accent`), die dynamisch über JavaScript gesetzt wird:

```javascript
// Im Modul-HTML
<body data-module="m01" style="--module-accent: #FF5A5A;">
```

### Video Lab Modul-Farben

| Modul | Farbe | Hex |
|-------|-------|-----|
| M00 Willkommen | Gold | `#FFD700` |
| M01 Kamera | Coral | `#FF5A5A` |
| M02 Licht | Orange | `#F59E0B` |
| M03 Komposition | Teal | `#00D4AA` |
| M04 Schnitt | Blau | `#3B82F6` |
| M05 Farbe | Magenta | `#EC4899` |
| M06 Audio | Grün | `#10B981` |
| M07 Motion | Violet | `#8B5CF6` |
| M08 KI | Indigo | `#6366F1` |
| M09 Export | Cyan | `#06B6D4` |
| M10 Storytelling | Rot | `#EF4444` |
| M11 Capstone | Gold | `#FFD700` |

### Für neue Tutorials

Wähle ein konsistentes Farbschema für deine Module:

```css
/* Beispiel: Fotografie-Tutorial */
[data-module="f01"] { --module-accent: #FF6B35; }  /* Belichtung */
[data-module="f02"] { --module-accent: #004E89; }  /* Blende */
[data-module="f03"] { --module-accent: #1A936F; }  /* ISO */
```

---

## ♿ Accessibility (a11y)

### Kontrast-Anforderungen

| Element | Mindest-Kontrast | Beispiel |
|---------|-----------------|----------|
| Normaler Text | 4.5:1 | `#e8eef1` auf `#0a0c10` = 14.8:1 ✅ |
| Großer Text (≥18pt) | 3:1 | `#8b949e` auf `#0a0c10` = 7.2:1 ✅ |
| UI-Komponenten | 3:1 | Buttons, Formularfelder |

### Fokus-Indikatoren

```css
/* ✅ Sichtbarer Fokus-Ring */
.video-btn:focus-visible {
  outline: 2px solid var(--video-accent-coral);
  outline-offset: 2px;
}

/* ❌ Nie outline: none ohne Ersatz */
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Screenreader

```html
<!-- ✅ ARIA-Labels für Icon-Buttons -->
<button aria-label="Menü öffnen">
  <i class="ph ph-list" aria-hidden="true"></i>
</button>

<!-- ✅ Semantische HTML-Struktur -->
<nav aria-label="Hauptnavigation">...</nav>
<main>...</main>
<footer>...</footer>
```

---

## 🎮 Gamification-Design

### Progress-Ring

```
┌─────────┐
│    ╭──╮ │
│   ╱ 14 ╲│  ← Modul-Nummer in der Mitte
│  │ ════ │  ← Fortschrittsring (SVG stroke-dasharray)
│   ╲    ╱│
│    ╰──╯ │
└─────────┘
```

- **Ring-Farbe:** Modul-Akzent oder Teal
- **Hintergrund:** `--video-bg-elevated`
- **Animation:** Smooth stroke-dashoffset Transition

### Checklisten-Design

| State | Hintergrund | Border | Checkbox | Text |
|-------|-------------|--------|----------|------|
| **Default** | Transparent | `--video-border-default` | Empty | `--video-text-primary` |
| **Checked** | `--video-accent-success-dim` | `--video-border-success` | Grün + Glow | Durchgestrichen, Grau |
| **Completed** | Gold-Dim | Gold | — | — |

### Achievement-Badges

- **Gold-Badge:** `--video-accent-gold` mit Glow
- **Form:** Kreis oder Stern
- **Größe:** 48px–64px
- **Animation:** Subtiles Pulse bei Erhalt

---

## 📦 Für neue Tutorials: Token-Anpassung

### Minimaler Token-Satz

Für ein neues Tutorial brauchst du mindestens diese Tokens:

```css
/* tutorials/fotografie/css/00-settings/foto-tokens.css */

:root {
  /* === Primärfarbe (wähle EINE Hauptfarbe) === */
  --foto-accent: #FF6B35;
  --foto-accent-dim: rgba(255, 107, 53, 0.1);
  --foto-accent-glow: rgba(255, 107, 53, 0.3);

  /* === Hintergründe === */
  --foto-bg-base: #0a0c10;
  --foto-bg-elevated: #13161f;
  --foto-bg-surface: #1a1e2e;

  /* === Text === */
  --foto-text-primary: #e8eef1;
  --foto-text-secondary: #8b949e;

  /* === Abstände (kannst du von Video Lab übernehmen) === */
  --foto-space-1: 0.25rem;
  --foto-space-2: 0.5rem;
  --foto-space-4: 1rem;
  --foto-space-8: 2rem;

  /* === Schrift === */
  --foto-font-family: 'Inter', sans-serif;
  --foto-text-md: 1rem;
  --foto-text-lg: 1.125rem;
}

[data-theme="light"] {
  --foto-bg-base: #f5f5f5;
  --foto-bg-elevated: #ffffff;
  --foto-text-primary: #1a1a1a;
  --foto-text-secondary: #666666;
}
```

### Token-Namenskonvention

```
--{prefix}-{kategorie}-{eigenschaft}

Beispiele:
--video-accent-coral          /* Video Lab, Akzent, Coral */
--video-bg-base               /* Video Lab, Hintergrund, Basis */
--video-text-primary          /* Video Lab, Text, Primär */
--video-space-4               /* Video Lab, Abstand, 4 (16px) */
--foto-accent                 /* Fotografie, Akzent */
--foto-bg-base                /* Fotografie, Hintergrund, Basis */
```

---

## 🔗 Verwandte Dokumente

- `01-ARCHITECTURE.md` — Gesamtarchitektur & Vite-Bundling
- `03-TUTORIAL-AUTHORING-GUIDE.md` — Schritt-für-Schritt Tutorial erstellen
- `04-VIDEO-LAB-REFERENCE.md` — Referenz-Implementierung im Detail
