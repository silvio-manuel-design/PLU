import { t } from './i18n.js';

/**
 * Sandbox Validator — JavaScript-Fehlererkennung für den Code-Editor
 * Prüft Syntax, Klammern, Anführungszeichen, Semikolons
 * Keine externen Abhängigkeiten
 */

/**
 * Prüft JavaScript-Code auf häufige Fehler
 * @param {string} code — Der JS-Code aus der Sandbox
 * @returns {Array<{line: number, type: 'error'|'warning', message: string}>}
 */
export function validateJS(code) {
  const errors = [];
  if (!code || !code.trim()) return errors;

  const lines = code.split('\n');

  // 1. Klammer-Balance (runde, eckige, geschweifte)
  checkBrackets(code, errors);

  // 2. Anführungszeichen-Balance pro Zeile
  checkQuotes(lines, errors);

  // 3. Häufige Anfänger-Fehler
  checkCommonMistakes(lines, errors);

  // 4. Syntax-Check (versuche als Function zu parsen)
  checkSyntaxError(code, errors);

  // 5. Vergessene Semikolons (Warnung, kein Fehler)
  checkMissingSemicolons(lines, errors);

  return errors;
}

/**
 * Prüft Klammer-Balance im gesamten Code
 */
function checkBrackets(code, errors) {
  const pairs = { '(': ')', '[': ']', '{': '}' };
  const closing = new Set(Object.values(pairs));
  const stack = [];
  let lineNum = 1;

  for (let i = 0; i < code.length; i++) {
    const ch = code[i];
    if (ch === '\n') { lineNum++; continue; }

    // In Strings ignorieren
    if (isInString(code, i)) continue;

    if (pairs[ch]) {
      stack.push({ char: ch, line: lineNum });
    } else if (closing.has(ch)) {
      const last = stack.pop();
      if (!last || pairs[last.char] !== ch) {
        errors.push({
          line: lineNum,
          type: 'error',
          message: t('sandbox.error.bracketMismatch', { ch })
        });
      }
    }
  }

  // Nicht geschlossene Klammern
  for (const item of stack) {
    errors.push({
      line: item.line,
      type: 'error',
      message: t('sandbox.error.bracketUnclosed', { char: item.char, line: item.line, expected: pairs[item.char] })
    });
  }
}

/**
 * Prüft, ob ein Index innerhalb eines Strings liegt
 */
function isInString(code, index) {
  let inString = false;
  let stringChar = null;
  for (let i = 0; i < index; i++) {
    if (code[i] === '\\') { i++; continue; }
    if (!inString && (code[i] === '"' || code[i] === "'" || code[i] === '`')) {
      inString = true;
      stringChar = code[i];
    } else if (inString && code[i] === stringChar) {
      inString = false;
      stringChar = null;
    }
  }
  return inString;
}

/**
 * Prüft Anführungszeichen-Balance pro Zeile
 */
function checkQuotes(lines, errors) {
  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    ['"', "'", '`'].forEach(quote => {
      // Einfacher Count (escaped ignorieren)
      let count = 0;
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '\\') { i++; continue; }
        if (line[i] === quote) count++;
      }
      if (count % 2 !== 0) {
        errors.push({
          line: lineNum,
          type: 'error',
          message: t('sandbox.error.quoteMismatch', { quote })
        });
      }
    });
  });
}

/**
 * Häufige Anfänger-Fehler
 */
function checkCommonMistakes(lines, errors) {
  const mistakes = [
    { pattern: /\blet\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*==\s*/, msg: t('sandbox.warning.letAssignment') },
    { pattern: /\bconst\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*==\s*/, msg: t('sandbox.warning.constAssignment') },
    { pattern: /\bvar\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*==\s*/, msg: t('sandbox.warning.varAssignment') },
    { pattern: /\bconsole\.log\s*[^(]/, msg: t('sandbox.warning.consoleLogNoParens') },
    { pattern: /\bif\s*\([^)]*\)\s*[^\s{]/, msg: t('sandbox.warning.ifNoBraces') },
    { pattern: /\bfor\s*\([^)]*\)\s*[^\s{]/, msg: t('sandbox.warning.forNoBraces') },
    { pattern: /\bwhile\s*\([^)]*\)\s*[^\s{]/, msg: t('sandbox.warning.whileNoBraces') },
    { pattern: /\bfunction\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\([^)]*\)\s*[^\s{]/, msg: t('sandbox.warning.functionNoBraces') },
    { pattern: /\belse\s+if\b/, msg: t('sandbox.warning.elseIf') },
  ];

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    for (const { pattern, msg } of mistakes) {
      // Ignoriere Kommentare
      const codePart = line.replace(/\/\/.*$/, '');
      if (pattern.test(codePart)) {
        errors.push({ line: lineNum, type: 'warning', message: msg });
      }
    }
  });
}

/**
 * Versucht den Code als Function zu parsen
 */
function checkSyntaxError(code, errors) {
  try {
    new Function(code);
  } catch (err) {
    const msg = err.message || '';
    const match = msg.match(/unexpected token/i) ? 'Syntax-Fehler' :
                  msg.match(/is not defined/i) ? 'Variable nicht definiert' :
                  msg.match(/unexpected end/i) ? 'Code unvollständig' :
                  'Syntax-Fehler';
    errors.push({
      line: 1,
      type: 'error',
      message: t('sandbox.error.syntaxTip', { msg })
    });
  }
}

/**
 * Prüft auf vergessene Semikolons (nur Warnung)
 */
function checkMissingSemicolons(lines, errors) {
  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    const trimmed = line.trim();

    // Ignoriere leere Zeilen, Kommentare, Klammern
    if (!trimmed || trimmed.startsWith('//')) return;
    if (trimmed === '{' || trimmed === '}') return;
    if (trimmed.startsWith('if ') || trimmed.startsWith('for ') || trimmed.startsWith('while ')) return;
    if (trimmed.startsWith('function ') || trimmed.startsWith('}')) return;
    if (trimmed.endsWith('{') || trimmed.endsWith('}')) return;
    if (trimmed.endsWith(';')) return;
    if (trimmed.endsWith(',')) return;

    // Nur Warnung bei Statements, die eigentlich ein Semikolon brauchen
    const needsSemi = /^(let|const|var|return|break|continue|console\.)|[^=]=[^=]/.test(trimmed);
    if (needsSemi) {
      errors.push({
        line: lineNum,
        type: 'warning',
        message: t('sandbox.warning.missingSemicolon')
      });
    }
  });
}
