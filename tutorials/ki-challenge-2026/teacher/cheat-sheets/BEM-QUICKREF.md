# BEM Quick Reference

## Block

```css
.challenge-card { ... }
.challenge-btn { ... }
.challenge-header { ... }
```

## Element

```css
.challenge-card__title { ... }
.challenge-card__image { ... }
.challenge-btn__icon { ... }
```

## Modifier

```css
.challenge-card--featured { ... }
.challenge-btn--primary { ... }
.challenge-btn--large { ... }
```

## State

```css
.is-active { ... }
.is-hidden { ... }
.has-dropdown { ... }
```

## Utility

```css
.u-hidden { ... }
.u-container { ... }
.u-text-center { ... }
```

## Regeln

1. **Keine Element-Element-Ketten**: ❌ `.challenge-card__header__title`
2. **Modifier + Modifier**: ✅ `.challenge-btn--primary.challenge-btn--large`
3. **Block + Modifier**: ✅ `.challenge-card.challenge-card--featured`
