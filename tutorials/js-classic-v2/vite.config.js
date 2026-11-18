import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import * as path from 'node:path';
import { cpSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/tutorials/js-classic-v2/',
  // Dev-Quirk: Vite prependet base auf srcset-/img-URLs, die bereits mit base
  // beginnen → doppelter Pfad im Dev-Served HTML. Der Build bleibt korrekt
  // (einfache Pfade im dist). Diese Middleware normalisiert nur den Dev-Server.
  plugins: [
    {
      name: 'jsc-dev-base-dedup',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url?.startsWith('/tutorials/js-classic-v2/tutorials/js-classic-v2/')) {
            req.url = req.url.replace(
              '/tutorials/js-classic-v2/tutorials/js-classic-v2/',
              '/tutorials/js-classic-v2/'
            );
          }
          next();
        });
      },
    },
    {
      // P9R1: assets/ (Hero-Bilder + Kapitel-Medien) in den Build kopieren —
      // sonst fehlen sie im dist (werden per absolutem Pfad referenziert)
      name: 'jsc-copy-assets',
      closeBundle() {
        cpSync(resolve(__dirname, 'assets'), resolve(__dirname, 'dist/assets'), { recursive: true });
      },
    },
    (() => {
      /* P37: Vite wertet <link rel="alternate" href="..."> als Asset-Referenz
         und biegt sie auf assets/<name>-<hash>.html um (SEO- und Switcher-Bruch).
         Fix: hrefs in den gebauten Seiten auf den relativen Originalpfad
         zurückdrehen und die unverarbeiteten HTML-Duplikate entfernen.
         Umsetzung als closeBundle (fs): Vite schreibt die fertigen HTML-Seiten
         erst NACH generateBundle — das Bundle dient nur der HASH→Original-Auflösung.
         IIFE: Plugin-Kontext ist hook-lokal, Bundle-Referenz per Closure sichern. */
      let htmlOrig = null; // assets/x-HASH.html → originalFileName (dist-relativ)
      return {
        name: 'jsc-hreflang-restore',
        apply: 'build',
        generateBundle(_opts, bundle) {
          /* Mapping VOR dem Löschen aufbauen (Duplikate verschwinden sonst
             aus dem Bundle, bevor closeBundle sie auflösen kann). */
          htmlOrig = new Map();
          for (const [fileName, chunk] of Object.entries(bundle)) {
            const origs = chunk.originalFileNames ||
              (chunk.originalFileName ? [chunk.originalFileName] : []);
            for (const o of origs) {
              if (o.endsWith('.html')) htmlOrig.set(fileName, o);
            }
          }
          for (const [fileName] of Object.entries(bundle)) {
            if (/^assets\/[^/]+-[^/]+\.html$/.test(fileName)) {
              delete bundle[fileName];
            }
          }
        },
        closeBundle() {
          if (!htmlOrig || !htmlOrig.size) return;
          const asPosix = (p) => p.split(path.sep).join(path.posix.sep);
          const toRel = (fromDistRel, toDistRel) =>
            path.posix.relative(path.posix.dirname(fromDistRel), toDistRel);
          const walk = (dir) => {
            const out = [];
            for (const ent of readdirSync(dir, { withFileTypes: true })) {
              const full = path.join(dir, ent.name);
              if (ent.isDirectory()) out.push(...walk(full));
              else if (ent.name.endsWith('.html')) out.push(full);
            }
            return out;
          };
          const distDir = resolve(__dirname, 'dist');
          for (const file of walk(distDir)) {
            const rel = asPosix(path.relative(distDir, file));
            let src = readFileSync(file, 'utf8');
            const fixed = src.replace(
              /(<link[^>]*rel="alternate"[^>]*href=")([^"]+)(")/g,
              (m, pre, href, post) => {
                const hit = href.match(/\/assets\/[^/]+\.html$/);
                if (!hit) return m;
                const hashed = `assets/${hit[0].split('/assets/')[1]}`;
                const orig = htmlOrig.get(hashed);
                return orig ? pre + toRel(rel, orig) + post : m;
              }
            );
            if (fixed !== src) writeFileSync(file, fixed);
          }
        },
      };
    })(),
  ],
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        homeEn: resolve(__dirname, 'index-en.html'),
        ch01: resolve(__dirname, 'kapitel/01-einfuehrung-ausgabe.html'),
        ch01En: resolve(__dirname, 'kapitel/01-introduction-output.html'),
        ch02: resolve(__dirname, 'kapitel/02-variablen.html'),
        ch02En: resolve(__dirname, 'kapitel/02-variables-datatypes.html'),
        ch03: resolve(__dirname, 'kapitel/03-operatoren.html'),
        ch03En: resolve(__dirname, 'kapitel/03-operators.html'),
        ch04: resolve(__dirname, 'kapitel/04-bedingungen.html'),
        ch04En: resolve(__dirname, 'kapitel/04-conditions.html'),
        ch05: resolve(__dirname, 'kapitel/05-schleifen.html'),
        ch05En: resolve(__dirname, 'kapitel/05-loops.html'),
        ch06: resolve(__dirname, 'kapitel/06-arrays.html'),
        ch06En: resolve(__dirname, 'kapitel/06-arrays-lists.html'),
        ch07: resolve(__dirname, 'kapitel/07-funktionen.html'),
        ch07En: resolve(__dirname, 'kapitel/07-functions.html'),
        ch08: resolve(__dirname, 'kapitel/08-objekte.html'),
        ch08En: resolve(__dirname, 'kapitel/08-objects.html'),
        ch09: resolve(__dirname, 'kapitel/09-dom.html'),
        ch09En: resolve(__dirname, 'kapitel/09-the-dom.html'),
        ch10: resolve(__dirname, 'kapitel/10-ereignisse.html'),
        ch10En: resolve(__dirname, 'kapitel/10-events.html'),
        ch11: resolve(__dirname, 'kapitel/11-formulare.html'),
        ch11En: resolve(__dirname, 'kapitel/11-forms.html'),
        ch12: resolve(__dirname, 'kapitel/12-sicherheit.html'),
        ch12En: resolve(__dirname, 'kapitel/12-security.html'),
        info: resolve(__dirname, 'info.html'),
        infoEn: resolve(__dirname, 'info-en.html'),
        vscode: resolve(__dirname, 'vscode.html'),
        vscodeEn: resolve(__dirname, 'vscode-en.html'),
        github: resolve(__dirname, 'github.html'),
        githubEn: resolve(__dirname, 'github-en.html'),
        ki: resolve(__dirname, 'ki-grundlagen.html'),
        kiEn: resolve(__dirname, 'ki-en.html'),
        bibliothek: resolve(__dirname, 'bibliothek.html'),
        bibliothekEn: resolve(__dirname, 'bibliothek-en.html'),
        arbeitsblaetter: resolve(__dirname, 'arbeitsblaetter.html'),
        arbeitsblaetterEn: resolve(__dirname, 'arbeitsblaetter-en.html'),
        lexikon: resolve(__dirname, 'lexikon.html'),
        lexikonEn: resolve(__dirname, 'lexikon-en.html'),
        smokeTest: resolve(__dirname, 'labs/smoke-test.html'),
        smokeTestEn: resolve(__dirname, 'labs/smoke-test-en.html'),
        p2Fundament: resolve(__dirname, 'labs/p2-fundament.html'),
        p2FundamentEn: resolve(__dirname, 'labs/p2-fundament-en.html'),
        /* P35: fehlende Bereiche — dist war unvollständig */
        kapitelIndex: resolve(__dirname, 'kapitel/index.html'),
        kapitelIndexEn: resolve(__dirname, 'kapitel/index-en.html'),
        labsIndex: resolve(__dirname, 'uebungen/index.html'),
        labsIndexEn: resolve(__dirname, 'uebungen/index-en.html'),
        lab01: resolve(__dirname, 'uebungen/lab-01-ausgabe.html'),
        lab01En: resolve(__dirname, 'uebungen/lab-01-ausgabe-en.html'),
        lab02: resolve(__dirname, 'uebungen/lab-02-steckbrief.html'),
        lab02En: resolve(__dirname, 'uebungen/lab-02-steckbrief-en.html'),
        lab03: resolve(__dirname, 'uebungen/lab-03-warenkorb.html'),
        lab03En: resolve(__dirname, 'uebungen/lab-03-warenkorb-en.html'),
        lab04: resolve(__dirname, 'uebungen/lab-04-noten.html'),
        lab04En: resolve(__dirname, 'uebungen/lab-04-noten-en.html'),
        lab05: resolve(__dirname, 'uebungen/lab-05-countdown.html'),
        lab05En: resolve(__dirname, 'uebungen/lab-05-countdown-en.html'),
        lab06: resolve(__dirname, 'uebungen/lab-06-einkaufsliste.html'),
        lab06En: resolve(__dirname, 'uebungen/lab-06-einkaufsliste-en.html'),
        lab07: resolve(__dirname, 'uebungen/lab-07-umrechner.html'),
        lab07En: resolve(__dirname, 'uebungen/lab-07-umrechner-en.html'),
        lab08: resolve(__dirname, 'uebungen/lab-08-mediathek.html'),
        lab08En: resolve(__dirname, 'uebungen/lab-08-mediathek-en.html'),
        lab09: resolve(__dirname, 'uebungen/lab-09-klickzaehler.html'),
        lab09En: resolve(__dirname, 'uebungen/lab-09-klickzaehler-en.html'),
        lab10: resolve(__dirname, 'uebungen/lab-10-reaktion.html'),
        lab10En: resolve(__dirname, 'uebungen/lab-10-reaktion-en.html'),
        lab11: resolve(__dirname, 'uebungen/lab-11-anmeldung.html'),
        lab11En: resolve(__dirname, 'uebungen/lab-11-anmeldung-en.html'),
        lab12: resolve(__dirname, 'uebungen/lab-12-xss-labor.html'),
        lab12En: resolve(__dirname, 'uebungen/lab-12-xss-labor-en.html'),
        projekteIndex: resolve(__dirname, 'projekte/index.html'),
        projekteIndexEn: resolve(__dirname, 'projekte/index-en.html'),
        projekt1: resolve(__dirname, 'projekte/projekt-1-highscore-game.html'),
        projekt1En: resolve(__dirname, 'projekte/projekt-1-highscore-game-en.html'),
        projekt2: resolve(__dirname, 'projekte/projekt-2-formular-meister.html'),
        projekt2En: resolve(__dirname, 'projekte/projekt-2-formular-meister-en.html'),
        projekt3: resolve(__dirname, 'projekte/projekt-3-sicherheits-audit.html'),
        projekt3En: resolve(__dirname, 'projekte/projekt-3-sicherheits-audit-en.html'),
        abschlussIndex: resolve(__dirname, 'abschluss/index.html'),
        abschlussIndexEn: resolve(__dirname, 'abschluss/index-en.html'),
        cap01: resolve(__dirname, 'abschluss/projekt-schul-dashboard.html'),
        cap01En: resolve(__dirname, 'abschluss/projekt-schul-dashboard-en.html'),
        cap02: resolve(__dirname, 'abschluss/projekt-bullet-journal.html'),
        cap02En: resolve(__dirname, 'abschluss/projekt-bullet-journal-en.html'),
        cap03: resolve(__dirname, 'abschluss/projekt-dein-spiel.html'),
        cap03En: resolve(__dirname, 'abschluss/projekt-dein-spiel-en.html'),
      },
    },
  },
});
