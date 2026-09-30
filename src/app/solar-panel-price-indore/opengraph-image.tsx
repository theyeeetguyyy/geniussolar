import { renderOg, ogContentType, ogSize } from "@/lib/og";
import { photos } from "@/content/photos";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Solar panel price in Indore, 2026. — Genius Solar Services, Indore";

export default async function Image() {
  return renderOg({
    title: "Solar panel price in *Indore*, 2026.",
    eyebrow: "Before & after subsidy",
    facts: [{ k: "Home, per kW", v: "₹58k–₹78k" }, { k: "Subsidy", v: "Up to ₹78,000" }],
    photo: photos.moduleRows.file,
  });
}
