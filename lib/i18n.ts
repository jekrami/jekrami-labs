/**
 * Locale plumbing. Persian and English are real, URL-routed locales
 * (`/fa/...`, `/en/...`) rendered server-side — see middleware.ts and
 * app/[locale]/layout.tsx. Arabic is a lighter, client-only overlay: it
 * has full dictionary content but no dedicated routes, so it is applied
 * in the browser after mount via LocaleProvider, the same way every
 * locale used to work before the URL-routing migration.
 */
export const LOCALE_STORAGE_KEY = "jekrami-locale";

export const locales = ["fa", "en", "ar"] as const;
export type Locale = (typeof locales)[number];

/** Locales that get real, statically-generated, indexable URLs. */
export const routedLocales = ["fa", "en"] as const;
export type RoutedLocale = (typeof routedLocales)[number];

/** Persian is the primary target market. */
export const defaultLocale: RoutedLocale = "fa";

/** Native display name for each locale, used by the language switcher. */
export const localeLabels: Record<Locale, string> = {
  en: "English",
  fa: "فارسی",
  ar: "العربية",
};

const rtlLocales: readonly Locale[] = ["fa", "ar"];

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export function isRoutedLocale(value: unknown): value is RoutedLocale {
  return typeof value === "string" && (routedLocales as readonly string[]).includes(value);
}

export function localeDir(locale: Locale): "ltr" | "rtl" {
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
}

/** Builds an absolute, locale-prefixed path, e.g. localeHref("fa", "/projects") -> "/fa/projects". */
export function localeHref(locale: RoutedLocale, path: string): string {
  const normalized = path === "/" ? "" : path;
  return `/${locale}${normalized}`;
}

/**
 * Swaps the locale segment of a pathname when the user picks a different
 * routed locale from the language switcher. Article detail pages only
 * exist under "en" (no Persian article translations yet), so switching
 * away from "en" while reading one lands on the localized articles list
 * instead of a nonexistent translated article URL.
 */
export function swapRoutedLocaleInPath(pathname: string, next: RoutedLocale): string {
  const segments = pathname.split("/").filter(Boolean);
  const rest = segments.slice(1);
  if (rest[0] === "articles" && rest.length > 1 && next !== "en") {
    return localeHref(next, "/articles");
  }
  return localeHref(next, rest.length ? `/${rest.join("/")}` : "/");
}
