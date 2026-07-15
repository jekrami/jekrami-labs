"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";

import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { useDictionary } from "@/components/locale-provider";
import { LocaleLink as Link } from "@/components/locale-link";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
});

/**
 * Hero — the homepage introduction. Composition:
 *  - Eyebrow chip
 *  - Display headline, revealed word by word on load
 *  - Subline, CTA row, topic chips
 *  - A three.js "system map" behind everything: a stable lattice with
 *    telemetry pulses. The 2D hairline grid beneath it doubles as the
 *    no-WebGL fallback.
 * The intro is one orchestrated GSAP timeline; scrolling out of the hero
 * scrubs the scene away. Both collapse under prefers-reduced-motion.
 */
export function Hero() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const dict = useDictionary();

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });
      timeline
        .from("[data-hero-eyebrow]", { y: 10, autoAlpha: 0, duration: 0.6 })
        .from(
          "[data-hero-word]",
          { yPercent: 60, autoAlpha: 0, duration: 0.9, stagger: 0.09 },
          0.15,
        )
        .from("[data-hero-subline]", { y: 14, autoAlpha: 0, duration: 0.7 }, 0.7)
        .from("[data-hero-cta]", { y: 12, autoAlpha: 0, duration: 0.6 }, 0.9)
        .from("[data-hero-chip]", { y: 8, autoAlpha: 0, duration: 0.5, stagger: 0.07 }, 1.05);

      // Scrub the scene and content apart as the hero leaves the viewport.
      gsap.to("[data-hero-backdrop]", {
        yPercent: 18,
        autoAlpha: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to("[data-hero-content]", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div data-hero-backdrop aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Base layer: the hairline grid. Doubles as the no-WebGL fallback. */}
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklch, var(--color-primary) 5%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--color-primary) 5%, transparent) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(circle at 50% 30%, black 0%, black 30%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 30%, black 0%, black 30%, transparent 70%)",
          }}
        />
        {/* The system map. Masked so it dissolves quietly at the edges. */}
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              "radial-gradient(ellipse 90% 70% at 50% 45%, black 0%, black 45%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 70% at 50% 45%, black 0%, black 45%, transparent 85%)",
          }}
        >
          <HeroScene className="absolute inset-0" />
        </div>
      </div>

      <Container>
        <div
          data-hero-content
          className="flex min-h-[78dvh] flex-col justify-center py-32 sm:py-40 lg:py-48"
        >
          <div data-hero-eyebrow>
            <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/70 px-3 py-1.5 backdrop-blur">
              <span className="relative flex size-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-accent)] opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-[var(--color-accent)]" />
              </span>
              {dict.hero.eyebrow}
            </span>
          </div>

          <h1 className="display-1 mt-8 max-w-4xl text-balance">
            {dict.hero.words.map((word) => (
              <React.Fragment key={word}>
                <span className="-mb-[0.08em] inline-block overflow-hidden pb-[0.08em] align-top">
                  <span data-hero-word className="inline-block">
                    {word}
                  </span>
                </span>{" "}
              </React.Fragment>
            ))}
          </h1>

          <p
            data-hero-subline
            className="mt-8 max-w-2xl text-lg text-[var(--color-muted-foreground)] sm:text-xl"
          >
            {dict.hero.subline.map((segment, idx) =>
              segment.highlight ? (
                <span key={idx} className="text-[var(--color-primary)]">
                  {segment.text}
                </span>
              ) : (
                <React.Fragment key={idx}>{segment.text}</React.Fragment>
              ),
            )}
          </p>

          <div
            data-hero-cta
            className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
          >
            <Magnetic>
              <Button asChild size="lg" variant="primary">
                <Link href="/projects">
                  {dict.hero.exploreProjects}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Magnetic>
            <Button asChild size="lg" variant="outline">
              <Link href="/research">{dict.hero.readResearch}</Link>
            </Button>
          </div>

          <ul className="mt-16 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[var(--color-muted-foreground)]">
            {dict.hero.chips.map((topic) => (
              <li key={topic} data-hero-chip className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-[var(--color-accent)]" />
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
