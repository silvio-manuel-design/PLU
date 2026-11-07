/**
 * Onboarding / Mission Experience
 * Role selection, progressive disclosure, persistence
 */

import { t, onLangChange } from './i18n.js';

const STORAGE_KEY = 'synthese-selected-role';

const ROLES = {
  frontend: {
    icon: 'ph-code',
    tasks: [
      'onboarding.mission.frontend.task1',
      'onboarding.mission.frontend.task2',
      'onboarding.mission.frontend.task3'
    ],
    tech: ['HTML5', 'CSS3', 'Vanilla JS', 'Git'],
    criteria: [
      'onboarding.mission.frontend.criteria1',
      'onboarding.mission.frontend.criteria2',
      'onboarding.mission.frontend.criteria3'
    ],
    firstStep: 'onboarding.mission.frontend.firstStep'
  },
  content: {
    icon: 'ph-pencil-simple',
    tasks: [
      'onboarding.mission.content.task1',
      'onboarding.mission.content.task2',
      'onboarding.mission.content.task3'
    ],
    tech: ['Markdown', 'Figma', 'AI Tools', 'Google Docs'],
    criteria: [
      'onboarding.mission.content.criteria1',
      'onboarding.mission.content.criteria2',
      'onboarding.mission.content.criteria3'
    ],
    firstStep: 'onboarding.mission.content.firstStep'
  },
  uiux: {
    icon: 'ph-layout',
    tasks: [
      'onboarding.mission.uiux.task1',
      'onboarding.mission.uiux.task2',
      'onboarding.mission.uiux.task3'
    ],
    tech: ['Figma', 'CSS', 'Design Tokens', 'Accessibility'],
    criteria: [
      'onboarding.mission.uiux.criteria1',
      'onboarding.mission.uiux.criteria2',
      'onboarding.mission.uiux.criteria3'
    ],
    firstStep: 'onboarding.mission.uiux.firstStep'
  },
  ai: {
    icon: 'ph-brain',
    tasks: [
      'onboarding.mission.ai.task1',
      'onboarding.mission.ai.task2',
      'onboarding.mission.ai.task3'
    ],
    tech: ['ChatGPT', 'Claude', 'Midjourney', 'Perplexity'],
    criteria: [
      'onboarding.mission.ai.criteria1',
      'onboarding.mission.ai.criteria2',
      'onboarding.mission.ai.criteria3'
    ],
    firstStep: 'onboarding.mission.ai.firstStep'
  },
  qa: {
    icon: 'ph-check-circle',
    tasks: [
      'onboarding.mission.qa.task1',
      'onboarding.mission.qa.task2',
      'onboarding.mission.qa.task3'
    ],
    tech: ['DevTools', 'Lighthouse', 'WAVE', 'BrowserStack'],
    criteria: [
      'onboarding.mission.qa.criteria1',
      'onboarding.mission.qa.criteria2',
      'onboarding.mission.qa.criteria3'
    ],
    firstStep: 'onboarding.mission.qa.firstStep'
  }
};

let currentRole = null;

function getSavedRole() {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveRole(roleKey) {
  try {
    sessionStorage.setItem(STORAGE_KEY, roleKey);
  } catch {
    // silently fail in private mode
  }
}

function updateProgress(step) {
  const steps = document.querySelectorAll('.challenge-progress__step');
  steps.forEach((el, idx) => {
    el.classList.remove('is-active', 'is-completed');
    if (idx < step) {
      el.classList.add('is-completed');
    } else if (idx === step) {
      el.classList.add('is-active');
    }
  });
}

function renderMission(roleKey) {
  const data = ROLES[roleKey];
  if (!data) return;

  const panel = document.getElementById('challenge-mission-panel');
  if (!panel) return;

  const roleTitle = t(`onboarding.roles.${roleKey}.title`);

  const tasksHtml = data.tasks.map((key, i) => `
    <li class="challenge-task-list__item">
      <span class="challenge-task-list__number">${i + 1}</span>
      <span>${t(key)}</span>
    </li>
  `).join('');

  const techHtml = data.tech.map(tech => `
    <span class="challenge-tech-badge">${tech}</span>
  `).join('');

  const criteriaHtml = data.criteria.map(key => `
    <li class="challenge-criteria-item">
      <span class="challenge-criteria-item__check"><i class="ph ph-check" aria-hidden="true"></i></span>
      <span>${t(key)}</span>
    </li>
  `).join('');

  panel.innerHTML = `
    <div class="challenge-mission-panel__header">
      <div class="challenge-mission-panel__icon"><i class="ph ${data.icon}" aria-hidden="true"></i></div>
      <h3 class="challenge-mission-panel__title">${t('onboarding.mission.heading', { role: roleTitle })}</h3>
    </div>

    <div class="challenge-mission-panel__section">
      <div class="challenge-mission-panel__label"><i class="ph ph-list-checks" aria-hidden="true"></i> ${t('onboarding.mission.tasksLabel')}</div>
      <ol class="challenge-task-list">${tasksHtml}</ol>
    </div>

    <div class="challenge-mission-panel__section">
      <div class="challenge-mission-panel__label"><i class="ph ph-stack" aria-hidden="true"></i> ${t('onboarding.mission.techLabel')}</div>
      <div class="challenge-tech-stack">${techHtml}</div>
    </div>

    <div class="challenge-mission-panel__section">
      <div class="challenge-mission-panel__label"><i class="ph ph-target" aria-hidden="true"></i> ${t('onboarding.mission.criteriaLabel')}</div>
      <ul class="challenge-criteria-list">${criteriaHtml}</ul>
    </div>

    <div class="challenge-mission-panel__section">
      <div class="challenge-first-step">
        <div class="challenge-first-step__label"><i class="ph ph-lightning" aria-hidden="true"></i> ${t('onboarding.mission.firstStepLabel')}</div>
        <p class="challenge-first-step__text">${t(data.firstStep)}</p>
      </div>
    </div>
  `;
}

function selectRole(roleKey) {
  currentRole = roleKey;
  saveRole(roleKey);

  // Update card states
  document.querySelectorAll('.challenge-role-card').forEach(card => {
    const isSelected = card.dataset.role === roleKey;
    card.classList.toggle('is-selected', isSelected);
    if (isSelected) {
      triggerBadgeEarned(card);
    }
  });

  // Update progress: step 2 completed, step 3 active
  updateProgress(2);

  // Render and show mission panel
  renderMission(roleKey);
  const panel = document.getElementById('challenge-mission-panel');
  if (panel) {
    panel.classList.add('is-visible');
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Award XP for choosing a role (only once per role)
  const xpKey = `xp-role-${roleKey}`;
  if (!sessionStorage.getItem(xpKey)) {
    sessionStorage.setItem(xpKey, '1');
    import('./xp.js').then(({ addXP }) => {
      addXP(25, `Rolle gewählt: ${roleKey}`);
    });
  }
}

function initRoleCards() {
  const grid = document.getElementById('challenge-role-grid');
  if (!grid) return;

  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.challenge-role-card');
    if (!card) return;
    const role = card.dataset.role;
    if (role) selectRole(role);
  });

  grid.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.challenge-role-card');
    if (!card) return;
    e.preventDefault();
    const role = card.dataset.role;
    if (role) selectRole(role);
  });
}

function restoreRole() {
  const saved = getSavedRole();
  if (saved && ROLES[saved]) {
    selectRole(saved);
  }
}

function reRenderOnLangChange() {
  // Re-render mission if a role is selected
  if (currentRole && ROLES[currentRole]) {
    renderMission(currentRole);
  }

  // Update role card text content (short + superpower)
  document.querySelectorAll('.challenge-role-card').forEach(card => {
    const role = card.dataset.role;
    if (!role) return;
    const superpowerEl = card.querySelector('.challenge-role-card__superpower');
    const shortEl = card.querySelector('.challenge-role-card__short');
    if (superpowerEl) superpowerEl.textContent = t(`onboarding.roles.${role}.superpower`);
    if (shortEl) shortEl.textContent = t(`onboarding.roles.${role}.short`);
  });
}

export function initMission() {
  initRoleCards();
  restoreRole();

  onLangChange(() => {
    reRenderOnLangChange();
  });
}

/* Badge Earned Animation */
function triggerBadgeEarned(card) {
  card.classList.add('is-earned');
  setTimeout(() => card.classList.remove('is-earned'), 1000);

  const rect = card.getBoundingClientRect();
  const colors = ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];
  for (let i = 0; i < 12; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top + rect.height / 2}px;
      width: 6px;
      height: 6px;
      background: ${colors[i % colors.length]};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(particle);

    const angle = (Math.PI * 2 * i) / 12;
    const velocity = 60 + Math.random() * 40;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    particle.animate([
      { transform: 'translate(0,0) scale(1)', opacity: 1 },
      { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
    ], {
      duration: 600 + Math.random() * 200,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => particle.remove();
  }
}
