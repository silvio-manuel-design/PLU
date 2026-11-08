/**
 * js/modules/home.js — Kursübersicht (Kapitel-Karten-Gitter)
 *
 * Rendert `<ol data-component="jsc-chapter-grid" data-module-list>` aus
 * nav.js `chaptersMeta` + Dictionary-Titeln (ui.ch.01…10). Jede Karte trägt
 * data-module="m01…m10" (Modul-Akzent), einen Fortschrittsring (SVG) und
 * den Kurz-Status (ui.progress.done / pending). Klick → Kapitel-URL.
 * Listener auf `plu:progress` aktualisiert Ringe + Status live.
 *
 * Setzt KEIN documentElement lang/dir — Seitensprache steht authored im HTML.
 */

import { NAV } from '../data/nav.js';
import { t } from './i18n.js';
import { isDone } from './progress.js';

/* Ring: r = 15.9155 → Umfang ≈ 100 → stroke-dasharray in Prozent */
const RING_R = 15.9155;

function ringSvg(done) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 36 36');
  svg.setAttribute('class', 'jsc-ring');
  svg.setAttribute('aria-hidden', 'true');

  const track = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  track.setAttribute('class', 'jsc-ring__track');
  track.setAttribute('cx', '18');
  track.setAttribute('cy', '18');
  track.setAttribute('r', String(RING_R));
  track.setAttribute('fill', 'none');

  const bar = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  bar.setAttribute('class', 'jsc-ring__bar');
  bar.setAttribute('cx', '18');
  bar.setAttribute('cy', '18');
  bar.setAttribute('r', String(RING_R));
  bar.setAttribute('fill', 'none');
  bar.setAttribute('stroke-dasharray', done ? '100 100' : '0 100');

  svg.append(track, bar);
  return svg;
}

function card(chapter) {
  const done = isDone(chapter.nr);
  const li = document.createElement('li');
  li.className = 'jsc-chapter-card' + (done ? ' is-done' : '');
  li.dataset.module = `m${chapter.nr}`;

  const link = document.createElement('a');
  link.className = 'jsc-chapter-card__link';
  link.href = `/tutorials/js-classic/kapitel/${chapter.slug}.html`;

  const ringWrap = document.createElement('span');
  ringWrap.className = 'jsc-chapter-card__ring';
  ringWrap.append(ringSvg(done));

  const nr = document.createElement('span');
  nr.className = 'jsc-chapter-card__nr';
  nr.textContent = chapter.nr;

  const title = document.createElement('span');
  title.className = 'jsc-chapter-card__title';
  title.textContent = t(chapter.i18n);

  const status = document.createElement('span');
  status.className = 'jsc-chapter-card__status';
  status.textContent = done ? t('ui.progress.done') : t('ui.progress.pending');

  link.append(ringWrap, nr, title, status);
  li.append(link);
  return li;
}

function update(mount) {
  NAV.chaptersMeta.forEach((chapter) => {
    const li = mount.querySelector(`[data-module="m${chapter.nr}"]`);
    if (!li) return;
    const done = isDone(chapter.nr);
    li.classList.toggle('is-done', done);
    const bar = li.querySelector('.jsc-ring__bar');
    if (bar) bar.setAttribute('stroke-dasharray', done ? '100 100' : '0 100');
    const status = li.querySelector('.jsc-chapter-card__status');
    if (status) status.textContent = done ? t('ui.progress.done') : t('ui.progress.pending');
  });
}

function placeholderCard(nr, i18nKey) {
  const li = document.createElement('li');
  li.className = 'jsc-chapter-card is-placeholder';
  li.dataset.module = `m${nr}`;
  li.setAttribute('aria-disabled', 'true');

  const wrap = document.createElement('span');
  wrap.className = 'jsc-chapter-card__link';

  const ringWrap = document.createElement('span');
  ringWrap.className = 'jsc-chapter-card__ring';
  ringWrap.append(ringSvg(false));

  const nrEl = document.createElement('span');
  nrEl.className = 'jsc-chapter-card__nr';
  nrEl.textContent = nr;

  const title = document.createElement('span');
  title.className = 'jsc-chapter-card__title';
  title.textContent = t(i18nKey);

  const status = document.createElement('span');
  status.className = 'jsc-chapter-card__status';
  status.textContent = t('ui.soon');

  wrap.append(ringWrap, nrEl, title, status);
  li.append(wrap);
  return li;
}

export function initHome() {
  const mount = document.querySelector('[data-component="jsc-chapter-grid"]');
  if (!mount) return;

  mount.textContent = '';
  NAV.chaptersMeta.forEach((chapter) => mount.append(card(chapter)));
  // Platzhalter 11 + 12 (B13): keine Seiten, keine Links — „12 Kapitel" stimmt mit dem Grid überein
  mount.append(placeholderCard('11', 'ui.ch.11'), placeholderCard('12', 'ui.ch.12'));

  window.addEventListener('plu:progress', () => update(mount));
}
