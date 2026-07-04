"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { ArrowUpRight, FileDown, Github, Linkedin, Mail, Search } from "lucide-react";

import { navigation, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/locale-provider";

const navKeyByHref = {
  "/": "home",
  "/projects": "projects",
  "/research": "research",
  "/about": "about",
  "/articles": "articles",
  "/contact": "contact",
} as const;

/**
 * Global keyboard-driven quick nav (Cmd/Ctrl+K). A single client island
 * mounted once in the root layout — opens a modal command list built on
 * `cmdk`, styled with the site's existing design tokens rather than any
 * default cmdk theme.
 */
export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { locale, dict } = useLocale();
  const resumeUrl = locale === "fa" ? site.resumeUrlFa : site.resumeUrl;

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isCombo = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (isCombo) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const go = React.useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router],
  );

  const openExternal = React.useCallback((href: string) => {
    setOpen(false);
    window.open(href, "_blank", "noreferrer");
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label={dict.commandPalette.label}
      className={cn(
        "fixed top-24 left-1/2 z-[70] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2",
        "overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)]",
        "bg-[var(--color-surface)] shadow-[var(--shadow-elevated)]",
      )}
      shouldFilter
      overlayClassName="fixed inset-0 z-[65] bg-black/40 backdrop-blur-sm"
      contentClassName=""
    >
      <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4">
        <Search className="size-4 shrink-0 text-[var(--color-muted-foreground)]" aria-hidden />
        <Command.Input
          autoFocus
          placeholder={dict.commandPalette.placeholder}
          className="h-12 w-full bg-transparent text-sm text-[var(--color-foreground)] outline-none placeholder:text-[var(--color-muted-foreground)]"
        />
        <kbd className="hidden shrink-0 rounded border border-[var(--color-border)] px-1.5 py-0.5 text-[0.65rem] text-[var(--color-muted-foreground)] sm:block">
          Esc
        </kbd>
      </div>

      <Command.List className="max-h-[60vh] overflow-y-auto p-2">
        <Command.Empty className="px-3 py-6 text-center text-sm text-[var(--color-muted-foreground)]">
          {dict.commandPalette.empty}
        </Command.Empty>

        <Command.Group
          heading={dict.commandPalette.navigate}
          className="px-1 pt-2 pb-1 text-xs font-medium tracking-[0.08em] text-[var(--color-muted-foreground)] uppercase [&_[cmdk-group-items]]:mt-1"
        >
          {navigation.map((item) => {
            const itemLabel =
              item.href in navKeyByHref
                ? dict.nav[navKeyByHref[item.href as keyof typeof navKeyByHref]]
                : item.label;
            return (
              <Command.Item
                key={item.href}
                value={`${item.label} ${itemLabel}`}
                onSelect={() => go(item.href)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-2 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm tracking-normal text-[var(--color-foreground)] normal-case",
                  "data-[selected=true]:bg-[var(--color-muted)]",
                )}
              >
                {itemLabel}
                <ArrowUpRight
                  className="size-3.5 text-[var(--color-muted-foreground)]"
                  aria-hidden
                />
              </Command.Item>
            );
          })}
        </Command.Group>

        <Command.Group
          heading={dict.commandPalette.actions}
          className="px-1 pt-2 pb-1 text-xs font-medium tracking-[0.08em] text-[var(--color-muted-foreground)] uppercase [&_[cmdk-group-items]]:mt-1"
        >
          <Command.Item
            value="Email"
            onSelect={() => openExternal(`mailto:${site.email}`)}
            className="flex cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm tracking-normal text-[var(--color-foreground)] normal-case data-[selected=true]:bg-[var(--color-muted)]"
          >
            <Mail className="size-3.5 text-[var(--color-muted-foreground)]" aria-hidden />
            {dict.commandPalette.emailPrefix} {site.email}
          </Command.Item>
          <Command.Item
            value="Download CV Resume دریافت رزومه"
            onSelect={() => openExternal(resumeUrl)}
            className="flex cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm tracking-normal text-[var(--color-foreground)] normal-case data-[selected=true]:bg-[var(--color-muted)]"
          >
            <FileDown className="size-3.5 text-[var(--color-muted-foreground)]" aria-hidden />
            {dict.common.downloadCV}
          </Command.Item>
          <Command.Item
            value="LinkedIn لینکدین"
            onSelect={() => openExternal(site.links.linkedin)}
            className="flex cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm tracking-normal text-[var(--color-foreground)] normal-case data-[selected=true]:bg-[var(--color-muted)]"
          >
            <Linkedin className="size-3.5 text-[var(--color-muted-foreground)]" aria-hidden />
            {dict.commandPalette.openLinkedIn}
          </Command.Item>
          <Command.Item
            value="GitHub گیت‌هاب"
            onSelect={() => openExternal(site.links.github)}
            className="flex cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm tracking-normal text-[var(--color-foreground)] normal-case data-[selected=true]:bg-[var(--color-muted)]"
          >
            <Github className="size-3.5 text-[var(--color-muted-foreground)]" aria-hidden />
            {dict.commandPalette.openGitHub}
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
