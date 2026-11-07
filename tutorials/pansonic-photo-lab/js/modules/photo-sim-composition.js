/**
 * Pansonic Photo Lab — Composition Overlay
 * Interactive grid overlays for visual composition training
 * Adapted from Video Lab composition simulator
 */

export function initPhotoSimComposition() {
  const container = document.querySelector('[data-sim-composition]');
  if (!container) return;

  const frame = container.querySelector('.photo-sim-composition__frame');
  const toggles = container.querySelectorAll('[data-sim-overlay]');

  if (!frame || !toggles.length) return;

  // Set initial ARIA states
  toggles.forEach(toggle => {
    toggle.setAttribute('aria-pressed', 'false');
  });

  // Set overlays to aria-hidden by default
  frame.querySelectorAll('.photo-sim-composition__overlay').forEach(el => {
    el.setAttribute('aria-hidden', 'true');
  });

  toggles.forEach(toggle => {
    toggle.addEventListener('click', onToggleClick);
  });

  function onToggleClick() {
    const key = this.dataset.simOverlay;
    const isActive = this.classList.contains('is-active');

    if (isActive) {
      this.classList.remove('is-active');
      this.setAttribute('aria-pressed', 'false');
      hideOverlay(key);
    } else {
      this.classList.add('is-active');
      this.setAttribute('aria-pressed', 'true');
      showOverlay(key);
    }
  }

  function showOverlay(key) {
    const overlay = frame.querySelector(`.photo-sim-composition__overlay--${key}`);
    if (overlay) {
      overlay.classList.add('is-visible');
      overlay.setAttribute('aria-hidden', 'false');
    }

    frame.querySelectorAll('.photo-sim-composition__hotspot').forEach(h => {
      h.classList.toggle('is-visible', key === 'thirds');
    });

    // Subjects removed — using real gallery image instead
  }

  function hideOverlay(key) {
    const overlay = frame.querySelector(`.photo-sim-composition__overlay--${key}`);
    if (overlay) {
      overlay.classList.remove('is-visible');
      overlay.setAttribute('aria-hidden', 'true');
    }

    const anyActive = Array.from(toggles).some(t => t.classList.contains('is-active'));
    if (!anyActive) {
      frame.querySelectorAll('.photo-sim-composition__hotspot').forEach(h => {
        h.classList.remove('is-visible');
      });
      // Subjects removed — using real gallery image instead
    }
  }

  return function cleanup() {
    toggles.forEach(toggle => {
      toggle.removeEventListener('click', onToggleClick);
    });
  };
}
