/**
 * js/modules/back-to-top.js — Back-to-Top-Button (Design-DNA B12)
 *
 * Erzeugt den Button (Button-Sprache aus button.css), erscheint nach
 * ~1 Viewport Scrollen, scrollt smooth nach oben (Reduced Motion: auto).
 * Tastatur-bedienbar; Label via Dictionary (ui.backToTop), Icon Phosphor.
 */

import { t, onLangChange } from './i18n.js';

const SCROLL_THRESHOLD_VH = 1;

export function initBackToTop() {
  /* FIX: Auf der Startseite deaktiviert — kurze Seite, der Button
     störte über den Karten (Martin 12.11.). Steuerung über
     data-no-back-to-top am html-Tag der Index-Seiten. */
  if (document.documentElement.hasAttribute('data-no-back-to-top')) return;
  if (document.querySelector('.jsc-back-to-top')) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'jsc-button jsc-button--primary jsc-button--sm jsc-back-to-top';

  const icon = document.createElement('i');
  icon.className = 'ph ph-arrow-up';
  icon.setAttribute('aria-hidden', 'true');

  btn.setAttribute('aria-label', t('ui.backToTop'));
  btn.append(icon);
  document.body.append(btn);

  function syncLabel() {
    btn.setAttribute('aria-label', t('ui.backToTop'));
  }
  onLangChange(syncLabel);

  function onScroll() {
    const threshold = window.innerHeight * SCROLL_THRESHOLD_VH;
    btn.classList.toggle('is-visible', window.scrollY > threshold);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* FIX: Footer im Blick → Button abtreten. Am Seitenende verdeckte
     er die rechten Footer-Links (Martin 12.11.). Sobald das Ziel
     sichtbar ist, braucht es keinen Aufwärts-Button mehr. */
  const footer = document.querySelector('.jsc-footer');
  if (footer && 'IntersectionObserver' in window) {
    const footerIO = new IntersectionObserver((entries) => {
      const over = entries.some((entry) => entry.isIntersecting);
      btn.classList.toggle('is-over-footer', over);
    });
    footerIO.observe(footer);
  }

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduced.matches ? 'auto' : 'smooth' });
  });
}
