import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Net metering in Indore, explained. — Genius Solar Services, Indore";

export default async function Image() {
  return renderOg({
    title: "Net metering in *Indore*, explained.",
    eyebrow: "MP West Discom · MPPKVVCL",
    facts: [{ k: "Meter", v: "Bi-directional" }, { k: "Typical time", v: "2–4 weeks" }],
  });
}
