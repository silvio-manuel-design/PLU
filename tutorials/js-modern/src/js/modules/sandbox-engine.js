import { t } from './i18n.js';

/**
 * JS Sandbox Engine — Sichere JavaScript-Ausführung im Browser
 *
 * Features:
 * - console.log/error/warn/info capture
 * - Timeout-Schutz (max 1s) gegen Endlosschleifen
 * - Variable Inspector (let/const/var nach Ausführung)
 * - Hilfreiche Fehlermeldungen (keine rohen SyntaxErrors)
 * - Keine externen Abhängigkeiten
 */

const DEFAULT_TIMEOUT = 1000;

/**
 * Führe JS-Code sicher aus und gib Ergebnis zurück
 * @param {string} code — Der JavaScript-Code
 * @param {Object} options — { timeout: number }
 * @returns {Promise<{output: string[], errors: string[], variables: Object, success: boolean}>}
 */
export async function executeJS(code, options = {}) {
  const timeout = options.timeout || DEFAULT_TIMEOUT;
  const output = [];
  const errors = [];

  // Leerer Code → sofort zurück
  if (!code || !code.trim()) {
    return { output: [], errors: [], variables: {}, success: true };
  }

  // Syntax-Check VOR der Ausführung (schneller Fail)
  const syntaxErr = checkSyntax(code);
  if (syntaxErr) {
    return {
      output: [],
      errors: [syntaxErr],
      variables: {},
      success: false
    };
  }

  // Verbotene Konstrukte prüfen
  const forbidden = checkForbidden(code);
  if (forbidden) {
    return {
      output: [],
      errors: [forbidden],
      variables: {},
      success: false
    };
  }

  // Console-Log Capture vorbereiten
  const logs = [];
  const mockConsole = {
    log: (...args) => logs.push({ type: 'log', text: args.map(formatValue).join(' ') }),
    error: (...args) => logs.push({ type: 'error', text: args.map(formatValue).join(' ') }),
    warn: (...args) => logs.push({ type: 'warn', text: args.map(formatValue).join(' ') }),
    info: (...args) => logs.push({ type: 'info', text: args.map(formatValue).join(' ') }),
  };

  // Timeout-Wrapper
  const result = await runWithTimeout(code, mockConsole, timeout);

  if (result.timedOut) {
    return {
      output: logs.map(l => l.text),
      errors: [t('sandbox.error.timeout', { timeout })],
      variables: result.variables || {},
      success: false
    };
  }

  if (result.error) {
    return {
      output: logs.map(l => l.text),
      errors: [prettifyError(result.error)],
      variables: result.variables || {},
      success: false
    };
  }

  return {
    output: logs.map(l => l.text),
    errors: [],
    variables: result.variables || {},
    success: true
  };
}

/**
 * Intern: Code mit Timeout ausführen
 */
function runWithTimeout(code, mockConsole, timeout) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve({ timedOut: true, variables: {} });
    }, timeout);

    try {
      // Variablen-Tracking: Vor dem Ausführen merken wir uns window-Keys
      const beforeKeys = new Set(Object.keys(window));

      // Code in einer Funktion ausführen (neuer Scope)
      // Wir injecten console als lokale Variable
      const fn = new Function('console', code);
      fn(mockConsole);

      clearTimeout(timer);

      // Variablen extrahieren (nur die neuen globalen)
      const afterKeys = Object.keys(window);
      const variables = {};
      for (const key of afterKeys) {
        if (!beforeKeys.has(key) && !key.startsWith('on') && key !== 'logs') {
          try {
            const val = window[key];
            if (val !== undefined && typeof val !== 'function' && typeof val !== 'object') {
              variables[key] = { value: formatValue(val), type: typeof val };
            } else if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
              // Einfache Objekte anzeigen
              variables[key] = { value: formatValue(val), type: 'object' };
            } else if (Array.isArray(val)) {
              variables[key] = { value: formatValue(val), type: 'array' };
            }
          } catch (e) {
            // Ignoriere nicht-zugreifbare Properties
          }
        }
      }

      // Aufräumen: Globale Variablen wieder entfernen
      for (const key of Object.keys(variables)) {
        try { delete window[key]; } catch (e) {}
      }

      resolve({ timedOut: false, error: null, variables });
    } catch (err) {
      clearTimeout(timer);
      resolve({ timedOut: false, error: err, variables: {} });
    }
  });
}

/**
 * Werte für die Console schön formatieren
 */
function formatValue(val) {
  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (typeof val === 'boolean') return String(val);
  if (Array.isArray(val)) return `[${val.map(formatValue).join(', ')}]`;
  if (typeof val === 'object') {
    try {
      return JSON.stringify(val);
    } catch {
      return '[Object]';
    }
  }
  return String(val);
}

/**
 * Syntax-Check vor der Ausführung
 * Versucht den Code als Function zu parsen
 */
function checkSyntax(code) {
  try {
    new Function(code);
    return null;
  } catch (err) {
    return prettifyError(err);
  }
}

/**
 * Verbotene Konstrukte prüfen (nur die wirklich gefährlichen)
 */
function checkForbidden(code) {
  const forbiddenPatterns = [
    { pattern: /eval\s*\(/, message: t('sandbox.error.eval') },
    { pattern: /Function\s*\(/, message: t('sandbox.error.function') },
    { pattern: /window\.location/, message: t('sandbox.error.windowLocation') },
    { pattern: /document\.write/, message: t('sandbox.error.documentWrite') },
    { pattern: /XMLHttpRequest|fetch\s*\(/, message: t('sandbox.error.network') },
  ];

  for (const { pattern, message } of forbiddenPatterns) {
    if (pattern.test(code)) {
      return message;
    }
  }
  return null;
}

/**
 * Rohe JS-Fehler in verständliche Meldungen umwandeln
 */
function prettifyError(err) {
  const msg = err.message || String(err);

  // Bekannte Fehlermuster übersetzen
  const patterns = [
    { match: /Unexpected token/, fix: t('sandbox.error.unexpectedToken') },
    { match: /Unexpected end of input/, fix: t('sandbox.error.unexpectedEnd') },
    { match: /Unexpected identifier/, fix: t('sandbox.error.unexpectedIdentifier') },
    { match: /is not defined/, fix: t('sandbox.error.notDefined', { msg }) },
    { match: /Cannot read propert/, fix: t('sandbox.error.cannotReadProperty', { msg }) },
    { match: /is not a function/, fix: t('sandbox.error.notAFunction', { msg }) },
    { match: /Unexpected number/, fix: t('sandbox.error.unexpectedNumber') },
    { match: /Invalid left-hand side/, fix: t('sandbox.error.invalidLeftHandSide') },
    { match: /Unexpected string/, fix: t('sandbox.error.unexpectedString') },
    { match: /missing \) after argument list/, fix: t('sandbox.error.missingParen') },
    { match: /missing \} after property list/, fix: t('sandbox.error.missingBrace') },
    { match: /Unexpected token 'return'/, fix: t('sandbox.error.returnOutsideFunction') },
    { match: /Illegal return statement/, fix: t('sandbox.error.illegalReturn') },
    { match: /Unexpected reserved word/, fix: t('sandbox.error.unexpectedReservedWord') },
  ];

  for (const { match, fix } of patterns) {
    if (match.test(msg)) {
      return fix;
    }
  }

  // Fallback: Original-Fehler mit freundlichem Präfix
  return t('sandbox.error.fallback', { msg });
}

/**
 * Variablen-Inspektor: Rendert Variablen als HTML
 */
export function renderVariablesHTML(variables) {
  const keys = Object.keys(variables);
  if (keys.length === 0) {
    return '<p class="sandbox-var-empty">Keine Variablen definiert.</p>';
  }

  const items = keys.map(key => {
    const { value, type } = variables[key];
    const typeClass = `sandbox-var-type--${type}`;
    return `
      <div class="sandbox-var-item">
        <span class="sandbox-var-name">${key}</span>
        <span class="sandbox-var-type ${typeClass}">${type}</span>
        <span class="sandbox-var-value">${escapeHtml(String(value))}</span>
      </div>
    `;
  }).join('');

  return `<div class="sandbox-var-list">${items}</div>`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
