import { LocalePrefix, Pathnames } from "next-intl/routing";

export const locales = ["en", "ru"];

export type Locales = typeof locales;

export const pathnames: Pathnames<Locales> = {
  "/": "/",
  "/sign-in": "/sign-in",
  "/sign-up": "/sign-up",
  "/rest": "/rest",
  "/graphi": "/graphi",
  "/history": "/history",
};

export const localePrefix: LocalePrefix<Locales> = "always";
