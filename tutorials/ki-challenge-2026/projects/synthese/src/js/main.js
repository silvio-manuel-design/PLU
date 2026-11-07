/**
 * SYNTHESE — KI Challenge 2026 Team A
 * Entry Point
 */

import { initI18n } from './modules/i18n.js';
import { initTheme } from './modules/theme.js';
import { ClassroomManager, initBackToTop, initMobileMenu } from './modules/classroom.js';
import { initMission } from './modules/mission.js';
import { initXP } from './modules/xp.js';
import { initTopicCards } from './modules/topics.js';

import de from '../translations/de.js';
import en from '../translations/en.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize i18n
  initI18n(de, en);

  // Initialize theme (dark/light)
  initTheme();

  // Initialize classroom mode
  new ClassroomManager();

  // Initialize back-to-top
  initBackToTop();

  // Initialize mobile menu
  initMobileMenu();

  // Initialize onboarding / mission
  initMission();

  // Initialize XP system
  initXP();

  // Initialize topic card modals
  initTopicCards();

  // Initialize scroll reveal
  initScrollReveal();

  // TODO: Team implementiert folgende Module (Importe auskommentiert bis implementiert):
  // import { initSearch } from './modules/search.js';
  // import { initFilter } from './modules/filter.js';
  // import { renderCards } from './modules/cards.js';
  // import { initBookmarkButtons } from './modules/bookmarks.js';
  // import { renderRelated } from './modules/related.js';
  // import { initReadingMode } from './modules/reading-mode.js';

  // initSearch();
  // initFilter();
  // renderCards();
  // initBookmarkButtons();
  // initReadingMode();

  console.log('[SYNTHESE] Starter-Template geladen. Bereit für Team-Implementierung.');
});

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('u-reveal--visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.u-reveal').forEach(el => observer.observe(el));

  // Stagger delay for role cards, tool cards, topic cards
  const staggerContainers = [
    '.challenge-role-grid',
    '.tools-grid',
    '.topics-grid',
    '.challenge-workflow__timeline'
  ];

  staggerContainers.forEach(selector => {
    const container = document.querySelector(selector);
    if (container) {
      const children = container.children;
      Array.from(children).forEach((child, index) => {
        child.classList.add('u-reveal-stagger');
        child.style.setProperty('--stagger-delay', `${index * 0.1}s`);
        observer.observe(child);
      });
    }
  });
}
