"use client";

import Link from "next/link";
import { ArrowRight, Rss } from "lucide-react";

import type { ArticleMeta } from "@/lib/articles";
import { localeHref } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { FadeIn } from "@/components/motion/fade-in";
import { useLocale } from "@/components/locale-provider";

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

/**
 * Articles index body — the chrome localizes; the articles themselves
 * are long-form English MDX and render as authored. The route's
 * page.tsx stays server-side to read the article list from disk.
 */
export function ArticlesContent({ articles }: { articles: ArticleMeta[] }) {
  const { dict } = useLocale();
  const t = dict.articlesPage;

  return (
    <>
      <PageHeader
        eyebrow={t.header.eyebrow}
        title={t.header.title}
        description={t.header.description}
      />

      <Container className="py-20 sm:py-28">
        <div className="flex justify-end">
          <a
            href="/articles/rss.xml"
            className="inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.08em] text-[var(--color-muted-foreground)] uppercase transition-colors hover:text-[var(--color-primary)]"
          >
            <Rss className="size-3.5" aria-hidden />
            {dict.common.rssFeed}
          </a>
        </div>

        {articles.length === 0 ? (
          <p className="text-[var(--color-muted-foreground)]">{t.empty}</p>
        ) : (
          <ul
            className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]"
            dir="ltr"
          >
            {articles.map((article, idx) => (
              <FadeIn key={article.slug} delay={idx * 0.05}>
                <li>
                  <Link
                    href={localeHref("en", `/articles/${article.slug}`)}
                    className="group grid gap-4 py-10 transition-colors hover:bg-[var(--color-muted)]/40 sm:py-12"
                  >
                    <div className="grid gap-6 sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-10">
                      <p className="text-xs font-medium tracking-[0.08em] text-[var(--color-muted-foreground)] uppercase">
                        {formatDate(article.date)}
                      </p>
                      <div>
                        <h2 className="text-2xl font-[var(--font-heading)] font-semibold text-[var(--color-primary)] transition-colors group-hover:text-[var(--color-accent)] sm:text-3xl">
                          {article.title}
                        </h2>
                        <p className="mt-3 max-w-3xl text-pretty text-[var(--color-muted-foreground)]">
                          {article.summary}
                        </p>
                        <ul className="mt-5 flex flex-wrap gap-1.5">
                          {article.tags.map((tag) => (
                            <li
                              key={tag}
                              className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-[0.68rem] font-medium tracking-[0.08em] text-[var(--color-muted-foreground)] uppercase"
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
