# i18n Patterns

## HTML

```html
<!-- Einfacher Text -->
<span data-i18n="hero.title">Fallback Text</span>

<!-- HTML-Inhalt -->
<div data-i18n-html="hero.description">Fallback mit <strong>HTML</strong></div>

<!-- Input Placeholder -->
<input data-i18n="search.placeholder" placeholder="Suchen...">

<!-- ARIA Label -->
<button data-i18n="btn.close" aria-label="Schließen">×</button>
```

## JS

```js
import { t, onLangChange } from './modules/i18n.js';

// Übersetzung holen
const title = t('hero.title');

// Mit Variablen
const message = t('welcome.user', { name: 'Max' });
// "Willkommen, {{name}}!" → "Willkommen, Max!"

// Auf Sprachwechsel reagieren
onLangChange((lang) => {
  renderContent(); // Neu rendern
});
```

## Translation Files

```js
// de.js
export default {
  'hero.title': 'Willkommen',
  'hero.subtitle': 'Untertitel',
  'welcome.user': 'Willkommen, {{name}}!'
};
```

## Key-Struktur

```
feature.subfeature.element

Beispiele:
- hero.title
- card.readMore
- filter.category
- modal.closeBtn
```
