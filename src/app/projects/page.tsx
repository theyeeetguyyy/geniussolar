import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { staticPages } from "@/content/registry";
import { projects, formatMonth } from "@/content/projects";
import { photos, portfolioPhotos } from "@/content/photos";
import { PageHero } from "@/components/sections/page-hero";
import { CtaQuote } from "@/components/sections/cta-quote";
import { PortfolioGallery } from "@/components/gallery/portfolio-gallery";
import { SiteFilm } from "@/components/gallery/site-film";
import { AiSummary } from "@/components/seo/ai-summary";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/icons";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph, imageSchema, itemListSchema, webPageSchema } from "@/lib/schema";

const P = staticPages.projects;
export const metadata: Metadata = pageMetadata({
  ...P,
  keywords: ["solar projects Indore", "rooftop solar installation photos Indore", "elevated solar structure Indore", "solar company portfolio Indore"],
  markdown: "/projects.md",
});

export default function ProjectsPage() {
  const photoToProject = new Map<string, { slug: string; title: string }>();
  projects.forEach((p) => p.gallery.forEach((k) => photoToProject.set(photos[k].id, { slug: p.slug, title: p.title })));
  const items = portfolioPhotos.map((photo) => ({ photo, project: photoToProject.get(photo.id) }));

  return (
    <>
      <PageHero
        crumbs={[{ name: "Projects", path: P.path }]}
        eyebrow={`${projects.length} case studies · ${portfolioPhotos.length} photographs · all in and around Indore`}
        title="Rooftops, *not* renders."
        lead="Every photo here is a real Genius Solar installation — elevated arrays over family terraces, metal-sheet roofs, inverters on stairwell walls, and the people who live under them."
      />

      <div className="container-x mb-20">
        <AiSummary
          facts={[
            { k: "Case studies", v: String(projects.length) },
            { k: "Photographs", v: String(portfolioPhotos.length) },
            { k: "Signature", v: "Elevated GI structures" },
            { k: "Service area", v: "Indore & nearby" },
          ]}
        >
          <p>
            This portfolio documents rooftop solar systems installed by Genius Solar Services in Indore, Madhya Pradesh, including
            elevated galvanised structures in Mukherjee Nagar and near Chota Bangarda Road (November 2024), an open-terrace array
            commissioned in November 2025, a raised array over a terrace garden, and a metal-sheet roof installation. Each case study
            lists location, structure type and completion date where recorded.
          </p>
        </AiSummary>
      </div>

      <section aria-labelledby="cases-title" className="mb-28">
        <div className="container-x">
          <h2 id="cases-title" className="text-h2 font-semibold">
            Case <span className="serif-accent text-sun-ink">studies</span>
          </h2>
          <ul className="mt-12 space-y-4">
            {projects.map((p, i) => {
              const ph = photos[p.cover];
              return (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group grid overflow-hidden rounded-panel bg-white ring-1 ring-line transition-shadow hover:shadow-lift md:grid-cols-12"
                  >
                    <div className={`relative min-h-[22rem] overflow-hidden md:col-span-5 ${i % 2 ? "md:order-2" : ""}`}>
                      <Image src={ph.src} alt={ph.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-sun)] group-hover:scale-105" />
                    </div>
                    <div className="flex flex-col justify-between gap-8 p-7 sm:p-10 md:col-span-7">
                      <div>
                        <p className="label flex flex-wrap gap-x-4 gap-y-1 text-graphite">
                          <span className="text-sun-ink">{String(i + 1).padStart(2, "0")}</span>
                          <span>{p.locality ? `${p.locality}, ${p.city}` : p.city}</span>
                          {p.completed ? <span>{formatMonth(p.completed)}</span> : null}
                        </p>
                        <h3 className="mt-5 text-[clamp(1.6rem,2.8vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.035em]">{p.title}</h3>
                        <p className="mt-4 max-w-xl text-graphite">{p.summary}</p>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                        <p className="text-sm text-ink-2">{p.structure}</p>
                        <span className="inline-flex items-center gap-2 font-medium">
                          Read case study
                          <Icon.ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="film-title" className="mb-28">
        <div className="container-x grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label text-graphite">Site film</p>
            <h2 id="film-title" className="mt-4 text-h3 font-semibold">
              Walk the rows of a finished rooftop array.
            </h2>
            <p className="mt-3 text-graphite">Uniform clamps, aligned rails, cable ties every few feet — the details you only see up close.</p>
          </div>
          <div className="lg:col-span-8">
            <SiteFilm src="/media/rooftop-solar-array-walkthrough-indore.mp4" poster={photos.walkthroughPoster.src} caption="Rooftop array walkthrough · Indore" />
          </div>
        </div>
      </section>

      <section aria-labelledby="archive-title" className="mb-28">
        <div className="container-x">
          <h2 id="archive-title" className="text-h2 font-semibold">
            The <span className="serif-accent text-sun-ink">archive</span>
          </h2>
          <p className="mt-4 max-w-xl text-graphite">Filter by what you want to see. Tap any photo to open it full screen.</p>
          <div className="mt-10">
            <PortfolioGallery items={items} />
          </div>
        </div>
      </section>

      <CtaQuote title="Your roof could be *next*." source="Projects page" />
      <JsonLd
        data={graph(
          webPageSchema({ path: P.path, title: P.title, description: P.description, type: "CollectionPage" }),
          breadcrumbSchema(P.path, [{ name: "Projects", path: P.path }]),
          itemListSchema(P.path, projects.map((p) => ({ name: p.title, path: `/projects/${p.slug}` })), "Solar projects"),
          portfolioPhotos.map((ph) => imageSchema(ph, { location: "Indore, Madhya Pradesh" })),
        )}
      />
    </>
  );
}
