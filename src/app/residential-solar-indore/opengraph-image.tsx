import { renderOg, ogContentType, ogSize } from "@/lib/og";
import { photos } from "@/content/photos";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Home solar, built to outlast the loan. — Genius Solar Services, Indore";

export default async function Image() {
  return renderOg({
    title: "Home solar, built to *outlast* the loan.",
    eyebrow: "Residential rooftop solar · Indore",
    facts: [{ k: "Popular size", v: "3–5 kW" }, { k: "Subsidy", v: "Up to ₹78,000" }, { k: "Payback", v: "3–5 years" }],
    photo: photos.homeownersUnder.file,
  });
}
