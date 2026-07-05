/**
 * Presentation slides for the ChaosWalker research paper.
 * Shared between the article and project detail surfaces.
 */
export interface ChaosWalkerSlide {
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
}

export const CHAOSWALKER_PDF_URL = "/chaoswalker/chaoswalker-post-exhaustion-architecture.pdf";

export const chaosWalkerSlides: readonly ChaosWalkerSlide[] = [
  {
    src: "/chaoswalker/slides/01-title.png",
    alt: "ChaosWalker title slide",
    caption: "ChaosWalker: a post-exhaustion architecture for exploring massive password spaces.",
  },
  {
    src: "/chaoswalker/slides/02-traditional-cracking-model.png",
    alt: "The traditional cracking model",
    caption: "Dictionary, rules, masks, then brute force — effective for human passwords, not high-entropy ones.",
  },
  {
    src: "/chaoswalker/slides/03-keyspace-explosion.png",
    alt: "The keyspace explosion",
    caption: "Password length and charset diversity grow the search space faster than verification speed can compensate.",
  },
  {
    src: "/chaoswalker/slides/04-the-real-problem.png",
    alt: "The real problem",
    caption: "When enumeration is impossible, the question becomes how to sample the space intelligently.",
  },
  {
    src: "/chaoswalker/slides/05-chaoswalker-overview.png",
    alt: "ChaosWalker overview",
    caption: "Partitioned keyspaces, Feistel traversal, and hybrid global/local search over the password domain.",
  },
  {
    src: "/chaoswalker/slides/06-partitioned-keyspaces.png",
    alt: "Partitioned keyspaces",
    caption: "Structural partitions — lowercase+digits, mixed-case+symbols, word-number patterns — weighted by likelihood.",
  },
  {
    src: "/chaoswalker/slides/07-feistel-traversal.png",
    alt: "Non-repeating random traversal",
    caption: "Feistel-based pseudorandom permutation: every index appears once, no global memory required.",
  },
  {
    src: "/chaoswalker/slides/08-hybrid-search.png",
    alt: "Global sampling and local exploration",
    caption: "Global sampler for coverage; local mutations for nearby candidates; Bloom filter for deduplication.",
  },
  {
    src: "/chaoswalker/slides/09-hashcat-pipeline.png",
    alt: "ChaosWalker and Hashcat pipeline",
    caption: "ChaosWalker generates candidates; Hashcat verifies them through a stdin pipeline.",
  },
  {
    src: "/chaoswalker/slides/10-why-this-matters.png",
    alt: "Why this matters",
    caption: "Cybersecurity research into partitioned keyspaces, Feistel permutations, hybrid search, and probe points.",
  },
  {
    src: "/chaoswalker/slides/11-future-directions.png",
    alt: "Future directions",
    caption: "Adaptive feedback, probabilistic models, machine-learning guidance, and large-scale evaluation.",
  },
  {
    src: "/chaoswalker/slides/12-cybersecurity-strategies.png",
    alt: "Intelligent exploration vs brute force",
    caption: "Intelligent exploration versus brute-force enumeration across massive password spaces.",
  },
] as const;
