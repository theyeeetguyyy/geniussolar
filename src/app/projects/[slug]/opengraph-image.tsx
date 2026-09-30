import { renderOg, ogContentType, ogSize } from "@/lib/og";
import { formatMonth, projectBySlug, projects } from "@/content/projects";
import { photos } from "@/content/photos";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Solar project — Genius Solar Services, Indore";
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projectBySlug(slug)!;
  const facts = [{ k: "Location", v: p.locality ?? p.city }];
  if (p.completed) facts.push({ k: "Completed", v: formatMonth(p.completed)! });
  if (p.capacityKw) facts.push({ k: "Capacity", v: `${p.capacityKw} kW` });
  return renderOg({ title: p.title, eyebrow: "Project · Indore", facts, photo: photos[p.cover].file });
}
