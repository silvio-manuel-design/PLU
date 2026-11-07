/**
 * KI ACADEMY - NAVIGATION
 * Mobile Menu, Module Navigation & Routing
 */

// ============================================
// MODULE DROPDOWN NAVIGATION
// ============================================

const ModuleDropdown = {
    dropdown: null,
    toggle: null,
    menu: null,
    isOpen: false,

    init() {
        this.dropdown = document.querySelector('.module-dropdown');
        if (!this.dropdown) return;

        this.toggle = this.dropdown.querySelector('.module-dropdown-toggle');
        this.menu = this.dropdown.querySelector('.module-dropdown-menu');
        
        if (!this.toggle || !this.menu) return;

        this.toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.dropdown.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });

        // Close when clicking a link
        this.menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    },

    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.toggle.setAttribute('aria-expanded', this.isOpen);
        this.dropdown.classList.toggle('open', this.isOpen);
        
        if (window.A11y) {
            window.A11y.announce(this.isOpen ? 'Modul-Menü geöffnet' : 'Modul-Menü geschlossen');
        }
    },

    closeMenu() {
        if (!this.isOpen) return;
        this.isOpen = false;
        this.toggle.setAttribute('aria-expanded', 'false');
        this.dropdown.classList.remove('open');
    }
};

// ============================================
// MOBILE NAVIGATION
// ============================================

const MobileNav = {
    toggle: null,
    menu: null,
    isOpen: false,

    init() {
        this.toggle = document.querySelector('.nav-toggle');
        this.menu = document.querySelector('.nav-menu');
        
        if (!this.toggle || !this.menu) return;

        this.toggle.addEventListener('click', () => this.toggleMenu());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });

        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.toggle.contains(e.target) && !this.menu.contains(e.target)) {
                this.closeMenu();
            }
        });

        this.menu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    },

    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.toggle.setAttribute('aria-expanded', this.isOpen);
        this.menu.classList.toggle('is-open', this.isOpen);
        document.body.style.overflow = this.isOpen ? 'hidden' : '';
        
        if (window.A11y) {
            window.A11y.announce(this.isOpen ? 'Navigation geoffnet' : 'Navigation geschlossen');
        }
    },

    closeMenu() {
        if (!this.isOpen) return;
        this.isOpen = false;
        this.toggle.setAttribute('aria-expanded', 'false');
        this.menu.classList.remove('is-open');
        document.body.style.overflow = '';
    }
};

// ============================================
// MODULE NAVIGATION
// ============================================

const ModuleNav = {
    currentModule: null,
    progress: null,
    currentLang: 'de',

    init() {
        this.currentModule = this.getCurrentModuleFromURL();
        this.currentLang = this.detectLanguage();
        this.progress = window.KIAcademy ? window.KIAcademy.progress : null;
        
        this.renderBottomNav();
        this.highlightCurrentModule();
    },

    detectLanguage() {
        const path = window.location.pathname;
        if (path.includes('/en/') || path.includes('-en.html')) return 'en';
        if (path.includes('/de/')) return 'de';
        return 'de'; // Default
    },

    getCurrentModuleFromURL() {
        const path = window.location.pathname;
        // Match modules/(de|en)/XX- or modules/XX- (old structure)
        const match = path.match(/modules\/(?:de|en)\/(\d+)-/) || path.match(/modules\/(\d+)-/);
        console.log('getCurrentModuleFromURL:', path, 'match:', match);
        return match ? match[1] : null;
    },

    getModulePath(id, folder) {
        // Module 00 is special - different folder names per language
        if (id === '00') {
            if (this.currentLang === 'de') {
                return `../00-willkommen/module-00.html`;
            } else {
                return `../00-welcome/module-00-en.html`;
            }
        }
        // Other modules use language folder and module-XX.html naming
        return `../${this.currentLang}/${folder}/module-${id}.html`;
    },

    renderProgressBar() {
        const percentage = this.progress ? this.progress.getPercentage() : 0;
        const text = this.currentLang === 'de' ? 'abgeschlossen' : 'completed';
        return `
            <div class="sidebar-progress">
                <div class="progress-text">${percentage}% ${text}</div>
                <div class="progress-bar">
                    <div class="progress-bar-fill" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    },

    renderBottomNav() {
        console.log('renderBottomNav called, currentModule:', this.currentModule, 'currentLang:', this.currentLang);
        const container = document.querySelector('.module-bottom-nav');
        console.log('Bottom nav container:', container);
        if (!container || !this.currentModule) {
            console.log('Early return - container:', !!container, 'currentModule:', !!this.currentModule);
            return;
        }

        const modules = [
            { id: '00', folder: '00-willkommen', folderEn: '00-welcome' },
            { id: '01', folder: '01-grundlagen', folderEn: '01-basics' },
            { id: '02', folder: '02-alltag', folderEn: '02-everyday' },
            { id: '03', folder: '03-dialog-grundlagen', folderEn: '03-dialog-basics' },
            { id: '04', folder: '04-system-prompts', folderEn: '04-system-prompts' },
            { id: '05', folder: '05-chain-of-thought', folderEn: '05-chain-of-thought' },
            { id: '06', folder: '06-kreativitaet', folderEn: '06-creativity' },
            { id: '07', folder: '07-kritisches-denken', folderEn: '07-critical-thinking' },
            { id: '08', folder: '08-glossar', folderEn: '08-glossary' }
        ];
        
        const currentIndex = modules.findIndex(m => m.id === this.currentModule);
        const prevModule = currentIndex > 0 ? modules[currentIndex - 1] : null;
        const nextModule = currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;

        const backText = this.currentLang === 'de' ? 'Zurück' : 'Back';
        const nextText = this.currentLang === 'de' ? 'Weiter' : 'Next';
        const homeText = this.currentLang === 'de' ? 'Startseite' : 'Home';

        let html = '';

        // LEFT: Home button for Module 00, Back button for others
        if (this.currentModule === '00') {
            // Module 00: Show Home button (3 levels up: modules/de/00-willkommen/ -> root)
            const homePath = this.currentLang === 'de' ? '../../../index.html' : '../../../index-en.html';
            html += `
                <a href="${homePath}" 
                   class="btn btn-secondary nav-prev">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                    <span>${homeText}</span>
                </a>
            `;
        } else if (prevModule) {
            // Other modules: Show Back button
            let prevPath;
            if (prevModule.id === '00') {
                // Going back to module 00 (from language folder to 00-willkommen/00-welcome)
                // Module 00 is in the same parent folder as the language folders
                prevPath = this.currentLang === 'de' 
                    ? `../00-willkommen/module-00.html`
                    : `../00-welcome/module-00-en.html`;
            } else {
                const folder = this.currentLang === 'de' ? prevModule.folder : prevModule.folderEn;
                // Path from current module to previous (same language folder)
                prevPath = `../${folder}/module-${prevModule.id}${this.currentLang === 'en' ? '-en' : ''}.html`;
            }
            html += `
                <a href="${prevPath}" 
                   class="btn btn-secondary nav-prev">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5"/>
                    </svg>
                    <span>${backText}</span>
                </a>
            `;
        }

        // CENTER: Module indicator dots
        html += `<div class="nav-module-indicator">`;
        for (let i = 0; i <= 8; i++) {
            const dotClass = i === currentIndex ? 'nav-module-dot active' : 'nav-module-dot';
            html += `<span class="${dotClass}"></span>`;
        }
        html += `</div>`;

        // RIGHT: Next button
        if (nextModule) {
            let nextPath;
            if (this.currentModule === '00') {
                // From module 00 (00-willkommen/00-welcome folder) to module 01
                // Module 00 is outside language folders, so path is directly to sibling folder
                const folder = this.currentLang === 'de' ? nextModule.folder : nextModule.folderEn;
                nextPath = `../${folder}/module-${nextModule.id}${this.currentLang === 'en' ? '-en' : ''}.html`;
            } else if (nextModule.id === '00') {
                nextPath = this.currentLang === 'de'
                    ? `../00-willkommen/module-00.html`
                    : `../00-welcome/module-00-en.html`;
            } else {
                const folder = this.currentLang === 'de' ? nextModule.folder : nextModule.folderEn;
                // Path from current module to next (same language folder)
                nextPath = `../${folder}/module-${nextModule.id}${this.currentLang === 'en' ? '-en' : ''}.html`;
            }
            html += `
                <a href="${nextPath}" 
                   class="btn btn-primary nav-next">
                    <span>${nextText}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19"/>
                    </svg>
                </a>
            `;
        } else if (this.currentModule === '08') {
            // Glossary: No finish button, show reference info
            html += `
                <span class="nav-finish-info">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="16" x2="12" y2="12"/>
                        <line x1="12" y1="8" x2="12.01" y2="8"/>
                    </svg>
                    <span>${this.currentLang === 'de' ? 'Nachschlagewerk' : 'Reference'}</span>
                </span>
            `;
        } else {
            html += `
                <button class="btn btn-primary nav-finish" id="finish-tutorial">
                    <span>${this.currentLang === 'de' ? 'Abschliessen' : 'Complete'}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                </button>
            `;
        }

        container.innerHTML = html;

        const finishBtn = container.querySelector('#finish-tutorial');
        if (finishBtn) {
            finishBtn.addEventListener('click', () => this.finishTutorial());
        }
    },

    getModuleName(id) {
        const names = {
            'de': {
                '00': 'Willkommen',
                '01': 'Grundlagen',
                '02': 'Alltag',
                '03': 'Dialog-Grundlagen',
                '04': 'System-Prompts',
                '05': 'Chain of Thought',
                '06': 'Kreativität',
                '07': 'Kritisches Denken',
                '08': 'Glossar'
            },
            'en': {
                '00': 'Welcome',
                '01': 'Fundamentals',
                '02': 'Everyday',
                '03': 'Dialog Basics',
                '04': 'System Prompts',
                '05': 'Chain of Thought',
                '06': 'Creativity',
                '07': 'Critical Thinking',
                '08': 'Glossary'
            }
        };
        return names[this.currentLang][id] || '';
    },

    highlightCurrentModule() {
        document.querySelectorAll('.module-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href && (href.includes(this.currentModule) || href.includes(`/${this.currentModule}-`))) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    },

    finishTutorial() {
        if (this.progress) {
            this.progress.completeModule(this.currentModule);
            
            // Update progress bar immediately
            const percentage = this.progress.getPercentage();
            const progressValue = document.querySelector('.progress-value');
            const progressBarFill = document.querySelector('.progress-bar-fill');
            const progressBar = document.querySelector('.progress-bar[role="progressbar"]');
            
            if (progressValue) {
                progressValue.textContent = percentage + '%';
            }
            if (progressBarFill) {
                progressBarFill.style.width = percentage + '%';
            }
            if (progressBar) {
                progressBar.setAttribute('aria-valuenow', percentage);
            }
        }
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay is-open';
        modal.innerHTML = `
            <div class="modal" role="dialog" aria-modal="true">
                <div class="modal-header">
                    <h2 class="modal-title">${this.currentLang === 'de' ? 'Herzlichen Glückwunsch!' : 'Congratulations!'}</h2>
                </div>
                <div class="modal-body">
                    <p>${this.currentLang === 'de' 
                        ? 'Sie haben das KI Academy Tutorial erfolgreich abgeschlossen.' 
                        : 'You have successfully completed the KI Academy tutorial.'}</p>
                </div>
                <div class="modal-footer">
                    <a href="../../../index.html" class="btn btn-primary">${this.currentLang === 'de' ? 'Zur Startseite' : 'Back to Home'}</a>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        if (window.A11y) {
            window.A11y.announce(this.currentLang === 'de' 
                ? 'Tutorial erfolgreich abgeschlossen!' 
                : 'Tutorial successfully completed!');
        }
    }
};

// ============================================
// BREADCRUMB NAVIGATION
// ============================================

const Breadcrumb = {
    init() {
        const container = document.querySelector('.breadcrumb');
        if (!container) return;

        const currentModule = ModuleNav.currentModule;
        const currentLang = ModuleNav.currentLang;
        const moduleName = currentModule ? ModuleNav.getModuleName(currentModule) : null;

        let html = `
            <nav aria-label="Breadcrumb">
                <ol class="breadcrumb-list">
                    <li class="breadcrumb-item">
                        <a href="${currentLang === 'de' ? '../../../index.html' : '../../../index-en.html'}">${currentLang === 'de' ? 'Start' : 'Home'}</a>
                    </li>
        `;

        if (currentModule) {
            html += `
                    <li class="breadcrumb-separator" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"/>
                        </svg>
                    </li>
                    <li class="breadcrumb-item">
                        <a href="index.html" aria-current="page">${moduleName}</a>
                    </li>
            `;
        }

        html += `
                </ol>
            </nav>
        `;

        container.innerHTML = html;
    }
};

// ============================================
// INITIALIZATION
// ============================================

const Navigation = {
    init() {
        console.log('Navigation.init() called');
        ModuleDropdown.init();
        MobileNav.init();
        ModuleNav.init();
        Breadcrumb.init();
        console.log('Navigation.init() completed');
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded - initializing Navigation');
        Navigation.init();
    });
} else {
    console.log('Document already loaded - initializing Navigation immediately');
    Navigation.init();
}

if (typeof window !== 'undefined') {
    window.KINavigation = Navigation;
}
