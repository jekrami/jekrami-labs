"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InlineLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  /** Set false for external URLs. */
  internal?: boolean;
}

type LinkComponent = React.ForwardRefExoticComponent<
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
    React.RefAttributes<HTMLAnchorElement> & { href: string; prefetch?: boolean }
>;

/**
 * Inline "read more" link with a hover-shift arrow.
 * Defaults to Next.js Link for internal routes; pass `internal={false}` for external.
 *
 * `as unknown as LinkComponent` lets us forward the ref while keeping the
 * public prop surface typed as a regular <a>.
 */
const NextLink = Link as unknown as LinkComponent;

/**
 * Inline "read more" anchor with a hover-shift arrow.
 */
export const InlineLink = React.forwardRef<HTMLAnchorElement, InlineLinkProps>(function InlineLink(
  { className, children, href, internal = true, ...props },
  ref,
) {
  const classNames = cn(
    "group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-primary)]",
    className,
  );

  const content = (
    <>
      {children}
      <ArrowUpRight
        className="size-3.5 transition-transform duration-200 ease-[var(--ease-subtle)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </>
  );

  if (internal) {
    return (
      <NextLink ref={ref} href={href} className={classNames} {...props}>
        {content}
      </NextLink>
    );
  }

  return (
    <a ref={ref} href={href} className={classNames} {...props}>
      {content}
    </a>
  );
});

InlineLink.displayName = "InlineLink";
