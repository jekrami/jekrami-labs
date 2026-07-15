import type { Metadata } from "next";

import { listArticles } from "@/lib/articles";
import { ArticlesContent } from "./articles-content";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Research notes from Ekrami Labs — governance, retrieval, agentic systems, and the practical work of building enterprise AI.",
};

export default async function ArticlesPage() {
  const articles = await listArticles();

  return <ArticlesContent articles={articles} />;
}
