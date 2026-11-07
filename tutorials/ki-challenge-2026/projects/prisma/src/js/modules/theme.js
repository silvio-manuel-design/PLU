import { t } from './i18n.js';
/**
 * Theme Manager — Dark/Light Mode
 * Speichert Präferenz in localStorage
 * Adapted for KI Challenge 2026 — PRISMA
 */

export function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const saved = localStorage.getItem('challenge-dark-mode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved === 'true' || (saved === null && prefersDark);

  if (isDark) {
    document.documentElement.classList.add('dark-mode');
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon(toggle, true);
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  toggle.addEventListener('click', () => {
    const html = document.documentElement;
    const nowDark = html.classList.toggle('dark-mode');
    html.setAttribute('data-theme', nowDark ? 'dark' : 'light');
    localStorage.setItem('challenge-dark-mode', nowDark);
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
