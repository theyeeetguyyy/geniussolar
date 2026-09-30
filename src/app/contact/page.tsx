import type { Metadata } from "next";
import Link from "next/link";
import { staticPages } from "@/content/registry";
import { areas } from "@/content/areas";
import { site, telLink, whatsappLink, fullAddress } from "@/content/site";
import { Breadcrumbs } from "@/components/sections/page-hero";
import { LeadForm } from "@/components/tools/lead-form";
import { MapEmbed } from "@/components/sections/map-embed";
import { JsonLd } from "@/components/seo/json-ld";
import { SplitText } from "@/components/ui/section";
import { Icon } from "@/components/icons";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph, ids, webPageSchema } from "@/lib/schema";

const P = staticPages.contact;
export const metadata: Metadata = pageMetadata({
  ...P,
  keywords: ["Genius Solar contact", "solar company Vijay Nagar Indore", "solar installer phone number Indore", "solar near me Indore"],
  markdown: "/contact.md",
});

export default function ContactPage() {
  const channels = [
    { icon: "Phone" as const, k: "Call", v: site.phones[0].display, href: telLink(), note: `Also ${site.phones[1].display}` },
    { icon: "WhatsApp" as const, k: "WhatsApp", v: "Send your bill", href: whatsappLink(), note: "Fastest way to a quote" },
    { icon: "Mail" as const, k: "Email", v: site.email, href: `mailto:${site.email}`, note: "Tenders, documents, RFQs" },
    { icon: "Phone" as const, k: "Landline", v: site.phones[2].display, href: telLink(site.phones[2].e164), note: site.hoursLabel },
  ];
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-36 lg:pt-40">
        <div aria-hidden="true" className="absolute -right-40 -top-40 size-[40rem] rounded-full sun-glow" />
        <div className="container-x relative">
          <Breadcrumbs items={[{ name: "Contact", path: P.path }]} />
          <div className="mt-10 grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="label load-fade flex items-center gap-3 text-graphite">
                <span className="size-1.5 rounded-full bg-sun" /> Free survey · itemised quote
              </p>
              <SplitText as="h1" mode="load" text="Let's look at *your* roof." className="mt-6 text-display font-semibold" accentClassName="serif-accent text-sun-ink" />
              <p className="load-fade mt-7 max-w-md text-lead text-graphite" style={{ ["--d" as string]: "400ms" }}>
                Tell us a little about the property. An engineer calls back to book a free site survey.
              </p>
              <ul className="load-fade mt-10 grid gap-3 sm:grid-cols-2" style={{ ["--d" as string]: "560ms" }}>
                {channels.map((c) => {
                  const I = Icon[c.icon];
                  return (
                    <li key={c.k}>
                      <a
                        href={c.href}
                        {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                        className="group flex h-full flex-col gap-3 rounded-card bg-white p-5 ring-1 ring-line transition-all hover:-translate-y-0.5 hover:shadow-soft"
                      >
                        <span className="grid size-10 place-items-center rounded-xl bg-stone-100 transition-colors group-hover:bg-sun">
                          <I size={20} />
                        </span>
                        <span>
                          <span className="label block text-graphite">{c.k}</span>
                          <span className={`mt-1 block break-all font-semibold tabular ${c.k === "Email" ? "text-[0.8rem]" : ""}`}>{c.v}</span>
                          <span className="mt-1 block text-xs text-mute">{c.note}</span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-hero bg-white p-6 shadow-lift ring-1 ring-line sm:p-10">
                <p className="text-2xl font-semibold tracking-[-0.03em]">Request a free survey</p>
                <p className="mb-8 mt-1 text-graphite">Takes under a minute. Sent via WhatsApp or email — your choice.</p>
                <LeadForm source="Contact page" areaNames={areas.map((a) => a.name)} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Visit us" className="mb-24">
        <div className="container-x grid gap-4 lg:grid-cols-12">
          <div className="flex flex-col justify-between gap-8 rounded-hero bg-ink p-8 text-white lg:col-span-4">
            <div>
              <p className="label text-sun">Visit the office</p>
              <address className="mt-5 text-xl leading-snug not-italic">
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.landmark}
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </address>
              <p className="mt-6 flex items-center gap-2 text-white/70">
                <Icon.Clock size={18} className="text-sun" /> {site.hoursLabel}
              </p>
            </div>
            <a
              href={site.maps.url}
              target="_blank"
              rel="noopener"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-sun font-semibold text-ink"
            >
              Directions <Icon.ArrowUpRight size={18} />
            </a>
          </div>
          <div className="lg:col-span-8">
            <MapEmbed />
          </div>
        </div>
      </section>

      <section aria-label="Service areas" className="mb-28">
        <div className="container-x">
          <p className="label text-graphite">We come to you</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link href={`/solar-installation/${a.slug}`} className="inline-flex h-10 items-center rounded-full bg-white px-4 text-sm ring-1 ring-line hover:ring-ink/25">
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JsonLd
        data={graph(
          webPageSchema({ path: P.path, title: P.title, description: `${P.description} Address: ${fullAddress}.`, type: "ContactPage", about: { "@id": ids.business } }),
          breadcrumbSchema(P.path, [{ name: "Contact", path: P.path }]),
        )}
      />
    </>
  );
}
