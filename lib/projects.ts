import { chaosWalkerSlides } from "@/lib/chaoswalker-slides";

/**
 * Project metadata for the /projects surface and the homepage grid.
 * Detail bodies live in dedicated MDX files so the marketing copy and
 * the long-form case-study content can evolve independently.
 */
export type ProjectStatus = "shipped" | "in-research" | "in-development";

export interface ProjectSlide {
  src: string;
  alt: string;
  caption: string;
}

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
  /** Optional presentation slides for research projects. */
  slides?: readonly ProjectSlide[];
  /** Related article slug, if any. */
  relatedArticle?: string;
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
    tagline: "Passive Vortex Air Purification Tower",
    summary:
      "A passive, energy-minimal tower concept that purifies city-scale volumes of air using natural-draft aerodynamics instead of mechanical fans.",
    description:
      "Air to Live adapts the hyperbolic natural-draft cooling towers used in thermal power plants to a different purpose: cleaning urban air. Polluted street-level air is drawn into a spiral vortex chamber, passed through electrostatic precipitation to strip PM2.5, PM10, and other particulates, and exhausted at altitude — driven almost entirely by the chimney effect rather than fans. The open research questions are architectural as much as environmental: what tower geometry sustains the strongest natural draft, how vortex aerodynamics affect filtration residence time, and whether the same shaft could be built into the core of a future high-rise instead of standing alone.",
    status: "in-research",
    technologies: [
      "Computational Fluid Dynamics",
      "Natural-Draft Aerodynamics",
      "Electrostatic Precipitation",
      "Structural Engineering",
    ],
    domains: ["Public Sector", "Sustainability", "Urban Infrastructure"],
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
  {
    slug: "chaoswalker",
    name: "ChaosWalker",
    tagline: "Post-Exhaustion Password Search",
    summary:
      "A post-exhaustion architecture that explores massive password spaces through pseudorandom, non-repeating sampling rather than linear brute force.",
    description:
      "ChaosWalker addresses the moment when dictionary, rule, and mask attacks are exhausted and the remaining keyspace is too large to enumerate. The system divides the password domain into weighted structural partitions, uses Feistel-based permutations for pseudorandom non-repeating traversal within each partition, and combines global sampling with localised heuristic mutations filtered by a Bloom filter. Candidate generation is decoupled from verification — ChaosWalker streams candidates to GPU-optimised engines such as Hashcat through a stdin pipeline.",
    status: "in-research",
    technologies: ["C", "Feistel Networks", "Bloom Filters", "Hashcat", "Systems Architecture"],
    domains: ["Cybersecurity", "Password Security", "Research"],
    slides: chaosWalkerSlides,
    relatedArticle: "chaoswalker-post-exhaustion-architecture",
    year: 2026,
  },
  {
    slug: "cryptotrade",
    name: "CryptoTrade",
    tagline: "AI-Driven Crypto Trading",
    summary:
      "A local-first, AI-driven crypto trading system with deterministic governance and paper trading capabilities.",
    description:
      "CryptoTrade runs three specialised agents — a technical analyst reading indicators and OHLCV data, a fundamental analyst tracking news and market metrics, and a decision agent that weighs their sometimes-conflicting signals into a final verdict — against local LLMs via Ollama, with no cloud dependency. Before any trade executes, a rule-based governance layer enforces portfolio limits and dynamic position sizing, and every strategy is proven first against real market data in a paper-trading wallet before it touches capital.",
    status: "in-development",
    technologies: ["Python", "Ollama", "LLM Agents", "ccxt", "Binance API", "Paper Trading"],
    domains: ["Fintech", "Trading", "Agentic AI"],
    year: 2026,
  },
  {
    slug: "kingraph",
    name: "KinGraph",
    tagline: "Synthetic Community Knowledge Graphs",
    summary:
      "A toolkit for generating synthetic human community datasets with rich, temporally-consistent knowledge graph structures for graph ML and database pipelines.",
    description:
      "KinGraph simulates communities of thousands of people — families, marriages, schools, employers, banks, and friendships — enforcing temporal consistency so children are never born before their parents or a marriage. Each person's simulated life is rendered as a natural-language biography, which an LLM pipeline then converts back into structured subject-relation-object triples, ready to load into Neo4j or feed graph machine learning pipelines. The result is a deterministic, reproducible testbed for knowledge graph extraction and reasoning research.",
    status: "in-research",
    technologies: ["Python", "Ollama", "Neo4j", "Pandas", "Knowledge Graphs", "LLM Extraction"],
    domains: ["Graph ML", "Synthetic Data", "Research"],
    year: 2026,
  },
  {
    slug: "pai-lab",
    name: "PAI-Lab",
    tagline: "Al Brooks Price Action Trading Engine",
    summary:
      "An adaptive, multi-timeframe trading engine that translates Al Brooks' discretionary price-action methodology into quantified, risk-gated execution logic.",
    description:
      "PAI-Lab reads market structure across four timeframes at once — 1H and 15M for context, 5M for structural signals such as second entries and wedge reversals, and 1M for precise micro-entry timing. Every candidate signal is scored against a composite pressure metric, then routed through a state machine that gates counter-trend and breakout trades until they are structurally confirmed. Before capital is committed, a Monte Carlo simulation sandbox runs a thousand-iteration synthetic backtest against the current regime, only allowing trades that clear a minimum expected value and probability of profit — with risk, targets, and position size all scaling continuously with a live trend/range probability rather than snapping between fixed modes.",
    status: "in-development",
    technologies: ["Python", "Pandas", "Logistic Regression", "Monte Carlo Simulation", "Binance API", "Gradio"],
    domains: ["Fintech", "Trading", "Quantitative Research"],
    year: 2026,
  },
] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
