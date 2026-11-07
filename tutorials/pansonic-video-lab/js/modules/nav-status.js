import { getStorage, setStorage, getStorageRaw, setStorageRaw, removeStorage } from './storage.js';
/**
 * Pansonic Video Lab — Navigation Status Indicators
 * Updates module links in desktop & mobile nav with progress dots
 */

const MODULE_MAP = {
  'm00': 0, 'm01': 1, 'm02': 2, 'm03': 3,
  'm04': 4, 'm05': 5, 'm06': 6, 'm07': 7,
  'm08': 8, 'm09': 9, 'm10': 10, 'm11': 11
};

export function initNavStatus() {
  function update() {
    let progress = {};
    try {
      progress = getStorage('pansonic-module-progress', {});
    } catch (e) { return; }

    document.querySelectorAll('[data-module]').forEach(el => {
      const key = el.dataset.module;
      if (!key || !(key in MODULE_MAP)) return;

      // Find or create status dot
      let status = el.querySelector('.video-nav-status');
      if (!status) {
        status = document.createElement('span');
        status.className = 'video-nav-status';
        status.setAttribute('aria-hidden', 'true');
        el.appendChild(status);
      }

      // Determine state
      const isDone = progress[`${key}_done`] === true;
      const hasProgress = (progress[key] || 0) > 0;

      status.classList.remove('video-nav-status--pending', 'video-nav-status--active', 'video-nav-status--completed');

      if (isDone) {
        status.classList.add('video-nav-status--completed');
        status.setAttribute('title', 'Abgeschlossen');
      } else if (hasProgress) {
        status.classList.add('video-nav-status--active');
        status.setAttribute('title', `${progress[key]}% abgeschlossen`);
      } else {
        status.classList.add('video-nav-status--pending');
        status.setAttribute('title', 'Noch nicht begonnen');
      }
    });
  }

  // Initial update
  update();

  // Listen for changes
  window.addEventListener('moduleCompleted', update);
  window.addEventListener('checklistUpdated', update);
  window.addEventListener('storage', (e) => {
    if (e.key === 'pansonic-module-progress') update();
  });
}
