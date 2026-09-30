import type { Metadata } from "next";
import { Suspense } from "react";
import { staticPages } from "@/content/registry";
import { faqsByTag } from "@/content/faqs";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/page-hero";
import { FaqList } from "@/components/sections/faq-list";
import { RelatedLinks } from "@/components/sections/related";
import { CtaQuote } from "@/components/sections/cta-quote";
import { FullCalculator } from "@/components/tools/full-calculator";
import { AiSummary } from "@/components/seo/ai-summary";
import { JsonLd } from "@/components/seo/json-ld";
import { ANNUAL_YIELD_PER_KW, ASSUMPTIONS, AVG_MONTHLY_YIELD_PER_KW, ELEVATED_STRUCTURE_PER_KW, LOAN } from "@/lib/solar";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, ids, webPageSchema } from "@/lib/schema";

const P = staticPages.calculator;
export const metadata: Metadata = pageMetadata({
  ...P,
  keywords: ["solar calculator Indore", "solar savings calculator", "electricity bill solar calculator", "how much solar do I need", "solar ROI calculator India"],
  markdown: "/solar-calculator.md",
});

const assumptions = [
  ["Generation per kW (Indore)", `${Math.round(AVG_MONTHLY_YIELD_PER_KW)} units/month · ${ANNUAL_YIELD_PER_KW.toLocaleString("en-IN")} units/year`],
  ["Energy rate (editable)", `Home ₹${ASSUMPTIONS.tariff.home} · Business ₹${ASSUMPTIONS.tariff.business} · Industry ₹${ASSUMPTIONS.tariff.industry} per unit`],
  ["Value of surplus exported", `₹${ASSUMPTIONS.exportRate}/unit (conservative)`],
  ["Tariff escalation", `${ASSUMPTIONS.tariffEscalation * 100}% per year`],
  ["Module degradation", `${ASSUMPTIONS.degradationPerYear * 100}% per year`],
  ["Roof area per kW", `${ASSUMPTIONS.roofSqftPerKw} sq ft`],
  ["Module size", `${ASSUMPTIONS.moduleWatt} W`],
  ["Elevated structure", `+₹${ELEVATED_STRUCTURE_PER_KW.low.toLocaleString("en-IN")}–${ELEVATED_STRUCTURE_PER_KW.high.toLocaleString("en-IN")} per kW`],
  ["Loan rate", `${LOAN.subsidisedRate * 100}% up to 3 kW (home), ${LOAN.standardRate * 100}% otherwise`],
  ["Grid emission factor", `${ASSUMPTIONS.gridEmissionFactor} kg CO₂/kWh (CEA baseline, rounded)`],
  ["CO₂ per tree", `${ASSUMPTIONS.co2PerTreePerYear} kg/year`],
];

export default function CalculatorPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Solar calculator", path: P.path }]}
        eyebrow="Free tool · works on your phone"
        title="Drop your bill. *See* your solar."
        lead="Upload a PDF or photo of your electricity bill — or just type your units. Get the right system size, cost after subsidy, savings, payback and EMI in seconds."
        tone="sun"
      />

      <section aria-label="Calculator" className="mb-24">
        <div className="container-x">
          <Suspense fallback={<div className="h-[40rem] animate-pulse rounded-hero bg-stone-100" />}>
            <FullCalculator />
          </Suspense>
        </div>
      </section>

      <div className="container-x mb-24">
        <AiSummary title="How this calculator works">
          <p>
            The calculator divides your average monthly consumption by what 1 kW of rooftop solar generates in Indore (about{" "}
            {Math.round(AVG_MONTHLY_YIELD_PER_KW)} units a month) and rounds to a standard system size, capped by your roof area if you
            enter it. Savings value self-consumed solar units at your energy rate and surplus units at a conservative export rate, with 3%
            yearly tariff escalation and 0.5% yearly module degradation over 25 years. Prices use current Indore price bands; the
            subsidy follows PM Surya Ghar rules. Bill scanning runs entirely in your browser.
          </p>
        </AiSummary>
      </div>

      <section aria-labelledby="method-title" className="mb-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="method-title" className="text-h3 font-semibold">
              Formulas & assumptions
            </h2>
            <p className="mt-3 text-graphite">Everything the numbers depend on, in the open. You can change the energy rate and roof area in the tool.</p>
          </div>
          <div className="space-y-10 lg:col-span-8">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["System size (kW)", "monthly units ÷ " + Math.round(AVG_MONTHLY_YIELD_PER_KW)],
                ["Yearly generation", `kW × ${ANNUAL_YIELD_PER_KW.toLocaleString("en-IN")} units`],
                ["Yearly savings", "min(generation, use) × rate + surplus × export rate"],
                ["Home subsidy", "₹30,000 × first 2 kW + ₹18,000 × 3rd kW (max ₹78,000)"],
                ["Payback", "years until cumulative savings ≥ price − subsidy"],
                ["CO₂ avoided", `units × ${ASSUMPTIONS.gridEmissionFactor} kg`],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-white p-5 ring-1 ring-line">
                  <p className="label text-graphite">{k}</p>
                  <p className="mt-2 font-mono text-sm text-ink">{v}</p>
                </div>
              ))}
            </div>
            <div className="overflow-hidden rounded-card bg-white ring-1 ring-line">
              <table className="w-full text-left text-sm">
                <tbody>
                  {assumptions.map(([k, v]) => (
                    <tr key={k} className="border-b border-line last:border-0">
                      <th scope="row" className="w-1/2 px-5 py-3.5 font-medium text-ink-2">
                        {k}
                      </th>
                      <td className="px-5 py-3.5 tabular text-graphite">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-graphite">
              Your privacy: bills are read with PDF.js and Tesseract OCR inside your browser. The file is never uploaded to {site.name} or
              anyone else. Only what you choose to send on WhatsApp reaches us.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="FAQ" className="section-y bg-white">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <h2 className="text-h3 font-semibold lg:col-span-4">Sizing & savings questions</h2>
          <FaqList faqs={[...faqsByTag("sizing", "savings", "payback", "emi")]} className="lg:col-span-8" />
        </div>
      </section>

      <RelatedLinks className="pt-24" paths={["/learn/how-much-solar-do-i-need", "/learn/how-to-read-mp-electricity-bill", "/solar-systems", "/roof-suitability-check"]} />
      <CtaQuote source="Calculator page" />
      <JsonLd
        data={graph(
          webPageSchema({ path: P.path, title: P.title, description: P.description }),
          breadcrumbSchema(P.path, [{ name: "Solar calculator", path: P.path }]),
          {
            "@type": "WebApplication",
            "@id": `${absoluteUrl(P.path)}#app`,
            name: "Solar Savings Calculator for Indore",
            url: absoluteUrl(P.path),
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            browserRequirements: "Requires JavaScript",
            offers: { "@type": "Offer", price: 0, priceCurrency: "INR" },
            provider: { "@id": ids.org },
            featureList: [
              "Electricity bill scan (PDF and photo, on-device)",
              "Recommended solar system size",
              "Cost after PM Surya Ghar subsidy",
              "Monthly savings and payback",
              "25-year projection",
              "EMI estimate",
              "CO₂ and trees equivalent",
            ],
          },
          faqSchema(faqsByTag("sizing", "savings", "payback", "emi"), P.path),
        )}
      />
    </>
  );
}
