/**
 * PRISMA — KI Challenge 2026 Team B
 * Entry Point
 */

import { initI18n } from './modules/i18n.js';
import { initTheme } from './modules/theme.js';
import { ClassroomManager, initBackToTop, initMobileMenu } from './modules/classroom.js';
import { initMission } from './modules/mission.js';
import { initXP } from './modules/xp.js';

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

  // Initialize mission onboarding
  initMission();

  // Initialize XP system
  initXP();

  // Initialize scroll reveal
  initScrollReveal();

  // TODO: Team implementiert folgende Module (Importe auskommentiert bis implementiert):
  // import { generatePalette, renderPalette } from './modules/color-engine.js';
  // import { generatePairings, renderPairings } from './modules/type-engine.js';
  // import { generateLayout, renderLayoutPreview } from './modules/layout-engine.js';
  // import { initExportButtons } from './modules/export-system.js';
  // import { initMoodboard } from './modules/moodboard.js';
  // import { optimizePrompt, initPromptTemplates } from './modules/prompt-parser.js';

  // initExportButtons();
  // initMoodboard();
  // initPromptTemplates();

  console.log('[PRISMA] Starter-Template geladen. Bereit für Team-Implementierung.');
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
    '.challenge-roles__grid',
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
