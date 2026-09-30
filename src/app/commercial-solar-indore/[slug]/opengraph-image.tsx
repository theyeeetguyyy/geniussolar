import { renderOg, ogContentType, ogSize } from "@/lib/og";
import { industries, industryBySlug } from "@/content/industries";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Commercial solar — Genius Solar Services, Indore";
export const generateStaticParams = () => industries.map((i) => ({ slug: i.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = industryBySlug(slug)!;
  return renderOg({
    title: `Solar for ${i.name.toLowerCase()} in *Indore*`,
    eyebrow: "Commercial & industrial",
    facts: [
      { k: "Typical size", v: `${i.typicalKw[0]}–${i.typicalKw[1]} kW` },
      { k: "Payback", v: "≈3–4 years" },
    ],
  });
}
