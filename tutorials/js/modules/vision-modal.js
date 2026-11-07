/**
 * VISION MODAL MANAGER
 * Erweitert den ModalManager für die Vision-Seite
 * 
 * Features:
 * - Unterstützt alle Vision-Kartentypen
 * - Individuelle Inhalte für jedes Modal
 * - Barrierefrei (ARIA, Tastatur-Navigation)
 */

export class VisionModalManager {
  constructor() {
    this.activeModal = null;
    this.previousActiveElement = null;
    
    this.init();
  }

  init() {
    // Initialize all vision cards with data-modal attribute
    this.initVisionCards();
    
    // Global event listeners
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
    
    // Close on backdrop click
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        this.close();
      }
    });
  }

  initVisionCards() {
    // Select all cards with data-modal attribute across all pages
    const visionCards = document.querySelectorAll(
      '.vision-card--featured[data-modal], ' +
      '.bridge-card[data-modal], ' +
      '.value-card[data-modal], ' +
      '.responsibility-card[data-modal], ' +
      '.pledge-card[data-modal], ' +
      '.learning-card[data-modal], ' +
      '.benefit-card[data-modal], ' +
      '.tool-card[data-modal], ' +
      '.insight-card[data-modal]'
    );
    
    visionCards.forEach(card => {
      card.addEventListener('click', () => {
        const modalId = card.dataset.modal;
        this.openVisionModal(modalId);
      });
      
      // Make cards keyboard accessible
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const modalId = card.dataset.modal;
          this.openVisionModal(modalId);
        }
      });
    });
  }

  openVisionModal(modalId) {
    // Content for each vision modal
    const modalContent = this.getVisionContent(modalId);
    if (!modalContent) return;
    
    // Detect language for aria-label
    const lang = document.documentElement.lang || 'de';
    const isEnglish = lang === 'en' || window.location.href.includes('-en');
    const closeLabel = isEnglish ? 'Close' : 'Schließen';
    
    // Create modal HTML
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modal-title');
    
    modal.innerHTML = `
      <div class="modal">
        <button class="modal-close" aria-label="${closeLabel}">
          <i class="ph ph-x"></i>
        </button>
        <div class="modal-header">
          <div class="modal-icon">${modalContent.icon}</div>
          <h3 id="modal-title">${modalContent.title}</h3>
        </div>
        <div class="modal-body">
          ${modalContent.body}
        </div>
      </div>
    `;
    
    // Add close button listener
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => this.close());
    
    // Store reference and open
    this.open(modal);
  }

  getVisionContent(modalId) {
    // Detect language
    const lang = document.documentElement.lang || 'de';
    const isEnglish = lang === 'en' || window.location.href.includes('-en');
    
    const content = {
      'de': {
        // Vision Page - Featured Card
        'cooperation': {
          icon: '<i class="ph ph-lightbulb"></i>',
          title: 'Mensch-KI Kooperation',
          body: `
            <p>Die Zukunft gehört der Kooperation zwischen Mensch und KI. Wir glauben nicht an die Ersetzung menschlicher Intelligenz, sondern an ihre Erweiterung.</p>
            <h4>Was Menschen einbringen:</h4>
            <ul>
              <li><strong>Kreativität</strong> – Originelle Ideen und innovative Lösungen</li>
              <li><strong>Empathie</strong> – Menschliches Verständnis und emotionale Intelligenz</li>
              <li><strong>Ethisches Urteil</strong> – Moralischer Kompass und Wertorientierung</li>
              <li><strong>Kontextverständnis</strong> – Ganzheitliche Betrachtung komplexer Situationen</li>
            </ul>
            <h4>Was KI einbringt:</h4>
            <ul>
              <li><strong>Geschwindigkeit</strong> – Schnelle Verarbeitung großer Datenmengen</li>
              <li><strong>Mustererkennung</strong> – Erkennen von Zusammenhängen in Daten</li>
              <li><strong>Verfügbarkeit</strong> – 24/7 Einsatzbereitschaft ohne Ermüdung</li>
              <li><strong>Skalierbarkeit</strong> – Gleichbleibende Qualität bei wachsendem Umfang</li>
            </ul>
          `
        },
        // Bridges Section
        'generations': {
          icon: '<i class="ph ph-users-three"></i>',
          title: 'Generationen überbrücken',
          body: `
            <p>PLU verbindet Jugendliche und Senioren auf einer gemeinsamen Plattform. Jede Generation bringt einzigartige Perspektiven und Stärken mit.</p>
            <h4>Jugendliche bringen ein:</h4>
            <ul>
              <li>Natürliche Technikaffinität und schnelles Lernen</li>
              <li>Frische Perspektiven auf neue Technologien</li>
              <li>Kreativen Umgang mit digitalen Tools</li>
              <li>Neugier und Experimentierfreude</li>
            </ul>
            <h4>Senioren bringen ein:</h4>
            <ul>
              <li>Lebenserfahrung und Weisheit</li>
              <li>Kritisches Hinterfragen aus anderer Perspektive</li>
              <li>Geduld und strukturiertes Denken</li>
              <li>Mentoring und Weitergabe von Wissen</li>
            </ul>
          `
        },
        'disciplines': {
          icon: '<i class="ph ph-puzzle-piece"></i>',
          title: 'Disziplinen verbinden',
          body: `
            <p>KI ist nicht nur Technik – sie berührt alle Bereiche des menschlichen Lebens. PLU bringt verschiedene Disziplinen zusammen.</p>
            <h4>Technik trifft auf:</h4>
            <ul>
              <li><strong>Kreativität</strong> – KI als Werkzeug für Künstler und Designer</li>
              <li><strong>Wissenschaft</strong> – Forschung und Datenanalyse</li>
              <li><strong>Bildung</strong> – Personalisiertes Lernen und Lehren</li>
              <li><strong>Wirtschaft</strong> – Effizienz und Innovation im Beruf</li>
              <li><strong>Soziales</strong> – Kommunikation und Zusammenarbeit</li>
            </ul>
            <p>Diese Interdisziplinarität ermöglicht ganzheitliches Verständnis und verantwortungsvollen Einsatz von KI.</p>
          `
        },
        'cultures': {
          icon: '<i class="ph ph-globe"></i>',
          title: 'Kulturen verbinden',
          body: `
            <p>KI-Technologie kennt keine Grenzen. PLU nutzt dieses Potenzial, um kulturelle Brücken zu bauen und globale Zusammenarbeit zu fördern.</p>
            <h4>KI ermöglicht:</h4>
            <ul>
              <li><strong>Übersetzung in Echtzeit</strong> – Sprachbarrieren überwinden</li>
              <li><strong>Kulturellen Austausch</strong> – Ideen global teilen und diskutieren</li>
              <li><strong>Zugänglichkeit</strong> – Bildung für alle, unabhängig vom Standort</li>
              <li><strong>Diverse Perspektiven</strong> – Lösungen aus verschiedenen Kulturkreisen</li>
            </ul>
            <p>Wir glauben an Technologie als Brückenbauer zwischen Menschen aller Kulturen und Hintergründe.</p>
          `
        },
        'theory-practice': {
          icon: '<i class="ph ph-code"></i>',
          title: 'Theorie & Praxis vereinen',
          body: `
            <p>Bei PLU lernst du nicht nur theoretisch – du wendest das Gelernte sofort an. Praxisnahe Anwendung ist der Schlüssel zum wirklichen Verständnis.</p>
            <h4>Unser Ansatz:</h4>
            <ul>
              <li><strong>Lernen durch Tun</strong> – Jede Lektion enthält praktische Übungen</li>
              <li><strong>Real-world Projekte</strong> – Anwendung auf echte Szenarien</li>
              <li><strong>Experimentierraum</strong> – Sicher ausprobieren ohne Risiko</li>
              <li><strong>Peer Feedback</strong> – Gemeinsames Lernen und Verbessern</li>
            </ul>
            <p>Theorie gibt dir das Fundament, Praxis gibt dir die Fähigkeit.</p>
          `
        },
        // Values Section
        'social-skills': {
          icon: '<i class="ph ph-heart"></i>',
          title: 'Soziale Kompetenz',
          body: `
            <p>In einer zunehmend digitalen Welt werden soziale Fähigkeiten immer wertvoller. KI kann nicht empathisieren oder zwischenmenschliche Beziehungen aufbauen.</p>
            <h4>Wichtige soziale Kompetenzen:</h4>
            <ul>
              <li><strong>Empathie</strong> – Andere verstehen und nachfühlen</li>
              <li><strong>Kommunikation</strong> – Klares und einfühlsames Ausdrücken</li>
              <li><strong>Teamarbeit</strong> – Gemeinsam Ziele erreichen</li>
              <li><strong>Konfliktlösung</strong> – Konstruktiv mit Differenzen umgehen</li>
              <li><strong>Soziale Intelligenz</strong> – Dynamiken erkennen und navigieren</li>
            </ul>
            <p>Diese Fähigkeiten bleiben unverzichtbar – egal wie fortschrittlich KI wird.</p>
          `
        },
        'cultural-expression': {
          icon: '<i class="ph ph-paint-brush"></i>',
          title: 'Kultureller Ausdruck',
          body: `
            <p>Kunst, Musik, Literatur – die Ausdrucksformen, die uns als Menschen definieren. KI kann unterstützen, aber nicht die menschliche Seele ersetzen.</p>
            <h4>Menschliche Kreativität umfasst:</h4>
            <ul>
              <li><strong>Authentizität</strong> – Echte Erfahrungen und Emotionen</li>
              <li><strong>Kulturellen Kontext</strong> – Bedeutung jenseits der Oberfläche</li>
              <li><strong>Intention</strong> – Bewusste Aussage mit Bedeutung</li>
              <li><strong>Subjektivität</strong> – Persönliche Perspektive und Interpretation</li>
            </ul>
            <p>KI ist ein Werkzeug für Kreative, nie der Künstler selbst.</p>
          `
        },
        'language-diversity': {
          icon: '<i class="ph ph-translate"></i>',
          title: 'Sprachliche Vielfalt',
          body: `
            <p>Sprache ist mehr als Worte – sie ist Kultur, Denkweise und Identität. PLU feiert sprachliche Vielfalt und nutzt KI, um Barrieren zu überwinden.</p>
            <h4>Wir fördern:</h4>
            <ul>
              <li><strong>Mehrsprachigkeit</strong> – In verschiedenen Sprachen denken</li>
              <li><strong>Kulturelle Nuancen</strong> – Bedeutung jenseits der Übersetzung</li>
              <li><strong>Zugänglichkeit</strong> – Bildung in der Muttersprache</li>
              <li><strong>Globale Community</strong> – Verbindung über Sprachgrenzen</li>
            </ul>
            <p>KI unterstützt Kommunikation, aber menschliche Sprache bleibt unser kostbarstes Kulturgut.</p>
          `
        },
        'ethical-judgment': {
          icon: '<i class="ph ph-scales"></i>',
          title: 'Ethisches Urteil',
          body: `
            <p>KI kann Optionen aufzeigen, aber keine moralischen Entscheidungen treffen. Ethisches Urteil bleibt menschliche Verantwortung.</p>
            <h4>Ethische Prinzipien:</h4>
            <ul>
              <li><strong>Verantwortung</strong> – Für die Folgen unserer Entscheidungen</li>
              <li><strong>Transparenz</strong> – Ehrlich über KI-Nutzung kommunizieren</li>
              <li><strong>Fairness</strong> – Gleiche Chancen und faire Behandlung</li>
              <li><strong>Respekt</strong> – Würde und Autonomie jedes Menschen</li>
              <li><strong>Nachhaltigkeit</strong> – Langfristige Konsequenzen bedenken</li>
            </ul>
            <p>Technologie folgt menschlichen Werten, nicht umgekehrt.</p>
          `
        },
        // Responsibility Section
        'energy': {
          icon: '<i class="ph ph-lightning"></i>',
          title: 'Energieverbrauch',
          body: `
            <p>KI-Modelle benötigen erhebliche Rechenleistung. Wir nehmen Verantwortung für unseren ökologischen Fußabdruck.</p>
            <h4>Unsere Maßnahmen:</h4>
            <ul>
              <li>Effiziente Modelle bevorzugen, wo möglich</li>
              <li>Achtsamer Umgang mit KI-Anfragen</li>
              <li>Bewusste Entscheidung, wann KI wirklich nötig ist</li>
              <li>Unterstützung von Forschung zu grüner KI</li>
            </ul>
            <p>Nachhaltigkeit ist keine Option, sondern Verpflichtung.</p>
          `
        },
        'transparency': {
          icon: '<i class="ph ph-eye"></i>',
          title: 'Transparenz',
          body: `
            <p>Wir dokumentieren offen, wo und wie KI eingesetzt wird. Transparenz schafft Vertrauen und ermöglicht informierte Entscheidungen.</p>
            <h4>Unsere Transparenz-Grundsätze:</h4>
            <ul>
              <li>Klare Kennzeichnung KI-generierter Inhalte</li>
              <li>Offenlegung verwendeter Tools und Modelle</li>
              <li>Ehrliche Kommunikation über KI-Fähigkeiten und -Grenzen</li>
              <li>Dokumentation von Entscheidungsprozessen</li>
            </ul>
          `
        },
        'abuse': {
          icon: '<i class="ph ph-shield"></i>',
          title: 'Missbrauch verhindern',
          body: `
            <p>Mit großer Macht kommt große Verantwortung. Wir setzen uns aktiv gegen schädliche KI-Nutzung ein.</p>
            <h4>Wir lehnen ab:</h4>
            <ul>
              <li>Generierung von Deepfakes zur Täuschung</li>
              <li>Verbreitung von Hassrede und Desinformation</li>
              <li>KI-gestützte Betrugsmethoden</li>
              <li>Verletzung geistigen Eigentums</li>
              <li>Diskriminierung durch algorithmische Voreingenommenheit</li>
            </ul>
            <p>Jeder Nutzer trägt Verantwortung für ethischen KI-Einsatz.</p>
          `
        },
        'education': {
          icon: '<i class="ph ph-student"></i>',
          title: 'Bildung fördern',
          body: `
            <p>Wissen über KI-Technologien sollte für alle zugänglich sein, unabhängig von Herkunft, Alter oder finanziellen Mitteln.</p>
            <h4>Unser Bildungsauftrag:</h4>
            <ul>
              <li>Kostenlose, hochwertige Lerninhalte für alle</li>
              <li>Altersgerechte Aufbereitung komplexer Themen</li>
              <li>Praxisnahe Anwendung statt bloßer Theorie</li>
              <li>Open-Source Ressourcen für die Community</li>
              <li>Kontinuierliche Aktualisierung mit technischer Entwicklung</li>
            </ul>
            <p>Bildung ist der Schlüssel zu verantwortungsvoller KI-Nutzung.</p>
          `
        },
        // Pledge Section
        'pledge-1': {
          icon: '<span>1</span>',
          title: 'Werkzeug, nicht Ersatz',
          body: `
            <p>Wir nutzen KI als <strong>Werkzeug</strong>, nicht als Ersatz für eigenes Denken.</p>
            <p>KI ist ein leistungsstarkes Werkzeug, aber die Kontrolle und Verantwortung bleiben beim Menschen. Wir prüfen KI-Outputs kritisch und treffen selbst informierte Entscheidungen.</p>
            <h4>Praktische Umsetzung:</h4>
            <ul>
              <li>KI-Vorschläge immer hinterfragen und verifizieren</li>
              <li>Eigenes Urteil behalten und weiterentwickeln</li>
              <li>KI als Unterstützung, nicht als Entscheidungsersatz nutzen</li>
            </ul>
          `
        },
        'pledge-2': {
          icon: '<span>2</span>',
          title: 'Kritisches Hinterfragen',
          body: `
            <p>Wir fördern <strong>kritisches Hinterfragen</strong> und eigenständiges Urteilsvermögen.</p>
            <p>KI kann Fehler machen, Halluzinationen produzieren oder biased sein. Kritisches Denken ist die beste Verteidigung gegen Fehlinformation.</p>
            <h4>Praktische Umsetzung:</h4>
            <ul>
              <li>Quellen prüfen und Fakten verifizieren</li>
              <li>Mehrere Perspektiven einholen</li>
              <li>Eigene Recherche betreiben</li>
            </ul>
          `
        },
        'pledge-3': {
          icon: '<span>3</span>',
          title: 'Datenschutz respektieren',
          body: `
            <p>Wir respektieren <strong>Datenschutz</strong> und Privatsphäre.</p>
            <p>Personenbezogene Daten gehören geschützt. Wir gehen verantwortungsvoll mit Informationen um und schützen die Privatsphäre aller.</p>
            <h4>Praktische Umsetzung:</h4>
            <ul>
              <li>Keine sensiblen Daten in öffentliche KI-Tools eingeben</li>
              <li>Enterprise-Lösungen für vertrauliche Inhalte nutzen</li>
              <li>AGBs und Datenschutzbestimmungen verstehen</li>
            </ul>
          `
        },
        'pledge-4': {
          icon: '<span>4</span>',
          title: 'Wissen weitergeben',
          body: `
            <p>Wir <strong>bilden aus</strong>, nicht nur ab – Wissen wird weitergegeben und erweitert.</p>
            <p>KI reproduziert bestehendes Wissen. Menschen schaffen neues Wissen und geben es weiter – so entwickelt sich Gesellschaft.</p>
            <h4>Praktische Umsetzung:</h4>
            <ul>
              <li>Gelerntes mit anderen teilen</li>
              <li>Mentoring und Unterstützung anbieten</li>
              <li>Zur Open-Source Community beitragen</li>
            </ul>
          `
        },
        'pledge-5': {
          icon: '<span>5</span>',
          title: 'Menschlich bleiben',
          body: `
            <p>Wir bleiben <strong>menschlich</strong> in einer technologischen Welt.</p>
            <p>Technologie soll unsere Menschlichkeit erweitern, nicht ersetzen. Wir pflegen zwischenmenschliche Beziehungen und soziale Kompetenzen.</p>
            <h4>Praktische Umsetzung:</h4>
            <ul>
              <li>Echte Mensch-zu-Mensch Interaktion priorisieren</li>
              <li>Empathie und emotionale Intelligenz pflegen</li>
              <li>Technologie als Werkzeug, nicht als Lebensinhalt sehen</li>
            </ul>
          `
        },
        // Jugendliche Page
        'webdev': {
          icon: '<i class="ph ph-code"></i>',
          title: 'Web Development',
          body: `
            <p>HTML, CSS und JavaScript sind die Bausteine des Internets. Du lernst, wie Webseiten strukturiert, gestaltet und interaktiv gemacht werden.</p>
            <h4>Was du lernst:</h4>
            <ul>
              <li>Semantisches HTML für barrierefreie Strukturen</li>
              <li>Modernes CSS mit Flexbox und Grid</li>
              <li>JavaScript für Interaktivität und Dynamik</li>
              <li>Responsives Design für alle Geräte</li>
            </ul>
          `
        },
        'design': {
          icon: '<i class="ph ph-paint-brush"></i>',
          title: 'Media & Design',
          body: `
            <p>Visuelle Gestaltung ist überall – von Social Media bis zum Portfolio. Wir zeigen dir, wie du mit professionellen Open-Source-Tools ansprechende Designs erstellst.</p>
            <h4>Tools & Skills:</h4>
            <ul>
              <li>Bildbearbeitung mit GIMP</li>
              <li>Vektorgrafiken mit Inkscape</li>
              <li>Video-Editing mit DaVinci Resolve</li>
              <li>Farblehre, Typografie und Layout</li>
            </ul>
          `
        },
        'ki': {
          icon: '<i class="ph ph-brain"></i>',
          title: 'KI als Werkzeug',
          body: `
            <p>Künstliche Intelligenz ist kein Zauber, sondern ein Werkzeug. Lerne, wie du KI gezielt einsetzt, um Aufgaben schneller und kreativer zu lösen.</p>
            <h4>Themen:</h4>
            <ul>
              <li>Prompt Engineering für bessere Ergebnisse</li>
              <li>Kritische Bewertung von KI-Outputs</li>
              <li>Verantwortungsvoller Einsatz in Schule und Beruf</li>
              <li>Praktische Anwendungen im Alltag</li>
            </ul>
          `
        },
        'portfolio': {
          icon: '<i class="ph ph-trophy"></i>',
          title: 'Praxis & Portfolio',
          body: `
            <p>Ein starkes Portfolio öffnet Türen. Wir begleiten dich bei realen Projekten, die du stolz präsentieren kannst – für Praktika, Studium oder erste Aufträge.</p>
            <h4>Projektbeispiele:</h4>
            <ul>
              <li>Eigene Webseite oder Landing Page</li>
              <li>Logo- und Grafikdesigns</li>
              <li>Kurzfilme oder Animationen</li>
              <li>KI-gestützte Inhalte und Konzepte</li>
            </ul>
          `
        },
        'gimp': {
          icon: '<i class="ph ph-image"></i>',
          title: 'GIMP',
          body: `
            <p>GIMP (GNU Image Manipulation Program) ist die kostenlose Alternative zu Photoshop. Professionelle Bildbearbeitung ohne Abo-Kosten.</p>
            <h4>Features:</h4>
            <ul>
              <li>Layer-basierte Bildbearbeitung</li>
              <li>Erweiterte Retusche-Werkzeuge</li>
              <li>Unterstützung für alle gängigen Formate</li>
              <li>Plugins für nahezu unendliche Erweiterung</li>
            </ul>
          `
        },
        'inkscape': {
          icon: '<i class="ph ph-pen-nib"></i>',
          title: 'Inkscape',
          body: `
            <p>Inkscape ist der führende Open-Source Vector Editor. Perfekt für Logos, Illustrationen und skalierbare Grafiken.</p>
            <h4>Features:</h4>
            <ul>
              <li>Präzise Pfadwerkzeuge und Bézier-Kurven</li>
              <li>Unendlich skalierbare Vektorgrafiken</li>
              <li>SVG-Native Unterstützung</li>
              <li>Professioneller Druck-Export</li>
            </ul>
          `
        },
        'audacity': {
          icon: '<i class="ph ph-speaker-high"></i>',
          title: 'Audacity',
          body: `
            <p>Audacity ist das Standard-Tool für Audio-Bearbeitung. Ideal für Podcasts, Musikprojekte und Sprachaufnahmen.</p>
            <h4>Features:</h4>
            <ul>
              <li>Mehrspurige Aufnahme und Bearbeitung</li>
              <li>Rauschunterdrückung und Effekte</li>
              <li>Export in alle gängigen Audioformate</li>
              <li>Vollständig kostenlos und Open Source</li>
            </ul>
          `
        },
        'davinci': {
          icon: '<i class="ph ph-film-strip"></i>',
          title: 'DaVinci Resolve',
          body: `
            <p>DaVinci Resolve bietet Hollywood-Qualität im Video-Editing. Die kostenlose Version deckt nahezu alle Anfänger- bis Fortgeschrittenen-Bedürfnisse ab.</p>
            <h4>Features:</h4>
            <ul>
              <li>Professioneller Schnitt und Timeline-Editing</li>
              <li>Fortschrittliche Farbkorrektur (Color Grading)</li>
              <li>Visuelle Effekte und Motion Graphics</li>
              <li>Audio-Mischung in Studio-Qualität</li>
            </ul>
          `
        },
        // Berufstätige Page
        'emails': {
          icon: '<i class="ph ph-envelope"></i>',
          title: 'E-Mail-Flut',
          body: `
            <p>E-Mails gehören zu den größten Zeitfressern im Berufsalltag. Mit KI lassen sich Entwürfe in Sekunden erstellen und Antworten effizient formulieren.</p>
            <h4>KI-Lösungen:</h4>
            <ul>
              <li>Professionelle E-Mail-Entwürfe aus Stichpunkten</li>
              <li>Automatische Zusammenfassungen langer E-Mail-Threads</li>
              <li>Ton-Anpassung (höflich, direkt, formell)</li>
              <li>Mehrsprachige Kommunikation ohne Übersetzer</li>
            </ul>
          `
        },
        'meetings': {
          icon: '<i class="ph ph-users"></i>',
          title: 'Meeting-Marathon',
          body: `
            <p>Zu viele Meetings kosten Zeit und Energie. KI hilft dir, Meetings effizienter zu gestalten und Nachbereitungen zu automatisieren.</p>
            <h4>KI-Lösungen:</h4>
            <ul>
              <li>Automatische Erstellung der Agenda</li>
              <li>Live-Transkription und Protokolle</li>
              <li>Zusammenfassung der wichtigsten Ergebnisse</li>
              <li>Identifikation von Action Items</li>
            </ul>
          `
        },
        'reports': {
          icon: '<i class="ph ph-file-text"></i>',
          title: 'Dokumentation',
          body: `
            <p>Berichte, Protokolle und Dokumentationen sind notwendig, aber zeitaufwändig. KI beschleunigt das Schreiben erheblich.</p>
            <h4>KI-Lösungen:</h4>
            <ul>
              <li>Strukturierte Berichte aus Rohdaten</li>
              <li>Automatische Formatierung und Gliederung</li>
              <li>Wiederkehrende Textbausteine generieren</li>
              <li>Qualitätsprüfung auf Konsistenz</li>
            </ul>
          `
        },
        'research': {
          icon: '<i class="ph ph-magnifying-glass"></i>',
          title: 'Recherche',
          body: `
            <p>Informationen finden kostet oft mehr Zeit als das eigentliche Arbeiten. KI kann Quellen sichten, zusammenfassen und priorisieren.</p>
            <h4>KI-Lösungen:</h4>
            <ul>
              <li>Schnelles Sichten langer Dokumente</li>
              <li>Extraktion relevanter Fakten und Zahlen</li>
              <li>Vergleiche verschiedener Quellen</li>
              <li>Strukturierte Recherche-Berichte</li>
            </ul>
          `
        },
        'efficiency': {
          icon: '<i class="ph ph-lightning"></i>',
          title: '3x schneller',
          body: `
            <p>KI beschleunigt repetitive Aufgaben massiv. Was früher Stunden dauerte, erledigst du in Minuten – bei gleichbleibender oder besserer Qualität.</p>
            <h4>Beispiele:</h4>
            <ul>
              <li>E-Mail-Entwürfe in Sekunden statt Minuten</li>
              <li>Erste Berichtsentwürfe in Minuten statt Stunden</li>
              <li>Rechercheergebnisse auf einen Blick</li>
              <li>Präsentationen aus Stichpunkten</li>
            </ul>
          `
        },
        'quality': {
          icon: '<i class="ph ph-check-circle"></i>',
          title: 'Bessere Qualität',
          body: `
            <p>KI liefert nicht nur schneller, sondern oft auch präziser. Grammatik, Struktur und Vollständigkeit werden systematisch verbessert.</p>
            <h4>Vorteile:</h4>
            <ul>
              <li>Fehlerfreie Texte und Dokumente</li>
              <li>Klare Strukturen und Logik</li>
              <li>Konsistente Terminologie</li>
              <li>Professioneller Schreibstil</li>
            </ul>
          `
        },
        'balance': {
          icon: '<i class="ph ph-coffee"></i>',
          title: 'Work-Life-Balance',
          body: `
            <p>Weniger Zeit für lästige Routine bedeutet mehr Zeit für das, was wirklich zählt. Familie, Hobbys, Sport – oder einfach mal abschalten.</p>
            <h4>Auswirkungen:</h4>
            <ul>
              <li>Früheres Feierabend-Machen</li>
              <li>Weniger Stress und Überlastung</li>
              <li>Mehr Zeit für kreative Aufgaben</li>
              <li>Bessere physische und mentale Gesundheit</li>
            </ul>
          `
        },
        'email-example': {
          icon: '<i class="ph ph-envelope-simple"></i>',
          title: 'E-Mails schreiben',
          body: `
            <p>Gib Stichpunkte ein – KI formuliert professionelle, höfliche E-Mails in Sekunden. Auch komplexe Anfragen oder Konflikte werden verständlich und sachlich ausgedrückt.</p>
            <h4>Praktischer Nutzen:</h4>
            <ul>
              <li>Zeitersparnis von bis zu 60%</li>
              <li>Konsistenter, professioneller Ton</li>
              <li>Mehrsprachige Korrespondenz</li>
              <li>Höfliche Absagen und Follow-ups</li>
            </ul>
          `
        },
        'presentation-example': {
          icon: '<i class="ph ph-presentation"></i>',
          title: 'Präsentationen erstellen',
          body: `
            <p>Strukturiere deine Ideen in Stichpunkten – KI hilft dir dabei, daraus überzeugende Folien mit klaren Botschaften zu erstellen. Inklusive Sprechernotizen und Handouts.</p>
            <h4>Praktischer Nutzen:</h4>
            <ul>
              <li>Schnelle Gliederung und Struktur</li>
              <li>Klare Key Messages</li>
              <li>Sprechernotizen automatisch generiert</li>
              <li>Weniger Stress vor dem Termin</li>
            </ul>
          `
        },
        'data-example': {
          icon: '<i class="ph ph-chart-bar"></i>',
          title: 'Daten analysieren',
          body: `
            <p>Lade Tabellen oder Berichte hoch – KI erkennt Muster, berechnet Kennzahlen und formuliert Erkenntnisse in verständlicher Sprache. Ideal für Quartalsberichte oder Projekt-Reviews.</p>
            <h4>Praktischer Nutzen:</h4>
            <ul>
              <li>Schnelle Identifikation von Trends</li>
              <li>Automatische Visualisierungsvorschläge</li>
              <li>Stakeholder-gerechte Zusammenfassungen</li>
              <li>Weniger Fehler durch manuelle Berechnung</li>
            </ul>
          `
        },
        'research-example': {
          icon: '<i class="ph ph-magnifying-glass"></i>',
          title: 'Recherche & Zusammenfassung',
          body: `
            <p>KI durchsucht Dokumente, Artikel und Berichte, fasst das Wesentliche zusammen und liefert dir die relevanten Argumente für deine Entscheidung.</p>
            <h4>Praktischer Nutzen:</h4>
            <ul>
              <li>Sichten langer Dokumente in Minuten</li>
              <li>Vergleich verschiedener Quellen</li>
              <li>Extraktion von Zahlen und Fakten</li>
              <li>Strukturierte Recherche-Berichte</li>
            </ul>
          `
        }
      },
      'en': {
        // Vision Page - Featured Card
        'cooperation': {
          icon: '<i class="ph ph-lightbulb"></i>',
          title: 'Human-AI Cooperation',
          body: `
            <p>The future belongs to the cooperation between humans and AI. We do not believe in replacing human intelligence, but in extending it.</p>
            <h4>What humans contribute:</h4>
            <ul>
              <li><strong>Creativity</strong> – Original ideas and innovative solutions</li>
              <li><strong>Empathy</strong> – Human understanding and emotional intelligence</li>
              <li><strong>Ethical judgment</strong> – Moral compass and value orientation</li>
              <li><strong>Contextual understanding</strong> – Holistic view of complex situations</li>
            </ul>
            <h4>What AI contributes:</h4>
            <ul>
              <li><strong>Speed</strong> – Rapid processing of large data volumes</li>
              <li><strong>Pattern recognition</strong> – Identifying connections in data</li>
              <li><strong>Availability</strong> – 24/7 readiness without fatigue</li>
              <li><strong>Scalability</strong> – Consistent quality at growing scale</li>
            </ul>
          `
        },
        // Bridges Section
        'generations': {
          icon: '<i class="ph ph-users-three"></i>',
          title: 'Bridging Generations',
          body: `
            <p>PLU connects youth and seniors on a shared platform. Each generation brings unique perspectives and strengths.</p>
            <h4>Youth contribute:</h4>
            <ul>
              <li>Natural affinity for technology and quick learning</li>
              <li>Fresh perspectives on new technologies</li>
              <li>Creative use of digital tools</li>
              <li>Curiosity and willingness to experiment</li>
            </ul>
            <h4>Seniors contribute:</h4>
            <ul>
              <li>Life experience and wisdom</li>
              <li>Critical questioning from different perspectives</li>
              <li>Patience and structured thinking</li>
              <li>Mentoring and knowledge transfer</li>
            </ul>
          `
        },
        'disciplines': {
          icon: '<i class="ph ph-puzzle-piece"></i>',
          title: 'Connecting Disciplines',
          body: `
            <p>AI is not just technology – it touches all areas of human life. PLU brings different disciplines together.</p>
            <h4>Technology meets:</h4>
            <ul>
              <li><strong>Creativity</strong> – AI as a tool for artists and designers</li>
              <li><strong>Science</strong> – Research and data analysis</li>
              <li><strong>Education</strong> – Personalised learning and teaching</li>
              <li><strong>Business</strong> – Efficiency and innovation at work</li>
              <li><strong>Social matters</strong> – Communication and collaboration</li>
            </ul>
            <p>This interdisciplinary approach enables holistic understanding and responsible use of AI.</p>
          `
        },
        'cultures': {
          icon: '<i class="ph ph-globe"></i>',
          title: 'Connecting Cultures',
          body: `
            <p>AI technology knows no boundaries. PLU uses this potential to build cultural bridges and promote global collaboration.</p>
            <h4>AI enables:</h4>
            <ul>
              <li><strong>Real-time translation</strong> – Overcoming language barriers</li>
              <li><strong>Cultural exchange</strong> – Sharing and discussing ideas globally</li>
              <li><strong>Accessibility</strong> – Education for all, regardless of location</li>
              <li><strong>Diverse perspectives</strong> – Solutions from different cultural circles</li>
            </ul>
            <p>We believe in technology as a bridge-builder between people of all cultures and backgrounds.</p>
          `
        },
        'theory-practice': {
          icon: '<i class="ph ph-code"></i>',
          title: 'Uniting Theory & Practice',
          body: `
            <p>At PLU, you don't just learn theoretically – you apply what you've learned immediately. Practical application is the key to real understanding.</p>
            <h4>Our approach:</h4>
            <ul>
              <li><strong>Learning by doing</strong> – Every lesson includes practical exercises</li>
              <li><strong>Real-world projects</strong> – Application to real scenarios</li>
              <li><strong>Experimentation space</strong> – Safe trial without risk</li>
              <li><strong>Peer feedback</strong> – Learning and improving together</li>
            </ul>
            <p>Theory gives you the foundation, practice gives you the ability.</p>
          `
        },
        // Values Section
        'social-skills': {
          icon: '<i class="ph ph-heart"></i>',
          title: 'Social Competence',
          body: `
            <p>In an increasingly digital world, social skills become ever more valuable. AI cannot empathise or build interpersonal relationships.</p>
            <h4>Important social competences:</h4>
            <ul>
              <li><strong>Empathy</strong> – Understanding and feeling with others</li>
              <li><strong>Communication</strong> – Clear and empathetic expression</li>
              <li><strong>Teamwork</strong> – Achieving goals together</li>
              <li><strong>Conflict resolution</strong> – Dealing constructively with differences</li>
              <li><strong>Social intelligence</strong> – Recognising and navigating dynamics</li>
            </ul>
            <p>These skills remain indispensable – no matter how advanced AI becomes.</p>
          `
        },
        'cultural-expression': {
          icon: '<i class="ph ph-paint-brush"></i>',
          title: 'Cultural Expression',
          body: `
            <p>Art, music, literature – the forms of expression that define us as humans. AI can support, but cannot replace the human soul.</p>
            <h4>Human creativity includes:</h4>
            <ul>
              <li><strong>Authenticity</strong> – Genuine experiences and emotions</li>
              <li><strong>Cultural context</strong> – Meaning beyond the surface</li>
              <li><strong>Intention</strong> – Conscious statement with meaning</li>
              <li><strong>Subjectivity</strong> – Personal perspective and interpretation</li>
            </ul>
            <p>AI is a tool for creatives, never the artist itself.</p>
          `
        },
        'language-diversity': {
          icon: '<i class="ph ph-translate"></i>',
          title: 'Language Diversity',
          body: `
            <p>Language is more than words – it is culture, way of thinking, and identity. PLU celebrates linguistic diversity and uses AI to overcome barriers.</p>
            <h4>We promote:</h4>
            <ul>
              <li><strong>Multilingualism</strong> – Thinking in different languages</li>
              <li><strong>Cultural nuances</strong> – Meaning beyond translation</li>
              <li><strong>Accessibility</strong> – Education in one's mother tongue</li>
              <li><strong>Global community</strong> – Connection across language barriers</li>
            </ul>
            <p>AI supports communication, but human language remains our most precious cultural asset.</p>
          `
        },
        'ethical-judgment': {
          icon: '<i class="ph ph-scales"></i>',
          title: 'Ethical Judgment',
          body: `
            <p>AI can present options, but cannot make moral decisions. Ethical judgment remains human responsibility.</p>
            <h4>Ethical principles:</h4>
            <ul>
              <li><strong>Responsibility</strong> – For the consequences of our decisions</li>
              <li><strong>Transparency</strong> – Communicating honestly about AI use</li>
              <li><strong>Fairness</strong> – Equal opportunities and fair treatment</li>
              <li><strong>Respect</strong> – The dignity and autonomy of every person</li>
              <li><strong>Sustainability</strong> – Considering long-term consequences</li>
            </ul>
            <p>Technology follows human values, not the other way around.</p>
          `
        },
        // Responsibility Section
        'energy': {
          icon: '<i class="ph ph-lightning"></i>',
          title: 'Energy Consumption',
          body: `
            <p>AI models require significant computing power. We take responsibility for our ecological footprint.</p>
            <h4>Our measures:</h4>
            <ul>
              <li>Prefer efficient models where possible</li>
              <li>Mindful use of AI queries</li>
              <li>Conscious decision when AI is really necessary</li>
              <li>Supporting research into green AI</li>
            </ul>
            <p>Sustainability is not an option, but an obligation.</p>
          `
        },
        'transparency': {
          icon: '<i class="ph ph-eye"></i>',
          title: 'Transparency',
          body: `
            <p>We openly document where and how AI is used. Transparency creates trust and enables informed decisions.</p>
            <h4>Our transparency principles:</h4>
            <ul>
              <li>Clear labelling of AI-generated content</li>
              <li>Disclosure of tools and models used</li>
              <li>Honest communication about AI capabilities and limitations</li>
              <li>Documentation of decision-making processes</li>
            </ul>
          `
        },
        'abuse': {
          icon: '<i class="ph ph-shield"></i>',
          title: 'Preventing Misuse',
          body: `
            <p>With great power comes great responsibility. We actively oppose harmful AI use.</p>
            <h4>We reject:</h4>
            <ul>
              <li>Generation of deepfakes for deception</li>
              <li>Spreading hate speech and disinformation</li>
              <li>AI-supported fraud methods</li>
              <li>Violation of intellectual property</li>
              <li>Discrimination through algorithmic bias</li>
            </ul>
            <p>Every user bears responsibility for ethical AI use.</p>
          `
        },
        'education': {
          icon: '<i class="ph ph-student"></i>',
          title: 'Promoting Education',
          body: `
            <p>Knowledge about AI technologies should be accessible to all, regardless of background, age, or financial means.</p>
            <h4>Our educational mission:</h4>
            <ul>
              <li>Free, high-quality learning content for everyone</li>
              <li>Age-appropriate preparation of complex topics</li>
              <li>Practical application instead of mere theory</li>
              <li>Open-source resources for the community</li>
              <li>Continuous updating with technological development</li>
            </ul>
            <p>Education is the key to responsible AI use.</p>
          `
        },
        // Pledge Section
        'pledge-1': {
          icon: '<span>1</span>',
          title: 'Tool, Not Replacement',
          body: `
            <p>We use AI as a <strong>tool</strong>, not a replacement for our own thinking.</p>
            <p>AI is a powerful tool, but control and responsibility remain with humans. We critically verify AI outputs and make informed decisions ourselves.</p>
            <h4>Practical implementation:</h4>
            <ul>
              <li>Always question and verify AI suggestions</li>
              <li>Maintain and develop one's own judgment</li>
              <li>Use AI as support, not as a decision substitute</li>
            </ul>
          `
        },
        'pledge-2': {
          icon: '<span>2</span>',
          title: 'Critical Questioning',
          body: `
            <p>We promote <strong>critical questioning</strong> and independent judgment.</p>
            <p>AI can make mistakes, produce hallucinations, or be biased. Critical thinking is the best defence against misinformation.</p>
            <h4>Practical implementation:</h4>
            <ul>
              <li>Check sources and verify facts</li>
              <li>Gather multiple perspectives</li>
              <li>Conduct your own research</li>
            </ul>
          `
        },
        'pledge-3': {
          icon: '<span>3</span>',
          title: 'Respect Data Protection',
          body: `
            <p>We respect <strong>data protection</strong> and privacy.</p>
            <p>Personal data deserves protection. We handle information responsibly and protect everyone's privacy.</p>
            <h4>Practical implementation:</h4>
            <ul>
              <li>Do not enter sensitive data into public AI tools</li>
              <li>Use enterprise solutions for confidential content</li>
              <li>Understand terms of service and privacy policies</li>
            </ul>
          `
        },
        'pledge-4': {
          icon: '<span>4</span>',
          title: 'Share Knowledge',
          body: `
            <p>We <strong>educate</strong>, not just reproduce – knowledge is shared and expanded.</p>
            <p>AI reproduces existing knowledge. Humans create new knowledge and pass it on – this is how society develops.</p>
            <h4>Practical implementation:</h4>
            <ul>
              <li>Share what you've learned with others</li>
              <li>Offer mentoring and support</li>
              <li>Contribute to the open-source community</li>
            </ul>
          `
        },
        'pledge-5': {
          icon: '<span>5</span>',
          title: 'Stay Human',
          body: `
            <p>We remain <strong>human</strong> in a technological world.</p>
            <p>Technology should extend our humanity, not replace it. We cultivate interpersonal relationships and social competences.</p>
            <h4>Practical implementation:</h4>
            <ul>
              <li>Prioritise genuine human-to-human interaction</li>
              <li>Cultivate empathy and emotional intelligence</li>
              <li>See technology as a tool, not life's content</li>
            </ul>
          `
        },
        // Jugendliche Page
        'webdev': {
          icon: '<i class="ph ph-code"></i>',
          title: 'Web Development',
          body: `
            <p>HTML, CSS and JavaScript are the building blocks of the internet. You learn how websites are structured, styled, and made interactive.</p>
            <h4>What you learn:</h4>
            <ul>
              <li>Semantic HTML for accessible structures</li>
              <li>Modern CSS with Flexbox and Grid</li>
              <li>JavaScript for interactivity and dynamics</li>
              <li>Responsive design for all devices</li>
            </ul>
          `
        },
        'design': {
          icon: '<i class="ph ph-paint-brush"></i>',
          title: 'Media & Design',
          body: `
            <p>Visual design is everywhere – from social media to your portfolio. We show you how to create appealing designs with professional open-source tools.</p>
            <h4>Tools & Skills:</h4>
            <ul>
              <li>Image editing with GIMP</li>
              <li>Vector graphics with Inkscape</li>
              <li>Video editing with DaVinci Resolve</li>
              <li>Color theory, typography and layout</li>
            </ul>
          `
        },
        'ki': {
          icon: '<i class="ph ph-brain"></i>',
          title: 'AI as a Tool',
          body: `
            <p>Artificial intelligence is not magic, but a tool. Learn how to use AI specifically to solve tasks faster and more creatively.</p>
            <h4>Topics:</h4>
            <ul>
              <li>Prompt engineering for better results</li>
              <li>Critical evaluation of AI outputs</li>
              <li>Responsible use in school and career</li>
              <li>Practical applications in everyday life</li>
            </ul>
          `
        },
        'portfolio': {
          icon: '<i class="ph ph-trophy"></i>',
          title: 'Practice & Portfolio',
          body: `
            <p>A strong portfolio opens doors. We accompany you in real projects that you can proudly present – for internships, university, or first commissions.</p>
            <h4>Project examples:</h4>
            <ul>
              <li>Your own website or landing page</li>
              <li>Logo and graphic designs</li>
              <li>Short films or animations</li>
              <li>AI-assisted content and concepts</li>
            </ul>
          `
        },
        'gimp': {
          icon: '<i class="ph ph-image"></i>',
          title: 'GIMP',
          body: `
            <p>GIMP (GNU Image Manipulation Program) is the free alternative to Photoshop. Professional image editing without subscription costs.</p>
            <h4>Features:</h4>
            <ul>
              <li>Layer-based image editing</li>
              <li>Advanced retouching tools</li>
              <li>Support for all common formats</li>
              <li>Plugins for virtually endless extension</li>
            </ul>
          `
        },
        'inkscape': {
          icon: '<i class="ph ph-pen-nib"></i>',
          title: 'Inkscape',
          body: `
            <p>Inkscape is the leading open-source vector editor. Perfect for logos, illustrations and scalable graphics.</p>
            <h4>Features:</h4>
            <ul>
              <li>Precise path tools and Bézier curves</li>
              <li>Infinitely scalable vector graphics</li>
              <li>Native SVG support</li>
              <li>Professional print export</li>
            </ul>
          `
        },
        'audacity': {
          icon: '<i class="ph ph-speaker-high"></i>',
          title: 'Audacity',
          body: `
            <p>Audacity is the standard tool for audio editing. Ideal for podcasts, music projects and voice recordings.</p>
            <h4>Features:</h4>
            <ul>
              <li>Multi-track recording and editing</li>
              <li>Noise reduction and effects</li>
              <li>Export to all common audio formats</li>
              <li>Completely free and open source</li>
            </ul>
          `
        },
        'davinci': {
          icon: '<i class="ph ph-film-strip"></i>',
          title: 'DaVinci Resolve',
          body: `
            <p>DaVinci Resolve offers Hollywood-quality video editing. The free version covers almost all beginner to advanced needs.</p>
            <h4>Features:</h4>
            <ul>
              <li>Professional editing and timeline editing</li>
              <li>Advanced colour correction (colour grading)</li>
              <li>Visual effects and motion graphics</li>
              <li>Studio-quality audio mixing</li>
            </ul>
          `
        },
        // Berufstaetige Page
        'emails': {
          icon: '<i class="ph ph-envelope"></i>',
          title: 'Email Overload',
          body: `
            <p>Emails are among the biggest time wasters in professional life. With AI, drafts can be created in seconds and replies formulated efficiently.</p>
            <h4>AI solutions:</h4>
            <ul>
              <li>Professional email drafts from bullet points</li>
              <li>Automatic summaries of long email threads</li>
              <li>Tone adjustment (polite, direct, formal)</li>
              <li>Multilingual communication without a translator</li>
            </ul>
          `
        },
        'meetings': {
          icon: '<i class="ph ph-users"></i>',
          title: 'Meeting Marathon',
          body: `
            <p>Too many meetings cost time and energy. AI helps you make meetings more efficient and automates follow-ups.</p>
            <h4>AI solutions:</h4>
            <ul>
              <li>Automatic agenda creation</li>
              <li>Live transcription and minutes</li>
              <li>Summary of the most important results</li>
              <li>Identification of action items</li>
            </ul>
          `
        },
        'reports': {
          icon: '<i class="ph ph-file-text"></i>',
          title: 'Documentation',
          body: `
            <p>Reports, minutes and documentation are necessary but time-consuming. AI significantly speeds up writing.</p>
            <h4>AI solutions:</h4>
            <ul>
              <li>Structured reports from raw data</li>
              <li>Automatic formatting and outlining</li>
              <li>Generate recurring text modules</li>
              <li>Quality check for consistency</li>
            </ul>
          `
        },
        'research': {
          icon: '<i class="ph ph-magnifying-glass"></i>',
          title: 'Research',
          body: `
            <p>Finding information often takes more time than the actual work. AI can review sources, summarize and prioritize.</p>
            <h4>AI solutions:</h4>
            <ul>
              <li>Quick scanning of long documents</li>
              <li>Extraction of relevant facts and figures</li>
              <li>Comparison of different sources</li>
              <li>Structured research reports</li>
            </ul>
          `
        },
        'efficiency': {
          icon: '<i class="ph ph-lightning"></i>',
          title: '3x Faster',
          body: `
            <p>AI massively accelerates repetitive tasks. What used to take hours, you complete in minutes – with consistent or better quality.</p>
            <h4>Examples:</h4>
            <ul>
              <li>Email drafts in seconds instead of minutes</li>
              <li>First report drafts in minutes instead of hours</li>
              <li>Research results at a glance</li>
              <li>Presentations from bullet points</li>
            </ul>
          `
        },
        'quality': {
          icon: '<i class="ph ph-check-circle"></i>',
          title: 'Better Quality',
          body: `
            <p>AI delivers not only faster, but often also more precisely. Grammar, structure and completeness are systematically improved.</p>
            <h4>Benefits:</h4>
            <ul>
              <li>Error-free texts and documents</li>
              <li>Clear structures and logic</li>
              <li>Consistent terminology</li>
              <li>Professional writing style</li>
            </ul>
          `
        },
        'balance': {
          icon: '<i class="ph ph-coffee"></i>',
          title: 'Work-Life Balance',
          body: `
            <p>Less time for tedious routines means more time for what really matters. Family, hobbies, sports – or simply switching off.</p>
            <h4>Effects:</h4>
            <ul>
              <li>Finishing work earlier</li>
              <li>Less stress and overload</li>
              <li>More time for creative tasks</li>
              <li>Better physical and mental health</li>
            </ul>
          `
        },
        'email-example': {
          icon: '<i class="ph ph-envelope-simple"></i>',
          title: 'Writing Emails',
          body: `
            <p>Enter bullet points – AI formulates professional, polite emails in seconds. Complex inquiries or conflicts are also expressed clearly and objectively.</p>
            <h4>Practical benefit:</h4>
            <ul>
              <li>Time savings of up to 60%</li>
              <li>Consistent, professional tone</li>
              <li>Multilingual correspondence</li>
              <li>Polite rejections and follow-ups</li>
            </ul>
          `
        },
        'presentation-example': {
          icon: '<i class="ph ph-presentation"></i>',
          title: 'Creating Presentations',
          body: `
            <p>Structure your ideas in bullet points – AI helps you turn them into convincing slides with clear messages. Including speaker notes and handouts.</p>
            <h4>Practical benefit:</h4>
            <ul>
              <li>Quick outline and structure</li>
              <li>Clear key messages</li>
              <li>Speaker notes automatically generated</li>
              <li>Less stress before the meeting</li>
            </ul>
          `
        },
        'data-example': {
          icon: '<i class="ph ph-chart-bar"></i>',
          title: 'Analyzing Data',
          body: `
            <p>Upload tables or reports – AI recognises patterns, calculates key figures and formulates insights in understandable language. Ideal for quarterly reports or project reviews.</p>
            <h4>Practical benefit:</h4>
            <ul>
              <li>Quick identification of trends</li>
              <li>Automatic visualisation suggestions</li>
              <li>Stakeholder-friendly summaries</li>
              <li>Fewer errors from manual calculation</li>
            </ul>
          `
        },
        'research-example': {
          icon: '<i class="ph ph-magnifying-glass"></i>',
          title: 'Research & Summaries',
          body: `
            <p>AI searches documents, articles and reports, summarises the essentials and provides you with the relevant arguments for your decision.</p>
            <h4>Practical benefit:</h4>
            <ul>
              <li>Scanning long documents in minutes</li>
              <li>Comparison of different sources</li>
              <li>Extraction of numbers and facts</li>
              <li>Structured research reports</li>
            </ul>
          `
        }
      }
    };
    
    const langContent = isEnglish ? content['en'] : content['de'];
    return langContent[modalId] || content['de'][modalId]; // Fallback to German if not found

  }

  open(modalElement) {
    // Store previously focused element
    this.previousActiveElement = document.activeElement;
    
    // Add to DOM
    document.body.appendChild(modalElement);
    this.activeModal = modalElement;
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus trap
    this.focusFirstElement();
    
    // Animation
    requestAnimationFrame(() => {
      modalElement.classList.add('active');
    });
  }

  close() {
    if (!this.activeModal) return;
    
    // Animation out
    this.activeModal.classList.remove('active');
    
    // Remove after animation
    setTimeout(() => {
      this.activeModal.remove();
      this.activeModal = null;
      
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Restore focus
      if (this.previousActiveElement) {
        this.previousActiveElement.focus();
      }
    }, 300);
  }

  handleKeydown(e) {
    if (!this.activeModal) return;
    
    // Close on ESC
    if (e.key === 'Escape') {
      this.close();
      return;
    }
    
    // Focus trap
    if (e.key === 'Tab') {
      const focusableElements = this.activeModal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  focusFirstElement() {
    const focusable = this.activeModal.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable) {
      focusable.focus();
    }
  }
}
