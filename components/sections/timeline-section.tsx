import { timeline } from "@/lib/timeline";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/fade-in";
import { SlideIn } from "@/components/motion/slide-in";

/**
 * Vertical timeline rendered as a single rail on the left, with cards
 * on the right. Animates into view one entry at a time.
 */
export function TimelineSection() {
  return (
    <section id="timeline" className="py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="max-w-3xl">
          <SlideIn>
            <p className="eyebrow">Trajectory</p>
          </SlideIn>
          <SlideIn delay={0.05} y={10}>
            <h2 className="display-2 mt-4">
              A career written in systems.
            </h2>
          </SlideIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 text-[var(--color-muted-foreground)] text-pretty">
              The studio is built on three decades inside the rooms where
              enterprise IT is actually operated. Each step informed the
              one after it.
            </p>
          </FadeIn>
        </div>

        <ol className="relative mt-20 space-y-12 border-l border-[var(--color-border)] pl-8 sm:pl-12">
          {timeline.map((entry, idx) => (
            <FadeIn key={entry.title} delay={idx * 0.05} y={10}>
              <li className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[2.06rem] top-2 flex size-4 items-center justify-center sm:-left-[3.06rem]"
                >
                  <span className="absolute size-4 rounded-full bg-[var(--color-surface)] ring-1 ring-[var(--color-border)]" />
                  <span className="size-1.5 rounded-full bg-[var(--color-accent)]" />
                </span>

                <div className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-10">
                  <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-muted-foreground)]">
                    {entry.period}
                  </p>
                  <div>
                    <h3 className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-primary)] sm:text-2xl">
                      {entry.title}
                    </h3>
                    <p className="mt-3 max-w-prose text-[var(--color-muted-foreground)] text-pretty">
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
