/**
 * Pansonic Video Lab — Player Page Entry Point
 */

import './entry-global.js';
import { initVideoPlayer } from './modules/video-player.js';

document.addEventListener('DOMContentLoaded', () => {
  const lang = document.documentElement.lang === 'en' ? 'en' : 'de';
  initVideoPlayer({ lang });
});
