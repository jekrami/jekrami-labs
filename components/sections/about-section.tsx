"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { SlideIn } from "@/components/motion/slide-in";
import { useDictionary } from "@/components/locale-provider";

/**
 * About — the engineering story, told as a story (not a CV).
 * Avoids the "retired / freelancer / tech enthusiast" phrasing and
 * emphasises the institutional contexts the work emerged from.
 */
export function AboutSection() {
  const dict = useDictionary();
  const [lead, ...rest] = dict.aboutSection.paragraphs;

  return (
    <section
      id="about"
      className="border-t border-[var(--color-border)] bg-[var(--color-muted)]/40 py-24 sm:py-32 lg:py-40"
    >
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div className="max-w-3xl">
            <SlideIn>
              <p className="eyebrow">{dict.aboutSection.eyebrow}</p>
            </SlideIn>
            <SlideIn delay={0.05} y={10}>
              <h2 className="display-2 mt-4">{dict.aboutSection.title}</h2>
            </SlideIn>

            <FadeIn delay={0.1}>
              <p className="mt-10 text-lg leading-relaxed text-pretty text-[var(--color-foreground)] sm:text-xl">
                {lead}
              </p>
            </FadeIn>

            {rest.map((paragraph, idx) => (
              <FadeIn key={idx} delay={0.15 + idx * 0.05}>
                <p className="mt-6 text-lg leading-relaxed text-pretty text-[var(--color-muted-foreground)]">
                  {paragraph}
                </p>
              </FadeIn>
            ))}

            <FadeIn delay={0.3}>
              <div className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Button asChild variant="outline" size="md">
                  <Link href="/about" className="group">
                    {dict.aboutSection.readFullStory}
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>

          <aside className="space-y-6">
            <FadeIn delay={0.1}>
              <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
                <p className="eyebrow">{dict.aboutSection.focusTitle}</p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-foreground)]">
                  {dict.aboutSection.focusItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
                <p className="eyebrow">{dict.aboutSection.industriesTitle}</p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-foreground)]">
                  {dict.aboutSection.industriesItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </aside>
        </div>
      </Container>
    </section>
  );
}
