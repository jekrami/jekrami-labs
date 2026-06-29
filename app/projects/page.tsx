import type { Metadata } from "next";

import { projects } from "@/lib/projects";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ProjectCard } from "@/components/project-card";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "The systems JEKRAMI Labs is building — enterprise legal AI, AI security operations, and passive urban air intelligence.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Systems shipped, or close to it."
        description="A small portfolio of projects we are actively developing or researching. Each one is designed to be the kind of system we would defend in front of a regulated industry."
      />

      <Container className="py-20 sm:py-28">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <ProjectCard key={project.slug} project={project} index={idx} />
          ))}
        </div>

        <FadeIn delay={0.1}>
          <div className="mt-20 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-muted)]/40 p-10 text-center sm:p-14">
            <p className="eyebrow">Engagements</p>
            <h2 className="display-2 mt-4">
              Have a problem worth our calendar?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[var(--color-muted-foreground)] text-pretty">
              We take on a small number of engagements at a time. Each starts
              with a conversation, not a contract.
            </p>
            <div className="mt-10">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-[var(--color-primary-foreground)] transition-colors hover:bg-[var(--color-primary-hover)]"
              >
                Start a conversation
              </a>
            </div>
          </div>
        </FadeIn>
      </Container>
    </>
  );
}
