import type { Metadata } from "next";
import Link from "next/link";
import { staticPages } from "@/content/registry";
import { pillars } from "@/content/pillars";
import { systemSizes } from "@/content/systems";
import { GuidePage } from "@/components/sections/guide-page";
import { QuickCalculator } from "@/components/tools/quick-calculator";
import { ButtonLink } from "@/components/ui/button";
import { formatLakh, priceRange, subsidyFor } from "@/lib/solar";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { productSchema } from "@/lib/schema";

const P = staticPages.price;
export const metadata: Metadata = pageMetadata({
  ...P,
  keywords: [
    "solar panel price in Indore",
    "3kW solar system price Indore",
    "5kW solar system price Indore",
    "solar cost after subsidy Indore",
    "rooftop solar cost Indore",
  ],
  markdown: "/solar-panel-price-indore.md",
});

export default function PricePage() {
  const d = pillars.price;
  return (
    <GuidePage
      path={P.path}
      title={P.title}
      description={P.description}
      crumbs={[{ name: "Solar panel price in Indore", path: P.path }]}
      eyebrow="Prices updated September 2026"
      h1="Solar panel price in Indore, *honestly* itemised."
      lead="What a rooftop system really costs in Indore — before and after the ₹78,000 subsidy — and what should be included for that price."
      actions={
        <ButtonLink href="/contact" variant="sun" size="lg">
          Get an itemised quote
        </ButtonLink>
      }
      summary={d.summary}
      facts={d.facts}
      tool={
        <div className="container-x">
          <QuickCalculator />
        </div>
      }
      markdown={d.body}
      faqs={d.faqs}
      related={["/solar-subsidy-mp", "/solar-systems", "/learn/how-to-choose-solar-installer-indore", "/learn/solar-loan-emi-guide"]}
      source="Price guide"
      extraSchema={[
        productSchema({
          name: "Rooftop solar system (on-grid) — Indore",
          description: "Turnkey on-grid rooftop solar system with DCR modules, inverter, structure, protection, installation, net metering and subsidy paperwork.",
          path: P.path,
          image: absoluteUrl(`${P.path}/opengraph-image`),
          low: priceRange(1).low,
          high: priceRange(10).high,
          sku: "GSS-ONGRID-HOME",
        }),
      ]}
    >
      <section aria-label="Prices by size" className="mb-24">
        <div className="container-x">
          <p className="label text-graphite">Jump to a size</p>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {systemSizes.map((s) => {
              const p = priceRange(s.kw, s.segment);
              const sub = subsidyFor(s.kw, s.segment);
              return (
                <li key={s.slug}>
                  <Link
                    href={`/solar-systems/${s.slug}`}
                    className="group block rounded-card bg-white p-5 ring-1 ring-line transition-all hover:-translate-y-0.5 hover:shadow-soft"
                  >
                    <span className="text-3xl font-semibold tracking-[-0.04em]">{s.kw} kW</span>
                    <span className="mt-2 block text-sm text-graphite">from {formatLakh(Math.max(0, p.low - sub))}</span>
                    <span className="label mt-3 block text-sun-ink">{sub ? "after subsidy" : "no subsidy"}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </GuidePage>
  );
}
