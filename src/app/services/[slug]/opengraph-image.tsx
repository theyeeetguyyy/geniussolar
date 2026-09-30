import { renderOg, ogContentType, ogSize } from "@/lib/og";
import { serviceBySlug, services } from "@/content/services";
import { photos } from "@/content/photos";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Solar service — Genius Solar Services, Indore";
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = serviceBySlug(slug)!;
  return renderOg({ title: s.name, eyebrow: "Service · Indore", facts: [{ k: "Free service", v: "5 years" }], photo: photos[s.photo].file });
}
