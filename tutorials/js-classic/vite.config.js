import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/tutorials/js-classic/',
  // Dev-Quirk: Vite prependet base auf srcset-/img-URLs, die bereits mit base
  // beginnen → doppelter Pfad im Dev-Served HTML. Der Build bleibt korrekt
  // (einfache Pfade im dist). Diese Middleware normalisiert nur den Dev-Server.
  plugins: [
    {
      name: 'jsc-dev-base-dedup',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url?.startsWith('/tutorials/js-classic/tutorials/js-classic/')) {
            req.url = req.url.replace(
              '/tutorials/js-classic/tutorials/js-classic/',
              '/tutorials/js-classic/'
            );
          }
          next();
        });
      },
    },
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
        smokeTest: resolve(__dirname, 'labs/smoke-test.html'),
        smokeTestEn: resolve(__dirname, 'labs/smoke-test-en.html'),
        p2Fundament: resolve(__dirname, 'labs/p2-fundament.html'),
        p2FundamentEn: resolve(__dirname, 'labs/p2-fundament-en.html'),
      },
    },
  },
});
