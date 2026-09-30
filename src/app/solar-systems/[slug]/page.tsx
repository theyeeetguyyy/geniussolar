import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { systemBySlug, systemSizes } from "@/content/systems";
import { pageByPath } from "@/content/registry";
import { systemEstimate, systemSummary } from "@/content/generated";
import { faqsByTag } from "@/content/faqs";
import { whatsappLink } from "@/content/site";
import { PageHero } from "@/components/sections/page-hero";
import { MonthlyChart } from "@/components/sections/monthly-chart";
import { FaqList } from "@/components/sections/faq-list";
import { RelatedLinks } from "@/components/sections/related";
import { CtaQuote } from "@/components/sections/cta-quote";
import { AiSummary } from "@/components/seo/ai-summary";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Spec } from "@/components/ui/section";
import { Icon } from "@/components/icons";
import { formatINR, formatLakh } from "@/lib/solar";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, productSchema, webPageSchema } from "@/lib/schema";

export const dynamicParams = false;
export const generateStaticParams = () => systemSizes.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pageByPath(`/solar-systems/${slug}`);
  if (!page) return {};
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    markdown: `${page.path}.md`,
    keywords: [`${slug.split("kw")[0]}kW solar system price in Indore`, `${slug.split("kw")[0]} kW solar panel Indore`, `${slug.split("kw")[0]}kW solar subsidy`],
  });
}

export default async function SystemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = systemBySlug(slug);
  if (!s) notFound();
  const e = systemEstimate(s);
  const page = pageByPath(`/solar-systems/${slug}`)!;
  const idx = systemSizes.findIndex((x) => x.slug === slug);
  const prev = systemSizes[idx - 1];
  const next = systemSizes[idx + 1];
  const faqs = [...s.faqs, ...faqsByTag(s.segment === "home" ? "subsidy" : "commercial").slice(0, 2)];

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Solar systems", path: "/solar-systems" },
          { name: `${s.kw} kW`, path: page.path },
        ]}
        eyebrow={`${s.kw} kW · ${s.segment === "home" ? "Home" : s.segment === "industry" ? "Industrial" : "Commercial"} rooftop system`}
        title={`${s.kw} kW solar system in *Indore*`}
        lead={s.suits}
        tone="sun"
        media={
          <div className="rounded-hero bg-white p-7 shadow-lift ring-1 ring-line">
            <p className="label text-graphite">At a glance</p>
            <p className="mt-4 text-6xl font-semibold tracking-[-0.055em] tabular">
              {e.annualUnits.toLocaleString("en-IN")}
              <span className="ml-2 text-lg font-medium tracking-normal text-graphite">units / year</span>
            </p>
            <dl className="mt-6">
              <Spec k="Price" v={`${formatLakh(e.price.low)} – ${formatLakh(e.price.high)}`} />
              {e.subsidy ? <Spec k="Subsidy" v={formatINR(e.subsidy)} /> : null}
              <Spec k="Savings / month" v={formatINR(e.monthlySavings)} />
              <Spec k="Payback" v={`${e.paybackYears} years`} />
            </dl>
          </div>
        }
      >
        <ButtonLink href={whatsappLink(`Hi Genius Solar, I'm interested in a ${s.kw} kW solar system. Please share a quote.`)} variant="sun" size="lg" icon="WhatsApp">
          Quote for {s.kw} kW
        </ButtonLink>
        <ButtonLink href="/solar-calculator" variant="ghost" size="lg">
          Check with my bill
        </ButtonLink>
      </PageHero>

      <div className="container-x mb-20">
        <AiSummary
          facts={[
            { k: "Units / day", v: `≈${e.dailyUnits}` },
            { k: "Panels", v: `${e.panels} × 545 W` },
            { k: "Roof", v: `≈${e.roofSqft.toLocaleString("en-IN")} sq ft` },
            { k: "CO₂ / year", v: `${e.co2TonnesPerYear} t` },
          ]}
        >
          <p>{systemSummary(s)}</p>
        </AiSummary>
      </div>

      <section aria-labelledby="spec-title" className="mb-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="spec-title" className="text-h3 font-semibold">
              Specifications & numbers
            </h2>
            <dl className="mt-6">
              <Spec k="System size" v={`${s.kw} kWp`} />
              <Spec k="Modules" v={`${e.panels} × 545 W mono`} />
              <Spec k="Roof area" v={`~${e.roofSqft.toLocaleString("en-IN")} sq ft`} />
              <Spec k="Generation / month" v={`~${Math.round(e.annualUnits / 12).toLocaleString("en-IN")} units`} />
              <Spec k="Generation / year" v={`~${e.annualUnits.toLocaleString("en-IN")} units`} />
              <Spec k="Price (before subsidy)" v={`${formatLakh(e.price.low)} – ${formatLakh(e.price.high)}`} />
              <Spec k="PM Surya Ghar subsidy" v={e.subsidy ? formatINR(e.subsidy) : "Not applicable"} />
              <Spec k="Net cost (mid)" v={formatLakh(e.netCost)} />
              <Spec k="Savings, year 1" v={formatINR(e.annualSavings)} />
              <Spec k="Savings, 25 years" v={formatLakh(e.lifetimeSavings)} />
              <Spec k="EMI (indicative)" v={`${formatINR(e.emiMonthly)}/mo · ${(e.emiRate * 100).toFixed(1)}% · 5 yrs`} />
              <Spec k="CO₂ avoided, 25 years" v={`${e.co2TonnesLifetime} t`} />
            </dl>
          </div>
          <div className="lg:col-span-7">
            <h2 className="text-h3 font-semibold">Month by month in Indore</h2>
            <MonthlyChart kw={s.kw} className="mt-8" />
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="label text-graphite">What it can run</p>
                <ul className="mt-4 space-y-3">
                  {s.runs.map((r) => (
                    <li key={r} className="flex gap-3">
                      <Icon.Check size={18} className="mt-0.5 shrink-0 text-sun-ink" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="label text-graphite">Good to know</p>
                <ul className="mt-4 space-y-3 text-graphite">
                  {s.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Other sizes" className="mb-24">
        <div className="container-x grid gap-3 sm:grid-cols-2">
          {prev ? (
            <Link href={`/solar-systems/${prev.slug}`} className="group flex items-center justify-between rounded-card bg-white p-6 ring-1 ring-line hover:shadow-soft">
              <span className="flex items-center gap-3">
                <Icon.ChevronLeft size={20} />
                <span>
                  <span className="label block text-graphite">Smaller</span>
                  <span className="text-xl font-semibold">{prev.kw} kW system</span>
                </span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/solar-systems/${next.slug}`} className="group flex items-center justify-between rounded-card bg-white p-6 text-right ring-1 ring-line hover:shadow-soft sm:col-start-2">
              <span className="ml-auto flex items-center gap-3">
                <span>
                  <span className="label block text-graphite">Larger</span>
                  <span className="text-xl font-semibold">{next.kw} kW system</span>
                </span>
                <Icon.ChevronRight size={20} />
              </span>
            </Link>
          ) : null}
        </div>
      </section>

      <section aria-label="FAQ" className="section-y bg-white">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <h2 className="text-h3 font-semibold lg:col-span-4">{s.kw} kW solar: questions</h2>
          <FaqList faqs={faqs} className="lg:col-span-8" />
        </div>
      </section>

      <RelatedLinks
        className="pt-24"
        paths={
          s.segment === "home"
            ? ["/solar-subsidy-mp", "/residential-solar-indore", "/learn/how-much-solar-do-i-need", "/learn/3kw-vs-5kw-solar-system"]
            : ["/commercial-solar-indore", "/services/solar-epc-contractor-indore", "/solar-panel-price-indore", "/learn/solar-loan-emi-guide"]
        }
      />
      <CtaQuote source={`${s.kw} kW page`} />
      <JsonLd
        data={graph(
          webPageSchema({ path: page.path, title: page.title, description: page.description }),
          breadcrumbSchema(page.path, [
            { name: "Solar systems", path: "/solar-systems" },
            { name: `${s.kw} kW solar system`, path: page.path },
          ]),
          productSchema({
            name: `${s.kw} kW rooftop solar system (on-grid)`,
            description: systemSummary(s),
            path: page.path,
            image: absoluteUrl(`${page.path}/opengraph-image`),
            low: e.price.low,
            high: e.price.high,
            sku: `GSS-${s.kw}KW`,
          }),
          faqSchema(faqs, page.path),
        )}
      />
    </>
  );
}
