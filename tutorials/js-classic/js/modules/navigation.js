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

import { NAV, CHAPTERS, INFO_PAGES, FINAL_PROJECTS, LABS } from '../data/nav.js';
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
    const slugs = [ch.slug, ch.slugEn].filter(Boolean);
    return slugs.some((slug) => {
      const chapterPath = `/tutorials/js-classic/kapitel/${slug}.html`.replace(/\/$/, '');
      return path === chapterPath || path.endsWith(`/${slug}.html`);
    });
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
    const label = child.nr ? `${child.nr} · ${t(child.i18n)}` : t(child.i18n);
    const link = el('a', 'jsc-nav__sub-link', label);
    const href = getLanguage() === 'en' && child.urlEn ? child.urlEn : child.url;
    link.href = href;
    if (currentPath === pageUrl(href)) link.setAttribute('aria-current', 'page');
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

  const wrap = el('div', 'jsc-header__action-slot');
  wrap.setAttribute('aria-label', t('ui.a11y.langSwitcher'));

  if (!target) {
    // Kein hreflang-Pendant (z. B. Übergang zu Altbestand) → ausgeblendet.
    wrap.hidden = true;
    return wrap;
  }

  const link = el('a', 'jsc-icon-btn jsc-lang-switcher__link');
  link.href = target.href;
  link.hreflang = target.hreflang;
  link.setAttribute('lang', target.hreflang);
  link.setAttribute('aria-label', t('ui.a11y.langSwitcher'));
  link.title = t('ui.langSwitch');
  const icon = el('i', 'ph ph-translate');
  icon.setAttribute('aria-hidden', 'true');
  link.append(icon);
  wrap.append(link);
  return wrap;
}

/* ------------------------------------------------------------------ */
/* Mobiles Hauptmenü (Disclosure-Panel unter dem Header, <1024px)      */
/* ------------------------------------------------------------------ */

function menuGroup(title, links) {
  const group = el('div', 'jsc-mobile-menu__group');
  group.append(el('p', 'jsc-mobile-menu__group-title', title));
  const ul = el('ul', 'jsc-mobile-menu__list');
  links.forEach(({ href, label, current }) => {
    const li = el('li', 'jsc-mobile-menu__item');
    const a = el('a', 'jsc-mobile-menu__link', label);
    a.href = href;
    if (current) a.setAttribute('aria-current', 'page');
    li.append(a);
    ul.append(li);
  });
  group.append(ul);
  return group;
}

function renderMobileMenu(header) {
  const idx = currentChapterIndex();
  const base = '/tutorials/js-classic';

  const panel = el('nav', 'jsc-mobile-menu');
  panel.id = 'jsc-mobile-menu';
  panel.setAttribute('aria-label', t('ui.a11y.mainNav'));
  panel.hidden = true;

  const inner = el('div', 'jsc-mobile-menu__inner jsc-container');
  inner.append(
    menuGroup(t('ui.menu.groupCourse'), [
      { href: `${base}/`, label: t('ui.nav.home'), current: window.location.pathname.replace(/\/$/, '/index.html').endsWith('/js-classic/index.html') || window.location.pathname === '/tutorials/js-classic/' },
    ]),
    menuGroup(
      t('ui.menu.groupChapters'),
      CHAPTERS.map((ch, i) => ({
        href: chapterLink(ch),
        label: `${ch.nr}. ${t(ch.i18n)}`,
        current: idx === i,
      }))
    ),
    menuGroup(
      t('ui.menu.groupLabs'),
      [
        { href: `${base}/uebungen/`, label: t('ui.nav.labsOverview') },
        ...LABS.map((lab) => ({
          href: labLink(lab),
          label: `Lab ${lab.nr} · ${t(lab.i18n)}`,
        })),
      ]
    ),
    menuGroup(t('ui.menu.groupLearn'), [
      { href: `${base}/ki-grundlagen.html`, label: t('ui.nav.kiBasics') },
      { href: `${base}/vscode.html`, label: t('ui.nav.vscode') },
    ]),
    menuGroup(
      t('ui.menu.groupFinal'),
      FINAL_PROJECTS.map((p) => ({ href: `${base}/abschluss/${p.slug}.html`, label: t(p.i18n) }))
    ),
    menuGroup(t('ui.menu.groupPlu'), [
      { href: `${base}/info.html`, label: t('ui.nav.infoAbout') },
      { href: `${base}/bibliothek.html`, label: t('ui.nav.library') },
      // P9: Lexikon nach Bibliothek
      { href: `${base}/lexikon.html`, label: t('ui.nav.lexikon') },
      { href: `${base}/arbeitsblaetter.html`, label: t('ui.nav.worksheets') },
    ])
  );
  panel.append(inner);
  header.append(panel);

  const btn = el('button', 'jsc-icon-btn jsc-mobile-menu__toggle');
  btn.type = 'button';
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'jsc-mobile-menu');
  btn.setAttribute('aria-label', t('ui.menu.open'));
  const icon = el('i', 'ph ph-list', '');
  icon.setAttribute('aria-hidden', 'true');
  btn.append(icon);

  /* --- Interaktionen --- */
  function focusables() {
    return [...panel.querySelectorAll('a[href]')];
  }

  function open() {
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', t('ui.menu.close'));
    panel.hidden = false;
    document.documentElement.classList.add('is-menu-open');
    focusables()[0]?.focus();
  }

  function close(refocus = true) {
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', t('ui.menu.open'));
    panel.hidden = true;
    document.documentElement.classList.remove('is-menu-open');
    if (refocus) btn.focus();
  }

  const isOpen = () => btn.getAttribute('aria-expanded') === 'true';

  btn.addEventListener('click', () => (isOpen() ? close(false) : open()));

  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      e.preventDefault();
      close(true);
    }
  });

  panel.addEventListener('keydown', (e) => {
    if (!isOpen()) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      close(true);
      return;
    }
    if (e.key !== 'Tab') return;
    // Fokus-Zyklus innerhalb des Panels
    const items = focusables();
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // Klick außerhalb schließt
  document.addEventListener('click', (e) => {
    if (isOpen() && !panel.contains(e.target) && !btn.contains(e.target)) close(false);
  });

  onLangChange(() => {
    if (isOpen()) close(false);
  });

  return btn;
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
  const logo = document.createElement('img');
  logo.src = '/tutorials/js-classic/assets/img/brand/jsc-logo.svg';
  logo.alt = t('ui.brand.alt');
  logo.width = 32;
  logo.height = 32;
  logo.className = 'jsc-header__logo';
  const wordmark = el('span', 'jsc-header__wordmark');
  wordmark.append(document.createTextNode('Java'));
  wordmark.append(el('span', 'jsc-header__brand-accent', 'Script'));
  brand.append(logo, wordmark);

  const nav = el('nav', 'jsc-nav');
  nav.id = 'jsc-main-nav';
  nav.setAttribute('aria-label', t('ui.a11y.mainNav'));
  const list = el('ul', 'jsc-nav__list');
  NAV.main.forEach((entry) => list.append(navItem(entry, currentPath)));
  nav.append(list);

  const actions = el('div', 'jsc-header__actions');
  const themeBtn = el('button', 'jsc-icon-btn jsc-theme-toggle');
  themeBtn.type = 'button';
  themeBtn.dataset.themeToggle = '';
  themeBtn.setAttribute('data-theme-icon', '');
  themeBtn.setAttribute('aria-pressed', String(isLight()));
  themeBtn.setAttribute('aria-label', t('ui.a11y.themeToggle'));
  themeBtn.title = t(isLight() ? 'ui.theme.toDark' : 'ui.theme.toLight');
  const themeIcon = el('i', `ph ${isLight() ? 'ph-moon' : 'ph-sun'}`);
  themeIcon.setAttribute('aria-hidden', 'true');
  themeBtn.append(themeIcon);
  themeBtn.addEventListener('click', toggleTheme);

  actions.append(renderLangSwitcher(), themeBtn);
  const menuBtn = renderMobileMenu(header);

  const actionsRow = actions;
  actionsRow.append(menuBtn);

  inner.append(brand, nav, actionsRow);
  header.append(inner);
  return header;
}

/* ------------------------------------------------------------------ */
/* Bottom-Bar (≤768px)                                                 */
/* ------------------------------------------------------------------ */

function chapterLink(chapter) {
  const slug = getLanguage() === 'en' && chapter.slugEn ? chapter.slugEn : chapter.slug;
  return `/tutorials/js-classic/kapitel/${slug}.html`;
}

function labLink(lab) {
  const slug = getLanguage() === 'en' && lab.slugEn ? lab.slugEn : lab.slug;
  return `/tutorials/js-classic/uebungen/${slug}.html`;
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
  } else if (idx === NAV.chaptersMeta.length - 1) {
    // P8: letztes Kapitel → Abschluss-Übersicht (Altbestand bis P11, EN-Fallback auf DE)
    nextBtn.href = '/tutorials/js-classic/abschluss/';
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

  /* --- Hauptbereich: Brand + Link-Spalten --- */
  const main = el('div', 'jsc-footer__main');

  const brandWrap = el('div', 'jsc-footer__brand-wrap');
  const logoWrap = el('a', 'jsc-footer__logo');
  logoWrap.href = NAV.main[0].url;
  const logoImg = document.createElement('img');
  logoImg.src = '/tutorials/js-classic/assets/img/brand/jsc-logo.svg';
  logoImg.alt = t('ui.footer.logoSub');
  logoImg.width = 40;
  logoImg.height = 40;
  const logoText = el('span', 'jsc-footer__logo-text');
  logoText.append(
    el('span', 'jsc-footer__logo-title', 'JavaScript Classic'),
    el('span', 'jsc-footer__logo-subtitle', t('ui.footer.logoSub'))
  );
  logoWrap.append(logoImg, logoText);
  brandWrap.append(
    logoWrap,
    el('p', 'jsc-footer__tagline', t('ui.footer.tagline'))
  );

  // Classroom-Mode (P9R1): aktiver Toggle — Logik in modules/classroom.js
  const classroom = el('button', 'jsc-footer__classroom');
  classroom.type = 'button';
  classroom.dataset.classroomToggle = '';
  classroom.setAttribute('aria-pressed', 'false');
  classroom.title = t('ui.classroom.title');
  const monitorIcon = el('i', 'ph ph-monitor', '');
  monitorIcon.setAttribute('aria-hidden', 'true');
  classroom.append(monitorIcon, document.createTextNode(` ${t('ui.footer.classroom')}`));
  brandWrap.append(classroom);

  /* --- Links-Grid (3 Spalten) --- */
  const grid = el('div', 'jsc-footer__links-grid');

  const navChapters = el('nav', 'jsc-footer__col');
  navChapters.setAttribute('aria-label', t('ui.menu.groupLearn'));
  navChapters.append(el('h2', 'jsc-footer__col-title', t('ui.menu.groupLearn')));
  const ulChapters = el('ul', 'jsc-footer__list');
  // P9R1: schlanke Lernen-Spalte (4 Einträge — die 12er-Liste lebt in Dropdown/Mobile/Home)
  const allChaptersUrl = getLanguage() === 'en'
    ? '/tutorials/js-classic/index-en.html#chapters'
    : '/tutorials/js-classic/#kapitel';
  ulChapters.append(
    footerLink(allChaptersUrl, t('ui.footer.allChapters')),
    footerLink(chapterLink(NAV.chaptersMeta[0]), `01. ${t('ui.ch.01')}`),
    footerLink('/tutorials/js-classic/uebungen/', t('ui.footer.exercises')),
    footerLink(labLink(LABS[0]), `01. ${t('ui.lab.01')}`)
  );
  navChapters.append(ulChapters);

  const navResources = el('nav', 'jsc-footer__col');
  navResources.setAttribute('aria-label', t('ui.footer.colResources'));
  navResources.append(el('h2', 'jsc-footer__col-title', t('ui.footer.colResources')));
  const ulResources = el('ul', 'jsc-footer__list');
  const pluHub = footerLink('/tutorials/', t('ui.footer.pluHub'));
  pluHub.target = '_blank';
  pluHub.rel = 'noopener';
  ulResources.append(
    // P9R5: Duplikate entfernt — Übungen/Arbeitsblätter leben in der Lernen-Spalte
    // P9: Lexikon + GitHub & Abgabe in der Ressourcen-Spalte
    footerLink('/tutorials/js-classic/lexikon.html', t('ui.nav.lexikon')),
    footerLink('/tutorials/js-classic/github.html', t('ui.nav.github')),
    footerLink('/tutorials/js-classic/ki-grundlagen.html', t('ui.footer.kiBasics')),
    pluHub
  );
  navResources.append(ulResources);

  const navLegal = el('nav', 'jsc-footer__col');
  navLegal.setAttribute('aria-label', t('ui.footer.colLegal'));
  navLegal.append(el('h2', 'jsc-footer__col-title', t('ui.footer.colLegal')));
  const ulLegal = el('ul', 'jsc-footer__list');
  ulLegal.append(
    footerLink('/tutorials/pages/impressum.html', t('ui.footer.imprint')),
    footerLink('/tutorials/pages/datenschutz.html', t('ui.footer.privacy')),
    footerLink('/tutorials/pages/disclaimer.html', t('ui.footer.disclaimer'))
  );
  navLegal.append(ulLegal);

  grid.append(navChapters, navResources, navLegal);
  main.append(brandWrap, grid);

  /* --- Bottom-Bar --- */
  const bottom = el('div', 'jsc-footer__bottom');
  const legal = el('p', 'jsc-footer__legal');
  legal.append(
    document.createTextNode(`${t('ui.footer.legalLine')} · `),
    el('span', null, t('ui.footer.mitLicense')),
    document.createTextNode(' · '),
    el('span', null, t('ui.footer.ccLicense'))
  );
  const meta = el('p', 'jsc-footer__meta');
  const support = el('a', 'jsc-footer__support', '');
  support.href = '/tutorials/pages/spenden.html';
  const heart = el('i', 'ph ph-heart', '');
  heart.setAttribute('aria-hidden', 'true');
  support.append(heart, document.createTextNode(` ${t('ui.footer.support')}`));
  meta.append(support);
  bottom.append(legal, meta);

  inner.append(main, bottom);
  footer.append(inner);
  return footer;
}

function footerLink(href, label) {
  const li = el('li', 'jsc-footer__item');
  const a = el('a', 'jsc-footer__link', label);
  a.href = href;
  li.append(a);
  return li;
}

/* ------------------------------------------------------------------ */
/* Init                                                                */
/* ------------------------------------------------------------------ */

/* Mobile/Tablet: Header beim Runterscrollen ausblenden (mehr Platz fürs Tutorial) */
function bindHeaderAutoHide() {
  let lastY = window.scrollY;

  window.addEventListener(
    'scroll',
    () => {
      if (window.innerWidth >= 1024) {
        document.documentElement.classList.remove('is-header-hidden');
        lastY = window.scrollY;
        return;
      }
      const y = window.scrollY;
      const menuOpen = Boolean(document.querySelector('.jsc-mobile-menu:not([hidden])'));
      if (menuOpen || y < 80) {
        document.documentElement.classList.remove('is-header-hidden');
      } else if (y > lastY + 4) {
        document.documentElement.classList.add('is-header-hidden');
      } else if (y < lastY - 4) {
        document.documentElement.classList.remove('is-header-hidden');
      }
      lastY = y;
    },
    { passive: true }
  );
}

export function initNavigation() {
  const mount = document.querySelector('[data-component="jsc-site-chrome"]');
  if (!mount) return;

  bindHeaderAutoHide();

  const currentPath = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';

  const skip = renderSkipLinks();
  const header = renderHeader(currentPath);
  // P9: Bottom-Bar nur auf Kapitelseiten (Prev/Next = Kapitel-Sequenz)
  const bar = currentChapterIndex() >= 0 ? renderBottomBar() : null;
  const footer = renderFooter();

  mount.before(skip, header);
  document.body.append(...(bar ? [bar, footer] : [footer]));
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
