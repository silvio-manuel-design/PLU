/**
 * Portrait Light Playground — M07
 * Interactive portrait lighting simulator
 */

export function initPortraitLightPlayground() {
  const container = document.querySelector('[data-portrait-playground]');
  if (!container) return;

  const stage = container.querySelector('.photo-portrait-playground__stage');
  const infoTitle = container.querySelector('.photo-portrait-playground__info-title');
  const infoText = container.querySelector('.photo-portrait-playground__info-text');
  const infoSmartphone = container.querySelector('.photo-portrait-playground__info-smartphone span');
  const controls = container.querySelector('.photo-portrait-playground__controls');

  const data = {
    window: {
      title: '🪟 Weiches Fensterlicht',
      text: 'Das beste Licht für Portrait. Natürlich, flatternd und kostenlos. Das Licht fällt seitlich ein und erzeugt sanfte Schatten, die Konturen modellieren, ohne hart zu wirken. Ideal für Anfänger und professionelle Aufnahmen gleichermaßen.',
      smartphone: 'Smartphone: Stelle dich seitlich zum Fenster, mit dem Gesicht leicht zur Lichtquelle gedreht. Nutze den Portrait-Modus für weichen Hintergrund.'
    },
    butterfly: {
      title: '🦋 Schmetterlingslicht',
      text: 'Licht von oben, das einen charakteristischen Schatten unter der Nase erzeugt — wie ein kleiner Schmetterling. Sehr schmeichelhaft, da es Wangenknochen betont und die Haut weich wirken lässt. Klassisches Hollywood-Licht.',
      smartphone: 'Smartphone: Halte das Handy leicht über Augenhöhe und nutze Tageslicht von oben. Vermeide direktes Mittagslicht — es wird zu hart.'
    },
    rembrandt: {
      title: '🎨 Rembrandt-Licht',
      text: 'Licht von der Seite, das ein kleines Lichtdreieck unter dem Auge auf der schattierten Gesichtshälfte erzeugt. Dramatisch und klassisch — verleiht dem Portrait Tiefe und Charakter. Benannt nach dem Maler Rembrandt.',
      smartphone: 'Smartphone: Nutze eine Taschenlampe seitlich in einem dunklen Raum. Positioniere sie etwa 45° zum Gesicht für den typischen Dreieck-Effekt.'
    },
    ring: {
      title: '💍 Ringlicht',
      text: 'Rundes Licht, das charakteristische Ringreflexe in den Augen erzeugt. Beliebt in der Beauty-Fotografie, da es Schatten minimiert und die Haut gleichmäßig ausleuchtet. Perfekt für Selfies und Nahaufnahmen.',
      smartphone: 'Smartphone: Günstige Smartphone-Ringlichter (Clip-on) gibt es ab ca. 10€. Sie liefern professionelles Licht für Selfies und Video-Calls.'
    }
  };

  controls.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-lighting]');
    if (!btn) return;

    const key = btn.dataset.lighting;
    const d = data[key];
    if (!d) return;

    // Update stage state
    stage.className = 'photo-portrait-playground__stage is-' + key;

    // Update info
    infoTitle.textContent = d.title;
    infoText.textContent = d.text;
    infoSmartphone.textContent = d.smartphone;

    // Update buttons
    controls.querySelectorAll('button').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
  });
}
