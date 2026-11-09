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

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduced.matches ? 'auto' : 'smooth' });
  });
}
