"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

import type { Project } from "@/lib/projects";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { SlideIn } from "@/components/motion/slide-in";
import { useDictionary } from "@/components/locale-provider";

/**
 * Project detail body — client so every string resolves through the
 * active locale. The route's page.tsx stays server-side for metadata
 * and generateStaticParams; the project is passed down as a plain prop.
 */
export function ProjectDetailContent({ project }: { project: Project }) {
  const dict = useDictionary();
  const t = dict.projectDetail;
  const copy = dict.projectOverrides[project.slug];
  const statusLabel = dict.common.statusLabels[project.status];

  return (
    <Container>
      <div className="pt-12 sm:pt-16">
        <FadeIn>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1.5 text-sm text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-primary)]"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            {t.back}
          </Link>
        </FadeIn>
      </div>

      <article className="pt-16 pb-20 sm:pt-20 sm:pb-28">
        <SlideIn>
          <p className="eyebrow">{copy?.tagline ?? project.tagline}</p>
        </SlideIn>

        <SlideIn delay={0.05} y={12}>
          <h1 className="display-1 mt-6 max-w-4xl">{project.name}</h1>
        </SlideIn>

        <FadeIn delay={0.15}>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-pretty text-[var(--color-muted-foreground)]">
            {copy?.summary ?? project.summary}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Badge tone="primary">{statusLabel}</Badge>
            <Badge tone="outline">{project.year}</Badge>
            {project.domains.map((domain) => (
              <Badge key={domain} tone="neutral">
                {domain}
              </Badge>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="mt-20 grid gap-12 lg:grid-cols-[2fr_1fr]">
            <div className="prose-jekrami">
              <p>{copy?.description ?? project.description}</p>

              {project.relatedArticle && (
                <p>
                  <Link href={`/articles/${project.relatedArticle}`}>
                    Read the full research paper →
                  </Link>
                </p>
              )}

              <h2>{t.exploringTitle}</h2>
              <p>{t.exploringBody}</p>

              <h2>{t.mattersTitle}</h2>
              <p>{t.mattersBody}</p>

              {project.slides && project.slides.length > 0 && (
                <>
                  <h2>{t.slidesTitle}</h2>
                  <div className="not-prose mt-8 space-y-10">
                    {project.slides.map((slide) => (
                      <figure
                        key={slide.src}
                        className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)]"
                      >
                        <Image
                          src={slide.src}
                          alt={slide.alt}
                          width={1920}
                          height={1080}
                          className="h-auto w-full"
                        />
                        <figcaption className="border-t border-[var(--color-border)] px-6 py-4 text-sm text-[var(--color-muted-foreground)]">
                          {slide.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
                <p className="eyebrow">{t.statusTitle}</p>
                <p className="mt-3 text-base text-[var(--color-primary)]">{statusLabel}</p>
              </div>
              <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
                <p className="eyebrow">{t.stackTitle}</p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-foreground)]" dir="ltr">
                  {project.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
                <p className="eyebrow">{t.domainsTitle}</p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-foreground)]" dir="ltr">
                  {project.domains.map((domain) => (
                    <li key={domain}>{domain}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </FadeIn>
      </article>
    </Container>
  );
}
