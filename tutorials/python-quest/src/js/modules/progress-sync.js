/**
 * PYTHON QUEST — Progress Sync (localStorage only)
 * Wird später durch PHP-Backend ersetzt
 */

const SYNC_DEBOUNCE_MS = 2000;
let syncTimeout = null;

/**
 * Initialisiert den Sync beim App-Start
 * (aktuell nur localStorage, PHP-Backend folgt)
 */
export async function initProgressSync() {
  console.log('[Sync] Running in localStorage mode — PHP backend coming soon');
}

/**
 * Öffentliche API: Sync auslösen (debounced)
 * Wird nach jeder Quest-Abschluss, Badge-Verleihung, etc. aufgerufen
 * (aktuell no-op, wird durch PHP-Backend aktiviert)
 */
export function queueSyncToCloud() {
  // PHP-Backend: Hier wird später ein fetch() zum PHP-Server gemacht
  clearTimeout(syncTimeout);
  syncTimeout = setTimeout(() => {
    console.log('[Sync] Would sync to PHP backend (not yet implemented)');
  }, SYNC_DEBOUNCE_MS);
}

/**
 * Sofortiger Sync
 */
export async function syncNow() {
  console.log('[Sync] Would sync to PHP backend (not yet implemented)');
}

/**
 * Reflexion speichern
 * (aktuell nur localStorage, PHP-Backend folgt)
 */
export async function saveReflectionToCloud(worldId, questId, content) {
  // Wird später durch PHP-Backend ersetzt
  console.log('[Sync] Reflection saved locally (PHP backend coming soon)');
  return true;
}

/**
 * Reflexionen laden
 * (aktuert nur localStorage, PHP-Backend folgt)
 */
export async function fetchReflectionsFromCloud() {
  // Wird später durch PHP-Backend ersetzt
  return [];
}
