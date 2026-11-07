/**
 * Pansonic Photo Lab — Belichtungs-Playground
 * Exposure Triangle Simulator: Shutter, Aperture, ISO
 * Returns cleanup function for memory management
 */

const SHUTTER_STOPS = [
  { label: '1/4000s', value: -5, hint: 'Action einfrieren — sehr wenig Licht' },
  { label: '1/2000s', value: -4, hint: 'Schneller Sport — wenig Licht' },
  { label: '1/1000s', value: -3, hint: 'Sport, Spritzer — sicher bei Freihand' },
  { label: '1/500s', value: -2, hint: 'Portrait, Alltag — ausreichend Licht' },
  { label: '1/250s', value: -1, hint: 'Portrait, Street — gutes Licht' },
  { label: '1/125s', value: 0, hint: 'Standard — ausgewogene Belichtung' },
  { label: '1/60s', value: +1, hint: 'Stativ empfohlen — sanfte Bewegung' },
  { label: '1/30s', value: +2, hint: 'Langsam — Bewegungsunschärfe möglich' },
  { label: '1/15s', value: +3, hint: 'Langzeit — Bewegung wird unscharf' },
  { label: '1/8s', value: +4, hint: 'Wasser fließend — Stativ nötig' },
  { label: '1/4s', value: +5, hint: 'Lichtspuren — Stativ unbedingt nötig' },
  { label: '1/2s', value: +6, hint: 'Kreative Unschärfe — Stativ nötig' },
  { label: '1s', value: +7, hint: 'Nachtaufnahme — Stativ essentiell' },
  { label: '2s', value: +8, hint: 'Sterne, Stadtlichter — Stativ' },
  { label: '4s', value: +9, hint: 'Nachtlandschaft — Stativ' },
  { label: '8s', value: +10, hint: 'Sternenspuren — Stativ' },
  { label: '15s', value: +11, hint: 'Extreme Langzeit — Stativ' },
];

const APERTURE_STOPS = [
  { label: 'f/1.4', value: +4, hint: 'Maximales Bokeh — viel Licht' },
  { label: 'f/2', value: +3, hint: 'Sehr flache Schärfentiefe' },
  { label: 'f/2.8', value: +2, hint: 'Portrait — schönes Bokeh' },
  { label: 'f/4', value: +1, hint: 'Portrait, Details — sanftes Bokeh' },
  { label: 'f/5.6', value: 0, hint: 'Alltag — ausgewogen' },
  { label: 'f/8', value: -1, hint: 'Landschaft — mehr Schärfe' },
  { label: 'f/11', value: -2, hint: 'Landschaft — alles scharf' },
  { label: 'f/16', value: -3, hint: 'Makro, Landschaft — Vorsicht Diffraction' },
  { label: 'f/22', value: -4, hint: 'Extreme Schärfentiefe — wenig Licht' },
];

const ISO_STOPS = [
  { label: 'ISO 100', value: 0, hint: 'Maximale Qualität — minimales Rauschen' },
  { label: 'ISO 200', value: +1, hint: 'Noch sehr sauber' },
  { label: 'ISO 400', value: +2, hint: 'Bewölkter Tag — leichtes Rauschen' },
  { label: 'ISO 800', value: +3, hint: 'Innenraum — sichtbares Rauschen' },
  { label: 'ISO 1600', value: +4, hint: 'Dämmerung — deutliches Rauschen' },
  { label: 'ISO 3200', value: +5, hint: 'Nacht — starkes Rauschen' },
  { label: 'ISO 6400', value: +6, hint: 'Sehr dunkel — extremes Rauschen' },
  { label: 'ISO 12800', value: +7, hint: 'Notfall — nur wenn nötig' },
];

const PRESETS = {
  portrait:   { shutter: 3, aperture: 2, iso: 0 },   // 1/500s, f/2.8, ISO 100
  sport:      { shutter: 2, aperture: 3, iso: 2 },   // 1/1000s, f/4, ISO 400
  landscape:  { shutter: 6, aperture: 6, iso: 0 },   // 1/60s, f/11, ISO 100
  sunset:     { shutter: 5, aperture: 5, iso: 0 },   // 1/125s, f/8, ISO 100
  longexp:    { shutter: 11, aperture: 7, iso: 0 },  // 1/2s, f/16, ISO 100
};

const PRESET_LABELS = {
  portrait:   { de: 'Portrait', en: 'Portrait', icon: 'ph-user' },
  sport:      { de: 'Sport', en: 'Sports', icon: 'ph-person-simple-run' },
  landscape:  { de: 'Landschaft', en: 'Landscape', icon: 'ph-mountains' },
  sunset:     { de: 'Sonnenuntergang', en: 'Sunset', icon: 'ph-sun-horizon' },
  longexp:    { de: 'Langzeit', en: 'Long Exp.', icon: 'ph-clock' },
};

function getEV(shutterIdx, apertureIdx, isoIdx) {
  const s = SHUTTER_STOPS[shutterIdx]?.value ?? 0;
  const a = APERTURE_STOPS[apertureIdx]?.value ?? 0;
  const i = ISO_STOPS[isoIdx]?.value ?? 0;
  return s + a + i;
}

function getStatusText(ev, lang) {
  if (ev <= -3) return lang === 'de' ? 'Sehr dunkel — stark unterbelichtet' : 'Very dark — severely underexposed';
  if (ev <= -2) return lang === 'de' ? 'Dunkel — unterbelichtet' : 'Dark — underexposed';
  if (ev < -1) return lang === 'de' ? 'Leicht dunkel' : 'Slightly dark';
  if (ev <= 1) return lang === 'de' ? 'Ausgewogen belichtet' : 'Balanced exposure';
  if (ev < 2) return lang === 'de' ? 'Leicht hell' : 'Slightly bright';
  if (ev < 3) return lang === 'de' ? 'Hell — überbelichtet' : 'Bright — overexposed';
  return lang === 'de' ? 'Sehr hell — stark überbelichtet' : 'Very bright — severely overexposed';
}

function getStatusColor(ev) {
  if (ev >= -1 && ev <= 1) return 'var(--photo-accent-secondary)';
  if (ev >= -2 && ev < -1) return 'var(--photo-accent-violet)';
  if (ev > 1 && ev <= 2) return 'var(--photo-accent-coral)';
  return 'var(--photo-accent-coral)';
}

export function initPhotoSimExposure() {
  const container = document.querySelector('[data-photo-sim-exposure]');
  if (!container) return;

  const stage = container.querySelector('.photo-sim-exposure__stage');
  const shutterSlider = container.querySelector('[data-sim-shutter]');
  const apertureSlider = container.querySelector('[data-sim-aperture]');
  const isoSlider = container.querySelector('[data-sim-iso]');
  const shutterValue = container.querySelector('[data-sim-shutter-value]');
  const apertureValue = container.querySelector('[data-sim-aperture-value]');
  const isoValue = container.querySelector('[data-sim-iso-value]');
  const shutterHint = container.querySelector('[data-sim-shutter-hint]');
  const apertureHint = container.querySelector('[data-sim-aperture-hint]');
  const isoHint = container.querySelector('[data-sim-iso-hint]');
  const evValue = container.querySelector('[data-sim-ev-value]');
  const evStatus = container.querySelector('[data-sim-ev-status]');
  const evNeedle = container.querySelector('[data-sim-ev-needle]');
  const infoShutter = container.querySelector('[data-sim-info-shutter]');
  const infoAperture = container.querySelector('[data-sim-info-aperture]');
  const infoISO = container.querySelector('[data-sim-info-iso]');
  const infoEffect = container.querySelector('[data-sim-info-effect]');
  const presetBtns = container.querySelectorAll('[data-sim-preset]');

  const lang = document.documentElement.lang || 'de';

  function update() {
    const shutterIdx = parseInt(shutterSlider?.value || 5, 10);
    const apertureIdx = parseInt(apertureSlider?.value || 4, 10);
    const isoIdx = parseInt(isoSlider?.value || 0, 10);

    const s = SHUTTER_STOPS[shutterIdx];
    const a = APERTURE_STOPS[apertureIdx];
    const i = ISO_STOPS[isoIdx];

    const ev = getEV(shutterIdx, apertureIdx, isoIdx);

    // Update value displays
    if (shutterValue) shutterValue.textContent = s.label;
    if (apertureValue) apertureValue.textContent = a.label;
    if (isoValue) isoValue.textContent = i.label;
    if (shutterHint) shutterHint.textContent = s.hint;
    if (apertureHint) apertureHint.textContent = a.hint;
    if (isoHint) isoHint.textContent = i.hint;

    // Update EV meter
    if (evValue) evValue.textContent = (ev >= 0 ? '+' : '') + ev;
    if (evStatus) {
      evStatus.textContent = getStatusText(ev, lang);
      evStatus.style.color = getStatusColor(ev);
    }

    // Meter needle: range -3 to +3, mapped to ~-120px to +120px
    const clampedEV = Math.max(-3.5, Math.min(3.5, ev));
    const needleOffset = (clampedEV / 3.5) * 120;
    container?.style.setProperty('--sim-meter-needle', `${needleOffset}px`);

    // Scene brightness adjustments
    const sceneBrightness = Math.max(0.15, Math.min(2.2, 1 + ev * 0.18));
    const sceneSaturate = Math.max(0.3, Math.min(1.4, 1 - Math.abs(ev) * 0.08));
    stage?.style.setProperty('--sim-scene-brightness', sceneBrightness.toFixed(2));
    stage?.style.setProperty('--sim-scene-saturate', sceneSaturate.toFixed(2));

    // Under/over exposure overlays
    const underOpacity = ev < -0.5 ? Math.min(0.7, Math.abs(ev) * 0.15) : 0;
    const overOpacity = ev > 0.5 ? Math.min(0.7, ev * 0.15) : 0;
    stage?.style.setProperty('--sim-under-opacity', underOpacity.toFixed(2));
    stage?.style.setProperty('--sim-over-opacity', overOpacity.toFixed(2));

    // Sun visibility
    const sunBrightness = Math.max(0.3, Math.min(2, 1 + ev * 0.25));
    const sunOpacity = ev < -2 ? Math.max(0.1, 1 + ev * 0.3) : 1;
    stage?.style.setProperty('--sim-sun-brightness', sunBrightness.toFixed(2));
    stage?.style.setProperty('--sim-sun-opacity', sunOpacity.toFixed(2));

    // Cloud brightness
    const cloudBrightness = Math.max(0.2, Math.min(1.5, 1 + ev * 0.15));
    stage?.style.setProperty('--sim-cloud-brightness', cloudBrightness.toFixed(2));

    // Mountain/tree brightness
    const mtnBrightness = Math.max(0.15, Math.min(1.3, 1 + ev * 0.12));
    stage?.style.setProperty('--sim-mtn-brightness', mtnBrightness.toFixed(2));
    stage?.style.setProperty('--sim-tree-brightness', mtnBrightness.toFixed(2));

    // Lake brightness + motion blur
    const lakeBrightness = Math.max(0.1, Math.min(1.4, 1 + ev * 0.14));
    stage?.style.setProperty('--sim-lake-brightness', lakeBrightness.toFixed(2));

    // Snow visibility
    const snowOpacity = ev < -1.5 ? Math.max(0, 1 + (ev + 1.5) * 0.4) : 1;
    stage?.style.setProperty('--sim-snow-opacity', snowOpacity.toFixed(2));

    // Reflection visibility
    const reflOpacity = ev < -1 ? Math.max(0.1, 0.6 + ev * 0.15) : Math.min(1, 0.6 + ev * 0.1);
    stage?.style.setProperty('--sim-reflection-opacity', reflOpacity.toFixed(2));

    // Motion blur based on shutter speed
    const motionStop = s.value;
    const motionBlurPx = motionStop >= 3 ? Math.min(6, (motionStop - 2) * 1.2) : 0;
    const motionOpacity = motionStop >= 2 ? Math.min(0.7, (motionStop - 1) * 0.15) : 0;
    stage?.style.setProperty('--sim-motion-blur', `${motionBlurPx.toFixed(1)}px`);
    stage?.style.setProperty('--sim-motion-opacity', motionOpacity.toFixed(2));

    // Lake blur for long exposure (water smoothing)
    const lakeBlurPx = motionStop >= 4 ? Math.min(4, (motionStop - 3) * 1) : 0;
    stage?.style.setProperty('--sim-lake-blur', `${lakeBlurPx.toFixed(1)}px`);

    // Noise based on ISO
    const isoStop = i.value;
    const noiseOpacity = isoStop >= 3 ? Math.min(0.5, (isoStop - 2) * 0.08) : 0;
    stage?.style.setProperty('--sim-noise-opacity', noiseOpacity.toFixed(2));

    // Status color for meter
    const statusColor = getStatusColor(ev);
    stage?.style.setProperty('--sim-status-color', statusColor);

    // Info chips
    if (infoShutter) infoShutter.textContent = s.label;
    if (infoAperture) infoAperture.textContent = a.label;
    if (infoISO) infoISO.textContent = i.label;

    // Info effect text
    if (infoEffect) {
      const effects = [];
      if (motionStop >= 3) {
        effects.push(lang === 'de' ? 'Bewegungsunschärfe sichtbar' : 'Motion blur visible');
      }
      if (isoStop >= 4) {
        effects.push(lang === 'de' ? 'Bildrauschen sichtbar' : 'Image noise visible');
      }
      if (apertureIdx <= 1) {
        effects.push(lang === 'de' ? 'Sehr flache Schärfentiefe' : 'Very shallow depth of field');
      } else if (apertureIdx >= 6) {
        effects.push(lang === 'de' ? 'Große Schärfentiefe' : 'Large depth of field');
      }
      if (ev < -2) {
        effects.push(lang === 'de' ? 'Schatten ohne Detail' : 'Shadows without detail');
      }
      if (ev > 2) {
        effects.push(lang === 'de' ? 'Highlights brennen aus' : 'Highlights blown out');
      }
      if (effects.length === 0) {
        effects.push(lang === 'de' ? 'Ausgewogene Belichtung' : 'Balanced exposure');
      }
      infoEffect.textContent = effects.join(' · ');
    }

    // Update preset active states
    presetBtns.forEach(btn => {
      const presetKey = btn.dataset.simPreset;
      const p = PRESETS[presetKey];
      if (!p) return;
      const isMatch = Math.abs(p.shutter - shutterIdx) < 1 &&
                      Math.abs(p.aperture - apertureIdx) < 1 &&
                      Math.abs(p.iso - isoIdx) < 1;
      btn.classList.toggle('is-active', isMatch);
      btn.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
    });
  }

  function onSliderInput() { update(); }

  function onPresetClick() {
    const key = this.dataset.simPreset;
    const p = PRESETS[key];
    if (!p) return;
    if (shutterSlider) shutterSlider.value = p.shutter;
    if (apertureSlider) apertureSlider.value = p.aperture;
    if (isoSlider) isoSlider.value = p.iso;
    update();
  }

  shutterSlider?.addEventListener('input', onSliderInput);
  apertureSlider?.addEventListener('input', onSliderInput);
  isoSlider?.addEventListener('input', onSliderInput);

  presetBtns.forEach(btn => {
    btn.addEventListener('click', onPresetClick);
  });

  update();

  return function cleanupPhotoSimExposure() {
    shutterSlider?.removeEventListener('input', onSliderInput);
    apertureSlider?.removeEventListener('input', onSliderInput);
    isoSlider?.removeEventListener('input', onSliderInput);
    presetBtns.forEach(btn => {
      btn.removeEventListener('click', onPresetClick);
    });
  };
}
