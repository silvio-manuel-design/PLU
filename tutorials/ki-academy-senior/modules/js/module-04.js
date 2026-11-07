/**
 * KI ACADEMY - MODULE 04: SYSTEM-PROMPTS
 * Interactive JavaScript Module
 */

// ============================================
// PROGRESS BAR
// ============================================
const ProgressBar = {
  init() {
    const bar = document.getElementById('progress-bar');
    if (!bar) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      bar.style.width = progress + '%';
    }, { passive: true });
  }
};

// ============================================
// REVEAL ANIMATIONS
// ============================================
const RevealAnimations = {
  init() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;
    
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
    
    reveals.forEach(el => observer.observe(el));
  }
};

// ============================================
// ROLE TESTER TABS
// ============================================
const RoleTester = {
  init() {
    const tabs = document.querySelectorAll('.tester-tab');
    const panels = document.querySelectorAll('.tester-panel');

    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;

        // Update tabs
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update panels
        panels.forEach(p => p.classList.remove('active'));
        const targetPanel = document.querySelector(`.tester-panel[data-panel="${targetTab}"]`);
        if (targetPanel) targetPanel.classList.add('active');
      });
    });
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

  checkAnswer(button, questionNum) {
    const card = button.closest('.quiz-question-card');
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
        '✓ Richtig! Der System-Prompt definiert, wer die KI sein soll – ihre Persönlichkeit, ihren Ton und ihre Expertise.',
        '✓ Genau! Der erfahrene Berater berücksichtigt langfristige Folgen und gibt strategische Ratschläge – ideal für Finanzfragen.',
        '✓ Korrekt! Der System-Prompt wird vor der Unterhaltung definiert und beeinflusst alle folgenden Antworten – wie eine Hintergrundinstruktion.'
      ] : [
        '✓ Correct! The system prompt defines who the AI should be – its personality, tone, and expertise.',
        '✓ Exactly! The experienced advisor considers long-term consequences and gives strategic advice – ideal for financial questions.',
        '✓ Correct! The system prompt is defined before the conversation and influences all subsequent responses – like a background instruction.'
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
        'Das ist nicht ganz richtig – und das ist völlig in Ordnung! Die Längenbegrenzung und Rechtschreibung sind sekundär. Der System-Prompt gibt der KI vor allem ihre Rolle. Der grüne Rahmen zeigt die richtige Antwort.',
        'Nicht ganz. Für Finanzentscheidungen brauchen Sie strategisches Denken. Der kreative Partner ist eher für Brainstorming, der Coach für Motivation geeignet. Der grüne Rahmen zeigt die richtige Antwort.',
        'Nicht korrekt. Der System-Prompt kommt zu Beginn, nicht später. Er ist die unsichtbare Grundlage für das gesamte Gespräch. Der grüne Rahmen zeigt die richtige Antwort.'
      ] : [
        'That is not quite right – and that is perfectly fine! Length limits and spelling are secondary. The system prompt primarily gives the AI its role. The green frame shows the correct answer.',
        'Not quite. For financial decisions you need strategic thinking. The creative partner is more suitable for brainstorming, the coach for motivation. The green frame shows the correct answer.',
        'Not correct. The system prompt comes at the beginning, not later. It is the invisible foundation for the entire conversation. The green frame shows the correct answer.'
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
        ? 'Sie haben alle Fragen richtig beantwortet. Sie können jetzt gezielt KI-Persönlichkeiten formen!'
        : 'You answered all questions correctly. You can now specifically shape AI personalities!';
    } else if (score === 2) {
      if (iconEl) iconEl.innerHTML = '<i class="ph ph-star"></i>';
      if (titleEl) titleEl.textContent = isGerman ? 'Gut gemacht!' : 'Well done!';
      if (textEl) textEl.textContent = isGerman
        ? '2 von 3 richtig – Sie haben das Wichtigste verstanden! Ein kurzer Blick zurück auf die Rollen schadet nie.'
        : '2 out of 3 correct – You understood the most important part! A quick look back at the roles never hurts.';
    } else if (score === 1) {
      if (iconEl) iconEl.innerHTML = '<i class="ph ph-seedling"></i>';
      if (titleEl) titleEl.textContent = isGerman ? 'Sie sind auf dem Weg!' : 'You are on your way!';
      if (textEl) textEl.textContent = isGerman
        ? '1 von 3 richtig – Kein Problem! System-Prompts brauchen etwas Übung. Nehmen Sie sich Zeit, die Erklärungen noch einmal zu lesen.'
        : '1 out of 3 correct – No problem! System prompts need some practice. Take your time to read the explanations again.';
    } else {
      if (iconEl) iconEl.innerHTML = '<i class="ph ph-heart"></i>';
      if (titleEl) titleEl.textContent = isGerman ? 'Kein Grund zur Sorge!' : 'No need to worry!';
      if (textEl) textEl.textContent = isGerman
        ? '0 von 3 richtig – Das ist völlig in Ordnung. System-Prompts sind neu für uns alle. Lesen Sie die Erklärungen erneut und kommen Sie später zurück.'
        : '0 out of 3 correct – That is perfectly fine. System prompts are new to all of us. Read the explanations again and come back later.';
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
      localStorage.setItem('ki_academy_m04_quiz_complete', 'true');
      localStorage.setItem('ki_academy_m04_score', `${score}/${this.totalQuestions}`);
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
// DETEKTIV CLICK-TO-REVEAL
// ============================================
function toggleDetektiv(card) {
  const section = card.closest('.detektiv-section');
  const progressBar = section.querySelector('.detektiv-progress-bar');
  const progressText = section.querySelector('.detektiv-progress-text');
  const revealSection = section.querySelector('.detektiv-reveal');
  const allCards = section.querySelectorAll('.detektiv-card');
  const totalCards = allCards.length;

  if (card.classList.contains('active')) {
    card.classList.add('pulse-feedback');
    setTimeout(() => card.classList.remove('pulse-feedback'), 500);
    return;
  }

  card.classList.add('active');
  const discoveredCount = section.querySelectorAll('.detektiv-card.active').length;
  const percent = (discoveredCount / totalCards) * 100;

  if (progressBar) progressBar.style.width = `${percent}%`;
  if (progressText) {
    const isGerman = document.documentElement.lang === 'de';
    if (discoveredCount === totalCards) {
      progressText.textContent = isGerman ? 'Alle entdeckt! ✓' : 'All discovered! ✓';
      progressText.classList.add('all-found');
    } else {
      const label = isGerman ? 'entdeckt' : 'discovered';
      progressText.textContent = `${discoveredCount} ${isGerman ? 'von' : 'of'} ${totalCards} ${label}`;
    }
  }
  if (revealSection) revealSection.classList.add('show');

  if (discoveredCount === totalCards) {
    createConfetti();
    setTimeout(() => revealSection?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
  }
}

function createConfetti() {
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

// ============================================
// FINAL CHECKLIST
// ============================================
function updateFinalChecklist() {
  const isGerman = document.documentElement.lang === 'de';
  const id = isGerman ? 'quiz-pending-de' : 'quiz-pending-en';
  const pendingEl = document.getElementById(id);
  if (!pendingEl) return;

  try {
    const completed = localStorage.getItem('ki_academy_m04_quiz_complete');
    if (completed === 'true') {
      pendingEl.innerHTML = isGerman
        ? '<i class="ph ph-check-circle"></i> Wissens-Check abgeschlossen'
        : '<i class="ph ph-check-circle"></i> Knowledge check completed';
      pendingEl.classList.remove('final-cta-checklist-pending');
      pendingEl.classList.add('final-cta-checklist-item');
    }
  } catch (e) {
    console.log('localStorage not available');
  }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  ProgressBar.init();
  RevealAnimations.init();
  RoleTester.init();
  updateFinalChecklist();
});

// Expose globally
window.ProgressBar = ProgressBar;
window.RevealAnimations = RevealAnimations;
window.RoleTester = RoleTester;
window.QuizModule = QuizModule;
window.toggleDetektiv = toggleDetektiv;
window.createConfetti = createConfetti;
window.updateFinalChecklist = updateFinalChecklist;
