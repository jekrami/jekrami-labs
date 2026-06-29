import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { projects, getProject } from "@/lib/projects";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { SlideIn } from "@/components/motion/slide-in";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.name} — ${project.tagline}`,
    description: project.summary,
    openGraph: {
      title: `${project.name} — ${project.tagline}`,
      description: project.summary,
    },
  };
}

const statusLabel = {
  shipped: "Shipped",
  "in-development": "In Development",
  "in-research": "In Research",
} as const;

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <Container>
        <div className="pt-12 sm:pt-16">
          <FadeIn>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 text-sm text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-primary)]"
            >
              <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              All projects
            </Link>
          </FadeIn>
        </div>

        <article className="pb-20 pt-16 sm:pb-28 sm:pt-20">
          <SlideIn>
            <p className="eyebrow">{project.tagline}</p>
          </SlideIn>

          <SlideIn delay={0.05} y={12}>
            <h1 className="display-1 mt-6 max-w-4xl">{project.name}</h1>
          </SlideIn>

          <FadeIn delay={0.15}>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[var(--color-muted-foreground)] text-pretty">
              {project.summary}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <Badge tone="primary">{statusLabel[project.status]}</Badge>
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
                <p>{project.description}</p>

                <h2>What we are exploring</h2>
                <p>
                  The system is shaped by questions we keep returning to in
                  our research notes. Where answers are speculative, the
                  design is conservative; where the answers are mature, we
                  ship against them.
                </p>

                <h2>Why it matters</h2>
                <p>
                  Projects exist to be measured against outcomes, not
                  against a launch narrative. The studio reviews each
                  project against the standard a regulated enterprise
                  would apply to any operational system.
                </p>
              </div>

              <aside className="space-y-6">
                <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
                  <p className="eyebrow">Status</p>
                  <p className="mt-3 text-base text-[var(--color-primary)]">
                    {statusLabel[project.status]}
                  </p>
                </div>
                <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
                  <p className="eyebrow">Stack</p>
                  <ul className="mt-4 space-y-2 text-sm text-[var(--color-foreground)]">
                    {project.technologies.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
                  <p className="eyebrow">Domains</p>
                  <ul className="mt-4 space-y-2 text-sm text-[var(--color-foreground)]">
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
    </>
  );
}
