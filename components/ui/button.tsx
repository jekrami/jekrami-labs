import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button variants follow the visual language of the brand:
 *  - Quiet default (ghost + outline)
 *  - Committed primary (solid navy)
 *  - Calm accent (solid accent blue)
 * Sizes stay narrow — a handful of choices keeps the rhythm consistent.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 ease-[var(--ease-subtle)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-[var(--shadow-soft)] hover:bg-[var(--color-primary-hover)] active:translate-y-px",
        accent:
          "bg-[var(--color-accent)] text-[var(--color-accent-foreground)] shadow-[var(--shadow-soft)] hover:bg-[var(--color-accent-hover)] active:translate-y-px",
        outline:
          "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
        ghost: "text-[var(--color-primary)] hover:bg-[var(--color-muted)]",
        link: "text-[var(--color-accent)] underline-offset-4 hover:underline px-0",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-12 px-7 text-[0.95rem]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
