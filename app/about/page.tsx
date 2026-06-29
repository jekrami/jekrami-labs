import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { FadeIn } from "@/components/motion/fade-in";
import { TimelineSection } from "@/components/sections/timeline-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "JEKRAMI Labs is the work of an engineer who spent thirty years inside the systems enterprises actually run.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="The studio behind the work."
        description="An independent AI Research & Engineering Studio, built on three decades inside the rooms where enterprise IT is actually operated."
      />

      <Container className="py-16">
        <div className="grid gap-16 lg:grid-cols-[2fr_1fr]">
          <div className="prose-jekrami">
            <p>
              JEKRAMI Labs is the work of an engineer who spent thirty years
              inside the systems enterprises actually run — not the systems
              they demo. Oil &amp; gas platforms. Hospital networks.
              Manufacturing lines. Telecommunications core. The unglamorous
              places where technology either keeps the operation running or
              becomes the cause of the incident report.
            </p>

            <p>
              That career produces a particular kind of instinct. It treats
              AI the way a control-room engineer treats a new instrument —
              with curiosity, caution, and the understanding that a model
              which cannot explain itself is a liability rather than an
              asset.
            </p>

            <h2>Why independence</h2>
            <p>
              The studio is independent on purpose. Independence is what lets
              the work stay loyal to engineering rather than to a product
              narrative. It is what makes it possible to walk away from a
              brief that does not deserve to be written, and to keep working
              on a thread long after the launch window closes.
            </p>

            <h2>What we focus on</h2>
            <p>
              Enterprise AI architecture. Governance that ships with the
              system. Retrieval-augmented systems designed against real
              document corpora. Bounded agentic workflows inside the
              security operations centre. Practical AI that earns its place
              inside regulated environments.
            </p>

            <h2>How we work with clients</h2>
            <p>
              Engagements begin with a conversation, not a contract. We
              spend the first sessions listening: to the operators, to the
              audit committee, to the on-call engineer. The artefacts we
              ship — index designs, evaluation harnesses, governance
              playbooks — tend to be unglamorous and durable.
            </p>
          </div>

          <aside className="space-y-6">
            <FadeIn delay={0.1}>
              <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-muted)]/40 p-8">
                <p className="eyebrow">Industries served</p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-foreground)]">
                  <li>Oil &amp; Gas</li>
                  <li>Healthcare</li>
                  <li>Manufacturing</li>
                  <li>Telecommunications</li>
                  <li>Public Sector</li>
                  <li>Financial Services</li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-muted)]/40 p-8">
                <p className="eyebrow">Operating principles</p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-foreground)]">
                  <li>Design for the audit</li>
                  <li>Quiet, durable software</li>
                  <li>Research that serves products</li>
                  <li>Independence over growth</li>
                </ul>
              </div>
            </FadeIn>
          </aside>
        </div>
      </Container>

      <TimelineSection />
      <PhilosophySection />
    </>
  );
}
