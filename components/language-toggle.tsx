"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Globe, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  locales,
  localeLabels,
  isRoutedLocale,
  swapRoutedLocaleInPath,
  LOCALE_STORAGE_KEY,
} from "@/lib/i18n";
import { useLocale } from "@/components/locale-provider";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * Language switcher — mirrors PaletteSwitcher's dropdown pattern so a third
 * (or future fourth) language never has to fight for space in a single
 * toggle button. Picking Persian/English navigates to that locale's real
 * URL; picking Arabic (no dedicated routes yet) swaps the dictionary in
 * place over whichever fa/en page is currently loaded.
 */
export function LanguageToggle() {
  const { locale, dict, setLocale } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const select = React.useCallback(
    (next: (typeof locales)[number]) => {
      if (isRoutedLocale(next)) {
        setLocale(next); // clears any Arabic overlay so the new page renders as-navigated
        document.cookie = `${LOCALE_STORAGE_KEY}=${next}; path=/; max-age=${COOKIE_MAX_AGE}`;
        router.push(swapRoutedLocaleInPath(pathname, next));
      } else {
        setLocale(next);
      }
      setOpen(false);
      buttonRef.current?.focus();
    },
    [setLocale, router, pathname],
  );

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={dict.nav.switchLanguage}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 min-w-10 items-center justify-center gap-1 rounded-full border border-[var(--color-border)] px-2.5 text-sm font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-muted)]"
      >
        <Globe className="size-4" aria-hidden />
        <span className="uppercase">{locale}</span>
      </button>

      {open ? (
        <div
          role="menu"
          aria-label={dict.nav.switchLanguage}
          className="absolute end-0 z-50 mt-2 w-44 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 shadow-[var(--shadow-elevated)]"
        >
          {locales.map((id) => {
            const selected = id === locale;
            return (
              <button
                key={id}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => select(id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-[var(--radius-sm)] px-3 py-2 text-start text-sm font-medium transition-colors",
                  selected ? "bg-[var(--color-muted)]" : "hover:bg-[var(--color-muted)]",
                )}
              >
                <span>{localeLabels[id]}</span>
                {selected ? (
                  <Check className="size-4 shrink-0 text-[var(--color-accent)]" aria-hidden />
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
