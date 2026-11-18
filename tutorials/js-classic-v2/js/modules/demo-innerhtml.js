/**
 * js/modules/demo-innerhtml.js — Demo „Seite zum Leben erwecken"
 *
 * Button ersetzt den Inhalt eines leeren p-Elements per innerHTML —
 * DOM-Soforterfolg, sichtbar im Demo-Bereich.
 */

export function initDemoInnerhtml() {
  document.querySelectorAll('[data-component="jsc-demo"][data-demo="innerhtml"]').forEach((demo) => {
    const btn = demo.querySelector('[data-demo-run]');
    const target = demo.querySelector('[data-greeting-target]');
    if (!btn || !target) return;

    btn.addEventListener('click', () => {
      target.innerHTML = btn.dataset.message || 'Willkommen auf meiner Seite! 👋';
      target.classList.add('is-filled');
    });
  });
}
