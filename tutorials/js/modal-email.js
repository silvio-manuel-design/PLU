/* ========================================================================
   EMAIL MODAL
   Popup mit E-Mail-Adresse als SVG-Bild (Bot-Schutz)
   ======================================================================== */

(function () {
  const overlay = document.getElementById('email-modal-overlay');
  if (!overlay) return;

  const closeBtn = document.getElementById('email-modal-close');
  const openTriggers = document.querySelectorAll('[data-email-modal]');
  let lastFocusedElement = null;

  function openModal() {
    lastFocusedElement = document.activeElement;
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    if (closeBtn) closeBtn.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  openTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });
})();
