/**
 * js/modules/navigation.js — Site-Chrome aus zentraler Datenquelle (P2)
 *
 * Rendert aus `js/data/nav.js` + i18n-Dictionaries:
 *   Skip-Links · Header (Brand, Hauptnav mit Dropdowns, Theme-Slot, Sprach-Switcher)
 *   Bottom-Bar (Prev/Next, Kapitelübersicht-<dialog>, Progress-Ring-Slot)
 *   Footer (Lizenzen, Info-Link)
 *
 * Rendering-Vertrag (PROJEKT.md): Seiten binden den Chrome ausschließlich via
 *   <div data-component="jsc-site-chrome"></div> + entry-global.js
 *
 * Interaktionen:
 *   - Dropdowns = Disclosure-Pattern: Button aria-expanded, Pfeiltasten durch
 *     die Items, Escape schließt + fokussiert den Button, Tab heraus schließt.
 *   - Menü-States steuerbar per :has() auf dem Wrapper (§5.9) — JS setzt nur
 *     das Attribut (aria-expanded).
 *   - TOC-Dialog: <dialog> mit Focus-Trap, Escape + Backdrop-Klick schließen,
 *     Return-of-Focus auf den auslösenden Button.
 */

import { NAV } from '../data/nav.js';
import { t, getLanguage, onLangChange } from './i18n.js';
import { isLight, toggleTheme } from './theme.js';

/* ------------------------------------------------------------------ */
/* Hilfen                                                              */
/* ------------------------------------------------------------------ */

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function pageUrl(path) {
  return path.length > 1 ? path.replace(/\/$/, '') : path;
}

/** Index der aktuellen Seite in der Kurssequenz, -1 außerhalb der Kapitel */
function currentChapterIndex() {
  const path = window.location.pathname.replace(/\/$/, '');
  return NAV.chaptersMeta.findIndex((ch) => {
    const chapterPath = `/tutorials/js-classic/kapitel/${ch.slug}.html`.replace(/\/$/, '');
    return path === chapterPath || path.endsWith(`/${ch.slug}.html`);
  });
}

/* ------------------------------------------------------------------ */
/* Skip-Links                                                          */
/* ------------------------------------------------------------------ */

function renderSkipLinks() {
  const wrap = el('nav', 'jsc-skip-links');

  const toContent = el('a', 'jsc-skip-link', t('ui.skipToContent'));
  toContent.href = '#main';

  const toNav = el('a', 'jsc-skip-link', t('ui.a11y.skipToNav'));
  toNav.href = '#jsc-main-nav';

  wrap.append(toContent, toNav);

  const main = document.getElementById('main') || document.querySelector('main');
  toContent.addEventListener('click', (e) => {
    if (!main) return;
    e.preventDefault();
    main.setAttribute('tabindex', '-1');
    main.focus();
    history.replaceState(null, '', '#main');
  });

  return wrap;
}

/* ------------------------------------------------------------------ */
/* Dropdown (Disclosure-Pattern)                                       */
/* ------------------------------------------------------------------ */

function bindDropdown(item, btn, sub) {
  const links = [...sub.querySelectorAll('a')];

  function open(focusFirst = true) {
    btn.setAttribute('aria-expanded', 'true');
    if (focusFirst) (links[0] || sub).focus?.();
  }
  function close(refocus = false) {
    btn.setAttribute('aria-expanded', 'false');
    if (refocus) btn.focus();
  }
  function isOpen() {
    return btn.getAttribute('aria-expanded') === 'true';
  }

  btn.addEventListener('click', () => (isOpen() ? close() : open()));
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      open(true);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      btn.setAttribute('aria-expanded', 'true');
      (links[links.length - 1] || sub).focus?.();
    }
  });

  sub.addEventListener('keydown', (e) => {
    const idx = links.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      links[(idx + 1) % links.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      links[(idx - 1 + links.length) % links.length]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      links[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      links[links.length - 1]?.focus();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close(true);
    }
  });

  // Tab heraus aus dem Menü schließt es (letztes Item → Tab)
  links[links.length - 1]?.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !e.shiftKey) close();
  });
  // Klick außerhalb schließt
  document.addEventListener('click', (e) => {
    if (isOpen() && !item.contains(e.target)) close();
  });
}

function navItem(entry, currentPath) {
  const item = el('li', 'jsc-nav-item');
  const isCurrent =
    currentPath === pageUrl(entry.url) ||
    (entry.children && entry.children.some((c) => currentPath === pageUrl(c.url)));

  if (!entry.children) {
    const link = el('a', 'jsc-nav__link', t(entry.i18n));
    link.href = entry.url;
    if (isCurrent) {
      link.setAttribute('aria-current', 'page');
      link.classList.add('is-current');
    }
    item.append(link);
    return item;
  }

  // Dropdown (Disclosure)
  const btn = el('button', 'jsc-nav__btn', `${t(entry.i18n)} `);
  btn.type = 'button';
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-haspopup', 'true');
  const caret = el('span', 'jsc-nav__caret', '▾');
  caret.setAttribute('aria-hidden', 'true');
  btn.append(caret);
  if (isCurrent) btn.classList.add('is-current');

  const sub = el('ul', 'jsc-nav__sub');
  entry.children.forEach((child) => {
    const li = el('li', 'jsc-nav__sub-item');
    const link = el('a', 'jsc-nav__sub-link', t(child.i18n));
    link.href = child.url;
    if (currentPath === pageUrl(child.url)) link.setAttribute('aria-current', 'page');
    li.append(link);
    sub.append(li);
  });

  item.classList.add('jsc-nav-item--has-sub');
  item.append(btn, sub);
  bindDropdown(item, btn, sub);
  return item;
}

/* ------------------------------------------------------------------ */
/* Sprach-Switcher (hreflang-basiert)                                  */
/* ------------------------------------------------------------------ */

function renderLangSwitcher() {
  const current = document.documentElement.lang || 'de';
  const alternates = [...document.querySelectorAll('link[rel="alternate"][hreflang]')];
  const target = alternates.find((l) => l.hreflang !== current && l.hreflang !== 'x-default');

  const wrap = el('div', 'jsc-lang-switcher');
  wrap.setAttribute('aria-label', t('ui.a11y.langSwitcher'));

  if (!target) {
    // Kein hreflang-Pendant (z. B. Übergang zu Altbestand) → ausgeblendet.
    wrap.hidden = true;
    return wrap;
  }

  const link = el('a', 'jsc-lang-switcher__link', t('ui.langSwitch'));
  link.href = target.href;
  link.hreflang = target.hreflang;
  link.setAttribute('lang', target.hreflang);
  wrap.append(link);
  return wrap;
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

function renderHeader(currentPath) {
  const header = el('header', 'jsc-header');
  header.id = 'jsc-header';

  const inner = el('div', 'jsc-header__inner jsc-container');

  const brand = el('a', 'jsc-header__brand');
  brand.href = NAV.main[0].url;
  const brandIcon = el('span', 'jsc-header__brand-icon', '〈〉');
  brandIcon.setAttribute('aria-hidden', 'true');
  brand.append(brandIcon, document.createTextNode(' js-classic'));
  const brandSub = el('span', 'jsc-header__brand-sub', '2.0');
  brand.append(brandSub);

  const nav = el('nav', 'jsc-nav');
  nav.id = 'jsc-main-nav';
  nav.setAttribute('aria-label', t('ui.a11y.mainNav'));
  const list = el('ul', 'jsc-nav__list');
  NAV.main.forEach((entry) => list.append(navItem(entry, currentPath)));
  nav.append(list);

  const actions = el('div', 'jsc-header__actions');
  const themeBtn = el('button', 'jsc-theme-toggle');
  themeBtn.type = 'button';
  themeBtn.dataset.themeToggle = '';
  themeBtn.setAttribute('aria-pressed', String(isLight()));
  // Kein aria-label: der sichtbare Text ("Helles/Dunkles Design") ist die
  // Beschriftung; der State liegt in aria-pressed (axe: label-content-name).
  themeBtn.textContent = t(isLight() ? 'ui.theme.toDark' : 'ui.theme.toLight');
  themeBtn.addEventListener('click', toggleTheme);

  actions.append(renderLangSwitcher(), themeBtn);

  inner.append(brand, nav, actions);
  header.append(inner);
  return header;
}

/* ------------------------------------------------------------------ */
/* Bottom-Bar (≤768px)                                                 */
/* ------------------------------------------------------------------ */

function chapterLink(chapter) {
  return `/tutorials/js-classic/kapitel/${chapter.slug}.html`;
}

function renderTocDialog(bar) {
  const dialog = el('dialog', 'jsc-toc-dialog');
  dialog.setAttribute('aria-label', t('ui.nav.toc'));

  const head = el('div', 'jsc-toc-dialog__head');
  const title = el('h2', 'jsc-toc-dialog__title', t('ui.nav.toc'));
  const closeBtn = el('button', 'jsc-toc-dialog__close', '×');
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', t('ui.a11y.closeMenu'));
  head.append(title, closeBtn);

  const list = el('ul', 'jsc-toc-dialog__list');
  NAV.chaptersMeta.forEach((ch) => {
    const li = el('li', 'jsc-toc-dialog__item');
    const link = el('a', 'jsc-toc-dialog__link');
    link.href = chapterLink(ch);
    const nr = el('span', 'jsc-toc-dialog__nr', `${ch.nr} · `);
    link.append(nr, document.createTextNode(t(ch.i18n)));
    li.append(link);
    list.append(li);
  });

  dialog.append(head, list);
  bar.append(dialog);

  /* Focus-Trap + Return-of-Focus */
  const tocBtn = bar.querySelector('[data-toc-open]');
  let lastTrigger = null;

  function openDialog() {
    lastTrigger = document.activeElement;
    dialog.showModal();
    (dialog.querySelector('.jsc-toc-dialog__close') || dialog).focus?.();
  }
  function closeDialog() {
    dialog.close();
    lastTrigger?.focus?.();
  }

  tocBtn?.addEventListener('click', openDialog);
  closeBtn.addEventListener('click', closeDialog);

  dialog.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusables = [...dialog.querySelectorAll('button, a[href]')];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // Backdrop-Klick schließt (Klick auf das <dialog>-Element selbst)
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) closeDialog();
  });
  dialog.addEventListener('close', () => lastTrigger?.focus?.());

  return dialog;
}

function renderBottomBar() {
  const idx = currentChapterIndex();
  const prev = idx > 0 ? NAV.chaptersMeta[idx - 1] : null;
  const next = idx >= 0 && idx < NAV.chaptersMeta.length - 1 ? NAV.chaptersMeta[idx + 1] : null;

  const bar = el('nav', 'jsc-bottom-bar');
  bar.setAttribute('aria-label', t('ui.a11y.bottomBar'));

  const prevBtn = el('a', 'jsc-bottom-bar__btn jsc-bottom-bar__btn--prev');
  prevBtn.append(el('span', 'jsc-bottom-bar__arrow', '←'), el('span', null, t('ui.common.prev')));
  if (prev) {
    prevBtn.href = chapterLink(prev);
  } else {
    prevBtn.removeAttribute('href');
    prevBtn.classList.add('is-disabled');
    prevBtn.setAttribute('aria-disabled', 'true');
  }

  const tocBtn = el('button', 'jsc-bottom-bar__toc', t('ui.nav.toc'));
  tocBtn.type = 'button';
  tocBtn.dataset.tocOpen = '';

  const ring = el('span', 'jsc-bottom-bar__progress');
  ring.dataset.slot = 'progress-ring';
  ring.hidden = true; // Platzhalter — Befüllung folgt in P3

  const nextBtn = el('a', 'jsc-bottom-bar__btn jsc-bottom-bar__btn--next');
  nextBtn.append(el('span', null, t('ui.common.next')), el('span', 'jsc-bottom-bar__arrow', '→'));
  if (next) {
    nextBtn.href = chapterLink(next);
  } else {
    nextBtn.removeAttribute('href');
    nextBtn.classList.add('is-disabled');
    nextBtn.setAttribute('aria-disabled', 'true');
  }

  bar.append(prevBtn, ring, tocBtn, nextBtn);
  renderTocDialog(bar);
  return bar;
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

function renderFooter() {
  const footer = el('footer', 'jsc-footer');
  const inner = el('div', 'jsc-footer__inner jsc-container');

  const license = el('p', 'jsc-footer__license');
  license.append(
    el('strong', null, 'js-classic · PANTAM Learning Universe — '),
    document.createTextNode('Code: MIT · Content: CC BY-NC-SA 4.0')
  );

  const infoLink = el('a', 'jsc-footer__link', t('ui.nav.infoAbout'));
  infoLink.href = '/tutorials/js-classic/info.html';

  inner.append(license, infoLink);
  footer.append(inner);
  return footer;
}

/* ------------------------------------------------------------------ */
/* Init                                                                */
/* ------------------------------------------------------------------ */

export function initNavigation() {
  const mount = document.querySelector('[data-component="jsc-site-chrome"]');
  if (!mount) return;

  const currentPath = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';

  const skip = renderSkipLinks();
  const header = renderHeader(currentPath);
  const bar = renderBottomBar();
  const footer = renderFooter();

  mount.before(skip, header);
  document.body.append(bar, footer);
  mount.remove();

  // Sprachwechsel → Chrome neu rendern (aus Dictionaries)
  onLangChange(() => {
    document.querySelector('.jsc-skip-links')?.remove();
    document.getElementById('jsc-header')?.remove();
    document.querySelector('.jsc-bottom-bar')?.remove();
    document.querySelector('.jsc-footer')?.remove();
    const marker = el('div');
    marker.dataset.component = 'jsc-site-chrome';
    document.body.append(marker);
    initNavigation();
  });
}
