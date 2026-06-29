import type { Metadata } from "next";

import { researchAreas } from "@/lib/research";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Long-running research threads that feed directly into the systems JEKRAMI Labs builds — governance, retrieval, agentic systems, and more.",
};

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Where the thinking lives."
        description="We maintain long-running research threads that feed directly into the systems we ship. Below are the questions we are working on this year."
      />

      <Container className="py-20 sm:py-28">
        <ul className="grid gap-6 md:grid-cols-2">
          {researchAreas.map((area, idx) => (
            <FadeIn
              key={area.title}
              delay={idx * 0.05}
              className="h-full"
            >
              <li className="group h-full rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-10 transition-all duration-300 ease-[var(--ease-subtle)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]">
                <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[var(--color-primary)]">
                  {area.title}
                </h2>
                <p className="mt-4 text-[var(--color-muted-foreground)] text-pretty">
                  {area.summary}
                </p>
                <p className="mt-6 text-sm text-[var(--color-muted-foreground)]/80">
                  {area.body}
                </p>
              </li>
            </FadeIn>
          ))}
        </ul>
      </Container>
    </>
  );
}
