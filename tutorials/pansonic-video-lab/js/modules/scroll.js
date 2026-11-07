/**
 * Pansonic Video Lab — Scroll Utilities
 * Back-to-top, smooth scroll anchors, header shadow, scroll progress bar
 */

export function initBackToTop(prefersReducedMotion = false) {
  const btns = document.querySelectorAll('.video-back-to-top');
  if (!btns.length) return;

  window.addEventListener('scroll', () => {
    btns.forEach(btn => {
      btn.classList.toggle('is-visible', window.scrollY > 500);
    });
  }, { passive: true });

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  });
}

export function initSmoothScroll(prefersReducedMotion = false) {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  });
}

export function initHeaderScroll() {
  const header = document.querySelector('.video-header');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const isMobile = window.matchMedia('(max-width: 768px)').matches;

        header.classList.toggle('is-scrolled', currentY > 50);

        if (isMobile) {
          if (currentY > lastScrollY && currentY > 100) {
            header.classList.add('is-hidden-down');
          } else {
            header.classList.remove('is-hidden-down');
          }
        }

        lastScrollY = currentY;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

export function initScrollProgress() {
  const bar = document.getElementById('scrollProgressBar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  }, { passive: true });
}

/**
 * Module page scroll progress bar (#progressBar)
 * Uses a stable max-scroll value to prevent jumps when lazy-loaded
 * images change document height.
 */
export function initModuleScrollProgress() {
  const bar = document.getElementById('progressBar');
  if (!bar) return;

  let maxScroll = 0;
  let rafId = 0;

  function recalcMaxScroll() {
    maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  }

  function updateProgress() {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = 0;
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      // Clamp to avoid overflow glitches
      const progress = maxScroll > 0 ? Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100)) : 0;
      bar.style.width = progress + '%';
    });
  }

  // Initial calc + recalc on resize (images may have loaded)
  recalcMaxScroll();
  window.addEventListener('resize', recalcMaxScroll, { passive: true });

  // Recalc after a short delay to catch initial lazy-image loads
  window.addEventListener('load', () => {
    recalcMaxScroll();
    updateProgress();
  }, { once: true });

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}
