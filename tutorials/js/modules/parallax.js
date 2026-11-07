/**
 * PARALLAX MANAGER - Premium Multi-Layer Parallax
 * 
 * Features:
 * - Background images move at slow speed (0.3x)
 * - Text content moves at faster speed (1.2x) in opposite direction
 * - Text positioned in lower third
 * - True parallax depth effect
 * - Intersection Observer for performance
 * - Respects prefers-reduced-motion
 */

export class ParallaxManager {
  constructor() {
    this.sections = document.querySelectorAll('.parallax-section');
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isClassroomMode = document.documentElement.classList.contains('classroom-mode');
    
    // Don't initialize if reduced motion or classroom mode
    if (this.prefersReducedMotion || this.isClassroomMode) {
      console.log('Parallax: Disabled (reduced-motion/classroom)');
      return;
    }
    
    this.init();
  }

  init() {
    if (this.sections.length === 0) return;
    
    // Parallax content positioning is handled by CSS (parallax-mobile-first.css)
    // No inline styles needed - maintains separation of concerns
    
    // Use Intersection Observer for performance
    const observerOptions = {
      root: null,
      rootMargin: '100px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1]
    };
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startParallax(entry.target);
        } else {
          this.stopParallax(entry.target);
        }
      });
    }, observerOptions);
    
    this.sections.forEach(section => {
      this.observer.observe(section);
    });
    
    console.log('Parallax: Initialized with multi-layer effect');
  }

  startParallax(section) {
    const bg = section.querySelector('.parallax-bg');
    const content = section.querySelector('.parallax-content');
    
    if (!bg && !content) return;
    
    section.dataset.parallaxActive = 'true';
    
    const handleScroll = () => this.updateParallax(section, bg, content);
    
    section._parallaxHandler = handleScroll;
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    handleScroll();
  }

  stopParallax(section) {
    section.dataset.parallaxActive = 'false';
    
    if (section._parallaxHandler) {
      window.removeEventListener('scroll', section._parallaxHandler);
      delete section._parallaxHandler;
    }
  }

  updateParallax(section, bg, content) {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Only calculate when section is visible
    if (rect.bottom < 0 || rect.top > windowHeight) return;
    
    // Calculate progress: 0 = entering bottom, 0.5 = center, 1 = leaving top
    const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
    
    // Center point for calculation
    const centerOffset = progress - 0.5;
    
    // BACKGROUND: Moves slowly (0.2x scroll speed) - creates depth
    // Background moves UP slower than scroll
    if (bg) {
      const bgSpeed = 0.2;
      const bgMaxOffset = 30; // 30% movement range
      const bgOffset = centerOffset * bgMaxOffset * 2 * bgSpeed;
      
      requestAnimationFrame(() => {
        bg.style.transform = `translate3d(0, ${bgOffset}%, 0)`;
      });
    }
    
    // CONTENT: Moves faster (1.0x scroll speed) in OPPOSITE direction
    // Text moves DOWN while user scrolls UP, creating counter-motion
    if (content) {
      const textSpeed = 0.8;
      const textMaxOffset = 20; // 20% movement range
      const textOffset = centerOffset * textMaxOffset * 2 * textSpeed * -1; // Negative = opposite direction
      
      requestAnimationFrame(() => {
        content.style.transform = `translate3d(0, ${textOffset}%, 0)`;
      });
    }
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    
    this.sections.forEach(section => {
      this.stopParallax(section);
    });
  }
}
