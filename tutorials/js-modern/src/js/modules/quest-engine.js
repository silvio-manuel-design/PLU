/**
 * Quest Engine — Rendert Welten, Quests und Badges
 */

import { worlds, badges } from './quest-data.js';
import { loadProgress, isQuestComplete, hasBadge } from './progress.js';
import { updateXPDisplay, updateHeroStats } from './xp-system.js';
import { t, onLangChange } from './i18n.js';

/**
 * Rendert alle Welt-Karten
 */
export function renderWorlds() {
  const container = document.getElementById('worlds-container');
  if (!container) return;

  const progress = loadProgress();
  let html = '';

  worlds.forEach((world, index) => {
    // Prüfe, ob Welt freigeschaltet ist
    const isLocked = index > 0 && !isWorldUnlocked(index);
    const isCompleted = world.quests.every(q => progress.completedQuests.includes(q.id));
    const completedCount = world.quests.filter(q => progress.completedQuests.includes(q.id)).length;

    const statusClass = [
      isLocked ? 'world-card--locked' : '',
      isCompleted ? 'world-card--completed' : ''
    ].filter(Boolean).join(' ');
    const badgeClass = isCompleted
      ? 'world-card__badge--completed'
      : isLocked
        ? 'world-card__badge--locked'
        : 'world-card__badge--open';
    const badgeText = isCompleted
      ? `<i class="ph ph-check-circle"></i> ${t('quest.completed')}`
      : isLocked
        ? `<i class="ph ph-lock"></i> ${t('quest.locked')}`
        : `<i class="ph ph-rocket"></i> ${t('quest.open')}`;

    const worldBgWebp = `../assets/images/worlds/${world.id}.webp`;
    const worldBgJpg = `../assets/images/worlds/${world.id}.jpg`;

    // Segmented Progress Bar — each quest = one segment
    const segmentsHtml = world.quests.map((quest, qi) => {
      const isDone = progress.completedQuests.includes(quest.id);
      const isCurrent = !isDone && (qi === 0 || progress.completedQuests.includes(world.quests[qi - 1]?.id));
      const segClass = isDone
        ? 'world-card__progress-segment--done'
        : isCurrent
          ? 'world-card__progress-segment--current'
          : isLocked
            ? 'world-card__progress-segment--locked'
            : 'world-card__progress-segment--pending';
      const questTitle = t('quest.' + quest.id + '.title') || quest.title;
      return `<div class="world-card__progress-segment ${segClass}" title="${questTitle}"></div>`;
    }).join('');

    // Skill Tree Quest Nodes — connected dots
    const nodesHtml = world.quests.map((quest, qi) => {
      const isDone = progress.completedQuests.includes(quest.id);
      const isCurrent = !isDone && (qi === 0 || progress.completedQuests.includes(world.quests[qi - 1]?.id));
      const isQuestLocked = isLocked || (!isDone && !isCurrent);
      const dotClass = isDone
        ? 'world-card__quest-dot--done'
        : isCurrent
          ? 'world-card__quest-dot--current'
          : isQuestLocked
            ? 'world-card__quest-dot--locked'
            : 'world-card__quest-dot--pending';
      const nodeClass = isDone ? 'world-card__quest-node--connected' : '';
      const isBoss = qi === world.quests.length - 1;
      const icon = isDone ? '<i class="ph ph-check"></i>' : (isBoss ? '<i class="ph ph-crown"></i>' : (qi + 1));
      const label = isBoss ? t('quest.boss') : t('quest.questShort') + (qi + 1);

      const questTitle = t('quest.' + quest.id + '.title') || quest.title;
      return `
        <div class="world-card__quest-node ${nodeClass}">
          <span class="world-card__quest-dot ${dotClass} ${isBoss ? 'world-card__quest-dot--boss' : ''}" title="${questTitle}">${icon}</span>
          <span class="world-card__quest-label">${label}</span>
        </div>
      `;
    }).join('');

    // Completion Seal (only for completed worlds)
    const sealHtml = isCompleted
      ? `<div class="world-card__seal"><i class="ph ph-star-fill"></i></div>`
      : '';

    // Lock Overlay (only for locked worlds)
    const lockHtml = isLocked
      ? `<div class="world-card__lock-icon"><i class="ph ph-lock-key"></i></div>`
      : '';

    html += `
      <article class="world-card ${statusClass} u-world-${index + 1}" 
               style="--world-color: ${world.color};"
               data-world-id="${world.id}"
               data-world-image="${worldBgJpg}"
               data-world-title="${world.title}"
               ${isLocked ? '' : `data-portal-transition data-portal-url="quest.html?world=${world.id}"`}>
        ${sealHtml}
        <div class="world-card__cover">
          <picture>
            <source srcset="${worldBgWebp}" type="image/webp">
            <img src="${worldBgJpg}" alt="" loading="lazy" data-img-fallback>
          </picture>
          <div class="world-card__cover-overlay"></div>
          ${lockHtml}
        </div>
        <div class="world-card__body">
          <div class="world-card__header">
            <span class="world-card__icon"><i class="ph ${world.icon}"></i></span>
            <span class="world-card__badge ${badgeClass}">${badgeText}</span>
          </div>
          <h3 class="world-card__title">${t('world.' + world.id + '.title') || world.title}</h3>
          <p class="world-card__description">${t('world.' + world.id + '.description') || world.description}</p>
          <div class="world-card__progress">
            <div class="world-card__progress-segments">
              ${segmentsHtml}
            </div>
            <span class="world-card__progress-text">${completedCount}/${world.quests.length} ${t('quest.quests')}</span>
          </div>
          <div class="world-card__quests">
            ${nodesHtml}
          </div>
        </div>
      </article>
    `;
  });

  container.innerHTML = html;
}

/**
 * Prüfe, ob eine Welt freigeschaltet ist
 */
function isWorldUnlocked(worldIndex) {
  if (worldIndex === 0) return true;
  const prevWorld = worlds[worldIndex - 1];
  const progress = loadProgress();
  return prevWorld.quests.every(q => progress.completedQuests.includes(q.id));
}

/**
 * Rendert alle Badges
 */
export function renderBadges() {
  const container = document.getElementById('badges-container');
  if (!container) return;

  let html = '';

  badges.forEach(badge => {
    const isEarned = hasBadge(badge.id) || checkBadgeCondition(badge);
    const earnedClass = isEarned ? 'badge-item--earned' : 'badge-item--locked';
    const lockOverlay = !isEarned ? '<span class="badge-item__lock"><i class="ph ph-lock"></i></span>' : '';
    const statusHtml = isEarned
      ? `<span class="badge-item__status badge-item__status--earned"><i class="ph ph-check-circle"></i> ${t('badge.earned')}</span>`
      : `<span class="badge-item__status badge-item__status--locked"><i class="ph ph-lock-key"></i> ${t('badge.locked')}</span>`;

    const badgeDesc = t('badge.' + badge.id + '.description') || badge.description;
    html += `
      <div class="badge-item ${earnedClass}" title="${badgeDesc}">
        ${lockOverlay}
        <span class="badge-item__icon"><i class="ph ${badge.icon}"></i></span>
        <span class="badge-item__name">${t('badge.' + badge.id + '.name') || badge.name}</span>
        <span class="badge-item__desc">${badgeDesc}</span>
        ${statusHtml}
      </div>
    `;
  });

  container.innerHTML = html;
}

/**
 * Prüfe Badge-Bedingung dynamisch
 */
function checkBadgeCondition(badge) {
  const progress = loadProgress();

  switch (badge.condition) {
    case 'all-w3schools':
      return progress.completedQuests.length >= 10;
    case 'streak-5':
      return progress.streak.count >= 5;
    case 'all-worlds':
      return worlds.every(w =>
        w.quests.every(q => progress.completedQuests.includes(q.id))
      );
    default:
      return progress.completedQuests.includes(badge.condition);
  }
}

/**
 * Initialisiere alles
 */
export function initQuestEngine() {
  renderWorlds();
  renderBadges();
  updateXPDisplay();
  updateHeroStats(worlds);

  // Portal transition — event delegation on container (works after re-render)
  const worldsContainer = document.getElementById('worlds-container');
  if (worldsContainer) {
    worldsContainer.addEventListener('click', (e) => {
      const card = e.target.closest('[data-portal-transition]');
      if (!card) return;
      const url = card.dataset.portalUrl;
      if (url && window.initPortalTransition) {
        window.initPortalTransition(card, url);
      }
    });
  }

  // Image error fallback — event delegation on container
  if (worldsContainer) {
    worldsContainer.addEventListener('error', (e) => {
      const img = e.target.closest('[data-img-fallback]');
      if (!img) return;
      const cover = img.closest('.world-card__cover');
      if (cover) cover.classList.add('u-hidden');
    }, true);
  }
}
