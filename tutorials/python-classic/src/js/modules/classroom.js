/**
 * PYTHON CLASSIC — Classroom Mode
 * Reduces visual distractions for frontal teaching
 * Toggle: Shift + C
 */

const STORAGE_KEY = 'plu-classroom';
const CLASS_NAME = 'is-classroom-mode';

function isEnabled() {
  return localStorage.getItem(STORAGE_KEY) === 'true';
}

function setEnabled(enabled) {
  document.documentElement.classList.toggle(CLASS_NAME, enabled);
  localStorage.setItem(STORAGE_KEY, enabled ? 'true' : 'false');
}

export function toggleClassroom() {
  const enabled = !document.documentElement.classList.contains(CLASS_NAME);
  setEnabled(enabled);
  return enabled;
}

export function initClassroom() {
  // Restore state
  if (isEnabled()) {
    setEnabled(true);
  }

  // Button toggle
  document.querySelectorAll('[data-classroom-toggle]').forEach(btn => {
    btn.addEventListener('click', toggleClassroom);
  });

  // Keyboard shortcut: Shift + C
  document.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.key === 'C') {
      e.preventDefault();
      toggleClassroom();
    }
  });
}
