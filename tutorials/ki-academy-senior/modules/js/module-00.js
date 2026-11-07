// ============================================
// SPIEGEL-TEST INTERACTION - Enhanced v2.0
// ============================================
let mirrorSelectionCount = 0;

function selectMirrorCard(card) {
  // Remove pulse and selection from all cards
  document.querySelectorAll('.mirror-card').forEach(c => {
    c.classList.remove('selected', 'pulse-hint');
  });
  
  // Add selected to clicked card
  card.classList.add('selected');
  
  // Show feedback
  const type = card.getAttribute('data-type');
  const feedback = document.getElementById('mirror-feedback');
  const titleEl = document.getElementById('mirror-feedback-title');
  const textEl = document.getElementById('mirror-feedback-text');
  
  const feedbacks = {
    threat: {
      title: 'Ihre Sorge ist verständlich ✓',
      text: 'Viele denken so. Aber hier ist die gute Nachricht: KI kann Menschen nicht ersetzen - sie kann nur das, was wir ihr beibringen. Sie bleiben der Chef. In diesem Tutorial zeigen wir Ihnen, warum das so ist.'
    },
    tool: {
      title: 'Das ist ein guter Ansatz! ✓',
      text: 'Genau so ist es! KI ist ein Werkzeug - mächtig, aber beherrschbar. Wie ein Auto: Komplex im Inneren, aber einfach zu fahren, wenn man die Grundlagen versteht.'
    },
    partner: {
      title: 'Das ist die zukunftsweisende Perspektive! ✓',
      text: 'Wunderbar! Sie verstehen bereits, dass KI ein Spiegel unseres Denkens ist. Gemeinsam können Sie und die KI Dinge erreichen, die allein schwer möglich wären.'
    }
  };
  
  titleEl.textContent = feedbacks[type].title;
  textEl.textContent = feedbacks[type].text;
  
  feedback.classList.add('visible');
  
  // Confetti celebration on first meaningful interaction
  mirrorSelectionCount++;
  if (mirrorSelectionCount === 1) {
    createMicroConfetti(card);
    showToast('🎉 Perspektive erfasst! Weiter geht\'s...');
  }
  
  // Smooth scroll to feedback
  setTimeout(() => {
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 400);
  
  // Save to localStorage
  localStorage.setItem('ki_academy_m00_mirror_type', type);
  localStorage.setItem('ki_academy_m00_complete', 'true');
}

// Micro Confetti Effect
function createMicroConfetti(element) {
  const colors = ['#F4A261', '#E76F51', '#90A955', '#5B8DEF', '#F5D547', '#ffffff'];
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  for (let i = 0; i < 24; i++) {
    const confetti = document.createElement('div');
    const size = 10 + Math.random() * 10;
    const isCircle = Math.random() > 0.3;
    confetti.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${isCircle ? '50%' : '4px'};
      pointer-events: none;
      z-index: 9999;
      left: ${centerX}px;
      top: ${centerY}px;
      box-shadow: 0 0 10px rgba(244, 162, 97, 0.5);
    `;
    document.body.appendChild(confetti);
    
    const angle = (i / 24) * Math.PI * 2;
    const velocity = 100 + Math.random() * 100;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - 50;
    
    confetti.animate([
      { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
      { transform: `translate(${vx}px, ${vy}px) scale(0.5) rotate(${Math.random() * 720}deg)`, opacity: 0.8, offset: 0.5 },
      { transform: `translate(${vx * 1.2}px, ${vy * 1.2 + 100}px) scale(0) rotate(${Math.random() * 1080}deg)`, opacity: 0 }
    ], {
      duration: 1500,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => confetti.remove();
  }
}

// Toast notification
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  requestAnimationFrame(() => {
    toast.classList.add('visible');
  });
  
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ============================================
// FEELING SELECTION
// ============================================
function selectFeeling(card, value) {
  document.querySelectorAll('.feeling-card').forEach(c => {
    c.style.borderColor = '';
    c.style.boxShadow = '';
  });
  
  card.style.borderColor = '#F4A261';
  card.style.boxShadow = '0 8px 30px rgba(244, 162, 97, 0.2)';
  
  const feedback = document.getElementById('feeling-feedback');
  const messages = {
    unsicher: "Perfekt! Dieses Modul wurde genau für Sie gemacht. In 30 Minuten fühlen Sie sich sicherer.",
    neugierig: "Wunderbar! Neugier ist der beste Start. Lassen Sie uns gemeinsam entdecken.",
    aufgeregt: "Fantastisch! Ihre Begeisterung wird noch wachsen. Los geht's!"
  };
  
  feedback.querySelector('p').textContent = messages[value];
  feedback.style.display = 'block';
  
  localStorage.setItem('ki_academy_feeling', value);
}

// ============================================
// PARALLAX EFFECT - Throttled for 60fps
// ============================================
let parallaxTicking = false;

function updateParallax() {
  if (!parallaxTicking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const heroBg = document.getElementById('parallax-hero');
      
      if (heroBg) {
        const heroImg = heroBg.querySelector('img');
        if (heroImg) {
          heroImg.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
        }
      }
      parallaxTicking = false;
    });
    parallaxTicking = true;
  }
}

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

// ============================================
// REVEAL ANIMATION
// ============================================
function initRevealAnimation() {
  const reveals = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  reveals.forEach(el => observer.observe(el));
}

// ============================================
// CLASSROOM MODE - Für Vorträge & Präsentationen
// ============================================
(function() {
  const classroomToggle = document.querySelector('.classroom-toggle');
  const body = document.body;
  
  // Check saved state
  if (localStorage.getItem('ki_academy_classroom') === 'true') {
    body.classList.add('classroom-mode');
    if (classroomToggle) {
      classroomToggle.classList.add('active');
    }
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

// ============================================
// INITIALIZE - Enhanced v2.0
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  // Parallax
  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax();
  
  // Progress bar
  window.addEventListener('scroll', updateProgressBar, { passive: true });
  updateProgressBar();
  
  // Reveal animations
  initRevealAnimation();
  
  // Mirror-Test: Restore or setup default hint
  const savedMirror = localStorage.getItem('ki_academy_m00_mirror_type');
  if (savedMirror) {
    const card = document.querySelector(`.mirror-card[data-type="${savedMirror}"]`);
    if (card) setTimeout(() => selectMirrorCard(card), 500);
  } else {
    // Auto-remove pulse hint after 8 seconds
    setTimeout(() => {
      document.querySelectorAll('.mirror-card').forEach(c => c.classList.remove('pulse-hint'));
    }, 8000);
  }
  
  // Restore feeling selection
  const savedFeeling = localStorage.getItem('ki_academy_feeling');
  if (savedFeeling) {
    const card = document.querySelector(`.feeling-card input[value="${savedFeeling}"]`)?.parentElement;
    if (card) setTimeout(() => selectFeeling(card, savedFeeling), 500);
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});

// ============================================
// QUIZ MODULE - Senior-Optimized UX
// ============================================
const QuizModule = {
  correctAnswers: 0,
  totalQuestions: 2,
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
        '✓ Richtig! KI ist Ihr Spiegel – sie reflektiert Ihr Denken und Ihre Weisheit.',
        '✓ Korrekt! 87% der Menschen über 50 fühlen sich von KI überfordert – das ist völlig normal.'
      ] : [
        '✓ Correct! AI is your mirror – it reflects your thinking and wisdom.',
        '✓ Exactly! 87% of people over 50 feel overwhelmed by AI – that is completely normal.'
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
        'Das ist nicht ganz richtig – und das ist völlig in Ordnung! KI ist kein fremder Roboter, sondern spiegelt Ihr Denken wider. Der grüne Rahmen zeigt Ihnen die richtige Antwort. Probieren Sie es gerne noch einmal!',
        'Nicht ganz. Die Mehrheit fühlt sich überfordert – deshalb gibt es dieses Tutorial. Sie sind nicht allein! Der grüne Rahmen zeigt die richtige Antwort.'
      ] : [
        'That is not quite right – and that is perfectly fine! AI is not a foreign robot, but mirrors your thinking. The green frame shows you the correct answer. Feel free to try again!',
        'Not quite. The majority feels overwhelmed – that is why this tutorial exists. You are not alone! The green frame shows the correct answer.'
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

    if (score === 2) {
      if (iconEl) iconEl.innerHTML = '<i class="ph ph-trophy"></i>';
      if (titleEl) titleEl.textContent = isGerman ? 'Fantastisch!' : 'Fantastic!';
      if (textEl) textEl.textContent = isGerman
        ? 'Sie haben alle Fragen richtig beantwortet. Sie sind bereit für Modul 01!'
        : 'You answered all questions correctly. You are ready for Module 01!';
    } else if (score === 1) {
      if (iconEl) iconEl.innerHTML = '<i class="ph ph-star"></i>';
      if (titleEl) titleEl.textContent = isGerman ? 'Gut gemacht!' : 'Well done!';
      if (textEl) textEl.textContent = isGerman
        ? '1 von 2 richtig – Sie haben das Wichtigste verstanden! Ein kurzer Blick zurück auf die Erklärungen schadet nie.'
        : '1 out of 2 correct – You understood the most important part! A quick look back at the explanations never hurts.';
    } else {
      if (iconEl) iconEl.innerHTML = '<i class="ph ph-heart"></i>';
      if (titleEl) titleEl.textContent = isGerman ? 'Kein Grund zur Sorge!' : 'No need to worry!';
      if (textEl) textEl.textContent = isGerman
        ? '0 von 2 richtig – Das ist völlig in Ordnung. Lesen Sie die Erklärungen erneut und kommen Sie später zurück. Sie können dieses Modul so oft wiederholen wie Sie möchten.'
        : '0 out of 2 correct – That is perfectly fine. Read the explanations again and come back later. You can repeat this module as often as you like.';
    }

    resultBox.style.display = 'block';
    resultBox.classList.add('show');

    if (score >= 1) {
      this.createConfetti();
    }

    setTimeout(() => {
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);

    try {
      localStorage.setItem('ki_academy_m00_quiz_complete', 'true');
      localStorage.setItem('ki_academy_m00_score', `${score}/${this.totalQuestions}`);
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
