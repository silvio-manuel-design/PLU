# PROJEKT.md — js-classic 2.0

> Satellit im PLU-Mono-Repo. Verbindliche Arbeitsregeln für alle Agenten
> (Kimi Code) und Menschen (Martin) am JS-Grundkurs. Änderungen nur im
> Rahmen der Pakete (siehe Paket-Log).

## Zweck

`js-classic` ist der lehrergeführte JavaScript-Grundkurs der PLU (HTBLA/Fachschule
Traun, 2. Schuljahr) — zehn Kapitel von der ersten Ausgabe bis zu Events, bilingual
DE/EN. Dieses Dokument fixiert den technischen Standard des Relaunchs „js-classic 2.0".

## Stack & Befehle

| Bereich | Standard |
|---|---|
| Build | Vite 7 (Multi-Page), `base: '/tutorials/js-classic/'` |
| JS | Vanilla ES-Module, ein Modul pro `data-component`, kein Framework, kein Tailwind, **keine CDNs** |
| Fonts/Icons | Inter Variable + Phosphor, lokal via npm (`@fontsource-variable/inter`, `@phosphor-icons/web`) |
| CSS | ITCSS + `@layer`, Design-Tokens `--jsc-*`, BEM mit `jsc-*`-Namespace |

```bash
npm install       # Abhängigkeiten
npm run dev       # Dev-Server → http://localhost:5173/tutorials/js-classic/
npm run build     # Produktions-Build nach dist/
npm run preview   # Build lokal prüfen
```

## Verzeichnis-Architektur

```
tutorials/js-classic/
├── package.json / vite.config.js      # base: '/tutorials/js-classic/'
├── index.html / index-en.html         # Kurs-Homepage (P3)
├── PROJEKT.md                         # dieses Dokument
├── css/
│   ├── js-classic.css                 # ITCSS @layer Import-Hub
│   ├── 00-settings/jsc-tokens.css     # --jsc-* Tokens (OKLCH, Dark first)
│   ├── 01-generic/reset.css
│   ├── 02-layout/ … 03-objects/       # folgt P2/P3
│   ├── 04-components/                 # header, footer, nav, bottom-bar (P2)
│   ├── 05-components/                 # checklist, reflection, quiz,
│   │                                  # code-block, prompt-card, rubric,
│   │                                  # worksheet, media-embed,
│   │                                  # solution-gate, mistake-card (P4/P5)
│   ├── 06-pages/chapter.css           # (P3/P4)
│   ├── 07-animations/ … 08-modes/ … 09-utilities/
├── js/
│   ├── entry-global.js                # theme, navigation, i18n, progress
│   ├── entry-chapter.js               # + checklist, reflection, quiz, demos
│   ├── entry-exercise.js              # + rubric, worksheet, prompt-trainer
│   ├── modules/
│   │   ├── i18n.js                    # 1:1-Port aus js-modern (DE/EN, RTL-ready)
│   │   ├── theme.js / navigation.js / storage.js / progress.js
│   │   ├── checklist.js / reflection.js / quiz.js
│   │   ├── playground.js              # Kapitel-Demos (ersetzt onclick)
│   │   ├── rubric.js
│   │   └── solution-gate.js
│   └── i18n/                          # de.js / en.js (UI-Chrome-Strings)
├── kapitel/                           # 01–10 DE + EN (Ordnername BLEIBT)
├── uebungen/                          # technisch neu, URLs stabil
├── abschluss/                         # 3 Capstone-Projekte
├── musterloesungen/                   # hinter solution-gate
├── arbeitsblaetter/                   # integrierte Arbeitsblatt-Seiten (P8)
├── pages/                             # ki-grundlagen, vscode, bibliothek, info
├── labs/                              # Smoke-Tests (P1, temporär)
└── assets/
```

## Verbindliche Regeln

1. **ITCSS:** Jede Datei in genau einem Layer, Import ausschließlich über den Hub
   `css/js-classic.css`. Eine Datei pro Komponente.
2. **BEM mit `jsc-*`-Namespace** (`jsc-komponente__element--modifier`). Generische
   Klassennamen (`.header`, `.modal`, `.checklist`) sind verboten — sie kollidieren
   über Satelliten-Grenzen hinweg.
3. **0 Inline-Scripts, 0 Inline-Eventhandler.** Interaktivität ausschließlich über
   ES-Module, gehangen an `data-*`-Attribute.
4. **Root-relative Pfade** (`/tutorials/...`) für Ressourcen — Schul-Proxys blockieren
   `../`-Traversierung. Vite-Imports relativ.
5. **Dark first via `data-theme`:** Default = Dark ohne Attribut; Light nur via
   `html[data-theme="light"]`. Tokens (00-settings) sind die einzige Farbquelle.
6. **Mobile-first**, Breakpoints 360/768/1024/1440 (Media Queries hardcoden,
   Werte in Tokens dokumentieren).
7. **i18n-Zwei-System:** Langtexte = eigene HTML-Datei pro Sprache mit
   hreflang/canonical; UI-Chrome = `data-i18n`-Dictionary (Engine `js/modules/i18n.js`,
   localStorage-Key `plu-language` — PLU-weit konsistent, nie ändern).
8. **Bild-Pipeline:** AVIF + WebP + JPG, `<picture>` mit srcset/sizes/width/height;
   Raster 480/800/1200 (Karten) und 768/1440/2560 (Hero/Sektionen);
   `loading="lazy"` below the fold, `fetchpriority="high"` nur am Hero.
9. **a11y:** Skip-Links, WCAG-AA-Kontrast (Token-Werte sind belegt), vollständige
   Keyboard-Bedienung, `prefers-reduced-motion` respektieren.
10. **SoTA-2026-Policy:** Kern = Baseline *widely available*. Enhancements
    (Cross-Document View Transitions, Speculation Rules, Scroll-driven Animations,
    `:has()`, Container Queries, `light-dark()` mit Fallback, Popover/`@starting-style`)
    nur mit `@supports`-Fallback — Inhalt muss ohne Enhancement vollständig
    funktionieren. Keine Frameworks, kein Tailwind, keine CDNs.
11. **Git:** Conventional Commits, genau ein Commit pro Paket, Feature-Branches
    `feature/pN-kurzname`; kein Force-Push auf `main`; PROJEKT.md-Nachtrag gehört
    zum Paket-Commit.
12. **QA je Paket:** `npm run build` exit 0, 0 Konsolen-Fehler, Screenshots an allen
    Breakpoints (360/768/1024/1440), DE+EN-Check, Kontrast-Beleg bei Token-Änderungen.

## Site-Chrome & Komponenten-Vertrag

**Rendering-Vertrag (verbindlich):** Seiten binden Header, Footer und Bottom-Bar
künftig ausschließlich über `<div data-component="jsc-site-chrome"></div>` im Markup
plus `entry-global.js` — kein kopiertes Chrome-Markup mehr (behebt den Befund
„Header in 25+ Dateien dupliziert"). Der Chrome wird aus der zentralen
Navigationsdatenquelle `js/data/nav.js` gerendert; sämtliche Labels kommen aus den
i18n-Dictionaries.

- **Nav-Datenquelle:** `js/data/nav.js` (`NAV`, `chaptersMeta`, `infoPages`) —
  liefert gleichzeitig die Prev/Next-Sequenz der Bottom-Bar (Reihenfolge = Kurssequenz).
- **Theme-Key:** `jsc-theme` in localStorage (via `js/modules/storage.js`,
  Namespace `jsc-`). Dark ist Default ohne Attribut; kein `prefers-color-scheme`-Auto-Switch.
- **Sprach-Switcher:** verlinkt aufs hreflang-Pendant der Seite; ohne Pendant ausgeblendet.
- **Neuer Token `--jsc-color-accent-ink`** (`#8A7500`, 4.54:1 auf Light): verbindlich für
  Akzent-**Normaltext** auf Light (kleine Labels/Links). `accent-strong` bleibt für große
  Texte/Flächen, reines `accent` auf Light nur für Flächen/Glow/Icons.
- **Interaktionen:** Dropdowns = Disclosure-Pattern (Button `aria-expanded`,
  Pfeiltasten, Escape, Tab-raus-schließt; States per `:has()` am Wrapper — §5.9);
  Kapitelübersicht = `<dialog>` mit Focus-Trap, Backdrop-Klick und Return-of-Focus.

## Fonts & Design-DNA

- **Schriftarten lokal via Fontsource** (kein CDN, kein Google-Fonts-Request):
  Display = Poppins (`@fontsource/poppins`, statische Gewichte 400/600/700 —
  ein Variable-Paket existiert im Registry nicht), Text = Inter Variable,
  Code/Mono = JetBrains Mono Variable. Token: `--jsc-font-display`,
  `--jsc-font-sans`, `--jsc-font-mono` (Fallback-Stacks deklariert, font-display: swap).
- **Button-System** (`05-components/button.css`): `.jsc-button` als Pill, Größen
  `sm/md/lg`, Varianten `primary` (Gold-Gradient), `accent` (Teal), `ghost`, `outline`;
  Hover/Focus `-2px` + Glow (Reduced Motion: nur Farbe/Glow). Neubuttons immer hierauf aufbauen.
- **Back-to-Top** (`js/modules/back-to-top.js` + `05-components/back-to-top.css`):
  erscheint nach ~1 Viewport Scrollen, smooth nach oben (Reduced Motion: auto),
  Label via `ui.backToTop`.
- **Header-Action-Cluster:** Theme/Sprache als gleichhohe Icon-Buttons (`.jsc-icon-btn`),
  slot-basiert — ein dritter Action-Button (Classroom-Mode) ist später ohne Umbau einsetzbar.
  Classroom-Mode selbst ist ein eigenes späteres Paket.

## Fortschritt & Speicher-Schema

**Kapitel-Fortschritt** (`js/modules/progress.js`, verbindliches Schema):

- localStorage-Key `jsc-progress` (via `storage.js`, Namespace-Präfix `jsc-`), JSON:
  `{ "chapters": { "01": true, … } }`
- API: `isDone(nr)` · `markDone(nr)` · `unmarkDone(nr)` · `doneCount()`
- Jede Änderung feuert `window.dispatchEvent(new CustomEvent('plu:progress'))` —
  UI-Komponenten (z. B. Karten-Ringe) lauschen und aktualisieren live.
- `progress.js`/`home.js` setzen **kein** `documentElement lang/dir` — Seitensprache steht
  authored im HTML; die i18n-Engine steuert ausschließlich Chrome-Strings.

Weitere Speicher-Keys: `jsc-theme` (Theme, siehe Site-Chrome), `plu-language` (i18n, PLU-weit).

## Bild-Ablage

- Ablage: `assets/img/<bereich>/` (Homepage: `assets/img/home/`).
- Pipeline-Standard (Pilsl): AVIF + WebP + JPG, Raster 768/1440/2560 (Hero/Sektionen)
  bzw. 480/800/1200 (Karten); `<picture>` mit AVIF→WebP→JPG, `srcset` + `sizes`,
  `width`/`height` immer gesetzt (kein CLS).
- Hero: `fetchpriority="high"`, ohne `loading` (eager). Alles below the fold:
  `loading="lazy"`. Beim Server-Deploy: EXIF/Cache-Header beachten.

## QA-Gates

- `vite build` exit 0; Smoke-/Kapitel-Seiten rendern DE + EN.
- 0 Konsolen-Fehler, 0 Inline-Scripts (Grep-Nachweis).
- `git diff main...HEAD --name-only` = ausschließlich Dateien des Pakets.
- Kontrast WCAG AA (Tabelle im Paket-Report bei neuen/geänderten Farben).

## Paket-Log

- **P0** (07.11.2026): PLU als Mono-Repo auf GitHub gebracht — Frisch-Start mit sauberem
  Initial-Commit, `.gitignore`/`.gitattributes`, i18n-fähiger Basis; `main` public,
  Workflow-Doku `docs/08-GITHUB-WORKFLOW.md`.
- **P1** (07.11.2026): Technisches Fundament js-classic 2.0 — Vite-7-Setup
  (Multi-Page, lokale Fonts/Icons), ITCSS-Layer-Gerüst (00–09), `jsc-tokens.css`
  auf OKLCH-Basis (Dark first, Override-Fallback statt light-dark()), i18n-Engine 1:1 aus
  js-modern portiert (de/en Start-Dictionary), PROJEKT.md, DE/EN-Smoke-Tests in `labs/`.
- **P2** (07.11.2026): Site-Chrome-Fundament — zentrale Nav-Datenquelle
  (`js/data/nav.js`), Dictionary-Erweiterung (Nav/A11y), Module storage/theme/navigation
  (Persistenz `jsc-theme`, Disclosure-Dropdowns, TOC-Dialog mit Focus-Trap, Skip-Links,
  hreflang-Sprach-Switcher), Chrome-CSS in Layer 02/03/04/09, neuer Token
  `--jsc-color-accent-ink` für Akzent-Normaltext auf Light (4.54:1), P1-Nachzüger
  (package-lock-Regel in `tutorials/.gitignore` dauerhaft gefixt).
- **P3** (08.11.2026): Homepage DE+EN — Hero (full-bleed `<picture>`, Overlay-Gradient,
  CTAs), Kursübersicht mit Fortschrittsringen aus `chaptersMeta` (clientseitig gerendert,
  `<ol>`-Mount bleibt valides leeres HTML ohne JS), Lernziele, KI-Teaser; neue Module
  `progress.js` (`jsc-progress`-Schema + `plu:progress`-Event) und `home.js`; Hero-Bilder
  (18 Assets, AVIF/WebP/JPG × 768/1440/2560) unter `assets/img/home/`. Erste
  Bestandsdatei-Ersetzung: `index.html` (Altstand bleibt im Git-Verlauf).
- **P3R** (08.11.2026): Homepage-Revision auf Bildwelt v2 „Dark-Neon-Pro" (B12) —
  Assets v1/v3 → w4 (Hero) + w1 (KI-Teaser), Roboter-Alt-Texte ersetzt; Design-DNA:
  Poppins/Inter/JetBrains Mono lokal, Button-System (4 Varianten), Back-to-Top,
  Header-Action-Cluster mit Classroom-Slot-Vorbereitung.
