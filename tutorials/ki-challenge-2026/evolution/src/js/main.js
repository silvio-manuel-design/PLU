/**
 * KI Challenge 2026 — Evolution Showcase
 * Entry Point
 */

import { initI18n } from './modules/i18n.js';
import { initTheme } from './modules/theme.js';
import { ClassroomManager, initBackToTop, initMobileMenu } from './modules/classroom.js';
import { initEvolutionToggle } from './modules/toggle.js';
import { initTimeline } from './modules/timeline.js';

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

  // Initialize evolution toggle (legacy/modern)
  initEvolutionToggle();

  // Initialize timeline
  initTimeline();

  // Initialize scroll reveal
  initScrollReveal();
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
}
