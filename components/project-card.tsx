import type { Project } from "@/lib/projects";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InlineLink } from "@/components/ui/inline-link";
import { FadeIn } from "@/components/motion/fade-in";

const statusLabel: Record<Project["status"], string> = {
  shipped: "Shipped",
  "in-development": "In Development",
  "in-research": "In Research",
};

const statusTone: Record<Project["status"], "neutral" | "accent" | "primary"> = {
  shipped: "accent",
  "in-development": "primary",
  "in-research": "neutral",
};

/**
 * Project card. Image slot is deliberately abstract — a quiet diagram
 * rendered in CSS rather than a stock product screenshot.
 */
export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <FadeIn delay={index * 0.05} y={16}>
      <Card interactive className="flex h-full flex-col">
        <ProjectVisual slug={project.slug} />

        <div className="mt-8 flex flex-1 flex-col">
          <div className="flex items-center justify-between gap-3">
            <p className="eyebrow">{project.tagline}</p>
            <Badge tone={statusTone[project.status]}>{statusLabel[project.status]}</Badge>
          </div>

          <h3 className="mt-3 text-2xl font-[var(--font-heading)] font-semibold text-[var(--color-primary)] sm:text-3xl">
            {project.name}
          </h3>

          <p className="mt-3 max-w-prose text-pretty text-[var(--color-muted-foreground)]">
            {project.summary}
          </p>

          <ul className="mt-6 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <li key={tech}>
                <Badge tone="outline">{tech}</Badge>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <InlineLink href={`/projects/${project.slug}`}>
              Read more
            </InlineLink>
          </div>
        </div>
      </Card>
    </FadeIn>
  );
}

/**
 * Abstract, restrained visual that hints at each project's domain.
 * No gradients, no glow. Stroke-only diagrams on a soft tinted background.
 */
function ProjectVisual({ slug }: { slug: string }) {
  if (slug === "ravin") return <LegalVisual />;
  if (slug === "ao-soc") return <SocVisual />;
  return <AirVisual />;
}

function VisualFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-muted)]">
      <div className="aspect-[16/9] w-full">
        <svg
          viewBox="0 0 480 270"
          xmlns="http://www.w3.org/2000/svg"
          className="size-full"
          aria-hidden
        >
          {children}
        </svg>
      </div>
    </div>
  );
}

function LegalVisual() {
  return (
    <VisualFrame>
      {/* Document stack */}
      <rect x="86" y="40" width="220" height="180" rx="10" fill="#ffffff" stroke="#0B2545" strokeOpacity="0.18" />
      <rect x="102" y="56" width="190" height="160" rx="8" fill="#ffffff" stroke="#0B2545" strokeOpacity="0.18" />
      <rect x="118" y="72" width="160" height="130" rx="6" fill="#F6F7F9" stroke="#0B2545" strokeOpacity="0.18" />
      <line x1="130" y1="92" x2="266" y2="92" stroke="#0B2545" strokeOpacity="0.5" strokeWidth="1.2" />
      <line x1="130" y1="110" x2="240" y2="110" stroke="#0B2545" strokeOpacity="0.25" strokeWidth="1" />
      <line x1="130" y1="124" x2="252" y2="124" stroke="#0B2545" strokeOpacity="0.25" strokeWidth="1" />
      <line x1="130" y1="138" x2="220" y2="138" stroke="#0B2545" strokeOpacity="0.25" strokeWidth="1" />
      {/* Highlighted clause */}
      <rect x="126" y="148" width="148" height="14" rx="3" fill="#0077B6" fillOpacity="0.18" />
      <line x1="130" y1="155" x2="270" y2="155" stroke="#0077B6" strokeWidth="1.3" />
      <line x1="130" y1="175" x2="246" y2="175" stroke="#0B2545" strokeOpacity="0.25" strokeWidth="1" />
      {/* Citation pull */}
      <circle cx="380" cy="86" r="22" fill="#0077B6" />
      <path d="M372 92l5 5 11-11" stroke="#ffffff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </VisualFrame>
  );
}

function SocVisual() {
  return (
    <VisualFrame>
      {/* Network graph */}
      <g stroke="#0B2545" strokeOpacity="0.22" strokeWidth="1">
        <line x1="80" y1="80" x2="200" y2="60" />
        <line x1="80" y1="80" x2="200" y2="140" />
        <line x1="200" y1="60" x2="320" y2="100" />
        <line x1="200" y1="140" x2="320" y2="100" />
        <line x1="320" y1="100" x2="420" y2="80" />
        <line x1="320" y1="100" x2="420" y2="170" />
        <line x1="200" y1="60" x2="200" y2="140" />
      </g>
      <g>
        <circle cx="80" cy="80" r="6" fill="#0B2545" />
        <circle cx="200" cy="60" r="9" fill="#ffffff" stroke="#0B2545" strokeWidth="1.4" />
        <circle cx="200" cy="140" r="6" fill="#0B2545" />
        <circle cx="320" cy="100" r="14" fill="#0077B6" />
        <circle cx="420" cy="80" r="6" fill="#0B2545" />
        <circle cx="420" cy="170" r="6" fill="#0B2545" />
      </g>
      {/* Active alert */}
      <g>
        <rect x="282" y="174" width="116" height="56" rx="8" fill="#ffffff" stroke="#0077B6" strokeOpacity="0.4" />
        <circle cx="296" cy="188" r="3" fill="#0077B6" />
        <line x1="306" y1="188" x2="380" y2="188" stroke="#0B2545" strokeOpacity="0.4" strokeWidth="1" />
        <line x1="296" y1="202" x2="360" y2="202" stroke="#0B2545" strokeOpacity="0.2" strokeWidth="1" />
        <line x1="296" y1="216" x2="344" y2="216" stroke="#0B2545" strokeOpacity="0.2" strokeWidth="1" />
      </g>
    </VisualFrame>
  );
}

function AirVisual() {
  return (
    <VisualFrame>
      {/* Concentric circles, air sensing map */}
      <g fill="none" stroke="#0B2545" strokeOpacity="0.3">
        <circle cx="240" cy="135" r="40" />
        <circle cx="240" cy="135" r="80" />
        <circle cx="240" cy="135" r="120" />
      </g>
      {/* Sensor nodes */}
      <g>
        <circle cx="240" cy="135" r="5" fill="#0077B6" />
        <circle cx="172" cy="100" r="4" fill="#0B2545" />
        <circle cx="298" cy="92" r="4" fill="#0B2545" />
        <circle cx="178" cy="200" r="4" fill="#0B2545" />
        <circle cx="320" cy="196" r="4" fill="#0B2545" />
        <circle cx="372" cy="135" r="4" fill="#0B2545" />
      </g>
      {/* Quality band */}
      <path
        d="M120 200 Q 200 160, 280 188 T 400 168"
        stroke="#0077B6"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M120 220 Q 200 200, 280 218 T 400 210"
        stroke="#0B2545"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </VisualFrame>
  );
}
