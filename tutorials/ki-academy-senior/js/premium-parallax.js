/**
 * KI ACADEMY - PREMIUM PARALLAX EFFECT
 * Mindblowing Academic Grade Parallax for Quote Sections
 * 60fps butter-smooth, professional grade
 */

const PremiumParallax = {
  sections: [],
  ticking: false,
  
  init() {
    // Skip on touch devices for performance
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    // Find all parallax sections
    this.sections = document.querySelectorAll('.parallax-quote-section, .parallax-story-section');
    if (this.sections.length === 0) return;
    
    // Prepare sections
    this.sections.forEach(section => {
      const bg = section.querySelector('.parallax-bg, .parallax-story-bg');
      if (bg) {
        // Ensure proper styling
        bg.style.willChange = 'transform';
        bg.style.position = 'absolute';
        bg.style.top = '-20%';
        bg.style.left = '0';
        bg.style.width = '100%';
        bg.style.height = '140%';
        bg.style.backgroundAttachment = 'scroll'; // Override fixed
      }
    });
    
    // Bind scroll event
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    
    // Initial update
    this.update();
  },
  
  onScroll() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.update();
        this.ticking = false;
      });
      this.ticking = true;
    }
  },
  
  update() {
    const viewportHeight = window.innerHeight;
    const scrolled = window.pageYOffset;
    
    this.sections.forEach(section => {
      const bg = section.querySelector('.parallax-bg, .parallax-story-bg');
      if (!bg) return;
      
      const rect = section.getBoundingClientRect();
      
      // Check if section is in viewport
      if (rect.bottom < 0 || rect.top > viewportHeight) return;
      
      // Calculate parallax position
      // The background moves at 30% of scroll speed
      const sectionCenter = rect.top + (rect.height / 2);
      const viewportCenter = viewportHeight / 2;
      const distanceFromCenter = sectionCenter - viewportCenter;
      
      // Smooth parallax calculation
      const yPos = distanceFromCenter * -0.3;
      
      // Apply transform with GPU acceleration
      bg.style.transform = `translate3d(0, ${yPos}px, 0) scale(1.1)`;
    });
  }
};

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => PremiumParallax.init());
window.PremiumParallax = PremiumParallax;
