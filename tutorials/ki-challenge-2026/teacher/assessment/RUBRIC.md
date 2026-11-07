# KI Challenge 2026 — Bewertungskriterien (Rubric)

> **Ziel:** Fair und transparent bewerten — nicht den KI-generierten Code, sondern die architektonischen Entscheidungen und das Team-Verständnis.

---

## Bewertungsprinzipien

1. **Architektur > Ästhetik** — Ein hässlicher, aber strukturierter Code ist besser als schöner Chaos-Code.
2. **Funktion > Perfektion** — Ein halb-fertiges, aber funktionierendes Feature ist besser als ein perfektes Mockup.
3. **Teamwork > Individualismus** — Wie hat das Team zusammengearbeitet? Wer hat wem geholfen?
4. **Erklären > Ausführen** — Ein Schüler, der seinen Code erklären kann, hat mehr gelernt als einer, der ihn nur kopiert hat.

---

## Kategorien & Punkte

**Gesamt: 100 Punkte**

| Kategorie | Punkte | Anteil |
|-----------|--------|--------|
| Architektur & Code-Qualität | 25 | 25% |
| Funktionalität | 25 | 25% |
| Design & UX | 15 | 15% |
| i18n & Accessibility | 15 | 15% |
| Teamarbeit & Präsentation | 10 | 10% |
| Bonus: Innovation | 10 | 10% |

---

## 1. Architektur & Code-Qualität (25 Punkte)

| Level | Punkte | Kriterien |
|-------|--------|-----------|
| **Exzellent (21–25)** | ✅ | ITCSS-Layer korrekt genutzt, BEM-Namespace durchgängig (`challenge-*`), 0 Inline-Scripts, semantisches HTML, sinnvolle Dateistruktur, KI-Prompts waren spezifisch und architektur-bewusst |
| **Gut (16–20)** | ✅ | Meist korrekte ITCSS-Struktur, gelegentliche BEM-Verstöße, 1–2 Inline-Scripts, HTML größtenteils semantisch |
| **Ausreichend (11–15)** | ⚠️ | Grundstruktur vorhanden, aber Layer durcheinander, mehrere BEM-Fehler, einige Inline-Scripts |
| **Verbesserungswürdig (6–10)** | ❌ | Chaos-Struktur, keine klare Architektur, viele Inline-Scripts, KI hat wild generiert ohne Constraints |
| **Nicht erfüllt (0–5)** | ❌ | Keine erkennbare Struktur, alles in einer Datei, keine BEM-Nutzung |

**Prüfpunkte:**
- [ ] CSS verwendet `@layer` korrekt
- [ ] Alle Klassen beginnen mit `.challenge-*` oder `.u-*` / `.is-*` / `.has-*`
- [ ] JavaScript ist modular (ES6 Imports/Exports)
- [ ] Keine Inline-Scripts im HTML
- [ ] Semantische HTML5-Tags (`<header>`, `<main>`, `<article>`, `<nav>`)
- [ ] Dateien sind logisch strukturiert (CSS in `css/`, JS in `js/`)

---

## 2. Funktionalität (25 Punkte)

### Team A (SYNTHESE)

| Feature | Max. Punkte | Anforderungen |
|---------|-------------|---------------|
| Topic-Cards | 5 | Grid von Karten mit Bild, Titel, Kategorie, Schwierigkeit |
| Search | 5 | Echtzeit-Suche über Titel, Content, Tags |
| Filter | 5 | Filter nach Kategorie + Schwierigkeit |
| Topic-Detail | 5 | Modal/Seite mit vollständigem Inhalt |
| Bookmarks | 5 | localStorage-basierte Lesezeichen |

### Team B (PRISMA)

| Feature | Max. Punkte | Anforderungen |
|---------|-------------|---------------|
| Color Engine | 5 | Stimmung → 5-Farb-Palette |
| Type Matcher | 5 | Schriftpaarung mit Begründung |
| Layout Blueprint | 5 | Use Case → responsives Grid-CSS |
| Export Station | 5 | Kopieren von generiertem CSS/JSON |
| Moodboard | 5 | Drag & Drop Moodboard |

**Bewertung pro Feature:**
- **5 Punkte** — Funktioniert einwandfrei, intuitive Bedienung
- **4 Punkte** — Funktioniert, kleine UX-Mängel
- **3 Punkte** — Grundfunktion vorhanden, aber buggy
- **2 Punkte** — Anfang vorhanden, nicht funktionsfähig
- **1 Punkt** — Nur HTML/CSS sichtbar, keine Logik
- **0 Punkte** — Nicht vorhanden

---

## 3. Design & UX (15 Punkte)

| Level | Punkte | Kriterien |
|-------|--------|-----------|
| **Exzellent (13–15)** | ✅ | Konsistentes Design-System, durchdachte Farbpalette, gute Typografie, flüssige Animationen, Mobile-First funktioniert |
| **Gut (10–12)** | ✅ | Meist konsistent, gelegentliche Design-Inkonsistenzen, Mobile größtenteils OK |
| **Ausreichend (7–9)** | ⚠️ | Grundlegendes Design, aber unpoliert, Mobile-Probleme |
| **Verbesserungswürdig (4–6)** | ❌ | Sehr roh, kein Design-System, nur Standard-Browser-Styling |
| **Nicht erfüllt (0–3)** | ❌ | Keine visuelle Gestaltung |

**Prüfpunkte:**
- [ ] Einheitliche Farbpalette (definiert in `tokens.css`)
- [ ] Konsistente Abstände und Größen
- [ ] Gut lesbare Typografie
- [ ] Flüssige Hover- und Übergangseffekte
- [ ] Mobile-Ansicht funktioniert (320px–768px)
- [ ] Dark/Light Mode funktioniert

---

## 4. i18n & Accessibility (15 Punkte)

| Level | Punkte | Kriterien |
|-------|--------|-----------|
| **Exzellent (13–15)** | ✅ | Vollständig bilingual (DE/EN), alle Texte übersetzt, korrekte ARIA-Labels, Tastatur-Navigation, Screenreader-freundlich |
| **Gut (10–12)** | ✅ | Bilingual, aber einige Texte fehlen, grundlegende ARIA-Labels vorhanden |
| **Ausreichend (7–9)** | ⚠️ | Hauptsächlich DE, nur wenige EN-Keys, einige ARIA-Labels |
| **Verbesserungswürdig (4–6)** | ❌ | Nur DE, kaum ARIA, kein Accessibility-Fokus |
| **Nicht erfüllt (0–3)** | ❌ | Keine i18n, keine Accessibility |

**Prüfpunkte:**
- [ ] `data-i18n` Attribute auf allen sichtbaren Texten
- [ ] `de.js` und `en.js` sind synchron (gleiche Keys)
- [ ] Sprachwechsel funktioniert ohne Seiten-Neuladen
- [ ] ARIA-Labels auf interaktiven Elementen
- [ ] Fokus-Indikatoren sichtbar
- [ ] Tab-Navigation funktioniert logisch

---

## 5. Teamarbeit & Präsentation (10 Punkte)

| Level | Punkte | Kriterien |
|-------|--------|-----------|
| **Exzellent (9–10)** | ✅ | Gleichmäßige Beteiligung, klare Rollenverteilung, überzeugende Präsentation, Team kann jede Entscheidung erklären |
| **Gut (7–8)** | ✅ | Meist gleichmäßig, gute Präsentation, einige Unsicherheiten bei Erklärungen |
| **Ausreichend (5–6)** | ⚠️ | Ungleiche Beteiligung, mittelmäßige Präsentation |
| **Verbesserungswürdig (3–4)** | ❌ | Wenige haben gearbeitet, schwache Präsentation |
| **Nicht erfüllt (0–2)** | ❌ | Nur 1–2 Personen haben gearbeitet, keine sinnvolle Präsentation |

---

## 6. Bonus: Innovation (10 Punkte)

**Zusätzliche Punkte für besondere Ideen:**

| Innovation | Punkte |
|------------|--------|
| Eigenes Feature, das nicht im Plan war | +3–5 |
| Besonders kreative KI-Prompting-Strategie | +2–3 |
| Herausragende Code-Qualität (über den Plan hinaus) | +2–3 |
| Exzellente Dokumentation/Kommentare | +1–2 |

---

## Bewertungsbogen (Vorlage)

```
Team: _________________  Projekt: SYNTHESE / PRISMA  Datum: ___________

Architektur & Code-Qualität    ___ / 25
Funktionalität                 ___ / 25
Design & UX                    ___ / 15
i18n & Accessibility           ___ / 15
Teamarbeit & Präsentation      ___ / 10
Bonus: Innovation              ___ / 10
────────────────────────────────────────
GESAMT                         ___ / 100

Notenvorschlag:
90–100 = Sehr gut (1)
80–89  = Gut (2)
70–79  = Befriedigend (3)
60–69  = Genügend (4)
< 60   = Nicht genügend (5)

Kommentar:
_________________________________________________________
_________________________________________________________
```

---

## Wichtige Hinweise für den Lehrer

### Was NICHT bewertet wird:
- ❌ Ob der Code von KI oder vom Schüler stammt
- ❌ Pixel-perfekte Designs
- ❌ Vollständige Implementierung aller Features
- ❌ Perfekte Rechtschreibung

### Was BEWERTET wird:
- ✅ Ob die Architektur verstanden und angewendet wurde
- ✅ Ob das Team zusammengearbeitet hat
- ✅ Ob der Schüler seine Entscheidungen erklären kann
- ✅ Ob KI-gegenerierter Code in die Struktur eingepasst wurde

### Gesprächsfragen für die Bewertung (statt reiner Code-Prüfung):
1. "Warum hast du dieses Feature in den ITCSS-Layer `components` gepackt?"
2. "Wie hast du KI instruiert, damit der BEM-konforme Code herauskommt?"
3. "Was war die schwierigste Entscheidung bei der Architektur?"
4. "Wenn du noch einen Tag hättest — was würdest du ändern?"
5. "Was würdest du beim nächsten Projekt anders machen?"
