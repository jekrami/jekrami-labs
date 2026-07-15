import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { MDXComponents } from "mdx/types";

import { getArticle, listArticleSlugs } from "@/lib/articles";
import { localeHref } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/fade-in";
import { SlideIn } from "@/components/motion/slide-in";
import { Callout } from "@/components/mdx/callout";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

/**
 * Articles have no Persian translations yet (see the SEO/locale-routing
 * plan) — only "en" is a real, indexed article URL, so we don't fan out
 * static params per locale and reject any other locale at request time.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await listArticleSlugs();
  return slugs.map((slug) => ({ locale: "en", slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article not found" };

  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.date,
    },
  };
}

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
 * Article-page MDX components. Kept inline because the article surface
 * has a small, fixed shape and pulling it from `mdx-components.tsx`
 * would pull in convention hooks that conflict with server context.
 */
function articleComponents(): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="mt-0 text-3xl font-[var(--font-heading)] font-semibold text-[var(--color-primary)] sm:text-4xl"
        {...props}
      />
    ),
    h2: (props) => <h2 {...props} />,
    h3: (props) => <h3 {...props} />,
    p: (props) => <p {...props} />,
    a: (props) => <a target="_blank" rel="noreferrer" {...props} />,
    Callout,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <Container>
        <div className="pt-12 sm:pt-16">
          <FadeIn>
            <Link
              href={localeHref(locale as "en", "/articles")}
              className="group inline-flex items-center gap-1.5 text-sm text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-primary)]"
            >
              <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              All articles
            </Link>
          </FadeIn>
        </div>
      </Container>

      <article className="pt-16 pb-24 sm:pt-20 sm:pb-32">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SlideIn>
              <p className="eyebrow">{formatDate(article.date)}</p>
            </SlideIn>
            <SlideIn delay={0.05} y={12}>
              <h1 className="display-1 mt-6 text-balance">{article.title}</h1>
            </SlideIn>
            <FadeIn delay={0.15}>
              <p className="mt-8 text-xl leading-relaxed text-pretty text-[var(--color-muted-foreground)]">
                {article.summary}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="mt-10 flex flex-wrap gap-1.5">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-[0.68rem] font-medium tracking-[0.08em] text-[var(--color-muted-foreground)] uppercase"
                  >
                    {tag}
                  </span>
                ))}
                <span className="ml-2 text-xs text-[var(--color-muted-foreground)]">
                  {article.readingTime} min read
                </span>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <div className="prose-jekrami mx-auto mt-20">
              <MDXRemote
                source={article.body}
                components={articleComponents()}
                options={{
                  mdxOptions: {
                    remarkPlugins: [],
                    rehypePlugins: [],
                  },
                }}
              />
            </div>
          </FadeIn>
        </Container>
      </article>
    </>
  );
}
