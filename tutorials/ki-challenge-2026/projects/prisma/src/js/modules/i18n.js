/**
 * i18n Engine — DE / EN
 * Zero dependencies. Falls back to German.
 * Adapted for KI Challenge 2026 — PRISMA
 */

const RTL_LANGS = new Set([]);

let currentLang = 'de';
let translations = {};

export function setLanguage(lang) {
  if (!['de', 'en'].includes(lang)) lang = 'de';
  currentLang = lang;
  localStorage.setItem('plu-language', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = RTL_LANGS.has(lang) ? 'rtl' : 'ltr';
  updateI18nAttributes();
}

export function getLanguage() {
  return currentLang;
}

export function isRTL() {
  return RTL_LANGS.has(currentLang);
}

export function t(key, vars = {}) {
  const dict = translations[currentLang] || translations.de || {};
  let text = dict[key];
  if (text === undefined) {
    text = (translations.de || {})[key] ?? key;
  }
  return text.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? `{{${k}}}`);
}

export function tOr(key, vars = {}) {
  const dict = translations[currentLang] || translations.de || {};
  let text = dict[key];
  if (text === undefined) {
    text = (translations.de || {})[key];
  }
  if (text === undefined) return undefined;
  return text.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? `{{${k}}}`);
}

export function loadTranslations(de, en) {
  translations = { de, en };
  const saved = localStorage.getItem('plu-language');
  if (saved && ['de', 'en'].includes(saved)) {
    currentLang = saved;
  }
  document.documentElement.lang = currentLang;
  document.documentElement.dir = RTL_LANGS.has(currentLang) ? 'rtl' : 'ltr';
}

export function updateI18nAttributes() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (!key) return;
    const text = t(key);

    if (el.hasAttribute('data-tooltip')) {
      el.setAttribute('data-tooltip', text);
    }
    if (el.hasAttribute('aria-label')) {
      el.setAttribute('aria-label', text);
      return;
    }
    if (el.hasAttribute('title') && !el.dataset.i18nTitle) {
      el.setAttribute('title', text);
      return;
    }
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = text;
      return;
    }

    if (el.children.length === 0) {
      el.textContent = text;
    }
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (key) el.innerHTML = t(key);
  });
}

export function initLanguageSwitcher() {
  const wrapper = document.getElementById('lang-switcher');
  if (!wrapper) return;

  const btn = wrapper.querySelector('.lang-switcher__btn');
  const options = wrapper.querySelectorAll('.lang-switcher__option');
  const currentEl = document.getElementById('lang-current');

  function updateActive() {
    options.forEach(opt => {
      opt.classList.toggle('is-active', opt.dataset.lang === currentLang);
    });
    if (currentEl) currentEl.textContent = currentLang.toUpperCase();
  }

  updateActive();

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = wrapper.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      const lang = opt.dataset.lang;
      if (lang && lang !== currentLang) {
        setLanguage(lang);
        updateActive();
        if (window.__i18nOnLangChange) {
          window.__i18nOnLangChange.forEach(cb => cb(lang));
        }
      }
      wrapper.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', () => {
    wrapper.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  });
}

export function onLangChange(cb) {
  if (!window.__i18nOnLangChange) window.__i18nOnLangChange = [];
  window.__i18nOnLangChange.push(cb);
}

export function initI18n(de, en) {
  loadTranslations(de, en);
  updateI18nAttributes();
  initLanguageSwitcher();
}
