import logoImage from "@/logo.png";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function Logo({ className, priority }: LogoProps) {
  return (
    // The mark itself (chrome monogram + circuit/skyline motif) carries its own
    // shading, so it reads on both light and dark palettes. The wordmark is
    // rendered as live text — using the theme's foreground token — rather than
    // baked into the image, since raster text shrinks to illegibility at the
    // sizes a header/footer logo needs.
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {/* Bundled import gets a content-hashed URL so logo updates are not cached. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoImage.src}
        alt=""
        width={logoImage.width}
        height={logoImage.height}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className="h-full w-auto object-contain"
      />
      <span className="font-heading text-lg font-bold tracking-tight text-[var(--color-foreground)] md:text-xl">
        {site.name}
      </span>
    </span>
  );
}
