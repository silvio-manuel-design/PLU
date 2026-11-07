/**
 * Pansonic Photo Lab — Kamera-Simulator
 * Adaptiert vom Video Lab: Brennweite + Blende in Echtzeit
 * Returns cleanup function for memory management
 */

const PRESETS = {
  smartphone: { focal: 26, aperture: 1.8 },
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
  if (mm <= 24) return isEn ? 'Wide angle — lots of scene, perspective distortion' : 'Weitwinkel — viel Szene, Perspektivverzerrung';
  if (mm <= 35) return isEn ? 'Wide — natural field of view' : 'Weitwinkel — natürlicher Blickwinkel';
  if (mm <= 50) return isEn ? 'Normal — versatile, good for portraits' : 'Normal — vielseitig, gut für Portraits';
  if (mm <= 85) return isEn ? 'Short tele — flattering portraits' : 'Kurzes Tele — schmeichelnde Portraits';
  if (mm <= 100) return isEn ? 'Tele — flat background, compressed perspective' : 'Tele — flacher Hintergrund, komprimiert';
  return isEn ? 'Super-tele — details from a distance' : 'Super-Tele — Details aus der Distanz';
}

function apertureLabel(f, isEn) {
  if (f <= 2) return isEn ? 'Very wide open — shallow depth of field, creamy bokeh' : 'Sehr weit offen — geringe Tiefenschärfe, cremiges Bokeh';
  if (f <= 4) return isEn ? 'Wide open — soft background blur' : 'Weit offen — weicher Hintergrund';
  if (f <= 8) return isEn ? 'Mid-range — balanced sharpness throughout' : 'Mittlere Blende — ausgewogene Schärfe';
  if (f <= 16) return isEn ? 'Stopped down — everything in focus' : 'Abgeblendet — alles scharf';
  return isEn ? 'Very small aperture — maximum depth of field' : 'Sehr kleine Blende — maximale Schärfentiefe';
}

export function initPhotoSimCamera() {
  const container = document.querySelector('[data-photo-sim-camera]');
  if (!container) return;

  const scene = container.querySelector('.photo-sim-camera__scene');
  const subjectNear = container.querySelector('.photo-sim-camera__subject-near');
  const focalSlider = container.querySelector('[data-photo-sim-focal]');
  const apertureSlider = container.querySelector('[data-photo-sim-aperture]');
  const focalValueEls = container.querySelectorAll('[data-photo-sim-focal-value]');
  const apertureValueEls = container.querySelectorAll('[data-photo-sim-aperture-value]');
  const focalInfo = container.querySelector('[data-photo-sim-focal-info]');
  const apertureInfo = container.querySelector('[data-photo-sim-aperture-info]');
  const presetBtns = container.querySelectorAll('[data-photo-sim-preset]');

  const isEn = document.documentElement.lang === 'en';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion && scene) {
    scene.style.transition = 'none';
    if (subjectNear) subjectNear.style.transition = 'none';
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
      const key = btn.dataset.photoSimPreset;
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

  function onPresetClick() {
    const key = this.dataset.photoSimPreset;
    const p = PRESETS[key];
    if (!p) return;
    if (focalSlider) focalSlider.value = p.focal;
    if (apertureSlider) apertureSlider.value = p.aperture;
    update();
  }

  presetBtns.forEach(btn => {
    btn.addEventListener('click', onPresetClick);
  });

  update();

  return function cleanupPhotoSimCamera() {
    focalSlider?.removeEventListener('input', onFocalInput);
    apertureSlider?.removeEventListener('input', onApertureInput);
    presetBtns.forEach(btn => {
      btn.removeEventListener('click', onPresetClick);
    });
  };
}
