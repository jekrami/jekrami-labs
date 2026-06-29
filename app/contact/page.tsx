import type { Metadata } from "next";
import { ArrowUpRight, Linkedin, Github, Mail } from "lucide-react";

import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { FadeIn } from "@/components/motion/fade-in";
import { SlideIn } from "@/components/motion/slide-in";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with JEKRAMI Labs — enterprise AI research and engineering engagements.",
};

const channels = [
  {
    label: "Email",
    handle: site.email,
    href: `mailto:${site.email}`,
    sub: "Replies within one working day.",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    handle: "JEKRAMI Labs",
    href: site.links.linkedin,
    sub: "Studio updates and public notes.",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    handle: "@jekrami-labs",
    href: site.links.github,
    sub: "Open research and tooling.",
    icon: Github,
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start a quiet conversation."
        description="Engagements begin with a conversation, not a contract. We take on a small number of projects each quarter."
      />

      <Container className="py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <SlideIn>
              <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[var(--color-primary)] sm:text-3xl">
                What to send
              </h2>
            </SlideIn>
            <FadeIn delay={0.05}>
              <ul className="mt-8 space-y-6 text-base text-[var(--color-foreground)]">
                <li>
                  <p className="font-medium text-[var(--color-primary)]">
                    The problem in one paragraph.
                  </p>
                  <p className="mt-2 text-[var(--color-muted-foreground)]">
                    What you are trying to do, what you have already tried,
                    and what is in the way.
                  </p>
                </li>
                <li>
                  <p className="font-medium text-[var(--color-primary)]">
                    The shape of the data.
                  </p>
                  <p className="mt-2 text-[var(--color-muted-foreground)]">
                    Documents, telemetry, contracts, signals — whatever is in
                    scope. The more honest this is, the better we can scope.
                  </p>
                </li>
                <li>
                  <p className="font-medium text-[var(--color-primary)]">
                    The constraint.
                  </p>
                  <p className="mt-2 text-[var(--color-muted-foreground)]">
                    Audit, privacy, latency, vendor lock-in, regulatory
                    envelope. These shape the design more than features do.
                  </p>
                </li>
              </ul>
            </FadeIn>

            <FadeIn delay={0.15}>
              <a
                href={`mailto:${site.email}`}
                className="group mt-12 inline-flex items-center gap-2 font-[var(--font-heading)] text-2xl font-semibold text-[var(--color-primary)] transition-colors hover:text-[var(--color-accent)] sm:text-3xl"
              >
                {site.email}
                <ArrowUpRight className="size-6 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
                          <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-muted-foreground)]">
                            {label}
                          </p>
                          <p className="mt-1 text-sm text-[var(--color-primary)]">
                            {handle}
                          </p>
                          <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">
                            {sub}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight
                        className="size-4 shrink-0 text-[var(--color-muted-foreground)] transition-all duration-200 group-hover:text-[var(--color-primary)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
