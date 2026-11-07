/**
 * Pansonic Video Lab — Kamera-Simulator
 * Brennweite + Blende in Echtzeit
 * Returns cleanup function for memory management
 */

const PRESETS = {
  wide: { focal: 18, aperture: 5.6 },
  portrait: { focal: 50, aperture: 1.8 },
  tele: { focal: 135, aperture: 2.8 },
  macro: { focal: 85, aperture: 1.4 },
  landscape: { focal: 24, aperture: 11 },
};

function focalToScale(mm) {
  return 1 + (mm - 18) / (135 - 18) * 1.5;
}

function apertureToBlur(f) {
  const maxBlur = 8;
  const t = (f - 1.4) / (22 - 1.4);
  return (1 - t) * maxBlur;
}

function focalLabel(mm, isEn) {
  if (mm <= 24) return isEn ? 'Wide angle — lots of image, perspective distortion' : 'Weitwinkel — viel Bild, Perspektivverzerrung';
  if (mm <= 35) return isEn ? 'Wide — natural field of view' : 'Brennweite — natürlicher Blickwinkel';
  if (mm <= 70) return isEn ? 'Normal — versatile for portraits' : 'Normal — vielseitig für Portraits';
  if (mm <= 100) return isEn ? 'Tele — flat background, compressed' : 'Tele — flacher Hintergrund, komprimiert';
  return isEn ? 'Super-tele — details from a distance' : 'Super-Tele — Details aus der Distanz';
}

function apertureLabel(f, isEn) {
  if (f <= 2) return isEn ? 'Very wide aperture — shallow depth of field, bokeh' : 'Sehr große Blende — geringe Tiefenschärfe, Bokeh';
  if (f <= 4) return isEn ? 'Wide aperture — soft background' : 'Große Blende — weicher Hintergrund';
  if (f <= 8) return isEn ? 'Medium aperture — balanced look' : 'Mittlere Blende — ausgewogener Look';
  if (f <= 16) return isEn ? 'Small aperture — everything sharp' : 'Kleine Blende — alles scharf';
  return isEn ? 'Very small aperture — maximum depth of field' : 'Sehr kleine Blende — maximale Schärfentiefe';
}

export function initCameraSim() {
  const container = document.querySelector('[data-sim-camera]');
  if (!container) return;

  const scene = container.querySelector('.sim-camera__scene');
  const subjectNear = container.querySelector('.sim-camera__subject-near');
  const focalSlider = container.querySelector('[data-sim-focal]');
  const apertureSlider = container.querySelector('[data-sim-aperture]');
  const focalValueEls = container.querySelectorAll('[data-sim-focal-value]');
  const apertureValueEls = container.querySelectorAll('[data-sim-aperture-value]');
  const focalInfo = container.querySelector('[data-sim-focal-info]');
  const apertureInfo = container.querySelector('[data-sim-aperture-info]');
  const presetBtns = container.querySelectorAll('[data-sim-preset]');

  const isEn = document.documentElement.lang === 'en';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Apply reduced motion: disable transitions
  if (prefersReducedMotion && scene) {
    scene.style.transition = 'none';
    subjectNear.style.transition = 'none';
  }

  function update() {
    const focal = parseFloat(focalSlider?.value || 50);
    const aperture = parseFloat(apertureSlider?.value || 5.6);

    const scale = focalToScale(focal);
    const blur = apertureToBlur(aperture);

    if (scene) scene.style.setProperty('--sim-scale', scale.toFixed(2));
    if (subjectNear) subjectNear.style.setProperty('--sim-blur', `${blur.toFixed(1)}px`);

    focalValueEls.forEach(el => { el.textContent = `${focal}mm`; });
    apertureValueEls.forEach(el => { el.textContent = `f/${aperture}`; });
    if (focalInfo) focalInfo.textContent = focalLabel(focal, isEn);
    if (apertureInfo) apertureInfo.textContent = apertureLabel(aperture, isEn);

    presetBtns.forEach(btn => {
      const key = btn.dataset.simPreset;
      const p = PRESETS[key];
      const isMatch = p && Math.abs(p.focal - focal) < 5 && Math.abs(p.aperture - aperture) < 0.5;
      btn.classList.toggle('is-active', isMatch);
      btn.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
    });
  }

  function onFocalInput() { update(); }
  function onApertureInput() { update(); }

  focalSlider?.addEventListener('input', onFocalInput);
  apertureSlider?.addEventListener('input', onApertureInput);

  presetBtns.forEach(btn => {
    btn.addEventListener('click', onPresetClick);
  });

  function onPresetClick() {
    const key = this.dataset.simPreset;
    const p = PRESETS[key];
    if (!p) return;
    if (focalSlider) focalSlider.value = p.focal;
    if (apertureSlider) apertureSlider.value = p.aperture;
    update();
  }

  update();

  // Return cleanup function
  return function cleanupCameraSim() {
    focalSlider?.removeEventListener('input', onFocalInput);
    apertureSlider?.removeEventListener('input', onApertureInput);
    presetBtns.forEach(btn => {
      btn.removeEventListener('click', onPresetClick);
    });
  };
}
