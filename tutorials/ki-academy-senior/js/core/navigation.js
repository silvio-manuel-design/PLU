/**
 * KI Academy - Navigation Manager
 * Mobile Menu, Dropdown, Smooth Scroll, Header Scroll Effect
 */

const Navigation = {
  header: null,
  mobileMenu: null,
  mobileToggle: null,
  mobileClose: null,
  moduleDropdown: null,
  moduleToggle: null,
  
  init() {
    this.cacheElements();
    this.bindEvents();
    this.initScrollEffect();
  },

  cacheElements() {
    this.header = document.getElementById('header');
    this.mobileMenu = document.getElementById('mobile-menu');
    this.mobileToggle = document.getElementById('nav-toggle');
    this.mobileClose = document.getElementById('mobile-menu-close');
    this.moduleDropdown = document.getElementById('module-dropdown');
    this.moduleToggle = this.moduleDropdown?.querySelector('.module-dropdown-toggle');
    this.backToTopNav = document.getElementById('back-to-top-nav');
    this.fabBackToTop = document.getElementById('fab-back-to-top');
  },

  bindEvents() {
    // Mobile menu toggle
    if (this.mobileToggle && this.mobileMenu) {
      this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
    }
    
    // Mobile menu close
    if (this.mobileClose) {
      this.mobileClose.addEventListener('click', () => this.closeMobileMenu());
    }
    
    // Close mobile menu on link click
    const mobileLinks = this.mobileMenu?.querySelectorAll('a');
    mobileLinks?.forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });
    
    // Module dropdown toggle
    if (this.moduleToggle && this.moduleDropdown) {
      this.moduleToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleModuleDropdown();
      });
      
      // Close dropdown on outside click
      document.addEventListener('click', (e) => {
        if (this.moduleDropdown.classList.contains('open') && 
            !this.moduleDropdown.contains(e.target)) {
          this.closeModuleDropdown();
        }
      });
    }
    
    // Close dropdown on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMobileMenu();
        this.closeModuleDropdown();
      }
    });
    
    // Back to top buttons
    if (this.backToTopNav) {
      this.backToTopNav.addEventListener('click', () => this.scrollToTop());
    }
    if (this.fabBackToTop) {
      this.fabBackToTop.addEventListener('click', () => this.scrollToTop());
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const headerOffset = this.header?.offsetHeight || 72;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  },

  toggleMobileMenu() {
    if (!this.mobileMenu || !this.mobileToggle) return;
    
    const isOpen = this.mobileToggle.getAttribute('aria-expanded') === 'true';
    
    this.mobileToggle.setAttribute('aria-expanded', !isOpen);
    this.mobileMenu.setAttribute('aria-hidden', isOpen);
    
    if (!isOpen) {
      this.mobileMenu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      // Trap focus in mobile menu
      this.trapFocus(this.mobileMenu);
    } else {
      this.closeMobileMenu();
    }
  },

  closeMobileMenu() {
    if (!this.mobileMenu || !this.mobileToggle) return;
    
    this.mobileToggle.setAttribute('aria-expanded', 'false');
    this.mobileMenu.setAttribute('aria-hidden', 'true');
    this.mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  },

  toggleModuleDropdown() {
    if (!this.moduleDropdown || !this.moduleToggle) return;
    
    const isOpen = this.moduleToggle.getAttribute('aria-expanded') === 'true';
    
    this.moduleToggle.setAttribute('aria-expanded', !isOpen);
    
    if (!isOpen) {
      this.moduleDropdown.classList.add('open');
    } else {
      this.closeModuleDropdown();
    }
  },

  closeModuleDropdown() {
    if (!this.moduleDropdown || !this.moduleToggle) return;
    
    this.moduleToggle.setAttribute('aria-expanded', 'false');
    this.moduleDropdown.classList.remove('open');
  },

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },

  initScrollEffect() {
    if (!this.header) return;
    
    let lastScroll = 0;
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      // Add scrolled class
      if (currentScroll > scrollThreshold) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }
      
      // Show/hide FAB back to top
      if (this.fabBackToTop) {
        if (currentScroll > 500) {
          this.fabBackToTop.classList.add('visible');
        } else {
          this.fabBackToTop.classList.remove('visible');
        }
      }
      
      lastScroll = currentScroll;
    }, { passive: true });
  },

  trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    firstFocusable.focus();
    
    element.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    });
  }
};

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Navigation.init());
} else {
  Navigation.init();
}

window.Navigation = Navigation;
