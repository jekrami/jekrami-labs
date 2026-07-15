import type { Metadata } from "next";

import { ProjectsContent } from "./projects-content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "The systems Ekrami Labs is building — enterprise legal AI, AI security operations, and passive urban air intelligence.",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
