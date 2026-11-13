/**
 * js/modules/lcard.js — Lernkarte (P13): ein Karten-Design, drei Orte.
 *
 * Rendert <ol data-component="jsc-lcard-grid" data-list="chapters|labs">.
 * Kapitel: Bild, binärer Ring (progress.js isDone). Labs: Bild, Ring = x von y
 * Anforderungen (checklist-Storage jsc-lab-XX-req). Ganze Karte = ein Link.
 * `plu:progress` aktualisiert Kapitel-Ringe live.
 */

import { CHAPTERS, LABS } from '../data/nav.js';
import { t, getLanguage } from './i18n.js';
import { isDone } from './progress.js';
import { get } from './storage.js';

const RING_R = 15.9155;
const IMG_BASE = '/tutorials/js-classic/assets/img/chapters';

function hrefFor(dir, slug, slugEn) {
  const s = getLanguage() === 'en' && slugEn ? slugEn : slug;
  return `/tutorials/js-classic/${dir}/${s}.html`;
}

function ringSvg(pct) {
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
  bar.setAttribute('stroke-dasharray', `${pct} 100`);

  svg.append(track, bar);
  return svg;
}

function labState(nr) {
  const saved = get(`lab-${nr}-req`, []);
  const done = Array.isArray(saved) ? saved.filter(Boolean).length : 0;
  return { done, total: Array.isArray(saved) ? saved.length : 0 };
}

function media(img) {
  const fig = document.createElement('span');
  fig.className = 'jsc-lcard__media';
  fig.setAttribute('aria-hidden', 'true');
  const im = document.createElement('img');
  im.src = `${IMG_BASE}/${img}-768.jpg`;
  im.srcset = `${IMG_BASE}/${img}-768.jpg 768w, ${IMG_BASE}/${img}-1440.jpg 1440w`;
  im.sizes = '(min-width: 1200px) 25vw, (min-width: 640px) 50vw, 100vw';
  im.alt = '';
  im.loading = 'lazy';
  fig.append(im);
  return fig;
}

function shell(nr, mod) {
  const li = document.createElement('li');
  li.className = 'jsc-lcard';
  li.dataset.module = mod;
  const link = document.createElement('a');
  link.className = 'jsc-lcard__link';
  const body = document.createElement('span');
  body.className = 'jsc-lcard__body';
  const toprow = document.createElement('span');
  toprow.className = 'jsc-lcard__toprow';
  const nrel = document.createElement('span');
  nrel.className = 'jsc-lcard__nr';
  nrel.textContent = nr;
  li.append(link);
  link.append(media(CHAPTERS[Number(nr) - 1].img), body);
  body.append(toprow);
  toprow.append(nrel);
  return { li, link, body, toprow };
}

function chapterCard(ch) {
  const done = isDone(ch.nr);
  const { li, link, body, toprow } = shell(ch.nr, `m${ch.nr}`);
  li.classList.toggle('is-done', done);
  link.href = hrefFor('kapitel', ch.slug, ch.slugEn);
  toprow.append(ringSvg(done ? 100 : 0));

  const title = document.createElement('span');
  title.className = 'jsc-lcard__title';
  title.textContent = t(ch.i18n);
  const status = document.createElement('p');
  status.className = 'jsc-lcard__status';
  status.textContent = done ? t('ui.progress.done') : t('ui.progress.pending');
  body.append(title, status);
  return li;
}

function labCard(lab) {
  const st = labState(lab.nr);
  const pct = st.total ? Math.round((st.done / st.total) * 100) : 0;
  const { li, link, body, toprow } = shell(lab.nr, `m${lab.nr}`);
  li.dataset.lab = lab.nr;
  const complete = st.total > 0 && st.done === st.total;
  li.classList.toggle('is-done', complete);
  link.href = hrefFor('uebungen', lab.slug, lab.slugEn);
  toprow.append(ringSvg(pct));

  const ch = CHAPTERS[Number(lab.nr) - 1];
  const eyebrow = document.createElement('p');
  eyebrow.className = 'jsc-lcard__eyebrow';
  eyebrow.textContent = `${t('ui.lcard.chapter').replace('%s', ch.nr)} · ${t(ch.i18n)}`;
  const title = document.createElement('span');
  title.className = 'jsc-lcard__title';
  title.textContent = `Lab ${lab.nr} — ${t(lab.i18n)}`;
  const meta = document.createElement('p');
  meta.className = 'jsc-lcard__meta';
  meta.textContent = t('ui.lcard.meta').replace('%s', lab.mins);
  const status = document.createElement('p');
  status.className = 'jsc-lcard__status';
  status.textContent = complete
    ? t('ui.lcard.done')
    : t('ui.lcard.req').replace('%d', String(st.done)).replace('%d', String(st.total));
  body.append(eyebrow, title, meta, status);
  return li;
}

function paintGrid(mount) {
  mount.textContent = '';
  const items = mount.dataset.list === 'labs' ? LABS : CHAPTERS;
  items.forEach((item) => mount.append(mount.dataset.list === 'labs' ? labCard(item) : chapterCard(item)));
}

function updateChapters() {
  document.querySelectorAll('[data-component="jsc-lcard-grid"][data-list="chapters"]').forEach((mount) => {
    CHAPTERS.forEach((ch) => {
      const li = mount.querySelector(`[data-module="m${ch.nr}"]`);
      if (!li) return;
      const done = isDone(ch.nr);
      li.classList.toggle('is-done', done);
      const bar = li.querySelector('.jsc-ring__bar');
      if (bar) bar.setAttribute('stroke-dasharray', `${done ? 100 : 0} 100`);
      const status = li.querySelector('.jsc-lcard__status');
      if (status) status.textContent = done ? t('ui.progress.done') : t('ui.progress.pending');
    });
  });
}

export function initLcards() {
  document.querySelectorAll('[data-component="jsc-lcard-grid"]').forEach(paintGrid);
  window.addEventListener('plu:progress', updateChapters);
}
