"use client";

import { useLocale } from "@/components/locale-provider";

/**
 * Language toggle — one quiet control in the header, showing the language
 * you would switch TO (the convention readers of both scripts expect).
 */
export function LanguageToggle() {
  const { locale, dict, setLocale } = useLocale();
  const next = locale === "en" ? "fa" : "en";

  return (
    <button
      type="button"
      onClick={() => setLocale(next)}
      aria-label={dict.nav.switchLanguage}
      className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-[var(--color-border)] px-2.5 text-sm font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-muted)]"
    >
      {locale === "en" ? "فا" : "EN"}
    </button>
  );
}
