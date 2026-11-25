/**
 * lexikon-filter.js — Suche & Kategorie-Filter für das PLU KI-Lexikon (P55)
 * Filtert ausschließlich A-Z-Begriffe (.lexikon-section .term-card).
 * Highlight-Sektionen (Quickstart/Advanced) sind keine .term-card und
 * bleiben immer sichtbar. Keine Abhängigkeiten, kein Modul-Scope nötig.
 */
(function () {
  'use strict';

  var sections = Array.prototype.slice.call(document.querySelectorAll('.lexikon-section'));
  if (!sections.length) return;

  var cards = sections.reduce(function (acc, s) {
    return acc.concat(Array.prototype.slice.call(s.querySelectorAll('.term-card')));
  }, []);

  var chips = Array.prototype.slice.call(document.querySelectorAll('.category-chip'));
  var input = document.getElementById('lexikon-search');
  var noResults = document.getElementById('no-results');
  var activeCategory = 'all';

  function applyFilters() {
    var query = input ? input.value.trim().toLowerCase() : '';
    var visible = 0;

    cards.forEach(function (card) {
      var haystack = ((card.dataset.term || '') + ' ' + card.textContent).toLowerCase();
      var matchQuery = !query || haystack.indexOf(query) !== -1;
      var matchCategory = activeCategory === 'all' || card.dataset.category === activeCategory;
      var show = matchQuery && matchCategory;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    sections.forEach(function (section) {
      var hasVisible = Array.prototype.some.call(
        section.querySelectorAll('.term-card'),
        function (card) { return card.style.display !== 'none'; }
      );
      section.style.display = hasVisible ? '' : 'none';
    });

    if (noResults) noResults.style.display = visible ? 'none' : '';
  }

  window.resetFilters = function () {
    if (input) input.value = '';
    activeCategory = 'all';
    chips.forEach(function (c) {
      c.classList.toggle('active', c.dataset.category === 'all');
    });
    applyFilters();
    if (input) input.focus();
  };

  if (input) input.addEventListener('input', applyFilters);

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      activeCategory = chip.dataset.category || 'all';
      chips.forEach(function (c) { c.classList.toggle('active', c === chip); });
      applyFilters();
    });
  });

  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (input) input.focus();
    }
  });

  applyFilters();
})();
