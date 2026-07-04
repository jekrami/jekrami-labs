"use client";

import { ShieldCheck } from "lucide-react";

import { certificationGroups } from "@/lib/certifications";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { SlideIn } from "@/components/motion/slide-in";
import { useDictionary } from "@/components/locale-provider";

/**
 * Certifications — a quiet credential grid, not a trophy case.
 * Grouped by discipline so the list reads as a capability map.
 * Course titles stay in English (proper nouns); the category
 * headings localize through the dictionary.
 */
export function CertificationsSection() {
  const dict = useDictionary();

  return (
    <section className="border-t border-[var(--color-border)] py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="max-w-3xl">
          <SlideIn>
            <p className="eyebrow">{dict.certificationsSection.eyebrow}</p>
          </SlideIn>
          <SlideIn delay={0.05} y={10}>
            <h2 className="display-2 mt-4">{dict.certificationsSection.title}</h2>
          </SlideIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 text-pretty text-[var(--color-muted-foreground)]">
              {dict.certificationsSection.description}
            </p>
          </FadeIn>
        </div>

        <div className="mt-16 space-y-12">
          {certificationGroups.map((group, groupIdx) => (
            <FadeIn key={group.category} delay={groupIdx * 0.05}>
              <div>
                <p className="text-xs font-medium tracking-[0.08em] text-[var(--color-muted-foreground)] uppercase">
                  {dict.certificationsSection.categories[group.category] ?? group.category}
                </p>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {group.items.map((cert) => (
                    <li key={cert.title}>
                      <Badge
                        tone="outline"
                        className="gap-2 rounded-[var(--radius-xl)] px-4 py-2.5 text-left tracking-normal normal-case"
                      >
                        <ShieldCheck
                          className="size-3.5 shrink-0 text-[var(--color-accent)]"
                          aria-hidden
                        />
                        <span className="text-[var(--color-primary)]" dir="ltr">
                          {cert.title}
                        </span>
                        <span className="text-[var(--color-muted-foreground)]" dir="ltr">
                          · {cert.issuer} ({cert.year})
                        </span>
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
