/**
 * Color Wheel Playground — Interactive Color Harmony Explorer
 * Shows how different color harmonies work on a 12-segment color wheel
 */

const HARMONY_DATA = {
  complementary: {
    title: 'Komplementär',
    text: 'Farben, die sich im Farbkreis gegenüberliegen (z.B. Blau ↔ Orange). Komplementäre Farben erzeugen den höchsten Kontrast und wirken sehr dynamisch und energiegeladen. Sie ziehen den Blick magisch an.',
    example: ['#3B82F6', '#F97316'],
    exampleNames: ['Blau', 'Orange'],
    segments: [0, 6] // Red (0) and Cyan (6) — adjusted for our wheel
  },
  analogous: {
    title: 'Analog',
    text: 'Benachbarte Farben im Farbkreis (z.B. Blau → Türkis → Grün). Analoge Farbkombinationen wirken harmonisch, beruhigend und natürlich. Sie finden sich oft in der Natur wieder — wie ein Sonnenuntergang.',
    example: ['#3B82F6', '#06B6D4', '#22C55E'],
    exampleNames: ['Blau', 'Türkis', 'Grün'],
    segments: [0, 1, 11] // Red, Orange-Red, Red-Violet
  },
  triadic: {
    title: 'Triade',
    text: 'Drei gleichmäßig verteilte Farben (z.B. Blau → Gelb → Rot). Triadische Farbharmonien sind lebhaft, ausgewogen und verspielt. Sie bieten maximalen Farbkontrast bei gleichzeitiger Harmonie.',
    example: ['#3B82F6', '#EAB308', '#EF4444'],
    exampleNames: ['Blau', 'Gelb', 'Rot'],
    segments: [0, 4, 8] // Every 4th segment
  },
  monochromatic: {
    title: 'Monochrom',
    text: 'Eine Farbe in verschiedenen Helligkeiten und Sättigungen (z.B. Dunkelblau → Blau → Hellblau). Monochrome Bilder wirken sehr ruhig, stimmungsvoll und elegant. Der Fokus liegt auf Form und Licht statt auf Farbkontrast.',
    example: ['#1E3A5F', '#3B82F6', '#93C5FD'],
    exampleNames: ['Dunkelblau', 'Blau', 'Hellblau'],
    segments: [0] // Just red, but we'll highlight adjacent brightness variations visually
  }
};

// Color wheel segments (12 colors)
const WHEEL_COLORS = [
  '#EF4444', // Red (0)
  '#F97316', // Orange (1)
  '#EAB308', // Yellow (2)
  '#22C55E', // Green (3)
  '#06B6D4', // Cyan (4)
  '#3B82F6', // Blue (5)
  '#6366F1', // Indigo (6)
  '#A855F7', // Purple (7)
  '#EC4899', // Pink (8)
  '#F43F5E', // Rose (9)
  '#FB7185', // Coral (10)
  '#F59E0B'  // Amber (11)
];

const WHEEL_NAMES = [
  'Rot', 'Orange', 'Gelb', 'Grün', 'Türkis', 'Blau',
  'Indigo', 'Lila', 'Pink', 'Rose', 'Koralle', 'Bernstein'
];

export function initColorWheelPlayground() {
  const playground = document.querySelector('[data-color-playground]');
  if (!playground) return;

  const wheel = playground.querySelector('.photo-color-playground__wheel');
  const centerLabel = playground.querySelector('.photo-color-playground__center-label');
  const centerName = playground.querySelector('.photo-color-playground__center-name');
  const info = playground.querySelector('.photo-color-playground__info');
  const infoTitle = info.querySelector('.photo-color-playground__info-title');
  const infoText = info.querySelector('.photo-color-playground__info-text');
  const infoSwatches = info.querySelector('.photo-color-playground__info-example-swatches');
  const buttons = playground.querySelectorAll('.photo-color-playground__btn');
  const segments = wheel.querySelectorAll('.photo-color-playground__wheel-segment');

  function setHarmony(harmonyKey) {
    const data = HARMONY_DATA[harmonyKey];

    // Update wheel highlighting
    wheel.classList.add('is-harmony-active');
    segments.forEach((seg, i) => {
      seg.classList.toggle('is-active', data.segments.includes(i));
    });

    // Update center info
    centerLabel.textContent = 'Aktive Farbe';
    centerName.textContent = data.exampleNames[0];
    centerName.style.color = data.example[0];

    // Update info panel
    infoTitle.textContent = data.title;
    infoText.textContent = data.text;

    // Update example swatches
    infoSwatches.innerHTML = '';
    data.example.forEach((color, i) => {
      const swatch = document.createElement('span');
      swatch.className = 'photo-color-playground__info-example-swatch';
      swatch.style.backgroundColor = color;
      swatch.title = data.exampleNames[i];
      infoSwatches.appendChild(swatch);
    });

    // Update buttons
    buttons.forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.harmony === harmonyKey);
    });
  }

  // Bind button clicks
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      setHarmony(btn.dataset.harmony);
    });
  });

  // Bind segment clicks for exploration
  segments.forEach((seg, i) => {
    seg.addEventListener('click', () => {
      wheel.classList.remove('is-harmony-active');
      segments.forEach(s => s.classList.remove('is-active'));
      seg.classList.add('is-active');

      centerLabel.textContent = 'Gewählte Farbe';
      centerName.textContent = WHEEL_NAMES[i];
      centerName.style.color = WHEEL_COLORS[i];

      infoTitle.textContent = WHEEL_NAMES[i];
      infoText.textContent = `Die Farbe ${WHEEL_NAMES[i]} ist ein Grundton im Farbkreis. Klicke auf eine Harmonie-Regel oben, um zu sehen, welche Farben am besten zu ${WHEEL_NAMES[i]} passen.`;

      infoSwatches.innerHTML = '';
      const swatch = document.createElement('span');
      swatch.className = 'photo-color-playground__info-example-swatch';
      swatch.style.backgroundColor = WHEEL_COLORS[i];
      infoSwatches.appendChild(swatch);

      buttons.forEach(btn => btn.classList.remove('is-active'));
    });
  });

  // Set initial harmony
  setHarmony('complementary');
}
