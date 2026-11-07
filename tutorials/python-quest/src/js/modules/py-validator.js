/**
 * PYTHON QUEST — Python Code Validator
 * Statische Analyse vor Ausführung
 */

import { t } from './i18n.js';

export function validatePython(code) {
  const problems = [];
  const lines = code.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;
    
    // Vergessener Doppelpunkt nach Kontrollstrukturen
    if (/^\s*(if|elif|else|for|while|def|class|try|except|finally|with)\b/.test(line)) {
      const trimmed = line.trim();
      if (!trimmed.endsWith(':') && !trimmed.endsWith('\\')) {
        // Ausnahme: else, elif, except, finally brauchen Doppelpunkt
        if (/^\s*(if|elif|for|while|def|class|try|except|finally|with)\b/.test(line) && 
            !/^\s*else\s*if\b/.test(line)) {
          problems.push({
            line: lineNum,
            severity: 'error',
            message: t('validator.colonMissing', { keyword: trimmed.split(/\s/)[0] })
          });
        }
      }
    }
    
    // Vergessene Klammern bei print (Python 2-Stil)
    if (/\bprint\s+[^(]/.test(line) && !line.trim().startsWith('#')) {
      problems.push({
        line: lineNum,
        severity: 'error',
        message: t('validator.printNeedsParens')
      });
    }
    
    // == vs = in Zuweisungen
    if (/\bif\b.*==\s*=/.test(line)) {
      problems.push({
        line: lineNum,
        severity: 'warning',
        message: t('validator.compareVsAssign')
      });
    }
    
    // Einrückung prüfen (gemischte Tabs/Spaces)
    if (/^\t+ +/.test(line) || /^ +\t+/.test(line)) {
      problems.push({
        line: lineNum,
        severity: 'warning',
        message: t('validator.mixedTabsSpaces')
      });
    }
    
    // Leerzeichen am Zeilenende
    if (/\s+$/.test(line) && line.trim().length > 0) {
      problems.push({
        line: lineNum,
        severity: 'info',
        message: t('validator.trailingWhitespace')
      });
    }
    
    // Vergessene Anführungszeichen bei Strings (heuristisch)
    const stringMatches = line.match(/['"]/g) || [];
    if (stringMatches.length % 2 !== 0 && !line.trim().startsWith('#')) {
      // Prüfe ob es ein Docstring oder kommentierter Code ist
      if (!line.includes('"""') && !line.includes("'''")) {
        problems.push({
          line: lineNum,
          severity: 'warning',
          message: t('validator.unclosedString')
        });
      }
    }
  }
  
  // Klammer-Balance über den gesamten Code
  const brackets = { '(': ')', '[': ']', '{': '}' };
  const stack = [];
  
  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    if (brackets[char]) {
      stack.push({ char, pos: i });
    } else if (Object.values(brackets).includes(char)) {
      if (stack.length === 0) {
        problems.push({
          line: code.substring(0, i).split('\n').length,
          severity: 'error',
          message: t('validator.extraClosingBracket', { bracket: char })
        });
      } else {
        stack.pop();
      }
    }
  }
  
  if (stack.length > 0) {
    for (const unclosed of stack) {
      problems.push({
        line: code.substring(0, unclosed.pos).split('\n').length,
        severity: 'error',
        message: t('validator.unclosedBracket', { bracket: unclosed.char })
      });
    }
  }
  
  return problems.sort((a, b) => a.line - b.line);
}

/**
 * Formatiert Fehler für die Anzeige
 */
export function formatValidationProblems(problems) {
  if (problems.length === 0) return '';
  
  const icons = { error: 'ph-circle', warning: 'ph-circle-half', info: 'ph-circle-dashed' };
  const colors = { error: '#ef4444', warning: '#f97316', info: '#3b82f6' };
  
  return problems.map(p => 
    `<div style="color: ${colors[p.severity]}; font-size: 0.75rem; margin-bottom: 2px; display: flex; align-items: center; gap: 4px;">
      <i class="ph ${icons[p.severity]}" style="font-size: 0.625rem; flex-shrink: 0;"></i>
      <span>${t('validator.line')} ${p.line}: ${p.message}</span>
    </div>`
  ).join('');
}
