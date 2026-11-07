/**
 * KI ACADEMY - BACK TO TOP BUTTON
 * Scroll to top functionality
 */

const BackToTop = {
    button: null,
    threshold: 500,
    
    init() {
        this.button = document.querySelector('.back-to-top');
        console.log('[BackToTop] Button found:', this.button);
        if (!this.button) {
            console.warn('[BackToTop] No button found with class .back-to-top');
            return;
        }
        
        // Click handler
        this.button.addEventListener('click', () => this.scrollToTop());
        
        // Scroll listener
        window.addEventListener('scroll', 
            this.throttle(() => this.toggleVisibility(), 100)
        );
        
        // Initial check
        this.toggleVisibility();
    },

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Announce for screen readers
        if (window.A11y) {
            window.A11y.announce('Zurück zum Seitenanfang');
        }
        
        // Focus management
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.focus({ preventScroll: true });
        }
    },

    toggleVisibility() {
        if (!this.button) return;
        
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrolled > this.threshold) {
            this.button.classList.add('is-visible');
            this.button.setAttribute('aria-hidden', 'false');
        } else {
            this.button.classList.remove('is-visible');
            this.button.setAttribute('aria-hidden', 'true');
        }
    },

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('[BackToTop] DOMContentLoaded - initializing');
        BackToTop.init();
    });
} else {
    console.log('[BackToTop] Already loaded - initializing immediately');
    BackToTop.init();
}

// Expose globally
window.BackToTop = BackToTop;
