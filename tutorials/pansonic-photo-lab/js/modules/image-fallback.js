/**
 * Image Fallback Module
 */

export function initImageFallback() {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      if (img.dataset.fallback) {
        img.src = img.dataset.fallback;
      }
    });
  });
}
