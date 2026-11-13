/**
 * js/modules/lab-progress.js — Labs-Übersicht: Fortschrittszeile (P13)
 *
 * Zählt Labs mit allen Anforderungen abgehakt (checklist-Storage jsc-lab-XX-req).
 * Rendert [data-lab-progress]. Kein Toggle mehr — Status lebt in den Karten.
 * Aktualisierung beim Seitenaufruf (checklist-Storage feuert kein Event).
 */

import { LABS } from '../data/nav.js';
import { get } from './storage.js';

const progressEl = document.querySelector('[data-lab-progress]');

function labDone(nr) {
  const saved = get(`jsc-lab-${nr}-req`, []);
  return Array.isArray(saved) && saved.length > 0 && saved.every(Boolean);
}

if (progressEl) {
  const lang = document.documentElement.lang === 'en' ? 'en' : 'de';
  const done = LABS.filter((lab) => labDone(lab.nr)).length;
  progressEl.textContent =
    lang === 'en'
      ? `${done} of ${LABS.length} labs done`
      : `${done} von ${LABS.length} Labs erledigt`;
}
