/**
 * KI Academy - Theme Manager
 * Dark/Light Mode Toggle with System Preference Detection
 */

const ThemeManager = {
  currentTheme: 'light',
  STORAGE_KEY: 'ki_academy_theme',
  
  init() {
    // Check for stored preference
    const stored = localStorage.getItem(this.STORAGE_KEY);
    
    if (stored) {
      this.currentTheme = stored;
    } else {
      // Default is LIGHT - no auto-detection of system preference
      // User must explicitly choose dark mode
    }
    
    this.applyTheme();
    this.initToggles();
    
    // Listen for system changes - but don't auto-switch (user preference only)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // No auto-switch - user must explicitly choose theme
    });
  },

  initToggles() {
    // Header theme toggle
    const headerToggle = document.getElementById('theme-toggle');
    if (headerToggle) {
      headerToggle.addEventListener('click', () => this.toggle());
    }
    
    // FAB theme toggle
    const fabToggle = document.getElementById('fab-theme');
    if (fabToggle) {
      fabToggle.addEventListener('click', () => this.toggle());
    }
  },

  toggle() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme();
    localStorage.setItem(this.STORAGE_KEY, this.currentTheme);
    
    // Announce change for accessibility
    this.announceChange();
  },

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    
    // Update toggle buttons aria-labels
    const toggles = document.querySelectorAll('#theme-toggle, #fab-theme');
    toggles.forEach(toggle => {
      if (toggle) {
        toggle.setAttribute('aria-label', 
          this.currentTheme === 'dark' 
            ? 'Hellmodus aktivieren' 
            : 'Dunkelmodus aktivieren'
        );
        toggle.setAttribute('title', 
          this.currentTheme === 'dark' 
            ? 'Hellmodus' 
            : 'Dunkelmodus'
        );
      }
    });
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', 
        this.currentTheme === 'dark' ? '#F4A261' : '#F4A261'
      );
    }
  },

  announceChange() {
    // Create live region if it doesn't exist
    let liveRegion = document.getElementById('theme-announcement');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'theme-announcement';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      document.body.appendChild(liveRegion);
    }
    
    const currentLang = document.documentElement.lang || 'de';
    const message = this.currentTheme === 'dark' 
      ? (currentLang === 'de' ? 'Dunkelmodus aktiviert' : 'Dark mode enabled')
      : (currentLang === 'de' ? 'Hellmodus aktiviert' : 'Light mode enabled');
    
    liveRegion.textContent = message;
    
    // Clear after announcement
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  },

  getCurrentTheme() {
    return this.currentTheme;
  }
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
} else {
  ThemeManager.init();
}

// Expose globally
window.ThemeManager = ThemeManager;
