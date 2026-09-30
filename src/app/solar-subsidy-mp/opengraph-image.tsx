import { renderOg, ogContentType, ogSize } from "@/lib/og";
import { photos } from "@/content/photos";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Up to ₹78,000 solar subsidy in MP. — Genius Solar Services, Indore";

export default async function Image() {
  return renderOg({
    title: "Up to *₹78,000* solar subsidy in MP.",
    eyebrow: "PM Surya Ghar · Madhya Pradesh",
    facts: [{ k: "1 kW", v: "₹30,000" }, { k: "2 kW", v: "₹60,000" }, { k: "3 kW+", v: "₹78,000" }],
    photo: photos.familyHandover.file,
  });
}
