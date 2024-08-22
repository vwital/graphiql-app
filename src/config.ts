import { LocalePrefix, Pathnames } from "next-intl/routing";

export const locales = ["en", "ru"];

export type Locales = typeof locales;

export const pathnames: Pathnames<Locales> = {
  "/": "/",
  "/sign-in": "/sign-in",
  "/sign-up": "/sign-up",
};

export const localePrefix: LocalePrefix<Locales> = "always";
