/**
 * KI ACADEMY - INTERACTIONS
 * Animations, Micro-interactions & Enhanced UX
 */

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

const ScrollReveal = {
    elements: [],
    observer: null,

    init() {
        this.elements = document.querySelectorAll([
            '.preview-card',
            '.section-header',
            '.about-content',
            '.about-card',
            '.feature-item'
        ].join(', '));

        if (this.elements.length === 0) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.elements.forEach(el => el.classList.add('revealed'));
            return;
        }

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.forEach((el, index) => {
            el.style.transitionDelay = `${index * 50}ms`;
            this.observer.observe(el);
        });

        this.addStyles();
    },

    addStyles() {
        if (document.getElementById('scroll-reveal-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'scroll-reveal-styles';
        styles.textContent = `
            .preview-card,
            .section-header,
            .about-content,
            .about-card,
            .feature-item {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }

            .preview-card.revealed,
            .section-header.revealed,
            .about-content.revealed,
            .about-card.revealed,
            .feature-item.revealed {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(styles);
    }
};

// ============================================
// PARALLAX EFFECTS
// ============================================

const ParallaxEffects = {
    elements: [],
    ticking: false,

    init() {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        this.elements = document.querySelectorAll('.hero-particles, .particle');
        if (this.elements.length === 0) return;

        window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    },

    onScroll() {
        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                this.updatePositions();
                this.ticking = false;
            });
            this.ticking = true;
        }
    },

    updatePositions() {
        const scrolled = window.pageYOffset;

        this.elements.forEach((el, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    }
};

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================

const RippleEffect = {
    init() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => this.createRipple(e, button));
        });
        this.addStyles();
    },

    createRipple(event, button) {
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        const rect = button.getBoundingClientRect();

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.querySelector('.ripple');
        if (ripple) ripple.remove();

        button.appendChild(circle);
        setTimeout(() => circle.remove(), 600);
    },

    addStyles() {
        if (document.getElementById('ripple-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'ripple-styles';
        styles.textContent = `
            .btn { position: relative; overflow: hidden; }
            .ripple {
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                background-color: rgba(255, 255, 255, 0.4);
                pointer-events: none;
            }
            @keyframes ripple {
                to { transform: scale(4); opacity: 0; }
            }
            .btn-secondary .ripple { background-color: rgba(231, 111, 81, 0.2); }
        `;
        document.head.appendChild(styles);
    }
};

// ============================================
// CONFETTI CELEBRATION
// ============================================

const Confetti = {
    colors: ['#F5D547', '#F4A261', '#E76F51', '#90A955', '#B7CECE'],
    
    trigger(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 50; i++) {
            this.createParticle(centerX, centerY);
        }
    },

    createParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${this.colors[Math.floor(Math.random() * this.colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
        `;

        document.body.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const velocity = 5 + Math.random() * 5;
        let velocityX = Math.cos(angle) * velocity;
        let velocityY = Math.sin(angle) * velocity - 5;
        let posX = x;
        let posY = y;
        let opacity = 1;

        const animate = () => {
            velocityY += 0.3;
            posX += velocityX;
            posY += velocityY;
            opacity -= 0.02;

            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };

        requestAnimationFrame(animate);
    }
};

// ============================================
// INTERSECTION OBSERVER FOR SECTIONS
// ============================================

const SectionObserver = {
    init() {
        const sections = document.querySelectorAll('section[id]');
        if (sections.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + entry.target.id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));
    }
};

// ============================================
// INITIALIZATION
// ============================================

const Interactions = {
    init() {
        ScrollReveal.init();
        ParallaxEffects.init();
        RippleEffect.init();
        SectionObserver.init();
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Interactions.init());
} else {
    Interactions.init();
}

if (typeof window !== 'undefined') {
    window.KIInteractions = { ...Interactions, Confetti };
}


