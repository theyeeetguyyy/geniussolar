import type { Metadata } from "next";
import Image from "next/image";
import { staticPages } from "@/content/registry";
import { photos } from "@/content/photos";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/page-hero";
import { PhotoStrip } from "@/components/sections/photo-strip";
import { RelatedLinks } from "@/components/sections/related";
import { CtaQuote } from "@/components/sections/cta-quote";
import { AiSummary } from "@/components/seo/ai-summary";
import { JsonLd } from "@/components/seo/json-ld";
import { InkText } from "@/components/ui/ink-text";
import { SpotlightCard } from "@/components/ui/motion";
import { Icon } from "@/components/icons";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph, ids, webPageSchema } from "@/lib/schema";

const P = staticPages.about;
export const metadata: Metadata = pageMetadata({ ...P, markdown: "/about.md" });

const principles = [
  { n: "01", t: "Survey before quote", b: "No per-kW guesswork over the phone. We measure the roof, map the shade and read your bills first." },
  { n: "02", t: "Structure first", b: "Panels last decades; badly built frames don't. Galvanised steel, bracing and proper footings come before everything else." },
  { n: "03", t: "Paperwork is part of the job", b: "Portal registration, DISCOM approvals, net meter, subsidy claim — we file and follow up so you don't queue." },
  { n: "04", t: "Stay after handover", b: "Five years of free service, a phone number that gets answered, and warranty claims handled on your behalf." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", path: P.path }]}
        eyebrow="Genius Solar Services · Vijay Nagar, Indore"
        title="Two decades of *after-sales*, now pointed at the sun."
        lead={`Genius Solar grew out of more than ${site.legacyYears} years of serving Indore households — first with water purification, now with rooftop solar. The habit that carried over: show up, do it properly, and keep answering the phone.`}
        photo={photos.teamUnderArray}
      />

      <div className="container-x mb-24">
        <AiSummary
          facts={[
            { k: "Based in", v: "Vijay Nagar, Indore" },
            { k: "Proprietor", v: site.founder.name },
            { k: "Free service", v: "5 years" },
            { k: "Recognition", v: "MP Solar Awards 2025" },
          ]}
        >
          <p>
            Genius Solar Services is a rooftop solar company at G-1 Swarna Palace, Plot 1108, Scheme No. 114 Part 1, Vijay Nagar, Indore,
            led by proprietor {site.founder.name}. It designs and installs on-grid, hybrid and elevated rooftop solar systems for homes,
            housing societies and businesses across Indore and nearby towns, handles PM Surya Ghar subsidy and MP West Discom net
            metering, and provides five years of free service. The company supplies modules and inverters from brands including Adani
            Solar, Vikram Solar, Havells and Luminous, and was recognised at the
            Madhya Pradesh Annual Solar Awards 2025 at the Global Solar Expo in Indore.
          </p>
        </AiSummary>
      </div>

      <section aria-label="Our belief" className="section-y pt-0">
        <div className="container-x">
          <p className="label text-graphite">What we believe</p>
          <InkText
            text="A solar system is a twenty-five-year promise. The panels will keep theirs. Our job is to make sure the structure, the wiring, the paperwork and the people behind it keep theirs too."
            className="mt-8 max-w-5xl text-[clamp(1.8rem,3.6vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.035em]"
          />
        </div>
      </section>

      <section aria-labelledby="principles-title" className="mb-28">
        <div className="container-x">
          <h2 id="principles-title" className="text-h2 font-semibold">
            How we <span className="serif-accent text-sun-ink">work</span>
          </h2>
          <ol className="mt-12 grid gap-3 md:grid-cols-2">
            {principles.map((p) => (
              <li key={p.n}>
                <SpotlightCard className="h-full rounded-panel bg-white p-8 ring-1 ring-line">
                  <p className="label text-sun-ink">{p.n}</p>
                  <p className="mt-6 text-2xl font-semibold tracking-[-0.03em]">{p.t}</p>
                  <p className="mt-2 text-graphite">{p.b}</p>
                </SpotlightCard>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="founder-title" className="mb-28">
        <div className="container-x grid items-center gap-10 lg:grid-cols-12">
          <figure className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-hero bg-ink lg:col-span-4">
            <Image src={photos.founder.src} alt={photos.founder.alt} fill sizes="(min-width: 1024px) 30vw, 80vw" className="object-cover object-top" />
          </figure>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="label text-graphite">Leadership</p>
            <h2 id="founder-title" className="mt-4 text-h2 font-semibold">
              {site.founder.name}
            </h2>
            <p className="mt-2 text-lead text-graphite">{site.founder.role}, Genius Solar Services</p>
            <p className="mt-6 max-w-xl text-ink-2">
              Customers deal directly with the proprietor&apos;s team — from the first survey to handover and every service visit after,
              with the same standard of after-sales care Indore families have known for years.
            </p>
            <a href={`tel:${site.phones[0].e164}`} className="mt-8 inline-flex items-center gap-3 text-lg font-medium">
              <Icon.Phone size={20} className="text-sun-ink" /> {site.phones[0].display}
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="trust-title" className="mb-28 bg-ink py-24 text-white">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label text-sun">Why customers trust us</p>
            <h2 id="trust-title" className="mt-5 text-h2 font-semibold">
              Promises you can hold us to.
            </h2>
            <figure className="relative mt-10 aspect-[3/4] max-w-sm overflow-hidden rounded-panel">
              <Image src={photos.award2025.src} alt={photos.award2025.alt} fill sizes="(min-width: 1024px) 28vw, 80vw" className="object-cover" />
              <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-black/55 p-4 text-sm backdrop-blur">
                {site.award.title} · {site.award.event}
              </figcaption>
            </figure>
          </div>
          <ul className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-7">
            {[
              { t: `${site.promises.panelWarrantyYears}-year panel warranty`, b: "Manufacturer performance warranty on modules." },
              { t: `${site.promises.inverterWarrantyYears}-year inverter warranty`, b: "Manufacturer warranty, depending on model." },
              { t: `${site.promises.freeServiceYears} years free service`, b: "Periodic service visits at no charge." },
              { t: "Subsidy assistance", b: "PM Surya Ghar registration, claim and follow-up." },
              { t: "Net metering handled", b: "MP West Discom application, inspection and meter." },
              { t: "Bank finance", b: "Help with loans from public and private banks." },
              { t: "Brand choice", b: site.partners.map((p) => p.name).slice(0, 4).join(", ") + " and more." },
              { t: "Complaint support", b: "A single number for service and warranty issues." },
            ].map((x) => (
              <li key={x.t} className="rounded-card bg-white/5 p-6 ring-1 ring-white/10">
                <Icon.Check size={20} className="text-sun" />
                <p className="mt-4 text-lg font-semibold tracking-[-0.02em]">{x.t}</p>
                <p className="mt-1 text-sm text-white/65">{x.b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PhotoStrip
        photos={[photos.teamRooftop, photos.techFastening, photos.crewRooftop, photos.techBolting, photos.engineersUnder, photos.wallInverter, photos.customerEngineer]}
        title="The people on your roof"
      />
      <RelatedLinks paths={["/projects", "/services", "/learn/how-to-choose-solar-installer-indore", "/contact"]} />
      <CtaQuote source="About page" />
      <JsonLd
        data={graph(
          webPageSchema({ path: P.path, title: P.title, description: P.description, type: "AboutPage", about: { "@id": ids.org } }),
          breadcrumbSchema(P.path, [{ name: "About", path: P.path }]),
        )}
      />
    </>
  );
}
