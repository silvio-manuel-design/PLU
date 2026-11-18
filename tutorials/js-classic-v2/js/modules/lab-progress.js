/**
 * js/modules/lab-progress.js — Übersichts-Fortschrittszeile (P13)
 *
 * Zählt auf Labs-Seiten Labs mit allen Anforderungen abgehakt
 * (checklist-Storage jsc-lab-XX-req). Auf der Kapitel-Übersicht
 * (Seite mit data-list="chapters"-Grid) zählt es abgeschlossene Kapitel
 * (progress.js isDone). Rendert [data-lab-progress].
 */

import { CHAPTERS, LABS } from '../data/nav.js';
import { get } from './storage.js';
import { isDone } from './progress.js';

const progressEl = document.querySelector('[data-lab-progress]');

function labDone(nr) {
  const saved = get(`jsc-lab-${nr}-req`, []);
  return Array.isArray(saved) && saved.length > 0 && saved.every(Boolean);
}

if (progressEl) {
  const lang = document.documentElement.lang === 'en' ? 'en' : 'de';
  const chapterMode = Boolean(
    document.querySelector('[data-component="jsc-lcard-grid"][data-list="chapters"]')
  );
  if (chapterMode) {
    const done = CHAPTERS.filter((ch) => isDone(ch.nr)).length;
    progressEl.textContent =
      lang === 'en'
        ? `${done} of ${CHAPTERS.length} chapters done`
        : `${done} von ${CHAPTERS.length} Kapiteln abgeschlossen`;
  } else {
    const done = LABS.filter((lab) => labDone(lab.nr)).length;
    progressEl.textContent =
      lang === 'en'
        ? `${done} of ${LABS.length} labs done`
        : `${done} von ${LABS.length} Labs erledigt`;
  }
}
