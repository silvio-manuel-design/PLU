/**
 * Quest Data — Alle Welten, Quests und Badges
 * JavaScript Modern: 5 Welten, Terminal-Style
 */

export const worlds = [
  {
    id: 'welt-1',
    title: 'Das Terminal',
    description: 'Lerne die Sprache des Computers. Variablen, Datentypen und dein erstes Programm.',
    icon: 'ph-desktop',
    color: '#F1C40F',
    locked: false,
    quests: [
      {
        id: 'q1-1',
        title: 'Hello World',
        description: 'Jedes Abenteuer beginnt mit einem ersten Schritt. In JavaScript ist das der berühmte "Hallo Welt!"-Satz — dein erstes Programm.',
        why: 'Das "Hello World"-Programm ist der Ritterschlag jedes Programmierers. Es beweist: Der Computer versteht dich. Wenn das klappt, kannst du alles andere auch lernen.',
        icon: 'ph-terminal',
        xp: 15,
        duration: '5 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/js/js_output.asp',
        steps: [
          'Öffne VS Code und erstelle eine neue Datei: script.js',
          'Schreibe: console.log("Hallo Welt!");',
          'Speichere und öffne die Datei im Browser (mit einer HTML-Datei, die script.js einbindet)',
          'Öffne die Browser-DevTools (F12) und schaue in die Console — du solltest "Hallo Welt!" sehen',
          'Probiere aus: console.log(2 + 3); — was gibt die Console aus?'
        ],
        commonMistakes: [
          'Die Datei als .txt statt .js speichern — dann erkennt der Browser kein JavaScript',
          'Das script-Tag in HTML vergessen: <script src="script.js"></script> muss vor </body> stehen',
          'console.log ohne Klammern schreiben: console.log ist eine Funktion und braucht ()',
          'Die Anführungszeichen vergessen: "Hallo" ist Text, Hallo ohne Anführungszeichen ist eine Variable'
        ],
        proTip: 'console.log() ist dein bester Freund. Wenn etwas nicht funktioniert, logge die Werte aus — dann siehst du, was der Computer wirklich denkt. Tipp: Probiere auch console.error("Fehler!") und console.warn("Achtung!") aus — die Sandbox zeigt diese in rot und gelb an!',
        successCriteria: 'Du hast eine .js-Datei erstellt, sie in HTML eingebunden und siehst "Hallo Welt!" in der Browser-Console.'
      },
      {
        id: 'q1-2',
        title: 'Die Variablen-Truhe',
        description: 'Variablen sind wie Truhen mit Namensschildern. Du legst etwas hinein und kannst es später über den Namen wiederfinden.',
        why: 'Ohne Variablen kann ein Programm nichts merken. Jedes Spiel speichert den Score in einer Variablen. Jeder Warenkorb speichert die Artikel in Variablen. Variablen sind das Gedächtnis deines Programms.',
        icon: 'ph-archive-box',
        xp: 20,
        duration: '7 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/js/js_variables.asp',
        steps: [
          'Erstelle eine Variable mit let: let name = "Max";',
          'Erstelle eine weitere Variable: let alter = 16;',
          'Gib beide Variablen in der Console aus: console.log(name, alter);',
          'Ändere den Wert: name = "Lisa"; und gib erneut aus',
          'Erstelle eine Konstante: const PI = 3.14159; — versuche, sie zu ändern. Was passiert?'
        ],
        commonMistakes: [
          'Variable ohne let/const/var deklarieren: name = "Max" funktioniert, ist aber schlechter Stil und kann Fehler verursachen',
          'Anführungszeichen bei Zahlen verwenden: let alter = "16"; ist Text, nicht Zahl',
          'const und dann doch ändern wollen: const bedeutet konstant — der Wert darf nicht verändert werden',
          'Variablennamen mit Zahl beginnen: let 1name ist ungültig. Namen müssen mit Buchstaben oder _ beginnen'
        ],
        proTip: 'Verwende const als Standard, let nur wenn du den Wert wirklich ändern musst. Das verhindert unbeabsichtigte Änderungen und macht deinen Code robuster.',
        successCriteria: 'Du hast Variablen mit let und const erstellt, Werte ausgegeben und verstanden, wann man welches Schlüsselwort verwendet.'
      },
      {
        id: 'q1-3',
        title: 'Die Datentypen-Detektei',
        description: 'JavaScript unterscheidet zwischen verschiedenen Datentypen: Text, Zahlen, Wahrheitswerte und mehr. Wie ein Detektiv musst du herausfinden, welcher Typ vorliegt.',
        why: 'Ein Computer behandelt "5" (Text) anders als 5 (Zahl). Wenn du das nicht verstehst, passieren seltsame Dinge: "5" + "5" = "55", aber 5 + 5 = 10. Datentypen sind das Fundament für alle Berechnungen.',
        icon: 'ph-fingerprint',
        xp: 20,
        duration: '7 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/js/js_datatypes.asp',
        steps: [
          'Erstelle Variablen verschiedener Typen: let text = "Hallo"; let zahl = 42; let wahr = true; let liste = [1, 2, 3];',
          'Verwende typeof, um den Typ zu prüfen: console.log(typeof text);',
          'Prüfe den Typ aller Variablen mit typeof — notiere die Ergebnisse',
          'Experimentiere: Was ist typeof von null? Und typeof von einem Array?',
          'Erstelle ein Objekt: let person = { name: "Anna", alter: 17 }; und prüfe seinen Typ'
        ],
        commonMistakes: [
          'typeof null ergibt "object" — ein bekannter Bug in JavaScript, den man einfach auswendig lernen muss',
          'typeof [1,2,3] ergibt "object" — Arrays sind technisch Objekte. Für Arrays verwendet man Array.isArray()',
          'Text und Zahl verwechseln: "5" + 3 ergibt "53" (String-Konkatenation), nicht 8',
          'true und "true" verwechseln: true ist ein Boolean, "true" ist ein String'
        ],
        proTip: 'Wenn Berechnungen komische Ergebnisse liefern, prüfe mit typeof, ob deine Variablen wirklich Zahlen sind. Oft sind sie aus Versehen Strings.',
        successCriteria: 'Du kannst mit typeof den Datentyp jeder Variable bestimmen und kennst die Unterschiede zwischen String, Number, Boolean, Array und Object.'
      },
      {
        id: 'q1-4',
        title: 'Template Literals & String-Magie',
        description: 'Strings sind nicht nur Text — man kann sie formatieren, zusammenfügen und dynamisch gestalten. Template Literals machen das kinderleicht.',
        why: 'In der Praxis musst du oft Text und Variablen kombinieren: "Hallo Max, du bist 16 Jahre alt." Ohne Template Literals ist das umständlich und fehleranfällig. Mit Backticks wird es elegant.',
        icon: 'ph-quotes',
        xp: 20,
        duration: '7 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/js/js_string_templates.asp',
        steps: [
          'Erstelle Variablen: let vorname = "Lisa"; let nachname = "Müller"; let alter = 17;',
          'Verwende den alten Weg: let satz = "Hallo " + vorname + " " + nachname + "!";',
          'Verwende Template Literals (Backticks): let satz2 = `Hallo ${vorname} ${nachname}!`;',
          'Erstelle einen mehrzeiligen Text mit Template Literals — beachte: Backticks erlauben Zeilenumbrüche!',
          'Berechne im Template: console.log(`Nächstes Jahr bist du ${alter + 1} Jahre alt.`);'
        ],
        commonMistakes: [
          'Backticks (`) mit einfachen Anführungszeichen (\') verwechseln — sie sehen ähnlich aus, sind aber verschiedene Zeichen',
          '${variable} ohne Backticks verwenden — die ${}-Syntax funktioniert nur in Template Literals',
          'Plus-Operator bei gemischten Typen: "Das Ergebnis ist " + 5 + 5 ergibt "Das Ergebnis ist 55"',
          'Vergessen, dass Template Literals Zeilenumbrüche enthalten können — das ist ein Feature, kein Bug'
        ],
        proTip: 'Gewöhne dir an, immer Backticks zu verwenden — auch wenn du keine ${}-Variablen brauchst. So bist du konsistent und hast Zeilenumbrüche gratis dabei.',
        successCriteria: 'Du kannst Text und Variablen mit Template Literals kombinieren und verstehst den Unterschied zu String-Konkatenation mit +.'
      }
    ]
  },
  {
    id: 'welt-2',
    title: 'Die Schleifen-Matrix',
    description: 'Wiederhole Aufgaben automatisch. Schleifen und Arrays sind die Superkräfte jedes Programmierers.',
    icon: 'ph-arrows-clockwise',
    color: '#E67E22',
    locked: true,
    quests: [
      {
        id: 'q2-1',
        title: 'Die Operatoren-Werkstatt',
        description: 'Operatoren sind die Werkzeuge der Programmierung: Rechnen, Vergleichen, Logik verknüpfen. Ohne sie steht alles still.',
        why: 'Operatoren sind das Taschenmesser des Programmierers. Du brauchst sie für Berechnungen (Preis * Menge), Vergleiche (Ist der User admin?) und Logik (Ist das Passwort korrekt UND der Account aktiv?).',
        icon: 'ph-gear',
        xp: 20,
        duration: '7 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/js/js_operators.asp',
        steps: [
          'Rechne mit +, -, *, /, %: console.log(17 % 5); — was ergibt das?',
          'Vergleiche mit === und !==: console.log(5 === "5"); und console.log(5 == "5"); — notiere den Unterschied!',
          'Verwende && (UND) und || (ODER): let istAdmin = true; let istAktiv = false; console.log(istAdmin && istAktiv);',
          'Experimentiere mit dem ternären Operator: let alter = 16; let status = alter >= 18 ? "Erwachsen" : "Minderjährig";',
          'Erstelle eine BMI-Berechnung: bmi = gewicht / (groesse * groesse) und gib das Ergebnis aus'
        ],
        commonMistakes: [
          '== statt === verwenden: == vergleicht nach Typ-Konvertierung (5 == "5" ist true), === vergleicht strikt (5 === "5" ist false)',
          'Zuweisung (=) statt Vergleich (===) in if-Bedingungen: if (x = 5) weist x den Wert 5 zu und ist immer true',
          'Division durch Null: 10 / 0 ergibt Infinity in JavaScript, keinen Fehler',
          'Modulo-Operator missverstehen: 17 % 5 = 2 (Rest bei Division), nicht 3.4'
        ],
        proTip: 'Verwende IMMER === statt ==. Das verhindert 90% aller versteckter Type-Coercion-Bugs. Es ist einer der wichtigsten Gewohnheiten in JavaScript.',
        successCriteria: 'Du kannst arithmetische, Vergleichs- und logische Operatoren verwenden und verstehst den Unterschied zwischen == und ===.'
      },
      {
        id: 'q2-2',
        title: 'Die Bedingungen-Festung',
        description: 'Programme müssen Entscheidungen treffen. if, else if und else sind die Tore, die den Codefluss steuern.',
        why: 'Ohne Bedingungen wären Programme dumm. Ein Login-Formular muss prüfen: Ist das Passwort richtig? Ein Spiel muss prüfen: Ist der Spieler tot? Bedingungen sind das Gehirn deines Programms.',
        icon: 'ph-signpost',
        xp: 25,
        duration: '10 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/js/js_if_else.asp',
        steps: [
          'Erstelle eine if-Bedingung: let alter = 16; if (alter >= 18) { console.log("Volljährig"); } else { console.log("Minderjährig"); }',
          'Erweitere mit else if: if (alter < 13) { ... } else if (alter < 18) { ... } else { ... }',
          'Erstelle ein Noten-Prüfsystem: if (note === 1) { "Sehr gut" } else if (note === 2) { "Gut" } ...',
          'Verwende einen switch-Block für Wochentage: switch (tag) { case "Mo": ... }',
          'Kombiniere Bedingungen: if (alter >= 16 && hatFuehrerschein) { console.log("Darf Mofa fahren"); }'
        ],
        commonMistakes: [
          'Vergessen, dass if-Bedingungen nur den ersten zutreffenden Block ausführen — else if ist wichtig für mehrere Fälle',
          'switch ohne break: Ohne break werden alle folgenden cases auch ausgeführt ("fall-through")',
          'Vergleichsoperator in switch: switch vergleicht mit ===, nicht mit ==',
          'Verschachtelte if-else zu tief: Mehr als 3 Ebenen verschachtelung machen Code unlesbar — lieber früh returnen'
        ],
        proTip: 'Bei mehr als 3 else-if-Fällen überlege, ob ein switch oder ein Objekt-Lookup besser ist. Oft ist ein Objekt eleganter: const notenText = { 1: "Sehr gut", 2: "Gut", ... };',
        successCriteria: 'Du kannst if/else if/else und switch verwenden, um Programme zu steuern, und kennst den Unterschied zwischen den beiden.'
      },
      {
        id: 'q2-3',
        title: 'Die Schleifen-Maschine',
        description: 'Schleifen wiederholen Code automatisch. Statt 100-mal copy-paste zu machen, sagst du dem Computer: "Mach das 100-mal für mich."',
        why: 'Schleifen sind die Superkraft der Programmierung. Ein Musik-Player durchläuft alle Songs in einer Schleife. Ein Online-Shop berechnet den Gesamtpreis in einer Schleife. Ohne Schleifen wäre Programmierung unendlich viel Tipperei.',
        icon: 'ph-repeat',
        xp: 25,
        duration: '10 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/js/js_loop_for.asp',
        steps: [
          'Schreibe eine for-Schleife: for (let i = 0; i < 5; i++) { console.log(i); }',
          'Zähle rückwärts: for (let i = 10; i >= 1; i--) { console.log(i); }',
          'Verwende while: let i = 0; while (i < 5) { console.log(i); i++; } — was ist der Unterschied zu for?',
          'Erstelle eine Multiplikationstabelle: for (let i = 1; i <= 10; i++) { console.log(`5 x ${i} = ${5 * i}`); }',
          'Experimentiere mit break und continue: Breche die Schleife bei i === 7 ab'
        ],
        commonMistakes: [
          'Endlosschleife vergessen: while (i < 5) { console.log(i); } — i wird nie erhöht, Browser hängt sich auf',
          'Off-by-one-Fehler: for (let i = 0; i <= 5; i++) gibt 6 Werte aus (0–5), nicht 5',
          'const in for-Schleife: for (const i = 0; ...) funktioniert nicht, weil const nicht verändert werden kann',
          'Vergleichsrichtung falsch: for (let i = 0; i > 10; i++) läuft nie — die Bedingung ist von Anfang an false'
        ],
        proTip: 'Wenn du jemals nicht weißt, ob eine Schleife korrekt läuft, logge den Zähler in jedem Durchlauf. Das offenbart sofort Off-by-one-Fehler und Endlosschleifen.',
        successCriteria: 'Du kannst for- und while-Schleifen schreiben, verstehst den Unterschied und kannst break/continue einsetzen.'
      },
      {
        id: 'q2-4',
        title: 'Das Array-Inventar',
        description: 'Arrays sind Listen von Werten. Statt 100 Variablen zu erstellen, packst du alles in eine einzige, nummerierte Liste.',
        why: 'Ein Warenkorb ist ein Array. Eine Playlist ist ein Array. Ein Highscore ist ein Array. Jedes Mal, wenn ein Programm mehrere gleichartige Dinge speichern muss, verwendet es ein Array. Arrays sind das meistgenutzte Datenwerkzeug in JavaScript.',
        icon: 'ph-list-numbers',
        xp: 25,
        duration: '10 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/js/js_arrays.asp',
        steps: [
          'Erstelle ein Array: let fruechte = ["Apfel", "Banane", "Kirsche"];',
          'Greife auf Elemente zu: console.log(fruechte[0]); — was gibt das aus?',
          'Füge Elemente hinzu: fruechte.push("Dattel"); und prüfe die neue Länge mit fruechte.length',
          'Iteriere mit for: for (let i = 0; i < fruechte.length; i++) { console.log(fruechte[i]); }',
          'Verwende for...of: for (let frucht of fruechte) { console.log(frucht); } — eleganter!'
        ],
        commonMistakes: [
          'Index 1 statt 0: Das erste Element ist fruechte[0], nicht fruechte[1]',
          'push() ohne Klammern: fruechte.push "Dattel" funktioniert nicht — push ist eine Methode und braucht ()',
          'Vergessen, dass Arrays veränderbar sind: fruechte[0] = "Birne" ändert das Original-Array',
          'length als Methode verwenden: fruechte.length() ist falsch — length ist eine Eigenschaft, keine Methode'
        ],
        proTip: 'for...of ist die modernste und lesbarste Art, Arrays zu durchlaufen. Verwende es immer, wenn du den Index nicht brauchst.',
        successCriteria: 'Du kannst Arrays erstellen, Elemente hinzufügen, auf sie zugreifen und mit for sowie for...of durchlaufen.'
      }
    ]
  },
  {
    id: 'welt-3',
    title: 'Die Funktionen-Fabrik',
    description: 'Baue wiederverwendbare Code-Bausteine. Funktionen sind die Fabriken, die aus Rohstoffen Produkte machen.',
    icon: 'ph-factory',
    color: '#27AE60',
    locked: true,
    quests: [
      {
        id: 'q3-1',
        title: 'Die Funktionen-Schmiede',
        description: 'Funktionen sind wie Rezepte: Einmal aufschreiben, beliebig oft verwenden. Sie machen Code wiederverwendbar und übersichtlich.',
        why: 'Ohne Funktionen würdest du denselben Code immer und immer wieder schreiben. Ein Login-Button, ein Preis-Rechner, ein Formular-Validator — alles sind Funktionen, die an verschiedenen Stellen wiederverwendet werden.',
        icon: 'ph-function',
        xp: 25,
        duration: '10 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/js/js_functions.asp',
        steps: [
          'Erstelle eine Funktion: function begruessung(name) { return `Hallo ${name}!`; }',
          'Rufe die Funktion auf: console.log(begruessung("Max"));',
          'Erstelle eine Funktion mit mehreren Parametern: function summe(a, b) { return a + b; }',
          'Erstelle eine Funktion ohne Parameter: function zeigeDatum() { console.log(new Date().toLocaleDateString()); }',
          'Verwende eine Funktion in einer Schleife: for (let i = 1; i <= 3; i++) { console.log(begruessung(`Gast ${i}`)); }'
        ],
        commonMistakes: [
          'Funktion deklarieren, aber nicht aufrufen: function test() { ... } allein macht nichts — test() muss folgen',
          'return vergessen: Eine Funktion ohne return gibt undefined zurück',
          'Parameter-Reihenfolge vertauschen: function teile(a, b) { return a / b; } — teile(10, 2) ist 5, teile(2, 10) ist 0.2',
          'Funktionsnamen mit Zahl beginnen: function 1test() ist ungültig'
        ],
        proTip: 'Eine gute Funktion macht genau eine Sache und macht sie gut. Wenn deine Funktion mehr als 10 Zeilen hat, überlege, ob du sie in kleinere Funktionen aufteilen kannst.',
        successCriteria: 'Du kannst Funktionen mit und ohne Parameter erstellen, return verwenden und Funktionen aus anderen Teilen deines Codes aufrufen.'
      },
      {
        id: 'q3-2',
        title: 'Arrow Functions & Callbacks',
        description: 'Arrow Functions sind die moderne, kompakte Art, Funktionen zu schreiben. Callbacks sind Funktionen, die anderen Funktionen als Parameter übergeben werden.',
        why: 'Arrow Functions sind kürzer, lesbarer und haben kein eigenes this — das verhindert viele Bugs. Callbacks sind das Herz von JavaScript: Array-Methoden wie .map(), .filter() und Event-Listener funktionieren alle mit Callbacks.',
        icon: 'ph-arrow-right',
        xp: 25,
        duration: '10 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/js/js_arrow_function.asp',
        steps: [
          'Schreibe eine normale Funktion um: const quadrat = function(x) { return x * x; };',
          'Verwende Arrow Syntax: const quadrat = (x) => x * x; — beachte: return ist implizit!',
          'Verwende .map() mit Arrow: let zahlen = [1, 2, 3]; let quadrate = zahlen.map(x => x * x);',
          'Verwende .filter(): let gerade = zahlen.filter(x => x % 2 === 0);',
          'Erstelle einen Callback: function verarbeite(array, callback) { return array.map(callback); }'
        ],
        commonMistakes: [
          'Geschweifte Klammern bei Arrow Functions vergessen: (x) => x * x gibt x*x zurück, aber (x) => { x * x } gibt undefined zurück (kein return)',
          'this bei Arrow Functions missverstehen: Arrow Functions erben this vom umgebenden Kontext — das ist oft gewollt, aber manchmal verwirrend',
          'Callback als String übergeben: setTimeout("meineFunktion()", 1000) ist falsch — es muss eine Funktion sein: setTimeout(meineFunktion, 1000)',
          'Parentheses bei einem Parameter weglassen: x => x * 2 ist okay, aber (x, y) => x + y braucht Klammern'
        ],
        proTip: 'Verwende Arrow Functions für Callbacks und kurze Funktionen. Bei komplexeren Funktionen mit mehreren Zeilen ist die klassische function-Schreibweise oft lesbarer.',
        successCriteria: 'Du kannst Arrow Functions schreiben, .map() und .filter() mit Callbacks verwenden und verstehst den Unterschied zu klassischen Funktionen.'
      },
      {
        id: 'q3-3',
        title: 'Scope & Closure',
        description: 'Scope bestimmt, wo Variablen sichtbar sind. Closures sind Funktionen, die sich ihr Umfeld "merken" — eine der mächtigsten JavaScript-Fähigkeiten.',
        why: 'Scope verhindert, dass Variablen aus verschiedenen Teilen deines Codes sich gegenseitig überschreiben. Closures ermöglichen private Variablen und sind die Basis für Module, Event-Handler und asynchronen Code.',
        icon: 'ph-lock-key',
        xp: 30,
        duration: '12 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/js/js_scope.asp',
        steps: [
          'Teste globalen Scope: let global = "ich bin überall"; function test() { console.log(global); }',
          'Teste lokalen Scope: function test2() { let lokal = "ich bin lokal"; } console.log(lokal); — was passiert?',
          'Erstelle ein Closure: function zaehler() { let count = 0; return () => ++count; }',
          'Verwende das Closure: const meinZaehler = zaehler(); console.log(meinZaehler()); console.log(meinZaehler());',
          'Erstelle einen Multiplikator: function multiplikator(faktor) { return x => x * faktor; }'
        ],
        commonMistakes: [
          'Variablen ohne let/const/var deklarieren — dann sind sie automatisch global, auch in einer Funktion',
          'Hoisting missverstehen: var-Deklarationen werden nach oben "gehoben", aber der Wert nicht. let/const auch gehoben, aber im "Temporal Dead Zone"',
          'Closure und Schleifen: for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 100); } gibt dreimal 3 aus — var ist funktions-scoped',
          'Block-Scope mit var: if (true) { var x = 5; } console.log(x); — var ignoriert Blöcke, let/const nicht'
        ],
        proTip: 'Verwende immer let oder const — niemals var. var hat funktions-scopes und Hoisting-Verhalten, das zu subtilen Bugs führt.',
        successCriteria: 'Du verstehst den Unterschied zwischen globalem und lokalem Scope, kannst Closures erstellen und weißt, warum var problematisch ist.'
      },
      {
        id: 'q3-4',
        title: 'Die Objekte-Datenbank',
        description: 'Objekte speichern zusammengehörige Daten in einem einzigen Container. Statt 10 einzelner Variablen hast du eine strukturierte Einheit.',
        why: 'Ein User-Profil ist ein Objekt (Name, Alter, E-Mail). Ein Produkt ist ein Objekt (Titel, Preis, Bild). Objekte sind die Grundlage für alle komplexen Datenstrukturen in JavaScript — ohne sie kein React, kein Vue, keine APIs.',
        icon: 'ph-database',
        xp: 25,
        duration: '10 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/js/js_objects.asp',
        steps: [
          'Erstelle ein Objekt: let student = { name: "Lisa", alter: 17, klasse: "3AHM" };',
          'Greife auf Eigenschaften zu: console.log(student.name); und console.log(student["alter"]);',
          'Füge Eigenschaften hinzu: student.email = "lisa@schule.at";',
          'Erstelle ein Array von Objekten: let klasse = [{ name: "Max" }, { name: "Anna" }];',
          'Iteriere mit forEach: klasse.forEach(s => console.log(s.name));'
        ],
        commonMistakes: [
          'Punkt-Notation bei variablen Schlüsseln: let key = "name"; student.key sucht nach einer Eigenschaft "key", nicht "name". Richtig: student[key]',
          'Objekt kopieren mit = : let kopie = student; — das ist keine Kopie, sondern eine Referenz. Änderungen an kopie ändern auch student',
          'Vergessen, dass typeof null "object" ergibt — für null-Prüfung verwende === null',
          'Objekt-Schlüssel mit Leerzeichen: let obj = { "vor name": "Max" }; — möglich, aber unüblich'
        ],
        proTip: 'Für Objekt-Kopien verwende den Spread-Operator: let kopie = { ...student }; — das erstellt eine echte flache Kopie. Bei verschachtelten Objekten brauchst du structuredClone().',
        successCriteria: 'Du kannst Objekte erstellen, auf Eigenschaften zugreifen, Arrays von Objekten durchlaufen und verstehst den Unterschied zwischen Referenz und Kopie.'
      }
    ]
  },
  {
    id: 'welt-4',
    title: 'Das DOM-Netz',
    description: 'Bringe tote Webseiten zum Leben. DOM-Manipulation und Events sind die Brücke zwischen JavaScript und der sichtbaren Welt.',
    icon: 'ph-globe',
    color: '#2980B9',
    locked: true,
    quests: [
      {
        id: 'q4-1',
        title: 'DOM-Selektoren',
        description: 'Das DOM ist die Brücke zwischen JavaScript und HTML. Mit Selektoren greifst du auf jedes Element der Seite zu — und kannst es verändern.',
        why: 'Jeder Button-Klick, jede Animation, jedes Formular-Feedback basiert auf DOM-Manipulation. Ohne das DOM wäre JavaScript eine Sprache, die nur in der Console existiert — isoliert von der Welt.',
        icon: 'ph-cursor-click',
        xp: 25,
        duration: '10 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/js/js_htmldom.asp',
        steps: [
          'Erstelle eine HTML-Datei mit: <h1 id="titel">Hallo</h1> und <p class="text">Welt</p>',
          'Selektiere mit getElementById: let titel = document.getElementById("titel");',
          'Selektiere mit querySelector: let text = document.querySelector(".text");',
          'Ändere den Text: titel.textContent = "Willkommen!";',
          'Selektiere alle Elemente: let alleP = document.querySelectorAll("p"); und gib die Anzahl aus'
        ],
        commonMistakes: [
          'getElementById mit # verwenden: document.getElementById("#titel") ist falsch — das # gehört zu querySelector',
          'querySelectorAll gibt eine NodeList zurück, kein Array: alleP.map() funktioniert nicht — verwende Array.from(alleP) oder forEach',
          'innerHTML statt textContent verwenden: innerHTML parst HTML und ist anfällig für XSS. Für reinen Text immer textContent verwenden',
          'DOM-Zugriff vor DOM-Ready: Wenn dein Script im <head> steht, existiert das Element noch nicht. Lösung: Script vor </body> oder DOMContentLoaded-Event'
        ],
        proTip: 'Verwende querySelector/querySelectorAll als Standard — sie akzeptieren CSS-Selektoren und sind viel flexibler als getElementById oder getElementsByClassName.',
        successCriteria: 'Du kannst Elemente mit querySelector und getElementById auswählen, deren Text ändern und verstehst den Unterschied zwischen NodeList und Array.'
      },
      {
        id: 'q4-2',
        title: 'Event-Listener',
        description: 'Events sind die Nervenenden deiner Webseite. Sie reagieren auf Klicks, Tastendrücke, Mausbewegungen und mehr.',
        why: 'Jede Interaktion auf einer Webseite ist ein Event: Ein Klick auf "Kaufen", ein Scrollen, eine Tasteneingabe. Ohne Events wäre jede Seite statisch und tot. Events sind das, was JavaScript zur interaktivsten Webtechnologie macht.',
        icon: 'ph-lightning',
        xp: 25,
        duration: '10 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/js/js_htmldom_eventlistener.asp',
        steps: [
          'Erstelle einen Button: <button id="btn">Klick mich!</button>',
          'Füge einen Event-Listener hinzu: document.getElementById("btn").addEventListener("click", () => { console.log("Geklickt!"); });',
          'Erstelle einen Zähler: let count = 0; btn.addEventListener("click", () => { count++; titel.textContent = `Klicks: ${count}`; });',
          'Füge ein Input-Event hinzu: document.getElementById("input").addEventListener("input", (e) => { console.log(e.target.value); });',
          'Verwende event.preventDefault(): Formular-Submit verhindern und stattdessen eigenen Code ausführen'
        ],
        commonMistakes: [
          'onclick statt addEventListener verwenden: element.onclick = ... überschreibt vorherige Handler. addEventListener erlaubt mehrere Handler',
          'Event-Listener mehrfach hinzufügen: Wenn du addEventListener in einer Schleife aufrufst, ohne vorher zu entfernen, werden Events mehrfach ausgelöst',
          'this in Arrow Functions: Arrow Functions haben kein eigenes this — in einem Event-Handler verweist this dann nicht auf das Element',
          'Vergessen, Events zu entfernen: Bei dynamischen Inhalten (z.B. SPAs) bleiben alte Event-Listener im Speicher und verursachen Memory Leaks'
        ],
        proTip: 'Verwende immer addEventListener statt onclick. Es ist moderner, flexibler und verhindert, dass du versehentlich bestehende Handler überschreibst.',
        successCriteria: 'Du kannst click- und input-Events abfangen, mit Event-Objekten arbeiten und verstehst den Unterschied zwischen onclick und addEventListener.'
      },
      {
        id: 'q4-3',
        title: 'DOM erstellen & stylen',
        description: 'Statt bestehende Elemente zu verändern, kannst du neue Elemente aus dem Nichts erschaffen — und der Seite hinzufügen.',
        why: 'Jede Chat-Nachricht, jede Benachrichtigung, jedes Modal wird dynamisch erstellt. Ohne createElement wären alle Web-Apps statisch. Dies ist die Grundlage für React, Vue und alle modernen Frameworks.',
        icon: 'ph-plus-circle',
        xp: 30,
        duration: '12 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/js/js_htmldom_nodes.asp',
        steps: [
          'Erstelle ein neues Element: let div = document.createElement("div");',
          'Füge Text hinzu: div.textContent = "Neues Element";',
          'Füge Klassen hinzu: div.classList.add("meine-klasse");',
          'Füge das Element zur Seite hinzu: document.body.appendChild(div);',
          'Erstelle eine Liste dynamisch: let ul = document.createElement("ul"); items.forEach(item => { let li = document.createElement("li"); li.textContent = item; ul.appendChild(li); }); document.body.appendChild(ul);'
        ],
        commonMistakes: [
          'appendChild mit String: document.body.appendChild("Text") funktioniert nicht — nur Elemente, keine Strings',
          'innerHTML für dynamische Inhalte: innerHTML ist bequem, aber langsam und XSS-anfällig. Für einfache Texte verwende textContent und createElement',
          'Vergessen, das Element anzuhängen: createElement erstellt es nur im Speicher. Ohne appendChild erscheint es nie auf der Seite',
          'Mehrfach appendChild: Ein Element kann nur an einer Stelle im DOM sein. Zweites appendChild verschiebt es, dupliziert es nicht'
        ],
        proTip: 'Für komplexe dynamische Inhalte verwende DocumentFragment: let frag = document.createDocumentFragment(); — füge alle Elemente zum Fragment hinzu und hänge dann das Fragment an. Das ist viel schneller als einzelne appendChild-Aufrufe.',
        successCriteria: 'Du kannst Elemente dynamisch erstellen, Klassen hinzufügen, sie stylen und in den DOM einfügen.'
      },
      {
        id: 'q4-4',
        title: 'Das Formular-Imperium',
        description: 'Formulare sind die Brücke zwischen User und Server. Mit JavaScript kannst du Formulare validieren, formatieren und interaktiv machen.',
        why: 'Jeder Login, jede Registrierung, jeder Warenkorb basiert auf Formularen. Client-seitige Validierung spart Server-Ressourcen und gibt sofortiges Feedback. Formulare sind der häufigste Grund für DOM-Manipulation in der Praxis.',
        icon: 'ph-form',
        xp: 30,
        duration: '12 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/js/js_validation.asp',
        steps: [
          'Erstelle ein Formular mit Name, E-Mail und Nachricht',
          'Fange das submit-Event ab: form.addEventListener("submit", (e) => { e.preventDefault(); ... });',
          'Validiere die Eingaben: if (email.value.includes("@")) { ... } else { zeigeFehler("Ungültige E-Mail"); }',
          'Zeige Fehlermeldungen dynamisch an: erstelle ein <span> mit classList.add("fehler")',
          'Formular nach erfolgreicher Validierung leeren: form.reset(); und zeige Erfolgsmeldung'
        ],
        commonMistakes: [
          'submit ohne preventDefault: Das Formular lädt die Seite neu und alle JavaScript-Daten gehen verloren',
          'value statt textContent bei Inputs: input.textContent funktioniert nicht — Inputs haben value, nicht textContent',
          'Fehlermeldungen nicht entfernen: Wenn der User korrigiert, bleibt die alte Fehlermeldung stehen — immer vor neuer Validierung alles zurücksetzen',
          'Validierung nur auf dem Client: Client-Validierung ist für UX, nicht für Sicherheit. Server-Validierung ist immer Pflicht'
        ],
        proTip: 'Verwende die HTML5-Validierung (required, type="email", minlength) als erste Verteidigungslinie und JavaScript für komplexe Prüfungen. Das ist die beste User Experience.',
        successCriteria: 'Du kannst Formulare validieren, Fehlermeldungen dynamisch anzeigen und das Absenden verhindern, wenn Eingaben ungültig sind.'
      }
    ]
  },
  {
    id: 'welt-5',
    title: 'Die Boss-Dimension',
    description: 'Die finale Herausforderung. Baue drei echte Projekte und beweise, dass du JavaScript beherrschst.',
    icon: 'ph-crown',
    color: '#8E44AD',
    locked: true,
    quests: [
      {
        id: 'q5-1',
        title: 'Die Todo-Liste',
        description: 'BOSS-QUEST: Baue eine voll funktionsfähige Todo-Liste mit Hinzufügen, Löschen und Abhaken — das klassische Einsteigerprojekt.',
        why: 'Die Todo-Liste ist das "Hello World" der fortgeschrittenen JavaScript-Entwicklung. Sie verbindet DOM-Manipulation, Events, Arrays und lokale Speicherung. Wenn du das kannst, beherrschst du die Grundlagen.',
        icon: 'ph-check-square',
        xp: 50,
        duration: '20 Min.',
        type: 'project',
        w3schools: 'https://www.w3schools.com/js/js_htmldom.asp',
        steps: [
          'Erstelle HTML: Input-Feld, Button "Hinzufügen" und eine leere <ul> für die Einträge',
          'Fange den Button-Klick ab und erstelle ein <li> mit dem Input-Wert',
          'Füge einen "Löschen"-Button zu jedem <li> hinzu',
          'Füge eine Checkbox hinzu: Bei Klick wird das <li> durchgestrichen (classList.toggle("erledigt"))',
          'Speichere die Todos in localStorage und lade sie beim Seitenstart'
        ],
        commonMistakes: [
          'Event-Listener auf dynamisch erstellte Elemente: deleteBtn.addEventListener funktioniert nur für existierende Elemente — für neue verwende Event Delegation (Listener auf <ul>)',
          'localStorage speichert nur Strings: JSON.stringify() beim Speichern und JSON.parse() beim Laden nicht vergessen',
          'XSS durch innerHTML: Nie innerHTML mit User-Input verwenden — immer textContent oder createElement',
          'Vergessen, das Input-Feld zu leeren: Nach dem Hinzufügen input.value = "" setzen'
        ],
        proTip: 'Verwende Event Delegation für die Löschen-Buttons: Füge EINEN Event-Listener auf die <ul> hinzu und prüfe e.target. Das ist effizienter und funktioniert auch für zukünftige Elemente.',
        successCriteria: 'Du hast eine Todo-Liste mit Hinzufügen, Löschen, Abhaken und localStorage-Persistenz gebaut.'
      },
      {
        id: 'q5-2',
        title: 'Das Quiz-Imperium',
        description: 'BOSS-QUEST: Baue ein interaktives Quiz mit Fragen, Antwortmöglichkeiten, Punktestand und Ergebnisanzeige.',
        why: 'Ein Quiz verbindet Arrays, Objekte, DOM-Manipulation und Logik. Du musst Daten strukturieren, dynamisch rendern und User-Interaktionen verarbeiten — alles in einem Projekt.',
        icon: 'ph-question',
        xp: 50,
        duration: '20 Min.',
        type: 'project',
        w3schools: 'https://www.w3schools.com/js/js_objects.asp',
        steps: [
          'Erstelle ein Array von Frage-Objekten: { frage: "...", antworten: ["A", "B", "C"], korrekt: 1 }',
          'Zeige die erste Frage und Antwortmöglichkeiten dynamisch an',
          'Fange Klicks auf Antworten ab, prüfe ob richtig und aktualisiere den Punktestand',
          'Zeige die nächste Frage an oder das Endergebnis',
          'Füge einen "Neustart"-Button hinzu, der das Quiz zurücksetzt'
        ],
        commonMistakes: [
          'Frage-Index nicht aktualisieren: Vergiss nicht, nach jeder Antwort den Index zu erhöhen, sonst bleibst du bei Frage 1 hängen',
          'Event-Listener mehrfach hinzufügen: Bei jedem rendern der Frage neue Listener hinzufügen führt zu mehrfachen Klicks — vorher entfernen oder Delegation verwenden',
          'Punktestand global halten: let punkte muss außerhalb der Funktion deklariert werden, sonst wird er bei jedem Aufruf zurückgesetzt',
          'Antworten nicht shuffeln: Immer dieselbe Reihenfolge ist langweilig — Optional: Antworten zufällig sortieren'
        ],
        proTip: 'Trenne Daten (Fragen-Array), Logik (Prüfung, Punktestand) und Darstellung (DOM-Updates) in separate Funktionen. Das macht den Code wartbar und testbar.',
        successCriteria: 'Du hast ein Quiz mit mindestens 5 Fragen, Punktestand, Ergebnisanzeige und Neustart-Funktion gebaut.'
      },
      {
        id: 'q5-3',
        title: 'Die Noten-Verwaltung',
        description: 'BOSS-QUEST: Baue eine Notenverwaltung mit Schülerliste, Noteneingabe, Durchschnittsberechnung und Bestehensprüfung.',
        why: 'Die Notenverwaltung verbindet alles: Arrays von Objekten, Berechnungen, DOM-Manipulation und Formular-Validierung. Es ist das komplexeste Projekt und beweist, dass du JavaScript wirklich beherrschst.',
        icon: 'ph-graduation-cap',
        xp: 60,
        duration: '25 Min.',
        type: 'project',
        w3schools: 'https://www.w3schools.com/js/js_array_methods.asp',
        steps: [
          'Erstelle ein Array von Schüler-Objekten: { name: "Max", noten: [1, 2, 3] }',
          'Berechne den Durchschnitt: noten.reduce((a, b) => a + b, 0) / noten.length',
          'Zeige alle Schüler mit Name und Durchschnittsnote in einer Tabelle an',
          'Füge ein Formular hinzu, um neue Noten für einen Schüler einzutragen',
          'Füge eine Funktion hinzu, die anzeigt, wer bestanden hat (Durchschnitt ≤ 4) und wer nicht'
        ],
        commonMistakes: [
          'Durchschnitt als String berechnen: ("1" + "2") / 2 ergibt 6, nicht 1.5 — Noten müssen Zahlen sein',
          'Array nicht initialisieren: Schüler ohne Noten-Array führt zu noten.length === undefined — immer Default-Werte setzen',
          'DOM bei jedem Update komplett neu rendern: Das ist ineffizient. Besser: Nur geänderte Zeilen aktualisieren',
          'Vergessen, Eingaben zu validieren: Noten außerhalb 1–5 erlauben führt zu unsinnigen Durchschnitten'
        ],
        proTip: 'Erstelle eine Hilfsfunktion renderTabelle(), die das gesamte Array neu rendert. Das ist zwar nicht die effizienteste Lösung, aber die einfachste und robusteste für Anfänger.',
        successCriteria: 'Du hast eine Notenverwaltung mit mindestens 3 Schülern, Durchschnittsberechnung, Bestehensprüfung und der Möglichkeit, neue Noten hinzuzufügen.'
      }
    ]
  }
];

export const badges = [
  { id: 'badge-first-code', name: 'Erster Code', icon: 'ph-terminal', condition: 'q1-1' },
  { id: 'badge-variables', name: 'Variablen-Meister', icon: 'ph-archive-box', condition: 'q1-3' },
  { id: 'badge-loops', name: 'Schleifen-Operator', icon: 'ph-repeat', condition: 'q2-3' },
  { id: 'badge-arrays', name: 'Array-Sammler', icon: 'ph-list-numbers', condition: 'q2-4' },
  { id: 'badge-functions', name: 'Funktions-Fabrikant', icon: 'ph-function', condition: 'q3-1' },
  { id: 'badge-objects', name: 'Objekt-Archivar', icon: 'ph-database', condition: 'q3-4' },
  { id: 'badge-dom', name: 'DOM-Zauberer', icon: 'ph-cursor-click', condition: 'q4-1' },
  { id: 'badge-events', name: 'Event-Meister', icon: 'ph-lightning', condition: 'q4-2' },
  { id: 'badge-todo', name: 'Todo-Legende', icon: 'ph-check-square', condition: 'q5-1' },
  { id: 'badge-quiz', name: 'Quiz-Champion', icon: 'ph-question', condition: 'q5-2' },
  { id: 'badge-w3schools', name: 'W3Schools Entdecker', icon: 'ph-book-open', condition: 'all-w3schools' },
  { id: 'badge-streak', name: 'Auf Feuer', icon: 'ph-fire', condition: 'streak-5' },
  { id: 'badge-complete', name: 'JavaScript Legende', icon: 'ph-crown', condition: 'all-worlds' }
];
