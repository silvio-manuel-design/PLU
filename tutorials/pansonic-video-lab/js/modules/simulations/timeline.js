/**
 * Pansonic Video Lab — Schnitt-Rhythmus-Sequenzer
 * Mini-Timeline mit Drag & Drop
 * Returns cleanup function for memory management
 */

const CLIP_TYPES = {
  wide: { label: 'Wide', icon: 'ph-image', duration: 3000 },
  medium: { label: 'Medium', icon: 'ph-user', duration: 2500 },
  close: { label: 'Close-Up', icon: 'ph-crop', duration: 2000 },
  broll: { label: 'B-Roll', icon: 'ph-film-strip', duration: 2000 },
  interview: { label: 'Interview', icon: 'ph-microphone', duration: 3500 },
  music: { label: 'Musik', icon: 'ph-music-notes', duration: 5000 },
};

const TRANSITIONS = {
  cut: { label: 'Hard Cut', duration: 0 },
  lcut: { label: 'L-Cut', duration: 500 },
  jcut: { label: 'J-Cut', duration: 500 },
  dissolve: { label: 'Cross Dissolve', duration: 800 },
};

export function initTimelineSim() {
  const container = document.querySelector('[data-sim-timeline]');
  if (!container) return;

  const screen = container.querySelector('.sim-timeline__screen');
  const screenLabel = container.querySelector('.sim-timeline__screen-label');
  const screenIcon = container.querySelector('.sim-timeline__screen-icon');
  const trackSlots = container.querySelectorAll('.sim-timeline__track-slot');
  const libraryClips = container.querySelectorAll('.sim-timeline__library-clip');
  const transitionBtns = container.querySelectorAll('[data-sim-transition]');
  const playBtn = container.querySelector('[data-sim-play]');

  const isEn = document.documentElement.lang === 'en';

  let currentTransition = 'cut';
  let isPlaying = false;
  let playTimeout = null;

  // ARIA live region for playback announcements
  if (screenLabel && !screenLabel.hasAttribute('aria-live')) {
    screenLabel.setAttribute('aria-live', 'polite');
    screenLabel.setAttribute('aria-atomic', 'true');
  }

  // Drag & Drop from library to track
  libraryClips.forEach(clip => {
    clip.draggable = true;
    clip.addEventListener('dragstart', onLibraryDragStart);
    clip.addEventListener('dragend', onLibraryDragEnd);
  });

  function onLibraryDragStart(e) {
    e.dataTransfer.setData('text/plain', this.dataset.clipType);
    e.dataTransfer.effectAllowed = 'copy';
    this.style.opacity = '0.5';
  }

  function onLibraryDragEnd() {
    this.style.opacity = '1';
  }

  trackSlots.forEach(slot => {
    slot.addEventListener('dragover', onSlotDragOver);
    slot.addEventListener('dragleave', onSlotDragLeave);
    slot.addEventListener('drop', onSlotDrop);
  });

  function onSlotDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    this.classList.add('is-drag-over');
  }

  function onSlotDragLeave() {
    this.classList.remove('is-drag-over');
  }

  function onSlotDrop(e) {
    e.preventDefault();
    this.classList.remove('is-drag-over');
    const type = e.dataTransfer.getData('text/plain');
    addClipToTrack(this, type);
  }

  function addClipToTrack(slot, type) {
    const config = CLIP_TYPES[type];
    if (!config) return;

    const clip = document.createElement('div');
    clip.className = `sim-timeline__clip sim-timeline__clip--${type}`;
    clip.draggable = true;
    clip.innerHTML = `<i class="ph ${config.icon}"></i> ${config.label}`;
    clip.dataset.clipType = type;
    clip.setAttribute('role', 'button');
    clip.setAttribute('aria-label', config.label);
    clip.setAttribute('tabindex', '0');

    clip.addEventListener('dragstart', onTrackClipDragStart);
    clip.addEventListener('dragend', onTrackClipDragEnd);
    clip.addEventListener('keydown', onTrackClipKeyDown);

    slot.appendChild(clip);
  }

  function onTrackClipDragStart(e) {
    e.dataTransfer.setData('text/plain', this.dataset.clipType);
    e.dataTransfer.effectAllowed = 'move';
    this.style.opacity = '0.5';
  }

  function onTrackClipDragEnd() {
    this.remove();
  }

  function onTrackClipKeyDown(e) {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      this.remove();
    }
  }

  // Transition selection
  transitionBtns.forEach(btn => {
    btn.addEventListener('click', onTransitionClick);
  });

  function onTransitionClick() {
    transitionBtns.forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-pressed', 'false');
    });
    this.classList.add('is-active');
    this.setAttribute('aria-pressed', 'true');
    currentTransition = this.dataset.simTransition;
  }

  // Play sequence
  playBtn?.addEventListener('click', onPlayClick);

  function onPlayClick() {
    if (isPlaying) { stopPlayback(); return; }
    playSequence();
  }

  function playSequence() {
    const videoTrack = container.querySelector('[data-track="video"]');
    if (!videoTrack) return;

    const clips = videoTrack.querySelectorAll('.sim-timeline__clip');
    if (clips.length === 0) {
      if (screenLabel) screenLabel.textContent = isEn ? 'Drag clips to the video track!' : 'Ziehe Clips in die Video-Spur!';
      if (screenIcon) screenIcon.className = 'sim-timeline__screen-icon ph ph-warning';
      if (screen) screen.className = 'sim-timeline__screen sim-timeline__screen--interview';
      return;
    }

    isPlaying = true;
    if (playBtn) {
      playBtn.innerHTML = '<i class="ph ph-pause"></i> Pause';
      playBtn.setAttribute('aria-label', isEn ? 'Pause playback' : 'Wiedergabe pausieren');
    }

    let index = 0;
    function showNext() {
      if (index >= clips.length || !isPlaying) { stopPlayback(); return; }

      const clip = clips[index];
      const type = clip.dataset.clipType;
      const config = CLIP_TYPES[type];

      if (screen) screen.className = `sim-timeline__screen sim-timeline__screen--${type}`;
      if (screenIcon) screenIcon.className = `sim-timeline__screen-icon ph ${config.icon}`;
      if (screenLabel) screenLabel.textContent = config.label;

      const trans = TRANSITIONS[currentTransition] || TRANSITIONS.cut;
      index++;
      playTimeout = setTimeout(showNext, config.duration + trans.duration);
    }
    showNext();
  }

  function stopPlayback() {
    isPlaying = false;
    if (playTimeout) clearTimeout(playTimeout);
    if (playBtn) {
      playBtn.innerHTML = '<i class="ph ph-play"></i> ' + (isEn ? 'Play' : 'Abspielen');
      playBtn.setAttribute('aria-label', isEn ? 'Play sequence' : 'Sequenz abspielen');
    }
    if (screenLabel) screenLabel.textContent = isEn ? 'Preview' : 'Vorschau';
    if (screenIcon) screenIcon.className = 'sim-timeline__screen-icon ph ph-play';
    if (screen) screen.className = 'sim-timeline__screen sim-timeline__screen--wide';
  }

  return function cleanupTimelineSim() {
    libraryClips.forEach(clip => {
      clip.removeEventListener('dragstart', onLibraryDragStart);
      clip.removeEventListener('dragend', onLibraryDragEnd);
    });
    trackSlots.forEach(slot => {
      slot.removeEventListener('dragover', onSlotDragOver);
      slot.removeEventListener('dragleave', onSlotDragLeave);
      slot.removeEventListener('drop', onSlotDrop);
    });
    transitionBtns.forEach(btn => {
      btn.removeEventListener('click', onTransitionClick);
    });
    playBtn?.removeEventListener('click', onPlayClick);
    if (playTimeout) clearTimeout(playTimeout);
  };
}
