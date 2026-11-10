/**
 * entry-chapter.js — Einstieg für Kapitel-Seiten (js-classic 2.0)
 *
 * Wie entry-global (Fonts lokal, i18n, Theme, Site-Chrome, Back-to-Top)
 * plus die Kapitel-Komponenten: Checkliste, Reflexion, Quiz, Demos,
 * Media-Embed. Kapitel-Seiten binden ausschließlich diesen Entry.
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
import { initBackToTop } from './modules/back-to-top.js';
import { initChecklist } from './modules/checklist.js';
import { initReflection } from './modules/reflection.js';
import { initQuiz } from './modules/quiz.js';
import { initDemoConsole } from './modules/demo-console.js';
import { initDemoInnerhtml } from './modules/demo-innerhtml.js';
import { initDemoPopups } from './modules/demo-popups.js';
import { initDemoChapters } from './modules/demo-chapters.js';
import { initMediaEmbed } from './modules/media-embed.js';
import { initCodeBlocks } from './modules/code-block.js';
import { initPlaygrounds } from './modules/playground.js';
import { initSolutionGates } from './modules/solution-gate.js';
import { initExport } from './modules/export.js';
import { initScrollSpy } from './modules/scroll-spy.js';
import de from './i18n/de.js';
import en from './i18n/en.js';

initI18n(de, en);
initTheme();
initNavigation();
initBackToTop();
initChecklist();
initReflection();
initQuiz();
initDemoConsole();
initDemoInnerhtml();
initDemoPopups();
initDemoChapters();
initMediaEmbed();
initCodeBlocks();
initPlaygrounds();
initSolutionGates();
initExport();
initScrollSpy();

/* Drucken-Buttons (P5) */
document.querySelectorAll('[data-print]').forEach((btn) => {
  btn.addEventListener('click', () => window.print());
});

/* Sprach-Umschalter (P1-Demo für smoke-test*.html) */
const langToggle = document.querySelector('[data-lang-toggle]');
if (langToggle) {
  langToggle.addEventListener('click', () => {
    setLanguage(getLanguage() === 'de' ? 'en' : 'de');
  });
}
