import Link from "next/link";
import { Linkedin, Github, Mail } from "lucide-react";

import { navigation, site } from "@/lib/site";
import { Container } from "@/components/ui/container";

const socialLinks = [
  { href: site.email ? `mailto:${site.email}` : "#", label: "Email", icon: Mail },
  { href: site.links.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: site.links.github, label: "GitHub", icon: Github },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-muted)]/40">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:gap-16 md:py-20">
          <div className="max-w-md">
            <p className="font-[var(--font-heading)] text-base font-semibold text-[var(--color-primary)]">
              {site.name}
            </p>
            <p className="mt-3 text-sm text-[var(--color-muted-foreground)]">
              {site.tagline}.
            </p>
            <p className="mt-6 text-sm text-[var(--color-muted-foreground)]">
              An independent AI Research &amp; Engineering Studio. Built quietly,
              documented carefully, designed for the audit.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-muted-foreground)]">
              Studio
            </p>
            <ul className="mt-4 space-y-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-primary)] transition-colors hover:text-[var(--color-accent)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-muted-foreground)]">
              Connect
            </p>
            <ul className="mt-4 space-y-2.5">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] transition-colors hover:text-[var(--color-accent)]"
                    rel="noreferrer"
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
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p>{site.tagline}.</p>
        </div>
      </Container>
    </footer>
  );
}
