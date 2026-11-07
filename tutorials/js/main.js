/**
 * PANTAM LEARNING UNIVERSE v3.0
 * Main JavaScript Entry Point
 * 
 * Modular Architecture:
 * - ES6 Modules für saubere Trennung
 * - Feature Detection für Progressive Enhancement
 * - Mobile-First Event Handling
 * - Performance optimiert (Intersection Observer, etc.)
 */

import { ThemeManager } from './modules/theme.js';
import { Navigation } from './modules/navigation.js';
import { ParallaxManager } from './modules/parallax.js';
import { ClassroomManager, initWebPFallback } from './modules/classroom.js';
import { RevealAnimations, animateCounter } from './modules/animations.js';
import { ModalManager } from './modules/modal.js';
import { VisionModalManager } from './modules/vision-modal.js';

/**
 * Initialize Application
 * Runs when DOM is ready
 */
function init() {
  console.log('🚀 PLU v3.0 initializing...');
  
  // 1. Feature Detection & Fallbacks
  initWebPFallback();
  
  // 1b. Optional Custom Cursor
  initCursorIfEnabled();
  
  // 2. Core Modules
  const themeManager = new ThemeManager();
  const navigation = new Navigation();
  const classroomManager = new ClassroomManager();
  const modalManager = new ModalManager();
  
  // 2b. Vision & Jugendliche Page Specific Modules
  if (document.querySelector('.vision-card--featured, .bridge-card, .value-card, .responsibility-card, .pledge-card, .learning-card, .tool-card, .insight-card, .benefit-card')) {
    const visionModalManager = new VisionModalManager();
  }
  
  // 3. Animation Modules (only if not reduced motion)
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const parallaxManager = new ParallaxManager();
    const revealAnimations = new RevealAnimations();
  }
  
  // 4. Header Scroll Effect
  initHeaderScroll();
  
  // 5. Smooth Scroll for Anchor Links
  initSmoothScroll();
  
  // 6. Lexikon Accordion (if on lexikon page)
  initLexikonAccordion();
  
  // 7. Counter Animations (stats with data-count)
  initCounters();
  
  console.log('✅ PLU v3.0 ready');
}

/**
 * Optional Custom Cursor
 * Enable via browser console: localStorage.setItem('plu-cursor', 'true'); location.reload();
 * Disable via: localStorage.removeItem('plu-cursor'); location.reload();
 */
function initCursorIfEnabled() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (localStorage.getItem('plu-cursor') !== 'true') return;
  
  document.body.insertAdjacentHTML('beforeend',
    '<div class="cursor-dot" id="cursor-dot"></div>' +
    '<div class="cursor-outline" id="cursor-outline"></div>'
  );
  
  import('./modules/cursor.js').then(m => m.initCursor());
}

/**
 * Header Scroll Effect
 * Adds class when scrolling past threshold
 */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  
  let ticking = false;
  const threshold = 50;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > threshold) {
          header.classList.add('site-header--scrolled');
        } else {
          header.classList.remove('site-header--scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Smooth Scroll for Anchor Links
 * Handles internal navigation smoothly
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      e.preventDefault();
      
      const headerHeight = document.getElementById('header')?.offsetHeight || 0;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Update URL without jumping
      history.pushState(null, '', targetId);
      
      // Set focus for accessibility
      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus({ preventScroll: true });
    });
  });
}

/**
 * Service Worker Registration (PWA)
 * Optional: Enable for offline support
 */
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered:', registration);
        })
        .catch(error => {
          console.log('SW registration failed:', error);
        });
    });
  }
}

/**
 * Lexikon Accordion
 * Toggles term cards on click
 */
function initLexikonAccordion() {
  const termHeaders = document.querySelectorAll('.term-header');
  if (!termHeaders.length) return;
  
  termHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.term-card');
      if (!card) return;
      
      const isExpanded = card.classList.contains('expanded');
      
      // Optional: close other cards (accordion behavior)
      // Uncomment the next 3 lines if you want only one open at a time
      // document.querySelectorAll('.term-card.expanded').forEach(openCard => {
      //   if (openCard !== card) openCard.classList.remove('expanded');
      // });
      
      card.classList.toggle('expanded', !isExpanded);
      header.setAttribute('aria-expanded', String(!isExpanded));
    });
  });
}

/**
 * Counter Animation for data-count elements
 * Uses IntersectionObserver to trigger when visible
 */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length === 0) return;
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.count, 10);
      if (!isNaN(target)) counter.textContent = target.toLocaleString();
    });
    return;
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count, 10);
        if (!isNaN(target)) {
          animateCounter(entry.target, target, 2000);
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px'
  });
  
  counters.forEach(counter => observer.observe(counter));
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for external access if needed
window.PLU = {
  version: '3.0.0',
  init
};
