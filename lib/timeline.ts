/**
 * Vertical timeline — the engineering story told as a sequence of
 * decision points, not job titles. Dates are illustrative; tone is
 * deliberately understated.
 */
export interface TimelineEntry {
  period: string;
  title: string;
  description: string;
}

export const timeline: readonly TimelineEntry[] = [
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
];
