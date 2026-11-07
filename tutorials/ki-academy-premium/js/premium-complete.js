/**
 * KI Academy Premium - Complete JavaScript
 * Functionality: Preloader, Navigation, Theme, Classroom, i18n, Scroll Effects, Accessibility
 * Philosophy: Performance-first, Accessible, Progressive Enhancement
 * 
 * Premium Features:
 * - Lenis Smooth Scroll (luxury scrolling experience)
 * - GSAP ScrollTrigger (advanced scroll animations)
 * - Predictive preloading
 * - Scroll progress indicator
 */

'use strict';

// =============================================
// SMOOTH SCROLL - Native Browser Behavior
// =============================================
// Note: Lenis was removed due to input lag on desktop
// Native scroll + GSAP ScrollTrigger is the 10/10 combination
const SmoothScroller = {
  init() {
    // Native smooth scroll behavior
    // GSAP ScrollTrigger handles all animations
    console.log('✨ Native smooth scroll active');
  },
  
  scrollTo(target, options = {}) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;
    
    const offset = options.offset || -80;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition + offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: App.state.isReducedMotion ? 'auto' : 'smooth'
    });
  }
};

// =============================================
// SCROLL PROGRESS INDICATOR
// =============================================
const ScrollProgress = {
  element: null,
  
  init() {
    this.element = document.getElementById('scroll-progress');
    if (!this.element) {
      // Create progress bar if not exists
      this.element = document.createElement('div');
      this.element.id = 'scroll-progress';
      this.element.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--color-apricot), var(--color-gold));
        z-index: 10001;
        transition: width 0.1s linear;
        pointer-events: none;
      `;
      document.body.appendChild(this.element);
    }
    
    // Bind to native scroll
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      this.update(progress);
      
      // Also update back-to-top button
      BackToTop.update(scrollTop);
    }, { passive: true });
  },
  
  update(progress) {
    if (this.element) {
      this.element.style.width = `${progress * 100}%`;
    }
  }
};

// =============================================
// BACK TO TOP MODULE - Desktop
// =============================================
const BackToTop = {
  element: null,
  showThreshold: 500, // Show after scrolling 500px
  
  init() {
    this.element = document.getElementById('back-to-top');
    if (!this.element) return;
    
    // Bind click event
    this.element.addEventListener('click', () => {
      this.scrollToTop();
    });
    
    // Check initial position
    this.update(window.pageYOffset);
  },
  
  update(scrollY) {
    if (!this.element) return;
    
    if (scrollY > this.showThreshold) {
      this.element.classList.add('visible');
    } else {
      this.element.classList.remove('visible');
    }
  },
  
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: App.state.isReducedMotion ? 'auto' : 'smooth'
    });
  }
};

// =============================================
// APP CONTROLLER - Main Application Logic
// =============================================
const App = {
  // Configuration
  config: {
    preloaderDuration: 2000,
    scrollOffset: 100,
    revealThreshold: 0.2
  },
  
  // State
  state: {
    isLoading: true,
    isMenuOpen: false,
    currentTheme: 'dark',
    scrollY: 0,
    isReducedMotion: false,
    classroomMode: false,
    currentLang: 'de'
  },

  // =============================================
  // INITIALIZATION
  // =============================================
  init() {
    // Check for reduced motion preference
    this.state.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Initialize Preloader FIRST (always show content)
    Preloader.init();
    
    // Initialize other modules with error handling
    try {
      SmoothScroller.init();
      ScrollProgress.init();
      BackToTop.init();
      Navigation.init();
      Theme.init();
      Classroom.init();
      i18n.init();
      ScrollEffects.init();
      CommandPalette.init();
      TextScramble.init();
      MagneticButtons.init();
      CustomCursor.init();
      LazyLoader.init();
      Prefetcher.init();
      Accessibility.init();
    } catch (error) {
      console.error('Module initialization error:', error);
    }
    
    // Ensure preloader always hides after max 4 seconds
    setTimeout(() => {
      if (App.state.isLoading) {
        console.log('Force hiding preloader');
        Preloader.hide();
      }
    }, 4000);
    
    // Handle reduced motion changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.state.isReducedMotion = e.matches;
    });
    
    console.log('🎓 KI Academy Premium loaded successfully');
  }
};

// =============================================
// PRELOADER MODULE
// =============================================
const Preloader = {
  element: null,
  
  init() {
    this.element = document.getElementById('preloader');
    if (!this.element) return;
    
    // Hide after 2 seconds minimum
    setTimeout(() => {
      this.hide();
    }, 2000);
    
    // Also hide when page is fully loaded
    window.addEventListener('load', () => {
      setTimeout(() => this.hide(), 500);
    });
  },
  
  hide() {
    if (!this.element) return;
    if (this.element.classList.contains('loaded')) return;
    
    this.element.classList.add('loaded');
    App.state.isLoading = false;
    
    // Remove from DOM after animation
    setTimeout(() => {
      if (this.element && this.element.parentNode) {
        this.element.remove();
      }
    }, 600);
  }
};

// =============================================
// NAVIGATION MODULE
// =============================================
const Navigation = {
  header: null,
  mobileMenuToggle: null,
  mobileNavMenu: null,
  mobileNavClose: null,
  mobileNavBackdrop: null,
  mobileBackToTop: null,
  moduleDropdown: null,
  moduleDropdownToggle: null,
  moduleDropdownMenu: null,
  
  init() {
    this.header = document.getElementById('header');
    this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    this.mobileNavMenu = document.getElementById('mobile-nav-menu');
    this.mobileNavClose = document.querySelector('.mobile-nav-close');
    this.mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');
    this.mobileBackToTop = document.getElementById('back-to-top-mobile');
    this.moduleDropdown = document.querySelector('.module-dropdown');
    this.moduleDropdownToggle = document.querySelector('.module-dropdown-toggle');
    this.moduleDropdownMenu = document.getElementById('module-menu');
    
    this.bindEvents();
    this.setupSmoothScroll();
  },
  
  bindEvents() {
    // Header scroll effect
    window.addEventListener('scroll', this.throttle(() => {
      this.handleScroll();
    }, 100), { passive: true });
    
    // Mobile menu toggle (new PLU style)
    if (this.mobileMenuToggle && this.mobileNavMenu) {
      this.mobileMenuToggle.addEventListener('click', () => {
        this.toggleMobileMenu();
      });
      
      // Close button
      if (this.mobileNavClose) {
        this.mobileNavClose.addEventListener('click', () => {
          this.closeMobileMenu();
        });
      }
      
      // Close on link click
      this.mobileNavMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
          this.closeMobileMenu();
        });
      });
      
      // Close on backdrop click
      if (this.mobileNavBackdrop) {
        this.mobileNavBackdrop.addEventListener('click', () => {
          this.closeMobileMenu();
        });
      }
    }
    
    // Mobile Back to Top
    if (this.mobileBackToTop) {
      this.mobileBackToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: App.state.isReducedMotion ? 'auto' : 'smooth' });
      });
    }
    
    // Module Dropdown toggle (Desktop)
    if (this.moduleDropdownToggle && this.moduleDropdown) {
      this.moduleDropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleModuleDropdown();
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.moduleDropdown.contains(e.target)) {
          this.closeModuleDropdown();
        }
      });
      
      // Close dropdown when clicking on a link
      if (this.moduleDropdownMenu) {
        this.moduleDropdownMenu.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
            this.closeModuleDropdown();
          });
        });
      }
    }
    
    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMobileMenu();
        this.closeModuleDropdown();
      }
    });
  },
  
  handleScroll() {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
      this.header?.classList.add('scrolled');
    } else {
      this.header?.classList.remove('scrolled');
    }
    
    // Toggle mobile back to top visibility
    if (this.mobileBackToTop) {
      if (scrollY > 300) {
        this.mobileBackToTop.style.opacity = '1';
        this.mobileBackToTop.style.pointerEvents = 'auto';
      } else {
        this.mobileBackToTop.style.opacity = '0.5';
        this.mobileBackToTop.style.pointerEvents = 'none';
      }
    }
    
    App.state.scrollY = scrollY;
  },
  
  // Mobile Menu (PLU Style)
  toggleMobileMenu() {
    const isOpen = this.mobileNavMenu.getAttribute('aria-hidden') === 'false';
    
    if (isOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  },
  
  openMobileMenu() {
    App.state.isMenuOpen = true;
    this.mobileNavMenu?.setAttribute('aria-hidden', 'false');
    this.mobileMenuToggle?.setAttribute('aria-expanded', 'true');
    if (this.mobileNavBackdrop) {
      this.mobileNavBackdrop.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
  },
  
  closeMobileMenu() {
    App.state.isMenuOpen = false;
    this.mobileNavMenu?.setAttribute('aria-hidden', 'true');
    this.mobileMenuToggle?.setAttribute('aria-expanded', 'false');
    if (this.mobileNavBackdrop) {
      this.mobileNavBackdrop.classList.remove('active');
    }
    document.body.style.overflow = '';
  },
  
  // Module Dropdown (Desktop)
  toggleModuleDropdown() {
    const isOpen = this.moduleDropdown.classList.contains('open');
    
    if (isOpen) {
      this.closeModuleDropdown();
    } else {
      this.openModuleDropdown();
    }
  },
  
  openModuleDropdown() {
    this.moduleDropdown?.classList.add('open');
    this.moduleDropdownToggle?.setAttribute('aria-expanded', 'true');
  },
  
  closeModuleDropdown() {
    this.moduleDropdown?.classList.remove('open');
    this.moduleDropdownToggle?.setAttribute('aria-expanded', 'false');
  },
  
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          // Close mobile menu if open
          if (App.state.isMenuOpen) {
            this.closeMobileMenu();
          }
          
          // Use native smooth scroll
          SmoothScroller.scrollTo(target, {
            offset: -80
          });
          
          // Update focus for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      });
    });
  },
  
  // Throttle utility
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// =============================================
// THEME MODULE
// =============================================
const Theme = {
  STORAGE_KEY: 'ki_academy_theme',
  
  init() {
    this.loadTheme();
    this.bindEvents();
  },
  
  loadTheme() {
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    this.setTheme(theme);
  },
  
  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    App.state.currentTheme = theme;
    localStorage.setItem(this.STORAGE_KEY, theme);
    
    // Update logo based on theme
    this.updateLogo(theme);
    
    // Update button icons
    this.updateIcons(theme);
  },
  
  toggle() {
    const newTheme = App.state.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  },
  
  updateLogo(theme) {
    const logoImg = document.querySelector('.nav-logo-img');
    if (logoImg) {
      logoImg.src = theme === 'dark' 
        ? 'assets/images/icons/logo-ki-academy-dark.svg'
        : 'assets/images/icons/logo-ki-academy.svg';
    }
  },
  
  updateIcons(theme) {
    const icons = document.querySelectorAll('.theme-toggle svg, .fab-theme svg');
    
    icons.forEach(icon => {
      if (theme === 'dark') {
        // Sun icon for dark mode (click to go light)
        icon.innerHTML = `
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        `;
      } else {
        // Moon icon for light mode (click to go dark)
        icon.innerHTML = `
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        `;
      }
    });
  },
  
  bindEvents() {
    // Theme toggles (Desktop + Mobile)
    document.querySelectorAll('.theme-toggle, .theme-toggle-mobile').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
    
    // System preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
};

// =============================================
// CLASSROOM MODULE - Presentation Mode
// =============================================
const Classroom = {
  isActive: false,
  originalStyles: null,
  
  init() {
    this.bindEvents();
  },
  
  bindEvents() {
    const toggle = document.getElementById('classroom-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => this.toggle());
    }
    
    // Keyboard shortcut: 'C' to toggle
    document.addEventListener('keydown', (e) => {
      if (e.key === 'c' || e.key === 'C') {
        // Don't trigger if in input field
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        this.toggle();
      }
      
      // Escape to exit
      if (e.key === 'Escape' && this.isActive) {
        this.deactivate();
      }
    });
    
    // Handle fullscreen change
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement && this.isActive) {
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
    App.state.classroomMode = true;
    document.body.classList.add('classroom-mode');
    
    // Update toggle button
    const toggle = document.getElementById('classroom-toggle');
    toggle?.classList.add('active');
    toggle?.setAttribute('aria-pressed', 'true');
    
    // Request fullscreen
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(err => {
        console.log('Fullscreen not supported:', err);
      });
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
    
    // Apply classroom styles
    this.applyStyles();
    
    // Announce to screen readers
    this.announce('Classroom Mode aktiviert. Drücken Sie Escape zum Beenden.');
  },
  
  deactivate() {
    this.isActive = false;
    App.state.classroomMode = false;
    document.body.classList.remove('classroom-mode');
    
    // Update toggle button
    const toggle = document.getElementById('classroom-toggle');
    toggle?.classList.remove('active');
    toggle?.setAttribute('aria-pressed', 'false');
    
    // Exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    
    // Remove classroom styles
    this.removeStyles();
    
    // Announce to screen readers
    this.announce('Classroom Mode beendet.');
  },
  
  applyStyles() {
    // Remove existing style if any
    this.removeStyles();
    
    const style = document.createElement('style');
    style.id = 'classroom-styles';
    style.textContent = `
      .classroom-mode {
        font-size: 20px !important;
      }
      
      .classroom-mode .container {
        max-width: 95% !important;
      }
      
      .classroom-mode h1 {
        font-size: clamp(3rem, 6vw, 5rem) !important;
      }
      
      .classroom-mode h2 {
        font-size: clamp(2rem, 4vw, 3rem) !important;
      }
      
      .classroom-mode p,
      .classroom-mode li {
        font-size: 1.3rem !important;
        line-height: 1.8 !important;
      }
      
      .classroom-mode .btn {
        padding: 1rem 2rem !important;
        font-size: 1.2rem !important;
      }
      
      .classroom-mode .nav-logo-text,
      .classroom-mode .nav-links,
      .classroom-mode .language-switcher {
        font-size: 1.1rem !important;
      }
      
      .classroom-mode .section-title {
        font-size: clamp(2.5rem, 5vw, 4rem) !important;
      }
      
      .classroom-mode .card-title {
        font-size: 1.5rem !important;
      }
      
      .classroom-mode .sprint-title {
        font-size: 1.8rem !important;
      }
      
      .classroom-mode .mirror-quote p {
        font-size: 1.8rem !important;
      }
    `;
    document.head.appendChild(style);
  },
  
  removeStyles() {
    const style = document.getElementById('classroom-styles');
    if (style) {
      style.remove();
    }
  },
  
  announce(message) {
    const announcer = document.createElement('div');
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');
    announcer.className = 'visually-hidden';
    announcer.textContent = message;
    document.body.appendChild(announcer);
    setTimeout(() => announcer.remove(), 1000);
  }
};

// =============================================
// I18N MODULE - Internationalization
// =============================================
const i18n = {
  STORAGE_KEY: 'ki_academy_lang',
  
  translations: {
    de: {
      // Navigation
      'nav.mirror': 'Das Spiegel-Prinzip',
      'nav.sprints': 'Die 3 Sprints',
      'nav.about': 'Über uns',
      
      // Hero
      'hero.badge': 'Ein Projekt des Pantam Learning Universe',
      'hero.title1': 'KI verstehen.',
      'hero.title2': 'Sich selbst entdecken.',
      'hero.subtitle': 'Wer KI nur als Werkzeug sieht, verpasst die Revolution. Entdecken Sie in 90 Minuten, wie künstliche Intelligenz Ihre Klarheit, Ihre Werte und Ihr Potenzial spiegelt.',
      'hero.cta.primary': 'Jetzt starten',
      'hero.cta.secondary': 'Mehr erfahren',
      'hero.social': 'Bereits <strong>2,400+ Gestalter</strong> haben begonnen',
      'hero.stats.minutes': 'Minuten',
      'hero.stats.sprints': 'Sprints',
      'hero.stats.price': 'Euro',
      'hero.scroll': 'Entdecken',
      
      // Mirror Section
      'mirror.eyebrow': 'Das Spiegel-Prinzip',
      'mirror.title': 'Warum wir anders sind',
      'mirror.subtitle': 'Während andere Kurse Technik lehren, zeigen wir Ihnen, wie KI Ihr Denken reflektiert.',
      'mirror.card1.title': 'KI spiegelt Ihre Klarheit',
      'mirror.card1.text': 'Je präziser Ihre Fragen, desto besser die Antworten. KI zeigt Ihnen, wo Ihr Denken noch unklar ist.',
      'mirror.card2.title': 'KI spiegelt Ihre Werte',
      'mirror.card2.text': 'Wie Sie KI einsetzen, zeigt Ihre Prioritäten. Der Spiegel lügt nicht.',
      'mirror.card3.title': 'KI spiegelt Ihr Potenzial',
      'mirror.card3.text': 'Die Grenzen der KI sind die Grenzen Ihrer Vorstellungskraft.',
      'mirror.quote': '"Wer KI nur als Werkzeug sieht, verpasst die Revolution. Wer sie als Spiegel begreift, wird unaufhaltsam."',
      'mirror.cite': '— Pantam Learning Universe',
      
      // Sprints Section
      'sprints.eyebrow': 'Ihre Lernreise',
      'sprints.title': '3 Sprints. Ein Ziel.',
      'sprints.subtitle': 'Nicht überwältigende 9 Module – sondern drei handhabbare Lerneinheiten. Jeder Sprint ist in 30 Minuten absolvierbar.',
      'sprints.step1': 'Verstehen',
      'sprints.step2': 'Anwenden',
      'sprints.step3': 'Meistern',
      'sprints.time': 'Min',
      
      // Sprint Cards
      'sprint1.badge': 'Sprint 1',
      'sprint1.status': 'Abgeschlossen',
      'sprint1.title': 'Verstehen',
      'sprint1.desc': 'Von der Angst zur Neugier. Lösen Sie Mythen auf und erkennen Sie sich selbst im Spiegel der KI.',
      'sprint1.cta': 'Weiter lernen',
      
      'sprint2.badge': 'Sprint 2',
      'sprint2.status': 'In Bearbeitung',
      'sprint2.ribbon': 'Aktueller Sprint',
      'sprint2.title': 'Anwenden',
      'sprint2.desc': 'Vom ersten Wort zum Dialog. Lernen Sie, mit KI zu sprechen wie mit einem klugen Partner.',
      'sprint2.cta': 'Jetzt weiter',
      
      'sprint3.badge': 'Sprint 3',
      'sprint3.status': 'Gesperrt',
      'sprint3.title': 'Meistern',
      'sprint3.desc': 'Vom Anwender zum Gestalter. Nutzen Sie KI für Kreativität und ethische Entscheidungen.',
      'sprint3.cta': 'Freischaltung nach Sprint 2',
      
      // Certificate
      'cert.title': 'Abschluss mit Zertifikat',
      'cert.desc': 'Nach erfolgreichem Absolvieren aller 9 Module erhalten Sie ein <strong>persönliches Abschlusszertifikat</strong> – für Ihren Lebenslauf, Ihr LinkedIn-Profil und als Kompetenznachweis.',
      'cert.benefit1': 'LinkedIn-Profil',
      'cert.benefit2': 'Lebenslauf',
      'cert.benefit3': 'Kompetenznachweis',
      
      // Trust
      'trust.mission.label': 'Unsere Mission',
      'trust.mission.title': 'Bildung, die Vertrauen schafft',
      'trust.mission.text': 'Wir glauben, dass KI nicht ersetzt, sondern erweitert. Nicht kontrolliert, sondern kooperiert. Nicht verdrängt, sondern vereint.',
      'trust.mission.quote': '"Die beste KI ist die, die Sie selbst werden."',
      'trust.features.label': 'Warum wir anders sind',
      'trust.feature1': 'Open Source & Kostenlos',
      'trust.feature2': 'Keine Anmeldung nötig',
      'trust.feature3': '100% Datensparsam',
      'trust.feature4': '90 Minuten komprimiertes Wissen',
      'trust.feature5': 'Praxisnah & sofort anwendbar',
      'trust.support': 'Unterstützen',
      
      // Newsletter
      'news.badge': 'Coming Soon',
      'news.title': 'Bleiben Sie informiert',
      'news.desc': 'Erhalten Sie Updates zu neuen Modulen, KI-Trends und exklusiven Inhalten.',
      'news.placeholder': 'Ihre E-Mail-Adresse',
      'news.button': 'Anmelden',
      'news.note': 'Kein Spam. Jederzeit abmeldbar.',
      
      // CTA
      'cta.title': 'Bereit, in den Spiegel zu schauen?',
      'cta.desc': 'Starten Sie jetzt Ihre 90-minütige Reise zum selbstbewussten KI-Nutzer.',
      'cta.button': 'Kostenlos starten',
      'cta.note': 'Keine Anmeldung erforderlich. Sofort starten.',
      
      // Footer
      'footer.project': 'Ein Projekt des',
      'footer.learn': 'Lernen',
      'footer.legal': 'Rechtliches',
      'footer.sprints': 'Die Sprints',
      'footer.philosophy': 'Philosophie',
      'footer.imprint': 'Impressum',
      'footer.privacy': 'Datenschutz',
      'footer.quote': 'Wissen ist ein Geschenk – teilen wir es miteinander.'
    },
    en: {
      // Navigation
      'nav.mirror': 'The Mirror Principle',
      'nav.sprints': 'The 3 Sprints',
      'nav.about': 'About Us',
      
      // Hero
      'hero.badge': 'A Pantam Learning Universe Project',
      'hero.title1': 'Understand AI.',
      'hero.title2': 'Discover Yourself.',
      'hero.subtitle': 'Those who see AI only as a tool miss the revolution. Discover in 90 minutes how artificial intelligence reflects your clarity, values, and potential.',
      'hero.cta.primary': 'Start Now',
      'hero.cta.secondary': 'Learn More',
      'hero.social': 'Already <strong>2,400+ Shapers</strong> have started',
      'hero.stats.minutes': 'Minutes',
      'hero.stats.sprints': 'Sprints',
      'hero.stats.price': 'Euro',
      'hero.scroll': 'Discover',
      
      // Mirror Section
      'mirror.eyebrow': 'The Mirror Principle',
      'mirror.title': 'Why We Are Different',
      'mirror.subtitle': 'While other courses teach technology, we show you how AI reflects your thinking.',
      'mirror.card1.title': 'AI Reflects Your Clarity',
      'mirror.card1.text': 'The more precise your questions, the better the answers. AI shows you where your thinking is still unclear.',
      'mirror.card2.title': 'AI Reflects Your Values',
      'mirror.card2.text': 'How you use AI shows your priorities. The mirror does not lie.',
      'mirror.card3.title': 'AI Reflects Your Potential',
      'mirror.card3.text': 'The limits of AI are the limits of your imagination.',
      'mirror.quote': '"Those who see AI only as a tool miss the revolution. Those who understand it as a mirror become unstoppable."',
      'mirror.cite': '— Pantam Learning Universe',
      
      // Sprints Section
      'sprints.eyebrow': 'Your Learning Journey',
      'sprints.title': '3 Sprints. One Goal.',
      'sprints.subtitle': 'Not overwhelming 9 modules – but three manageable learning units. Each sprint can be completed in 30 minutes.',
      'sprints.step1': 'Understand',
      'sprints.step2': 'Apply',
      'sprints.step3': 'Master',
      'sprints.time': 'Min',
      
      // Sprint Cards
      'sprint1.badge': 'Sprint 1',
      'sprint1.status': 'Completed',
      'sprint1.title': 'Understand',
      'sprint1.desc': 'From fear to curiosity. Debunk myths and recognize yourself in the mirror of AI.',
      'sprint1.cta': 'Continue Learning',
      
      'sprint2.badge': 'Sprint 2',
      'sprint2.status': 'In Progress',
      'sprint2.ribbon': 'Current Sprint',
      'sprint2.title': 'Apply',
      'sprint2.desc': 'From the first word to dialogue. Learn to speak with AI like a smart partner.',
      'sprint2.cta': 'Continue Now',
      
      'sprint3.badge': 'Sprint 3',
      'sprint3.status': 'Locked',
      'sprint3.title': 'Master',
      'sprint3.desc': 'From user to shaper. Use AI for creativity and ethical decisions.',
      'sprint3.cta': 'Unlocks after Sprint 2',
      
      // Certificate
      'cert.title': 'Graduation with Certificate',
      'cert.desc': 'After successfully completing all 9 modules, you receive a <strong>personal certificate</strong> – for your CV, LinkedIn profile, and as proof of competence.',
      'cert.benefit1': 'LinkedIn Profile',
      'cert.benefit2': 'CV / Resume',
      'cert.benefit3': 'Proof of Competence',
      
      // Trust
      'trust.mission.label': 'Our Mission',
      'trust.mission.title': 'Education That Builds Trust',
      'trust.mission.text': 'We believe that AI does not replace but extends. Not controls but cooperates. Not displaces but unites.',
      'trust.mission.quote': '"The best AI is the one you become yourself."',
      'trust.features.label': 'Why We Are Different',
      'trust.feature1': 'Open Source & Free',
      'trust.feature2': 'No Registration Required',
      'trust.feature3': '100% Data Efficient',
      'trust.feature4': '90 Minutes Compressed Knowledge',
      'trust.feature5': 'Practical & Immediately Applicable',
      'trust.support': 'Support Us',
      
      // Newsletter
      'news.badge': 'Coming Soon',
      'news.title': 'Stay Informed',
      'news.desc': 'Get updates on new modules, AI trends, and exclusive content.',
      'news.placeholder': 'Your email address',
      'news.button': 'Subscribe',
      'news.note': 'No spam. Unsubscribe anytime.',
      
      // CTA
      'cta.title': 'Ready to look in the mirror?',
      'cta.desc': 'Start your 90-minute journey to becoming a confident AI user now.',
      'cta.button': 'Start for Free',
      'cta.note': 'No registration required. Start immediately.',
      
      // Footer
      'footer.project': 'A project of',
      'footer.learn': 'Learn',
      'footer.legal': 'Legal',
      'footer.sprints': 'The Sprints',
      'footer.philosophy': 'Philosophy',
      'footer.imprint': 'Imprint',
      'footer.privacy': 'Privacy',
      'footer.quote': 'Knowledge is a gift – let us share it together.'
    }
  },
  
  init() {
    this.loadLanguage();
    this.bindEvents();
  },
  
  loadLanguage() {
    const savedLang = localStorage.getItem(this.STORAGE_KEY);
    const browserLang = navigator.language.split('-')[0];
    const lang = savedLang || (browserLang === 'de' ? 'de' : 'en');
    
    // Initial active state for mobile buttons
    document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });
    
    this.setLanguage(lang);
  },
  
  setLanguage(lang) {
    App.state.currentLang = lang;
    localStorage.setItem(this.STORAGE_KEY, lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update desktop language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });
    
    // Update mobile language buttons
    document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });
    
    // Apply translations
    this.applyTranslations(lang);
  },
  
  applyTranslations(lang) {
    const texts = this.translations[lang];
    if (!texts) return;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (texts[key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = texts[key];
        } else {
          el.innerHTML = texts[key];
        }
      }
    });
    
    // Update specific elements by ID or class patterns
    this.updateElement('[data-i18n="nav.mirror"]', texts['nav.mirror']);
    this.updateElement('[data-i18n="nav.sprints"]', texts['nav.sprints']);
    this.updateElement('[data-i18n="nav.about"]', texts['nav.about']);
  },
  
  updateElement(selector, text) {
    const el = document.querySelector(selector);
    if (el && text) {
      el.textContent = text;
    }
  },
  
  toggle() {
    const newLang = App.state.currentLang === 'de' ? 'en' : 'de';
    this.setLanguage(newLang);
  },
  
  bindEvents() {
    // Desktop Language Buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setLanguage(btn.dataset.lang);
      });
    });
    
    // Mobile Language Buttons
    document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setLanguage(btn.dataset.lang);
      });
    });
  }
};

// =============================================
// SCROLL EFFECTS MODULE - GSAP Enhanced
// =============================================
const ScrollEffects = {
  revealElements: [],
  
  init() {
    this.revealElements = document.querySelectorAll('[data-reveal]');
    
    // Check for GSAP availability
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      this.setupGSAPAnimations();
      console.log('🎬 GSAP ScrollTrigger initialized');
    } else {
      // Fallback to IntersectionObserver
      this.setupIntersectionObserver();
    }
    
    this.bindScrollEvents();
  },
  
  setupGSAPAnimations() {
    if (App.state.isReducedMotion) {
      // Just reveal all elements without animation
      this.revealElements.forEach(el => el.classList.add('revealed'));
      return;
    }
    
    // Safety timeout: Ensure elements are visible after 3 seconds even if GSAP fails
    setTimeout(() => {
      document.querySelectorAll('.mirror-card, .sprint-card, .trust-card, .section-title').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.filter = 'none';
      });
    }, 3000);
    
    // Hero parallax effect
    gsap.to('.hero-video-container video', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-premium',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
    
    // Hero content fade out
    gsap.to('.hero-content', {
      y: -100,
      opacity: 0.5,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-premium',
        start: 'top top',
        end: '50% top',
        scrub: true
      }
    });
    
    // Desktop only: Card animations
    if (window.innerWidth >= 1024) {
      gsap.fromTo('.mirror-card', 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.mirror-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
      
      gsap.fromTo('.sprint-card', 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.sprints-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
      
      gsap.fromTo('.trust-card', 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.trust-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
    
  },
  
  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
      this.revealElements.forEach(el => el.classList.add('revealed'));
      return;
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: App.config.revealThreshold,
      rootMargin: '0px 0px -50px 0px'
    });
    
    this.revealElements.forEach(el => {
      observer.observe(el);
    });
  },
  
  bindScrollEvents() {
    // Scroll events are now handled by GSAP ScrollTrigger
    // This is kept for any additional custom scroll handling
  },
  
  handleScroll() {
    // Deprecated - now handled by GSAP
  },
  
  handleParallax(scrollY) {
    // Deprecated - now handled by GSAP ScrollTrigger
  }
};

// =============================================
// COMMAND PALETTE MODULE (Cmd+K)
// =============================================
const CommandPalette = {
  element: null,
  input: null,
  results: null,
  isOpen: false,
  selectedIndex: -1,
  filteredItems: [],
  
  // Navigation items database
  items: [
    { section: 'Navigation', title: 'Startseite', url: 'index.html', icon: '⌂', desc: 'Zurück zur Startseite' },
    { section: 'Navigation', title: 'English Version', url: 'index-en.html', icon: 'EN', desc: 'Switch to English' },
    { section: 'Sprint 1: Verstehen', title: 'Modul 0: Willkommen', url: 'modules/de/00-willkommen/module-00.html', icon: '0', desc: '90 Minuten Investition' },
    { section: 'Sprint 1: Verstehen', title: 'Modul 1: Grundlagen', url: 'modules/de/01-grundlagen/module-01.html', icon: '1', desc: 'KI als Spiegel verstehen' },
    { section: 'Sprint 1: Verstehen', title: 'Modul 2: Alltag', url: 'modules/de/02-alltag/module-02.html', icon: '2', desc: 'Von der Angst zur Kraft' },
    { section: 'Sprint 2: Anwenden', title: 'Modul 3: Kommunikation', url: 'modules/de/03-kommunikation/module-03.html', icon: '3', desc: 'Der neue Dialog' },
    { section: 'Sprint 2: Anwenden', title: 'Modul 4: Dialog Grundlagen', url: 'modules/de/04-dialog-grundlagen/module-04.html', icon: '4', desc: 'Was Sie KI wirklich sagen' },
    { section: 'Sprint 2: Anwenden', title: 'Modul 5: Dialog Profi', url: 'modules/de/05-dialog-profi/module-05.html', icon: '5', desc: 'Wie Sie KI wirklich fragen' },
    { section: 'Sprint 3: Meistern', title: 'Modul 6: Kreativität', url: 'modules/de/06-kreativitaet/module-06.html', icon: '6', desc: 'Ihr Ideen-Partner' },
    { section: 'Sprint 3: Meistern', title: 'Modul 7: Kritisches Denken', url: 'modules/de/07-kritisches-denken/module-07.html', icon: '7', desc: 'Die menschliche Präzision' },
    { section: 'Sprint 3: Meistern', title: 'Modul 8: Glossar', url: 'modules/de/08-glossar/module-08.html', icon: '8', desc: 'Alle Begriffe verständlich' },
    { section: 'Abschluss', title: 'Zertifikat', url: 'modules/de/09-zertifikat/module-09.html', icon: '✓', desc: 'Ihre Leistung bestätigen' },
    { section: 'Unterstützung', title: 'Spenden', url: 'pages/spenden.html', icon: '♥', desc: 'KI Academy unterstützen' },
    { section: 'Rechtliches', title: 'Datenschutz', url: 'pages/datenschutz.html', icon: '🔒', desc: 'Ihre Daten bei uns' },
  ],
  
  init() {
    this.element = document.getElementById('command-palette');
    this.input = document.getElementById('cmd-input');
    this.results = document.getElementById('cmd-results');
    
    if (!this.element) return;
    
    this.bindEvents();
    console.log('⌘ Command Palette initialized (Press Cmd+K)');
  },
  
  bindEvents() {
    // Open with Cmd+K or Ctrl+K
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.toggle();
      }
      
      // Close with ESC
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
    
    // Input handling
    this.input?.addEventListener('input', (e) => {
      this.search(e.target.value);
    });
    
    // Keyboard navigation
    this.input?.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.selectNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.selectPrevious();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        this.activateSelected();
      }
    });
    
    // Close on backdrop click
    this.element?.querySelector('.cmd-backdrop')?.addEventListener('click', () => {
      this.close();
    });
  },
  
  open() {
    if (window.innerWidth < 768) return; // Mobile disabled
    
    this.isOpen = true;
    this.element.hidden = false;
    // Force reflow
    this.element.offsetHeight;
    this.element.classList.add('active');
    this.input?.focus();
    this.search('');
    document.body.style.overflow = 'hidden';
  },
  
  close() {
    this.isOpen = false;
    this.element.classList.remove('active');
    setTimeout(() => {
      this.element.hidden = true;
      this.input.value = '';
    }, 200);
    document.body.style.overflow = '';
  },
  
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  },
  
  search(query) {
    const normalizedQuery = query.toLowerCase().trim();
    
    if (!normalizedQuery) {
      // Show all items grouped by section
      this.filteredItems = this.items;
    } else {
      // Filter items
      this.filteredItems = this.items.filter(item => 
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.desc.toLowerCase().includes(normalizedQuery) ||
        item.section.toLowerCase().includes(normalizedQuery)
      );
    }
    
    this.selectedIndex = this.filteredItems.length > 0 ? 0 : -1;
    this.renderResults();
  },
  
  renderResults() {
    if (this.filteredItems.length === 0) {
      this.results.innerHTML = '<div class="cmd-empty">Keine Ergebnisse gefunden</div>';
      return;
    }
    
    let currentSection = '';
    let html = '';
    
    this.filteredItems.forEach((item, index) => {
      // Add section header if changed
      if (item.section !== currentSection) {
        currentSection = item.section;
        html += `<div class="cmd-section">${item.section}</div>`;
      }
      
      const isSelected = index === this.selectedIndex;
      html += `
        <div class="cmd-item ${isSelected ? 'selected' : ''}" data-index="${index}" data-url="${item.url}">
          <div class="cmd-item-icon">${item.icon}</div>
          <div class="cmd-item-content">
            <div class="cmd-item-title">${item.title}</div>
            <div class="cmd-item-desc">${item.desc}</div>
          </div>
          ${isSelected ? '<kbd class="cmd-item-shortcut">↵</kbd>' : ''}
        </div>
      `;
    });
    
    this.results.innerHTML = html;
    
    // Add click handlers
    this.results.querySelectorAll('.cmd-item').forEach(item => {
      item.addEventListener('click', () => {
        const url = item.dataset.url;
        this.navigate(url);
      });
    });
  },
  
  selectNext() {
    if (this.filteredItems.length === 0) return;
    this.selectedIndex = (this.selectedIndex + 1) % this.filteredItems.length;
    this.renderResults();
    this.scrollToSelected();
  },
  
  selectPrevious() {
    if (this.filteredItems.length === 0) return;
    this.selectedIndex = (this.selectedIndex - 1 + this.filteredItems.length) % this.filteredItems.length;
    this.renderResults();
    this.scrollToSelected();
  },
  
  scrollToSelected() {
    const selected = this.results.querySelector('.cmd-item.selected');
    if (selected) {
      selected.scrollIntoView({ block: 'nearest' });
    }
  },
  
  activateSelected() {
    if (this.selectedIndex >= 0 && this.filteredItems[this.selectedIndex]) {
      this.navigate(this.filteredItems[this.selectedIndex].url);
    }
  },
  
  navigate(url) {
    this.close();
    window.location.href = url;
  }
};

// =============================================
// TYPEWRITER MODULE - Emotional Hook
// =============================================
// =============================================
// TEXT SCRAMBLE EFFECT - PLU Style
// =============================================
const TextScramble = {
  chars: '!<>-_\\/[]{}—=+*^?#________',
  
  init() {
    // Skip on mobile
    if (window.innerWidth < 1024) {
      this.showText();
      return;
    }
    
    // Skip if already visited
    if (localStorage.getItem('ki-premium-scramble')) {
      this.showText();
      return;
    }
    
    const elements = document.querySelectorAll('.typewriter-text');
    if (elements.length === 0) return;
    
    // Start after preloader
    setTimeout(() => {
      let index = 0;
      const next = () => {
        if (index < elements.length) {
          this.scramble(elements[index], () => {
            index++;
            setTimeout(next, 200);
          });
        } else {
          localStorage.setItem('ki-premium-scramble', 'true');
        }
      };
      next();
    }, 2500);
  },
  
  scramble(element, callback) {
    const finalText = element.dataset.text;
    let iteration = 0;
    const maxIterations = finalText.length * 3;
    
    const interval = setInterval(() => {
      element.textContent = finalText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration / 3) return finalText[index];
          return this.chars[Math.floor(Math.random() * this.chars.length)];
        })
        .join('');
      
      iteration++;
      
      if (iteration >= maxIterations) {
        clearInterval(interval);
        element.textContent = finalText;
        if (callback) callback();
      }
    }, 30);
  },
  
  showText() {
    document.querySelectorAll('.typewriter-text').forEach(el => {
      el.textContent = el.dataset.text;
    });
  }
};

// =============================================
// CUSTOM CURSOR - Desktop Only
// =============================================
const CustomCursor = {
  init() {
    // Skip on mobile/touch
    if (window.innerWidth < 1025) return;
    if ('ontouchstart' in window) return;
    
    // Create outer cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    // Create inner dot
    const dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    document.body.appendChild(dot);
    
    // Mouse move handler
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
    });
    
    // Hover effect on interactive elements
    const interactive = document.querySelectorAll('a, button, .btn, input, textarea');
    interactive.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    
    console.log('🖱️ Custom cursor initialized');
  }
};

// =============================================
// MAGNETIC BUTTONS - Premium Micro-interaction
// =============================================
const MagneticButtons = {
  buttons: [],
  isTouch: false,
  
  init() {
    // Disable on touch devices
    this.isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (this.isTouch) return;
    
    this.buttons = document.querySelectorAll('.btn-primary, .btn-cta-large, .sprint-link.primary');
    
    this.buttons.forEach(button => {
      this.makeMagnetic(button);
    });
    
    console.log('🧲 Magnetic buttons initialized');
  },
  
  makeMagnetic(element) {
    const strength = 0.3; // 0-1, higher = stronger magnetic pull
    const radius = 100; // px, activation radius
    
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance < radius) {
        const pull = (radius - distance) / radius;
        const moveX = deltaX * strength * pull;
        const moveY = deltaY * strength * pull;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    });
    
    element.addEventListener('mouseleave', () => {
      // Smooth return to original position
      element.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      element.style.transform = 'translate(0, 0)';
      
      // Remove transition after animation
      setTimeout(() => {
        element.style.transition = '';
      }, 400);
    });
  }
};

// =============================================
// ACCESSIBILITY MODULE
// =============================================
const Accessibility = {
  init() {
    this.setupFocusManagement();
    this.setupKeyboardShortcuts();
    this.setupReducedMotion();
  },
  
  setupFocusManagement() {
    // Focus trap for mobile menu
    const menu = document.querySelector('.nav-links');
    if (menu) {
      const focusableElements = menu.querySelectorAll(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      
      menu.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab' || !App.state.isMenuOpen) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      });
    }
  },
  
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ignore if in input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      // 'T' for theme toggle
      if (e.key === 't' || e.key === 'T') {
        Theme.toggle();
      }
      
      // 'C' for classroom mode
      if (e.key === 'c' || e.key === 'C') {
        Classroom.toggle();
      }
      
      // 'L' for language toggle
      if (e.key === 'l' || e.key === 'L') {
        i18n.toggle();
      }
      
      // Escape to close menu/dropdown/classroom
      if (e.key === 'Escape') {
        Navigation.closeMenu();
        Navigation.closeModuleDropdown();
        if (Classroom.isActive) {
          Classroom.deactivate();
        }
      }
      
      // Home key to scroll top
      if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: App.state.isReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  },
  
  setupReducedMotion() {
    // Respect user's motion preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    mediaQuery.addEventListener('change', (e) => {
      App.state.isReducedMotion = e.matches;
      
      // Remove transform animations if reduced motion
      if (e.matches) {
        document.querySelectorAll('[data-reveal]').forEach(el => {
          el.classList.add('revealed');
        });
      }
    });
  }
};

// =============================================
// UTILITY FUNCTIONS
// =============================================
const Utils = {
  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Throttle function
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // Detect touch device
  isTouchDevice() {
    return window.matchMedia('(pointer: coarse)').matches;
  },
  
  // Prefers reduced motion
  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
};

// =============================================
// LAZY LOADING MODULE
// =============================================
const LazyLoader = {
  init() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (!('IntersectionObserver' in window)) {
      // Fallback: Load all images immediately
      images.forEach(img => this.loadImage(img));
      return;
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '50px 0px'
    });
    
    images.forEach(img => {
      img.classList.add('img-lazy');
      observer.observe(img);
    });
  },
  
  loadImage(img) {
    const src = img.dataset.src;
    if (!src) return;
    
    img.src = src;
    img.onload = () => {
      img.classList.add('loaded');
    };
  }
};

// =============================================
// PREFETCHING MODULE
// =============================================
const Prefetcher = {
  init() {
    // Prefetch links on hover
    document.querySelectorAll('a[href^="modules/"], a[href^="pages/"]').forEach(link => {
      link.addEventListener('mouseenter', () => {
        this.prefetch(link.href);
      });
    });
  },
  
  prefetch(url) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  }
};

// =============================================
// INITIALIZE APP
// =============================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}

// Export for debugging
window.KIAcademy = { App, Theme, Classroom, i18n, Navigation, Utils };
