/**
 * XP System — Gamification Progress
 * Tracks user progress through the challenge
 */

const XP_PER_LEVEL = 100;

function getXPState() {
  const saved = sessionStorage.getItem('challenge-xp');
  if (saved) return JSON.parse(saved);
  return { level: 1, xp: 0, history: [] };
}

function saveXPState(state) {
  sessionStorage.setItem('challenge-xp', JSON.stringify(state));
}

export function addXP(amount, reason = '') {
  const state = getXPState();
  state.xp += amount;
  state.history.push({ amount, reason, time: Date.now() });

  while (state.xp >= XP_PER_LEVEL) {
    state.xp -= XP_PER_LEVEL;
    state.level++;
    triggerLevelUp(state.level);
  }

  saveXPState(state);
  renderXPBar();
  showXPGain(amount);
}

function renderXPBar() {
  const state = getXPState();
  const fill = document.getElementById('xp-bar-fill');
  const value = document.getElementById('xp-value');
  const level = document.getElementById('xp-level');
  const heroBadge = document.querySelector('.challenge-level-badge');

  if (fill) fill.style.setProperty('--xp-bar-width', `${(state.xp / XP_PER_LEVEL) * 100}%`);
  if (value) value.textContent = `${state.xp} / ${XP_PER_LEVEL}`;
  if (level) level.textContent = state.level;
  if (heroBadge) heroBadge.textContent = state.level;
}

function showXPGain(amount) {
  const el = document.createElement('div');
  el.className = 'challenge-xp-gain';
  el.textContent = `+${amount} XP`;
  el.style.setProperty('--xp-x', '50%');
  el.style.setProperty('--xp-y', '80px');
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1500);
}

function triggerLevelUp(newLevel) {
  const heroBadge = document.querySelector('.challenge-level-badge');
  if (heroBadge) {
    heroBadge.style.animation = 'none';
    heroBadge.offsetHeight; // reflow
    heroBadge.style.animation = 'challenge-level-pulse 0.5s ease 3';
  }
}

export function initXP() {
  renderXPBar();

  // Award XP for visiting the page
  if (!sessionStorage.getItem('challenge-xp-visited')) {
    sessionStorage.setItem('challenge-xp-visited', '1');
    setTimeout(() => addXP(10, 'Willkommen'), 500);
  }
}

export function getLevel() {
  return getXPState().level;
}
