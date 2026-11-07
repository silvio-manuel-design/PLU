/**
 * PYTHON QUEST — Toast System
 */

const MAX_TOASTS = 3;
const AUTO_DISMISS = 4000;

export function showToast(options) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const { type = 'info', title = '', text = '', duration = AUTO_DISMISS } = options;
  
  // Remove excess toasts
  while (container.children.length >= MAX_TOASTS) {
    container.removeChild(container.firstChild);
  }
  
  const toast = document.createElement('div');
  toast.className = `py-quest-toast py-quest-toast--${type}`;
  toast.setAttribute('role', 'status');
  
  const icons = {
    success: 'ph-check-circle',
    error: 'ph-x-circle',
    warning: 'ph-warning',
    info: 'ph-info'
  };
  
  toast.innerHTML = `
    <i class="ph ${icons[type]} py-quest-toast__icon" aria-hidden="true"></i>
    <div class="py-quest-toast__content">
      ${title ? `<div class="py-quest-toast__title">${title}</div>` : ''}
      ${text ? `<div class="py-quest-toast__text">${text}</div>` : ''}
    </div>
    <button class="py-quest-toast__close" data-i18n-aria="toastClose">
      <i class="ph ph-x" aria-hidden="true"></i>
    </button>
  `;
  
  container.appendChild(toast);
  
  // Close handler
  const closeBtn = toast.querySelector('.py-quest-toast__close');
  closeBtn.addEventListener('click', () => dismissToast(toast));
  
  // Auto dismiss
  if (duration > 0) {
    setTimeout(() => dismissToast(toast), duration);
  }
  
  return toast;
}

function dismissToast(toast) {
  if (!toast || toast.classList.contains('is-hiding')) return;
  
  toast.classList.add('is-hiding');
  
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const delay = prefersReduced ? 0 : 300;
  
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, delay);
}

export function showSuccess(title, text) {
  return showToast({ type: 'success', title, text });
}

export function showError(title, text) {
  return showToast({ type: 'error', title, text });
}

export function showWarning(title, text) {
  return showToast({ type: 'warning', title, text });
}

export function showInfo(title, text) {
  return showToast({ type: 'info', title, text });
}
