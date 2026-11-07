/**
 * Timeline Module
 * Renders the tutorial journey as a clickable vertical timeline
 * KI Challenge — Evolution Showcase
 */

const TIMELINE_DATA = [
  {
    id: 1,
    title: 'HTML & CSS Classic',
    titleEn: 'HTML & CSS Classic',
    description: 'Die ersten Schritte: HTML-Tags, CSS-Grundlagen, erste Webseiten.',
    descriptionEn: 'First steps: HTML tags, CSS basics, first web pages.',
    icon: 'ph-globe',
    link: '/tutorials/html-css-classic/',
    keyLearning: 'Struktur ist wichtig'
  },
  {
    id: 2,
    title: 'JavaScript Classic',
    titleEn: 'JavaScript Classic',
    description: 'Erste Interaktivität: Variablen, Funktionen, DOM-Manipulation.',
    descriptionEn: 'First interactivity: Variables, functions, DOM manipulation.',
    icon: 'ph-lightning',
    link: '/tutorials/js-classic/',
    keyLearning: 'JS macht Seiten lebendig'
  },
  {
    id: 3,
    title: 'Grafik & Bild Classic',
    titleEn: 'Graphics & Image Classic',
    description: 'Bildbearbeitung: Photoshop, Vektorgrafiken, Farbtheorie.',
    descriptionEn: 'Image editing: Photoshop, vector graphics, color theory.',
    icon: 'ph-image',
    link: '/tutorials/grafik-training/',
    keyLearning: 'Bilder sagen mehr als Worte'
  },
  {
    id: 4,
    title: 'Backend Classic',
    titleEn: 'Backend Classic',
    description: 'Server-seitige Logik: PHP, Datenbanken, Formularverarbeitung.',
    descriptionEn: 'Server-side logic: PHP, databases, form processing.',
    icon: 'ph-database',
    link: '/tutorials/backend-training/',
    keyLearning: 'Daten müssen gespeichert werden'
  },
  {
    id: 5,
    title: 'Audio Classic',
    titleEn: 'Audio Classic',
    description: 'Sounddesign: Aufnahme, Bearbeitung, Podcast-Produktion.',
    descriptionEn: 'Sound design: Recording, editing, podcast production.',
    icon: 'ph-speaker-high',
    link: '/tutorials/audio-training/',
    keyLearning: 'Audio ist halb so breit wie Video'
  },
  {
    id: 6,
    title: 'Grafik Quest',
    titleEn: 'Graphics Quest',
    description: 'Modernes Design: UI/UX, Design Systems, Prototyping.',
    descriptionEn: 'Modern design: UI/UX, design systems, prototyping.',
    icon: 'ph-paint-brush',
    link: '/tutorials/grafik-modern/',
    keyLearning: 'Design ist keine Dekoration'
  },
  {
    id: 7,
    title: 'Backend Quest',
    titleEn: 'Backend Quest',
    description: 'Moderne Server-Architektur: APIs, Authentication, Security.',
    descriptionEn: 'Modern server architecture: APIs, authentication, security.',
    icon: 'ph-hard-drives',
    link: '/tutorials/backend-modern/',
    keyLearning: 'Sicherheit ist keine Option'
  },
  {
    id: 8,
    title: 'KI Academy Junior',
    titleEn: 'AI Academy Junior',
    description: 'KI für Einsteiger: Prompting, Ethik, praktische Anwendungen.',
    descriptionEn: 'AI for beginners: Prompting, ethics, practical applications.',
    icon: 'ph-student',
    link: '/tutorials/ki-academy-junior/',
    keyLearning: 'Prompting ist eine Kunst'
  },
  {
    id: 9,
    title: 'Pansonic Audio Lab',
    titleEn: 'Pansonic Audio Lab',
    description: 'Professionelles Audio: Mixing, Mastering, Sounddesign für Web.',
    descriptionEn: 'Professional audio: Mixing, mastering, sound design for web.',
    icon: 'ph-speaker-hifi',
    link: '/tutorials/pansonic-audio-lab/',
    keyLearning: 'Guter Sound braucht gute Struktur'
  },
  {
    id: 10,
    title: 'Pansonic Video Lab',
    titleEn: 'Pansonic Video Lab',
    description: 'Das Referenzprojekt: Professionelles Webdesign mit ITCSS & BEM.',
    descriptionEn: 'The reference project: Professional web design with ITCSS & BEM.',
    icon: 'ph-film-strip',
    link: '/tutorials/pansonic-video-lab/',
    keyLearning: 'Architektur skaliert'
  },
  {
    id: 11,
    title: 'KI Academy Senior',
    titleEn: 'AI Academy Senior',
    description: 'KI für Fortgeschrittene: API-Integration, Fine-Tuning, Workflows.',
    descriptionEn: 'AI for advanced: API integration, fine-tuning, workflows.',
    icon: 'ph-graduation-cap',
    link: '/tutorials/ki-academy-senior/',
    keyLearning: 'KI + Mensch = stärker'
  },
  {
    id: 12,
    title: 'KI Academy Premium',
    titleEn: 'AI Academy Premium',
    description: 'Enterprise KI: Automation, Multi-Agent-Systeme, Produktion.',
    descriptionEn: 'Enterprise AI: Automation, multi-agent systems, production.',
    icon: 'ph-crown',
    link: '/tutorials/ki-academy-premium/',
    keyLearning: 'KI skaliert nur mit Struktur'
  },
  {
    id: 13,
    title: 'Pansonic Photo Lab',
    titleEn: 'Pansonic Photo Lab',
    description: 'Professionelle Fotografie: RAW-Workflow, Lightroom, Bildkomposition.',
    descriptionEn: 'Professional photography: RAW workflow, Lightroom, image composition.',
    icon: 'ph-camera',
    link: '/tutorials/pansonic-photo-lab/',
    keyLearning: 'Das Auge fotografiert mit'
  },
  {
    id: 14,
    title: 'HTML & CSS Quest',
    titleEn: 'HTML & CSS Quest',
    description: 'Gamifiziertes Lernen: ITCSS, BEM, Mobile-First, i18n — alles vereint.',
    descriptionEn: 'Gamified learning: ITCSS, BEM, mobile-first, i18n — all united.',
    icon: 'ph-trophy',
    link: '/tutorials/html-css-quest/',
    keyLearning: 'Spaß + Struktur = Erfolg',
    highlight: true
  },
  {
    id: 15,
    title: 'JavaScript Quest',
    titleEn: 'JavaScript Quest',
    description: 'Die Krönung: Vite, ES6 Modules, Sandbox-Engine, Gamification.',
    descriptionEn: 'The crowning achievement: Vite, ES6 modules, sandbox engine, gamification.',
    icon: 'ph-rocket-launch',
    link: '/tutorials/js/',
    keyLearning: 'Moderne Tools machen den Unterschied',
    highlight: true
  },
  {
    id: 16,
    title: 'Python Classic',
    titleEn: 'Python Classic',
    description: 'Einstieg in Python: Syntax, Datenstrukturen, erste Programme.',
    descriptionEn: 'Python introduction: Syntax, data structures, first programs.',
    icon: 'ph-code',
    link: '/tutorials/python-classic/',
    keyLearning: 'Einfachheit ist mächtig'
  },
  {
    id: 17,
    title: 'Python Quest',
    titleEn: 'Python Quest',
    description: 'Fortgeschrittenes Python: OOP, APIs, Automatisierung.',
    descriptionEn: 'Advanced Python: OOP, APIs, automation.',
    icon: 'ph-terminal',
    link: '/tutorials/python/',
    keyLearning: 'Code ist Magie',
    highlight: true
  }
];

export function initTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  const isEn = document.documentElement.lang === 'en';

  container.innerHTML = TIMELINE_DATA.map((item, index) => {
    const isLeft = index % 2 === 0;
    const title = isEn ? item.titleEn : item.title;
    const desc = isEn ? item.descriptionEn : item.description;
    const highlightClass = item.highlight ? 'timeline__item--highlight' : '';
    const delayClass = `u-reveal--delay-${(index % 5) + 1}`;

    return `
      <article class="timeline__item ${highlightClass} u-reveal ${delayClass}" data-index="${index}">
        <a href="${item.link}" class="timeline__item-content ${isLeft ? '' : 'timeline__item-content--right'}" target="_blank" rel="noopener noreferrer">
          <div class="timeline__item-marker">
            <i class="ph ${item.icon}" aria-hidden="true"></i>
          </div>
          <div class="timeline__item-card">
            <h3 class="timeline__item-title">${title}</h3>
            <p class="timeline__item-desc">${desc}</p>
            <span class="timeline__item-learning">
              <i class="ph ph-lightbulb" aria-hidden="true"></i>
              ${item.keyLearning}
            </span>
            <span class="timeline__item-arrow">
              <i class="ph ph-arrow-square-out" aria-hidden="true"></i>
              <span>${isEn ? 'Open tutorial' : 'Tutorial öffnen'}</span>
            </span>
          </div>
        </a>
      </article>
    `;
  }).join('');
}
