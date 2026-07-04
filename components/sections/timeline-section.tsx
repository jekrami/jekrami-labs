"use client";

import * as React from "react";

import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/fade-in";
import { SlideIn } from "@/components/motion/slide-in";
import { useDictionary } from "@/components/locale-provider";

/**
 * Vertical timeline rendered as a single rail on the left, with cards
 * on the right. The accent rail draws itself as the reader scrolls —
 * the career literally traced line by line — and each node lights up
 * as the drawn line passes it.
 */
export function TimelineSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const dict = useDictionary();

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      gsap.fromTo(
        "[data-timeline-rail]",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: "[data-timeline-list]",
            start: "top 70%",
            end: "bottom 55%",
            scrub: 0.4,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-timeline-dot]").forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0.4, opacity: 0.3 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(2.5)",
            scrollTrigger: {
              trigger: dot,
              start: "top 62%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="timeline" ref={sectionRef} className="py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="max-w-3xl">
          <SlideIn>
            <p className="eyebrow">{dict.timelineSection.eyebrow}</p>
          </SlideIn>
          <SlideIn delay={0.05} y={10}>
            <h2 className="display-2 mt-4">{dict.timelineSection.title}</h2>
          </SlideIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 text-pretty text-[var(--color-muted-foreground)]">
              {dict.timelineSection.description}
            </p>
          </FadeIn>
        </div>

        <ol
          data-timeline-list
          className="relative mt-20 space-y-12 border-l border-[var(--color-border)] pl-8 sm:pl-12"
        >
          {/* The drawn rail — scrubbed from 0 to full height on scroll. */}
          <span
            data-timeline-rail
            aria-hidden
            className="absolute top-0 -left-px h-full w-px bg-[var(--color-accent)]"
          />
          {dict.timelineSection.entries.map((entry, idx) => (
            <FadeIn key={entry.title} delay={idx * 0.05} y={10}>
              <li className="relative">
                <span
                  aria-hidden
                  className="absolute top-2 -left-[2.06rem] flex size-4 items-center justify-center sm:-left-[3.06rem]"
                >
                  <span className="absolute size-4 rounded-full bg-[var(--color-surface)] ring-1 ring-[var(--color-border)]" />
                  <span
                    data-timeline-dot
                    className="size-1.5 rounded-full bg-[var(--color-accent)]"
                  />
                </span>

                <div className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-10">
                  <p className="text-xs font-medium tracking-[0.08em] text-[var(--color-muted-foreground)] uppercase">
                    {entry.period}
                  </p>
                  <div>
                    <h3 className="text-xl font-[var(--font-heading)] font-semibold text-[var(--color-primary)] sm:text-2xl">
                      {entry.title}
                    </h3>
                    <p className="mt-3 max-w-prose text-pretty text-[var(--color-muted-foreground)]">
                      {entry.description}
                    </p>
                  </div>
                </div>
              </li>
            </FadeIn>
          ))}
        </ol>
      </Container>
    </section>
  );
}
