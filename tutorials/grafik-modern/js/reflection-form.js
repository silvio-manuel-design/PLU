/**
 * 📝 REFLECTION FORM SYSTEM - Interaktive Lern-Reflexion
 * Schüler können Notizen machen und diese werden lokal gespeichert
 */

const ReflectionForm = (function() {
  'use strict';

  const STORAGE_PREFIX = 'grafik_quest_reflection_';

  function init() {
    // Find all reflection sections and initialize them
    const reflectionSections = document.querySelectorAll('.reflection-section');
    reflectionSections.forEach(section => {
      initializeReflectionSection(section);
    });

    // Also initialize 3-2-1 reviews
    const reviewSections = document.querySelectorAll('.review-321');
    reviewSections.forEach(section => {
      initialize321Review(section);
    });

    // Initialize checkboxes
    initializeCheckboxes();
  }

  function initializeReflectionSection(section) {
    const levelId = section.dataset.level || 'unknown';
    const inputs = section.querySelectorAll('input[type="text"], textarea');
    
    inputs.forEach((input, index) => {
      const storageKey = `${STORAGE_PREFIX}${levelId}_reflection_${index}`;
      
      // Load saved value
      const savedValue = localStorage.getItem(storageKey);
      if (savedValue) {
        input.value = savedValue;
        input.classList.add('has-content');
      }
      
      // Save on input
      input.addEventListener('input', (e) => {
        localStorage.setItem(storageKey, e.target.value);
        if (e.target.value.trim()) {
          input.classList.add('has-content');
        } else {
          input.classList.remove('has-content');
        }
      });

      // Add styling
      input.style.cssText = `
        background: var(--bg-elevated);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        padding: 8px 12px;
        color: var(--text-primary);
        width: 100%;
        font-family: inherit;
        font-size: 0.95rem;
        transition: all 0.2s ease;
      `;
      
      input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--neon-cyan)';
        input.style.boxShadow = '0 0 10px var(--neon-cyan-glow)';
      });
      
      input.addEventListener('blur', () => {
        input.style.borderColor = input.classList.contains('has-content') ? 'var(--neon-green)' : 'var(--border-subtle)';
        input.style.boxShadow = 'none';
      });
    });
  }

  function initialize321Review(section) {
    const levelId = section.dataset.level || 'unknown';
    const lists = section.querySelectorAll('ol li');
    
    lists.forEach((li, index) => {
      // Skip if already has input
      if (li.querySelector('input, textarea')) return;
      
      const storageKey = `${STORAGE_PREFIX}${levelId}_321_${index}`;
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Hier eingeben...';
      input.style.cssText = `
        background: transparent;
        border: none;
        border-bottom: 2px solid var(--border-subtle);
        color: var(--text-primary);
        width: 100%;
        padding: 4px 0;
        font-family: inherit;
        font-size: 0.95rem;
        margin-top: 4px;
      `;
      
      // Load saved value
      const savedValue = localStorage.getItem(storageKey);
      if (savedValue) {
        input.value = savedValue;
        input.style.borderColor = 'var(--neon-green)';
      }
      
      // Save on input
      input.addEventListener('input', (e) => {
        localStorage.setItem(storageKey, e.target.value);
        input.style.borderColor = e.target.value.trim() ? 'var(--neon-green)' : 'var(--border-subtle)';
      });
      
      input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--neon-cyan)';
      });
      
      input.addEventListener('blur', () => {
        input.style.borderColor = input.value.trim() ? 'var(--neon-green)' : 'var(--border-subtle)';
      });
      
      li.appendChild(input);
    });
  }

  function initializeCheckboxes() {
    const checkboxes = document.querySelectorAll('.interactive-checklist input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
      const taskId = checkbox.dataset.taskId || checkbox.id;
      const storageKey = `${STORAGE_PREFIX}check_${taskId}`;
      
      // Load saved state
      const savedState = localStorage.getItem(storageKey);
      if (savedState === 'true') {
        checkbox.checked = true;
        checkbox.parentElement.classList.add('completed');
      }
      
      // Save on change
      checkbox.addEventListener('change', (e) => {
        localStorage.setItem(storageKey, e.target.checked);
        checkbox.parentElement.classList.toggle('completed', e.target.checked);
        
        // Check if all checkboxes in this list are checked
        const list = checkbox.closest('.interactive-checklist');
        if (list) {
          const allChecked = list.querySelectorAll('input[type="checkbox"]:checked').length;
          const total = list.querySelectorAll('input[type="checkbox"]').length;
          
          if (allChecked === total) {
            showCompletionMessage(list);
          }
        }
      });
      
      // Style the checkbox
      checkbox.style.cssText = `
        width: 20px;
        height: 20px;
        cursor: pointer;
        accent-color: var(--neon-green);
      `;
    });
  }

  function showCompletionMessage(element) {
    // Remove existing message
    const existing = element.querySelector('.completion-message');
    if (existing) return;
    
    const message = document.createElement('div');
    message.className = 'completion-message';
    message.innerHTML = '🎉 Alle Aufgaben erledigt! +50 XP Bonus!';
    message.style.cssText = `
      background: var(--neon-green);
      color: var(--bg-void);
      padding: 12px 20px;
      border-radius: var(--radius-md);
      margin-top: 16px;
      font-weight: 700;
      text-align: center;
      animation: slideDown 0.3s ease;
    `;
    
    element.appendChild(message);
    
    // Add XP if gamification system is available
    if (typeof GrafikQuest !== 'undefined') {
      GrafikQuest.addXP(50, 'Checkliste abgeschlossen');
    }
  }

  // Export functions
  return {
    init,
    clearAll: function() {
      // Clear all reflection data
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(STORAGE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    },
    exportData: function() {
      // Export all reflection data as JSON
      const data = {};
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(STORAGE_PREFIX)) {
          data[key] = localStorage.getItem(key);
        }
      });
      return JSON.stringify(data, null, 2);
    }
  };
})();

// Auto-init when DOM is ready
document.addEventListener('DOMContentLoaded', ReflectionForm.init);
