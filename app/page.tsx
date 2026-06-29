import { Hero } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ResearchSection } from "@/components/sections/research-section";
import { AboutSection } from "@/components/sections/about-section";
import { TimelineSection } from "@/components/sections/timeline-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { ContactSection } from "@/components/sections/contact-section";

/**
 * Home — single-page marketing surface composed of vertically stacked
 * sections. Each section is a Server Component, with motion lifted into
 * small client islands (FadeIn/SlideIn/Parallax) so the page stays
 * performant and crawlable.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <ResearchSection />
      <AboutSection />
      <TimelineSection />
      <PhilosophySection />
      <ContactSection />
    </>
  );
}
