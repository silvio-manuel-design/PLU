/**
 * Pansonic Video Lab — Modal Manager
 * Cinematic overlay modals with keyboard accessibility
 */

import { trapFocus } from './focus-trap.js';

export function initModal() {
  const overlay = document.querySelector('.video-modal-overlay');
  if (!overlay) return;

  const cards = document.querySelectorAll('[data-modal-target]');
  let deactivateFocusTrap = null;
  let lastTrigger = null;

  function openModal(targetId) {
    const modal = document.querySelector(targetId);
    if (!modal) return;
    overlay.querySelectorAll('.video-modal').forEach(m => m.classList.remove('is-active'));
    modal.classList.add('is-active');
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    deactivateFocusTrap = trapFocus(modal, { returnTo: lastTrigger });
  }

  function closeModal() {
    if (deactivateFocusTrap) {
      deactivateFocusTrap();
      deactivateFocusTrap = null;
    }
    overlay.querySelectorAll('.video-modal').forEach(m => m.classList.remove('is-active'));
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      lastTrigger = card;
      openModal(card.dataset.modalTarget);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        lastTrigger = card;
        openModal(card.dataset.modalTarget);
      }
    });
  });

  overlay.querySelectorAll('.video-modal__close').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  overlay.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}
