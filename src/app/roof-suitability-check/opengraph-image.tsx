import { renderOg, ogContentType, ogSize } from "@/lib/og";
import { photos } from "@/content/photos";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Is your roof ready for solar? — Genius Solar Services, Indore";

export default async function Image() {
  return renderOg({
    title: "Is your roof *ready* for solar?",
    eyebrow: "5-question roof check",
    facts: [{ k: "Time", v: "30 seconds" }, { k: "Result", v: "Instant verdict" }],
    photo: photos.terraceStructure.file,
  });
}
