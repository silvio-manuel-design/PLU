/**
 * NAVIGATION MANAGER
 * Handles Mobile Menu, Bottom Nav, and Navigation Interactions
 */

export class Navigation {
  constructor() {
    this.mobileToggle = document.getElementById('mobile-toggle');
    this.mobileNav = document.getElementById('mobile-nav');
    this.bottomNav = document.getElementById('bottom-nav');
    
    this.init();
  }

  init() {
    // Back to Top Button
    this.initBackToTop();
    
    // Mobile Menu Toggle
    if (this.mobileToggle && this.mobileNav) {
      this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
      
      // Close menu when clicking a link
      this.mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => this.closeMobileMenu());
      });
      
      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isMobileMenuOpen()) {
          this.closeMobileMenu();
        }
      });
      
      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (this.isMobileMenuOpen() && 
            !this.mobileNav.contains(e.target) && 
            !this.mobileToggle.contains(e.target)) {
          this.closeMobileMenu();
        }
      });
    }
    
    // Initialize Bottom Navigation
    this.initBottomNav();
    
    // Active state based on scroll position
    this.initScrollSpy();
  }

  toggleMobileMenu() {
    if (this.isMobileMenuOpen()) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.mobileToggle.classList.add('active');
    this.mobileToggle.setAttribute('aria-expanded', 'true');
    this.mobileNav.classList.add('active');
    this.mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  closeMobileMenu() {
    this.mobileToggle.classList.remove('active');
    this.mobileToggle.setAttribute('aria-expanded', 'false');
    this.mobileNav.classList.remove('active');
    this.mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  isMobileMenuOpen() {
    return this.mobileNav?.classList.contains('active');
  }

  initBackToTop() {
    const backToTopBtns = document.querySelectorAll('#back-to-top, #header-back-to-top');
    if (backToTopBtns.length === 0) return;
    
    // Show/hide buttons based on scroll position
    let ticking = false;
    const toggleVisibility = () => {
      const isVisible = window.scrollY > 500;
      backToTopBtns.forEach(btn => {
        btn.classList.toggle('visible', isVisible);
      });
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(toggleVisibility);
        ticking = true;
      }
    }, { passive: true });
    
    // Scroll to top on click
    backToTopBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    });
  }

  initBottomNav() {
    if (!this.bottomNav) return;
    
    // Detect current page and set active
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    
    this.bottomNav.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href');
      
      // Active if matches current page/hash
      if (href === currentPath || href === currentHash || 
          (currentHash && href?.includes(currentHash))) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.bottom-nav a[href^="#"]');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    let ticking = false;
    
    const updateActiveNav = () => {
      const scrollPos = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
      
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateActiveNav);
        ticking = true;
      }
    }, { passive: true });
  }
}
