/**
 * KI Challenge 2026 — Kompendium
 * Entry Point mit Suche, Quiz & Progress-Tracking
 */

import { initI18n } from './modules/i18n.js';
import { initTheme } from './modules/theme.js';
import { ClassroomManager, initBackToTop, initMobileMenu } from './modules/classroom.js';

import de from '../translations/de.js';
import en from '../translations/en.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize core systems
  initI18n(de, en);
  initTheme();
  new ClassroomManager();
  initBackToTop();
  initMobileMenu();

  // Initialize glossary-specific features
  initSearch();
  initQuiz();
  initCodeCopy();
  initProgressTracking();
  initSmoothScroll();
  initActiveNav();
});

/* ============================================================
   SEARCH
   ============================================================ */
function initSearch() {
  const searchInput = document.getElementById('glossary-search');
  if (!searchInput) return;

  const cards = document.querySelectorAll('.glossary-card');
  const sections = document.querySelectorAll('.glossary-section');

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (!query) {
      // Show all
      cards.forEach(card => {
        card.classList.remove('is-hidden', 'is-highlighted');
      });
      sections.forEach(section => {
        section.classList.remove('is-hidden');
      });
      return;
    }

    cards.forEach(card => {
      const title = card.querySelector('.glossary-card__title')?.textContent.toLowerCase() || '';
      const content = card.textContent.toLowerCase();
      const isMatch = title.includes(query) || content.includes(query);

      card.classList.toggle('is-hidden', !isMatch);
      card.classList.toggle('is-highlighted', isMatch);
    });

    // Hide empty sections
    sections.forEach(section => {
      const visibleCards = section.querySelectorAll('.glossary-card:not(.is-hidden)');
      section.classList.toggle('is-hidden', visibleCards.length === 0);
    });
  });
}

/* ============================================================
   QUIZ
   ============================================================ */
function initQuiz() {
  const quizzes = document.querySelectorAll('.glossary-quiz');

  quizzes.forEach(quiz => {
    const questions = quiz.querySelectorAll('.glossary-quiz__question');

    questions.forEach(question => {
      const options = question.querySelectorAll('.glossary-quiz__option');
      const feedback = question.querySelector('.glossary-quiz__feedback');

      options.forEach(option => {
        option.addEventListener('click', () => {
          // Prevent multiple answers
          if (option.classList.contains('is-disabled')) return;

          const isCorrect = option.dataset.correct === 'true';

          // Mark all options in this question
          options.forEach(opt => {
            opt.classList.add('is-disabled');
            if (opt.dataset.correct === 'true') {
              opt.classList.add('is-correct');
            } else if (opt === option && !isCorrect) {
              opt.classList.add('is-wrong');
            }
          });

          // Show feedback
          if (isCorrect) {
            feedback.textContent = '✅ Richtig! Weiter so!';
            feedback.className = 'glossary-quiz__feedback is-correct';
          } else {
            feedback.textContent = '❌ Nicht ganz. Die richtige Antwort ist markiert.';
            feedback.className = 'glossary-quiz__feedback is-wrong';
          }

          // Save progress (only once per quiz)
          if (!quiz.dataset.answered) {
            quiz.dataset.answered = 'true';
            saveQuizProgress(quiz.dataset.quiz, isCorrect);
            updateProgressBar();
          }
        });
      });
    });
  });
}

function saveQuizProgress(quizId, isCorrect) {
  if (!quizId) return;
  const progress = getQuizProgress();
  progress[quizId] = isCorrect;
  localStorage.setItem('glossary-quiz-progress', JSON.stringify(progress));
}

function getQuizProgress() {
  try {
    return JSON.parse(localStorage.getItem('glossary-quiz-progress')) || {};
  } catch {
    return {};
  }
}

/* ============================================================
   PROGRESS TRACKING
   ============================================================ */
function initProgressTracking() {
  updateProgressBar();

  // Track which sections have been viewed
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        if (sectionId) {
          markSectionAsViewed(sectionId);
          updateProgressBar();
        }
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.glossary-section').forEach(section => {
    observer.observe(section);
  });
}

function markSectionAsViewed(sectionId) {
  const viewed = getViewedSections();
  if (!viewed.includes(sectionId)) {
    viewed.push(sectionId);
    localStorage.setItem('glossary-viewed-sections', JSON.stringify(viewed));
  }
}

function getViewedSections() {
  try {
    return JSON.parse(localStorage.getItem('glossary-viewed-sections')) || [];
  } catch {
    return [];
  }
}

function updateProgressBar() {
  const sections = document.querySelectorAll('.glossary-section');
  const quizzes = document.querySelectorAll('.glossary-quiz');

  const totalItems = sections.length + quizzes.length;
  const viewedSections = getViewedSections().length;
  const answeredQuizzes = Object.keys(getQuizProgress()).length;

  const completed = viewedSections + answeredQuizzes;
  const percentage = totalItems > 0 ? Math.round((completed / totalItems) * 100) : 0;

  const fill = document.getElementById('progress-fill');
  const text = document.getElementById('progress-text');

  if (fill) fill.style.width = `${percentage}%`;
  if (text) text.textContent = `${percentage}% erledigt`;
}

/* ============================================================
   CODE COPY
   ============================================================ */
function initCodeCopy() {
  const copyButtons = document.querySelectorAll('.code-block__copy');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const codeBlock = btn.closest('.code-block');
      const code = codeBlock?.querySelector('code')?.textContent;

      if (code) {
        try {
          await navigator.clipboard.writeText(code);
          const originalIcon = btn.innerHTML;
          btn.innerHTML = '<i class="ph ph-check" aria-hidden="true"></i>';
          btn.style.color = 'var(--challenge-success)';

          setTimeout(() => {
            btn.innerHTML = originalIcon;
            btn.style.color = '';
          }, 2000);
        } catch (err) {
          console.error('Copy failed:', err);
        }
      }
    });
  });
}

/* ============================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ============================================================
   ACTIVE NAV INDICATOR
   ============================================================ */
function initActiveNav() {
  const sections = document.querySelectorAll('.glossary-section');
  const navItems = document.querySelectorAll('.glossary-nav__item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const category = entry.target.dataset.category;

        navItems.forEach(item => {
          item.classList.toggle('is-active', item.dataset.category === category);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => observer.observe(section));
}
