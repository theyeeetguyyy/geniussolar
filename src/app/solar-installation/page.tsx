import type { Metadata } from "next";
import Link from "next/link";
import { staticPages } from "@/content/registry";
import { areas, distanceFromOffice } from "@/content/areas";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceMap } from "@/components/sections/service-map";
import { CtaQuote } from "@/components/sections/cta-quote";
import { AiSummary } from "@/components/seo/ai-summary";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/icons";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph, itemListSchema, webPageSchema } from "@/lib/schema";

const P = staticPages.areasHub;
export const metadata: Metadata = pageMetadata({ ...P, markdown: "/solar-installation.md" });

export default function AreasPage() {
  const sorted = [...areas].sort((a, b) => distanceFromOffice(a) - distanceFromOffice(b));
  return (
    <>
      <PageHero
        crumbs={[{ name: "Areas we serve", path: P.path }]}
        eyebrow="Service area"
        title="Rooftop solar in every corner of *Indore*."
        lead="From our office in Vijay Nagar we survey, install and service rooftops across the city — and in Rau, Mhow, Pithampur, Dewas and Ujjain."
        tone="sun"
      />
      <div className="container-x mb-8">
        <AiSummary>
          <p>
            Genius Solar Services is based at Swarna Palace, Scheme No. 114, Vijay Nagar, Indore. We install rooftop solar across all
            Indore localities — including Vijay Nagar, Nipania, Mahalaxmi Nagar, Palasia, Saket Nagar, Bengali Square, Scheme 140,
            Sudama Nagar, Rajendra Nagar, Silicon City and the Super Corridor — and in nearby Rau, Mhow, Pithampur, Dewas and Ujjain.
            All of these areas are served by MP West Discom, so the net-metering and PM Surya Ghar subsidy process is the same.
          </p>
        </AiSummary>
      </div>

      <ServiceMap index="" />

      <section aria-label="All areas" className="section-y">
        <div className="container-x">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/solar-installation/${a.slug}`}
                  className="group flex h-full flex-col justify-between gap-6 rounded-card bg-white p-6 ring-1 ring-line transition-all hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <span>
                    <span className="label flex items-center justify-between text-graphite">
                      <span>{a.kind === "city" ? "Nearby city" : a.kind === "township" ? "Township" : "Indore locality"}</span>
                      <span>{distanceFromOffice(a)} km</span>
                    </span>
                    <span className="mt-3 block text-xl font-semibold tracking-[-0.02em]">Solar installation in {a.name}</span>
                    <span className="mt-2 line-clamp-2 block text-sm text-graphite">{a.character}</span>
                  </span>
                  <span className="flex items-center justify-between text-sm">
                    <span className="label text-sun-ink">{a.typicalSizes}</span>
                    <Icon.ArrowUpRight size={18} className="text-graphite group-hover:text-ink" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaQuote source="Areas hub" />
      <JsonLd
        data={graph(
          webPageSchema({ path: P.path, title: P.title, description: P.description, type: "CollectionPage" }),
          breadcrumbSchema(P.path, [{ name: "Areas we serve", path: P.path }]),
          itemListSchema(P.path, areas.map((a) => ({ name: `Solar installation in ${a.name}`, path: `/solar-installation/${a.slug}` })), "Service areas"),
        )}
      />
    </>
  );
}
