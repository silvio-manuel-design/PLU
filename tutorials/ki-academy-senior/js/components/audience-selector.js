/**
 * KI Academy - Audience Selector
 * Interactive target audience cards
 */

const AudienceSelector = {
  cards: null,
  texts: null,
  
  init() {
    this.cacheElements();
    this.bindEvents();
  },

  cacheElements() {
    this.cards = document.querySelectorAll('.audience-card');
    this.texts = document.querySelectorAll('.audience-text');
  },

  bindEvents() {
    this.cards.forEach(card => {
      card.addEventListener('click', () => {
        const audience = card.getAttribute('data-audience');
        this.selectAudience(audience);
      });
      
      // Keyboard support
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const audience = card.getAttribute('data-audience');
          this.selectAudience(audience);
        }
      });
    });
  },

  selectAudience(audience) {
    // Update cards
    this.cards.forEach(card => {
      const isSelected = card.getAttribute('data-audience') === audience;
      card.classList.toggle('active', isSelected);
      card.setAttribute('aria-pressed', isSelected);
    });
    
    // Update texts with fade animation
    this.texts.forEach(text => {
      const textAudience = text.getAttribute('data-audience');
      const isSelected = textAudience === audience;
      
      if (isSelected) {
        text.style.display = 'block';
        // Small delay for animation
        requestAnimationFrame(() => {
          text.classList.add('active');
        });
      } else {
        text.classList.remove('active');
        // Hide after animation
        setTimeout(() => {
          if (!text.classList.contains('active')) {
            text.style.display = 'none';
          }
        }, 400);
      }
    });
    
    // Store preference
    localStorage.setItem('ki_academy_audience', audience);
  },

  getStoredAudience() {
    return localStorage.getItem('ki_academy_audience');
  }
};

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => AudienceSelector.init());
} else {
  AudienceSelector.init();
}

window.AudienceSelector = AudienceSelector;
