import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Drop your bill. See your solar. — Genius Solar Services, Indore";

export default async function Image() {
  return renderOg({
    title: "Drop your bill. *See* your solar.",
    eyebrow: "Free solar savings calculator",
    facts: [{ k: "Reads", v: "PDF & photo bills" }, { k: "Shows", v: "Size · savings · payback" }, { k: "Privacy", v: "On-device" }],
  });
}
