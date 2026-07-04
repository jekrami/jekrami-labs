/**
 * Locale plumbing — mirrors the palette system exactly: the chosen locale
 * is stamped on <html> (data-locale + lang + dir) by a no-flash script
 * before first paint, persisted to localStorage, and switched at runtime
 * by the LanguageToggle through LocaleProvider.
 *
 * English is the default and remains the prerendered (SEO-visible)
 * content; Farsi is applied client-side after hydration.
 */
export const LOCALE_STORAGE_KEY = "jekrami-locale";

export const locales = ["en", "fa"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export function localeDir(locale: Locale): "ltr" | "rtl" {
  return locale === "fa" ? "rtl" : "ltr";
}

/**
 * Inline, dependency-free script injected before paint so a returning
 * Farsi reader never sees an English flash. Kept tiny and wrapped in
 * try/catch so a disabled localStorage can never break the page.
 */
export function localeNoFlashScript(): string {
  return `(function(){try{var k=${JSON.stringify(LOCALE_STORAGE_KEY)};var v=localStorage.getItem(k);if(v!=="fa"){v="en";}var d=document.documentElement;d.setAttribute("data-locale",v);d.setAttribute("lang",v);d.setAttribute("dir",v==="fa"?"rtl":"ltr");}catch(e){var d=document.documentElement;d.setAttribute("data-locale","en");d.setAttribute("lang","en");d.setAttribute("dir","ltr");}})();`;
}
