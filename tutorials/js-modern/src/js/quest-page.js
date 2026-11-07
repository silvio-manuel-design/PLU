import { initTheme } from './modules/theme.js';
import { loadProgress, completeQuest, isQuestComplete } from './modules/progress.js';
import { updateXPDisplay, showXPGain, showLevelUp } from './modules/xp-system.js';
import { worlds } from './modules/quest-data.js';
import { ClassroomManager, initBackToTop, initMobileMenu } from './modules/classroom.js';
import { validateJS } from './modules/sandbox-validator.js';
import { executeJS, renderVariablesHTML } from './modules/sandbox-engine.js';
import { initI18n, t, tOr, onLangChange } from './modules/i18n.js';
import de from './translations/de.js';
import en from './translations/en.js';

let currentQuest = null;
let currentWorld = null;
let autoSaveInterval = null;
let sandboxLog = [];

/* ================================================================
   UTILITIES
   ================================================================ */

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function showToast(message, icon = 'ph-check-circle') {
  const toast = document.getElementById('quest-toast');
  const text = document.getElementById('quest-toast-text');
  if (!toast || !text) return;
  text.textContent = message;
  toast.querySelector('i').className = `ph ${icon}`;
  toast.classList.add('quest-toast--show');
  setTimeout(() => toast.classList.remove('quest-toast--show'), 3000);
}

/* ================================================================
   WORLD COLOR HELPERS
   ================================================================ */

function getWorldRGB(worldId) {
  const map = {
    'welt-1': '241, 196, 15',
    'welt-2': '230, 126, 34',
    'welt-3': '39, 174, 96',
    'welt-4': '41, 128, 185',
    'welt-5': '142, 68, 173'
  };
  return map[worldId] || '241, 196, 15';
}

function getWorldColor(worldId) {
  const map = {
    'welt-1': '#F1C40F',
    'welt-2': '#E67E22',
    'welt-3': '#27AE60',
    'welt-4': '#2980B9',
    'welt-5': '#8E44AD'
  };
  return map[worldId] || '#F1C40F';
}

function applyWorldTheme() {
  const rgb = getWorldRGB(currentWorld?.id);
  const color = getWorldColor(currentWorld?.id);
  document.documentElement.style.setProperty('--world-accent', color);
  document.documentElement.style.setProperty('--world-accent-rgb', rgb);

  // Hero accent bar & sidebar use CSS var --world-accent from above
}

/* ================================================================
   SIDEBAR
   ================================================================ */

function renderSidebar() {
  const progress = loadProgress();
  const worldQuests = currentWorld.quests;
  const completedInWorld = worldQuests.filter(q => progress.completedQuests.includes(q.id));
  const percent = Math.round((completedInWorld.length / worldQuests.length) * 100);

  // World info
  const worldIcon = document.querySelector('#sidebar-world .quest-sidebar__world-icon');
  const worldTitle = document.querySelector('#sidebar-world .quest-sidebar__world-info h4');
  const worldMeta = document.querySelector('#sidebar-world .quest-sidebar__world-info p');

  if (worldIcon) {
    worldIcon.innerHTML = `<i class="ph ${currentWorld.icon}"></i>`;
  }
  if (worldTitle) worldTitle.textContent = t('world.' + currentWorld.id + '.title') || currentWorld.title;
  if (worldMeta) worldMeta.textContent = `${completedInWorld.length}/${worldQuests.length} ${t('quest.quests')}`;

  // Progress
  const progressText = document.getElementById('sidebar-progress-text');
  const progressFill = document.getElementById('sidebar-progress-fill');
  if (progressText) progressText.textContent = `${percent}%`;
  if (progressFill) progressFill.style.setProperty('--progress-width', `${percent}%`);

  // Quest list
  const list = document.getElementById('sidebar-list');
  if (!list) return;

  list.innerHTML = worldQuests.map((q, idx) => {
    const isDone = progress.completedQuests.includes(q.id);
    const isCurrent = q.id === currentQuest.id;
    const isLocked = idx > 0 && !progress.completedQuests.includes(worldQuests[idx - 1].id) && !isDone && !isCurrent;
    const classes = [
      'quest-sidebar__item',
      isCurrent ? 'quest-sidebar__item--current' : '',
      isDone ? 'quest-sidebar__item--done' : '',
      isLocked ? 'quest-sidebar__item--locked' : ''
    ].filter(Boolean).join(' ');

    const dotClass = isDone ? 'quest-sidebar__dot--done' : (isCurrent ? 'quest-sidebar__dot--current' : '');

    if (isLocked) {
      return `
        <li class="${classes}">
          <span class="quest-sidebar__dot"></span>
          <span class="quest-sidebar__item-text">${escapeHtml(tOr('quest.' + q.id + '.title') || q.title)}</span>
          <i class="ph ph-lock-key u-text-xs u-text-muted"></i>
        </li>
      `;
    }

    const questTitle = tOr('quest.' + q.id + '.title') || q.title;
    return `
      <li class="${classes}" data-quest-link="?world=${currentWorld.id}&quest=${q.id}">
        <span class="quest-sidebar__dot ${dotClass}"></span>
        <span class="quest-sidebar__item-text">${escapeHtml(questTitle)}</span>
        ${isDone ? '<i class="ph ph-check u-text-xs u-text-success"></i>' : `<span class="quest-sidebar__item-xp">+${q.xp} XP</span>`}
      </li>
    `;
  }).join('');
}

/* ================================================================
   HERO
   ================================================================ */

function renderHero() {
  const heroWorld = document.getElementById('quest-hero-world');
  const heroTitle = document.getElementById('quest-hero-title');
  const heroMeta = document.getElementById('quest-hero-meta');
  const heroBg = document.querySelector('.quest-hero--detail .quest-hero__bg picture');

  if (heroWorld) {
    heroWorld.innerHTML = `
      <i class="ph ${currentWorld.icon}"></i>
      <span>${t('world.' + currentWorld.id + '.title') || currentWorld.title}</span>
    `;
    heroWorld.style.setProperty('--hero-border', `rgba(${getWorldRGB(currentWorld.id)}, 0.3)`);
    heroWorld.style.setProperty('--hero-bg', `rgba(${getWorldRGB(currentWorld.id)}, 0.12)`);
  }

  if (heroTitle) heroTitle.textContent = tOr('quest.' + currentQuest.id + '.title') || currentQuest.title;

  if (heroMeta) {
    heroMeta.innerHTML = `
      <span class="quest-hero__meta-tag"><i class="ph ph-clock"></i> ${currentQuest.duration}</span>
      <span class="quest-hero__meta-tag"><i class="ph ph-star"></i> ${currentQuest.xp} XP</span>
      <span class="quest-hero__meta-tag">${getTypeLabel(currentQuest.type)}</span>
      ${isQuestComplete(currentQuest.id) ? `<span class="quest-hero__meta-tag quest-hero__meta-tag--success"><i class="ph ph-check-circle"></i> ${t('quest.completed')}</span>` : ''}
    `;
  }

  if (heroBg) {
    heroBg.innerHTML = `
      <source srcset="../assets/images/quests/${currentQuest.id}.webp" type="image/webp">
      <img src="../assets/images/quests/${currentQuest.id}.jpg" alt="" loading="eager" data-hero-img-fallback>
    `;
  }

  // Hero image error fallback (replaces inline onerror)
  const heroImg = document.querySelector('[data-hero-img-fallback]');
  if (heroImg) {
    heroImg.addEventListener('error', () => {
      if (heroBg) {
        heroBg.innerHTML = `
          <source srcset="../assets/images/quests/quest-bg.webp" type="image/webp">
          <img src="../assets/images/quests/quest-bg.jpg" alt="" loading="eager">
        `;
      }
    }, { once: true });
  }
}

function getTypeLabel(type) {
  const key = 'quest.type.' + type;
  const translated = t(key);
  return translated !== key ? translated : type;
}

/* ================================================================
   CHECKLIST
   ================================================================ */

function getChecklistKey() {
  return `quest-checklist-${currentQuest.id}`;
}

function loadChecklist() {
  try {
    return JSON.parse(localStorage.getItem(getChecklistKey())) || [];
  } catch { return []; }
}

function saveChecklist(checked) {
  localStorage.setItem(getChecklistKey(), JSON.stringify(checked));
}

function initChecklist() {
  const items = document.querySelectorAll('.quest-checklist__item');
  const checked = loadChecklist();
  const progressBar = document.getElementById('checklist-progress-fill');
  const progressText = document.getElementById('checklist-progress-text');

  function updateProgress() {
    const total = items.length;
    const done = document.querySelectorAll('.quest-checklist__item--checked').length;
    const pct = Math.round((done / total) * 100);
    if (progressBar) progressBar.style.setProperty('--checklist-progress', `${pct}%`);
    if (progressText) progressText.textContent = `${done}/${total}`;
  }

  items.forEach((item, idx) => {
    if (checked.includes(idx)) item.classList.add('quest-checklist__item--checked');

    item.addEventListener('click', () => {
      item.classList.toggle('quest-checklist__item--checked');
      const newChecked = Array.from(items)
        .map((el, i) => el.classList.contains('quest-checklist__item--checked') ? i : -1)
        .filter(i => i !== -1);
      saveChecklist(newChecked);
      updateProgress();
    });
  });

  updateProgress();
}

/* ================================================================
   SANDBOX — IDE Style + Auto-Save
   ================================================================ */

function getSandboxKey() {
  return `quest-sandbox-v2-${currentQuest.id}`;
}

function getSandboxLogKey() {
  return `quest-sandbox-log-v2-${currentQuest.id}`;
}

function loadSandboxCode() {
  const saved = localStorage.getItem(getSandboxKey());
  if (saved) return saved;
  return getDefaultCode();
}

function saveSandboxCode(code) {
  localStorage.setItem(getSandboxKey(), code);
  // Log entry
  const logKey = getSandboxLogKey();
  let log = [];
  try { log = JSON.parse(localStorage.getItem(logKey)) || []; } catch {}
  log.push({ time: Date.now(), length: code.length });
  // Keep last 50 entries
  if (log.length > 50) log = log.slice(-50);
  localStorage.setItem(logKey, JSON.stringify(log));
}

function getDefaultCode() {
  const defaults = {
    // ===== WELT 1: Das Terminal =====
    'q1-1': `// Deine erste JavaScript-Zeile
// Tippe deinen Code hier und drücke "Run"

console.log("Hallo JavaScript-Welt!");

let name = "Max";
console.log("Mein Name ist", name);`,

    'q1-2': `// Variablen und Operatoren

let zahl1 = 15;
let zahl2 = 7;

console.log("Addition:", zahl1 + zahl2);
console.log("Subtraktion:", zahl1 - zahl2);
console.log("Multiplikation:", zahl1 * zahl2);
console.log("Division:", zahl1 / zahl2);

// String-Verkettung
let vorname = "Anna";
let nachname = "Müller";
console.log("Name:", vorname + " " + nachname);

// console.error zeigt Fehler in rot an
console.error("Das ist ein Fehler-Beispiel");
console.warn("Das ist eine Warnung");`,

    'q1-3': `// Zahlen und Type Casting

// parseInt: Text → Ganzzahl
let alterText = "16";
let alterZahl = parseInt(alterText);
console.log("Alter als Zahl:", alterZahl + 1);

// parseFloat: Text → Dezimalzahl
let preisText = "19.99";
let preis = parseFloat(preisText);
console.log("Preis:", preis);

// typeof zeigt den Datentyp
console.log("Typ von alterText:", typeof alterText);
console.log("Typ von alterZahl:", typeof alterZahl);`,

    'q1-4': `// Mehrere Variablen und Kommentare

// persönliche Daten
let vorname = "Lisa";
let nachname = "Schmidt";
let alter = 17;
let istSchueler = true;

// Ausgabe aller Werte
console.log("=== Profil ===");
console.log("Vorname:", vorname);
console.log("Nachname:", nachname);
console.log("Alter:", alter);
console.log("Schüler:", istSchueler);

// Berechnung
let geburtsjahr = 2025 - alter;
console.log("Geburtsjahr:", geburtsjahr);`,

    // ===== WELT 2: Logik & Kontrolle =====
    'q2-1': `// if / else Bedingungen

let alter = 16;

if (alter >= 18) {
  console.log("Du bist volljährig.");
} else {
  console.log("Du bist minderjährig.");
}

// if-else-if
let note = 2;

if (note === 1) {
  console.log("Sehr gut!");
} else if (note === 2) {
  console.log("Gut!");
} else if (note === 3) {
  console.log("Befriedigend");
} else {
  console.log("Nicht bestanden");
}`,

    'q2-2': `// Vergleichsoperatoren

let a = 10;
let b = 5;

console.log("a == b:", a == b);   // Gleich
console.log("a != b:", a != b);   // Ungleich
console.log("a > b:", a > b);     // Größer
console.log("a < b:", a < b);     // Kleiner

// Logische Operatoren
let alter = 16;
let hatErlaubnis = true;

if (alter >= 16 && hatErlaubnis) {
  console.log("Du darfst fahren!");
}

if (alter < 14 || alter > 65) {
  console.log("Sonderregelung");
}`,

    'q2-3': `// for-Schleifen

// Zählen von 1 bis 5
for (let i = 1; i <= 5; i++) {
  console.log("Durchlauf:", i);
}

// Multiplikationstabelle
for (let i = 1; i <= 10; i++) {
  console.log("3 x", i, "=", 3 * i);
}

// Rückwärts zählen
for (let i = 5; i >= 1; i--) {
  console.log("Countdown:", i);
}
console.log("Start!");`,

    'q2-4': `// while-Schleifen und break/continue

// while-Schleife
let zaehler = 1;
while (zaehler <= 5) {
  console.log("While:", zaehler);
  zaehler++;
}

// do...while
let eingabe = "";
// Diese Schleife läuft mindestens einmal

// break: Schleife vorzeitig beenden
for (let i = 1; i <= 100; i++) {
  if (i > 5) {
    break;
  }
  console.log("break bei:", i);
}

// continue: Einen Durchlauf überspringen
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue;  // Überspringe gerade Zahlen
  }
  console.log("Ungerade:", i);
}`,

    // ===== WELT 3: Strukturen =====
    'q3-1': `// Arrays (Listen)

let farben = ["Rot", "Grün", "Blau"];
console.log("Farben:", farben);

// Einzelnes Element
console.log("Erste Farbe:", farben[0]);
console.log("Anzahl:", farben.length);

// Element ändern
farben[1] = "Gelb";
console.log("Nach Änderung:", farben);

// Gemischtes Array
let person = ["Max", 16, true];
console.log("Person:", person);`,

    'q3-2': `// Array-Methoden

let zahlen = [3, 1, 4, 1, 5];

// push: Hinten anhängen
zahlen.push(9);
console.log("Nach push:", zahlen);

// pop: Letztes entfernen
let letzte = zahlen.pop();
console.log("Entfernt:", letzte);
console.log("Nach pop:", zahlen);

// indexOf: Position finden
console.log("Index von 4:", zahlen.indexOf(4));

// includes: Prüfen ob vorhanden
console.log("Enthält 5?", zahlen.includes(5));
console.log("Enthält 7?", zahlen.includes(7));`,

    'q3-3': `// Objekte (Key-Value-Paare)

let person = {
  vorname: "Lisa",
  nachname: "Schmidt",
  alter: 17,
  hobby: "Programmieren"
};

// Werte auslesen
console.log("Vorname:", person.vorname);
console.log("Alter:", person["alter"]);

// Werte ändern
person.alter = 18;
console.log("Neues Alter:", person.alter);

// Neues Property hinzufügen
person.schule = "HTBLA";
console.log("Person:", person);`,

    'q3-4': `// Funktionen

// Einfache Funktion
function begruessung(name) {
  return "Hallo, " + name + "!";
}

console.log(begruessung("Max"));
console.log(begruessung("Anna"));

// Funktion mit Berechnung
function addiere(a, b) {
  return a + b;
}

console.log("5 + 3 =", addiere(5, 3));
console.log("10 + 20 =", addiere(10, 20));

// Funktion ohne Parameter
function zeigeInfo() {
  console.log("=== Info ===");
  console.log("Diese Funktion macht etwas!");
}

zeigeInfo();`,

    // ===== WELT 4: DOM & Strings =====
    'q4-1': `// DOM-Selektion und Manipulation
// Hinweis: Dieser Code funktioniert nur mit einer HTML-Seite

// Elemente finden (wenn HTML vorhanden wäre)
// let titel = document.getElementById("titel");
// let items = document.querySelectorAll(".item");

// Für die Sandbox: Wir simulieren Elemente
console.log("DOM-Methoden:");
console.log("document.getElementById('id')");
console.log("document.querySelector('.class')");
console.log("document.querySelectorAll('tag')");

// textContent ändern
// titel.textContent = "Neuer Titel";

// style ändern
// titel.style.color = "red";

// classList
// titel.classList.add("highlight");
// titel.classList.remove("old");
// titel.classList.toggle("active");`,

    'q4-2': `// DOM-Events
// Hinweis: Dieser Code funktioniert nur mit einer HTML-Seite

console.log("Event-Handler:");
console.log("element.addEventListener('click', function() {...})");
console.log("element.addEventListener('input', function() {...})");

// Beispiel-Struktur (wenn HTML vorhanden wäre):
// let button = document.getElementById("meinButton");
// button.addEventListener("click", function() {
//   console.log("Button wurde geklickt!");
// });

// Event-Objekt
// button.addEventListener("click", function(event) {
//   console.log("Geklickt auf:", event.target);
// });`,

    'q4-3': `// String-Methoden und Template Literals

let text = "  Hallo JavaScript Welt  ";

console.log("Original:", text);
console.log("trim:", text.trim());
console.log("toUpperCase:", text.toUpperCase());
console.log("toLowerCase:", text.toLowerCase());

// Suchen und Ersetzen
console.log("replace:", text.replace("Welt", "Universum"));

// Teilstring
console.log("slice:", text.slice(8, 18));

// Template Literal (backticks)
let name = "Max";
let alter = 16;
console.log(\`\${name} ist \${alter} Jahre alt.\`);

// Länge
console.log("Länge:", text.length);`,

    'q4-4': `// Array-Methoden (map, filter, find)

let zahlen = [1, 2, 3, 4, 5];

// map: Jedes Element transformieren
let verdoppelt = zahlen.map(function(zahl) {
  return zahl * 2;
});
console.log("Verdoppelt:", verdoppelt);

// filter: Nur bestimmte Elemente behalten
let gerade = zahlen.filter(function(zahl) {
  return zahl % 2 === 0;
});
console.log("Gerade Zahlen:", gerade);

// find: Erstes passende Element finden
let ersteGrosse = zahlen.find(function(zahl) {
  return zahl > 3;
});
console.log("Erste Zahl > 3:", ersteGrosse);

// Arrow-Funktion (kurze Schreibweise)
let triple = zahlen.map(z => z * 3);
console.log("Verdreifacht:", triple);`,

    // ===== WELT 5: Boss-Projekte =====
    'q5-1': `// Todo-Liste Projekt
// Erstelle eine einfache Todo-Liste

let todos = ["Milch kaufen", "Hausaufgaben machen"];

function zeigeTodos() {
  console.log("=== Meine Todos ===");
  for (let i = 0; i < todos.length; i++) {
    console.log((i + 1) + ". " + todos[i]);
  }
}

function addTodo(aufgabe) {
  todos.push(aufgabe);
  console.log("Hinzugefügt:", aufgabe);
}

function removeTodo(index) {
  let entfernt = todos.splice(index - 1, 1);
  console.log("Entfernt:", entfernt[0]);
}

// Teste die Funktionen
zeigeTodos();
addTodo("JavaScript lernen");
zeigeTodos();`,

    'q5-2': `// Quiz-App Projekt
// Ein einfaches Quiz mit Fragen und Antworten

let fragen = [
  { frage: "Was ist 5 + 3?", antwort: "8" },
  { frage: "Was ist die Hauptstadt von Österreich?", antwort: "Wien" }
];

function stelleFrage(index) {
  let f = fragen[index];
  console.log("Frage:", f.frage);
  console.log("(Antwort wäre:", f.antwort + ")");
}

function pruefeAntwort(index, benutzerAntwort) {
  let f = fragen[index];
  if (benutzerAntwort.toLowerCase() === f.antwort.toLowerCase()) {
    console.log("Richtig!");
    return true;
  } else {
    console.log("Falsch! Richtig wäre:", f.antwort);
    return false;
  }
}

// Teste das Quiz
stelleFrage(0);
pruefeAntwort(0, "8");
stelleFrage(1);
pruefeAntwort(1, "wien");`,

    'q5-3': `// Notenverwaltung Projekt
// Verwalte Schülernoten mit Objekten

let schueler = [
  { name: "Anna", noten: [1, 2, 1, 3] },
  { name: "Max", noten: [2, 3, 2, 2] }
];

function berechneDurchschnitt(noten) {
  let summe = 0;
  for (let i = 0; i < noten.length; i++) {
    summe += noten[i];
  }
  return summe / noten.length;
}

function zeigeSchueler() {
  console.log("=== Notenübersicht ===");
  for (let i = 0; i < schueler.length; i++) {
    let s = schueler[i];
    let schnitt = berechneDurchschnitt(s.noten);
    console.log(s.name + ": Durchschnitt = " + schnitt.toFixed(2));
  }
}

function addNote(schuelerName, note) {
  for (let i = 0; i < schueler.length; i++) {
    if (schueler[i].name === schuelerName) {
      schueler[i].noten.push(note);
      console.log("Note", note, "für", schuelerName, "hinzugefügt.");
      return;
    }
  }
}

// Teste
zeigeSchueler();
addNote("Anna", 2);
zeigeSchueler();`
  };
  return defaults[currentQuest?.id] || `// Willkommen in der JavaScript-Sandbox!
// Schreibe hier deinen Code und drücke "Run"

console.log("Hallo JavaScript!");`
}

function updateLineNumbers(textarea) {
  const lineNums = document.getElementById('sandbox-line-numbers');
  if (!lineNums || !textarea) return;
  const lines = textarea.value.split('\n').length;
  lineNums.innerHTML = Array.from({ length: Math.max(lines, 1) }, (_, i) =>
    `<div>${i + 1}</div>`
  ).join('');
}

function setupSandbox() {
  const textarea = document.getElementById('sandbox-code');
  const runBtn = document.getElementById('sandbox-run');
  const copyBtn = document.getElementById('sandbox-copy');
  const statusEl = document.getElementById('sandbox-status');

  if (!textarea) return;

  // Load saved code
  textarea.value = loadSandboxCode();
  updateLineNumbers(textarea);
  runSandbox();

  // Initial validation
  renderProblems(validateJS(textarea.value));

  // Re-render on language change
  onLangChange(() => {
    renderProblems(validateJS(textarea.value));
  });

  // Auto-run on input (debounced)
  const debouncedRun = debounce(() => {
    runSandbox();
    saveSandboxCode(textarea.value);
    if (statusEl) {
      statusEl.textContent = t('quest.status.saved');
      statusEl.classList.remove('quest-sandbox__editor-status--unsaved');
    }
  }, 800);

  // Validator — debounced
  const debouncedValidate = debounce(() => {
    const errors = validateJS(textarea.value);
    renderProblems(errors);
  }, 1000);

  textarea.addEventListener('input', () => {
    updateLineNumbers(textarea);
    if (statusEl) {
      statusEl.textContent = t('quest.status.unsaved');
      statusEl.classList.add('quest-sandbox__editor-status--unsaved');
    }
    debouncedRun();
    debouncedValidate();
  });

  // Tab support
  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.value = textarea.value.substring(0, start) + '  ' + textarea.value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 2;
      updateLineNumbers(textarea);
      debouncedRun();
    }
  });

  if (runBtn) runBtn.addEventListener('click', runSandbox);

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(textarea.value);
        showToast(t('common.copy'), 'ph-copy');
      } catch {
        showToast(t('common.copyFail'), 'ph-warning');
      }
    });
  }

  // Auto-save every 30 seconds
  if (autoSaveInterval) clearInterval(autoSaveInterval);
  autoSaveInterval = setInterval(() => {
    saveSandboxCode(textarea.value);
    const timeEl = document.getElementById('sandbox-autosave-time');
    if (timeEl) {
      timeEl.textContent = new Date().toLocaleTimeString(document.documentElement.lang || 'de', { hour: '2-digit', minute: '2-digit' });
    }
  }, 30000);
}

/**
 * Zeige HTML-Validierungsfehler im Problem-Panel
 */
function renderProblems(errors) {
  const panel = document.getElementById('sandbox-problems');
  const statusEl = document.getElementById('sandbox-status');
  const lineNums = document.getElementById('sandbox-line-numbers');

  if (!panel) return;

  // Zeilennummern zurücksetzen
  if (lineNums) {
    lineNums.querySelectorAll('.is-error').forEach(el => el.classList.remove('is-error'));
  }

  if (errors.length === 0) {
    panel.innerHTML = `
      <div class="quest-sandbox__problems-empty">
        <i class="ph ph-check-circle"></i>
        <span>${t('validator.ok')}</span>
      </div>
    `;
    if (statusEl) {
      statusEl.classList.remove('quest-sandbox__editor-status--error');
      statusEl.classList.add('quest-sandbox__editor-status--ok');
    }
    return;
  }

  // Fehlerhafte Zeilen markieren
  if (lineNums) {
    const lineDivs = lineNums.querySelectorAll('div');
    errors.forEach(err => {
      const div = lineDivs[err.line - 1];
      if (div) div.classList.add('is-error');
    });
  }

  // Status aktualisieren
  if (statusEl) {
    const errorCount = errors.filter(e => e.type === 'error').length;
    const warningCount = errors.filter(e => e.type === 'warning').length;
    let statusText = '';
    if (errorCount > 0) statusText += t('validator.error', { count: errorCount });
    if (warningCount > 0) statusText += (statusText ? ', ' : '') + t(warningCount > 1 ? 'validator.warnings' : 'validator.warning', { count: warningCount });
    statusEl.textContent = statusText || t('validator.problems');
    statusEl.classList.add('quest-sandbox__editor-status--error');
    statusEl.classList.remove('quest-sandbox__editor-status--ok');
  }

  // Panel rendern
  const errorItems = errors.map(err => `
    <div class="quest-sandbox__problem-item quest-sandbox__problem-item--${err.type}">
      <span class="quest-sandbox__problem-icon"><i class="ph ph-${err.type === 'error' ? 'x-circle' : 'warning'}"></i></span>
      <span class="quest-sandbox__problem-line">${err.line}</span>
      <span class="quest-sandbox__problem-text">${escapeHtml(err.message)}</span>
    </div>
  `).join('');

  panel.innerHTML = `
    <div class="quest-sandbox__problems-header">
      <i class="ph ph-warning-circle"></i>
      <span>${t(errors.length > 1 ? 'validator.problemsCount' : 'validator.problem', { count: errors.length })}</span>
    </div>
    ${errorItems}
  `;
}

async function runSandbox() {
  const code = document.getElementById('sandbox-code')?.value || '';
  const frame = document.getElementById('sandbox-frame');
  const varPanel = document.getElementById('sandbox-variables');
  if (!frame) return;

  const result = await executeJS(code);

  // Console-Output rendern
  let outputHtml = '';
  if (result.output.length === 0 && result.errors.length === 0) {
    outputHtml = `<div class="sandbox-console-line sandbox-console--empty">${t('sandbox.noOutput')}</div>`;
  } else {
    outputHtml = result.output.map(line => {
      const typeClass = line.startsWith('Error') || line.startsWith('🔧') || line.startsWith('❌') || line.startsWith('⏱️')
        ? 'sandbox-console--error'
        : 'sandbox-console--log';
      return `<div class="sandbox-console-line ${typeClass}">${escapeHtml(line)}</div>`;
    }).join('');
  }

  // Fehler anzeigen
  if (result.errors.length > 0) {
    outputHtml += result.errors.map(err =>
      `<div class="sandbox-console-line sandbox-console--error">${escapeHtml(err)}</div>`
    ).join('');
  }

  // Variablen-Inspektor
  if (varPanel) {
    varPanel.innerHTML = `
      <div class="sandbox-var-header">
        <i class="ph ph-bug"></i> ${t('sandbox.variableInspector')}
      </div>
      ${renderVariablesHTML(result.variables)}
    `;
  }

  frame.innerHTML = `
    <div class="sandbox-console">
      <div class="sandbox-console-header">
        <span class="sandbox-console-title"><i class="ph ph-terminal"></i> Console</span>
        <span class="sandbox-console-status ${result.success ? 'sandbox-console-status--ok' : 'sandbox-console-status--err'}">
          ${result.success ? t('sandbox.statusOk') : t('sandbox.statusError')}
        </span>
      </div>
      <div class="sandbox-console-body">
        ${outputHtml}
      </div>
    </div>
  `;
}

/* ================================================================
   CONFETTI
   ================================================================ */

function fireConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#F1C40F', '#E74C3C', '#27AE60', '#3498DB', '#9B59B6', '#F5B041', '#E67E22'];

  for (let i = 0; i < 150; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 20,
      vy: (Math.random() - 1) * 20 - 5,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.3,
      drag: 0.98,
      life: 1
    });
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach(p => {
      if (p.life <= 0) return;
      alive = true;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.rotation += p.rotationSpeed;
      p.life -= 0.008;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    if (alive && frame < 300) {
      frame++;
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}

/* ================================================================
   REFLECTION — Anti-Cheat
   ================================================================ */

function getReflectionKey() {
  return `quest-reflection-${currentQuest.id}`;
}

function loadReflection() {
  try {
    return localStorage.getItem(getReflectionKey()) || '';
  } catch { return ''; }
}

function saveReflection(text) {
  localStorage.setItem(getReflectionKey(), text);
}

function getReflectionQuestion() {
  return tOr('quest.' + currentQuest.id + '.reflectionQuestion') ||
    t('quest.reflectionQuestionFallback');
}

/* ================================================================
   COMPLETION
   ================================================================ */

function onCompleteQuest(e) {
  const btn = e.target.closest('#btn-complete');
  if (!btn) return;

  // Anti-cheat: Check reflection
  const reflection = document.getElementById('reflection-text');
  if (reflection && reflection.value.trim().length < 20) {
    showToast(t('quest.reflectionRequired'), 'ph-warning');
    reflection.focus();
    reflection.classList.add('is-error');
    setTimeout(() => { reflection.classList.remove('is-error'); }, 3000);
    return;
  }

  btn.disabled = true;
  btn.innerHTML = `<i class="ph ph-spinner ph-spin"></i> ${t('quest.saving')}`;

  const oldProgress = loadProgress();
  const progress = completeQuest(currentQuest.id, currentQuest.xp);

  // XP Animation
  const rect = btn.getBoundingClientRect();
  showXPGain(currentQuest.xp, rect.left + rect.width / 2, rect.top);

  // Confetti
  fireConfetti();

  setTimeout(() => {
    // Show complete section
    const completeMsg = document.getElementById('complete-message');
    if (completeMsg) completeMsg.classList.remove('hidden');

    // Update displays
    updateXPDisplay();
    renderSidebar();
    renderHero();

    // Level up check
    if (progress.level > oldProgress.level) {
      showLevelUp(progress.level);
    }

    // Replace button with next quest
    const nextQuest = currentWorld.quests[
      currentWorld.quests.indexOf(currentQuest) + 1
    ];
    if (nextQuest) {
      const nextTitle = t('quest.' + nextQuest.id + '.title') || nextQuest.title;
      btn.outerHTML = `<a href="?world=${currentWorld.id}&quest=${nextQuest.id}" class="quest-btn quest-btn--primary">${nextTitle} →</a>`;
    } else {
      btn.outerHTML = `<a href="index.html" class="quest-btn quest-btn--primary"><i class="ph ph-house"></i> ${t('quest.backToHub')}</a>`;
    }

    showToast(t('quest.completeToast', { xp: currentQuest.xp }), 'ph-trophy');
  }, 800);
}

/* ================================================================
   MAIN RENDER
   ================================================================ */

function renderQuest() {
  const container = document.getElementById('quest-detail');
  const progress = loadProgress();
  const isDone = isQuestComplete(currentQuest.id);
  const questIndex = currentWorld.quests.indexOf(currentQuest);
  const prevQuest = currentWorld.quests[questIndex - 1];
  const nextQuest = currentWorld.quests[questIndex + 1];

  // Update sidebar & hero
  renderSidebar();
  renderHero();
  applyWorldTheme();

  // Story content (i18n via t())
  const worldTitleTranslated = t('world.' + currentWorld.id + '.title') || currentWorld.title;
  const story = {
    intro: t('world.' + currentWorld.id + '.intro', { world: worldTitleTranslated }),
    context: t('world.' + currentWorld.id + '.context', { world: worldTitleTranslated })
  };

  // Steps as checklist (i18n)
  const fallbackSteps = [
    t('quest.step1'),
    t('quest.step2'),
    t('quest.step3'),
    t('quest.step4'),
    t('quest.step5')
  ];
  const steps = (currentQuest.steps || fallbackSteps).map((s, i) =>
    escapeHtml(tOr('quest.' + currentQuest.id + '.step' + (i + 1)) || s)
  );

  const stepsHtml = steps.map((s, i) => `
    <li class="quest-checklist__item">
      <span class="quest-checklist__checkbox"><i class="ph ph-check"></i></span>
      <span class="quest-checklist__text">${s}</span>
    </li>
  `).join('');

  // Reflection saved text
  const savedReflection = loadReflection();

  // Build optional content blocks
  const whyHtml = currentQuest.why ? `
    <div class="quest-card quest-card--why">
      <div class="quest-card__header">
        <div class="quest-card__icon">
          <i class="ph ph-lightbulb"></i>
        </div>
        <h3 class="quest-card__title">${t('quest.why')}</h3>
      </div>
      <p>${escapeHtml(tOr('quest.' + currentQuest.id + '.why') || currentQuest.why)}</p>
    </div>
  ` : '';

  const mistakesHtml = currentQuest.commonMistakes ? `
    <div class="quest-card quest-card--mistakes">
      <div class="quest-card__header">
        <div class="quest-card__icon">
          <i class="ph ph-warning"></i>
        </div>
        <h3 class="quest-card__title">${t('quest.mistakes')}</h3>
      </div>
      <ul class="quest-mistakes__list">
        ${currentQuest.commonMistakes.map((m, i) => `<li>${escapeHtml(tOr('quest.' + currentQuest.id + '.mistake' + (i + 1)) || m)}</li>`).join('')}
      </ul>
    </div>
  ` : '';

  const proTipHtml = currentQuest.proTip ? `
    <div class="quest-card quest-card--protip">
      <div class="quest-card__header">
        <div class="quest-card__icon">
          <i class="ph ph-lightning"></i>
        </div>
        <h3 class="quest-card__title">${t('quest.proTip')}</h3>
      </div>
      <p class="quest-protip__text">${escapeHtml(tOr('quest.' + currentQuest.id + '.proTip') || currentQuest.proTip)}</p>
    </div>
  ` : '';

  const successHtml = currentQuest.successCriteria ? `
    <div class="quest-success">
      <div class="quest-success__title">
        <i class="ph ph-check-circle"></i> ${t('quest.success')}
      </div>
      <p class="quest-success__text">${escapeHtml(tOr('quest.' + currentQuest.id + '.successCriteria') || currentQuest.successCriteria)}</p>
    </div>
  ` : '';

  container.innerHTML = `
    <!-- Story -->
    <div class="quest-card quest-card--story">
      <div class="quest-card__header">
        <div class="quest-card__icon">
          <i class="ph ph-book-open"></i>
        </div>
        <h3 class="quest-card__title">${t('quest.mission')}</h3>
      </div>
      <p>${story.intro}</p>
      <p><strong>${story.context}</strong></p>
    </div>

    ${whyHtml}

    <!-- Task -->
    <div class="quest-card">
      <div class="quest-card__header">
        <div class="quest-card__icon">
          <i class="ph ph-target"></i>
        </div>
        <h3 class="quest-card__title">${t('quest.task')}</h3>
      </div>
      <p class="u-text-secondary u-leading-relaxed u-mb-4">${escapeHtml(tOr('quest.' + currentQuest.id + '.description') || currentQuest.description)}</p>
      <h4 class="u-text-base u-text-primary u-mb-3">${t('quest.steps')}:</h4>
      <ul class="quest-checklist">
        ${stepsHtml}
      </ul>
      <div class="quest-checklist__progress">
        <div class="quest-checklist__progress-bar">
          <div class="quest-checklist__progress-fill" id="checklist-progress-fill"></div>
        </div>
        <span class="quest-checklist__progress-text" id="checklist-progress-text">0/${steps.length}</span>
      </div>
      ${successHtml}
    </div>

    ${mistakesHtml}

    ${proTipHtml}

    <!-- Sandbox -->
    <div class="quest-sandbox u-mb-6">
      <div class="quest-sandbox__header">
        <div class="quest-sandbox__tabs">
          <button class="quest-sandbox__tab quest-sandbox__tab--active">
            <i class="ph ph-file-js"></i> script.js
          </button>
        </div>
        <div class="quest-sandbox__actions">
          <button class="quest-sandbox__btn" id="sandbox-copy" title="Code kopieren" aria-label="${t('quest.copy')}">
            <i class="ph ph-copy"></i> <span class="quest-sandbox__btn-text">${t('quest.copy')}</span>
          </button>
          <button class="quest-sandbox__btn quest-sandbox__btn--run" id="sandbox-run" aria-label="${t('quest.run')}">
            <i class="ph ph-play"></i> <span class="quest-sandbox__btn-text">${t('quest.run')}</span>
          </button>
        </div>
      </div>
      <div class="quest-sandbox__body">
        <div class="quest-sandbox__editor-wrap">
          <div class="quest-sandbox__editor-header">
            <span class="quest-sandbox__editor-label">${t('quest.editor')}</span>
            <span class="quest-sandbox__editor-status" id="sandbox-status">${t('quest.status.ready')}</span>
          </div>
          <div class="quest-sandbox__editor">
            <div class="quest-sandbox__line-numbers" id="sandbox-line-numbers">1</div>
            <textarea id="sandbox-code" class="quest-sandbox__textarea" placeholder="${t('quest.sandboxPlaceholder')}" spellcheck="false"></textarea>
          </div>
          <div class="quest-sandbox__autosave">
            <span><i class="ph ph-floppy-disk"></i> ${t('quest.autosave')}</span>
            <span class="quest-sandbox__autosave-time" id="sandbox-autosave-time">--:--</span>
          </div>
          <div class="quest-sandbox__problems" id="sandbox-problems"></div>
        </div>
        <div class="quest-sandbox__preview">
          <div class="quest-sandbox__preview-header">
            <span class="quest-sandbox__preview-label">${t('quest.console')}</span>
            <span class="quest-sandbox__preview-url">${t('quest.consoleUrl')}</span>
          </div>
          <div id="sandbox-frame" class="quest-sandbox__preview-frame"></div>
          <div id="sandbox-variables" class="quest-sandbox__variables"></div>
        </div>
      </div>
    </div>

    <!-- Screenshot Reminder -->
    <div class="quest-card quest-screenshot">
      <div class="quest-card__header">
        <div class="quest-card__icon">
          <i class="ph ph-camera"></i>
        </div>
        <h3 class="quest-card__title">${t('quest.screenshot')}</h3>
      </div>
      <p class="u-text-secondary u-leading-relaxed">
        ${t('quest.screenshotDesc')}
      </p>
      <ol class="quest-screenshot__steps">
        <li><span class="quest-screenshot__step-text">${t('quest.screenshotStep1')}</span></li>
        <li><span class="quest-screenshot__step-text">${t('quest.screenshotStep2')}</span></li>
        <li><span class="quest-screenshot__step-text">${t('quest.screenshotStep3')}</span></li>
        <li><span class="quest-screenshot__step-text">${t('quest.screenshotStep4')}</span></li>
        <li><span class="quest-screenshot__step-text">${t('quest.screenshotStep5')}</span></li>
      </ol>
    </div>

    <!-- W3Schools -->
    <div class="quest-card quest-w3schools">
      <div class="quest-card__header">
        <div class="quest-card__icon">
          <i class="ph ph-book-open-text"></i>
        </div>
        <h3 class="quest-card__title">${t('quest.w3schools')}</h3>
      </div>
      <p class="u-text-secondary u-leading-relaxed u-mb-4">
        ${t('quest.w3schoolsDesc')}
      </p>
      <a href="${currentQuest.w3schools}" target="_blank" class="quest-w3schools__btn">
        <i class="ph ph-arrow-square-out"></i> ${t('quest.w3schoolsBtn', { title: tOr('quest.' + currentQuest.id + '.title') || currentQuest.title })}
      </a>
    </div>

    <!-- Reflection (Anti-Cheat) -->
    <div class="quest-card quest-reflection">
      <div class="quest-card__header">
        <div class="quest-card__icon">
          <i class="ph ph-brain"></i>
        </div>
        <h3 class="quest-card__title">${t('quest.reflection')}</h3>
      </div>
      <p class="u-text-secondary u-leading-relaxed u-mb-4">
        ${t('quest.reflectionDesc')}
      </p>
      <div class="quest-reflection__hint">
        <div class="quest-reflection__hint-title">
          <i class="ph ph-question"></i> ${t('quest.yourQuestion')}
        </div>
        <p class="quest-reflection__hint-text">${escapeHtml(getReflectionQuestion())}</p>
      </div>
      <textarea
        id="reflection-text"
        class="quest-reflection__textarea"
        placeholder="${t('quest.reflectionPlaceholder')}"
      >${escapeHtml(savedReflection)}</textarea>
      <p class="u-text-xs u-text-muted u-mt-2">
        <i class="ph ph-info"></i> ${t('quest.reflectionPrivacy')}
      </p>
    </div>

    <!-- Complete Message -->
    <div class="quest-complete ${isDone ? '' : 'hidden'}" id="complete-message">
      <div class="quest-complete__icon"><i class="ph ph-confetti"></i></div>
      <h2 class="quest-complete__title">${t('quest.completeTitle')}</h2>
      <p class="quest-complete__xp">${t('quest.completeXp', { xp: currentQuest.xp })}</p>
    </div>

    <!-- Navigation -->
    <div class="quest-nav">
      ${prevQuest
        ? `<a href="?world=${currentWorld.id}&quest=${prevQuest.id}" class="quest-btn quest-btn--secondary quest-nav__back" aria-label="${tOr('quest.' + prevQuest.id + '.title') || prevQuest.title}"><i class="ph ph-arrow-left"></i> <span class="quest-nav__back-text">${tOr('quest.' + prevQuest.id + '.title') || prevQuest.title}</span></a>`
        : `<a href="index.html" class="quest-btn quest-btn--secondary quest-nav__back" aria-label="${t('quest.toHub')}"><i class="ph ph-arrow-left"></i> <span class="quest-nav__back-text">${t('quest.toHub')}</span></a>`
      }

      ${!isDone
        ? `<button class="quest-btn quest-btn--success" id="btn-complete"><i class="ph ph-check-circle"></i> <span class="quest-nav__btn-label">${t('quest.completeBtn', { xp: currentQuest.xp })}</span></button>`
        : nextQuest
          ? `<a href="?world=${currentWorld.id}&quest=${nextQuest.id}" class="quest-btn quest-btn--primary quest-nav__forward">${tOr('quest.' + nextQuest.id + '.title') || nextQuest.title} <i class="ph ph-arrow-right"></i></a>`
          : `<a href="index.html" class="quest-btn quest-btn--primary quest-nav__forward"><i class="ph ph-house"></i> <span class="quest-nav__back-text">${t('quest.backToHub')}</span></a>`
      }
    </div>
  `;

  // Init interactive elements
  setupSandbox();
  initChecklist();

  // Reflection auto-save
  const reflectionText = document.getElementById('reflection-text');
  if (reflectionText) {
    reflectionText.addEventListener('input', debounce(() => {
      saveReflection(reflectionText.value);
    }, 500));
  }

  // Complete button
  if (!isDone) {
    const completeBtn = document.getElementById('btn-complete');
    if (completeBtn) completeBtn.addEventListener('click', onCompleteQuest);
  }
}

/* ================================================================
   URL LOADING & ERROR HANDLING
   ================================================================ */

function loadQuestFromURL() {
  const params = new URLSearchParams(window.location.search);
  const worldId = params.get('world');
  const questId = params.get('quest');

  currentWorld = worlds.find(w => w.id === worldId);
  if (!currentWorld) {
    showError(t('quest.error.world'));
    return;
  }

  if (!questId) {
    const progress = loadProgress();
    currentQuest = currentWorld.quests.find(q => !progress.completedQuests.includes(q.id))
      || currentWorld.quests[0];
  } else {
    currentQuest = currentWorld.quests.find(q => q.id === questId);
  }

  if (!currentQuest) {
    showError(t('quest.error.quest'));
    return;
  }

  renderQuest();
}

function showError(msg) {
  const container = document.getElementById('quest-detail');
  if (container) {
    container.innerHTML = `
      <div class="u-text-center u-p-16">
        <p class="u-text-4xl u-mb-4 u-text-muted"><i class="ph ph-magnifying-glass"></i></p>
        <p class="u-text-xl u-text-muted u-mb-6">${msg}</p>
        <a href="index.html" class="quest-btn quest-btn--primary">${t('quest.backToHub')}</a>
      </div>
    `;
  }
}

/* ================================================================
   INIT
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initI18n(de, en);
  initTheme();
  updateXPDisplay();
  new ClassroomManager();
  initBackToTop();
  initMobileMenu();
  loadQuestFromURL();

  // Event delegation for quest sidebar links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-quest-link]');
    if (link) {
      e.preventDefault();
      window.location.href = link.dataset.questLink;
    }
  });
});
