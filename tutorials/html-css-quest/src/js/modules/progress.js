/**
 * Progress Manager — localStorage-basierte Fortschrittsspeicherung
 */

const STORAGE_KEY = 'code-quest-progress';

// Default-Progress-Struktur
const defaultProgress = {
  xp: 0,
  level: 1,
  completedQuests: [],
  completedWorlds: [],
  earnedBadges: [],
  currentQuest: null,
  streak: {
    count: 0,
    lastActive: null
  },
  stats: {
    questsStarted: 0,
    questsCompleted: 0,
    totalTimeMinutes: 0
  }
};

/**
 * Lade Progress aus localStorage
 */
export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...defaultProgress, ...parsed };
    }
  } catch (e) {
    console.warn('Progress konnte nicht geladen werden:', e);
  }
  return { ...defaultProgress };
}

/**
 * Speichere Progress in localStorage
 */
export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn('Progress konnte nicht gespeichert werden:', e);
  }
}

/**
 * Quest als abgeschlossen markieren
 */
export function completeQuest(questId, xpReward = 15) {
  const progress = loadProgress();

  if (!progress.completedQuests.includes(questId)) {
    progress.completedQuests.push(questId);
    progress.xp += xpReward;
    progress.stats.questsCompleted++;

    // Level-Up Logik
    const xpNeeded = progress.level * 100;
    if (progress.xp >= xpNeeded) {
      progress.level++;
      progress.xp -= xpNeeded;
    }

    saveProgress(progress);
  }

  return progress;
}

/**
 * Badge verdienen
 */
export function earnBadge(badgeId) {
  const progress = loadProgress();

  if (!progress.earnedBadges.includes(badgeId)) {
    progress.earnedBadges.push(badgeId);
    progress.xp += 50; // Bonus-XP für Badges
    saveProgress(progress);
  }

  return progress;
}

/**
 * Streak aktualisieren
 */
export function updateStreak() {
  const progress = loadProgress();
  const today = new Date().toDateString();
  const last = progress.streak.lastActive;

  if (last === today) {
    // Bereits heute aktiv
    return progress.streak;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (last === yesterday.toDateString()) {
    // Streak fortsetzen
    progress.streak.count++;
  } else {
    // Streak unterbrochen oder neu
    progress.streak.count = 1;
  }

  progress.streak.lastActive = today;
  saveProgress(progress);

  return progress.streak;
}

/**
 * Fortschritt zurücksetzen (für Debugging)
 */
export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
  return { ...defaultProgress };
}

/**
 * Prüfe, ob ein Quest abgeschlossen ist
 */
export function isQuestComplete(questId) {
  const progress = loadProgress();
  return progress.completedQuests.includes(questId);
}

/**
 * Prüfe, ob ein Badge verdient wurde
 */
export function hasBadge(badgeId) {
  const progress = loadProgress();
  return progress.earnedBadges.includes(badgeId);
}
