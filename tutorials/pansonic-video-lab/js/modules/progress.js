import { getStorage, setStorage, getStorageRaw, setStorageRaw, removeStorage } from './storage.js';
/**
 * Pansonic Video Lab — Progress & Track Manager
 * Bottom nav visibility, module progress bar, active track persistence,
 * global progress dashboard
 */

export function initBottomNav() {
  const bottomNav = document.querySelector('.video-module-nav-footer');
  if (!bottomNav) return;

  const progressFill = bottomNav.querySelector('.video-nav-progress-fill');
  const showThreshold = 300;

  function updateBottomNav() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    if (scrollY > showThreshold) {
      bottomNav.classList.add('is-visible');
      document.body.classList.add('has-bottom-nav');
    } else {
      bottomNav.classList.remove('is-visible');
      document.body.classList.remove('has-bottom-nav');
    }

    if (progressFill) {
      const baseModule = parseInt(progressFill.dataset.base) || 1;
      const moduleFraction = 100 / 12; // ~8.333% per module
      const scrollContribution = (scrollPercent / 100) * moduleFraction;
      const currentProgress = Math.min(baseModule * moduleFraction + scrollContribution, 100);
      progressFill.style.width = currentProgress + '%';
    }
  }

  window.addEventListener('scroll', updateBottomNav, { passive: true });
  updateBottomNav();
}

export function initTrackCallouts() {
  try {
    const track = getStorageRaw('pansonic-video-lab-track');
    if (track) {
      document.body.setAttribute('data-active-track', track);
    }
  } catch (e) { /* silent fail */ }
}

/**
 * Global Progress Dashboard — renders on homepage
 */
export function initGlobalProgress() {
  const dashboard = document.querySelector('.video-progress-dashboard');
  if (!dashboard) return;

  const bar = dashboard.querySelector('.video-progress-dashboard__bar');
  const meta = dashboard.querySelector('.video-progress-dashboard__meta strong');
  const dots = dashboard.querySelectorAll('.video-progress-dot');

  const moduleMap = {
    'm00': 0, 'm01': 1, 'm02': 2, 'm03': 3,
    'm04': 4, 'm05': 5, 'm06': 6, 'm07': 7,
    'm08': 8, 'm09': 9, 'm10': 10, 'm11': 11
  };

  function update() {
    let completed = 0;
    let totalPercent = 0;

    try {
      const global = getStorage('pansonic-module-progress', {});

      Object.keys(moduleMap).forEach(key => {
        const idx = moduleMap[key];
        const dot = dots[idx];
        if (!dot) return;

        if (global[`${key}_done`]) {
          dot.classList.add('is-completed');
          dot.classList.remove('is-active');
          completed++;
          totalPercent += 100;
        } else if (global[key] > 0) {
          dot.classList.add('is-active');
          dot.classList.remove('is-completed');
          totalPercent += global[key];
        } else {
          dot.classList.remove('is-completed', 'is-active');
        }
      });
    } catch (e) { /* silent fail */ }

    const totalModules = 12;
    const overallPercent = Math.round(totalPercent / totalModules);

    if (bar) {
      bar.style.width = `${overallPercent}%`;
    }
    if (meta) {
      meta.textContent = `${completed}/${totalModules}`;
    }

    if (completed >= totalModules) {
      dashboard.classList.add('is-complete');
    }
  }

  // Initial update
  update();

  // Listen for module completion events
  window.addEventListener('moduleCompleted', update);
  window.addEventListener('checklistUpdated', update);

  // Also update on storage events from other tabs
  window.addEventListener('storage', (e) => {
    if (e.key === 'pansonic-module-progress') update();
  });
}
