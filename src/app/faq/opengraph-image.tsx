import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Every rooftop solar question, answered. — Genius Solar Services, Indore";

export default async function Image() {
  return renderOg({
    title: "Every rooftop solar question, *answered*.",
    eyebrow: "FAQ · Indore",
    facts: [{ k: "Topics", v: "Cost · subsidy · care" }],
  });
}
