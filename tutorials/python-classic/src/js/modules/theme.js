/**
 * PYTHON CLASSIC — Theme Manager
 * Dark / Light Mode Toggle
 * Preference: localStorage > system preference > light
 */

const STORAGE_KEY = 'plu-theme';
const DARK_CLASS = 'dark';
const THEME_ATTR = 'data-theme';

function getSavedTheme() {
  return localStorage.getItem(STORAGE_KEY);
}

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getTheme() {
  return getSavedTheme() || getSystemTheme();
}

export function setTheme(theme) {
  const html = document.documentElement;
  html.setAttribute(THEME_ATTR, theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

export function toggleTheme() {
  const current = getTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}

export function initTheme() {
  const theme = getTheme();
  setTheme(theme);

  // Theme toggle buttons
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // System preference change listener
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!getSavedTheme()) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}
