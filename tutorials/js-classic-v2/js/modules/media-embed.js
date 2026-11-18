/**
 * js/modules/media-embed.js — Media-Embed (2-Klick, DSGVO-sauber)
 *
 * Vertrag: data-video-url="" (leer) → statischer Platzhalter steht im HTML.
 * Bei gesetztem data-video-url → Karte mit 2-Klick-Freigabe: erst nach
 * Klick auf „Video laden" wird der iframe lazy erzeugt (kein Vorab-Tracking).
 */

import { t, onLangChange } from './i18n.js';

export function initMediaEmbed() {
  document.querySelectorAll('[data-component="jsc-media-embed"]').forEach((card) => {
    const url = (card.dataset.videoUrl || '').trim();
    if (!url) return; // Platzhalter-Zustand (leere URL) steht im HTML

    const body = card.querySelector('[data-media-body]');
    if (!body) return;
    body.textContent = '';

    const note = document.createElement('p');
    note.className = 'jsc-media-embed__note';
    note.textContent = t('ui.media.external');

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'jsc-button jsc-button--outline jsc-button--sm';
    btn.textContent = t('ui.media.load');

    btn.addEventListener('click', () => {
      body.textContent = '';
      const iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.loading = 'lazy';
      iframe.setAttribute('allowfullscreen', '');
      iframe.title = card.querySelector('h3')?.textContent?.trim() || 'Video';
      body.append(iframe);
    });

    body.append(note, btn);
    onLangChange(() => {
      note.textContent = t('ui.media.external');
      btn.textContent = t('ui.media.load');
    });
  });
}
