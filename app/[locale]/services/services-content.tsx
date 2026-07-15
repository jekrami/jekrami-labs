"use client";

import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { FadeIn } from "@/components/motion/fade-in";
import { SlideIn } from "@/components/motion/slide-in";
import { useDictionary } from "@/components/locale-provider";
import { LocaleLink as Link } from "@/components/locale-link";

/**
 * Services page body — client so every string resolves through the active
 * locale. The route's page.tsx stays server-side for metadata.
 */
export function ServicesContent() {
  const dict = useDictionary();
  const t = dict.servicesPage;

  return (
    <>
      <PageHeader
        eyebrow={t.header.eyebrow}
        title={t.header.title}
        description={t.header.description}
      />

      <Container className="py-16 sm:py-20">
        <FadeIn>
          <div className="max-w-3xl space-y-6 text-lg text-pretty text-[var(--color-muted-foreground)]">
            {t.intro.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <ol className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-border)]">
            {t.services.map((service, idx) => (
              <li key={service.title} className="bg-[var(--color-surface)]">
                <div className="grid gap-6 p-8 sm:p-10 lg:grid-cols-[auto_1.2fr_1.6fr] lg:gap-10">
                  <span
                    className="font-[var(--font-heading)] text-sm font-semibold text-[var(--color-muted-foreground)]"
                    aria-hidden
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-xl font-[var(--font-heading)] font-semibold text-[var(--color-primary)] sm:text-2xl">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-sm text-[var(--color-muted-foreground)]">
                      <span className="text-xs font-medium tracking-[0.08em] uppercase">
                        {t.audienceLabel}
                      </span>
                      <span className="mt-1 block">{service.audience}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-base text-pretty text-[var(--color-foreground)]">
                      {service.body}
                    </p>
                    <p className="mt-4 inline-flex rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-medium text-[var(--color-muted-foreground)]">
                      {service.meta}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </FadeIn>
      </Container>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-muted)]/40">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            <div>
              <SlideIn>
                <h2 className="text-2xl font-[var(--font-heading)] font-semibold text-[var(--color-primary)] sm:text-3xl">
                  {t.processTitle}
                </h2>
              </SlideIn>
              <div className="mt-8 grid gap-8 sm:grid-cols-3">
                {t.processSteps.map((step, idx) => (
                  <FadeIn key={step.title} delay={0.05 * (idx + 1)}>
                    <div>
                      <span
                        className="font-[var(--font-heading)] text-sm font-semibold text-[var(--color-muted-foreground)]"
                        aria-hidden
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-2 font-medium text-[var(--color-primary)]">{step.title}</h3>
                      <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
                        {step.body}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            <aside>
              <FadeIn delay={0.1}>
                <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
                  <p className="eyebrow">{t.whyTitle}</p>
                  <ul className="mt-4 space-y-3 text-sm text-[var(--color-foreground)]">
                    {t.whyItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </aside>
          </div>
        </Container>
      </section>

      <Container className="py-20 sm:py-28">
        <FadeIn>
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-muted)]/40 p-10 text-center sm:p-14">
            <p className="eyebrow">{t.cta.eyebrow}</p>
            <h2 className="display-2 mt-4">{t.cta.title}</h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-[var(--color-muted-foreground)]">
              {t.cta.body}
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-[var(--color-primary-foreground)] transition-colors hover:bg-[var(--color-primary-hover)]"
              >
                {t.cta.button}
              </Link>
            </div>
          </div>
        </FadeIn>
      </Container>
    </>
  );
}
