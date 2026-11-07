/**
 * Quest Data — Alle Welten, Quests und Badges
 * Handlungsorientierte Aufgaben mit klarem Ziel und "Aha!"-Moment
 */

export const worlds = [
  {
    id: 'welt-1',
    title: 'Die digitale Stadt',
    description: 'Baue die Grundlagen des Webs. Lerne HTML-Elemente, Struktur und Semantik.',
    icon: 'ph-buildings',
    color: '#E67E22',
    locked: false,
    quests: [
      {
        id: 'q1-1',
        title: 'Dein erstes Haus',
        description: 'Jede Webseite ist wie ein Gebäude: Sie braucht ein Fundament, Wände und ein Dach. In HTML nennen wir das Grundgerüst. Ohne dieses Gerüst stürzt alles ein.',
        why: 'Das Grundgerüst ist die Basis jeder Webseite im Internet — ohne Ausnahme. Wenn du das beherrschst, verstehst du, wie Google, YouTube und Instagram intern funktionieren. Außerdem: Ohne <!DOCTYPE html> zeigen manche Browser deine Seite falsch an, und ohne <meta charset="UTF-8"> werden deutsche Umlaute (ä, ö, ü) zu Kauderwelsch.',
        icon: 'ph-house',
        xp: 15,
        duration: '5 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/html/html_intro.asp',
        steps: [
          'Öffne VS Code, gehe auf Datei → Neu und speichere sofort als index.html (das ist wie der Eingang deines Hauses)',
          'Schreibe das Grundgerüst. Tipp: <!DOCTYPE html> sagt dem Browser "Das ist eine moderne Webseite". <html> ist der Rahmen, <head> ist der Briefkopf (unsichtbar für Besucher) und <body> ist der sichtbare Inhalt. Siehe den Sandbox-Code unten als Vorlage!',
          'Füge im <head> ein: <meta charset="UTF-8"> (damit äöü funktionieren) und <title>Meine erste Seite</title> — das ist der Name im Browser-Tab',
          'Schreibe im <body> einen Kommentar <!-- Mein erster Code --> und darunter: <h1>Hallo Welt!</h1>',
          'Speichere (Strg+S) und öffne mit Live Server (rechte Maustaste → "Open with Live Server"). Wenn du "Hallo Welt!" siehst — Glückwunsch, dein Haus steht!'
        ],
        commonMistakes: [
          '<!DOCTYPE html> in Kleinbuchstaben schreiben (HTML ist case-insensitive, aber Großbuchstaben ist Konvention)',
          '<title> in den <body> statt in den <head> packen — dann wird er nicht im Tab angezeigt',
          'Tags nicht schließen: <h1>Hallo Welt! vergessen das </h1> — der Browser "rät" dann, wo es endet, und das kann Chaos verursachen',
          'Die Datei als .txt statt .html speichern — dann öffnet sie sich im Editor statt im Browser'
        ],
        proTip: 'Nutze in VS Code die Tastenkombination ! + Tab (Emmet). Damit wird das komplette HTML5-Grundgerüst automatisch erzeugt. Das spart dir jedes Mal 30 Sekunden.',
        successCriteria: 'Dein Browser-Tab zeigt "Meine erste Seite" an. Im Browser-Fenster siehst du "Hallo Welt!" als große Überschrift.'
      },
      {
        id: 'q1-2',
        title: 'Schilder anbringen',
        description: 'Eine Stadt ohne Schilder wäre chaotisch. Überschriften und Absätze sind die Schilder deiner Webseite — sie zeigen dem Besucher, was wichtig ist.',
        why: 'Semantik ist der Unterschied zwischen einem Amateur und einem Profi. Suchmaschinen (Google) und Screenreader (für blinde Menschen) verstehen <h1> als "das Wichtigste auf der Seite". Wenn du stattdessen <p style="font-size:32px"> nimmst, sieht es für sehende Menschen gleich aus — aber Google und Screenreader verstehen nicht, dass das eine Überschrift ist. Das ist wie ein Buch ohne Kapitelüberschriften: Man kann es lesen, aber man findet nichts.',
        icon: 'ph-tag',
        xp: 15,
        duration: '5 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/html/html_headings.asp',
        steps: [
          'Öffne deine index.html aus Quest 1 (wir bauen auf dem Fundament auf!)',
          'Füge unter <h1>Hallo Welt!</h1> eine <h2>Über mich</h2> hinzu — das ist dein erstes Kapitel',
          'Schreibe darunter zwei Absätze mit <p>: Einen über dich selbst und einen über dein Lieblingshobby. Nutze in einem davon <strong> für ein wichtiges Wort',
          'Füge ein drittes Wort mit <em> hervor (kursiv) — das ist wie leise, betonte Sprache im Text',
          'Teste: Ersetze <h2> durch <h7> und schau im Browser, was passiert. Dann: Versuch es mit <h1> zweimal in deiner Seite — ist das erlaubt? (Spoiler: Technisch ja, aber semantisch ein No-Go!)'
        ],
        commonMistakes: [
          '<h1> mehrfach verwenden — es gibt nur EINE Hauptüberschrift pro Seite (wie ein Buchtitel)',
          'Überschriften überspringen: <h1> direkt gefolgt von <h4> — das verwirrt Screenreader. Reihenfolge: h1 → h2 → h3...',
          '<strong> nur für Optik verwenden — eigentlich ist es für WICHTIGKEIT gedacht. Für reines Fett-machen nutzt man später CSS',
          'Leere Absätze (<p></p>) für Abstand nutzen — das ist wie Luft zwischen Wörtern durch Leertasten zu erzeugen. Später lernst du margin/padding in CSS'
        ],
        proTip: 'Google liest deine Seite wie ein Blinder: Von oben nach unten, und es zählt nur der Text. Wenn du <h1>Mein Gaming-Blog</h1> schreibst, weiß Google sofort, worum es geht. Das nennt man SEO (Search Engine Optimization) — und es entscheidet darüber, ob deine Seite auf Seite 1 oder Seite 100 der Google-Suchergebnisse landet.',
        successCriteria: 'Deine Seite hat genau eine <h1>, mindestens eine <h2>, zwei <p>, ein <strong> und ein <em>. Die Seite sieht strukturiert aus — nicht wie ein Text-Wirrwarr.'
      },
      {
        id: 'q1-3',
        title: 'Bilder aufhängen',
        description: 'Eine Stadt ohne Bilder wäre langweilig. Mit dem <img>-Tag bringst du Fotos in deine Webseite — aber jedes Bild braucht eine Quelle und eine Beschreibung.',
        why: 'Bilder machen eine Webseite lebendig — aber sie sind auch die häufigste Fehlerquelle. 60% aller defekten Webseiten haben ein Problem mit Bildpfaden. Und der alt-Text ist nicht nur ein nettes Extra: Er ist in vielen Ländern per Gesetz für Barrierefreiheit vorgeschrieben. Außerdem: Wenn ein Bild nicht lädt, zeigt der Browser den alt-Text an — so weiß der Besucher zumindest, was er verpasst.',
        icon: 'ph-image',
        xp: 20,
        duration: '7 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/html/html_images.asp',
        steps: [
          'Erstelle im VS Code einen Ordner images/ in deinem Projekt (Rechtsklick → Neuer Ordner). So bleibt dein Projekt übersichtlich — Profis nennen das "Ordnerstruktur"',
          'Lade ein Bild herunter: Gehe auf unsplash.com, suche nach einem passenden Foto zu deinem Hobby, klicke auf den Download-Pfeil. WICHTIG: Unsplash-Bilder sind kostenlos, aber bei Google-Bildern musst du auf Lizenzen achten! Speichere es als images/hobby.jpg',
          'Füge das Bild in deinen <body> ein: <img src="images/hobby.jpg" alt="[Beschreibe hier, was auf dem Bild zu sehen ist]" width="400">. Das width-Attribut sorgt dafür, dass das Bild nicht größer ist als dein Browserfenster',
          'Schreibe einen alt-Text, der das Bild für einen Blinden beschreibt. Schlecht: "Bild". Gut: "Ein roter E-Drum-Set in einem Jugendzimmer mit Postern an der Wand"',
          'Teste absichtlich: Ändere src auf "images/falsch.jpg" — siehst du den alt-Text? Lösche das alt-Attribut komplett — was zeigt der Browser dann?'
        ],
        commonMistakes: [
          'Den vollständigen Windows-Pfad verwenden: src="C:\\Benutzer\\Max\\Desktop\\bild.jpg" — das funktioniert nur auf DEINEM Computer, nirgendwo sonst. Immer relative Pfade nutzen!',
          'Alt-Text weglassen oder nur "Bild" schreiben — das ist wie einen Film ohne Ton zu beschreiben: "Es ist ein Film"',
          'Vergessen, width oder height anzugeben — dann lädt das Bild in voller Auflösung (z. B. 4000px) und deine Seite wird träge',
          'Leerzeichen im Dateinamen: hobby foto.jpg — der Browser interpretiert das als zwei separate Dateien. Benutze Bindestriche: hobby-foto.jpg'
        ],
        proTip: 'Nutze für Webseiten immer das WebP-Format statt JPG, wenn möglich. WebP-Bilder sind 25-35% kleiner bei gleicher Qualität — das bedeutet, deine Seite lädt schneller und Google belohnt das mit besseren Rankings. Tools wie Squoosh.app (von Google) konvertieren Bilder kostenlos.',
        successCriteria: 'Dein Bild wird korrekt angezeigt, hat einen aussagekräftigen alt-Text und passt in die Seite (nicht größer als der Bildschirm). Wenn du den Dateinamen falsch schreibst, siehst du den alt-Text als Platzhalter.'
      },
      {
        id: 'q1-4',
        title: 'Straßen verbinden',
        description: 'Eine Stadt braucht Straßen, die Orte verbinden. Links sind die Straßen des Webs — sie führen von deiner Seite zu anderen Orten. Ohne Links wäre das Internet isolierte Inseln.',
        why: 'Links sind die DNA des Internets. Tim Berners-Lee hat das Web 1989 erfunden, und seine zentrale Idee war: Informationen verlinken. Google funktioniert nur, weil es Links folgt. Deine Website ist nur dann eine "richtige" Website, wenn sie Verbindungen hat — zu anderen Seiten deines Projekts ODER zum Rest des Webs. Ohne Links ist deine Seite eine Insel.',
        icon: 'ph-link',
        xp: 20,
        duration: '7 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/html/html_links.asp',
        steps: [
          'Erstelle eine zweite Datei in VS Code: kontakt.html. Schreibe das komplette Grundgerüst hinein (du kennst es schon aus Quest 1!). Füge eine <h1>Kontakt</h1> und einen <p>Absatz mit deiner (fiktiven) E-Mail-Adresse hinzu',
          'Gehe zurück zu index.html und erstelle einen Link zu deiner Kontaktseite: <a href="kontakt.html">Schreib mir!</a>. Das ist ein RELATIVER Link — er sucht die Datei im SELBEN Ordner. Das ist der wichtigste Link-Typ in der Praxis',
          'Erstelle einen Link zu W3Schools (oder einer anderen Seite, die du magst): <a href="https://www.w3schools.com">W3Schools besuchen</a>. Das ist ein ABSOLUTER Link — er führt zu einer kompletten Web-Adresse',
          'Mache den externen Link sicher: Füge target="_blank" hinzu (öffnet neuen Tab) UND rel="noopener noreferrer" (schützt vor Tab Nabbing, einem Hacker-Angriff, bei dem die alte Seite deine neue Seite kontrolliert)',
          'Bonus: Erstelle einen Mailto-Link: <a href="mailto:dein.name@schule.at">E-Mail schreiben</a>. Wenn jemand draufklickt, öffnet sich automatisch sein E-Mail-Programm!'
        ],
        commonMistakes: [
          'target="_blank" ohne rel="noopener noreferrer" verwenden — das ist ein echtes Sicherheitsrisiko. Stell dir vor, ein bösartiges JavaScript auf der Zielseite könnte deine Seite umleiten',
          'Den Dateinamen falsch schreiben: kontakt.html vs Kontakt.html — auf manchen Servern (Linux) ist das ein Unterschied! Immer Kleinbuchstaben und Bindestriche verwenden',
          'Vergessen, den Link-Text aussagekräftig zu machen. Schlecht: "Klicke hier". Gut: "Meine Kontaktseite besuchen". Google und Screenreader lieben beschreibende Links',
          'Absoluten Pfad für interne Links verwenden: href="https://mein-pc/c/users/max/..." — das funktioniert nur auf deinem Rechner. Für eigene Seiten immer relative Pfade!'
        ],
        proTip: 'In der Praxis verlinken professionelle Webseiten intern (zu eigenen Unterseiten) viel häufiger als extern. Warum? Weil jeder externe Link ein "Exit" ist — der Besucher verlässt deine Seite. Ein guter Web-Designer baut ein "Spinnennetz" aus internen Links, das den Besucher auf der Seite hält. Das nennt man "Internal Linking" und ist ein wichtiger SEO-Faktor.',
        successCriteria: 'Deine index.html hat mindestens zwei funktionierende Links: einen internen (kontakt.html) und einen externen (mit target="_blank" und rel="noopener noreferrer"). Beide Links sind aussagekräftig beschriftet. Der Mailto-Link ist optional, aber cool.'
      },
      {
        id: 'q1-5',
        title: 'Der Dorfplatz',
        description: 'BOSS-QUEST: Du hast die Bausteine gelernt — jetzt baust du deine erste echte Website! Kombiniere alles und erschaffe einen Ort, der dir gehört.',
        why: 'Diese BOSS-Quest ist dein erstes echtes Portfolio-Stück. Wenn du dich später für ein Praktikum oder eine Lehre bewirbst, kannst du diese Seite zeigen. Aber noch wichtiger: Du lernst hier, wie man ein großes Projekt in kleine Schritte zerlegt. Das ist DIE wichtigste Fähigkeit eines Entwicklers — nicht das Tippen, sondern das Denken in Strukturen.',
        icon: 'ph-buildings',
        xp: 50,
        duration: '15 Min.',
        type: 'project',
        w3schools: 'https://www.w3schools.com/html/html5_semantic_elements.asp',
        steps: [
          'Wähle ein Thema, das dich BEGEISTERT (nicht das, das dir eingefallen ist). Ideen: Lieblings-Game, Sportverein, Lieblingsband, Hobby (Skaten, Kochen, Zeichnen), dein Traumberuf. Begeisterung merkt man im Code!',
          'Plane die Struktur auf Papier oder im Editor: Was steht auf der Startseite? Was auf der Unterseite? Skizziere grob: Header (Name/Logo), Main (Inhalt), Footer (Kontakt/Impressum). Das ist dein Bauplan — ohne Bauplan wirds chaotisch',
          'Baue die Startseite (index.html): Grundgerüst, <h1> mit deinem Thema, mindestens zwei <h2>-Kapitel, drei <p>-Absätze, ein <img>, zwei <a> (intern + extern), eine <ul> mit 3-5 Punkten (z. B. "Top 5 Gründe, warum ich Skaten liebe")',
          'Baue eine Unterseite (z. B. ueber-mich.html oder details.html) mit weiteren Infos. Verlinke beide Seiten miteinander — jede Seite sollte einen Link zur anderen haben. Teste alle Links!',
          'Selbstbewertung: Gehe die Rubrik unten durch. Wenn du 4/5 Punkte erfüllst, ist deine Seite bereit für die Abgabe. Speichere Screenshots von deinem Code und dem Browser-Ergebnis im Ordner "lösungen"'
        ],
        commonMistakes: [
          'Alles in eine einzige HTML-Datei packen — das ist wie ein Haus ohne Zimmer. Unterseiten machen eine Website professionell',
          'Bilder von Google kopieren ohne Lizenzprüfung — das kann teuer werden (Abmahnungen). Nutze immer Unsplash, Pexels oder eigene Fotos',
          'Vergessen, alle Tags zu schließen — ein offenes <a> oder <div> "frisst" den Rest der Seite. Im Browser F12 drücken und im Element-Inspector prüfen',
          'Denken, "es muss perfekt sein" — eine funktionierende, einfache Seite ist 100x besser als eine perfekte, die nie fertig wird. Fertig ist besser als perfekt!'
        ],
        proTip: 'Bevor du abgibst, teste deine Seite mit dem W3C HTML Validator (validator.w3.org). Gib deinen Code ein und klicke "Check". Der Validator zeigt dir alle Fehler — nicht böse gemeint, sondern wie ein Lehrer, der deine Rechtschreibung korrigiert. Professionelle Entwickler nutzen den Validator vor JEDER Veröffentlichung.',
        successCriteria: 'Dein Projekt hat 2 HTML-Dateien, die miteinander verlinkt sind. Die Startseite enthält: h1, h2, p, img, a, ul. Alle Bilder laden korrekt, alle Links funktionieren, der Code ist ordentlich eingerückt (Format Document: Shift+Alt+F in VS Code). Screenshots sind im Ordner "lösungen" gespeichert.'
      }
    ]
  },
  {
    id: 'welt-2',
    title: 'Die Farbenfestung',
    description: 'CSS macht deine Seite schön. Farben, Schriften, Box-Modell — hier lernst du das Design.',
    icon: 'ph-paint-brush',
    color: '#27AE60',
    locked: true,
    quests: [
      {
        id: 'q2-1',
        title: 'Die Farbpalette',
        description: 'Eine graue Festung würde niemanden beeindrucken. Mit CSS verleihst du deiner Seite Farbe — und zwar ganz gezielt. color für Text, background-color für Hintergründe.',
        why: 'Farben sind der erste Sinneseindruck einer Webseite. Bevor ein Besucher einen einzigen Satz liest, hat er bereits eine emotionale Reaktion auf die Farben. Unternehmen investieren Millionen in Farbpsychologie: McDonalds Gelb weckt Hunger, Facebook Blau signalisiert Vertrauen, Netflix Rot erzeugt Spannung. CSS-Farben sind nicht nur Dekoration — sie sind Kommunikation. Ohne CSS wäre das Web ein grauer Text-Monolith wie in den 90ern. Mit Farben gibst du deiner Seite Persönlichkeit, lenkst die Aufmerksamkeit und schaffst visuelle Hierarchie.',
        icon: 'ph-paint-brush',
        xp: 15,
        duration: '5 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/css/css_colors.asp',
        steps: [
          'Erstelle eine Datei style.css',
          'Verlinke sie im <head>: <link rel="stylesheet" href="style.css">',
          'Style die h1-Überschrift: h1 { color: #E67E22; }',
          'Gib dem body einen Hintergrund: body { background-color: #f5f5f5; }',
          'Experimentiere: Probiere rgb(255, 100, 50) oder hsl(200, 70%, 50%) aus!'
        ],
        commonMistakes: [
          'Farbnamen statt Hex/RGB verwenden: color: red ist ungenau (jeder Browser zeigt ein leicht anderes Rot)',
          'Keinen Kontrast prüfen: Hellgrauer Text auf weißem Hintergrund ist für ältere Menschen und Sehbehinderte unlesbar',
          'HSL vernachlässigen: HSL ist intuitiver als RGB, weil du Farbton, Sättigung und Helligkeit separat steuerst',
          'Inline-Styles statt CSS-Datei: <p style="color: red"> statt .warn { color: red } — das macht Wartung unmöglich'
        ],
        proTip: 'Nutze Tools wie coolors.co oder Adobe Color, um harmonische Farbpaletten zu generieren. Ein Profi-Geheimnis: Beschränke dich auf 3 Farben (60-30-10 Regel: 60% Hauptfarbe, 30% Sekundär, 10% Akzent). Weniger ist mehr.',
        successCriteria: 'Deine style.css ist verlinkt und enthält mindestens 3 Farbregeln. Du hast Hex, RGB und mindestens eine weitere Notation (hsl oder rgba) ausprobiert. Der Kontrast zwischen Text und Hintergrund ist deutlich sichtbar.'
      },
      {
        id: 'q2-2',
        title: 'Die Schriftrolle',
        description: 'Die Schrift ist die Stimme deiner Webseite. Fette Überschriften, elegante Fließtexte, zentrierte Zitate — mit CSS kontrollierst du, wie deine Worte wirken.',
        why: 'Schrift ist die Stimme deiner Webseite. Stell dir vor, ein Anwalt würde in Comic Sans schreiben — niemand würde ihn ernst nehmen. Schriftarten transportieren Emotion, Professionalität und Lesbarkeit. Google Fonts bietet über 1500 kostenlose Schriften, die auf Milliarden von Geräten funktionieren. Ohne Schriftsteuerung würden alle Webseiten in Times New Roman aussehen (die Standard-Schrift der meisten Browser). Mit CSS bestimmst du nicht nur WIE groß die Schrift ist, sondern WIE sie sich anfühlt.',
        icon: 'ph-pencil-simple',
        xp: 15,
        duration: '5 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/css/css_font.asp',
        steps: [
          'Ändere die Schriftart der ganzen Seite: body { font-family: Arial, sans-serif; }',
          'Mache die h1 größer: h1 { font-size: 36px; }',
          'Zentriere die h1: h1 { text-align: center; }',
          'Mache einen Absatz etwas größer: p { font-size: 18px; line-height: 1.6; }',
          'Bonus: Probiere Google Fonts aus — verlinke eine kostenlose Schrift!'
        ],
        commonMistakes: [
          'Zu viele verschiedene Schriftarten auf einer Seite (max. 2–3!)',
          'px statt rem/em verwenden: px ist fix, rem skaliert mit den Browser-Einstellungen des Users (Barrierefreiheit!)',
          'Zu kleine Schrift (< 16px) auf Handys — das zwingt User zum Zoomen',
          'Google Fonts nicht richtig einbinden: Den Link im <head> vergessen oder die CSS-Regel font-family falsch schreiben'
        ],
        proTip: 'Die perfekte Zeilenhöhe (line-height) für Fließtext ist 1.5 bis 1.7. Das ist der "Goldene Schnitt" der Lesbarkeit. Weniger wirkt gedrängt, mehr wirkt auseinandergerissen.',
        successCriteria: 'Deine Seite hat eine einheitliche Schriftart (via body), mindestens 3 verschiedene Schriftgrößen (h1, h2, p) und eine angenehme Zeilenhöhe. Die Schrift ist auf dem Handy gut lesbar.'
      },
      {
        id: 'q2-3',
        title: 'Die Kisten-Meisterin',
        description: 'Jedes HTML-Element ist eine Box. Padding schafft Platz nach innen, Border zeichnet den Rand, Margin hält Abstand nach außen. Wer das beherrscht, beherrscht das Layout.',
        why: 'Das Box-Modell ist das Fundament jedes Layouts im Web. Jedes HTML-Element ist eine Box — auch wenn du es nicht siehst. Padding, Border und Margin sind die drei Dimensionen, die bestimmen, wie viel Platz ein Element einnimmt und wie weit es von anderen entfernt ist. Wenn du das Box-Modell nicht verstehst, wirst du niemals verstehen, warum dein Button plötzlich 20 Pixel breiter ist als erwartet. Das Box-Modell ist der Unterschied zwischen einem "funktioniert irgendwie"-Layout und einem "ich weiß genau, warum das so aussieht"-Layout.',
        icon: 'ph-package',
        xp: 25,
        duration: '10 Min.',
        type: 'interactive',
        w3schools: 'https://www.w3schools.com/css/css_boxmodel.asp',
        steps: [
          'Erstelle ein div mit Text: <div class="kiste">Inhalt</div>',
          'Gib ihm padding: 20px — der Text hat jetzt Platz zum Atmen',
          'Füge einen Rahmen hinzu: border: 3px solid #27AE60;',
          'Füge Außenabstand hinzu: margin: 20px; — die Kiste schwebt frei',
          'Experimentiere in der Sandbox: Was passiert bei border: 10px dashed red?'
        ],
        commonMistakes: [
          'padding und margin verwechseln: padding ist INNEN (Platz für den Inhalt), margin ist AUSSEN (Platz zu anderen Elementen)',
          'box-sizing: border-box vergessen: Ohne border-box wird die Border zur Gesamtbreite addiert — ein div mit width: 200px + padding: 20px + border: 2px ist plötzlich 244px breit',
          'Margin-Collapse ignorieren: Wenn zwei Elemente übereinander margin haben, kollabieren sie (der größere gewinnt) — das verwirrt Anfänger enorm',
          'Negative margin verwenden, um Layout-Probleme zu "fixen" — das ist wie Klebeband an einer kaputten Brille'
        ],
        proTip: 'Setze am Anfang deiner CSS-Datei immer: * { box-sizing: border-box; }. Das ist der "Reset", den 95% aller professionellen Webseiten verwenden. Er macht das Box-Modell intuitiv: Die width ist die width, Punkt.',
        successCriteria: 'Du hast mindestens ein Element mit padding, border UND margin gestylt. Du verstehst visuell den Unterschied zwischen Innenabstand (padding) und Außenabstand (margin). Die Gesamtbreite des Elements entspricht deiner Erwartung.'
      },
      {
        id: 'q2-4',
        title: 'Der gezielte Zauber',
        description: 'Bisher hast du alle Elemente gleich gestaltet. Aber manchmal willst du nur EINES treffen — genau wie ein Zauber, der nur das richtige Ziel trifft. Klassen und IDs sind deine Zielzauber.',
        why: 'Bisher hast du alle h1, alle p, alle div gleich gestaltet. Aber echte Webseiten sind vielfältig: Ein Button soll grün sein, der andere rot. Eine Karte soll hervorgehoben werden, die andere nicht. Klassen und IDs sind die Werkzeuge, mit denen du gezielt einzelne Elemente ansprechst. Ohne sie wärst du auf universelle Regeln beschränkt — wie ein Maler, der nur eine Pinselgröße hat. Klassen ermöglichen Wiederverwendung (ein Button-Style für 10 Buttons), IDs markieren Einzigartigkeit (die Hauptüberschrift, die es nur einmal gibt).',
        icon: 'ph-target',
        xp: 20,
        duration: '7 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/css/css_selectors.asp',
        steps: [
          'Gib einem p-Tag eine Klasse: <p class="highlight">Wichtig!</p>',
          'Style die Klasse: .highlight { background-color: yellow; }',
          'Gib einem Element eine ID: <h2 id="spezial">Besonders</h2>',
          'Style die ID: #spezial { color: red; font-size: 28px; }',
          'Merke dir: Klassen (.) können mehrfach verwendet werden, IDs (#) nur einmal!'
        ],
        commonMistakes: [
          'IDs für wiederholende Elemente verwenden: #button für 5 Buttons — IDs müssen auf der ganzen Seite einzigartig sein',
          'Klassennamen beschreiben das Aussehen statt den Zweck: .red-box statt .warning — wenn du später die Farbe änderst, stimmt der Name nicht mehr',
          'Zu spezifische Selektoren: div.container > p.highlight span — das ist schwer wartbar und überschreibt andere Regeln unerwartet',
          '!important als erstes Mittel verwenden: Das ist der "Atomkrieg" der CSS-Spezifität. Nur als letztes Mittel!'
        ],
        proTip: 'BEM (Block Element Modifier) ist das Namensschema der Profis: .card__title--highlighted. Block = Komponente, Element = Teil davon, Modifier = Variante. Das verhindert Namenskollisionen und macht CSS selbsterklärend.',
        successCriteria: 'Du hast mindestens 2 verschiedene Klassen erstellt und gestylt. Eine ID wird korrekt verwendet (nur einmal pro Seite). Deine Klassennamen beschreiben den Zweck, nicht das Aussehen.'
      },
      {
        id: 'q2-5',
        title: 'Gestalte die Festung',
        description: 'BOSS-QUEST: Du hast alle Werkzeuge. Jetzt gestaltest du deine Seite aus Welt 1 so, dass sie aussieht wie eine professionelle Website. Farben, Abstände, Schriften — alles kommt zusammen.',
        why: 'Diese BOSS-Quest ist der Moment, in dem HTML und CSS zusammenfinden. Bisher hast du Struktur (HTML) und Styling (CSS) getrennt gelernt — jetzt kombinierst du sie zu einer kohärenten Website. Das ist der Unterschied zwischen "ich kann einzelne Techniken" und "ich kann eine Webseite bauen". Professionelle Webseiten leben von Konsistenz: Einheitliche Farben, durchgängige Abstände, klare Hierarchie. Diese Quest zwingt dich, Design-Entscheidungen zu treffen — nicht nur technische.',
        icon: 'ph-castle',
        xp: 50,
        duration: '15 Min.',
        type: 'project',
        w3schools: 'https://www.w3schools.com/css/css_howto.asp',
        steps: [
          'Style deine Seite aus Welt 1 mit einem einheitlichen Farbschema (mindestens 3 Farben)',
          'Erstelle ein schönes Karten-Design mit dem Box-Modell (padding, border, margin)',
          'Nutze Klassen, um verschiedene Bereiche unterschiedlich zu stylen',
          'Sorge für gute Lesbarkeit: ausreichend Kontrast zwischen Text und Hintergrund',
          'Vergleiche dein Ergebnis mit einer echten Webseite — was fehlt noch?'
        ],
        commonMistakes: [
          'Inline-Styles statt CSS-Datei verwenden (alte Gewohnheiten aus Welt 1 hängen bleiben)',
          'Kein Farbschema planen: Einfach wild Farben ausprobieren — das führt zu "Regenbogen-Seiten"',
          'Zu viele verschiedene Schriftarten und -größen (Chaos statt Harmonie)',
          'Mobile nicht testen: Eine Seite, die auf dem Desktop gut aussieht, kann auf dem Handy unbrauchbar sein'
        ],
        proTip: 'Erstelle vor dem Coden eine einfache "Style Guide" auf Papier: 3 Farben, 2 Schriftarten, 4 Abstandsgrößen. Wenn du dich daran hälst, sieht deine Seite professionell aus — auch wenn du kein Designer bist.',
        successCriteria: 'Deine Welt-1-Seite hat ein einheitliches Farbschema (mindestens 3 Farben), konsistente Abstände, lesbare Schrift und sieht auf dem Handy genauso gut aus wie auf dem Computer. CSS ist komplett in einer externen Datei.'
      }
    ]
  },
  {
    id: 'welt-3',
    title: 'Das responsive Königreich',
    description: 'Deine Seite soll auf jedem Gerät gut aussehen. Flexbox, Grid und Media Queries!',
    icon: 'ph-device-mobile',
    color: '#2980B9',
    locked: true,
    quests: [
      {
        id: 'q3-1',
        title: 'Flexibles Bauen',
        description: 'Stell dir vor, deine Gebäude könnten sich automatisch an den Platz anpassen. Mit Flexbox geht das: Elemente ordnen sich nebeneinander an, verteilen sich gleichmäßig oder rücken zusammen.',
        why: 'Vor Flexbox war das Web-Layout ein Albtraum. Entwickler mussten Tricks wie float: left verwenden, die nie für Layouts gedacht waren. Flexbox wurde 2009 erfunden und hat das Web revolutioniert: Endlich konnte man Elemente horizontal und vertikal zentrieren — etwas, das vorher nur mit Hacks möglich war. Flexbox ist heute in 98% aller Webseiten im Einsatz. Wenn du eine Navigation, eine Karten-Reihe oder ein Footer-Layout baust, ist Flexbox meistens die richtige Wahl.',
        icon: 'ph-ruler',
        xp: 20,
        duration: '8 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/css/css3_flexbox.asp',
        steps: [
          'Erstelle ein Container-div: <div class="flexbox">...</div>',
          'Aktiviere Flexbox: .flexbox { display: flex; }',
          'Erstelle 3 kleine divs als Kinder mit unterschiedlichem Inhalt',
          'Experimentiere: justify-content: center, space-between, space-around',
          'Bonus: Probiere align-items: center aus — vertikale Zentrierung war nie einfacher!'
        ],
        commonMistakes: [
          'display: flex auf dem falschen Element setzen: Es gehört auf den CONTAINER, nicht auf die Kinder',
          'justify-content und align-items verwechseln: justify-content steuert die HAUPTACHSE (horizontal bei row), align-items die KREUZACHSE (vertikal)',
          'flex-direction: column vergessen und sich wundern, warum die Elemente nebeneinander statt untereinander sind',
          'gap nicht kennen: Statt margin auf jedes Kind zu setzen, reicht gap: 20px auf dem Container — sauberer und wartbarer'
        ],
        proTip: 'Die Kombination display: flex; justify-content: center; align-items: center; zentriert ein Element perfekt horizontal UND vertikal — das war vor Flexbox fast unmöglich. Das ist der "Holy Grail" der Webentwicklung.',
        successCriteria: 'Dein Flexbox-Container enthält mindestens 3 Elemente, die sich nebeneinander anordnen. Du hast justify-content und align-items ausprobiert. Die Elemente haben gleichmäßige Abstände (gap oder margin).'
      },
      {
        id: 'q3-2',
        title: 'Das Raster-System',
        description: 'CSS Grid ist wie ein Schachbrett für deine Webseite. Du definierst Reihen und Spalten — und die Elemente fallen wie von selbst an den richtigen Platz. Kein Chaos mehr, nur Ordnung.',
        why: 'Während Flexbox eindimensional ist (eine Reihe oder eine Spalte), ist Grid zweidimensional: Reihen UND Spalten gleichzeitig. Grid wurde 2017 eingeführt und ist das modernste Layout-System des Webs. Es löst Probleme, die vorher nur mit komplexen Frameworks (Bootstrap, Foundation) lösbar waren. Mit grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); erstellst du ein responsives Raster, das automatisch von 4 Spalten auf dem Desktop auf 1 Spalte auf dem Handy springt — in EINER Zeile CSS. Das ist Magie.',
        icon: 'ph-squares-four',
        xp: 25,
        duration: '10 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/css/css_grid.asp',
        steps: [
          'Erstelle einen Grid-Container: <div class="grid">...</div>',
          'Definiere Spalten: .grid { display: grid; grid-template-columns: 1fr 1fr 1fr; }',
          'Erstelle 6 Karten als Grid-Items mit unterschiedlichem Inhalt',
          'Füge Abstände hinzu: gap: 20px;',
          'Bonus: Probiere grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); aus!'
        ],
        commonMistakes: [
          'Grid auf den Items statt auf den Container setzen: display: grid gehört auf das Eltern-Element',
          'fr und % verwechseln: 1fr verteilt den verbleibenden Platz, 33.33% ist fix — bei unterschiedlichen Inhalten entstehen Lücken',
          'grid-gap statt gap verwenden: grid-gap ist veraltet, moderne Browser verstehen einfach gap',
          'Zu komplexe Grid-Definitionen: grid-template-areas ist mächtig, aber für Anfänger oft verwirrend — starte mit einfachen Spalten'
        ],
        proTip: 'repeat(auto-fit, minmax(250px, 1fr)) ist der einzeilige Layout-Killer. Er erstellt so viele Spalten wie möglich (mindestens 250px breit) und verteilt den Rest gleichmäßig. Das ist die Basis von 80% aller modernen Karten-Layouts.',
        successCriteria: 'Dein Grid hat mindestens 3 Spalten und 2 Reihen. Die Abstände zwischen den Elementen sind gleichmäßig (gap). Das Grid passt sich visuell an verschiedene Breiten an.'
      },
      {
        id: 'q3-3',
        title: 'Die Zauberlupe',
        description: 'Deine Webseite sieht auf dem Handy anders aus als auf dem Computer? Das ist kein Bug — das ist Absicht. Media Queries sind die Zauberlupe, die die Bildschirmgröße erkennt und deinen Code anpasst.',
        why: 'Über 60% aller Webseiten-Besuche kommen heute von mobilen Geräten. Wenn deine Seite nicht auf dem Handy funktioniert, verlierst du die Mehrheit deiner Besucher. Google bestraft nicht-responsive Seiten mit schlechteren Rankings. Media Queries sind das Werkzeug, mit dem du deine Seite für jedes Gerät optimierst — nicht als nachgedachte "Mobile-Version", sondern als integraler Bestandteil des Designs. "Mobile First" bedeutet: Du designst zuerst für das Handy und erweiterst dann für größere Bildschirme.',
        icon: 'ph-magnifying-glass',
        xp: 25,
        duration: '10 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/css/css3_mediaqueries.asp',
        steps: [
          'Erstelle ein Media Query für Handys: @media (max-width: 768px) { ... }',
          'Ändere im Mobile-Bereich: Grid auf 1 Spalte (grid-template-columns: 1fr;)',
          'Mache die Schrift etwas kleiner: body { font-size: 16px; }',
          'Teste mit den Browser-Entwicklertools (F12 → Gerätesymbol)',
          'Bonus: Erstelle ein zweites Media Query für Tablets (max-width: 1024px)!'
        ],
        commonMistakes: [
          'Desktop-first statt Mobile-first: @media (max-width) für kleine Bildschirme anpassen statt @media (min-width) für große — das führt zu komplexerem Code',
          'Zu viele Breakpoints: 90% aller Webseiten brauchen nur 2–3 Breakpoints (ca. 600px für Handys, 900px für Tablets, 1200px für Desktop)',
          'Pixelgenaue Werte für Breakpoints: iPhone SE hat 375px, iPhone 14 Pro Max hat 430px — fixe Geräte-Breakpoints sind sinnlos',
          '!important in Media Queries verwenden: Das ist ein Zeichen, dass die Basis-CSS schlecht strukturiert ist'
        ],
        proTip: 'Arbeite mit relativen Einheiten (rem, em, %) statt Pixeln in Media Queries. Noch besser: Nutze clamp() für fließende Größen: font-size: clamp(16px, 4vw, 24px); — die Schrift skaliert automatisch zwischen 16px und 24px, ohne ein einziges Media Query.',
        successCriteria: 'Deine Seite sieht auf einer schmalen Bildschirmbreite (< 600px) anders aus als auf einer breiten (> 1024px). Du hast mindestens 2 Media Queries geschrieben. Der Inhalt ist auf dem Handy gut lesbar und bedienbar.'
      },
      {
        id: 'q3-4',
        title: 'Das Königreich responsive',
        description: 'BOSS-QUEST: Baue eine Seite, die auf Handy, Tablet und Desktop perfekt aussieht. Flexbox ODER Grid plus Media Queries — du entscheidest, welche Technik passt.',
        why: 'Diese Quest ist der ultimative Test: Kannst du eine Seite bauen, die auf ALLEN Geräten funktioniert? Das ist die Kernkompetenz eines modernen Web-Developers. Kunden erwarten nicht "eine Desktop-Seite und eine Mobile-Seite" — sie erwarten EINE Seite, die überall perfekt aussieht. Responsive Design ist nicht mehr optional, es ist der Standard. Diese BOSS-Quest simuliert eine echte Kundenanforderung: "Baue mir eine Seite, die auf Handy, Tablet und Desktop funktioniert."',
        icon: 'ph-castle',
        xp: 60,
        duration: '20 Min.',
        type: 'project',
        w3schools: 'https://www.w3schools.com/css/css_rwd_intro.asp',
        steps: [
          'Erstelle eine Seite mit mindestens 4 Inhaltsbereichen (z. B. Header, 3 Karten, Footer)',
          'Nutze Flexbox oder Grid für das Layout',
          'Schreibe mindestens 2 Media Queries (für Handy und Tablet)',
          'Teste die Seite in verschiedenen Breiten: ziehe das Browserfenster schmaler und breiter',
          'Lass einen Mitschüler deine Seite auf seinem Handy testen — Feedback ist Gold!'
        ],
        commonMistakes: [
          'Nur width anpassen, aber Touch-Targets vergessen: Buttons müssen auf dem Handy mindestens 44x44px groß sein',
          'Bilder nicht responsiv machen: img { max-width: 100%; height: auto; } vergessen — Bilder überlaufen den Container',
          'Horizontal scrollen zulassen: overflow-x: hidden auf dem body ist manchmal nötig, besser ist aber ein sauberes Layout',
          'Nicht auf echten Geräten testen: Der Browser-Emulator zeigt nicht immer das wahre Verhalten (besonders bei iOS Safari)'
        ],
        proTip: 'Teste deine Seite immer auf einem echten Handy, nicht nur im Browser-Emulator. Öffne die Live-Server-URL auf deinem Smartphone (im gleichen WLAN: die IP-Adresse deines Computers + :5500). iOS Safari und Chrome Desktop verhalten sich oft unterschiedlich.',
        successCriteria: 'Deine Seite funktioniert auf 3 Bildschirmbreiten: Handy (< 600px), Tablet (600–1024px) und Desktop (> 1024px). Es gibt keinen horizontalen Scrollbalken. Alle Buttons sind auf dem Handy gut bedienbar. Bilder skalieren korrekt.'
      }
    ]
  },
  {
    id: 'welt-4',
    title: 'Die geheime Bibliothek',
    description: 'Formulare, Tabellen und fortgeschrittene HTML-Elemente für echte Websites.',
    icon: 'ph-books',
    color: '#8E44AD',
    locked: true,
    quests: [
      {
        id: 'q4-1',
        title: 'Anmeldeformulare',
        description: 'Jede moderne Webseite braucht Formulare — Anmeldungen, Kontakt, Login. HTML stellt dir alle Werkzeuge bereit: Eingabefelder, Labels und Buttons. Du baust das erste Tor zwischen Besucher und Webseite.',
        why: 'Formulare sind die Brücke zwischen User und System. Jede Anmeldung, jeder Login, jeder Kauf, jede Bewerbung — alles läuft über Formulare. Ohne Formulare wäre das Web rein passiv: Nur Lesen, nie Interagieren. HTML5 hat mächtige Input-Typen eingeführt (type="email", type="tel", type="date"), die nicht nur die Eingabe erleichtern, sondern auch auf dem Handy die passende Tastatur anzeigen. Ein type="email" öffnet auf dem Smartphone die E-Mail-Tastatur mit @-Symbol — das ist User Experience auf fundamentalem Niveau.',
        icon: 'ph-note-pencil',
        xp: 20,
        duration: '8 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/html/html_forms.asp',
        steps: [
          'Erstelle ein form-Element: <form action="#">...</form>',
          'Füge ein Textfeld für den Namen hinzu: <input type="text" name="name">',
          'Verbinde es mit einem Label: <label for="name">Name:</label>',
          'Füge ein E-Mail-Feld hinzu: <input type="email" name="email">',
          'Erstelle einen Absende-Button: <button type="submit">Absenden</button>'
        ],
        commonMistakes: [
          'Labels nicht mit Inputs verbinden: for="name" muss mit id="name" übereinstimmen — sonst ist das Formular für Screenreader unbenutzbar',
          'Keine required-Attribute: Der User kann das Formular leer absenden — das führt zu Fehlermeldungen auf Server-Seite',
          'placeholder statt label verwenden: Placeholder verschwinden beim Tippen — User vergessen, was sie eingeben sollen',
          'Keine name-Attribute: Ohne name werden die Daten beim Absenden nicht übertragen'
        ],
        proTip: 'Das fieldset + legend Pattern gruppiert zusammengehörige Felder visuell und semantisch. Screenreader verkünden die Legende vor jedem Feld in der Gruppe. Das ist Barrierefreiheit auf Profi-Niveau — und es kostet nichts.',
        successCriteria: 'Dein Formular hat mindestens 3 Felder (Name, E-Mail, Nachricht), jedes mit korrektem Label verbunden. Der Absende-Button funktioniert. Auf dem Handy öffnet die E-Mail-Eingabe die richtige Tastatur.'
      },
      {
        id: 'q4-2',
        title: 'Die Statistiken',
        description: 'Daten strukturiert darstellen — das ist die Superkraft von Tabellen. Ob Spielstände, Preislisten oder Stundenpläne: Mit table, tr, th und td baust du übersichtliche Datenlandschaften.',
        why: 'Tabellen sind das älteste Strukturierungselement des Webs (HTML 1.0, 1993). Sie sind die effizienteste Art, strukturierte Daten darzustellen: Preislisten, Stundenpläne, Spielstände, Notenübersichten. Aber Tabellen sind auch die am meisten missbrauchte Technik — in den 2000ern wurden ganze Webseiten mit verschachtelten Tabellen als Layout-Werkzeug gebaut. Heute wissen wir: Tabellen für Daten, CSS für Layout. Eine gut gestylte Tabelle ist ein Zeichen von Professionalität.',
        icon: 'ph-chart-bar',
        xp: 20,
        duration: '8 Min.',
        type: 'coding',
        w3schools: 'https://www.w3schools.com/html/html_tables.asp',
        steps: [
          'Erstelle eine table mit 3 Spalten: Name, Punkte, Level',
          'Füge eine Kopfzeile mit <th> (table header) hinzu',
          'Füge 3 Datenzeilen mit <td> (table data) hinzu',
          'Style die Tabelle mit CSS: Rahmen, Abstände, Hintergrundfarbe für die Kopfzeile',
          'Bonus: Füge eine weitere Spalte "Status" mit unterschiedlichen Farben hinzu!'
        ],
        commonMistakes: [
          'Tabellen für Layout verwenden: Das war 2005 Standard, heute ein No-Go (Barrierefreiheit, Wartbarkeit)',
          'Keine th für Kopfzeilen: td für alles verwenden — Screenreader können dann die Daten nicht als Tabelle interpretieren',
          'Keine caption: Die Tabelle hat keinen Titel — Screenreader-User wissen nicht, worum es geht',
          'Zu viele verschachtelte Tabellen: Tabellen in Tabellen sind der Albtraum jedes Entwicklers'
        ],
        proTip: 'thead, tbody und tfoot strukturieren die Tabelle semantisch. Moderne Browser können tbody allein scrollen lassen (fixe Kopfzeile). Das ist besonders bei langen Datentabellen ein Game-Changer für die Usability.',
        successCriteria: 'Deine Tabelle hat eine Kopfzeile mit <th>, mindestens 3 Datenzeilen und ist mit CSS gestylt (Rahmen, Abstände, farbige Kopfzeile). Die Tabelle ist auf dem Handy lesbar (entweder durch Scrollen oder gestapelte Darstellung).'
      },
      {
        id: 'q4-3',
        title: 'Die Online-Anmeldung',
        description: 'BOSS-QUEST: Kombiniere alles, was du gelernt hast. Ein Formular, das Daten sammelt. Eine Tabelle, die sie anzeigt. Und CSS, das alles professionell aussehen lässt. Das ist kein Übungsprojekt mehr — das ist echte Webentwicklung.',
        why: 'Diese finale BOSS-Quest ist die Synthese von allem, was du gelernt hast: HTML-Struktur, CSS-Styling, Flexbox/Grid-Layout, Media Queries, Formulare, Tabellen. Eine Event-Anmeldung ist ein echtes, alltägliches Problem — nicht abstrakt, nicht künstlich. Wenn du diese Quest meisterst, kannst du nicht nur "HTML und CSS", sondern du kannst "eine funktionierende Webseite bauen". Das ist der Unterschied zwischen einem Hobby und einer Fähigkeit, die du im Beruf einsetzen kannst.',
        icon: 'ph-bank',
        xp: 60,
        duration: '20 Min.',
        type: 'project',
        w3schools: 'https://www.w3schools.com/html/html_form_elements.asp',
        steps: [
          'Erstelle eine Anmeldeseite für ein Event (z. B. ein Gaming-Turnier oder Sportfest)',
          'Nutze input (Text, Email, Number), textarea (für Nachrichten), select (Dropdown)',
          'Baue unter dem Formular eine Tabelle mit bereits angemeldeten Teilnehmern',
          'Style alles mit CSS: einheitliches Farbschema, gutes Layout, responsiv!',
          'Reflexion: Welche drei Dinge hast du in diesem Tutorial gelernt, die du vorher nicht konntest?'
        ],
        commonMistakes: [
          'Formular und Tabelle nicht optisch trennen: Alles sieht gleich aus — User erkennen nicht, wo Eingabe beginnt und wo Anzeige beginnt',
          'Keine Formular-Validierung: required, type="email", minlength vergessen — das führt zu unvollständigen Daten',
          'Nicht responsiv: Die Tabelle überläuft auf dem Handy den Bildschirm',
          'Keine visuelle Hierarchie: Überschriften, Formular und Tabelle haben gleiche visuelle Gewichtung'
        ],
        proTip: 'Nutze :focus-visible für Formularfelder: input:focus-visible { outline: 3px solid var(--world-accent); }. Das zeigt dem User visuell, wo er gerade tippt — besonders wichtig für Tastatur-User und Menschen mit Sehbeeinträchtigungen. Barrierefreiheit ist nicht "Extra", sondern gutes Design.',
        successCriteria: 'Deine Event-Anmeldung enthält ein vollständiges Formular (mindestens 4 Felder), eine Tabelle mit Beispieldaten und ist responsiv. Das Design ist einheitlich, die Bedienung auf dem Handy intuitiv. Formularfelder haben sichtbare Fokus-Zustände.'
      }
    ]
  }
];

export const badges = [
  { id: 'badge-first-code', name: 'Erster Code', description: 'Schreibe deine erste Zeile HTML.', icon: 'ph-laptop', condition: 'q1-1' },
  { id: 'badge-semantic', name: 'Semantik-Meister', description: 'Nutze korrekte HTML5-Elemente.', icon: 'ph-hard-hat', condition: 'q1-5' },
  { id: 'badge-box-model', name: 'Box-Model-Profi', description: 'Verstehe Padding, Border und Margin.', icon: 'ph-package', condition: 'q2-3' },
  { id: 'badge-responsive', name: 'Responsive Hero', description: 'Baue eine mobile-freundliche Seite.', icon: 'ph-device-mobile', condition: 'q3-4' },
  { id: 'badge-form-master', name: 'Formular-Zauberer', description: 'Erstelle ein vollständiges Formular.', icon: 'ph-sparkle', condition: 'q4-3' },
  { id: 'badge-w3schools', name: 'W3Schools-Entdecker', description: 'Nutze W3Schools für alle Welten.', icon: 'ph-magnifying-glass', condition: 'all-w3schools' },
  { id: 'badge-streak', name: 'Streak-König', description: 'Sei 5 Tage in Folge aktiv.', icon: 'ph-fire', condition: 'streak-5' },
  { id: 'badge-complete', name: 'Web-Developer', description: 'Schließe alle Welten ab!', icon: 'ph-trophy', condition: 'all-worlds' }
];
