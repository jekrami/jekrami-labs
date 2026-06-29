import { philosophy } from "@/lib/philosophy";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/fade-in";
import { SlideIn } from "@/components/motion/slide-in";

/**
 * Four pillars of the studio. Rendered as 2x2 grid; each card carries an
 * icon, a short title, and a description — kept compact so the rhythm
 * reads as one composition rather than four tiles.
 */
export function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="border-t border-[var(--color-border)] bg-[var(--color-muted)]/40 py-24 sm:py-32 lg:py-40"
    >
      <Container>
        <div className="max-w-3xl">
          <SlideIn>
            <p className="eyebrow">Philosophy</p>
          </SlideIn>
          <SlideIn delay={0.05} y={10}>
            <h2 className="display-2 mt-4">What we work to.</h2>
          </SlideIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 text-[var(--color-muted-foreground)] text-pretty">
              Four principles guide every project, every research thread,
              every customer conversation. They are written down so they
              can be held to.
            </p>
          </FadeIn>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-2">
          {philosophy.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <FadeIn
                key={pillar.title}
                delay={idx * 0.06}
                className="bg-[var(--color-surface)]"
              >
                <article className="flex h-full flex-col gap-6 p-8 sm:p-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-muted)] text-[var(--color-primary)]">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-primary)] sm:text-2xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 max-w-prose text-[var(--color-muted-foreground)] text-pretty">
                      {pillar.description}
                    </p>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
