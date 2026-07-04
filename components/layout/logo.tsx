import logoImage from "@/logo.png";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function Logo({ className, priority }: LogoProps) {
  return (
    // Bundled import gets a content-hashed URL so logo updates are not cached.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logoImage.src}
      alt={site.name}
      width={logoImage.width}
      height={logoImage.height}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={cn("h-10 w-auto object-contain md:h-11", className)}
    />
  );
}
