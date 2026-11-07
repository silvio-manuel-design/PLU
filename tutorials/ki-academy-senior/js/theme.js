/**
 * KI ACADEMY - THEME MANAGER
 * Dark/Light Mode Toggle
 */

const ThemeManager = {
    currentTheme: 'light',
    
    init() {
        // Check for stored preference
        const stored = localStorage.getItem('ki_academy_theme');
        
        if (stored) {
            this.currentTheme = stored;
        }
        // Default is LIGHT - no auto-detection of system preference
        // User must explicitly choose dark mode
        
        this.applyTheme();
        this.initToggle();
        
        // Listen for system changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('ki_academy_theme')) {
                this.currentTheme = e.matches ? 'dark' : 'light';
                this.applyTheme();
            }
        });
    },

    initToggle() {
        const toggles = document.querySelectorAll('.theme-toggle');
        if (toggles.length === 0) return;
        
        toggles.forEach(toggle => {
            toggle.addEventListener('click', () => this.toggle());
        });
    },

    toggle() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        localStorage.setItem('ki_academy_theme', this.currentTheme);
        
        // Announce change
        if (window.A11y) {
            const msg = this.currentTheme === 'dark' 
                ? 'Dunkelmodus aktiviert' 
                : 'Hellmodus aktiviert';
            window.A11y.announce(msg);
        }
    },

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        // Update all toggle buttons
        const toggles = document.querySelectorAll('.theme-toggle');
        toggles.forEach(toggle => {
            toggle.setAttribute('aria-label', 
                this.currentTheme === 'dark' 
                    ? 'Hellmodus aktivieren' 
                    : 'Dunkelmodus aktivieren'
            );
        })
        
        // Update all logos
        const logos = document.querySelectorAll('.logo-icon');
        logos.forEach(logo => {
            const currentSrc = logo.getAttribute('src') || '';
            const isInModules = currentSrc.includes('../../../');
            const basePath = isInModules ? '../../../' : '';
            const newSrc = basePath + (this.currentTheme === 'dark' 
                ? 'assets/images/icons/logo-ki-academy-dark.svg'
                : 'assets/images/icons/logo-ki-academy.svg');
            const newFileName = newSrc.split('/').pop();
            // Nur aktualisieren wenn sich der Dateiname ändert
            if (!currentSrc.includes(newFileName)) {
                logo.src = newSrc;
            }
        });
    }
};

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
} else {
    ThemeManager.init();
}

// Expose globally
window.ThemeManager = ThemeManager;
