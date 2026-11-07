/**
 * PYTHON QUEST — Main Entry Point
 * Erkennt Hub vs. Quest-Seite und initialisiert entsprechend
 */

import { renderHub, initScrollProgress } from './modules/hub-engine.js';
import { initQuestPage } from './modules/quest-page.js';
import { initMobileNav } from './modules/mobile-nav.js';
import { initScrollReveal } from './modules/scroll-reveal.js';
import { initBackToTop } from './modules/back-to-top.js';
import { initCopilot, updateCopilotStage } from './modules/copilot.js';
import { initConfetti } from './modules/confetti.js';
import { initSandbox } from './modules/sandbox.js';
import { loadProgress, updateStreak } from './modules/progress.js';
import { updateXPBar, updateHeroStats, showLevelUp, renderProgressDashboard } from './modules/xp-system.js';
import { initClassroomMode } from './modules/classroom.js';
import { checkBadges, showBadgeEarned } from './modules/badge-engine.js';
import { showToast } from './modules/toast.js';
import { initI18n, toggleLanguage, t } from './modules/i18n.js';
import { setToastFunction } from './modules/i18n.js';
import { initAuth } from './modules/auth.js';
// import { initProgressSync, queueSyncToCloud } from './modules/progress-sync.js';

setToastFunction(showToast);

function initTheme() {
  const saved = localStorage.getItem('pyquest-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('pyquest-theme', next);
}

function initHeaderScroll() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.scrollY;

        // Scrolled state (background change)
        if (currentScroll > 20) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }

        // Mobile auto-hide (only on small screens)
        if (window.innerWidth < 768) {
          if (currentScroll > lastScrollY && currentScroll > 80) {
            // Scrolling down → hide header
            header.classList.add('is-hidden');
          } else {
            // Scrolling up → show header
            header.classList.remove('is-hidden');
          }
        }

        lastScrollY = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  });
}

function initModal() {
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.py-quest-modal');
      if (modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  });
  
  // Close on backdrop click
  document.querySelectorAll('.py-quest-modal__backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', () => {
      const modal = backdrop.closest('.py-quest-modal');
      if (modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  });
}

/**
 * Vollständige Gamification-Update-Sequenz
 * Wird nach Quest-Abschluss aufgerufen
 */
export function triggerGamificationUpdate(xpGained = 0, x = null, y = null) {
  const progress = loadProgress();
  
  // XP Bar aktualisieren
  updateXPBar(progress);
  
  // Hero Stats aktualisieren
  updateHeroStats(progress);
  
  // Badges prüfen
  const newBadges = checkBadges();
  newBadges.forEach((badge, index) => {
    setTimeout(() => showBadgeEarned(badge), index * 800);
  });
}

function initHub() {
  initTheme();
  initMobileNav();
  initScrollReveal();
  initScrollProgress();
  initBackToTop();
  initConfetti();
  initCopilot();
  initClassroomMode();
  initHeaderScroll();
  initModal();

  // Theme toggle
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Streak
  const progress = loadProgress();
  const streakUpdated = updateStreak(progress);
  if (streakUpdated && progress.streak.count > 1) {
    showToast({
      type: 'success',
      title: t('toast.streakTitle', { count: progress.streak.count }),
      text: t('toast.streakText'),
      duration: 4000
    });
  }

  // Update UI
  updateXPBar(progress);
  updateHeroStats(progress);
  renderProgressDashboard(progress);
  renderHub();
  updateCopilotStage();

  // Badges initial prüfen
  checkBadges();
}

async function init() {
  initTheme();
  initI18n();
  initMobileNav();
  initHeaderScroll();
  initModal();

  // Auth (lokal, kein Supabase)
  try {
    await initAuth();
  } catch (err) {
    console.warn('[Init] Auth initialization failed:', err.message);
  }

  initCopilot();

  // Theme toggle
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Language toggle
  document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
    btn.addEventListener('click', toggleLanguage);
  });

  // Detect page type
  const hasQuestContainer = document.getElementById('quest-container');
  const hasWorldsGrid = document.getElementById('worlds-grid');

  if (hasQuestContainer) {
    // Quest detail page
    initQuestPage();
    initBackToTop();
    initClassroomMode();
  }

  if (hasWorldsGrid) {
    // Hub page
    initScrollReveal();
    initScrollProgress();
    initBackToTop();
    initConfetti();
    initClassroomMode();

    const progress = loadProgress();
    const streakUpdated = updateStreak(progress);
    if (streakUpdated && progress.streak.count > 1) {
      showToast({
        type: 'success',
        title: `Streak: ${progress.streak.count} Tage!`,
        text: 'Weiter so! Du bist auf dem besten Weg.',
        duration: 4000
      });
    }

    updateXPBar(progress);
    updateHeroStats(progress);
    renderProgressDashboard(progress);
    renderHub();
    updateCopilotStage();
    checkBadges();
  }

  // Tools page — needs scroll reveal and shared UI too
  const hasToolsGrid = document.getElementById('tools-grid');
  if (hasToolsGrid) {
    initScrollReveal();
    initScrollProgress();
    initBackToTop();
    initConfetti();
    initClassroomMode();
    updateXPBar(loadProgress());
  }

  // Teacher dashboard — shared UI only
  const hasTeacherDashboard = document.getElementById('teacher-dashboard');
  if (hasTeacherDashboard) {
    initScrollProgress();
    initBackToTop();
    initClassroomMode();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
