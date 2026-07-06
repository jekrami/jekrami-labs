import type { Metadata } from "next";

import { ServicesContent } from "./services-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Work with Ekrami Labs — AI readiness assessments, RAG and architecture reviews, AI governance and security reviews, corporate training, and fractional AI advisory.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
