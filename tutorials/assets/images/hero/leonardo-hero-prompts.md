# Leonardo AI Prompts - PLU Hero Bilder

## Übersicht
Premium Hero-Bilder für PLU Landing Page - Dark & Light Mode Varianten
Beide Bilder zeigen das gleiche Thema: "Das KI-gestützte Learning Universe"

**WICHTIG:** Bilder folgen dem Goldenen Schnitt (Rule of Thirds) - Kugel rechts, Text-Platz links!

---

## Warum der Goldene Schnitt? (Design-Psychologie)

### Das Problem mit zentraler Kugel:
- ❌ Text überdeckt das wichtigste Bildelement
- ❌ Visuelle Konkurrenz zwischen Text und Bild
- ❌ Unruhige Komposition
- ❌ Schwierig lesbarer Text

### Die Lösung: Goldener Schnitt (Rule of Thirds)
- ✅ Kugel im rechten Drittel (visueller Anker)
- ✅ Linke zwei Drittel: Negativer Raum für Text
- ✅ Energieströme führen vom Bild zum Text
- ✅ Harmonische, professionelle Komposition
- ✅ Natürliche Blickführung des Betrachters

### Die Psychologie dahinter:
Das menschliche Auge folgt beim Lesen (Westliche Kulturen) einem **"Z-Pattern":**
1. Start oben links (Headline: "PANTAM LEARNING UNIVERSE")
2. Nach rechts (Kugel im rechten Drittel fängt Blick)
3. Nach unten links (Subtext lesen)
4. Zum CTA-Button

**Der Goldene Schnitt gilt seit Jahrhunderten als ästhetisch ideal** - er wirkt nicht konstruiert, sondern "natürlich richtig".

---

## Hero Bild - Dark Mode (Aktuell)

**Datei:** `plu-hero-main-dark.webp`

### Prompt
```
A breathtaking cosmic scene depicting a digital learning universe. The main subject - a glowing crystalline sphere representing artificial intelligence - is positioned in the right third of the frame following the rule of thirds, surrounded by orbiting geometric data nodes connected by luminous blue and cyan energy streams that flow toward the left side of the image. Deep space background with distant galaxies and nebulae in purple and blue tones. The composition creates negative space on the left side for text overlay while the visual interest remains on the right. Rich dark space blues (#0a0c10, #020617) with vibrant electric blue (#58a6ff) and cyan (#39d0d8) accent lighting. Ethereal atmosphere, cinematic wide angle, 8k resolution, photorealistic digital art. Sense of infinite knowledge and technological wonder. Volumetric lighting, particle effects, depth of field.
```

**Negative Prompt:** bright, white background, daytime, cartoon, flat, simple, low detail

**Settings:**
- Aspect Ratio: 16:9
- Style: Cinematic / Digital Art
- Alchemy: On
- PhotoReal: On
- Resolution: 2752x1536

**Color Palette:**
- Background: Deep space black #0a0c10 to #020617
- Accents: Electric blue #58a6ff, Cyan #39d0d8, Violet #8b5cf6
- Lighting: Warm golden glow from center sphere

---

## Hero Bild - Light Mode (Neu)

**Datei:** `plu-hero-main-light.webp`

### Prompt
```
A breathtaking cosmic scene depicting a digital learning universe in bright, optimistic tones. The main subject - a glowing crystalline sphere representing artificial intelligence - is positioned in the right third of the frame following the rule of thirds, surrounded by orbiting geometric data nodes connected by luminous soft blue and white energy streams that flow toward the left side. Clean light space background with soft white and pale blue nebulae, creating an airy, expansive atmosphere with intentional negative space on the left side for text overlay. Soft gradient from pure white (#ffffff) at top to light sky blue (#e0f2fe) at bottom, with vibrant but soft electric blue (#58a6ff) and cyan (#39d0d8) accent lighting. Ethereal, clean, inspiring atmosphere, cinematic wide angle, 8k resolution, photorealistic digital art. Sense of infinite knowledge and optimistic technological future. Soft volumetric lighting, gentle particle effects, subtle depth of field. Apple-style minimalism meets cosmic wonder.
```

**Negative Prompt:** dark, black, night, shadows, gloomy, stormy, heavy contrast, cartoon

**Settings:**
- Aspect Ratio: 16:9
- Style: Cinematic / Digital Art
- Alchemy: On
- PhotoReal: On
- Resolution: 2752x1536

**Color Palette:**
- Background: Pure white #ffffff to soft sky blue #e0f2fe / #f0f9ff
- Accents: Soft electric blue #58a6ff, Light cyan #39d0d8, Subtle violet #a78bfa
- Lighting: Warm golden-white glow from center sphere
- Atmosphere: Airy, clean, optimistic

---

## Wichtige Design-Elemente (Beide Varianten)

### Komposition (Goldener Schnitt / Rule of Thirds)
- **Position:** Kugel/Spähre im rechten Drittel (nicht zentral!)
- **Flow:** Energieströme bewegen sich von rechts nach links
- **Negativer Raum:** Linke Bildhälfte frei für Text-Overlay
- **Orbit:** Datenknoten im Kreis angeordnet, Fokus rechts
- **Perspektive:** Leicht von unten (heroisch)
- **Tiefe:** Mehrere Ebenen (Vordergrund rechts, Hintergrund links)

### Unterschiede Dark vs Light

| Element | Dark Mode | Light Mode |
|---------|-----------|------------|
| **Hintergrund** | Tiefes Schwarz-Blau | Weiß-Hellblau Gradient |
| **Stimmung** | Mysteriös, fokussiert | Offen, inspirierend |
| **Kontrast** | Hoch (dunkel/hell) | Mittel (harmonisch) |
| **Licht** | Künstliches Glow | Natürliches/Weiches Licht |
| **Schatten** | Tiefe, dramatische Schatten | Weiche, diffuse Schatten |
| **Akzentfarbe** | Neon-Blau, Electric | Pastell-Blau, Soft |

---

## Technische Spezifikationen

### Bildgrößen (Srcset)
```
plu-hero-main-{theme}-1376.webp  (Small/Mobile)
plu-hero-main-{theme}-2752.webp  (Medium/Tablet)  
plu-hero-main-{theme}-5504.webp  (Large/Desktop)
```

### Kompression
- Format: WebP (primary) + JPG (fallback)
- Quality: 85-90%
- Ziel: < 500KB pro Bild

---

## Integration in CSS

### Dark Mode (Default)
```css
.hero__bg {
  background-image: url('assets/images/hero/plu-hero-main-dark-2752.webp');
}
```

### Light Mode
```css
html.light-theme .hero__bg {
  background-image: url('assets/images/hero/plu-hero-main-light-2752.webp');
}
```

---

## Psychologische Wirkung

### Dark Mode Hero
- **Priming:** "Du betrittst eine neue Dimension"
- **Fokus:** Hoher Kontrast lenkt zum Text
- **Emotion:** Neugier, Mysterium, Premium
- **Zielgruppe:** Tech-affine Nutzer, Abend-Nutzung

### Light Mode Hero
- **Priming:** "Eine klare, offene Zukunft erwartet dich"
- **Fokus:** Weiche Farben beruhigen, Text bleibt lesbar
- **Emotion:** Optimismus, Klarheit, Zugänglichkeit
- **Zielgruppe:** Breite Masse, Tages-Nutzung

---

## Alternative: Ein universelles Hero (Fallback)

Falls nur ein Bild gewünscht:

```
A balanced cosmic scene with medium brightness - neither too dark nor too light. A glowing crystalline sphere at center with blue energy connections, set against a deep navy blue gradient (#0f172a to #1e293b) background. Enough brightness to work with light UI elements but deep enough for dark mode. Blue and cyan accents (#58a6ff, #39d0d8) that pop in both modes. Compromise design.
```

**Empfehlung:** Nicht ideal, aber funktioniert als MVP.

---

## Generierungs-Tipp

1. **Dark Mode zuerst** generieren (Referenz)
2. Bei Leonardo: "Generate Variations" mit leicht angepasstem Prompt für Light Mode
3. Oder: Gleichen Seed verwenden, Prompt anpassen
4. Beide Bilder auf identische Komposition prüfen
5. Im Browser nebeneinander testen

---

*Erstellt für PLU v3.0 - Premium Design System*
*Konsistente Hero-Erfahrung in Dark & Light Mode*
