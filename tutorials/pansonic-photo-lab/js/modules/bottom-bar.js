/**
 * Pansonic Photo Lab — Mobile Bottom Action Bar
 * Minimal icon-only thumb-zone navigation.
 * Only visible on mobile (< 768px).
 */

const MODULE_SEQUENCE = [
  'm00', 'm01', 'm02', 'm03', 'm04', 'm05',
  'm06', 'm07', 'm08', 'm09', 'm10', 'm11'
];

const MODULE_LINKS = {
  de: {
    m00: '/tutorials/pansonic-photo-lab/module/00-willkommen.html',
    m01: '/tutorials/pansonic-photo-lab/module/01-kamera-basics.html',
    m02: '/tutorials/pansonic-photo-lab/module/02-belichtung.html',
    m03: '/tutorials/pansonic-photo-lab/module/03-blende-iso.html',
    m04: '/tutorials/pansonic-photo-lab/module/04-komposition.html',
    m05: '/tutorials/pansonic-photo-lab/module/05-licht.html',
    m06: '/tutorials/pansonic-photo-lab/module/06-farbe.html',
    m07: '/tutorials/pansonic-photo-lab/module/07-portrait.html',
    m08: '/tutorials/pansonic-photo-lab/module/08-landschaft.html',
    m09: '/tutorials/pansonic-photo-lab/module/09-makro.html',
    m10: '/tutorials/pansonic-photo-lab/module/10-bearbeitung.html',
    m11: '/tutorials/pansonic-photo-lab/module/11-capstone.html'
  },
  en: {
    m00: '/tutorials/pansonic-photo-lab/module/00-welcome.html',
    m01: '/tutorials/pansonic-photo-lab/module/01-camera-basics.html',
    m02: '/tutorials/pansonic-photo-lab/module/02-exposure.html',
    m03: '/tutorials/pansonic-photo-lab/module/03-aperture-iso.html',
    m04: '/tutorials/pansonic-photo-lab/module/04-composition.html',
    m05: '/tutorials/pansonic-photo-lab/module/05-light.html',
    m06: '/tutorials/pansonic-photo-lab/module/06-color.html',
    m07: '/tutorials/pansonic-photo-lab/module/07-portrait-en.html',
    m08: '/tutorials/pansonic-photo-lab/module/08-landscape.html',
    m09: '/tutorials/pansonic-photo-lab/module/09-macro.html',
    m10: '/tutorials/pansonic-photo-lab/module/10-editing.html',
    m11: '/tutorials/pansonic-photo-lab/module/11-capstone-en.html'
  }
};

const MODULE_NAMES = {
  de: {
    m00: 'Willkommen', m01: 'Kamera', m02: 'Belichtung', m03: 'Blende',
    m04: 'Kompo', m05: 'Licht', m06: 'Farbe', m07: 'Portrait',
    m08: 'Landschaft', m09: 'Makro', m10: 'Edit', m11: 'Capstone'
  },
  en: {
    m00: 'Welcome', m01: 'Camera', m02: 'Exposure', m03: 'Aperture',
    m04: 'Compo', m05: 'Light', m06: 'Color', m07: 'Portrait',
    m08: 'Landscape', m09: 'Macro', m10: 'Edit', m11: 'Capstone'
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
    <div class="photo-bottom-bar__track">
      <a href="${prevLink || '#'}" 
         class="photo-bottom-bar__btn photo-bottom-bar__btn--back" 
         aria-label="${isEn ? 'Previous module' : 'Vorheriges Modul'}"
         ${!prevLink ? 'aria-disabled="true" tabindex="-1"' : ''}>
        <i class="ph ph-caret-left" aria-hidden="true"></i>
      </a>

      <div class="photo-bottom-bar__progress">
        <div class="photo-bottom-bar__ring" aria-label="${isEn ? 'Module progress' : 'Modul-Fortschritt'}">
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="${progressRadius}" fill="none" stroke="var(--photo-bg-elevated)" stroke-width="3"/>
            <circle cx="16" cy="16" r="${progressRadius}" fill="none" stroke="var(--module-accent, var(--photo-accent))" stroke-width="3"
              stroke-dasharray="${progressCircumference}"
              stroke-dashoffset="${progressOffset}"
              stroke-linecap="round"
              transform="rotate(-90 16 16)"/>
          </svg>
          <span class="photo-bottom-bar__ring-label">${idx + 1}</span>
        </div>
        <span class="photo-bottom-bar__name">${MODULE_NAMES[lang][moduleId]}</span>
      </div>

      <a href="${nextLink || '#'}" 
         class="photo-bottom-bar__btn ${nextLink ? 'photo-bottom-bar__btn--accent' : ''}" 
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
  document.body.classList.add('has-bottom-bar');
}
