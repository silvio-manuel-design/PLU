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
  auf OKLCH-Basis (Dark first, light-dark() mit Fallback), i18n-Engine 1:1 aus
  js-modern portiert (de/en Start-Dictionary), PROJEKT.md, DE/EN-Smoke-Tests in `labs/`.
