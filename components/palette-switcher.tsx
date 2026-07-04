"use client";

import * as React from "react";
import { Palette, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  PALETTE_STORAGE_KEY,
  defaultPalette,
  isPaletteId,
  palettes,
  type PaletteId,
} from "@/lib/palettes";

/**
 * Viewer-facing palette control. The initial palette is applied before paint
 * by the no-flash script in the root layout; this component reads that value,
 * lets the viewer switch, and persists the choice to localStorage.
 */
export function PaletteSwitcher() {
  const [open, setOpen] = React.useState(false);
  // Lazy initializer instead of a post-mount effect: the no-flash script has
  // already stamped data-palette on <html> before hydration, and the closed
  // menu renders identically for every palette, so no mismatch is possible.
  const [active, setActive] = React.useState<PaletteId>(() => {
    if (typeof document === "undefined") return defaultPalette;
    const current = document.documentElement.getAttribute("data-palette");
    return isPaletteId(current) ? current : defaultPalette;
  });
  const containerRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // Re-assert the attribute after hydration: React 19 reconciles root-element
  // attributes and strips what the no-flash script stamped on <html>.
  React.useEffect(() => {
    document.documentElement.setAttribute("data-palette", active);
  }, [active]);

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

  const select = React.useCallback((id: PaletteId) => {
    setActive(id);
    document.documentElement.setAttribute("data-palette", id);
    try {
      localStorage.setItem(PALETTE_STORAGE_KEY, id);
    } catch {
      /* storage unavailable — selection still applies for this session */
    }
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change colour palette"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-primary)] transition-colors hover:bg-[var(--color-muted)]"
      >
        <Palette className="size-5" aria-hidden />
      </button>

      {open ? (
        <div
          role="menu"
          aria-label="Colour palette"
          className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 shadow-[var(--shadow-elevated)]"
        >
          <p className="px-3 pt-2 pb-1.5 text-xs font-medium tracking-[0.08em] text-[var(--color-muted-foreground)] uppercase">
            Colour palette
          </p>
          {palettes.map((palette) => {
            const selected = palette.id === active;
            return (
              <button
                key={palette.id}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => select(palette.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2 text-left transition-colors",
                  selected ? "bg-[var(--color-muted)]" : "hover:bg-[var(--color-muted)]",
                )}
              >
                <span
                  aria-hidden
                  className="flex size-6 shrink-0 overflow-hidden rounded-full border border-[var(--color-border)]"
                >
                  {palette.swatch.map((color, index) => (
                    <span
                      key={index}
                      className="h-full flex-1"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-[var(--color-foreground)]">
                    {palette.label}
                  </span>
                  <span className="block truncate text-xs text-[var(--color-muted-foreground)]">
                    {palette.description}
                  </span>
                </span>
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
