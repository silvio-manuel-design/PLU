/**
 * SYNTHESE — Cards Module
 * Rendert Topic-Cards aus dem topics-Array
 *
 * TODO: Implementiere die Card-Render-Funktion
 * Anforderungen:
 * 1. Iteriere über das topics-Array
 * 2. Erstelle für jedes Topic eine HTML-Card
 * 3. Nutze BEM-Klassen: .challenge-topic-card, .challenge-topic-card__title, etc.
 * 4. Füge Kategorie-Farbcodierung hinzu (jede Kategorie hat eine eigene Farbe)
 * 5. Füge Schwierigkeits-Badge hinzu (Leicht/Mittel/Schwer)
 * 6. Cards sollen klickbar sein und zum Detail öffnen
 *
 * KI-Prompt-Tipp:
 * "Erstelle eine Funktion, die ein Array von Themen in HTML-Cards rendert.
 *  Nutze BEM-Naming (.challenge-topic-card).
 *  Füge Kategorie-Farben und Schwierigkeits-Badges hinzu."
 */

import { topics } from './data.js';
import { t } from './i18n.js';

/**
 * Rendert alle Topic-Cards in den Container
 * @param {string} containerSelector - Selector für den Container
 * @param {Array} [data=topics] - Array der zu rendernden Themen
 */
export function renderCards(containerSelector = '#topics-grid', data = topics) {
  // TODO: Implementiere die Render-Funktion
  // 1. Query den Container
  // 2. Erstelle HTML-String für alle Cards
  // 3. Füge HTML in den Container ein
  // 4. Füge Click-Event-Listener zu jeder Card hinzu

  console.log('[TODO] renderCards() muss implementiert werden');
}

/**
 * Erstellt das HTML für eine einzelne Card
 * @param {Object} topic - Ein Topic-Objekt aus data.js
 * @returns {string} HTML-String
 */
function createCardHtml(topic) {
  // TODO: Implementiere die Card-HTML-Erstellung
  // Rückgabe: HTML-String mit BEM-Klassen
  // Beispiel:
  // <article class="challenge-topic-card" data-id="${topic.id}">
  //   <div class="challenge-topic-card__category">...</div>
  //   <h3 class="challenge-topic-card__title">...</h3>
  //   ...
  // </article>

  return ''; // TODO: Ersetze durch echtes HTML
}

/**
 * Gibt die CSS-Klasse für eine Kategorie zurück
 * @param {string} category - Kategorie-Name
 * @returns {string} CSS-Klasse für die Kategorie-Farbe
 */
function getCategoryClass(category) {
  // TODO: Implementiere Kategorie-zu-Klasse Mapping
  // Beispiel:
  // const map = { grundlagen: 'is-grundlagen', design: 'is-design', ... };
  // return map[category] || '';
}

/**
 * Gibt den lokalisierten Schwierigkeits-Text zurück
 * @param {string} difficulty - 'easy' | 'medium' | 'hard'
 * @returns {string} Lokalisierter Text
 */
function getDifficultyLabel(difficulty) {
  // TODO: Implementiere Schwierigkeits-Label
  // Nutze t() für i18n oder ein Mapping-Objekt
}

/**
 * Öffnet die Detail-Ansicht für ein Topic
 * @param {string} topicId - ID des Topics
 */
function openTopicDetail(topicId) {
  // TODO: Implementiere Detail-Öffnung
  // Option 1: Öffne Modal
  // Option 2: Navigiere zu detail.html?id=topicId
}
