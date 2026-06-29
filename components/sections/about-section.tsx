import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { SlideIn } from "@/components/motion/slide-in";

/**
 * About — the engineering story, told as a story (not a CV).
 * Avoids the "retired / freelancer / tech enthusiast" phrasing and
 * emphasises the institutional contexts the work emerged from.
 */
export function AboutSection() {
  return (
    <section id="about" className="border-t border-[var(--color-border)] bg-[var(--color-muted)]/40 py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div className="max-w-3xl">
            <SlideIn>
              <p className="eyebrow">About</p>
            </SlideIn>
            <SlideIn delay={0.05} y={10}>
              <h2 className="display-2 mt-4">
                The studio behind the work.
              </h2>
            </SlideIn>

            <FadeIn delay={0.1}>
              <p className="mt-10 text-lg leading-relaxed text-[var(--color-foreground)] text-pretty sm:text-xl">
                JEKRAMI Labs is the work of an engineer who spent thirty years
                inside the systems enterprises actually run — not the systems
                they demo. Oil &amp; gas platforms. Hospital networks.
                Manufacturing lines. Telecommunications core. The unglamorous
                places where technology either keeps the operation running or
                becomes the cause of the incident report.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted-foreground)] text-pretty">
                That career produces a particular kind of instinct. It treats
                AI the way a control-room engineer treats a new instrument —
                with curiosity, caution, and the understanding that a model
                which cannot explain itself is a liability rather than an
                asset.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted-foreground)] text-pretty">
                JEKRAMI Labs exists to build enterprise AI for environments
                where auditability is not optional, where downtime is a board
                conversation, and where the contract is as serious as the
                model. The studio is independent on purpose. Independence is
                what lets the work stay loyal to engineering rather than to a
                product narrative.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted-foreground)] text-pretty">
                Today the studio pairs that institutional experience with
                current research in retrieval, agentic systems, and
                operational AI. The output is small, deliberate, and built
                to last a quarter — not a launch cycle.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Button asChild variant="outline" size="md">
                  <Link href="/about" className="group">
                    Read the full story
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>

          <aside className="space-y-6">
            <FadeIn delay={0.1}>
              <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
                <p className="eyebrow">Focus</p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-foreground)]">
                  <li>Enterprise AI architecture</li>
                  <li>Auditability and governance</li>
                  <li>Retrieval-augmented systems</li>
                  <li>Bounded agentic workflows</li>
                  <li>Cybersecurity AI co-pilots</li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
                <p className="eyebrow">Industries</p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-foreground)]">
                  <li>Oil &amp; Gas</li>
                  <li>Healthcare</li>
                  <li>Manufacturing</li>
                  <li>Telecommunications</li>
                  <li>Public Sector</li>
                </ul>
              </div>
            </FadeIn>
          </aside>
        </div>
      </Container>
    </section>
  );
}
