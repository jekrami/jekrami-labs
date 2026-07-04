"use client";

import * as React from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

/**
 * Magnetic — a soft pointer-follow pull for primary calls to action.
 * The shift is capped at a few pixels so it reads as responsiveness,
 * not gimmick. Inactive on coarse pointers and under reduced motion.
 */
export function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!finePointer || reduceMotion) return;

      const xTo = gsap.quickTo(element, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(element, "y", { duration: 0.4, ease: "power3" });

      const onMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const relX = event.clientX - (rect.left + rect.width / 2);
        const relY = event.clientY - (rect.top + rect.height / 2);
        xTo(Math.max(-8, Math.min(8, relX * strength)));
        yTo(Math.max(-6, Math.min(6, relY * strength)));
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      element.addEventListener("pointermove", onMove);
      element.addEventListener("pointerleave", onLeave);
      return () => {
        element.removeEventListener("pointermove", onMove);
        element.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} style={{ display: "inline-flex" }}>
      {children}
    </div>
  );
}
