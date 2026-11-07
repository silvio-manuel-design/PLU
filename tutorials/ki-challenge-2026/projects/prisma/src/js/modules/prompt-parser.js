/**
 * PRISMA — Prompt Parser
 * Verbessert schlechte Prompts zu guten Prompts
 *
 * TODO: Implementiere den Prompt Parser
 * Anforderungen:
 * 1. Eingabe: Ein schlechter/vager Prompt
 * 2. Ausgabe: Ein verbesserter, strukturierter Prompt
 * 3. Nutze Regeln/Regeln-Engine (nicht echte KI)
 * 4. Zeige vorher/nachher Vergleich
 * 5. Erkläre, WAS verbessert wurde und WARUM
 * 6. Füge häufige Prompt-Muster als Buttons hinzu
 *
 * KI-Prompt-Tipp:
 * "Erstelle einen Prompt-Optimizer mit Regel-Engine.
 *  Erkenne schwache Prompt-Muster und ersetze sie durch starke.
 *  Zeige vorher/nachher mit Erklärungen."
 */

/**
 * Regeln zur Prompt-Verbesserung
 * Jede Regel hat: pattern (Regex), replacement, explanation
 * @type {Array<{pattern: RegExp, replacement: string, explanation: string}>}
 */
const PROMPT_RULES = [
  // TODO: Füge mindestens 10 Regeln hinzu
  // Beispiel:
  // {
  //   pattern: /\b(make|create|do)\b/gi,
  //   replacement: 'Erstelle',
  //   explanation: 'Verwende präzise Verben statt allgemeiner Begriffe.'
  // },
  // {
  //   pattern: /\bgood\b/gi,
  //   replacement: 'professionelles, responsives',
  //   explanation: '"Gut" ist zu vage. Spezifiziere Qualitätsmerkmale.'
  // },
];

/**
 * Verbessert einen Prompt basierend auf den Regeln
 * @param {string} input - Der ursprüngliche Prompt
 * @returns {{original: string, improved: string, changes: Array<{before: string, after: string, why: string}>}}
 */
export function optimizePrompt(input) {
  // TODO: Implementiere Prompt-Optimierung
  // 1. Iteriere über alle PROMPT_RULES
  // 2. Wende jede passende Regel an
  // 3. Dokumentiere die Änderungen
  // 4. Rückgabe: Original, Improved, Changes-Array

  console.log('[TODO] optimizePrompt() muss implementiert werden');
  return {
    original: input,
    improved: input,
    changes: []
  };
}

/**
 * Rendert das Ergebnis in den Container
 * @param {Object} result - Ergebnis von optimizePrompt()
 * @param {string} containerSelector - Selector für den Container
 */
export function renderResult(result, containerSelector = '#prompt-result') {
  // TODO: Implementiere Ergebnis-Rendering
  // Zeige:
  // 1. Original-Prompt (durchgestrichen oder ausgegraut)
  // 2. Verbesserter Prompt (hervorgehoben)
  // 3. Liste der Änderungen (mit Erklärungen)
  // 4. Copy-to-Clipboard Button
}

/**
 * Fügt dem verbesserten Prompt einen Kontext-Header hinzu
 * @param {string} prompt - Der verbesserte Prompt
 * @returns {string} Prompt mit Kontext
 */
function addContextHeader(prompt) {
  // TODO: Implementiere Kontext-Header
  // Füge am Anfang hinzu:
  // "Ich arbeite an einem Webprojekt mit ITCSS/BEM-Architektur.
  //  Nutze .challenge-* Klassen, semantisches HTML und Mobile-First.
  //  [hier der verbesserte Prompt]"
}

/**
 * Vordefinierte Prompt-Vorlagen (als Buttons)
 * @type {Array<{label: string, prompt: string}>}
 */
export const PROMPT_TEMPLATES = [
  // TODO: Füge 5–8 nützliche Prompt-Vorlagen hinzu
  // Beispiel:
  // { label: 'Komponente erstellen', prompt: 'Erstelle eine [NAME]-Komponente mit BEM-Klassen...' },
  // { label: 'Responsive Grid', prompt: 'Erstelle ein responsives Grid mit 3 Spalten...' },
];

/**
 * Initialisiert die Prompt-Templates als Buttons
 */
export function initPromptTemplates() {
  // TODO: Implementiere Template-Buttons
  // Erstelle Buttons für jede Vorlage in PROMPT_TEMPLATES
  // Bei Klick: Fülle den Input mit dem Template-Text
}
