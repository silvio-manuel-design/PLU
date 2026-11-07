/**
 * Photo Rating — Converts data-value/data-max into Phosphor star icons
 * Replaces emoji stars with consistent icon font rendering
 */
export function initPhotoRating() {
  document.querySelectorAll('.photo-rating').forEach(el => {
    if (el.dataset.ratingInitialized) return;
    el.dataset.ratingInitialized = 'true';

    const value = parseInt(el.dataset.value, 10) || 0;
    const max = parseInt(el.dataset.max, 10) || 5;
    const filledColor = el.dataset.color || 'var(--photo-accent)';
    const emptyColor = 'var(--photo-text-tertiary)';

    let html = '';
    for (let i = 0; i < max; i++) {
      const isFilled = i < value;
      const iconClass = isFilled ? 'ph-fill ph-star' : 'ph ph-star';
      const color = isFilled ? filledColor : emptyColor;
      html += `<i class="${iconClass}" style="color:${color};" aria-hidden="true"></i>`;
    }
    el.innerHTML = html;
  });
}
