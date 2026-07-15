"use client";

import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { InlineLink } from "@/components/ui/inline-link";
import { FadeIn } from "@/components/motion/fade-in";
import { useLocale } from "@/components/locale-provider";
import { TimelineSection } from "@/components/sections/timeline-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";

/**
 * About page body — client so every string resolves through the active
 * locale. The route's page.tsx stays server-side for metadata.
 */
export function AboutContent() {
  const { locale, dict } = useLocale();
  const t = dict.aboutPage;
  const resumeUrl = locale === "fa" ? site.resumeUrlFa : site.resumeUrl;

  return (
    <>
      <PageHeader
        eyebrow={t.header.eyebrow}
        title={t.header.title}
        description={t.header.description}
      />

      <Container className="py-16">
        <div className="grid gap-16 lg:grid-cols-[2fr_1fr]">
          <div className="prose-jekrami">
            {t.proseIntro.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}

            <h2>{t.whyIndependenceTitle}</h2>
            <p>{t.whyIndependenceBody}</p>

            <h2>{t.focusTitle}</h2>
            <p>{t.focusBody}</p>

            <h2>{t.clientsTitle}</h2>
            <p>{t.clientsBody}</p>
          </div>

          <aside className="space-y-6">
            <FadeIn delay={0.1}>
              <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-muted)]/40 p-8">
                <p className="eyebrow">{t.industriesServedTitle}</p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-foreground)]">
                  {t.industriesServed.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-muted)]/40 p-8">
                <p className="eyebrow">{t.principlesTitle}</p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-foreground)]">
                  {t.principles.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-muted)]/40 p-8">
                <p className="eyebrow">{t.credentialsTitle}</p>
                <p className="mt-4 text-sm text-[var(--color-muted-foreground)]">
                  {t.credentialsBody}
                </p>
                <InlineLink href={resumeUrl} internal={false} className="mt-4" download>
                  {dict.common.downloadCV}
                </InlineLink>
              </div>
            </FadeIn>
          </aside>
        </div>
      </Container>

      <TimelineSection />
      <CertificationsSection />
      <PhilosophySection />
    </>
  );
}
