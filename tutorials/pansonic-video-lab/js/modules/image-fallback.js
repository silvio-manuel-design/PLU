/**
 * Pansonic Video Lab — Image Fallback Handler
 * Gracefully handles failed image loads (network errors, missing files).
 * Replaces broken images with a CSS-styled placeholder to avoid layout shifts.
 */

const PLACEHOLDER_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%231a1a24' width='400' height='300'/%3E%3Ctext fill='%23666' font-family='sans-serif' font-size='14' dy='.3em' text-anchor='middle' x='200' y='150'%3EBild nicht verf%C3%BCgbar%3C/text%3E%3C/svg%3E`;

function handleImgError(img) {
  // Prevent infinite loop if placeholder itself fails
  if (img.dataset.fallbackApplied) return;
  img.dataset.fallbackApplied = 'true';

  // Add a class for CSS styling
  img.classList.add('video-img--fallback');

  // If the image is inside a picture element, hide the source elements
  const picture = img.closest('picture');
  if (picture) {
    picture.querySelectorAll('source').forEach(src => src.remove());
  }

  // Set placeholder as fallback src
  img.src = PLACEHOLDER_SVG;
}

export function initImageFallback() {
  // Handle existing images
  document.querySelectorAll('img').forEach(img => {
    if (img.complete && img.naturalWidth === 0) {
      handleImgError(img);
    } else {
      img.addEventListener('error', () => handleImgError(img), { once: true });
    }
  });

  // Handle dynamically added images (e.g. video-player library thumbnails)
  if ('MutationObserver' in window) {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName === 'IMG') {
              if (node.complete && node.naturalWidth === 0) {
                handleImgError(node);
              } else {
                node.addEventListener('error', () => handleImgError(node), { once: true });
              }
            }
            if (node.querySelectorAll) {
              node.querySelectorAll('img').forEach(img => {
                if (img.complete && img.naturalWidth === 0) {
                  handleImgError(img);
                } else {
                  img.addEventListener('error', () => handleImgError(img), { once: true });
                }
              });
            }
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
}
