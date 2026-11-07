/**
 * KI Academy - Floating Action Buttons Manager
 */

const FABManager = {
  fabBackToTop: null,
  
  init() {
    this.cacheElements();
    this.bindEvents();
  },

  cacheElements() {
    this.fabBackToTop = document.getElementById('fab-back-to-top');
  },

  bindEvents() {
    // Back to top visibility is handled in navigation.js
    // This is just for additional FAB-specific functionality
  },

  showBackToTop() {
    if (this.fabBackToTop) {
      this.fabBackToTop.classList.add('visible');
    }
  },

  hideBackToTop() {
    if (this.fabBackToTop) {
      this.fabBackToTop.classList.remove('visible');
    }
  }
};

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => FABManager.init());
} else {
  FABManager.init();
}

window.FABManager = FABManager;
