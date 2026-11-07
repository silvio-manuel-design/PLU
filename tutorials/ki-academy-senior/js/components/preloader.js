/**
 * KI Academy - Preloader
 * Shows loading state until page is ready
 */

const Preloader = {
  preloader: null,
  
  init() {
    this.preloader = document.getElementById('preloader');
    
    if (!this.preloader) return;
    
    // Hide preloader when page is fully loaded
    if (document.readyState === 'complete') {
      this.hide();
    } else {
      window.addEventListener('load', () => this.hide());
    }
    
    // Fallback: Hide after max 3 seconds
    setTimeout(() => this.hide(), 3000);
  },

  hide() {
    if (!this.preloader || this.preloader.classList.contains('loaded')) return;
    
    this.preloader.classList.add('loaded');
    
    // Remove from DOM after animation
    setTimeout(() => {
      if (this.preloader && this.preloader.parentNode) {
        this.preloader.parentNode.removeChild(this.preloader);
      }
    }, 600);
  }
};

// Initialize immediately
Preloader.init();

window.Preloader = Preloader;
