/**
 * Filter Playground — M10
 * Interactive CSS filter simulator
 */

export function initFilterPlayground() {
  const container = document.querySelector('[data-filter-playground]');
  if (!container) return;

  const preview = container.querySelector('.photo-filter-playground__preview svg');
  const label = container.querySelector('.photo-filter-playground__preview-label');
  const sliders = container.querySelectorAll('.photo-filter-playground__slider');
  const resetBtn = container.querySelector('[data-filter-reset]');
  const compareBtn = container.querySelector('[data-filter-compare]');

  if (!preview) return;

  const defaults = {
    brightness: 100,
    contrast: 100,
    saturate: 100,
    blur: 0
  };

  function updateFilter() {
    const brightness = container.querySelector('[data-filter="brightness"]').value;
    const contrast = container.querySelector('[data-filter="contrast"]').value;
    const saturate = container.querySelector('[data-filter="saturate"]').value;
    const blur = container.querySelector('[data-filter="blur"]').value;

    preview.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) blur(${blur}px)`;

    // Update value labels
    sliders.forEach(slider => {
      const name = slider.dataset.filter;
      const valEl = container.querySelector(`[data-filter-value="${name}"]`);
      if (valEl) {
        let val = slider.value;
        if (name === 'brightness' || name === 'contrast' || name === 'saturate') {
          valEl.textContent = val + '%';
        } else if (name === 'blur') {
          valEl.textContent = val + 'px';
        }
      }
    });
  }

  // Slider inputs
  sliders.forEach(slider => {
    slider.addEventListener('input', updateFilter);
  });

  // Reset button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      sliders.forEach(slider => {
        const name = slider.dataset.filter;
        slider.value = defaults[name];
      });
      updateFilter();
      if (compareBtn) {
        compareBtn.classList.remove('is-active');
        compareBtn.innerHTML = '<i class="ph ph-columns" aria-hidden="true"></i><span>Vorher</span>';
      }
      if (label) label.textContent = 'Bearbeitet';
    });
  }

  // Compare toggle
  if (compareBtn) {
    compareBtn.addEventListener('click', () => {
      const isBefore = compareBtn.classList.toggle('is-active');
      if (isBefore) {
        preview.style.filter = 'none';
        compareBtn.innerHTML = '<i class="ph ph-eye" aria-hidden="true"></i><span>Nachher</span>';
        if (label) label.textContent = 'Original';
      } else {
        updateFilter();
        compareBtn.innerHTML = '<i class="ph ph-columns" aria-hidden="true"></i><span>Vorher</span>';
        if (label) label.textContent = 'Bearbeitet';
      }
    });
  }
}
