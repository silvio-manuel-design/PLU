/**
 * PYTHON QUEST — Quest Data
 * 5 Welten, 15 Quests, 13 Badges
 * Goldstandard: Welt 1 (Die Werkstatt)
 */

import { getLanguage } from './i18n.js';

export const WORLDS = [
  {
    id: 'welt-1',
    number: 1,
    title: 'Die Werkstatt',
    titleEn: 'The Workshop',
    subtitle: 'Setup & Python-Basics',
    subtitleEn: 'Setup & Python Basics',
    description: 'Richte deine Python-Entwicklungsumgebung ein und lerne die Grundlagen. Der KI-Copilot erwacht.',
    descriptionEn: 'Set up your Python environment and learn the basics. The AI Copilot awakens.',
    skills: ['print()', 'Variablen', 'f-Strings'],
    skillsEn: ['print()', 'Variables', 'f-Strings'],
    image: '../assets/images/worlds/welt-1.jpg',
    color: '#306998',
    glow: '0 0 30px rgba(48,105,152,0.3)',
    xp: 150,
    quests: [
      {
        id: 'q1-1',
        title: 'Hallo Python',
        titleEn: 'Hello Python',
        description: 'Schreibe dein erstes Python-Programm und erlebe den Moment, in dem der Computer deine Sprache versteht.',
        descriptionEn: 'Write your first Python program and experience the moment when the computer understands your language.',
        image: '../assets/images/quests/quest-q1-1.webp',
        xp: 30,
        type: 'code',
        estimatedTime: '5 Min.',
        codeTemplate: `# Dein erstes Python-Programm
# Ersetze "Webdesigner" durch deinen Namen
name = "Webdesigner"

# TODO: Gib eine Begrüßung mit print() aus
print("Hallo Welt!")

# TODO: Nutze einen f-String für die personalisierte Begrüßung
print(f"Willkommen, {name}!")`,
        validator: (output) => output.toLowerCase().includes('willkommen') || output.toLowerCase().includes('hallo'),
        hint: 'Nutze einen f-String: print(f"Willkommen, {name}!")',
        hintEn: 'Use an f-string: print(f"Welcome, {name}!")',
        proTip: 'print() ist dein bester Freund beim Debuggen. Wenn etwas nicht funktioniert, logge die Werte aus — dann siehst du, was der Computer wirklich denkt. Tipp: Probiere auch print(type(name)) aus, um den Datentyp zu sehen!',
        proTipEn: 'print() is your best friend for debugging. If something doesn\'t work, log the values — then you see what the computer really thinks. Tip: Also try print(type(name)) to see the data type!',
        commonMistakes: ['Vergessene Klammern nach print', 'Anführungszeichen vergessen', 'Kein f vor dem String'],
        commonMistakesEn: ['Forgotten parentheses after print', 'Forgotten quotation marks', 'No f before the string'],
        mission: `Du betrittst <strong>Die Werkstatt</strong> — den Ort, an dem aus Ideen Code wird. Nach HTML/CSS (Struktur und Stil) und JavaScript (Interaktivität im Browser) ist Python der nächste evolutionäre Schritt. Python ist die Sprache, die hinter KI-Systemen wie ChatGPT steckt, die Datenanalyse ermöglicht und Automatisierung im Backend möglich macht. Heute schreibst du deine ersten Zeilen und weckst den Python-Interpreter zum Leben.`,
        missionEn: `You enter <strong>The Workshop</strong> — the place where ideas become code. After HTML/CSS (structure and style) and JavaScript (browser interactivity), Python is the next evolutionary step. Python is the language behind AI systems like ChatGPT, enables data analysis, and makes backend automation possible. Today you write your first lines and bring the Python interpreter to life.`,
        whyImportant: `Das "Hallo Welt"-Programm ist der Ritterschlag jedes Programmierers. Es beweist: Der Computer versteht dich. Wenn das klappt, kannst du alles andere auch lernen. In der Praxis nutzt du Python für Backend-APIs, Datenverarbeitung und KI-Integration — Bereiche, die im Browser mit JavaScript nicht möglich sind.`,
        whyImportantEn: `The "Hello World" program is the accolade of every programmer. It proves: the computer understands you. If that works, you can learn everything else. In practice, you use Python for backend APIs, data processing, and AI integration — areas that are not possible in the browser with JavaScript.`,
        steps: [
          'Öffne VS Code: und erstelle eine neue Datei: <code>hallo.py</code>',
          'Schreibe: <code>print("Hallo Python!")</code>',
          'Erstelle eine Variable: <code>name = "Webdesigner"</code>',
          'Nutze einen f-String: <code>print(f"Willkommen, {name}!")</code>',
          'Führe das Skript im Terminal aus: <code>python hallo.py</code>'
        ],
        stepsEn: [
          'Open VS Code: and create a new file: <code>hello.py</code>',
          'Write: <code>print("Hello Python!")</code>',
          'Create a variable: <code>name = "Webdesigner"</code>',
          'Use an f-string: <code>print(f"Welcome, {name}!")</code>',
          'Run the script in the terminal: <code>python hello.py</code>'
        ],
        successCriteria: `Du hast eine .py-Datei erstellt, eine Variable definiert, einen f-String genutzt und siehst die formatierte Ausgabe im Terminal.`,
        successCriteriaEn: `You created a .py file, defined a variable, used an f-string, and see the formatted output in the terminal.`,
        mistakes: [
          'Die Datei als .txt statt .py speichern — dann erkennt VS Code: kein Python',
          'print ohne Klammern schreiben: <code>print</code> ist in Python 3 eine Funktion und braucht <code>()</code>',
          'Das f vor dem String vergessen: ohne f wird <code>{name}</code> als Text ausgegeben, nicht als Variable',
          'Anführungszeichen vergessen: <code>"Hallo"</code> ist Text, <code>Hallo</code> ohne Anführungszeichen ist eine Variable'
        ],
        mistakesEn: [
          'Saving the file as .txt instead of .py — then VS Code: won\'t recognize Python',
          'Writing print without parentheses: <code>print</code> is a function in Python 3 and needs <code>()</code>',
          'Forgetting the f before the string: without f, <code>{name}</code> is printed as text, not as a variable',
          'Forgetting quotation marks: <code>"Hello"</code> is text, <code>Hello</code> without quotes is a variable'
        ],
        documentation: {
          intro: 'Dein Lehrer möchte deine Arbeit sehen. Speichere Screenshots deiner Lösung im Ordner <strong>lösungen</strong> auf deinem OneDrive und gib den Freigabelink in Moodle ab.',
          introEn: 'Your teacher wants to see your work. Save screenshots of your solution in the <strong>solutions</strong> folder on your OneDrive and submit the share link in Moodle.',
          steps: [
            'Erstelle einen Ordner <strong>lösungen</strong> in deinem OneDrive',
            'Mache Screenshots von deinem Code: in VS Code: und dem Ergebnis im Terminal',
            'Speichere die Screenshots im Ordner',
            'Erstelle einen Freigabelink für den Ordner',
            'Reiche den Link in Moodle als Textabgabe ein'
          ],
          stepsEn: [
            'Create a folder <strong>solutions</strong> in your OneDrive',
            'Take screenshots of your code in VS Code: and the result in the terminal',
            'Save the screenshots in the folder',
            'Create a share link for the folder',
            'Submit the link in Moodle as a text assignment'
          ]
        },
        w3schoolsLink: 'https://www.w3schools.com/python/python_getstarted.asp',
        w3schoolsLabel: 'Hallo Python auf W3Schools',
        w3schoolsLabelEn: 'Hello Python on W3Schools',
        reflectionQuestion: 'Was macht print() und warum ist es wichtig für Anfänger? Was ist der Unterschied zu console.log() in JavaScript?',
        reflectionQuestionEn: 'What does print() do and why is it important for beginners? What is the difference to console.log() in JavaScript?',
        classicLink: '../../../python-classic/src/pages/kapitel/01-variablen.html'
      },
      {
        id: 'q1-2',
        title: 'Variablen-Organizer',
        titleEn: 'Variable Organizer',
        description: 'Erstelle Variablen für ein Webprojekt und lerne, wie Python mit Daten umgeht.',
        descriptionEn: 'Create variables for a web project and learn how Python handles data.',
        image: '../assets/images/quests/quest-q1-2.webp',
        xp: 40,
        type: 'code',
        estimatedTime: '7 Min.',
        codeTemplate: `# Variablen für ein Webprojekt
projekt_name = "Portfolio"
breite = 1920
hoehe = 1080
ist_responsive = True

# TODO: Berechne das Seitenverhältnis
verhaeltnis = breite / hoehe

# TODO: Gib das Ergebnis formatiert aus
print(f"Projekt: {projekt_name}")
print(f"Seitenverhältnis: {verhaeltnis:.2f}")

# TODO: Prüfe den Typ einer Variable
print(type(projekt_name))`,
        validator: (output) => (output.includes('1.77') || output.includes('1.78')) && output.includes('Portfolio'),
        hint: 'Seitenverhältnis = breite / hoehe. Nutze :.2f für 2 Dezimalstellen. Prüfe den Typ mit type().',
        hintEn: 'Aspect ratio = width / height. Use :.2f for 2 decimal places. Check the type with type().',
        proTip: 'Verwende snake_case (unterstrich_klein) für Variablennamen in Python — das ist der PEP 8 Standard. In JavaScript nutzt man camelCase. Gleiches Konzept, andere Konvention.',
        proTipEn: 'Use snake_case (underscore_lowercase) for variable names in Python — that\'s the PEP 8 standard. In JavaScript, camelCase is used. Same concept, different convention.',
        commonMistakes: ['Ganzzahl-Division (// statt /)', 'Vergessener Doppelpunkt in f-String', 'Variable falsch geschrieben'],
        mission: `Du betrittst das <strong>Variablen-Labor</strong>. Hier lernst du, wie Python Daten speichert, verarbeitet und ausgibt. Jedes Programm beginnt mit Variablen. Heute lernst du, wie du Daten in Python speicherst — und wie sich das von JavaScript unterscheidet.`,
        missionEn: `You enter the <strong>Variable Lab</strong>. Here you learn how Python stores, processes, and outputs data. Every program starts with variables. Today you learn how to store data in Python — and how it differs from JavaScript.`,
        whyImportant: `Ohne Variablen kann ein Programm nichts merken. Jedes Spiel speichert den Score in einer Variable. Jeder Warenkorb speichert die Artikel in Variablen. Variablen sind das Gedächtnis deines Programms. In Python brauchst du kein let, const oder var — das macht den Code übersichtlicher, erfordert aber Disziplin.`,
        whyImportantEn: `Without variables, a program cannot remember anything. Every game stores the score in a variable. Every shopping cart stores items in variables. Variables are the memory of your program. In Python you don't need let, const, or var — this makes the code cleaner, but requires discipline.`,
        steps: [
          'Erstelle Variablen: <code>projekt_name = "Portfolio"</code>, <code>breite = 1920</code>, <code>hoehe = 1080</code>',
          'Prüfe die Datentypen mit <code>type()</code>: <code>type(projekt_name)</code>, <code>type(breite)</code>',
          'Berechne das Seitenverhältnis: <code>verhaeltnis = breite / hoehe</code>',
          'Gib das Ergebnis formatiert aus: <code>print(f"Seitenverhältnis: {verhaeltnis:.2f}")</code>',
          'Experimentiere: Was passiert bei <code>breite // hoehe</code> (Ganzzahl-Division)?'
        ],
        stepsEn: [
          'Create variables: <code>project_name = "Portfolio"</code>, <code>width = 1920</code>, <code>height = 1080</code>',
          'Check the data types with <code>type()</code>: <code>type(project_name)</code>, <code>type(width)</code>',
          'Calculate the aspect ratio: <code>ratio = width / height</code>',
          'Output the result formatted: <code>print(f"Aspect ratio: {ratio:.2f}")</code>',
          'Experiment: What happens with <code>width // height</code> (integer division)?'
        ],
        successCriteria: `Du hast Variablen mit verschiedenen Datentypen erstellt, type() genutzt, das Seitenverhältnis berechnet und verstehst den Unterschied zwischen / und //.`,
        successCriteriaEn: `You created variables with different data types, used type(), calculated the aspect ratio, and understand the difference between / and //.`,
        mistakes: [
          '<code>==</code> statt <code>=</code> verwenden: <code>==</code> prüft Gleichheit, <code>=</code> weist einen Wert zu',
          'Ganzzahl-Division (<code>//</code>) statt normaler Division (<code>/</code>) verwenden und wundern, warum 1920/1080 = 1 ergibt',
          'Den Doppelpunkt in f-Strings vergessen: <code>{verhaeltnis.2f}</code> statt <code>{verhaeltnis:.2f}</code>',
          'Leerzeichen in Variablennamen: <code>projekt name</code> ist ungültig, <code>projekt_name</code> ist korrekt'
        ],
        mistakesEn: [
          'Using <code>==</code> instead of <code>=</code>: <code>==</code> checks equality, <code>=</code> assigns a value',
          'Using integer division (<code>//</code>) instead of normal division (<code>/</code>) and wondering why 1920/1080 = 1',
          'Forgetting the colon in f-strings: <code>{ratio.2f}</code> instead of <code>{ratio:.2f}</code>',
          'Spaces in variable names: <code>project name</code> is invalid, <code>project_name</code> is correct'
        ],
        documentation: {
          intro: 'Dein Lehrer möchte deine Arbeit sehen. Speichere Screenshots deiner Lösung im Ordner <strong>lösungen</strong> auf deinem OneDrive und gib den Freigabelink in Moodle ab.',
          introEn: 'Your teacher wants to see your work. Save screenshots of your solution in the <strong>solutions</strong> folder on your OneDrive and submit the share link in Moodle.',
          steps: [
            'Erstelle einen Ordner <strong>lösungen</strong> in deinem OneDrive',
            'Mache Screenshots von deinem Code: in VS Code: und dem Ergebnis im Terminal',
            'Speichere die Screenshots im Ordner',
            'Erstelle einen Freigabelink für den Ordner',
            'Reiche den Link in Moodle als Textabgabe ein'
          ],
          stepsEn: [
            'Create a folder <strong>solutions</strong> in your OneDrive',
            'Take screenshots of your code in VS Code: and the result in the terminal',
            'Save the screenshots in the folder',
            'Create a share link for the folder',
            'Submit the link in Moodle as a text assignment'
          ]
        },
        w3schoolsLink: 'https://www.w3schools.com/python/python_variables.asp',
        w3schoolsLabel: 'Python Variablen auf W3Schools',
        w3schoolsLabelEn: 'Python Variables on W3Schools',
        reflectionQuestion: 'Warum braucht Python kein let, const oder var? Ist das ein Vorteil oder ein Nachteil? Erkläre mit einem Beispiel aus deiner bisherigen JavaScript-Erfahrung.',
        reflectionQuestionEn: 'Why does Python not need let, const, or var? Is that an advantage or a disadvantage? Explain with an example from your previous JavaScript experience.',
        classicLink: '../../../python-classic/src/pages/kapitel/01-variablen.html'
      },
      {
        id: 'q1-3',
        title: 'Der erste Code-Morph',
        titleEn: 'The First Code Morph',
        description: 'Übersetze JavaScript-Code in Python und verstehe die philosophischen Unterschiede zwischen den Sprachen.',
        descriptionEn: 'Translate JavaScript code into Python and understand the philosophical differences between the languages.',
        image: '../assets/images/quests/quest-q1-3.webp',
        xp: 30,
        type: 'reflection',
        estimatedTime: '10 Min.',
        promptTemplate: `Erkläre mir den Unterschied zwischen "let name = ..." in JavaScript und "name = ..." in Python. Was sind die Vor- und Nachteile? Gib ein konkretes Beispiel aus deiner Erfahrung.`,
        promptTemplateEn: `Explain the difference between "let name = ..." in JavaScript and "name = ..." in Python. What are the pros and cons? Give a concrete example from your experience.`,
        hint: 'Denke über Typisierung nach: JavaScript ist loosely typed, Python ist strongly typed. Notiere mindestens 2 Unterschiede.',
        hintEn: 'Think about typing: JavaScript is loosely typed, Python is strongly typed. Note at least 2 differences.',
        proTip: 'Denke nicht "Wie schreibe ich JS in Python?", sondern "Wie löst Python dieses Problem?" Die Sprachen haben unterschiedliche Philosophien. Python legt Wert auf Lesbarkeit und Einfachheit (Zen of Python: "Simple is better than complex").',
        proTipEn: 'Don\'t think "How do I write JS in Python?", but "How does Python solve this problem?" The languages have different philosophies. Python values readability and simplicity (Zen of Python: "Simple is better than complex").',
        mission: `Du stehst vor der <strong>Code-Morphing-Maschine</strong>. Deine Aufgabe: Übersetze ein Stück JavaScript in Python. Das ist keine mechanische Übung — es geht darum, die Denkweise jeder Sprache zu verstehen. JavaScript denkt in Browser-Events, Python denkt in Daten und Logik.`,
        missionEn: `You stand before the <strong>Code-Morphing Machine</strong>. Your task: translate a piece of JavaScript into Python. This is not a mechanical exercise — it's about understanding the mindset of each language. JavaScript thinks in browser events, Python thinks in data and logic.`,
        whyImportant: `In der Praxis wirst du ständig zwischen Sprachen wechseln. Ein Frontend in JavaScript, ein Backend in Python, eine KI-Pipeline in Python, eine Datenbank-Abfrage in SQL. Wer die Philosophie jeder Sprache versteht, kann fließend zwischen Welten wechseln. KI-Modelle wie ChatGPT sind darauf trainiert, genau diese Übersetzungen vorzunehmen.`,
        whyImportantEn: `In practice, you will constantly switch between languages. A frontend in JavaScript, a backend in Python, an AI pipeline in Python, a database query in SQL. Those who understand the philosophy of each language can fluently switch between worlds. AI models like ChatGPT are trained to make exactly these translations.`,
        steps: [
          'Analysiere das JS-Beispiel: <code>let breite = 1920; let hoehe = 1080; console.log(breite / hoehe);</code>',
          'Schreibe das Python-Äquivalent: <code>breite = 1920</code>, <code>hoehe = 1080</code>, <code>print(breite / hoehe)</code>',
          'Notiere 3 Unterschiede: keine Semikolons, keine let/const, print statt console.log',
          'Teste deinen Python-Code in der Sandbox'
        ],
        stepsEn: [
          'Analyze the JS example: <code>let width = 1920; let height = 1080; console.log(width / height);</code>',
          'Write the Python equivalent: <code>width = 1920</code>, <code>height = 1080</code>, <code>print(width / height)</code>',
          'Note 3 differences: no semicolons, no let/const, print instead of console.log',
          'Test your Python code in the sandbox'
        ],
        successCriteria: `Du hast JS-Code in Python übersetzt, mindestens 3 syntaktische Unterschiede erkannt und kannst erklären, warum Python keine Variablendeklaration mit Schlüsselwort braucht.`,
        successCriteriaEn: `You translated JS code to Python, recognized at least 3 syntactic differences, and can explain why Python doesn't need variable declaration with a keyword.`,
        mistakes: [
          'Semikolons am Ende der Zeile mitnehmen — Python braucht keine Semikolons',
          'Klammern bei if/while/for vergessen: in Python kommt der Doppelpunkt und Einrückung statt <code>{}</code>',
          '<code>console.log</code> statt <code>print</code> verwenden — das ist JS-Syntax',
          'camelCase in Python nutzen: <code>breiteInPx</code> statt <code>breite_in_px</code> verstößt gegen PEP 8'
        ],
        mistakesEn: [
          'Carrying over semicolons at the end of lines — Python doesn\'t need semicolons',
          'Forgetting about if/while/for braces: in Python, the colon and indentation replace <code>{}</code>',
          'Using <code>console.log</code> instead of <code>print</code> — that\'s JS syntax',
          'Using camelCase in Python: <code>widthInPx</code> instead of <code>width_in_px</code> violates PEP 8'
        ],
        documentation: {
          intro: 'Dein Lehrer möchte deine Arbeit sehen. Speichere Screenshots deiner Lösung im Ordner <strong>lösungen</strong> auf deinem OneDrive und gib den Freigabelink in Moodle ab.',
          introEn: 'Your teacher wants to see your work. Save screenshots of your solution in the <strong>solutions</strong> folder on your OneDrive and submit the share link in Moodle.',
          steps: [
            'Erstelle einen Ordner <strong>lösungen</strong> in deinem OneDrive',
            'Mache Screenshots vom JS-Code und dem Python-Äquivalent in der Sandbox',
            'Speichere die Screenshots im Ordner',
            'Erstelle einen Freigabelink für den Ordner',
            'Reiche den Link in Moodle als Textabgabe ein'
          ],
          stepsEn: [
            'Create a folder <strong>solutions</strong> in your OneDrive',
            'Take screenshots of the JS code and the Python equivalent in the sandbox',
            'Save the screenshots in the folder',
            'Create a share link for the folder',
            'Submit the link in Moodle as a text assignment'
          ]
        },
        w3schoolsLink: 'https://www.w3schools.com/python/python_syntax.asp',
        w3schoolsLabel: 'Python Syntax auf W3Schools',
        w3schoolsLabelEn: 'Python Syntax on W3Schools',
        reflectionQuestion: 'Was ist beim Übersetzen von JavaScript nach Python am schwierigsten? Was würdest du einem Klassenkameraden empfehlen, der das gleiche machen muss?',
        reflectionQuestionEn: 'What is the most difficult part of translating JavaScript to Python? What would you recommend to a classmate doing the same?'
      }
    ]
  },
  {
    id: 'welt-2',
    number: 2,
    title: 'Die Sortierhalle',
    titleEn: 'The Sorting Hall',
    subtitle: 'Bedingungen & Schleifen',
    subtitleEn: 'Conditions & Loops',
    description: 'Sortiere Bilder automatisch nach Kriterien. Der Copilot lernt Entscheidungen zu treffen.',
    descriptionEn: 'Automatically sort images by criteria. The Copilot learns to make decisions.',
    skills: ['if/else', 'for-Schleifen', 'while'],
    skillsEn: ['if/else', 'for loops', 'while'],
    image: '../assets/images/worlds/welt-2.jpg',
    color: '#E67E22',
    glow: '0 0 30px rgba(230,126,34,0.3)',
    xp: 200,
    unlocked: false,
    quests: [
      {
        id: 'q2-1',
        title: 'Landscape oder Portrait?',
        titleEn: 'Landscape or Portrait?',
        description: 'Schreibe ein Programm, das automatisch entscheidet, ob ein Bild im Landscape- oder Portrait-Format vorliegt — die Grundlage jedes responsive Designs.',
        descriptionEn: 'Write a program that automatically decides whether an image is in landscape or portrait format — the foundation of every responsive design.',
        image: '../assets/images/quests/quest-q2-1.webp',
        xp: 50,
        type: 'code',
        estimatedTime: '7 Min.',
        codeTemplate: `# Bilddimensionen
breite = 1920
hoehe = 1080

# TODO: Prüfe, ob das Bild Landscape oder Portrait ist
if breite > hoehe:
    print("Landscape")
else:
    print("Portrait")

# TODO: Erweitere auf Quadrat (optional)
if breite == hoehe:
    print("Quadrat")`,
        validator: (output) => output.toLowerCase().includes('landscape') || output.toLowerCase().includes('portrait'),
        hint: 'Wenn breite > hoehe: Landscape, sonst Portrait. Vergiss den Doppelpunkt nach if nicht!',
        hintEn: 'If width > height: Landscape, else Portrait. Don\'t forget the colon after if!',
        proTip: 'Im Webdesign nutzt man diese Logik, um responsive Bilder automatisch zu optimieren. CSS hat @media-Queries, Python hat if/else — beide entscheiden: "Wenn X, dann Y".',
        proTipEn: 'In web design, this logic is used to automatically optimize responsive images. CSS has @media queries, Python has if/else — both decide: "If X, then Y".',
        commonMistakes: ['Vergessener Doppelpunkt nach if', '== statt =', 'Falsche Einrückung'],
        commonMistakesEn: ['Forgotten colon after if', '== instead of =', 'Wrong indentation'],
        mission: `Du betrittst die <strong>Sortierhalle</strong>. Hunderte Bilder stapeln sich ungeordnet — ein Chaos aus Landscape-, Portrait- und Quadrat-Formaten. Deine Mission: Schreibe ein Programm, das jedes Bild automatisch klassifiziert. Das ist keine akademische Übung — in jedem CMS, jeder Bilddatenbank und jedem E-Commerce-System läuft diese Logik im Hintergrund.`,
        missionEn: `You enter the <strong>Sorting Hall</strong>. Hundreds of images are piled up in disorder — a chaos of landscape, portrait, and square formats. Your mission: write a program that automatically classifies each image. This is not an academic exercise — this logic runs in the background of every CMS, image database, and e-commerce system.`,
        whyImportant: `Bedingungen sind das Rückgrat jeder intelligenten Software. Ohne if/else wäre ein Programm nur eine stupide Befehlskette. In der Praxis entscheidet diese Logik, ob ein Bild verkleinert, gedreht oder anders platziert wird. CSS macht das visuell mit @media, Python macht es datengetrieben mit if/else.`,
        whyImportantEn: `Conditions are the backbone of every intelligent software. Without if/else, a program would be just a stupid chain of commands. In practice, this logic decides whether an image is resized, rotated, or placed differently. CSS does this visually with @media, Python does it data-driven with if/else.`,
        steps: [
          'Erstelle die Variablen: <code>breite = 1920</code> und <code>hoehe = 1080</code>',
          'Schreibe die Bedingung: <code>if breite > hoehe:</code> mit Doppelpunkt!',
          'Gib im if-Zweig aus: <code>print("Landscape")</code>',
          'Füge <code>else:</code> hinzu und gib <code>print("Portrait")</code> aus',
          'Teste mit anderen Werten: Was passiert bei <code>breite = 1080</code> und <code>hoehe = 1920</code>?'
        ],
        stepsEn: [
          'Create the variables: <code>width = 1920</code> and <code>height = 1080</code>',
          'Write the condition: <code>if width > height:</code> with colon!',
          'Output in the if branch: <code>print("Landscape")</code>',
          'Add <code>else:</code> and output <code>print("Portrait")</code>',
          'Test with other values: What happens with <code>width = 1080</code> and <code>height = 1920</code>?'
        ],
        successCriteria: `Du hast eine if/else-Bedingung geschrieben, die korrekt zwischen Landscape und Portrait unterscheidet. Der Doppelpunkt nach if ist vorhanden und die Einrückung ist korrekt.`,
        successCriteriaEn: `You wrote an if/else condition that correctly distinguishes between landscape and portrait. The colon after if is present and the indentation is correct.`,
        mistakes: [
          'Den <strong>Doppelpunkt nach if vergessen</strong> — Python braucht den Doppelpunkt, um den Code-Block zu starten',
          '<code>==</code> statt <code>=</code> für Zuweisung verwenden — <code>=</code> weist zu, <code>==</code> prüft Gleichheit',
          '<strong>Falsche Einrückung</strong> — Python nutzt Einrückung (4 Leerzeichen) statt geschweifter Klammern <code>{}</code>',
          'Anführungszeichen bei <code>"Landscape"</code> vergessen — ohne Anführungszeichen sucht Python nach einer Variable namens Landscape'
        ],
        mistakesEn: [
          'Forgetting the <strong>colon after if</strong> — Python needs the colon to start the code block',
          'Using <code>==</code> instead of <code>=</code> for assignment — <code>=</code> assigns, <code>==</code> checks equality',
          '<strong>Wrong indentation</strong> — Python uses indentation (4 spaces) instead of curly braces <code>{}</code>',
          'Forgetting quotes around <code>"Landscape"</code> — without quotes, Python looks for a variable named Landscape'
        ],
        documentation: {
          intro: 'Dein Lehrer möchte deine Arbeit sehen. Speichere Screenshots deiner Lösung im Ordner <strong>lösungen</strong> auf deinem OneDrive und gib den Freigabelink in Moodle ab.',
          introEn: 'Your teacher wants to see your work. Save screenshots of your solution in the <strong>solutions</strong> folder on your OneDrive and submit the share link in Moodle.',
          steps: [
            'Erstelle einen Ordner <strong>lösungen</strong> in deinem OneDrive',
            'Mache Screenshots von deinem Code: in VS Code: und dem Ergebnis im Terminal',
            'Speichere die Screenshots im Ordner',
            'Erstelle einen Freigabelink für den Ordner',
            'Reiche den Link in Moodle als Textabgabe ein'
          ],
          stepsEn: [
            'Create a folder <strong>solutions</strong> in your OneDrive',
            'Take screenshots of your code in VS Code: and the result in the terminal',
            'Save the screenshots in the folder',
            'Create a share link for the folder',
            'Submit the link in Moodle as a text assignment'
          ]
        },
        w3schoolsLink: 'https://www.w3schools.com/python/python_conditions.asp',
        w3schoolsLabel: 'Python Bedingungen auf W3Schools',
        w3schoolsLabelEn: 'Python Conditions on W3Schools',
        reflectionQuestion: 'Was ist der Unterschied zwischen if in Python und if in JavaScript? Was findest du einfacher, was schwieriger? Begründe deine Antwort.',
        reflectionQuestionEn: 'What is the difference between if in Python and if in JavaScript? What do you find easier, what harder? Justify your answer.',
        classicLink: '../../../python-classic/src/pages/kapitel/04-bedingungen.html'
      },
      {
        id: 'q2-2',
        title: 'Bild-Optimierer',
        titleEn: 'Image Optimizer',
        description: 'Nutze eine for-Schleife, um eine ganze Liste von Bildern automatisch zu verarbeiten. Das ist Automatisierung in Reinform.',
        descriptionEn: 'Use a for loop to automatically process a whole list of images. This is automation in its purest form.',
        image: '../assets/images/quests/quest-q2-2.webp',
        xp: 60,
        type: 'code',
        estimatedTime: '10 Min.',
        codeTemplate: `# Liste von Bildern
bilder = ["hero.jpg", "logo.png", "banner.webp", "team.jpg"]

# TODO: Gib jedes Bild mit Index aus
for i, bild in enumerate(bilder):
    print(f"{i+1}. Bild: {bild}")

# TODO: Zähle die Bilder
print(f"Gesamtzahl: {len(bilder)} Bilder")`,
        validator: (output) => output.toLowerCase().includes('hero.jpg') && output.toLowerCase().includes('gesamtzahl'),
        hint: 'Nutze enumerate(bilder) für Index + Wert. len(bilder) gibt die Anzahl der Elemente.',
        hintEn: 'Use enumerate(images) for index + value. len(images) gives the number of elements.',
        proTip: 'enumerate() ist ein Python-Superpower, das es in JavaScript so nicht gibt. In JS brauchst du for(let i=0; i<arr.length; i++). In Python sagst du einfach: for i, item in enumerate(list).',
        proTipEn: 'enumerate() is a Python superpower that doesn\'t exist in JavaScript like this. In JS you need for(let i=0; i<arr.length; i++). In Python you simply say: for i, item in enumerate(list).',
        commonMistakes: ['Vergessener Doppelpunkt nach for', 'Falsche Einrückung', 'Variable nicht definiert'],
        commonMistakesEn: ['Forgotten colon after for', 'Wrong indentation', 'Variable not defined'],
        mission: `Die Sortierhalle ist in Hochbetrieb. Statt jedes Bild einzeln zu bearbeiten, schreibst du jetzt ein Programm, das <strong>hunderte Bilder in Sekunden</strong> verarbeitet. Das ist der Moment, in dem du verstehst, warum Programmierung so mächtig ist: Eine einzige Schleife ersetzt stundenlange Klickarbeit.`,
        missionEn: `The Sorting Hall is in full operation. Instead of editing each image individually, you now write a program that processes <strong>hundreds of images in seconds</strong>. This is the moment when you understand why programming is so powerful: a single loop replaces hours of clicking.`,
        whyImportant: `Automatisierung ist der Superpower jedes Programmierers. Ein Webdesigner, der 100 Bilder manuell optimiert, verschwendet einen Tag. Ein Python-Skript erledigt das in 10 Sekunden. for-Schleifen sind das Werkzeug dafür — egal ob du Bilder, Daten oder E-Mails verarbeitest.`,
        whyImportantEn: `Automation is the superpower of every programmer. A web designer who manually optimizes 100 images wastes a day. A Python script does it in 10 seconds. for loops are the tool for this — whether you're processing images, data, or emails.`,
        steps: [
          'Erstelle eine Liste: <code>bilder = ["hero.jpg", "logo.png", "banner.webp"]</code>',
          'Nutze <code>for bild in bilder:</code> mit Doppelpunkt',
          'Gib im Schleifenkörper aus: <code>print(f"Optimiere: {bild}")</code>',
          'Erweitere mit <code>enumerate()</code>: <code>for i, bild in enumerate(bilder):</code>',
          'Gib die Gesamtzahl aus: <code>print(f"Gesamt: {len(bilder)} Bilder")</code>'
        ],
        stepsEn: [
          'Create a list: <code>images = ["hero.jpg", "logo.png", "banner.webp"]</code>',
          'Use <code>for image in images:</code> with colon',
          'Output in the loop body: <code>print(f"Optimizing: {image}")</code>',
          'Extend with <code>enumerate()</code>: <code>for i, image in enumerate(images):</code>',
          'Output the total count: <code>print(f"Total: {len(images)} images")</code>'
        ],
        successCriteria: `Du hast eine for-Schleife geschrieben, die alle Bilder durchläuft. enumerate() zeigt Index und Wert. len() gibt die Gesamtzahl aus.`,
        successCriteriaEn: `You wrote a for loop that iterates through all images. enumerate() shows index and value. len() outputs the total count.`,
        mistakes: [
          'Den <strong>Doppelpunkt nach for vergessen</strong> — ohne : weiß Python nicht, wo der Schleifenkörper beginnt',
          '<strong>Falsche Einrückung</strong> des Schleifenkörpers — alles innerhalb der Schleife muss eingerückt sein',
          'Die Schleifen-Variable falsch schreiben: <code>for bilder in bilder:</code> statt <code>for bild in bilder:</code>',
          'Die <strong>Liste ohne Anführungszeichen</strong> erstellen: <code>[hero.jpg]</code> statt <code>["hero.jpg"]</code>'
        ],
        mistakesEn: [
          'Forgetting the <strong>colon after for</strong> — without :, Python doesn\'t know where the loop body begins',
          '<strong>Wrong indentation</strong> of the loop body — everything inside the loop must be indented',
          'Misspelling the loop variable: <code>for images in images:</code> instead of <code>for image in images:</code>',
          'Creating the <strong>list without quotes</strong>: <code>[hero.jpg]</code> instead of <code>["hero.jpg"]</code>'
        ],
        documentation: {
          intro: 'Dein Lehrer möchte deine Arbeit sehen. Speichere Screenshots deiner Lösung im Ordner <strong>lösungen</strong> auf deinem OneDrive und gib den Freigabelink in Moodle ab.',
          introEn: 'Your teacher wants to see your work. Save screenshots of your solution in the <strong>solutions</strong> folder on your OneDrive and submit the share link in Moodle.',
          steps: [
            'Erstelle einen Ordner <strong>lösungen</strong> in deinem OneDrive',
            'Mache Screenshots von deinem Code: in VS Code: und dem Ergebnis im Terminal',
            'Speichere die Screenshots im Ordner',
            'Erstelle einen Freigabelink für den Ordner',
            'Reiche den Link in Moodle als Textabgabe ein'
          ],
          stepsEn: [
            'Create a folder <strong>solutions</strong> in your OneDrive',
            'Take screenshots of your code in VS Code: and the result in the terminal',
            'Save the screenshots in the folder',
            'Create a share link for the folder',
            'Submit the link in Moodle as a text assignment'
          ]
        },
        w3schoolsLink: 'https://www.w3schools.com/python/python_for_loops.asp',
        w3schoolsLabel: 'Python for-Schleifen auf W3Schools',
        w3schoolsLabelEn: 'Python for Loops on W3Schools',
        reflectionQuestion: 'Warum sind for-Schleifen in Python eleganter als in JavaScript? Vergleiche Python for...in mit JavaScript for...of. Was ist der größte Vorteil von enumerate()?',
        reflectionQuestionEn: 'Why are for loops in Python more elegant than in JavaScript? Compare Python for...in with JavaScript for...of. What is the biggest advantage of enumerate()?',
        classicLink: '../../../python-classic/src/pages/kapitel/05-schleifen.html'
      },
      {
        id: 'q2-3',
        title: 'Der Logik-Morph',
        titleEn: 'The Logic Morph',
        description: 'Reflektiere über den fundamentalen Unterschied zwischen JavaScripts === und Pythons == — und warum Python stark typisiert ist.',
        descriptionEn: 'Reflect on the fundamental difference between JavaScript\'s === and Python\'s == — and why Python is strongly typed.',
        image: '../assets/images/quests/quest-q2-3.webp',
        xp: 30,
        type: 'reflection',
        estimatedTime: '10 Min.',
        promptTemplate: `Erkläre mir, warum Python kein === braucht, während JavaScript es hat. Was bedeutet "duck typing" und wie hängt das mit der Typisierung zusammen? Gib ein konkretes Beispiel aus deiner Erfahrung mit JavaScript.`,
        promptTemplateEn: `Explain to me why Python doesn't need === while JavaScript does. What does "duck typing" mean and how is it related to typing? Give a concrete example from your experience with JavaScript.`,
        hint: 'Denke über Typisierung nach: JavaScript ist loosely typed, Python ist strongly typed. Teste in Python: 5 == "5" und 5 == 5.0. Was passiert?',
        hintEn: 'Think about typing: JavaScript is loosely typed, Python is strongly typed. Test in Python: 5 == "5" and 5 == 5.0. What happens?',
        proTip: 'In Python sagt man: "Wenn es wie eine Ente aussieht und wie eine Ente quakt, dann ist es eine Ente." Das ist duck typing — der Typ ist weniger wichtig als das Verhalten. Python vertraut dir, aber verlangt Konsistenz.',
        proTipEn: 'In Python they say: "If it looks like a duck and quacks like a duck, then it is a duck." That\'s duck typing — the type is less important than the behavior. Python trusts you, but demands consistency.',
        mission: `Du stehst vor der <strong>Logik-Morphing-Station</strong>. JavaScript und Python haben unterschiedliche Philosophien beim Vergleichen von Werten. JavaScript erfand === aus Notwendigkeit, weil == unerwartete Typkonvertierungen macht. Python brauchte das nie. Deine Aufgabe: Verstehe, warum — und was das über die DNA jeder Sprache verrät.`,
        missionEn: `You stand before the <strong>Logic Morphing Station</strong>. JavaScript and Python have different philosophies when comparing values. JavaScript invented === out of necessity because == makes unexpected type conversions. Python never needed that. Your task: understand why — and what that reveals about the DNA of each language.`,
        whyImportant: `Typisierung ist ein fundamentales Konzept in der Informatik. Wer versteht, warum Python == anders funktioniert als JavaScript ==, versteht auch, warum Fehler in JavaScript oft unerwartet auftreten ("WTF JavaScript"). Dieses Wissen schützt dich vor subtilen Bugs — egal in welcher Sprache du programmierst.`,
        whyImportantEn: `Typing is a fundamental concept in computer science. Those who understand why Python == works differently from JavaScript == also understand why errors in JavaScript often appear unexpectedly ("WTF JavaScript"). This knowledge protects you from subtle bugs — no matter which language you program in.`,
        steps: [
          'Recherchiere: Was macht JavaScript <code>==</code> vs <code>===</code>? Teste: <code>5 == "5"</code> und <code>5 === "5"</code>',
          'Teste in der Python-Sandbox: <code>5 == "5"</code> — was passiert? Warum?',
          'Teste in Python: <code>5 == 5.0</code> — was passiert? Warum ist das anders als in JS?',
          'Erkläre in eigenen Worten: Warum braucht Python kein <code>===</code>?',
          'Recherchiere: Was bedeutet "duck typing"? Wie hängt das mit Python zusammen?'
        ],
        stepsEn: [
          'Research: What does JavaScript <code>==</code> vs <code>===</code> do? Test: <code>5 == "5"</code> and <code>5 === "5"</code>',
          'Test in the Python sandbox: <code>5 == "5"</code> — what happens? Why?',
          'Test in Python: <code>5 == 5.0</code> — what happens? Why is this different from JS?',
          'Explain in your own words: Why does Python not need <code>===</code>?',
          'Research: What does "duck typing" mean? How is it related to Python?'
        ],
        successCriteria: `Du kannst erklären, warum Python kein === braucht. Du verstehst den Unterschied zwischen loose typing (JS) und strong typing (Python). Du kannst duck typing in eigenen Worten erklären.`,
        successCriteriaEn: `You can explain why Python doesn't need ===. You understand the difference between loose typing (JS) and strong typing (Python). You can explain duck typing in your own words.`,
        mistakes: [
          'Denken, dass Python <code>==</code> genauso funktioniert wie JavaScript <code>==</code> — das ist falsch, Python konvertiert nicht automatisch Typen',
          'Übersehen, dass Python <code>5 == 5.0</code> als <code>True</code> wertet — das ist gewolltes duck typing',
          'Duck typing mit "keine Typisierung" verwechseln — Python ist strongly typed, aber duck typing erlaubt flexible Vergleiche',
          'Vergessen, dass JavaScript <code>===</code> nur deshalb existiert, weil <code>==</code> in JS unerwartete Konvertierungen macht'
        ],
        mistakesEn: [
          'Thinking that Python <code>==</code> works the same as JavaScript <code>==</code> — that\'s wrong, Python doesn\'t automatically convert types',
          'Overlooking that Python evaluates <code>5 == 5.0</code> as <code>True</code> — this is intentional duck typing',
          'Confusing duck typing with "no typing" — Python is strongly typed, but duck typing allows flexible comparisons',
          'Forgetting that JavaScript <code>===</code> only exists because <code>==</code> in JS makes unexpected conversions'
        ],
        documentation: {
          intro: 'Dein Lehrer möchte deine Arbeit sehen. Speichere Screenshots deiner Recherche und Erklärung im Ordner <strong>lösungen</strong> auf deinem OneDrive und gib den Freigabelink in Moodle ab.',
          introEn: 'Your teacher wants to see your work. Save screenshots of your research and explanation in the <strong>solutions</strong> folder on your OneDrive and submit the share link in Moodle.',
          steps: [
            'Erstelle einen Ordner <strong>lösungen</strong> in deinem OneDrive',
            'Mache Screenshots deiner Recherche (z.B. W3Schools, Tests in der Sandbox)',
            'Speichere die Screenshots im Ordner',
            'Erstelle einen Freigabelink für den Ordner',
            'Reiche den Link in Moodle als Textabgabe ein'
          ],
          stepsEn: [
            'Create a folder <strong>solutions</strong> in your OneDrive',
            'Take screenshots of your research (e.g., W3Schools, tests in the sandbox)',
            'Save the screenshots in the folder',
            'Create a share link for the folder',
            'Submit the link in Moodle as a text assignment'
          ]
        },
        w3schoolsLink: 'https://www.w3schools.com/python/python_operators.asp',
        w3schoolsLabel: 'Python Operatoren auf W3Schools',
        w3schoolsLabelEn: 'Python Operators on W3Schools',
        reflectionQuestion: 'Ist Pythons == wirklich sicherer als JavaScripts ==? Warum oder warum nicht? Welche Sprache würdest du einem Anfänger empfehlen und warum?',
        reflectionQuestionEn: 'Is Python\'s == really safer than JavaScript\'s ==? Why or why not? Which language would you recommend to a beginner and why?'
      }
    ]
  },
  {
    id: 'welt-3',
    number: 3,
    title: 'Das Gedächtnis',
    titleEn: 'The Memory',
    subtitle: 'Listen & Dictionaries',
    subtitleEn: 'Lists & Dictionaries',
    description: 'Verwalte Bilder, Farben und Daten. Der Copilot erhält ein Gedächtnis.',
    descriptionEn: 'Manage images, colors, and data. The Copilot gains a memory.',
    skills: ['Listen', 'Dictionaries', 'Tupel'],
    skillsEn: ['Lists', 'Dictionaries', 'Tuples'],
    image: '../assets/images/worlds/welt-3.jpg',
    color: '#27AE60',
    glow: '0 0 30px rgba(39,174,96,0.3)',
    xp: 250,
    unlocked: false,
    quests: [
      {
        id: 'q3-1',
        title: 'Galerie-Manager',
        titleEn: 'Gallery Manager',
        description: 'Erstelle eine Bildergalerie als Python-Liste und lerne, wie du Daten strukturiert speicherst und formatiert ausgibst.',
        descriptionEn: 'Create an image gallery as a Python list and learn how to store data in a structured way and output it formatted.',
        image: '../assets/images/quests/quest-q3-1.webp',
        xp: 60,
        type: 'code',
        estimatedTime: '10 Min.',
        codeTemplate: `# Galerie-Bilder
bilder = ["hero.jpg", "about.jpg", "contact.jpg", "team.jpg"]

# TODO: Gib die erste Datei aus (Index 0!)
print(bilder[0])

# TODO: Gib jedes Bild mit Index aus
for i, bild in enumerate(bilder):
    print(f"{i+1}. {bild}")

# TODO: Gib die Gesamtzahl aus
print(f"Gesamt: {len(bilder)} Bilder")`,
        validator: (output) => output.includes('0:') || output.includes('1.') && output.includes('hero.jpg'),
        hint: 'Nutze enumerate(bilder) für Index + Wert. Denke daran: Python beginnt bei 0, aber für die Ausgabe kannst du i+1 nutzen.',
        hintEn: 'Use enumerate(images) for index + value. Remember: Python starts at 0, but for output you can use i+1.',
        proTip: 'In JavaScript gibt\'s forEach() mit Index-Parameter, aber enumerate() ist eleganter. Python\'s Liste ist dynamisch — du kannst jederzeit .append() nutzen, um neue Bilder hinzuzufügen.',
        proTipEn: 'In JavaScript there\'s forEach() with an index parameter, but enumerate() is more elegant. Python\'s list is dynamic — you can use .append() anytime to add new images.',
        commonMistakes: ['Index bei 1 statt 0 starten', 'Vergessene Klammern bei print', 'Liste falsch definiert'],
        mission: `Du betrittst <strong>Das Gedächtnis</strong> — das Archiv des KI-Copiloten. Hunderte Bilder liegen ungeordnet herum. Deine Mission: Schaffe Ordnung, indem du eine strukturierte Liste erstellst. Das ist keine trockene Datenstruktur — das ist das Fundament von Instagram, Spotify und jedem Online-Shop, den du je benutzt hast.`,
        missionEn: `You enter <strong>The Memory</strong> — the AI Copilot's archive. Hundreds of images lie around in disorder. Your mission: create order by building a structured list. This is not a dry data structure — this is the foundation of Instagram, Spotify, and every online store you've ever used.`,
        whyImportant: `Listen sind das Rückgrat jeder Datenverarbeitung. Ohne Listen gäbe es keine Playlists, keine Warenkörbe, keine Bildergalerien. In JavaScript nennst du das Array, in Python heißt es Liste — aber das Konzept ist identisch: eine geordnete Sammlung von Daten. Der Unterschied liegt in der Syntax und den Methoden.`,
        whyImportantEn: `Lists are the backbone of every data processing. Without lists, there would be no playlists, no shopping carts, no image galleries. In JavaScript you call it Array, in Python it's called List — but the concept is identical: an ordered collection of data. The difference lies in syntax and methods.`,
        steps: [
          'Erstelle eine Liste: <code>bilder = ["hero.jpg", "about.jpg", "contact.jpg", "team.jpg"]</code>',
          'Gib die <strong>erste Datei</strong> aus: <code>print(bilder[0])</code> — Python beginnt bei 0, nicht bei 1!',
          'Nutze <code>enumerate(bilder)</code> für Index + Wert: <code>for i, bild in enumerate(bilder):</code>',
          'Gib formatiert aus: <code>print(f"{i+1}. {bild}")</code> — i+1 für menschenlesbare Nummerierung',
          'Nutze <code>len(bilder)</code> für die Gesamtzahl: <code>print(f"Gesamt: {len(bilder)} Bilder")</code>'
        ],
        stepsEn: [
          'Create a list: <code>images = ["hero.jpg", "about.jpg", "contact.jpg", "team.jpg"]</code>',
          'Output the <strong>first file</strong>: <code>print(images[0])</code> — Python starts at 0, not 1!',
          'Use <code>enumerate(images)</code> for index + value: <code>for i, image in enumerate(images):</code>',
          'Output formatted: <code>print(f"{i+1}. {image}")</code> — i+1 for human-readable numbering',
          'Use <code>len(images)</code> for the total count: <code>print(f"Total: {len(images)} images")</code>'
        ],
        successCriteria: `Du hast eine Liste erstellt, auf einzelne Elemente per Index zugegriffen, enumerate() für Index + Wert genutzt und len() für die Gesamtzahl verwendet.`,
        successCriteriaEn: `You created a list, accessed individual elements by index, used enumerate() for index + value, and used len() for the total count.`,
        mistakes: [
          '<strong>Index bei 1 statt 0 starten</strong> — Python beginnt die Zählung bei 0, nicht bei 1. <code>bilder[1]</code> gibt das <strong>zweite</strong> Element zurück',
          '<strong>Vergessene Klammern</strong> bei print oder eckige Klammern beim Index-Zugriff: <code>print bilder[0]</code> ist in Python 3 ungültig',
          'Die <strong>Liste ohne Anführungszeichen</strong> erstellen: <code>[hero.jpg]</code> sucht nach Variablen namens hero und jpg',
          '<code>enumerate</code> falsch schreiben oder ohne Klammern nutzen — es ist eine Funktion: <code>enumerate(bilder)</code>'
        ],
        mistakesEn: [
          '<strong>Starting index at 1 instead of 0</strong> — Python starts counting at 0, not 1. <code>images[1]</code> returns the <strong>second</strong> element',
          '<strong>Forgotten parentheses</strong> in print or square brackets in index access: <code>print images[0]</code> is invalid in Python 3',
          'Creating the <strong>list without quotes</strong>: <code>[hero.jpg]</code> looks for variables named hero and jpg',
          'Misspelling <code>enumerate</code> or using it without parentheses — it is a function: <code>enumerate(images)</code>'
        ],
        documentation: {
          intro: 'Dein Lehrer möchte deine Arbeit sehen. Speichere Screenshots deiner Lösung im Ordner <strong>lösungen</strong> auf deinem OneDrive und gib den Freigabelink in Moodle ab.',
          introEn: 'Your teacher wants to see your work. Save screenshots of your solution in the <strong>solutions</strong> folder on your OneDrive and submit the share link in Moodle.',
          steps: [
            'Erstelle einen Ordner <strong>lösungen</strong> in deinem OneDrive',
            'Mache Screenshots von deinem Code: in VS Code: und dem Ergebnis im Terminal',
            'Speichere die Screenshots im Ordner',
            'Erstelle einen Freigabelink für den Ordner',
            'Reiche den Link in Moodle als Textabgabe ein'
          ],
          stepsEn: [
            'Create a folder <strong>solutions</strong> in your OneDrive',
            'Take screenshots of your code in VS Code: and the result in the terminal',
            'Save the screenshots in the folder',
            'Create a share link for the folder',
            'Submit the link in Moodle as a text assignment'
          ]
        },
        w3schoolsLink: 'https://www.w3schools.com/python/python_lists.asp',
        w3schoolsLabel: 'Python Listen auf W3Schools',
        w3schoolsLabelEn: 'Python Lists on W3Schools',
        reflectionQuestion: 'Was ist der Unterschied zwischen Python-Listen und JavaScript-Arrays? Was kann eine Python-Liste, die ein JS-Array nicht kann? Nenne ein konkretes Beispiel.',
        reflectionQuestionEn: 'What is the difference between Python lists and JavaScript arrays? What can a Python list do that a JS array cannot? Give a concrete example.',
        classicLink: '../../../python-classic/src/pages/kapitel/06-listen.html'
      },
      {
        id: 'q3-2',
        title: 'Farb-Palette',
        titleEn: 'Color Palette',
        description: 'Erstelle ein Dictionary mit Farbcodes und greife strukturiert auf Werte zu — das Herzstück jedes Design-Systems.',
        descriptionEn: 'Create a dictionary with color codes and access values in a structured way — the heart of every design system.',
        image: '../assets/images/quests/quest-q3-2.webp',
        xp: 70,
        type: 'code',
        estimatedTime: '10 Min.',
        codeTemplate: `# Farbpalette als Dictionary
farben = {
    "primary": "#306998",
    "accent": "#FFD43B",
    "text": "#1e293b"
}

# TODO: Greife auf eine einzelne Farbe zu
print(f"Primärfarbe: {farben['primary']}")

# TODO: Gib alle Farben aus
for name, code in farben.items():
    print(f"{name}: {code}")

# TODO: Füge eine neue Farbe hinzu
farben["secondary"] = "#e74c3c"
print(f"Neue Farbe: {farben['secondary']}")`,
        validator: (output) => output.includes('#306998') && output.includes('#FFD43B'),
        hint: 'Nutze .items() für Schlüssel-Wert-Paare. Greife mit farben["key"] auf einzelne Werte zu.',
        hintEn: 'Use .items() for key-value pairs. Access individual values with colors["key"].',
        proTip: 'Dictionaries sind Pythons Antwort auf JSON. In JavaScript nutzt du JSON.parse() und JSON.stringify(). In Python sind Dictionaries nativ — kein Parsing nötig. Das macht Python zum König der API- und Datenverarbeitung.',
        proTipEn: 'Dictionaries are Python\'s answer to JSON. In JavaScript you use JSON.parse() and JSON.stringify(). In Python, dictionaries are native — no parsing needed. This makes Python the king of API and data processing.',
        commonMistakes: ['Vergessene Anführungszeichen bei Keys', '.items() vergessen', 'KeyError bei nicht existierendem Key'],
        commonMistakesEn: ['Forgotten quotation marks around keys', 'Forgotten .items()', 'KeyError for non-existent key'],
        mission: `Das Gedächtnis erweitert sich. Der Copilot braucht jetzt ein <strong>Farbgedächtnis</strong> — ein System, das Farben mit Namen verknüpft. Jedes Design-System, jede Corporate Identity, jede Webseite hat eine solche Palette. Heute baust du das Fundament dafür.`,
        missionEn: `The memory is expanding. The Copilot now needs a <strong>color memory</strong> — a system that links colors with names. Every design system, every corporate identity, every website has such a palette. Today you build the foundation for it.`,
        whyImportant: `Dictionaries sind das Herzstück von JSON — und damit der Web-API-Kommunikation. Wenn du eine Webseite baust, kommen die Daten als JSON von einem Server. In JavaScript parst du das mit JSON.parse(), in Python ist es bereits ein Dictionary. Das spart Zeit und vermeidet Fehler. Jede Config-Datei, jedes Design-Token-System, jede API-Antwort nutzt Key-Value-Paare.`,
        whyImportantEn: `Dictionaries are the heart of JSON — and thus of web API communication. When you build a website, data comes as JSON from a server. In JavaScript you parse it with JSON.parse(), in Python it's already a dictionary. This saves time and avoids errors. Every config file, every design token system, every API response uses key-value pairs.`,
        steps: [
          'Erstelle ein Dictionary: <code>farben = {"primary": "#306998", "accent": "#FFD43B"}</code>',
          'Greife auf einen Wert zu: <code>print(farben["primary"])</code> — Anführungszeichen beim Key nicht vergessen!',
          'Nutze <code>.items()</code> für Schlüssel-Wert-Paare: <code>for name, code in farben.items():</code>',
          'Gib formatiert aus: <code>print(f"{name}: {code}")</code>',
          'Füge eine neue Farbe hinzu: <code>farben["secondary"] = "#e74c3c"</code> — Dictionaries sind dynamisch!'
        ],
        stepsEn: [
          'Create a dictionary: <code>colors = {"primary": "#306998", "accent": "#FFD43B"}</code>',
          'Access a value: <code>print(colors["primary"])</code> — don\'t forget quotes around the key!',
          'Use <code>.items()</code> for key-value pairs: <code>for name, code in colors.items():</code>',
          'Output formatted: <code>print(f"{name}: {code}")</code>',
          'Add a new color: <code>colors["secondary"] = "#e74c3c"</code> — dictionaries are dynamic!'
        ],
        successCriteria: `Du hast ein Dictionary erstellt, auf einzelne Werte zugegriffen, .items() für die Iteration genutzt und eine neue Farbe dynamisch hinzugefügt.`,
        successCriteriaEn: `You created a dictionary, accessed individual values, used .items() for iteration, and dynamically added a new color.`,
        mistakes: [
          '<strong>Anführungszeichen beim Key vergessen</strong>: <code>farben[primary]</code> sucht nach einer Variable namens primary, nicht nach dem String "primary"',
          '<strong>.items() vergessen</strong>: <code>for name, code in farben:</code> iteriert nur über die Keys, nicht über die Werte',
          '<strong>KeyError</strong> bei nicht existierendem Key: <code>farben["background"]</code> crasht, wenn der Key nicht existiert. Nutze <code>.get()</code> als sichere Alternative',
          'Geschweifte Klammern <code>{}</code> mit JS-Objekt-Syntax verwechseln — in Python sind es Dictionaries, keine Objekte'
        ],
        mistakesEn: [
          '<strong>Forgetting quotes around the key</strong>: <code>colors[primary]</code> looks for a variable named primary, not the string "primary"',
          '<strong>Forgetting .items()</strong>: <code>for name, code in colors:</code> only iterates over keys, not values',
          '<strong>KeyError</strong> for non-existent key: <code>colors["background"]</code> crashes if the key doesn\'t exist. Use <code>.get()</code> as a safe alternative',
          'Confusing curly braces <code>{}</code> with JS object syntax — in Python these are dictionaries, not objects'
        ],
        documentation: {
          intro: 'Dein Lehrer möchte deine Arbeit sehen. Speichere Screenshots deiner Lösung im Ordner <strong>lösungen</strong> auf deinem OneDrive und gib den Freigabelink in Moodle ab.',
          introEn: 'Your teacher wants to see your work. Save screenshots of your solution in the <strong>solutions</strong> folder on your OneDrive and submit the share link in Moodle.',
          steps: [
            'Erstelle einen Ordner <strong>lösungen</strong> in deinem OneDrive',
            'Mache Screenshots von deinem Code: in VS Code: und dem Ergebnis im Terminal',
            'Speichere die Screenshots im Ordner',
            'Erstelle einen Freigabelink für den Ordner',
            'Reiche den Link in Moodle als Textabgabe ein'
          ],
          stepsEn: [
            'Create a folder <strong>solutions</strong> in your OneDrive',
            'Take screenshots of your code in VS Code: and the result in the terminal',
            'Save the screenshots in the folder',
            'Create a share link for the folder',
            'Submit the link in Moodle as a text assignment'
          ]
        },
        w3schoolsLink: 'https://www.w3schools.com/python/python_dictionaries.asp',
        w3schoolsLabel: 'Python Dictionaries auf W3Schools',
        w3schoolsLabelEn: 'Python Dictionaries on W3Schools',
        reflectionQuestion: 'Warum sind Dictionaries in Python mächtiger als JavaScript-Objekte? Was kann ein Python-Dict, das ein JS-Objekt nicht kann? Denke an Methoden, Typisierung und JSON-Handling.',
        reflectionQuestionEn: 'Why are dictionaries in Python more powerful than JavaScript objects? What can a Python dict do that a JS object cannot? Think about methods, typing, and JSON handling.',
        classicLink: '../../../python-classic/src/pages/kapitel/07-dictionaries.html'
      },
      {
        id: 'q3-3',
        title: 'Der Daten-Morph',
        titleEn: 'The Data Morph',
        description: 'Reflektiere über die fundamentalen Unterschiede zwischen JavaScript-Arrays/Objects und Python-Listen/Dictionaries — die DNA der Datenstrukturen.',
        descriptionEn: 'Reflect on the fundamental differences between JavaScript arrays/objects and Python lists/dictionaries — the DNA of data structures.',
        image: '../assets/images/quests/quest-q3-3.webp',
        xp: 30,
        type: 'reflection',
        estimatedTime: '10 Min.',
        promptTemplate: `Vergleiche JavaScript Array/Objekt mit Python Liste/Dictionary. Was sind die 3 größten Unterschiede in Syntax, Methoden und Verhalten? Gib ein konkretes Beispiel aus deiner bisherigen Erfahrung mit JavaScript.`,
        promptTemplateEn: `Compare JavaScript Array/Object with Python List/Dictionary. What are the 3 biggest differences in syntax, methods, and behavior? Give a concrete example from your previous experience with JavaScript.`,
        hint: 'Denke an Mutability, Methoden und Syntax. Teste in der Sandbox: Erstelle eine Python-Liste und ein Dictionary. Was fällt dir im Vergleich zu JS auf?',
        hintEn: 'Think about mutability, methods, and syntax. Test in the sandbox: Create a Python list and a dictionary. What do you notice compared to JS?',
        proTip: 'In Python sind Listen und Dictionaries sogenannte "first-class citizens" — sie sind so mächtig wie primitive Typen. Du kannst sie in Funktionen übergeben, als Rückgabewerte nutzen und sogar ineinander verschachteln (z.B. eine Liste von Dictionaries). Das macht Python so elegant für Datenverarbeitung.',
        proTipEn: 'In Python, lists and dictionaries are so-called "first-class citizens" — they are as powerful as primitive types. You can pass them into functions, use them as return values, and even nest them (e.g., a list of dictionaries). This makes Python so elegant for data processing.',
        mission: `Du stehst vor der <strong>Daten-Morphing-Station</strong>. JavaScript und Python sprechen unterschiedliche Dialekte, wenn es um Datenstrukturen geht. Ein JS-Array ist nicht gleich einer Python-Liste. Ein JS-Objekt ist nicht gleich einem Python-Dictionary. Deine Aufgabe: Verstehe die DNA jeder Datenstruktur — denn wer die Werkzeuge versteht, baut bessere Software.`,
        missionEn: `You stand before the <strong>Data Morphing Station</strong>. JavaScript and Python speak different dialects when it comes to data structures. A JS array is not the same as a Python list. A JS object is not the same as a Python dictionary. Your task: understand the DNA of each data structure — because those who understand the tools build better software.`,
        whyImportant: `Datenstrukturen sind das Fundament jeder Software. Die Wahl der richtigen Datenstruktur entscheidet über Performance, Lesbarkeit und Wartbarkeit. Ein Frontend-Entwickler denkt in Arrays und Objekten, ein Data-Scientist in Listen und Dictionaries. Wer beide Welten versteht, kann gezielt die richtige Sprache für die richtige Aufgabe wählen — und Daten zwischen Frontend und Backend nahtlos austauschen.`,
        whyImportantEn: `Data structures are the foundation of every software. Choosing the right data structure determines performance, readability, and maintainability. A frontend developer thinks in arrays and objects, a data scientist in lists and dictionaries. Those who understand both worlds can specifically choose the right language for the right task — and seamlessly exchange data between frontend and backend.`,
        steps: [
          'Recherchiere: Was ist der Unterschied zwischen JS <code>Array</code> und Python <code>list</code>? Teste in der Sandbox: <code>liste = [1, 2, 3]</code>',
          'Recherchiere: Was ist der Unterschied zwischen JS <code>Object</code> und Python <code>dict</code>? Teste: <code>person = {"name": "Anna", "alter": 17}</code>',
          'Notiere 3 Unterschiede: <strong>Syntax</strong> (z.B. Klammern), <strong>Methoden</strong> (z.B. .push() vs .append()), <strong>Mutability</strong>',
          'Teste in der Sandbox: Was passiert bei <code>liste.append(4)</code>? Was wäre das JS-Äquivalent?',
          'Überlege: Wann würdest du JS, wann Python für Datenverarbeitung bevorzugen?'
        ],
        stepsEn: [
          'Research: What is the difference between JS <code>Array</code> and Python <code>list</code>? Test in the sandbox: <code>my_list = [1, 2, 3]</code>',
          'Research: What is the difference between JS <code>Object</code> and Python <code>dict</code>? Test: <code>person = {"name": "Anna", "age": 17}</code>',
          'Note 3 differences: <strong>Syntax</strong> (e.g., brackets), <strong>Methods</strong> (e.g., .push() vs .append()), <strong>Mutability</strong>',
          'Test in the sandbox: What happens with <code>my_list.append(4)</code>? What would be the JS equivalent?',
          'Consider: When would you prefer JS, when Python for data processing?'
        ],
        successCriteria: `Du hast 3 Unterschiede zwischen JS und Python-Datenstrukturen benannt, die Syntax-Unterschiede verstanden und kannst Anwendungsfälle abwägen.`,
        successCriteriaEn: `You named 3 differences between JS and Python data structures, understood the syntax differences, and can weigh use cases.`,
        mistakes: [
          'Denken, dass Python-Listen und JS-Arrays <strong>identisch</strong> sind — sie sind ähnlich, aber die Methoden unterscheiden sich (.append() vs .push(), .items() vs Object.entries())',
          'Übersehen, dass Python-Dictionaries <strong>geordnet</strong> sind (ab Python 3.7) — JS-Objekte hatten lange Zeit keine garantierte Reihenfolge',
          'Mutability übersehen: Python-Listen sind mutable, aber es gibt auch <strong>immutable</strong> Alternativen wie Tupel <code>(1, 2, 3)</code>',
          'JSON als Python-Dict verwechseln — <strong>JSON ist ein String-Format</strong>, Dict ist ein Python-Typ. In JS brauchst du JSON.parse(), in Python ist der Dict bereits nativ'
        ],
        mistakesEn: [
          'Thinking that Python lists and JS arrays are <strong>identical</strong> — they are similar, but methods differ (.append() vs .push(), .items() vs Object.entries())',
          'Overlooking that Python dictionaries are <strong>ordered</strong> (since Python 3.7) — JS objects did not guarantee order for a long time',
          'Overlooking mutability: Python lists are mutable, but there are also <strong>immutable</strong> alternatives like tuples <code>(1, 2, 3)</code>',
          'Confusing JSON with Python dict — <strong>JSON is a string format</strong>, dict is a Python type. In JS you need JSON.parse(), in Python the dict is already native'
        ],
        documentation: {
          intro: 'Dein Lehrer möchte deine Arbeit sehen. Speichere Screenshots deiner Recherche und Erklärung im Ordner <strong>lösungen</strong> auf deinem OneDrive und gib den Freigabelink in Moodle ab.',
          introEn: 'Your teacher wants to see your work. Save screenshots of your research and explanation in the <strong>solutions</strong> folder on your OneDrive and submit the share link in Moodle.',
          steps: [
            'Erstelle einen Ordner <strong>lösungen</strong> in deinem OneDrive',
            'Mache Screenshots deiner Recherche (z.B. W3Schools, Tests in der Sandbox)',
            'Speichere die Screenshots im Ordner',
            'Erstelle einen Freigabelink für den Ordner',
            'Reiche den Link in Moodle als Textabgabe ein'
          ],
          stepsEn: [
            'Create a folder <strong>solutions</strong> in your OneDrive',
            'Take screenshots of your research (e.g., W3Schools, tests in the sandbox)',
            'Save the screenshots in the folder',
            'Create a share link for the folder',
            'Submit the link in Moodle as a text assignment'
          ]
        },
        w3schoolsLink: 'https://www.w3schools.com/python/python_dictionaries.asp',
        w3schoolsLabel: 'Python Dictionaries auf W3Schools',
        w3schoolsLabelEn: 'Python Dictionaries on W3Schools',
        reflectionQuestion: 'Wenn du ein komplexes Datenmodell für ein Webprojekt erstellen müsstest — würdest du JavaScript-Objekte oder Python-Dictionaries bevorzugen? Begründe deine Antwort mit konkreten Vor- und Nachteilen.',
        reflectionQuestionEn: 'If you had to create a complex data model for a web project — would you prefer JavaScript objects or Python dictionaries? Justify your answer with concrete pros and cons.'
      }
    ]
  },
  {
    id: 'welt-4',
    number: 4,
    title: 'Die Schmiede',
    titleEn: 'The Forge',
    subtitle: 'Funktionen & Module',
    subtitleEn: 'Functions & Modules',
    description: 'Baue wiederverwendbare Werkzeuge. Der Copilot lernt, Werkzeuge zu schmieden.',
    descriptionEn: 'Build reusable tools. The Copilot learns to forge tools.',
    skills: ['Funktionen', 'Module', 'import'],
    skillsEn: ['Functions', 'Modules', 'import'],
    image: '../assets/images/worlds/welt-4.jpg',
    color: '#9B59B6',
    glow: '0 0 30px rgba(155,89,182,0.3)',
    xp: 300,
    unlocked: false,
    quests: [
      {
        id: 'q4-1',
        title: 'Bild-Resizer',
        titleEn: 'Image Resizer',
        description: 'Schreibe eine Funktion, die Bilder proportional skaliert — das Kernwerkzeug jedes Bild-Upload-Systems.',
        descriptionEn: 'Write a function that scales images proportionally — the core tool of every image upload system.',
        image: '../assets/images/quests/quest-q4-1.webp',
        xp: 80,
        type: 'code',
        estimatedTime: '10 Min.',
        codeTemplate: `# Bild-Resizer Funktion
def resize_image(breite, hoehe, max_breite):
    # TODO: Berechne das Seitenverhältnis
    verhaeltnis = hoehe / breite
    
    # TODO: Berechne neue Dimensionen
    neue_breite = max_breite
    neue_hoehe = int(neue_breite * verhaeltnis)
    
    return neue_breite, neue_hoehe

# Teste mit verschiedenen Bildgrößen
print(resize_image(1920, 1080, 800))
print(resize_image(4000, 3000, 1200))`,
        validator: (output) => output.includes('800') && output.includes('450'),
        hint: 'Neue Höhe = max_breite * (hoehe / breite). Runde mit int(). Python kann mehrere Werte mit return zurückgeben — das ist ein Tuple!',
        hintEn: 'New height = max_width * (height / width). Round with int(). Python can return multiple values with return — that\'s a tuple!',
        proTip: 'Python kann mehrere Werte gleichzeitig zurückgeben: return breite, hoehe. Das ergibt ein Tuple. In JavaScript brauchst du dafür ein Array oder Objekt: return {width, height}.',
        proTipEn: 'Python can return multiple values at once: return width, height. This creates a tuple. In JavaScript you need an array or object for this: return {width, height}.',
        commonMistakes: ['Vergessener Doppelpunkt nach def', 'Falsche Einrückung', 'return vergessen'],
        commonMistakesEn: ['Forgotten colon after def', 'Wrong indentation', 'Forgotten return'],
        mission: `Du betrittst <strong>Die Schmiede</strong> — den Ort, an dem aus Rohcode professionelle Werkzeuge werden. Der KI-Copilot braucht einen Bild-Resizer: ein Werkzeug, das jedes Bild proportional skaliert, egal ob 4K-Foto oder Instagram-Story. Das ist keine Übung — das ist die Basis jedes Bild-Upload-Systems, das du je benutzt hast.`,
        missionEn: `You enter <strong>The Forge</strong> — the place where raw code becomes professional tools. The AI Copilot needs an image resizer: a tool that scales every image proportionally, whether it's a 4K photo or an Instagram story. This is not an exercise — this is the foundation of every image upload system you've ever used.`,
        whyImportant: `Funktionen sind das Prinzip der Wiederverwendung. Ohne Funktionen würdest du denselben Code immer wieder schreiben. In der Praxis nutzt du den Bild-Resizer in jedem CMS, jeder Bilddatenbank und jedem E-Commerce-System. Der Unterschied zu JavaScript: Python kann mehrere Werte gleichzeitig zurückgeben (Tuple), was den Code eleganter macht.`,
        whyImportantEn: `Functions are the principle of reusability. Without functions, you would write the same code over and over again. In practice, you use the image resizer in every CMS, image database, and e-commerce system. The difference to JavaScript: Python can return multiple values simultaneously (tuple), which makes the code more elegant.`,
        steps: [
          'Definiere die Funktion: <code>def resize_image(breite, hoehe, max_breite):</code> mit Doppelpunkt!',
          'Berechne das Verhältnis: <code>verhaeltnis = hoehe / breite</code>',
          'Berechne die neue Höhe: <code>neue_hoehe = int(max_breite * verhaeltnis)</code>',
          'Gib beide Werte zurück: <code>return max_breite, neue_hoehe</code> — das ist ein Tuple!',
          'Teste die Funktion: <code>print(resize_image(1920, 1080, 800))</code> — Erwartet: <code>(800, 450)</code>'
        ],
        stepsEn: [
          'Define the function: <code>def resize_image(width, height, max_width):</code> with colon!',
          'Calculate the ratio: <code>ratio = height / width</code>',
          'Calculate the new height: <code>new_height = int(max_width * ratio)</code>',
          'Return both values: <code>return max_width, new_height</code> — this is a tuple!',
          'Test the function: <code>print(resize_image(1920, 1080, 800))</code> — Expected: <code>(800, 450)</code>'
        ],
        successCriteria: `Du hast eine Funktion mit drei Parametern definiert, das Seitenverhältnis berechnet, ein Tuple zurückgegeben und die Funktion korrekt aufgerufen.`,
        successCriteriaEn: `You defined a function with three parameters, calculated the aspect ratio, returned a tuple, and called the function correctly.`,
        mistakes: [
          'Den <strong>Doppelpunkt nach def vergessen</strong> — ohne : weiß Python nicht, wo der Funktionskörper beginnt',
          '<strong>Falsche Einrückung</strong> des Funktionskörpers — alles innerhalb der Funktion muss eingerückt sein',
          '<strong>return vergessen</strong> — ohne return gibt die Funktion automatisch <code>None</code> zurück',
          'Klammern beim Aufruf vergessen: <code>resize_image</code> gibt das Funktionsobjekt zurück, <code>resize_image(1920, 1080, 800)</code> ruft es auf'
        ],
        mistakesEn: [
          'Forgetting the <strong>colon after def</strong> — without :, Python doesn\'t know where the function body begins',
          '<strong>Wrong indentation</strong> of the function body — everything inside the function must be indented',
          '<strong>Forgetting return</strong> — without return, the function automatically returns <code>None</code>',
          'Forgetting parentheses when calling: <code>resize_image</code> returns the function object, <code>resize_image(1920, 1080, 800)</code> calls it'
        ],
        documentation: {
          intro: 'Dein Lehrer möchte deine Arbeit sehen. Speichere Screenshots deiner Lösung im Ordner <strong>lösungen</strong> auf deinem OneDrive und gib den Freigabelink in Moodle ab.',
          introEn: 'Your teacher wants to see your work. Save screenshots of your solution in the <strong>solutions</strong> folder on your OneDrive and submit the share link in Moodle.',
          steps: [
            'Erstelle einen Ordner <strong>lösungen</strong> in deinem OneDrive',
            'Mache Screenshots von deinem Code: in VS Code: und dem Ergebnis im Terminal',
            'Speichere die Screenshots im Ordner',
            'Erstelle einen Freigabelink für den Ordner',
            'Reiche den Link in Moodle als Textabgabe ein'
          ],
          stepsEn: [
            'Create a folder <strong>solutions</strong> in your OneDrive',
            'Take screenshots of your code in VS Code: and the result in the terminal',
            'Save the screenshots in the folder',
            'Create a share link for the folder',
            'Submit the link in Moodle as a text assignment'
          ]
        },
        w3schoolsLink: 'https://www.w3schools.com/python/python_functions.asp',
        w3schoolsLabel: 'Python Funktionen auf W3Schools',
        w3schoolsLabelEn: 'Python Functions on W3Schools',
        reflectionQuestion: 'Was ist der größte Vorteil von Pythons Tuple-Return gegenüber JavaScript? Wann würdest du ein Tuple, wann ein Array nutzen? Begründe deine Antwort.',
        reflectionQuestionEn: 'What is the biggest advantage of Python\'s tuple return over JavaScript? When would you use a tuple, when an array? Justify your answer.',
        classicLink: '../../../python-classic/src/pages/kapitel/08-funktionen.html'
      },
      {
        id: 'q4-2',
        title: 'Modul-Baukasten',
        titleEn: 'Module Builder',
        description: 'Importiere professionelle Module und nutze sie für Design-Berechnungen — so arbeiten echte Entwickler.',
        descriptionEn: 'Import professional modules and use them for design calculations — this is how real developers work.',
        image: '../assets/images/quests/quest-q4-2.webp',
        xp: 80,
        type: 'code',
        estimatedTime: '10 Min.',
        codeTemplate: `# Importiere das math-Modul
import math

# TODO: Berechne den goldenen Schnitt für 1000px
breite = 1000
goldener_schnitt = breite / 1.618
print(f"Goldener Schnitt: {goldener_schnitt:.1f}px")

# TODO: Berechne die Diagonale eines 16:9-Bildes (1920x1080)
breite = 1920
hoehe = 1080
diagonale = math.sqrt(breite**2 + hoehe**2)
print(f"Diagonale: {diagonale:.0f}px")

# TODO: Nutze math.pi für einen Kreis mit Radius 100
radius = 100
flaeche = math.pi * radius**2
print(f"Kreisfläche: {flaeche:.0f}px²")`,
        validator: (output) => output.includes('618') || output.includes('619') && output.includes('2203') || output.includes('31416'),
        hint: 'Nutze math.sqrt() für Quadratwurzeln und math.pi für die Kreisfläche. Python ist case-sensitive: math, nicht Math!',
        hintEn: 'Use math.sqrt() for square roots and math.pi for the circle area. Python is case-sensitive: math, not Math!',
        proTip: 'In JavaScript nutzt du import/export mit ES6-Modulen. In Python ist es einfacher: eine Datei = ein Modul. Du kannst sogar nur bestimmte Funktionen importieren: from math import sqrt, pi',
        proTipEn: 'In JavaScript you use import/export with ES6 modules. In Python it\'s simpler: one file = one module. You can even import only specific functions: from math import sqrt, pi',
        commonMistakes: ['Import-Statement falsch', 'Vergessene Klammern bei Funktionen', 'Modul nicht genutzt'],
        mission: `Die Schmiede ist in Betrieb. Statt jedes Werkzeug von Hand zu schmieden, greifst du jetzt auf <strong>professionelle Module</strong> zurück — vorgefertigte Werkzeuge, die andere Entwickler geschaffen haben. Das math-Modul ist nur der Anfang. In der Praxis würdest du Pillow (Bilder), Pandas (Daten) oder Django (Web) importieren.`,
        missionEn: `The Forge is in operation. Instead of forging every tool by hand, you now access <strong>professional modules</strong> — prefabricated tools created by other developers. The math module is just the beginning. In practice, you would import Pillow (images), Pandas (data), or Django (web).`,
        whyImportant: `Module sind das Prinzip der Wiederverwendung auf höchster Ebene. Statt jede mathematische Funktion selbst zu schreiben, importierst du math. Statt Bildverarbeitung von Null zu beginnen, importierst du Pillow. Das ist der Unterschied zwischen Hobby- und professioneller Entwicklung. In JavaScript nutzt du npm install, in Python nutzt du pip install — aber das Prinzip ist identisch: Stehe auf den Schultern von Giganten.`,
        whyImportantEn: `Modules are the principle of reusability at the highest level. Instead of writing every mathematical function yourself, you import math. Instead of starting image processing from scratch, you import Pillow. This is the difference between hobby and professional development. In JavaScript you use npm install, in Python you use pip install — but the principle is identical: stand on the shoulders of giants.`,
        steps: [
          'Importiere math: <code>import math</code> — achte auf Kleinbuchstaben, Python ist case-sensitive!',
          'Berechne den goldenen Schnitt: <code>breite / 1.618</code>',
          'Nutze <code>math.sqrt()</code> für die Diagonale: <code>math.sqrt(breite**2 + hoehe**2)</code>',
          'Nutze <code>math.pi</code> für die Kreisfläche: <code>math.pi * radius**2</code>',
          'Experimentiere: Was macht <code>math.floor()</code> oder <code>math.ceil()</code>?'        ],
        stepsEn: [
          'Import math: <code>import math</code> — watch out for lowercase, Python is case-sensitive!',
          'Calculate the golden ratio: <code>width / 1.618</code>',
          'Use <code>math.sqrt()</code> for the diagonal: <code>math.sqrt(width**2 + height**2)</code>',
          'Use <code>math.pi</code> for the circle area: <code>math.pi * radius**2</code>',
          'Experiment: What does <code>math.floor()</code> or <code>math.ceil()</code> do?'
        ],
        successCriteria: `Du hast das math-Modul importiert, sqrt() und pi genutzt und verstehst den Unterschied zwischen eigenem Code und importierten Modulen.`,
        successCriteriaEn: `You imported the math module, used sqrt() and pi, and understand the difference between your own code and imported modules.`,
        mistakes: [
          '<code>import Math</code> statt <code>import math</code> schreiben — Python ist <strong>case-sensitive</strong>!',
          'Vergessene Klammern bei Funktionen: <code>math.sqrt 2</code> statt <code>math.sqrt(2)</code>',
          'Das Modul importieren, aber <strong>nicht nutzen</strong> — stattdessen manuell rechnen',
          'Import innerhalb einer Schleife oder Funktion — das funktioniert, ist aber <strong>langsam und schlechter Stil</strong>. Imports gehören an den Dateianfang'
        ],
        mistakesEn: [
          'Writing <code>import Math</code> instead of <code>import math</code> — Python is <strong>case-sensitive</strong>!',
          'Forgotten parentheses in functions: <code>math.sqrt 2</code> instead of <code>math.sqrt(2)</code>',
          'Importing the module but <strong>not using it</strong> — calculating manually instead',
          'Import inside a loop or function — this works but is <strong>slow and bad style</strong>. Imports belong at the top of the file'
        ],
        documentation: {
          intro: 'Dein Lehrer möchte deine Arbeit sehen. Speichere Screenshots deiner Lösung im Ordner <strong>lösungen</strong> auf deinem OneDrive und gib den Freigabelink in Moodle ab.',
          introEn: 'Your teacher wants to see your work. Save screenshots of your solution in the <strong>solutions</strong> folder on your OneDrive and submit the share link in Moodle.',
          steps: [
            'Erstelle einen Ordner <strong>lösungen</strong> in deinem OneDrive',
            'Mache Screenshots von deinem Code: in VS Code: und dem Ergebnis im Terminal',
            'Speichere die Screenshots im Ordner',
            'Erstelle einen Freigabelink für den Ordner',
            'Reiche den Link in Moodle als Textabgabe ein'
          ],
          stepsEn: [
            'Create a folder <strong>solutions</strong> in your OneDrive',
            'Take screenshots of your code in VS Code: and the result in the terminal',
            'Save the screenshots in the folder',
            'Create a share link for the folder',
            'Submit the link in Moodle as a text assignment'
          ]
        },
        w3schoolsLink: 'https://www.w3schools.com/python/python_modules.asp',
        w3schoolsLabel: 'Python Module auf W3Schools',
        w3schoolsLabelEn: 'Python Modules on W3Schools',
        reflectionQuestion: 'Was ist einfacher — JavaScripts ES6-Module (import/export) oder Pythons import? Wo sind die Stärken und Schwächen jeder Sprache beim Modul-Handling?',
        reflectionQuestionEn: 'What is easier — JavaScript\'s ES6 modules (import/export) or Python\'s import? What are the strengths and weaknesses of each language in module handling?',
        classicLink: '../../../python-classic/src/pages/kapitel/09-module.html'
      },
      {
        id: 'q4-3',
        title: 'Der Funktions-Morph',
        titleEn: 'The Function Morph',
        description: 'Reflektiere über die philosophischen Unterschiede zwischen JavaScript-function und Python-def — zwei Welten, ein Konzept.',
        descriptionEn: 'Reflect on the philosophical differences between JavaScript function and Python def — two worlds, one concept.',
        image: '../assets/images/quests/quest-q4-3.webp',
        xp: 40,
        type: 'reflection',
        estimatedTime: '10 Min.',
        promptTemplate: `Vergleiche "function name() {}" in JavaScript mit "def name():" in Python. Was sind die 3 größten Unterschiede in Syntax, Flexibilität und Lesbarkeit? Gib ein konkretes Beispiel aus deiner Erfahrung.`,
        promptTemplateEn: `Compare "function name() {}" in JavaScript with "def name():" in Python. What are the 3 biggest differences in syntax, flexibility, and readability? Give a concrete example from your experience.`,
        hint: 'Denke an Klammern, Einrückung und Default-Parameter. Teste in Python: def greet(name="Welt"): — wie würde das in JavaScript aussehen?',
        hintEn: 'Think about braces, indentation, and default parameters. Test in Python: def greet(name="World"): — how would that look in JavaScript?',
        proTip: 'Pythons Default-Parameter sind eleganter als JS-Default-Values in ES6. In Python: def greet(name="Welt"). In JS: function greet(name = "Welt"). Sieht ähnlich aus, aber Python erlaubt auch mutable Defaults — mit Vorsicht zu genießen!',
        proTipEn: 'Python\'s default parameters are more elegant than JS default values in ES6. In Python: def greet(name="World"). In JS: function greet(name = "World"). Looks similar, but Python also allows mutable defaults — use with caution!',
        mission: `Du stehst vor der <strong>Funktions-Morphing-Station</strong>. JavaScript und Python sprechen unterschiedliche Dialekte, wenn es um Funktionen geht. JS ist flexibel (arrow functions, callbacks, async), Python ist explizit und lesbar (def, Einrückung). Deine Aufgabe: Verstehe die Philosophie hinter jeder Syntax — denn die Werkzeuge prägen das Denken.`,
        missionEn: `You stand before the <strong>Function Morphing Station</strong>. JavaScript and Python speak different dialects when it comes to functions. JS is flexible (arrow functions, callbacks, async), Python is explicit and readable (def, indentation). Your task: understand the philosophy behind each syntax — because tools shape thinking.`,
        whyImportant: `Funktionen sind das Rückgrat jeder Programmiersprache. Die Unterschiede zwischen JS und Python zeigen die DNA jeder Sprache: JavaScript wurde für Browser-Interaktivität gebaut und braucht deshalb Flexibilität (Callbacks, Closures, Async). Python wurde für Lesbarkeit und Datenverarbeitung gebaut und setzt auf Explizitheit. Wer beide Ansätze versteht, wählt gezielt das richtige Werkzeug.`,
        whyImportantEn: `Functions are the backbone of every programming language. The differences between JS and Python show the DNA of each language: JavaScript was built for browser interactivity and therefore needs flexibility (callbacks, closures, async). Python was built for readability and data processing and values explicitness. Those who understand both approaches choose the right tool specifically.`,
        steps: [
          'Recherchiere: Wie definiert man Funktionen in JavaScript? (function, arrow, const)',
          'Recherchiere: Wie definiert man Funktionen in Python? (def, lambda)',
          'Vergleiche: Klammern <code>{}</code> vs Doppelpunkt <code>:</code>, geschweifte Klammern vs Einrückung',
          'Teste Default-Parameter in Python: <code>def greet(name="Welt"):</code> — wie wäre das in JS?',
          'Recherchiere: Was sind <code>*args</code> und <code>**kwargs</code> in Python? Gibt es das in JS so elegant?'
        ],
        stepsEn: [
          'Research: How do you define functions in JavaScript? (function, arrow, const)',
          'Research: How do you define functions in Python? (def, lambda)',
          'Compare: braces <code>{}</code> vs colon <code>:</code>, curly braces vs indentation',
          'Test default parameters in Python: <code>def greet(name="World"):</code> — how would that be in JS?',
          'Research: What are <code>*args</code> and <code>**kwargs</code> in Python? Is there something as elegant in JS?'
        ],
        successCriteria: `Du hast 3 Unterschiede zwischen JS- und Python-Funktionen benannt, Default-Parameter verstanden und kannst Vor- und Nachteile abwägen.`,
        successCriteriaEn: `You named 3 differences between JS and Python functions, understood default parameters, and can weigh pros and cons.`,
        mistakes: [
          'Denken, dass JS- und Python-Funktionen <strong>identisch</strong> sind — die Philosophie ist grundverschieden',
          'Übersehen, dass Python-Default-Parameter zur <strong>Definitionszeit</strong> ausgewertet werden (mutable Default Trap)',
          'Klammern in Python verwenden: <code>def func() { ... }</code> statt <code>def func(): ...</code>',
          'Vergessen, dass Python <strong>keine Arrow-Funktionen</strong> hat — lambda ist eingeschränkt auf einen Ausdruck'
        ],
        mistakesEn: [
          'Thinking that JS and Python functions are <strong>identical</strong> — the philosophy is fundamentally different',
          'Overlooking that Python default parameters are evaluated at <strong>definition time</strong> (mutable default trap)',
          'Using braces in Python: <code>def func() { ... }</code> instead of <code>def func(): ...</code>',
          'Forgetting that Python has <strong>no arrow functions</strong> — lambda is limited to one expression'
        ],
        documentation: {
          intro: 'Dein Lehrer möchte deine Arbeit sehen. Speichere Screenshots deiner Recherche und Erklärung im Ordner <strong>lösungen</strong> auf deinem OneDrive und gib den Freigabelink in Moodle ab.',
          introEn: 'Your teacher wants to see your work. Save screenshots of your research and explanation in the <strong>solutions</strong> folder on your OneDrive and submit the share link in Moodle.',
          steps: [
            'Erstelle einen Ordner <strong>lösungen</strong> in deinem OneDrive',
            'Mache Screenshots deiner Recherche (z.B. W3Schools, Tests in der Sandbox)',
            'Speichere die Screenshots im Ordner',
            'Erstelle einen Freigabelink für den Ordner',
            'Reiche den Link in Moodle als Textabgabe ein'
          ],
          stepsEn: [
            'Create a folder <strong>solutions</strong> in your OneDrive',
            'Take screenshots of your research (e.g., W3Schools, tests in the sandbox)',
            'Save the screenshots in the folder',
            'Create a share link for the folder',
            'Submit the link in Moodle as a text assignment'
          ]
        },
        w3schoolsLink: 'https://www.w3schools.com/python/python_functions.asp',
        w3schoolsLabel: 'Python Funktionen auf W3Schools',
        w3schoolsLabelEn: 'Python Functions on W3Schools',
        reflectionQuestion: 'Wenn du ein großes Projekt mit vielen Funktionen planen müsstest — würdest du JavaScripts Flexibilität (Arrow Functions, Callbacks) oder Pythons Lesbarkeit (def, Einrückung) bevorzugen? Begründe deine Antwort.',
        reflectionQuestionEn: 'If you had to plan a large project with many functions — would you prefer JavaScript\'s flexibility (arrow functions, callbacks) or Python\'s readability (def, indentation)? Justify your answer.'
      }
    ]
  },
  {
    id: 'welt-5',
    number: 5,
    title: 'Die Cloud-Brücke',
    titleEn: 'The Cloud Bridge',
    subtitle: 'APIs & File I/O',
    subtitleEn: 'APIs & File I/O',
    description: 'Verbinde dich mit der Außenwelt. Der Copilot erreicht das Internet.',
    descriptionEn: 'Connect to the outside world. The Copilot reaches the Internet.',
    skills: ['File I/O', 'APIs', 'JSON'],
    skillsEn: ['File I/O', 'APIs', 'JSON'],
    image: '../assets/images/worlds/welt-5.jpg',
    color: '#E74C3C',
    glow: '0 0 30px rgba(231,76,60,0.3)',
    xp: 400,
    unlocked: false,
    quests: [
      {
        id: 'q5-1',
        title: 'API-Explorer',
        titleEn: 'API Explorer',
        description: 'Lerne, wie JSON-Daten verarbeitet werden — die Lingua Franca des Internets und die Brücke zwischen Frontend und Backend.',
        descriptionEn: 'Learn how JSON data is processed — the lingua franca of the internet and the bridge between frontend and backend.',
        image: '../assets/images/quests/quest-q5-1.webp',
        xp: 100,
        type: 'code',
        estimatedTime: '12 Min.',
        codeTemplate: `# Importiere das json-Modul
import json

# Simulierte API-Antwort (in echt kommt das von einem Server)
api_data = '{"user": "designer", "projects": 5, "skills": ["HTML", "CSS", "Python"]}'

# TODO: Wandle JSON-String in Python-Dictionary um
data = json.loads(api_data)

# TODO: Greife auf einzelne Werte zu
print(f"User: {data['user']}")
print(f"Projekte: {data['projects']}")

# TODO: Greife auf verschachtelte Daten zu (Liste in Dictionary)
print(f"Erste Skill: {data['skills'][0]}")

# TODO: Erstelle ein neues Dictionary und wandle es in JSON um
eigenes_projekt = {"name": "Portfolio", "sprache": "Python"}
json_string = json.dumps(eigenes_projekt)
print(f"Als JSON: {json_string}")`,
        validator: (output) => output.includes('designer') && output.includes('HTML') && output.includes('Portfolio'),
        hint: 'Nutze json.loads() um JSON-String in Dictionary zu wandeln. json.dumps() macht das Gegenteil: Dictionary → JSON-String.',
        hintEn: 'Use json.loads() to convert JSON string to dictionary. json.dumps() does the opposite: dictionary → JSON string.',
        proTip: 'In JavaScript nutzt du JSON.parse() und JSON.stringify(). In Python sind es json.loads() und json.dumps(). Die Namen sind anders, aber das Konzept identisch: JSON ist die Brücke zwischen allen Programmiersprachen, Datenbanken und APIs.',
        proTipEn: 'In JavaScript you use JSON.parse() and JSON.stringify(). In Python it\'s json.loads() and json.dumps(). The names are different, but the concept is identical: JSON is the bridge between all programming languages, databases, and APIs.',
        commonMistakes: ['json.loads vergessen', 'Falsche Anführungszeichen in JSON', 'Key nicht gefunden'],
        commonMistakesEn: ['Forgotten json.loads', 'Wrong quotation marks in JSON', 'Key not found'],
        mission: `Du betrittst <strong>Die Cloud-Brücke</strong> — den Übergang von lokalen Skripten zur vernetzten Welt. Der KI-Copilot erreicht das Internet. Jede moderne Webseite kommuniziert über APIs mit Servern. JSON ist die Sprache dieser Kommunikation. Heute lernst du, wie du diese Daten liest, verstehst und selbst erzeugst.`,
        missionEn: `You enter <strong>The Cloud Bridge</strong> — the transition from local scripts to the networked world. The AI Copilot reaches the internet. Every modern website communicates with servers via APIs. JSON is the language of this communication. Today you learn how to read, understand, and create this data.`,
        whyImportant: `APIs sind das Nervensystem des Internets. Jedes Mal, wenn du Wetterdaten abrufst, eine Karte lädst, ein Formular absendest oder Instagram öffnest, kommunizierst du mit einer API. JSON ist die Lingua Franca dieser Kommunikation — verstanden von JavaScript, Python, PHP, Ruby und jeder modernen Sprache. Wer JSON beherrscht, beherrscht die Schnittstelle zwischen Frontend und Backend.`,
        whyImportantEn: `APIs are the nervous system of the internet. Every time you retrieve weather data, load a map, submit a form, or open Instagram, you communicate with an API. JSON is the lingua franca of this communication — understood by JavaScript, Python, PHP, Ruby, and every modern language. Those who master JSON master the interface between frontend and backend.`,
        steps: [
          'Importiere das json-Modul: <code>import json</code>',
          'Simuliere API-Daten: <code>api_data = \'{"user": "designer", "projects": 5}\'</code>',
          'Wandle JSON in Dictionary um: <code>data = json.loads(api_data)</code>',
          'Greife auf verschachtelte Daten zu: <code>data["skills"][0]</code> — eine Liste innerhalb eines Dictionarys!',
          'Erstelle eigenes JSON: <code>json.dumps({"name": "Portfolio"})</code> — das macht aus einem Dictionary einen String'
        ],
        stepsEn: [
          'Import the json module: <code>import json</code>',
          'Simulate API data: <code>api_data = \'{"user": "designer", "projects": 5}\'</code>',
          'Convert JSON to dictionary: <code>data = json.loads(api_data)</code>',
          'Access nested data: <code>data["skills"][0]</code> — a list inside a dictionary!',
          'Create your own JSON: <code>json.dumps({"name": "Portfolio"})</code> — this turns a dictionary into a string'
        ],
        successCriteria: `Du hast JSON-Daten geparst (json.loads), auf verschachtelte Strukturen zugegriffen (Liste in Dictionary) und ein Dictionary in JSON umgewandelt (json.dumps).`,
        successCriteriaEn: `You parsed JSON data (json.loads), accessed nested structures (list in dictionary), and converted a dictionary to JSON (json.dumps).`,
        mistakes: [
          '<code>json.loads</code> vergessen — ohne das bleibt <code>api_data</code> ein <strong>String</strong>, kein Dictionary',
          'Falsche Anführungszeichen in JSON — JSON verwendet ausschließlich <strong>doppelte</strong> Anführungszeichen: <code>{"key": "value"}</code>',
          'Key nicht gefunden — JSON ist <strong>case-sensitive</strong>: <code>"Projects"</code> ≠ <code>"projects"</code>',
          '<code>json.dumps</code> mit <code>json.loads</code> verwechseln — <strong>dumps</strong> macht String, <strong>loads</strong> macht Dictionary'
        ],
        mistakesEn: [
          'Forgetting <code>json.loads</code> — without it, <code>api_data</code> remains a <strong>string</strong>, not a dictionary',
          'Wrong quotation marks in JSON — JSON uses only <strong>double</strong> quotes: <code>{"key": "value"}</code>',
          'Key not found — JSON is <strong>case-sensitive</strong>: <code>"Projects"</code> ≠ <code>"projects"</code>',
          'Confusing <code>json.dumps</code> with <code>json.loads</code> — <strong>dumps</strong> makes string, <strong>loads</strong> makes dictionary'
        ],
        documentation: {
          intro: 'Dein Lehrer möchte deine Arbeit sehen. Speichere Screenshots deiner Lösung im Ordner <strong>lösungen</strong> auf deinem OneDrive und gib den Freigabelink in Moodle ab.',
          introEn: 'Your teacher wants to see your work. Save screenshots of your solution in the <strong>solutions</strong> folder on your OneDrive and submit the share link in Moodle.',
          steps: [
            'Erstelle einen Ordner <strong>lösungen</strong> in deinem OneDrive',
            'Mache Screenshots von deinem Code: in VS Code: und dem Ergebnis im Terminal',
            'Speichere die Screenshots im Ordner',
            'Erstelle einen Freigabelink für den Ordner',
            'Reiche den Link in Moodle als Textabgabe ein'
          ],
          stepsEn: [
            'Create a folder <strong>solutions</strong> in your OneDrive',
            'Take screenshots of your code in VS Code: and the result in the terminal',
            'Save the screenshots in the folder',
            'Create a share link for the folder',
            'Submit the link in Moodle as a text assignment'
          ]
        },
        w3schoolsLink: 'https://www.w3schools.com/python/python_json.asp',
        w3schoolsLabel: 'Python JSON auf W3Schools',
        w3schoolsLabelEn: 'Python JSON on W3Schools',
        reflectionQuestion: 'Warum ist JSON das universelle Austauschformat des Webs? Was wäre die Alternative — und warum hat sich JSON durchgesetzt? Denke an deine Erfahrung mit JavaScript.',
        reflectionQuestionEn: 'Why is JSON the universal exchange format of the web? What would be the alternative — and why has JSON prevailed? Think about your experience with JavaScript.',
        classicLink: '../../../python-classic/src/pages/kapitel/10-fileio.html'
      },
      {
        id: 'q5-2',
        title: 'Datei-Manager',
        titleEn: 'File Manager',
        description: 'Lerne, wie Dateien gelesen und analysiert werden — die Grundlage jeder Datenpersistenz und jedes Daten-Imports.',
        descriptionEn: 'Learn how files are read and analyzed — the foundation of every data persistence and every data import.',
        image: '../assets/images/quests/quest-q5-2.webp',
        xp: 100,
        type: 'code',
        estimatedTime: '12 Min.',
        codeTemplate: `# Simulierter CSV-Datei-Inhalt (in echt: open("daten.csv", "r"))
inhalt = "Name,Beruf,Jahre\\nAnna,Designer,3\\nMax,Entwickler,5\\nLisa,Marketing,2"

# TODO: Splitte in einzelne Zeilen
zeilen = inhalt.split("\\n")

# TODO: Iteriere über die Zeilen (überspringe die Header-Zeile)
for zeile in zeilen[1:]:
    # TODO: Splitte jede Zeile bei Komma
    daten = zeile.split(",")
    name = daten[0]
    beruf = daten[1]
    jahre = daten[2]
    print(f"{name} ist {beruf} seit {jahre} Jahren")

# TODO: Zähle die Einträge
print(f"Gesamtzahl Mitarbeiter: {len(zeilen) - 1}")`,
        validator: (output) => output.includes('Anna') && output.includes('Max') && output.includes('Gesamtzahl'),
        hint: 'Nutze .split("\n") für Zeilen und .split(",") für Spalten. zeilen[1:] überspringt die Header-Zeile.',
        hintEn: 'Use .split("\n") for lines and .split(",") for columns. lines[1:] skips the header line.',
        proTip: 'In Python nutzt man with open(...) as f: — das schließt die Datei automatisch. In JavaScript nutzt man fs.readFile() oder fs.promises.readFile() — asynchron und mit Callbacks/Promises. Pythons with-Statement ist eleganter und sicherer, weil es Ressourcen automatisch freigibt.',
        proTipEn: 'In Python you use with open(...) as f: — this closes the file automatically. In JavaScript you use fs.readFile() or fs.promises.readFile() — asynchronous and with callbacks/promises. Python\'s with statement is more elegant and safer because it automatically releases resources.',
        commonMistakes: ['Vergessene Encoding-Angabe', 'Datei nicht geschlossen', 'Falscher Split-Character'],
        mission: `Die Cloud-Brücke verbindet nicht nur Server, sondern auch <strong>Dateien und Daten</strong>. Der Copilot verwaltet jetzt Konfigurationen, Logs und Datenbank-Exports. Jedes Content-Management-System, jede E-Commerce-Plattform und jede Analytics-Software liest und schreibt Dateien. Heute baust du einen Datei-Parser, der CSV-Daten in lesbare Informationen verwandelt.`,
        missionEn: `The Cloud Bridge connects not only servers, but also <strong>files and data</strong>. The Copilot now manages configurations, logs, and database exports. Every content management system, every e-commerce platform, and every analytics software reads and writes files. Today you build a file parser that turns CSV data into readable information.`,
        whyImportant: `File I/O ist die Grundlage jeder Datenpersistenz. Ohne Dateien gäbe es keine Logs, keine Configs, keine Datenbank-Exports. In der Webentwicklung nutzt man File I/O für CSV-Importe (Shop-Produkte), Konfigurationsdateien (Server-Einstellungen) und Server-Logs (Fehleranalyse). Der Unterschied zu JavaScript: Python ist synchron und linear — du liest Zeile für Zeile. JavaScript ist asynchron — du arbeitest mit Callbacks oder Promises.`,
        whyImportantEn: `File I/O is the foundation of every data persistence. Without files, there would be no logs, no configs, no database exports. In web development, file I/O is used for CSV imports (shop products), configuration files (server settings), and server logs (error analysis). The difference to JavaScript: Python is synchronous and linear — you read line by line. JavaScript is asynchronous — you work with callbacks or promises.`,
        steps: [
          'Erstelle einen simulierten CSV-Inhalt: <code>inhalt = "Name,Beruf\\nAnna,Designer"</code>',
          'Splitte in Zeilen: <code>zeilen = inhalt.split("\\n")</code>',
          'Überspringe die Header-Zeile: <code>for zeile in zeilen[1:]:</code>',
          'Splitte jede Zeile bei Komma: <code>daten = zeile.split(",")</code>',
          'Formiere die Ausgabe: <code>print(f"{daten[0]} ist {daten[1]}")</code>'
        ],
        stepsEn: [
          'Create simulated CSV content: <code>content = "Name,Job\\nAnna,Designer"</code>',
          'Split into lines: <code>lines = content.split("\\n")</code>',
          'Skip the header line: <code>for line in lines[1:]:</code>',
          'Split each line at comma: <code>data = line.split(",")</code>',
          'Format the output: <code>print(f"{data[0]} is {data[1]}")</code>'
        ],
        successCriteria: `Du hast einen CSV-Inhalt in Zeilen und Spalten aufgeteilt, die Header-Zeile übersprungen, eine Schleife für die Verarbeitung genutzt und die Ergebnisse formatiert ausgegeben.`,
        successCriteriaEn: `You split CSV content into lines and columns, skipped the header line, used a loop for processing, and formatted the output.`,
        mistakes: [
          'Die <strong>Header-Zeile nicht überspringen</strong> — dann wird "Name,Beruf" als Daten interpretiert',
          'Vergessene <strong>Encoding-Angabe</strong> — in echt: <code>open("datei.csv", encoding="utf-8")</code>, sonst crashed es bei Umlauten',
          'Datei <strong>nicht schließen</strong> — in echt nutze immer <code>with open(...) as f:</code> für automatisches Schließen',
          'Falschen Split-Character nutzen — <code>"\\n"</code> (Unix) vs <code>"\\r\\n"</code> (Windows) vs <code>","</code> (CSV-Spalten)'
        ],
        mistakesEn: [
          'Not <strong>skipping the header line</strong> — then "Name,Job" is interpreted as data',
          'Forgotten <strong>encoding specification</strong> — in real life: <code>open("file.csv", encoding="utf-8")</code>, otherwise it crashes with umlauts',
          'Not <strong>closing the file</strong> — in real life always use <code>with open(...) as f:</code> for automatic closing',
          'Using wrong split character — <code>"\\n"</code> (Unix) vs <code>"\\r\\n"</code> (Windows) vs <code>","</code> (CSV columns)'
        ],
        documentation: {
          intro: 'Dein Lehrer möchte deine Arbeit sehen. Speichere Screenshots deiner Lösung im Ordner <strong>lösungen</strong> auf deinem OneDrive und gib den Freigabelink in Moodle ab.',
          introEn: 'Your teacher wants to see your work. Save screenshots of your solution in the <strong>solutions</strong> folder on your OneDrive and submit the share link in Moodle.',
          steps: [
            'Erstelle einen Ordner <strong>lösungen</strong> in deinem OneDrive',
            'Mache Screenshots von deinem Code: in VS Code: und dem Ergebnis im Terminal',
            'Speichere die Screenshots im Ordner',
            'Erstelle einen Freigabelink für den Ordner',
            'Reiche den Link in Moodle als Textabgabe ein'
          ],
          stepsEn: [
            'Create a folder <strong>solutions</strong> in your OneDrive',
            'Take screenshots of your code in VS Code: and the result in the terminal',
            'Save the screenshots in the folder',
            'Create a share link for the folder',
            'Submit the link in Moodle as a text assignment'
          ]
        },
        w3schoolsLink: 'https://www.w3schools.com/python/python_file_handling.asp',
        w3schoolsLabel: 'Python File Handling auf W3Schools',
        w3schoolsLabelEn: 'Python File Handling on W3Schools',
        reflectionQuestion: 'Warum ist Pythons with-Statement eleganter als JavaScripts Callback-basiertes File-Handling? Was ist der Vorteil von automatischem Ressourcen-Management?',
        reflectionQuestionEn: 'Why is Python\'s with statement more elegant than JavaScript\'s callback-based file handling? What is the advantage of automatic resource management?',
        classicLink: '../../../python-classic/src/pages/kapitel/10-fileio.html'
      },
      {
        id: 'q5-3',
        title: 'Das Meisterwerk',
        titleEn: 'The Masterpiece',
        description: 'Das finale Abschlussprojekt: Ein vollständiges Bild-Analyse-Tool, das alle gelernten Konzepte in einem professionellen Skript vereint.',
        descriptionEn: 'The final capstone project: A complete image analysis tool that unites all learned concepts in a professional script.',
        image: '../assets/images/quests/quest-q5-3.webp',
        xp: 120,
        type: 'code',
        estimatedTime: '15 Min.',
        codeTemplate: `# DEIN MEISTERWERK: Professionelles Bild-Analyse-Tool

def analyze_image(dateiname, breite, hoehe, farben):
    """
    Analysiert ein Bild und gibt strukturierte Daten zurück.
    Kombiniert: Funktionen, Bedingungen, Dictionaries, Listen, f-Strings
    """
    # TODO: Berechne das Seitenverhaeltnis (2 Dezimalstellen)
    verhaeltnis = round(breite / hoehe, 2)
    
    # TODO: Bestimme die Orientierung (Landscape / Portrait / Quadrat)
    if breite > hoehe:
        orientierung = "Landscape"
    elif breite < hoehe:
        orientierung = "Portrait"
    else:
        orientierung = "Quadrat"
    
    # TODO: Zähle die Farben
    farb_anzahl = len(farben)
    
    # TODO: Erstelle ein umfassendes Ergebnis-Dictionary
    ergebnis = {
        "datei": dateiname,
        "abmessungen": f"{breite}x{hoehe}",
        "verhaeltnis": verhaeltnis,
        "orientierung": orientierung,
        "farben": farb_anzahl,
        "palette": farben
    }
    
    return ergebnis


# TODO: Teste mit verschiedenen Bildern
bild_1 = analyze_image("hero.jpg", 1920, 1080, ["#306998", "#FFD43B", "#1e293b"])
bild_2 = analyze_image("portrait.jpg", 1080, 1920, ["#e74c3c", "#ffffff"])

# TODO: Gib beide Ergebnisse formatiert aus
print("=== BILD-ANALYSE REPORT ===")
for key, value in bild_1.items():
    print(f"{key}: {value}")

print("\\n=== ZWEITES BILD ===")
print(f"Datei: {bild_2['datei']}, Orientierung: {bild_2['orientierung']}")`,
        validator: (output) => output.includes('Landscape') && output.includes('Portrait') && output.includes('1920x1080'),
        hint: 'Kombiniere alles Gelernte: Funktionen (def), Bedingungen (if/elif/else), Dictionaries ({}), Listen ([]), f-Strings (f"...") und for-Schleifen.',
        hintEn: 'Combine everything you learned: functions (def), conditions (if/elif/else), dictionaries ({}), lists ([]), f-strings (f"...") and for loops.',
        proTip: 'Das ist dein erstes vollständiges Python-Tool. In der Praxis würdest du jetzt noch Pillow für Bildanalyse, requests für API-Zugriffe und pandas für Datenverarbeitung hinzufügen. Du hast das Fundament gelegt — der Rest ist Erweiterung. Willkommen in der Welt der Automatisierung!',
        proTipEn: 'This is your first complete Python tool. In practice, you would now add Pillow for image analysis, requests for API access, and pandas for data processing. You have laid the foundation — the rest is extension. Welcome to the world of automation!',
        commonMistakes: ['Vergessener return', 'Falsche Einrückung', 'Dictionary-Syntax falsch'],
        commonMistakesEn: ['Forgotten return', 'Wrong indentation', 'Wrong dictionary syntax'],
        mission: `Du stehst am <strong>Ende der Cloud-Brücke</strong>. Vor dir liegt die gesamte Python-Quest — 5 Welten, 15 Quests, unzählige Stunden Lernen. Das Meisterwerk ist deine Abschlussprüfung: Ein professionelles Bild-Analyse-Tool, das <strong>alle gelernten Konzepte</strong> in einem einzigen Skript vereint. Variablen, Bedingungen, Schleifen, Listen, Dictionaries, Funktionen, Module — alles fließt hier zusammen. Das ist kein Tutorial mehr. Das ist echte Software.`,
        missionEn: `You stand at the <strong>end of the Cloud Bridge</strong>. Before you lies the entire Python Quest — 5 worlds, 15 quests, countless hours of learning. The Masterpiece is your final exam: a professional image analysis tool that unites <strong>all learned concepts</strong> in a single script. Variables, conditions, loops, lists, dictionaries, functions, modules — everything flows together here. This is no longer a tutorial. This is real software.`,
        whyImportant: `Dies ist der Moment, in dem aus allen einzelnen Quests ein Gesamtbild entsteht. Ein echter Programmierer denkt nicht in isolierten Befehlen, sondern in Systemen. Dieses Tool analysiert Bilder, klassifiziert sie und gibt strukturierte Daten zurück — genau wie in der professionellen Praxis. Wenn du dieses Projekt verstehst, bist du bereit für echte Python-Projekte: Datenanalyse, Web-Scraping, API-Entwicklung, Automatisierung.`,
        whyImportantEn: `This is the moment when all individual quests become a complete picture. A real programmer doesn't think in isolated commands, but in systems. This tool analyzes images, classifies them, and returns structured data — exactly like in professional practice. If you understand this project, you are ready for real Python projects: data analysis, web scraping, API development, automation.`,
        steps: [
          'Definiere die Funktion: <code>def analyze_image(dateiname, breite, hoehe, farben):</code>',
          'Berechne das Seitenverhältnis: <code>round(breite / hoehe, 2)</code>',
          'Bestimme die Orientierung mit <code>if / elif / else</code> — vergiss nicht das Quadrat!',
          'Erstelle ein Dictionary mit allen Informationen: Dateiname, Abmessungen, Verhältnis, Orientierung, Farben',
          'Teste mit <strong>zwei verschiedenen Bildern</strong> und gib beide Ergebnisse formatiert aus'
        ],
        stepsEn: [
          'Define the function: <code>def analyze_image(filename, width, height, colors):</code>',
          'Calculate the aspect ratio: <code>round(width / height, 2)</code>',
          'Determine the orientation with <code>if / elif / else</code> — don\'t forget the square!',
          'Create a dictionary with all information: filename, dimensions, ratio, orientation, colors',
          'Test with <strong>two different images</strong> and output both results formatted'
        ],
        successCriteria: `Du hast eine Funktion mit 4 Parametern definiert, if/elif/else für alle 3 Orientierungen genutzt, ein strukturiertes Dictionary erstellt und zwei Tests mit formatierter Ausgabe durchgeführt.`,
        successCriteriaEn: `You defined a function with 4 parameters, used if/elif/else for all 3 orientations, created a structured dictionary, and ran two tests with formatted output.`,
        mistakes: [
          '<strong>return vergessen</strong> — ohne return gibt die Funktion <code>None</code> zurück, kein Dictionary',
          '<strong>Falsche Einrückung</strong> — alles innerhalb der Funktion muss konsistent eingerückt sein (4 Leerzeichen)',
          'Dictionary-Syntax falsch — Keys in <strong>Anführungszeichen</strong>, Doppelpunkt statt Gleichheitszeichen: <code>{"key": "value"}</code>',
          'Nur <strong>if/else statt if/elif/else</strong> — dann wird das Quadrat nicht korrekt erkannt (wenn breite == hoehe)'
        ],
        mistakesEn: [
          '<strong>Forgetting return</strong> — without return the function returns <code>None</code>, not a dictionary',
          '<strong>Wrong indentation</strong> — everything inside the function must be consistently indented (4 spaces)',
          'Wrong dictionary syntax — keys in <strong>quotes</strong>, colon instead of equals: <code>{"key": "value"}</code>',
          'Only <strong>if/else instead of if/elif/else</strong> — then the square is not correctly recognized (when width == height)'
        ],
        documentation: {
          intro: 'Dein Lehrer möchte deine Arbeit sehen. Speichere Screenshots deiner Lösung im Ordner <strong>lösungen</strong> auf deinem OneDrive und gib den Freigabelink in Moodle ab.',
          introEn: 'Your teacher wants to see your work. Save screenshots of your solution in the <strong>solutions</strong> folder on your OneDrive and submit the share link in Moodle.',
          steps: [
            'Erstelle einen Ordner <strong>lösungen</strong> in deinem OneDrive',
            'Mache Screenshots von deinem Code: in VS Code: und dem Ergebnis im Terminal',
            'Speichere die Screenshots im Ordner',
            'Erstelle einen Freigabelink für den Ordner',
            'Reiche den Link in Moodle als Textabgabe ein'
          ],
          stepsEn: [
            'Create a folder <strong>solutions</strong> in your OneDrive',
            'Take screenshots of your code in VS Code: and the result in the terminal',
            'Save the screenshots in the folder',
            'Create a share link for the folder',
            'Submit the link in Moodle as a text assignment'
          ]
        },
        w3schoolsLink: 'https://www.w3schools.com/python/python_examples.asp',
        w3schoolsLabel: 'Python Beispiele auf W3Schools',
        w3schoolsLabelEn: 'Python Examples on W3Schools',
        reflectionQuestion: 'Welches der 5 gelernten Konzepte (Variablen, Bedingungen, Schleifen, Listen/Dicts, Funktionen) war für dich am wichtigsten? Was würdest du als nächstes lernen wollen? Begründe deine Antwort.',
        reflectionQuestionEn: 'Which of the 5 learned concepts (variables, conditions, loops, lists/dicts, functions) was most important to you? What would you want to learn next? Justify your answer.',
        classicLink: '../../../python-classic/src/pages/kapitel/12-ki-cocoding.html'
      }
    ]
  }
];

export const BADGES = [
  { id: 'erster-code', title: 'Erster Code', titleEn: 'First Code', icon: 'ph-code', condition: 'q1-1', type: 'quest' },
  { id: 'variablen-meister', title: 'Variablen-Meister', titleEn: 'Variable Master', icon: 'ph-cube', condition: 'q1-2', type: 'quest' },
  { id: 'logik-experte', title: 'Logik-Experte', titleEn: 'Logic Expert', icon: 'ph-git-branch', condition: 'q2-1', type: 'quest' },
  { id: 'daten-archivar', title: 'Daten-Archivar', titleEn: 'Data Archivist', icon: 'ph-database', condition: 'q3-2', type: 'quest' },
  { id: 'funktions-schmied', title: 'Funktions-Schmied', titleEn: 'Function Smith', icon: 'ph-hammer', condition: 'q4-1', type: 'quest' },
  { id: 'api-teleporter', title: 'API-Teleporter', titleEn: 'API Teleporter', icon: 'ph-globe', condition: 'q5-1', type: 'quest' },
  { id: 'ki-copilot', title: 'KI-Denker', titleEn: 'AI Thinker', icon: 'ph-robot', image: '../assets/images/badges/copilot.webp', condition: 'reflection_3', type: 'count', target: 3 },
  { id: 'streak-koenig', title: 'Streak-König', titleEn: 'Streak King', icon: 'ph-fire', condition: 'streak_5', type: 'streak', target: 5 },
  { id: 'perfektionist', title: 'Perfektionist', titleEn: 'Perfectionist', icon: 'ph-star', condition: 'world_perfect', type: 'world_perfect' },
  { id: 'speedrunner', title: 'Speedrunner', titleEn: 'Speedrunner', icon: 'ph-lightning', image: '../assets/images/badges/code-morpher.webp', condition: 'speed_1', type: 'speed', target: 1 },
  { id: 'w3schools-entdecker', title: 'W3Schools-Entdecker', titleEn: 'W3Schools Explorer', icon: 'ph-magnifying-glass', condition: 'w3schools_10', type: 'count', target: 10 },
  { id: 'python-legende', title: 'Python-Legende', titleEn: 'Python Legend', icon: 'ph-trophy', image: '../assets/images/badges/python-legende.webp', condition: 'all_worlds', type: 'all_worlds' }
];

export function getWorldById(id) {
  return WORLDS.find(w => w.id === id);
}

export function getQuestById(worldId, questId) {
  const world = getWorldById(worldId);
  if (!world) return null;
  return world.quests.find(q => q.id === questId);
}

/**
 * Lokalisiert ein Badge-Objekt basierend auf aktueller Sprache
 */
export function localizeBadge(badge) {
  if (!badge) return null;
  const lang = getLanguage();
  if (lang === 'de') return badge;
  return {
    ...badge,
    title: badge.titleEn || badge.title
  };
}

/**
 * Lokalisiert ein Welt-Objekt basierend auf aktueller Sprache
 */
export function localizeWorld(world) {
  if (!world) return null;
  const lang = getLanguage();
  if (lang === 'de') return world;
  return {
    ...world,
    title: world.titleEn || world.title,
    subtitle: world.subtitleEn || world.subtitle,
    description: world.descriptionEn || world.description,
    skills: world.skillsEn || world.skills
  };
}

/**
 * Lokalisiert ein Quest-Objekt basierend auf aktueller Sprache
 */
export function localizeQuest(quest) {
  if (!quest) return null;
  const lang = getLanguage();
  if (lang === 'de') return quest;
  return {
    ...quest,
    title: quest.titleEn || quest.title,
    description: quest.descriptionEn || quest.description,
    mission: quest.missionEn || quest.mission,
    whyImportant: quest.whyImportantEn || quest.whyImportant,
    steps: quest.stepsEn || quest.steps,
    successCriteria: quest.successCriteriaEn || quest.successCriteria,
    mistakes: quest.mistakesEn || quest.mistakes || quest.commonMistakesEn || quest.commonMistakes,
    hint: quest.hintEn || quest.hint,
    proTip: quest.proTipEn || quest.proTip,
    promptTemplate: quest.promptTemplateEn || quest.promptTemplate,
    documentation: quest.documentation ? {
      intro: quest.documentation.introEn || quest.documentation.intro,
      steps: quest.documentation.stepsEn || quest.documentation.steps
    } : undefined,
    w3schoolsLabel: quest.w3schoolsLabelEn || quest.w3schoolsLabel,
    reflectionQuestion: quest.reflectionQuestionEn || quest.reflectionQuestion
  };
}

export function getTotalXP() {
  return WORLDS.reduce((total, world) => total + world.xp, 0);
}

export function getTotalQuests() {
  return WORLDS.reduce((total, world) => total + world.quests.length, 0);
}
