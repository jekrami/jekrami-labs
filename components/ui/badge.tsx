import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Compact visual chip — used for technologies and domains.
 * Designed to render at 13-14px so they recede behind body copy.
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-[0.72rem] font-medium uppercase tracking-[0.06em] transition-colors",
  {
    variants: {
      tone: {
        neutral:
          "border-[var(--color-border)] bg-[var(--color-muted)] text-[var(--color-muted-foreground)]",
        accent:
          "border-[color-mix(in_oklch,var(--color-accent)_20%,white)] bg-[color-mix(in_oklch,var(--color-accent)_8%,white)] text-[var(--color-accent)]",
        primary:
          "border-[color-mix(in_oklch,var(--color-primary)_15%,white)] bg-[color-mix(in_oklch,var(--color-primary)_6%,white)] text-[var(--color-primary)]",
        outline: "border-[var(--color-border)] bg-transparent text-[var(--color-muted-foreground)]",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, tone, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ tone, className }))} {...props} />
  ),
);
Badge.displayName = "Badge";
