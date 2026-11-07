/**
 * 🎓 CLASSROOM MODE - Für Präsentationen am Smartdisplay
 * Vergrößert alle Inhalte für bessere Sichtbarkeit im Klassenzimmer
 */

const ClassroomMode = (function() {
  'use strict';

  const STORAGE_KEY = 'grafik_quest_classroom_mode';
  const ZOOM_LEVEL = '1.25'; // 125% Zoom
  
  function init() {
    // Check if classroom mode was previously enabled
    const isEnabled = localStorage.getItem(STORAGE_KEY) === 'true';
    if (isEnabled) {
      enableClassroomMode(false); // false = don't show notification on load
    }
    
    // Add classroom mode toggle button
    addToggleButton();
  }

  function addToggleButton() {
    // Create floating button - aligned with back-to-top
    const btn = document.createElement('button');
    btn.id = 'classroom-mode-toggle';
    btn.innerHTML = '🎓';
    btn.title = 'Classroom Mode (125% Zoom)';
    btn.setAttribute('aria-label', 'Classroom Mode umschalten');
    btn.style.cssText = `
      position: fixed;
      bottom: 86px;
      right: 24px;
      width: 50px;
      height: 50px;
      background: var(--bg-surface);
      border: 2px solid var(--neon-yellow);
      color: var(--neon-yellow);
      border-radius: 50%;
      font-size: 1.3rem;
      cursor: pointer;
      z-index: 997;
      box-shadow: 0 0 20px rgba(255, 255, 0, 0.3);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
    `;
    
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'scale(1.1)';
      btn.style.boxShadow = '0 0 30px rgba(255, 255, 0, 0.5)';
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1)';
      if (!document.body.classList.contains('classroom-mode')) {
        btn.style.boxShadow = '0 0 20px rgba(255, 255, 0, 0.3)';
      }
    });
    
    btn.addEventListener('click', toggleClassroomMode);
    
    document.body.appendChild(btn);
    
    // Add label that appears on hover
    const label = document.createElement('div');
    label.id = 'classroom-mode-label';
    label.textContent = 'Classroom Mode';
    label.style.cssText = `
      position: fixed;
      bottom: 95px;
      right: 80px;
      background: var(--neon-yellow);
      color: var(--bg-void);
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 0.85rem;
      font-weight: 600;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      z-index: 998;
      white-space: nowrap;
    `;
    
    btn.addEventListener('mouseenter', () => {
      label.style.opacity = '1';
    });
    btn.addEventListener('mouseleave', () => {
      label.style.opacity = '0';
    });
    
    document.body.appendChild(label);
  }

  function toggleClassroomMode() {
    const isEnabled = document.body.classList.contains('classroom-mode');
    if (isEnabled) {
      disableClassroomMode();
    } else {
      enableClassroomMode(true);
    }
  }

  function enableClassroomMode(showNotification = true) {
    document.body.classList.add('classroom-mode');
    localStorage.setItem(STORAGE_KEY, 'true');
    
    // Update button style
    const btn = document.getElementById('classroom-mode-toggle');
    if (btn) {
      btn.style.background = 'var(--neon-yellow)';
      btn.style.color = 'var(--bg-void)';
      btn.style.boxShadow = '0 0 30px rgba(255, 255, 0, 0.6)';
    }
    
    // Add classroom mode styles
    if (!document.getElementById('classroom-mode-styles')) {
      const style = document.createElement('style');
      style.id = 'classroom-mode-styles';
      style.textContent = `
        body.classroom-mode {
          zoom: ${ZOOM_LEVEL};
          -moz-transform: scale(${ZOOM_LEVEL});
          -moz-transform-origin: 0 0;
        }
        
        /* Header stays fixed but centered */
        body.classroom-mode .header {
          width: 100%;
          left: 0;
          right: 0;
        }
        
        body.classroom-mode .header-container {
          max-width: 100%;
        }
        
        /* XP bar adjustment */
        body.classroom-mode .gq-xp-bar-container {
          width: 100%;
          left: 0;
          right: 0;
        }
        
        /* Ensure content doesn't get cut off */
        body.classroom-mode .main-content {
          max-width: 960px;
        }
        
        /* Adjust fixed buttons position for zoom */
        body.classroom-mode #back-to-top {
          right: 30px;
          bottom: 30px;
        }
        
        body.classroom-mode #classroom-mode-toggle {
          right: 30px;
          bottom: 90px;
        }
        
        body.classroom-mode #quest-log-toggle {
          right: 30px;
          bottom: 150px;
        }
        
        /* Make sure footer is visible */
        body.classroom-mode .footer {
          margin-top: 100px;
        }
      `;
      document.head.appendChild(style);
    }
    
    if (showNotification) {
      showNotification('🎓 Classroom Mode aktiviert (125% Zoom)', 'var(--neon-yellow)');
    }
  }

  function disableClassroomMode() {
    document.body.classList.remove('classroom-mode');
    localStorage.setItem(STORAGE_KEY, 'false');
    
    // Update button style
    const btn = document.getElementById('classroom-mode-toggle');
    if (btn) {
      btn.style.background = 'var(--bg-surface)';
      btn.style.color = 'var(--neon-yellow)';
      btn.style.boxShadow = '0 0 20px rgba(255, 255, 0, 0.3)';
    }
    
    showNotification('Normal Mode aktiviert', 'var(--neon-cyan)');
  }

  function showNotification(message, color) {
    // Remove existing notification
    const existing = document.getElementById('classroom-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.id = 'classroom-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 150px;
      right: 24px;
      background: ${color};
      color: var(--bg-void);
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 600;
      z-index: 999;
      animation: slideIn 0.3s ease;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }

  // Add keyframes for notifications
  const keyframes = document.createElement('style');
  keyframes.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100px); opacity: 0; }
    }
  `;
  document.head.appendChild(keyframes);

  return {
    init,
    toggle: toggleClassroomMode,
    enable: enableClassroomMode,
    disable: disableClassroomMode
  };
})();

// Auto-init when DOM is ready
document.addEventListener('DOMContentLoaded', ClassroomMode.init);
