/**
 * Reflection Module — Kamera-Notizblock / Exif-Style
 * LCD display aesthetic with numbered photo notes
 */

import { getStorageRaw, setStorageRaw } from './storage.js';

const STORAGE_PREFIX = 'photo-reflection-';

const REFLECTION_DATA = {
  de: {
    title: 'Aufnahme-Notizen',
    subtitle: 'Reflexion',
    badge: 'EXIF',
    questions: [
      'Was war für dich die wichtigste Erkenntnis in diesem Modul?',
      'Welches Konzept möchtest du als Nächstes ausprobieren?',
      'Was hat dir noch gefehlt oder war unklar?'
    ]
  },
  en: {
    title: 'Shot Notes',
    subtitle: 'Reflection',
    badge: 'EXIF',
    questions: [
      'What was the most important insight for you in this module?',
      'Which concept do you want to try next?',
      'What was missing or unclear?'
    ]
  }
};

export function initReflection() {
  const container = document.getElementById('moduleReflection');
  if (!container) return;

  const isEn = document.documentElement.lang === 'en';
  const lang = isEn ? 'en' : 'de';
  const moduleId = document.body.getAttribute('data-module') || 'unknown';
  const data = REFLECTION_DATA[lang];

  container.innerHTML = `
    <div class="photo-reflection">
      <div class="photo-reflection__header">
        <div class="photo-reflection__header-left">
          <div class="photo-reflection__header-icon"><i class="ph ph-notebook" aria-hidden="true"></i></div>
          <div>
            <h3 class="photo-reflection__header-title">${data.title}</h3>
            <p class="photo-reflection__header-subtitle">${data.subtitle}</p>
          </div>
        </div>
        <span class="photo-reflection__header-badge">${data.badge}</span>
      </div>
      <div class="photo-reflection__questions">
        ${data.questions.map((q, i) => `
          <div class="photo-reflection__question" data-num="${String(i + 1).padStart(3, '0')}">
            <label class="photo-reflection__label">${q}</label>
            <div class="photo-reflection__input-wrap">
              <textarea
                class="photo-reflection__input"
                data-question="${i}"
                rows="3"
                maxlength="500"
                placeholder="${isEn ? 'Your thoughts...' : 'Deine Gedanken...'}"
              ></textarea>
              <span class="photo-reflection__counter">0 / 500</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  const textareas = container.querySelectorAll('.photo-reflection__input');
  textareas.forEach((ta, index) => {
    const saved = getStorageRaw(`${STORAGE_PREFIX}${moduleId}-${index}`);
    if (saved) {
      ta.value = saved;
      updateCounter(ta);
    }

    let timeout;
    ta.addEventListener('input', () => {
      updateCounter(ta);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setStorageRaw(`${STORAGE_PREFIX}${moduleId}-${index}`, ta.value);
      }, 800);
    });
  });
}

function updateCounter(textarea) {
  const counter = textarea.parentElement.querySelector('.photo-reflection__counter');
  if (counter) {
    counter.textContent = `${textarea.value.length} / 500`;
  }
}
