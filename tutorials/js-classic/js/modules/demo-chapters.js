/**
 * js/modules/demo-chapters.js — Lern-Demos für Kapitel 02–05 (P6)
 *
 * Fünf kleine Interaktions-Demos im kap01-Demo-Vertrag (jsc-demo):
 *   data-demo="counter"      Punkte-Zähler (Kap. 02, Schritt 1)
 *   data-demo="prompt-greet" Begrüßung per prompt() (Kap. 02, Schritt 3)
 *   data-demo="grade"        Noten-Rechner (Kap. 04, Schritt 1)
 *   data-demo="dice"         Würfel-Simulator (Kap. 05, Schritt 2)
 *   data-demo="pattern"      Muster-Maler (Kap. 05, Schritt 4)
 *
 * Alle UI-Texte stehen attributbasiert im authored HTML (data-*),
 * das Modul bleibt sprachneutral. Ausgaben in die bestehenden
 * Flächen: .jsc-demo__greeting (Text) bzw. .jsc-demo-console (Log).
 */

function logLine(box, text) {
  const line = document.createElement('span');
  line.className = 'jsc-demo-console__line';
  line.textContent = text;
  box.append(line);
  box.scrollTop = box.scrollHeight;
}

/** Kap. 02, Schritt 1 — Punkte-Zähler: Anzeige + Buttons (data-count-add / Reset) */
function initCounter() {
  document.querySelectorAll('[data-component="jsc-demo"][data-demo="counter"]').forEach((demo) => {
    const target = demo.querySelector('[data-count-target]');
    const addBtn = demo.querySelector('[data-count-add]');
    const resetBtn = demo.querySelector('[data-count-reset]');
    if (!target || !addBtn) return;

    let count = 0;
    addBtn.addEventListener('click', () => {
      count += Number(addBtn.dataset.countAdd || 10);
      target.textContent = String(count);
    });
    resetBtn?.addEventListener('click', () => {
      count = 0;
      target.textContent = '0';
    });
  });
}

/** Kap. 02, Schritt 3 — Begrüßungs-Demo: prompt() → personalisierte Ausgabe */
function initPromptGreet() {
  document
    .querySelectorAll('[data-component="jsc-demo"][data-demo="prompt-greet"]')
    .forEach((demo) => {
      const btn = demo.querySelector('[data-prompt-greet]');
      const target = demo.querySelector('[data-greeting-target]');
      if (!btn || !target) return;

      btn.addEventListener('click', () => {
        const name = window.prompt(btn.dataset.prompt || 'Wie heißt du?');
        if (name === null) {
          target.textContent = btn.dataset.cancel || '';
        } else {
          const template = btn.dataset.template || 'Hallo, {name}!';
          target.textContent = template.replace('{name}', name);
        }
        target.classList.add('is-filled');
      });
    });
}

/** Kap. 04, Schritt 1 — Noten-Rechner: Punkte (0–100) → Schulnote */
function initGrade() {
  document.querySelectorAll('[data-component="jsc-demo"][data-demo="grade"]').forEach((demo) => {
    const input = demo.querySelector('[data-grade-input]');
    const btn = demo.querySelector('[data-grade-run]');
    const target = demo.querySelector('[data-grade-target]');
    if (!input || !btn || !target) return;

    // Fünf Noten-Labels, kommagetrennt, absteigend (data-grades)
    const grades = (demo.dataset.grades || '').split(',').map((s) => s.trim());
    const thresholds = [90, 75, 60, 50];

    btn.addEventListener('click', () => {
      const value = Number(input.value);
      if (input.value.trim() === '' || Number.isNaN(value) || value < 0 || value > 100) {
        target.textContent = demo.dataset.invalid || '';
        target.classList.remove('is-filled');
        return;
      }
      const idx = thresholds.findIndex((t) => value >= t);
      const grade = idx === -1 ? grades.length : idx + 1;
      const label = grades[grade - 1] || '';
      target.textContent = `${grade} — ${label}`;
      target.classList.add('is-filled');
    });
  });
}

/** Kap. 05, Schritt 2 — Würfel-Simulator: würfeln bis die erste 6 fällt */
function initDice() {
  document.querySelectorAll('[data-component="jsc-demo"][data-demo="dice"]').forEach((demo) => {
    const btn = demo.querySelector('[data-dice-roll]');
    const box = demo.querySelector('[data-console-output]');
    if (!btn || !box) return;

    btn.addEventListener('click', () => {
      box.textContent = '';
      let rolls = 0;
      let dice = 0;
      do {
        dice = Math.floor(Math.random() * 6) + 1;
        rolls += 1;
        logLine(box, `${btn.dataset.roll || 'Wurf'} ${rolls} → ${dice}`);
      } while (dice !== 6);
      const template = btn.dataset.success || 'Nach {n} Würfen die erste 6!';
      logLine(box, template.replace('{n}', String(rolls)));
    });
  });
}

/** Kap. 05, Schritt 4 — Muster-Maler: Rechteck/Dreieck aus Sternen in die Konsole */
function initPattern() {
  document.querySelectorAll('[data-component="jsc-demo"][data-demo="pattern"]').forEach((demo) => {
    const box = demo.querySelector('[data-console-output]');
    if (!box) return;

    demo.querySelectorAll('[data-pattern]').forEach((btn) => {
      btn.addEventListener('click', () => {
        box.textContent = '';
        const rows = Number(btn.dataset.rows || 5);
        const cols = Number(btn.dataset.cols || 8);
        for (let r = 1; r <= rows; r += 1) {
          const count = btn.dataset.pattern === 'tri' ? r : cols;
          logLine(box, '*'.repeat(count));
        }
      });
    });
  });
}

export function initDemoChapters() {
  initCounter();
  initPromptGreet();
  initGrade();
  initDice();
  initPattern();
}
