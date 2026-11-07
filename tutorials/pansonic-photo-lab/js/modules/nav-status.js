/**
 * Nav Status Module
 * Highlights current module in navigation
 */

export function initNavStatus() {
  const moduleId = document.body.getAttribute('data-module');
  if (!moduleId) return;

  document.querySelectorAll(`[data-nav-module="${moduleId}"]`).forEach(el => {
    el.classList.add('is-active');
  });
}
