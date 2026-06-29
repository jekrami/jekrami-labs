"use client";

import * as React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type Direction = "up" | "down" | "left" | "right";

type SlideInProps = {
  children: React.ReactNode;
  direction?: Direction;
  /** Travel distance in pixels (with `direction` it controls magnitude). */
  y?: number;
  /** Travel distance in pixels for horizontal slides. */
  x?: number;
  delay?: number;
  duration?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "initial" | "animate" | "transition">;

/**
 * Slide-in with a quiet ease curve — used for hero copy and section headings.
 * Stays below 24px of travel so it never reads as a banner animation.
 */
export function SlideIn({
  children,
  direction = "up",
  y = 12,
  x = 12,
  delay = 0,
  duration = 0.7,
  className,
  ...rest
}: SlideInProps) {
  const reduced = useReducedMotion();

  const offset =
    direction === "up"
      ? { x: 0, y: reduced ? 0 : y }
      : direction === "down"
        ? { x: 0, y: reduced ? 0 : -y }
        : direction === "left"
          ? { x: reduced ? 0 : x, y: 0 }
          : { x: reduced ? 0 : -x, y: 0 };

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
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
