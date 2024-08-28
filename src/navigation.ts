import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { locales, pathnames, localePrefix } from "./config";

export const {
  Link,
  getPathname,
  redirect,
  usePathname,
  useRouter,
  permanentRedirect,
} = createLocalizedPathnamesNavigation({
  locales,
  pathnames,
  localePrefix,
});
