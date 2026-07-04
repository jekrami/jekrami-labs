import * as React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * PageHeader — used at the top of every non-home route.
 * Keeps heading typography aligned with the hero so the rhythm is consistent.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "border-b border-[var(--color-border)] pt-20 pb-16 sm:pt-28 lg:pt-32",
        align === "center" && "text-center",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[76rem] px-6 sm:px-8 lg:px-12">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="display-1 mt-4 max-w-4xl text-balance">{title}</h1>
        {description ? (
          <p
            className={cn(
              "mt-6 max-w-2xl text-lg text-pretty text-[var(--color-muted-foreground)] sm:text-xl",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}
