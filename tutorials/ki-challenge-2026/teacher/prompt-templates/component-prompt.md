# Prompt-Template: Komponente erstellen

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

WICHTIGE REGELN:
1. Alle CSS-Klassen MÜSSEN mit .challenge- beginnen
2. Keine IDs für Styling
3. Mobile-First @media Queries
4. Semantisches HTML5
5. ARIA-Labels für interaktive Elemente
6. CSS-Variablen aus tokens.css verwenden
```

---

## Template

```markdown
Erstelle mir eine [KOMPONENTEN-TYP]-Komponente namens `.challenge-[NAME]`.

Zweck: [BESCHREIBUNG]

HTML-Struktur:
- [LISTE DER ELEMENTE]

States:
- Normal: [BESCHREIBUNG]
- Hover: [BESCHREIBUNG]
- Active/Selected: [BESCHREREIBUNG]
- Disabled: [BESCHREIBUNG]

Responsive:
- Mobile: [BESCHREIBUNG]
- Desktop (ab 768px): [BESCHREIBUNG]

Farben (nutze CSS-Variablen):
- Primärfarbe: var(--[FARBE])
- Hintergrund: var(--[FARBE])
- Text: var(--[FARBE])

i18n-Keys:
- Titel: data-i18n="[feature].[name].title"
- Beschreibung: data-i18n="[feature].[name].description"

Gib mir:
1. Die HTML-Struktur
2. Den CSS-Code (nur die Komponente, im Layer components)
3. Den JS-Code (als ES6 Modul mit Export)
```

---

## Beispiel: Search-Bar

```markdown
Erstelle mir eine Input-Komponente namens `.challenge-search`.

Zweck: Echtzeit-Suche über ein Array von Themen.

HTML-Struktur:
- Ein Wrapper-Div
- Ein Input-Feld mit Platzhalter-Text
- Ein Search-Icon (Phosphor Icon)
- Ein Clear-Button (X-Icon, nur sichtbar wenn Text drin)

States:
- Normal: Grauer Rahmen, weißer Hintergrund
- Focus: Blauer Rahmen (var(--challenge-primary)), leichter Schatten
- Hover: Etwas hellerer Hintergrund
- Mit Text: Clear-Button sichtbar

Responsive:
- Mobile: Volle Breite, größeres Input-Feld (min. 44px Höhe)
- Desktop (ab 768px): Max. 400px breit, zentriert

Farben (nutze CSS-Variablen):
- Rahmen: var(--challenge-border)
- Focus-Rahmen: var(--challenge-primary)
- Hintergrund: var(--challenge-surface)
- Text: var(--challenge-text)
- Platzhalter: var(--challenge-text-muted)

i18n-Keys:
- Platzhalter: data-i18n="search.placeholder"
- Aria-Label: aria-label="Suchen"

Gib mir:
1. Die HTML-Struktur
2. Den CSS-Code (nur die Komponente, im Layer components)
3. Den JS-Code (als ES6 Modul mit Export, mit Debounce 200ms)
```

---

## Tipps

- **Je spezifischer, desto besser.** "Ein Button" ist zu vage. "Ein Primary-Button mit Icon, 44px Höhe, abgerundeten Ecken, Hover-Animation" ist gut.
- **Erstelle die HTML-Struktur selbst** und lass KI nur CSS und JS generieren. So bleibst du in Kontrolle.
- **Verlange BEM von Anfang an.** Wenn KI generische Klassen wie `.button` oder `.card` vorschlägt, korrigiere sofort: "Bitte mit .challenge- Prefix."
- **Teste jeden Prompt** in einem isolierten File, bevor du ihn ins Projekt integrierst.
