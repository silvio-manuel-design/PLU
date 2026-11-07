/**
 * PYTHON QUEST — XP System
 * Level-Up, Floating XP, Animated Counters
 */

import { WORLDS, BADGES } from './quest-data.js';
import { getWorldProgress } from './progress.js';
import { getBadgeProgress } from './badge-engine.js';
import { t } from './i18n.js';

let levelUpCallback = null;

export function onLevelUp(callback) {
  levelUpCallback = callback;
}

export function showXPGain(amount, x, y) {
  const el = document.createElement('div');
  el.className = 'py-quest-xp-float';
  el.textContent = `+${amount} XP`;
  el.style.setProperty('--xp-float-x', `${x}px`);
  el.style.setProperty('--xp-float-y', `${y}px`);
  document.body.appendChild(el);
  
  setTimeout(() => el.remove(), 1000);
}

export function showLevelUp(level) {
  const modal = document.getElementById('levelup-modal');
  if (!modal) return;
  
  const levelEl = document.getElementById('levelup-level');
  if (levelEl) levelEl.textContent = t('xp.levelUpText', { level });
  
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  
  if (levelUpCallback) levelUpCallback(level);
}

export function updateHeroStats(progress) {
  const stats = document.querySelectorAll('[data-stat]');
  if (!stats.length) return;
  
  const values = {
    quests: progress.stats.questsCompleted,
    worlds: progress.completedWorlds.length,
    badges: progress.earnedBadges.length,
    xp: progress.xp,
    level: progress.level
  };
  
  stats.forEach(stat => {
    const key = stat.dataset.stat;
    const target = values[key] || 0;
    const current = parseInt(stat.textContent) || 0;
    
    if (current !== target) {
      animateCounter(stat, current, target, 1500);
    }
  });
}

function animateCounter(el, from, to, duration) {
  const start = performance.now();
  
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutExpo(progress);
    const current = Math.round(from + (to - from) * eased);
    
    el.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  
  requestAnimationFrame(step);
}

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function updateXPBar(progress) {
  const fill = document.getElementById('xp-fill');
  const levelDisplay = document.getElementById('level-display');
  const levelText = document.getElementById('level-text');
  const xpText = document.getElementById('xp-text');
  
  if (!fill) return;
  
  const xpForLevel = (progress.level - 1) * 100;
  const xpForNextLevel = progress.level * 100;
  const xpInLevel = progress.xp - xpForLevel;
  const xpNeeded = xpForNextLevel - xpForLevel;
  const percent = Math.min((xpInLevel / xpNeeded) * 100, 100);
  
  fill.style.width = `${percent}%`;
  
  if (levelDisplay) levelDisplay.textContent = progress.level;
  if (levelText) levelText.textContent = progress.level;
  if (xpText) xpText.textContent = `${xpInLevel} / ${xpNeeded} XP`;
  
  // XP Display in Header
  const xpDisplay = document.getElementById('xp-display');
  if (xpDisplay) xpDisplay.textContent = `${progress.xp} XP`;
}

// XP Float styles are defined in main.css (ITCSS — no inline injection)

/**
 * Render the premium progress dashboard on the hub page
 */
export function renderProgressDashboard(progress) {
  const dashboard = document.getElementById('progress-dashboard');
  if (!dashboard) return;

  // Calculate total quests
  const totalQuests = WORLDS.reduce((sum, w) => sum + w.quests.length, 0);
  const completedQuests = progress.stats.questsCompleted;
  const percent = totalQuests > 0 ? Math.round((completedQuests / totalQuests) * 100) : 0;

  // Ring animation: circumference = 2 * PI * 54 ≈ 339.292
  const circumference = 339.292;
  const offset = circumference - (percent / 100) * circumference;

  const ringFill = document.getElementById('progress-ring-fill');
  if (ringFill) {
    // Trigger reflow for animation
    ringFill.style.strokeDashoffset = circumference;
    requestAnimationFrame(() => {
      ringFill.style.strokeDashoffset = offset;
    });
  }

  const percentEl = document.getElementById('progress-percent');
  if (percentEl) {
    animateCounter(percentEl, 0, percent, 1500);
    percentEl.textContent = percent + '%';
  }

  // Level badge
  const levelNum = document.getElementById('progress-level-num');
  if (levelNum) {
    levelNum.textContent = progress.level;
  }

  // XP bar
  const xpForLevel = (progress.level - 1) * 100;
  const xpForNextLevel = progress.level * 100;
  const xpInLevel = progress.xp - xpForLevel;
  const xpNeeded = xpForNextLevel - xpForLevel;
  const xpPercent = Math.min((xpInLevel / xpNeeded) * 100, 100);

  const xpFill = document.getElementById('progress-xp-fill');
  if (xpFill) {
    xpFill.style.width = '0%';
    requestAnimationFrame(() => {
      xpFill.style.width = `${xpPercent}%`;
    });
  }

  const xpText = document.getElementById('progress-xp-text');
  if (xpText) {
    xpText.textContent = `${xpInLevel} / ${xpNeeded} XP`;
  }

  // Streak
  const streakCount = document.getElementById('streak-count');
  if (streakCount) {
    streakCount.textContent = progress.streak.count;
  }

  const streakCard = document.getElementById('progress-streak');
  if (streakCard && progress.streak.count > 1) {
    streakCard.style.borderColor = 'rgba(231, 76, 60, 0.3)';
    streakCard.style.background = 'linear-gradient(145deg, rgba(231,76,60,0.05) 0%, rgba(255,255,255,0) 100%), var(--py-bg-card)';
  }

  // Stats
  const questsDone = document.getElementById('stat-quests-completed');
  if (questsDone) questsDone.textContent = completedQuests;

  const worldsDone = document.getElementById('stat-worlds-completed');
  if (worldsDone) worldsDone.textContent = progress.completedWorlds.length;

  const badgesEarned = document.getElementById('stat-badges-earned');
  if (badgesEarned) badgesEarned.textContent = progress.earnedBadges.length;

  // Next badge hint
  const nextBadge = BADGES.find(b => {
    const bp = getBadgeProgress(b, progress);
    return bp.percent > 0 && bp.percent < 100;
  });
  const badgeHintEl = document.getElementById('progress-badge-hint');
  if (badgeHintEl && nextBadge) {
    const bp = getBadgeProgress(nextBadge, progress);
    const remaining = bp.target - bp.current;
    badgeHintEl.textContent = t('progress.nextBadge', { name: nextBadge.title, remaining });
    badgeHintEl.style.display = 'block';
  } else if (badgeHintEl) {
    badgeHintEl.style.display = 'none';
  }

  // Motivation callout
  const callout = document.getElementById('progress-callout');
  const calloutTitle = document.getElementById('callout-title');
  const calloutText = document.getElementById('callout-text');
  if (callout) {
    if (progress.streak.count === 0) {
      callout.style.display = 'flex';
      if (completedQuests === 0) {
        if (calloutTitle) calloutTitle.textContent = t('progress.calloutNewTitle');
        if (calloutText) calloutText.textContent = t('progress.calloutNewText');
      } else {
        if (calloutTitle) calloutTitle.textContent = t('progress.calloutReturnTitle');
        if (calloutText) calloutText.textContent = t('progress.calloutReturnText');
      }
    } else {
      callout.style.display = 'none';
    }
  }
}
