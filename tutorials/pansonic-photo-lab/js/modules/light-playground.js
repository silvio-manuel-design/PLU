/**
 * Light Playground — Interactive Light Direction Simulator
 * Controls an SVG subject that changes appearance based on selected light direction
 */

const LIGHT_DATA = {
  front: {
    title: 'Frontlicht',
    text: 'Licht fällt direkt von vorne auf das Motiv. Das Ergebnis ist hell und klar, aber oft flach und wenig dramatisch. Gut für Dokumentation, schwierig für kreative Bilder.',
    tip: '💡 Smartphone-Tipp: Frontlicht bei Selfies vermeidet harte Schatten — aber das Gesicht wirkt flacher. Nutze stattdessen seitliches Fensterlicht.'
  },
  side: {
    title: 'Seitenlicht',
    text: 'Licht fällt von der Seite ein und erzeugt Tiefe, Textur und Dreidimensionalität. Eine Seite ist hell, die andere liegt im Schatten. Das klassische Licht für Landschaft und Portrait.',
    tip: '💡 Smartphone-Tipp: Stelle dich 45° zu einem Fenster — das ist das beste Licht für Portrait-Fotos mit dem Handy.'
  },
  back: {
    title: 'Gegenlicht',
    text: 'Licht fällt von hinten auf das Motiv. Das Motiv wird zur Silhouette oder bekommt einen leuchtenden Rand (Rim Light). Dramatisch und emotional — perfekt für Sonnenuntergänge.',
    tip: '💡 Smartphone-Tipp: Tippe auf den Himmel, um die Silhouette zu betonen. Für Details im Motiv: HDR aktivieren oder Belichtungskorrektur +1 EV.'
  },
  bottom: {
    title: 'Auflicht',
    text: 'Licht fällt von unten. Ungewöhnlich und oft unheimlich — das Gesicht wirkt maskenhaft. In der Film- und Theaterwelt genutzt für Horror-Effekte. Aber auch kreativ einsetzbar!',
    tip: '💡 Smartphone-Tipp: Halte dein Handy mit Taschenlampe unter das Gesicht eines Freundes — gruseliger Effekt garantiert. Oder nutze Kerzenlicht von unten für romantische Stimmung.'
  }
};

export function initLightPlayground() {
  const playground = document.querySelector('[data-light-playground]');
  if (!playground) return;

  const stage = playground.querySelector('.photo-light-playground__stage');
  const info = playground.querySelector('.photo-light-playground__info');
  const infoTitle = info.querySelector('.photo-light-playground__info-title');
  const infoText = info.querySelector('.photo-light-playground__info-text');
  const infoTip = info.querySelector('.photo-light-playground__info-tip');
  const buttons = playground.querySelectorAll('.photo-light-playground__btn');

  function setDirection(direction) {
    // Update stage
    stage.setAttribute('data-direction', direction);

    // Update info panel
    const data = LIGHT_DATA[direction];
    info.setAttribute('data-direction', direction);
    infoTitle.textContent = data.title;
    infoText.textContent = data.text;
    infoTip.textContent = data.tip;

    // Update buttons
    buttons.forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.direction === direction);
    });
  }

  // Bind button clicks
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      setDirection(btn.dataset.direction);
    });
  });

  // Set initial direction
  setDirection('front');
}
