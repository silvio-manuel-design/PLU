/**
 * PYTHON QUEST — Badge Engine
 * Prüft und vergibt Badges basierend auf Fortschritt
 */

import { BADGES, WORLDS, localizeBadge } from './quest-data.js';
import { t } from './i18n.js';
import { loadProgress, saveProgress, getWorldProgress, isQuestCompleted } from './progress.js';
import { showToast } from './toast.js';
import { fireConfetti } from './confetti.js';

/**
 * Prüft alle Badges und gibt neu verdiente zurück
 */
export function checkBadges() {
  const progress = loadProgress();
  const newlyEarned = [];
  
  for (const badge of BADGES) {
    if (progress.earnedBadges.includes(badge.id)) continue;
    
    const earned = checkBadgeCondition(badge, progress);
    if (earned) {
      progress.earnedBadges.push(badge.id);
      newlyEarned.push(badge);
    }
  }
  
  if (newlyEarned.length > 0) {
    saveProgress(progress);
  }
  
  return newlyEarned;
}

function checkBadgeCondition(badge, progress) {
  switch (badge.type) {
    case 'quest':
      // Badge wird durch Abschluss einer spezifischen Quest freigeschaltet
      for (const world of WORLDS) {
        const quest = world.quests.find(q => q.id === badge.condition);
        if (quest) {
          return isQuestCompleted(progress, world.id, quest.id);
        }
      }
      return false;
      
    case 'count':
      // Badge basiert auf Anzahl (z.B. 5 Morph-Quests)
      if (badge.condition === 'reflection_3') {
        return progress.stats.reflectionsCompleted >= badge.target;
      }
      if (badge.condition === 'w3schools_10') {
        return progress.stats.w3schoolsVisits >= badge.target;
      }
      return false;
      
    case 'streak':
      return progress.streak.count >= badge.target;
      
    case 'world_perfect':
      // Eine Welt zu 100% abgeschlossen
      for (const world of WORLDS) {
        const wp = getWorldProgress(progress, world.id);
        if (wp.percent === 100) return true;
      }
      return false;
      
    case 'speed':
      return progress.stats.speedrunsCompleted >= badge.target;
      
    case 'all_worlds':
      return progress.completedWorlds.length === WORLDS.length;
      
    default:
      return false;
  }
}

/**
 * Zeigt Badge-Earned Animation
 */
export function showBadgeEarned(badge) {
  // Confetti
  fireConfetti();
  
  // Toast
  setTimeout(() => {
    showToast({
      type: 'success',
      title: `${t('badge.newBadge')}: ${localizeBadge(badge).title}`,
      text: t('badges.subtitle'),
      duration: 6000
    });
  }, 300);
  
  // Update UI
  const badgesGrid = document.getElementById('badges-grid');
  if (badgesGrid) {
    // Re-render badges after a short delay
    setTimeout(() => {
      const event = new CustomEvent('badges-updated');
      document.dispatchEvent(event);
    }, 1000);
  }
}

/**
 * Gibt den Fortschritt als Text zurück
 */
export function getBadgeProgress(badge, progress) {
  if (progress.earnedBadges.includes(badge.id)) {
    return { current: badge.target || 1, target: badge.target || 1, percent: 100 };
  }
  
  switch (badge.type) {
    case 'count':
      if (badge.condition === 'reflection_3') {
        return {
          current: progress.stats.reflectionsCompleted,
          target: badge.target,
          percent: Math.min((progress.stats.reflectionsCompleted / badge.target) * 100, 99)
        };
      }
      if (badge.condition === 'w3schools_10') {
        return {
          current: progress.stats.w3schoolsVisits,
          target: badge.target,
          percent: Math.min((progress.stats.w3schoolsVisits / badge.target) * 100, 99)
        };
      }
      break;
      
    case 'streak':
      return {
        current: progress.streak.count,
        target: badge.target,
        percent: Math.min((progress.streak.count / badge.target) * 100, 99)
      };
  }
  
  return { current: 0, target: 1, percent: 0 };
}
