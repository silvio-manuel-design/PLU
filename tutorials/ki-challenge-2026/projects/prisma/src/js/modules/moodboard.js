/**
 * PRISMA — Moodboard
 * Drag & Drop Moodboard für Inspirations-Sammlung
 *
 * TODO: Implementiere das Moodboard
 * Anforderungen:
 * 1. Grid von Platzhalter-Items (Bilder, Farben, Texte)
 * 2. Drag & Drop mit HTML5 Drag and Drop API
 * 3. Items können neu angeordnet werden
 * 4. Items können gelöscht werden
 * 5. State wird im localStorage gespeichert
 * 6. Items können per URL/Image-Upload hinzugefügt werden
 *
 * KI-Prompt-Tipp:
 * "Erstelle ein Moodboard mit HTML5 Drag & Drop API.
 *  Items sollen neu angeordnet werden können.
 *  Speichere die Reihenfolge in localStorage.
 *  Füge einen Button zum Hinzufügen neuer Items hinzu."
 */

const STORAGE_KEY = 'prisma-moodboard';

/**
 * Standard-Items für das Moodboard
 * @type {Array<{id: string, type: string, content: string}>}
 */
const DEFAULT_ITEMS = [
  // TODO: Füge 6–8 Standard-Items hinzu
  // Beispiel:
  // { id: '1', type: 'color', content: '#4F46E5' },
  // { id: '2', type: 'image', content: 'assets/images/moodboard-1.jpg' },
  // { id: '3', type: 'text', content: 'Minimal & Clean' },
];

/**
 * Initialisiert das Moodboard
 * @param {string} containerSelector - Selector für den Container
 */
export function initMoodboard(containerSelector = '#moodboard-grid') {
  // TODO: Implementiere Initialisierung
  // 1. Lade gespeicherte Items aus localStorage
  // 2. Falls keine vorhanden: Nutze DEFAULT_ITEMS
  // 3. Rendere alle Items
  // 4. Initialisiere Drag & Drop

  console.log('[TODO] initMoodboard() muss implementiert werden');
}

/**
 * Rendert alle Moodboard-Items
 * @param {Array} items - Array von Item-Objekten
 * @param {string} containerSelector - Selector für den Container
 */
function renderItems(items, containerSelector) {
  // TODO: Implementiere Item-Rendering
  // Erstelle für jedes Item:
  // - Farbe: Farbiges Rechteck
  // - Bild: <img> Tag
  // - Text: Styled Text-Block
  // Alle Items sind draggable
}

/**
 * Fügt ein neues Item zum Moodboard hinzu
 * @param {Object} item - {type, content}
 */
export function addItem(item) {
  // TODO: Implementiere Hinzufügen
  // 1. Generiere eindeutige ID
  // 2. Füge zum Items-Array hinzu
  // 3. Speichere in localStorage
  // 4. Rendere neu
}

/**
 * Entfernt ein Item aus dem Moodboard
 * @param {string} itemId - ID des Items
 */
export function removeItem(itemId) {
  // TODO: Implementiere Entfernen
  // 1. Filtere Item heraus
  // 2. Speichere in localStorage
  // 3. Rendere neu
}

/**
 * Speichert die aktuelle Reihenfolge im localStorage
 * @param {Array} items - Array von Items
 */
function saveOrder(items) {
  // TODO: Implementiere Speicherung
  // JSON.stringify(items) in localStorage
}

/**
 * Lädt die gespeicherte Reihenfolge
 * @returns {Array}
 */
function loadOrder() {
  // TODO: Implementiere Laden
  // JSON.parse(localStorage.getItem(STORAGE_KEY)) || DEFAULT_ITEMS
}

// TODO: Implementiere Drag & Drop Event-Handler
// - dragstart, dragover, drop, dragend
// - Aktualisiere die Reihenfolge nach dem Drop
// - Speichere die neue Reihenfolge
