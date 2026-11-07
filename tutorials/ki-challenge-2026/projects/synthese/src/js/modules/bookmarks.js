/**
 * SYNTHESE — Bookmark Module
 * localStorage-basiertes Lesezeichen-System
 *
 * TODO: Implementiere das Bookmark-System
 * Anforderungen:
 * 1. Speichere Bookmarks im localStorage (Key: 'synthese-bookmarks')
 * 2. Füge zu jeder Card einen Bookmark-Button hinzu
 * 3. Zeige Bookmarks visuell an (gefülltes vs. leeres Herz/Icon)
 * 4. Erstelle eine Bookmark-Übersichtsseite oder einen Filter
 * 5. Bookmarks sollen über Sessions hinweg erhalten bleiben
 *
 * KI-Prompt-Tipp:
 * "Erstelle ein Bookmark-Modul mit localStorage CRUD.
 *  Speichere Topic-IDs als Array.
 *  Füge Bookmark-Buttons zu Cards hinzu.
 *  Zeige gefülltes/leeres Icon je nach State."
 */

const STORAGE_KEY = 'synthese-bookmarks';

/**
 * Gibt alle gespeicherten Bookmarks zurück
 * @returns {string[]} Array von Topic-IDs
 */
export function getBookmarks() {
  // TODO: Implementiere localStorage-Lesen
  // Tipp: JSON.parse(localStorage.getItem(STORAGE_KEY)) || []

  console.log('[TODO] getBookmarks() muss implementiert werden');
  return [];
}

/**
 * Fügt ein Topic zu den Bookmarks hinzu
 * @param {string} topicId - ID des Topics
 */
export function addBookmark(topicId) {
  // TODO: Implementiere Hinzufügen
  // 1. Lies aktuelle Bookmarks
  // 2. Füge topicId hinzu (wenn nicht vorhanden)
  // 3. Speichere in localStorage
  // 4. Aktualisiere UI
}

/**
 * Entfernt ein Topic aus den Bookmarks
 * @param {string} topicId - ID des Topics
 */
export function removeBookmark(topicId) {
  // TODO: Implementiere Entfernen
  // 1. Lies aktuelle Bookmarks
  // 2. Filtere topicId heraus
  // 3. Speichere in localStorage
  // 4. Aktualisiere UI
}

/**
 * Toggle: Fügt hinzu oder entfernt ein Bookmark
 * @param {string} topicId - ID des Topics
 * @returns {boolean} true = hinzugefügt, false = entfernt
 */
export function toggleBookmark(topicId) {
  // TODO: Implementiere Toggle-Logik
  // 1. Prüfe, ob topicId bereits bookmarked ist
  // 2. Falls ja: removeBookmark, sonst addBookmark
  // 3. Rückgabe: Neuer State
}

/**
 * Prüft, ob ein Topic bookmarked ist
 * @param {string} topicId - ID des Topics
 * @returns {boolean}
 */
export function isBookmarked(topicId) {
  // TODO: Implementiere Prüfung
  // Tipp: getBookmarks().includes(topicId)
}

/**
 * Initialisiert Bookmark-Buttons auf allen Cards
 */
export function initBookmarkButtons() {
  // TODO: Implementiere Button-Initialisierung
  // 1. Query alle Bookmark-Buttons
  // 2. Setze initialen State (gefüllt/leer)
  // 3. Füge Click-Event-Listener hinzu
  // 4. Toggle Bookmark bei Klick
}

/**
 * Rendert die Bookmark-Liste (z.B. in einem Overlay oder separater Seite)
 * @param {string} containerSelector - Selector für den Container
 */
export function renderBookmarks(containerSelector = '#bookmarks-list') {
  // TODO: Implementiere Bookmark-Liste
  // 1. Lies alle Bookmarks
  // 2. Hole Topic-Daten für jede ID
  // 3. Rendere Mini-Cards oder Links
}
