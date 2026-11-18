/**
 * js/modules/demo-console.js — Demo „Konsole ausprobieren"
 *
 * Button führt console.log() aus und spiegelt die Ausgabe in der
 * Mini-Konsole des Demo-Bereichs (auch ohne F12 sichtbar).
 * Nur nach Button-Klick aktiv (kein Auto-Alert o. ä.).
 */

export function initDemoConsole() {
  document.querySelectorAll('[data-component="jsc-demo"][data-demo="console"]').forEach((demo) => {
    const btn = demo.querySelector('[data-demo-run]');
    const out = demo.querySelector('[data-console-output]');
    if (!btn || !out) return;

    btn.addEventListener('click', () => {
      const message = btn.dataset.message || 'Hallo aus der Konsole!';
      // eslint-disable-next-line no-console
      console.log(message);
      const line = document.createElement('span');
      line.className = 'jsc-demo-console__line';
      line.textContent = `> ${message}`;
      out.append(line);
      out.scrollTop = out.scrollHeight;
    });
  });
}
