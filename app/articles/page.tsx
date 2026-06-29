import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { listArticles } from "@/lib/articles";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Research notes from JEKRAMI Labs — governance, retrieval, agentic systems, and the practical work of building enterprise AI.",
};

function formatDate(date: string): string {
  if (!date) return "";
  try {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return date;
  }
}

export default async function ArticlesPage() {
  const articles = await listArticles();

  return (
    <>
      <PageHeader
        eyebrow="Articles"
        title="Research notes from the studio."
        description="Long-form writing on the systems we are building and the questions we keep coming back to."
      />

      <Container className="py-20 sm:py-28">
        {articles.length === 0 ? (
          <p className="text-[var(--color-muted-foreground)]">
            No articles published yet.
          </p>
        ) : (
          <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {articles.map((article, idx) => (
              <FadeIn key={article.slug} delay={idx * 0.05}>
                <li>
                  <Link
                    href={`/articles/${article.slug}`}
                    className="group grid gap-4 py-10 transition-colors hover:bg-[var(--color-muted)]/40 sm:py-12"
                  >
                    <div className="grid gap-6 sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-10">
                      <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-muted-foreground)]">
                        {formatDate(article.date)}
                      </p>
                      <div>
                        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[var(--color-primary)] transition-colors group-hover:text-[var(--color-accent)] sm:text-3xl">
                          {article.title}
                        </h2>
                        <p className="mt-3 max-w-3xl text-[var(--color-muted-foreground)] text-pretty">
                          {article.summary}
                        </p>
                        <ul className="mt-5 flex flex-wrap gap-1.5">
                          {article.tags.map((tag) => (
                            <li
                              key={tag}
                              className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.08em] text-[var(--color-muted-foreground)]"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <ArrowRight
                        className="size-5 text-[var(--color-muted-foreground)] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--color-primary)]"
                        aria-hidden
                      />
                    </div>
                  </Link>
                </li>
              </FadeIn>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
