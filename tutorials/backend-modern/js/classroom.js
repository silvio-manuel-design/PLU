/**
 * Classroom Mode - Smartboard Optimization
 * Für Nutzung aus 6-8m Entfernung mit schlechten Lichtverhältnissen
 */

const ClassroomMode = {
  key: 'bt.classroomMode',
  minWidth: 900,

  init() {
    this.restoreState();
    this.addToggleButton();
    this.listenResize();
  },

  isEligible() {
    return window.innerWidth > this.minWidth;
  },

  enable() {
    if (!this.isEligible()) return;
    document.documentElement.classList.add('classroom-mode');
    localStorage.setItem(this.key, 'true');
    this.updateToggleIcon(true);
  },

  disable() {
    document.documentElement.classList.remove('classroom-mode');
    localStorage.setItem(this.key, 'false');
    this.updateToggleIcon(false);
  },

  toggle() {
    if (document.documentElement.classList.contains('classroom-mode')) {
      this.disable();
    } else {
      this.enable();
    }
  },

  restoreState() {
    const saved = localStorage.getItem(this.key);
    if (saved === 'true' && this.isEligible()) {
      document.documentElement.classList.add('classroom-mode');
    }
  },

  addToggleButton() {
    // Im Tool-Bar oder Header einfügen
    const toolBar = document.querySelector('.tool-bar');
    const header = document.querySelector('.header-bar');
    
    const button = document.createElement('button');
    button.id = 'classroom-toggle';
    button.className = 'tool-item tool-btn';
    button.setAttribute('aria-label', 'Classroom Mode umschalten');
    button.innerHTML = `
      <span class="tool-icon" id="classroom-icon">[◻]</span>
      <span class="tool-label">Klasse</span>
    `;
    
    button.addEventListener('click', () => this.toggle());
    
    // In Tool-Bar einfügen (vor Dark Mode Toggle)
    if (toolBar) {
      const darkModeBtn = document.getElementById('dark-mode-toggle');
      if (darkModeBtn) {
        toolBar.insertBefore(button, darkModeBtn);
      } else {
        toolBar.appendChild(button);
      }
    }
    
    // Initiales Icon-Update
    this.updateToggleIcon(document.documentElement.classList.contains('classroom-mode'));
    
    // Verstecken wenn zu klein
    this.updateVisibility();
  },

  updateToggleIcon(isActive) {
    const icon = document.getElementById('classroom-icon');
    if (icon) {
      icon.textContent = isActive ? '[◼]' : '[◻]';
    }
    const label = document.querySelector('#classroom-toggle .tool-label');
    if (label) {
      label.textContent = isActive ? 'Klasse ON' : 'Klasse';
    }
  },

  updateVisibility() {
    const btn = document.getElementById('classroom-toggle');
    if (btn) {
      btn.style.display = this.isEligible() ? 'flex' : 'none';
    }
  },

  listenResize() {
    window.addEventListener('resize', () => {
      this.updateVisibility();
      // Auto-disable wenn zu klein
      if (!this.isEligible() && document.documentElement.classList.contains('classroom-mode')) {
        this.disable();
      }
    });
  }
};

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  ClassroomMode.init();
});

window.ClassroomMode = ClassroomMode;
