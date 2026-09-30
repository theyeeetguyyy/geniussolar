import type { Metadata } from "next";
import Link from "next/link";
import { staticPages } from "@/content/registry";
import { systemSizes } from "@/content/systems";
import { PageHero } from "@/components/sections/page-hero";
import { CtaQuote } from "@/components/sections/cta-quote";
import { AiSummary } from "@/components/seo/ai-summary";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/icons";
import { estimate, formatINR, formatLakh } from "@/lib/solar";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph, itemListSchema, webPageSchema } from "@/lib/schema";

const P = staticPages.systems;
export const metadata: Metadata = pageMetadata({ ...P, markdown: "/solar-systems.md" });

export default function SystemsPage() {
  const rows = systemSizes.map((s) => ({ s, e: estimate({ kw: s.kw, monthlyUnits: s.kw * 120, segment: s.segment }) }));
  return (
    <>
      <PageHero
        crumbs={[{ name: "Solar systems by size", path: P.path }]}
        eyebrow="1 kW to 100 kW"
        title="Every system size, with *Indore's* real numbers."
        lead="Generation, roof space, panel count, price before and after subsidy, savings and payback — calculated for Indore's sunshine."
        tone="sun"
      />
      <div className="container-x mb-16">
        <AiSummary
          facts={[
            { k: "Per kW / day", v: "≈4 units" },
            { k: "Roof per kW", v: "≈90 sq ft" },
            { k: "Most popular", v: "3 kW" },
            { k: "Max home subsidy", v: "₹78,000" },
          ]}
        >
          <p>
            In Indore, each kilowatt of rooftop solar generates about 4 units a day and needs about 90 sq ft of shadow-free roof. Home
            systems of 1–10 kW qualify for the PM Surya Ghar subsidy (₹30,000 for 1 kW, ₹60,000 for 2 kW, ₹78,000 for 3 kW and above).
            Business and industrial systems from 15 kW to 100 kW and beyond pay back through higher commercial tariffs instead. Choose
            the size closest to your average monthly consumption divided by 120.
          </p>
        </AiSummary>
      </div>

      <section aria-label="All sizes" className="mb-24">
        <div className="container-x">
          <div className="overflow-x-auto rounded-panel bg-white ring-1 ring-line">
            <table className="w-full min-w-[56rem] text-left">
              <thead>
                <tr className="border-b border-line">
                  {["Size", "Suits (units/month)", "Units / year", "Roof", "Price", "Subsidy", "Savings / month", "Payback", ""].map((h) => (
                    <th key={h} className="label px-5 py-4 font-medium text-graphite">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(({ s, e }) => (
                  <tr key={s.slug} className="group border-b border-line last:border-0 hover:bg-stone-50">
                    <td className="px-5 py-4">
                      <Link href={`/solar-systems/${s.slug}`} className="text-lg font-semibold tracking-[-0.02em] group-hover:underline group-hover:decoration-sun group-hover:decoration-2 group-hover:underline-offset-4">
                        {s.kw} kW
                      </Link>
                      <span className="label ml-2 text-mute">{s.segment === "home" ? "Home" : s.segment === "industry" ? "Industry" : "Business"}</span>
                    </td>
                    <td className="px-5 py-4 tabular text-ink-2">
                      {s.consumption[0].toLocaleString("en-IN")}–{s.consumption[1].toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-4 tabular">{e.annualUnits.toLocaleString("en-IN")}</td>
                    <td className="px-5 py-4 tabular">{e.roofSqft.toLocaleString("en-IN")} sq ft</td>
                    <td className="px-5 py-4 tabular">
                      {formatLakh(e.price.low)}–{formatLakh(e.price.high).replace("₹", "")}
                    </td>
                    <td className="px-5 py-4 tabular">{e.subsidy ? formatINR(e.subsidy) : "—"}</td>
                    <td className="px-5 py-4 tabular font-medium text-sun-ink">{formatINR(e.monthlySavings)}</td>
                    <td className="px-5 py-4 tabular">{e.paybackYears} yrs</td>
                    <td className="px-5 py-4">
                      <Link href={`/solar-systems/${s.slug}`} aria-label={`${s.kw} kW solar system details`}>
                        <Icon.ArrowRight size={18} className="text-graphite transition-transform group-hover:translate-x-1 group-hover:text-ink" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-mute">
            Estimates assume the system is sized to consumption, ₹7.5/unit (home), ₹9 (business), ₹8 (industry), and indicative prices.
          </p>
        </div>
      </section>

      <CtaQuote source="System sizes" />
      <JsonLd
        data={graph(
          webPageSchema({ path: P.path, title: P.title, description: P.description, type: "CollectionPage" }),
          breadcrumbSchema(P.path, [{ name: "Solar systems by size", path: P.path }]),
          itemListSchema(P.path, systemSizes.map((s) => ({ name: `${s.kw} kW solar system`, path: `/solar-systems/${s.slug}` })), "Solar systems by size"),
        )}
      />
    </>
  );
}
