# Prompt-Template: Debuggen & Fixen

> Kopiere diesen Text, füge deinen fehlerhaften Code ein und sende ihn an deine KI.

---

## Kontext (Immer dazugeben!)

```markdown
Ich arbeite an einem Webprojekt mit folgender Architektur:
- Build-Tool: Vite 6
- CSS: ITCSS mit @layer (settings, generic, elements, components, utilities, modes)
- Naming: BEM mit .challenge-* Prefix
- JS: Vanilla ES6 Modules, 0 Inline Scripts
- i18n: data-i18n Attribute, de/en

WICHTIGE REGELN:
1. Alle CSS-Klassen MÜSSEN mit .challenge- beginnen
2. Keine IDs für Styling
3. Mobile-First @media Queries
4. Semantisches HTML5
5. ARIA-Labels für interaktive Elemente
```

---

## Template

```markdown
Mein Code hat folgenden Bug:

**Erwartetes Verhalten:**
[Was sollte passieren?]

**Tatsächliches Verhalten:**
[Was passiert stattdessen?]

**Fehlermeldung (Console):**
```
[Kopiere die exakte Fehlermeldung aus der Browser-Console]
```

**Mein Code:**

HTML:
```html
[FÜGE HTML HIER EIN]
```

CSS:
```css
[FÜGE CSS HIER EIN — nur den relevanten Teil]
```

JS:
```javascript
[FÜGE JS HIER EIN — nur den relevanten Teil]
```

**ITCSS-Struktur:**
- Der CSS-Code liegt in Layer: [components/utilities/etc.]
- Der JS-Code ist im Modul: [Dateiname]
- Wird importiert in: [Dateiname]

**Was ich schon probiert habe:**
- [Liste deiner Debugging-Versuche]

Bitte:
1. Erkläre mir, WARUM der Bug passiert
2. Zeige mir den FIX (nur den geänderten Code, nicht alles neu)
3. Erkläre, wie ich das nächste Mal selbst debuggen kann
```

---

## Beispiel: Search funktioniert nicht

```markdown
Mein Code hat folgenden Bug:

**Erwartetes Verhalten:**
Wenn ich in die Search-Box tippe, sollen nur passende Cards sichtbar bleiben.

**Tatsächliches Verhalten:**
Die Seite wird komplett leer — alle Cards verschwinden, auch wenn der Suchbegriff passt.

**Fehlermeldung (Console):**
```
Uncaught TypeError: Cannot read properties of undefined (reading 'toLowerCase')
    at search.js:15
```

**Mein Code:**

HTML:
```html
<div class="challenge-search">
  <input type="text" class="challenge-search__input" placeholder="Suchen...">
</div>
<div class="challenge-topics" id="topics-grid">
  <!-- Cards werden hier gerendert -->
</div>
```

JS (search.js):
```javascript
export function initSearch() {
  const input = document.querySelector('.challenge-search__input');
  const cards = document.querySelectorAll('.challenge-topic-card');

  input.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();

    cards.forEach(card => {
      const title = card.querySelector('.challenge-card__title').textContent;
      if (title.toLowerCase().includes(query)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}
```

**ITCSS-Struktur:**
- CSS in Layer components (search-bar.css)
- JS im Modul search.js
- Importiert in main.js

**Was ich schon probiert habe:**
- Console.log auf `cards` — gibt NodeList mit 0 Elementen zurück
- Der Selector `.challenge-topic-card` scheint richtig zu sein (im HTML geprüft)

Bitte:
1. Erkläre mir, WARUM der Bug passiert
2. Zeige mir den FIX
3. Erkläre, wie ich das nächste Mal selbst debuggen kann
```

---

## Debugging-Checkliste (Selbsthilfe)

Bevor du KI fragst, gehe diese Liste durch:

1. **Console öffnen** (F12 → Tab "Console")
   - Gibt es rote Fehlermeldungen?
   - Welche Datei und welche Zeile?

2. **Netzwerk-Tab prüfen** (F12 → Tab "Network")
   - Werden alle CSS/JS-Dateien geladen?
   - Gibt es 404-Fehler?

3. **Elemente inspizieren** (F12 → Tab "Elements")
   - Ist das HTML-Element wirklich da?
   - Werden die CSS-Klassen angewendet?
   - Gibt es Konflikte (durchgestrichene Regeln)?

4. **Console.log einfügen**
   - `console.log('Selector:', document.querySelector('.challenge-xxx'))`
   - `console.log('Variable:', meineVariable)`

5. **Schrittweise reduzieren**
   - Kommentiere alles aus außer dem Problem-Code
   - Funktioniert es isoliert?

6. **Vergleiche mit funktionierendem Code**
   - Gibt es eine ähnliche Funktion, die funktioniert?
   - Was ist der Unterschied?

---

## Tipps

- **Gebe den EXAKTEN Fehlertext.** KI kann Fehlermeldungen oft direkt deuten.
- **Gebe nur den RELEVANTEN Code.** 500 Zeilen HTML bringen nichts, wenn das Problem in 3 Zeilen JS liegt.
- **Beschreibe, was du schon probiert hast.** So vermeidest du Vorschläge, die du kennst.
- **Fordere eine Erklärung an.** Verstehen > Kopieren.
