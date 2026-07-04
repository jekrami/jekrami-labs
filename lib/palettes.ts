/**
 * Viewer-selectable colour palettes.
 *
 * Each palette is implemented as a set of CSS custom-property overrides in
 * `app/globals.css`, keyed on the `data-palette` attribute of the <html>
 * element. This module is the single source of truth for the available
 * palette identifiers, their human-readable labels, and the storage key used
 * to persist a viewer's choice.
 */
export const PALETTE_STORAGE_KEY = "jekrami-palette";

export const palettes = [
  {
    id: "studio",
    label: "Studio",
    description: "The Ekrami Labs brand — navy on white.",
    swatch: ["#0b2545", "#0077b6", "#ffffff"],
  },
  {
    id: "daylight",
    label: "Daylight",
    description: "High-contrast light, tuned for projection.",
    swatch: ["#062a52", "#00598f", "#ffffff"],
  },
  {
    id: "sepia",
    label: "Sepia",
    description: "Warm, low-strain tones for long reading.",
    swatch: ["#4b3621", "#a35a2a", "#f4ecd8"],
  },
  {
    id: "midnight",
    label: "Midnight",
    description: "Cool dark for dim rooms.",
    swatch: ["#4ea8ff", "#bcd2f0", "#0d1320"],
  },
  {
    id: "contrast",
    label: "High Contrast",
    description: "Maximum legibility — black, white, amber.",
    swatch: ["#ffd400", "#ffffff", "#000000"],
  },
] as const;

export type PaletteId = (typeof palettes)[number]["id"];

export const defaultPalette: PaletteId = "studio";

export const paletteIds: readonly PaletteId[] = palettes.map((p) => p.id);

export function isPaletteId(value: unknown): value is PaletteId {
  return typeof value === "string" && paletteIds.includes(value as PaletteId);
}

/**
 * Inline, dependency-free script injected before paint so the stored palette
 * is applied to <html> before the first render — avoids a flash of the wrong
 * palette (FOUC). Kept intentionally tiny and wrapped in try/catch so a
 * disabled localStorage never breaks the page.
 */
export function paletteNoFlashScript(): string {
  return `(function(){try{var k=${JSON.stringify(
    PALETTE_STORAGE_KEY,
  )};var v=localStorage.getItem(k);var allowed=${JSON.stringify(
    paletteIds,
  )};if(allowed.indexOf(v)===-1){v=${JSON.stringify(
    defaultPalette,
  )};}document.documentElement.setAttribute("data-palette",v);}catch(e){document.documentElement.setAttribute("data-palette",${JSON.stringify(
    defaultPalette,
  )});}})();`;
}
