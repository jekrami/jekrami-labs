import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/mdx/callout";

/**
 * Component mapping used by `next-mdx-remote` when rendering MDX.
 * Keep the mapping minimal — the article body relies on `.prose-jekrami`
 * in `app/globals.css` for almost all styling.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="mt-0 font-[var(--font-heading)] text-3xl font-semibold text-[var(--color-primary)] sm:text-4xl"
        {...props}
      />
    ),
    h2: (props) => <h2 {...props} />,
    h3: (props) => <h3 {...props} />,
    p: (props) => <p {...props} />,
    a: (props) => <a target="_blank" rel="noreferrer" {...props} />,
    Callout,
    ...components,
  };
}
