/**
 * js/modules/media-embed.js — Media-Embed (2-Klick, DSGVO-sauber)
 *
 * Vertrag:
 * - data-yt-id fehlt oder leer → statischer Platzhalter steht im HTML (unverändert).
 * - data-yt-id gesetzt → YouTube-Fassade: lokales Poster + Play-Button; erst nach
 *   Klick wird der iframe erzeugt (youtube-nocookie, rel=0, autoplay erst ab Klick).
 * - data-yt-id-en optional: ID für EN; Fallback = data-yt-id.
 * - data-poster optional: lokales Posterbild (Kapitel-Hero), kein Google-CDN.
 */

import { t, getLanguage, onLangChange } from './i18n.js';

const NOCOOKIE_EMBED = 'https://www.youtube-nocookie.com/embed/';
const WATCH_URL = 'https://www.youtube.com/watch?v=';
const CHANNEL_URL = 'https://www.youtube.com/@plu-pantam';

export function initMediaEmbed() {
  document.querySelectorAll('[data-component="jsc-media-embed"]').forEach((card) => {
    const idDe = (card.dataset.ytId || '').trim();
    if (!idDe) return; // Platzhalter-Zustand steht statisch im HTML

    const body = card.querySelector('[data-media-body]');
    if (!body) return;
    body.textContent = '';

    const title = card.querySelector('h3')?.textContent?.trim() || 'Video';
    const posterSrc = (card.dataset.poster || '').trim();

    const activeId = () => {
      const idEn = (card.dataset.ytIdEn || '').trim();
      return getLanguage() === 'en' && idEn ? idEn : idDe;
    };

    /* --- Poster-Fassade --- */
    const poster = document.createElement('div');
    poster.className = 'jsc-media-embed__poster';

    if (posterSrc) {
      const img = document.createElement('img');
      img.src = posterSrc;
      img.alt = '';
      img.width = 1600;
      img.height = 900;
      img.loading = 'lazy';
      img.decoding = 'async';
      poster.append(img);
    }

    const play = document.createElement('button');
    play.type = 'button';
    play.className = 'jsc-button jsc-media-embed__play';
    const setPlayLabel = () => {
      play.textContent = t('ui.media.playLabel');
      play.setAttribute('aria-label', t('ui.media.play', { title }));
    };
    setPlayLabel();
    poster.append(play);

    /* --- Branding-Zeile unter dem Player --- */
    const note = document.createElement('p');
    note.className = 'jsc-media-embed__note';
    const renderNote = () => {
      note.textContent = '';
      const watch = document.createElement('a');
      watch.href = WATCH_URL + activeId();
      watch.target = '_blank';
      watch.rel = 'noopener';
      watch.innerHTML =
        t('ui.media.watch') +
        ' <i class="ph ph-arrow-square-out" aria-hidden="true"></i>' +
        '<span class="u-visually-hidden"> ' + t('ui.media.externalHint') + '</span>';
      const channel = document.createElement('a');
      channel.href = CHANNEL_URL;
      channel.target = '_blank';
      channel.rel = 'noopener';
      channel.textContent = t('ui.media.channel');
      note.append(watch, ' · ', channel);
    };
    renderNote();

    play.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = NOCOOKIE_EMBED + activeId() + '?autoplay=1&rel=0';
      iframe.loading = 'lazy';
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('allow', 'autoplay; encrypted-media; fullscreen; picture-in-picture');
      iframe.title = title;
      iframe.tabIndex = -1;
      poster.replaceWith(iframe);
      play.disabled = true;
      iframe.focus();
    });

    body.append(poster, note);

    onLangChange(() => {
      if (!play.disabled) setPlayLabel();
      if (note.isConnected) renderNote();
    });
  });
}
