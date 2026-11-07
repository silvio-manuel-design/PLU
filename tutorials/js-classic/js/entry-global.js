/**
 * entry-global.js — globaler Einstieg (js-classic 2.0, P1)
 *
 * - Lädt Schrift (Inter Variable) und Icons (Phosphor) LOKAL — kein CDN.
 * - Initialisiert die i18n-Engine (Port aus js-modern): Zero-Dep, DE-Fallback,
 *   Browser-Erkennung, localStorage-Key `plu-language` (PLU-weit), setzt
 *   `lang` + `dir` inkl. RTL-Logik.
 * - Theme-Demo: Klick toggelt `data-theme` auf <html> (Dark = kein Attribut;
 *   Persistenz folgt erst in P2 — reine Demo).
 * - P1-Demos: Sprach-Umschalter, Copy-Button (alle via data-Attribute,
 *   0 Inline-Scripts/0 Inline-Eventhandler).
 */

import '@fontsource-variable/inter/index.css';
import '@phosphor-icons/web/regular/style.css';

import { initI18n, setLanguage, getLanguage, t, onLangChange } from './modules/i18n.js';
import de from './i18n/de.js';
import en from './i18n/en.js';

initI18n(de, en);

/* ------------------------------------------------------------------ */
/* Theme-Demo (P1)                                                     */
/* ------------------------------------------------------------------ */

const themeToggle = document.querySelector('[data-theme-toggle]');

function syncThemeToggle() {
  if (!themeToggle) return;
  const isLight = document.documentElement.dataset.theme === 'light';
  themeToggle.dataset.i18n = isLight ? 'ui.theme.toDark' : 'ui.theme.toLight';
  themeToggle.textContent = t(themeToggle.dataset.i18n);
}

if (themeToggle) {
  syncThemeToggle();
  themeToggle.addEventListener('click', () => {
    const root = document.documentElement;
    if (root.dataset.theme === 'light') {
      root.removeAttribute('data-theme'); // Dark = Default ohne Attribut
    } else {
      root.dataset.theme = 'light';
    }
    syncThemeToggle();
  });
  onLangChange(syncThemeToggle);
}

/* ------------------------------------------------------------------ */
/* Sprach-Umschalter (P1-Demo; Persistenz via Engine: plu-language)    */
/* ------------------------------------------------------------------ */

const langToggle = document.querySelector('[data-lang-toggle]');

if (langToggle) {
  langToggle.addEventListener('click', () => {
    setLanguage(getLanguage() === 'de' ? 'en' : 'de');
  });
}

/* ------------------------------------------------------------------ */
/* Drucken (P1)                                                        */
/* ------------------------------------------------------------------ */

document.querySelectorAll('[data-print]').forEach((btn) => {
  btn.addEventListener('click', () => window.print());
});

/* ------------------------------------------------------------------ */
/* Copy-Demo (P1)                                                      */
/* ------------------------------------------------------------------ */

const copyDemo = document.querySelector('[data-copy-demo]');

if (copyDemo) {
  const originalKey = copyDemo.dataset.i18n || 'ui.common.copy';
  copyDemo.addEventListener('click', async () => {
    const code = 'console.log("Hallo, PLU!");';
    try {
      await navigator.clipboard.writeText(code);
      copyDemo.textContent = t('ui.common.copied');
      setTimeout(() => {
        copyDemo.dataset.i18n = originalKey;
        copyDemo.textContent = t(originalKey);
      }, 1500);
    } catch {
      copyDemo.textContent = t(originalKey);
    }
  });
  onLangChange(() => {
    copyDemo.textContent = t(copyDemo.dataset.i18n || originalKey);
  });
}
