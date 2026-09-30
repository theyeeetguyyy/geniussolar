import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { industries, industryBySlug } from "@/content/industries";
import { whatsappLink } from "@/content/site";
import { GuidePage } from "@/components/sections/guide-page";
import { RoiCalculator } from "@/components/tools/roi-calculator";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/icons";
import { estimate, formatLakh } from "@/lib/solar";
import { pageMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

export const dynamicParams = false;
export const generateStaticParams = () => industries.map((i) => ({ slug: i.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const i = industryBySlug(slug);
  if (!i) return {};
  return pageMetadata({ title: i.seoTitle, description: i.description, path: `/commercial-solar-indore/${i.slug}`, markdown: `/commercial-solar-indore/${i.slug}.md` });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = industryBySlug(slug);
  if (!i) notFound();
  const path = `/commercial-solar-indore/${i.slug}`;
  const [lo, hi] = i.typicalKw;
  const eLo = estimate({ kw: lo, monthlyUnits: lo * 125, segment: i.tariff });
  const eHi = estimate({ kw: hi, monthlyUnits: hi * 125, segment: i.tariff });
  const md = `
## Typical systems for ${i.name.toLowerCase()}

| | ${lo} kW | ${hi} kW |
|---|---|---|
| Generation / year | ~${eLo.annualUnits.toLocaleString("en-IN")} units | ~${eHi.annualUnits.toLocaleString("en-IN")} units |
| Typical investment | ${formatLakh(eLo.price.mid)} | ${formatLakh(eHi.price.mid)} |
| Savings, year 1 | ~${formatLakh(eLo.annualSavings)} | ~${formatLakh(eHi.annualSavings)} |
| Payback | ~${eLo.paybackYears} years | ~${eHi.paybackYears} years |

Estimates at ₹${i.tariff === "business" ? "9" : "8"}/unit, assuming the plant is sized to daytime consumption.

## Load profile

${i.loadProfile}
`;
  return (
    <GuidePage
      path={path}
      title={i.seoTitle}
      description={i.description}
      crumbs={[
        { name: "Commercial solar", path: "/commercial-solar-indore" },
        { name: i.name, path },
      ]}
      eyebrow={`${i.typicalKw[0]}–${i.typicalKw[1]} kW · Indore region`}
      h1={`Solar for ${i.name.toLowerCase()} in *Indore*`}
      lead={i.description}
      actions={
        <ButtonLink href={whatsappLink(`Hi Genius Solar, we'd like a solar proposal for our ${i.name.toLowerCase()} site.`)} variant="sun" size="lg" icon="WhatsApp">
          Request a proposal
        </ButtonLink>
      }
      summary={i.summary}
      tool={
        <section aria-label="Why it fits" className="container-x">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {i.angles.map((a) => (
              <li key={a.t} className="rounded-card bg-white p-6 ring-1 ring-line">
                <Icon.Check size={20} className="text-sun-ink" />
                <p className="mt-4 text-lg font-semibold tracking-[-0.02em]">{a.t}</p>
                <p className="mt-1 text-sm text-graphite">{a.b}</p>
              </li>
            ))}
          </ul>
        </section>
      }
      markdown={md}
      faqs={i.faqs}
      related={["/commercial-solar-indore", "/services/solar-epc-contractor-indore", "/solar-panel-price-indore", "/solar-installation/pithampur"]}
      source={`Industry: ${i.slug}`}
      extraSchema={[serviceSchema({ name: `Rooftop solar for ${i.name.toLowerCase()} in Indore`, description: i.summary, path, serviceType: "Commercial rooftop solar installation" })]}
    >
      <div className="mb-24">
        <RoiCalculator />
      </div>
    </GuidePage>
  );
}
