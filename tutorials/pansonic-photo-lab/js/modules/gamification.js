/**
 * Pansonic Photo Lab — Gamification System
 * Badges, completion toasts. Aligned with Video Lab structure.
 */

import { getStorage, getStorageRaw, setStorageRaw } from './storage.js';

const BADGES_KEY = 'photo-badges';

const BADGE_DATA = {
  m00: { name: 'Starter', icon: 'ph-rocket', color: '#FFD700' },
  m01: { name: 'Kamera-Profi', icon: 'ph-camera', color: '#14B8A6' },
  m02: { name: 'Licht-Magier', icon: 'ph-sun', color: '#FF8C42' },
  m03: { name: 'Blenden-Meister', icon: 'ph-aperture', color: '#4A90D9' },
  m04: { name: 'Komponist', icon: 'ph-grid-four', color: '#7B61FF' },
  m05: { name: 'Licht-Künstler', icon: 'ph-lightning', color: '#F4A261' },
  m06: { name: 'Colorist', icon: 'ph-paint-brush', color: '#E76F51' },
  m07: { name: 'Portrait-Profi', icon: 'ph-user', color: '#E8A0BF' },
  m08: { name: 'Landschafts-Jäger', icon: 'ph-mountains', color: '#2A6B5E' },
  m09: { name: 'Makro-Entdecker', icon: 'ph-magnifying-glass', color: '#A7C957' },
  m10: { name: 'Editor', icon: 'ph-sliders', color: '#5C6B73' },
  m11: { name: 'Meisterfotograf', icon: 'ph-trophy', color: '#FFD700' }
};

/* ── Toast System ────────────────────────────────────────── */

function createToastContainer() {
  let container = document.getElementById('gamification-toasts');
  if (!container) {
    container = document.createElement('div');
    container.id = 'gamification-toasts';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'true');
    document.body.appendChild(container);
  }
  return container;
}

const MAX_VISIBLE_TOASTS = 3;
const TOAST_DISPLAY_MS = 5000;

export function showToast(message, type = 'success') {
  const container = createToastContainer();
  const toast = document.createElement('div');
  toast.className = `photo-gamification-toast photo-gamification-toast--${type}`;
  toast.innerHTML = message;

  container.appendChild(toast);

  const allToasts = container.querySelectorAll('.photo-gamification-toast');
  if (allToasts.length > MAX_VISIBLE_TOASTS) {
    for (let i = 0; i < allToasts.length - MAX_VISIBLE_TOASTS; i++) {
      const old = allToasts[i];
      old.classList.remove('is-visible');
      setTimeout(() => old.remove(), 400);
    }
  }

  requestAnimationFrame(() => {
    toast.classList.add('is-visible');
  });

  setTimeout(() => {
    toast.classList.remove('is-visible');
    setTimeout(() => toast.remove(), 400);
  }, TOAST_DISPLAY_MS);
}

export function showUndoToast(message, undoLabel, onUndo, durationMs = 8000) {
  const container = createToastContainer();
  const toast = document.createElement('div');
  toast.className = 'photo-gamification-toast photo-gamification-toast--undo';
  toast.innerHTML = `
    <div class="photo-gamification-toast__content">
      <span>${message}</span>
    </div>
    <button class="photo-gamification-toast__undo" type="button">${undoLabel}</button>
  `;

  const undoBtn = toast.querySelector('.photo-gamification-toast__undo');
  let dismissed = false;

  undoBtn.addEventListener('click', () => {
    if (dismissed) return;
    dismissed = true;
    toast.classList.remove('is-visible');
    setTimeout(() => toast.remove(), 400);
    if (typeof onUndo === 'function') onUndo();
  });

  container.appendChild(toast);

  const allToasts = container.querySelectorAll('.photo-gamification-toast');
  if (allToasts.length > MAX_VISIBLE_TOASTS) {
    for (let i = 0; i < allToasts.length - MAX_VISIBLE_TOASTS; i++) {
      const old = allToasts[i];
      old.classList.remove('is-visible');
      setTimeout(() => old.remove(), 400);
    }
  }

  requestAnimationFrame(() => {
    toast.classList.add('is-visible');
  });

  setTimeout(() => {
    if (dismissed) return;
    dismissed = true;
    toast.classList.remove('is-visible');
    setTimeout(() => toast.remove(), 400);
  }, durationMs);
}

/* ── Badge System ────────────────────────────────────────── */

export function initBadges() {
  const container = document.getElementById('badgeContainer');
  if (!container) return;

  let earned = [];
  try {
    earned = JSON.parse(localStorage.getItem(BADGES_KEY) || '[]');
  } catch (e) { earned = []; }

  // Check for newly completed modules
  try {
    const global = getStorage('pansonic-module-progress', {});
    Object.keys(BADGE_DATA).forEach(moduleId => {
      if (global[`${moduleId}_done`] && !earned.includes(moduleId)) {
        earned.push(moduleId);
      }
    });
    localStorage.setItem(BADGES_KEY, JSON.stringify(earned));
  } catch (e) { /* silent fail */ }

  renderBadges(container, earned);
}

function renderBadges(container, earned) {
  const isEn = document.documentElement.lang === 'en';

  Object.entries(BADGE_DATA).forEach(([id, badge]) => {
    const isEarned = earned.includes(id);
    const el = document.createElement('div');
    el.className = `photo-gamification-badge ${isEarned ? 'is-earned' : ''}`;
    el.innerHTML = `
      <div class="photo-gamification-badge__icon" style="--badge-color: ${badge.color}">
        <i class="ph ${badge.icon}" aria-hidden="true"></i>
      </div>
      <span class="photo-gamification-badge__name">${badge.name}</span>
    `;
    container.appendChild(el);
  });
}

function showBadgeUnlock(moduleId) {
  const badge = BADGE_DATA[moduleId];
  if (!badge) return;

  const isEn = document.documentElement.lang === 'en';
  const title = isEn ? `You mastered ${badge.name}!` : `Du hast ${badge.name} gemeistert!`;
  const subtitle = isEn ? 'Another skill locked in.' : 'Wieder eine Fähigkeit fest verankert.';

  showToast(`
    <div class="photo-gamification-toast__badge">
      <div class="photo-gamification-toast__icon" style="--badge-color: ${badge.color}">
        <i class="ph ${badge.icon}" aria-hidden="true"></i>
      </div>
      <div class="photo-gamification-toast__content">
        <strong>${title}</strong>
        <span>${subtitle}</span>
      </div>
    </div>
  `, 'badge');
}

/* ── Completion Toast ────────────────────────────────────── */

function showCompletionToast(moduleId) {
  const isEn = document.documentElement.lang === 'en';

  let completedCount = 0;
  try {
    const global = getStorage('pansonic-module-progress', {});
    completedCount = Object.keys(global).filter(k => k.endsWith('_done')).length;
  } catch (e) { /* silent fail */ }

  const total = 12;
  const percent = Math.round((completedCount / total) * 100);

  const messages = isEn ? [
    '🎉 You mastered a new skill!',
    '🔥 Another skill locked in!',
    '🚀 Your skills are stacking up!',
    '💪 Halfway to mastery!',
    '⭐ Almost a complete photographer!',
    '🏆 Final module — you\'re ready!'
  ] : [
    '🎉 Du hast eine neue Fähigkeit gemeistert!',
    '🔥 Nächste Fähigkeit fest verankert!',
    '🚀 Deine Skills wachsen stetig!',
    '💪 Halbzeit auf dem Weg zum Profi!',
    '⭐ Fast ein kompletter Fotograf!',
    '🏆 Letztes Modul — du bist bereit!'
  ];

  const msgIndex = Math.min(completedCount - 1, messages.length - 1);
  const message = messages[msgIndex] || messages[0];

  showToast(`
    <div class="photo-gamification-toast__completion">
      <div class="photo-gamification-toast__icon" style="--badge-color: #FFD700">
        <i class="ph ph-trophy" aria-hidden="true"></i>
      </div>
      <div class="photo-gamification-toast__content">
        <strong>${message}</strong>
        <span>${completedCount}/${total} Module (${percent}%)</span>
      </div>
    </div>
  `, 'completion');
}

/* ── Main Init ───────────────────────────────────────────── */

export function initGamification() {
  // Listen for module completion events
  window.addEventListener('moduleCompleted', (e) => {
    const moduleId = e.detail?.module;
    if (!moduleId) return;

    // Show completion toast
    showCompletionToast(moduleId);

    // Show badge unlock
    setTimeout(() => showBadgeUnlock(moduleId), 600);

    // Update badges display
    initBadges();
  });

  // Init badges on homepage
  initBadges();
}
