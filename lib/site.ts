/**
 * Centralised site configuration.
 * All user-facing copy and brand identity lives here so it can be
 * audited and updated without touching presentation components.
 */
export const site = {
  name: "JEKRAMI Labs",
  shortName: "JEKRAMI Labs",
  tagline: "Engineering Trustworthy AI Systems",
  subtitle: "Enterprise AI · Cybersecurity · Intelligent Systems",
  description:
    "JEKRAMI Labs is an independent AI Research & Engineering Studio designing enterprise-grade intelligent systems with rigor, integrity, and a deep respect for the systems they touch.",
  url: "https://jekrami-labs.com",
  locale: "en-US",
  ogImage: "/og.png",
  email: "jafar@ekrami.info",
  links: {
    linkedin: "https://www.linkedin.com/company/jekrami-labs",
    github: "https://github.com/jekrami-labs",
  },
  author: {
    name: "JEKRAMI Labs",
    role: "Founder & Principal Engineer",
  },
} as const;

/** Navigation entries, single source of truth for header + footer + sitemap. */
export const navigation = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Research", href: "/research" },
  { label: "About", href: "/about" },
  { label: "Articles", href: "/articles" },
  { label: "Contact", href: "/contact" },
] as const;

export type NavigationItem = (typeof navigation)[number];
