/**
 * js/modules/storage.js — minimaler, abstoßsicherer localStorage-Wrapper
 *
 * - JSON-Serialisierung (get/set)
 * - Namespace-Präfix `jsc-`
 * - Exceptions (Quota, JSON-Fehler, gesperrter Storage) → In-Memory-Fallback,
 *   die Seite bleibt vollständig funktionsfähig.
 */

const PREFIX = 'jsc-';
const memory = new Map();

export function get(key, fallback = undefined) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return memory.has(key) ? memory.get(key) : fallback;
  }
}

export function set(key, value) {
  memory.set(key, value);
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* Quota / Storage gesperrt → In-Memory-Fallback reicht für die Sitzung */
  }
}
