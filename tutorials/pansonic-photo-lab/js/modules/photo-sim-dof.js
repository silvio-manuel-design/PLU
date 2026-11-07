/**
 * Pansonic Photo Lab — Depth of Field Playground
 * Interactive aperture / depth-of-field simulator
 */

const APERTURE_STOPS = [1.4, 2.0, 2.8, 4, 5.6, 8, 11, 16, 22];
const FOCUS_POSITIONS = ['foreground', 'subject', 'background'];
const FOCUS_LABELS_DE = { foreground: 'Vordergrund', subject: 'Motiv', background: 'Hintergrund' };
const FOCUS_LABELS_EN = { foreground: 'Foreground', subject: 'Subject', background: 'Background' };

const PRESETS = {
  portrait:  { aperture: 1.4, focus: 'subject',  labelDE: 'Portrait',     labelEN: 'Portrait' },
  street:    { aperture: 5.6, focus: 'subject',  labelDE: 'Street',       labelEN: 'Street' },
  landscape: { aperture: 11,  focus: 'background', labelDE: 'Landschaft', labelEN: 'Landscape' },
  macro:     { aperture: 8,   focus: 'subject',  labelDE: 'Makro',        labelEN: 'Macro' },
  group:     { aperture: 5.6, focus: 'subject',  labelDE: 'Gruppenfoto',  labelEN: 'Group Photo' },
};

// Current state
let state = {
  apertureIndex: 3, // f/4
  focusIndex: 1,    // subject
};

function getContainer() {
  return document.querySelector('.photo-sim-dof');
}

function getLang() {
  const html = document.documentElement;
  return html.lang === 'de' ? 'de' : 'en';
}

/**
 * Calculate blur amount for each layer based on aperture and focus.
 * Returns { fg, mid, bg } in px for CSS filter: blur()
 */
function calculateBlur() {
  const aperture = APERTURE_STOPS[state.apertureIndex];
  const focus = FOCUS_POSITIONS[state.focusIndex];

  // Base blur: smaller aperture number = larger blur outside focus
  // f/1.4 -> max blur, f/22 -> min blur
  const maxBlur = 12; // px at f/1.4
  const minBlur = 0.5; // px at f/22

  // Aperture factor: 1.0 at f/1.4, 0.0 at f/22
  const apertureFactor = Math.max(0, Math.min(1,
    (Math.log2(22) - Math.log2(aperture)) / (Math.log2(22) - Math.log2(1.4))
  ));

  const baseBlur = minBlur + (maxBlur - minBlur) * apertureFactor;

  // Distance factor: layers further from focus get more blur
  const layers = { foreground: 0, subject: 1, background: 2 };
  const focusLayer = layers[focus];

  function blurFor(layerName) {
    const layerIndex = layers[layerName];
    const distance = Math.abs(layerIndex - focusLayer);
    // distance 0 (focus layer) -> 0 blur
    // distance 1 (adjacent) -> baseBlur
    // distance 2 (far) -> baseBlur * 1.5
    return distance === 0 ? 0 : baseBlur * (distance === 1 ? 1 : 1.5);
  }

  return {
    fg: blurFor('foreground'),
    mid: blurFor('subject'),
    bg: blurFor('background'),
  };
}

/**
 * Calculate the DOF band position and width for the visualizer.
 * Returns { left: 0-100%, width: 0-100% }
 */
function calculateDOFBand() {
  const aperture = APERTURE_STOPS[state.apertureIndex];
  const focus = FOCUS_POSITIONS[state.focusIndex];

  // Position based on focus layer (0=fg, 1=mid, 2=bg)
  const focusPositions = { foreground: 15, subject: 50, background: 85 };
  const center = focusPositions[focus];

  // Width based on aperture: smaller f-number = narrower band
  const maxWidth = 70; // f/22
  const minWidth = 15; // f/1.4

  const apertureFactor = Math.max(0, Math.min(1,
    (Math.log2(22) - Math.log2(aperture)) / (Math.log2(22) - Math.log2(1.4))
  ));

  const width = maxWidth - (maxWidth - minWidth) * (1 - apertureFactor);

  return {
    left: Math.max(0, center - width / 2),
    width: Math.min(100, width),
  };
}

function updateVisuals() {
  const container = getContainer();
  if (!container) return;

  const blur = calculateBlur();
  const dof = calculateDOFBand();
  const aperture = APERTURE_STOPS[state.apertureIndex];
  const focus = FOCUS_POSITIONS[state.focusIndex];
  const lang = getLang();

  // Update layer blur
  const fgLayer = container.querySelector('.photo-sim-dof__layer--fg');
  const midLayer = container.querySelector('.photo-sim-dof__layer--mid');
  const bgLayer = container.querySelector('.photo-sim-dof__layer--bg');

  if (fgLayer) fgLayer.style.filter = `blur(${blur.fg.toFixed(1)}px)`;
  if (midLayer) midLayer.style.filter = `blur(${blur.mid.toFixed(1)}px)`;
  if (bgLayer) bgLayer.style.filter = `blur(${blur.bg.toFixed(1)}px)`;

  // Update focus line position
  const focusLine = container.querySelector('.photo-sim-dof__focus-line');
  if (focusLine) {
    const focusPositions = { foreground: '78%', subject: '50%', background: '22%' };
    focusLine.style.bottom = focusPositions[focus];
  }

  // Update DOF bar
  const dofSharp = container.querySelector('.photo-sim-dof__dof-sharp');
  if (dofSharp) {
    dofSharp.style.left = `${dof.left}%`;
    dofSharp.style.width = `${dof.width}%`;
  }

  // Update control values
  const apertureValue = container.querySelector('[data-dof-value="aperture"]');
  const focusValue = container.querySelector('[data-dof-value="focus"]');

  if (apertureValue) apertureValue.textContent = `f/${aperture}`;
  if (focusValue) {
    const labels = lang === 'de' ? FOCUS_LABELS_DE : FOCUS_LABELS_EN;
    focusValue.textContent = labels[focus];
  }

  // Update info text
  const infoPanel = container.querySelector('.photo-sim-dof__info');
  if (infoPanel) {
    const labels = lang === 'de' ? FOCUS_LABELS_DE : FOCUS_LABELS_EN;
    const focusLabel = labels[focus];

    let infoText;
    if (lang === 'de') {
      if (aperture <= 2.8) {
        infoText = `Bei <strong>f/${aperture}</strong> ist nur der ${focusLabel} scharf. Alles andere verschwindet in sanfter Unschärfe — perfekt für kreative Portraits.`;
      } else if (aperture <= 8) {
        infoText = `Bei <strong>f/${aperture}</strong> ist der ${focusLabel} scharf, die anderen Ebenen leicht unscharf — ein guter Kompromiss.`;
      } else {
        infoText = `Bei <strong>f/${aperture}</strong> sind fast alle Ebenen scharf — ideal für Landschaften, wo alles im Fokus sein soll.`;
      }
    } else {
      if (aperture <= 2.8) {
        infoText = `At <strong>f/${aperture}</strong>, only the ${focusLabel} is sharp. Everything else melts into soft blur — perfect for creative portraits.`;
      } else if (aperture <= 8) {
        infoText = `At <strong>f/${aperture}</strong>, the ${focusLabel} is sharp, other layers slightly soft — a good compromise.`;
      } else {
        infoText = `At <strong>f/${aperture}</strong>, almost all layers are sharp — ideal for landscapes where everything should be in focus.`;
      }
    }
    infoPanel.innerHTML = infoText;
  }

  // Update preset active state
  container.querySelectorAll('.photo-sim-dof__preset').forEach(btn => {
    const preset = PRESETS[btn.dataset.preset];
    if (preset && preset.aperture === aperture && preset.focus === focus) {
      btn.classList.add('is-active');
    } else {
      btn.classList.remove('is-active');
    }
  });
}

function onApertureChange(index) {
  state.apertureIndex = parseInt(index, 10);
  updateVisuals();
}

function onFocusChange(index) {
  state.focusIndex = parseInt(index, 10);
  updateVisuals();
}

function applyPreset(name) {
  const preset = PRESETS[name];
  if (!preset) return;

  state.apertureIndex = APERTURE_STOPS.indexOf(preset.aperture);
  state.focusIndex = FOCUS_POSITIONS.indexOf(preset.focus);

  // Update slider positions
  const container = getContainer();
  const apertureSlider = container?.querySelector('[data-dof-slider="aperture"]');
  const focusSlider = container?.querySelector('[data-dof-slider="focus"]');

  if (apertureSlider) apertureSlider.value = state.apertureIndex;
  if (focusSlider) focusSlider.value = state.focusIndex;

  updateVisuals();
}

export function initPhotoSimDof() {
  const container = getContainer();
  if (!container) return;

  // Aperture slider
  const apertureSlider = container.querySelector('[data-dof-slider="aperture"]');
  if (apertureSlider) {
    apertureSlider.min = 0;
    apertureSlider.max = APERTURE_STOPS.length - 1;
    apertureSlider.step = 1;
    apertureSlider.value = state.apertureIndex;
    apertureSlider.addEventListener('input', (e) => onApertureChange(e.target.value));
  }

  // Focus slider
  const focusSlider = container.querySelector('[data-dof-slider="focus"]');
  if (focusSlider) {
    focusSlider.min = 0;
    focusSlider.max = FOCUS_POSITIONS.length - 1;
    focusSlider.step = 1;
    focusSlider.value = state.focusIndex;
    focusSlider.addEventListener('input', (e) => onFocusChange(e.target.value));
  }

  // Preset buttons
  container.querySelectorAll('.photo-sim-dof__preset').forEach(btn => {
    btn.addEventListener('click', () => applyPreset(btn.dataset.preset));
  });

  // Show focus line on hover over stage
  const stage = container.querySelector('.photo-sim-dof__stage');
  if (stage) {
    stage.addEventListener('mouseenter', () => container.classList.add('is-showing-focus'));
    stage.addEventListener('mouseleave', () => container.classList.remove('is-showing-focus'));
  }

  // Initial render
  updateVisuals();
}
