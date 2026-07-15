"use client";

import * as React from "react";
import NextLink from "next/link";
import type { ComponentProps } from "react";

import { useLocale } from "@/components/locale-provider";
import { localeHref } from "@/lib/i18n";

type LocaleLinkProps = ComponentProps<typeof NextLink>;

/**
 * next/link wrapper that prefixes internal absolute paths (e.g. "/projects")
 * with the page's routed locale (e.g. "/fa/projects"). External URLs,
 * hashes, and already-prefixed hrefs pass through unchanged.
 */
export const LocaleLink = React.forwardRef<HTMLAnchorElement, LocaleLinkProps>(
  function LocaleLink({ href, ...props }, ref) {
    const { routedLocale } = useLocale();
    const resolvedHref =
      typeof href === "string" && href.startsWith("/") && !href.startsWith("//")
        ? localeHref(routedLocale, href)
        : href;
    return <NextLink ref={ref} href={resolvedHref} {...props} />;
  },
);
