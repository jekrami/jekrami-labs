/**
 * Centralised site configuration.
 * All user-facing copy and brand identity lives here so it can be
 * audited and updated without touching presentation components.
 */
export const site = {
  name: "Ekrami Labs",
  shortName: "Ekrami Labs",
  tagline: "Engineering Trustworthy AI Systems",
  subtitle: "Enterprise AI · Cybersecurity · Intelligent Systems",
  description:
    "Ekrami Labs is an independent AI Research & Engineering Studio designing enterprise-grade intelligent systems with rigor, integrity, and a deep respect for the systems they touch.",
  url: "https://jekrami.ir",
  locale: "en-US",
  email: "ekrami@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/jafar-ekrami",
    github: "https://github.com/jekrami",
  },
  author: {
    name: "Jafar Ekrami",
    role: "Founder & Principal Engineer",
  },
  resumeUrl: "/jafar-ekrami-resume.pdf",
  resumeUrlFa: "/jafar-ekrami-resume-fa.pdf",
} as const;

/** Navigation entries, single source of truth for header + footer + sitemap. */
export const navigation = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Research", href: "/research" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Articles", href: "/articles" },
  { label: "Contact", href: "/contact" },
] as const;

export type NavigationItem = (typeof navigation)[number];
