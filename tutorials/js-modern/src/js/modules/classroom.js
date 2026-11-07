/**
 * Classroom Mode + FAB + Mobile Navigation Manager
 * PLU Standard Pattern
 */

import { t } from './i18n.js';

export class ClassroomManager {
  constructor() {
    this.STORAGE_KEY = 'quest-classroom-mode';
    this.html = document.documentElement;
    this.toggleBtn = document.getElementById('classroom-toggle');
    this.init();
  }

  init() {
    const savedState = localStorage.getItem(this.STORAGE_KEY);
    if (savedState === 'true') {
      this.activate();
    }

    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggle());
    }

    document.addEventListener('keydown', (e) => {
      if (e.shiftKey && e.key === 'C') {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  toggle() {
    if (this.isActive()) {
      this.deactivate();
    } else {
      this.activate();
    }
  }

  activate() {
    this.html.classList.add('classroom-mode');
    if (this.toggleBtn) {
      this.toggleBtn.classList.add('active');
      this.toggleBtn.setAttribute('aria-pressed', 'true');
      this.toggleBtn.setAttribute('data-tooltip', 'Classroom Mode: AN (Shift+C)');
    }
    localStorage.setItem(this.STORAGE_KEY, 'true');
    this.showNotification(t('classroom.on'));
  }

  deactivate() {
    this.html.classList.remove('classroom-mode');
    if (this.toggleBtn) {
      this.toggleBtn.classList.remove('active');
      this.toggleBtn.setAttribute('aria-pressed', 'false');
      this.toggleBtn.setAttribute('data-tooltip', 'Classroom Mode (Shift+C)');
    }
    localStorage.setItem(this.STORAGE_KEY, 'false');
    this.showNotification(t('classroom.off'));
  }

  isActive() {
    return this.html.classList.contains('classroom-mode');
  }

  showNotification(message) {
    const existing = document.querySelector('.classroom-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'classroom-toast';
    toast.textContent = message;
    toast.setAttribute('role', 'status');
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }
}

/**
 * Back-to-Top Button (Desktop FAB + Mobile Header)
 */
export function initBackToTop() {
  const desktopBtn = document.getElementById('back-to-top');
  const mobileBtn = document.getElementById('header-top');

  const toggle = () => {
    const show = window.scrollY > 300;
    if (desktopBtn) {
      desktopBtn.classList.toggle('visible', show);
    }
    if (mobileBtn) {
      mobileBtn.classList.toggle('visible', show);
    }
  };

  window.addEventListener('scroll', toggle, { passive: true });
  toggle();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  if (desktopBtn) desktopBtn.addEventListener('click', scrollToTop);
  if (mobileBtn) mobileBtn.addEventListener('click', scrollToTop);
}

/**
 * Mobile Hamburger Menu
 */
export function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('mobile-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('active');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close on link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Handle scroll-to-top links without inline onclick
  nav.querySelectorAll('[data-scroll-top]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      nav.classList.remove('active');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.site-header') && nav.classList.contains('active')) {
      nav.classList.remove('active');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Mobile Quest Progress in Bottom Bar
 */
export function initMobileQuestProgress(worldId, questId) {
  if (window.innerWidth >= 1024) return;

  const progressEl = document.getElementById('fab-progress');
  const dotsEl = document.getElementById('fab-dots');
  if (!progressEl || !dotsEl) return;

  // Diese Funktion wird von der Quest-Seite aufgerufen
  // Für die Hub-Seite zeigen wir nur den aktuellen Gesamtfortschritt
  progressEl.classList.remove('u-hidden');
}
