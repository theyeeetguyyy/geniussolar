import { renderOg, ogContentType, ogSize } from "@/lib/og";
import { photos } from "@/content/photos";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Two decades of after-sales, now solar. — Genius Solar Services, Indore";

export default async function Image() {
  return renderOg({
    title: "Two decades of *after-sales*, now solar.",
    eyebrow: "About Genius Solar",
    facts: [{ k: "Based in", v: "Vijay Nagar" }, { k: "Recognition", v: "MP Solar Awards 2025" }],
    photo: photos.teamUnderArray.file,
  });
}
