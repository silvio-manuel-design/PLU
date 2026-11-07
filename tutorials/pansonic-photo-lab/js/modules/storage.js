/**
 * Pansonic Photo Lab — Safe Storage Utility
 * Wraps localStorage with JSON serialization and error handling.
 * All storage reads/writes MUST go through this module.
 * NOTE: Keys are used as-is (no prefix) — consistent with Video Lab.
 */

/* ── Internal helpers ────────────────────────────────────── */

function safeGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    return false;
  }
}

function safeRemove(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
}

/* ── Public API ───────────────────────────���──────────────── */

/**
 * Get a value from localStorage.
 * @param {string} key
 * @param {*} fallback  Returned if key missing or parse fails.
 * @returns {*}
 */
export function getStorage(key, fallback = null) {
  const raw = safeGet(key);
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return raw;
  }
}

/**
 * Set a value in localStorage.
 * Primitives are stored as-is; objects/arrays are JSON-stringified.
 * @param {string} key
 * @param {*} value
 * @returns {boolean} success
 */
export function setStorage(key, value) {
  const toStore = typeof value === 'string' ? value : JSON.stringify(value);
  return safeSet(key, toStore);
}

/**
 * Remove a key from localStorage.
 * @param {string} key
 * @returns {boolean} success
 */
export function removeStorage(key) {
  return safeRemove(key);
}

/**
 * Get a raw string (no JSON.parse).
 * @param {string} key
 * @param {string|null} fallback
 * @returns {string|null}
 */
export function getStorageRaw(key, fallback = null) {
  return safeGet(key) ?? fallback;
}

/**
 * Set a raw string (no JSON.stringify).
 * @param {string} key
 * @param {string} value
 * @returns {boolean}
 */
export function setStorageRaw(key, value) {
  return safeSet(key, value);
}
