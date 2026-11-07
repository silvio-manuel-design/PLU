/**
 * PYTHON CLASSIC — Chapter Entry Point (kapitel/*.html)
 */

import { initI18n } from './modules/i18n.js';
import { initTheme } from './modules/theme.js';
import { initClassroom } from './modules/classroom.js';
import { initNavigation } from './modules/navigation.js';
import { initCodeBlocks } from './modules/code-highlighter.js';
import { initBackToTop } from './modules/back-to-top.js';
import { initBreakPrompt } from './modules/break-prompt.js';
import { initCodeFold } from './modules/code-fold.js';

async function init() {
  initTheme();
  initClassroom();
  initNavigation();
  initBackToTop();
  initCodeBlocks();
  initBreakPrompt();
  initCodeFold();
  await initI18n();

  // Hide hero images that fail to load (replace inline onerror handler)
  document.querySelectorAll('.py-classic-hero__image').forEach(img => {
    if (img.complete && img.naturalWidth === 0) {
      img.style.display = 'none';
    }
    img.addEventListener('error', () => {
      img.style.display = 'none';
    });
  });

  // Auto-highlight last word of chapter hero title in gold accent
  const heroTitle = document.querySelector('.py-classic-hero--full-image:not(.py-classic-hero--hub) .py-classic-hero__title');
  if (heroTitle && !heroTitle.querySelector('.py-classic-hero__title-accent')) {
    const text = heroTitle.textContent.trim();
    const words = text.split(/\s+/);
    if (words.length > 1) {
      const lastWord = words.pop();
      const before = words.join(' ');
      heroTitle.innerHTML = `${before} <span class="py-classic-hero__title-accent">${lastWord}</span>`;
    }
  }

  // Exercise solution toggles
  document.querySelectorAll('[data-solution-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-solution-toggle');
      const target = document.getElementById(targetId);
      if (target) {
        const isOpen = target.classList.toggle('is-open');
        btn.innerHTML = isOpen
          ? `<span><i class="ph ph-eye"></i></span> <span data-i18n="exercise.hideSolution">Lösung verbergen</span>`
          : `<span><i class="ph ph-lock-key-open"></i></span> <span data-i18n="exercise.showSolution">Lösung anzeigen</span>`;
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
