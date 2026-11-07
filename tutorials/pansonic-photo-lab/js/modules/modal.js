/**
 * Modal Module
 */

export function initModal() {
  document.querySelectorAll('[data-modal-open]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.dataset.modalOpen;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('is-active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  document.querySelectorAll('.photo-modal, .photo-tool-modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.closest('[data-modal-close]')) {
        modal.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.photo-modal.is-active, .photo-tool-modal-overlay.is-active').forEach(modal => {
        modal.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    }
  });
}
