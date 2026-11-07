/**
 * Pansonic Video Lab — Color-Grading Before/After Swipe
 * Dragbarer Vergleich mit Keyboard-Support
 * Returns cleanup function for memory management
 */

const LUT_INFO = {
  neutral: {
    name: { de: 'Neutral', en: 'Neutral' },
    desc: {
      de: 'Leichte Kontrast- und Sättigungserhöhung — der sicherste Einstieg. Lift, Gamma und Gain bleiben nahe am Ursprung.',
      en: 'Slight contrast and saturation increase — the safest starting point. Lift, gamma, and gain stay close to origin.',
    },
  },
  'teal-orange': {
    name: { de: 'Cinematic Teal/Orange', en: 'Cinematic Teal/Orange' },
    desc: {
      de: 'Die klassische Hollywood-LUT: Hauttöne werden wärmer (orange), Schatten und Umgebung kühler (teal).',
      en: 'The classic Hollywood LUT: skin tones become warmer (orange), shadows and environment cooler (teal).',
    },
  },
  vintage: {
    name: { de: 'Warm Vintage', en: 'Warm Vintage' },
    desc: {
      de: 'Sepia-Touch mit reduzierter Sättigung und angehobenen Mitten. Erinnert an analoges Film-Material der 70er.',
      en: 'Sepia touch with reduced saturation and lifted midtones. Reminiscent of analog film stock from the 70s.',
    },
  },
  'high-contrast': {
    name: { de: 'High Contrast', en: 'High Contrast' },
    desc: {
      de: 'Starke Kontrastkurve mit tieferen Schwarz- und helleren Weißwerten. Ideal für dramatische Szenen und Action.',
      en: 'Strong contrast curve with deeper blacks and brighter whites. Ideal for dramatic scenes and action.',
    },
  },
};

export function initColorSwipeSim() {
  const container = document.querySelector('[data-sim-color-swipe]');
  if (!container) return;

  const frame = container.querySelector('.sim-color-swipe__frame');
  const afterLayer = container.querySelector('.sim-color-swipe__after');
  const handle = container.querySelector('.sim-color-swipe__handle');
  const lutBtns = container.querySelectorAll('[data-sim-lut]');
  const infoTitle = container.querySelector('[data-sim-lut-title]');
  const infoDesc = container.querySelector('[data-sim-lut-desc]');

  const isEn = document.documentElement.lang === 'en';
  const lang = isEn ? 'en' : 'de';

  let isDragging = false;
  let splitPercent = 50;

  // ARIA for handle
  if (handle) {
    handle.setAttribute('role', 'slider');
    handle.setAttribute('aria-label', isEn ? 'Before/after comparison' : 'Vorher/Nachher-Vergleich');
    handle.setAttribute('aria-valuemin', '0');
    handle.setAttribute('aria-valuemax', '100');
    handle.setAttribute('aria-valuenow', '50');
    handle.setAttribute('tabindex', '0');
  }

  function setSplit(percent) {
    splitPercent = Math.max(5, Math.min(95, percent));
    frame?.style.setProperty('--sim-split', `${splitPercent}%`);
    if (handle) {
      handle.style.left = `${splitPercent}%`;
      handle.setAttribute('aria-valuenow', Math.round(splitPercent));
    }
  }

  function handlePointerMove(clientX) {
    const rect = frame.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setSplit(percent);
  }

  function onMouseDown(e) {
    isDragging = true;
    frame.classList.add('is-dragging');
    handlePointerMove(e.clientX);
  }

  function onMouseMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    handlePointerMove(e.clientX);
  }

  function onMouseUp() {
    isDragging = false;
    frame.classList.remove('is-dragging');
  }

  function onTouchStart(e) {
    isDragging = true;
    frame.classList.add('is-dragging');
    handlePointerMove(e.touches[0].clientX);
  }

  function onTouchMove(e) {
    if (!isDragging) return;
    handlePointerMove(e.touches[0].clientX);
  }

  function onTouchEnd() {
    isDragging = false;
    frame.classList.remove('is-dragging');
  }

  // Keyboard support
  function onHandleKeyDown(e) {
    const step = e.shiftKey ? 10 : 5;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSplit(splitPercent - step);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSplit(splitPercent + step);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSplit(5);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSplit(95);
    }
  }

  frame?.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  frame?.addEventListener('touchstart', onTouchStart, { passive: true });
  frame?.addEventListener('touchmove', onTouchMove, { passive: true });
  frame?.addEventListener('touchend', onTouchEnd);
  handle?.addEventListener('keydown', onHandleKeyDown);

  function onLutClick() {
    const lutKey = this.dataset.simLut;
    lutBtns.forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-pressed', 'false');
    });
    this.classList.add('is-active');
    this.setAttribute('aria-pressed', 'true');
    afterLayer.dataset.lut = lutKey;

    const info = LUT_INFO[lutKey];
    if (info) {
      if (infoTitle) infoTitle.textContent = info.name[lang];
      if (infoDesc) infoDesc.textContent = info.desc[lang];
    }
  }

  lutBtns.forEach(btn => {
    btn.addEventListener('click', onLutClick);
    btn.setAttribute('aria-pressed', btn.classList.contains('is-active') ? 'true' : 'false');
  });

  setSplit(50);

  return function cleanupColorSwipeSim() {
    frame?.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    frame?.removeEventListener('touchstart', onTouchStart);
    frame?.removeEventListener('touchmove', onTouchMove);
    frame?.removeEventListener('touchend', onTouchEnd);
    handle?.removeEventListener('keydown', onHandleKeyDown);
    lutBtns.forEach(btn => {
      btn.removeEventListener('click', onLutClick);
    });
  };
}
