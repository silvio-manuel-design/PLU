/**
 * Legacy / Modern Mode Toggle
 * KI Challenge 2026 — Evolution Showcase
 * Controls the global data-mode attribute for visual transformation
 */

const STORAGE_KEY = 'challenge-evolution-mode';

export function initEvolutionToggle() {
  const toggle = document.getElementById('evolution-toggle');
  if (!toggle) return;

  // Load saved preference or default to 'modern'
  const saved = localStorage.getItem(STORAGE_KEY);
  const mode = saved === 'legacy' ? 'legacy' : 'modern';
  setMode(mode);

  toggle.addEventListener('click', () => {
    const current = document.body.dataset.mode || 'modern';
    const next = current === 'modern' ? 'legacy' : 'modern';
    setMode(next);
  });
}

function setMode(mode) {
  document.body.dataset.mode = mode;
  localStorage.setItem(STORAGE_KEY, mode);

  const toggle = document.getElementById('evolution-toggle');
  if (toggle) {
    toggle.setAttribute('aria-pressed', mode === 'modern');
    toggle.setAttribute('aria-label', mode === 'modern' ? 'Modern Mode' : 'Legacy Mode');
    const label = toggle.querySelector('.toggle__label');
    if (label) {
      label.textContent = mode === 'modern' ? '2026' : '2019';
    }
  }

  // Dispatch custom event for other modules
  window.dispatchEvent(new CustomEvent('evolutionmodechange', { detail: { mode } }));
}

export function getMode() {
  return document.body.dataset.mode || 'modern';
}
