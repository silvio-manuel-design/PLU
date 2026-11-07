/**
 * PYTHON QUEST — i18n Engine
 * DE/EN Sprachumschaltung mit localStorage-Persistenz
 */

import { TRANSLATIONS } from './translations.js';

const STORAGE_KEY = 'pyquest-lang';
const DEFAULT_LANG = 'de';

let currentLang = DEFAULT_LANG;

/**
 * Initialisiert die Sprache beim Seitenstart
 */
export function initI18n() {
  // Priorität: URL-Param > localStorage > Browser-Präferenz
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang');
  const storedLang = localStorage.getItem(STORAGE_KEY);
  const browserLang = navigator.language?.split('-')[0];

  const lang = urlLang || storedLang || (browserLang === 'en' ? 'en' : DEFAULT_LANG);
  setLanguage(lang, false);
}

/**
 * Gibt den übersetzten Text für einen Key zurück
 * Unterstützt verschachtelte Keys mit Punkt-Notation: "hero.title"
 */
export function t(key, replacements = {}) {
  const keys = key.split('.');
  let value = TRANSLATIONS[currentLang];

  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) break;
  }

  // Fallback auf DE
  if (value === undefined && currentLang !== DEFAULT_LANG) {
    value = TRANSLATIONS[DEFAULT_LANG];
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
  }

  if (value === undefined) {
    console.warn(`[i18n] Missing key: ${key}`);
    return key;
  }

  // Ersetze Platzhalter wie {{name}}
  let text = value;
  for (const [repKey, repValue] of Object.entries(replacements)) {
    text = text.replace(new RegExp(`\\{\\{${repKey}\\}\\}`, 'g'), repValue);
  }

  return text;
}

/**
 * Setzt die aktuelle Sprache
 */
export function setLanguage(lang, persist = true) {
  if (!TRANSLATIONS[lang]) {
    console.warn(`[i18n] Unsupported language: ${lang}`);
    return;
  }

  currentLang = lang;
  document.documentElement.setAttribute('lang', lang);

  if (persist) {
    localStorage.setItem(STORAGE_KEY, lang);
  }

  // Aktualisiere alle data-i18n Elemente
  translatePage();

  // Aktualisiere Sprachanzeige im Header (Pill-Buttons)
  document.querySelectorAll('.py-quest-lang__btn').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.lang === lang);
  });

  // Dispatch Event für Module, die reagieren müssen
  window.dispatchEvent(new CustomEvent('pyquest:languagechange', { detail: { lang } }));
}

/**
 * Gibt die aktuelle Sprache zurück
 */
export function getLanguage() {
  return currentLang;
}

/**
 * Übersetzt alle Elemente mit data-i18n Attribut
 */
export function translatePage() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const text = t(key);

    // Prüfe, ob es ein Input/Placeholder ist
    if (el.hasAttribute('data-i18n-attr')) {
      const attr = el.dataset.i18nAttr;
      el.setAttribute(attr, text);
    } else if (el.placeholder !== undefined && el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      // Für Inputs: prüfe ob explizit placeholder gewünscht
      if (el.dataset.i18nPlaceholder) {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    } else {
      el.textContent = text;
    }
  });

  // Übersetze aria-label Attribute
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.dataset.i18nAria;
    el.setAttribute('aria-label', t(key));
  });

  // Übersetze <title>
  const titleEl = document.querySelector('title[data-i18n]');
  if (titleEl) titleEl.textContent = t(titleEl.dataset.i18n);

  // Übersetze <meta name="description">
  document.querySelectorAll('meta[data-i18n]').forEach(el => {
    el.setAttribute('content', t(el.dataset.i18n));
  });
}

/**
 * Schaltet zwischen DE und EN um
 */
export function toggleLanguage(event) {
  // Neue Pill-Button Logik
  const target = event?.currentTarget || event?.target;
  if (target?.dataset?.lang) {
    const next = target.dataset.lang;
    if (next === currentLang) return;
    setLanguage(next);
  } else {
    // Fallback für alte Toggle-Buttons
    const next = currentLang === 'de' ? 'en' : 'de';
    setLanguage(next);
  }

  if (showToast) {
    showToast({
      type: 'info',
      title: t('lang.switched'),
      text: t('lang.current', { lang: currentLang.toUpperCase() }),
      duration: 2000
    });
  }
}

// Lazy import für Toast (vermeidet circular dependency)
let showToast = null;
export function setToastFunction(fn) {
  showToast = fn;
}
