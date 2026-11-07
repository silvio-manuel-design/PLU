/**
 * PYTHON CLASSIC — Hub Entry Point (index.html)
 */

import { initI18n } from './modules/i18n.js';
import { initTheme } from './modules/theme.js';
import { initClassroom } from './modules/classroom.js';
import { initNavigation } from './modules/navigation.js';
import { initBackToTop } from './modules/back-to-top.js';
import { initBreakPrompt } from './modules/break-prompt.js';
import { initCodeFold } from './modules/code-fold.js';

async function init() {
  initTheme();
  initClassroom();
  initNavigation();
  initBackToTop();
  initBreakPrompt();
  initCodeFold();
  await initI18n();

  // Fade in animation for chapter cards (respects reduced motion)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = document.querySelectorAll('[data-fade-in]');

  if (prefersReducedMotion) {
    cards.forEach(card => card.classList.add('u-fade-in'));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('u-fade-in');
            }, index * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach(card => observer.observe(card));
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
