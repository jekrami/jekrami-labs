"use client";

import * as React from "react";

import { LOCALE_STORAGE_KEY, localeDir, type Locale, type RoutedLocale } from "@/lib/i18n";
import { en, type Dictionary } from "@/lib/dictionaries/en";
import { fa } from "@/lib/dictionaries/fa";
import { ar } from "@/lib/dictionaries/ar";

const dictionaries: Record<Locale, Dictionary> = { en, fa, ar };

interface LocaleContextValue {
  /** Active display locale — the routed locale, or "ar" if overridden client-side. */
  locale: Locale;
  /** The real, URL-routed locale for this page (fa/en), for building hrefs. */
  routedLocale: RoutedLocale;
  dict: Dictionary;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

/**
 * The Arabic overlay flag lives in localStorage, an external mutable
 * store outside React. useSyncExternalStore reads it in a
 * hydration-safe way (server snapshot is always `false`, matching SSR)
 * without the cascading-render risk of setState-in-effect.
 */
const arOverrideListeners = new Set<() => void>();

function subscribeArOverride(onChange: () => void) {
  arOverrideListeners.add(onChange);
  return () => arOverrideListeners.delete(onChange);
}

function getArOverrideSnapshot(): boolean {
  try {
    return localStorage.getItem(LOCALE_STORAGE_KEY) === "ar";
  } catch {
    return false;
  }
}

function getArOverrideServerSnapshot(): boolean {
  return false;
}

/**
 * Locale is now resolved server-side from the URL (`/fa/...`, `/en/...`)
 * and passed in as `locale` — SSR and first client render always agree,
 * so fa/en content is crawlable with no post-hydration swap or flash.
 *
 * Arabic has no dedicated routes (see lib/i18n.ts), so it stays a
 * client-only overlay: picking it from the language toggle swaps the
 * dictionary in place, layered on top of whichever fa/en URL is loaded,
 * exactly like every locale used to behave before this migration.
 */
export function LocaleProvider({
  locale: routedLocale,
  children,
}: {
  locale: RoutedLocale;
  children: React.ReactNode;
}) {
  const arOverride = React.useSyncExternalStore(
    subscribeArOverride,
    getArOverrideSnapshot,
    getArOverrideServerSnapshot,
  );

  const locale: Locale = arOverride ? "ar" : routedLocale;

  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-locale", locale);
    root.setAttribute("lang", locale);
    root.setAttribute("dir", localeDir(locale));
  }, [locale]);

  const setLocale = React.useCallback((next: Locale) => {
    try {
      if (next === "ar") {
        localStorage.setItem(LOCALE_STORAGE_KEY, "ar");
      } else {
        localStorage.removeItem(LOCALE_STORAGE_KEY);
      }
    } catch {
      /* storage unavailable — the choice still applies for this session */
    }
    arOverrideListeners.forEach((listener) => listener());
  }, []);

  const value = React.useMemo<LocaleContextValue>(
    () => ({ locale, routedLocale, dict: dictionaries[locale], setLocale }),
    [locale, routedLocale, setLocale],
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
