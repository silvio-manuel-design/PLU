/**
 * Quiz Module — Kamera-Sucher Style
 * LCD-Display aesthetic with viewfinder brackets
 */

import { getStorage, setStorage, removeStorage } from './storage.js';

const STORAGE_PREFIX = 'photo-quiz-';

export function initQuiz() {
  const containers = document.querySelectorAll('.photo-quiz');
  if (!containers.length) return;

  const moduleId = document.body.getAttribute('data-module') || 'unknown';
  const total = containers.length;
  const isEn = document.documentElement.lang === 'en';

  containers.forEach((container, quizIndex) => {
    const questionEl = container.querySelector('.photo-quiz__question');
    const options = container.querySelectorAll('.photo-quiz__option');
    const feedback = container.querySelector('.photo-quiz__feedback');
    if (!questionEl || !options.length) return;

    // Add data-letter attributes (A, B, C...)
    options.forEach((opt, i) => {
      opt.setAttribute('data-letter', String.fromCharCode(65 + i));
    });

    // Add status bar if not present
    if (!container.querySelector('.photo-quiz__status')) {
      const status = document.createElement('div');
      status.className = 'photo-quiz__status';
      status.innerHTML = `
        <div class="photo-quiz__status-left">
          <span class="photo-quiz__rec">REC</span>
          <span class="photo-quiz__mode">${isEn ? 'Quiz Mode' : 'Quiz-Modus'}</span>
        </div>
        <span class="photo-quiz__counter">${String(quizIndex + 1).padStart(2, '0')}/${String(total).padStart(2, '0')}</span>
      `;
      container.insertBefore(status, container.firstChild);
    }

    const storageKey = `${STORAGE_PREFIX}${moduleId}-${quizIndex}`;
    const saved = getStorage(storageKey);

    if (saved && saved.answered) {
      disableQuiz(options, saved.correctIndex, saved.selectedIndex);
      showFeedback(feedback, saved.correctIndex === saved.selectedIndex, isEn, storageKey, container, options);
      return;
    }

    options.forEach((option, index) => {
      option.addEventListener('click', () => {
        if (option.classList.contains('is-disabled')) return;

        const correctIndex = parseInt(container.dataset.correct || '0');
        const isCorrect = index === correctIndex;

        disableQuiz(options, correctIndex, index);
        showFeedback(feedback, isCorrect, isEn, storageKey, container, options);

        setStorage(storageKey, {
          answered: true,
          correctIndex,
          selectedIndex: index,
          isEn
        });
      });
    });
  });
}

function disableQuiz(options, correctIndex, selectedIndex) {
  options.forEach((opt, idx) => {
    opt.classList.add('is-disabled');
    if (idx === correctIndex) {
      opt.classList.add('is-correct');
    } else if (idx === selectedIndex && idx !== correctIndex) {
      opt.classList.add('is-wrong');
    }
  });
}

function resetQuiz(container, options, feedback, storageKey) {
  options.forEach(opt => {
    opt.classList.remove('is-disabled', 'is-correct', 'is-wrong');
  });
  if (feedback) {
    feedback.className = 'photo-quiz__feedback';
    feedback.textContent = '';
  }
  removeStorage(storageKey);
}

function showFeedback(feedback, isCorrect, isEn, storageKey, container, options) {
  if (!feedback) return;
  feedback.className = 'photo-quiz__feedback';
  feedback.classList.add(isCorrect ? 'photo-quiz__feedback--correct' : 'photo-quiz__feedback--wrong');

  const msg = isCorrect
    ? (isEn ? 'Correct! Well done.' : 'Richtig! Gut gemacht.')
    : (isEn ? 'Not quite. Review the material and try again.' : 'Nicht ganz. Schau dir den Stoff noch einmal an.');

  feedback.innerHTML = `
    <span>${msg}</span>
    <button class="photo-quiz__retry" type="button" aria-label="${isEn ? 'Try again' : 'Noch einmal versuchen'}">
      <i class="ph ph-arrow-counter-clockwise" aria-hidden="true"></i>
      ${isEn ? 'Try again' : 'Wiederholen'}
    </button>
  `;

  const retryBtn = feedback.querySelector('.photo-quiz__retry');
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      resetQuiz(container, options, feedback, storageKey);
    });
  }
}
