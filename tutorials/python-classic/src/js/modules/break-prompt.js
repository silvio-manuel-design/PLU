/**
 * PYTHON CLASSIC — Break Prompt
 * Reminds learners to take a break after 20 minutes
 * Respects user choice via localStorage
 * Resets on user activity (click, key, scroll)
 */

const STORAGE_KEY = 'plu-break-prompt';
const BREAK_DURATION_MS = 20 * 60 * 1000; // 20 minutes
const ACTIVITY_TIMEOUT_MS = 30 * 1000;    // Reset timer if inactive for 30s

let timerId = null;
let lastActivity = Date.now();
let isPromptVisible = false;

function getState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function setState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getLang() {
  const html = document.documentElement;
  return html.getAttribute('lang') || 'de';
}

function t(key) {
  const lang = getLang();
  const texts = {
    de: {
      title: 'Zeit für eine Pause?',
      message: 'Du lernst schon seit 20 Minuten. Eine kurze Pause hilft deinem Gehirn, das Gelernte zu verankern.',
      button: 'Weiterlernen',
      dismiss: 'Heute nicht mehr anzeigen',
    },
    en: {
      title: 'Time for a break?',
      message: "You've been learning for 20 minutes. A short break helps your brain retain what you've learned.",
      button: 'Keep learning',
      dismiss: "Don't show again today",
    },
  };
  return (texts[lang] || texts.de)[key];
}

function createPrompt() {
  const existing = document.getElementById('plu-break-prompt');
  if (existing) existing.remove();

  const el = document.createElement('div');
  el.id = 'plu-break-prompt';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-labelledby', 'plu-break-title');
  el.innerHTML = `
    <div class="plu-break-backdrop"></div>
    <div class="plu-break-card">
      <h3 id="plu-break-title" class="plu-break-title">${t('title')}</h3>
      <p class="plu-break-message">${t('message')}</p>
      <div class="plu-break-actions">
        <button class="plu-break-btn plu-break-btn--primary" data-break-continue>
          ${t('button')}
        </button>
        <button class="plu-break-btn plu-break-btn--secondary" data-break-dismiss>
          ${t('dismiss')}
        </button>
      </div>
    </div>
  `;

  el.querySelector('[data-break-continue]').addEventListener('click', () => {
    hidePrompt();
    resetTimer();
  });

  el.querySelector('[data-break-dismiss]').addEventListener('click', () => {
    hidePrompt();
    const state = getState();
    state.dismissedUntil = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    setState(state);
    resetTimer();
  });

  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('is-visible'));
  isPromptVisible = true;
}

function hidePrompt() {
  const el = document.getElementById('plu-break-prompt');
  if (el) {
    el.classList.remove('is-visible');
    setTimeout(() => el.remove(), 300);
  }
  isPromptVisible = false;
}

function shouldShow() {
  const state = getState();
  if (state.dismissedUntil && Date.now() < state.dismissedUntil) return false;
  if (state.lastPrompt && Date.now() - state.lastPrompt < BREAK_DURATION_MS) return false;
  return true;
}

function onActivity() {
  lastActivity = Date.now();
}

function checkTimer() {
  if (isPromptVisible) return;
  if (!shouldShow()) return;

  const inactive = Date.now() - lastActivity;
  if (inactive > ACTIVITY_TIMEOUT_MS) return; // User is away, don't nag

  const state = getState();
  const startTime = state.startTime || Date.now();

  if (Date.now() - startTime >= BREAK_DURATION_MS) {
    state.lastPrompt = Date.now();
    setState(state);
    createPrompt();
  }
}

function resetTimer() {
  const state = getState();
  state.startTime = Date.now();
  setState(state);
}

export function initBreakPrompt() {
  // Don't show in Classroom Mode (teacher is in control)
  if (document.documentElement.classList.contains('is-classroom-mode')) return;

  // Activity listeners
  const events = ['click', 'keydown', 'scroll', 'touchstart'];
  events.forEach(e => document.addEventListener(e, onActivity, { passive: true }));

  // Initialize start time if not set
  const state = getState();
  if (!state.startTime) {
    state.startTime = Date.now();
    setState(state);
  }

  // Check every 10 seconds
  timerId = setInterval(checkTimer, 10000);
}

export function destroyBreakPrompt() {
  if (timerId) clearInterval(timerId);
  hidePrompt();
}
