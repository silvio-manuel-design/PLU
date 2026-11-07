// ============================================
// PARALLAX HERO (subtle)
// ============================================
const heroBg = document.getElementById('hero-bg-img');

if (heroBg && !window.matchMedia('(pointer: coarse)').matches) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    // Subtle upward movement (image stays within bounds)
    heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.15}px)`;
  }, { passive: true });
}

// ============================================
// REVEAL ANIMATIONS
// ============================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ============================================
// KI-DETEKTIV INTERACTION
// ============================================
let discoveredCount = 0;
const totalCards = 6;

function toggleDetektiv(card) {
  const progressBar = document.getElementById('detektiv-progress-bar');
  const progressText = document.getElementById('detektiv-progress-text');
  const revealSection = document.getElementById('detektiv-reveal');
  const countElement = document.getElementById('detektiv-count');
  
  // Bereits aktiv? → Sanftes Feedback statt Totschweigung
  if (card.classList.contains('active')) {
    card.classList.add('pulse-feedback');
    setTimeout(() => card.classList.remove('pulse-feedback'), 500);
    return;
  }
  
  card.classList.add('active');
  discoveredCount++;
  
  // Fortschrittsbalken aktualisieren (sprachunabhängig: Zahlen ersetzen)
  const percent = (discoveredCount / totalCards) * 100;
  if (progressBar) progressBar.style.width = `${percent}%`;
  if (progressText) {
    const initialText = progressText.dataset.initial || progressText.textContent;
    if (!progressText.dataset.initial) progressText.dataset.initial = initialText;
    // Ersetze erste Zahl durch discoveredCount und zweite durch totalCards
    progressText.textContent = initialText
      .replace(/^\d+/, discoveredCount)
      .replace(/\d+(?=\s*(?:entdeckt|discovered|$))/, totalCards);
    if (discoveredCount === totalCards) {
      progressText.classList.add('all-found');
    }
  }
  
  // Reveal-Section anzeigen (ab erstem Klick)
  if (revealSection) revealSection.classList.add('show');
  if (countElement) {
    const initialCount = countElement.dataset.initial || countElement.textContent;
    if (!countElement.dataset.initial) countElement.dataset.initial = initialCount;
    countElement.textContent = initialCount
      .replace(/^\d+/, discoveredCount)
      .replace(/\d+(?=\s*(?:entdeckt|discovered|$))/, totalCards);
  }
  
  // Abschluss-Animation
  if (discoveredCount === totalCards) {
    createConfetti();
    // Scroll sanft zur Reveal-Section
    setTimeout(() => {
      if (revealSection) revealSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }
  
  // Save progress
  localStorage.setItem('ki_academy_m01_detektiv', JSON.stringify({
    discovered: discoveredCount,
    timestamp: new Date().toISOString()
  }));
}

// ============================================
// LEARNING STEP INTERACTION
// ============================================
function toggleLearningStep(card) {
  if (card.classList.contains('active')) {
    card.classList.add('pulse-feedback');
    setTimeout(() => card.classList.remove('pulse-feedback'), 500);
    return;
  }
  card.classList.add('active');
}

// ============================================
// MYTHEN REVEAL
// ============================================
function revealMythe(card) {
  card.classList.add('mythen-revealed');
  card.classList.add(card.classList.contains('myth') ? 'fact' : 'myth');
}

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
      // Sprachunabhängig: Ersetze Zahl vor "von/of"
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
    
    // Reset vorherige Markierungen auf dieser Karte
    allButtons.forEach(btn => {
      btn.classList.remove('selected', 'wrong', 'correct', 'correct-hint');
    });
    feedback.className = 'quiz-feedback';
    
    // Entferne vorherigen "Nächste Frage" Button
    const oldNextBtn = card.querySelector('.quiz-next-btn');
    if (oldNextBtn) oldNextBtn.remove();
    
    const isFirstAttempt = !this.answeredQuestions.has(questionNum);
    
    // Eigene Meinung
    if (isOwn) {
      button.classList.add('selected', 'own-perspective');
      feedback.classList.add('show', 'own-perspective');
      feedback.innerHTML = `
        💬 <strong>Ihre Perspektive zählt!</strong><br>
        Es gibt oft mehrere gültige Sichtweisen. Das Wichtigste ist, dass Sie kritisch denken und Ihre eigene Meinung bilden.
      `;
      if (isFirstAttempt) {
        this.answeredQuestions.add(questionNum);
        this.updateProgress();
      }
      if (!feedback.querySelector('.quiz-own-input')) {
        const textarea = document.createElement('textarea');
        textarea.className = 'quiz-own-input';
        textarea.placeholder = 'Möchten Sie Ihre Sichtweise erklären? (optional)';
        textarea.setAttribute('aria-label', 'Ihre eigene Perspektive zu dieser Frage');
        feedback.appendChild(document.createElement('br'));
        feedback.appendChild(textarea);
      }
      this.addNextButton(card, questionNum);
      this.checkAllAnswered();
      return;
    }
    
    // Richtige Antwort
    if (isCorrect) {
      button.classList.add('selected', 'correct');
      feedback.classList.add('show', 'correct');
      
      const messages = [
        '✓ Richtig! KI ist ein Programm, das aus Daten Muster lernt – ohne Bewusstsein oder Gefühle. Das ist der entscheidende Unterschied: KI rechnet, sie denkt nicht.',
        '✓ Korrekt! KI lernt durch viele Beispiele und Korrekturen. Ein Kind erkennt eine Katze nach wenigen Beispielen – KI braucht Millionen. Dafür vergisst sie nie.',
        '✓ Genau! KI erkennt Muster in großen Datenmengen, speichert aber keine persönlichen Gespräche. Ihre Daten werden anonymisiert analysiert, nicht abgespeichert.'
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
    }
    // Falsche Antwort
    else {
      button.classList.add('selected', 'wrong');
      feedback.classList.add('show', 'wrong');

      // Hinweis auf richtige Antwort (nicht disabled!)
      allButtons.forEach(btn => {
        if (btn.getAttribute('data-correct') === 'true') {
          btn.classList.add('correct-hint');
        }
      });

      const correctMessages = [
        'Das ist nicht ganz richtig – und das ist völlig in Ordnung! KI hat kein Bewusstsein und keine Gefühle. Sie ist ein Programm, das aus Daten Muster erkennt. Der grüne Rahmen zeigt Ihnen die richtige Antwort. Probieren Sie es gerne noch einmal!',
        'Nicht ganz. KI lernt nicht intuitiv wie ein Kind, sondern braucht Millionen von Beispielen und menschliche Korrekturen. Das ist ihr größter Unterschied zu uns: Sie braucht Daten, wir brauchen Erfahrung. Die richtige Antwort ist mit dem grünen Rahmen markiert.',
        'Nicht korrekt. KI speichert keine persönlichen Gespräche – sie analysiert Muster anonym. Ihre Daten werden nicht für immer gespeichert. Die richtige Antwort sehen Sie im grünen Rahmen.'
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
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'quiz-next-btn';
    nextBtn.innerHTML = `Nächste Frage <i class="ph ph-arrow-down"></i>`;
    nextBtn.setAttribute('aria-label', 'Zur nächsten Frage scrollen');
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
    
    // Score anzeigen
    if (scoreEl) scoreEl.textContent = `${score} ${of} ${this.totalQuestions} ${isGerman ? 'richtig' : 'correct'}`;
    
    // Dynamischer Text je nach Ergebnis
    if (score === 3) {
      if (iconEl) iconEl.innerHTML = '<i class="ph ph-trophy"></i>';
      if (titleEl) titleEl.textContent = isGerman ? 'Fantastisch!' : 'Fantastic!';
      if (textEl) textEl.textContent = isGerman 
        ? 'Sie haben alle Fragen richtig beantwortet. Sie haben verstanden, was KI wirklich ist!' 
        : 'You answered all questions correctly. You understand what AI really is!';
    } else if (score === 2) {
      if (iconEl) iconEl.innerHTML = '<i class="ph ph-star"></i>';
      if (titleEl) titleEl.textContent = isGerman ? 'Gut gemacht!' : 'Well done!';
      if (textEl) textEl.textContent = isGerman 
        ? '2 von 3 richtig – Sie haben das Wichtigste verstanden! Ein kurzer Blick zurück auf die Erklärungen schadet nie.' 
        : '2 out of 3 correct – You understood the most important part! A quick look back at the explanations never hurts.';
    } else if (score === 1) {
      if (iconEl) iconEl.innerHTML = '<i class="ph ph-seedling"></i>';
      if (titleEl) titleEl.textContent = isGerman ? 'Sie sind auf dem Weg!' : 'You are on your way!';
      if (textEl) textEl.textContent = isGerman 
        ? '1 von 3 richtig – Kein Problem! KI ist neu für uns alle. Nehmen Sie sich Zeit, die Erklärungen noch einmal zu lesen. Das Wichtigste: KI denkt nicht, sie rechnet.' 
        : '1 out of 3 correct – No problem! AI is new to all of us. Take your time to read the explanations again. The most important thing: AI does not think, it calculates.';
    } else {
      if (iconEl) iconEl.innerHTML = '<i class="ph ph-heart"></i>';
      if (titleEl) titleEl.textContent = isGerman ? 'Kein Grund zur Sorge!' : 'No need to worry!';
      if (textEl) textEl.textContent = isGerman 
        ? '0 von 3 richtig – Das ist völlig in Ordnung. KI ist komplex und neu. Lesen Sie die Erklärungen erneut und kommen Sie später zurück. Sie können dieses Modul so oft wiederholen wie Sie möchten.' 
        : '0 out of 3 correct – That is perfectly fine. AI is complex and new. Read the explanations again and come back later. You can repeat this module as often as you like.';
    }
    
    resultBox.style.display = 'block';
    resultBox.classList.add('show');
    
    // Confetti nur bei 2+ oder 3/3
    if (score >= 2) {
      this.createConfetti();
    }
    
    // Sanft zum Ergebnis scrollen
    setTimeout(() => {
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
    
    // Progress speichern
    try {
      localStorage.setItem('ki_academy_m01_complete', 'true');
      localStorage.setItem('ki_academy_m01_score', `${score}/${this.totalQuestions}`);
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
const style = document.createElement('style');
style.textContent = `
  @keyframes confetti-fall {
    to {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
  
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .reveal.revealed {
    opacity: 1;
    transform: translateY(0);
  }
  
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
`;
document.head.appendChild(style);

// ============================================
// LOAD PROGRESS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const savedDetektiv = localStorage.getItem('ki_academy_m01_detektiv');
  if (savedDetektiv) {
    const data = JSON.parse(savedDetektiv);
    discoveredCount = data.discovered || 0;
    
    // Aktive Karten wiederherstellen
    const cards = document.querySelectorAll('.detektiv-card');
    cards.forEach((card, index) => {
      if (index < discoveredCount) {
        card.classList.add('active');
      }
    });
    
    if (discoveredCount > 0) {
      // Fortschrittsbalken aktualisieren
      const progressBar = document.getElementById('detektiv-progress-bar');
      const progressText = document.getElementById('detektiv-progress-text');
      const revealSection = document.getElementById('detektiv-reveal');
      const countElement = document.getElementById('detektiv-count');
      
      const percent = (discoveredCount / totalCards) * 100;
      if (progressBar) progressBar.style.width = `${percent}%`;
      if (progressText) {
        const initial = progressText.dataset.initial || progressText.textContent;
        if (!progressText.dataset.initial) progressText.dataset.initial = initial;
        progressText.textContent = initial.replace(/^\d+/, discoveredCount).replace(/\d+(?=\s*(?:entdeckt|discovered|$))/, totalCards);
        if (discoveredCount === totalCards) progressText.classList.add('all-found');
      }
      if (revealSection) revealSection.classList.add('show');
      if (countElement) {
        const initial = countElement.dataset.initial || countElement.textContent;
        if (!countElement.dataset.initial) countElement.dataset.initial = initial;
        countElement.textContent = initial.replace(/^\d+/, discoveredCount).replace(/\d+(?=\s*(?:entdeckt|discovered|$))/, totalCards);
      }
    }
  }
  
  // Mark M00 as complete
  localStorage.setItem('ki_academy_m00_complete', 'true');
  
  // Update Final CTA quiz pending status
  const quizPendingDe = document.getElementById('quiz-pending-de');
  const quizPendingEn = document.getElementById('quiz-pending-en');
  const quizCompleted = localStorage.getItem('ki_academy_m01_complete') === 'true';
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
      document.getElementById('progress-bar').style.width = scrollPercent + '%';
      progressBarTicking = false;
    });
    progressBarTicking = true;
  }
}

// Initialize progress bar
window.addEventListener('scroll', updateProgressBar, { passive: true });
updateProgressBar();

// ============================================
// CLASSROOM MODE - Für Vorträge & Präsentationen
// ============================================
(function() {
  const classroomToggle = document.querySelector('.classroom-toggle');
  const body = document.body;
  
  // Check saved state
  if (localStorage.getItem('ki_academy_classroom') === 'true') {
    body.classList.add('classroom-mode');
    classroomToggle.classList.add('active');
  }
  
  if (classroomToggle) {
    classroomToggle.addEventListener('click', function() {
      body.classList.toggle('classroom-mode');
      const isActive = body.classList.contains('classroom-mode');
      localStorage.setItem('ki_academy_classroom', isActive);
      
      // Update button active state
      classroomToggle.classList.toggle('active', isActive);
      
      // Announce to screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'sr-only';
      announcement.textContent = isActive ? 'Klassenraummodus aktiviert' : 'Klassenraummodus deaktiviert';
      document.body.appendChild(announcement);
      setTimeout(() => announcement.remove(), 1000);
    });
  }
})();
