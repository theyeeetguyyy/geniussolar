import { renderOg, ogContentType, ogSize } from "@/lib/og";
import { photos } from "@/content/photos";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Rooftop solar across Indore. — Genius Solar Services, Indore";

export default async function Image() {
  return renderOg({
    title: "Rooftop solar across *Indore*.",
    eyebrow: "Areas we serve",
    facts: [{ k: "Office", v: "Vijay Nagar" }, { k: "Also", v: "Rau · Mhow · Pithampur" }],
    photo: photos.chotaBangarda.file,
  });
}
