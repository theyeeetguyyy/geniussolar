import { renderOg, ogContentType, ogSize } from "@/lib/og";
import { articleBySlug, articles } from "@/content/articles";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Solar guide — Genius Solar Services, Indore";
export const generateStaticParams = () => articles.map((a) => ({ slug: a.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articleBySlug(slug)!;
  return renderOg({ title: a.title.split(":")[0], eyebrow: `Guide · ${a.cluster}`, facts: a.keyFacts.slice(0, 3) });
}
