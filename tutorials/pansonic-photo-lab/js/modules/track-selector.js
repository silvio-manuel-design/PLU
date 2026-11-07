import { getStorage, setStorage, getStorageRaw, setStorageRaw, removeStorage } from './storage.js';
/**
 * Pansonic Photo Lab — Track Selector
 * Cinematic track cards (Indoor / Outdoor / Hybrid) with persistence
 */

const STORAGE_KEY = 'pansonic-photo-lab-track';

export function initTrackSelector() {
  const container = document.querySelector('.photo-track-selector');
  if (!container) return;

  const cards = container.querySelectorAll('.photo-track-card');

  function selectTrack(trackId) {
    // Update UI
    cards.forEach(card => {
      const isTarget = card.dataset.track === trackId;
      card.classList.toggle('is-active', isTarget);

      const btn = card.querySelector('.photo-track-card__btn');
      if (btn) {
        btn.innerHTML = isTarget
          ? '<span>Ausgewählt</span><i class="ph ph-check" aria-hidden="true"></i>'
          : '<span>Auswählen</span><i class="ph ph-arrow-right" aria-hidden="true"></i>';
      }
    });

    // Persist (skip for capstone project selector)
    const noPersist = container.dataset.trackPersist === 'false';
    if (!noPersist) {
      try {
        localStorage.setItem(STORAGE_KEY, trackId);
      } catch (e) { /* silent fail */ }
    }

    // Update feedback text if present
    const feedback = document.getElementById('trackFeedback');
    const feedbackInner = document.getElementById('trackFeedbackInner');
    if (feedback) {
      feedback.classList.add('is-visible');
      if (feedbackInner) {
        const isEn = document.documentElement.lang === 'en';
        const texts = isEn ? {
          indoor: '<div class="photo-track-feedback__title"><i class="ph ph-house-line" aria-hidden="true"></i> Indoor Track selected</div><div class="photo-track-feedback__desc">In upcoming modules you\'ll find specific tips for studio photography, product photography, and interior shots.</div>',
          outdoor: '<div class="photo-track-feedback__title"><i class="ph ph-tree-palm" aria-hidden="true"></i> Outdoor Track selected</div><div class="photo-track-feedback__desc">In upcoming modules you\'ll find specific tips for landscape photography, street photography, and nature shots.</div>',
          both: '<div class="photo-track-feedback__title"><i class="ph ph-star" aria-hidden="true"></i> Hybrid Track selected</div><div class="photo-track-feedback__desc">Pro mode — you\'ll master indoor and outdoor techniques in parallel.</div>',
          portrait: '<div class="photo-track-feedback__title"><i class="ph ph-users" aria-hidden="true"></i> Mission: Portrait Series</div><div class="photo-track-feedback__body"><p><strong>Goal:</strong> Tell the story of one person through 10&ndash;15 images. Show them in different situations, moods, and perspectives.</p><p><strong>Equipment:</strong> Smartphone Portrait mode or camera with 50&ndash;85mm lens. A reflector or soft window light is ideal.</p><p><strong>Settings:</strong> f/1.8&ndash;f/2.8 for soft background blur. ISO as low as possible. Focus on the eyes.</p><p><strong>Timeline:</strong> 2&ndash;3 shooting sessions over 1&ndash;2 weeks. This gives variety in light and mood.</p><p><strong>Deliverables:</strong> 10&ndash;15 edited images + short text about the person (3&ndash;5 sentences).</p></div>',
          landscape: '<div class="photo-track-feedback__title"><i class="ph ph-mountains" aria-hidden="true"></i> Mission: Landscape Series</div><div class="photo-track-feedback__body"><p><strong>Goal:</strong> Photograph one place at 4+ different times/weather conditions. Show how light transforms the scene.</p><p><strong>Equipment:</strong> Wide-angle lens (16&ndash;35mm) or smartphone ultrawide. Tripod for dawn/dusk.</p><p><strong>Settings:</strong> f/8&ndash;f/11 for maximum sharpness. Use a tripod for long exposures at blue hour.</p><p><strong>Timeline:</strong> Return to the same location 4&ndash;6 times across different times of day and weather.</p><p><strong>Deliverables:</strong> 10&ndash;15 edited images showing the same place in different light + location map.</p></div>',
          story: '<div class="photo-track-feedback__title"><i class="ph ph-book-open" aria-hidden="true"></i> Mission: Story Series</div><div class="photo-track-feedback__body"><p><strong>Goal:</strong> Create a visual narrative with a clear beginning, middle, and end. The topic is entirely yours.</p><p><strong>Equipment:</strong> Any camera or smartphone. The story matters more than the gear.</p><p><strong>Approach:</strong> Define your narrative arc first. What happens? What changes? What emotion do you want to evoke?</p><p><strong>Timeline:</strong> 2&ndash;4 weeks. A good story needs time to develop and multiple shooting opportunities.</p><p><strong>Deliverables:</strong> 10&ndash;15 edited images in narrative order + 1-page story description.</p></div>'
        } : {
          indoor: '<div class="photo-track-feedback__title"><i class="ph ph-house-line" aria-hidden="true"></i> Indoor-Track gew&auml;hlt</div><div class="photo-track-feedback__desc">In den kommenden Modulen findest du spezifische Tipps f&uuml;r Studiofotografie, Produktfotografie und Interior-Aufnahmen.</div>',
          outdoor: '<div class="photo-track-feedback__title"><i class="ph ph-tree-palm" aria-hidden="true"></i> Outdoor-Track gew&auml;hlt</div><div class="photo-track-feedback__desc">In den kommenden Modulen findest du spezifische Tipps f&uuml;r Landschaftsfotografie, Streetfotografie und Natur-Aufnahmen.</div>',
          both: '<div class="photo-track-feedback__title"><i class="ph ph-star" aria-hidden="true"></i> Hybrid-Track gew&auml;hlt</div><div class="photo-track-feedback__desc">Pro-Modus &mdash; Du beherrschst Indoor- und Outdoor-Techniken parallel.</div>',
          portrait: '<div class="photo-track-feedback__title"><i class="ph ph-users" aria-hidden="true"></i> Mission: Portrait-Serie</div><div class="photo-track-feedback__body"><p><strong>Ziel:</strong> Erz&auml;hle die Geschichte einer Person in 10&ndash;15 Bildern. Zeige sie in verschiedenen Situationen, Stimmungen und Perspektiven.</p><p><strong>Equipment:</strong> Smartphone Portrait-Modus oder Kamera mit 50&ndash;85mm Objektiv. Ein Reflektor oder weiches Fensterlicht ist ideal.</p><p><strong>Settings:</strong> f/1.8&ndash;f/2.8 f&uuml;r weichen Hintergrund. ISO so niedrig wie m&ouml;glich. Fokus auf die Augen.</p><p><strong>Zeitplan:</strong> 2&ndash;3 Shooting-Termine &uuml;ber 1&ndash;2 Wochen. Das gibt Variation in Licht und Stimmung.</p><p><strong>Deliverables:</strong> 10&ndash;15 bearbeitete Bilder + Kurztext &uuml;ber die Person (3&ndash;5 S&auml;tze).</p></div>',
          landscape: '<div class="photo-track-feedback__title"><i class="ph ph-mountains" aria-hidden="true"></i> Mission: Landschafts-Serie</div><div class="photo-track-feedback__body"><p><strong>Ziel:</strong> Fotografiere einen Ort bei 4+ verschiedenen Zeiten/Wetterlagen. Zeige, wie Licht die Szene verwandelt.</p><p><strong>Equipment:</strong> Weitwinkelobjektiv (16&ndash;35mm) oder Smartphone Ultraweitwinkel. Stativ f&uuml;r Morgen-/Abendd&auml;mmerung.</p><p><strong>Settings:</strong> f/8&ndash;f/11 f&uuml;r maximale Sch&auml;rfe. Stativ f&uuml;r Langzeitbelichtungen in der Blauen Stunde.</p><p><strong>Zeitplan:</strong> Kehre 4&ndash;6 Mal zum selben Ort zur&uuml;ck &mdash; zu verschiedenen Tageszeiten und Wetterlagen.</p><p><strong>Deliverables:</strong> 10&ndash;15 bearbeitete Bilder desselben Ortes in verschiedenem Licht + Orts&uuml;bersicht.</p></div>',
          story: '<div class="photo-track-feedback__title"><i class="ph ph-book-open" aria-hidden="true"></i> Mission: Story-Serie</div><div class="photo-track-feedback__body"><p><strong>Ziel:</strong> Schaffe eine visuelle Erz&auml;hlung mit klarem Anfang, Mitte und Ende. Das Thema bestimmst du allein.</p><p><strong>Equipment:</strong> Beliebige Kamera oder Smartphone. Die Geschichte z&auml;hlt mehr als das Equipment.</p><p><strong>Vorgehen:</strong> Definiere zuerst deinen Erz&auml;hlbogen. Was passiert? Was ver&auml;ndert sich? Welche Emotion willst du wecken?</p><p><strong>Zeitplan:</strong> 2&ndash;4 Wochen. Eine gute Geschichte braucht Zeit und mehrere Shooting-Gelegenheiten.</p><p><strong>Deliverables:</strong> 10&ndash;15 bearbeitete Bilder in Erz&auml;hlreihenfolge + 1-seitige Story-Beschreibung.</p></div>'
        };
        feedbackInner.innerHTML = texts[trackId] || '';
      }
    }

    // Dispatch custom event for other components
    document.body.setAttribute('data-active-track', trackId);
    window.dispatchEvent(new CustomEvent('trackChanged', { detail: { track: trackId } }));
  }

  // Load saved track — default to Hybrid (both) for new users
  let savedTrack = null;
  try {
    savedTrack = localStorage.getItem(STORAGE_KEY);
  } catch (e) { /* silent fail */ }

  if (savedTrack) {
    selectTrack(savedTrack);
  }
  // No default selection — user must actively choose

  // Bind clicks
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicking a link inside
      if (e.target.closest('a')) return;
      const trackId = card.dataset.track;
      if (trackId) selectTrack(trackId);
    });

    // Keyboard accessibility
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const trackId = card.dataset.track;
        if (trackId) selectTrack(trackId);
      }
    });
  });
}
