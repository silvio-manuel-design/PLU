/**
 * Module 08: Glossar
 * JavaScript for interactive components
 */

document.addEventListener('DOMContentLoaded', function() {
  initAlphabetNav();
  initScrollProgress();
  initRevealAnimations();
  initSmoothScroll();
  ClassroomMode.init();
});

// ============================================
// ALPHABET NAVIGATION
// ============================================
function initAlphabetNav() {
  const alphabetLinks = document.querySelectorAll('.alphabet-link');
  const letterSections = document.querySelectorAll('.glossar-letter-section');
  
  if (!alphabetLinks.length || !letterSections.length) return;
  
  // Highlight active letter based on scroll position
  function highlightActiveLetter() {
    const scrollPosition = window.scrollY + 200;
    
    letterSections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const letter = section.id;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        alphabetLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + letter) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  // Smooth scroll for alphabet links
  alphabetLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
        const navHeight = document.querySelector('.main-nav')?.offsetHeight || 0;
        const alphabetHeight = document.querySelector('.alphabet-nav')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - alphabetHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update active state
        alphabetLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
  
  // Throttled scroll listener for highlighting
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        highlightActiveLetter();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ============================================
// SCROLL PROGRESS
// ============================================
function initScrollProgress() {
  const progressBar = document.getElementById('progress-bar');
  if (!progressBar) return;
  
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  }
  
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  
  updateProgress();
}

// ============================================
// REVEAL ANIMATIONS
// ============================================
function initRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (!revealElements.length) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  revealElements.forEach(el => observer.observe(el));
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      // Skip alphabet links (handled separately)
      if (this.classList.contains('alphabet-link')) return;
      
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        
        const navHeight = document.querySelector('.main-nav')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// CLASSROOM MODE
// ============================================
const ClassroomMode = {
  toggleBtn: null,
  
  init() {
    this.toggleBtn = document.querySelector('.classroom-toggle');
    if (!this.toggleBtn) return;
    
    if (localStorage.getItem('ki_academy_classroom') === 'true') {
      document.body.classList.add('classroom-mode');
      this.toggleBtn.classList.add('active');
    }
    
    this.toggleBtn.addEventListener('click', () => this.toggle());
  },
  
  toggle() {
    document.body.classList.toggle('classroom-mode');
    const isActive = document.body.classList.contains('classroom-mode');
    localStorage.setItem('ki_academy_classroom', isActive);
    
    if (this.toggleBtn) {
      this.toggleBtn.classList.toggle('active', isActive);
    }
  }
};

window.ClassroomMode = ClassroomMode;
