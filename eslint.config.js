import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import reactCompiler from "eslint-plugin-react-compiler";

export default tseslint.config(
  { ignores: ["dist", ".next"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "react-compiler": reactCompiler,
      prettier,
    },
    rules: {
      "react-compiler/react-compiler": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "no-empty-function": "error",
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/array-type": "error",
      "no-console": "warn",
      "no-inline-comments": "error",

      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
          allowExportNames: ["loader", "metadata"],
        },
      ],

      "no-duplicate-imports": [
        "error",
        {
          includeExports: true,
        },
      ],

      "no-empty": "error",
      "no-undefined": "error",

      "prefer-destructuring": [
        "error",
        {
          array: true,
          object: true,
        },
      ],

      "require-await": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "no-restricted-imports": [
        "error",
        {
          name: "next/link",
          message: "Use import { Link } from `@/navigation` instead",
          importNames: ["default"],
        },
        {
          name: "next/navigation",
          message:
            "Use import { redirect, useRouter, usePathname, getPathname, permanentRedirect } from `@/navigation` instead",
          importNames: [
            "redirect",
            "useRouter",
            "usePathname",
            "getPathname",
            "permanentRedirect",
          ],
        },
      ],
    },
  },
  {
    files: ["src/components/pages/notFound/NotFoundGeneral.tsx"],
    rules: {
      "no-restricted-imports": "off",
    },
  }
);
