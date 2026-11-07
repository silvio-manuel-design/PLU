import { getStorage, setStorage, getStorageRaw, setStorageRaw, removeStorage } from './storage.js';
/**
 * Pansonic Photo Lab — Interactive Checklist
 * Supports both legacy list style and new shot-card grid style.
 * Used in Module 00 (Welcome) for indoor/outdoor setup checklists.
 */

const STORAGE_KEY_PREFIX = 'photo-lab-';

export function initInteractiveChecklist() {
  // ===== Legacy list style =====
  const lists = document.querySelectorAll('.photo-interactive-checklist');
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
        const circle = progressEl.querySelector('.photo-scenario-progress__circle--fill');
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

  // ===== New shot-card grid style =====
  const shotGrids = document.querySelectorAll('.photo-shot-grid[data-storage-key]');
  shotGrids.forEach(grid => {
    const key = grid.dataset.storageKey;
    if (!key) return;

    const storageKey = STORAGE_KEY_PREFIX + key;
    const progressEl = grid.closest('.photo-location-card')?.querySelector('.photo-shot-progress');
    const fillEl = progressEl?.querySelector('.photo-shot-progress__fill');
    const percentEl = progressEl?.querySelector('.photo-shot-progress__text');
    const labelEl = progressEl?.querySelector('.photo-shot-progress__label');

    function updateProgress() {
      const cards = grid.querySelectorAll('.photo-shot-card');
      const checked = grid.querySelectorAll('.photo-shot-card.is-checked').length;
      const total = cards.length;
      const percent = total > 0 ? Math.round((checked / total) * 100) : 0;

      if (progressEl) {
        progressEl.style.display = percent > 0 ? 'flex' : 'none';
      }
      if (fillEl) {
        fillEl.style.width = percent + '%';
      }
      if (percentEl) {
        percentEl.textContent = percent + '%';
      }
      if (labelEl) {
        const isEn = document.documentElement.lang === 'en';
        labelEl.textContent = percent === 100
          ? (isEn ? 'Ready!' : 'Bereit!')
          : (isEn ? ' items checked' : ' erledigt');
      }

      try {
        localStorage.setItem(storageKey, JSON.stringify(
          Array.from(cards).map(card => card.classList.contains('is-checked'))
        ));
      } catch (e) { /* silent fail */ }
    }

    // Load saved state
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const states = JSON.parse(saved);
        grid.querySelectorAll('.photo-shot-card').forEach((card, i) => {
          if (states[i]) card.classList.add('is-checked');
        });
        updateProgress();
      }
    } catch (e) { /* silent fail */ }

    // Bind clicks
    grid.querySelectorAll('.photo-shot-card').forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('is-checked');
        updateProgress();
      });
    });
  });
}
