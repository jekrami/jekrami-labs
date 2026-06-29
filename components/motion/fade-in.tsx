"use client";

import * as React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "initial" | "animate" | "transition">;

/**
 * A subtle fade-in used across the site.
 * Renders nothing extra when prefers-reduced-motion is set.
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  y = 8,
  className,
  ...rest
}: FadeInProps) {
  const reduced = useReducedMotion();
  const initial = reduced ? { opacity: 1, y: 0 } : { opacity: 0, y };
  const animate = { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: reduced ? 0 : duration,
        delay: reduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
