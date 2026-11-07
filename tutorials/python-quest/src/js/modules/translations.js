/**
 * PYTHON QUEST — Übersetzungen (DE / EN)
 * Struktur: TRANSLATIONS[lang][section][key]
 */

export const TRANSLATIONS = {
  de: {
    // Header & Navigation
    nav: {
      hub: 'Hub',
      world: 'Welt',
      worlds: 'Welten',
      badges: 'Badges',
      tools: 'Tools',
      quests: 'Quests',
      language: 'Sprache',
      languageToggle: 'Auf Englisch umschalten',
      mainNav: 'Hauptnavigation',
      xpLabel: 'Erfahrungspunkte',
      themeToggle: 'Farbmodus umschalten',
      classroomToggle: 'Klassenraummodus umschalten',
      langToggle: 'Sprache umschalten'
    },

    // Hero
    hero: {
      titleLine1: 'Python',
      titleLine2: 'Quest',
      subtitle: 'Willkommen im Code-Verlies. 15 Quests durch 5 Welten. Baue deinen KI-Copiloten — und werde zum Python-Meister.',
      subtitle2: 'Werde zum Webdesigner der Zukunft.',
      ctaPrimary: 'Quest starten',
      ctaSecondary: 'Welten entdecken',
      adventure: 'Python Abenteuer',
      welcomeBack: 'Willkommen zurück, Coder!',
      statQuests: 'Quests',
      statWorlds: 'Welten',
      statBadges: 'Badges',
      statXp: 'XP',
      statLevel: 'Level',
      scroll: 'Scroll'
    },

    // Features
    features: {
      title: "So funktioniert's",
      subtitle: 'Vier Schritte. Ein Ziel. Werde zum Python-Meister.',
      worldTitle: '5 Welten entdecken',
      worldText: 'Jede Welt ist ein Themenbereich: Variablen, Schleifen, Funktionen, APIs und Projekte. Du baust auf — wie Level in einem Spiel. Jede Welt bringt neue Fähigkeiten und öffnet die nächste.',
      sandboxTitle: 'Echte Sandbox',
      sandboxText: 'Schreibe Python direkt im Browser. Keine Installation, kein Setup. Matplotlib, Pandas und echte Ausführung inklusive. Teste sofort, was du gelernt hast.',
      badgeTitle: 'Badges sammeln',
      badgeText: '12 einzigartige Badges warten auf dich. Für jede abgeschlossene Quest gibt es XP. Level auf, sammle Badges und sieh deinen Fortschritt wachsen — motivierender als ein Zeugnis.',
      copilotTitle: 'KI-Copilot',
      copilotText: 'Dein persönlicher Avatar wächst mit dir. Von einem kleinen Roboter bis zur Python-Legende. Der KI-Copilot gibt dir Tipps, erklärt Fehler und feiert deine Erfolge mit dir.'
    },

    // Worlds
    worlds: {
      title: 'Die 5 Welten',
      subtitle: 'Wähle deine Welt. Jede ist ein neues Abenteuer.',
      statusStart: 'Starten',
      statusCompleted: 'Fertig',
      statusLocked: 'Gesperrt',
      lockText: 'Welt {{prev}} abschließen',
      progressLabel: 'Quests'
    },

    // Badges
    badges: {
      title: 'Badges & Erfolge',
      subtitle: 'Sammle alle 12 Badges und werde zur Python-Legende.',
      earned: 'Verdient',
      locked: 'Gesperrt'
    },

    // Progress
    progress: {
      title: 'Dein Lernfortschritt',
      empty: 'Starte deine erste Quest, um deine Lernkurve zu sehen!',
      completed: 'Gesamt',
      levelLabel: 'Level',
      streakLabel: 'Tage Streak',
      questsDone: 'Quests erledigt',
      worldsDone: 'Welten erledigt',
      badgesEarned: 'Badges',
      calloutNewTitle: 'Starte deine Quest-Reise!',
      calloutNewText: 'Jede Quest bringt dich näher zum Python-Meister. Dein KI-Copilot wartet schon.',
      calloutReturnTitle: 'Komm morgen zurück!',
      calloutReturnText: 'Starte deine Streak-Serie und sammle Bonus-XP. Jeder Tag zählt!',
      calloutCta: 'Los geht\'s',
      nextBadge: 'Nur noch {{remaining}} bis zum Badge »{{name}}«!'
    },

    // Partner
    partner: {
      sectionTitle: 'Deine Lern-Partner',
      sectionSubtitle: 'Zwei starke Begleiter für deinen Python-Weg — wähle, was du gerade brauchst.',
      classicLabel: 'Python Classic',
      classicTitle: 'Strukturiert lernen',
      classicText: 'Ausführliche Erklärungen, Übungen und das PyBuddy-Projekt. Der perfekte Begleiter, wenn du ein Thema wirklich verstehen willst.',
      classicCta: 'Zum Classic Tutorial',
      w3sLabel: 'W3Schools',
      w3sTitle: 'Sofort ausprobieren',
      w3sText: 'Die weltweit beliebteste Python-Referenz mit interaktivem Try-it-Editor. Perfekt, wenn du schnell eine Syntax nachschlagen oder Code testen willst.',
      w3sCta: 'W3Schools öffnen',
      linkSetup: 'Setup',
      linkVariables: 'Variablen',
      linkConditions: 'Bedingungen',
      linkFunctions: 'Funktionen',
      linkW3sTutorial: 'Tutorial',
      linkW3sRef: 'Referenz',
      linkW3sTry: 'Try-it Editor',
      linkW3sEx: 'Übungen'
    },

    // Footer
    footer: {
      slogan: 'Mit KI denken. Menschlich handeln.',
      platform: 'Plattform',
      learn: 'Lernen',
      legal: 'Rechtliches',
      support: 'Unterstützen'
    },

    // Quest Page
    quest: {
      typeCode: 'Code-Quest',
      typeReflection: 'Reflexion',
      typeMorph: 'Code-Morph',
      completed: 'Abgeschlossen',
      worldProgress: 'Welt-Fortschritt',
      missionTitle: 'Deine Mission',
      storyTitle: 'Warum das wichtig ist',
      taskTitle: 'Deine Aufgabe',
      successTitle: 'Erfolgskriterium',
      mistakesTitle: 'Häufige Fehler',
      proTipTitle: 'Profi-Tipp',
      docsTitle: 'Deine Lösung dokumentieren',
      w3schoolsTitle: 'Vertiefung auf W3Schools',
      w3schoolsText: 'Schau dir die Theorie auf W3Schools an, bevor du loslegst. Dort kannst du direkt im Browser ausprobieren!',
      w3schoolsDefaultLink: 'Auf W3Schools lernen',
      stepByStep: 'Schritt für Schritt',
      reflectionIntro: 'Bevor du die Quest abschließt, beantworte diese Frage. Das zeigt, dass du verstanden hast, was du gemacht hast — und nicht nur abgeschrieben.',
      reflectionPlaceholderShort: 'Schreibe hier deine Antwort... (mindestens 20 Zeichen)',
      reflectionPrivacy: 'Deine Antwort wird lokal gespeichert. Niemand außer dir und deinem Lehrer sieht sie.',
      reflectionPromptTemplate: 'Schreibe deine Gedanken zu diesem Thema auf.',
      hintTitle: 'Hinweis anzeigen',
      hintMistakes: 'Häufige Fehler',
      sandboxTitle: 'Python-Sandbox',
      verifyTitle: 'Verifizierung',
      verifyQuestion: 'Bevor du die Quest abschließt: Was ist die Hauptausgabe deines Codes?',
      reflectionTitle: 'Deine Reflexion',
      reflectionPrompt: 'Schreibe hier deine Reflexion... Mindestens 50 Zeichen.',
      reflectionSave: 'Speichern',
      reflectionCounter: '{{count}} Zeichen',
      completeBtn: 'Quest abschließen',
      completedBtn: 'Bereits abgeschlossen',
      completeSuccess: 'Quest abgeschlossen!',
      completeXp: '+{{xp}} XP gesammelt. Weiter so!',
      prev: 'Vorherige',
      next: 'Nächste',
      nextWorld: 'Nächste Welt',
      toHub: 'Zum Hub',
      classicLink: 'Mehr dazu im Python Classic Tutorial',
      copilotLabel: 'KI-Copilot',
      proTipLabel: 'Pro-Tip',
      copilotDefaultTip: 'Nutze den KI-Copilot, wenn du Hilfe brauchst. Jede Quest ist lösbar!',
      morphPlaceholder: 'Der Code-Morpher wird in einem späteren Update verfügbar sein. Nutze die Reflexion, um dein Wissen zu festigen.',
      morphDefaultPrompt: 'Was sind die 3 wichtigsten Unterschiede zwischen JS und Python bei diesem Thema?',
      reflectionShortTitle: 'Reflexion zu kurz',
      reflectionShortText: 'Schreibe mindestens 20 Zeichen in das Reflexionsfeld.'
    },

    // Sandbox
    sandbox: {
      lang: 'Python',
      reset: 'Reset',
      resetTitle: 'Code zurücksetzen',
      resetDone: 'Code wurde auf den Ausgangszustand zurückgesetzt.',
      run: 'Ausführen',
      runTitle: 'Code ausführen',
      running: 'Lädt...',
      clear: 'Leeren',
      clearTitle: 'Konsole leeren',
      console: 'Konsole',
      empty: 'Klicke „Ausführen", um deinen Code zu testen.',
      loadingNote: 'Die Python-Umgebung wird beim ersten Mal geladen (~30 Sekunden).',
      loading: 'Python-Umgebung wird geladen...',
      loadingTime: 'Dies kann beim ersten Mal 20-30 Sekunden dauern.',
      noOutput: 'Keine Ausgabe. Dein Code wurde ausgeführt.',
      cleared: 'Konsole geleert. Bereit für neuen Code.',
      runningStatus: 'Code wird ausgeführt...',
      unknownError: 'Unbekannter Fehler',
      errorTitle: 'Fehler',
      copy: 'Kopieren'
    },

    // Validator
    validator: {
      colonMissing: 'Vergessener Doppelpunkt nach "{{keyword}}"',
      printNeedsParens: 'print() braucht Klammern in Python 3: print("Hallo")',
      compareVsAssign: 'Prüfe: Meintest du == (Vergleich) oder = (Zuweisung)?',
      mixedTabsSpaces: 'Gemischte Tabs und Spaces — nutze nur Spaces (4 pro Ebene)',
      trailingWhitespace: 'Leerzeichen am Zeilenende',
      unclosedString: 'Ungerade Anzahl von Anführungszeichen — String nicht geschlossen?',
      unclosedBracket: 'Nicht geschlossene Klammer "{{bracket}}"',
      extraClosingBracket: 'Überzählige schließende Klammer "{{bracket}}"',
      line: 'Zeile'
    },

    // Classroom
    classroom: {
      activated: 'Classroom Mode aktiviert',
      optimizedFor: 'Optimiert für Beamer-Präsentation. Drücke Shift+C zum Deaktivieren.'
    },

    // Toast Close
    toastClose: 'Benachrichtigung schließen',

    // XP / Level
    xp: {
      level: 'Level',
      levelUp: 'Level Up!',
      levelUpText: 'Du bist jetzt Level {{level}}!',
      continue: 'Weiter!'
    },

    // Badges Engine
    badge: {
      newBadge: 'Neuer Badge!',
      badgeEarned: 'Du hast den Badge "{{name}}" verdient!',
      earned: 'Verdient',
      locked: 'Gesperrt'
    },

    // Toast
    toast: {
      streakTitle: 'Streak: {{count}} Tage!',
      streakText: 'Weiter so! Du bist auf dem besten Weg.',
      verifyCorrect: 'Richtig!',
      verifyCorrectText: 'Dein Code wurde verifiziert. Du kannst die Quest abschließen.',
      verifyWrong: 'Nicht ganz',
      verifyWrongText: 'Überprüfe deinen Code noch einmal.',
      reflectionShort: 'Zu kurz',
      reflectionShortText: 'Schreibe mindestens 50 Zeichen für eine sinnvolle Reflexion.',
      notSoFast: 'Nicht so schnell!',
      verifyFirst: 'Führe den Code aus oder beantworte die Verifizierung, bevor du abschließt.',
      alreadyCompleted: 'Bereits abgeschlossen',
      alreadyCompletedText: 'Du hast diese Quest schon erledigt.',
      saved: 'Gespeichert',
      savedText: 'Deine Reflexion wurde gespeichert.',
      langSwitched: 'Sprache gewechselt',
      langCurrent: 'Aktuell: {{lang}}'
    },

    // Errors
    error: {
      noQuest: 'Keine Quest ausgewählt. Wähle eine Welt im Hub.',
      questNotFound: 'Quest nicht gefunden.',
      pyodideLoad: 'Python-Umgebung konnte nicht geladen werden. Bitte Internetverbindung prüfen.',
      unknown: 'Unbekannter Fehler'
    },

    // Mobile Nav
    mobile: {
      title: 'Navigation',
      close: 'Navigation schließen',
      toggleOpen: 'Mobile Navigation öffnen'
    },

    // Copilot

    tools: {
      title: 'Python Quest | Tools & Setup',
      metaDesc: 'Python Quest — Tools & Setup für Python-Webdesigner.',
      subtitle: 'Alles, was du brauchst, um Python für Webdesign zu nutzen.',
      heroTitle1: 'Tools & ',
      heroTitle2: 'Setup',
      sectionTitle: 'Werkzeuge',
      sectionSubtitle: 'Hilfreiche Tools für deine Python-Reise.',
      vscodeTitle: 'VS Code:',
      vscodeText: 'Die beliebteste Code-Editor für Python. Mit IntelliSense, Debugging und Git-Integration.',
      pythonTitle: 'Python 3',
      pythonText: 'Der offizielle Python-Interpreter. Das Herzstück deiner Entwicklungsumgebung.',
      w3schoolsTitle: 'W3Schools Python',
      w3schoolsText: 'Die beste Referenz für Python-Basics. Mit interaktiven Übungen und Beispielen.',
      jsonTitle: 'JSON Formatter',
      jsonText: 'Formatiere und validiere JSON-Daten. Unverzichtbar für API-Entwicklung.',
      colorTitle: 'Color Converter',
      colorText: 'Konvertiere HEX, RGB und HSL. Das perfekte Tool für dein Design-System.',
      regexTitle: 'Regex Tester',
      regexText: 'Teste reguläre Ausdrücke in Echtzeit. Mit Erklärung und Cheat-Sheet.',
      sandboxTitle: 'Python Sandbox',
      sandboxText: 'Teste Python-Code direkt im Browser. Ohne Installation, sofort loslegen.',
      pypiTitle: 'PyPI — Python Packages',
      pypiText: 'Der offizielle Python Package Index. Finde und installiere Bibliotheken mit pip.',
      open: 'Öffnen'
    },

    // FAB
    fab: {
      classroom: 'Classroom',
      worlds: 'Welten',
      hub: 'Hub',
      top: 'Top',
      sectionLabel: 'Schnellzugriff',
      scrollWorlds: 'Zu den Welten scrollen',
      scrollTop: 'Nach oben scrollen'
    },

    // FAB aria-labels

    // FAB aria-labels
    fabAria: {
      sectionLabel: 'Schnellzugriff',
      scrollWorlds: 'Zu den Welten scrollen',
      scrollTop: 'Nach oben scrollen'
    },

    // Bottom Bar
    bottomBar: {
      label: 'Mobile Schnellzugriff'
    },

    // Teacher Dashboard
    teacher: {
      title: 'Python Quest | Lehrer-Dashboard',
      metaDesc: 'Lehrer-Dashboard für Python Quest — Fortschritte, Badges und Reflexionen im Überblick.',
      heroTitle1: 'Lehrer-',
      heroTitle2: 'Dashboard',
      subtitle: 'Behalte den Überblick über die Lernfortschritte deiner Klasse.',
      sectionOverview: 'Übersicht',
      sectionStudents: 'Schüler:innen',
      sectionDetails: 'Quest-Details',
      exportBtn: 'Klassendaten exportieren',
      importBtn: 'Schülerdaten importieren',
      noData: 'Noch keine Daten vorhanden. Schüler:innen können ihre Fortschritte exportieren und hier importieren.',
      totalProgress: 'Gesamtfortschritt',
      questsCompleted: 'Quests abgeschlossen',
      avgLevel: 'Durchschnittliches Level',
      totalBadges: 'Badges verdient',
      studentName: 'Name',
      studentLevel: 'Level',
      studentXp: 'XP',
      studentQuests: 'Quests',
      studentBadges: 'Badges',
      studentStreak: 'Streak',
      studentLastActive: 'Zuletzt aktiv',
      statusActive: 'Aktiv',
      statusInactive: 'Inaktiv',
      demoNote: 'Hinweis: Dieses Dashboard arbeitet aktuell mit lokalen Daten. Mit Supabase-Integration werden Klassenverwaltung und Echtzeit-Synchronisation möglich.',
      reflectionSection: 'Reflexionen',
      noReflections: 'Noch keine Reflexionen gespeichert.'
    },

    // Page-specific
    index: {
      title: 'Python Quest | Python für Webdesigner',
      metaDesc: 'Python Quest — Lerne Python spielerisch als KI-Copilot für Webdesigner. 5 Welten, 15 Quests, echte Python-Sandbox.',
      logoLabel: 'Python Quest — Startseite'
    },

    // Copilot
    copilot: {
      hello: 'Hallo! Ich bin dein KI-Copilot.',
      closeHint: 'Hinweis schließen',
      welcome: 'Willkommen bei Python Quest! Klick auf eine Welt, um zu starten.',
      continue: 'Hey! Willst du weitermachen?',
      levelUp: 'Level Up! Ich bin gewachsen!'
    }
  },

  en: {
    // Header & Navigation
    nav: {
      hub: 'Hub',
      world: 'World',
      worlds: 'Worlds',
      badges: 'Badges',
      tools: 'Tools',
      quests: 'Quests',
      language: 'Language',
      languageToggle: 'Switch to German',
      mainNav: 'Main navigation',
      xpLabel: 'Experience points',
      themeToggle: 'Toggle color mode',
      classroomToggle: 'Toggle classroom mode',
      langToggle: 'Switch language'
    },

    // Hero
    hero: {
      titleLine1: 'Python',
      titleLine2: 'Quest',
      subtitle: 'Welcome to the Code Dungeon. 15 quests across 5 worlds. Build your AI copilot — and become a Python master.',
      subtitle2: 'Become the web designer of the future.',
      ctaPrimary: 'Start Quest',
      ctaSecondary: 'Explore Worlds',
      adventure: 'Python Adventure',
      welcomeBack: 'Welcome back, Coder!',
      statQuests: 'Quests',
      statWorlds: 'Worlds',
      statBadges: 'Badges',
      statXp: 'XP',
      statLevel: 'Level',
      scroll: 'Scroll'
    },

    // Features
    features: {
      title: 'How it works',
      subtitle: 'Four steps. One goal. Become a Python master.',
      worldTitle: 'Discover 5 Worlds',
      worldText: 'Each world is a themed area: Variables, Loops, Functions, APIs and Projects. You build on what you learned — like levels in a game. Each world brings new skills and unlocks the next.',
      sandboxTitle: 'Real Sandbox',
      sandboxText: 'Write Python directly in the browser. No installation, no setup. Matplotlib, Pandas and real execution included. Test immediately what you have learned.',
      badgeTitle: 'Collect Badges',
      badgeText: '12 unique badges await you. For every completed quest you get XP. Level up, collect badges and watch your progress grow — more motivating than a report card.',
      copilotTitle: 'AI Copilot',
      copilotText: 'Your personal avatar grows with you. From a small robot to a Python legend. The AI Copilot gives you tips, explains errors and celebrates your successes with you.'
    },

    // Worlds
    worlds: {
      title: 'The 5 Worlds',
      subtitle: 'Choose your world. Each is a new adventure.',
      statusStart: 'Start',
      statusCompleted: 'Done',
      statusLocked: 'Locked',
      lockText: 'Complete World {{prev}}',
      progressLabel: 'Quests'
    },

    // Badges
    badges: {
      title: 'Badges & Achievements',
      subtitle: 'Collect all 12 badges and become a Python Legend.',
      earned: 'Earned',
      locked: 'Locked'
    },

    // Progress
    progress: {
      title: 'Your Learning Progress',
      empty: 'Start your first quest to see your learning curve!',
      completed: 'Total',
      levelLabel: 'Level',
      streakLabel: 'Day Streak',
      questsDone: 'Quests done',
      worldsDone: 'Worlds done',
      badgesEarned: 'Badges',
      calloutNewTitle: 'Start your Quest journey!',
      calloutNewText: 'Every quest brings you closer to Python mastery. Your AI Copilot is waiting.',
      calloutReturnTitle: 'Come back tomorrow!',
      calloutReturnText: 'Start your streak series and collect bonus XP. Every day counts!',
      calloutCta: 'Let\'s go',
      nextBadge: 'Only {{remaining}} more until the »{{name}}« badge!'
    },

    // Partner
    partner: {
      sectionTitle: 'Your Learning Partners',
      sectionSubtitle: 'Two powerful companions for your Python journey — choose what you need right now.',
      classicLabel: 'Python Classic',
      classicTitle: 'Learn Structured',
      classicText: 'Detailed explanations, exercises and the PyBuddy project. The perfect companion when you really want to understand a topic.',
      classicCta: 'To Classic Tutorial',
      w3sLabel: 'W3Schools',
      w3sTitle: 'Try It Right Away',
      w3sText: 'The world\'s most popular Python reference with an interactive Try-it editor. Perfect when you want to quickly look up syntax or test code.',
      w3sCta: 'Open W3Schools',
      linkSetup: 'Setup',
      linkVariables: 'Variables',
      linkConditions: 'Conditions',
      linkFunctions: 'Functions',
      linkW3sTutorial: 'Tutorial',
      linkW3sRef: 'Reference',
      linkW3sTry: 'Try-it Editor',
      linkW3sEx: 'Exercises'
    },

    // Footer
    footer: {
      slogan: 'Think with AI. Act human.',
      platform: 'Platform',
      learn: 'Learn',
      legal: 'Legal',
      support: 'Support'
    },

    // Quest Page
    quest: {
      typeCode: 'Code Quest',
      typeReflection: 'Reflection',
      typeMorph: 'Code Morph',
      completed: 'Completed',
      worldProgress: 'World Progress',
      missionTitle: 'Your Mission',
      storyTitle: 'Why this matters',
      taskTitle: 'Your Task',
      successTitle: 'Success Criteria',
      mistakesTitle: 'Common Mistakes',
      proTipTitle: 'Pro Tip',
      docsTitle: 'Document Your Solution',
      w3schoolsTitle: 'Deep Dive on W3Schools',
      w3schoolsText: 'Check out the theory on W3Schools before you start. You can try things out directly in the browser!',
      w3schoolsDefaultLink: 'Learn on W3Schools',
      stepByStep: 'Step by step',
      reflectionIntro: 'Before completing the quest, answer this question. This shows that you understood what you did — and didn\'t just copy.',
      reflectionPlaceholderShort: 'Write your answer here... (at least 20 characters)',
      reflectionPrivacy: 'Your answer is saved locally. No one except you and your teacher sees it.',
      reflectionPromptTemplate: 'Write down your thoughts on this topic.',
      hintTitle: 'Show Hint',
      hintMistakes: 'Common Mistakes',
      sandboxTitle: 'Python Sandbox',
      verifyTitle: 'Verification',
      verifyQuestion: 'Before completing: What is the main output of your code?',
      reflectionTitle: 'Your Reflection',
      reflectionPrompt: 'Write your reflection here... At least 50 characters.',
      reflectionSave: 'Save',
      reflectionCounter: '{{count}} characters',
      completeBtn: 'Complete Quest',
      completedBtn: 'Already completed',
      completeSuccess: 'Quest completed!',
      completeXp: '+{{xp}} XP collected. Keep it up!',
      prev: 'Previous',
      next: 'Next',
      nextWorld: 'Next World',
      toHub: 'To Hub',
      classicLink: 'Learn more in the Python Classic Tutorial',
      copilotLabel: 'AI Copilot',
      proTipLabel: 'Pro Tip',
      copilotDefaultTip: 'Use the AI Copilot if you need help. Every quest is solvable!',
      morphPlaceholder: 'The Code Morpher will be available in a later update. Use the reflection to consolidate your knowledge.',
      morphDefaultPrompt: 'What are the 3 most important differences between JS and Python on this topic?',
      reflectionShortTitle: 'Reflection too short',
      reflectionShortText: 'Write at least 20 characters in the reflection field.'
    },

    // Sandbox
    sandbox: {
      lang: 'Python',
      reset: 'Reset',
      resetTitle: 'Reset code',
      resetDone: 'Code has been reset to initial state.',
      run: 'Run',
      runTitle: 'Run code',
      running: 'Loading...',
      clear: 'Clear',
      clearTitle: 'Clear console',
      console: 'Console',
      empty: 'Click "Run" to test your code.',
      loadingNote: 'The Python environment loads on first run (~30 seconds).',
      loading: 'Loading Python environment...',
      loadingTime: 'This may take 20-30 seconds on first load.',
      noOutput: 'No output. Your code was executed.',
      cleared: 'Console cleared. Ready for new code.',
      runningStatus: 'Running code...',
      unknownError: 'Unknown error',
      errorTitle: 'Error',
      copy: 'Copy'
    },

    // Validator
    validator: {
      colonMissing: 'Missing colon after "{{keyword}}"',
      printNeedsParens: 'print() needs parentheses in Python 3: print("Hello")',
      compareVsAssign: 'Check: did you mean == (comparison) or = (assignment)?',
      mixedTabsSpaces: 'Mixed tabs and spaces — use only spaces (4 per level)',
      trailingWhitespace: 'Trailing whitespace',
      unclosedString: 'Odd number of quotes — string not closed?',
      unclosedBracket: 'Unclosed bracket "{{bracket}}"',
      extraClosingBracket: 'Extra closing bracket "{{bracket}}"',
      line: 'Line'
    },

    // Classroom
    classroom: {
      activated: 'Classroom Mode activated',
      optimizedFor: 'Optimized for projector presentation. Press Shift+C to deactivate.'
    },

    // Toast Close
    toastClose: 'Close notification',

    // XP / Level
    xp: {
      level: 'Level',
      levelUp: 'Level Up!',
      levelUpText: 'You are now Level {{level}}!',
      continue: 'Continue!'
    },

    // Badges Engine
    badge: {
      newBadge: 'New Badge!',
      badgeEarned: 'You earned the "{{name}}" badge!',
      earned: 'Earned',
      locked: 'Locked'
    },

    // Toast
    toast: {
      streakTitle: 'Streak: {{count}} days!',
      streakText: 'Keep going! You are on the right track.',
      verifyCorrect: 'Correct!',
      verifyCorrectText: 'Your code was verified. You can complete the quest.',
      verifyWrong: 'Not quite',
      verifyWrongText: 'Double-check your code.',
      reflectionShort: 'Too short',
      reflectionShortText: 'Write at least 50 characters for a meaningful reflection.',
      notSoFast: 'Not so fast!',
      verifyFirst: 'Run your code or answer the verification before completing.',
      alreadyCompleted: 'Already completed',
      alreadyCompletedText: 'You have already finished this quest.',
      saved: 'Saved',
      savedText: 'Your reflection has been saved.',
      langSwitched: 'Language switched',
      langCurrent: 'Current: {{lang}}'
    },

    // Errors
    error: {
      noQuest: 'No quest selected. Choose a world in the Hub.',
      questNotFound: 'Quest not found.',
      pyodideLoad: 'Python environment could not be loaded. Please check your internet connection.',
      unknown: 'Unknown error'
    },

    // Mobile Nav
    mobile: {
      title: 'Navigation',
      close: 'Close navigation',
      toggleOpen: 'Open mobile navigation'
    },

    // Copilot

    tools: {
      title: 'Python Quest | Tools & Setup',
      metaDesc: 'Python Quest — Tools & Setup for Python web designers.',
      subtitle: 'Everything you need to use Python for web design.',
      heroTitle1: 'Tools & ',
      heroTitle2: 'Setup',
      sectionTitle: 'Tools',
      sectionSubtitle: 'Helpful tools for your Python journey.',
      vscodeTitle: 'VS Code:',
      vscodeText: 'The most popular code editor for Python. With IntelliSense, debugging and Git integration.',
      pythonTitle: 'Python 3',
      pythonText: 'The official Python interpreter. The heart of your development environment.',
      w3schoolsTitle: 'W3Schools Python',
      w3schoolsText: 'The best reference for Python basics. With interactive exercises and examples.',
      jsonTitle: 'JSON Formatter',
      jsonText: 'Format and validate JSON data. Essential for API development.',
      colorTitle: 'Color Converter',
      colorText: 'Convert HEX, RGB and HSL. The perfect tool for your design system.',
      regexTitle: 'Regex Tester',
      regexText: 'Test regular expressions in real time. With explanation and cheat sheet.',
      sandboxTitle: 'Python Sandbox',
      sandboxText: 'Test Python code directly in the browser. No installation, start immediately.',
      pypiTitle: 'PyPI — Python Packages',
      pypiText: 'The official Python Package Index. Find and install libraries with pip.',
      open: 'Open'
    },

    // FAB
    fab: {
      classroom: 'Classroom',
      worlds: 'Worlds',
      hub: 'Hub',
      top: 'Top',
      sectionLabel: 'Quick Access',
      scrollWorlds: 'Scroll to Worlds',
      scrollTop: 'Scroll to Top'
    },

    // FAB aria-labels

    // FAB aria-labels
    fabAria: {
      sectionLabel: 'Quick access',
      scrollWorlds: 'Scroll to worlds',
      scrollTop: 'Scroll to top'
    },

    // Bottom Bar
    bottomBar: {
      label: 'Mobile quick access'
    },

    // Teacher Dashboard
    teacher: {
      title: 'Python Quest | Teacher Dashboard',
      metaDesc: 'Teacher Dashboard for Python Quest — overview of progress, badges and reflections.',
      heroTitle1: 'Teacher ',
      heroTitle2: 'Dashboard',
      subtitle: 'Keep track of your class learning progress.',
      sectionOverview: 'Overview',
      sectionStudents: 'Students',
      sectionDetails: 'Quest Details',
      exportBtn: 'Export class data',
      importBtn: 'Import student data',
      noData: 'No data available yet. Students can export their progress and import it here.',
      totalProgress: 'Total Progress',
      questsCompleted: 'Quests completed',
      avgLevel: 'Average Level',
      totalBadges: 'Badges earned',
      studentName: 'Name',
      studentLevel: 'Level',
      studentXp: 'XP',
      studentQuests: 'Quests',
      studentBadges: 'Badges',
      studentStreak: 'Streak',
      studentLastActive: 'Last active',
      statusActive: 'Active',
      statusInactive: 'Inactive',
      demoNote: 'Note: This dashboard currently works with local data. With Supabase integration, class management and real-time synchronization will be possible.',
      reflectionSection: 'Reflections',
      noReflections: 'No reflections saved yet.'
    },

    // Page-specific
    index: {
      title: 'Python Quest | Python for Web Designers',
      metaDesc: 'Python Quest — Learn Python playfully as an AI Copilot for web designers. 5 worlds, 15 quests, real Python sandbox.',
      logoLabel: 'Python Quest — Homepage'
    },

    // Copilot
    copilot: {
      hello: 'Hello! I am your AI Copilot.',
      closeHint: 'Close hint',
      welcome: 'Welcome to Python Quest! Click on a world to get started.',
      continue: 'Hey! Want to continue?',
      levelUp: 'Level Up! I have grown!'
    }
  }
};
