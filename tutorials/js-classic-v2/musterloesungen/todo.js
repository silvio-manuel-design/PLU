/**
 * ABSCHLUSSPROJEKT 1: TODO-LISTE
 * Vollständige, optimale Referenzimplementierung
 * Verwendet: DOM, Events, Arrays, Objekte, LocalStorage, Event-Delegation
 */

// ===========================================================================
// 1. GLOBALE VARIABLEN & KONSTANTEN
// ===========================================================================
let todos = []; // Array von Todo-Objekten: { text: string, erledigt: boolean }
const STORAGE_KEY = 'meineTodos'; // Schlüssel für LocalStorage

// DOM-Elemente
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

// ===========================================================================
// 2. LOKALE SPEICHERUNG
// ===========================================================================

/**
 * Speichert die aktuelle Todo-Liste im Browser (Local Storage)
 */
function speichereTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

/**
 * Lädt Todos aus dem Local Storage beim Start der Seite
 * Falls keine Daten existieren, bleibt das Array leer
 */
function ladeTodos() {
  const gespeichert = localStorage.getItem(STORAGE_KEY);
  if (gespeichert) {
    try {
      todos = JSON.parse(gespeichert);
      // Sicherstellen, dass jedes Todo die richtige Struktur hat
      todos = todos.map(todo => ({
        text: String(todo.text || ''),
        erledigt: Boolean(todo.erledigt)
      }));
    } catch (e) {
      console.warn('Ungültige Daten im LocalStorage – leere Liste geladen.');
      todos = [];
    }
  }
  zeigeTodos();
}

// ===========================================================================
// 3. ANZEIGE DER TODOS
// ===========================================================================

/**
 * Zeigt alle Todos als HTML-Elemente in der Liste an
 * Verwendet sichere Textausgabe (kein raw HTML von Benutzereingaben)
 */
function zeigeTodos() {
  todoList.innerHTML = '';
  
  if (todos.length === 0) {
    todoList.innerHTML = '<p class="hinweis">Keine Todos vorhanden. Füge eine neue Aufgabe hinzu!</p>';
    return;
  }

  todos.forEach((todo, index) => {
    const todoItem = document.createElement('div');
    todoItem.className = `todo-item ${todo.erledigt ? 'erledigt' : ''}`;
    
    // ACHTUNG: text wird als Text eingefügt – keine HTML-Interpretation!
    // Dadurch ist XSS ausgeschlossen
    todoItem.innerHTML = `
      <input type="checkbox" ${todo.erledigt ? 'checked' : ''} data-index="${index}">
      <span class="todo-text">${todo.text}</span>
      <div class="todo-actions">
        <button data-index="${index}">Löschen</button>
      </div>
    `;
    todoList.appendChild(todoItem);
  });
}

// ===========================================================================
// 4. HINZUFÜGEN VON TODOS
// ===========================================================================

/**
 * Fügt ein neues Todo zur Liste hinzu
 * Validierung: Leere Eingaben werden ignoriert
 */
function fuegeTodoHinzu() {
  const text = todoInput.value.trim();
  if (text === '') return; // Keine leeren Todos
  
  todos.push({ text, erledigt: false });
  speichereTodos();
  zeigeTodos();
  
  // Eingabefeld leeren und Fokus zurückgeben
  todoInput.value = '';
  todoInput.focus();
}

// ===========================================================================
// 5. EVENT-HANDLING (MIT DELEGATION)
// ===========================================================================

/**
 * Event-Delegation für die gesamte Todo-Liste
 * Handhabt sowohl Checkbox-Klicks als auch Löschen-Buttons
 */
todoList.addEventListener('click', function(e) {
  // Nur Elemente mit data-index berücksichtigen
  const indexStr = e.target.dataset.index;
  if (indexStr === undefined) return;
  
  const index = parseInt(indexStr, 10);
  if (isNaN(index) || index < 0 || index >= todos.length) return;

  if (e.target.type === 'checkbox') {
    // Todo als erledigt markieren/entmarkieren
    todos[index].erledigt = e.target.checked;
    speichereTodos();
    zeigeTodos();
  } else if (e.target.tagName === 'BUTTON') {
    // Todo löschen
    todos.splice(index, 1);
    speichereTodos();
    zeigeTodos();
  }
});

// ===========================================================================
// 6. INITIALISIERUNG & EVENT-LISTENER
// ===========================================================================

// Hinzufügen per Button
addBtn.addEventListener('click', fuegeTodoHinzu);

// Hinzufügen per Enter-Taste
todoInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    fuegeTodoHinzu();
  }
});

// Seite laden → Todos laden
document.addEventListener('DOMContentLoaded', ladeTodos);