/**
 * CLASSROOM MODE MODULE
 * Spezielle Darstellung für Hörsaal-Präsentationen
 * 
 * Features:
 * - Größere Schriftarten für bessere Lesbarkeit aus der Distanz
 * - Höherer Kontrast
 * - Keine Animationen (Ablenkung)
 * - Größere Klick-Targets
 */

export class ClassroomManager {
  constructor() {
    this.STORAGE_KEY = 'plu-classroom-mode';
    this.html = document.documentElement;
    this.toggleBtn = document.getElementById('classroom-toggle');
    
    this.init();
  }

  init() {
    // Prüfe gespeicherten Zustand
    const savedState = localStorage.getItem(this.STORAGE_KEY);
    
    if (savedState === 'true') {
      this.activate();
    }
    
    // Event Listener
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggle());
    }
    
    // Keyboard Shortcut: Shift + C
    document.addEventListener('keydown', (e) => {
      if (e.shiftKey && e.key === 'C') {
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
      this.toggleBtn.title = 'Classroom Mode: AN (Shift+C)';
    }
    
    localStorage.setItem(this.STORAGE_KEY, 'true');
    
    // Benachrichtigung
    this.showNotification('Classroom Mode aktiviert - Optimale Lesbarkeit für Präsentationen');
  }

  deactivate() {
    this.html.classList.remove('classroom-mode');
    
    if (this.toggleBtn) {
      this.toggleBtn.classList.remove('active');
      this.toggleBtn.setAttribute('aria-pressed', 'false');
      this.toggleBtn.title = 'Classroom Mode (Shift+C)';
    }
    
    localStorage.setItem(this.STORAGE_KEY, 'false');
    
    this.showNotification('Classroom Mode deaktiviert');
  }

  isActive() {
    return this.html.classList.contains('classroom-mode');
  }

  showNotification(message) {
    // Einfache Toast-Notification
    const toast = document.createElement('div');
    toast.className = 'classroom-toast';
    toast.textContent = message;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    
    document.body.appendChild(toast);
    
    // Animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
    
    // Entfernen nach 3 Sekunden
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

/**
 * WebP Feature Detection für Parallax-Bilder
 * Falls WebP nicht unterstützt, Fallback auf JPG
 */

export function initWebPFallback() {
  // Prüfe WebP-Unterstützung
  const canUseWebP = () => {
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  };

  if (!canUseWebP()) {
    // Ersetze alle WebP-Hintergründe mit JPG Fallback
    const parallaxBgs = document.querySelectorAll('.parallax-bg[data-fallback]');
    
    parallaxBgs.forEach(bg => {
      const fallbackUrl = bg.dataset.fallback;
      if (fallbackUrl) {
        bg.style.backgroundImage = `url('${fallbackUrl}')`;
      }
    });
    
    console.log('WebP nicht unterstützt - Fallback auf JPG aktiviert');
  }
}
