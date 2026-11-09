/**
 * js/modules/reflection.js — Reflexion (Auto-Save + sanfter Cheat-Schutz)
 *
 * - Auto-Save der Textareas [data-reflect] (debounced), Indikator „gespeichert".
 * - Mindestlänge 40 Zeichen + Anti-Trivial-Check (P5): nichts wird gesperrt —
 *   das System mahnt freundlich (role-Status unter dem Feld) und dokumentiert
 *   den Stand per Status-Chip. Tippen bleibt frei, Auto-Save bleibt aktiv.
 */

import { get, set } from './storage.js';
import { t, onLangChange } from './i18n.js';

const DEBOUNCE_MS = 400;
const MIN_LEN = 40;

const TRIVIAL = new Set([
  'keine ahnung',
  'ka',
  'nix',
  'nichts',
  'kp',
  'weiß nicht',
  'weiss nicht',
  'nothing',
  'no idea',
  'idk',
  '.',
]);

/** Bestimmt, ob eine Reflexionsantwort als „ausgefüllt" gilt (Export + Chip). */
export function isReflectionOk(text) {
  const s = (text || '').trim();
  if (s.length < MIN_LEN) return false;
  if (TRIVIAL.has(s.toLowerCase())) return false;
  if (/^(.)\1+$/.test(s)) return false; // gleiches Zeichen wiederholt
  return true;
}

function validate(item, { announce }) {
  const area = item.querySelector('textarea');
  const chip = item.querySelector('.jsc-reflection__chip');
  const hint = item.querySelector('.jsc-reflection__hint');
  const ok = isReflectionOk(area.value);

  // Status-Chip
  chip.textContent = ok ? t('ui.reflect.chipDone') : t('ui.reflect.chipOpen');
  chip.classList.toggle('is-done', ok);

  // Hinweis (sanft, role-Status — kein alert)
  const s = area.value.trim();
  let message = '';
  if (!ok && s.length > 0) {
    if (s.length < MIN_LEN) {
      message = t('ui.reflect.minHint').replace('%d', String(s.length));
    } else {
      message = t('ui.reflect.trivial');
    }
  }
  area.setAttribute('aria-invalid', String(!ok && s.length > 0));
  if (announce || hint.textContent) {
    hint.textContent = message;
  }
}

export function initReflection() {
  document.querySelectorAll('[data-component="jsc-reflection"]').forEach((section) => {
    const key = section.dataset.storageKey || 'reflection';
    const areas = [...section.querySelectorAll('textarea[data-reflect]')];
    if (!areas.length) return;

    let indicator = section.querySelector('[data-reflect-saved]');
    if (!indicator) {
      indicator = document.createElement('p');
      indicator.className = 'jsc-reflection__saved';
      indicator.dataset.reflectSaved = '';
      indicator.setAttribute('aria-live', 'polite');
      section.append(indicator);
    }
    const syncLabel = () => (indicator.textContent = '');
    onLangChange(syncLabel);

    // Chips + Hinweise je Feld
    section.querySelectorAll('.jsc-reflection__item').forEach((item) => {
      if (!item.querySelector('.jsc-reflection__chip')) {
        const chip = document.createElement('span');
        chip.className = 'jsc-reflection__chip';
        chip.textContent = t('ui.reflect.chipOpen');
        item.querySelector('span')?.after(chip);
      }
      if (!item.querySelector('.jsc-reflection__hint')) {
        const hint = document.createElement('span');
        hint.className = 'jsc-reflection__hint';
        hint.setAttribute('role', 'status');
        item.append(hint);
      }
    });

    const saved = get(key, []);
    areas.forEach((area, i) => {
      area.value = typeof saved[i] === 'string' ? saved[i] : '';
      area.setAttribute('aria-label', t('ui.reflect.aria'));
      const item = area.closest('.jsc-reflection__item');
      validate(item, { announce: false });

      let timer = null;
      area.addEventListener('input', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          const state = areas.map((a) => a.value);
          set(key, state);
          indicator.textContent = t('ui.reflect.saved');
          validate(item, { announce: false });
        }, DEBOUNCE_MS);
      });

      area.addEventListener('blur', () => {
        validate(item, { announce: true });
      });
    });

    onLangChange(() => {
      section.querySelectorAll('.jsc-reflection__item').forEach((item) => validate(item, { announce: false }));
    });
  });
}
