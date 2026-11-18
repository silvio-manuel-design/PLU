/**
 * js/modules/scroll-spy.js — Scroll-Spy für die Sticky-Rail
 *
 * Markiert per IntersectionObserver genau einen Rail-Link als aktiv
 * (aria-current="true"). Kein Scroll-Verhalten wird verändert.
 */

import { get } from './storage.js';
import { t } from './i18n.js';

export function initScrollSpy() {
  const rail = document.querySelector('.jsc-chapter-rail');
  if (!rail || !('IntersectionObserver' in window)) return;

  const pairs = [...rail.querySelectorAll('a[href^="#"]')]
    .map((a) => ({ a, sec: document.getElementById(a.hash.slice(1)) }))
    .filter((p) => p.sec);
  if (!pairs.length) return;

  const setActive = (target) => {
    pairs.forEach(({ a, sec }) => {
      if (sec === target) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  };

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target);
      });
    },
    { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
  );

  pairs.forEach(({ sec }) => spy.observe(sec));
}

export function initRailProgress() {
  const rail = document.querySelector('.jsc-chapter-rail');
  if (!rail) return;

  const list = document.querySelector('.jsc-checklist[data-storage-key]');
  if (!list) return;

  const key = list.dataset.storageKey;
  const total = list.querySelectorAll('li').length;
  if (!key || !total) return;

  const box = document.createElement('p');
  box.className = 'jsc-rail-progress';
  box.setAttribute('role', 'progressbar');
  box.setAttribute('aria-valuemin', '0');
  box.setAttribute('aria-valuemax', String(total));
  box.innerHTML =
    '<span class="jsc-rail-progress__track">' +
    '<span class="jsc-rail-progress__bar"></span></span>';
  rail.appendChild(box);

  const bar = box.querySelector('.jsc-rail-progress__bar');

  const update = () => {
    /* Befund: Checkliste speichert ein Boolean-Array je Box
       (checklist.js: saved[i]), nicht Index-Liste → truthy zählen. */
    const done = (get(key, []) || []).filter(Boolean).length;
    const pct = Math.round((done / total) * 100);
    bar.style.width = pct + '%';
    box.setAttribute('aria-valuenow', String(done));
    box.setAttribute('aria-valuetext', done + '/' + total);
    /* Accessible Name (AXE aria-progressbar-name) aus bestehendem
       Dict-Key ui.check.progress — keine Dictionary-Änderung nötig. */
    box.setAttribute('aria-label', t('ui.check.progress').replace('%d', String(done)).replace('%d', String(total)));
  };

  document.addEventListener('change', (e) => {
    if (list.contains(e.target)) update();
  });
  update();
}
