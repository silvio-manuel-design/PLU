/**
 * Scroll Module
 */

export function initHeaderScroll() {
  // Handled by navigation.js for Video Lab compatibility
}

export function initScrollProgress() {
  const bar = document.getElementById('scrollProgressBar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
  }, { passive: true });
}

export function initModuleScrollProgress() {
  const bar = document.getElementById('progressBar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const main = document.getElementById('main-content');
    if (!main) return;
    const rect = main.getBoundingClientRect();
    const mainTop = rect.top + window.scrollY;
    const mainHeight = main.offsetHeight - window.innerHeight;
    const progress = mainHeight > 0
      ? Math.max(0, Math.min(100, ((window.scrollY - mainTop) / mainHeight) * 100))
      : 0;
    bar.style.width = `${progress}%`;
  }, { passive: true });
}

export function initBackToTop(prefersReducedMotion) {
  const btn = document.getElementById('back-to-top');
  if (btn) {
    window.addEventListener('scroll', () => {
      btn.classList.toggle('is-visible', window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  /* FAB back-to-top (homepage, chapter pages) */
  const fab = document.querySelector('.photo-back-to-top');
  if (fab) {
    window.addEventListener('scroll', () => {
      fab.classList.toggle('is-visible', window.scrollY > 500);
    }, { passive: true });

    fab.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  /* FAB back-to-top (chapter pages — id selector) */
  const fabBtn = document.getElementById('back-to-top-fab');
  if (fabBtn) {
    window.addEventListener('scroll', () => {
      fabBtn.classList.toggle('is-visible', window.scrollY > 500);
    }, { passive: true });

    fabBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }
}

export function initSmoothScroll(prefersReducedMotion) {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });
}

export function initBottomNav() {
  const bottomNav = document.querySelector('.photo-module-nav-footer');
  if (!bottomNav) return;

  const progressFill = bottomNav.querySelector('.photo-nav-progress-fill');
  const showThreshold = 200;

  function updateBottomNav() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    if (scrollY > showThreshold) {
      bottomNav.classList.add('is-visible');
      document.body.classList.add('has-bottom-nav');
    } else {
      bottomNav.classList.remove('is-visible');
      document.body.classList.remove('has-bottom-nav');
    }

    if (progressFill) {
      const baseModule = parseInt(progressFill.dataset.base) || 0;
      const moduleFraction = 100 / 12;
      const scrollContribution = (scrollPercent / 100) * moduleFraction;
      const currentProgress = Math.min(baseModule * moduleFraction + scrollContribution, 100);
      progressFill.style.width = currentProgress + '%';
    }
  }

  window.addEventListener('scroll', updateBottomNav, { passive: true });
  updateBottomNav();
}
