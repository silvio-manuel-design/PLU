/**
 * Pansonic Video Lab — Advanced Glossary
 * Accordion, real-time search, alphabet nav, module links
 * Data loaded dynamically from JSON (since 2026-04-26)
 */

const GLOSSARY_DATA_URL = '/tutorials/pansonic-video-lab/assets/data/glossary-de.json';
const GLOSSARY_DATA_URL_EN = '/tutorials/pansonic-video-lab/assets/data/glossary-en.json';

/**
 * Load glossary JSON and render into #glossary-content and #glossary-featured
 */
export async function loadGlossary() {
  const container = document.getElementById('glossary-content');
  const featuredContainer = document.getElementById('glossary-featured');
  if (!container) return;

  const isEn = document.documentElement.lang === 'en';
  const url = isEn ? GLOSSARY_DATA_URL_EN : GLOSSARY_DATA_URL;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to load glossary');
    const data = await response.json();

    // Render featured terms (terms with blocks) in top section
    if (featuredContainer) {
      renderFeaturedTerms(data, featuredContainer, isEn);
    }

    renderGlossary(data, container);
    initGlossarySearch();
    initGlossaryAccordion();
    initGlossaryAlphabetNav();
  } catch (err) {
    console.error('Glossary load error:', err);
    const errorMsg = isEn ? 'Could not load glossary. Please try again later.' : 'Glossar konnte nicht geladen werden.';
    if (container) container.innerHTML = '<p class="video-glossary-error">' + errorMsg + '</p>';
    if (featuredContainer) featuredContainer.innerHTML = '<p class="video-glossary-error">' + errorMsg + '</p>';
  }
}

/**
 * Render glossary data into container
 */
function renderGlossary(data, container) {
  const html = data.sections.map(section => {
    const termsHtml = section.terms.map(term => renderTermCard(term)).join('');
    return `
      <section class="video-glossary-section" id="${escapeHtml(section.letter)}">
        <h2 class="video-glossary-section__letter">${escapeHtml(section.letter)}</h2>
        <div class="video-glossary-grid video-glossary-grid--single" data-reveal>
          ${termsHtml}
        </div>
      </section>
    `;
  }).join('');

  container.innerHTML = html;
}

/**
 * Render featured terms (terms with blocks) in top section
 */
function renderFeaturedTerms(data, container, isEn) {
  // Collect all terms that have blocks (the "featured" ones)
  const featuredTerms = [];
  data.sections.forEach(section => {
    section.terms.forEach(term => {
      if (term.blocks && term.blocks.length > 0) {
        featuredTerms.push(term);
      }
    });
  });

  if (featuredTerms.length === 0) {
    container.style.display = 'none';
    return;
  }

  const termsHtml = featuredTerms.map(term => renderTermCard(term, true)).join('');

  container.innerHTML = `
    <div class="video-featured-terms__header" data-reveal>
      <span class="video-featured-terms__eyebrow"><i class="ph ph-sparkle"></i> ${isEn ? 'Top Picks' : 'Top Begriffe'}</span>
      <h2 class="video-featured-terms__title">${isEn ? 'Essential Video Terms' : 'Wichtigste Video-Begriffe'}</h2>
      <p class="video-featured-terms__subtitle">${isEn ? 'The 12 most important concepts every videographer should know.' : 'Die 12 wichtigsten Konzepte, die jeder Videograf kennen sollte.'}</p>
    </div>
    <div class="video-glossary-grid video-glossary-grid--single" data-reveal>
      ${termsHtml}
    </div>
  `;
}

function renderTermCard(term, isFeatured = false) {
  const blocksHtml = (term.blocks || []).map(block => `
    <div class="video-term-block video-term-block--${escapeHtml(block.type)}">
      <h4><i class="ph ph-${escapeHtml(block.icon)}"></i> ${escapeHtml(block.heading)}</h4>
      ${block.content}
    </div>
  `).join('');

  const moduleLinkHtml = term.moduleLink ? `
    <a href="${escapeHtml(term.moduleLink.href)}" class="video-term-module-link">
      <i class="ph ph-book-open"></i> ${escapeHtml(term.moduleLink.label)}
    </a>
  ` : '';

  const featuredClass = isFeatured ? ' video-term-card--featured' : '';

  return `
    <article class="video-term-card${featuredClass}" data-term="${escapeHtml(term.id)}">
      <button class="video-term-header" aria-expanded="false">
        <div class="video-term-title-group">
          <div class="video-term-icon video-term-icon--${escapeHtml(term.category)}" aria-hidden="true">
            <i class="ph ph-${escapeHtml(term.icon)}"></i>
          </div>
          <div class="video-term-title-wrap">
            <h3>${escapeHtml(term.title)}</h3>
            <span class="video-term-category video-term-category--${escapeHtml(term.category)}">${escapeHtml(term.categoryLabel)}</span>
            <span class="video-term-subtitle">${escapeHtml(term.subtitle)}</span>
          </div>
        </div>
        <div class="video-term-toggle" aria-hidden="true"><i class="ph ph-caret-down"></i></div>
      </button>
      <div class="video-term-content">
        <div class="video-term-definition">${term.definition}</div>
        ${blocksHtml ? `<div class="video-term-blocks">${blocksHtml}</div>` : ''}
        ${moduleLinkHtml}
      </div>
    </article>
  `;
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function initGlossarySearch() {
  const input = document.getElementById('glossarySearch');
  const clearBtn = document.getElementById('glossarySearchClear');
  const meta = document.getElementById('glossarySearchMeta');
  if (!input) return;

  // Support both legacy .video-glossary-card and new .video-term-card
  const cards = document.querySelectorAll('.video-glossary-card, .video-term-card');
  const sections = document.querySelectorAll('.video-glossary-section');
  const letters = document.querySelectorAll('.video-glossary-nav__letter');
  const featured = document.getElementById('glossary-featured');
  const alphabetNav = document.querySelector('.video-glossary-nav');

  function updateSearch(query) {
    const q = query.trim().toLowerCase();
    let visibleCount = 0;

    if (q === '') {
      cards.forEach(c => {
        c.classList.remove('is-hidden', 'hidden');
        c.style.display = '';
      });
      sections.forEach(s => {
        s.classList.remove('is-hidden');
        s.style.display = '';
      });
      letters.forEach(l => l.classList.remove('is-disabled', 'is-empty'));
      if (featured) featured.style.display = '';
      if (alphabetNav) alphabetNav.style.display = '';
      if (meta) meta.textContent = '';
      if (clearBtn) clearBtn.classList.remove('is-visible');
      return;
    }

    // Hide featured terms and alphabet nav during search so results appear immediately
    if (featured) featured.style.display = 'none';
    if (alphabetNav) alphabetNav.style.display = 'none';

    if (clearBtn) clearBtn.classList.add('is-visible');

    cards.forEach(card => {
      const termEl = card.querySelector('.video-glossary-card__term, .video-term-title-wrap h3');
      const defEl = card.querySelector('.video-glossary-card__def, .video-term-definition');
      const catEl = card.querySelector('.video-glossary-card__category, .video-term-category');
      const term = termEl?.textContent.toLowerCase() || '';
      const def = defEl?.textContent.toLowerCase() || '';
      const cat = catEl?.textContent.toLowerCase() || '';
      const match = term.includes(q) || def.includes(q) || cat.includes(q);

      if (card.classList.contains('video-term-card')) {
        card.classList.toggle('hidden', !match);
      } else {
        card.classList.toggle('is-hidden', !match);
      }
      if (match) visibleCount++;
    });

    sections.forEach(section => {
      const visibleLegacy = section.querySelectorAll('.video-glossary-card:not(.is-hidden)');
      const visibleNew = section.querySelectorAll('.video-term-card:not(.hidden)');
      const hasVisible = visibleLegacy.length > 0 || visibleNew.length > 0;
      section.classList.toggle('is-hidden', !hasVisible);
    });

    // Disable letter nav for sections with no results
    const visibleSectionIds = new Set();
    sections.forEach(s => { if (!s.classList.contains('is-hidden')) visibleSectionIds.add(s.id); });
    letters.forEach(l => {
      const href = l.getAttribute('href');
      const id = href ? href.replace('#', '') : '';
      l.classList.toggle('is-disabled', !visibleSectionIds.has(id));
    });

    if (meta) {
      const isEn = document.documentElement.lang === 'en';
      if (visibleCount === 0) {
        meta.textContent = isEn ? 'No terms found' : 'Keine Begriffe gefunden';
      } else {
        const label = isEn
          ? (visibleCount === 1 ? 'term found' : 'terms found')
          : (visibleCount === 1 ? 'Begriff gefunden' : 'Begriffe gefunden');
        meta.textContent = `${visibleCount} ${label}`;
      }
    }
  }

  let debounceTimer;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => updateSearch(input.value), 150);
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      clearTimeout(debounceTimer);
      input.value = '';
      input.focus();
      updateSearch('');
    });
  }
}

/**
 * Accordion functionality for term cards
 */
export function initGlossaryAccordion() {
  document.querySelectorAll('.video-term-header').forEach(header => {
    const card = header.closest('.video-term-card');
    if (!card) return;

    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';

      // Optional: close other cards in the same section (accordion behavior)
      // Uncomment the next 3 lines for strict accordion mode:
      // const section = card.closest('.video-glossary-section, .video-featured-terms');
      // section?.querySelectorAll('.video-term-card.is-expanded').forEach(openCard => {
      //   if (openCard !== card) closeCard(openCard);
      // });

      if (isExpanded) {
        closeCard(card);
      } else {
        openCard(card);
      }
    });

    // Keyboard support
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });
}

function openCard(card) {
  const header = card.querySelector('.video-term-header');
  if (header) header.setAttribute('aria-expanded', 'true');
  card.classList.add('is-expanded');
}

function closeCard(card) {
  const header = card.querySelector('.video-term-header');
  if (header) header.setAttribute('aria-expanded', 'false');
  card.classList.remove('is-expanded');
}

/**
 * Alphabet nav active state on scroll
 */
export function initGlossaryAlphabetNav() {
  const sections = document.querySelectorAll('.video-glossary-section');
  const letters = document.querySelectorAll('.video-glossary-nav__letter');
  if (!sections.length || !letters.length) return;

  function updateActive() {
    let current = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 200) current = section.id;
    });
    letters.forEach(letter => {
      const href = letter.getAttribute('href');
      letter.classList.toggle('is-active', href === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
}
