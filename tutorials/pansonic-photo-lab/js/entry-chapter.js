/**
 * Pansonic Photo Lab — Chapter/Module Page Entry Point
 */

import './entry-global.js';
import { initModuleScrollProgress, initBottomNav } from './modules/scroll.js';
import { initChecklist } from './modules/checklist.js';
import { initNavStatus } from './modules/nav-status.js';
import { initQuiz } from './modules/quiz.js';
import { initReflection } from './modules/reflection.js';
import { initBottomBar } from './modules/bottom-bar.js';
import { initInteractiveChecklist } from './modules/interactive-checklist.js';
import { initScenarioTabs } from './modules/scenario-tabs.js';
import { initToolModal } from './modules/tool-modal.js';
import { initLightPlayground } from './modules/light-playground.js';
import { initColorWheelPlayground } from './modules/color-wheel-playground.js';
import { initPortraitLightPlayground } from './modules/portrait-light-playground.js';
import { initLandscapeTimePlayground } from './modules/landscape-time-playground.js';
import { initMacroPlayground } from './modules/macro-playground.js';
import { initFilterPlayground } from './modules/filter-playground.js';
import { initSkillAssessment } from './modules/skill-assessment.js';
import { initTrackSelector } from './modules/track-selector.js';
import { initSwipeNav } from './modules/swipe-nav.js';
import { initConnections } from './modules/connections.js';
import { initPhotoSimCamera } from './modules/photo-sim-camera.js';
import { initPhotoSimExposure } from './modules/photo-sim-exposure.js';
import { initPhotoSimDof } from './modules/photo-sim-dof.js';
import { initPhotoSimComposition } from './modules/photo-sim-composition.js';
import { initPhotoRating } from './modules/photo-rating.js';
import { initModal } from './modules/modal.js';

document.addEventListener('DOMContentLoaded', () => {
  initModuleScrollProgress();
  initBottomNav();
  initChecklist();
  initNavStatus();
  initQuiz();
  initReflection();
  initBottomBar();
  initInteractiveChecklist();
  initScenarioTabs();
  initTrackSelector();
  initSwipeNav();
  initConnections();
  initToolModal();
  initPhotoSimCamera();
  initPhotoSimExposure();
  initPhotoSimDof();
  initLightPlayground();
  initColorWheelPlayground();
  initPortraitLightPlayground();
  initLandscapeTimePlayground();
  initMacroPlayground();
  initFilterPlayground();
  initSkillAssessment();
  initPhotoSimComposition();
  initTrackContent();
  initPhotoRating();
  initModal();
  initJourneyReveal();
  initChallengeProgress();
});

/**
 * Track-based content visibility
 * Reads track from localStorage (set in Module 00) and shows/hides sections
 */
function initTrackContent() {
  const trackSections = document.querySelectorAll('[data-track-visible]');
  if (!trackSections.length) return;

  let track = 'both';
  try {
    track = localStorage.getItem('pansonic-photo-lab-track') || 'both';
  } catch (e) { /* silent fail */ }

  document.body.setAttribute('data-active-track', track);

  trackSections.forEach(section => {
    const visibleFor = section.dataset.trackVisible;
    if (!visibleFor) return;
    const isVisible = visibleFor === track || track === 'both' || visibleFor === 'both';
    section.style.display = isVisible ? '' : 'none';
  });
}

/**
 * Journey Grid Reveal — staggered scroll animation for M11
 * Creates a dopaminergic reward cascade as modules "unlock"
 */
function initJourneyReveal() {
  const grid = document.querySelector('.photo-journey-grid');
  if (!grid) return;

  const items = grid.querySelectorAll('.photo-journey-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        items.forEach((item, idx) => {
          setTimeout(() => {
            item.classList.add('is-revealed');
          }, idx * 80);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  observer.observe(grid);
}

/**
 * Challenge Progress Tracker — interactive phase completion for M11
 * Click phases to mark them done, reinforcing progress & self-regulation
 */
function initChallengeProgress() {
  const container = document.querySelector('[data-challenge-progress]');
  if (!container) return;

  const STORAGE_KEY = 'photo-capstone-progress';
  const dots = container.querySelectorAll('[data-phase]');

  // Load saved progress
  let saved = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) saved = JSON.parse(raw);
  } catch (e) { /* silent fail */ }

  function updateVisuals() {
    const iconMap = {
      1: 'ph-lightbulb',
      2: 'ph-list-checks',
      3: 'ph-camera',
      4: 'ph-sliders-horizontal',
      5: 'ph-presentation-chart',
    };

    dots.forEach(dot => {
      const phase = parseInt(dot.dataset.phase, 10);
      dot.classList.remove('is-active', 'is-done');
      const icon = dot.querySelector('i');
      if (saved.includes(phase)) {
        dot.classList.add('is-done');
        if (icon) icon.className = 'ph-bold ph-check';
      } else {
        if (icon) icon.className = `ph ${iconMap[phase]}`;
        if (phase === Math.max(...saved, 0) + 1) {
          dot.classList.add('is-active');
        }
      }
    });
  }

  updateVisuals();

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const phase = parseInt(dot.dataset.phase, 10);
      if (saved.includes(phase)) {
        saved = saved.filter(p => p !== phase);
      } else {
        saved.push(phase);
      }
      saved.sort((a, b) => a - b);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      } catch (e) { /* silent fail */ }
      updateVisuals();
    });
  });
}
