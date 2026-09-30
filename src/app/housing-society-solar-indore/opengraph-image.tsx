import { renderOg, ogContentType, ogSize } from "@/lib/og";
import { photos } from "@/content/photos";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Lower maintenance bills for every flat. — Genius Solar Services, Indore";

export default async function Image() {
  return renderOg({
    title: "Lower maintenance bills for *every* flat.",
    eyebrow: "Housing society solar · Indore",
    facts: [{ k: "Subsidy", v: "₹18,000 / kW" }, { k: "Typical size", v: "20–100 kW" }],
    photo: photos.wideArray.file,
  });
}
