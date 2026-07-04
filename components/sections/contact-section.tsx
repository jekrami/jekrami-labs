"use client";

import { ArrowUpRight, Linkedin, Github, Mail } from "lucide-react";

import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/fade-in";
import { SlideIn } from "@/components/motion/slide-in";
import { useDictionary } from "@/components/locale-provider";

/**
 * Contact — a single invitation with three direct channels.
 * Deliberately sparse so the email is the loudest thing on the page.
 */
export function ContactSection() {
  const dict = useDictionary();

  const channels = [
    {
      label: dict.contactSection.channelLabels.email,
      handle: site.email,
      href: `mailto:${site.email}`,
      icon: Mail,
    },
    {
      label: dict.contactSection.channelLabels.linkedin,
      handle: "Jafar Ekrami",
      href: site.links.linkedin,
      icon: Linkedin,
    },
    {
      label: dict.contactSection.channelLabels.github,
      handle: "@jekrami",
      href: site.links.github,
      icon: Github,
    },
  ];

  return (
    <section id="contact" className="border-t border-[var(--color-border)] py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="max-w-xl">
            <SlideIn>
              <p className="eyebrow">{dict.contactSection.eyebrow}</p>
            </SlideIn>
            <SlideIn delay={0.05} y={10}>
              <h2 className="display-2 mt-4">{dict.contactSection.title}</h2>
            </SlideIn>
            <FadeIn delay={0.15}>
              <p className="mt-6 text-lg text-pretty text-[var(--color-muted-foreground)]">
                {dict.contactSection.description}
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <a
                href={`mailto:${site.email}`}
                className="group mt-10 inline-flex items-center gap-2 text-2xl font-[var(--font-heading)] font-semibold text-[var(--color-primary)] transition-colors hover:text-[var(--color-accent)] sm:text-3xl"
                dir="ltr"
              >
                {site.email}
                <ArrowUpRight className="size-6 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </FadeIn>
          </div>

          <FadeIn delay={0.15}>
            <ul className="grid gap-px overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-border)]">
              {channels.map(({ label, handle, href, icon: Icon }) => (
                <li key={label} className="bg-[var(--color-surface)]">
                  <a
                    href={href}
                    className="group flex items-center justify-between gap-4 p-6 transition-colors hover:bg-[var(--color-muted)]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-muted)] text-[var(--color-primary)]">
                        <Icon className="size-4" aria-hidden />
                      </div>
                      <div>
                        <p className="text-xs font-medium tracking-[0.08em] text-[var(--color-muted-foreground)] uppercase">
                          {label}
                        </p>
                        <p className="mt-1 text-sm text-[var(--color-primary)]" dir="ltr">
                          {handle}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight
                      className="size-4 text-[var(--color-muted-foreground)] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-primary)]"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
