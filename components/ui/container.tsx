import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Page-width container with responsive horizontal padding.
 * Use as the single wrapper for every section to keep vertical rhythm aligned.
 */
export const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mx-auto w-full max-w-[76rem] px-6 sm:px-8 lg:px-12", className)}
    {...props}
  />
));
Container.displayName = "Container";
