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
  { nr: '01', slug: '01-einfuehrung-ausgabe', slugEn: '01-introduction-output', i18n: 'ui.ch.01' },
  { nr: '02', slug: '02-variablen', slugEn: '02-variables-datatypes', i18n: 'ui.ch.02' },
  { nr: '03', slug: '03-operatoren', slugEn: '03-operators', i18n: 'ui.ch.03' },
  { nr: '04', slug: '04-bedingungen', slugEn: '04-conditions', i18n: 'ui.ch.04' },
  { nr: '05', slug: '05-schleifen', slugEn: '05-loops', i18n: 'ui.ch.05' },
  { nr: '06', slug: '06-arrays', slugEn: '06-arrays-lists', i18n: 'ui.ch.06' },
  { nr: '07', slug: '07-funktionen', slugEn: '07-functions', i18n: 'ui.ch.07' },
  { nr: '08', slug: '08-objekte', slugEn: '08-objects', i18n: 'ui.ch.08' },
  { nr: '09', slug: '09-dom', slugEn: '09-the-dom', i18n: 'ui.ch.09' },
  { nr: '10', slug: '10-ereignisse', slugEn: '10-events', i18n: 'ui.ch.10' },
  { nr: '11', slug: '11-formulare', slugEn: '11-forms', i18n: 'ui.ch.11' },
  { nr: '12', slug: '12-sicherheit', slugEn: '12-security', i18n: 'ui.ch.12' },
];

export const INFO_PAGES = [
  { slug: 'info', i18n: 'ui.nav.infoAbout' },
  { slug: 'vscode', i18n: 'ui.nav.vscode' },
  { slug: 'ki-grundlagen', i18n: 'ui.nav.kiBasics' },
  // Altbestand-Dateiname bleibt bis zur Neuerstellung der Seite (P9) — nicht umbenennen.
  { slug: 'biblik', i18n: 'ui.nav.library' },
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
        i18n: ch.i18n,
      })),
    },
    { id: 'exercises', url: `${BASE}/uebungen/`, i18n: 'ui.nav.exercises' },
    { id: 'final', url: `${BASE}/abschluss/`, i18n: 'ui.nav.final' },
    {
      id: 'info',
      url: `${BASE}/info.html`,
      i18n: 'ui.nav.info',
      children: [
        ...INFO_PAGES.map((p) => ({
          id: `info-${p.slug}`,
          url: `${BASE}/${p.slug}.html`,
          i18n: p.i18n,
        })),
        // Arbeitsblätter: ergänzendes Material — im Infos-Dropdown (zuletzt)
        { id: 'info-worksheets', url: `${BASE}/arbeitsblaetter/`, i18n: 'ui.nav.worksheets' },
      ],
    },
  ],
  chaptersMeta: CHAPTERS,
  infoPages: INFO_PAGES,
};
