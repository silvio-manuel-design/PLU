/**
 * js/modules/classroom.js — Klassenraum-Modus (P9R1, B12)
 *
 * Für Smart-Displays mit 10–12 m Leseabstand: skaliert die Seite auf
 * 130 % (html.is-classroom, css/08-modes/classroom.css).
 *
 * - Toggle: Footer-Button [data-classroom-toggle] (Event-Delegation,
 *   überlebt Chrome-Re-Render bei Sprachwechsel) + Tastatur Shift+C
 * - Persistenz: localStorage `plu-classroom` (Page-Load setzt Klasse)
 * - Sync: `plu:classroom`-Event + i18n-Labels via Dictionary
 */

import { t, onLangChange } from './i18n.js';

const STORAGE_KEY = 'plu-classroom';
const EVENT = 'plu:classroom';

function isClassroom() {
  return localStorage.getItem(STORAGE_KEY) === 'true';
}

function apply(state) {
  document.documentElement.classList.toggle('is-classroom', state);
  localStorage.setItem(STORAGE_KEY, String(state));
  document.querySelectorAll('[data-classroom-toggle]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(state));
    btn.title = state ? t('ui.classroom.off') : t('ui.classroom.title');
    btn.setAttribute('aria-label', state ? t('ui.classroom.off') : t('ui.classroom.title'));
  });
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { state } }));
}

function toggle() {
  apply(!isClassroom());
}

export function initClassroom() {
  // Delegation: funktioniert auch nach Chrome-Neu-Render (Sprachwechsel)
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-classroom-toggle]')) toggle();
  });

  // Tastatur-Kürzel Shift+C (nicht in Eingabefeldern)
  document.addEventListener('keydown', (e) => {
    if (e.shiftKey && (e.key === 'C' || e.key === 'c') && !e.target.closest('input, textarea, select, [contenteditable]')) {
      e.preventDefault();
      toggle();
    }
  });

  // Persistenter Zustand beim Laden
  apply(isClassroom());

  // Nach Sprachwechsel (Chrome wird neu gerendert): Zustand erneut anwenden
  onLangChange(() => apply(isClassroom()));
}
