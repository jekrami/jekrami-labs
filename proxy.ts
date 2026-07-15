import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { LOCALE_STORAGE_KEY, defaultLocale, isRoutedLocale, type RoutedLocale } from "@/lib/i18n";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function detectLocale(request: NextRequest): RoutedLocale {
  const cookieLocale = request.cookies.get(LOCALE_STORAGE_KEY)?.value;
  if (isRoutedLocale(cookieLocale)) return cookieLocale;

  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    for (const part of acceptLanguage.split(",")) {
      const lang = part.split(";")[0]?.trim().toLowerCase().slice(0, 2);
      if (isRoutedLocale(lang)) return lang;
    }
  }
  return defaultLocale;
}

/**
 * Resolves every request to a real `/fa/...` or `/en/...` URL so Persian
 * and English render as separately crawlable pages (see the SEO/locale
 * routing plan). "/" redirects to the visitor's detected locale; any
 * other un-prefixed path is treated as a legacy pre-migration URL and
 * redirected to its English equivalent, since English was the only
 * locale ever server-rendered (and therefore indexable) before this
 * migration.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const locale = detectLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    const response = NextResponse.redirect(url, 307);
    response.cookies.set(LOCALE_STORAGE_KEY, locale, { path: "/", maxAge: COOKIE_MAX_AGE });
    return response;
  }

  const firstSegment = pathname.split("/")[1];
  if (isRoutedLocale(firstSegment)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
