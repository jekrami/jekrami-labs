import * as fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

/**
 * Lightweight MDX loader.
 *
 *  - Reads .mdx files from `content/articles/`.
 *  - Parses frontmatter with gray-matter.
 *  - Returns a stable shape consumable by `app/articles/...` routes.
 *
 * Frontmatter contract:
 *
 *   ---
 *   title: "..."
 *   summary: "..."
 *   date: 2026-04-12
 *   readingTime: 6
 *   tags: [Enterprise AI, Governance]
 *   ---
 */

export interface ArticleMeta {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readingTime: number;
  tags: readonly string[];
}

export interface Article extends ArticleMeta {
  body: string;
}

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

async function readArticleFile(slug: string): Promise<Article> {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);

  // Validate the frontmatter shape so the rest of the app can rely on it.
  const title = typeof data.title === "string" ? data.title : slug;
  const summary = typeof data.summary === "string" ? data.summary : "";
  const dateString =
    data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : typeof data.date === "string"
        ? data.date
        : "";
  const readingTime =
    typeof data.readingTime === "number" ? data.readingTime : estimateReadingTime(content);
  const tags = Array.isArray(data.tags)
    ? data.tags.filter((t): t is string => typeof t === "string")
    : [];

  return {
    slug,
    title,
    summary,
    date: dateString,
    readingTime,
    tags,
    body: content,
  };
}

export async function listArticles(): Promise<ArticleMeta[]> {
  try {
    const files = await fs.readdir(ARTICLES_DIR);
    const mdx = files.filter((file) => file.endsWith(".mdx"));
    const articles = await Promise.all(
      mdx.map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const article = await readArticleFile(slug);
        return pickMeta(article);
      }),
    );
    return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export async function getArticle(slug: string): Promise<Article | null> {
  try {
    return await readArticleFile(slug);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

export async function listArticleSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(ARTICLES_DIR);
    return files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(/\.mdx$/, ""));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

function pickMeta(article: Article): ArticleMeta {
  // Strip the body so list views don't carry it around.
  const { body: _ignored, ...meta } = article;
  void _ignored;
  return meta;
}

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
