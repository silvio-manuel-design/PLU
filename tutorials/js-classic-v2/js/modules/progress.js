/**
 * js/modules/progress.js — Kapitel-Fortschritt (localStorage, verbindliches Schema)
 *
 * Schema (PROJEKT.md „Fortschritt & Speicher-Schema"):
 *   localStorage-Key `jsc-progress` (via storage.js, Präfix jsc-), JSON:
 *   { "chapters": { "01": true, … } }
 *
 * API: isDone(nr) · markDone(nr) · unmarkDone(nr) · doneCount()
 * Jede Änderung feuert `window.dispatchEvent(new CustomEvent("plu:progress"))`.
 * Setzt KEIN documentElement lang/dir — das ist allein Sache der i18n-Engine.
 */

import { get, set } from './storage.js';

const KEY = 'progress';

function readState() {
  const state = get(KEY, { chapters: {} });
  if (state && typeof state === 'object' && state.chapters && typeof state.chapters === 'object') {
    return state;
  }
  return { chapters: {} };
}

function write(state) {
  set(KEY, state);
  window.dispatchEvent(new CustomEvent('plu:progress'));
}

export function isDone(nr) {
  return Boolean(readState().chapters[String(nr)]);
}

export function markDone(nr) {
  const state = readState();
  state.chapters[String(nr)] = true;
  write(state);
}

export function unmarkDone(nr) {
  const state = readState();
  delete state.chapters[String(nr)];
  write(state);
}

export function doneCount() {
  return Object.values(readState().chapters).filter(Boolean).length;
}
