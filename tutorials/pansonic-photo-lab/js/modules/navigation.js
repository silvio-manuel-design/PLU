/**
 * Navigation Module
 * Desktop dropdowns + Mobile drawer with accordion
 */

export function initMobileNav() {
  // Desktop dropdowns — prevent anchor jump on click
  document.querySelectorAll('.photo-header__dropdown > a[href="#"]').forEach(trigger => {
    trigger.addEventListener('click', e => e.preventDefault());
  });
  const toggle = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-nav');
  const backdrop = document.querySelector('.photo-mobile-nav__backdrop');
  const closeBtn = document.querySelector('.photo-mobile-nav__close');

  if (!toggle || !drawer) return;

  function open() {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    if (backdrop) backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    if (backdrop) backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    if (drawer.classList.contains('is-open')) {
      close();
    } else {
      open();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', close);
  if (backdrop) backdrop.addEventListener('click', close);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      close();
    }
  });

  // Accordion
  drawer.querySelectorAll('.photo-mobile-nav__heading').forEach(heading => {
    heading.addEventListener('click', () => {
      const sub = document.getElementById(heading.getAttribute('aria-controls'));
      const isOpen = heading.getAttribute('aria-expanded') === 'true';

      heading.setAttribute('aria-expanded', String(!isOpen));
      if (sub) sub.hidden = isOpen;

      // Update caret icon
      const caret = heading.querySelector('.ph-caret-down, .ph-caret-up');
      if (caret) {
        caret.classList.toggle('ph-caret-down', isOpen);
        caret.classList.toggle('ph-caret-up', !isOpen);
      }
    });
  });
}

export function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScroll = 0;
  const threshold = 100;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;

    if (current > threshold) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
      header.style.boxShadow = 'none';
    }

    // Hide on scroll down, show on scroll up (mobile only)
    if (window.innerWidth <= 768) {
      if (current > lastScroll && current > threshold) {
        header.classList.add('is-hidden-down');
      } else {
        header.classList.remove('is-hidden-down');
      }
    }

    lastScroll = current;
  }, { passive: true });
}
