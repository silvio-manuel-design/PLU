import { getStorage, setStorage, getStorageRaw, setStorageRaw, removeStorage } from './storage.js';
/**
 * Pansonic Video Lab — Interactive Checklist (Legacy)
 * Simple checklists with localStorage persistence and progress ring.
 * Used in Module 00 (Welcome) for indoor/outdoor setup checklists.
 */

const STORAGE_KEY_PREFIX = 'video-lab-';

export function initInteractiveChecklist() {
  const lists = document.querySelectorAll('.video-interactive-checklist');
  if (!lists.length) return;

  lists.forEach(list => {
    const key = list.dataset.storageKey;
    if (!key) return;

    const storageKey = STORAGE_KEY_PREFIX + key;
    const progressId = key === 'indoor-check' || key === 'indoor-check-en'
      ? 'indoorProgress'
      : (key === 'outdoor-check' || key === 'outdoor-check-en' ? 'outdoorProgress' : null);
    const percentId = key === 'indoor-check' || key === 'indoor-check-en'
      ? 'indoorPercent'
      : (key === 'outdoor-check' || key === 'outdoor-check-en' ? 'outdoorPercent' : null);

    const progressEl = progressId ? document.getElementById(progressId) : null;
    const percentEl = percentId ? document.getElementById(percentId) : null;

    function updateProgress() {
      const items = list.querySelectorAll('li');
      const checked = list.querySelectorAll('li.is-checked').length;
      const total = items.length;
      const percent = total > 0 ? Math.round((checked / total) * 100) : 0;

      if (progressEl) {
        progressEl.style.display = percent > 0 ? 'flex' : 'none';
        const circle = progressEl.querySelector('.video-progress-ring__circle--fill');
        if (circle) {
          const circumference = 2 * Math.PI * 26;
          circle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
        }
      }
      if (percentEl) percentEl.textContent = percent + '%';

      try {
        localStorage.setItem(storageKey, JSON.stringify(
          Array.from(list.querySelectorAll('li')).map(li => li.classList.contains('is-checked'))
        ));
      } catch (e) { /* silent fail */ }
    }

    // Load saved state
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const states = JSON.parse(saved);
        list.querySelectorAll('li').forEach((li, i) => {
          if (states[i]) li.classList.add('is-checked');
        });
        updateProgress();
      }
    } catch (e) { /* silent fail */ }

    // Bind clicks
    list.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', () => {
        li.classList.toggle('is-checked');
        updateProgress();
      });
    });
  });
}
