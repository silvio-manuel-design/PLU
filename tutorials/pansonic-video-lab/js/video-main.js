/**
 * Pansonic Video Lab — Main Entry Point (ES6 Modules)
 * ITCSS + BEM compatible, modular architecture
 */

import { initTheme } from './modules/theme.js';
import { initClassroom } from './modules/classroom.js';
import { initMobileNav } from './modules/navigation.js';
import { initReveal } from './modules/reveal.js';
import { initBackToTop, initSmoothScroll, initHeaderScroll, initScrollProgress, initModuleScrollProgress } from './modules/scroll.js';
import { initModal } from './modules/modal.js';
import { loadGlossary } from './modules/glossary.js';
import { initBottomNav, initTrackCallouts, initGlobalProgress } from './modules/progress.js';
import { initTrackSelector } from './modules/track-selector.js';
import { initChecklist } from './modules/checklist.js';
import { initInteractiveChecklist } from './modules/interactive-checklist.js';
import { initToolModal } from './modules/tool-modal.js';
import { initGamification } from './modules/gamification.js';
import { initNavStatus } from './modules/nav-status.js';
import { initCameraSim } from './modules/simulations/camera.js';
import { initLightingSim } from './modules/simulations/lighting.js';
import { initColorSwipeSim } from './modules/simulations/color-swipe.js';
import { initTimelineSim } from './modules/simulations/timeline.js';
import { initCompositionSim } from './modules/simulations/composition.js';
import { initScenarioTabs } from './modules/scenario-tabs.js';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  console.log('[Pansonic Video Lab] ES6 modules initialized');

  initTheme();
  initClassroom();
  initMobileNav();
  initHeaderScroll();
  initScrollProgress();
  initModuleScrollProgress();
  initReveal(prefersReducedMotion);
  initBackToTop(prefersReducedMotion);
  initSmoothScroll(prefersReducedMotion);
  initModal();
  initBottomNav();
  loadGlossary();
  initTrackCallouts();
  initTrackSelector();
  initChecklist();
  initInteractiveChecklist();
  initToolModal();
  initGamification();
  initGlobalProgress();
  initNavStatus();
  initCameraSim();
  initLightingSim();
  initColorSwipeSim();
  initTimelineSim();
  initCompositionSim();
  initScenarioTabs();
});
