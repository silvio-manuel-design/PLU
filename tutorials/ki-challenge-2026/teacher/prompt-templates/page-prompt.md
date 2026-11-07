# Prompt-Template: Neue Seite erstellen

> Kopiere diesen Text, passe die [PLATZHALTER] an und sende ihn an deine KI.

---

## Kontext (Immer dazugeben!)

```markdown
Ich arbeite an einem Webprojekt mit folgender Architektur:
- Build-Tool: Vite 6
- CSS: ITCSS mit @layer (settings, generic, elements, components, utilities, modes)
- Naming: BEM mit .challenge-* Prefix
- JS: Vanilla ES6 Modules, 0 Inline Scripts
- i18n: data-i18n Attribute, de/en
- Mobile-First: Basis-Styles für Mobile, @media für Desktop
- Root-relative Pfade: /tutorials/ki-challenge-2026/...

WICHTIGE REGELN:
1. Alle CSS-Klassen MÜSSEN mit .challenge- beginnen
2. Keine IDs für Styling
3. Mobile-First @media Queries
4. Semantisches HTML5
5. ARIA-Labels für interaktive Elemente
6. CSS-Variablen aus tokens.css verwenden
7. Keine Inline-Scripts — alles als ES6 Module
8. Phosphor Icons für Iconografie
```

---

## Template

```markdown
Erstelle mir eine neue Seite: `[SEITEN-NAME].html`.

Zweck: [BESCHREIBUNG]

Seitenstruktur:
1. Header (mit Navigation)
2. [LISTE DER SECTIONS]
3. Footer

Inhalt pro Section:
- Section 1: [BESCHREIBUNG]
- Section 2: [BESCHREIBUNG]
- ...

Interaktive Elemente:
- [LISTE: Was passiert bei Klick/Scroll/Input?]

i18n-Anforderungen:
- Alle sichtbaren Texte mit data-i18n Attributen
- Keys folgen dem Muster: `[page].[section].[element]`

Gib mir:
1. Die vollständige HTML-Datei (nur Body-Inhalt, kein <head> oder <script>)
2. Den CSS-Code für neue Komponenten (im Layer components)
3. Den JS-Code als ES6 Modul
4. Die i18n-Keys für de.js und en.js
```

---

## Beispiel: Topic-Detail Seite

```markdown
Erstelle mir eine neue Seite: `topic-detail.html`.

Zweck: Detail-Ansicht für ein Medientechnik-Thema aus dem SYNTHESE-Kompendium.

Seitenstruktur:
1. Header (mit Zurück-Button)
2. Hero-Bereich (Thema-Titel, Kategorie-Tag, Schwierigkeits-Badge)
3. Hauptinhalt (HTML-Content mit Bildern)
4. "Did You Know"-Box (interessanter Fakt)
5. Verwandte Themen (3 Card-Links)
6. Footer

Inhalt pro Section:
- Hero: Großer Titel, Kategorie-Farbe als Akzent, Schwierigkeit (Leicht/Mittel/Schwer)
- Hauptinhalt: Rendered HTML aus dem topics-Array, mit Bildern und Code-Beispielen
- Did You Know: Hervorgehobene Box mit einem überraschenden Fakt
- Verwandte Themen: 3 kleine Cards mit Titel und Link

Interaktive Elemente:
- Zurück-Button: Leitet zur Hauptseite zurück
- Bookmark-Button: Speichert Thema in localStorage
- Code-Copy-Buttons: Kopieren von Code-Beispielen

i18n-Anforderungen:
- Alle sichtbaren Texte mit data-i18n Attributen
- Keys: `topic.back`, `topic.bookmark`, `topic.related`, `topic.didYouKnow`

Gib mir:
1. Die vollständige HTML-Datei (nur Body-Inhalt)
2. Den CSS-Code für neue Komponenten
3. Den JS-Code als ES6 Modul (Topic laden, Bookmark toggeln)
4. Die i18n-Keys für de.js und en.js
```

---

## Tipps

- **Beschreibe die Seite wie ein Wireframe.** KI versteht Strukturen besser als ästhetische Beschreibungen.
- **Definiere die Datenquelle.** Wenn die Seite dynamische Inhalte hat, beschreibe das Datenformat.
- **Fordere semantisches HTML.** `<article>` für Inhalte, `<nav>` für Navigation, `<aside>` für Seitenleisten.
- **Verlange Accessibility von Anfang an.** `aria-label`, `role`, `tabindex` — nicht nachträglich.
