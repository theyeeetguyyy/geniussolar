import { renderOg, ogContentType, ogSize } from "@/lib/og";
import { photos } from "@/content/photos";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Design. Install. Approve. Maintain. — Genius Solar Services, Indore";

export default async function Image() {
  return renderOg({
    title: "Design. Install. Approve. *Maintain.*",
    eyebrow: "Solar services · Indore",
    facts: [{ k: "Free service", v: "5 years" }, { k: "Paperwork", v: "Subsidy + net meter" }],
    photo: photos.teamRooftop.file,
  });
}
