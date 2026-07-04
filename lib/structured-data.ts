import { site } from "@/lib/site";

/**
 * JSON-LD graph injected once in the root layout `<head>`. Kept separate
 * from visible copy: it exists purely so search engines can resolve
 * "Jafar Ekrami" to this site and to the Ekrami Labs organisation he
 * founded, without changing the studio-branded tone of the rendered page.
 */
export function structuredData() {
  const personId = `${site.url}/#person`;
  const orgId = `${site.url}/#organization`;
  const websiteId = `${site.url}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.author.name,
        jobTitle: site.author.role,
        email: `mailto:${site.email}`,
        url: site.url,
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "University of Tehran",
        },
        sameAs: [site.links.linkedin, site.links.github],
        worksFor: { "@id": orgId },
      },
      {
        "@type": "Organization",
        "@id": orgId,
        name: site.name,
        url: site.url,
        description: site.description,
        founder: { "@id": personId },
        sameAs: [site.links.linkedin, site.links.github],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.name,
        description: site.description,
        publisher: { "@id": orgId },
        inLanguage: site.locale,
      },
    ],
  } as const;
}
