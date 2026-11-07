# ITCSS Layers

```css
@import url('00-settings/tokens.css') layer(settings);
@import url('02-generic/reset.css') layer(generic);
@import url('03-elements/base.css') layer(elements);
@import url('05-components/*.css') layer(components);
@import url('07-utilities/utilities.css') layer(utilities);
@import url('08-modes/classroom-mode.css') layer(modes);
```

| Layer | Specificity | Content |
|-------|------------|---------|
| Settings | 0 | CSS Variables, Design Tokens |
| Generic | 0 | Reset, Normalize |
| Elements | 1 | Bare HTML tags (h1, p, a) |
| Components | 10 | BEM Components |
| Utilities | 100 | Helper classes |
| Modes | - | Classroom Mode overrides |

## Warum @layer?

CSS Cascade Layers sorgen dafür, dass `layer(utilities)` immer `layer(components)` überschreibt — unabhängig von Selektor-Spezifität.
