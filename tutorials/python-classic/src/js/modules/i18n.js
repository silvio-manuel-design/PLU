/**
 * PYTHON CLASSIC — Internationalization Engine
 * Supports: DE (default), EN
 * Mechanism: data-i18n attributes + translation objects
 */

const translations = {};
let currentLang = localStorage.getItem('plu-language') || 'de';

const listeners = [];

export function onLangChange(callback) {
  listeners.push(callback);
}

export function setLanguage(lang) {
  if (!translations[lang]) {
    console.warn(`[i18n] Translation "${lang}" not loaded yet.`);
    return;
  }
  currentLang = lang;
  localStorage.setItem('plu-language', lang);
  document.documentElement.lang = lang;
  applyTranslations();
  listeners.forEach(cb => cb(lang));
}

export function getLanguage() {
  return currentLang;
}

export function t(key, fallback = '') {
  const keys = key.split('.');
  let value = translations[currentLang];
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return fallback || key;
    }
  }
  return typeof value === 'string' ? value : fallback || key;
}

export async function loadTranslation(lang) {
  if (translations[lang]) return;
  try {
    const module = await import(`../translations/${lang}.js`);
    translations[lang] = module.default || module;
  } catch (err) {
    console.warn(`[i18n] Failed to load translation for "${lang}":`, err);
  }
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = t(key);
    if (el.hasAttribute('data-i18n-attr')) {
      const attr = el.getAttribute('data-i18n-attr');
      el.setAttribute(attr, value);
    } else {
      el.textContent = value;
    }
  });
}

export async function initI18n() {
  await loadTranslation('de');
  await loadTranslation('en');
  setLanguage(currentLang);

  // Language toggle buttons
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (lang !== currentLang) {
        setLanguage(lang);
        updateLangButtons();
      }
    });
  });

  updateLangButtons();
}

function updateLangButtons() {
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.classList.toggle('is-active', btn.getAttribute('data-lang') === currentLang);
  });
}
