/* ============================================================
   SCROLL PROGRESS BAR
   Updates #progressBar width based on scroll position.
   Loaded by all module pages.
   ============================================================ */

(function() {
  'use strict';

  const bar = document.getElementById('progressBar');
  if (!bar) return;

  function updateProgress() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    bar.style.width = progress + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
})();
