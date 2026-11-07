/**
 * Pansonic Video Lab — Cross-Module Connection Boxes
 * Shows contextual links to prerequisite modules.
 */

const CONNECTIONS = {
  'm03': { from: 'm01', reason: { de: 'Bildgestaltung braucht solide Kamera-Grundlagen', en: 'Composition needs solid camera fundamentals' } },
  'm04': { from: 'm03', reason: { de: 'Gute Schnitte setzen starke Komposition voraus', en: 'Good editing builds on strong composition' } },
  'm05': { from: 'm02', reason: { de: 'Farbkorrektur ist Lichtverständnis in der Postproduktion', en: 'Color grading is lighting knowledge in post' } },
  'm06': { from: 'm04', reason: { de: 'Audio-Post braucht das rhythmische Gefühl vom Schnitt', en: 'Audio post needs the rhythmic sense from editing' } },
  'm10': { from: 'm07', reason: { de: 'Visuelle Erzählung profitiert von Motion Graphics', en: 'Visual storytelling benefits from motion graphics' } },
  'm09': { from: 'm08', reason: { de: 'KI-Workflows beschleunigen den Export erheblich', en: 'AI workflows significantly speed up export' } },
};

const MODULE_META = {
  'm00': { name: { de: 'Willkommen', en: 'Welcome' }, url: '/tutorials/pansonic-video-lab/module/00-willkommen.html' },
  'm01': { name: { de: 'Kamera-Basics', en: 'Camera Basics' }, url: '/tutorials/pansonic-video-lab/module/01-kamera-basics.html' },
  'm02': { name: { de: 'Licht', en: 'Light' }, url: '/tutorials/pansonic-video-lab/module/02-licht.html' },
  'm03': { name: { de: 'Komposition', en: 'Composition' }, url: '/tutorials/pansonic-video-lab/module/03-komposition.html' },
  'm04': { name: { de: 'Schnitt', en: 'Editing' }, url: '/tutorials/pansonic-video-lab/module/04-schnitt.html' },
  'm05': { name: { de: 'Farbkorrektur', en: 'Color Grading' }, url: '/tutorials/pansonic-video-lab/module/05-farbkorrektur.html' },
  'm06': { name: { de: 'Audio & Sound', en: 'Audio & Sound' }, url: '/tutorials/pansonic-video-lab/module/06-audio.html' },
  'm07': { name: { de: 'Motion Graphics', en: 'Motion Graphics' }, url: '/tutorials/pansonic-video-lab/module/07-motion.html' },
  'm08': { name: { de: 'KI-Workflows', en: 'AI Workflows' }, url: '/tutorials/pansonic-video-lab/module/08-ki-workflows.html' },
  'm09': { name: { de: 'Export', en: 'Export' }, url: '/tutorials/pansonic-video-lab/module/09-export.html' },
  'm10': { name: { de: 'Storytelling', en: 'Storytelling' }, url: '/tutorials/pansonic-video-lab/module/10-storytelling.html' },
  'm11': { name: { de: 'Capstone', en: 'Capstone' }, url: '/tutorials/pansonic-video-lab/module/11-capstone.html' },
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

  const sections = main.querySelectorAll('.video-content-section');
  if (sections.length < 2) return;

  // Insert after the first content section
  const targetSection = sections[1];

  const box = document.createElement('div');
  box.className = 'video-connection-box';
  box.innerHTML = `
    <div class="video-connection-box__icon">
      <i class="ph ph-link" aria-hidden="true"></i>
    </div>
    <div class="video-connection-box__content">
      <span class="video-connection-box__label">${isEn ? 'Connection' : 'Verknüpfung'}</span>
      <p class="video-connection-box__text">${conn.reason[lang]} — <a href="${fromMeta.url}">${isEn ? 'Review' : 'Wiederhole'} ${fromMeta.name[lang]}</a></p>
    </div>
  `;

  targetSection.parentNode.insertBefore(box, targetSection);
}
