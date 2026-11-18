/**
 * js/modules/playground.js — Playground (live-JS, Kap. 01 pre-DOM)
 *
 * User-Code läuft via new Function mit gefaktem console (log/warn/error →
 * Ausgabebereich). window/document werden als undefined gesperrt (Kap. 01
 * ist pre-DOM). Ein Run = ein Ausgabebild; Fehler werden freundlich gezeigt.
 */

import { t } from './i18n.js';

function fakeConsole(output) {
  const write = (kind, args) => {
    const line = document.createElement('span');
    line.className = `jsc-playground__line is-${kind}`;
    line.textContent = args.map((a) => {
      if (typeof a === 'object' && a !== null) {
        try {
          return JSON.stringify(a);
        } catch {
          return String(a);
        }
      }
      return String(a);
    }).join(' ');
    output.append(line);
  };
  return {
    log: (...a) => write('log', a),
    warn: (...a) => write('warn', a),
    error: (...a) => write('error', a),
  };
}

export function initPlaygrounds() {
  document.querySelectorAll('[data-component="jsc-playground"]').forEach((pg) => {
    const ta = pg.querySelector('textarea');
    const out = pg.querySelector('[data-pg-output]');
    const runBtn = pg.querySelector('[data-pg-run]');
    const resetBtn = pg.querySelector('[data-pg-reset]');
    if (!ta || !out || !runBtn) return;

    const initial = ta.value;

    runBtn.addEventListener('click', () => {
      out.textContent = '';
      try {
        // window/document abschatten: Kap. 01 kennt das DOM noch nicht.
        const fn = new Function('console', 'window', 'document', `"use strict";\n${ta.value}`);
        fn(fakeConsole(out), undefined, undefined);
      } catch (err) {
        const line = document.createElement('span');
        line.className = 'jsc-playground__line is-error';
        line.textContent = `✗ ${t('ui.pg.errorPrefix')}: ${err.message}`;
        out.append(line);
      }
      out.scrollTop = out.scrollHeight;
    });

    resetBtn?.addEventListener('click', () => {
      ta.value = initial;
      ta.focus();
    });
  });
}
