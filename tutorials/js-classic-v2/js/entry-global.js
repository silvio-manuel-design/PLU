/**
 * entry-global.js — globaler Einstieg (js-classic 2.0)
 *
 * - Lädt Schrift (Inter Variable) und Icons (Phosphor) LOKAL — kein CDN.
 * - Initialisiert die i18n-Engine (1:1-Port aus js-modern): Zero-Dep,
 *   DE-Fallback, Browser-Erkennung, localStorage-Key `plu-language`
 *   (PLU-weit konsistent), setzt `lang` + `dir` inkl. RTL-Logik.
 * - Theme-Steuerung via modules/theme.js (persistiert `jsc-theme`, Dark first).
 * - Site-Chrome via modules/navigation.js, wenn die Seite
 *   `<div data-component="jsc-site-chrome"></div>` anbietet (P2-Vertrag).
 * - P1-Demo-Handler (smoke-test*.html): Sprach-Toggle, Copy, Print —
 *   die Theme-Demo-Buttons bedient jetzt modules/theme.js.
 */

import '@fontsource-variable/inter/index.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource-variable/jetbrains-mono/index.css';
import '@phosphor-icons/web/regular';

import { initI18n, setLanguage, getLanguage, t, onLangChange } from './modules/i18n.js';
import { initTheme } from './modules/theme.js';
import { initNavigation } from './modules/navigation.js';
import { initLcards } from './modules/lcard.js';
import { initBackToTop } from './modules/back-to-top.js';
import { initExport } from './modules/export.js';
import { initLexikon } from './modules/lexikon.js';
import { initClassroom } from './modules/classroom.js';
import de from './i18n/de.js';
import en from './i18n/en.js';

initI18n(de, en);
initTheme();
initNavigation();
initLcards();
initBackToTop();
initExport();
initLexikon();
initClassroom();

/* ------------------------------------------------------------------ */
/* Sprach-Umschalter (P1-Demo für smoke-test*.html; Persistenz via     */
/* Engine: plu-language) — P2-Seiten nutzen den hreflang-Switcher      */
/* aus modules/navigation.js.                                          */
/* ------------------------------------------------------------------ */

const langToggle = document.querySelector('[data-lang-toggle]');

if (langToggle) {
  langToggle.addEventListener('click', () => {
    setLanguage(getLanguage() === 'de' ? 'en' : 'de');
  });
}

/* ------------------------------------------------------------------ */
/* Drucken (P1-Demo)                                                   */
/* ------------------------------------------------------------------ */

/* Drucken-Buttons (P5, P11R5: Worksheet-Isolation — Button druckt
   nur seine eigene Sektion als sauberes Arbeitsblatt) */
document.querySelectorAll('[data-print]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const target =
      btn.closest('section') ||
      btn.closest('.jsc-band, .jsc-band--alt');
    if (!target) {
      window.print();
      return;
    }
    /* Vorfahren-Kette markieren: nur dieser Ast bleibt im Druck. */
    const kept = [];
    let el = target;
    while (el && el.nodeType === 1) {
      el.classList.add('is-print-keep');
      kept.push(el);
      el = el.parentElement;
    }
    document.documentElement.classList.add('is-print-root');
    const cleanup = () => {
      kept.forEach((n) => n.classList.remove('is-print-keep'));
      document.documentElement.classList.remove('is-print-root');
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    window.print();
    /* Fallback: falls afterprint nicht feuert (Safari) */
    setTimeout(cleanup, 2000);
  });
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
