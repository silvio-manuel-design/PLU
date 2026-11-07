/**
 * PYTHON CLASSIC — Navigation Module
 * Mobile menu, scroll progress, smooth scroll, back-to-top
 */

export function initNavigation() {
  initMobileMenu();
  initScrollProgress();
  initSmoothScroll();
}

/* Mobile Menu */
function initMobileMenu() {
  const toggle = document.querySelector('[data-mobile-toggle]');
  const close = document.querySelector('[data-mobile-close]');
  const nav = document.querySelector('[data-mobile-nav]');
  const backdrop = document.querySelector('[data-mobile-backdrop]');

  if (!toggle || !nav) return;

  function open() {
    nav.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-open');
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    if (nav.classList.contains('is-open')) {
      closeMenu();
    } else {
      open();
    }
  });

  if (close) close.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  // Close on link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* Scroll Progress Bar */
function initScrollProgress() {
  const bar = document.querySelector('[data-scroll-progress]');
  if (!bar) return;

  function update() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* Smooth Scroll for Anchor Links */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
