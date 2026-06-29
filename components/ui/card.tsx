import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds a subtle hover lift; use only on cards that link to a detail page. */
  interactive?: boolean;
}

/**
 * Card primitive — quiet, rounded, soft shadow on hover.
 * The default elevation is intentionally flat to keep the grid calm.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 transition-all duration-300 ease-[var(--ease-subtle)] sm:p-10",
        interactive &&
          "group hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";
