/**
 * js/modules/theme.js — Dark-first Theme-Steuerung (js-classic 2.0)
 *
 * - Dark ist der PLU-Default: KEIN gesetztes Attribut.
 *   Light ausschließlich via `html[data-theme="light"]`.
 * - Persistenz: storage-Key `jsc-theme` (Werte "dark" | "light").
 * - Toggle-Buttons (`[data-theme-toggle]`): `aria-pressed` + Label aus
 *   `ui.theme.toDark` / `ui.theme.toLight`.
 * - Bewusst KEIN prefers-color-scheme-Auto-Switch (KONZEPT §5.2):
 *   Die Plattform-Entscheidung ist Dark; Ausnahme nur per explizitem Toggle.
 */

import { get, set } from './storage.js';
import { t, onLangChange } from './i18n.js';

const THEME_KEY = 'theme';

export function isLight() {
  return document.documentElement.dataset.theme === 'light';
}

export function applyTheme(theme, { persist = true } = {}) {
  const root = document.documentElement;
  if (theme === 'light') {
    root.dataset.theme = 'light';
  } else {
    root.removeAttribute('data-theme');
  }
  if (persist) set(THEME_KEY, theme);
  syncToggles();
}

export function toggleTheme() {
  applyTheme(isLight() ? 'dark' : 'light');
}

export function syncToggles() {
  const light = isLight();
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(light));
    if (btn.hasAttribute('data-theme-icon')) {
      // Icon-Button (Header): Sonne = wechselt zu Light, Mond = zu Dark
      const icon = btn.querySelector('.ph');
      if (icon) icon.className = `ph ${light ? 'ph-moon' : 'ph-sun'}`;
      btn.setAttribute('aria-label', t('ui.a11y.themeToggle'));
      btn.title = t(light ? 'ui.theme.toDark' : 'ui.theme.toLight');
      return;
    }
    const key = light ? 'ui.theme.toDark' : 'ui.theme.toLight';
    btn.dataset.i18n = key;
    btn.textContent = t(key);
  });
}

export function initTheme() {
  const saved = get(THEME_KEY, 'dark');
  applyTheme(saved === 'light' ? 'light' : 'dark', { persist: false });

  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    if (btn.dataset.themeBound === 'true') return;
    btn.dataset.themeBound = 'true';
    btn.setAttribute('aria-pressed', String(isLight()));
    btn.addEventListener('click', toggleTheme);
  });
  syncToggles();
  onLangChange(syncToggles);
}
