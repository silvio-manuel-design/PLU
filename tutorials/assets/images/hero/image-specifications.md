# Bild-Spezifikationen - PLU Hero & Parallax

## ✅ SICHERE LÖSUNG: 3 Größen × 2 Formate

Für 100% kompatibilität und optimale Performance.

---

## Hero Bilder (6 Dateien pro Theme)

### Dark Mode
```
plu-hero-main-dark-1376.webp  (1376×768)
plu-hero-main-dark-1376.jpg   (1376×768)
plu-hero-main-dark-2752.webp  (2752×1536)
plu-hero-main-dark-2752.jpg   (2752×1536)
plu-hero-main-dark-5504.webp  (5504×3072)
plu-hero-main-dark-5504.jpg   (5504×3072)
```

### Light Mode
```
plu-hero-main-light-1376.webp  (1376×768)
plu-hero-main-light-1376.jpg   (1376×768)
plu-hero-main-light-2752.webp  (2752×1536)
plu-hero-main-light-2752.jpg   (2752×1536)
plu-hero-main-light-5504.webp  (5504×3072)
plu-hero-main-light-5504.jpg   (5504×3072)
```

---

## Parallax Bilder (6 Dateien pro Bild)

### Parallax 1: Spiegel
```
plu-parallax-01-mirror-dark-1376.webp
plu-parallax-01-mirror-dark-1376.jpg
plu-parallax-01-mirror-dark-2752.webp
plu-parallax-01-mirror-dark-2752.jpg
plu-parallax-01-mirror-dark-5504.webp
plu-parallax-01-mirror-dark-5504.jpg

plu-parallax-01-mirror-light-1376.webp
plu-parallax-01-mirror-light-1376.jpg
plu-parallax-01-mirror-light-2752.webp
plu-parallax-01-mirror-light-2752.jpg
plu-parallax-01-mirror-light-5504.webp
plu-parallax-01-mirror-light-5504.jpg
```

### Parallax 2: Gipfel
```
plu-parallax-02-summit-dark-1376.webp
plu-parallax-02-summit-dark-2752.webp
plu-parallax-02-summit-dark-5504.webp
... (jeweils auch .jpg)

plu-parallax-02-summit-light-1376.webp
plu-parallax-02-summit-light-2752.webp
plu-parallax-02-summit-light-5504.webp
... (jeweils auch .jpg)
```

### Parallax 3: Zukunft
```
plu-parallax-03-future-dark-1376.webp
plu-parallax-03-future-dark-2752.webp
plu-parallax-03-future-dark-5504.webp
... (jeweils auch .jpg)

plu-parallax-03-future-light-1376.webp
plu-parallax-03-future-light-2752.webp
plu-parallax-03-future-light-5504.webp
... (jeweils auch .jpg)
```

---

## Technische Spezifikationen

### Größen-Breakpoints

| Suffix | Breite | Höhe | Verwendung | Dateigröße Ziel |
|--------|--------|------|------------|-----------------|
| `-1376` | 1376px | 768px | Mobile/Tablet | < 200 KB |
| `-2752` | 2752px | 1536px | Desktop (Standard) | < 500 KB |
| `-5504` | 5504px | 3072px | Retina/4K Displays | < 1 MB |

### Formate

| Format | Nutzung | Kompression |
|--------|---------|-------------|
| **WebP** | Primär für moderne Browser | Quality 85% |
| **JPG** | Fallback für alte Browser | Quality 90% |

---

## Erstellungs-Workflow (Empfohlen)

### Schritt 1: Leonardo AI Generierung
- Format: 2752×1536 (16:9)
- Quality: Maximal/HD
- Format: PNG oder JPG (uncompressed)

### Schritt 2: Skalierung
**Tools:**
- Photoshop: "Export As" mit verschiedenen Größen
- Online: squoosh.app (von Google)
- Batch: ImageMagick Script

**Reihenfolge:**
1. Original 2752×1536 speichern
2. Hochskalieren auf 5504×3072 (für Retina)
3. Herunterskalieren auf 1376×768 (für Mobile)

### Schritt 3: Kompression
**WebP:**
- Quality: 85
- Effort: 6 (maximal)

**JPG:**
- Quality: 90
- Progressive: Ja
- Chroma Subsampling: 4:2:0

---

## HTML Integration (Beispiel)

```html
<picture>
  <!-- WebP Sources -->
  <source 
    media="(min-width: 2000px)"
    srcset="assets/images/hero/plu-hero-main-dark-5504.webp 5504w,
            assets/images/hero/plu-hero-main-dark-2752.webp 2752w"
    sizes="100vw"
    type="image/webp">
  
  <source 
    media="(min-width: 768px)"
    srcset="assets/images/hero/plu-hero-main-dark-2752.webp 2752w,
            assets/images/hero/plu-hero-main-dark-1376.webp 1376w"
    sizes="100vw"
    type="image/webp">
  
  <source 
    srcset="assets/images/hero/plu-hero-main-dark-1376.webp 1376w"
    sizes="100vw"
    type="image/webp">
  
  <!-- JPG Fallback -->
  <img 
    src="assets/images/hero/plu-hero-main-dark-2752.jpg"
    srcset="assets/images/hero/plu-hero-main-dark-5504.jpg 5504w,
            assets/images/hero/plu-hero-main-dark-2752.jpg 2752w,
            assets/images/hero/plu-hero-main-dark-1376.jpg 1376w"
    sizes="100vw"
    alt="KI Learning Universe"
    loading="eager">
</picture>
```

---

## Dateigrößen-Ziele

### Hero Bilder
| Größe | WebP Ziel | JPG Ziel |
|-------|-----------|----------|
| 1376px | ~150 KB | ~200 KB |
| 2752px | ~350 KB | ~500 KB |
| 5504px | ~800 KB | ~1.2 MB |

### Parallax Bilder
| Größe | WebP Ziel | JPG Ziel |
|-------|-----------|----------|
| 1376px | ~120 KB | ~180 KB |
| 2752px | ~300 KB | ~450 KB |
| 5504px | ~700 KB | ~1.0 MB |

---

## Qualitätskontrolle

### Nach Erstellung prüfen:
- [ ] Alle 6 Dateien vorhanden?
- [ ] Abmessungen korrekt?
- [ ] Dateigrößen im Zielbereich?
- [ ] Keine sichtbaren Kompressionsartefakte?
- [ ] Farben konsistent zwischen WebP und JPG?
- [ ] Dark und Light Version harmonieren?

### Browser-Test:
- [ ] Chrome (WebP)
- [ ] Safari (JPG Fallback)
- [ ] Firefox (WebP)
- [ ] Mobile Chrome
- [ ] Mobile Safari

---

## Kosten-Nutzen Analyse

### Was kostet das?
- **Speicher:** ~30 MB mehr als Einzelbilder
- **Upload-Zeit:** Etwas länger
- **Entwicklungszeit:** Keine, da ich den Code anpassen werde

### Was bringt es?
- **Performance:** 50-70% schnellere Ladezeiten auf Mobile
- **Qualität:** Scharfe Bilder auf Retina-Displays
- **Kompatibilität:** 100% Browser-Unterstützung
- **SEO:** Bessere Core Web Vitals

### Fazit: **Die Investition lohnt sich!**

---

*Spezifikation für PLU v3.0 - Premium Performance*
