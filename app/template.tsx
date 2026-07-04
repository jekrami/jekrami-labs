"use client";

import * as React from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

/**
 * Page-enter transition. `template.tsx` remounts on every navigation,
 * which makes it the App Router's natural home for an entrance
 * animation — no exit-animation state machine required. Collapses to
 * nothing under prefers-reduced-motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion || !ref.current) return;
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          clearProps: "all",
        },
      );
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
