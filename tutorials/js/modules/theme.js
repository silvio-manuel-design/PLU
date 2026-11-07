/**
 * THEME MANAGER
 * Handles Dark/Light mode switching
 * Persists preference in localStorage
 */

export class ThemeManager {
  constructor() {
    this.STORAGE_KEY = 'plu-theme';
    this.html = document.documentElement;
    this.toggleBtn = document.getElementById('theme-toggle');
    this.headerToggleBtn = document.getElementById('header-theme-toggle');
    
    this.init();
  }

  init() {
    // Check for saved preference
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);
    
    // Apply theme - Light mode is default
    if (savedTheme === 'dark') {
      this.setDarkMode();
    } else {
      // Default to light mode (also for new users and system preference)
      this.setLightMode();
    }
    
    // Event listeners
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggle());
    }
    
    if (this.headerToggleBtn) {
      this.headerToggleBtn.addEventListener('click', () => this.toggle());
    }
    
    // Listen for system changes - but keep light mode as default
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        // Keep light mode as default, only change if user explicitly chose dark
        this.setLightMode();
      }
    });
  }

  toggle() {
    if (this.html.classList.contains('light-theme')) {
      this.setDarkMode();
    } else {
      this.setLightMode();
    }
  }

  setLightMode() {
    this.html.classList.add('light-theme');
    localStorage.setItem(this.STORAGE_KEY, 'light');
    this.updateButton(true);
    this.dispatchThemeEvent('light');
  }

  setDarkMode() {
    this.html.classList.remove('light-theme');
    localStorage.setItem(this.STORAGE_KEY, 'dark');
    this.updateButton(false);
    this.dispatchThemeEvent('dark');
  }

  updateButton(isLight) {
    // Update all theme toggle buttons (FAB and header)
    const buttons = document.querySelectorAll('#theme-toggle, #header-theme-toggle');
    
    buttons.forEach(btn => {
      const icon = btn.querySelector('.ph');
      if (icon) {
        icon.className = isLight ? 'ph ph-moon' : 'ph ph-sun';
      }
      
      btn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
      btn.setAttribute('data-tooltip', isLight ? 'Dark Mode' : 'Light Mode');
    });
  }

  dispatchThemeEvent(theme) {
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }

  getCurrentTheme() {
    return this.html.classList.contains('light-theme') ? 'light' : 'dark';
  }
}
