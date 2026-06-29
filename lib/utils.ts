import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Compose Tailwind class names with conflict resolution.
 * Mirrors the canonical Shadcn helper so we keep a single source of truth.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
