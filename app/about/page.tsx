import type { Metadata } from "next";

import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ekrami Labs is the work of an engineer who spent thirty years inside the systems enterprises actually run.",
};

export default function AboutPage() {
  return <AboutContent />;
}
