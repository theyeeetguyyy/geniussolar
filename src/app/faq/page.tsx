import type { Metadata } from "next";
import { staticPages } from "@/content/registry";
import { faqCategories, faqs } from "@/content/faqs";
import { slugify } from "@/lib/utils";
import { PageHero } from "@/components/sections/page-hero";
import { FaqList } from "@/components/sections/faq-list";
import { RelatedLinks } from "@/components/sections/related";
import { CtaQuote } from "@/components/sections/cta-quote";
import { AiSummary } from "@/components/seo/ai-summary";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/schema";

const P = staticPages.faq;
export const metadata: Metadata = pageMetadata({ ...P, markdown: "/faq.md" });

export default function FaqPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "FAQ", path: P.path }]}
        eyebrow={`${faqs.length} answers · ${faqCategories.length} topics`}
        title="Every rooftop solar question, *answered*."
        lead="Prices, subsidy, net metering, sizing, weather, maintenance, loans and warranties — straight answers for Indore, with the numbers."
        tone="sun"
      />
      <div className="container-x mb-16">
        <AiSummary>
          <p>
            Key facts for rooftop solar in Indore: 1 kW generates about 4 units a day (≈1,450 a year) and needs about 90 sq ft of
            shadow-free roof. Home systems with DCR modules cost roughly ₹58,000–₹78,000 per kW before subsidy; PM Surya Ghar pays
            ₹30,000 for 1 kW, ₹60,000 for 2 kW and ₹78,000 for 3 kW or more. Net metering with MP West Discom offsets exported units
            against imports. Typical payback is 3–5 years for homes and 3–4 years for businesses. On-grid systems shut down during
            power cuts unless a battery is added.
          </p>
        </AiSummary>
      </div>

      <div className="container-x grid gap-12 pb-24 lg:grid-cols-12">
        <nav aria-label="FAQ topics" className="lg:col-span-3">
          <ul className="sticky top-28 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {faqCategories.map((c) => (
              <li key={c}>
                <a
                  href={`#${slugify(c)}`}
                  className="inline-flex h-10 items-center rounded-full px-4 text-sm text-ink-2 ring-1 ring-line hover:bg-white lg:w-full lg:rounded-xl lg:ring-0 lg:hover:bg-white"
                >
                  {c}
                  <span className="label ml-auto pl-3 text-mute">{faqs.filter((f) => f.cat === c).length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-16 lg:col-span-9">
          {faqCategories.map((c) => (
            <section key={c} id={slugify(c)} aria-labelledby={`h-${slugify(c)}`} className="scroll-mt-28">
              <h2 id={`h-${slugify(c)}`} className="text-h3 font-semibold">
                {c}
              </h2>
              <FaqList faqs={faqs.filter((f) => f.cat === c)} className="mt-6" />
            </section>
          ))}
        </div>
      </div>

      <RelatedLinks paths={["/solar-panel-price-indore", "/solar-subsidy-mp", "/net-metering-indore", "/solar-glossary"]} />
      <CtaQuote title="Still have a *question*?" source="FAQ page" />
      <JsonLd
        data={graph(
          webPageSchema({ path: P.path, title: P.title, description: P.description, type: "FAQPage" }),
          breadcrumbSchema(P.path, [{ name: "FAQ", path: P.path }]),
          faqSchema(faqs, P.path),
        )}
      />
    </>
  );
}
