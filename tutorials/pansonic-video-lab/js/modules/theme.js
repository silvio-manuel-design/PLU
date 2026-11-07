import { getStorage, setStorage, getStorageRaw, setStorageRaw, removeStorage } from './storage.js';
/**
 * Pansonic Video Lab — Theme Manager
 * Handles dark/light mode toggle and persistence
 * Works with both header buttons (.video-header__btn--theme) and legacy FAB buttons
 */

const STORAGE_KEY = 'pansonic-theme';

export function initTheme() {
  const html = document.documentElement;
  let stored = null;

  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch (e) { /* silent fail */ }

  // Collect all theme toggles: header button + legacy FABs
  const allToggles = document.querySelectorAll('.video-theme-toggle, .video-header__btn--theme');

  function apply(theme) {
    if (theme === 'light') {
      html.setAttribute('data-theme', 'light');
    } else {
      html.setAttribute('data-theme', 'dark');
    }
    allToggles.forEach(t => {
      const icon = t.querySelector('i');
      if (icon) {
        icon.className = theme === 'light' ? 'ph ph-sun' : 'ph ph-moon';
      }
    });
  }

  if (stored) {
    apply(stored);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    apply('light');
  }

  allToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isLight = html.getAttribute('data-theme') === 'light';
      const next = isLight ? 'dark' : 'light';
      apply(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* silent fail */ }
    });
  });

  // Keyboard shortcut: T toggles theme
  document.addEventListener('keydown', (e) => {
    if (e.key === 't' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const active = document.activeElement;
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) {
        return;
      }
      const isLight = html.getAttribute('data-theme') === 'light';
      const next = isLight ? 'dark' : 'light';
      apply(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* silent fail */ }
    }
  });
}
