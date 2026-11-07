/**
 * KI ACADEMY - MODULE 02: ALLTAGSKOMPETENZ
 * External JavaScript Module - Academic Standard
 * No inline scripts, no inline styles
 */

// ============================================
// PARALLAX HERO EFFECT (subtle)
// ============================================
const ParallaxHero = {
  init() {
    const heroBg = document.getElementById('hero-bg-img');
    if (!heroBg) return;
    
    // Only apply subtle parallax on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      // Subtle upward movement (image stays within bounds)
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
// DETEKTIW INTERACTION (click-to-reveal cards)
// ============================================
function toggleDetektiv(card) {
  const section = card.closest('.detektiv-section');
  if (!section) return;
  
  const progressBar = section.querySelector('.detektiv-progress-bar');
  const progressText = section.querySelector('.detektiv-progress-text');
  const revealSection = section.querySelector('.detektiv-reveal');
  const countElement = section.querySelector('.detektiv-counter span');
  const allCards = section.querySelectorAll('.detektiv-card');
  const totalCards = allCards.length;
  
  // Already active? → Gentle feedback instead of silence
  if (card.classList.contains('active')) {
    card.classList.add('pulse-feedback');
    setTimeout(() => card.classList.remove('pulse-feedback'), 500);
    return;
  }
  
  card.classList.add('active');
  
  // Count discovered cards in this section
  const discoveredCount = section.querySelectorAll('.detektiv-card.active').length;
  
  // Update progress bar
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
  
  // Show reveal section from first click
  if (revealSection) revealSection.classList.add('show');
  if (countElement) {
    const initialCount = countElement.dataset.initial || countElement.textContent;
    if (!countElement.dataset.initial) countElement.dataset.initial = initialCount;
    countElement.textContent = initialCount
      .replace(/^\d+/, discoveredCount)
      .replace(/\d+(?=\s*(?:entdeckt|discovered|$))/, totalCards);
  }
  
  // Completion animation
  if (discoveredCount === totalCards) {
    createConfetti();
    setTimeout(() => {
      if (revealSection) revealSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }
}

// ============================================
// MYTHEN REVEAL
// ============================================
function revealMythe(card) {
  card.classList.add('mythen-revealed');
}

// ============================================
// QUIZ MODULE - Senior-Optimized UX
// ============================================
const QuizModule = {
  init() {
    // Quiz initialization - questions are inline in HTML
  },
  correctAnswers: 0,
  totalQuestions: 5,
  answeredQuestions: new Set(),
  firstAttemptCorrect: new Set(),

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

  checkAnswer(button, questionNum, event) {
    if (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    const card = button.closest('.quiz-question-card');
    const allButtons = card.querySelectorAll('.quiz-option');
    const feedback = document.getElementById(`feedback-${questionNum}`);
    const isCorrect = button.getAttribute('data-correct') === 'true';
    const isOwn = button.getAttribute('data-own') === 'true';
    const isGerman = document.documentElement.lang === 'de';
    
    allButtons.forEach(btn => {
      btn.classList.remove('selected', 'wrong', 'correct', 'correct-hint');
    });
    if (feedback) feedback.className = 'quiz-feedback';
    
    const oldNextBtn = card.querySelector('.quiz-next-btn');
    if (oldNextBtn) oldNextBtn.remove();
    
    const isFirstAttempt = !this.answeredQuestions.has(questionNum);
    
    if (isOwn) {
      button.classList.add('selected', 'own-perspective');
      if (feedback) {
        feedback.classList.add('show', 'own-perspective');
        feedback.innerHTML = isGerman
          ? `💬 <strong>Ihre Perspektive zählt!</strong><br>Es gibt oft mehrere gültige Sichtweisen. Das Wichtigste ist, dass Sie kritisch denken und Ihre eigene Meinung bilden.`
          : `💬 <strong>Your perspective matters!</strong><br>There are often several valid viewpoints. The most important thing is that you think critically and form your own opinion.`;
      }
      if (isFirstAttempt) {
        this.answeredQuestions.add(questionNum);
        this.updateProgress();
      }
      if (!feedback.querySelector('.quiz-own-input')) {
        const textarea = document.createElement('textarea');
        textarea.className = 'quiz-own-input';
        textarea.placeholder = isGerman
          ? 'Möchten Sie Ihre Sichtweise erklären? (optional)'
          : 'Would you like to explain your perspective? (optional)';
        textarea.setAttribute('aria-label', isGerman
          ? 'Ihre eigene Perspektive zu dieser Frage'
          : 'Your own perspective on this question');
        feedback.appendChild(document.createElement('br'));
        feedback.appendChild(textarea);
      }
      this.addNextButton(card, questionNum);
      this.checkAllAnswered();
      return;
    }
    
    if (isCorrect) {
      button.classList.add('selected', 'correct');
      if (feedback) {
        feedback.classList.add('show', 'correct');
        feedback.innerHTML = this.getCorrectMessage(questionNum);
      }
      if (!this.answeredQuestions.has(questionNum)) {
        this.answeredQuestions.add(questionNum);
        this.updateProgress();
      }
      if (!this.firstAttemptCorrect.has(questionNum)) {
        this.correctAnswers++;
        this.firstAttemptCorrect.add(questionNum);
      }
    } else {
      button.classList.add('selected', 'wrong');
      if (feedback) {
        feedback.classList.add('show', 'wrong');
        feedback.innerHTML = this.getWrongMessage(questionNum);
      }
      allButtons.forEach(btn => {
        if (btn.getAttribute('data-correct') === 'true') btn.classList.add('correct-hint');
      });
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
    nextBtn.innerHTML = isGerman
      ? `Nächste Frage <i class="ph ph-arrow-down"></i>`
      : `Next Question <i class="ph ph-arrow-down"></i>`;
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
    const badgesEl = document.getElementById('quiz-result-badges');
    
    if (!resultBox) return;
    
    const score = this.correctAnswers;
    const isGerman = document.documentElement.lang === 'de';
    const of = isGerman ? 'von' : 'of';
    const correctLabel = isGerman ? 'richtig' : 'correct';
    
    if (scoreEl) scoreEl.textContent = `${score} ${of} ${this.totalQuestions} ${correctLabel}`;
    
    if (score === 5) {
      if (iconEl) iconEl.innerHTML = '<i class="ph ph-trophy"></i>';
      if (titleEl) titleEl.textContent = isGerman ? 'Fantastisch!' : 'Fantastic!';
      if (textEl) textEl.textContent = isGerman
        ? 'Sie haben alle Fragen richtig beantwortet. Sie verstehen KI im Alltag!'
        : 'You answered all questions correctly. You understand AI in everyday life!';
    } else if (score >= 3) {
      if (iconEl) iconEl.innerHTML = '<i class="ph ph-star"></i>';
      if (titleEl) titleEl.textContent = isGerman ? 'Gut gemacht!' : 'Well done!';
      if (textEl) textEl.textContent = isGerman
        ? `${score} von ${this.totalQuestions} richtig – Sie haben das Wichtigste verstanden! Ein kurzer Blick zurück auf die Erklärungen schadet nie.`
        : `${score} out of ${this.totalQuestions} correct – You understood the most important part! A quick look back at the explanations never hurts.`;
    } else if (score >= 1) {
      if (iconEl) iconEl.innerHTML = '<i class="ph ph-seedling"></i>';
      if (titleEl) titleEl.textContent = isGerman ? 'Sie sind auf dem Weg!' : 'You are on your way!';
      if (textEl) textEl.textContent = isGerman
        ? `${score} von ${this.totalQuestions} richtig – Kein Problem! KI ist neu für uns alle. Nehmen Sie sich Zeit, die Erklärungen noch einmal zu lesen.`
        : `${score} out of ${this.totalQuestions} correct – No problem! AI is new to all of us. Take your time to read the explanations again.`;
    } else {
      if (iconEl) iconEl.innerHTML = '<i class="ph ph-heart"></i>';
      if (titleEl) titleEl.textContent = isGerman ? 'Kein Grund zur Sorge!' : 'No need to worry!';
      if (textEl) textEl.textContent = isGerman
        ? `0 von ${this.totalQuestions} richtig – Das ist völlig in Ordnung. KI ist komplex und neu. Lesen Sie die Erklärungen erneut und kommen Sie später zurück. Sie können dieses Modul so oft wiederholen wie Sie möchten.`
        : `0 out of ${this.totalQuestions} correct – That is perfectly fine. AI is complex and new. Read the explanations again and come back later. You can repeat this module as often as you like.`;
    }
    
    if (badgesEl) {
      badgesEl.innerHTML = isGerman
        ? `<span class="quiz-badge success"><i class="ph ph-check"></i>Alltag ✓</span><a href="../03-dialog-grundlagen/module-03.html" class="quiz-badge next"><i class="ph ph-arrow-right"></i>Weiter geht's →</a>`
        : `<span class="quiz-badge success"><i class="ph ph-check"></i>Everyday ✓</span><a href="../03-dialog-basics/module-03-en.html" class="quiz-badge next"><i class="ph ph-arrow-right"></i>Continue →</a>`;
    }
    
    resultBox.style.display = 'block';
    resultBox.classList.add('show');
    
    if (score >= 3) {
      createConfetti();
    }
    
    setTimeout(() => {
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
    
    try {
      localStorage.setItem('ki_academy_m02_complete', 'true');
      localStorage.setItem('ki_academy_m02_score', `${score}/${this.totalQuestions}`);
      localStorage.setItem('ki_academy_sprint1_complete', 'true');
    } catch (e) {
      console.log('localStorage not available');
    }
  },

  getCorrectMessage(q) {
    const isGerman = document.documentElement.lang === 'de';
    const messages = {
      1: isGerman
        ? '✓ Richtig! KI ist Ihr Assistent – Sie behalten die Kontrolle und entscheiden.'
        : '✓ Correct! AI is your assistant – you keep control and make the decisions.',
      2: isGerman
        ? '✓ Korrekt! KI liefert Ausgangspunkte, aber die Quellenprüfung bleibt Ihre Aufgabe.'
        : '✓ Correct! AI provides starting points, but checking sources remains your task.',
      3: isGerman
        ? '✓ Genau! KI kann Texte formulieren, aber echte Empathie bleibt menschlich.'
        : '✓ Exactly! AI can formulate texts, but real empathy remains human.',
      4: isGerman
        ? '✓ Richtig! Nutzen Sie KI als Inspirationsquelle – die kreative Entscheidung ist Ihre.'
        : '✓ Right! Use AI as a source of inspiration – the creative decision is yours.',
      5: isGerman
        ? '✓ Perfekt! "KI unterstützt, Mensch entscheidet" ist unser Grundprinzip für würdevolle Technologienutzung.'
        : '✓ Perfect! "AI supports, human decides" is our core principle for dignified technology use.'
    };
    return messages[q] || (isGerman ? '<strong>✓ Richtig!</strong> Sehr gut gemacht.' : '<strong>✓ Correct!</strong> Very well done.');
  },
  
  getWrongMessage(q) {
    const isGerman = document.documentElement.lang === 'de';
    const messages = {
      1: isGerman
        ? 'Das ist nicht ganz richtig – und das ist völlig in Ordnung! KI unterstützt, aber Sie entscheiden. Das ist das Kernprinzip. Der grüne Rahmen zeigt die richtige Antwort.'
        : 'That is not quite right – and that is perfectly fine! AI supports, but you decide. That is the core principle. The green frame shows the correct answer.',
      2: isGerman
        ? 'Nicht ganz. KI kann Fehler machen. Nutzen Sie sie als Startpunkt, prüfen Sie aber Quellen. Der grüne Rahmen zeigt die richtige Antwort.'
        : 'Not quite. AI can make mistakes. Use it as a starting point, but check sources. The green frame shows the correct answer.',
      3: isGerman
        ? 'KI kann viel bei der Kommunikation helfen, aber menschliche Empathie nicht ersetzen. Der grüne Rahmen zeigt die richtige Antwort.'
        : 'AI can help a lot with communication, but cannot replace human empathy. The green frame shows the correct answer.',
      4: isGerman
        ? 'KI liefert Ideen, aber Sie entscheiden, was Sie verwenden und wie Sie es gestalten. Der grüne Rahmen zeigt die richtige Antwort.'
        : 'AI provides ideas, but you decide what to use and how to shape it. The green frame shows the correct answer.',
      5: isGerman
        ? 'Das Kernprinzip lautet: KI unterstützt, aber der Mensch behält die Kontrolle. Der grüne Rahmen zeigt die richtige Antwort.'
        : 'The core principle is: AI supports, but humans keep control. The green frame shows the correct answer.'
    };
    return messages[q] || (isGerman ? '<strong>Nicht ganz.</strong> Der grüne Rahmen zeigt die richtige Antwort.' : '<strong>Not quite.</strong> The green frame shows the correct answer.');
  }
};

// ============================================
// CONFETTI
// ============================================
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
    
    if (this.toggleBtn) {
      this.toggleBtn.classList.toggle('active', isActive);
    }
    
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

// ============================================
// PROGRESS BAR - Throttled for Performance
// ============================================
let progressBarTicking = false;

function updateProgressBar() {
  if (!progressBarTicking) {
    window.requestAnimationFrame(() => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      const bar = document.getElementById('progress-bar');
      if (bar) bar.style.width = scrollPercent + '%';
      progressBarTicking = false;
    });
    progressBarTicking = true;
  }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  ParallaxHero.init();
  RevealAnimations.init();
  QuizModule.init();
  ClassroomMode.init();
  
  // Progress bar
  window.addEventListener('scroll', updateProgressBar, { passive: true });
  updateProgressBar();
  
  // Update Final CTA quiz pending status
  const quizPendingDe = document.getElementById('quiz-pending-de');
  const quizPendingEn = document.getElementById('quiz-pending-en');
  const quizCompleted = localStorage.getItem('ki_academy_m02_complete') === 'true';
  if (quizCompleted) {
    if (quizPendingDe) {
      quizPendingDe.innerHTML = '<i class="ph ph-check-circle"></i> Wissens-Check abgeschlossen';
      quizPendingDe.classList.remove('final-cta-checklist-pending');
    }
    if (quizPendingEn) {
      quizPendingEn.innerHTML = '<i class="ph ph-check-circle"></i> Knowledge Check completed';
      quizPendingEn.classList.remove('final-cta-checklist-pending');
    }
  }
});

// Expose globally for onclick handlers
window.toggleDetektiv = toggleDetektiv;
window.revealMythe = revealMythe;
window.QuizModule = QuizModule;
window.createConfetti = createConfetti;
