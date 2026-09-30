import { renderOg, ogContentType, ogSize } from "@/lib/og";
import { photos } from "@/content/photos";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Commercial solar with 3–4 year payback. — Genius Solar Services, Indore";

export default async function Image() {
  return renderOg({
    title: "Commercial solar with *3–4 year* payback.",
    eyebrow: "Business & industry · Indore · Pithampur",
    facts: [{ k: "Plant size", v: "10–500 kW" }, { k: "Roofs", v: "RCC · metal · asbestos" }],
    photo: photos.metalRoof.file,
  });
}
