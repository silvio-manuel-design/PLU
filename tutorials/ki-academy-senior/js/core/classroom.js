/**
 * KI Academy - Classroom Mode
 * Presentation Mode for Large Screens
 */

const ClassroomMode = {
  isActive: false,
  STORAGE_KEY: 'ki_academy_classroom',
  originalFontSize: null,
  
  init() {
    this.cacheElements();
    this.bindEvents();
    
    // Check if classroom mode was active
    const wasActive = localStorage.getItem(this.STORAGE_KEY) === 'true';
    if (wasActive) {
      this.activate();
    }
  },

  cacheElements() {
    this.headerToggle = document.getElementById('classroom-toggle');
    this.fabToggle = document.getElementById('fab-classroom');
    this.body = document.body;
    this.header = document.getElementById('header');
  },

  bindEvents() {
    if (this.headerToggle) {
      this.headerToggle.addEventListener('click', () => this.toggle());
    }
    
    if (this.fabToggle) {
      this.fabToggle.addEventListener('click', () => this.toggle());
    }
    
    // Keyboard shortcut: Press 'C' to toggle
    document.addEventListener('keydown', (e) => {
      // Only if not typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      if (e.key === 'c' || e.key === 'C') {
        this.toggle();
      }
      
      // Escape to exit classroom mode
      if (e.key === 'Escape' && this.isActive) {
        this.deactivate();
      }
    });
  },

  toggle() {
    if (this.isActive) {
      this.deactivate();
    } else {
      this.activate();
    }
  },

  activate() {
    this.isActive = true;
    this.body.classList.add('classroom-mode');
    
    // Store state
    localStorage.setItem(this.STORAGE_KEY, 'true');
    
    // Update toggle buttons
    this.updateToggleButtons(true);
    
    // Apply classroom styles
    this.applyClassroomStyles();
    
    // Announce for accessibility
    this.announceChange(true);
  },

  deactivate() {
    this.isActive = false;
    this.body.classList.remove('classroom-mode');
    
    // Store state
    localStorage.setItem(this.STORAGE_KEY, 'false');
    
    // Update toggle buttons
    this.updateToggleButtons(false);
    
    // Remove classroom styles
    this.removeClassroomStyles();
    
    // Announce for accessibility
    this.announceChange(false);
  },

  applyClassroomStyles() {
    // Store original font size
    this.originalFontSize = document.documentElement.style.fontSize;
    
    // Increase base font size
    document.documentElement.style.fontSize = '20px';
    
    // Add classroom CSS dynamically
    if (!document.getElementById('classroom-styles')) {
      const style = document.createElement('style');
      style.id = 'classroom-styles';
      style.textContent = `
        .classroom-mode .main-header {
          background: var(--bg-primary) !important;
          padding: var(--space-4) 0;
        }
        
        .classroom-mode .nav-container {
          height: auto;
          padding: var(--space-4) var(--space-6);
        }
        
        .classroom-mode .hero-content,
        .classroom-mode .container-premium,
        .classroom-mode .hero-premium-container {
          max-width: 100%;
          padding: var(--space-16);
        }
        
        .classroom-mode .hero-title {
          font-size: clamp(4rem, 10vw, 8rem);
        }
        
        .classroom-mode .hero-subtitle {
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          max-width: 900px;
        }
        
        .classroom-mode .audience-card {
          min-width: 280px;
          padding: var(--space-8);
        }
        
        .classroom-mode .audience-icon {
          width: 48px;
          height: 48px;
        }
        
        .classroom-mode .audience-label {
          font-size: var(--text-xl);
        }
        
        .classroom-mode .audience-description {
          max-width: 800px;
          padding: var(--space-8);
        }
        
        .classroom-mode .audience-text {
          font-size: var(--text-xl);
        }
        
        .classroom-mode .btn-hero {
          padding: var(--space-6) var(--space-12);
          font-size: var(--text-xl);
        }
        
        .classroom-mode .section-title {
          font-size: clamp(3rem, 6vw, 5rem);
        }
        
        .classroom-mode .mirror-card-title {
          font-size: var(--text-2xl);
        }
        
        .classroom-mode .mirror-card-desc {
          font-size: var(--text-lg);
        }
        
        .classroom-mode .sprint-title {
          font-size: clamp(3rem, 6vw, 5rem);
        }
        
        .classroom-mode .sprint-desc {
          font-size: var(--text-xl);
        }
        
        .classroom-mode .transform-title {
          font-size: clamp(2rem, 4vw, 3rem);
        }
        
        .classroom-mode .transform-list li {
          font-size: var(--text-lg);
        }
        
        .classroom-mode .final-cta-title {
          font-size: clamp(3rem, 6vw, 5rem);
        }
        
        .classroom-mode .final-cta-subtitle {
          font-size: var(--text-xl);
        }
        
        .classroom-mode .final-cta-button {
          padding: var(--space-6) var(--space-12);
          font-size: var(--text-xl);
        }
        
        .classroom-mode .guarantee-item strong {
          font-size: var(--text-3xl);
        }
        
        .classroom-mode .guarantee-item {
          font-size: var(--text-lg);
        }
        
        .classroom-mode .fab-container {
          bottom: var(--space-8);
          right: var(--space-8);
        }
        
        .classroom-mode .fab {
          width: 72px;
          height: 72px;
        }
        
        .classroom-mode .fab svg {
          width: 32px;
          height: 32px;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Hide scroll indicator in classroom mode
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.style.display = 'none';
    }
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  removeClassroomStyles() {
    // Restore original font size
    if (this.originalFontSize) {
      document.documentElement.style.fontSize = this.originalFontSize;
    } else {
      document.documentElement.style.fontSize = '';
    }
    
    // Remove classroom CSS
    const classroomStyles = document.getElementById('classroom-styles');
    if (classroomStyles) {
      classroomStyles.remove();
    }
    
    // Show scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.style.display = '';
    }
  },

  updateToggleButtons(active) {
    const buttons = [this.headerToggle, this.fabToggle].filter(Boolean);
    
    buttons.forEach(btn => {
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active);
      btn.setAttribute('title', active 
        ? 'Klassenraummodus deaktivieren' 
        : 'Klassenraummodus aktivieren'
      );
    });
  },

  announceChange(active) {
    let liveRegion = document.getElementById('classroom-announcement');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'classroom-announcement';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      document.body.appendChild(liveRegion);
    }
    
    const currentLang = document.documentElement.lang || 'de';
    const message = active 
      ? (currentLang === 'de' ? 'Klassenraummodus aktiviert' : 'Classroom mode activated')
      : (currentLang === 'de' ? 'Klassenraummodus deaktiviert' : 'Classroom mode deactivated');
    
    liveRegion.textContent = message;
    
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  },

  isClassroomMode() {
    return this.isActive;
  }
};

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ClassroomMode.init());
} else {
  ClassroomMode.init();
}

window.ClassroomMode = ClassroomMode;
