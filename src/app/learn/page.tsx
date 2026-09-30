import type { Metadata } from "next";
import Link from "next/link";
import { articles, clusters, readingMinutes } from "@/content/articles";
import { staticPages } from "@/content/registry";
import { PageHero } from "@/components/sections/page-hero";
import { CtaQuote } from "@/components/sections/cta-quote";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/icons";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph, itemListSchema, webPageSchema } from "@/lib/schema";

const P = staticPages.learn;
export const metadata: Metadata = pageMetadata({ ...P, markdown: "/learn.md" });

const pillars = [
  { href: "/solar-panel-price-indore", t: "Solar panel price in Indore", b: "1–100 kW, before and after subsidy" },
  { href: "/solar-subsidy-mp", t: "PM Surya Ghar subsidy in MP", b: "Amounts, eligibility, documents, steps" },
  { href: "/net-metering-indore", t: "Net metering in Indore", b: "Process, billing and a live visualiser" },
];

export default function LearnPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Learn", path: "/learn" }]}
        eyebrow="Solar knowledge base"
        title="Everything about rooftop solar in *Indore*, answered plainly."
        lead="Written by the people who install it. Costs, subsidy, technology, weather, safety and care — with real numbers for Indore, not generic brochures."
      />

      <section aria-label="Pillar guides" className="pb-16">
        <div className="container-x grid gap-4 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Link
              key={p.href}
              href={p.href}
              className={`group relative flex min-h-56 flex-col justify-between overflow-hidden rounded-panel p-7 ring-1 transition-transform duration-500 hover:-translate-y-1 ${i === 0 ? "sun-gradient ring-sun/30" : "bg-white ring-line"}`}
            >
              <span className="label text-ink/60">Pillar guide</span>
              <span>
                <span className="block text-2xl font-semibold leading-tight tracking-[-0.03em]">{p.t}</span>
                <span className="mt-2 block text-sm text-ink/70">{p.b}</span>
              </span>
              <Icon.ArrowUpRight size={22} className="absolute right-6 top-6 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </section>

      {clusters.map((c) => {
        const list = articles.filter((a) => a.cluster === c);
        if (!list.length) return null;
        return (
          <section key={c} aria-label={c} className="border-t border-line py-14">
            <div className="container-x grid gap-8 lg:grid-cols-12">
              <h2 className="text-h3 font-semibold lg:col-span-3">{c}</h2>
              <ul className="grid gap-px overflow-hidden rounded-panel bg-line ring-1 ring-line sm:grid-cols-2 lg:col-span-9">
                {list.map((a) => (
                  <li key={a.slug} className="bg-white">
                    <Link href={`/learn/${a.slug}`} className="group flex h-full flex-col gap-3 p-6 transition-colors hover:bg-stone-50">
                      <span className="label text-graphite">{readingMinutes(a)} min read</span>
                      <span className="text-lg font-semibold leading-snug tracking-[-0.02em] group-hover:underline group-hover:decoration-sun group-hover:decoration-2 group-hover:underline-offset-4">
                        {a.title}
                      </span>
                      <span className="line-clamp-2 text-sm text-graphite">{a.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section aria-label="Reference" className="border-t border-line py-14">
        <div className="container-x flex flex-wrap gap-3">
          {[
            { href: "/faq", t: "Full FAQ" },
            { href: "/solar-glossary", t: "Solar glossary" },
            { href: "/solar-systems", t: "Systems by size" },
            { href: "/solar-installation", t: "Areas we serve" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-5 font-medium ring-1 ring-line hover:ring-ink/20">
              {l.t} <Icon.ArrowRight size={16} />
            </Link>
          ))}
        </div>
      </section>

      <CtaQuote source="Learn hub" />
      <JsonLd
        data={graph(
          webPageSchema({ path: P.path, title: P.title, description: P.description, type: "CollectionPage" }),
          breadcrumbSchema(P.path, [{ name: "Learn", path: P.path }]),
          itemListSchema(P.path, articles.map((a) => ({ name: a.title, path: `/learn/${a.slug}` })), "Solar guides"),
        )}
      />
    </>
  );
}
