import { cn } from "@/lib/utils";

/**
 * Inline callout usable inside MDX content.
 *
 *   <Callout tone="info">...</Callout>
 */
export function Callout({
  children,
  tone = "info",
}: {
  children: React.ReactNode;
  tone?: "info" | "warning" | "success";
}) {
  return (
    <aside
      className={cn(
        "my-6 rounded-[var(--radius-md)] border-l-4 bg-[var(--color-muted)] px-5 py-4 text-sm text-[var(--color-foreground)]",
        tone === "info" && "border-[var(--color-accent)]",
        tone === "warning" && "border-amber-500",
        tone === "success" && "border-emerald-500",
      )}
    >
      {children}
    </aside>
  );
}
