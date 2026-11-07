/**
 * PYTHON CLASSIC — Back to Top Button
 * Scroll-triggered, smooth scroll to top
 */

export function initBackToTop() {
  const btns = document.querySelectorAll('[data-back-to-top]');
  if (!btns.length) return;

  const threshold = 300;

  function toggleVisibility() {
    const scrolled = window.scrollY;
    btns.forEach(btn => {
      // Only toggle visibility for FAB buttons (fixed positioned)
      // Header buttons are always visible
      if (btn.classList.contains('py-classic-back-to-top')) {
        if (scrolled > threshold) {
          btn.classList.add('is-visible');
        } else {
          btn.classList.remove('is-visible');
        }
      }
    });
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();
}
