import type { Metadata } from "next";
import Link from "next/link";
import { staticPages } from "@/content/registry";
import { allPhotos, photos } from "@/content/photos";
import { systemSizes } from "@/content/systems";
import { faqsByTag } from "@/content/faqs";
import { whatsappLink } from "@/content/site";
import { GuidePage } from "@/components/sections/guide-page";
import { QuickCalculator } from "@/components/tools/quick-calculator";
import { PhotoStrip } from "@/components/sections/photo-strip";
import { Process } from "@/components/sections/process";
import { SubsidyBlock } from "@/components/home/subsidy-block";
import { ButtonLink } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/motion";
import { Icon } from "@/components/icons";
import { estimate, formatINR, formatLakh } from "@/lib/solar";
import { pageMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

const P = staticPages.residential;
export const metadata: Metadata = pageMetadata({
  ...P,
  keywords: ["residential solar Indore", "home solar Indore", "rooftop solar for home Indore", "solar for house Indore", "3kW solar Indore"],
  markdown: "/residential-solar-indore.md",
});

const benefits = [
  { icon: "Rupee" as const, t: "Bills down 80–100%", b: "Energy charges largely disappear; fixed charges remain." },
  { icon: "Stamp" as const, t: "₹78,000 subsidy", b: "PM Surya Ghar support on 3 kW and above, filed by us." },
  { icon: "Home" as const, t: "Terrace stays yours", b: "Elevated structures keep the roof usable and shaded." },
  { icon: "Thermometer" as const, t: "Cooler top floor", b: "A raised array shades the slab through Indore's summer." },
  { icon: "Leaf" as const, t: "≈1 tonne CO₂ per kW", b: "Avoided every year, compared with grid power." },
  { icon: "Shield" as const, t: "5 years free service", b: "Plus manufacturer warranties up to 30 years." },
];

export default function ResidentialPage() {
  const homeSizes = systemSizes.filter((s) => s.segment === "home");
  const residentialPhotos = allPhotos.filter((p) => p.tags.includes("residential"));
  return (
    <GuidePage
      path={P.path}
      title={P.title}
      description={P.description}
      crumbs={[{ name: "Residential solar", path: P.path }]}
      eyebrow="Homes · 1–15 kW"
      h1="Home solar for Indore, built to *outlast* the loan."
      lead="Independent houses, duplexes and bungalows — on-grid systems with subsidy, elevated structures that keep your terrace, and a team that stays for the years after."
      photo={photos.homeownersUnder}
      actions={
        <>
          <ButtonLink href="/solar-calculator" variant="sun" size="lg">
            Size my system
          </ButtonLink>
          <ButtonLink href={whatsappLink("Hi Genius Solar, I'd like solar for my home.")} variant="ghost" size="lg" icon="WhatsApp">
            WhatsApp us
          </ButtonLink>
        </>
      }
      summary="Genius Solar Services installs residential rooftop solar systems of 1–15 kW across Indore. Most homes choose a 3–5 kW on-grid system with DCR modules, which qualifies for the PM Surya Ghar subsidy of up to ₹78,000 and uses net metering with MP West Discom. A 3 kW system generates about 360 units a month and typically costs ₹1.75–2.05 lakh before subsidy. Elevated structures keep the terrace usable. Collateral-free bank loans at around 7% are available for systems up to 3 kW, and every installation includes five years of free service."
      facts={[
        { k: "Popular size", v: "3–5 kW" },
        { k: "Subsidy", v: "Up to ₹78,000" },
        { k: "Payback", v: "≈3–5 years" },
        { k: "Free service", v: "5 years" },
      ]}
      tool={
        <div className="container-x">
          <QuickCalculator />
        </div>
      }
      faqs={[...faqsByTag("residential", "sizing", "roof").slice(0, 6), ...faqsByTag("loan").slice(0, 1)]}
      related={["/solar-subsidy-mp", "/services/elevated-solar-structure-indore", "/learn/3kw-vs-5kw-solar-system", "/solar-panel-price-indore"]}
      source="Residential page"
      extraSchema={[
        serviceSchema({
          name: "Residential rooftop solar installation in Indore",
          description: "On-grid home solar systems of 1–15 kW with PM Surya Ghar subsidy, net metering, elevated structures and five years of free service.",
          path: P.path,
          serviceType: "Residential rooftop solar installation",
        }),
      ]}
    >
      <section aria-label="Benefits" className="mb-24">
        <div className="container-x grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => {
            const I = Icon[b.icon];
            return (
              <SpotlightCard key={b.t} className="reveal rounded-card bg-white p-7 ring-1 ring-line">
                <I size={28} className="text-sun-ink" />
                <p className="mt-5 text-xl font-semibold tracking-[-0.02em]">{b.t}</p>
                <p className="mt-1 text-graphite">{b.b}</p>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="sizes-title" className="mb-24">
        <div className="container-x">
          <h2 id="sizes-title" className="text-h2 font-semibold">
            Pick your <span className="serif-accent text-sun-ink">size</span>
          </h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {homeSizes.map((s) => {
              const e = estimate({ kw: s.kw, monthlyUnits: Math.round((s.consumption[0] + s.consumption[1]) / 2) });
              return (
                <li key={s.slug}>
                  <Link href={`/solar-systems/${s.slug}`} className="group block h-full rounded-card bg-white p-6 ring-1 ring-line transition-all hover:-translate-y-1 hover:shadow-soft">
                    <p className="flex items-baseline justify-between">
                      <span className="text-4xl font-semibold tracking-[-0.05em]">{s.kw} kW</span>
                      <Icon.ArrowUpRight size={18} className="text-graphite group-hover:text-ink" />
                    </p>
                    <p className="mt-2 text-sm text-graphite">
                      For {s.consumption[0]}–{s.consumption[1]} units/month
                    </p>
                    <dl className="mt-5 space-y-1.5 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-graphite">After subsidy</dt>
                        <dd className="font-medium tabular">{formatLakh(Math.max(0, e.price.mid - e.subsidy))}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-graphite">Saves / month</dt>
                        <dd className="font-medium tabular text-sun-ink">{formatINR(e.monthlySavings)}</dd>
                      </div>
                    </dl>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <SubsidyBlock index="" />
      <PhotoStrip photos={residentialPhotos} title="Homes we've powered in Indore" />
      <Process index="" />
    </GuidePage>
  );
}
