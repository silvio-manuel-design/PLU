/**
 * Pansonic Photo Lab — Cross-Module Connection Boxes
 * Shows contextual links to prerequisite modules.
 */

const CONNECTIONS = {
  'm03': { from: 'm01', reason: { de: 'Blende & ISO brauchen solide Kamera-Grundlagen', en: 'Aperture & ISO need solid camera fundamentals' } },
  'm04': { from: 'm02', reason: { de: 'Gute Komposition setzt Belichtungsverständnis voraus', en: 'Good composition builds on exposure knowledge' } },
  'm05': { from: 'm02', reason: { de: 'Lichtgestaltung ist Belichtung in der Praxis', en: 'Lighting design is exposure in practice' } },
  'm06': { from: 'm04', reason: { de: 'Farbgestaltung profitiert von kompositorischem Grundverständnis', en: 'Color design benefits from compositional basics' } },
  'm07': { from: 'm05', reason: { de: 'Porträt profitiert vom sicheren Umgang mit Licht', en: 'Portrait benefits from confident light handling' } },
  'm08': { from: 'm02', reason: { de: 'Landschaft braucht sichere Belichtungstechnik', en: 'Landscape needs solid exposure technique' } },
  'm09': { from: 'm03', reason: { de: 'Makro setzt präzise Blenden- und ISO-Kenntnisse voraus', en: 'Macro requires precise aperture and ISO knowledge' } },
  'm10': { from: 'm06', reason: { de: 'Bildbearbeitung beschleunigt den Farb-Workflow erheblich', en: 'Editing significantly speeds up the color workflow' } },
  'm11': { from: 'm10', reason: { de: 'Das Capstone-Projekt setzt solide Bearbeitungskenntnisse voraus', en: 'The capstone project requires solid editing skills' } },
};

const MODULE_META = {
  'm00': { name: { de: 'Willkommen', en: 'Welcome' }, url: '/tutorials/pansonic-photo-lab/module/00-willkommen.html' },
  'm01': { name: { de: 'Kamera-Basics', en: 'Camera Basics' }, url: '/tutorials/pansonic-photo-lab/module/01-kamera-basics.html' },
  'm02': { name: { de: 'Belichtung', en: 'Exposure' }, url: '/tutorials/pansonic-photo-lab/module/02-belichtung.html' },
  'm03': { name: { de: 'Blende & ISO', en: 'Aperture & ISO' }, url: '/tutorials/pansonic-photo-lab/module/03-blende-iso.html' },
  'm04': { name: { de: 'Komposition', en: 'Composition' }, url: '/tutorials/pansonic-photo-lab/module/04-komposition.html' },
  'm05': { name: { de: 'Licht', en: 'Light' }, url: '/tutorials/pansonic-photo-lab/module/05-licht.html' },
  'm06': { name: { de: 'Farbe', en: 'Color' }, url: '/tutorials/pansonic-photo-lab/module/06-farbe.html' },
  'm07': { name: { de: 'Porträt', en: 'Portrait' }, url: '/tutorials/pansonic-photo-lab/module/07-portrait.html' },
  'm08': { name: { de: 'Landschaft', en: 'Landscape' }, url: '/tutorials/pansonic-photo-lab/module/08-landschaft.html' },
  'm09': { name: { de: 'Makro', en: 'Macro' }, url: '/tutorials/pansonic-photo-lab/module/09-makro.html' },
  'm10': { name: { de: 'Bearbeitung', en: 'Editing' }, url: '/tutorials/pansonic-photo-lab/module/10-bearbeitung.html' },
  'm11': { name: { de: 'Capstone', en: 'Capstone' }, url: '/tutorials/pansonic-photo-lab/module/11-capstone.html' },
};

function getModuleId() {
  const bodyId = document.body.dataset.module;
  if (bodyId) return bodyId;
  const match = window.location.pathname.match(/module\/(\d+)[-\w]*/);
  if (match) return `m${match[1]}`;
  return null;
}

export function initConnections() {
  const moduleId = getModuleId();
  if (!moduleId || !CONNECTIONS[moduleId]) return;

  const isEn = document.documentElement.lang === 'en';
  const lang = isEn ? 'en' : 'de';
  const conn = CONNECTIONS[moduleId];
  const fromMeta = MODULE_META[conn.from];
  if (!fromMeta) return;

  const main = document.querySelector('main');
  if (!main) return;

  const sections = main.querySelectorAll('.photo-content-section');
  if (sections.length < 2) return;

  // Insert after the first content section
  const targetSection = sections[1];

  const box = document.createElement('div');
  box.className = 'photo-connection-box';
  box.innerHTML = `
    <div class="photo-connection-box__icon">
      <i class="ph ph-link" aria-hidden="true"></i>
    </div>
    <div class="photo-connection-box__content">
      <span class="photo-connection-box__label">${isEn ? 'Connection' : 'Verknüpfung'}</span>
      <p class="photo-connection-box__text">${conn.reason[lang]} — <a href="${fromMeta.url}">${isEn ? 'Review' : 'Wiederhole'} ${fromMeta.name[lang]}</a></p>
    </div>
  `;

  targetSection.parentNode.insertBefore(box, targetSection);
}
