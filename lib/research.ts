/**
 * Research areas — independent of projects because research is
 * about the questions, not the products. Each item expands into
 * its own long-form note in the Articles section.
 */
export interface ResearchArea {
  title: string;
  summary: string;
  body: string;
}

export const researchAreas: readonly ResearchArea[] = [
  {
    title: "Enterprise Legal AI",
    summary: "Citation-grounded reasoning over long, structured, multilingual documents.",
    body: "We are studying how to combine retrieval-augmented generation with formal-document structure so that a legal model can give answers a counsel can stand behind.",
  },
  {
    title: "AI Governance",
    summary: "From policy papers to operational telemetry — making governance real.",
    body: "Governance is often written as principles. Our work turns those principles into auditable logs, evaluation harnesses, and architectural constraints that ship with the system.",
  },
  {
    title: "Retrieval-Augmented Generation",
    summary: "Indexing strategies that survive the messy reality of enterprise content.",
    body: "We treat RAG as an indexing and retrieval problem first, and a generation problem second. The interesting failures live in the index.",
  },
  {
    title: "Agentic AI",
    summary: "Bounded autonomy with continuous human oversight.",
    body: "An agent should not surprise the operator. We design agents whose every action is observable, interruptible, and reviewable after the fact.",
  },
  {
    title: "Cybersecurity AI",
    summary: "Detection that augments analysts rather than replaces them.",
    body: "We treat the SOC analyst as the customer. Our research is measured by how much time it gives back, not by how many alerts it suppresses.",
  },
  {
    title: "Large Language Models",
    summary: "Adapting frontier models to enterprise constraints.",
    body: "Fine-tuning, distillation, and prompting are tools, not destinations. We choose based on the deployment envelope: latency, privacy, cost, and the cost of being wrong.",
  },
  {
    title: "Oil & Gas AI",
    summary: "Industrial telemetry, asset reliability, and operations under uncertainty.",
    body: "Decades of domain knowledge in oil and gas still live in spreadsheets and shift handovers. We work on systems that respect that history instead of pretending it does not exist.",
  },
];
