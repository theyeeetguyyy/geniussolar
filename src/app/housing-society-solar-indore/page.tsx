import type { Metadata } from "next";
import { staticPages } from "@/content/registry";
import { photos } from "@/content/photos";
import { whatsappLink } from "@/content/site";
import { GuidePage } from "@/components/sections/guide-page";
import { SubsidyEstimator } from "@/components/tools/subsidy-estimator";
import { ButtonLink } from "@/components/ui/button";
import { estimate, formatINR, formatLakh } from "@/lib/solar";
import { pageMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

const P = staticPages.society;
export const metadata: Metadata = pageMetadata({
  ...P,
  keywords: ["housing society solar Indore", "RWA solar subsidy", "apartment solar Indore", "society rooftop solar MP", "common area solar"],
  markdown: "/housing-society-solar-indore.md",
});

const e20 = estimate({ kw: 20, monthlyUnits: 2600, segment: "society" });
const e50 = estimate({ kw: 50, monthlyUnits: 6200, segment: "society" });

const body = `
## What a society system powers

Common-area loads in Indore apartments and townships are daytime-heavy and predictable:

| Load | Typical share of a common bill |
|---|---|
| Lifts | High |
| Water pumps and borewells | High |
| Corridor, parking and street lighting | Medium |
| Clubhouse, gym, security cabins | Medium |
| EV charging in common parking | Growing |

A rooftop system on the society's own building feeds the **common meter**, cutting maintenance charges for every flat.

## Subsidy for housing societies

Under PM Surya Ghar, registered **Group Housing Societies / Resident Welfare Associations** receive **₹18,000 per kW** for rooftop systems serving common facilities, including EV charging, up to 500 kW (calculated at up to 3 kW per house). DCR modules and a registered vendor are required.

## Two example societies

| | 20 kW society | 50 kW township |
|---|---|---|
| Generation | ~${e20.annualUnits.toLocaleString("en-IN")} units/yr | ~${e50.annualUnits.toLocaleString("en-IN")} units/yr |
| Price before subsidy | ${formatLakh(e20.price.low)} – ${formatLakh(e20.price.high)} | ${formatLakh(e50.price.low)} – ${formatLakh(e50.price.high)} |
| Subsidy (₹18,000/kW) | ${formatINR(e20.subsidy)} | ${formatINR(e50.subsidy)} |
| Savings, year 1 | ~${formatLakh(e20.annualSavings)} | ~${formatLakh(e50.annualSavings)} |
| Payback | ~${e20.paybackYears} years | ~${e50.paybackYears} years |

## How we work with committees

1. **Walkthrough with the committee** — roof, common meter, load and bills.
2. **Proposal for the AGM** — clear numbers, drawings and financing options, written for residents.
3. **Approvals** — society resolution, DISCOM feasibility and subsidy registration.
4. **Installation** scheduled around residents, with safe access and minimal disruption.
5. **Handover** with a monitoring view the committee can share with residents.

## Roof sharing and individual flats

Individual flat owners usually cannot put panels on the common roof alone. A society system for common loads is the cleanest option; some societies also allocate roof space to individual owners by resolution — we can design either way.
`;

export default function SocietyPage() {
  return (
    <GuidePage
      path={P.path}
      title={P.title}
      description={P.description}
      crumbs={[{ name: "Housing society solar", path: P.path }]}
      eyebrow="Apartments · RWAs · Townships"
      h1="Lower maintenance bills for *every* flat."
      lead="Common-area solar for Indore housing societies — lifts, pumps and lighting powered by your own roof, with ₹18,000 per kW subsidy."
      photo={photos.wideArray}
      actions={
        <ButtonLink href={whatsappLink("Hi Genius Solar, I'm on our housing society committee and want to explore solar.")} variant="sun" size="lg" icon="WhatsApp">
          Talk to us for your society
        </ButtonLink>
      }
      summary="Housing societies, apartments and Resident Welfare Associations in Indore can install rooftop solar on common buildings to power lifts, water pumps, lighting, clubhouses and EV charging. Under PM Surya Ghar, registered group housing societies and RWAs receive ₹18,000 per kW of central subsidy for common facilities, up to 500 kW. Systems feed the society's common meter under MP West Discom net metering, reducing maintenance charges for every flat. Typical society systems range from 20 kW to 100 kW, and with the subsidy, payback is often around three to four years."
      facts={[
        { k: "Subsidy", v: "₹18,000/kW" },
        { k: "Cap", v: "500 kW" },
        { k: "Typical size", v: "20–100 kW" },
        { k: "Feeds", v: "Common meter" },
      ]}
      tool={<SubsidyEstimator />}
      markdown={body}
      faqs={[
        {
          q: "Can a housing society in Indore get solar subsidy?",
          a: "Yes. Registered group housing societies and RWAs get ₹18,000 per kW under PM Surya Ghar for systems serving common facilities, including EV charging, up to 500 kW.",
        },
        {
          q: "Who owns and maintains a society solar system?",
          a: "The society owns it. We maintain it for five years free, after which the society can take an AMC. The committee gets monitoring access to share generation with residents.",
        },
        {
          q: "Does the society need a resolution to install solar?",
          a: "Yes — a committee or general body resolution is usually needed for the investment and roof use, and it is typically part of the subsidy application.",
        },
      ]}
      related={["/solar-subsidy-mp", "/net-metering-indore", "/solar-systems/20kw-solar-system-indore", "/services/solar-epc-contractor-indore"]}
      source="Society page"
      extraSchema={[
        serviceSchema({
          name: "Housing society rooftop solar in Indore",
          description: "Rooftop solar for group housing societies and RWAs in Indore with ₹18,000/kW PM Surya Ghar subsidy for common facilities.",
          path: P.path,
          serviceType: "Housing society rooftop solar installation",
        }),
      ]}
    />
  );
}
