/**
 * KI ACADEMY - PREMIUM HERO PARALLAX & SCROLL ANIMATIONS
 * Mindblowing scroll effects for the hero section
 */

const HeroParallax = {
    hero: null,
    heroBg: null,
    content: null,
    sprintCard: null,
    ticking: false,
    
    init() {
        this.hero = document.querySelector('.hero-premium');
        if (!this.hero) return;
        
        // Skip all parallax effects on mobile
        if (window.innerWidth <= 640) return;
        
        this.heroBg = this.hero.querySelector('.hero-bg-image');
        this.content = this.hero.querySelector('.hero-premium-content');
        this.sprintCard = this.hero.querySelector('.sprint-preview-card');
        
        // Initial animation on load
        this.animateEntrance();
        
        // Scroll listener with RAF optimization
        window.addEventListener('scroll', () => this.onScroll(), { passive: true });
        
        // Mouse move for subtle parallax (desktop only)
        if (window.matchMedia('(pointer: fine)').matches) {
            this.hero.addEventListener('mousemove', (e) => this.onMouseMove(e));
        }
    },
    
    animateEntrance() {
        // Content fade in with stagger
        const elements = this.content.querySelectorAll('.hero-trust-badge, .hero-premium-title, .hero-premium-subtitle, .hero-audience-pills, .hero-benefits, .hero-premium-cta, .hero-social-proof');
        
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });
        
        // Sprint card entrance with delay
        if (this.sprintCard) {
            this.sprintCard.style.opacity = '0';
            this.sprintCard.style.transform = 'translateX(50px) scale(0.95)';
            this.sprintCard.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
            
            setTimeout(() => {
                this.sprintCard.style.opacity = '1';
                this.sprintCard.style.transform = 'translateX(0) scale(1)';
            }, 600);
        }
    },
    
    onScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateParallax();
                this.ticking = false;
            });
            this.ticking = true;
        }
    },
    
    updateParallax() {
        // Skip parallax on mobile
        if (window.innerWidth <= 640) return;
        
        const scrollY = window.scrollY;
        const heroHeight = this.hero.offsetHeight;
        const scrollProgress = Math.min(scrollY / heroHeight, 1);
        
        // Background parallax - moves slower than scroll
        const bgOffset = scrollY * 0.4;
        if (this.heroBg) {
            this.heroBg.style.transform = `translateY(${bgOffset}px) scale(1.1)`;
        }
        
        // Content fade out on scroll
        if (this.content) {
            const contentOpacity = 1 - (scrollProgress * 1.5);
            const contentOffset = scrollProgress * -50;
            this.content.style.opacity = Math.max(contentOpacity, 0);
            this.content.style.transform = `translateY(${contentOffset}px)`;
        }
        
        // Sprint card parallax - moves faster (depth effect)
        if (this.sprintCard) {
            const cardOffset = scrollProgress * 80;
            const cardRotate = scrollProgress * 5;
            this.sprintCard.style.transform = `translateY(${cardOffset}px) rotateY(${cardRotate}deg)`;
            this.sprintCard.style.opacity = 1 - (scrollProgress * 0.8);
        }
        
        // Floating accent elements if they exist
        const accents = this.hero.querySelectorAll('.hero-floating-accent');
        accents.forEach((accent, index) => {
            const speed = 0.2 + (index * 0.1);
            const accentOffset = scrollY * speed;
            accent.style.transform = `translateY(${accentOffset}px)`;
        });
    },
    
    onMouseMove(e) {
        // Skip mouse effects on mobile/touch devices
        if (window.innerWidth <= 640) return;
        if (window.scrollY > 100) return; // Only when at top
        
        const rect = this.hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        // Subtle mouse parallax on sprint card
        if (this.sprintCard) {
            const rotateX = y * -5;
            const rotateY = x * 5;
            this.sprintCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
        
        // Background subtle shift
        if (this.heroBg) {
            const bgShiftX = x * 15;
            const bgShiftY = y * 15;
            const scrollOffset = window.scrollY * 0.4;
            this.heroBg.style.transform = `translate(${bgShiftX}px, ${scrollOffset + bgShiftY}px) scale(1.1)`;
        }
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => HeroParallax.init());
} else {
    HeroParallax.init();
}

// Expose globally
window.HeroParallax = HeroParallax;
