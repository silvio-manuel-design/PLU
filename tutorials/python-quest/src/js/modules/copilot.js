/**
 * PYTHON QUEST — KI Copilot Avatar
 * Interaktiver Avatar, der mit dem Spieler wächst
 * Jetzt draggable auf allen Seiten!
 */

import { loadProgress } from './progress.js';
import { WORLDS } from './quest-data.js';
import { t } from './i18n.js';

const COPILOT_TIPS = {
  de: [
    'Tipp: Nutze f-Strings für elegante String-Formatierung!',
    'Erinnerung: In Python zählt Einrückung — immer 4 Spaces!',
    'Wusstest du? Python wurde nach Monty Python benannt!',
    'Pro-Tipp: enumerate() ist dein bester Freund bei Schleifen!',
    'KI-Copilot: Brauchst du Hilfe? Klick auf eine Quest!',
    'Motivation: Jede Zeile Code bringt dich näher zum Ziel!',
    'Tipp: Listen-Verständnisse machen deinen Code eleganter.',
    'Fun Fact: Python ist die meistgeliebte Sprache laut StackOverflow!'
  ],
  en: [
    'Tip: Use f-Strings for elegant string formatting!',
    'Remember: In Python, indentation matters — always 4 spaces!',
    'Did you know? Python was named after Monty Python!',
    'Pro tip: enumerate() is your best friend in loops!',
    'AI Copilot: Need help? Click on a quest!',
    'Motivation: Every line of code brings you closer to your goal!',
    'Tip: List comprehensions make your code more elegant.',
    'Fun fact: Python is the most loved language on StackOverflow!'
  ]
};

const POS_KEY = 'pyquest-copilot-pos';
const DRAG_THRESHOLD = 5;

let copilotEl = null;
let bubbleEl = null;
let tipInterval = null;

// Drag state
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let dragOffsetX = 0;
let dragOffsetY = 0;
let dragDistance = 0;

export function initCopilot() {
  renderCopilot();
  startTipRotation();

  // Inaktivitäts-Check
  let inactiveTimer = null;
  const resetInactive = () => {
    clearTimeout(inactiveTimer);
    inactiveTimer = setTimeout(() => {
      showBubble(t('copilot.continue'));
    }, 120000);
  };

  document.addEventListener('click', resetInactive);
  document.addEventListener('keydown', resetInactive);
}

function renderCopilot() {
  const progress = loadProgress();
  const stage = getCopilotStage(progress);

  copilotEl = document.createElement('div');
  copilotEl.className = `py-quest-copilot py-quest-copilot--stage-${stage}`;
  copilotEl.innerHTML = `
    <div class="py-quest-copilot__avatar" data-copilot-drag>
      ${getCopilotSVG(stage)}
    </div>
    <div class="py-quest-copilot__bubble" id="copilot-bubble">
      <span class="py-quest-copilot__bubble-text">${t('copilot.hello')}</span>
      <button class="py-quest-copilot__bubble-close" aria-label="${t('copilot.closeHint')}">
        <i class="ph ph-x"></i>
      </button>
    </div>
  `;

  document.body.appendChild(copilotEl);

  // Restore saved position
  restorePosition();

  // Drag handlers (desktop only — mobile uses tap-only)
  const avatar = copilotEl.querySelector('[data-copilot-drag]');
  const isMobile = window.innerWidth < 1024;
  if (avatar && !isMobile) {
    avatar.addEventListener('mousedown', onDragStart);
    avatar.addEventListener('touchstart', onDragStart, { passive: false });
  }

  // Click/tap on copilot (only if not dragged)
  copilotEl.addEventListener('click', (e) => {
    if (dragDistance < DRAG_THRESHOLD) {
      showRandomTip();
      animateCopilot();
    }
  });

  // On mobile, also handle touchstart for tap (without drag)
  if (isMobile && avatar) {
    avatar.addEventListener('touchstart', (e) => {
      dragDistance = 0;
    }, { passive: true });
  }

  // Close bubble
  copilotEl.querySelector('.py-quest-copilot__bubble-close')?.addEventListener('click', (e) => {
    e.stopPropagation();
    hideBubble();
  });

  bubbleEl = copilotEl.querySelector('.py-quest-copilot__bubble');

  // Initiale Begrüßung
  setTimeout(() => {
    if (progress.stats.questsCompleted === 0) {
      showBubble(t('copilot.welcome'));
    } else {
      showRandomTip();
    }
  }, 3000);
}

/* ── Drag & Drop ─────────────────────────────────────────────────────── */

function onDragStart(e) {
  if (!copilotEl) return;

  const isTouch = e.type === 'touchstart';
  const clientX = isTouch ? e.touches[0].clientX : e.clientX;
  const clientY = isTouch ? e.touches[0].clientY : e.clientY;

  const rect = copilotEl.getBoundingClientRect();
  dragOffsetX = clientX - rect.left;
  dragOffsetY = clientY - rect.top;
  dragStartX = clientX;
  dragStartY = clientY;
  dragDistance = 0;
  isDragging = true;

  copilotEl.classList.add('is-dragging');

  document.addEventListener('mousemove', onDragMove);
  document.addEventListener('mouseup', onDragEnd);
  document.addEventListener('touchmove', onDragMove, { passive: false });
  document.addEventListener('touchend', onDragEnd);
}

function onDragMove(e) {
  if (!isDragging || !copilotEl) return;

  const isTouch = e.type === 'touchmove';
  const clientX = isTouch ? e.touches[0].clientX : e.clientX;
  const clientY = isTouch ? e.touches[0].clientY : e.clientY;

  // Prevent scrolling on touch
  if (isTouch) e.preventDefault();

  dragDistance = Math.hypot(clientX - dragStartX, clientY - dragStartY);

  let newLeft = clientX - dragOffsetX;
  let newTop = clientY - dragOffsetY;

  // Constrain to viewport
  const elWidth = copilotEl.offsetWidth;
  const elHeight = copilotEl.offsetHeight;
  newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - elWidth));
  newTop = Math.max(0, Math.min(newTop, window.innerHeight - elHeight));

  copilotEl.style.left = `${newLeft}px`;
  copilotEl.style.bottom = 'auto';
  copilotEl.style.top = `${newTop}px`;
}

function onDragEnd() {
  if (!isDragging || !copilotEl) return;

  isDragging = false;
  copilotEl.classList.remove('is-dragging');

  // Save position
  const rect = copilotEl.getBoundingClientRect();
  const pos = {
    left: rect.left,
    bottom: window.innerHeight - rect.bottom
  };
  localStorage.setItem(POS_KEY, JSON.stringify(pos));

  document.removeEventListener('mousemove', onDragMove);
  document.removeEventListener('mouseup', onDragEnd);
  document.removeEventListener('touchmove', onDragMove);
  document.removeEventListener('touchend', onDragEnd);
}

function restorePosition() {
  try {
    const saved = localStorage.getItem(POS_KEY);
    if (!saved || !copilotEl) return;

    const pos = JSON.parse(saved);
    const elWidth = copilotEl.offsetWidth || 120;
    const elHeight = copilotEl.offsetHeight || 80;

    // Clamp to current viewport
    const left = Math.max(0, Math.min(pos.left, window.innerWidth - elWidth));
    const bottom = Math.max(80, Math.min(pos.bottom, window.innerHeight - elHeight));

    copilotEl.style.left = `${left}px`;
    copilotEl.style.bottom = `${bottom}px`;
    copilotEl.style.top = 'auto';
  } catch {
    // ignore parse errors
  }
}

/* ── Helpers ─────────────────────────────────────────────────────────── */

function getCopilotStage(progress) {
  const worldsCompleted = progress.completedWorlds.length;
  if (worldsCompleted >= 5) return 5;
  if (worldsCompleted >= 4) return 4;
  if (worldsCompleted >= 3) return 3;
  if (worldsCompleted >= 2) return 2;
  if (progress.stats.questsCompleted >= 3) return 2;
  if (progress.stats.questsCompleted >= 1) return 1;
  return 1;
}

function getCopilotSVG(stage) {
  const colors = ['#306998', '#E67E22', '#27AE60', '#9B59B6', '#E74C3C'];
  const color = colors[stage - 1] || colors[0];

  const stages = {
    1: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="${color}" opacity="0.2"/>
      <circle cx="32" cy="28" r="14" fill="${color}"/>
      <circle cx="27" cy="26" r="3" fill="white"/>
      <circle cx="37" cy="26" r="3" fill="white"/>
      <circle cx="27" cy="26" r="1.5" fill="#1a1a2e"/>
      <circle cx="37" cy="26" r="1.5" fill="#1a1a2e"/>
      <path d="M26 36 Q32 40 38 36" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`,

    2: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="${color}" opacity="0.2"/>
      <circle cx="32" cy="26" r="16" fill="${color}"/>
      <circle cx="26" cy="24" r="3.5" fill="white"/>
      <circle cx="38" cy="24" r="3.5" fill="white"/>
      <circle cx="26" cy="24" r="1.5" fill="#1a1a2e"/>
      <circle cx="38" cy="24" r="1.5" fill="#1a1a2e"/>
      <path d="M24 35 Q32 42 40 35" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <rect x="12" y="30" width="8" height="3" rx="1.5" fill="#FFD43B" transform="rotate(-30 16 31.5)"/>
      <rect x="44" y="30" width="8" height="3" rx="1.5" fill="#FFD43B" transform="rotate(30 48 31.5)"/>
    </svg>`,

    3: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="${color}" opacity="0.2"/>
      <circle cx="32" cy="24" r="18" fill="${color}"/>
      <circle cx="25" cy="22" r="4" fill="white"/>
      <circle cx="39" cy="22" r="4" fill="white"/>
      <circle cx="25" cy="22" r="2" fill="#1a1a2e"/>
      <circle cx="39" cy="22" r="2" fill="#1a1a2e"/>
      <path d="M22 34 Q32 44 42 34" stroke="white" stroke-width="3" fill="none" stroke-linecap="round"/>
      <rect x="10" y="28" width="10" height="3" rx="1.5" fill="#FFD43B" transform="rotate(-25 15 29.5)"/>
      <rect x="44" y="28" width="10" height="3" rx="1.5" fill="#FFD43B" transform="rotate(25 49 29.5)"/>
      <circle cx="32" cy="50" r="6" fill="#E74C3C" opacity="0.8"/>
    </svg>`,

    4: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="${color}" opacity="0.15"/>
      <path d="M12 32 L8 20 L16 28 Z" fill="#FFD43B"/>
      <path d="M52 32 L56 20 L48 28 Z" fill="#FFD43B"/>
      <circle cx="32" cy="24" r="18" fill="${color}"/>
      <circle cx="24" cy="22" r="4" fill="white"/>
      <circle cx="40" cy="22" r="4" fill="white"/>
      <circle cx="24" cy="22" r="2" fill="#1a1a2e"/>
      <circle cx="40" cy="22" r="2" fill="#1a1a2e"/>
      <path d="M20 34 Q32 46 44 34" stroke="white" stroke-width="3" fill="none" stroke-linecap="round"/>
      <rect x="8" y="26" width="12" height="3" rx="1.5" fill="#FFD43B" transform="rotate(-20 14 27.5)"/>
      <rect x="44" y="26" width="12" height="3" rx="1.5" fill="#FFD43B" transform="rotate(20 50 27.5)"/>
    </svg>`,

    5: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="${color}" opacity="0.1"/>
      <path d="M10 32 L6 16 L14 26 Z" fill="#FFD43B"/>
      <path d="M54 32 L58 16 L50 26 Z" fill="#FFD43B"/>
      <polygon points="32,6 34,12 40,12 35,16 37,22 32,18 27,22 29,16 24,12 30,12" fill="#FFD43B"/>
      <circle cx="32" cy="26" r="16" fill="${color}"/>
      <circle cx="25" cy="24" r="4" fill="white"/>
      <circle cx="39" cy="24" r="4" fill="white"/>
      <circle cx="25" cy="24" r="2" fill="#1a1a2e"/>
      <circle cx="39" cy="24" r="2" fill="#1a1a2e"/>
      <path d="M22 36 Q32 48 42 36" stroke="white" stroke-width="3" fill="none" stroke-linecap="round"/>
      <rect x="6" y="24" width="14" height="3" rx="1.5" fill="#FFD43B" transform="rotate(-15 13 25.5)"/>
      <rect x="44" y="24" width="14" height="3" rx="1.5" fill="#FFD43B" transform="rotate(15 51 25.5)"/>
      <circle cx="32" cy="52" r="4" fill="#00E5FF" opacity="0.6"/>
    </svg>`
  };

  return stages[stage] || stages[1];
}

function showBubble(text) {
  if (!bubbleEl) return;
  const textEl = bubbleEl.querySelector('.py-quest-copilot__bubble-text');
  if (textEl) textEl.textContent = text;
  bubbleEl.classList.add('is-visible');

  setTimeout(() => hideBubble(), 6000);
}

function hideBubble() {
  if (!bubbleEl) return;
  bubbleEl.classList.remove('is-visible');
}

function showRandomTip() {
  const lang = document.documentElement.lang === 'de' ? 'de' : 'en';
  const tips = COPILOT_TIPS[lang];
  const tip = tips[Math.floor(Math.random() * tips.length)];
  showBubble(tip);
}

function startTipRotation() {
  tipInterval = setInterval(() => {
    if (Math.random() > 0.7) showRandomTip();
  }, 45000);
}

function animateCopilot() {
  if (!copilotEl) return;
  copilotEl.classList.add('is-bouncing');
  setTimeout(() => copilotEl.classList.remove('is-bouncing'), 600);
}

export function updateCopilotStage() {
  if (!copilotEl) return;
  const progress = loadProgress();
  const newStage = getCopilotStage(progress);
  const currentStage = parseInt(copilotEl.className.match(/stage-(\d)/)?.[1] || 1);

  if (newStage > currentStage) {
    copilotEl.className = `py-quest-copilot py-quest-copilot--stage-${newStage}`;
    copilotEl.querySelector('.py-quest-copilot__avatar').innerHTML = getCopilotSVG(newStage);
    showBubble(t('copilot.levelUp'));
    animateCopilot();
  }
}
