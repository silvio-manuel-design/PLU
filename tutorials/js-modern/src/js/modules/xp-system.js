import { t } from './i18n.js';
/**
 * XP System — Anzeige, Animationen und Hero-Stat-Zähler
 */

import { loadProgress } from './progress.js';
import { badges } from './quest-data.js';

/**
 * XP-Anzeige im Header — ENTFERNT, jetzt nur noch im Hero
 * Diese Funktion bleibt für die Quest-Seite erhalten
 */
export function updateXPDisplay() {
  const progress = loadProgress();
  const levelEl = document.getElementById('xp-level');
  const barEl = document.getElementById('xp-bar');
  const valueEl = document.getElementById('xp-value');

  if (!levelEl || !barEl || !valueEl) return;

  const xpNeeded = progress.level * 100;
  const percentage = Math.min((progress.xp / xpNeeded) * 100, 100);

  levelEl.textContent = progress.level;
  barEl.style.setProperty('--xp-bar-width', `${percentage}%`);
  valueEl.textContent = `${progress.xp} / ${xpNeeded} XP`;
}

/**
 * Berechne Level aus abgeschlossenen Quests (Fallback für alte Daten ohne XP)
 */
function calculateLevelFromQuests(completedCount) {
  // Jede Quest gibt ~15 XP, Level-Up alle 100 XP
  const totalXP = completedCount * 15;
  let level = 1;
  let remainingXP = totalXP;
  while (remainingXP >= level * 100) {
    remainingXP -= level * 100;
    level++;
  }
  return { level, xp: remainingXP, totalXP };
}

/**
 * Zeige eine XP-Gain-Animation
 */
export function showXPGain(amount, x, y) {
  const el = document.createElement('div');
  el.className = 'xp-gain';
  el.textContent = `+${amount} XP`;
  el.style.setProperty('--xp-x', `${x}px`);
  el.style.setProperty('--xp-y', `${y}px`);
  document.body.appendChild(el);

  setTimeout(() => el.remove(), 1500);
}

/**
 * Zeige Level-Up-Animation
 */
export function showLevelUp(level) {
  const overlay = document.createElement('div');
  overlay.className = 'levelup-overlay';

  overlay.innerHTML = `
    <div class="levelup-overlay__modal">
      <div class="levelup-overlay__icon"><i class="ph ph-confetti"></i></div>
      <h2 class="levelup-overlay__title">${t('xp.levelUp')}</h2>
      <p class="levelup-overlay__text">
        ${t('xp.levelUpText', { level })}
      </p>
      <button class="quest-btn quest-btn--primary levelup-overlay__btn" data-levelup-close>
        ${t('xp.continue')}
      </button>
    </div>
  `;

  document.body.appendChild(overlay);

  setTimeout(() => {
    if (overlay.parentNode) overlay.remove();
  }, 3000);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

/**
 * Animiere einen Zähler von 0 bis Zielwert
 */
function animateCounter(element, targetValue, duration = 1500, suffix = '') {
  if (!element) return;

  const startTime = performance.now();
  const startValue = 0;

  const numericMatch = String(targetValue).match(/(\d+)/);
  const numericTarget = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  const nonNumericPart = String(targetValue).replace(/\d+/, '');

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(2, -10 * progress);
    const currentValue = Math.round(startValue + (numericTarget - startValue) * easeProgress);

    element.textContent = currentValue + nonNumericPart + suffix;

    if (progress < 0.6) {
      element.style.setProperty('--count-scale', `${1 + Math.sin(progress * Math.PI * 4) * 0.05}`);
    } else {
      element.style.setProperty('--count-scale', '1');
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = targetValue;
      element.style.setProperty('--count-scale', '1');
      element.classList.add('u-animate-count-pop');
      setTimeout(() => element.classList.remove('u-animate-count-pop'), 300);
    }
  }

  requestAnimationFrame(update);
}

/**
 * Prüfe Badge-Bedingung dynamisch (kopiert aus quest-engine.js für unabhängige Nutzung)
 */
function checkBadgeCondition(badge) {
  const progress = loadProgress();

  switch (badge.condition) {
    case 'all-w3schools':
      return progress.completedQuests.length >= 10;
    case 'streak-5':
      return progress.streak.count >= 5;
    case 'all-worlds':
      return true; // Will be checked per-world below
    default:
      return progress.completedQuests.includes(badge.condition);
  }
}

/**
 * Zähle dynamisch verdiente Badges
 */
function countEarnedBadges() {
  const progress = loadProgress();
  let count = 0;

  badges.forEach(badge => {
    const isEarned = progress.earnedBadges.includes(badge.id) || checkBadgeCondition(badge);
    if (isEarned) count++;
  });

  return count;
}

/**
 * Aktualisiere Hero-Statistiken mit animierten Zählern
 */
export function updateHeroStats(worlds) {
  const questEl = document.getElementById('stat-quests');
  const worldEl = document.getElementById('stat-worlds');
  const badgeEl = document.getElementById('stat-badges');
  const xpEl = document.getElementById('stat-xp');
  const levelEl = document.getElementById('stat-level');

  const progress = loadProgress();

  // Berechne tatsächliche Werte
  const totalWorlds = worlds.length;
  const completedWorlds = worlds.filter(w => {
    const allDone = w.quests.every(q => progress.completedQuests.includes(q.id));
    return allDone;
  }).length;
  const questsCompleted = progress.completedQuests.length;
  const earnedBadgesCount = countEarnedBadges();

  // XP/Level: Verwende gespeicherte Werte ODER berechne aus Quests (Fallback)
  let { level, xp, totalXP } = progress.xp > 0
    ? { level: progress.level, xp: progress.xp, totalXP: progress.xp }
    : calculateLevelFromQuests(questsCompleted);

  // Animiere die Zähler
  if (questEl) animateCounter(questEl, questsCompleted, 1200);
  if (worldEl) animateCounter(worldEl, `${completedWorlds}/${totalWorlds}`, 1200);
  if (badgeEl) animateCounter(badgeEl, earnedBadgesCount, 1200);
  if (xpEl) animateCounter(xpEl, totalXP, 1200);
  if (levelEl) animateCounter(levelEl, level, 1200);
}
