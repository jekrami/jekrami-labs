/**
 * Locale plumbing — mirrors the palette system exactly: the chosen locale
 * is stamped on <html> (data-locale + lang + dir) by a no-flash script
 * before first paint, persisted to localStorage, and switched at runtime
 * by the LanguageToggle through LocaleProvider.
 *
 * English is the default and remains the prerendered (SEO-visible)
 * content; Farsi and Arabic are applied client-side after hydration.
 */
export const LOCALE_STORAGE_KEY = "jekrami-locale";

export const locales = ["en", "fa", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

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

export function localeDir(locale: Locale): "ltr" | "rtl" {
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
}

/**
 * Inline, dependency-free script injected before paint so a returning
 * Farsi or Arabic reader never sees an English flash. Kept tiny and
 * wrapped in try/catch so a disabled localStorage can never break the page.
 */
export function localeNoFlashScript(): string {
  const validLocales = JSON.stringify(locales);
  const rtl = JSON.stringify(rtlLocales);
  return `(function(){try{var k=${JSON.stringify(LOCALE_STORAGE_KEY)};var locales=${validLocales};var rtl=${rtl};var v=localStorage.getItem(k);if(locales.indexOf(v)===-1){v="en";}var d=document.documentElement;d.setAttribute("data-locale",v);d.setAttribute("lang",v);d.setAttribute("dir",rtl.indexOf(v)!==-1?"rtl":"ltr");}catch(e){var d=document.documentElement;d.setAttribute("data-locale","en");d.setAttribute("lang","en");d.setAttribute("dir","ltr");}})();`;
}
