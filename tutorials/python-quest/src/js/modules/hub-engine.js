/**
 * PYTHON QUEST — Hub Engine
 * Rendert Welten, Badges, Hero-Stats
 */

import { WORLDS, BADGES, localizeWorld, localizeBadge } from './quest-data.js';
import { loadProgress, isQuestCompleted, isWorldUnlocked, getWorldProgress } from './progress.js';
import { getBadgeProgress } from './badge-engine.js';
import { t, getLanguage } from './i18n.js';
import { updateHeroStats, renderProgressDashboard } from './xp-system.js';

export function renderHub() {
  const progress = loadProgress();
  renderWorlds();
  renderBadges();
  updateWelcomeBack();
  updateHeroStats(progress);
  renderProgressDashboard(progress);
  initBadgeUpdateListener();
}

let badgeListenerInitialized = false;

function initBadgeUpdateListener() {
  if (badgeListenerInitialized) return;
  badgeListenerInitialized = true;

  // Re-render badges when earned from quest page
  document.addEventListener('badges-updated', () => {
    renderBadges();
    const progress = loadProgress();
    updateHeroStats(progress);
    renderProgressDashboard(progress);
  });

  // Re-render hub when user returns from quest page
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      const progress = loadProgress();
      renderWorlds();
      renderBadges();
      updateWelcomeBack();
      updateHeroStats(progress);
      renderProgressDashboard(progress);
    }
  });

  // Re-render worlds + badges on language change
  window.addEventListener('pyquest:languagechange', () => {
    renderWorlds();
    renderBadges();
    updateWelcomeBack();
  });
}

function renderWorlds() {
  const container = document.getElementById('worlds-grid');
  if (!container) return;
  
  const progress = loadProgress();
  
  container.innerHTML = WORLDS.map((world, index) => {
    const isUnlocked = isWorldUnlocked(progress, index);
    const isCompleted = progress.completedWorlds.includes(world.id);
    const worldProgress = getWorldProgress(progress, world.id);
    const locWorld = localizeWorld(world);

    return `
      <div class="py-quest-world-card ${!isUnlocked ? 'is-locked' : ''} ${isCompleted ? 'is-completed' : ''}"
           data-world="${world.id}" data-world-image="${world.image}" data-world-title="${locWorld.title}"
           ${isUnlocked ? '' : 'tabindex="-1"'}
           style="--world-color: ${world.color};">
        <div class="py-quest-world-card__image">
          <img src="${world.image}" alt="${locWorld.title}" loading="lazy"
               onerror="this.src='../assets/images/hero/hero-main.jpg'">
          <div class="py-quest-world-card__overlay"></div>
          ${!isUnlocked ? `
            <div class="py-quest-world-card__lock">
              <i class="ph ph-lock-key" aria-hidden="true"></i>
              <span>${t('worlds.lockText', { prev: index })}</span>
            </div>
          ` : ''}
          <span class="py-quest-world-card__number">${world.number}</span>
          <span class="py-quest-world-card__status py-quest-world-card__status--${isCompleted ? 'completed' : isUnlocked ? 'active' : 'locked'}">
            <i class="ph ph-${isCompleted ? 'check-circle' : isUnlocked ? 'play-circle' : 'lock-key'}" aria-hidden="true"></i>
            ${isCompleted ? t('worlds.statusCompleted') : isUnlocked ? t('worlds.statusStart') : t('worlds.statusLocked')}
          </span>
          ${isCompleted ? `
            <div class="py-quest-world-card__seal">
              <i class="ph ph-star" aria-hidden="true"></i>
            </div>
          ` : ''}
        </div>
        <div class="py-quest-world-card__content">
          <h3 class="py-quest-world-card__title">${locWorld.title}</h3>
          <p class="py-quest-world-card__subtitle">${locWorld.subtitle}</p>
          <div class="py-quest-world-card__skills">
            ${(locWorld.skills || []).map(skill => `<span class="py-quest-world-card__skill">${skill}</span>`).join('')}
          </div>
          <div class="py-quest-world-card__meta">
            <span><i class="ph ph-lightning" aria-hidden="true"></i> ${world.xp} XP</span>
            <span><i class="ph ph-check-square" aria-hidden="true"></i> ${world.quests.length} ${t('worlds.progressLabel')}</span>
          </div>
          ${isUnlocked ? `
            <div class="py-quest-world-card__progress">
              <div class="py-quest-world-card__progress-track">
                <div class="py-quest-world-card__progress-fill" data-progress-width="${worldProgress.percent}" data-progress-color="${world.color}"></div>
              </div>
              <div class="py-quest-world-card__progress-text">
                <span>${worldProgress.completed}/${worldProgress.total} ${t('worlds.progressLabel')}</span>
                <span>${worldProgress.percent}%</span>
              </div>
            </div>
          ` : ''}
          <!-- Quest Timeline -->
          <div class="py-quest-world-card__timeline">
            ${world.quests.map((quest, qIndex) => {
              const qCompleted = isQuestCompleted(progress, world.id, quest.id);
              const qPrevCompleted = qIndex === 0 || isQuestCompleted(progress, world.id, world.quests[qIndex - 1].id);
              const qStatus = qCompleted ? 'completed' : (isUnlocked && qPrevCompleted) ? 'active' : 'locked';
              return `<span class="py-quest-world-card__timeline-dot py-quest-world-card__timeline-dot--${qStatus}" style="--timeline-color: ${world.color}"></span>`;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  // Set progress bar widths via CSS custom properties (avoids inline styles in HTML)
  container.querySelectorAll('.py-quest-world-card__progress-fill').forEach(fill => {
    const width = fill.dataset.progressWidth;
    const color = fill.dataset.progressColor;
    if (width) fill.style.setProperty('--progress-width', width + '%');
    if (color) fill.style.setProperty('--progress-color', color);
  });

  // Click handlers
  container.querySelectorAll('.py-quest-world-card:not(.is-locked)').forEach(card => {
    card.addEventListener('click', () => {
      const worldId = card.dataset.world;
      openPortal(worldId);
    });
  });
}

function renderBadges() {
  const container = document.getElementById('badges-grid');
  if (!container) return;

  const progress = loadProgress();

  container.innerHTML = BADGES.map(badge => {
    const isEarned = progress.earnedBadges.includes(badge.id);
    const bp = getBadgeProgress(badge, progress);
    const showProgress = !isEarned && bp.percent > 0;
    const locBadge = localizeBadge(badge);

    return `
      <div class="py-quest-badge-card ${isEarned ? 'is-earned' : 'is-locked'}">
        <div class="py-quest-badge-card__icon ${badge.image ? 'is-image' : ''}">
          ${badge.image
            ? `<img src="${badge.image}" alt="${locBadge.title}" loading="lazy" onerror="this.src='${badge.image.replace('.webp', '.jpg')}'">`
            : `<i class="ph ${badge.icon}" aria-hidden="true"></i>`
          }
        </div>
        <h3 class="py-quest-badge-card__title">${locBadge.title}</h3>
        <p class="py-quest-badge-card__desc">${getBadgeDescription(badge)}</p>
        <span class="py-quest-badge-card__status py-quest-badge-card__status--${isEarned ? 'earned' : 'locked'}">
          <i class="ph ph-${isEarned ? 'check' : 'lock'}" aria-hidden="true"></i>
          ${isEarned ? t('badge.earned') : t('badge.locked')}
        </span>
        ${showProgress ? `
        <div class="py-quest-badge-card__progress">
          <div class="py-quest-badge-card__progress-track">
            <div class="py-quest-badge-card__progress-fill" data-progress-width="${bp.percent}"></div>
          </div>
          <div class="py-quest-badge-card__progress-text">${bp.current} / ${bp.target}</div>
        </div>
        ` : ''}
      </div>
    `;
  }).join('');

  // Animate progress fills
  requestAnimationFrame(() => {
    container.querySelectorAll('.py-quest-badge-card__progress-fill').forEach(fill => {
      const width = fill.dataset.progressWidth;
      if (width) fill.style.setProperty('--progress-width', width + '%');
    });
  });
}

function getBadgeDescription(badge) {
  const descriptions = {
    de: {
      'erster-code': 'Schließe deine erste Quest ab',
      'variablen-meister': 'Meistere Variablen',
      'logik-experte': 'Beherrsche Bedingungen und Schleifen',
      'daten-archivar': 'Nutze Listen und Dictionaries',
      'funktions-schmied': 'Baue wiederverwendbare Funktionen',
      'api-teleporter': 'Arbeite mit APIs und JSON',
      'code-morpher': 'Schließe 5 Code-Morph-Quests ab',
      'ki-copilot': 'Schließe 3 Reflexions-Quests ab',
      'streak-koenig': 'Lerne 5 Tage in Folge',
      'perfektionist': 'Schließe eine Welt zu 100% ab',
      'speedrunner': 'Schließe eine Quest in unter 15 Min ab',
      'w3schools-entdecker': 'Besuche 10 W3Schools-Links',
      'python-legende': 'Meistere alle Welten'
    },
    en: {
      'erster-code': 'Complete your first quest',
      'variablen-meister': 'Master variables',
      'logik-experte': 'Master conditions and loops',
      'daten-archivar': 'Use lists and dictionaries',
      'funktions-schmied': 'Build reusable functions',
      'api-teleporter': 'Work with APIs and JSON',
      'code-morpher': 'Complete 5 code-morph quests',
      'ki-copilot': 'Complete 3 reflection quests',
      'streak-koenig': 'Learn 5 days in a row',
      'perfektionist': 'Complete a world to 100%',
      'speedrunner': 'Complete a quest in under 15 min',
      'w3schools-entdecker': 'Visit 10 W3Schools links',
      'python-legende': 'Master all worlds'
    }
  };
  const lang = getLanguage();
  return descriptions[lang]?.[badge.id] || descriptions.de[badge.id] || '';
}

function updateWelcomeBack() {
  const progress = loadProgress();
  const welcome = document.getElementById('welcome-back');
  if (!welcome) return;

  const span = welcome.querySelector('span');
  const icon = welcome.querySelector('i');

  if (progress.stats.questsCompleted > 0) {
    // Returning user
    if (span) span.textContent = t('hero.welcomeBack');
    if (icon) icon.className = 'ph ph-hand-waving';
  } else {
    // First visit
    if (span) span.textContent = t('hero.adventure');
    if (icon) icon.className = 'ph ph-code';
  }
}

function openPortal(worldId) {
  const world = WORLDS.find(w => w.id === worldId);
  if (!world) return;

  const overlay = document.getElementById('portal-overlay');
  const image = document.getElementById('portal-image');
  const color = document.getElementById('portal-color');
  const title = document.getElementById('portal-title');

  if (!overlay || !image || !color || !title) {
    window.location.href = `./quest.html?world=${worldId}&quest=${world.quests[0].id}`;
    return;
  }

  const card = document.querySelector(`.py-quest-world-card[data-world="${worldId}"]`);
  const worldImage = card?.dataset.worldImage || world.image;
  const worldTitle = card?.dataset.worldTitle || world.title;
  const worldColor = card?.style.getPropertyValue('--world-color') || world.color;

  image.src = worldImage;
  color.style.setProperty('--portal-color', worldColor);
  title.textContent = worldTitle;

  overlay.classList.add('is-active');

  setTimeout(() => {
    window.location.href = `./quest.html?world=${worldId}&quest=${world.quests[0].id}`;
  }, 1800);
}

// Scroll progress
export function initScrollProgress() {
  const bar = document.querySelector('.py-quest-scroll-progress');
  if (!bar) return;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.setProperty('--scroll-progress', `${progress}%`);
  });
}
