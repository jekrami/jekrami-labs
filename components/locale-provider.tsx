"use client";

import * as React from "react";

import { LOCALE_STORAGE_KEY, defaultLocale, isLocale, localeDir, type Locale } from "@/lib/i18n";
import { en, type Dictionary } from "@/lib/dictionaries/en";
import { fa } from "@/lib/dictionaries/fa";

const dictionaries: Record<Locale, Dictionary> = { en, fa };

interface LocaleContextValue {
  locale: Locale;
  dict: Dictionary;
  hydrated: boolean;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

/**
 * Client-side locale state. English is always used for the first render so
 * SSR and hydration agree; the no-flash script may stamp fa on <html> for
 * RTL/CSS, then we sync the real choice after mount.
 */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>(defaultLocale);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    const current = document.documentElement.getAttribute("data-locale");
    if (isLocale(current)) {
      setLocaleState(current);
    }
    setHydrated(true);
  }, []);

  const setLocale = React.useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      /* storage unavailable — the choice still applies for this session */
    }
  }, []);

  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-locale", locale);
    root.setAttribute("lang", locale);
    root.setAttribute("dir", localeDir(locale));
  }, [locale]);

  const value = React.useMemo<LocaleContextValue>(
    () => ({
      locale: hydrated ? locale : defaultLocale,
      dict: hydrated ? dictionaries[locale] : dictionaries[defaultLocale],
      hydrated,
      setLocale,
    }),
    [hydrated, locale, setLocale],
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
