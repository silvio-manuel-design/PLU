import { getStorage, setStorage, getStorageRaw, setStorageRaw, removeStorage } from './storage.js';
/**
 * Pansonic Video Lab — Gamification System
 * Badges, completion toasts, and social proof.
 * Streaks removed per quality-audit-runde4 (Overjustification Effect).
 */

const BADGES_KEY = 'pansonic-badges';

const BADGE_DATA = {
  m00: { name: 'Starter', icon: 'ph-rocket', color: '#ffd700' },
  m01: { name: 'Kamera-Profi', icon: 'ph-camera', color: '#2dd4bf' },
  m02: { name: 'Licht-Magier', icon: 'ph-sun', color: '#ffd700' },
  m03: { name: 'Komponist', icon: 'ph-grid-four', color: '#a29bfe' },
  m04: { name: 'Cutter', icon: 'ph-scissors', color: '#ff5a5a' },
  m05: { name: 'Colorist', icon: 'ph-paint-brush', color: '#a29bfe' },
  m06: { name: 'Sound-Designer', icon: 'ph-speaker-high', color: '#2dd4bf' },
  m07: { name: 'Motion-Artist', icon: 'ph-aperture', color: '#ff5a5a' },
  m08: { name: 'KI-Pionier', icon: 'ph-brain', color: '#a29bfe' },
  m09: { name: 'Exporter', icon: 'ph-export', color: '#2dd4bf' },
  m10: { name: 'Storyteller', icon: 'ph-book-open', color: '#ffd700' },
  m11: { name: 'Regisseur', icon: 'ph-film-strip', color: '#ffd700' }
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
  toast.className = `video-gamification-toast video-gamification-toast--${type}`;
  toast.innerHTML = message;

  container.appendChild(toast);

  // Enforce max visible toasts — remove oldest first
  const allToasts = container.querySelectorAll('.video-gamification-toast');
  if (allToasts.length > MAX_VISIBLE_TOASTS) {
    for (let i = 0; i < allToasts.length - MAX_VISIBLE_TOASTS; i++) {
      const old = allToasts[i];
      old.classList.remove('is-visible');
      setTimeout(() => old.remove(), 400);
    }
  }

  // Animate in
  requestAnimationFrame(() => {
    toast.classList.add('is-visible');
  });

  // Auto-dismiss
  setTimeout(() => {
    toast.classList.remove('is-visible');
    setTimeout(() => toast.remove(), 400);
  }, TOAST_DISPLAY_MS);
}

export function showUndoToast(message, undoLabel, onUndo, durationMs = 8000) {
  const container = createToastContainer();
  const toast = document.createElement('div');
  toast.className = 'video-gamification-toast video-gamification-toast--undo';
  toast.innerHTML = `
    <div class="video-gamification-toast__content">
      <span>${message}</span>
    </div>
    <button class="video-gamification-toast__undo" type="button">${undoLabel}</button>
  `;

  const undoBtn = toast.querySelector('.video-gamification-toast__undo');
  let dismissed = false;

  undoBtn.addEventListener('click', () => {
    if (dismissed) return;
    dismissed = true;
    toast.classList.remove('is-visible');
    setTimeout(() => toast.remove(), 400);
    if (typeof onUndo === 'function') onUndo();
  });

  container.appendChild(toast);

  const allToasts = container.querySelectorAll('.video-gamification-toast');
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

  const timer = setTimeout(() => {
    if (dismissed) return;
    dismissed = true;
    toast.classList.remove('is-visible');
    setTimeout(() => toast.remove(), 400);
  }, durationMs);

  return () => {
    if (dismissed) return;
    dismissed = true;
    clearTimeout(timer);
    toast.classList.remove('is-visible');
    setTimeout(() => toast.remove(), 400);
  };
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
    el.className = `video-gamification-badge ${isEarned ? 'is-earned' : 'is-locked'}`;
    el.innerHTML = `
      <div class="video-gamification-badge__icon" style="--badge-color: ${badge.color}">
        <i class="ph ${badge.icon}" aria-hidden="true"></i>
      </div>
      <span class="video-gamification-badge__name">${badge.name}</span>
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
    <div class="video-gamification-toast__badge">
      <div class="video-gamification-toast__icon" style="--badge-color: ${badge.color}">
        <i class="ph ${badge.icon}" aria-hidden="true"></i>
      </div>
      <div class="video-gamification-toast__content">
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
    '⭐ Almost a complete filmmaker!',
    '🏆 Final module — you\'re ready!'
  ] : [
    '🎉 Du hast eine neue Fähigkeit gemeistert!',
    '🔥 Nächste Fähigkeit fest verankert!',
    '🚀 Deine Skills wachsen stetig!',
    '💪 Halbzeit auf dem Weg zum Profi!',
    '⭐ Fast ein kompletter Filmemacher!',
    '🏆 Letztes Modul — du bist bereit!'
  ];

  const msgIndex = Math.min(completedCount - 1, messages.length - 1);
  const message = messages[msgIndex] || messages[0];

  showToast(`
    <div class="video-gamification-toast__completion">
      <div class="video-gamification-toast__icon" style="--badge-color: var(--video-accent-gold)">
        <i class="ph ph-trophy" aria-hidden="true"></i>
      </div>
      <div class="video-gamification-toast__content">
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
