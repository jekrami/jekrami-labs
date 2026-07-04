"use client";

import Link from "next/link";
import { Linkedin, Github, Mail, FileDown } from "lucide-react";

import { navigation, site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { useLocale } from "@/components/locale-provider";

const navKeyByHref = {
  "/": "home",
  "/projects": "projects",
  "/research": "research",
  "/about": "about",
  "/articles": "articles",
  "/contact": "contact",
} as const;

export function Footer() {
  const { locale, dict } = useLocale();
  const year = new Date().getFullYear();
  const resumeUrl = locale === "fa" ? site.resumeUrlFa : site.resumeUrl;

  const socialLinks = [
    {
      href: `mailto:${site.email}`,
      label: dict.contactSection.channelLabels.email,
      icon: Mail,
    },
    {
      href: site.links.linkedin,
      label: dict.contactSection.channelLabels.linkedin,
      icon: Linkedin,
    },
    {
      href: site.links.github,
      label: dict.contactSection.channelLabels.github,
      icon: Github,
    },
    { href: resumeUrl, label: dict.common.downloadCV, icon: FileDown, download: true },
  ];

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-muted)]/40">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:gap-16 md:py-20">
          <div className="max-w-md">
            <p className="text-base font-[var(--font-heading)] font-semibold text-[var(--color-primary)]">
              {site.name}
            </p>
            <p className="mt-3 text-sm text-[var(--color-muted-foreground)]">
              {dict.footer.tagline}.
            </p>
            <p className="mt-6 text-sm text-[var(--color-muted-foreground)]">
              {dict.footer.description}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium tracking-[0.08em] text-[var(--color-muted-foreground)] uppercase">
              {dict.footer.studio}
            </p>
            <ul className="mt-4 space-y-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-primary)] transition-colors hover:text-[var(--color-accent)]"
                  >
                    {item.href in navKeyByHref
                      ? dict.nav[navKeyByHref[item.href as keyof typeof navKeyByHref]]
                      : item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium tracking-[0.08em] text-[var(--color-muted-foreground)] uppercase">
              {dict.footer.connect}
            </p>
            <ul className="mt-4 space-y-2.5">
              {socialLinks.map(({ href, label, icon: Icon, download }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] transition-colors hover:text-[var(--color-accent)]"
                    rel="noreferrer"
                    download={download ? true : undefined}
                  >
                    <Icon className="size-3.5" aria-hidden />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-[var(--color-border)] py-8 text-xs text-[var(--color-muted-foreground)] sm:flex-row sm:items-center">
          <p>
            &copy; {year} {site.name}. {dict.footer.rights} {dict.footer.foundedBy}{" "}
            {dict.footer.founderName}.
          </p>
          <p>{dict.footer.tagline}.</p>
        </div>
      </Container>
    </footer>
  );
}
