/**
 * PYTHON QUEST — Audio Engine
 * Web Audio API fuer adaptive Soundeffekte
 */

let audioCtx = null;
let audioEnabled = true;

function initAudio() {
  if (audioCtx) return audioCtx;
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
  } catch {
    console.warn('Web Audio API not supported');
    return null;
  }
}

function ensureAudio() {
  if (!audioEnabled) return null;
  const ctx = initAudio();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume();
  }
  return ctx;
}

export function playSuccess() {
  const ctx = ensureAudio();
  if (!ctx) return;
  
  // Major chord arpeggio: C4-E4-G4-C5
  const notes = [523.25, 659.25, 783.99, 1046.50];
  notes.forEach((freq, i) => {
    playTone(ctx, freq, 0.12, 'sine', i * 0.08);
  });
}

export function playError() {
  const ctx = ensureAudio();
  if (!ctx) return;
  
  // Minor fall: A3-F3-D3
  const notes = [440, 349.23, 293.66];
  notes.forEach((freq, i) => {
    playTone(ctx, freq, 0.15, 'sawtooth', i * 0.15);
  });
}

export function playLevelUp() {
  const ctx = ensureAudio();
  if (!ctx) return;
  
  // Epic fanfare
  const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50, 1318.51];
  const durations = [0.1, 0.1, 0.1, 0.15, 0.1, 0.1, 0.4];
  
  let delay = 0;
  notes.forEach((freq, i) => {
    playTone(ctx, freq, durations[i], 'sine', delay);
    delay += durations[i] + 0.03;
  });
  
  // Bass note
  playTone(ctx, 261.63, 0.5, 'sine', 0);
}

export function playClick() {
  const ctx = ensureAudio();
  if (!ctx) return;
  playTone(ctx, 800, 0.04, 'sine', 0);
}

export function playBadgeEarned() {
  const ctx = ensureAudio();
  if (!ctx) return;
  
  // Magical chime
  const notes = [1046.50, 1318.51, 1567.98, 2093.00];
  notes.forEach((freq, i) => {
    playTone(ctx, freq, 0.2, 'sine', i * 0.1);
  });
}

function playTone(ctx, freq, duration, type = 'sine', delay = 0) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = type;
  osc.frequency.value = freq;
  
  const now = ctx.currentTime + delay;
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(now);
  osc.stop(now + duration);
}

export function toggleAudio() {
  audioEnabled = !audioEnabled;
  return audioEnabled;
}

export function isAudioEnabled() {
  return audioEnabled;
}
