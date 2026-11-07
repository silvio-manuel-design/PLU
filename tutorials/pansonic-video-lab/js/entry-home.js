/**
 * Pansonic Video Lab — Home Page Entry Point
 */

import './entry-global.js';
import { initTrackCallouts, initGlobalProgress } from './modules/progress.js';
import { initTrackSelector } from './modules/track-selector.js';
import { initGamification } from './modules/gamification.js';
import { getStorage, setStorage, getStorageRaw, setStorageRaw, removeStorage } from './modules/storage.js';

const MODULE_MAP = {
  'm00': { name: 'Willkommen', url: '/tutorials/pansonic-video-lab/module/00-willkommen.html', num: '00' },
  'm01': { name: 'Kamera-Basics', url: '/tutorials/pansonic-video-lab/module/01-kamera-basics.html', num: '01' },
  'm02': { name: 'Licht', url: '/tutorials/pansonic-video-lab/module/02-licht.html', num: '02' },
  'm03': { name: 'Komposition', url: '/tutorials/pansonic-video-lab/module/03-komposition.html', num: '03' },
  'm04': { name: 'Schnitt', url: '/tutorials/pansonic-video-lab/module/04-schnitt.html', num: '04' },
  'm05': { name: 'Farbkorrektur', url: '/tutorials/pansonic-video-lab/module/05-farbkorrektur.html', num: '05' },
  'm06': { name: 'Audio & Sound', url: '/tutorials/pansonic-video-lab/module/06-audio-sound.html', num: '06' },
  'm07': { name: 'Motion Graphics', url: '/tutorials/pansonic-video-lab/module/07-motion-graphics.html', num: '07' },
  'm08': { name: 'KI-Workflows', url: '/tutorials/pansonic-video-lab/module/08-ki-workflows.html', num: '08' },
  'm09': { name: 'Export', url: '/tutorials/pansonic-video-lab/module/09-export.html', num: '09' },
  'm10': { name: 'Storytelling', url: '/tutorials/pansonic-video-lab/module/10-storytelling.html', num: '10' },
  'm11': { name: 'Capstone', url: '/tutorials/pansonic-video-lab/module/11-capstone.html', num: '11' }
};

function initWelcomeBack() {
  const heroContent = document.getElementById('hero-content');
  if (!heroContent) return;

  const stored = getStorageRaw('pansonic-module-progress');

  // No stored progress — show default hero for new visitors
  if (!stored) {
    heroContent.classList.add('is-hero-ready');
    return;
  }

  let progress = {};
  try {
    progress = JSON.parse(stored);
  } catch (e) {
    heroContent.classList.add('is-hero-ready');
    return;
  }

  const moduleIds = Object.keys(MODULE_MAP);
  let currentModule = null;
  let completedCount = 0;

  for (const id of moduleIds) {
    if (progress[`${id}_done`]) {
      completedCount++;
    } else if (!currentModule) {
      currentModule = MODULE_MAP[id];
    }
  }

  // No real progress yet — show default hero
  if (completedCount === 0 && !currentModule) {
    heroContent.classList.add('is-hero-ready');
    return;
  }

  // All modules completed — show congratulations
  if (!currentModule) {
    heroContent.innerHTML = `
      <div class="video-hero__badge">
        <i class="ph ph-trophy" aria-hidden="true"></i>
        <span>Du hast alle Module abgeschlossen!</span>
      </div>
      <h1 class="video-heading-xl video-hero__title">
        Herzlichen Glückwunsch, <span class="video-text-gradient">Regisseur</span>
      </h1>
      <p class="video-body-lg video-hero__subtitle">
        Du hast alle 12 Module durchlaufen — von der ersten Aufnahme bis zum fertigen Film.
        Zeit, dein Capstone-Projekt der Welt zu zeigen.
      </p>
      <div class="video-hero__actions">
        <a href="${MODULE_MAP['m11'].url}" class="video-btn video-btn--primary">
          <i class="ph ph-film-strip" aria-hidden="true"></i> Capstone ansehen
        </a>
        <a href="/tutorials/pansonic-video-lab/pages/player.html" target="_blank" class="video-btn video-btn--secondary">
          <i class="ph ph-play-circle" aria-hidden="true"></i> Zum Player
        </a>
      </div>
    `;
    heroContent.classList.add('is-hero-ready');
    return;
  }

  // Show welcome back with current module
  const isEn = document.documentElement.lang === 'en';
  const welcomeText = isEn ? 'Welcome back!' : 'Willkommen zurück!';
  const continueText = isEn ? 'Continue your journey' : 'Mach da weiter, wo du aufgehört hast';
  const subtitleText = isEn
    ? `You're at <strong>Module ${currentModule.num} — ${currentModule.name}</strong>. Pick up right where you left off.`
    : `Du bist bei <strong>Modul ${currentModule.num} — ${currentModule.name}</strong>. Mach direkt da weiter, wo du aufgehört hast.`;
  const btnText = isEn ? 'Continue learning' : 'Weiterlernen';
  const overviewText = isEn ? 'All modules' : 'Alle Module';

  const nextStepText = isEn ? 'Recommended next step' : 'Empfohlener nächster Schritt';

  heroContent.innerHTML = `
    <div class="video-hero__badge">
      <i class="ph ph-hand-waving" aria-hidden="true"></i>
      <span>${welcomeText}</span>
    </div>
    <h1 class="video-heading-xl video-hero__title">
      ${continueText}
    </h1>
    <p class="video-body-lg video-hero__subtitle">
      ${subtitleText}
    </p>
    <div class="video-hero__actions">
      <a href="${currentModule.url}" class="video-btn video-btn--primary">
        <i class="ph ph-arrow-right" aria-hidden="true"></i> ${btnText}
      </a>
      <a href="#kapitel" class="video-btn video-btn--secondary">
        ${overviewText}
      </a>
    </div>
    <div class="video-hero__tags">
      <span class="video-hero__tag video-hero__tag--highlight"><span class="video-hero__tag-dot video-hero__tag-dot--gold"></span>${nextStepText}: Modul ${currentModule.num}</span>
      <span class="video-hero__tag"><span class="video-hero__tag-dot video-hero__tag-dot--teal"></span>${completedCount}/12 ${isEn ? 'completed' : 'abgeschlossen'}</span>
    </div>
  `;
  heroContent.classList.add('is-hero-ready');

  // Collapse completed module cards on the homepage
  collapseCompletedModules(progress, moduleIds);
}

function collapseCompletedModules(progress, moduleIds) {
  const cards = document.querySelectorAll('.video-module-card');
  if (!cards.length) return;

  cards.forEach((card, index) => {
    const moduleId = moduleIds[index];
    if (moduleId && progress[`${moduleId}_done`]) {
      card.classList.add('is-collapsed');
    }
  });
}

function getDaysSince(dateString) {
  if (!dateString) return Infinity;
  const completed = new Date(dateString);
  const now = new Date();
  const diffMs = now - completed;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

function initSpacedRepetition() {
  const container = document.getElementById('spacedRepetitionBanner');
  if (!container) return;

  const isEn = document.documentElement.lang === 'en';
  const progress = getStorage('pansonic-module-progress', {});
  const intervals = [1, 3, 7, 14, 30];

  let mostUrgent = null;
  let minGap = Infinity;

  for (const [id, meta] of Object.entries(MODULE_MAP)) {
    const completedAt = progress[`${id}_completedAt`];
    if (!completedAt) continue;

    const days = getDaysSince(completedAt);
    const completedCount = intervals.filter(d => days >= d).length;
    const nextInterval = intervals[completedCount];
    if (!nextInterval) continue; // all intervals done

    const gap = nextInterval - days;
    if (gap < minGap) {
      minGap = gap;
      mostUrgent = { id, meta, days, nextInterval, gap };
    }
  }

  if (!mostUrgent || mostUrgent.gap > 2) {
    container.style.display = 'none';
    return;
  }

  const lang = isEn ? 'en' : 'de';
  const title = isEn ? 'Time to review!' : 'Zeit zur Wiederholung!';
  const body = isEn
    ? `You completed <strong>${mostUrgent.meta.name}</strong> ${mostUrgent.days} days ago. Research shows that reviewing after ${mostUrgent.nextInterval} days boosts long-term retention by 70%.`
    : `Du hast <strong>${mostUrgent.meta.name}</strong> vor ${mostUrgent.days} Tagen abgeschlossen. Studien zeigen, dass Wiederholung nach ${mostUrgent.nextInterval} Tagen die Langzeitretention um 70% erhöht.`;
  const cta = isEn ? 'Review module' : 'Modul wiederholen';

  container.className = 'video-spaced-banner';
  container.innerHTML = `
    <div class="video-spaced-banner__icon">
      <i class="ph ph-clock-counter-clockwise" aria-hidden="true"></i>
    </div>
    <div class="video-spaced-banner__content">
      <span class="video-spaced-banner__title">${title}</span>
      <p class="video-spaced-banner__text">${body}</p>
    </div>
    <a href="${mostUrgent.meta.url}" class="video-btn video-btn--secondary video-spaced-banner__btn">${cta}</a>
  `;
}

function initGoalBox() {
  const goalTarget = document.getElementById('goalTarget');
  if (!goalTarget) return;

  const isEn = document.documentElement.lang === 'en';
  const progress = getStorage('pansonic-module-progress', {});

  const moduleIds = Object.keys(MODULE_MAP);
  let completedCount = 0;
  let allDone = true;

  for (const id of moduleIds) {
    if (progress[`${id}_done`]) {
      completedCount++;
    } else {
      allDone = false;
    }
  }

  let goalText;
  if (allDone) {
    goalText = isEn
      ? "Show your capstone project to the world"
      : "Zeig dein Capstone-Projekt der Welt";
  } else if (completedCount === 0) {
    goalText = isEn
      ? "Start your first module"
      : "Starte dein erstes Modul";
  } else {
    goalText = isEn
      ? "Complete 1 module today"
      : "Schließ heute 1 Modul ab";
  }

  goalTarget.textContent = goalText;
}

document.addEventListener('DOMContentLoaded', () => {
  initWelcomeBack();
  initSpacedRepetition();
  initGoalBox();
  initTrackCallouts();
  initTrackSelector();
  initGlobalProgress();
  initGamification();
});
