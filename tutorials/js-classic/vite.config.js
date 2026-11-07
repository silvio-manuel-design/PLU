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
        smokeTest: resolve(__dirname, 'labs/smoke-test.html'),
        smokeTestEn: resolve(__dirname, 'labs/smoke-test-en.html'),
        p2Fundament: resolve(__dirname, 'labs/p2-fundament.html'),
        p2FundamentEn: resolve(__dirname, 'labs/p2-fundament-en.html'),
      },
    },
  },
});
