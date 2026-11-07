/**
 * PYTHON QUEST — Progress System
 * localStorage-basiertes Fortschritts-Tracking
 */

import { WORLDS } from './quest-data.js';

const STORAGE_KEY = 'pyquest-progress';
const STORAGE_VERSION = '2';

export const defaultProgress = {
  version: STORAGE_VERSION,
  xp: 0,
  level: 1,
  completedQuests: [],
  completedWorlds: [],
  earnedBadges: [],
  currentQuest: null,
  currentWorld: null,
  streak: { count: 0, lastActive: null, freezesAvailable: 1, freezeWeek: null },
  stats: {
    questsStarted: 0,
    questsCompleted: 0,
    totalTimeMinutes: 0,
    codeRuns: 0,
    w3schoolsVisits: 0,
    morphQuestsCompleted: 0,
    reflectionsCompleted: 0,
    speedrunsCompleted: 0,
    questStartTimes: {}
  }
};

export function loadProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { ...defaultProgress };
    
    const parsed = JSON.parse(stored);
    
    // Migration: alte Version erkannt
    if (parsed.version !== STORAGE_VERSION) {
      return migrateProgress(parsed);
    }
    
    return { ...defaultProgress, ...parsed };
  } catch (e) {
    console.warn('Failed to load progress:', e);
    return { ...defaultProgress };
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn('Failed to save progress:', e);
  }
}

function migrateProgress(old) {
  // Von alter Version (Modul-basiert) zu neuer Version (Welt-basiert)
  const migrated = { ...defaultProgress };
  
  if (old.completedQuests) {
    migrated.completedQuests = old.completedQuests.map(id => {
      // Alte IDs wie "modul-00-task-0" zu neuen konvertieren
      if (id.startsWith('modul-')) return null;
      return id;
    }).filter(Boolean);
  }
  
  if (old.xp) migrated.xp = old.xp;
  if (old.level) migrated.level = old.level;
  
  saveProgress(migrated);
  return migrated;
}

export function isQuestCompleted(progress, worldId, questId) {
  return progress.completedQuests.includes(`${worldId}:${questId}`);
}

export function completeQuest(progress, worldId, questId, xp) {
  const key = `${worldId}:${questId}`;
  
  if (progress.completedQuests.includes(key)) {
    return { progress, alreadyCompleted: true, xpGained: 0 };
  }
  
  progress.completedQuests.push(key);
  progress.stats.questsCompleted++;
  progress.xp += xp;
  
  // Track quest type stats for badges
  const world = WORLDS.find(w => w.id === worldId);
  const quest = world?.quests.find(q => q.id === questId);
  if (quest) {
    if (quest.type === 'reflection') {
      progress.stats.reflectionsCompleted++;
    }
    if (quest.type === 'morph') {
      progress.stats.morphQuestsCompleted++;
    }
  }
  
  // Check speedrun (quest completed in under 15 minutes)
  const minutes = endQuestTimer(progress, worldId, questId);
  if (minutes > 0 && minutes <= 15) {
    progress.stats.speedrunsCompleted++;
  }
  
  // Level-Up prüfen
  const oldLevel = progress.level;
  const newLevel = Math.floor(progress.xp / 100) + 1;
  const leveledUp = newLevel > oldLevel;
  
  if (leveledUp) {
    progress.level = newLevel;
  }
  
  // Welt-Abschluss prüfen
  checkWorldCompletion(progress, worldId);
  
  saveProgress(progress);
  
  return { progress, alreadyCompleted: false, xpGained: xp, leveledUp, newLevel };
}

function checkWorldCompletion(progress, worldId) {
  const world = WORLDS.find(w => w.id === worldId);
  if (!world) return;
  
  const allCompleted = world.quests.every(q => 
    progress.completedQuests.includes(`${worldId}:${q.id}`)
  );
  
  if (allCompleted && !progress.completedWorlds.includes(worldId)) {
    progress.completedWorlds.push(worldId);
  }
}

export function getWorldProgress(progress, worldId) {
  const world = WORLDS.find(w => w.id === worldId);
  if (!world) return { completed: 0, total: 0, percent: 0 };
  
  const completed = world.quests.filter(q => 
    progress.completedQuests.includes(`${worldId}:${q.id}`)
  ).length;
  
  return {
    completed,
    total: world.quests.length,
    percent: Math.round((completed / world.quests.length) * 100)
  };
}

export function isWorldUnlocked(progress, worldIndex) {
  if (worldIndex === 0) return true;
  
  const prevWorld = WORLDS[worldIndex - 1];
  if (!prevWorld) return true;
  
  return progress.completedWorlds.includes(prevWorld.id);
}

function getCurrentWeekKey() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now - start + ((start.getDay() + 6) % 7) * 86400000;
  const week = Math.floor(diff / 604800000) + 1;
  return `${now.getFullYear()}-W${week}`;
}

function refreshFreezes(progress) {
  const currentWeek = getCurrentWeekKey();
  if (progress.streak.freezeWeek !== currentWeek) {
    progress.streak.freezeWeek = currentWeek;
    progress.streak.freezesAvailable = 1;
  }
}

export function updateStreak(progress) {
  const today = new Date().toDateString();
  const last = progress.streak.lastActive;
  
  if (last === today) return false;
  
  refreshFreezes(progress);
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (last === yesterday.toDateString()) {
    progress.streak.count++;
  } else if (progress.streak.freezesAvailable > 0) {
    // Freeze used: streak preserved
    progress.streak.freezesAvailable--;
    progress.streak.count = Math.max(1, progress.streak.count);
  } else {
    progress.streak.count = 1;
  }
  
  progress.streak.lastActive = today;
  saveProgress(progress);
  return true;
}

export function getStreakStatus(progress) {
  refreshFreezes(progress);
  return {
    count: progress.streak.count,
    freezesAvailable: progress.streak.freezesAvailable,
    freezeWeek: progress.streak.freezeWeek,
    lastActive: progress.streak.lastActive
  };
}

export function trackW3SchoolsVisit(progress) {
  progress.stats.w3schoolsVisits++;
  saveProgress(progress);
}

export function startQuestTimer(progress, worldId, questId) {
  const key = `${worldId}:${questId}`;
  progress.stats.questStartTimes[key] = Date.now();
  progress.stats.questsStarted++;
  saveProgress(progress);
}

export function endQuestTimer(progress, worldId, questId) {
  const key = `${worldId}:${questId}`;
  const start = progress.stats.questStartTimes[key];
  if (start) {
    const minutes = Math.round((Date.now() - start) / 60000);
    progress.stats.totalTimeMinutes += minutes;
    delete progress.stats.questStartTimes[key];
    saveProgress(progress);
    return minutes;
  }
  return 0;
}
