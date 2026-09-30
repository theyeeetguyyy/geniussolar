import { renderOg, ogContentType, ogSize } from "@/lib/og";
import { areaBySlug, areas, distanceFromOffice } from "@/content/areas";
import { projectBySlug } from "@/content/projects";
import { photos } from "@/content/photos";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Solar installation area — Genius Solar Services, Indore";
export const generateStaticParams = () => areas.map((a) => ({ slug: a.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = areaBySlug(slug)!;
  const project = a.projectSlugs?.[0] ? projectBySlug(a.projectSlugs[0]) : undefined;
  return renderOg({
    title: `Solar installation in *${a.name.split(" & ")[0]}*`,
    eyebrow: a.kind === "city" ? "Nearby city" : "Indore locality",
    facts: [
      { k: "From our office", v: `≈${distanceFromOffice(a)} km` },
      { k: "Typical", v: a.typicalSizes.split(" · ")[0] },
    ],
    photo: project ? photos[project.cover].file : undefined,
  });
}
