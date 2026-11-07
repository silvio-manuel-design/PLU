/**
 * Macro Zoom Playground — M09
 * Interactive magnification simulator with circular viewfinder
 * Reads content from data-* attributes on buttons for i18n support
 */

export function initMacroPlayground() {
  const container = document.querySelector('[data-macro-playground]');
  if (!container) return;

  const slider = container.querySelector('.photo-macro-playground__slider');
  const presets = container.querySelectorAll('.photo-macro-playground__preset');
  const magLabel = container.querySelector('.photo-macro-playground__mag-label');

  const infoWorking = container.querySelector('[data-info="working"]');
  const infoDof = container.querySelector('[data-info="dof"]');
  const infoTripod = container.querySelector('[data-info="tripod"]');
  const infoFlash = container.querySelector('[data-info="flash"]');
  const infoNote = container.querySelector('.photo-macro-playground__info-note span');

  const ratioMap = { 0: '1-10', 1: '1-4', 2: '1-2', 3: '1-1' };
  const ratioDisplay = { 0: '1:10', 1: '1:4', 2: '1:2', 3: '1:1' };

  function updateState(index) {
    const btn = container.querySelector('.photo-macro-playground__preset[data-zoom="' + index + '"]');
    if (!btn) return;

    const ratioKey = ratioMap[index];
    const ratioText = ratioDisplay[index];

    // Update zoom class
    container.className = 'photo-macro-playground is-' + ratioKey;

    // Update label
    if (magLabel) magLabel.textContent = ratioText;

    // Update info from data attributes
    if (infoWorking) infoWorking.textContent = btn.dataset.working || '';
    if (infoDof) infoDof.textContent = btn.dataset.dof || '';
    if (infoTripod) infoTripod.textContent = btn.dataset.tripod || '';
    if (infoFlash) infoFlash.textContent = btn.dataset.flash || '';
    if (infoNote) infoNote.textContent = btn.dataset.note || '';

    // Update slider
    if (slider) slider.value = index;

    // Update presets
    presets.forEach(p => p.classList.toggle('is-active', parseInt(p.dataset.zoom) === index));
  }

  // Slider input
  if (slider) {
    slider.addEventListener('input', (e) => {
      updateState(parseInt(e.target.value));
    });
  }

  // Preset clicks
  presets.forEach(btn => {
    btn.addEventListener('click', () => {
      updateState(parseInt(btn.dataset.zoom));
    });
  });
}
