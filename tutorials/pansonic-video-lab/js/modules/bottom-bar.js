/**
 * Pansonic Video Lab — Mobile Bottom Action Bar
 * Minimal icon-only navigation for thumb-zone accessibility.
 * Only visible on mobile (< 768px).
 */

const MODULE_SEQUENCE = [
  'm00', 'm01', 'm02', 'm03', 'm04', 'm05',
  'm06', 'm07', 'm08', 'm09', 'm10', 'm11'
];

const MODULE_LINKS = {
  de: {
    m00: '/tutorials/pansonic-video-lab/module/00-willkommen.html',
    m01: '/tutorials/pansonic-video-lab/module/01-kamera-basics.html',
    m02: '/tutorials/pansonic-video-lab/module/02-licht.html',
    m03: '/tutorials/pansonic-video-lab/module/03-komposition.html',
    m04: '/tutorials/pansonic-video-lab/module/04-schnitt.html',
    m05: '/tutorials/pansonic-video-lab/module/05-farbkorrektur.html',
    m06: '/tutorials/pansonic-video-lab/module/06-audio-sound.html',
    m07: '/tutorials/pansonic-video-lab/module/07-motion-graphics.html',
    m08: '/tutorials/pansonic-video-lab/module/08-ki-workflows.html',
    m09: '/tutorials/pansonic-video-lab/module/09-export.html',
    m10: '/tutorials/pansonic-video-lab/module/10-storytelling.html',
    m11: '/tutorials/pansonic-video-lab/module/11-capstone.html'
  },
  en: {
    m00: '/tutorials/pansonic-video-lab/module/00-welcome.html',
    m01: '/tutorials/pansonic-video-lab/module/01-camera-basics.html',
    m02: '/tutorials/pansonic-video-lab/module/02-light.html',
    m03: '/tutorials/pansonic-video-lab/module/03-composition.html',
    m04: '/tutorials/pansonic-video-lab/module/04-editing.html',
    m05: '/tutorials/pansonic-video-lab/module/05-color.html',
    m06: '/tutorials/pansonic-video-lab/module/06-audio.html',
    m07: '/tutorials/pansonic-video-lab/module/07-motion.html',
    m08: '/tutorials/pansonic-video-lab/module/08-ai-workflows.html',
    m09: '/tutorials/pansonic-video-lab/module/09-export-en.html',
    m10: '/tutorials/pansonic-video-lab/module/10-storytelling-en.html',
    m11: '/tutorials/pansonic-video-lab/module/11-capstone-en.html'
  }
};

const MODULE_NAMES = {
  de: {
    m00: 'Willkommen', m01: 'Kamera', m02: 'Licht', m03: 'Komposition',
    m04: 'Schnitt', m05: 'Farbe', m06: 'Audio', m07: 'Motion',
    m08: 'KI', m09: 'Export', m10: 'Story', m11: 'Capstone'
  },
  en: {
    m00: 'Welcome', m01: 'Camera', m02: 'Light', m03: 'Composition',
    m04: 'Editing', m05: 'Color', m06: 'Audio', m07: 'Motion',
    m08: 'AI', m09: 'Export', m10: 'Story', m11: 'Capstone'
  }
};

function getModuleId() {
  const bodyAttr = document.body.getAttribute('data-module');
  if (bodyAttr) return bodyAttr;
  const match = window.location.pathname.match(/module\/(\d+)[-\w]*/);
  if (match) return `m${match[1].padStart(2, '0')}`;
  return 'm00';
}

function getPrevNext(moduleId) {
  const idx = MODULE_SEQUENCE.indexOf(moduleId);
  return {
    prev: idx > 0 ? MODULE_SEQUENCE[idx - 1] : null,
    next: idx < MODULE_SEQUENCE.length - 1 ? MODULE_SEQUENCE[idx + 1] : null,
    idx,
    total: MODULE_SEQUENCE.length
  };
}

function createBottomBar(moduleId) {
  const isEn = document.documentElement.lang === 'en';
  const lang = isEn ? 'en' : 'de';
  const { prev, next, idx, total } = getPrevNext(moduleId);

  const prevLink = prev ? MODULE_LINKS[lang][prev] : null;
  const nextLink = next ? MODULE_LINKS[lang][next] : null;

  // Progress ring SVG
  const progressRadius = 14;
  const progressCircumference = 2 * Math.PI * progressRadius;
  const progressOffset = progressCircumference - ((idx + 1) / total) * progressCircumference;

  return `
    <div class="video-bottom-bar__track">
      <a href="${prevLink || '#'}" 
         class="video-bottom-bar__btn video-bottom-bar__btn--back" 
         aria-label="${isEn ? 'Previous module' : 'Vorheriges Modul'}"
         ${!prevLink ? 'aria-disabled="true" tabindex="-1"' : ''}>
        <i class="ph ph-caret-left" aria-hidden="true"></i>
      </a>

      <div class="video-bottom-bar__progress">
        <div class="video-bottom-bar__ring" aria-label="${isEn ? 'Module progress' : 'Modul-Fortschritt'}">
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="${progressRadius}" fill="none" stroke="var(--video-bg-elevated)" stroke-width="3"/>
            <circle cx="16" cy="16" r="${progressRadius}" fill="none" stroke="var(--module-accent, var(--video-accent-teal))" stroke-width="3"
              stroke-dasharray="${progressCircumference}"
              stroke-dashoffset="${progressOffset}"
              stroke-linecap="round"
              transform="rotate(-90 16 16)"/>
          </svg>
          <span class="video-bottom-bar__ring-label">${idx + 1}</span>
        </div>
        <span class="video-bottom-bar__name">${MODULE_NAMES[lang][moduleId]}</span>
      </div>

      <a href="${nextLink || '#'}" 
         class="video-bottom-bar__btn video-bottom-bar__btn--icon ${nextLink ? 'video-bottom-bar__btn--accent' : ''}" 
         aria-label="${isEn ? 'Next module' : 'Nächstes Modul'}"
         ${!nextLink ? 'aria-disabled="true" tabindex="-1"' : ''}>
        <i class="ph ph-caret-right" aria-hidden="true"></i>
      </a>
    </div>
  `;
}

export function initBottomBar() {
  const container = document.getElementById('mobileBottomBar');
  if (!container) return;

  const moduleId = getModuleId();
  container.innerHTML = createBottomBar(moduleId);
}
