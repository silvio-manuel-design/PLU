/**
 * PYTHON QUEST — Classroom Mode
 * Shift+C Toggle für Beamer-Präsentation
 */

import { showToast } from './toast.js';
import { t } from './i18n.js';

const CLASSROOM_KEY = 'pyquest-classroom';

export function initClassroomMode() {
  const toggleButtons = document.querySelectorAll('[data-classroom-toggle]');
  
  function toggle() {
    const isActive = document.documentElement.classList.toggle('is-classroom-mode');
    localStorage.setItem(CLASSROOM_KEY, isActive ? 'true' : 'false');
    
    if (isActive) {
      showToast({
        type: 'info',
        title: t('classroom.activated'),
        text: t('classroom.optimizedFor'),
        duration: 4000
      });
    }
  }
  
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', toggle);
  });
  
  // Restore state
  if (localStorage.getItem(CLASSROOM_KEY) === 'true') {
    document.documentElement.classList.add('is-classroom-mode');
  }
  
  // Keyboard shortcut
  document.addEventListener('keydown', (e) => {
    if (e.shiftKey && (e.key === 'C' || e.key === 'c')) {
      e.preventDefault();
      toggle();
    }
  });
}
