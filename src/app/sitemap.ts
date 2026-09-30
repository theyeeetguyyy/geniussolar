import type { MetadataRoute } from "next";
import { allPages } from "@/content/registry";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { areas } from "@/content/areas";
import { photos, portfolioPhotos } from "@/content/photos";
import { absoluteUrl } from "@/lib/seo";

/** One sitemap with image extensions — every indexable page plus the real photos it shows. */
export default function sitemap(): MetadataRoute.Sitemap {
  const img = (keys: (keyof typeof photos)[]) => keys.map((k) => absoluteUrl(photos[k].src.src));
  const imagesFor = (path: string): string[] | undefined => {
    if (path === "/") return img(["elevated2025", "mukherjeeNagar", "familyNewSystem", "metalRoof", "award2025"]);
    if (path === "/projects") return portfolioPhotos.map((p) => absoluteUrl(p.src.src));
    if (path === "/about") return img(["teamUnderArray", "founder", "award2025", "teamRooftop"]);
    const project = projects.find((p) => `/projects/${p.slug}` === path);
    if (project) return img(project.gallery);
    const service = services.find((s) => `/services/${s.slug}` === path);
    if (service) return img([service.photo]);
    const area = areas.find((a) => `/solar-installation/${a.slug}` === path);
    if (area?.projectSlugs?.length) {
      const covers = area.projectSlugs.map((s) => projects.find((p) => p.slug === s)?.cover).filter(Boolean) as (keyof typeof photos)[];
      return img(covers);
    }
    return undefined;
  };

  return allPages().map((p) => ({
    url: absoluteUrl(p.path),
    lastModified: new Date(p.updated),
    changeFrequency: p.changeFrequency ?? (p.section === "Guides" || p.path === "/" ? "weekly" : "monthly"),
    priority: p.priority,
    images: imagesFor(p.path),
  }));
}
