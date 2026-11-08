/**
 * js/modules/reflection.js — Reflexion (Auto-Save, debounced)
 *
 * Textareas mit [data-reflect]; Speicherung je data-storage-key + Index.
 * Fortschritts-Indikator "gespeichert" (aria-live).
 */

import { get, set } from './storage.js';
import { t, onLangChange } from './i18n.js';

const DEBOUNCE_MS = 400;

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

    const saved = get(key, []);
    areas.forEach((area, i) => {
      area.value = typeof saved[i] === 'string' ? saved[i] : '';
      area.setAttribute('aria-label', t('ui.reflect.aria'));

      let timer = null;
      area.addEventListener('input', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          const state = areas.map((a) => a.value);
          set(key, state);
          indicator.textContent = t('ui.reflect.saved');
        }, DEBOUNCE_MS);
      });
    });
  });
}
