"use client";

import * as React from "react";

import { LOCALE_STORAGE_KEY, defaultLocale, isLocale, localeDir, type Locale } from "@/lib/i18n";
import { en, type Dictionary } from "@/lib/dictionaries/en";
import { fa } from "@/lib/dictionaries/fa";

const dictionaries: Record<Locale, Dictionary> = { en, fa };

interface LocaleContextValue {
  locale: Locale;
  dict: Dictionary;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

/**
 * Client-side locale state, mirroring the palette system: the no-flash
 * script has already stamped data-locale/lang/dir on <html> before
 * hydration, so the lazy initializer just reads it back. English is the
 * prerendered default; Farsi swaps in after hydration.
 */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>(() => {
    if (typeof document === "undefined") return defaultLocale;
    const current = document.documentElement.getAttribute("data-locale");
    return isLocale(current) ? current : defaultLocale;
  });

  const setLocale = React.useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      /* storage unavailable — the choice still applies for this session */
    }
  }, []);

  // Keep <html> in sync with the locale state. This runs after hydration,
  // which matters: React 19 reconciles root-element attributes during
  // hydration and strips anything the layout JSX didn't render — including
  // what the no-flash script stamped. Re-asserting here restores
  // data-locale/lang/dir after that pass and on every locale change.
  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-locale", locale);
    root.setAttribute("lang", locale);
    root.setAttribute("dir", localeDir(locale));
  }, [locale]);

  const value = React.useMemo<LocaleContextValue>(
    () => ({ locale, dict: dictionaries[locale], setLocale }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const context = React.useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used inside <LocaleProvider>");
  }
  return context;
}

/** Convenience hook — the dictionary for the active locale. */
export function useDictionary(): Dictionary {
  return useLocale().dict;
}
