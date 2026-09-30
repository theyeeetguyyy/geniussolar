import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Every system size, 1–100 kW. — Genius Solar Services, Indore";

export default async function Image() {
  return renderOg({
    title: "Every system size, *1–100 kW*.",
    eyebrow: "Solar systems by size · Indore",
    facts: [{ k: "Per kW / day", v: "≈4 units" }, { k: "Roof per kW", v: "≈90 sq ft" }],
  });
}
