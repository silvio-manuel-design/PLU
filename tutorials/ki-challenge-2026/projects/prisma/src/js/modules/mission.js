/**
 * PRISMA — Mission Onboarding Module
 * Handles role selection, mission display, progress tracking, sessionStorage
 */

import { t, onLangChange } from './i18n.js';

const ROLE_CONFIG = {
  frontend: {
    icon: 'ph-code',
    accent: 'var(--challenge-primary)'
  },
  uiux: {
    icon: 'ph-paint-brush',
    accent: 'var(--challenge-accent)'
  },
  prompt: {
    icon: 'ph-sparkle',
    accent: 'var(--challenge-success)'
  },
  content: {
    icon: 'ph-article',
    accent: 'var(--challenge-warning)'
  },
  qa: {
    icon: 'ph-check-circle',
    accent: 'var(--challenge-error)'
  }
};

function renderTasks(roleKey) {
  let html = '';
  for (let i = 1; i <= 3; i++) {
    const taskText = t(`mission.role.${roleKey}.task${i}`);
    html += `
      <li class="challenge-mission__task">
        <span class="challenge-mission__task-number">${i}</span>
        <span class="challenge-mission__task-text">${escapeHtml(taskText)}</span>
      </li>
    `;
  }
  return html;
}

function renderTechStack(roleKey) {
  const techString = t(`mission.role.${roleKey}.tech`);
  const techs = techString.split(',').map(s => s.trim()).filter(Boolean);
  return techs.map(tech =>
    `<span class="challenge-tech-badge">${escapeHtml(tech)}</span>`
  ).join('');
}

function renderSuccessCriteria(roleKey) {
  let html = '';
  for (let i = 1; i <= 3; i++) {
    const criterion = t(`mission.role.${roleKey}.success${i}`);
    html += `
      <li class="challenge-mission__criterion">
        <i class="ph ph-check-circle" aria-hidden="true"></i>
        <span>${escapeHtml(criterion)}</span>
      </li>
    `;
  }
  return html;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderMissionDetail(roleKey) {
  const container = document.getElementById('mission-detail-content');
  if (!container) return;

  const config = ROLE_CONFIG[roleKey];
  const title = t(`mission.role.${roleKey}.missionTitle`);
  const firstStep = t(`mission.role.${roleKey}.firstStep`);
  const superpower = t(`mission.role.${roleKey}.superpower`);

  container.innerHTML = `
    <div class="challenge-mission__detail-inner">
      <div class="challenge-mission__detail-header">
        <div class="challenge-mission__detail-icon" style="background: ${config.accent}">
          <i class="ph ${config.icon}" aria-hidden="true"></i>
        </div>
        <div>
          <h3 class="challenge-mission__detail-title">${escapeHtml(title)}</h3>
          <span class="challenge-mission__detail-badge">
            <i class="ph ph-lightning" aria-hidden="true"></i>
            ${escapeHtml(superpower)}
          </span>
        </div>
      </div>

      <div class="challenge-mission__detail-body">
        <div class="challenge-mission__detail-section">
          <h4 class="challenge-mission__detail-section-title">
            <i class="ph ph-target" aria-hidden="true"></i>
            ${escapeHtml(t('mission.detail.tasksTitle'))}
          </h4>
          <ol class="challenge-mission__tasks">
            ${renderTasks(roleKey)}
          </ol>
        </div>

        <div class="challenge-mission__detail-section">
          <h4 class="challenge-mission__detail-section-title">
            <i class="ph ph-wrench" aria-hidden="true"></i>
            ${escapeHtml(t('mission.detail.techTitle'))}
          </h4>
          <div class="challenge-tech-stack">
            ${renderTechStack(roleKey)}
          </div>
        </div>

        <div class="challenge-mission__detail-section">
          <h4 class="challenge-mission__detail-section-title">
            <i class="ph ph-trophy" aria-hidden="true"></i>
            ${escapeHtml(t('mission.detail.successTitle'))}
          </h4>
          <ul class="challenge-mission__criteria">
            ${renderSuccessCriteria(roleKey)}
          </ul>
        </div>

        <div class="challenge-mission__detail-cta">
          <i class="ph ph-lightning" aria-hidden="true"></i>
          <div>
            <strong>${escapeHtml(t('mission.detail.firstStepLabel'))}</strong>
            <p>${escapeHtml(firstStep)}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function updateProgress(step) {
  document.querySelectorAll('.challenge-progress__step').forEach(el => {
    const stepNum = parseInt(el.dataset.step, 10);
    el.classList.remove('is-active', 'is-complete');
    if (stepNum < step) {
      el.classList.add('is-complete');
    } else if (stepNum === step) {
      el.classList.add('is-active');
    }
  });

  document.querySelectorAll('.challenge-progress__connector').forEach(el => {
    const connNum = parseInt(el.dataset.connector, 10);
    el.classList.toggle('is-complete', connNum < step);
  });
}

export function selectRole(roleKey) {
  if (!ROLE_CONFIG[roleKey]) return;

  // Update cards visual state
  document.querySelectorAll('.challenge-role-card').forEach(card => {
    const isSelected = card.dataset.role === roleKey;
    card.classList.toggle('is-active', isSelected);
    card.setAttribute('aria-pressed', String(isSelected));

    // Badge earned animation on selected card
    if (isSelected) {
      triggerBadgeEarned(card);
    }
  });

  // Show and render mission detail
  const detail = document.getElementById('mission-detail');
  if (detail) {
    const wasVisible = detail.classList.contains('is-visible');
    renderMissionDetail(roleKey);
    detail.classList.add('is-visible');

    // Smooth scroll only if this is a new interaction (not on page load restore)
    if (wasVisible) {
      detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // Award XP for choosing a role (only once per role)
  const xpKey = `xp-role-${roleKey}`;
  if (!sessionStorage.getItem(xpKey)) {
    sessionStorage.setItem(xpKey, '1');
    import('./xp.js').then(({ addXP }) => {
      addXP(25, `Rolle gewählt: ${roleKey}`);
    });
  }

  // Update progress to step 3 (Mission)
  updateProgress(3);

  // Persist choice
  try {
    sessionStorage.setItem('prisma-role', roleKey);
  } catch (_e) {
    // sessionStorage may be unavailable in private mode
  }
}

export function initMission() {
  const roleCards = document.querySelectorAll('.challenge-role-card');
  if (!roleCards.length) return;

  roleCards.forEach(card => {
    card.addEventListener('click', () => {
      const role = card.dataset.role;
      if (role) selectRole(role);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const role = card.dataset.role;
        if (role) selectRole(role);
      }
    });
  });

  // Restore selection from sessionStorage without scrolling
  try {
    const savedRole = sessionStorage.getItem('prisma-role');
    if (savedRole && ROLE_CONFIG[savedRole]) {
      // Apply visual state only, no scroll
      document.querySelectorAll('.challenge-role-card').forEach(card => {
        const isSelected = card.dataset.role === savedRole;
        card.classList.toggle('is-active', isSelected);
        card.setAttribute('aria-pressed', String(isSelected));
      });

      const detail = document.getElementById('mission-detail');
      if (detail) {
        renderMissionDetail(savedRole);
        detail.classList.add('is-visible');
      }

      updateProgress(3);
    }
  } catch (_e) {
    // Ignore sessionStorage errors
  }

  // Re-render mission detail on language change
  onLangChange(() => {
    try {
      const savedRole = sessionStorage.getItem('prisma-role');
      if (savedRole && ROLE_CONFIG[savedRole]) {
        renderMissionDetail(savedRole);
      }
    } catch (_e) {
      // Ignore
    }
  });
}

/* Badge Earned Animation */
function triggerBadgeEarned(card) {
  // Add earned class for CSS animation
  card.classList.add('is-earned');
  setTimeout(() => card.classList.remove('is-earned'), 1000);

  // Create confetti particles
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
