# React + TypeScript + Vite

This is a simple and modern web application for å velge og forhåndsvise farger.

## Funksjoner
- Velg en farge med RGB-slidere
- Klikk "Legg til" for å lagre fargen
- Forhåndsvisning av alle valgte farger i et rutenett (100x100px per farge)
- Responsivt og rent design

## Kom i gang

1. Installer avhengigheter:
   ```bash
   npm install
   ```
2. Start utviklingsserveren:
   ```bash
   npm run dev
   ```
3. Åpne nettleseren på [http://localhost:5173](http://localhost:5173)

## Prosjektstruktur
- `src/App.tsx`: Hovedkomponent med fargevelger og forhåndsvisning
- `src/App.css`: Stiler for UI og grid

---

Dette prosjektet bruker Vite, React og TypeScript.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
