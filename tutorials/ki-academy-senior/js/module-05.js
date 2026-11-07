/**
 * Module 05: Chain of Thought
 * Interactive functionality for the CoT visualizer, quiz, and animations
 */

document.addEventListener('DOMContentLoaded', function() {
  initVisualizer();
  initQuiz();
  initRevealAnimations();
  initProgressBar();
});

/**
 * CoT Visualizer - Toggle between simple and CoT modes
 */
function initVisualizer() {
  const vizButtons = document.querySelectorAll('.viz-btn');
  const vizSimple = document.getElementById('viz-simple');
  const vizCot = document.getElementById('viz-cot');
  
  if (!vizButtons.length || !vizSimple || !vizCot) return;
  
  vizButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const mode = this.dataset.mode;
      
      // Update button states
      vizButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Show/hide content with animation
      if (mode === 'simple') {
        vizCot.style.display = 'none';
        vizSimple.style.display = 'block';
        vizSimple.classList.add('viz-animate-in');
        setTimeout(() => vizSimple.classList.remove('viz-animate-in'), 500);
      } else {
        vizSimple.style.display = 'none';
        vizCot.style.display = 'block';
        vizCot.classList.add('viz-animate-in');
        setTimeout(() => vizCot.classList.remove('viz-animate-in'), 500);
        
        // Animate steps sequentially
        animateCotSteps();
      }
    });
  });
}

/**
 * Animate CoT steps sequentially
 */
function animateCotSteps() {
  const steps = document.querySelectorAll('.cot-step');
  steps.forEach((step, index) => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(10px)';
    setTimeout(() => {
      step.style.transition = 'all 0.4s ease';
      step.style.opacity = '1';
      step.style.transform = 'translateY(0)';
    }, index * 200);
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
        if (card.classList.contains('answered')) return;
        card.classList.add('answered');
        
        const isCorrect = this.dataset.correct === 'true';
        const isOwn = this.dataset.own === 'true';
        
        // Mark all options
        options.forEach(opt => {
          opt.disabled = true;
          if (opt.dataset.correct === 'true') {
            opt.classList.add('correct');
          } else if (opt === this && !isCorrect && !isOwn) {
            opt.classList.add('incorrect');
          }
        });
        
        // Show feedback
        if (feedback) {
          feedback.style.display = 'block';
          feedback.classList.add('show');
          if (isOwn) {
            feedback.innerHTML = '💬 <strong>Ihre Perspektive zählt!</strong><br>Es gibt oft mehrere gültige Sichtweisen. Das Wichtigste ist, dass Sie kritisch denken und Ihre eigene Meinung bilden.';
            feedback.className = 'quiz-feedback own-perspective show';
            this.classList.add('own-perspective');
            if (!feedback.querySelector('.quiz-own-input')) {
              const textarea = document.createElement('textarea');
              textarea.className = 'quiz-own-input';
              textarea.placeholder = 'Möchten Sie Ihre Sichtweise erklären? (optional)';
              textarea.setAttribute('aria-label', 'Ihre eigene Perspektive zu dieser Frage');
              feedback.appendChild(document.createElement('br'));
              feedback.appendChild(textarea);
            }
          } else {
            feedback.innerHTML = isCorrect 
              ? `<div class="feedback-correct"><i class="ph ph-check-circle"></i> ${feedback.dataset.correct}</div>`
              : `<div class="feedback-wrong"><i class="ph ph-x-circle"></i> ${feedback.dataset.wrong}</div>`;
          }
        }
        
        // Scroll to feedback
        setTimeout(() => {
          feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      });
    });
  });
}

/**
 * Reveal animations on scroll
 */
function initRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (!revealElements.length) return;
  
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  revealElements.forEach(el => observer.observe(el));
}

/**
 * Progress bar
 */
function initProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  if (!progressBar) return;
  
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  }
  
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/**
 * Flow steps animation
 */
document.querySelectorAll('.flow-step').forEach((step, index) => {
  step.style.animationDelay = `${index * 0.1}s`;
});


// ============================================
// DETEKTIV INTERACTION (click-to-reveal cards)
// ============================================
function toggleDetektiv(card) {
  const section = card.closest('.detektiv-section');
  if (!section) return;
  
  const progressBar = section.querySelector('.detektiv-progress-bar');
  const progressText = section.querySelector('.detektiv-progress-text');
  const revealSection = section.querySelector('.detektiv-reveal');
  const countElement = section.querySelector('.detektiv-counter span');
  const allCards = section.querySelectorAll('.baustein-card, .example-card');
  const totalCards = allCards.length;
  
  if (card.classList.contains('active')) {
    card.classList.add('pulse-feedback');
    setTimeout(() => card.classList.remove('pulse-feedback'), 500);
    return;
  }
  
  card.classList.add('active');
  
  const discoveredCount = section.querySelectorAll('.baustein-card.active, .example-card.active').length;
  
  const percent = (discoveredCount / totalCards) * 100;
  if (progressBar) progressBar.style.width = `${percent}%`;
  if (progressText) {
    const initialText = progressText.dataset.initial || progressText.textContent;
    if (!progressText.dataset.initial) progressText.dataset.initial = initialText;
    progressText.textContent = initialText
      .replace(/^\d+/, discoveredCount)
      .replace(/\d+(?=\s*(?:Schritten|Beispielen|discovered|$))/, totalCards);
    if (discoveredCount === totalCards) {
      progressText.classList.add('all-found');
    }
  }
  
  if (revealSection) revealSection.classList.add('show');
  if (countElement) {
    const initialCount = countElement.dataset.initial || countElement.textContent;
    if (!countElement.dataset.initial) countElement.dataset.initial = initialCount;
    countElement.textContent = initialCount
      .replace(/^\d+/, discoveredCount)
      .replace(/\d+(?=\s*(?:Schritten|Beispielen|discovered|$))/, totalCards);
  }
  
  if (discoveredCount === totalCards) {
    createConfetti();
    setTimeout(() => {
      if (revealSection) revealSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }
}

function createConfetti() {
  const colors = ['#F4A261', '#90A955', '#5B8DEF', '#E76F51'];
  
  if (!document.getElementById('confetti-styles')) {
    const style = document.createElement('style');
    style.id = 'confetti-styles';
    style.textContent = `
      @keyframes confetti-fall {
        to { transform: translateY(100vh) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}vw;
        top: -10px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        animation: confetti-fall ${1 + Math.random() * 2}s linear forwards;
        z-index: 9999;
        pointer-events: none;
      `;
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4000);
    }, i * 30);
  }
}

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

// Expose globally for onclick handlers
window.toggleDetektiv = toggleDetektiv;
window.createConfetti = createConfetti;
