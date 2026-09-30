import { renderOg, ogContentType, ogSize } from "@/lib/og";
import { systemBySlug, systemSizes } from "@/content/systems";
import { systemEstimate } from "@/content/generated";
import { formatINR, formatLakh } from "@/lib/solar";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Solar system size — Genius Solar Services, Indore";
export const generateStaticParams = () => systemSizes.map((s) => ({ slug: s.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = systemBySlug(slug)!;
  const e = systemEstimate(s);
  return renderOg({
    title: `${s.kw} kW solar system in *Indore*`,
    eyebrow: "Price · units · savings",
    facts: [
      { k: "Units / year", v: e.annualUnits.toLocaleString("en-IN") },
      { k: e.subsidy ? "After subsidy" : "Price", v: formatLakh(Math.max(0, e.price.mid - e.subsidy)) },
      { k: "Saves / month", v: formatINR(e.monthlySavings) },
    ],
  });
}
