/**
 * Pansonic Video Lab — Global Entry Point
 * Core modules loaded on every page
 */

import { initTheme } from './modules/theme.js';
import { initClassroom } from './modules/classroom.js';
import { initMobileNav } from './modules/navigation.js';
import { initHeaderScroll, initScrollProgress } from './modules/scroll.js';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', async () => {
  // Critical path — loaded immediately
  initTheme();
  initClassroom();
  initMobileNav();
  initHeaderScroll();
  initScrollProgress();

  // Non-critical — lazy loaded to reduce initial chunk size
  const [
    { initReveal },
    { initBackToTop, initSmoothScroll },
    { initModal },
    { initBottomNav },
    { initImageFallback }
  ] = await Promise.all([
    import('./modules/reveal.js'),
    import('./modules/scroll.js'),
    import('./modules/modal.js'),
    import('./modules/progress.js'),
    import('./modules/image-fallback.js')
  ]);

  initReveal(prefersReducedMotion);
  initBackToTop(prefersReducedMotion);
  initSmoothScroll(prefersReducedMotion);
  initModal();
  initBottomNav();
  initImageFallback();
});
