/**
 * Progress Module
 */

import { getStorage } from './storage.js';

export function initGlobalProgress() {
  const ring = document.getElementById('globalProgressRing');
  if (!ring) return;

  const progress = getStorage('pansonic-module-progress', {});
  const totalModules = 12;
  let completed = 0;

  for (let i = 0; i < totalModules; i++) {
    const key = `m${String(i).padStart(2, '0')}`;
    if (progress[key]?.done) completed++;
  }

  const percent = totalModules > 0 ? (completed / totalModules) * 100 : 0;
  const circumference = 2 * Math.PI * 20;
  const offset = circumference - (percent / 100) * circumference;

  const fill = ring.querySelector('.photo-progress-ring__fill');
  if (fill) {
    fill.style.strokeDasharray = `${circumference}`;
    fill.style.strokeDashoffset = `${offset}`;
  }

  const text = ring.querySelector('.photo-progress-ring__text');
  if (text) {
    text.textContent = `${Math.round(percent)}%`;
  }
}

export function initTrackCallouts() {
  // Placeholder for track-specific callouts
}
