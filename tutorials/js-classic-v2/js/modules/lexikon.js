/**
 * js/modules/lexikon.js — JS-Lexikon: Live-Suche + Buchstabenleiste (P9)
 *
 * Vertrag (Markup in lexikon.html):
 *   [data-lexikon]            Container
 *   [data-lexikon-search]     Suchfeld (input)
 *   [data-lexikon-count]      Treffer-Zähler (aria-live)
 *   [data-lexikon-empty]      Leere-Zustand (wird bei 0 Treffern eingeblendet)
 *   .jsc-lex-item             Begriffs-Karte (wird per hidden gefiltert)
 *   .jsc-lex-letters a/span   Buchstaben-Chips (Anker; is-empty ohne Eintrag)
 */

export function initLexikon() {
  const root = document.querySelector('[data-lexikon]');
  if (!root) return;

  const input = root.querySelector('[data-lexikon-search]');
  const count = root.querySelector('[data-lexikon-count]');
  const empty = root.querySelector('[data-lexikon-empty]');
  const items = [...root.querySelectorAll('.jsc-lex-item')];
  const sections = [...root.querySelectorAll('.jsc-lex-section')];
  if (!input || !items.length) return;

  const total = items.length;

  function apply() {
    const q = input.value.trim().toLowerCase();
    let hits = 0;
    items.forEach((item) => {
      const show = !q || item.textContent.toLowerCase().includes(q);
      item.hidden = !show;
      if (show) hits += 1;
    });
    sections.forEach((sec) => {
      const visible = [...sec.querySelectorAll('.jsc-lex-item')].some((i) => !i.hidden);
      sec.hidden = !visible;
    });
    if (count) count.textContent = `${hits} / ${total}`;
    if (empty) empty.hidden = hits !== 0;
  }

  input.addEventListener('input', apply);

  // Buchstaben ohne sichtbare Einträge deaktivieren (is-empty)
  root.querySelectorAll('.jsc-lex-letters [data-letter]').forEach((chip) => {
    const letter = chip.dataset.letter;
    const sec = root.querySelector(`#lex-${letter}`);
    const has = sec && sec.querySelector('.jsc-lex-item');
    if (!has) {
      chip.classList.add('is-empty');
      if (chip.tagName === 'A') {
        const span = document.createElement('span');
        span.className = chip.className + ' is-empty';
        span.textContent = chip.textContent;
        span.dataset.letter = letter;
        chip.replaceWith(span);
      }
    }
  });

  apply();
}
