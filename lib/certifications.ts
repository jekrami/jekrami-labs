/**
 * Professional certifications — concrete, verifiable credentials that
 * back the studio's claims of engineering rigor. Deliberately terse:
 * name, issuer, and year only, no marketing language. Grouped so the
 * list reads as a capability map rather than a trophy cloud.
 */
export interface Certification {
  title: string;
  issuer: string;
  year: number;
}

export interface CertificationGroup {
  category: string;
  items: readonly Certification[];
}

export const certificationGroups: readonly CertificationGroup[] = [
  {
    category: "AI & Data Engineering",
    items: [
      {
        title:
          "Azure Data Engineer Associate (DP-203) Cert Prep — Design & Develop Data Processing",
        issuer: "Microsoft Press / LinkedIn",
        year: 2024,
      },
      {
        title: "Python for Data Engineering: from Beginner to Advanced",
        issuer: "LinkedIn Learning",
        year: 2024,
      },
      {
        title: "Hands-On Introduction: Data Engineering",
        issuer: "LinkedIn Learning",
        year: 2024,
      },
      {
        title: "GPT-4 Foundations: Building AI-Powered Apps",
        issuer: "LinkedIn Learning",
        year: 2023,
      },
      {
        title: "Generative AI Imaging: What Creative Pros Need to Know",
        issuer: "LinkedIn Learning",
        year: 2023,
      },
      {
        title: "Generative AI Skills for Creative Content: Opportunities, Issues, and Ethics",
        issuer: "LinkedIn Learning",
        year: 2023,
      },
      {
        title: "Microsoft Azure for Data Engineering",
        issuer: "Coursera",
        year: 2023,
      },
      {
        title: "Data Storage in Microsoft Azure",
        issuer: "Coursera",
        year: 2023,
      },
    ],
  },
  {
    category: "Cloud & Infrastructure",
    items: [
      {
        title: "Linux: Bash Shell and Scripts",
        issuer: "LinkedIn Learning",
        year: 2023,
      },
      {
        title: "Azure Administration Essential Training",
        issuer: "LinkedIn Learning",
        year: 2022,
      },
      {
        title: "Kubernetes: Microservices",
        issuer: "LinkedIn Learning",
        year: 2022,
      },
      {
        title: "Kubernetes: Native Tools",
        issuer: "LinkedIn Learning",
        year: 2022,
      },
      {
        title: "Learning Kubernetes",
        issuer: "LinkedIn Learning",
        year: 2022,
      },
      {
        title: "Docker Essentials: A Developer Introduction",
        issuer: "IBM",
        year: 2022,
      },
      {
        title: "PowerShell: Automating Administration",
        issuer: "LinkedIn Learning",
        year: 2022,
      },
      {
        title: "Learning PowerShell",
        issuer: "LinkedIn Learning",
        year: 2022,
      },
      {
        title: "Learning Virtualization",
        issuer: "LinkedIn Learning",
        year: 2022,
      },
      {
        title: "Learning the Elastic Stack",
        issuer: "LinkedIn Learning",
        year: 2022,
      },
      {
        title: "Server Administration Essential Training",
        issuer: "LinkedIn Learning",
        year: 2022,
      },
    ],
  },
  {
    category: "Networking & Operations",
    items: [
      {
        title: "Networking and Administration Fundamentals",
        issuer: "LinkedIn Learning",
        year: 2022,
      },
      {
        title: "NetOps (DevOps for Network Engineers): Automating Networks",
        issuer: "LinkedIn Learning",
        year: 2022,
      },
      {
        title: "Networking Foundations: Networking Basics",
        issuer: "LinkedIn Learning",
        year: 2022,
      },
    ],
  },
  {
    category: "Security, Governance & Process",
    items: [
      {
        title: "Information Security Management System (ISMS)",
        issuer: "Vision / IMI",
        year: 2009,
      },
      {
        title: "Business Modeling and Business Process Reengineering",
        issuer: "TÜV",
        year: 2008,
      },
      {
        title: "Business Process Analyst",
        issuer: "Vision",
        year: 2008,
      },
      {
        title: "Certified Ethical Hacker (CEH)",
        issuer: "Kahkeshan Noor",
        year: 2006,
      },
    ],
  },
] as const;
