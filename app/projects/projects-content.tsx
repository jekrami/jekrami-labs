"use client";

import { projects } from "@/lib/projects";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ProjectCard } from "@/components/project-card";
import { FadeIn } from "@/components/motion/fade-in";
import { useDictionary } from "@/components/locale-provider";

/**
 * Projects index body — client so every string resolves through the
 * active locale. The route's page.tsx stays server-side for metadata.
 */
export function ProjectsContent() {
  const dict = useDictionary();
  const t = dict.projectsPage;

  return (
    <>
      <PageHeader
        eyebrow={t.header.eyebrow}
        title={t.header.title}
        description={t.header.description}
      />

      <Container className="py-20 sm:py-28">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <ProjectCard key={project.slug} project={project} index={idx} />
          ))}
        </div>

        <FadeIn delay={0.1}>
          <div className="mt-20 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-muted)]/40 p-10 text-center sm:p-14">
            <p className="eyebrow">{t.engagements.eyebrow}</p>
            <h2 className="display-2 mt-4">{t.engagements.title}</h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-[var(--color-muted-foreground)]">
              {t.engagements.body}
            </p>
            <div className="mt-10">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-[var(--color-primary-foreground)] transition-colors hover:bg-[var(--color-primary-hover)]"
              >
                {t.engagements.cta}
              </a>
            </div>
          </div>
        </FadeIn>
      </Container>
    </>
  );
}
