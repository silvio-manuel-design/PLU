/**
 * Pansonic Photo Lab — Glossary Module
 * Accordion, real-time search, alphabet nav, module links
 * Data loaded dynamically from JSON
 */

const GLOSSARY_DATA_URL = '/tutorials/pansonic-photo-lab/assets/data/glossary-de.json';
const GLOSSARY_DATA_URL_EN = '/tutorials/pansonic-photo-lab/assets/data/glossary-en.json';

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

    if (featuredContainer) {
      renderFeaturedTerms(data, featuredContainer, isEn);
    }

    renderGlossary(data, container);

    // Reveal dynamically rendered content (initReveal already ran before loadGlossary)
    container.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-revealed'));
    if (featuredContainer) {
      featuredContainer.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-revealed'));
    }

    initGlossarySearch();
    initGlossaryAccordion();
    initGlossaryAlphabetNav();
  } catch (err) {
    console.error('Glossary load error:', err);
    const errorMsg = isEn ? 'Could not load glossary. Please try again later.' : 'Glossar konnte nicht geladen werden.';
    if (container) container.innerHTML = '<p class="photo-glossary-error">' + errorMsg + '</p>';
    if (featuredContainer) featuredContainer.innerHTML = '<p class="photo-glossary-error">' + errorMsg + '</p>';
  }
}

function renderGlossary(data, container) {
  const html = data.sections.map(section => {
    const termsHtml = section.terms.map(term => renderTermCard(term)).join('');
    return `
      <section class="photo-glossary-section" id="${escapeHtml(section.letter)}">
        <h2 class="photo-glossary-section__letter">${escapeHtml(section.letter)}</h2>
        <div class="photo-glossary-grid" data-reveal>
          ${termsHtml}
        </div>
      </section>
    `;
  }).join('');

  container.innerHTML = html;
}

function renderFeaturedTerms(data, container, isEn) {
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
    <div class="photo-featured-terms__header" data-reveal>
      <span class="photo-featured-terms__eyebrow"><i class="ph ph-sparkle"></i> ${isEn ? 'Top Picks' : 'Top Begriffe'}</span>
      <h2 class="photo-featured-terms__title">${isEn ? 'Essential Photo Terms' : 'Wichtigste Foto-Begriffe'}</h2>
      <p class="photo-featured-terms__subtitle">${isEn ? 'The most important concepts every photographer should know.' : 'Die wichtigsten Konzepte, die jeder Fotograf kennen sollte.'}</p>
    </div>
    <div class="photo-glossary-grid" data-reveal>
      ${termsHtml}
    </div>
  `;
}

function renderTermCard(term, isFeatured = false) {
  const blocksHtml = (term.blocks || []).map(block => `
    <div class="photo-term-block photo-term-block--${escapeHtml(block.type)}">
      <h4><i class="ph ph-${escapeHtml(block.icon)}"></i> ${escapeHtml(block.heading)}</h4>
      ${block.content}
    </div>
  `).join('');

  const moduleLinkHtml = term.moduleLink ? `
    <a href="${escapeHtml(term.moduleLink.href)}" class="photo-term-module-link">
      <i class="ph ph-book-open"></i> ${escapeHtml(term.moduleLink.label)}
    </a>
  ` : '';

  const featuredClass = isFeatured ? ' photo-term-card--featured' : '';

  return `
    <article class="photo-term-card${featuredClass}" data-term="${escapeHtml(term.id)}">
      <button class="photo-term-header" aria-expanded="false">
        <div class="photo-term-title-group">
          <div class="photo-term-icon photo-term-icon--${escapeHtml(term.category)}" aria-hidden="true">
            <i class="ph ph-${escapeHtml(term.icon)}"></i>
          </div>
          <div class="photo-term-title-wrap">
            <h3>${escapeHtml(term.title)}</h3>
            <span class="photo-term-category photo-term-category--${escapeHtml(term.category)}">${escapeHtml(term.categoryLabel)}</span>
            <span class="photo-term-subtitle">${escapeHtml(term.subtitle)}</span>
          </div>
        </div>
        <div class="photo-term-toggle" aria-hidden="true"><i class="ph ph-caret-down"></i></div>
      </button>
      <div class="photo-term-content">
        <div class="photo-term-definition">${term.definition}</div>
        ${blocksHtml ? `<div class="photo-term-blocks">${blocksHtml}</div>` : ''}
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

  const cards = document.querySelectorAll('.photo-term-card');
  const sections = document.querySelectorAll('.photo-glossary-section');
  const letters = document.querySelectorAll('.photo-glossary-nav__letter');
  const featured = document.getElementById('glossary-featured');
  const alphabetNav = document.querySelector('.photo-glossary-nav');

  function updateSearch(query) {
    const q = query.trim().toLowerCase();
    let visibleCount = 0;

    if (q === '') {
      cards.forEach(c => {
        c.classList.remove('hidden');
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

    if (featured) featured.style.display = 'none';
    if (alphabetNav) alphabetNav.style.display = 'none';
    if (clearBtn) clearBtn.classList.add('is-visible');

    cards.forEach(card => {
      const termEl = card.querySelector('.photo-term-title-wrap h3');
      const defEl = card.querySelector('.photo-term-definition');
      const catEl = card.querySelector('.photo-term-category');
      const term = termEl?.textContent.toLowerCase() || '';
      const def = defEl?.textContent.toLowerCase() || '';
      const cat = catEl?.textContent.toLowerCase() || '';
      const match = term.includes(q) || def.includes(q) || cat.includes(q);

      card.classList.toggle('hidden', !match);
      if (match) visibleCount++;
    });

    sections.forEach(section => {
      const visible = section.querySelectorAll('.photo-term-card:not(.hidden)');
      const hasVisible = visible.length > 0;
      section.classList.toggle('is-hidden', !hasVisible);
    });

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

export function initGlossaryAccordion() {
  document.querySelectorAll('.photo-term-header').forEach(header => {
    const card = header.closest('.photo-term-card');
    if (!card) return;

    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeCard(card);
      } else {
        openCard(card);
      }
    });

    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });
}

function openCard(card) {
  const header = card.querySelector('.photo-term-header');
  if (header) header.setAttribute('aria-expanded', 'true');
  card.classList.add('is-expanded');
}

function closeCard(card) {
  const header = card.querySelector('.photo-term-header');
  if (header) header.setAttribute('aria-expanded', 'false');
  card.classList.remove('is-expanded');
}

export function initGlossaryAlphabetNav() {
  const sections = document.querySelectorAll('.photo-glossary-section');
  const letters = document.querySelectorAll('.photo-glossary-nav__letter');
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
