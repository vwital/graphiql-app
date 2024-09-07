import createMiddleware from "next-intl/middleware";
import { locales } from "./config";
import { type NextRequest, NextResponse } from "next/server";
import {
  protectedRoutes,
  publicRoutes,
  SESSION_COOKIE_NAME,
} from "./constants/constants";

const protectRoutes = (request: NextRequest): NextResponse | void => {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || "";
  if (session && publicRoutes.some((route) => request.url.includes(route))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    !session &&
    protectedRoutes.some((route) => request.url.includes(route))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return;
};

const i18nMiddleware = createMiddleware({
  locales,
  defaultLocale: "ru",
});

const middleware = (request: NextRequest): NextResponse | void => {
  const protectResponse = protectRoutes(request);
  if (protectResponse) {
    return protectResponse;
  }

  const i18nResponse = i18nMiddleware(request);
  if (i18nResponse) {
    return i18nResponse;
  }

  return NextResponse.next();
};

export default middleware;

export const config = {
  matcher: ["/", "/(ru|en)/:path*"],
};
