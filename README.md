PANTAM LEARNING UNIVERSE (PLU)

> **„Mit KI denken. Menschlich handeln."**  
> *"Learn to think with AI. Act human."*

[![Code: MIT](https://img.shields.io/badge/Code-MIT-blue.svg)](LICENSE)
[![Content: CC BY-NC-SA 4.0](https://img.shields.io/badge/Content-CC%20BY--NC--SA%204.0-lightgrey.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)]()

---

## 📖 Was ist PLU?

**PANTAM Learning Universe** ist eine Open-Source-Bildungsplattform für KI-Grundlagen, Webentwicklung und Medientechnik — altersgerecht, barrierefrei und bilingual (DE/EN).

Die Plattform vereint:
- 🎓 **KI-Akademien** — Junior, Senior & Premium (KI-Grundlagen für verschiedene Altersgruppen)
- 🎬 **Pansonic Video Lab** — Ein videobasiertes Referenzprojekt mit akademischer Code-Struktur (ITCSS, BEM, Vite, ES6-Module)
- 💻 **Tutorials** — HTML/CSS, JavaScript, Backend, Grafik & Audio

---

## 🏗️ Projektstruktur

```
PLU Future/
├── .htaccess              # Apache-Konfiguration (Server-Root)
├── index.html             # Preloader / Redirect → /tutorials/
├── 404.html / 404-en.html # Fehlerseiten
├── LICENSE                # Dual-Lizenz: MIT (Code) + CC BY-NC-SA 4.0 (Content)
├── AGENTS.md              # Entwickler-Dokumentation & Konventionen
│
└── tutorials/
    ├── index.html         # PLU Plattform-Homepage
    ├── css/               # Shared Design System (Tokens, Reset, Layout)
    ├── js/                # Shared JS-Module (Theme, Navigation, etc.)
    ├── assets/            # Shared Assets (Logos, Bilder, Fonts)
    ├── pages/             # Shared Pages (Lexikon, Vision, Spenden, etc.)
    │
    ├── pansonic-video-lab/  🎬 Referenzprojekt
    │   ├── module/          # 12 DE + 12 EN Module
    │   ├── pages/           # Glossar, Bibliothek, Player
    │   ├── tools/           # Interaktive Tools (DaVinci, Shotcut, etc.)
    │   ├── css/             # ITCSS-Architektur mit @layer
    │   ├── js/              # ES6-Module (keine Inline-Scripts)
    │   └── assets/          # Modul-spezifische Assets
    │
    ├── ki-academy-senior/   🎓 KI-Akademie Senior
    ├── ki-academy-junior/   🎓 KI-Akademie Junior
    ├── ki-academy-premium/  🎓 KI-Akademie Premium
    │
    ├── html-css-classic/    💻 HTML/CSS Tutorials
    ├── js-classic/          💻 JavaScript Tutorials
    ├── backend-training/    💻 Backend Tutorials
    ├── backend-modern/      💻 Moderne Backend-Tutorials
    ├── grafik-training/     🎨 Grafik-Tutorials
    ├── grafik-modern/       🎨 Moderne Grafik-Tutorials
    ├── audio-training/      🎵 Audio-Tutorials
    └── js/                  💻 JS-Tutorials
```

---

## 🚀 Technologie-Stack

| Bereich | Technologie |
|---------|-------------|
| **Build** | [Vite](https://vitejs.dev/) — Ultra-schnelles Bundling |
| **CSS** | ITCSS + `@layer` + Design Tokens + BEM |
| **JS** | Vanilla ES6-Module (0% Inline-Scripts) |
| **Icons** | [Phosphor Icons](https://phosphoricons.com/) (MIT) |
| **Fonts** | Google Fonts (SIL Open Font License) |
| **Server** | Apache (`.htaccess`) |

---

## 🛠️ Lokale Entwicklung

### Voraussetzungen
- [Node.js](https://nodejs.org/) ≥ 18
- Ein lokaler Webserver (Python, Node oder PHP)

### Schnellstart

```bash
# Repository klonen
git clone https://github.com/dein-username/plu-platform.git
cd plu-platform

# Abhängigkeiten installieren (für pansonic-video-lab)
cd tutorials/pansonic-video-lab
npm install

# Dev-Server starten
npm run dev
# oder
python -m http.server 8080
# oder
npx serve . -p 8080
```

Dann öffnen: `http://localhost:8080/tutorials/`

> ⚠️ **Wichtig:** Root-relative Pfade (`/tutorials/...`) funktionieren nur mit einem lokalen Webserver, nicht mit `file://`.

---

## 🎓 Pansonic Video Lab — Referenzprojekt

Das **Pansonic Video Lab** ist unser akademisches Referenzprojekt und dient als Template für zukünftige Tutorials:

- ✅ **ITCSS-Architektur** mit `@layer` (tokens → utilities)
- ✅ **BEM-Konvention** mit konsistentem Prefix-System
- ✅ **0 Inline-Scripts** — alles über ES6-Module
- ✅ **Bi-lingual** (DE/EN) mit hreflang & Canonical URLs
- ✅ **Accessibility** — Skip-Links, ARIA, Focus-Management
- ✅ **Dark/Light Mode** mit Design Tokens
- ✅ **Mobile-First** mit Bottom Action Bar
- ✅ **Vite-Bundle** mit gzip/brotli Precompression

📁 Siehe `tutorials/pansonic-video-lab/` für die vollständige Implementation.

---

## 📜 Lizenz

Dieses Projekt verwendet eine **Dual-Lizenz**:

| Bereich | Lizenz | Link |
|---------|--------|------|
| **Code** (JS, CSS, HTML-Struktur) | MIT | [LICENSE](LICENSE) |
| **Content** (Texte, Bilder, Videos, Curriculum) | CC BY-NC-SA 4.0 | [LICENSE](LICENSE) |

---

## 🤝 Mitwirken

Wir freuen uns über Beiträge! Bitte beachte:

1. **AGENTS.md lesen** — Entwicklungskonventionen & Projektstruktur
2. **Keine Inline-Scripts** — Alle Interaktivität über ES6-Module
3. **BEM + Prefix** — CSS-Klassen mit `video-*`, `sim-*`, `o-*`, etc.
4. **Barrierefreiheit** — ARIA-Labels, Keyboard-Navigation, Farbkontrast

Für größere Änderungen bitte vorher ein Issue öffnen.

---

## 🙏 Danksagung

- [Phosphor Icons](https://phosphoricons.com/) — Open-Source-Icon-Library
- [Vite](https://vitejs.dev/) — Next-Generation Frontend Tooling
- [Google Fonts](https://fonts.google.com/) — Open-Source-Schriften

---

<p align="center">
  <strong>PANTAM LEARNING UNIVERSE</strong><br>
  <em>Mit KI denken. Menschlich handeln.</em>
</p>
