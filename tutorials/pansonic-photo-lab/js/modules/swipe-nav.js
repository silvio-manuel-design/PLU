/**
 * Pansonic Photo Lab — Swipe Navigation between modules (mobile only)
 * Swipe left/right on chapter content to navigate between modules.
 */

const SWIPE_THRESHOLD = 80;   // px — min horizontal distance to trigger
const VERTICAL_TOLERANCE = 60; // px — max vertical drift allowed

export function initSwipeNav() {
  // Only enable on touch-capable mobile devices
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (!isMobile || !('ontouchstart' in window)) return;

  const content = document.querySelector('.photo-chapter-content') || document.querySelector('main');
  if (!content) return;

  let startX = 0;
  let startY = 0;

  content.addEventListener('touchstart', (e) => {
    const touch = e.changedTouches[0];
    startX = touch.clientX;
    startY = touch.clientY;
  }, { passive: true });

  content.addEventListener('touchend', (e) => {
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;

    // Ignore vertical-dominant gestures (normal scrolling)
    if (Math.abs(deltaY) > VERTICAL_TOLERANCE) return;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

    // Swipe left (negative deltaX) → next module
    // Swipe right (positive deltaX) → previous module
    const direction = deltaX < 0 ? 'next' : 'prev';
    const navLink = document.querySelector(`.photo-nav-btn-premium.${direction}`);

    if (navLink) {
      const href = navLink.getAttribute('href');
      if (href && href !== '#' && !href.startsWith('javascript')) {
        // Visual feedback before navigation
        showSwipeFeedback(content, direction);
        setTimeout(() => {
          window.location.href = href;
        }, 150);
      }
    }
  }, { passive: true });
}

function showSwipeFeedback(container, direction) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: ${direction === 'next' ? 'flex-end' : 'flex-start'};
    padding: 0 40px;
    background: rgba(0,0,0,0.1);
    pointer-events: none;
    transition: opacity 0.15s ease;
  `;
  overlay.innerHTML = `
    <span style="font-size: 2rem; color: var(--photo-text-primary); opacity: 0.6;">
      <i class="ph ph-arrow-${direction === 'next' ? 'right' : 'left'}" aria-hidden="true"></i>
    </span>
  `;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => {
    overlay.style.opacity = '1';
  });
  setTimeout(() => {
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 150);
  }, 100);
}
