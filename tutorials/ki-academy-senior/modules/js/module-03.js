/**
 * KI ACADEMY - MODULE 03: DIALOG-GRUNDLAGEN
 * External JavaScript Module - Academic Standard
 * No inline scripts, no inline styles
 * 
 * Features:
 * - Parallax Hero Effect
 * - Reveal Animations
 * - Interactive Prompt Builder with live preview
 * - Quiz Module with feedback
 * - Progress Bar
 */

// ============================================
// PARALLAX HERO EFFECT (subtle)
// ============================================
const ParallaxHero = {
  init() {
    const heroBg = document.getElementById('hero-bg-img');
    if (!heroBg) return;
    
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.15}px)`;
    }, { passive: true });
  }
};

// ============================================
// REVEAL ANIMATIONS
// ============================================
const RevealAnimations = {
  init() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1, 
      rootMargin: '0px 0px -50px 0px' 
    });
    
    revealElements.forEach(el => observer.observe(el));
  }
};

// ============================================
// PROGRESS BAR
// ============================================
const ProgressBar = {
  init() {
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    }, { passive: true });
  }
};

// ============================================
// PROMPT BUILDER
// ============================================
const PromptBuilder = {
  fields: {},
  resultDisplay: null,
  
  init() {
    this.fields = {
      kontext: document.getElementById('builder-kontext'),
      rolle: document.getElementById('builder-rolle'),
      aufgabe: document.getElementById('builder-aufgabe'),
      format: document.getElementById('builder-format'),
      einschraenkungen: document.getElementById('builder-einschraenkungen')
    };
    
    this.resultDisplay = document.getElementById('builder-result');
    const clearBtn = document.getElementById('builder-clear');
    const copyBtn = document.getElementById('builder-copy');
    
    // Check if all elements exist
    if (!this.resultDisplay) return;
    
    // Add input listeners
    Object.values(this.fields).forEach(field => {
      if (field) {
        field.addEventListener('input', () => this.updateResult());
      }
    });
    
    // Clear button
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearAll());
    }
    
    // Copy button
    if (copyBtn) {
      copyBtn.addEventListener('click', () => this.copyToClipboard());
    }
    
    // Initial update
    this.updateResult();
  },
  
  updateResult() {
    const parts = [];
    
    if (this.fields.kontext?.value.trim()) {
      parts.push(`[Kontext] ${this.fields.kontext.value.trim()}`);
    }
    if (this.fields.rolle?.value.trim()) {
      parts.push(`[Rolle] ${this.fields.rolle.value.trim()}`);
    }
    if (this.fields.aufgabe?.value.trim()) {
      parts.push(`[Aufgabe] ${this.fields.aufgabe.value.trim()}`);
    }
    if (this.fields.format?.value.trim()) {
      parts.push(`[Format] ${this.fields.format.value.trim()}`);
    }
    if (this.fields.einschraenkungen?.value.trim()) {
      parts.push(`[Einschränkungen] ${this.fields.einschraenkungen.value.trim()}`);
    }
    
    if (parts.length === 0) {
      this.resultDisplay.textContent = '[Hier erscheint Ihr fertiger Prompt, sobald Sie die Bausteine ausfüllen...]';
      this.resultDisplay.style.opacity = '0.5';
    } else {
      this.resultDisplay.textContent = parts.join('\n\n');
      this.resultDisplay.style.opacity = '1';
    }
  },
  
  clearAll() {
    Object.values(this.fields).forEach(field => {
      if (field) field.value = '';
    });
    this.updateResult();
    
    // Focus first field
    if (this.fields.kontext) {
      this.fields.kontext.focus();
    }
  },
  
  async copyToClipboard() {
    const text = this.resultDisplay.textContent;
    
    try {
      await navigator.clipboard.writeText(text);
      
      // Visual feedback
      const copyBtn = document.getElementById('builder-copy');
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="ph ph-check"></i> Kopiert!';
      copyBtn.style.background = '#90A955';
      
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.background = '';
      }, 2000);
      
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Prompt konnte nicht kopiert werden. Bitte manuell markieren und kopieren.');
    }
  }
};

// ============================================
// QUIZ MODULE - Senior-Optimized UX
// ============================================
const QuizModule = {
  correctAnswers: 0,
  totalQuestions: 3,
  answeredQuestions: new Set(),
  firstAttemptCorrect: new Set(),

  init() {
    // Quiz uses onclick handlers in HTML for module-03
    // This method prevents errors from DOMContentLoaded caller
  },

  updateProgress() {
    const countEl = document.getElementById('quiz-progress-count');
    const barEl = document.getElementById('quiz-progress-bar-fill');
    const answered = this.answeredQuestions.size;
    const percent = Math.min(100, (answered / this.totalQuestions) * 100);

    if (countEl) {
      const initial = countEl.dataset.initial || countEl.textContent;
      if (!countEl.dataset.initial) countEl.dataset.initial = initial;
      countEl.textContent = initial.replace(/^\d+/, Math.max(1, answered));
    }
    if (barEl) barEl.style.width = `${percent}%`;
  },

  checkAnswer(button, questionNum, card) {
    if (!card) card = button.closest('.quiz-question-card');
    const allButtons = card.querySelectorAll('.quiz-option');
    const feedback = document.getElementById(`feedback-${questionNum}`);
    const isCorrect = button.getAttribute('data-correct') === 'true';
    const isOwn = button.getAttribute('data-own') === 'true';

    allButtons.forEach(btn => {
      btn.classList.remove('selected', 'wrong', 'correct', 'correct-hint');
    });
    feedback.className = 'quiz-feedback';

    const oldNextBtn = card.querySelector('.quiz-next-btn');
    if (oldNextBtn) oldNextBtn.remove();

    const isFirstAttempt = !this.answeredQuestions.has(questionNum);
    const isGerman = document.documentElement.lang === 'de';

    if (isOwn) {
      button.classList.add('selected', 'own-perspective');
      feedback.classList.add('show', 'own-perspective');
      feedback.innerHTML = isGerman
        ? '💬 <strong>Ihre Perspektive zählt!</strong><br>Es gibt oft mehrere gültige Sichtweisen. Das Wichtigste ist, dass Sie kritisch denken und Ihre eigene Meinung bilden.'
        : '💬 <strong>Your perspective matters!</strong><br>There are often several valid points of view. The most important thing is that you think critically and form your own opinion.';
      if (isFirstAttempt) {
        this.answeredQuestions.add(questionNum);
        this.updateProgress();
      }
      if (!feedback.querySelector('.quiz-own-input')) {
        const textarea = document.createElement('textarea');
        textarea.className = 'quiz-own-input';
        textarea.placeholder = isGerman ? 'Möchten Sie Ihre Sichtweise erklären? (optional)' : 'Would you like to explain your perspective? (optional)';
        textarea.setAttribute('aria-label', isGerman ? 'Ihre eigene Perspektive zu dieser Frage' : 'Your own perspective on this question');
        feedback.appendChild(document.createElement('br'));
        feedback.appendChild(textarea);
      }
      this.addNextButton(card, questionNum);
      this.checkAllAnswered();
      return;
    }

    if (isCorrect) {
      button.classList.add('selected', 'correct');
      feedback.classList.add('show', 'correct');

      const messages = isGerman ? [
        '✓ Richtig! Die Rolle legt fest, welche Persönlichkeit die KI annimmt – zum Beispiel ein geduldiger Lehrer oder ein kreativer Partner.',
        '✓ Genau! Der Kontext gibt Hintergrundinformationen – wer sind Sie, was ist Ihre Situation, was möchten Sie erreichen?',
        '✓ Korrekt! Ohne klare Aufgabe weiß die KI nicht, was sie tun soll. Alle anderen Bausteine sind wichtig, aber die Aufgabe ist essenziell.'
      ] : [
        '✓ Correct! The role determines which personality the AI adopts – for example, a patient teacher or a creative partner.',
        '✓ Exactly! The context provides background information – who are you, what is your situation, what do you want to achieve?',
        '✓ Correct! Without a clear task, the AI does not know what to do. All other building blocks are important, but the task is essential.'
      ];
      feedback.textContent = messages[questionNum - 1];

      // Progress tracking (einmalig pro Frage)
      if (!this.answeredQuestions.has(questionNum)) {
        this.answeredQuestions.add(questionNum);
        this.updateProgress();
      }
      // Score tracking (einmalig pro richtige Antwort)
      if (!this.firstAttemptCorrect.has(questionNum)) {
        this.correctAnswers++;
        this.firstAttemptCorrect.add(questionNum);
      }
    } else {
      button.classList.add('selected', 'wrong');
      feedback.classList.add('show', 'wrong');

      allButtons.forEach(btn => {
        if (btn.getAttribute('data-correct') === 'true') {
          btn.classList.add('correct-hint');
        }
      });

      const correctMessages = isGerman ? [
        'Das ist nicht ganz richtig – und das ist völlig in Ordnung! Die Rolle definiert, wen die KI spielen soll. Der Kontext beschreibt die Situation, das Format die Ausgabeform. Der grüne Rahmen zeigt Ihnen die richtige Antwort.',
        'Nicht ganz. Der Kontext setzt den Rahmen der Anfrage. Die Länge wird über Einschränkungen gesteuert, die Rolle über den Rollen-Baustein. Der grüne Rahmen zeigt die richtige Antwort.',
        'Nicht korrekt. Die Aufgabe ist am wichtigsten – ohne sie weiß die KI nicht, was sie tun soll. Einschränkungen und Format sind empfohlen, aber optional. Der grüne Rahmen zeigt die richtige Antwort.'
      ] : [
        'That is not quite right – and that is perfectly fine! The role defines who the AI should play. Context describes the situation, Format the output form. The green frame shows the correct answer.',
        'Not quite. The context sets the framework of the request. Length is controlled through Constraints, the role through the Role building block. The green frame shows the correct answer.',
        'Not correct. The task is most important – without it, the AI does not know what to do. Constraints and Format are recommended, but optional. The green frame shows the correct answer.'
      ];
      feedback.textContent = correctMessages[questionNum - 1];

      if (!this.answeredQuestions.has(questionNum)) {
        this.answeredQuestions.add(questionNum);
        this.updateProgress();
      }
    }

    this.addNextButton(card, questionNum);
    this.checkAllAnswered();
  },

  addNextButton(card, currentQuestionNum) {
    if (currentQuestionNum >= this.totalQuestions) return;

    const feedback = card.querySelector('.quiz-feedback');
    if (!feedback) return;

    const isGerman = document.documentElement.lang === 'de';
    const nextBtn = document.createElement('button');
    nextBtn.className = 'quiz-next-btn';
    nextBtn.innerHTML = isGerman ? `Nächste Frage <i class="ph ph-arrow-down"></i>` : `Next Question <i class="ph ph-arrow-down"></i>`;
    nextBtn.setAttribute('aria-label', isGerman ? 'Zur nächsten Frage scrollen' : 'Scroll to next question');
    nextBtn.onclick = () => {
      const nextCard = document.getElementById(`quiz-q${currentQuestionNum + 1}`);
      if (nextCard) {
        nextCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
    feedback.appendChild(nextBtn);
  },

  checkAllAnswered() {
    if (this.answeredQuestions.size === this.totalQuestions) {
      setTimeout(() => this.showResult(), 600);
    }
  },

  showResult() {
    const resultBox = document.getElementById('quiz-result');
    const iconEl = document.getElementById('quiz-result-icon');
    const titleEl = document.getElementById('quiz-result-title');
    const textEl = document.getElementById('quiz-result-text');
    const scoreEl = document.getElementById('quiz-result-score');

    if (!resultBox) return;

    const score = this.correctAnswers;
    const isGerman = document.documentElement.lang === 'de';
    const of = isGerman ? 'von' : 'of';

    if (scoreEl) scoreEl.textContent = `${score} ${of} ${this.totalQuestions} ${isGerman ? 'richtig' : 'correct'}`;

    if (score === 3) {
      if (iconEl) iconEl.innerHTML = '<i class="ph ph-trophy"></i>';
      if (titleEl) titleEl.textContent = isGerman ? 'Fantastisch!' : 'Fantastic!';
      if (textEl) textEl.textContent = isGerman
        ? 'Sie haben alle Fragen richtig beantwortet. Sie beherrschen die 5 Bausteine perfekter Prompts!'
        : 'You answered all questions correctly. You have mastered the 5 building blocks of perfect prompts!';
    } else if (score === 2) {
      if (iconEl) iconEl.innerHTML = '<i class="ph ph-star"></i>';
      if (titleEl) titleEl.textContent = isGerman ? 'Gut gemacht!' : 'Well done!';
      if (textEl) textEl.textContent = isGerman
        ? '2 von 3 richtig – Sie haben das Wichtigste verstanden! Ein kurzer Blick zurück auf die Bausteine schadet nie.'
        : '2 out of 3 correct – You understood the most important part! A quick look back at the building blocks never hurts.';
    } else if (score === 1) {
      if (iconEl) iconEl.innerHTML = '<i class="ph ph-seedling"></i>';
      if (titleEl) titleEl.textContent = isGerman ? 'Sie sind auf dem Weg!' : 'You are on your way!';
      if (textEl) textEl.textContent = isGerman
        ? '1 von 3 richtig – Kein Problem! Die 5 Bausteine brauchen etwas Übung. Nehmen Sie sich Zeit, die Erklärungen noch einmal zu lesen.'
        : '1 out of 3 correct – No problem! The 5 building blocks need some practice. Take your time to read the explanations again.';
    } else {
      if (iconEl) iconEl.innerHTML = '<i class="ph ph-heart"></i>';
      if (titleEl) titleEl.textContent = isGerman ? 'Kein Grund zur Sorge!' : 'No need to worry!';
      if (textEl) textEl.textContent = isGerman
        ? '0 von 3 richtig – Das ist völlig in Ordnung. Die Bausteine sind neu für uns alle. Lesen Sie die Erklärungen erneut und kommen Sie später zurück.'
        : '0 out of 3 correct – That is perfectly fine. The building blocks are new to all of us. Read the explanations again and come back later.';
    }

    resultBox.style.display = 'block';
    resultBox.classList.add('show');

    if (score >= 2) {
      this.createConfetti();
    }

    setTimeout(() => {
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);

    try {
      localStorage.setItem('ki_academy_m03_quiz_complete', 'true');
      localStorage.setItem('ki_academy_m03_score', `${score}/${this.totalQuestions}`);
    } catch (e) {
      console.log('localStorage not available');
    }
  },

  createConfetti() {
    const colors = ['#F4A261', '#90A955', '#5B8DEF', '#E76F51'];

    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
          position: fixed;
          width: 10px;
          height: 10px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          left: ${Math.random() * 100}vw;
          top: -10px;
          animation: confetti-fall ${1 + Math.random()}s linear forwards;
        `;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2000);
      }, i * 30);
    }
  }
};

// Add confetti animation
const quizStyle = document.createElement('style');
quizStyle.textContent = `
  @keyframes confetti-fall {
    to {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(quizStyle);

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
  const allCards = section.querySelectorAll('.baustein-card');
  const totalCards = allCards.length;
  
  if (card.classList.contains('active')) {
    card.classList.add('pulse-feedback');
    setTimeout(() => card.classList.remove('pulse-feedback'), 500);
    return;
  }
  
  card.classList.add('active');
  
  const discoveredCount = section.querySelectorAll('.baustein-card.active').length;
  
  const percent = (discoveredCount / totalCards) * 100;
  if (progressBar) progressBar.style.width = `${percent}%`;
  if (progressText) {
    const initialText = progressText.dataset.initial || progressText.textContent;
    if (!progressText.dataset.initial) progressText.dataset.initial = initialText;
    progressText.textContent = initialText
      .replace(/^\d+/, discoveredCount)
      .replace(/\d+(?=\s*(?:Bausteinen|discovered|$))/, totalCards);
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
      .replace(/\d+(?=\s*(?:Bausteinen|discovered|$))/, totalCards);
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

// ============================================
// CLASSROOM MODE (exakt wie Module 02)
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
    announcement.textContent = isActive ? 'Classroom mode activated' : 'Classroom mode deactivated';
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  }
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  ParallaxHero.init();
  RevealAnimations.init();
  ProgressBar.init();
  PromptBuilder.init();

  ClassroomMode.init();
});

// Expose globally
window.ParallaxHero = ParallaxHero;
window.RevealAnimations = RevealAnimations;
window.PromptBuilder = PromptBuilder;
window.QuizModule = QuizModule;
window.toggleDetektiv = toggleDetektiv;
window.createConfetti = createConfetti;
