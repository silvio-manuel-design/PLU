/**
 * Pansonic Video Lab — Mini-Quiz Module
 * Non-blocking competency check at the end of each module.
 */

import { getStorage, setStorage } from './storage.js';

const QUIZ_DATA_URL = '/tutorials/pansonic-video-lab/assets/data/quizzes.json';

function getModuleId() {
  const bodyId = document.body.dataset.module;
  if (bodyId) return bodyId;
  const match = window.location.pathname.match(/module\/(\d+)[-\w]*/);
  if (match) return `m${match[1]}`;
  const pageMatch = window.location.pathname.match(/\/(\w+)\.html$/);
  if (pageMatch) return pageMatch[1];
  return 'unknown';
}

async function loadQuizData() {
  try {
    const res = await fetch(QUIZ_DATA_URL);
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

export async function initQuiz() {
  const container = document.getElementById('moduleQuiz');
  if (!container) return;

  const moduleId = getModuleId();
  const data = await loadQuizData();
  if (!data || !data[moduleId]) {
    container.style.display = 'none';
    return;
  }

  const isEn = document.documentElement.lang === 'en';
  const lang = isEn ? 'en' : 'de';
  const quiz = data[moduleId];
  const storageKey = `pansonic-quiz-${moduleId}`;
  const saved = getStorage(storageKey, {});

  const title = quiz.title[lang];
  const questions = quiz.questions;

  container.className = 'video-content-section video-quiz-section';
  container.innerHTML = `
    <span class="video-section-eyebrow">${isEn ? 'Knowledge Check' : 'Wissenscheck'}</span>
    <h2>${title}</h2>
    <p class="video-quiz__intro">${isEn ? 'Test your understanding with a few quick questions. You can retake this quiz anytime.' : 'Teste dein Verständnis mit ein paar kurzen Fragen. Du kannst das Quiz jederzeit wiederholen.'}</p>
    <div class="video-quiz__list" id="quizList"></div>
    <div class="video-quiz__result" id="quizResult" style="display:none;"></div>
  `;

  const list = container.querySelector('#quizList');
  const resultBox = container.querySelector('#quizResult');

  function renderQuestions() {
    list.innerHTML = '';
    questions.forEach((q, qi) => {
      const savedAnswer = saved[qi];
      const qEl = document.createElement('div');
      qEl.className = 'video-quiz__question';
      qEl.dataset.index = qi;

      const optsHtml = q.options[lang].map((opt, oi) => {
        const isCorrect = oi === q.correct;
        const isSelected = savedAnswer === oi;
        const cls = savedAnswer !== undefined
          ? (isCorrect ? 'is-correct' : (isSelected ? 'is-wrong' : ''))
          : '';
        const disabled = savedAnswer !== undefined ? 'disabled' : '';
        return `
          <button type="button" class="video-quiz__option ${cls}" data-qi="${qi}" data-oi="${oi}" ${disabled}>
            <span class="video-quiz__option-letter">${String.fromCharCode(65 + oi)}</span>
            <span class="video-quiz__option-text">${opt}</span>
          </button>
        `;
      }).join('');

      qEl.innerHTML = `
        <p class="video-quiz__q-text">${qi + 1}. ${q.question[lang]}</p>
        <div class="video-quiz__options">${optsHtml}</div>
        <div class="video-quiz__explanation" style="display:${savedAnswer !== undefined ? 'block' : 'none'};">
          <p>${q.explanation[lang]}</p>
        </div>
      `;
      list.appendChild(qEl);
    });

    // Bind click handlers
    list.querySelectorAll('.video-quiz__option:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        const qi = parseInt(btn.dataset.qi, 10);
        const oi = parseInt(btn.dataset.oi, 10);
        handleAnswer(qi, oi);
      });
    });

    if (saved.answeredCount === questions.length) {
      showResult();
    }
  }

  function handleAnswer(qi, oi) {
    saved[qi] = oi;
    saved.answeredCount = (saved.answeredCount || 0) + 1;
    setStorage(storageKey, saved);

    const qEl = list.children[qi];
    const options = qEl.querySelectorAll('.video-quiz__option');
    const question = questions[qi];

    options.forEach((opt, idx) => {
      opt.disabled = true;
      if (idx === question.correct) {
        opt.classList.add('is-correct');
      } else if (idx === oi && oi !== question.correct) {
        opt.classList.add('is-wrong');
      }
    });

    const expl = qEl.querySelector('.video-quiz__explanation');
    if (expl) expl.style.display = 'block';

    if (saved.answeredCount >= questions.length) {
      showResult();
    }
  }

  function showResult() {
    let correctCount = 0;
    questions.forEach((q, i) => {
      if (saved[i] === q.correct) correctCount++;
    });

    const total = questions.length;
    const percent = Math.round((correctCount / total) * 100);

    let msg, submsg;
    if (percent === 100) {
      msg = isEn ? 'Perfect score!' : 'Perfekt!';
      submsg = isEn ? 'You answered all questions correctly.' : 'Du hast alle Fragen richtig beantwortet.';
    } else if (percent >= 75) {
      msg = isEn ? 'Great job!' : 'Super gemacht!';
      submsg = isEn ? `You got ${correctCount} out of ${total} right.` : `Du hast ${correctCount} von ${total} richtig.`;
    } else if (percent >= 50) {
      msg = isEn ? 'Good effort!' : 'Guter Anfang!';
      submsg = isEn ? `You got ${correctCount} out of ${total} right. Review the explanations above.` : `Du hast ${correctCount} von ${total} richtig. Sieh dir die Erklärungen oben an.`;
    } else {
      msg = isEn ? 'Keep learning!' : 'Weiter lernen!';
      submsg = isEn ? `You got ${correctCount} out of ${total} right. No worries — review the module and try again!` : `Du hast ${correctCount} von ${total} richtig. Kein Problem — wiederhole das Modul und probiere es erneut!`;
    }

    resultBox.style.display = 'block';
    resultBox.innerHTML = `
      <div class="video-quiz__score">
        <span class="video-quiz__score-number">${percent}%</span>
        <span class="video-quiz__score-label">${correctCount}/${total}</span>
      </div>
      <div class="video-quiz__score-text">
        <strong>${msg}</strong>
        <span>${submsg}</span>
      </div>
    `;

    // Reflection form
    renderReflection();
  }

  function renderReflection() {
    const reflectionKey = `pansonic-reflection-${moduleId}`;
    const reflectionSaved = getStorage(reflectionKey, null);
    if (reflectionSaved) return; // already submitted

    const reflectTitle = isEn ? 'Quick reflection' : 'Kurze Reflexion';
    const reflectSubtitle = isEn ? 'Optional — takes about 30 seconds' : 'Optional — dauert ca. 30 Sekunden';
    const insightLabel = isEn ? 'What was your key insight?' : 'Was war dein wichtigster Erkenntnis?';
    const confidenceLabel = isEn ? 'How confident do you feel? (1–5)' : 'Wie sicher fühlst du dich? (1–5)';
    const saveLabel = isEn ? 'Save reflection' : 'Reflexion speichern';
    const skipLabel = isEn ? 'Skip' : 'Überspringen';

    const reflectForm = document.createElement('div');
    reflectForm.className = 'video-quiz__reflection';
    reflectForm.innerHTML = `
      <h3 class="video-quiz__reflection-title">${reflectTitle}</h3>
      <p class="video-quiz__reflection-subtitle">${reflectSubtitle}</p>
      <div class="video-quiz__reflection-field">
        <label for="reflectionInsight">${insightLabel}</label>
        <textarea id="reflectionInsight" rows="3" placeholder="${isEn ? 'Write a few words...' : 'Schreibe ein paar Worte...'}"></textarea>
      </div>
      <div class="video-quiz__reflection-field">
        <label for="reflectionConfidence">${confidenceLabel}</label>
        <input type="range" id="reflectionConfidence" min="1" max="5" value="3" step="1">
        <div class="video-quiz__reflection-scale">
          <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
        </div>
      </div>
      <div class="video-quiz__reflection-actions">
        <button type="button" class="video-btn video-btn--primary video-quiz__reflection-save">${saveLabel}</button>
        <button type="button" class="video-btn video-btn--secondary video-quiz__reflection-skip">${skipLabel}</button>
      </div>
    `;
    container.appendChild(reflectForm);

    reflectForm.querySelector('.video-quiz__reflection-save').addEventListener('click', () => {
      const insight = reflectForm.querySelector('#reflectionInsight').value.trim();
      const confidence = parseInt(reflectForm.querySelector('#reflectionConfidence').value, 10);
      setStorage(reflectionKey, { insight, confidence, date: new Date().toISOString() });
      reflectForm.innerHTML = `<p class="video-quiz__reflection-thanks">${isEn ? 'Thank you for your reflection!' : 'Danke für deine Reflexion!'}</p>`;
    });

    reflectForm.querySelector('.video-quiz__reflection-skip').addEventListener('click', () => {
      reflectForm.remove();
    });
  }

  renderQuestions();
}
