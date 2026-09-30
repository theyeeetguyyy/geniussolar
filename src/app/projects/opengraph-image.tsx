import { renderOg, ogContentType, ogSize } from "@/lib/og";
import { photos } from "@/content/photos";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Rooftops, not renders. — Genius Solar Services, Indore";

export default async function Image() {
  return renderOg({
    title: "Rooftops, *not* renders.",
    eyebrow: "Project portfolio · Indore",
    facts: [{ k: "Signature", v: "Elevated structures" }],
    photo: photos.mukherjeeNagar.file,
  });
}
