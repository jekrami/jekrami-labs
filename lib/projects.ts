/**
 * Project metadata for the /projects surface and the homepage grid.
 * Detail bodies live in dedicated MDX files so the marketing copy and
 * the long-form case-study content can evolve independently.
 */
export type ProjectStatus = "shipped" | "in-research" | "in-development";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  description: string;
  status: ProjectStatus;
  /** Stack rendered as text badges on the project card and detail page. */
  technologies: readonly string[];
  /** Industries served — used for filter chips and structured data. */
  domains: readonly string[];
  /** Public-facing URL, if any. */
  href?: string;
  /** Year of release / current milestone. */
  year: number;
}

export const projects: readonly Project[] = [
  {
    slug: "ravin",
    name: "Ravin",
    tagline: "Enterprise Legal AI",
    summary:
      "A contract intelligence platform that turns dense legal corpora into verifiable, citation-grounded answers.",
    description:
      "Ravin ingests multilingual contract repositories, normalises them against the firm's review playbook, and exposes a citation-grounded question-answering surface for legal operations. Every answer can be traced back to the exact clause it came from — a property we treat as non-negotiable for legal-grade systems.",
    status: "in-development",
    technologies: ["Next.js", "TypeScript", "Python", "pgvector", "LangGraph", "Azure OpenAI"],
    domains: ["Legal", "Enterprise AI", "RAG"],
    year: 2026,
  },
  {
    slug: "ao-soc",
    name: "AO-SOC",
    tagline: "AI Security Operations Center",
    summary:
      "An autonomous SOC analyst that triages, investigates, and documents alerts while a human stays in the loop.",
    description:
      "AO-SOC is a security operations co-pilot. It ingests SIEM and EDR telemetry, clusters related alerts into incidents, drafts an investigation timeline, and writes a structured incident summary ready for the on-call engineer. We design it as a transparent system: every action it suggests is explainable, every conclusion is auditable.",
    status: "in-research",
    technologies: ["Python", "FastAPI", "PostgreSQL", "OpenTelemetry", "Agentic Workflows"],
    domains: ["Cybersecurity", "Agentic AI", "Enterprise AI"],
    year: 2026,
  },
  {
    slug: "air-to-live",
    name: "Air to Live",
    tagline: "Passive Urban Air Purification",
    summary:
      "A research-stage platform that turns environmental telemetry into actionable urban planning decisions.",
    description:
      "Air to Live explores how distributed low-cost sensors, edge inference, and public-health data can be composed into a usable decision surface for municipal teams. The goal is not another dashboard — it is a quiet, reliable background signal that informs policy without becoming a theatre of graphs.",
    status: "in-research",
    technologies: ["IoT", "Edge Inference", "Time-Series DB", "Grafana"],
    domains: ["Public Sector", "Sustainability", "Edge AI"],
    year: 2026,
  },
  {
    slug: "forensic-intelligence-engine",
    name: "Forensic Intelligence Engine",
    tagline: "Automated Digital Forensics",
    summary:
      "An evidence analysis system that ingests large heterogeneous corpora and produces structured forensic intelligence reports with minimal manual review.",
    description:
      "The Forensic Intelligence Engine processes documents, images, spreadsheets, and multimedia at scale — extracting entities, metadata, and visual signals across dozens of formats. Configurable filtering, duplicate detection, and multilingual OCR let investigators concentrate on pattern and relationship analysis rather than file triage.",
    status: "in-development",
    technologies: ["Python", "FastAPI", "Computer Vision", "OCR", "Multimodal AI", "PostgreSQL"],
    domains: ["Digital Forensics", "Enterprise AI", "Financial Crime"],
    year: 2026,
  },
  {
    slug: "domain-adaptive-legal-ai",
    name: "Enterprise Domain-Adaptive Legal AI Platform",
    tagline: "On-Premise Legal AI Ecosystem",
    summary:
      "A fully on-premise platform for understanding, generating, and comparing legal documents — domain-independent at the core, with swappable knowledge packs for regulated industries.",
    description:
      "This platform is built as an extensible legal AI ecosystem that runs entirely on customer infrastructure — not a single-purpose contract analyzer. The core engine handles document understanding, generation, comparison, and lifecycle management once; knowledge packs plug in without architectural changes. The first pack targets Iranian Oil & Gas contracts and regulations, with banking, insurance, construction, labor law, and procurement planned on the same foundation.",
    status: "in-development",
    technologies: ["Python", "FastAPI", "PostgreSQL", "pgvector", "LangGraph", "On-Premise LLM"],
    domains: ["Legal", "Enterprise AI", "Oil & Gas"],
    year: 2026,
  },
] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
