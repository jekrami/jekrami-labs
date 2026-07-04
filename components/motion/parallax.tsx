"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type HTMLMotionProps,
} from "framer-motion";

type ParallaxProps = {
  children: React.ReactNode;
  /** Vertical travel in pixels (positive = slower than scroll). */
  offset?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "style">;

/**
 * Wraps content with a vertical parallax driven by scroll position.
 * Uses a parent ref + scroll progress so we don't measure the window twice.
 */
export function Parallax({ children, offset = 40, className, ...rest }: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [offset, -offset]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} {...rest}>
        {children}
      </motion.div>
    </div>
  );
}
