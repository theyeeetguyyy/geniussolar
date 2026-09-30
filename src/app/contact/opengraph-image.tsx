import { renderOg, ogContentType, ogSize } from "@/lib/og";
import { photos } from "@/content/photos";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Let us look at your roof. — Genius Solar Services, Indore";

export default async function Image() {
  return renderOg({
    title: "Let us look at *your* roof.",
    eyebrow: "Free survey · Vijay Nagar, Indore",
    facts: [{ k: "Call", v: "+91 98267 12299" }, { k: "Hours", v: "Mon–Sat 10–7" }],
    photo: photos.crewRooftop.file,
  });
}
