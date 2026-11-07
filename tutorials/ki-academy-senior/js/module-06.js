/**
 * Module 06: Kreativität
 * JavaScript for interactive components
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initPromptBuilder();
  initQuiz();
  initScrollProgress();
  initRevealAnimations();
  initSmoothScroll();
  ClassroomMode.init();
});

// ============================================
// PROMPT BUILDER
// ============================================
function initPromptBuilder() {
  const stilSelect = document.getElementById('builder-stil');
  const lichtSelect = document.getElementById('builder-licht');
  const stimmungSelect = document.getElementById('builder-stimmung');
  const farbeSelect = document.getElementById('builder-farbe');
  const output = document.getElementById('builder-prompt-output');
  const copyBtn = document.getElementById('builder-copy');
  
  if (!stilSelect || !output) return;
  
  function updatePrompt() {
    const stil = stilSelect.value;
    const licht = lichtSelect.value;
    const stimmung = stimmungSelect.value;
    const farbe = farbeSelect.value;
    
    if (!stil && !licht && !stimmung && !farbe) {
      output.textContent = 'Wählen Sie Optionen aus, um Ihren Prompt zu erstellen...';
      copyBtn.disabled = true;
      return;
    }
    
    let prompt = 'Ein Bild von ';
    
    if (stil) {
      prompt += `einem ${stil}en `;
    }
    
    prompt += 'Motiv';
    
    if (licht) {
      prompt += ` mit ${licht}`;
    }
    
    if (stimmung) {
      prompt += `, ${stimmung}e Atmosphäre`;
    }
    
    if (farbe) {
      prompt += `, ${farbe}`;
    }
    
    prompt += '. Hochwertig, detailliert, professionell.';
    
    output.textContent = prompt;
    copyBtn.disabled = false;
  }
  
  [stilSelect, lichtSelect, stimmungSelect, farbeSelect].forEach(select => {
    if (select) {
      select.addEventListener('change', updatePrompt);
    }
  });
  
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      const text = output.textContent;
      navigator.clipboard.writeText(text).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="ph ph-check"></i> Kopiert!';
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy:', err);
        // Fallback for non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          const originalText = copyBtn.innerHTML;
          copyBtn.innerHTML = '<i class="ph ph-check"></i> Kopiert!';
          setTimeout(() => {
            copyBtn.innerHTML = originalText;
          }, 2000);
        } catch (err) {
          console.error('Fallback copy failed:', err);
        }
        document.body.removeChild(textArea);
      });
    });
  }
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
        // Prevent multiple answers
        if (this.disabled) return;
        
        const selectedValue = this.dataset.value;
        const isCorrect = selectedValue === correctAnswer;
        const isOwn = this.dataset.own === 'true';
        
        // Disable all options
        options.forEach(opt => opt.disabled = true);
        
        // Style selected option
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
          // Highlight correct answer
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
    'Erste Konzeptskizzen': 'KI ist ideal für erste Konzeptskizzen – Sie wählen und verfeinern die beste Idee.',
    'Liebesgedicht': 'Persönliche, emotionale Werke brauchen Authentizität, die nur Sie haben.',
    'Brainstorming': 'KI liefert unzählige Story-Ideen – Ihre Aufgabe ist es, die Spannende auszuwählen.'
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
    announcement.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
    announcement.textContent = isActive 
      ? 'Klassenraummodus aktiviert' 
      : 'Klassenraummodus deaktiviert';
    document.body.appendChild(announcement);
    
    setTimeout(() => announcement.remove(), 1000);
  }
};

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
  const allCards = section.querySelectorAll('.bilder-card, .ideen-card, .grenzen-card');
  const totalCards = allCards.length;

  if (card.classList.contains('active')) {
    card.classList.add('pulse-feedback');
    setTimeout(() => card.classList.remove('pulse-feedback'), 500);
    return;
  }

  card.classList.add('active');

  const discoveredCount = section.querySelectorAll('.bilder-card.active, .ideen-card.active, .grenzen-card.active').length;

  const percent = (discoveredCount / totalCards) * 100;
  if (progressBar) progressBar.style.width = `${percent}%`;
  if (progressText) {
    const initialText = progressText.dataset.initial || progressText.textContent;
    if (!progressText.dataset.initial) progressText.dataset.initial = initialText;
    progressText.textContent = initialText
      .replace(/^\d+/, discoveredCount)
      .replace(/\d+(?=\s*(?:entdeckt|discovered|$))/, totalCards);
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
      .replace(/\d+(?=\s*(?:entdeckt|discovered|$))/, totalCards);
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

// Expose globally for onclick handlers
window.toggleDetektiv = toggleDetektiv;
window.createConfetti = createConfetti;

// Expose ClassroomMode globally for inline handlers if needed
window.ClassroomMode = ClassroomMode;
