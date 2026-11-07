import { getStorage, setStorage, getStorageRaw, setStorageRaw, removeStorage } from './storage.js';
/**
 * Pansonic Video Lab — Classroom Mode
 * Presentation mode toggle for large screens / projectors
 * Toggle placed in footer under Pantam logo, above legal line
 */

const STORAGE_KEY = 'pansonic-classroom';

function createFooterToggle() {
  const footer = document.querySelector('.video-footer--premium, .video-footer');
  if (!footer) return null;

  // Don't create if one already exists
  if (footer.querySelector('.video-footer__classroom')) return null;

  const isEn = document.documentElement.lang === 'en';
  const label = isEn ? 'Classroom Mode' : 'Classroom Modus';

  const wrapper = document.createElement('div');
  wrapper.className = 'video-footer__classroom';
  wrapper.innerHTML = `
    <button class="video-footer__classroom-btn" aria-pressed="false" title="${label}">
      <i class="ph ph-presentation" aria-hidden="true"></i>
      <span>${label}</span>
    </button>
  `;

  // Insert directly after .video-footer__brand-wrap (under Pantam logo, above links/legal)
  const brandWrap = footer.querySelector('.video-footer__brand-wrap');
  if (brandWrap) {
    brandWrap.appendChild(wrapper);
  } else {
    const main = footer.querySelector('.video-footer__main') || footer.querySelector('.video-container') || footer;
    main.appendChild(wrapper);
  }

  return wrapper.querySelector('button');
}

export function initClassroom() {
  const html = document.documentElement;

  // Create footer toggle if not present
  const footerToggle = createFooterToggle();
  const legacyToggles = document.querySelectorAll('.video-classroom-toggle');
  const allToggles = footerToggle
    ? [...legacyToggles, footerToggle]
    : [...legacyToggles];

  function update(isActive) {
    html.setAttribute('data-classroom', isActive ? 'true' : 'false');
    allToggles.forEach(t => {
      t.classList.toggle('is-active', isActive);
      t.setAttribute('aria-pressed', isActive);
    });
    try { localStorage.setItem(STORAGE_KEY, isActive ? 'true' : 'false'); } catch (e) { /* silent fail */ }
  }

  try {
    if (localStorage.getItem(STORAGE_KEY) === 'true') {
      update(true);
    }
  } catch (e) { /* silent fail */ }

  allToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isActive = html.getAttribute('data-classroom') === 'true';
      update(!isActive);
    });
  });
}
