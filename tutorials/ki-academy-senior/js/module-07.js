/**
 * Module 07: Kritisches Denken
 * JavaScript for interactive components
 */

document.addEventListener('DOMContentLoaded', function() {
  initDetector();
  initQuiz();
  initScrollProgress();
  initRevealAnimations();
  initSmoothScroll();
  ClassroomMode.init();
});

// ============================================
// FAKE NEWS DETECTOR
// ============================================
function initDetector() {
  const checkboxes = document.querySelectorAll('.detector-checkbox');
  const scoreFill = document.getElementById('detector-score');
  const scoreText = document.getElementById('detector-score-text');
  
  if (!checkboxes.length || !scoreFill || !scoreText) return;
  
  function updateScore() {
    const checked = document.querySelectorAll('.detector-checkbox:checked');
    const totalPoints = Array.from(checked).reduce((sum, cb) => {
      return sum + parseInt(cb.dataset.points || 0);
    }, 0);
    
    // Update visual bar
    scoreFill.style.width = totalPoints + '%';
    
    // Update text and color based on score
    scoreFill.classList.remove('trust-low', 'trust-medium', 'trust-high');
    
    if (totalPoints === 0) {
      scoreText.textContent = 'Markieren Sie verdächtige Stellen...';
    } else if (totalPoints <= 40) {
      scoreText.textContent = '⚠️ Teils verdächtig – weitere Analyse empfohlen';
      scoreFill.classList.add('trust-medium');
    } else if (totalPoints <= 60) {
      scoreText.textContent = '🔴 Sehr verdächtig – Quellen prüfen!';
      scoreFill.classList.add('trust-low');
    } else {
      scoreText.textContent = '🚨 Hohe Fake-News-Wahrscheinlichkeit!';
      scoreFill.classList.add('trust-low');
    }
  }
  
  checkboxes.forEach(cb => {
    cb.addEventListener('change', updateScore);
  });
}

// ============================================
// QUIZ FUNCTIONALITY
// ============================================
function initQuiz() {
  const quizCards = document.querySelectorAll('.quiz-card');
  
  quizCards.forEach(card => {
    const correctAnswer = card.dataset.correct;
    const options = card.querySelectorAll('.quiz-option');
    const feedback = card.querySelector('.quiz-feedback');
    
    if (!correctAnswer || !options.length) return;
    
    options.forEach(option => {
      option.addEventListener('click', function() {
        if (this.disabled) return;
        
        const selectedValue = this.dataset.value;
        const isCorrect = selectedValue === correctAnswer;
        const isOwn = this.dataset.own === 'true';
        
        options.forEach(opt => opt.disabled = true);
        
        if (isOwn) {
          this.classList.add('own-perspective');
          options.forEach(opt => {
            if (opt.dataset.value === correctAnswer) {
              opt.classList.add('correct');
            }
          });
          if (feedback) {
            feedback.innerHTML = '💬 <strong>Ihre Perspektive zählt!</strong><br>Es gibt oft mehrere gültige Sichtweisen. Das Wichtigste ist, dass Sie kritisch denken und Ihre eigene Meinung bilden.';
            feedback.className = 'quiz-feedback own-perspective show';
            if (!feedback.querySelector('.quiz-own-input')) {
              const textarea = document.createElement('textarea');
              textarea.className = 'quiz-own-input';
              textarea.placeholder = 'Möchten Sie Ihre Sichtweise erklären? (optional)';
              textarea.setAttribute('aria-label', 'Ihre eigene Perspektive zu dieser Frage');
              feedback.appendChild(document.createElement('br'));
              feedback.appendChild(textarea);
            }
          }
        } else if (isCorrect) {
          this.classList.add('correct');
          if (feedback) {
            feedback.textContent = '✓ Richtig! ' + getExplanation(card);
            feedback.className = 'quiz-feedback correct show';
          }
        } else {
          this.classList.add('wrong');
          options.forEach(opt => {
            if (opt.dataset.value === correctAnswer) {
              opt.classList.add('correct');
            }
          });
          if (feedback) {
            feedback.textContent = '✗ Das war nicht ganz richtig. ' + getExplanation(card);
            feedback.className = 'quiz-feedback wrong show';
          }
        }
      });
    });
  });
}

function getExplanation(card) {
  const title = card.querySelector('.quiz-card-title');
  if (!title) return '';
  
  const text = title.textContent.trim();
  const explanations = {
    'KI-Ausgaben können immer': 'KI erfindet manchmal Fakten – immer extern verifizieren!',
    'Eine Meinung kann nicht falsch sein': 'Richtig! Meinungen sind subjektiv und können nicht objektiv falsch sein.',
    'WHOIS-Abfragen helfen': 'Richtig! WHOIS zeigt wer eine Website betreibt und seit wann sie existiert.'
  };
  
  for (const key in explanations) {
    if (text.includes(key)) {
      return explanations[key];
    }
  }
  
  return '';
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
