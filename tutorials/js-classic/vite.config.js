import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/tutorials/js-classic/',
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        smokeTest: resolve(__dirname, 'labs/smoke-test.html'),
        smokeTestEn: resolve(__dirname, 'labs/smoke-test-en.html'),
      },
    },
  },
});
