# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and
some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
  uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)
  uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the
configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to
  `tseslint.configs.recommendedTypeChecked` or
  `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install
  [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and
  update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

## Adding Translations

- The
  [next-intl](https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing)
  library is used for translations.
- Translations should be added to files: **en.json**, **ru.json** in the
  **messages** directory. Example for Welcome Page:

```js
import { useTranslations } from "next-intl";

const WelcomePage = (): React.ReactNode => {
  const t = useTranslations("Welcome");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};
```

**Note that "Welcome"** here `const t = useTranslations("Welcome")` - is the key
for translation. The key may not match the component name.

```json
// en.json
{
  "Welcome": {
    "title": "Welcome to our app!",
    "description": "This is a short description of our app."
  }
}
```

```json
// ru.json
{
  "Welcome": {
    "title": "Добро пожаловать в наше приложение!",
    "description": "Это краткое описание нашего приложения."
  }
}
```
