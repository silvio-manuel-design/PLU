/**
 * Pansonic Photo Lab — Skill Self-Assessment (M11 Capstone)
 * Interactive 5-star rating with score calculation and recommendations.
 */

const RECOMMENDATIONS = {
  de: {
    technique: 'Technik: &Uuml;be die Grundlagen erneut in Modul 01&ndash;03. Achte besonders auf scharfe Bilder und korrekte Belichtung.',
    composition: 'Komposition: Wiederhole Modul 04. Experimentiere mit der Drittel-Regel und F&uuml;hrungslinien in Alltagssituationen.',
    light: 'Licht &amp; Farbe: Schau dir Modul 05 und 06 noch einmal an. Beobachte das Licht zu verschiedenen Tageszeiten.',
    creativity: 'Kreativit&auml;t: Lass dich von den Projekten in Modul 07&ndash;10 inspirieren. Probiere einen v&ouml;llig neuen Stil aus.',
    editing: 'Bearbeitung: &Uuml;be den RAW-Workflow in Modul 10. Konsistenz ist der Schl&uuml;ssel zu einem professionellen Look.',
    excellent: 'Exzellent! Du hast in allen Bereichen ein solides Niveau erreicht. Zeit f&uuml;r dein Capstone-Projekt!',
  },
  en: {
    technique: 'Technique: Review Modules 01&ndash;03. Focus on sharp images and correct exposure.',
    composition: 'Composition: Revisit Module 04. Practice the rule of thirds and leading lines in everyday situations.',
    light: 'Light &amp; Color: Review Modules 05 and 06. Observe light at different times of day.',
    creativity: 'Creativity: Get inspired by projects in Modules 07&ndash;10. Try a completely new style.',
    editing: 'Editing: Practice the RAW workflow from Module 10. Consistency is the key to a professional look.',
    excellent: 'Excellent! You have reached a solid level in all areas. Time for your capstone project!',
  },
};

const SKILL_KEYS = ['technique', 'composition', 'light', 'creativity', 'editing'];

export function initSkillAssessment() {
  const container = document.querySelector('[data-skill-assessment]');
  if (!container) return;

  const isEn = document.documentElement.lang === 'en';
  const lang = isEn ? 'en' : 'de';
  const recs = RECOMMENDATIONS[lang];

  const rows = container.querySelectorAll('[data-skill]');
  const scorePanel = container.querySelector('.photo-assessment-score');
  const scoreValue = container.querySelector('.photo-assessment-score__value');
  const scoreLabel = container.querySelector('.photo-assessment-score__label');
  const recTitle = container.querySelector('.photo-assessment-score__recommendation-title');
  const recText = container.querySelector('.photo-assessment-score__recommendation-text');

  const scores = {};

  function updateStars(row, value) {
    const stars = row.querySelectorAll('.photo-star-rating__btn');
    stars.forEach((star, idx) => {
      star.classList.toggle('is-filled', idx < value);
      star.setAttribute('aria-pressed', idx < value ? 'true' : 'false');
    });
  }

  function updateSkillBar(row, value) {
    const bar = row.querySelector('[data-skill-bar]');
    if (bar) {
      bar.style.width = `${(value / 5) * 100}%`;
    }
  }

  function updateScoreMeter(percentage) {
    const meter = container.querySelector('[data-score-meter]');
    if (meter) {
      // Small delay for visual punch
      requestAnimationFrame(() => {
        meter.style.width = `${percentage}%`;
      });
    }
  }

  function calculateAndShow() {
    const values = SKILL_KEYS.map(k => scores[k] || 0);
    const total = values.reduce((a, b) => a + b, 0);
    const max = SKILL_KEYS.length * 5;
    const percentage = Math.round((total / max) * 100);

    if (scoreValue) scoreValue.textContent = `${percentage}%`;
    if (scoreLabel) {
      scoreLabel.textContent = isEn
        ? `${total} of ${max} points — ${values.filter(v => v > 0).length} of ${SKILL_KEYS.length} skills rated`
        : `${total} von ${max} Punkten — ${values.filter(v => v > 0).length} von ${SKILL_KEYS.length} Bereichen bewertet`;
    }

    updateScoreMeter(percentage);

    // Find weakest skill
    let minScore = 6;
    let weakest = null;
    SKILL_KEYS.forEach(k => {
      const s = scores[k] || 0;
      if (s < minScore) {
        minScore = s;
        weakest = k;
      }
    });

    if (recTitle && recText) {
      if (minScore >= 4) {
        recTitle.textContent = isEn ? 'Assessment' : 'Einschätzung';
        recText.innerHTML = recs.excellent;
      } else if (weakest) {
        recTitle.textContent = isEn ? 'Recommendation' : 'Empfehlung';
        recText.innerHTML = recs[weakest];
      }
    }

    if (scorePanel) scorePanel.classList.add('is-visible');
  }

  rows.forEach(row => {
    const skillKey = row.dataset.skill;
    if (!skillKey) return;

    const stars = row.querySelectorAll('.photo-star-rating__btn');

    stars.forEach((star, idx) => {
      const value = idx + 1;

      star.addEventListener('click', () => {
        scores[skillKey] = value;
        updateStars(row, value);
        updateSkillBar(row, value);
        calculateAndShow();
      });

      star.addEventListener('mouseenter', () => {
        updateStars(row, value);
      });
    });

    row.querySelector('.photo-star-rating').addEventListener('mouseleave', () => {
      updateStars(row, scores[skillKey] || 0);
    });
  });
}
