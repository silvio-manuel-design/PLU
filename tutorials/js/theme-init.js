/**
 * THEME INITIALIZATION
 * Prevents flash of wrong theme (FOUC) by setting theme before render.
 * Must be loaded synchronously in <head>.
 */
(function() {
  const savedTheme = localStorage.getItem('plu-theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.remove('light-theme');
  } else {
    document.documentElement.classList.add('light-theme');
  }
})();
