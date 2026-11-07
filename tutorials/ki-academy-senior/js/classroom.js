/**
 * KI ACADEMY - CLASSROOM MODE
 * Presentation Mode for Teaching (10m readability)
 * Academic Standard: No !important rules - using specificity instead
 */

const ClassroomMode = {
    isActive: false,
    
    init() {
        // Check for stored preference
        const stored = localStorage.getItem('ki_academy_classroom');
        if (stored === 'true') {
            this.isActive = true;
        }
        
        this.applyMode();
        this.initToggle();
    },

    initToggle() {
        const toggles = document.querySelectorAll('.classroom-toggle');
        if (toggles.length === 0) return;
        
        toggles.forEach(toggle => {
            toggle.addEventListener('click', () => this.toggle());
            
            // Update initial state
            if (this.isActive) {
                toggle.classList.add('active');
            }
        });
    },

    toggle() {
        this.isActive = !this.isActive;
        this.applyMode();
        localStorage.setItem('ki_academy_classroom', this.isActive);
        
        // Update all toggle buttons
        const toggles = document.querySelectorAll('.classroom-toggle');
        toggles.forEach(toggle => {
            toggle.classList.toggle('active', this.isActive);
        });
        
        // Announce change
        if (window.A11y && window.I18n) {
            const msg = this.isActive 
                ? window.I18n.t('classroom.on')
                : window.I18n.t('classroom.off');
            window.A11y.announce(msg);
        }
    },

    applyMode() {
        document.body.classList.toggle('classroom-mode', this.isActive);
        
        // Add/remove classroom stylesheet
        let styleSheet = document.getElementById('classroom-styles');
        
        if (this.isActive) {
            if (!styleSheet) {
                styleSheet = document.createElement('style');
                styleSheet.id = 'classroom-styles';
                styleSheet.textContent = this.getClassroomStyles();
                document.head.appendChild(styleSheet);
            }
        } else if (styleSheet) {
            styleSheet.remove();
        }
    },

    getClassroomStyles() {
        return `
            /* CLASSROOM MODE - Optimized for 10m viewing distance */
            /* Academic Standard: Specificity over !important */
            
            html body.classroom-mode {
                font-size: 24px;
                line-height: 1.8;
            }
            
            html body.classroom-mode .container,
            html body.classroom-mode .container-premium,
            html body.classroom-mode .hero-premium-container,
            html body.classroom-mode .module-layout {
                max-width: 100%;
                padding-left: 60px;
                padding-right: 60px;
            }
            
            html body.classroom-mode .hero-content {
                max-width: 100%;
                padding-left: 60px;
                padding-right: 60px;
            }
            
            html body.classroom-mode .module-layout {
                font-size: 24px;
                line-height: 1.8;
            }
            
            /* Typography Scale for Large Screens */
            html body.classroom-mode h1 {
                font-size: 4rem;
                line-height: 1.2;
            }
            
            html body.classroom-mode h2 {
                font-size: 3rem;
                line-height: 1.3;
            }
            
            html body.classroom-mode h3 {
                font-size: 2.5rem;
            }
            
            html body.classroom-mode p,
            html body.classroom-mode li {
                font-size: 1.5rem;
                line-height: 1.8;
                max-width: 80ch;
            }
            
            /* Interactive Elements */
            html body.classroom-mode .btn {
                font-size: 1.5rem;
                padding: 1rem 2rem;
                min-height: 64px;
            }
            
            /* Card Components */
            html body.classroom-mode .preview-card {
                padding: 2rem;
            }
            
            html body.classroom-mode .preview-title {
                font-size: 1.75rem;
            }
            
            html body.classroom-mode .preview-desc {
                font-size: 1.25rem;
            }
            
            /* Hero Section */
            html body.classroom-mode .hero-title {
                font-size: 5rem;
            }
            
            html body.classroom-mode .hero-subtitle {
                font-size: 2rem;
            }
            
            /* Section Headers */
            html body.classroom-mode .section-title {
                font-size: 3.5rem;
            }
            
            html body.classroom-mode .section-subtitle {
                font-size: 1.75rem;
            }
            
            /* Icons */
            html body.classroom-mode .icon-circle {
                width: 80px;
                height: 80px;
            }
            
            html body.classroom-mode .icon-circle svg {
                width: 48px;
                height: 48px;
            }
            
            /* Stats & Numbers */
            html body.classroom-mode .module-number {
                font-size: 2rem;
            }
            
            html body.classroom-mode .stat-number {
                font-size: 3rem;
            }
            
            html body.classroom-mode .stat-label {
                font-size: 1.25rem;
            }
            
            /* Module Page Specific Styles */
            html body.classroom-mode .module-hero-title {
                font-size: 4rem;
            }
            
            html body.classroom-mode .module-hero-subtitle {
                font-size: 2rem;
            }
            
            html body.classroom-mode .content-section h2 {
                font-size: 3rem;
            }
            
            html body.classroom-mode .content-section .lead {
                font-size: 1.5rem;
            }
            
            /* Quiz Elements */
            html body.classroom-mode .quiz-question {
                font-size: 2rem;
            }
            
            html body.classroom-mode .quiz-btn {
                font-size: 1.5rem;
                padding: 1rem 2rem;
            }
            
            /* Hide decorative elements in classroom mode */
            html body.classroom-mode .hero-particles,
            html body.classroom-mode .scroll-indicator,
            html body.classroom-mode .module-hero-bg {
                display: none;
            }
            
            /* High Contrast Variables */
            html body.classroom-mode {
                --color-anthracite: #1a1a1a;
                --color-gray-dark: #4a4a4a;
            }
            
            html body.classroom-mode[data-theme="dark"] {
                --color-cream: #0a0a0a;
                --color-anthracite: #f5f5f5;
            }
        `;
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ClassroomMode.init());
} else {
    ClassroomMode.init();
}

window.ClassroomMode = ClassroomMode;
