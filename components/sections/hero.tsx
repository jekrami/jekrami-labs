import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { SlideIn } from "@/components/motion/slide-in";
import { Parallax } from "@/components/motion/parallax";

/**
 * Hero — the homepage introduction. Composition:
 *  - Eyebrow chip
 *  - Display headline ("Engineering Trustworthy AI Systems")
 *  - Subline with structured topic chips
 *  - Quiet CTA row
 *  - Background plate that subtly parallaxes on scroll
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle backing layer — no gradients, no glow, just a faint hairline grid. */}
      <Parallax
        offset={20}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(11, 37, 69, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(11, 37, 69, 0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(circle at 50% 30%, black 0%, black 30%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 30%, black 0%, black 30%, transparent 70%)",
          }}
        />
      </Parallax>

      <Container>
        <div className="flex min-h-[78dvh] flex-col justify-center py-32 sm:py-40 lg:py-48">
          <FadeIn>
            <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/70 px-3 py-1.5 backdrop-blur">
              <span className="relative flex size-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-accent)] opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-[var(--color-accent)]" />
              </span>
              Now researching enterprise AI
            </span>
          </FadeIn>

          <SlideIn delay={0.05} y={16}>
            <h1 className="display-1 mt-8 max-w-4xl text-balance">
              Engineering Trustworthy AI Systems.
            </h1>
          </SlideIn>

          <SlideIn delay={0.15} y={12}>
            <p className="mt-8 max-w-2xl text-lg text-[var(--color-muted-foreground)] sm:text-xl">
              JEKRAMI Labs is an independent AI Research &amp; Engineering Studio.
              We design intelligent systems for enterprises that are serious
              about{" "}
              <span className="text-[var(--color-primary)]">uptime</span>,{" "}
              <span className="text-[var(--color-primary)]">auditability</span>,
              and{" "}
              <span className="text-[var(--color-primary)]">outcomes</span>.
            </p>
          </SlideIn>

          <FadeIn delay={0.25}>
            <div className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" variant="primary">
                <Link href="/projects">
                  Explore Projects
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/research">Read the research</Link>
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.35}>
            <ul className="mt-16 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[var(--color-muted-foreground)]">
              <li className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-[var(--color-accent)]" />
                Enterprise AI
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-[var(--color-accent)]" />
                Cybersecurity
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-[var(--color-accent)]" />
                Intelligent Systems
              </li>
            </ul>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
