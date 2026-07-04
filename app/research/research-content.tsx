"use client";

import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { FadeIn } from "@/components/motion/fade-in";
import { useDictionary } from "@/components/locale-provider";

/**
 * Research page body — client so every string resolves through the
 * active locale. The route's page.tsx stays server-side for metadata.
 */
export function ResearchContent() {
  const dict = useDictionary();
  const t = dict.researchPage;

  return (
    <>
      <PageHeader
        eyebrow={t.header.eyebrow}
        title={t.header.title}
        description={t.header.description}
      />

      <Container className="py-20 sm:py-28">
        <ul className="grid gap-6 md:grid-cols-2">
          {dict.researchAreas.map((area, idx) => (
            <FadeIn key={area.title} delay={idx * 0.05} className="h-full">
              <li className="group h-full rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-10 transition-all duration-300 ease-[var(--ease-subtle)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]">
                <h2 className="text-2xl font-[var(--font-heading)] font-semibold text-[var(--color-primary)]">
                  {area.title}
                </h2>
                <p className="mt-4 text-pretty text-[var(--color-muted-foreground)]">
                  {area.summary}
                </p>
                <p className="mt-6 text-sm text-[var(--color-muted-foreground)]/80">{area.body}</p>
              </li>
            </FadeIn>
          ))}
        </ul>
      </Container>
    </>
  );
}
