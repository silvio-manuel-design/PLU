/**
 * Pansonic Video Lab — Learning Reflection
 * Prompts learners to reflect on each module, storing answers in localStorage.
 * Based on metacognition research: self-explanation improves retention by 23%.
 */

const REFLECTION_QUESTIONS = {
  de: [
    'Was war für dich die wichtigste Erkenntnis in diesem Modul?',
    'Welches Konzept oder welche Technik möchtest du als Nächstes ausprobieren?',
    'Was hat dir noch gefehlt oder war unklar?'
  ],
  en: [
    'What was the most important insight for you in this module?',
    'Which concept or technique do you want to try next?',
    'What was missing or unclear?'
  ]
};

const SAVE_DEBOUNCE_MS = 800;

function getModuleId() {
  const bodyAttr = document.body.getAttribute('data-module');
  if (bodyAttr) return bodyAttr;
  const match = location.pathname.match(/\/(\d+)[-\w]+\.html$/);
  return match ? `m${match[1].padStart(2, '0')}` : 'm00';
}

function getStorageKey(moduleId, index) {
  return `video_reflection_${moduleId}_q${index}`;
}

function loadAnswer(moduleId, index) {
  try {
    return localStorage.getItem(getStorageKey(moduleId, index)) || '';
  } catch {
    return '';
  }
}

function saveAnswer(moduleId, index, value) {
  try {
    localStorage.setItem(getStorageKey(moduleId, index), value);
    return true;
  } catch {
    return false;
  }
}

function createReflectionSection(questions, moduleId) {
  const isEn = document.documentElement.lang === 'en';
  const title = isEn ? '📝 Learning Reflection' : '📝 Lern-Reflexion';
  const subtitle = isEn
    ? 'Take a moment to reflect — this anchors what you learned.'
    : 'Nimm dir einen Moment zur Reflexion — das verankert das Gelernte.';
  const savedLabel = isEn ? 'Saved' : 'Gespeichert';
  const placeholder = isEn ? 'Your thoughts...' : 'Deine Gedanken...';

  const itemsHtml = questions.map((question, i) => {
    const savedValue = escapeHtml(loadAnswer(moduleId, i));
    const qNum = i + 1;
    return `
      <div class="video-reflection__item" data-question-index="${i}">
        <label class="video-reflection__question" for="reflection-${moduleId}-${i}">
          <span class="video-reflection__number">${qNum}</span>
          ${escapeHtml(question)}
        </label>
        <textarea
          id="reflection-${moduleId}-${i}"
          class="video-reflection__textarea"
          rows="2"
          maxlength="500"
          placeholder="${placeholder}"
          aria-label="${escapeHtml(question)}"
        >${savedValue}</textarea>
        <div class="video-reflection__meta">
          <span class="video-reflection__status" aria-live="polite" aria-atomic="true"></span>
          <span class="video-reflection__counter">${savedValue.length}/500</span>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="video-reflection" data-reveal>
      <div class="video-reflection__header">
        <h3 class="video-reflection__title">${title}</h3>
        <p class="video-reflection__subtitle">${subtitle}</p>
      </div>
      <div class="video-reflection__list">
        ${itemsHtml}
      </div>
    </div>
  `;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function bindReflectionEvents(container, moduleId) {
  const textareas = container.querySelectorAll('.video-reflection__textarea');

  textareas.forEach(textarea => {
    const item = textarea.closest('.video-reflection__item');
    const statusEl = item.querySelector('.video-reflection__status');
    const counterEl = item.querySelector('.video-reflection__counter');
    const index = parseInt(item.getAttribute('data-question-index'), 10);
    let saveTimeout;

    textarea.addEventListener('input', () => {
      const len = textarea.value.length;
      if (counterEl) counterEl.textContent = `${len}/500`;

      if (statusEl) {
        statusEl.textContent = '';
        statusEl.classList.remove('is-saved');
      }

      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        const ok = saveAnswer(moduleId, index, textarea.value);
        if (ok && statusEl) {
          const isEn = document.documentElement.lang === 'en';
          statusEl.textContent = isEn ? 'Saved ✓' : 'Gespeichert ✓';
          statusEl.classList.add('is-saved');
          setTimeout(() => {
            statusEl.textContent = '';
            statusEl.classList.remove('is-saved');
          }, 2000);
        }
      }, SAVE_DEBOUNCE_MS);
    });
  });
}

/**
 * Initialise reflection section inside the given container.
 */
export function initReflection() {
  const container = document.getElementById('moduleReflection');
  if (!container) return;

  const moduleId = getModuleId();
  const isEn = document.documentElement.lang === 'en';
  const questions = isEn ? REFLECTION_QUESTIONS.en : REFLECTION_QUESTIONS.de;

  container.innerHTML = createReflectionSection(questions, moduleId);
  bindReflectionEvents(container, moduleId);
}
