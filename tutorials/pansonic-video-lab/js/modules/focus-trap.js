/**
 * Pansonic Video Lab — Focus Trap Utility
 * Keeps keyboard focus inside a modal/container while it is open.
 */

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(', ');

/**
 * Activate focus trap within a container.
 * @param {HTMLElement} container — the modal element
 * @param {object} options
 * @param {HTMLElement|null} options.returnTo — element to return focus to on deactivate
 * @returns {Function} deactivate — call to remove listeners and restore focus
 */
export function trapFocus(container, options = {}) {
  if (!container) return () => {};

  const previouslyFocused = options.returnTo || document.activeElement;

  // Move focus to first focusable element
  const focusables = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));
  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (first) {
    first.focus();
  }

  function onKeyDown(e) {
    if (e.key !== 'Tab') return;

    // If no focusables, prevent tab entirely
    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }

    if (e.shiftKey) {
      if (document.activeElement === first || !container.contains(document.activeElement)) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last || !container.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  container.addEventListener('keydown', onKeyDown);

  return function deactivate() {
    container.removeEventListener('keydown', onKeyDown);
    if (previouslyFocused && previouslyFocused.focus) {
      previouslyFocused.focus();
    }
  };
}
