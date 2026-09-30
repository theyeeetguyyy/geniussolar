import { renderOg, ogContentType, ogSize } from "@/lib/og";
import { photos } from "@/content/photos";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Let the sun pay your bills. — Genius Solar Services, Indore";

export default async function Image() {
  return renderOg({
    title: "Let the *sun* pay your bills.",
    eyebrow: "Solar panel company in Indore",
    facts: [{ k: "Home subsidy", v: "Up to ₹78,000" }, { k: "Panel warranty", v: "30 years" }, { k: "Free service", v: "5 years" }],
    photo: photos.elevated2025.file,
  });
}
