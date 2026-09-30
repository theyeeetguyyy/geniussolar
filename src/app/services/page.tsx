import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { staticPages } from "@/content/registry";
import { services } from "@/content/services";
import { photos } from "@/content/photos";
import { PageHero } from "@/components/sections/page-hero";
import { Process } from "@/components/sections/process";
import { CtaQuote } from "@/components/sections/cta-quote";
import { AiSummary } from "@/components/seo/ai-summary";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/icons";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph, itemListSchema, serviceSchema, webPageSchema } from "@/lib/schema";

const P = staticPages.services;
export const metadata: Metadata = pageMetadata({ ...P, markdown: "/services.md" });

const paperwork = [
  { href: "/solar-subsidy-mp", t: "Subsidy assistance", b: "PM Surya Ghar registration, claim and follow-up.", icon: "Stamp" as const },
  { href: "/net-metering-indore", t: "Net metering", b: "MP West Discom application, inspection and meter.", icon: "Meter" as const },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", path: P.path }]}
        eyebrow="What we do"
        title="Design. Install. Approve. *Maintain.*"
        lead="One team for the whole life of your solar system — from the first survey to year-five service visits and beyond."
        tone="sun"
      />
      <div className="container-x mb-16">
        <AiSummary>
          <p>
            Genius Solar Services offers turnkey rooftop solar installation, elevated solar structures, hybrid systems with battery
            backup, commercial and industrial solar EPC, solar panel cleaning and maintenance (AMC), PM Surya Ghar subsidy assistance and
            MP West Discom net-metering applications in Indore and nearby areas. Every installation includes five years of free service.
          </p>
        </AiSummary>
      </div>

      <section aria-label="Services" className="mb-24">
        <div className="container-x grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const I = Icon[s.icon];
            const ph = photos[s.photo];
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className={`group relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-panel bg-ink p-7 text-white ${i === 0 ? "lg:col-span-2" : ""}`}
              >
                <Image src={ph.src} alt={ph.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover opacity-70 transition-transform duration-1000 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
                <span className="relative">
                  <span className="grid size-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur transition-colors group-hover:bg-sun group-hover:text-ink">
                    <I size={24} />
                  </span>
                  <span className="mt-5 block text-2xl font-semibold tracking-[-0.03em]">{s.name}</span>
                  <span className="mt-2 block max-w-md text-white/70">{s.lead}</span>
                </span>
              </Link>
            );
          })}
          {paperwork.map((p) => {
            const I = Icon[p.icon];
            return (
              <Link key={p.href} href={p.href} className="group flex min-h-[12rem] flex-col justify-between rounded-panel bg-white p-7 ring-1 ring-line hover:shadow-soft">
                <I size={28} className="text-sun-ink" />
                <span>
                  <span className="block text-xl font-semibold tracking-[-0.02em]">{p.t}</span>
                  <span className="mt-1 block text-graphite">{p.b}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <Process index="" />
      <CtaQuote source="Services hub" />
      <JsonLd
        data={graph(
          webPageSchema({ path: P.path, title: P.title, description: P.description, type: "CollectionPage" }),
          breadcrumbSchema(P.path, [{ name: "Services", path: P.path }]),
          itemListSchema(P.path, services.map((s) => ({ name: s.name, path: `/services/${s.slug}` })), "Solar services"),
          ...services.map((s) => serviceSchema({ name: s.name, description: s.summary, path: `/services/${s.slug}`, serviceType: s.serviceType })),
        )}
      />
    </>
  );
}
