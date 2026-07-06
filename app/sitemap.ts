import type { MetadataRoute } from "next";
import { listArticleSlugs } from "@/lib/articles";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

/**
 * Dynamic sitemap. Article and project slugs flow from the typed data
 * sources so a new entry automatically appears here.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const baseRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/research`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/articles`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articleSlugs = await listArticleSlugs();
  const articleRoutes: MetadataRoute.Sitemap = articleSlugs.map((slug) => ({
    url: `${site.url}/articles/${slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...baseRoutes, ...projectRoutes, ...articleRoutes];
}
