import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { areaBySlug, areas, distanceFromOffice } from "@/content/areas";
import { projectBySlug } from "@/content/projects";
import { photos } from "@/content/photos";
import { pageByPath } from "@/content/registry";
import { areaSummary } from "@/content/generated";
import { faqsByTag } from "@/content/faqs";
import { site, whatsappLink } from "@/content/site";
import { PageHero } from "@/components/sections/page-hero";
import { FaqList } from "@/components/sections/faq-list";
import { RelatedLinks } from "@/components/sections/related";
import { CtaQuote } from "@/components/sections/cta-quote";
import { Process } from "@/components/sections/process";
import { AiSummary } from "@/components/seo/ai-summary";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Spec } from "@/components/ui/section";
import { Icon } from "@/components/icons";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema } from "@/lib/schema";

export const dynamicParams = false;
export const generateStaticParams = () => areas.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pageByPath(`/solar-installation/${slug}`);
  const a = areaBySlug(slug);
  if (!page || !a) return {};
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    markdown: `${page.path}.md`,
    keywords: [`solar panel installation ${a.name}`, `rooftop solar ${a.name}`, `solar company ${a.name} Indore`, `solar subsidy ${a.name}`],
  });
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = areaBySlug(slug);
  if (!a) notFound();
  const page = pageByPath(`/solar-installation/${slug}`)!;
  const km = distanceFromOffice(a);
  const place = a.kind === "city" ? a.name : `${a.name}, Indore`;
  const localProjects = (a.projectSlugs ?? []).map(projectBySlug).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const nearby = areas
    .filter((x) => x.slug !== a.slug)
    .map((x) => ({ x, d: Math.hypot(x.lat - a.lat, x.lng - a.lng) }))
    .sort((p, q) => p.d - q.d)
    .slice(0, 4)
    .map((n) => n.x);
  const faqs = [...a.faqs, ...faqsByTag("subsidy").slice(0, 1), ...faqsByTag("net metering").slice(0, 1)];

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Areas we serve", path: "/solar-installation" },
          { name: a.name, path: page.path },
        ]}
        eyebrow={`${a.kind === "city" ? "Nearby city" : "Indore"} · ${km} km from our office`}
        title={`Solar panel installation in *${a.name}*`}
        lead={a.character}
        tone="sun"
        media={
          <div className="rounded-hero bg-white p-7 shadow-lift ring-1 ring-line">
            <p className="label text-graphite">{place}</p>
            <dl className="mt-4">
              <Spec k="From Vijay Nagar office" v={`≈${km} km`} />
              <Spec k="Typical systems" v={a.typicalSizes} />
              <Spec k="DISCOM" v="MP West Discom" />
              <Spec k="Home subsidy" v="Up to ₹78,000" />
              <Spec k="Free service" v={`${site.promises.freeServiceYears} years`} />
            </dl>
          </div>
        }
      >
        <ButtonLink href={whatsappLink(`Hi Genius Solar, I'd like a free solar survey in ${a.name}.`)} variant="sun" size="lg" icon="WhatsApp">
          Book a survey in {a.name.split(" & ")[0]}
        </ButtonLink>
      </PageHero>

      <div className="container-x mb-20">
        <AiSummary>
          <p>{areaSummary(a)}</p>
        </AiSummary>
      </div>

      <section aria-label={`Rooftops in ${a.name}`} className="mb-24">
        <div className="container-x grid gap-4 md:grid-cols-2">
          <div className="rounded-panel bg-white p-8 ring-1 ring-line">
            <Icon.Home size={28} className="text-sun-ink" />
            <h2 className="mt-5 text-h3 font-semibold">Homes & roofs in {a.name.split(" & ")[0]}</h2>
            <p className="mt-3 text-graphite">{a.roofs}</p>
          </div>
          <div className="rounded-panel bg-ink p-8 text-white">
            <Icon.Compass size={28} className="text-sun" />
            <h2 className="mt-5 text-h3 font-semibold">What we recommend here</h2>
            <p className="mt-3 text-white/75">{a.recommendation}</p>
            {a.landmarks.length ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {a.landmarks.map((l) => (
                  <li key={l} className="label rounded-full bg-white/10 px-3 py-1.5 text-white/80">
                    {l}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </section>

      {localProjects.length ? (
        <section aria-label="Local projects" className="mb-24">
          <div className="container-x">
            <p className="label text-graphite">Our work nearby</p>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {localProjects.map((p) => (
                <li key={p.slug}>
                  <Link href={`/projects/${p.slug}`} className="group relative flex min-h-[26rem] items-end overflow-hidden rounded-panel bg-ink p-7 text-white">
                    <Image src={photos[p.cover].src} alt={photos[p.cover].alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105" />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <span className="relative">
                      <span className="label text-sun">Case study</span>
                      <span className="mt-2 block text-2xl font-semibold tracking-[-0.03em]">{p.title}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <Process index="" />

      <section aria-label="FAQ" className="section-y bg-white">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <h2 className="text-h3 font-semibold lg:col-span-4">Solar in {a.name.split(" & ")[0]}: questions</h2>
          <FaqList faqs={faqs} className="lg:col-span-8" />
        </div>
      </section>

      <section aria-label="Nearby areas" className="section-y pb-0">
        <div className="container-x">
          <p className="label text-graphite">Nearby areas we serve</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {nearby.map((n) => (
              <li key={n.slug}>
                <Link href={`/solar-installation/${n.slug}`} className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 font-medium ring-1 ring-line hover:ring-ink/20">
                  {n.name} <Icon.ArrowRight size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RelatedLinks className="pt-16" paths={["/residential-solar-indore", "/solar-subsidy-mp", "/solar-panel-price-indore", "/projects"]} />
      <CtaQuote source={`Area: ${a.slug}`} />
      <JsonLd
        data={graph(
          webPageSchema({ path: page.path, title: page.title, description: page.description }),
          breadcrumbSchema(page.path, [
            { name: "Areas we serve", path: "/solar-installation" },
            { name: a.name, path: page.path },
          ]),
          serviceSchema({
            name: `Rooftop solar installation in ${place}`,
            description: areaSummary(a),
            path: page.path,
            serviceType: "Rooftop solar installation",
            areaServed: [a.kind === "city" ? a.name : `${a.name}, Indore`],
          }),
          faqSchema(faqs, page.path),
        )}
      />
    </>
  );
}
