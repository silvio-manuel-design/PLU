/**
 * Pansonic Photo Lab — Home Page Entry Point
 */

import './entry-global.js';
import { initClassroom } from './modules/classroom.js';
import { initGlobalProgress } from './modules/progress.js';
import { initGamification } from './modules/gamification.js';
import { initCarousel } from './modules/carousel.js';
import { getStorage, getStorageRaw } from './modules/storage.js';

const MODULE_MAP = {
  'm00': { name: 'Willkommen', nameEn: 'Welcome', url: '/tutorials/pansonic-photo-lab/module/00-willkommen.html', num: '00' },
  'm01': { name: 'Equipment verstehen', nameEn: 'Understanding Equipment', url: '/tutorials/pansonic-photo-lab/module/01-kamera-basics.html', num: '01' },
  'm02': { name: 'Belichtung', nameEn: 'Exposure', url: '/tutorials/pansonic-photo-lab/module/02-belichtung.html', num: '02' },
  'm03': { name: 'Blende & ISO', nameEn: 'Aperture & ISO', url: '/tutorials/pansonic-photo-lab/module/03-blende-iso.html', num: '03' },
  'm04': { name: 'Komposition', nameEn: 'Composition', url: '/tutorials/pansonic-photo-lab/module/04-komposition.html', num: '04' },
  'm05': { name: 'Licht', nameEn: 'Light', url: '/tutorials/pansonic-photo-lab/module/05-licht.html', num: '05' },
  'm06': { name: 'Farbe', nameEn: 'Color', url: '/tutorials/pansonic-photo-lab/module/06-farbe.html', num: '06' },
  'm07': { name: 'Portrait', nameEn: 'Portrait', url: '/tutorials/pansonic-photo-lab/module/07-portrait.html', num: '07' },
  'm08': { name: 'Landschaft', nameEn: 'Landscape', url: '/tutorials/pansonic-photo-lab/module/08-landschaft.html', num: '08' },
  'm09': { name: 'Makro', nameEn: 'Macro', url: '/tutorials/pansonic-photo-lab/module/09-makro.html', num: '09' },
  'm10': { name: 'Bearbeitung', nameEn: 'Editing', url: '/tutorials/pansonic-photo-lab/module/10-bearbeitung.html', num: '10' },
  'm11': { name: 'Capstone', nameEn: 'Capstone', url: '/tutorials/pansonic-photo-lab/module/11-capstone.html', num: '11' }
};

function initWelcomeBack() {
  const heroContent = document.getElementById('hero-content');
  if (!heroContent) return;

  const stored = getStorageRaw('pansonic-module-progress');
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

  if (completedCount === 0 && !currentModule) {
    heroContent.classList.add('is-hero-ready');
    return;
  }

  const isEn = document.documentElement.lang === 'en';

  if (!currentModule) {
    heroContent.innerHTML = `
      <div class="photo-hero__badge">
        <i class="ph ph-trophy" aria-hidden="true"></i>
        <span>${isEn ? 'You completed all modules!' : 'Du hast alle Module abgeschlossen!'}</span>
      </div>
      <h1 class="photo-hero__title">
        ${isEn ? 'Congratulations,' : 'Herzlichen Glückwunsch,'} <span class="u-text-gradient">${isEn ? 'Photographer' : 'Fotograf'}</span>
      </h1>
      <p class="photo-hero__subtitle">
        ${isEn ? 'You have completed all 12 modules — from camera basics to the perfect edit.' : 'Du hast alle 12 Module durchlaufen — von den Grundlagen bis zur perfekten Bearbeitung.'}
      </p>
      <div class="photo-hero__actions">
        <a href="${MODULE_MAP['m11'].url}" class="photo-btn photo-btn--primary">
          <i class="ph ph-camera" aria-hidden="true"></i> ${isEn ? 'View Capstone' : 'Capstone ansehen'}
        </a>
      </div>
    `;
    heroContent.classList.add('is-hero-ready');
    return;
  }

  const welcomeText = isEn ? 'Welcome back!' : 'Willkommen zurück!';
  const continueText = isEn ? 'Continue your journey' : 'Mach da weiter, wo du aufgehört hast';
  const subtitleText = isEn
    ? `You're at <strong>Module ${currentModule.num} — ${currentModule.nameEn}</strong>. Pick up right where you left off.`
    : `Du bist bei <strong>Modul ${currentModule.num} — ${currentModule.name}</strong>. Mach direkt da weiter, wo du aufgehört hast.`;
  const btnText = isEn ? 'Continue learning' : 'Weiterlernen';
  const overviewText = isEn ? 'All modules' : 'Alle Module';
  const nextStepText = isEn ? 'Recommended next step' : 'Empfohlener nächster Schritt';

  heroContent.innerHTML = `
    <div class="photo-hero__badge">
      <i class="ph ph-hand-waving" aria-hidden="true"></i>
      <span>${welcomeText}</span>
    </div>
    <h1 class="photo-hero__title">${continueText}</h1>
    <p class="photo-hero__subtitle">${subtitleText}</p>
    <div class="photo-hero__actions">
      <a href="${currentModule.url}" class="photo-btn photo-btn--primary">
        <i class="ph ph-arrow-right" aria-hidden="true"></i> ${btnText}
      </a>
      <a href="#modules" class="photo-btn photo-btn--secondary">${overviewText}</a>
    </div>
    <div class="photo-hero__tags">
      <span class="photo-hero__tag photo-hero__tag--highlight"><span class="photo-hero__tag-dot photo-hero__tag-dot--gold"></span>${nextStepText}: Modul ${currentModule.num}</span>
      <span class="photo-hero__tag"><span class="photo-hero__tag-dot photo-hero__tag-dot--teal"></span>${completedCount}/12 ${isEn ? 'completed' : 'abgeschlossen'}</span>
    </div>
  `;
  heroContent.classList.add('is-hero-ready');

  collapseCompletedModules(progress, moduleIds);
}

function collapseCompletedModules(progress, moduleIds) {
  const cards = document.querySelectorAll('.photo-module-card');
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
    if (!nextInterval) continue;

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

  const title = isEn ? 'Time to review!' : 'Zeit zur Wiederholung!';
  const body = isEn
    ? `You completed <strong>${mostUrgent.meta.nameEn}</strong> ${mostUrgent.days} days ago. Research shows that reviewing after ${mostUrgent.nextInterval} days boosts long-term retention by 70%.`
    : `Du hast <strong>${mostUrgent.meta.name}</strong> vor ${mostUrgent.days} Tagen abgeschlossen. Studien zeigen, dass Wiederholung nach ${mostUrgent.nextInterval} Tagen die Langzeitretention um 70% erhöht.`;
  const cta = isEn ? 'Review module' : 'Modul wiederholen';

  container.className = 'photo-spaced-banner';
  container.innerHTML = `
    <div class="photo-spaced-banner__icon">
      <i class="ph ph-clock-counter-clockwise" aria-hidden="true"></i>
    </div>
    <div class="photo-spaced-banner__content">
      <span class="photo-spaced-banner__title">${title}</span>
      <p class="photo-spaced-banner__text">${body}</p>
    </div>
    <a href="${mostUrgent.meta.url}" class="photo-btn photo-btn--secondary photo-spaced-banner__btn">${cta}</a>
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

function initProgressDashboard() {
  const bar = document.querySelector('.photo-progress-dashboard__bar');
  const achievement = document.querySelector('.photo-progress-dashboard__achievement');
  if (!bar) return;

  const progress = getStorage('pansonic-module-progress', {});
  const moduleIds = Object.keys(MODULE_MAP);
  let completedCount = 0;

  for (const id of moduleIds) {
    if (progress[`${id}_done`]) completedCount++;
  }

  const percent = (completedCount / 12) * 100;
  bar.style.width = `${percent}%`;

  // Update dots
  moduleIds.forEach((id, index) => {
    const dot = document.querySelector(`.photo-progress-dot[data-module="${id}"]`);
    if (dot && progress[`${id}_done`]) {
      dot.classList.add('is-completed');
    }
  });

  // Update counter text
  const meta = document.querySelector('.photo-progress-dashboard__meta');
  if (meta) {
    const isEn = document.documentElement.lang === 'en';
    meta.innerHTML = `<strong>${completedCount}/12</strong> ${isEn ? 'modules completed' : 'Module abgeschlossen'}`;
  }

  // Show achievement if all done
  if (achievement) {
    achievement.style.display = completedCount === 12 ? 'flex' : 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initClassroom();
  initWelcomeBack();
  initSpacedRepetition();
  initGoalBox();
  initProgressDashboard();
  initGlobalProgress();
  initGamification();
  initCarousel();
});
