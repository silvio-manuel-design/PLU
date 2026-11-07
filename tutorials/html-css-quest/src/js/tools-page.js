/**
 * Tools Page — Initialisiert Theme, Mobile Menu, Header Scroll
 */

import { initTheme } from './modules/theme.js';
import { ClassroomManager, initBackToTop, initMobileMenu } from './modules/classroom.js';
import { initI18n } from './modules/i18n.js';
import de from './translations/de.js';
import en from './translations/en.js';

document.addEventListener('DOMContentLoaded', () => {
  initI18n(de, en);
  initTheme();
  new ClassroomManager();
  initBackToTop();
  initMobileMenu();
  initHeaderScroll();
});

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 20) {
          header.classList.add('site-header--scrolled');
        } else {
          header.classList.remove('site-header--scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}
