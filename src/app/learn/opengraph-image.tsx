import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Solar guides for Indore, answered plainly. — Genius Solar Services, Indore";

export default async function Image() {
  return renderOg({
    title: "Solar guides for *Indore*, answered plainly.",
    eyebrow: "Knowledge base",
    facts: [{ k: "Guides", v: "Costs · subsidy · tech" }],
  });
}
