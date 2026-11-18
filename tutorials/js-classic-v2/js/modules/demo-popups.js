/**
 * js/modules/demo-popups.js — Demo „Blocker spüren" (nur Lernschritt 3)
 *
 * alert()/prompt() AUSSCHLIESSLICH nach Button-Klick.
 * prompt-Ausgabe wird in die Mini-Konsole des Demos gespiegelt.
 */

export function initDemoPopups() {
  document.querySelectorAll('[data-component="jsc-demo"][data-demo="popups"]').forEach((demo) => {
    const alertBtn = demo.querySelector('[data-demo-alert]');
    const promptBtn = demo.querySelector('[data-demo-prompt]');
    const out = demo.querySelector('[data-console-output]');

    alertBtn?.addEventListener('click', () => {
      window.alert(alertBtn.dataset.message || 'Hallo! Dieses Fenster blockiert die Seite.');
    });

    promptBtn?.addEventListener('click', () => {
      const name = window.prompt(promptBtn.dataset.message || 'Wie heißt du?');
      if (name !== null && out) {
        const line = document.createElement('span');
        line.className = 'jsc-demo-console__line';
        line.textContent = `> prompt → ${name}`;
        out.append(line);
        out.scrollTop = out.scrollHeight;
      }
    });
  });
}
