import type { Metadata } from "next";

import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with JEKRAMI Labs — enterprise AI research and engineering engagements.",
};

export default function ContactPage() {
  return <ContactContent />;
}
