/**
 * JS Quest — Main Entry Point
 */

import { initTheme } from './modules/theme.js';
import { initQuestEngine, renderWorlds, renderBadges } from './modules/quest-engine.js';
import { updateStreak, loadProgress } from './modules/progress.js';
import { worlds } from './modules/quest-data.js';
import { ClassroomManager, initBackToTop, initMobileMenu } from './modules/classroom.js';
import { initI18n, t, onLangChange } from './modules/i18n.js';
import de from './translations/de.js';
import en from './translations/en.js';

document.addEventListener('DOMContentLoaded', () => {
  initI18n(de, en);
  initTheme();
  updateStreak();
  initQuestEngine();
  new ClassroomManager();
  initBackToTop();
  initMobileMenu();
  initScrollReveal();
  initButtonRipple();
  initHeaderScroll();
  initContinueBanner();

  // Re-render dynamic cards on language change
  onLangChange(() => {
    renderWorlds();
    renderBadges();
  });
});

/**
 * Continue Banner — Show "Welcome back" if player has progress
 */
function initContinueBanner() {
  const continueEl = document.getElementById('hero-continue');
  const continueLink = document.getElementById('hero-continue-link');
  const ctaMain = document.getElementById('hero-cta-main');

  if (!continueEl || !continueLink) return;

  const progress = loadProgress();
  const completedCount = progress.completedQuests.length;

  if (completedCount === 0) return;

  // Find the next available quest
  let nextQuest = null;
  let nextWorld = null;

  for (const world of worlds) {
    const allDone = world.quests.every(q => progress.completedQuests.includes(q.id));
    if (allDone) continue;

    nextWorld = world;
    nextQuest = world.quests.find(q => !progress.completedQuests.includes(q.id));
    break;
  }

  if (nextQuest && nextWorld) {
    continueLink.href = `quest.html?world=${nextWorld.id}&quest=${nextQuest.id}`;
    continueEl.classList.remove('u-hidden');

    // Change main CTA to "Explore Worlds" instead
    if (ctaMain) {
      ctaMain.innerHTML = '<i class="ph ph-globe-hemisphere-west"></i> ' + t('nav.worlds');
      ctaMain.href = '#welten';
    }
  }
}

/**
 * Header Scroll Effect — Add scrolled class on scroll
 */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 20) {
          header.classList.add('site-header--scrolled');
        } else {
          header.classList.remove('site-header--scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Scroll Reveal — Elemente fade-in beim Scrollen
 */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('u-reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.u-reveal').forEach(el => observer.observe(el));
}

/**
 * Button Ripple — Klick-Position für Ripple-Effekt setzen
 */
function initButtonRipple() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.quest-btn');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    btn.style.setProperty('--ripple-x', `${x}%`);
    btn.style.setProperty('--ripple-y', `${y}%`);
  });
}

/* ============================================================
   PORTAL TRANSITION — Welt-Karte → Fullscreen → Quest-Seite
   ============================================================ */

/**
 * Initiiere die Portal-Transition beim Klick auf eine Welt-Karte
 * Wird inline von Welt-Karten aufgerufen: onclick="initPortalTransition(this, 'url')"
 */
window.initPortalTransition = function(cardElement, targetUrl) {
  const overlay = document.getElementById('portal-overlay');
  const image = document.getElementById('portal-image');
  const color = document.getElementById('portal-color');
  const title = document.getElementById('portal-title');

  if (!overlay || !image || !color || !title) {
    window.location.href = targetUrl;
    return;
  }

  // Hole Welt-Daten aus dem Kartenelement
  const worldImage = cardElement.dataset.worldImage;
  const worldId = cardElement.dataset.worldId;
  const worldTitle = cardElement.dataset.worldTitle;
  const worldColor = cardElement.style.getPropertyValue('--world-color') || '#F1C40F';

  // Setze Overlay-Inhalt (übersetzter Titel wenn verfügbar)
  image.src = worldImage;
  color.style.setProperty('--portal-color', worldColor);
  title.textContent = t('world.' + worldId + '.title') || worldTitle;

  // Aktiviere Animation
  overlay.classList.add('portal-overlay--active');

  // Nach Animation zur Quest-Seite navigieren
  setTimeout(() => {
    window.location.href = targetUrl;
  }, 1800);
};
