/**
 * Pansonic Video Lab — Interactive Checklist
 * Per-module checklist with animated progress ring, localStorage persistence,
 * and confetti celebration on completion.
 */

import { showToast, showUndoToast } from './gamification.js';
import { getStorage, setStorage, getStorageRaw } from './storage.js';

const STORAGE_KEY_PREFIX = 'pansonic-checklist-';

function getModuleId() {
  // Extract module number from body data attribute or URL
  const bodyId = document.body.dataset.module;
  if (bodyId) return bodyId;

  const match = window.location.pathname.match(/module\/(\d+)[-\w]*/);
  if (match) return `m${match[1]}`;

  // Fallback for tools/pages
  const pageMatch = window.location.pathname.match(/\/(\w+)\.html$/);
  if (pageMatch) return pageMatch[1];

  return 'unknown';
}

function getStorageKey() {
  return STORAGE_KEY_PREFIX + getModuleId();
}

function drawConfetti(container) {
  const colors = ['#ff5a5a', '#2dd4bf', '#ffd700', '#a29bfe', '#ffffff'];
  const count = 60;

  // Screenreader announcement for the visual celebration
  const isEn = document.documentElement.lang === 'en';
  setTimeout(() => {
    let live = document.getElementById('a11y-confetti-region');
    if (!live) {
      live = document.createElement('div');
      live.id = 'a11y-confetti-region';
      live.setAttribute('aria-live', 'polite');
      live.setAttribute('aria-atomic', 'true');
      live.className = 'u-sr-only';
      document.body.appendChild(live);
    }
    live.textContent = isEn
      ? 'A celebration animation is playing on screen.'
      : 'Eine Feier-Animation wird auf dem Bildschirm angezeigt.';
  }, 100);

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.width = '6px';
    el.style.height = '6px';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    el.style.left = '50%';
    el.style.top = '50%';
    el.style.pointerEvents = 'none';
    el.style.zIndex = getComputedStyle(document.documentElement).getPropertyValue('--video-z-toast').trim() || '500';

    const angle = (Math.PI * 2 * i) / count;
    const velocity = 80 + Math.random() * 120;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity - 60;
    const rot = Math.random() * 720 - 360;

    el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    container.appendChild(el);

    requestAnimationFrame(() => {
      el.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;
      el.style.opacity = '0';
    });

    setTimeout(() => el.remove(), 900);
  }
}

export function initChecklist() {
  const container = document.querySelector('.video-checklist');
  if (!container) return;

  const items = container.querySelectorAll('.video-checklist__item');
  const ringFill = container.querySelector('.video-checklist__ring-fill');
  const ringText = container.querySelector('.video-checklist__ring-text');
  const completeBtn = container.querySelector('.video-checklist__btn');
  const moduleId = getModuleId();
  const storageKey = getStorageKey();

  if (!items.length) return;

  const total = items.length;
  const circumference = ringFill ? parseFloat(getComputedStyle(ringFill).strokeDasharray) || 226.2 : 226.2;

  function updateProgress() {
    const checked = container.querySelectorAll('.video-checklist__item.is-checked').length;
    const percent = Math.round((checked / total) * 100);

    // Update ring
    if (ringFill) {
      const offset = circumference - (checked / total) * circumference;
      ringFill.style.strokeDashoffset = offset;
    }
    if (ringText) {
      ringText.textContent = `${percent}%`;
    }

      // Enable/disable button based on completion
    if (completeBtn) {
      const isComplete = checked >= total;
      completeBtn.disabled = false;
      completeBtn.classList.toggle('is-ready', isComplete);
    }

    // Save state
    const state = Array.from(items).map(item => item.classList.contains('is-checked'));
    setStorage(storageKey, state);

    // Update global progress for this module
    const globalKey = 'pansonic-module-progress';
    const global = getStorage(globalKey, {});
    global[moduleId] = percent;
    setStorage(globalKey, global);

    // Learning progress is tracked via module completion, not daily streaks
  }

  function completeModule() {
    container.classList.add('is-completed');

    // Build emotional peak: "You mastered Module X!"
    const moduleTitle = document.querySelector('.video-chapter-title')?.textContent?.trim() || '';
    const isEn = document.documentElement.lang === 'en';
    const masteredText = isEn ? 'Mastered' : 'Gemeistert';
    const nextText = isEn ? 'Next module' : 'Nächstes Modul';
    const moduleName = moduleTitle || (isEn ? 'Module' : 'Modul');

    if (completeBtn) {
      completeBtn.innerHTML = `<span>🎬 ${moduleName} ${masteredText}!</span><i class="ph ph-trophy" aria-hidden="true"></i>`;
      completeBtn.disabled = true;
    }

    // Inject "Next Module" link if bottom-nav next link exists
    const nextNavLink = document.querySelector('.video-nav-btn-premium.next');
    if (nextNavLink && !container.querySelector('.video-checklist__next')) {
      const nextHref = nextNavLink.getAttribute('href');
      const nextLabel = nextNavLink.querySelector('.video-nav-label')?.textContent?.trim() || '';
      const nextBtn = document.createElement('a');
      nextBtn.className = 'video-checklist__next';
      nextBtn.href = nextHref;
      nextBtn.innerHTML = `<span>${nextText}: ${nextLabel}</span><i class="ph ph-arrow-right" aria-hidden="true"></i>`;
      const footer = container.querySelector('.video-checklist__footer');
      if (footer) footer.appendChild(nextBtn);
    }

    // Check if this is a FIRST-TIME completion (not a re-check on page reload)
    let isFirstCompletion = false;
    const globalKey = 'pansonic-module-progress';
    const global = getStorage(globalKey, {});
    isFirstCompletion = !global[`${moduleId}_done`];
    global[moduleId] = 100;
    global[`${moduleId}_done`] = true;
    global[`${moduleId}_completedAt`] = new Date().toISOString();
    setStorage(globalKey, global);

    // Confetti only on first completion — not on every page reload
    if (isFirstCompletion) {
      drawConfetti(container);
    }

    // Screenreader announcement
    const liveRegion = document.getElementById('a11y-live-region') || (() => {
      const el = document.createElement('div');
      el.id = 'a11y-live-region';
      el.setAttribute('aria-live', 'polite');
      el.setAttribute('aria-atomic', 'true');
      el.className = 'u-sr-only';
      document.body.appendChild(el);
      return el;
    })();
    liveRegion.textContent = isEn
      ? `Module completed: ${moduleName}. Great job!`
      : `Modul abgeschlossen: ${moduleName}. Super gemacht!`;

    // Dispatch event
    window.dispatchEvent(new CustomEvent('moduleCompleted', { detail: { module: moduleId } }));
  }

  // Load saved state
  const saved = getStorageRaw(storageKey);
  if (saved) {
    try {
      const state = JSON.parse(saved);
      items.forEach((item, i) => {
        if (state[i]) item.classList.add('is-checked');
      });
    } catch (e) { /* silent fail */ }
  }

  // Check if already fully completed
  const globalKey = 'pansonic-module-progress';
  const global = getStorage(globalKey, {});
  if (global[`${moduleId}_done`]) {
    items.forEach(item => item.classList.add('is-checked'));
    container.classList.add('is-completed');

      const moduleTitle = document.querySelector('.video-chapter-title')?.textContent?.trim() || '';
      const isEn = document.documentElement.lang === 'en';
      const masteredText = isEn ? 'Mastered' : 'Gemeistert';
      const nextText = isEn ? 'Next module' : 'Nächstes Modul';
      const moduleName = moduleTitle || (isEn ? 'Module' : 'Modul');

      if (completeBtn) {
        completeBtn.innerHTML = `<span>🎬 ${moduleName} ${masteredText}!</span><i class="ph ph-trophy" aria-hidden="true"></i>`;
        completeBtn.disabled = true;
      }

      // Inject "Next Module" link if not already present
      const nextNavLink = document.querySelector('.video-nav-btn-premium.next');
      if (nextNavLink && !container.querySelector('.video-checklist__next')) {
        const nextHref = nextNavLink.getAttribute('href');
        const nextLabel = nextNavLink.querySelector('.video-nav-label')?.textContent?.trim() || '';
        const nextBtn = document.createElement('a');
        nextBtn.className = 'video-checklist__next';
        nextBtn.href = nextHref;
        nextBtn.innerHTML = `<span>${nextText}: ${nextLabel}</span><i class="ph ph-arrow-right" aria-hidden="true"></i>`;
        const footer = container.querySelector('.video-checklist__footer');
        if (footer) footer.appendChild(nextBtn);
      }
  }

  // Initial progress update
  updateProgress();

  // Bind clicks
  items.forEach(item => {
    item.addEventListener('click', () => {
      if (container.classList.contains('is-completed')) return;
      item.classList.toggle('is-checked');
      updateProgress();
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (container.classList.contains('is-completed')) return;
        item.classList.toggle('is-checked');
        updateProgress();
      }
    });
  });

  // Complete button — always active, warns if incomplete
  if (completeBtn) {
    // Ensure button is clickable (HTML may have disabled attribute)
    completeBtn.disabled = false;

    completeBtn.addEventListener('click', () => {
      const checked = container.querySelectorAll('.video-checklist__item.is-checked').length;
      if (checked >= total) {
        completeModule();
      } else {
        const isEn = document.documentElement.lang === 'en';
        const msg = isEn
          ? `${checked}/${total} items checked`
          : `Nur ${checked}/${total} Punkte abgehakt`;
        const undoLabel = isEn ? 'Complete anyway' : 'Trotzdem abschließen';
        showUndoToast(msg, undoLabel, () => {
          // User confirmed: complete the module even if not all checked
          completeModule();
        });
      }
    });
  }
}
