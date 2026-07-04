import { listArticles } from "@/lib/articles";
import { site } from "@/lib/site";

/**
 * Hand-built RSS 2.0 feed for the Articles section. No feed-generation
 * dependency needed for a handful of fields; reuses the same
 * `listArticles()` loader the /articles page and sitemap already share.
 */
export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = await listArticles();

  const items = articles
    .map((article) => {
      const url = `${site.url}/articles/${article.slug}`;
      const pubDate = article.date ? new Date(article.date).toUTCString() : undefined;
      return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(article.summary)}</description>
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ""}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)} — Articles</title>
    <link>${site.url}/articles</link>
    <description>${escapeXml(site.description)}</description>
    <language>${site.locale}</language>
    <atom:link href="${site.url}/articles/rss.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
