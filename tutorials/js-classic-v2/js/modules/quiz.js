/**
 * js/modules/quiz.js — Kapitel-Quiz
 *
 * Struktur: fieldset[data-correct] mit Radios; Feedback-Templates
 * (<template data-feedback="ok|wrong">) werden je Antwort in die
 * aria-live-Zone der Frage geklont. Ergebnis wird persistiert.
 */

import { get, set } from './storage.js';
import { t, onLangChange } from './i18n.js';

export function initQuiz() {
  document.querySelectorAll('[data-component="jsc-quiz"]').forEach((quiz) => {
    const key = quiz.dataset.storageKey || 'quiz';
    const questions = [...quiz.querySelectorAll('fieldset[data-correct]')];
    if (!questions.length) return;

    const checkBtn = quiz.querySelector('[data-quiz-check]');
    const retryBtn = quiz.querySelector('[data-quiz-retry]');
    const result = quiz.querySelector('[data-quiz-result]');
    const saved = get(key, null);

    function selectedValues() {
      return questions.map((q) => q.querySelector('input[type="radio"]:checked')?.value ?? null);
    }

    function showFeedback(q, ok) {
      const zone = q.querySelector('[data-feedback-live]');
      if (!zone) return;
      zone.textContent = '';
      const tpl = q.querySelector(`template[data-feedback="${ok ? 'ok' : 'wrong'}"]`);
      if (tpl) zone.append(tpl.content.cloneNode(true));
      zone.classList.toggle('is-correct', ok);
      zone.classList.toggle('is-wrong', !ok);
    }

    function evaluate() {
      let correct = 0;
      questions.forEach((q) => {
        const want = q.dataset.correct;
        const got = q.querySelector('input[type="radio"]:checked')?.value;
        const ok = got === want;
        if (ok) correct += 1;
        showFeedback(q, ok);
      });
      if (result) {
        result.textContent = t('ui.quiz.result')
          .replace('%d', String(correct))
          .replace('%d', String(questions.length));
      }
      set(key, { answers: selectedValues(), correct });
      if (retryBtn) retryBtn.hidden = false;
      return correct;
    }

    function restore() {
      if (!saved || !Array.isArray(saved.answers)) return;
      questions.forEach((q, i) => {
        if (saved.answers[i]) {
          const input = q.querySelector(`input[value="${CSS.escape(saved.answers[i])}"]`);
          if (input) input.checked = true;
        }
      });
      if (saved.correct !== undefined) evaluate();
    }

    checkBtn?.addEventListener('click', evaluate);
    retryBtn?.addEventListener('click', () => {
      questions.forEach((q) => {
        q.querySelectorAll('input[type="radio"]').forEach((r) => (r.checked = false));
        const zone = q.querySelector('[data-feedback-live]');
        if (zone) {
          zone.textContent = '';
          zone.classList.remove('is-correct', 'is-wrong');
        }
      });
      if (result) result.textContent = '';
      retryBtn.hidden = true;
      set(key, null);
    });
    onLangChange(() => {
      const state = get(key, null);
      if (state && result) {
        result.textContent = t('ui.quiz.result').replace('%d', String(state.correct)).replace('%d', String(questions.length));
      }
    });

    restore();
  });
}
