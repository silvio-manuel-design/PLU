/**
 * REVEAL ANIMATIONS
 * Scroll-triggered fade-in animations
 * 
 * Features:
 * - Intersection Observer for performance
 * - Stagger support for lists
 * - Respects prefers-reduced-motion
 */

export class RevealAnimations {
  constructor() {
    this.elements = document.querySelectorAll('.reveal');
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // If reduced motion, show all immediately
    if (this.prefersReducedMotion) {
      this.elements.forEach(el => {
        el.classList.add('revealed');
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }
    
    this.init();
  }

  init() {
    if (this.elements.length === 0) return;
    
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px', // Trigger slightly before in view
      threshold: 0.1
    };
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.reveal(entry.target);
          this.observer.unobserve(entry.target); // Only animate once
        }
      });
    }, observerOptions);
    
    this.elements.forEach(el => {
      this.observer.observe(el);
    });
  }

  reveal(element) {
    // Add stagger delay based on index
    const parent = element.parentElement;
    if (parent) {
      const siblings = Array.from(parent.querySelectorAll('.reveal'));
      const index = siblings.indexOf(element);
      const staggerDelay = index * 100; // 100ms stagger
      
      element.style.transitionDelay = `${staggerDelay}ms`;
    }
    
    // Trigger animation
    requestAnimationFrame(() => {
      element.classList.add('revealed');
    });
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

/**
 * UTILITY: Animate on Demand
 * For triggering animations programmatically
 */
export function animateElement(element, animationClass = 'animate-fade-up') {
  if (!element) return;
  
  element.classList.add(animationClass);
  
  // Remove class after animation completes
  element.addEventListener('animationend', () => {
    element.classList.remove(animationClass);
  }, { once: true });
}

/**
 * UTILITY: Counter Animation
 * For animating numbers (stats, etc.)
 */
export function animateCounter(element, targetValue, duration = 2000) {
  if (!element) return;
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    element.textContent = targetValue;
    return;
  }
  
  const startTime = performance.now();
  const startValue = 0;
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out quad
    const easeProgress = 1 - (1 - progress) * (1 - progress);
    const currentValue = Math.floor(startValue + (targetValue - startValue) * easeProgress);
    
    element.textContent = currentValue.toLocaleString();
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}
