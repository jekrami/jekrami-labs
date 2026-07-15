"use client";

import { ArrowRight } from "lucide-react";

import { projects } from "@/lib/projects";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { SlideIn } from "@/components/motion/slide-in";
import { ProjectCard } from "@/components/project-card";
import { useDictionary } from "@/components/locale-provider";
import { LocaleLink as Link } from "@/components/locale-link";

/**
 * Homepage projects section. Renders the three flagship projects
 * in a single column on mobile, three columns from md+.
 */
export function ProjectsSection() {
  const dict = useDictionary();

  return (
    <section id="projects" className="py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_2fr] lg:gap-16">
          <div className="max-w-md">
            <SlideIn>
              <p className="eyebrow">{dict.projectsSection.eyebrow}</p>
            </SlideIn>
            <SlideIn delay={0.05} y={10}>
              <h2 className="display-2 mt-4">{dict.projectsSection.title}</h2>
            </SlideIn>
            <FadeIn delay={0.15}>
              <p className="mt-6 text-pretty text-[var(--color-muted-foreground)]">
                {dict.projectsSection.description}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="mt-8">
                <Button asChild variant="ghost" size="sm" className="group px-0">
                  <Link href="/projects" className="text-sm font-medium">
                    {dict.projectsSection.viewAll}
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
              {projects.slice(0, 2).map((project, idx) => (
                <ProjectCard key={project.slug} project={project} index={idx} />
              ))}
            </div>
            {projects[2] && (
              <div className="grid gap-6 md:grid-cols-1">
                <ProjectCard project={projects[2]} index={2} />
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
