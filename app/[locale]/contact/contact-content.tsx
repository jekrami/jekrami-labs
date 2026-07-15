"use client";

import { ArrowUpRight, Linkedin, Github, Mail } from "lucide-react";

import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { FadeIn } from "@/components/motion/fade-in";
import { SlideIn } from "@/components/motion/slide-in";
import { useDictionary } from "@/components/locale-provider";

/**
 * Contact page body — client so every string resolves through the active
 * locale. The route's page.tsx stays server-side for metadata.
 */
export function ContactContent() {
  const dict = useDictionary();
  const t = dict.contactPage;

  const channels = [
    {
      label: dict.contactSection.channelLabels.email,
      handle: site.email,
      href: `mailto:${site.email}`,
      sub: t.channelSubs.email,
      icon: Mail,
    },
    {
      label: dict.contactSection.channelLabels.linkedin,
      handle: "Jafar Ekrami",
      href: site.links.linkedin,
      sub: t.channelSubs.linkedin,
      icon: Linkedin,
    },
    {
      label: dict.contactSection.channelLabels.github,
      handle: "@jekrami",
      href: site.links.github,
      sub: t.channelSubs.github,
      icon: Github,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={t.header.eyebrow}
        title={t.header.title}
        description={t.header.description}
      />

      <Container className="py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <SlideIn>
              <h2 className="text-2xl font-[var(--font-heading)] font-semibold text-[var(--color-primary)] sm:text-3xl">
                {t.whatToSendTitle}
              </h2>
            </SlideIn>
            <FadeIn delay={0.05}>
              <ul className="mt-8 space-y-6 text-base text-[var(--color-foreground)]">
                {t.whatToSend.map((item) => (
                  <li key={item.title}>
                    <p className="font-medium text-[var(--color-primary)]">{item.title}</p>
                    <p className="mt-2 text-[var(--color-muted-foreground)]">{item.body}</p>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.15}>
              <a
                href={`mailto:${site.email}`}
                className="group mt-12 inline-flex items-center gap-2 text-2xl font-[var(--font-heading)] font-semibold text-[var(--color-primary)] transition-colors hover:text-[var(--color-accent)] sm:text-3xl"
                dir="ltr"
              >
                {site.email}
                <ArrowUpRight className="size-6 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </FadeIn>
          </div>

          <aside>
            <FadeIn delay={0.1}>
              <ul className="grid gap-px overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-border)]">
                {channels.map(({ label, handle, href, sub, icon: Icon }) => (
                  <li key={label} className="bg-[var(--color-surface)]">
                    <a
                      href={href}
                      className="group flex items-center justify-between gap-4 p-6 transition-colors hover:bg-[var(--color-muted)]"
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-muted)] text-[var(--color-primary)]">
                          <Icon className="size-4" aria-hidden />
                        </div>
                        <div>
                          <p className="text-xs font-medium tracking-[0.08em] text-[var(--color-muted-foreground)] uppercase">
                            {label}
                          </p>
                          <p className="mt-1 text-sm text-[var(--color-primary)]" dir="ltr">
                            {handle}
                          </p>
                          <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">{sub}</p>
                        </div>
                      </div>
                      <ArrowUpRight
                        className="size-4 shrink-0 text-[var(--color-muted-foreground)] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-primary)]"
                        aria-hidden
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </aside>
        </div>
      </Container>
    </>
  );
}
