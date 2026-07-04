/**
 * English dictionary — the site's default language. Every string here is
 * the exact copy that previously lived inline in the components, moved
 * verbatim so the English site is byte-for-byte unchanged.
 *
 * The inferred type of this object is the contract the Farsi dictionary
 * must satisfy (`Dictionary` below).
 */
export const en = {
  nav: {
    home: "Home",
    projects: "Projects",
    research: "Research",
    about: "About",
    articles: "Articles",
    contact: "Contact",
    getInTouch: "Get in touch",
    openCommandMenu: "Open command menu",
    switchLanguage: "تغییر زبان به فارسی",
  },
  common: {
    downloadCV: "Download CV",
    readMore: "Read more",
    rssFeed: "RSS feed",
    statusLabels: {
      shipped: "Shipped",
      "in-development": "In Development",
      "in-research": "In Research",
    },
  },
  hero: {
    eyebrow: "Now researching enterprise AI",
    words: ["Engineering", "Trustworthy", "AI", "Systems."],
    subline: [
      {
        text: "JEKRAMI Labs is an independent AI Research & Engineering Studio. We design intelligent systems for enterprises that are serious about ",
      },
      { text: "uptime", highlight: true },
      { text: ", " },
      { text: "auditability", highlight: true },
      { text: ", and " },
      { text: "outcomes", highlight: true },
      { text: "." },
    ] as ReadonlyArray<{ text: string; highlight?: boolean }>,
    exploreProjects: "Explore Projects",
    readResearch: "Read the research",
    chips: ["Enterprise AI", "Cybersecurity", "Intelligent Systems"],
  },
  projectsSection: {
    eyebrow: "Projects",
    title: "Systems shipped, or close to it.",
    description:
      "We work on a small number of projects at a time. Each one is designed to be the kind of system we would defend in front of a regulated industry, not a demo.",
    viewAll: "View all projects",
  },
  researchSection: {
    eyebrow: "Research",
    title: "Where the thinking lives.",
    description:
      "We maintain long-running research threads that feed directly into the systems we ship. Below are the questions we are working on this year.",
    readNotes: "Read the research notes",
  },
  aboutSection: {
    eyebrow: "About",
    title: "The studio behind the work.",
    paragraphs: [
      "JEKRAMI Labs is the work of an engineer who spent thirty years inside the systems enterprises actually run — not the systems they demo. Oil & gas platforms. Hospital networks. Manufacturing lines. Telecommunications core. The unglamorous places where technology either keeps the operation running or becomes the cause of the incident report.",
      "That career produces a particular kind of instinct. It treats AI the way a control-room engineer treats a new instrument — with curiosity, caution, and the understanding that a model which cannot explain itself is a liability rather than an asset.",
      "JEKRAMI Labs exists to build enterprise AI for environments where auditability is not optional, where downtime is a board conversation, and where the contract is as serious as the model. The studio is independent on purpose. Independence is what lets the work stay loyal to engineering rather than to a product narrative.",
      "Today the studio pairs that institutional experience with current research in retrieval, agentic systems, and operational AI. The output is small, deliberate, and built to last a quarter — not a launch cycle.",
    ],
    readFullStory: "Read the full story",
    focusTitle: "Focus",
    focusItems: [
      "Enterprise AI architecture",
      "Auditability and governance",
      "Retrieval-augmented systems",
      "Bounded agentic workflows",
      "Cybersecurity AI co-pilots",
    ],
    industriesTitle: "Industries",
    industriesItems: [
      "Oil & Gas",
      "Healthcare",
      "Manufacturing",
      "Telecommunications",
      "Public Sector",
    ],
  },
  timelineSection: {
    eyebrow: "Trajectory",
    title: "A career written in systems.",
    description:
      "The studio is built on three decades inside the rooms where enterprise IT is actually operated. Each step informed the one after it.",
    entries: [
      {
        period: "Foundations",
        title: "Electrical Engineering",
        description:
          "Began with the physics of signals and circuits — the discipline of making systems behave the way the schematic says they should.",
      },
      {
        period: "Network Era",
        title: "Enterprise Networks",
        description:
          "Moved into the rooms where uptime is measured in nines and the cost of a misconfiguration is a regional outage.",
      },
      {
        period: "Operations",
        title: "IT Leadership",
        description:
          "Led IT organisations across healthcare, manufacturing, telecommunications, and energy — learning how technology either serves the operator or becomes another obstacle.",
      },
      {
        period: "Oversight",
        title: "Board Leadership",
        description:
          "Served on boards and audit committees, where decisions stop being about tools and start being about consequences.",
      },
      {
        period: "Transformation",
        title: "Digital Transformation",
        description:
          "Spent a decade turning legacy estates into modern platforms without ever treating continuity as optional.",
      },
      {
        period: "Today",
        title: "Enterprise AI",
        description:
          "Applied everything above to the design and deployment of AI systems that have to earn their place inside a regulated enterprise.",
      },
      {
        period: "Forward",
        title: "Research",
        description:
          "Returned to first-principles research — the work of asking whether the systems we ship are the systems we would defend in front of an auditor.",
      },
    ],
  },
  philosophySection: {
    eyebrow: "Philosophy",
    title: "What we work to.",
    description:
      "Four principles guide every project, every research thread, every customer conversation. They are written down so they can be held to.",
    pillars: [
      {
        title: "Engineering",
        description:
          "Software is built, not declared. Every claim we make is backed by a system, a test, or a document that can be examined.",
      },
      {
        title: "Integrity",
        description:
          "We design for the audit. Every model decision, every data flow, every operator action is traceable from day one — not bolted on after a regulator asks.",
      },
      {
        title: "Innovation",
        description:
          "Innovation without engineering is theatre. We adopt what is mature, adapt what is emerging, and reserve research for problems worth solving twice.",
      },
      {
        title: "Practical AI",
        description:
          "Useful, deployed, quietly improving the work of the people who use it. The best AI in production is the AI no one has to think about.",
      },
    ],
  },
  certificationsSection: {
    eyebrow: "Credentials",
    title: "Certified, not just claimed.",
    description:
      "A working list of the credentials behind the AI, cloud, network, and security foundations the studio builds on.",
    categories: {
      "AI & Data Engineering": "AI & Data Engineering",
      "Cloud & Infrastructure": "Cloud & Infrastructure",
      "Networking & Operations": "Networking & Operations",
      "Security, Governance & Process": "Security, Governance & Process",
    } as Record<string, string>,
  },
  contactSection: {
    eyebrow: "Contact",
    title: "Start a quiet conversation.",
    description:
      "If you are evaluating enterprise AI, wrestling with a governance question, or wondering whether a research idea is worth a build — we would like to hear about it. Engagements begin with a conversation, not a contract.",
    channelLabels: { email: "Email", linkedin: "LinkedIn", github: "GitHub" },
  },
  researchAreas: [
    {
      title: "Enterprise Legal AI",
      summary: "Citation-grounded reasoning over long, structured, multilingual documents.",
      body: "We are studying how to combine retrieval-augmented generation with formal-document structure so that a legal model can give answers a counsel can stand behind.",
    },
    {
      title: "AI Governance",
      summary: "From policy papers to operational telemetry — making governance real.",
      body: "Governance is often written as principles. Our work turns those principles into auditable logs, evaluation harnesses, and architectural constraints that ship with the system.",
    },
    {
      title: "Retrieval-Augmented Generation",
      summary: "Indexing strategies that survive the messy reality of enterprise content.",
      body: "We treat RAG as an indexing and retrieval problem first, and a generation problem second. The interesting failures live in the index.",
    },
    {
      title: "Agentic AI",
      summary: "Bounded autonomy with continuous human oversight.",
      body: "An agent should not surprise the operator. We design agents whose every action is observable, interruptible, and reviewable after the fact.",
    },
    {
      title: "Cybersecurity AI",
      summary: "Detection that augments analysts rather than replaces them.",
      body: "We treat the SOC analyst as the customer. Our research is measured by how much time it gives back, not by how many alerts it suppresses.",
    },
    {
      title: "Large Language Models",
      summary: "Adapting frontier models to enterprise constraints.",
      body: "Fine-tuning, distillation, and prompting are tools, not destinations. We choose based on the deployment envelope: latency, privacy, cost, and the cost of being wrong.",
    },
    {
      title: "Oil & Gas AI",
      summary: "Industrial telemetry, asset reliability, and operations under uncertainty.",
      body: "Decades of domain knowledge in oil and gas still live in spreadsheets and shift handovers. We work on systems that respect that history instead of pretending it does not exist.",
    },
  ],
  projectOverrides: {
    ravin: {
      tagline: "Enterprise Legal AI",
      summary:
        "A contract intelligence platform that turns dense legal corpora into verifiable, citation-grounded answers.",
      description:
        "Ravin ingests multilingual contract repositories, normalises them against the firm's review playbook, and exposes a citation-grounded question-answering surface for legal operations. Every answer can be traced back to the exact clause it came from — a property we treat as non-negotiable for legal-grade systems.",
    },
    "ao-soc": {
      tagline: "AI Security Operations Center",
      summary:
        "An autonomous SOC analyst that triages, investigates, and documents alerts while a human stays in the loop.",
      description:
        "AO-SOC is a security operations co-pilot. It ingests SIEM and EDR telemetry, clusters related alerts into incidents, drafts an investigation timeline, and writes a structured incident summary ready for the on-call engineer. We design it as a transparent system: every action it suggests is explainable, every conclusion is auditable.",
    },
    "air-to-live": {
      tagline: "Passive Urban Air Purification",
      summary:
        "A research-stage platform that turns environmental telemetry into actionable urban planning decisions.",
      description:
        "Air to Live explores how distributed low-cost sensors, edge inference, and public-health data can be composed into a usable decision surface for municipal teams. The goal is not another dashboard — it is a quiet, reliable background signal that informs policy without becoming a theatre of graphs.",
    },
    "forensic-intelligence-engine": {
      tagline: "Automated Digital Forensics",
      summary:
        "An evidence analysis system that ingests large heterogeneous corpora and produces structured forensic intelligence reports with minimal manual review.",
      description:
        "The Forensic Intelligence Engine processes documents, images, spreadsheets, and multimedia at scale — extracting entities, metadata, and visual signals across dozens of formats. Configurable filtering, duplicate detection, and multilingual OCR let investigators concentrate on pattern and relationship analysis rather than file triage.",
    },
    "domain-adaptive-legal-ai": {
      tagline: "On-Premise Legal AI Ecosystem",
      summary:
        "A fully on-premise platform for understanding, generating, and comparing legal documents — domain-independent at the core, with swappable knowledge packs for regulated industries.",
      description:
        "This platform is built as an extensible legal AI ecosystem that runs entirely on customer infrastructure — not a single-purpose contract analyzer. The core engine handles document understanding, generation, comparison, and lifecycle management once; knowledge packs plug in without architectural changes. The first pack targets Iranian Oil & Gas contracts and regulations, with banking, insurance, construction, labor law, and procurement planned on the same foundation.",
    },
  } as Record<string, { tagline: string; summary: string; description: string }>,
  aboutPage: {
    header: {
      eyebrow: "About",
      title: "The studio behind the work.",
      description:
        "An independent AI Research & Engineering Studio, built on three decades inside the rooms where enterprise IT is actually operated.",
    },
    proseIntro: [
      "JEKRAMI Labs is the work of an engineer who spent thirty years inside the systems enterprises actually run — not the systems they demo. Oil & gas platforms. Hospital networks. Manufacturing lines. Telecommunications core. The unglamorous places where technology either keeps the operation running or becomes the cause of the incident report.",
      "That career produces a particular kind of instinct. It treats AI the way a control-room engineer treats a new instrument — with curiosity, caution, and the understanding that a model which cannot explain itself is a liability rather than an asset.",
    ],
    whyIndependenceTitle: "Why independence",
    whyIndependenceBody:
      "The studio is independent on purpose. Independence is what lets the work stay loyal to engineering rather than to a product narrative. It is what makes it possible to walk away from a brief that does not deserve to be written, and to keep working on a thread long after the launch window closes.",
    focusTitle: "What we focus on",
    focusBody:
      "Enterprise AI architecture. Governance that ships with the system. Retrieval-augmented systems designed against real document corpora. Bounded agentic workflows inside the security operations centre. Practical AI that earns its place inside regulated environments.",
    clientsTitle: "How we work with clients",
    clientsBody:
      "Engagements begin with a conversation, not a contract. We spend the first sessions listening: to the operators, to the audit committee, to the on-call engineer. The artefacts we ship — index designs, evaluation harnesses, governance playbooks — tend to be unglamorous and durable.",
    industriesServedTitle: "Industries served",
    industriesServed: [
      "Oil & Gas",
      "Healthcare",
      "Manufacturing",
      "Telecommunications",
      "Public Sector",
      "Financial Services",
    ],
    principlesTitle: "Operating principles",
    principles: [
      "Design for the audit",
      "Quiet, durable software",
      "Research that serves products",
      "Independence over growth",
    ],
    credentialsTitle: "Credentials",
    credentialsBody: "The full professional record behind the studio, as a single document.",
  },
  contactPage: {
    header: {
      eyebrow: "Contact",
      title: "Start a quiet conversation.",
      description:
        "Engagements begin with a conversation, not a contract. We take on a small number of projects each quarter.",
    },
    whatToSendTitle: "What to send",
    whatToSend: [
      {
        title: "The problem in one paragraph.",
        body: "What you are trying to do, what you have already tried, and what is in the way.",
      },
      {
        title: "The shape of the data.",
        body: "Documents, telemetry, contracts, signals — whatever is in scope. The more honest this is, the better we can scope.",
      },
      {
        title: "The constraint.",
        body: "Audit, privacy, latency, vendor lock-in, regulatory envelope. These shape the design more than features do.",
      },
    ],
    channelSubs: {
      email: "Replies within one working day.",
      linkedin: "Studio updates and public notes.",
      github: "Open research and tooling.",
    },
  },
  projectsPage: {
    header: {
      eyebrow: "Projects",
      title: "Systems shipped, or close to it.",
      description:
        "A small portfolio of projects we are actively developing or researching. Each one is designed to be the kind of system we would defend in front of a regulated industry.",
    },
    engagements: {
      eyebrow: "Engagements",
      title: "Have a problem worth our calendar?",
      body: "We take on a small number of engagements at a time. Each starts with a conversation, not a contract.",
      cta: "Start a conversation",
    },
  },
  projectDetail: {
    back: "All projects",
    exploringTitle: "What we are exploring",
    exploringBody:
      "The system is shaped by questions we keep returning to in our research notes. Where answers are speculative, the design is conservative; where the answers are mature, we ship against them.",
    mattersTitle: "Why it matters",
    mattersBody:
      "Projects exist to be measured against outcomes, not against a launch narrative. The studio reviews each project against the standard a regulated enterprise would apply to any operational system.",
    statusTitle: "Status",
    stackTitle: "Stack",
    domainsTitle: "Domains",
  },
  researchPage: {
    header: {
      eyebrow: "Research",
      title: "Where the thinking lives.",
      description:
        "We maintain long-running research threads that feed directly into the systems we ship. Below are the questions we are working on this year.",
    },
  },
  articlesPage: {
    header: {
      eyebrow: "Articles",
      title: "Research notes from the studio.",
      description:
        "Long-form writing on the systems we are building and the questions we keep coming back to.",
    },
    empty: "No articles published yet.",
  },
  footer: {
    studio: "Studio",
    connect: "Connect",
    tagline: "Engineering Trustworthy AI Systems",
    description:
      "An independent AI Research & Engineering Studio. Built quietly, documented carefully, designed for the audit.",
    rights: "All rights reserved.",
    foundedBy: "Founded by",
    founderName: "Jafar Ekrami",
  },
  commandPalette: {
    label: "Command menu",
    placeholder: "Jump to a page or action…",
    empty: "No results found.",
    navigate: "Navigate",
    actions: "Actions",
    emailPrefix: "Email",
    openLinkedIn: "Open LinkedIn",
    openGitHub: "Open GitHub",
  },
} as const;

/** Structural type both dictionaries must satisfy. */
export type Dictionary = {
  readonly [K in keyof typeof en]: DeepStringReplace<(typeof en)[K]>;
};

/** Widens literal string types so translations can differ from English. */
type DeepStringReplace<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly DeepStringReplace<U>[]
    : T extends object
      ? { readonly [K in keyof T]: DeepStringReplace<T[K]> }
      : T;
