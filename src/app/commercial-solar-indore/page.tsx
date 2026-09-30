import type { Metadata } from "next";
import Link from "next/link";
import { staticPages } from "@/content/registry";
import { industries } from "@/content/industries";
import { photos } from "@/content/photos";
import { faqsByTag } from "@/content/faqs";
import { whatsappLink } from "@/content/site";
import { GuidePage } from "@/components/sections/guide-page";
import { RoiCalculator } from "@/components/tools/roi-calculator";
import { ButtonLink } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/motion";
import { Icon } from "@/components/icons";
import { pageMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

const P = staticPages.commercial;
export const metadata: Metadata = pageMetadata({
  ...P,
  keywords: ["commercial solar Indore", "industrial solar Pithampur", "factory rooftop solar Indore", "solar EPC Indore", "solar for business Indore"],
  markdown: "/commercial-solar-indore.md",
});

const body = `
## Why businesses in Indore go solar

- **Higher tariffs, faster payback.** Commercial and industrial energy rates are higher than domestic ones, so each solar unit is worth more.
- **Daytime load.** Offices, factories, schools and hospitals consume most power when the sun is up — nearly every unit is used on site.
- **Predictable costs.** Solar fixes the cost of a large share of your electricity for 25 years.
- **Tax efficiency.** Profitable businesses may claim accelerated depreciation on solar assets (confirm with your CA).

## What drives commercial ROI

| Factor | Why it matters |
|---|---|
| Share of generation used on site | Self-consumed units save the full tariff; surplus earns less |
| Energy rate (₹/unit) | Higher rate → faster payback |
| Roof type and condition | Affects structure cost and design |
| Shift pattern | Day shifts match solar best |
| Contract demand | Demand charges depend on your peak, not just energy |

## Roof types

| Roof | How we mount |
|---|---|
| RCC | Anchored or ballasted structures, walkways for cleaning |
| Metal sheet | Rails or short tilt legs fixed into purlins |
| Asbestos cement | Independent structure — sheets are never drilled |
| Open land / parking | Ground-mount or carport structures |

## Monitoring and O&M

Commercial plants come with remote monitoring, a cleaning schedule matched to your site's dust, and preventive maintenance. See [cleaning and maintenance](/services/solar-panel-cleaning-maintenance-indore).
`;

export default function CommercialPage() {
  return (
    <GuidePage
      path={P.path}
      title={P.title}
      description={P.description}
      crumbs={[{ name: "Commercial & industrial solar", path: P.path }]}
      eyebrow="Business · Industry · Institutions"
      h1="Commercial solar that pays back in *three to four* years."
      lead="Rooftop plants for factories in Pithampur and Sanwer Road, offices on AB Road, schools, hospitals, hotels and warehouses — engineered around your daytime load."
      photo={photos.metalRoof}
      actions={
        <>
          <ButtonLink href={whatsappLink("Hi Genius Solar, we want a commercial solar proposal for our business.")} variant="sun" size="lg" icon="WhatsApp">
            Request a proposal
          </ButtonLink>
          <ButtonLink href="/services/solar-epc-contractor-indore" variant="ghost" size="lg">
            Our EPC process
          </ButtonLink>
        </>
      }
      summary="Genius Solar Services designs and installs commercial and industrial rooftop solar in Indore and nearby industrial areas including Pithampur, Sanwer Road, Palda and Dewas. Systems range from about 10 kW for shops and clinics to 500 kW for factories and campuses, on RCC, metal-sheet or asbestos roofs. Because commercial and industrial tariffs are higher and most consumption happens in daylight, typical payback is three to four years without any subsidy. Projects include a load study, yield simulation, DISCOM approvals, net metering, monitoring and O&M."
      facts={[
        { k: "Plant size", v: "10–500 kW" },
        { k: "Typical payback", v: "3–4 years" },
        { k: "Roofs", v: "RCC · metal · asbestos" },
        { k: "Areas", v: "Indore · Pithampur · Dewas" },
      ]}
      tool={<RoiCalculator />}
      markdown={body}
      faqs={faqsByTag("commercial")}
      related={["/services/solar-epc-contractor-indore", "/solar-installation/pithampur", "/solar-systems/50kw-solar-system-indore", "/learn/solar-loan-emi-guide"]}
      source="Commercial page"
      extraSchema={[
        serviceSchema({
          name: "Commercial and industrial rooftop solar in Indore",
          description: "Commercial and industrial solar EPC for factories, offices, schools, hospitals, hotels and warehouses in Indore, Pithampur and Dewas.",
          path: P.path,
          serviceType: "Commercial and industrial rooftop solar EPC",
        }),
      ]}
    >
      <section aria-labelledby="ind-title" className="mb-24">
        <div className="container-x">
          <h2 id="ind-title" className="text-h2 font-semibold">
            Industries we <span className="serif-accent text-sun-ink">power</span>
          </h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((i) => {
              const I = Icon[i.icon];
              return (
                <li key={i.slug}>
                  <SpotlightCard className="h-full rounded-card bg-white ring-1 ring-line">
                    <Link href={`/commercial-solar-indore/${i.slug}`} className="flex h-full flex-col gap-4 p-7">
                      <span className="flex items-center justify-between">
                        <I size={30} className="text-sun-ink" />
                        <span className="label text-graphite">
                          {i.typicalKw[0]}–{i.typicalKw[1]} kW
                        </span>
                      </span>
                      <span className="text-xl font-semibold tracking-[-0.02em]">{i.name}</span>
                      <span className="text-sm text-graphite">{i.loadProfile}</span>
                      <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium">
                        Explore <Icon.ArrowRight size={16} />
                      </span>
                    </Link>
                  </SpotlightCard>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </GuidePage>
  );
}
