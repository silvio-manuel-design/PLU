/**
 * PYTHON QUEST — Quest Page Engine
 * Rendert Quest-Detailseite mit Sidebar, Sandbox, Reflection, Navigation
 * Goldstandard: JS-Modern inspirierte didaktische Struktur
 */

import { WORLDS, getWorldById, getQuestById, localizeWorld, localizeQuest } from './quest-data.js';
import { t, getLanguage } from './i18n.js';
import { loadProgress, saveProgress, isQuestCompleted, completeQuest, startQuestTimer, endQuestTimer, getWorldProgress, trackW3SchoolsVisit } from './progress.js';
import { queueSyncToCloud, saveReflectionToCloud } from './progress-sync.js';
import { renderSandbox } from './sandbox.js';
import { showToast } from './toast.js';
import { playSuccess, playError } from './audio-engine.js';
import { showXPGain, updateXPBar, updateHeroStats, showLevelUp } from './xp-system.js';
import { checkBadges, showBadgeEarned } from './badge-engine.js';
import { fireConfetti } from './confetti.js';

let currentWorld = null;
let currentQuest = null;
let questStartTime = null;
let sandboxCompleted = false;

export function initQuestPage() {
  const container = document.getElementById('quest-container');
  if (!container) return;

  // Sprachwechsel-Handler: Quest-Seite neu rendern
  // Wird nur einmal registriert
  if (!window.__questLangListener) {
    window.__questLangListener = true;
    window.addEventListener('pyquest:languagechange', () => {
      initQuestPage();
    });
  }

  const params = new URLSearchParams(window.location.search);
  const worldId = params.get('world');
  const questId = params.get('quest');

  if (!worldId || !questId) {
    renderQuestError(container, t('error.noQuest'));
    return;
  }

  const world = localizeWorld(getWorldById(worldId));
  const quest = localizeQuest(getQuestById(worldId, questId));

  if (!world || !quest) {
    renderQuestError(container, 'Quest nicht gefunden.');
    return;
  }

  currentWorld = world;
  currentQuest = quest;

  const progress = loadProgress();
  startQuestTimer(progress, worldId, questId);
  questStartTime = Date.now();

  renderQuestLayout(container, world, quest, progress);

  // Sanftes Fade-In der gesamten Seite nach dem Rendern
  const heroImg = container.querySelector('.py-quest-detail__hero-img');
  if (heroImg) {
    const preload = new Image();
    preload.onload = () => {
      document.body.style.opacity = '1';
    };
    preload.onerror = () => {
      document.body.style.opacity = '1';
    };
    preload.src = heroImg.src;
    // Fallback: Nach 1.5s trotzdem einblenden
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 1500);
  } else {
    document.body.style.opacity = '1';
  }

  // Update page title
  document.title = `${quest.title} | Python Quest`;
}

/* ── Layout ──────────────────────────────────────────────────────────── */

function renderQuestLayout(container, world, quest, progress) {
  const isCompleted = isQuestCompleted(progress, world.id, quest.id);
  const worldProgress = getWorldProgress(progress, world.id);
  const typeLabel = quest.type === 'code' ? t('quest.typeCode') : quest.type === 'reflection' ? t('quest.typeReflection') : t('quest.typeMorph');

  container.innerHTML = `
    <!-- Fullscreen Hero -->
    <div class="py-quest-detail__hero">
      <div class="py-quest-detail__hero-media">
        <img class="py-quest-detail__hero-img" src="${quest.image || world.image}" alt="${quest.title}" onerror="this.style.display='none'">
        <div class="py-quest-detail__hero-overlay"></div>
      </div>
      <div class="py-quest-detail__hero-content">
        <span class="py-quest-detail__hero-badge">
          <i class="ph ph-globe-hemisphere-west" aria-hidden="true"></i>
          ${t('nav.world')} ${world.number}: ${world.title}
        </span>
        <h1 class="py-quest-detail__hero-title">${quest.title}</h1>
        <div class="py-quest-detail__hero-meta">
          ${quest.estimatedTime ? `<span><i class="ph ph-clock" aria-hidden="true"></i> ${quest.estimatedTime}</span>` : ''}
          <span class="py-quest-detail__hero-xp"><i class="ph ph-lightning" aria-hidden="true"></i> +${quest.xp} XP</span>
          <span><i class="ph ph-code" aria-hidden="true"></i> ${typeLabel}</span>
          ${isCompleted ? `<span style="color: var(--py-success)"><i class="ph ph-check-circle" aria-hidden="true"></i> ${t('quest.completed')}</span>` : ''}
        </div>
      </div>
    </div>

    <!-- Sidebar + Content Layout -->
    <div class="py-quest-layout">
      <aside class="py-quest-sidebar" id="quest-sidebar"></aside>
      <div class="py-quest-content" id="quest-content"></div>
    </div>
  `;

  renderSidebar(document.getElementById('quest-sidebar'), world, quest, progress);
  renderContent(document.getElementById('quest-content'), world, quest, progress, isCompleted);
}

/* ── Sidebar ─────────────────────────────────────────────────────────── */

function renderSidebar(container, world, quest, progress) {
  const worldProgress = getWorldProgress(progress, world.id);
  const questList = world.quests.map((q, idx) => {
    const isDone = isQuestCompleted(progress, world.id, q.id);
    const isActive = q.id === quest.id;
    const icon = isDone ? 'ph-check' : isActive ? 'ph-play-circle' : 'ph-lock';
    const typeIcon = q.type === 'code' ? 'ph-code' : q.type === 'reflection' ? 'ph-pencil' : 'ph-arrows-left-right';
    const locQ = localizeQuest(q);
    const typeLabel = q.type === 'code' ? t('quest.typeCode') : q.type === 'reflection' ? t('quest.typeReflection') : t('quest.typeMorph');

    return `
      <a href="quest.html?world=${world.id}&quest=${q.id}"
         class="py-quest-sidebar__quest-item ${isActive ? 'is-active' : ''} ${isDone ? 'is-completed' : ''}"
         ${!isActive && !isDone && idx > 0 && !isQuestCompleted(progress, world.id, world.quests[idx - 1].id) ? 'tabindex="-1" style="opacity:0.5;pointer-events:none"' : ''}>
        <span class="py-quest-sidebar__quest-icon"><i class="ph ${icon}" aria-hidden="true"></i></span>
        <div class="py-quest-sidebar__quest-info">
          <span class="py-quest-sidebar__quest-title">${locQ.title}</span>
          <span class="py-quest-sidebar__quest-meta"><i class="ph ${typeIcon}" aria-hidden="true"></i> ${typeLabel}</span>
        </div>
        <span class="py-quest-sidebar__quest-xp">+${q.xp} XP</span>
      </a>
    `;
  }).join('');

  container.innerHTML = `
    <div class="py-quest-sidebar__world">
      <div class="py-quest-sidebar__world-header">
        <span class="py-quest-sidebar__world-number">${world.number}</span>
        <h2 class="py-quest-sidebar__world-title">${world.title}</h2>
        <p class="py-quest-sidebar__world-subtitle">${world.subtitle}</p>
      </div>
      <div class="py-quest-sidebar__quest-list">
        ${questList}
      </div>
      <div class="py-quest-sidebar__progress">
        <div class="py-quest-sidebar__progress-label">
          <span>${t('quest.worldProgress')}</span>
          <span>${worldProgress.completed}/${worldProgress.total}</span>
        </div>
        <div class="py-quest-sidebar__progress-track">
          <div class="py-quest-sidebar__progress-fill" data-progress-width="${worldProgress.percent}"></div>
        </div>
      </div>
    </div>

    <div class="py-quest-copilot-tip">
      <div class="py-quest-copilot-tip__avatar" id="quest-copilot-avatar"></div>
      <div class="py-quest-copilot-tip__content">
        <div class="py-quest-copilot-tip__label">${t('quest.copilotLabel')}</div>
        <p class="py-quest-copilot-tip__text" id="quest-copilot-text">${getCopilotTip(quest)}</p>
      </div>
    </div>
  `;

  // Set progress bar width
  const fill = container.querySelector('.py-quest-sidebar__progress-fill');
  if (fill) fill.style.setProperty('--progress-width', worldProgress.percent + '%');

  // Render mini copilot avatar
  const avatar = container.querySelector('#quest-copilot-avatar');
  if (avatar) avatar.innerHTML = renderMiniCopilot(progress);
}

const QUEST_TIPS = {
  de: {
    'q1-1': 'Starte einfach: print() ist dein bester Freund. F-Strings machen alles lesbarer.',
    'q1-2': 'Variablen sind wie CSS-Custom-Properties: einmal definieren, überall nutzen.',
    'q1-3': 'Reflexion ist halbes Lernen. Schreibe deine Gedanken auf — das festigt das Wissen.',
    'q2-1': 'Bedingungen in Python sind wie CSS-Media-Queries: Wenn X, dann Y.',
    'q2-2': 'for-Schleifen in Python sind eleganter als JS-for — keine Index-Variable nötig!',
    'q2-3': 'Python ist strongly typed. Das spart dir viele typeof-Checks.',
    'q3-1': 'Listen sind wie Arrays, aber mit cooleren Methoden. enumerate() ist ein Power-Tool.',
    'q3-2': 'Dictionaries sind JSONs beste Freunde. Web-APIs sprechen Dictionary-Fließend.',
    'q3-3': 'Mutability ist der Unterschied: Python-Listen sind mutable, JS-Strings sind es nicht.',
    'q4-1': 'Funktionen sind wie CSS-Utility-Klassen: Wiederverwendbar und sauber.',
    'q4-2': 'Module sind wie CSS-Imports: Organisiert und wiederverwendbar.',
    'q4-3': 'Python-Default-Parameter sind eleganter als JS-Default-Values in ES6.',
    'q5-1': 'JSON ist die Lingua Franca des Webs. Python und JS verstehen sich perfekt.',
    'q5-2': 'File I/O ist wie das DOM: Öffnen, Lesen, Schließen. Mit-Close ist wichtig!',
    'q5-3': 'Du hast alles gelernt! Kombiniere Funktionen, Bedingungen und Datenstrukturen.'
  },
  en: {
    'q1-1': 'Start simple: print() is your best friend. F-Strings make everything more readable.',
    'q1-2': 'Variables are like CSS custom properties: define once, use everywhere.',
    'q1-3': 'Reflection is half the learning. Write down your thoughts — it reinforces knowledge.',
    'q2-1': 'Conditions in Python are like CSS media queries: If X, then Y.',
    'q2-2': 'for loops in Python are more elegant than JS for — no index variable needed!',
    'q2-3': 'Python is strongly typed. That saves you many typeof checks.',
    'q3-1': 'Lists are like arrays, but with cooler methods. enumerate() is a power tool.',
    'q3-2': 'Dictionaries are JSON\'s best friends. Web APIs speak dictionary fluently.',
    'q3-3': 'Mutability is the difference: Python lists are mutable, JS strings are not.',
    'q4-1': 'Functions are like CSS utility classes: reusable and clean.',
    'q4-2': 'Modules are like CSS imports: organized and reusable.',
    'q4-3': 'Python default parameters are more elegant than JS default values in ES6.',
    'q5-1': 'JSON is the lingua franca of the web. Python and JS understand each other perfectly.',
    'q5-2': 'File I/O is like the DOM: Open, Read, Close. Closing is important!',
    'q5-3': 'You have learned everything! Combine functions, conditions, and data structures.'
  }
};

function getCopilotTip(quest) {
  const lang = getLanguage();
  const tips = QUEST_TIPS[lang] || QUEST_TIPS.de;
  return tips[quest.id] || t('quest.copilotDefaultTip');
}

function renderMiniCopilot(progress) {
  const level = progress.level || 1;

  // Map level to copilot avatar image
  let avatarSrc;
  if (level >= 10) {
    avatarSrc = '../assets/images/badges/copilot-stufe-5.webp';
  } else if (level >= 5) {
    avatarSrc = '../assets/images/badges/copilot.webp';
  } else {
    avatarSrc = '../assets/images/badges/copilot-stufe-1.webp';
  }

  return `
    <img src="${avatarSrc}" alt="KI-Copilot Avatar" class="py-quest-copilot-tip__avatar-img"
         onerror="this.src='${avatarSrc.replace('.webp', '.jpg')}'">
  `;
}

/* ── Content ─────────────────────────────────────────────────────────── */

function renderContent(container, world, quest, progress, isCompleted) {
  const prevQuest = getAdjacentQuest(world, quest, -1);
  const nextQuest = getAdjacentQuest(world, quest, 1);

  let bodyHtml = '';

  if (quest.type === 'code') {
    bodyHtml = renderCodeQuest(quest, isCompleted);
  } else if (quest.type === 'reflection') {
    bodyHtml = renderReflectionQuest(quest, isCompleted);
  } else {
    bodyHtml = renderMorphQuest(quest, isCompleted);
  }

  container.innerHTML = `
    <!-- Completion Banner -->
    <div class="py-quest-complete" id="quest-complete-banner">
      <div class="py-quest-complete__icon"><i class="ph ph-trophy" aria-hidden="true"></i></div>
      <h2 class="py-quest-complete__title">${t('quest.completeSuccess')}</h2>
      <p class="py-quest-complete__text">${t('quest.completeXp', { xp: quest.xp })}</p>
      <span class="py-quest-complete__xp" id="quest-complete-xp">+0 XP</span>
    </div>

    ${bodyHtml}

    <!-- Navigation -->
    <div class="py-quest-nav-footer">
      ${prevQuest
        ? `<a href="quest.html?world=${world.id}&quest=${prevQuest.id}" class="py-quest-nav-footer__btn py-quest-nav-footer__btn--secondary" title="${localizeQuest(prevQuest).title}">
             <i class="ph ph-arrow-left" aria-hidden="true"></i>
             <span class="py-quest-nav-footer__label">${localizeQuest(prevQuest).title}</span>
           </a>`
        : `<a href="index.html" class="py-quest-nav-footer__btn py-quest-nav-footer__btn--secondary" title="${t('quest.toHub')}">
             <i class="ph ph-house" aria-hidden="true"></i>
             <span class="py-quest-nav-footer__label">${t('quest.toHub')}</span>
           </a>`}
      <button class="py-quest-nav-footer__btn py-quest-nav-footer__btn--success" id="quest-complete-btn" ${isCompleted ? 'disabled' : ''}>
        ${isCompleted ? t('quest.completedBtn') : t('quest.completeBtn')}
      </button>
      ${nextQuest
        ? `<a href="quest.html?world=${world.id}&quest=${nextQuest.id}" class="py-quest-nav-footer__btn" title="${localizeQuest(nextQuest).title}">
             <i class="ph ph-arrow-right" aria-hidden="true"></i>
             <span class="py-quest-nav-footer__label">${localizeQuest(nextQuest).title}</span>
           </a>`
        : `<a href="index.html" class="py-quest-nav-footer__btn" title="${t('quest.toHub')}">
             <i class="ph ph-house" aria-hidden="true"></i>
             <span class="py-quest-nav-footer__label">${t('quest.toHub')}</span>
           </a>`}
    </div>
  `;

  // Initialize quest-specific interactions
  if (quest.type === 'code') {
    initCodeQuest(quest, isCompleted);
  } else if (quest.type === 'reflection') {
    initReflectionQuest(quest, isCompleted);
  }

  // W3Schools link tracking
  const w3Link = container.querySelector('.py-quest-w3schools__link');
  if (w3Link) {
    w3Link.addEventListener('click', () => {
      const progress = loadProgress();
      trackW3SchoolsVisit(progress);
      queueSyncToCloud();
      // Check badges immediately
      const newBadges = checkBadges();
      newBadges.forEach((badge, i) => {
        setTimeout(() => showBadgeEarned(badge), i * 800);
      });
    });
  }

  // Complete button handler
  const completeBtn = container.querySelector('#quest-complete-btn');
  if (completeBtn && !isCompleted) {
    completeBtn.addEventListener('click', () => handleQuestComplete(world.id, quest.id, quest.xp));
  }
}

/* ── Card Renderers ──────────────────────────────────────────────────── */

function renderMissionCard(quest) {
  if (!quest.mission) return '';
  return `
    <div class="py-quest-mission">
      <div class="py-quest-mission__header">
        <div class="py-quest-mission__icon"><i class="ph ph-flag-banner-fold" aria-hidden="true"></i></div>
        <h2 class="py-quest-mission__title">${t('quest.missionTitle')}</h2>
      </div>
      <p class="py-quest-mission__text">${quest.mission}</p>
    </div>
  `;
}

function renderWhyCard(quest) {
  if (!quest.whyImportant) return '';
  return `
    <div class="py-quest-why">
      <div class="py-quest-why__header">
        <div class="py-quest-why__icon"><i class="ph ph-lightbulb" aria-hidden="true"></i></div>
        <h2 class="py-quest-why__title">${t('quest.storyTitle')}</h2>
      </div>
      <p class="py-quest-why__text">${quest.whyImportant}</p>
    </div>
  `;
}

function renderTaskCard(quest) {
  const steps = quest.steps || [];
  if (steps.length === 0) {
    // Fallback: alte Task-Liste aus codeTemplate
    const oldSteps = getTaskSteps(quest);
    if (oldSteps.length === 0) return '';
    return `
      <div class="py-quest-task">
        <div class="py-quest-task__header">
          <div class="py-quest-task__icon"><i class="ph ph-target" aria-hidden="true"></i></div>
          <h2 class="py-quest-task__title">${t('quest.taskTitle')}</h2>
        </div>
        <div class="py-quest-task__list">
          ${oldSteps.map((task, i) => `
            <div class="py-quest-task__item">
              <span class="py-quest-task__item-num">${i + 1}</span>
              <span class="py-quest-task__item-text">${task}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  return `
    <div class="py-quest-task">
      <div class="py-quest-task__header">
        <div class="py-quest-task__icon"><i class="ph ph-target" aria-hidden="true"></i></div>
        <h2 class="py-quest-task__title">${t('quest.taskTitle')}</h2>
      </div>
      <p class="py-quest-task__intro">${quest.description}</p>
      <div class="py-quest-task__label">${t('quest.stepByStep')}:</div>
      <div class="py-quest-task__list">
        ${steps.map((step, i) => `
          <label class="py-quest-task__item" data-step="${i}">
            <input type="checkbox" class="py-quest-task__checkbox">
            <span class="py-quest-task__item-text">${step}</span>
          </label>
        `).join('')}
      </div>
      <div class="py-quest-task__counter"><span class="py-quest-task__counter-current">0</span>/${steps.length}</div>
    </div>
  `;
}

function renderSuccessCard(quest) {
  if (!quest.successCriteria) return '';
  return `
    <div class="py-quest-success">
      <div class="py-quest-success__header">
        <div class="py-quest-success__icon"><i class="ph ph-check-circle" aria-hidden="true"></i></div>
        <h2 class="py-quest-success__title">${t('quest.successTitle')}</h2>
      </div>
      <p class="py-quest-success__text">${quest.successCriteria}</p>
    </div>
  `;
}

function renderMistakesCard(quest) {
  const mistakes = quest.mistakes || quest.commonMistakes || [];
  if (mistakes.length === 0) return '';
  return `
    <div class="py-quest-mistakes">
      <div class="py-quest-mistakes__header">
        <div class="py-quest-mistakes__icon"><i class="ph ph-warning" aria-hidden="true"></i></div>
        <h2 class="py-quest-mistakes__title">${t('quest.mistakesTitle')}</h2>
      </div>
      <div class="py-quest-mistakes__list">
        ${mistakes.map(m => `
          <div class="py-quest-mistakes__item">
            <i class="ph ph-x-circle" aria-hidden="true"></i>
            <span>${m}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderProTipCard(quest) {
  if (!quest.proTip) return '';
  return `
    <div class="py-quest-pro-tip">
      <div class="py-quest-pro-tip__header">
        <div class="py-quest-pro-tip__icon"><i class="ph ph-lightning" aria-hidden="true"></i></div>
        <h2 class="py-quest-pro-tip__title">${t('quest.proTipTitle')}</h2>
      </div>
      <p class="py-quest-pro-tip__text">${quest.proTip}</p>
    </div>
  `;
}

function renderDocsCard(quest) {
  if (!quest.documentation) return '';
  return `
    <div class="py-quest-docs">
      <div class="py-quest-docs__header">
        <div class="py-quest-docs__icon"><i class="ph ph-camera" aria-hidden="true"></i></div>
        <h2 class="py-quest-docs__title">${t('quest.docsTitle')}</h2>
      </div>
      <p class="py-quest-docs__intro">${quest.documentation.intro}</p>
      <div class="py-quest-docs__list">
        ${quest.documentation.steps.map((step, i) => `
          <div class="py-quest-docs__item">
            <span class="py-quest-docs__num">${i + 1}</span>
            <span>${step}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderW3SchoolsCard(quest) {
  if (!quest.w3schoolsLink) return '';
  return `
    <div class="py-quest-w3schools">
      <div class="py-quest-w3schools__header">
        <div class="py-quest-w3schools__icon"><i class="ph ph-book-open" aria-hidden="true"></i></div>
        <h2 class="py-quest-w3schools__title">${t('quest.w3schoolsTitle')}</h2>
      </div>
      <p class="py-quest-w3schools__text">${t('quest.w3schoolsText')}</p>
      <a href="${quest.w3schoolsLink}" target="_blank" class="py-quest-w3schools__link" rel="noopener noreferrer">
        <i class="ph ph-arrow-square-out" aria-hidden="true"></i>
        ${quest.w3schoolsLabel || t('quest.w3schoolsDefaultLink')}
      </a>
    </div>
  `;
}

function renderReflectionInlineCard(quest, isCompleted) {
  if (!quest.reflectionQuestion) return '';
  return `
    <div class="py-quest-reflection">
      <div class="py-quest-reflection__header">
        <div class="py-quest-reflection__icon"><i class="ph ph-brain" aria-hidden="true"></i></div>
        <h2 class="py-quest-reflection__title">${t('quest.reflectionTitle')}</h2>
      </div>
      <p class="py-quest-reflection__intro">${t('quest.reflectionIntro')}</p>
      <div class="py-quest-reflection__question">
        <i class="ph ph-question" aria-hidden="true"></i>
        <span>${quest.reflectionQuestion}</span>
      </div>
      <textarea class="py-quest-reflection__textarea" id="reflection-text" placeholder="${t('quest.reflectionPlaceholderShort')}" ${isCompleted ? 'disabled' : ''}></textarea>
      <div class="py-quest-reflection__actions">
        <button class="py-quest-btn py-quest-btn--secondary" id="reflection-save-btn" ${isCompleted ? 'disabled' : ''}>
          <i class="ph ph-floppy-disk" aria-hidden="true"></i> ${t('quest.reflectionSave')}
        </button>
        <span id="reflection-counter" style="font-size: var(--py-text-xs); color: var(--py-text-muted); margin-left: auto;">${t('quest.reflectionCounter', { count: 0 })}</span>
      </div>
      <p class="py-quest-reflection__privacy"><i class="ph ph-lock" aria-hidden="true"></i> ${t('quest.reflectionPrivacy')}</p>
    </div>
  `;
}

/* ── Code Quest ──────────────────────────────────────────────────────── */

function renderCodeQuest(quest, isCompleted) {
  return `
    ${renderMissionCard(quest)}
    ${renderWhyCard(quest)}
    ${renderTaskCard(quest)}
    ${renderSuccessCard(quest)}
    ${renderMistakesCard(quest)}
    ${renderProTipCard(quest)}

    <!-- Hint Card (legacy toggle) -->
    ${quest.hint ? `
      <div class="py-quest-hint" id="quest-hint">
        <div class="py-quest-hint__header" id="quest-hint-toggle">
          <div class="py-quest-hint__icon"><i class="ph ph-lightbulb" aria-hidden="true"></i></div>
          <h2 class="py-quest-hint__title">${t('quest.hintTitle')}</h2>
          <i class="ph ph-caret-down py-quest-hint__chevron" aria-hidden="true"></i>
        </div>
        <div class="py-quest-hint__body">
          <p class="py-quest-hint__text">${escapeHtml(quest.hint)}</p>
        </div>
      </div>
    ` : ''}

    <!-- Sandbox -->
    <div class="py-quest-sandbox-panel">
      <div class="py-quest-sandbox-panel__header">
        <div class="py-quest-sandbox-panel__icon"><i class="ph ph-terminal" aria-hidden="true"></i></div>
        <h2 class="py-quest-sandbox-panel__title">${t('quest.sandboxTitle')}</h2>
      </div>
      <div class="py-quest-sandbox-panel__body" id="quest-sandbox"></div>
    </div>

    <!-- Verification -->
    <div class="py-quest-verify" id="quest-verify">
      <div class="py-quest-verify__header">
        <div class="py-quest-verify__icon"><i class="ph ph-shield-check" aria-hidden="true"></i></div>
        <h2 class="py-quest-verify__title">${t('quest.verifyTitle')}</h2>
      </div>
      <p class="py-quest-verify__question">${t('quest.verifyQuestion')}</p>
      <div class="py-quest-verify__options" id="verify-options"></div>
    </div>

    ${renderDocsCard(quest)}
    ${renderW3SchoolsCard(quest)}
    ${renderReflectionInlineCard(quest, isCompleted)}

    <!-- Classic Link -->
    ${quest.classicLink ? `
      <a href="${quest.classicLink}" class="py-quest-classic-link" target="_blank" rel="noopener noreferrer">
        <i class="ph ph-book-open" aria-hidden="true"></i>
        ${t('quest.classicLink')}
      </a>
    ` : ''}
  `;
}

function initCodeQuest(quest, isCompleted) {
  // Sandbox
  const sandboxContainer = document.getElementById('quest-sandbox');
  if (sandboxContainer) {
    renderSandbox(sandboxContainer, quest);
  }

  // Hint toggle
  const hintToggle = document.getElementById('quest-hint-toggle');
  const hintCard = document.getElementById('quest-hint');
  if (hintToggle && hintCard) {
    hintToggle.addEventListener('click', () => {
      hintCard.classList.toggle('is-open');
    });
  }

  // Verification (anti-cheat)
  const verifyContainer = document.getElementById('verify-options');
  if (verifyContainer) {
    renderVerification(verifyContainer, quest);
  }

  // Task checkboxes
  const taskItems = document.querySelectorAll('.py-quest-task__item');
  const counterCurrent = document.querySelector('.py-quest-task__counter-current');
  const counterTotal = quest.steps?.length || 0;

  taskItems.forEach(item => {
    const checkbox = item.querySelector('.py-quest-task__checkbox');
    if (!checkbox) return;
    checkbox.addEventListener('change', () => {
      item.classList.toggle('is-done', checkbox.checked);
      if (counterCurrent && counterTotal > 0) {
        const checked = document.querySelectorAll('.py-quest-task__checkbox:checked').length;
        counterCurrent.textContent = checked;
      }
    });
  });

  // Reflection save (for code quests with reflection)
  initReflectionSave(quest, isCompleted);
}

function renderVerification(container, quest) {
  // Generate plausible wrong answers based on quest
  const correct = getExpectedOutput(quest);
  const wrong1 = getWrongOutput1(quest);
  const wrong2 = getWrongOutput2(quest);

  const options = shuffleArray([
    { text: correct, correct: true },
    { text: wrong1, correct: false },
    { text: wrong2, correct: false }
  ]);

  container.innerHTML = options.map((opt, i) => `
    <label class="py-quest-verify__option" data-correct="${opt.correct}">
      <input type="radio" name="verify" value="${i}">
      <span>${escapeHtml(opt.text)}</span>
    </label>
  `).join('');

  container.querySelectorAll('.py-quest-verify__option').forEach(opt => {
    opt.addEventListener('click', () => {
      const isCorrect = opt.dataset.correct === 'true';
      container.querySelectorAll('.py-quest-verify__option').forEach(o => {
        o.classList.remove('is-selected', 'is-correct', 'is-wrong');
        if (o.dataset.correct === 'true') o.classList.add('is-correct');
      });
      opt.classList.add('is-selected');
      if (!isCorrect) opt.classList.add('is-wrong');

      if (isCorrect) {
        sandboxCompleted = true;
        showToast({ type: 'success', title: t('toast.verifyCorrect'), text: t('toast.verifyCorrectText'), duration: 3000 });
        playSuccess();
      } else {
        playError();
        showToast({ type: 'error', title: t('toast.verifyWrong'), text: t('toast.verifyWrongText'), duration: 3000 });
      }
    });
  });
}

/* ── Reflection Quest ────────────────────────────────────────────────── */

function renderReflectionQuest(quest, isCompleted) {
  return `
    ${renderMissionCard(quest)}
    ${renderWhyCard(quest)}
    ${renderTaskCard(quest)}
    ${renderSuccessCard(quest)}
    ${renderMistakesCard(quest)}
    ${renderProTipCard(quest)}

    <!-- Reflection Panel (main task) -->
    <div class="py-quest-reflection">
      <div class="py-quest-reflection__header">
        <div class="py-quest-reflection__icon"><i class="ph ph-pencil" aria-hidden="true"></i></div>
        <h2 class="py-quest-reflection__title">${t('quest.reflectionTitle')}</h2>
      </div>
      <div class="py-quest-reflection__prompt">${quest.promptTemplate || t('quest.reflectionPromptTemplate')}</div>
      <textarea class="py-quest-reflection__textarea" id="reflection-text" placeholder="${t('quest.reflectionPrompt')}" ${isCompleted ? 'disabled' : ''}></textarea>
      <div class="py-quest-reflection__actions">
        <button class="py-quest-btn py-quest-btn--secondary" id="reflection-save-btn" ${isCompleted ? 'disabled' : ''}>
          <i class="ph ph-floppy-disk" aria-hidden="true"></i> ${t('quest.reflectionSave')}
        </button>
        <span id="reflection-counter" style="font-size: var(--py-text-xs); color: var(--py-text-muted); margin-left: auto;">${t('quest.reflectionCounter', { count: 0 })}</span>
      </div>
    </div>

    ${renderDocsCard(quest)}
    ${renderW3SchoolsCard(quest)}
  `;
}

function initReflectionQuest(quest, isCompleted) {
  initReflectionSave(quest, isCompleted);
}

/* ── Shared Reflection Save Logic ────────────────────────────────────── */

function initReflectionSave(quest, isCompleted) {
  const textarea = document.getElementById('reflection-text');
  const counter = document.getElementById('reflection-counter');
  const saveBtn = document.getElementById('reflection-save-btn');

  if (!textarea) return;

  // Load saved reflection
  const saved = localStorage.getItem(`pyquest-reflection:${quest.id}`);
  if (saved) textarea.value = saved;

  const minLength = quest.type === 'reflection' ? 50 : 20;

  textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    const label = t('quest.reflectionCounter', { count: len });
    if (counter) counter.textContent = label;
    if (len >= minLength) {
      sandboxCompleted = true;
      if (counter) counter.style.color = 'var(--py-success)';
    } else {
      if (counter) counter.style.color = 'var(--py-text-muted)';
    }
  });

  if (saveBtn) {
    saveBtn.addEventListener('click', async () => {
      localStorage.setItem(`pyquest-reflection:${quest.id}`, textarea.value);
      // Sync to Supabase
      await saveReflectionToCloud(currentWorld?.id || '', quest.id, textarea.value);
      showToast({ type: 'success', title: t('toast.saved'), text: t('toast.savedText'), duration: 2000 });
    });
  }

  // Trigger initial count
  textarea.dispatchEvent(new Event('input'));
}

/* ── Morph Quest (Placeholder) ───────────────────────────────────────── */

function renderMorphQuest(quest, isCompleted) {
  return `
    <div class="py-quest-story">
      <div class="py-quest-story__header">
        <div class="py-quest-story__icon"><i class="ph ph-arrows-left-right" aria-hidden="true"></i></div>
        <h2 class="py-quest-story__title">${t('quest.typeMorph')}</h2>
      </div>
      <p class="py-quest-story__text">${quest.description}</p>
      <div class="py-quest-story__pro-tip">
        <i class="ph ph-info" aria-hidden="true"></i>
        <div>
          <div class="py-quest-story__pro-tip-label">${t('quest.hintTitle')}</div>
          <p class="py-quest-story__pro-tip-text">${t('quest.morphPlaceholder')}</p>
        </div>
      </div>
    </div>

    <div class="py-quest-reflection">
      <div class="py-quest-reflection__header">
        <div class="py-quest-reflection__icon"><i class="ph ph-pencil" aria-hidden="true"></i></div>
        <h2 class="py-quest-reflection__title">${t('quest.reflectionTitle')}</h2>
      </div>
      <div class="py-quest-reflection__prompt">${quest.promptTemplate || t('quest.morphDefaultPrompt')}</div>
      <textarea class="py-quest-reflection__textarea" id="reflection-text" placeholder="${t('quest.reflectionPrompt')}" ${isCompleted ? 'disabled' : ''}></textarea>
    </div>
  `;
}

/* ── Quest Completion ────────────────────────────────────────────────── */

function handleQuestComplete(worldId, questId, xp) {
  // Check verification for code quests
  if (!sandboxCompleted && currentQuest.type !== 'reflection') {
    showToast({ type: 'warning', title: t('toast.notSoFast'), text: t('toast.verifyFirst'), duration: 4000 });
    playError();
    return;
  }

  // Check reflection for quests with reflection question
  if (currentQuest.reflectionQuestion) {
    const text = document.getElementById('reflection-text')?.value || '';
    if (text.length < 20) {
      showToast({ type: 'warning', title: t('quest.reflectionShortTitle'), text: t('quest.reflectionShortText'), duration: 4000 });
      playError();
      return;
    }
  }

  // Check reflection for pure reflection quests
  if (currentQuest.type === 'reflection') {
    const text = document.getElementById('reflection-text')?.value || '';
    if (text.length < 50) {
      showToast({ type: 'warning', title: t('toast.reflectionShort'), text: t('toast.reflectionShortText'), duration: 4000 });
      playError();
      return;
    }
  }

  const progress = loadProgress();
  const result = completeQuest(progress, worldId, questId, xp);

  // Sync to Supabase
  queueSyncToCloud();

  if (result.alreadyCompleted) {
    showToast({ type: 'info', title: t('toast.alreadyCompleted'), text: t('toast.alreadyCompletedText'), duration: 2000 });
    return;
  }

  // Update UI
  const completeBtn = document.getElementById('quest-complete-btn');
  if (completeBtn) {
    completeBtn.disabled = true;
    completeBtn.innerHTML = `<i class="ph ph-check" aria-hidden="true"></i> ${t('quest.completed')}`;
  }

  const banner = document.getElementById('quest-complete-banner');
  if (banner) {
    banner.classList.add('is-visible');
    banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  const xpEl = document.getElementById('quest-complete-xp');
  if (xpEl) xpEl.textContent = `+${result.xpGained} XP`;

  // XP float
  showXPGain(result.xpGained, window.innerWidth / 2, window.innerHeight / 2);

  // Confetti
  fireConfetti();

  // Audio
  playSuccess();

  // Update XP bar
  updateXPBar(result.progress);
  updateHeroStats(result.progress);

  // Level up?
  if (result.leveledUp) {
    setTimeout(() => showLevelUp(result.newLevel), 500);
  }

  // Badges
  setTimeout(() => {
    const newBadges = checkBadges();
    newBadges.forEach((badge, i) => {
      setTimeout(() => showBadgeEarned(badge), i * 800);
    });
  }, 600);

  // Toast
  showToast({
    type: 'success',
    title: t('quest.completeSuccess'),
    text: t('quest.completeXp', { xp: result.xpGained }),
    duration: 4000
  });

  // Update sidebar
  renderSidebar(document.getElementById('quest-sidebar'), currentWorld, currentQuest, result.progress);
}

/* ── Helpers ─────────────────────────────────────────────────────────── */

function getAdjacentQuest(world, currentQuest, direction) {
  const idx = world.quests.findIndex(q => q.id === currentQuest.id);
  if (idx === -1) return null;
  return world.quests[idx + direction] || null;
}

function getNextWorld(currentWorld) {
  const idx = WORLDS.findIndex(w => w.id === currentWorld.id);
  return WORLDS[idx + 1] || null;
}

function getTaskSteps(quest) {
  // Extract task steps from code template
  const steps = [];
  if (quest.codeTemplate) {
    const lines = quest.codeTemplate.split('\n');
    let inTodo = false;
    let currentStep = '';

    for (const line of lines) {
      if (line.includes('TODO') || line.includes('TODO:')) {
        inTodo = true;
        currentStep = line.replace(/.*TODO:?\s*/, '').replace(/^#\s*/, '').trim();
        if (currentStep) steps.push(currentStep);
      } else if (inTodo && line.trim().startsWith('#')) {
        currentStep = line.replace(/^#\s*/, '').trim();
        if (currentStep && !currentStep.includes('TODO')) steps.push(currentStep);
      } else if (inTodo && line.trim() && !line.trim().startsWith('#')) {
        inTodo = false;
      }
    }
  }

  // Fallback: use description as task
  if (steps.length === 0) {
    steps.push(quest.description);
  }

  return steps;
}

function getExpectedOutput(quest) {
  // Extract expected output from validator hints
  const hints = {
    'q1-1': 'Willkommen, Webdesigner!',
    'q1-2': 'Seitenverhaeltnis: 1.78',
    'q2-1': 'Landscape',
    'q2-2': 'Optimiere: hero.jpg',
    'q3-1': '0: hero.jpg',
    'q3-2': 'primary: #306998',
    'q4-1': '(800, 450)',
    'q4-2': 'Goldener Schnitt: 618.0px',
    'q5-1': 'Projekte: 5',
    'q5-2': 'Anzahl Zeilen: 3',
    'q5-3': 'Landscape'
  };
  return hints[quest.id] || 'Der Code gibt eine Begruessung aus';
}

function getWrongOutput1(quest) {
  const wrong = {
    'q1-1': 'SyntaxError: unterminated string',
    'q1-2': 'Seitenverhaeltnis: 1',
    'q2-1': 'Portrait',
    'q2-2': 'hero.jpg',
    'q3-1': 'hero.jpg',
    'q3-2': '#306998',
    'q4-1': '(1920, 1080)',
    'q4-2': '618',
    'q5-1': '5',
    'q5-2': '3',
    'q5-3': '1.78'
  };
  return wrong[quest.id] || 'NameError: name not defined';
}

function getWrongOutput2(quest) {
  const wrong = {
    'q1-1': 'Keine Ausgabe',
    'q1-2': 'TypeError: unsupported operand',
    'q2-1': 'True',
    'q2-2': '3',
    'q3-1': '1',
    'q3-2': 'primary',
    'q4-1': '800',
    'q4-2': '1000.0',
    'q5-1': '{"projects": 5}',
    'q5-2': '\n\n\n',
    'q5-3': 'verhaeltnis: 1.78'
  };
  return wrong[quest.id] || 'IndentationError: unexpected indent';
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function renderQuestError(container, message) {
  container.innerHTML = `
    <div class="py-quest-detail" style="text-align: center; padding: var(--py-space-16) var(--py-space-4);">
      <i class="ph ph-warning-circle" style="font-size: 4rem; color: var(--py-error); margin-bottom: var(--py-space-4);"></i>
      <h2 style="font-family: var(--py-font-display); font-size: var(--py-text-2xl); color: var(--py-text-primary); margin-bottom: var(--py-space-4);">${message}</h2>
      <a href="index.html" class="py-quest-btn py-quest-btn--primary">
        <i class="ph ph-house" aria-hidden="true"></i> ${t('quest.toHub')}
      </a>
    </div>
  `;
}
