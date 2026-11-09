/**
 * js/modules/scroll-spy.js — Scroll-Spy für die Sticky-Rail
 *
 * Markiert per IntersectionObserver genau einen Rail-Link als aktiv
 * (aria-current="true"). Kein Scroll-Verhalten wird verändert.
 */

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
