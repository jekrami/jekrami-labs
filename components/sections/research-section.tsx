import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { researchAreas } from "@/lib/research";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/fade-in";
import { SlideIn } from "@/components/motion/slide-in";

/**
 * Research areas presented as a long reading list, not a tile grid.
 * The form mirrors the cadence of academic indexes and OpenAI/Anthropic
 * research pages — quiet, generous, scannable.
 */
export function ResearchSection() {
  return (
    <section id="research" className="border-t border-[var(--color-border)] py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div className="max-w-md">
            <SlideIn>
              <p className="eyebrow">Research</p>
            </SlideIn>
            <SlideIn delay={0.05} y={10}>
              <h2 className="display-2 mt-4">
                Where the thinking lives.
              </h2>
            </SlideIn>
            <FadeIn delay={0.15}>
              <p className="mt-6 text-[var(--color-muted-foreground)] text-pretty">
                We maintain long-running research threads that feed directly
                into the systems we ship. Below are the questions we are
                working on this year.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Link
                href="/articles"
                className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)]"
              >
                Read the research notes
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </FadeIn>
          </div>

          <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {researchAreas.map((area, idx) => (
              <FadeIn key={area.title} delay={idx * 0.04}>
                <li className="grid gap-3 py-7 sm:grid-cols-[0.5fr_1fr] sm:gap-10 sm:py-9">
                  <div>
                    <span className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-muted-foreground)]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-primary)] sm:text-2xl">
                      {area.title}
                    </h3>
                    <p className="mt-2 text-[var(--color-muted-foreground)] text-pretty">
                      {area.summary}
                    </p>
                    <p className="mt-3 text-sm text-[var(--color-muted-foreground)]/80">
                      {area.body}
                    </p>
                  </div>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
