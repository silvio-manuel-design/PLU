/**
 * Pansonic Photo Lab — Glossary Page Entry Point
 */

import './entry-global.js';
import { loadGlossary } from './modules/glossary.js';

document.addEventListener('DOMContentLoaded', () => {
  loadGlossary();
});
