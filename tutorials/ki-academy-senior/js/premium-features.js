/**
 * KI ACADEMY SENIOR - PREMIUM FEATURES
 * Micro-Aha-Momente, Sprint-Navigation, Progress Celebrations
 */

// ============================================
// SPRINT CONFIGURATION
// ============================================
const SPRINT_CONFIG = {
  sprint1: {
    name: "KI-Verständnis",
    modules: ["00", "01", "02"],
    time: "30 Minuten",
    description: "Von den Grundlagen bis zur Alltagsanwendung",
    color: "apricot"
  },
  sprint2: {
    name: "KI-Dialog",
    modules: ["03", "04", "05"],
    time: "35 Minuten",
    description: "Kommunikation und Gesprächsführung",
    color: "sage"
  },
  sprint3: {
    name: "KI-Meisterschaft",
    modules: ["06", "07", "08"],
    time: "40 Minuten",
    description: "Kreativität, kritisches Denken und Expertenwissen",
    color: "terracotta"
  }
};

// ============================================
// PREMIUM FEATURES CLASS
// ============================================
class PremiumFeatures {
  constructor() {
    this.currentModule = document.body.dataset.module || '00';
    this.init();
  }

  init() {
    this.initSprintNavigator();
    this.initTryItBoxes();
    this.initCopyButtons();
    this.initReflectionCards();
    this.initCelebrations();
    this.initSoWhatBridge();
  }

  // ============================================
  // SPRINT NAVIGATOR
  // ============================================
  initSprintNavigator() {
    const container = document.querySelector('.module-main');
    if (!container) return;

    // Find current sprint
    let currentSprint = null;
    let sprintPosition = 0;
    
    for (const [key, sprint] of Object.entries(SPRINT_CONFIG)) {
      const idx = sprint.modules.indexOf(this.currentModule);
      if (idx !== -1) {
        currentSprint = { key, ...sprint };
        sprintPosition = idx;
        break;
      }
    }

    if (!currentSprint) return;

    // Create sprint navigator HTML
    const navigatorHTML = this.createSprintNavigatorHTML(currentSprint, sprintPosition);
    
    // Insert after progress bar
    const progressBar = container.querySelector('.module-progress');
    if (progressBar) {
      progressBar.insertAdjacentHTML('afterend', navigatorHTML);
    }
  }

  createSprintNavigatorHTML(sprint, position) {
    const modules = sprint.modules.map((mod, idx) => {
      const isActive = idx === position;
      const isCompleted = idx < position;
      const moduleNames = {
        '00': 'Willkommen',
        '01': 'Grundlagen',
        '02': 'Alltag',
        '03': 'Kommunikation',
        '04': 'Dialog-Basis',
        '05': 'Dialog-Profi',
        '06': 'Kreativität',
        '07': 'Kritisches Denken',
        '08': 'Glossar'
      };

      const href = mod === '00' 
        ? '../00-willkommen/module-00.html'
        : `../${mod.padStart(2, '0')}-${this.getModuleFolder(mod)}/module-${mod.padStart(2, '0')}.html`;

      return `
        <a href="${href}" class="sprint-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}">
          <span class="sprint-step-num">${idx + 1}</span>
          <span class="sprint-step-label">${moduleNames[mod]}</span>
        </a>
        ${idx < sprint.modules.length - 1 ? '<span class="sprint-arrow">→</span>' : ''}
      `;
    }).join('');

    return `
      <div class="sprint-navigator">
        <div class="sprint-header">
          <div class="sprint-title">
            <span class="sprint-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              Sprint: ${sprint.name}
            </span>
          </div>
          <span class="sprint-time">${sprint.time}</span>
        </div>
        <div class="sprint-steps">
          ${modules}
        </div>
      </div>
    `;
  }

  getModuleFolder(mod) {
    const folders = {
      '00': '00-willkommen',
      '01': '01-grundlagen',
      '02': '02-alltag',
      '03': '03-kommunikation',
      '04': '04-dialog-grundlagen',
      '05': '05-dialog-profi',
      '06': '06-kreativitaet',
      '07': '07-kritisches-denken',
      '08': '08-glossar'
    };
    return folders[mod] || '';
  }

  // ============================================
  // TRY-IT-NOW BOXES
  // ============================================
  initTryItBoxes() {
    // Add copy functionality to all try-it boxes
    document.querySelectorAll('.try-it-box').forEach(box => {
      const copyBtn = box.querySelector('.try-it-copy');
      const promptText = box.querySelector('.try-it-prompt-text');
      
      if (copyBtn && promptText) {
        copyBtn.addEventListener('click', () => {
          this.copyToClipboard(promptText.textContent, copyBtn);
        });
      }
    });
  }

  // ============================================
  // COPY BUTTONS
  // ============================================
  initCopyButtons() {
    document.querySelectorAll('.prompt-copy, .try-it-copy').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const text = btn.dataset.prompt || 
                    btn.closest('.prompt-card')?.querySelector('.prompt-text')?.textContent ||
                    btn.closest('.try-it-prompt')?.querySelector('.try-it-prompt-text')?.textContent;
        
        if (text) {
          this.copyToClipboard(text.trim(), btn);
        }
      });
    });
  }

  async copyToClipboard(text, button) {
    try {
      await navigator.clipboard.writeText(text);
      
      // Visual feedback
      const originalHTML = button.innerHTML;
      button.classList.add('copied');
      button.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      `;
      
      setTimeout(() => {
        button.classList.remove('copied');
        button.innerHTML = originalHTML;
      }, 2000);
      
      // Show mini celebration
      this.showMiniToast('📋 In die Zwischenablage kopiert!');
    } catch (err) {
      console.error('Copy failed:', err);
    }
  }

  // ============================================
  // REFLECTION CARDS
  // ============================================
  initReflectionCards() {
    document.querySelectorAll('.reflection-card').forEach(card => {
      const textarea = card.querySelector('.reflection-textarea');
      const saveBtn = card.querySelector('.reflection-save');
      const savedMsg = card.querySelector('.reflection-saved');
      
      if (!textarea) return;
      
      // Load saved reflection
      const savedKey = `reflection_${this.currentModule}_${textarea.dataset.reflectionId || '1'}`;
      const savedValue = localStorage.getItem(savedKey);
      if (savedValue) {
        textarea.value = savedValue;
      }
      
      // Auto-save on input (debounced)
      let saveTimeout;
      textarea.addEventListener('input', () => {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
          localStorage.setItem(savedKey, textarea.value);
        }, 1000);
      });
      
      // Save button
      if (saveBtn) {
        saveBtn.addEventListener('click', () => {
          localStorage.setItem(savedKey, textarea.value);
          if (savedMsg) {
            savedMsg.classList.add('visible');
            setTimeout(() => savedMsg.classList.remove('visible'), 3000);
          }
          this.showMiniToast('💾 Ihre Notiz wurde gespeichert');
        });
      }
    });
  }

  // ============================================
  // CELEBRATIONS
  // ============================================
  initCelebrations() {
    // Check for module completion
    this.checkModuleCompletion();
    
    // Check for sprint completion
    this.checkSprintCompletion();
  }

  checkModuleCompletion() {
    const checkbox = document.querySelector('.module-complete-check input[type="checkbox"]');
    if (!checkbox) return;
    
    // Check if already celebrated
    const celebratedKey = `celebrated_module_${this.currentModule}`;
    const alreadyCelebrated = localStorage.getItem(celebratedKey);
    
    if (checkbox.checked && !alreadyCelebrated) {
      this.showCelebration('modul', this.currentModule);
      localStorage.setItem(celebratedKey, 'true');
    }
    
    // Listen for checkbox change
    checkbox.addEventListener('change', () => {
      if (checkbox.checked && !localStorage.getItem(celebratedKey)) {
        this.showCelebration('modul', this.currentModule);
        localStorage.setItem(celebratedKey, 'true');
      }
    });
  }

  checkSprintCompletion() {
    for (const [key, sprint] of Object.entries(SPRINT_CONFIG)) {
      const allCompleted = sprint.modules.every(mod => {
        return localStorage.getItem(`ki_academy_module_${mod}_completed`) === 'true' ||
               localStorage.getItem(`celebrated_module_${mod}`) === 'true';
      });
      
      const celebratedKey = `celebrated_sprint_${key}`;
      if (allCompleted && !localStorage.getItem(celebratedKey)) {
        this.showCelebration('sprint', key);
        localStorage.setItem(celebratedKey, 'true');
        break; // Only show one celebration at a time
      }
    }
  }

  showCelebration(type, id) {
    const messages = {
      modul: {
        icon: '🎉',
        title: 'Modul abgeschlossen!',
        text: 'Gut gemacht! Sie sind einen Schritt weiter auf Ihrem KI-Lernweg.'
      },
      sprint: {
        icon: '🏆',
        title: 'Sprint geschafft!',
        text: 'Herzlichen Glückwunsch! Sie haben einen ganzen Lernabschnitt gemeistert.'
      },
      zertifikat: {
        icon: '🎓',
        title: 'Zertifizierung erreicht!',
        text: 'Sie sind jetzt ein zertifizierter KI-Partner!'
      }
    };
    
    const msg = messages[type];
    if (!msg) return;
    
    // Calculate progress
    const progress = this.calculateOverallProgress();
    
    const toast = document.createElement('div');
    toast.className = 'celebration-toast';
    toast.innerHTML = `
      <div class="celebration-icon">${msg.icon}</div>
      <div class="celebration-title">${msg.title}</div>
      <div class="celebration-text">${msg.text}</div>
      <div class="celebration-progress">
        <div class="celebration-progress-bar" style="width: ${progress}%"></div>
      </div>
      <div style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--color-gray-dark);">
        Gesamtfortschritt: ${progress}%
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('visible');
    });
    
    // Auto-remove
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 500);
    }, 5000);
  }

  showMiniToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: var(--color-anthracite);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 9999px;
      font-size: 0.9rem;
      font-weight: 500;
      z-index: 1000;
      opacity: 0;
      transition: all 0.3s ease;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(100px)';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  calculateOverallProgress() {
    const allModules = ['00', '01', '02', '03', '04', '05', '06', '07', '08'];
    const completed = allModules.filter(mod => {
      return localStorage.getItem(`ki_academy_module_${mod}_completed`) === 'true' ||
             localStorage.getItem(`celebrated_module_${mod}`) === 'true';
    }).length;
    
    return Math.round((completed / allModules.length) * 100);
  }

  // ============================================
  // SO-WHAT BRIDGE
  // ============================================
  initSoWhatBridge() {
    // Enhance existing so-what bridges with interactivity
    document.querySelectorAll('.so-what-bridge').forEach(bridge => {
      // Add "I've tried these" button
      const cta = bridge.querySelector('.so-what-cta');
      if (cta) {
        const tryBtn = document.createElement('button');
        tryBtn.className = 'btn btn-primary';
        tryBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <span>Ich habe die Prompts ausprobiert</span>
        `;
        tryBtn.style.cssText = 'display: inline-flex; align-items: center; gap: 0.5rem;';
        
        tryBtn.addEventListener('click', () => {
          this.showMiniToast('✨ Toll! Praxis macht den Meister.');
          tryBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>Gespeichert!</span>
          `;
          tryBtn.disabled = true;
        });
        
        cta.appendChild(tryBtn);
      }
    });
  }
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  window.premiumFeatures = new PremiumFeatures();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PremiumFeatures, SPRINT_CONFIG };
}
