"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { navigation, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";
import { PaletteSwitcher } from "@/components/palette-switcher";
import { LanguageToggle } from "@/components/language-toggle";
import { useDictionary } from "@/components/locale-provider";
import { Magnetic } from "@/components/motion/magnetic";

/** Maps navigation hrefs to their dictionary keys so labels localize. */
const navKeyByHref = {
  "/": "home",
  "/projects": "projects",
  "/research": "research",
  "/services": "services",
  "/about": "about",
  "/articles": "articles",
  "/contact": "contact",
} as const;

type NavHref = keyof typeof navKeyByHref;

/**
 * Top navigation. Styling reacts to scroll position by adding a soft
 * hairline + frosted background once the user has moved off the top.
 * Mobile uses a full-screen sheet that animates in from the right.
 */
export function Navigation() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const dict = useDictionary();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const label = (href: string, fallback: string) =>
    href in navKeyByHref ? dict.nav[navKeyByHref[href as NavHref]] : fallback;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet on navigation — adjusted during render (the
  // React-recommended "derive state from props" pattern) rather than in an
  // effect, so the closed state paints in the same pass as the new route.
  const [prevPathname, setPrevPathname] = React.useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 ease-[var(--ease-subtle)]",
        scrolled
          ? "border-b border-[var(--color-border)] bg-[var(--color-surface)]/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            className="inline-flex shrink-0 items-center"
            aria-label={`${site.name} — Home`}
          >
            <Logo priority className="h-12 md:h-14" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                    active
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)]",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {label(item.href, item.label)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label={dict.nav.openCommandMenu}
              onClick={() =>
                document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))
              }
              className="hidden h-10 items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 text-xs font-medium text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--color-primary)] sm:inline-flex"
            >
              <Search className="size-3.5" aria-hidden />
              <kbd className="font-sans">⌘K</kbd>
            </button>
            <LanguageToggle />
            <PaletteSwitcher />

            <Magnetic className="hidden md:inline-flex" strength={0.2}>
              <Link
                href="/contact"
                className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)] transition-colors hover:bg-[var(--color-primary-hover)]"
              >
                {dict.nav.getInTouch}
              </Link>
            </Magnetic>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-primary)] transition-colors hover:bg-[var(--color-muted)] md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            className="fixed inset-x-0 top-16 z-40 origin-top bg-[var(--color-surface)] md:hidden"
            style={{ height: "calc(100dvh - 4rem)" }}
          >
            <nav aria-label="Mobile" className="flex h-full flex-col gap-1 px-6 py-8">
              {navigation.map((item, idx) => {
                const active = isActive(pathname, item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduced ? 0 : 0.35,
                      delay: reduced ? 0 : 0.04 * idx,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-2xl px-4 py-4 text-2xl font-[var(--font-heading)] font-semibold tracking-tight",
                        active
                          ? "bg-[var(--color-muted)] text-[var(--color-primary)]"
                          : "text-[var(--color-primary)] hover:bg-[var(--color-muted)]",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {label(item.href, item.label)}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="mt-auto pb-8">
                <Link
                  href="/contact"
                  className="block rounded-full bg-[var(--color-primary)] px-6 py-4 text-center text-base font-medium text-[var(--color-primary-foreground)]"
                >
                  {dict.nav.getInTouch}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
