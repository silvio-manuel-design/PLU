/**
 * SYNTHESE — Vorbereitete Datenstruktur
 * Medien-Kompendium Themen
 *
 * TODO: Team erweitert und pflegt diese Datenstruktur.
 * Jeder Student kann ein Thema hinzufügen oder erweitern.
 */

export const topics = [
  {
    id: 'farbe-raeume',
    category: 'grundlagen',
    difficulty: 'easy',
    image: 'synthese-topic-farbe.jpg',
    altDe: 'Visualisierung von RGB und CMYK Farbräumen',
    altEn: 'Visualization of RGB and CMYK color spaces',
    de: {
      title: 'Farbräume: RGB vs. CMYK',
      summary: 'Verstehe den Unterschied zwischen additivem und subtraktivem Farbmodell.',
      content: `
        <h3>RGB — Additives Farbmodell</h3>
        <p>RGB steht für Rot, Grün, Blau. Es wird für digitale Displays verwendet. Je mehr Licht hinzugefügt wird, desto heller wird das Ergebnis. Weiß entsteht durch die vollständige Mischung aller drei Farben.</p>

        <h3>CMYK — Subtraktives Farbmodell</h3>
        <p>CMYK steht für Cyan, Magenta, Yellow, Key (Schwarz). Es wird für den Druck verwendet. Je mehr Farbe aufgetragen wird, desto dunkler wird das Ergebnis.</p>

        <h3>Praktischer Tipp</h3>
        <p>Designe immer im RGB-Modus für Digital und konvertiere erst am Ende für Druck. Beachte, dass nicht alle RGB-Farben im CMYK-Raum darstellbar sind.</p>
      `,
      didYouKnow: 'Das menschliche Auge kann etwa 10 Millionen verschiedene Farben unterscheiden.'
    },
    en: {
      title: 'Color Spaces: RGB vs. CMYK',
      summary: 'Understand the difference between additive and subtractive color models.',
      content: `
        <h3>RGB — Additive Color Model</h3>
        <p>RGB stands for Red, Green, Blue. It is used for digital displays. The more light is added, the brighter the result. White is created by mixing all three colors completely.</p>

        <h3>CMYK — Subtractive Color Model</h3>
        <p>CMYK stands for Cyan, Magenta, Yellow, Key (Black). It is used for printing. The more ink applied, the darker the result.</p>

        <h3>Practical Tip</h3>
        <p>Always design in RGB mode for digital and convert only at the end for print. Note that not all RGB colors are reproducible in the CMYK space.</p>
      `,
      didYouKnow: 'The human eye can distinguish approximately 10 million different colors.'
    },
    related: ['druckvorstufe', 'bildformate'],
    tags: ['farbe', 'druck', 'digital', 'grundlagen']
  },
  {
    id: 'codec-kompression',
    category: 'technik',
    difficulty: 'medium',
    image: 'synthese-topic-codec.jpg',
    altDe: 'Visualisierung von Codec-Kompression',
    altEn: 'Visualization of codec compression',
    de: {
      title: 'Codecs & Kompression',
      summary: 'Wie Bilder und Videos ihre Dateigröße reduzieren — mit und ohne Qualitätsverlust.',
      content: `
        <h3>Lossy vs. Lossless</h3>
        <p><strong>Lossy (verlustbehaftet):</strong> JPEG, MP3, H.264 — entfernt "unwichtige" Informationen. Kleinere Dateien, aber Qualitätsverlust.</p>
        <p><strong>Lossless (verlustfrei):</strong> PNG, FLAC, ZIP — behält alle Daten. Größere Dateien, aber pixelgenaue Reproduktion.</p>

        <h3>Modern: AVIF &amp; WebP</h3>
        <p>AVIF bietet bis zu 50% kleinere Dateien als JPEG bei gleicher Qualität. WebP ist der universelle Standard für moderne Websites.</p>
      `,
      didYouKnow: 'Ein unkomprimiertes 4K-Video (3840×2160, 24fps, 10 Minuten) würde etwa 110 GB benötigen.'
    },
    en: {
      title: 'Codecs & Compression',
      summary: 'How images and videos reduce their file size — with and without quality loss.',
      content: `
        <h3>Lossy vs. Lossless</h3>
        <p><strong>Lossy:</strong> JPEG, MP3, H.264 — removes "unimportant" information. Smaller files, but quality loss.</p>
        <p><strong>Lossless:</strong> PNG, FLAC, ZIP — retains all data. Larger files, but pixel-perfect reproduction.</p>

        <h3>Modern: AVIF &amp; WebP</h3>
        <p>AVIF offers up to 50% smaller files than JPEG at the same quality. WebP is the universal standard for modern websites.</p>
      `,
      didYouKnow: 'An uncompressed 4K video (3840×2160, 24fps, 10 minutes) would require approximately 110 GB.'
    },
    related: ['bildformate', 'video-produktion'],
    tags: ['codec', 'kompression', 'bild', 'video']
  },
  {
    id: 'druckvorstufe',
    category: 'design',
    difficulty: 'hard',
    image: 'synthese-topic-druck.jpg',
    altDe: 'Visualisierung der Druckvorstufe',
    altEn: 'Visualization of prepress workflow',
    de: {
      title: 'Druckvorstufe &amp; PDF/X',
      summary: 'Vom Bildschirm zum Druck: Auflösung, Farbmanagement und PDF-Standards.',
      content: `
        <h3>Auflösung &amp; DPI</h3>
        <p>Für Druck werden 300 DPI (dots per inch) empfohlen. Bildschirme arbeiten mit 72–144 PPI (pixels per inch). Ein Bild mit 1920×1080 Pixeln hat bei 300 DPI nur eine Druckgröße von etwa 16×9 cm.</p>

        <h3>PDF/X-Standards</h3>
        <p><strong>PDF/X-1a:</strong> Alle Schriften und Bilder eingebettet, CMYK-Only.</p>
        <p><strong>PDF/X-4:</strong> Unterstützt Transparenzen und ICC-Profile.</p>

        <h3>Beschnitt &amp; Anschnitt</h3>
        <p>Anschnitt (Bleed): 3mm über das Format hinaus. Beschnitt (Trim): Endgültige Formatgröße.</p>
      `,
      didYouKnow: 'Die meisten Druckfehler entstehen durch falsche Farbräume oder fehlende Schrift-Einbettung.'
    },
    en: {
      title: 'Prepress &amp; PDF/X',
      summary: 'From screen to print: Resolution, color management, and PDF standards.',
      content: `
        <h3>Resolution &amp; DPI</h3>
        <p>For print, 300 DPI (dots per inch) is recommended. Screens work with 72–144 PPI (pixels per inch). An image with 1920×1080 pixels at 300 DPI has a print size of only about 16×9 cm.</p>

        <h3>PDF/X Standards</h3>
        <p><strong>PDF/X-1a:</strong> All fonts and images embedded, CMYK only.</p>
        <p><strong>PDF/X-4:</strong> Supports transparencies and ICC profiles.</p>

        <h3>Bleed &amp; Trim</h3>
        <p>Bleed: 3mm beyond the format. Trim: Final format size.</p>
      `,
      didYouKnow: 'Most printing errors are caused by incorrect color spaces or missing font embedding.'
    },
    related: ['farbe-raeume', 'typografie'],
    tags: ['druck', 'pdf', 'vorstufe', 'design']
  },
  {
    id: 'typografie',
    category: 'design',
    difficulty: 'easy',
    image: 'synthese-topic-typo.jpg',
    altDe: 'Visualisierung von Typografie-Grundlagen',
    altEn: 'Visualization of typography basics',
    de: {
      title: 'Typografie-Grundlagen',
      summary: 'Schriftarten, Hierarchie und Lesbarkeit im digitalen Raum.',
      content: `
        <h3>Serif vs. Sans-Serif</h3>
        <p><strong>Serif</strong> (z.B. Times New Roman): Fühlt sich traditionell an, gut für lange Texte im Druck.</p>
        <p><strong>Sans-Serif</strong> (z.B. Inter, Roboto): Modern, sauber, ideal für Bildschirme.</p>

        <h3>Die goldene Regel</h3>
        <p>Maximal 2–3 Schriftarten pro Projekt. Eine für Überschriften, eine für Fließtext.</p>

        <h3>Web Fonts</h3>
        <p>Google Fonts und Adobe Fonts bieten tausende lizenzfreie Schriften. Achte auf Ladezeiten — zu viele Schriftarten verlangsamen die Seite.</p>
      `,
      didYouKnow: 'Die Schriftart "Comic Sans" wurde 1994 für Microsoft Bob entwickelt und ist heute eines der meistgehassten Fonts.'
    },
    en: {
      title: 'Typography Basics',
      summary: 'Fonts, hierarchy, and readability in the digital space.',
      content: `
        <h3>Serif vs. Sans-Serif</h3>
        <p><strong>Serif</strong> (e.g., Times New Roman): Feels traditional, good for long texts in print.</p>
        <p><strong>Sans-Serif</strong> (e.g., Inter, Roboto): Modern, clean, ideal for screens.</p>

        <h3>The Golden Rule</h3>
        <p>Maximum 2–3 fonts per project. One for headings, one for body text.</p>

        <h3>Web Fonts</h3>
        <p>Google Fonts and Adobe Fonts offer thousands of free fonts. Watch loading times — too many fonts slow down the page.</p>
      `,
      didYouKnow: 'The font "Comic Sans" was developed in 1994 for Microsoft Bob and is now one of the most hated fonts.'
    },
    related: ['druckvorstufe', 'webdesign'],
    tags: ['typografie', 'schrift', 'design', 'lesbarkeit']
  },
  {
    id: 'responsive-design',
    category: 'technik',
    difficulty: 'medium',
    image: 'synthese-topic-responsive.jpg',
    altDe: 'Visualisierung von Responsive Design',
    altEn: 'Visualization of responsive design',
    de: {
      title: 'Responsive Webdesign',
      summary: 'Eine Website für alle Geräte — vom Smartphone bis zum 4K-Monitor.',
      content: `
        <h3>Mobile-First Ansatz</h3>
        <p>Beginne mit dem kleinsten Bildschirm und erweitere nach oben. Das spart Code und zwingt zur Priorisierung von Inhalten.</p>

        <h3>Breakpoints</h3>
        <p>Gängige Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl). Aber: Designe für Inhalte, nicht für Geräte.</p>

        <h3>Flexible Einheiten</h3>
        <p>Verwende rem/em für Text, %/vw/vh für Layout, und clamp() für fließende Typografie.</p>
      `,
      didYouKnow: 'Über 60% des globalen Web-Traffics kommt von mobilen Geräten.'
    },
    en: {
      title: 'Responsive Web Design',
      summary: 'One website for all devices — from smartphone to 4K monitor.',
      content: `
        <h3>Mobile-First Approach</h3>
        <p>Start with the smallest screen and expand upward. This saves code and forces content prioritization.</p>

        <h3>Breakpoints</h3>
        <p>Common breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl). But: Design for content, not devices.</p>

        <h3>Flexible Units</h3>
        <p>Use rem/em for text, %/vw/vh for layout, and clamp() for fluid typography.</p>
      `,
      didYouKnow: 'Over 60% of global web traffic comes from mobile devices.'
    },
    related: ['webdesign', 'css-grid'],
    tags: ['responsive', 'mobile', 'webdesign', 'css']
  }
];

/**
 * Hilfsfunktion: Thema nach ID finden
 */
export function getTopicById(id) {
  return topics.find(t => t.id === id);
}

/**
 * Hilfsfunktion: Themen nach Kategorie filtern
 */
export function getTopicsByCategory(category) {
  if (category === 'all') return topics;
  return topics.filter(t => t.category === category);
}

/**
 * Hilfsfunktion: Themen nach Schwierigkeit filtern
 */
export function getTopicsByDifficulty(difficulty) {
  if (difficulty === 'all') return topics;
  return topics.filter(t => t.difficulty === difficulty);
}

/**
 * Hilfsfunktion: Suche in Themen
 */
export function searchTopics(query) {
  const q = query.toLowerCase();
  return topics.filter(t => {
    const de = t.de;
    const en = t.en;
    return (
      de.title.toLowerCase().includes(q) ||
      de.summary.toLowerCase().includes(q) ||
      de.tags.some(tag => tag.toLowerCase().includes(q)) ||
      en.title.toLowerCase().includes(q) ||
      en.summary.toLowerCase().includes(q)
    );
  });
}
