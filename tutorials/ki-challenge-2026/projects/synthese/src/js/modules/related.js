/**
 * SYNTHESE — Related Links Module
 * Zeigt verwandte Themen basierend auf dem `related`-Array
 *
 * TODO: Implementiere das Related-Links-Modul
 * Anforderungen:
 * 1. Lies das `related`-Array aus dem aktuellen Topic
 * 2. Finde die passenden Topics im topics-Array
 * 3. Rendere 3 verwandte Themen als kleine Cards
 * 4. Links sollen zur Detail-Ansicht führen
 * 5. Wenn keine verwandten Themen: Zeige zufällige/populäre Themen
 *
 * KI-Prompt-Tipp:
 * "Erstelle ein Verknüpfungs-Modul basierend auf einem related-Array.
 *  Finde verwandte Topics in einem Daten-Array.
 *  Rendere 3 kleine Cards mit Titel und Link."
 */

import { topics } from './data.js';

/**
 * Findet verwandte Topics für eine gegebene Topic-ID
 * @param {string} currentTopicId - ID des aktuellen Topics
 * @param {number} [limit=3] - Maximale Anzahl verwandter Topics
 * @returns {Array} Array verwandter Topic-Objekte
 */
export function getRelatedTopics(currentTopicId, limit = 3) {
  // TODO: Implementiere verwandte Topics finden
  // 1. Finde das aktuelle Topic im topics-Array
  // 2. Lies das related-Array aus
  // 3. Finde die passenden Topics
  // 4. Begrenze auf 'limit' Ergebnisse
  // 5. Falls zu wenige: Ergänze mit zufälligen Topics

  console.log('[TODO] getRelatedTopics() muss implementiert werden');
  return [];
}

/**
 * Rendert verwandte Topics in den Container
 * @param {string} currentTopicId - ID des aktuellen Topics
 * @param {string} containerSelector - Selector für den Container
 */
export function renderRelated(currentTopicId, containerSelector = '#related-topics') {
  // TODO: Implementiere Related-Render
  // 1. Hole verwandte Topics
  // 2. Erstelle HTML für Mini-Cards
  // 3. Füge in Container ein
}

/**
 * Erstellt HTML für eine Related-Mini-Card
 * @param {Object} topic - Topic-Objekt
 * @returns {string} HTML-String
 */
function createRelatedCardHtml(topic) {
  // TODO: Implementiere Mini-Card HTML
  // Einfacher als Haupt-Card: nur Titel, Kategorie, kurze Summary
}

/**
 * Gibt zufällige Topics zurück (als Fallback)
 * @param {number} count - Anzahl
 * @param {string} excludeId - Auszuschließende ID
 * @returns {Array} Zufällige Topics
 */
function getRandomTopics(count, excludeId) {
  // TODO: Implementiere zufällige Topics
  // 1. Filtere excludeId heraus
  // 2. Mische das Array (Fisher-Yates)
  // 3. Nimm die ersten 'count' Elemente
}
