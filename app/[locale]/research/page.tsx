import type { Metadata } from "next";

import { ResearchContent } from "./research-content";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Long-running research threads that feed directly into the systems Ekrami Labs builds — governance, retrieval, agentic systems, and more.",
};

export default function ResearchPage() {
  return <ResearchContent />;
}
