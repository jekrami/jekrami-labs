import type { LucideIcon } from "lucide-react";
import { Cog, ShieldCheck, Sparkles, Wrench } from "lucide-react";

export interface PhilosophyPillar {
  title: string;
  description: string;
  icon: LucideIcon;
}

/**
 * Four foundational pillars. They read like promises because they are.
 */
export const philosophy: readonly PhilosophyPillar[] = [
  {
    title: "Engineering",
    description:
      "Software is built, not declared. Every claim we make is backed by a system, a test, or a document that can be examined.",
    icon: Cog,
  },
  {
    title: "Integrity",
    description:
      "We design for the audit. Every model decision, every data flow, every operator action is traceable from day one — not bolted on after a regulator asks.",
    icon: ShieldCheck,
  },
  {
    title: "Innovation",
    description:
      "Innovation without engineering is theatre. We adopt what is mature, adapt what is emerging, and reserve research for problems worth solving twice.",
    icon: Sparkles,
  },
  {
    title: "Practical AI",
    description:
      "Useful, deployed, quietly improving the work of the people who use it. The best AI in production is the AI no one has to think about.",
    icon: Wrench,
  },
];
