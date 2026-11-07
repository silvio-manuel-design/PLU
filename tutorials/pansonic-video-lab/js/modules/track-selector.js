import { getStorage, setStorage, getStorageRaw, setStorageRaw, removeStorage } from './storage.js';
/**
 * Pansonic Video Lab — Track Selector
 * Cinematic track cards (Indoor / Outdoor / Hybrid) with persistence
 */

const STORAGE_KEY = 'pansonic-video-lab-track';

export function initTrackSelector() {
  const container = document.querySelector('.video-track-selector');
  if (!container) return;

  const cards = container.querySelectorAll('.video-track-card');

  function selectTrack(trackId) {
    // Update UI
    cards.forEach(card => {
      const isTarget = card.dataset.track === trackId;
      card.classList.toggle('is-active', isTarget);

      const btn = card.querySelector('.video-track-card__btn');
      if (btn) {
        btn.innerHTML = isTarget
          ? '<span>Ausgewählt</span><i class="ph ph-check" aria-hidden="true"></i>'
          : '<span>Auswählen</span><i class="ph ph-arrow-right" aria-hidden="true"></i>';
      }
    });

    // Persist
    try {
      localStorage.setItem(STORAGE_KEY, trackId);
    } catch (e) { /* silent fail */ }

    // Update feedback text if present
    const feedback = document.getElementById('trackFeedback');
    const feedbackText = document.getElementById('trackFeedbackText');
    if (feedback) {
      feedback.style.display = 'block';
      if (feedbackText) {
        const isEn = document.documentElement.lang === 'en';
        const texts = isEn ? {
          indoor: 'You chose the Indoor Track. In upcoming modules you\'ll find specific tips for podcasts, interviews, and tutorials.',
          outdoor: 'You chose the Outdoor Track. In upcoming modules you\'ll find specific tips for reportage, vlogs, and street footage.',
          both: 'You chose the Hybrid Track — pro mode. You\'ll master indoor and outdoor techniques in parallel.'
        } : {
          indoor: 'Du hast den Indoor-Track gewählt. In den kommenden Modulen findest du spezifische Tipps für Podcasts, Interviews und Tutorials.',
          outdoor: 'Du hast den Outdoor-Track gewählt. In den kommenden Modulen findest du spezifische Tipps für Reportagen, Vlogs und Street-Footage.',
          both: 'Du hast den Hybrid-Track gewählt — Pro-Modus. Du beherrschst Indoor- und Outdoor-Techniken parallel.'
        };
        feedbackText.textContent = texts[trackId] || '';
      }
    }

    // Dispatch custom event for other components
    document.body.setAttribute('data-active-track', trackId);
    window.dispatchEvent(new CustomEvent('trackChanged', { detail: { track: trackId } }));
  }

  // Load saved track — default to Hybrid (both) for new users
  let savedTrack = null;
  try {
    savedTrack = localStorage.getItem(STORAGE_KEY);
  } catch (e) { /* silent fail */ }

  if (savedTrack) {
    selectTrack(savedTrack);
  } else {
    selectTrack('both');
  }

  // Bind clicks
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicking a link inside
      if (e.target.closest('a')) return;
      const trackId = card.dataset.track;
      if (trackId) selectTrack(trackId);
    });

    // Keyboard accessibility
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const trackId = card.dataset.track;
        if (trackId) selectTrack(trackId);
      }
    });
  });
}
