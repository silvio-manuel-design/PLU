import { t } from './i18n.js';
/**
 * Theme Manager — Dark/Light Mode
 * Speichert Präferenz in localStorage
 */

export function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  // Lade gespeicherte Präferenz oder System-Default
  const saved = localStorage.getItem('quest-dark-mode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved === 'true' || (saved === null && prefersDark);

  if (isDark) {
    document.documentElement.classList.add('dark-mode');
    updateThemeIcon(toggle, true);
  }

  toggle.addEventListener('click', () => {
    const html = document.documentElement;
    const nowDark = html.classList.toggle('dark-mode');
    localStorage.setItem('quest-dark-mode', nowDark);
    updateThemeIcon(toggle, nowDark);
  });
}

function updateThemeIcon(btn, isDark) {
  const icon = btn.querySelector('i');
  if (icon) {
    icon.className = isDark ? 'ph ph-sun' : 'ph ph-moon';
  }
  btn.title = isDark ? t('theme.light') : t('theme.dark');
}
