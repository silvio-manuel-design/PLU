/**
 * Module 04: System-Prompts
 * JavaScript for interactive components
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initRoleTester();
  initQuiz();
  initScrollProgress();
  initRevealAnimations();
  initSmoothScroll();
});

/**
 * Role Tester - Tab switching functionality
 */
function initRoleTester() {
  const tabs = document.querySelectorAll('.tester-tab');
  const panels = document.querySelectorAll('.tester-panel');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Remove active class from all tabs and panels
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Show corresponding panel
      const targetPanel = document.querySelector(`.tester-panel[data-panel="${targetTab}"]`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/**
 * Quiz functionality
 */
function initQuiz() {
  const quizCards = document.querySelectorAll('.quiz-card');
  
  quizCards.forEach(card => {
    const options = card.querySelectorAll('.quiz-option');
    const feedback = card.querySelector('.quiz-feedback');
    
    options.forEach(option => {
      option.addEventListener('click', function() {
        // Prevent multiple answers
        if (this.disabled) return;
        
        const isCorrect = this.hasAttribute('data-correct');
        const isOwn = this.dataset.own === 'true';
        
        // Disable all options
        options.forEach(opt => {
          opt.disabled = true;
          if (opt.hasAttribute('data-correct')) {
            opt.classList.add('correct');
          }
        });
        
        if (isOwn) {
          this.classList.add('own-perspective');
          if (feedback) {
            feedback.innerHTML = '💬 <strong>Ihre Perspektive zählt!</strong><br>Es gibt oft mehrere gültige Sichtweisen. Das Wichtigste ist, dass Sie kritisch denken und Ihre eigene Meinung bilden.';
            feedback.classList.remove('correct-feedback', 'wrong-feedback', 'show');
            void feedback.offsetWidth;
            feedback.classList.add('own-perspective', 'show');
            if (!feedback.querySelector('.quiz-own-input')) {
              const textarea = document.createElement('textarea');
              textarea.className = 'quiz-own-input';
              textarea.placeholder = 'Möchten Sie Ihre Sichtweise erklären? (optional)';
              textarea.setAttribute('aria-label', 'Ihre eigene Perspektive zu dieser Frage');
              feedback.appendChild(document.createElement('br'));
              feedback.appendChild(textarea);
            }
          }
        } else {
          // Show wrong if incorrect answer selected
          if (!isCorrect) {
            this.classList.add('wrong');
          }
          
          // Show feedback
          if (feedback) {
            const correctText = feedback.getAttribute('data-correct');
            const wrongText = feedback.getAttribute('data-wrong');
            
            feedback.textContent = isCorrect ? correctText : wrongText;
            feedback.classList.remove('correct-feedback', 'wrong-feedback', 'show');
            
            // Trigger reflow
            void feedback.offsetWidth;
            
            feedback.classList.add(isCorrect ? 'correct-feedback' : 'wrong-feedback', 'show');
          }
        }
      });
    });
  });
}

/**
 * Scroll progress indicator
 */
function initScrollProgress() {
  const progressBar = document.getElementById('progress-bar');
  
  if (!progressBar) return;
  
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    
    progressBar.style.width = progress + '%';
  }
  
  // Throttled scroll listener
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
  
  // Initial update
  updateProgress();
}

/**
 * Reveal animations on scroll
 */
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
        // Optionally unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  revealElements.forEach(el => observer.observe(el));
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

/**
 * Copy to clipboard utility (for future use)
 */
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('In die Zwischenablage kopiert!');
    }).catch(err => {
      console.error('Failed to copy:', err);
      fallbackCopyToClipboard(text);
    });
  } else {
    fallbackCopyToClipboard(text);
  }
}

function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.select();
  
  try {
    document.execCommand('copy');
    showToast('In die Zwischenablage kopiert!');
  } catch (err) {
    console.error('Fallback copy failed:', err);
  }
  
  document.body.removeChild(textArea);
}

/**
 * Toast notification
 */
function showToast(message) {
  // Remove existing toast
  const existingToast = document.querySelector('.module-toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.className = 'module-toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 120px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: #2A363B;
    color: white;
    padding: 12px 24px;
    border-radius: 50px;
    font-size: 0.95rem;
    font-weight: 500;
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
    z-index: 10000;
    opacity: 0;
    transition: all 0.3s ease;
  `;
  
  document.body.appendChild(toast);
  
  // Trigger animation
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  
  // Remove after delay
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Expose utility functions globally for inline onclick handlers
window.copyToClipboard = copyToClipboard;
window.showToast = showToast;


// ============================================
// CLASSROOM MODE
// ============================================
const ClassroomMode = {
  toggleBtn: null,
  
  init() {
    this.toggleBtn = document.querySelector('.classroom-toggle');
    if (!this.toggleBtn) return;
    
    // Restore saved state
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
    
    // Update button active state
    if (this.toggleBtn) {
      this.toggleBtn.classList.toggle('active', isActive);
    }
    
    // Accessibility announcement
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = isActive 
      ? 'Klassenraummodus aktiviert' 
      : 'Klassenraummodus deaktiviert';
    document.body.appendChild(announcement);
    
    setTimeout(() => announcement.remove(), 1000);
  }
};

// Initialize Classroom Mode
document.addEventListener('DOMContentLoaded', () => {
  ClassroomMode.init();
});
