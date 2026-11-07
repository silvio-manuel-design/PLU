/**
 * MODAL MANAGER
 * Handles modal dialogs for KI Charter and other content
 * 
   * Features:
 * - Accessible (ARIA attributes, focus trap)
 * - Close on ESC, backdrop click, or close button
 * - Prevent body scroll when open
 */

export class ModalManager {
  constructor() {
    this.activeModal = null;
    this.previousActiveElement = null;
    
    this.init();
  }

  init() {
    // Initialize charter card modals
    this.initCharterModals();
    
    // Global event listeners
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
    
    // Close on backdrop click
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        this.close();
      }
    });
  }

  initCharterModals() {
    const charterCards = document.querySelectorAll('.charter-card[data-modal]');
    
    charterCards.forEach(card => {
      card.addEventListener('click', () => {
        const modalId = card.dataset.modal;
        this.openCharterModal(modalId);
      });
      
      // Make cards keyboard accessible
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const modalId = card.dataset.modal;
          this.openCharterModal(modalId);
        }
      });
    });
  }

  openCharterModal(modalId) {
    // Content for each charter value
    const modalContent = this.getCharterContent(modalId);
    if (!modalContent) return;
    
    // Detect language for aria-label
    const lang = document.documentElement.lang || 'de';
    const isEnglish = lang === 'en' || window.location.href.includes('-en');
    const closeLabel = isEnglish ? 'Close' : 'Schließen';
    
    // Create modal HTML
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modal-title');
    
    modal.innerHTML = `
      <div class="modal">
        <button class="modal-close" aria-label="${closeLabel}">
          <i class="ph ph-x"></i>
        </button>
        <div class="modal-header">
          <div class="modal-icon">${modalContent.icon}</div>
          <h3 id="modal-title">${modalContent.title}</h3>
        </div>
        <div class="modal-body">
          ${modalContent.body}
        </div>
      </div>
    `;
    
    // Add close button listener
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => this.close());
    
    // Store reference and open
    this.open(modal);
  }

  getCharterContent(modalId) {
    // Detect language from HTML lang attribute
    const lang = document.documentElement.lang || 'de';
    const isEnglish = lang === 'en' || window.location.href.includes('-en');
    
    const content = {
      'de': {
        'critical-thinking': {
          icon: '<i class="ph ph-brain"></i>',
          title: 'Kritisches Denken',
          body: `
            <p>KI generiert Vorschläge – wir prüfen, hinterfragen und entscheiden. Die KI ist ein Werkzeug, keine Autorität. Sie kann Fehler machen, Halluzinationen produzieren oder biased sein.</p>
            <h4>Praktische Anwendung:</h4>
            <ul>
              <li>Prüfe Fakten mit vertrauenswürdigen Quellen</li>
              <li>Hinterfrage Annahmen in KI-Outputs</li>
              <li>Vertraue deinem Expertenwissen</li>
              <li>Die finale Entscheidung liegt immer bei dir</li>
            </ul>
          `
        },
        'human-responsibility': {
          icon: '<i class="ph ph-hand-grabbing"></i>',
          title: 'Menschliche Verantwortung',
          body: `
            <p>Technologie dient dem Menschen. Nicht umgekehrt. Wir behalten die Kontrolle über die Werkzeuge, die wir nutzen.</p>
            <h4>Praktische Anwendung:</h4>
            <ul>
              <li>Du entscheidest, welche KI-Tools du nutzt</li>
              <li>Du entscheidest, wie du KI-Outputs verwendest</li>
              <li>Du trägst die Verantwortung für deine Arbeit</li>
              <li>Du bestimmst die ethischen Grenzen</li>
            </ul>
          `
        },
        'practical-application': {
          icon: '<i class="ph ph-wrench"></i>',
          title: 'Praxisnahe Anwendung',
          body: `
            <p>Theorie ist gut. Praxis macht den Unterschied. KI-Wissen wird erst durch Anwendung wirklich nutzbar.</p>
            <h4>Praktische Anwendung:</h4>
            <ul>
              <li>Starte sofort mit einem konkreten Projekt</li>
              <li>Lerne aus Fehlern und Iterationen</li>
              <li>Dokumentiere deine Learnings</li>
              <li>Teile Wissen mit anderen</li>
            </ul>
          `
        },
        'data-sovereignty': {
          icon: '<i class="ph ph-lock-key"></i>',
          title: 'Datensouveränität',
          body: `
            <p>Wir gehen verantwortungsvoll und transparent mit Daten um. Datenschutz ist kein optionaler Bonus, sondern Grundvoraussetzung.</p>
            <h4>Praktische Anwendung:</h4>
            <ul>
              <li>Keine sensiblen Daten in öffentliche KI-Tools eingeben</li>
              <li>Nutze Enterprise-Lösungen für vertrauliche Inhalte</li>
              <li>Informiere dich über AGBs deiner Tools</li>
              <li>Behalte die Kontrolle über deine Daten</li>
            </ul>
          `
        }
      },
      'en': {
        'critical-thinking': {
          icon: '<i class="ph ph-brain"></i>',
          title: 'Critical Thinking',
          body: `
            <p>AI generates suggestions – we verify, question, and decide. AI is a tool, not an authority. It can make mistakes, produce hallucinations, or exhibit bias.</p>
            <h4>Practical Application:</h4>
            <ul>
              <li>Verify facts with trusted sources</li>
              <li>Question assumptions in AI outputs</li>
              <li>Trust your expert knowledge</li>
              <li>The final decision always rests with you</li>
            </ul>
          `
        },
        'human-responsibility': {
          icon: '<i class="ph ph-hand-grabbing"></i>',
          title: 'Human Responsibility',
          body: `
            <p>Technology serves humanity. Not the other way around. We maintain control over the tools we use.</p>
            <h4>Practical Application:</h4>
            <ul>
              <li>You decide which AI tools to use</li>
              <li>You decide how to utilise AI outputs</li>
              <li>You bear responsibility for your work</li>
              <li>You determine the ethical boundaries</li>
            </ul>
          `
        },
        'practical-application': {
          icon: '<i class="ph ph-wrench"></i>',
          title: 'Practical Application',
          body: `
            <p>Theory is valuable. Practice makes the difference. AI knowledge only becomes truly useful through application.</p>
            <h4>Practical Application:</h4>
            <ul>
              <li>Start immediately with a concrete project</li>
              <li>Learn from mistakes and iterations</li>
              <li>Document your learnings</li>
              <li>Share knowledge with others</li>
            </ul>
          `
        },
        'data-sovereignty': {
          icon: '<i class="ph ph-lock-key"></i>',
          title: 'Data Sovereignty',
          body: `
            <p>We handle data responsibly and transparently. Data protection is not an optional bonus, but a fundamental requirement.</p>
            <h4>Practical Application:</h4>
            <ul>
              <li>Do not enter sensitive data into public AI tools</li>
              <li>Use enterprise solutions for confidential content</li>
              <li>Inform yourself about the terms of service of your tools</li>
              <li>Maintain control over your data</li>
            </ul>
          `
        }
      }
    };
    
    const langContent = isEnglish ? content['en'] : content['de'];
    return langContent[modalId];
  }

  open(modalElement) {
    // Store previously focused element
    this.previousActiveElement = document.activeElement;
    
    // Add to DOM
    document.body.appendChild(modalElement);
    this.activeModal = modalElement;
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus trap
    this.focusFirstElement();
    
    // Animation
    requestAnimationFrame(() => {
      modalElement.classList.add('active');
    });
  }

  close() {
    if (!this.activeModal) return;
    
    // Animation out
    this.activeModal.classList.remove('active');
    
    // Remove after animation
    setTimeout(() => {
      this.activeModal.remove();
      this.activeModal = null;
      
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Restore focus
      if (this.previousActiveElement) {
        this.previousActiveElement.focus();
      }
    }, 300);
  }

  handleKeydown(e) {
    if (!this.activeModal) return;
    
    // Close on ESC
    if (e.key === 'Escape') {
      this.close();
      return;
    }
    
    // Focus trap
    if (e.key === 'Tab') {
      const focusableElements = this.activeModal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  focusFirstElement() {
    const focusable = this.activeModal.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable) {
      focusable.focus();
    }
  }
}
