/**
 * Pansonic Photo Lab — Tool Modal
 * Loads tool data from JSON and initializes the modal.
 * No inline scripts — all data fetched dynamically.
 */

import { trapFocus } from './focus-trap.js';

const DATA_URL_DE = '/tutorials/pansonic-photo-lab/assets/data/tools-de.json';
const DATA_URL_EN = '/tutorials/pansonic-photo-lab/assets/data/tools-en.json';

let toolData = null;

async function loadToolData() {
  if (toolData) return toolData;

  const isEn = document.documentElement.lang === 'en';
  const url = isEn ? DATA_URL_EN : DATA_URL_DE;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to load tool data');
    toolData = await response.json();
    return toolData;
  } catch (err) {
    console.error('[Tool Modal] Failed to load tool data:', err);
    return {};
  }
}

export async function initToolModal() {
  const overlay = document.getElementById('toolModalOverlay');
  if (!overlay) return; // No modal on this page

  const data = await loadToolData();
  if (!Object.keys(data).length) return;

  const closeBtn = document.getElementById('toolModalClose');
  let deactivateFocusTrap = null;
  let lastTrigger = null;

  function openModal(card) {
    const key = card.dataset.tool;
    const item = data[key];
    if (!item) return;

    const iconEl = document.getElementById('modalIcon');
    const titleEl = document.getElementById('modalTitle');
    const subtitleEl = document.getElementById('modalSubtitle');
    const textEl = document.getElementById('modalText');
    const tipsEl = document.getElementById('modalTips');

    if (iconEl) iconEl.innerHTML = item.icon;
    if (titleEl) titleEl.textContent = item.title;
    if (subtitleEl) subtitleEl.textContent = item.subtitle;
    if (textEl) textEl.innerHTML = item.text;
    if (tipsEl) tipsEl.innerHTML = item.tips;

    lastTrigger = card;
    overlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    deactivateFocusTrap = trapFocus(overlay, { returnTo: lastTrigger });
  }

  document.querySelectorAll('.photo-tool-card[data-tool], .photo-polaroid[data-tool]').forEach(card => {
    card.addEventListener('click', () => openModal(card));

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  function closeModal() {
    if (deactivateFocusTrap) {
      deactivateFocusTrap();
      deactivateFocusTrap = null;
    }
    overlay.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
      closeModal();
    }
  });
}
