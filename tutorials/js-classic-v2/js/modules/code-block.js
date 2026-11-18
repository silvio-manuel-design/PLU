/**
 * js/modules/code-block.js — Kopieren-Button für jsc-code-block
 *
 * Kopiert den Code in die Zwischenablage; Erfolg via aria-live („Kopiert!").
 */

import { t, onLangChange } from './i18n.js';

export function initCodeBlocks() {
  document.querySelectorAll('.jsc-code-block').forEach((block) => {
    const btn = block.querySelector('[data-copy]');
    const code = block.querySelector('code');
    const pre = block.querySelector('pre');
    if (!btn || !code) return;

    // Scrollbarer Code per Tastatur erreichbar (axe: scrollable-region-focusable)
    if (pre) pre.setAttribute('tabindex', '0');

    let live = block.querySelector('[data-copy-live]');
    if (!live) {
      live = document.createElement('span');
      live.className = 'jsc-code-block__live';
      live.dataset.copyLive = '';
      live.setAttribute('aria-live', 'polite');
      btn.after(live);
    }

    const original = () => t('ui.common.copy');
    const setLabel = () => {
      btn.textContent = original();
    };
    btn.textContent = original();
    onLangChange(setLabel);

    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent);
        btn.textContent = t('ui.common.copied');
        live.textContent = t('ui.common.copied');
        setTimeout(() => {
          btn.textContent = original();
          live.textContent = '';
        }, 1500);
      } catch {
        btn.textContent = original();
      }
    });
  });
}
