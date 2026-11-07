/**
 * Pansonic Video Lab — Navigation Manager
 * Mobile hamburger menu, backdrop, accordion dropdowns, keyboard support
 */

export function initMobileNav() {
  const toggle = document.querySelector('.video-header__toggle');
  const nav = document.querySelector('.video-mobile-nav');
  if (!toggle || !nav) return;

  /* Create backdrop if not present */
  let backdrop = document.querySelector('.video-mobile-nav__backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'video-mobile-nav__backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    if (nav.parentNode) {
      nav.parentNode.insertBefore(backdrop, nav);
    }
  }

  /* Create close button if not present */
  let closeBtn = nav.querySelector('.video-mobile-nav__close');
  if (!closeBtn) {
    closeBtn = document.createElement('button');
    closeBtn.className = 'video-mobile-nav__close';
    closeBtn.setAttribute('aria-label', 'Menü schließen');
    closeBtn.innerHTML = '<i class="ph ph-x" aria-hidden="true"></i>';
    nav.insertBefore(closeBtn, nav.firstChild);
  }

  function open() {
    toggle.classList.add('is-active');
    toggle.setAttribute('aria-expanded', 'true');
    nav.classList.add('is-open');
    nav.setAttribute('aria-hidden', 'false');
    if (backdrop) backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    toggle.classList.remove('is-active');
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    nav.setAttribute('aria-hidden', 'true');
    if (backdrop) backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    nav.classList.contains('is-open') ? close() : open();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', close);
  }

  if (backdrop) {
    backdrop.addEventListener('click', close);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) close();
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', close));

  /* Accordion dropdowns inside mobile nav */
  nav.querySelectorAll('.video-mobile-nav__heading').forEach(heading => {
    heading.addEventListener('click', () => {
      const expanded = heading.getAttribute('aria-expanded') === 'true';
      const subId = heading.getAttribute('aria-controls');
      const sub = document.getElementById(subId);
      const caret = heading.querySelector('.video-nav-caret');
      if (sub) {
        heading.setAttribute('aria-expanded', !expanded);
        sub.hidden = expanded;
        if (caret) {
          caret.classList.toggle('ph-caret-down', expanded);
          caret.classList.toggle('ph-caret-up', !expanded);
        }
      }
    });
  });
}
