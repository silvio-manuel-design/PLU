/**
 * Pansonic Video Lab — Chapter/Module Page Entry Point
 * Simulations are lazy-loaded based on DOM presence
 */

import './entry-global.js';
import { initModuleScrollProgress } from './modules/scroll.js';
import { initChecklist } from './modules/checklist.js';
import { initInteractiveChecklist } from './modules/interactive-checklist.js';
import { initNavStatus } from './modules/nav-status.js';
import { initScenarioTabs } from './modules/scenario-tabs.js';
import { initToolModal } from './modules/tool-modal.js';
import { initSwipeNav } from './modules/swipe-nav.js';
import { initQuiz } from './modules/quiz.js';
import { initConnections } from './modules/connections.js';
import { initReflection } from './modules/reflection.js';
import { initBottomBar } from './modules/bottom-bar.js';

async function loadSimulations() {
  if (document.querySelector('.sim-camera')) {
    try { const { initCameraSim } = await import('./modules/simulations/camera.js'); initCameraSim(); }
    catch (e) { console.warn('Camera sim load failed', e); }
  }
  if (document.querySelector('.sim-lighting')) {
    try { const { initLightingSim } = await import('./modules/simulations/lighting.js'); initLightingSim(); }
    catch (e) { console.warn('Lighting sim load failed', e); }
  }
  if (document.querySelector('.sim-color-swipe')) {
    try { const { initColorSwipeSim } = await import('./modules/simulations/color-swipe.js'); initColorSwipeSim(); }
    catch (e) { console.warn('Color swipe sim load failed', e); }
  }
  if (document.querySelector('.sim-timeline')) {
    try { const { initTimelineSim } = await import('./modules/simulations/timeline.js'); initTimelineSim(); }
    catch (e) { console.warn('Timeline sim load failed', e); }
  }
  if (document.querySelector('.sim-composition')) {
    try { const { initCompositionSim } = await import('./modules/simulations/composition.js'); initCompositionSim(); }
    catch (e) { console.warn('Composition sim load failed', e); }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initModuleScrollProgress();
  initChecklist();
  initInteractiveChecklist();
  initNavStatus();
  initScenarioTabs();
  initToolModal();
  initSwipeNav();
  loadSimulations();
  initQuiz();
  initConnections();
  initReflection();
  initBottomBar();
});
