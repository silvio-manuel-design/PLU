/**
 * js/modules/solution-gate.js — Lösung erst nach Versuch (sanfte Reihung)
 *
 * Kein Zwang: Bereich ist per hidden-Attribut verborgen (Progressive
 * Enhancement), Button blendet ein/aus mit aria-expanded. Reduced Motion
 * respektiert (CSS-Animation).
 */

import { t, onLangChange } from './i18n.js';

export function initSolutionGates() {
  document.querySelectorAll('[data-component="jsc-solution-gate"]').forEach((gate) => {
    const btn = gate.querySelector('[data-sol-toggle]');
    const body = gate.querySelector('.jsc-solution-gate__body');
    if (!btn || !body) return;

    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = t('ui.sol.show');

    btn.addEventListener('click', () => {
      const open = body.hidden;
      body.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = t(open ? 'ui.sol.hide' : 'ui.sol.show');
    });

    onLangChange(() => {
      btn.textContent = t(body.hidden ? 'ui.sol.show' : 'ui.sol.hide');
    });
  });
}
