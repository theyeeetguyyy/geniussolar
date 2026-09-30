import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Solar, in plain words. — Genius Solar Services, Indore";

export default async function Image() {
  return renderOg({
    title: "Solar, in *plain* words.",
    eyebrow: "Glossary",
    facts: [{ k: "Terms", v: "kWp · DCR · MPPT · TOPCon" }],
  });
}
