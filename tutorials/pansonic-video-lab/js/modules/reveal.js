/**
 * Pansonic Video Lab — Scroll Reveal
 * IntersectionObserver-based entrance animations with safety net
 */

export function initReveal(prefersReducedMotion = false) {
  if (prefersReducedMotion) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

  /* Safety net for restricted environments (school proxies, noscript blockers) */
  setTimeout(() => {
    document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach(el => {
      el.classList.add('is-revealed');
    });
  }, 3000);
}
