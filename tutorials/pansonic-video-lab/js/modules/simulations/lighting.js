/**
 * Pansonic Video Lab — Licht-Playground
 * Drei-Punkt-Licht-Setup mit Slidern
 * Returns cleanup function for memory management
 */

const PRESETS = {
  standard: { key: 70, fill: 30, back: 40 },
  dramatic: { key: 90, fill: 10, back: 60 },
  highkey: { key: 85, fill: 70, back: 20 },
  silhouette: { key: 0, fill: 0, back: 90 },
  noir: { key: 80, fill: 5, back: 0 },
};

export function initLightingSim() {
  const container = document.querySelector('[data-sim-lighting]');
  if (!container) return;

  const stage = container.querySelector('.sim-lighting__stage');
  const keySlider = container.querySelector('[data-sim-key]');
  const fillSlider = container.querySelector('[data-sim-fill]');
  const backSlider = container.querySelector('[data-sim-back]');
  const keyValue = container.querySelector('[data-sim-key-value]');
  const fillValue = container.querySelector('[data-sim-fill-value]');
  const backValue = container.querySelector('[data-sim-back-value]');
  const presetBtns = container.querySelectorAll('[data-sim-preset]');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion && stage) {
    stage.style.setProperty('--sim-transition', 'none');
  }

  function update() {
    const key = parseInt(keySlider?.value || 50, 10);
    const fill = parseInt(fillSlider?.value || 30, 10);
    const back = parseInt(backSlider?.value || 40, 10);

    stage?.style.setProperty('--sim-key', (key / 100).toFixed(2));
    stage?.style.setProperty('--sim-fill', (fill / 100).toFixed(2));
    stage?.style.setProperty('--sim-back', (back / 100).toFixed(2));

    if (keyValue) keyValue.textContent = `${key}%`;
    if (fillValue) fillValue.textContent = `${fill}%`;
    if (backValue) backValue.textContent = `${back}%`;

    presetBtns.forEach(btn => {
      const presetKey = btn.dataset.simPreset;
      const p = PRESETS[presetKey];
      const isMatch = p && Math.abs(p.key - key) < 5 && Math.abs(p.fill - fill) < 5 && Math.abs(p.back - back) < 5;
      btn.classList.toggle('is-active', isMatch);
      btn.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
    });
  }

  function onSliderInput() { update(); }

  keySlider?.addEventListener('input', onSliderInput);
  fillSlider?.addEventListener('input', onSliderInput);
  backSlider?.addEventListener('input', onSliderInput);

  presetBtns.forEach(btn => {
    btn.addEventListener('click', onPresetClick);
  });

  function onPresetClick() {
    const key = this.dataset.simPreset;
    const p = PRESETS[key];
    if (!p) return;
    if (keySlider) keySlider.value = p.key;
    if (fillSlider) fillSlider.value = p.fill;
    if (backSlider) backSlider.value = p.back;
    update();
  }

  update();

  return function cleanupLightingSim() {
    keySlider?.removeEventListener('input', onSliderInput);
    fillSlider?.removeEventListener('input', onSliderInput);
    backSlider?.removeEventListener('input', onSliderInput);
    presetBtns.forEach(btn => {
      btn.removeEventListener('click', onPresetClick);
    });
  };
}
