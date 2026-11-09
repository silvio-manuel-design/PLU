/**
 * js/modules/checklist.js — Kapitel-Checkliste (successCriteria)
 *
 * Persistiert Häkchen (storage.js, Key aus data-storage-key). Bei Vollständigkeit:
 * progress.markDone(data-chapter) → plu:progress-Event + Erfolgs-Banner.
 * Liste bleibt ohne JS valides HTML (Progressive Enhancement).
 */

import { get, set } from './storage.js';
import { t } from './i18n.js';
import { markDone } from './progress.js';

export function initChecklist() {
  document.querySelectorAll('[data-component="jsc-checklist"]').forEach((list) => {
    const key = list.dataset.storageKey || 'checklist';
    const chapter = list.dataset.chapter;
    const boxes = [...list.querySelectorAll('input[type="checkbox"]')];
    if (!boxes.length) return;

    const saved = get(key, []);
    boxes.forEach((box, i) => {
      box.checked = Boolean(saved[i]);
    });

    // Banner + Zähler (ins HTML einhängen, wenn nicht vorhanden)
    let counter = list.parentElement?.querySelector('[data-check-counter]');
    if (!counter) {
      counter = document.createElement('p');
      counter.className = 'jsc-checklist__counter';
      counter.dataset.checkCounter = '';
      counter.setAttribute('aria-live', 'polite');
      list.before(counter);
    }
    let banner = list.parentElement?.querySelector('[data-check-banner]');
    if (!banner) {
      banner = document.createElement('p');
      banner.className = 'jsc-checklist__banner';
      banner.dataset.checkBanner = '';
      banner.setAttribute('role', 'status');
      banner.hidden = true;
      list.after(banner);
    }

    function refresh() {
      const done = boxes.filter((b) => b.checked).length;
      counter.textContent = t('ui.check.progress').replace('%d', String(done)).replace('%d', String(boxes.length));
      const complete = done === boxes.length;
      banner.textContent = complete ? t('ui.check.done') : '';
      banner.hidden = !complete;
      if (complete && chapter) markDone(chapter);
    }

    boxes.forEach((box, i) => {
      box.addEventListener('change', () => {
        const state = boxes.map((b) => b.checked);
        set(key, state);
        refresh();
      });
    });

    refresh();
  });
}
