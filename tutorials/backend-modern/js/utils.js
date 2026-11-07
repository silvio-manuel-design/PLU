/**
 * Utility Functions - Phase 3
 * Debug detection, URL params
 */

const Utils = {
  isDebugMode() {
    const params = new URLSearchParams(window.location.search);
    return params.get('debug') === '1';
  },

  // Hide debug elements unless ?debug=1
  initDebugControls() {
    const debugElements = document.querySelectorAll('.debug-only');
    debugElements.forEach(el => {
      el.style.display = this.isDebugMode() ? 'block' : 'none';
    });
  },

  // Format XP with separators
  formatXP(xp) {
    return xp.toString();
  },

  // Get mission ID from URL path
  getMissionIdFromPath() {
    const path = window.location.pathname;
    const match = path.match(/(kapitel|uebungen)\/(\d+|[Uu]\d+)/);
    if (match) {
      const num = match[2];
      return num.startsWith('U') || num.startsWith('u') ? num.toUpperCase() : num.padStart(2, '0');
    }
    return null;
  }
};

window.Utils = Utils;

// Auto-init debug controls
document.addEventListener('DOMContentLoaded', () => {
  Utils.initDebugControls();
});
