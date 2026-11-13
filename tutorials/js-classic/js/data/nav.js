/**
 * js/data/nav.js — zentrale Navigationsdatenquelle (js-classic 2.0)
 *
 * EINZIGE Quelle für Header-Nav, Bottom-Bar und Kapitel-Sequenz.
 * Behebt den Altbestand-Befund „Header in 25+ Dateien dupliziert":
 * JS rendert künftig alles aus dieser Datenstruktur.
 *
 * URLs sind root-relative und zeigen auf den BESTEHENDEN Altbestand
 * (Kapitel-URLs bleiben stabil, Schul-Lesezeichen bleiben gültig).
 * Labels kommen ausschließlich aus den i18n-Dictionaries (Keys unten),
 * es gibt keine Hardcoded-Strings im Chrome.
 *
 * chaptersMeta liefert gleichzeitig die Prev/Next-Logik der Bottom-Bar:
 * Reihenfolge = Kurssequenz; erster Schritt ohne Prev, letzter ohne Next.
 */

export const CHAPTERS = [
  { nr: '01', slug: '01-einfuehrung-ausgabe', slugEn: '01-introduction-output', i18n: 'ui.ch.01', img: 'chapters/kap01/jsc-kap01-hero-v3' },
  { nr: '02', slug: '02-variablen', slugEn: '02-variables-datatypes', i18n: 'ui.ch.02', img: 'chapters/kap02/jsc-kap02-hero-v2' },
  { nr: '03', slug: '03-operatoren', slugEn: '03-operators', i18n: 'ui.ch.03', img: 'chapters/kap03/jsc-kap03-hero-v1' },
  { nr: '04', slug: '04-bedingungen', slugEn: '04-conditions', i18n: 'ui.ch.04', img: 'chapters/kap04/jsc-kap04-hero-v2' },
  { nr: '05', slug: '05-schleifen', slugEn: '05-loops', i18n: 'ui.ch.05', img: 'chapters/kap05/jsc-kap05-hero-v4' },
  { nr: '06', slug: '06-arrays', slugEn: '06-arrays-lists', i18n: 'ui.ch.06', img: 'chapters/kap06/jsc-kap06-hero-v3' },
  { nr: '07', slug: '07-funktionen', slugEn: '07-functions', i18n: 'ui.ch.07', img: 'chapters/kap07/jsc-kap07-hero-v4' },
  { nr: '08', slug: '08-objekte', slugEn: '08-objects', i18n: 'ui.ch.08', img: 'chapters/kap08/jsc-kap08-hero-v1' },
  { nr: '09', slug: '09-dom', slugEn: '09-the-dom', i18n: 'ui.ch.09', img: 'chapters/kap09/jsc-kap09-hero-v4' },
  { nr: '10', slug: '10-ereignisse', slugEn: '10-events', i18n: 'ui.ch.10', img: 'chapters/kap10/jsc-kap10-hero-v4' },
  { nr: '11', slug: '11-formulare', slugEn: '11-forms', i18n: 'ui.ch.11', img: 'chapters/kap11/jsc-kap11-hero-v2' },
  { nr: '12', slug: '12-sicherheit', slugEn: '12-security', i18n: 'ui.ch.12', img: 'chapters/kap12/jsc-kap12-hero-v2' },
];

export const LABS = [
  { nr: '01', slug: 'lab-01-ausgabe', slugEn: 'lab-01-ausgabe-en', i18n: 'ui.lab.01', mins: '30', img: 'labs/lab01/jsc-lab01-hero-v1' },
  { nr: '02', slug: 'lab-02-steckbrief', slugEn: 'lab-02-steckbrief-en', i18n: 'ui.lab.02', mins: '30', img: 'labs/lab02/jsc-lab02-hero-v1' },
  { nr: '03', slug: 'lab-03-warenkorb', slugEn: 'lab-03-warenkorb-en', i18n: 'ui.lab.03', mins: '30', img: 'labs/lab03/jsc-lab03-hero-v1' },
  { nr: '04', slug: 'lab-04-noten', slugEn: 'lab-04-noten-en', i18n: 'ui.lab.04', mins: '30', img: 'labs/lab04/jsc-lab04-hero-v1' },
  { nr: '05', slug: 'lab-05-countdown', slugEn: 'lab-05-countdown-en', i18n: 'ui.lab.05', mins: '30', img: 'labs/lab05/jsc-lab05-hero-v1' },
  { nr: '06', slug: 'lab-06-einkaufsliste', slugEn: 'lab-06-einkaufsliste-en', i18n: 'ui.lab.06', mins: '30', img: 'labs/lab06/jsc-lab06-hero-v1' },
  { nr: '07', slug: 'lab-07-umrechner', slugEn: 'lab-07-umrechner-en', i18n: 'ui.lab.07', mins: '30', img: 'labs/lab07/jsc-lab07-hero-v1' },
  { nr: '08', slug: 'lab-08-mediathek', slugEn: 'lab-08-mediathek-en', i18n: 'ui.lab.08', mins: '30', img: 'labs/lab08/jsc-lab08-hero-v1' },
  { nr: '09', slug: 'lab-09-klickzaehler', slugEn: 'lab-09-klickzaehler-en', i18n: 'ui.lab.09', mins: '30', img: 'labs/lab09/jsc-lab09-hero-v1' },
  { nr: '10', slug: 'lab-10-reaktion', slugEn: 'lab-10-reaktion-en', i18n: 'ui.lab.10', mins: '30', img: 'labs/lab10/jsc-lab10-hero-v1' },
  { nr: '11', slug: 'lab-11-anmeldung', slugEn: 'lab-11-anmeldung-en', i18n: 'ui.lab.11', mins: '30', img: 'labs/lab11/jsc-lab11-hero-v1' },
  { nr: '12', slug: 'lab-12-xss-labor', slugEn: 'lab-12-xss-labor-en', i18n: 'ui.lab.12', mins: '40', img: 'labs/lab12/jsc-lab12-hero-v1' },
];

export const INFO_PAGES = [
  { slug: 'info', i18n: 'ui.nav.infoAbout' },
  { slug: 'vscode', i18n: 'ui.nav.vscode' },
  { slug: 'github', i18n: 'ui.nav.github' },
  { slug: 'ki-grundlagen', i18n: 'ui.nav.kiBasics' },
  { slug: 'bibliothek', i18n: 'ui.nav.library' },
  // P9: Arbeitsblätter als echte Seite (ersetzt den Ordner-Index)
  { slug: 'arbeitsblaetter', i18n: 'ui.nav.worksheets' },
];

export const FINAL_PROJECTS = [
  { slug: 'todo-liste', i18n: 'ui.proj.todo' },
  { slug: 'noten', i18n: 'ui.proj.noten' },
  { slug: 'quiz', i18n: 'ui.proj.quiz' },
];

const BASE = '/tutorials/js-classic';

export const NAV = {
  main: [
    { id: 'home', url: `${BASE}/`, i18n: 'ui.nav.home' },
    {
      id: 'chapters',
      url: `${BASE}/kapitel/01-einfuehrung-ausgabe.html`,
      i18n: 'ui.nav.chapters',
      children: CHAPTERS.map((ch) => ({
        id: `ch-${ch.nr}`,
        url: `${BASE}/kapitel/${ch.slug}.html`,
        urlEn: `${BASE}/kapitel/${ch.slugEn}.html`,
        nr: ch.nr,
        i18n: ch.i18n,
      })),
    },
    // P9: Lexikon als 6. Top-Punkt (nach Kapitel, vor Übungen)
    { id: 'lexikon', url: `${BASE}/lexikon.html`, i18n: 'ui.nav.lexikon' },
    // P12: JS-Labs als Dropdown (D2) — Übersicht + 12 Labs aus LABS
    {
      id: 'labs',
      url: `${BASE}/uebungen/`,
      i18n: 'ui.nav.exercises',
      children: [
        { id: 'labs-overview', url: `${BASE}/uebungen/`, urlEn: `${BASE}/uebungen/index-en.html`, i18n: 'ui.nav.labsOverview' },
        ...LABS.map((lab) => ({
          id: `lab-${lab.nr}`,
          url: `${BASE}/uebungen/${lab.slug}.html`,
          urlEn: `${BASE}/uebungen/${lab.slugEn}.html`,
          nr: lab.nr,
          i18n: lab.i18n,
        })),
      ],
    },
    { id: 'final', url: `${BASE}/projekte/`, i18n: 'ui.nav.final' },
    {
      id: 'info',
      url: `${BASE}/info.html`,
      i18n: 'ui.nav.info',
      children: INFO_PAGES.map((p) => ({
        id: `info-${p.slug}`,
        url: `${BASE}/${p.slug}.html`,
        i18n: p.i18n,
      })),
    },
  ],
  chaptersMeta: CHAPTERS,
  infoPages: INFO_PAGES,
};
