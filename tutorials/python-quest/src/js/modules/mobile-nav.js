/**
 * PYTHON QUEST — Mobile Navigation
 */

export function initMobileNav() {
  const toggle = document.querySelector('[data-mobile-toggle]');
  const close = document.querySelector('[data-mobile-close]');
  const backdrop = document.querySelector('[data-mobile-backdrop]');
  const nav = document.querySelector('[data-mobile-nav]');
  
  if (!toggle || !nav) return;
  
  function open() {
    nav.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  
  function closeNav() {
    nav.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  
  toggle.addEventListener('click', open);
  if (close) close.addEventListener('click', closeNav);
  if (backdrop) backdrop.addEventListener('click', closeNav);
  
  // Close on link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });
  
  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeNav();
    }
  });
}
