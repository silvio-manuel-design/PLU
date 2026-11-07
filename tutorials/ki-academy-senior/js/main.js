/**
 * KI Academy - Main Initialization
 * Coordinates all modules and components
 */

const KIAcademy = {
  version: '2.0.0',
  
  init() {
    console.log(`🎓 KI Academy v${this.version} initialized`);
    
    // Check if all required modules are loaded
    this.checkModules();
    
    // Initialize scroll animations
    this.initScrollAnimations();
    
    // Initialize intersection observers
    this.initObservers();
  },

  checkModules() {
    const modules = {
      'ThemeManager': window.ThemeManager,
      'Navigation': window.Navigation,
      'I18n': window.I18n,
      'ClassroomMode': window.ClassroomMode,
      'AudienceSelector': window.AudienceSelector,
      'FABManager': window.FABManager,
      'Preloader': window.Preloader
    };
    
    let allLoaded = true;
    
    for (const [name, module] of Object.entries(modules)) {
      if (!module) {
        console.warn(`⚠️ Module not loaded: ${name}`);
        allLoaded = false;
      }
    }
    
    if (allLoaded) {
      console.log('✅ All modules loaded successfully');
    }
  },

  initScrollAnimations() {
    // Simple scroll-based animations using Intersection Observer
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
  },

  initObservers() {
    // Performance observer for debugging
    if ('PerformanceObserver' in window && location.hostname === 'localhost') {
      try {
        const perfObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            console.log(`📊 ${entry.name}: ${Math.round(entry.startTime)}ms`);
          }
        });
        perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
      } catch (e) {
        // PerformanceObserver not supported
      }
    }
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => KIAcademy.init());
} else {
  KIAcademy.init();
}

// Expose globally
window.KIAcademy = KIAcademy;
