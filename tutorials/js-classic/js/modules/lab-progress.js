/**
 * js/modules/lab-progress.js — Übungen: Erledigt-Toggle + Fortschrittszeile (P10)
 *
 * Nur auf uebungen/index.html / index-en.html geladen.
 * Zustand je Lab in localStorage (`jsc-lab-01-done` … "1" / entfernt).
 * Autoren-sprachig: Button-Texte via data-label-on/off (Default DE),
 * Fortschrittszeile nach authored <html lang>. Kein Dict, keine Imports.
 * Bei localStorage-Fehler (Privacy-Modus) schaltet das Modul still ab —
 * die Seite bleibt voll nutzbar.
 */

const toggles = [...document.querySelectorAll('[data-lab-toggle]')];
const progressEl = document.querySelector('[data-lab-progress]');

if (toggles.length) {
  const lang = document.documentElement.lang === 'en' ? 'en' : 'de';
  const TPL = {
    de: (n, total) => `${n} von ${total} Übungen erledigt`,
    en: (n, total) => `${n} of ${total} exercises done`,
  };

  let storage = null;
  try {
    storage = window.localStorage;
    const probe = '__jsc-lab-probe__';
    storage.setItem(probe, '1');
    storage.removeItem(probe);
  } catch {
    storage = null;
  }

  const doneKey = (lab) => `jsc-lab-${lab}-done`;
  const isDone = (lab) => (storage ? storage.getItem(doneKey(lab)) === '1' : false);

  const paint = (btn, done) => {
    btn.setAttribute('aria-pressed', done ? 'true' : 'false');
    const on = btn.dataset.labelOn || 'Erledigt ✓';
    const off = btn.dataset.labelOff || 'Erledigt';
    btn.textContent = done ? on : off;
  };

  const paintProgress = () => {
    if (!progressEl) return;
    const total = toggles.length;
    const done = toggles.filter((b) => b.getAttribute('aria-pressed') === 'true').length;
    progressEl.textContent = TPL[lang](done, total);
  };

  if (storage) {
    const setDone = (lab, done) => {
      if (done) storage.setItem(doneKey(lab), '1');
      else storage.removeItem(doneKey(lab));
    };

    toggles.forEach((btn) => {
      const lab = btn.dataset.labToggle;
      paint(btn, isDone(lab));
      btn.addEventListener('click', () => {
        const next = btn.getAttribute('aria-pressed') !== 'true';
        setDone(lab, next);
        paint(btn, next);
        paintProgress();
      });
    });
  }

  paintProgress();
}
