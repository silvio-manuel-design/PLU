# Vite Commands

```bash
# Development Server starten
npm run dev

# Produktions-Build
npm run build

# Build lokal previewen
npm run preview
```

## Projekt-Struktur

```
src/
├── pages/
│   └── index.html      # Entry Point
├── css/
│   ├── main.css        # ITCSS Hub
│   └── 00-settings/    # Tokens
├── js/
│   ├── main.js         # Entry
│   └── modules/        # ES6 Modules
└── assets/             # Bilder, Fonts
```

## Multi-Page

```js
// vite.config.js
rollupOptions: {
  input: {
    main: resolve(__dirname, 'src/pages/index.html')
  }
}
```
