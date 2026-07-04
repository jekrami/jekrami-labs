import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

/**
 * Site-wide Open Graph image, generated at build time so social previews
 * never depend on a hand-exported static asset going stale or missing.
 * Any route without its own opengraph-image.tsx falls back to this one.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "96px",
        backgroundColor: "#FFFFFF",
        backgroundImage:
          "linear-gradient(rgba(11,37,69,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(11,37,69,0.05) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: 14,
            backgroundColor: "#0B2545",
            color: "#FFFFFF",
            fontSize: 32,
            fontWeight: 700,
          }}
        >
          J
        </div>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            backgroundColor: "#0077B6",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 48,
          fontSize: 76,
          fontWeight: 700,
          color: "#0B2545",
          letterSpacing: -2,
          lineHeight: 1.1,
        }}
      >
        <span>Engineering Trustworthy</span>
        <span>AI Systems.</span>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 32,
          fontSize: 28,
          color: "#6C757D",
        }}
      >
        {site.subtitle}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginTop: 56,
        }}
      >
        <div style={{ width: 84, height: 4, backgroundColor: "#0077B6" }} />
        <div style={{ display: "flex", fontSize: 24, color: "#0B2545", fontWeight: 600 }}>
          {site.shortName}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
