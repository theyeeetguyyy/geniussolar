import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectBySlug, projects, formatMonth } from "@/content/projects";
import { photos } from "@/content/photos";
import { areaBySlug } from "@/content/areas";
import { pageByPath } from "@/content/registry";
import { whatsappLink } from "@/content/site";
import { Breadcrumbs } from "@/components/sections/page-hero";
import { PortfolioGallery } from "@/components/gallery/portfolio-gallery";
import { RelatedLinks } from "@/components/sections/related";
import { CtaQuote } from "@/components/sections/cta-quote";
import { AiSummary } from "@/components/seo/ai-summary";
import { JsonLd } from "@/components/seo/json-ld";
import { SplitText, Spec } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/icons";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph, imageSchema, webPageSchema } from "@/lib/schema";

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pageByPath(`/projects/${slug}`);
  if (!page) return {};
  return pageMetadata({ title: page.title, description: page.description, path: page.path, markdown: `${page.path}.md` });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) notFound();
  const page = pageByPath(`/projects/${slug}`)!;
  const cover = photos[p.cover];
  const gallery = p.gallery.map((k) => ({ photo: photos[k] }));
  const area = p.areaSlug ? areaBySlug(p.areaSlug) : undefined;
  const others = projects.filter((x) => x.slug !== p.slug).slice(0, 3);
  const location = `${p.locality ? `${p.locality}, ` : ""}${p.city}, Madhya Pradesh`;

  return (
    <>
      <section className="relative isolate min-h-[92svh] overflow-hidden bg-ink text-white">
        <Image src={cover.src} alt={cover.alt} fill preload sizes="100vw" className="-z-10 object-cover opacity-75" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
        <div className="container-x flex min-h-[92svh] flex-col justify-between pb-14 pt-32">
          <Breadcrumbs
            items={[
              { name: "Projects", path: "/projects" },
              { name: p.title, path: page.path },
            ]}
            className="[&_a]:text-white/70 [&_li]:text-white/70 [&_span]:text-white"
          />
          <div className="max-w-4xl">
            <p className="label flex flex-wrap gap-x-4 gap-y-2 text-sun">
              <span>{p.locality ? `${p.locality}, ${p.city}` : p.city}</span>
              {p.completed ? <span className="text-white/70">{formatMonth(p.completed)}</span> : null}
              <span className="text-white/70">{p.segment === "home" ? "Residential" : "Commercial"}</span>
            </p>
            <SplitText as="h1" mode="load" text={p.title} className="mt-5 text-display font-semibold" />
            <p className="load-fade mt-6 max-w-2xl text-lead text-white/75" style={{ ["--d" as string]: "400ms" }}>
              {p.structure}
            </p>
          </div>
        </div>
      </section>

      <div className="container-x -mt-10 relative z-10 mb-20">
        <AiSummary>
          <p>{p.summary}</p>
        </AiSummary>
      </div>

      <section aria-label="Project details" className="mb-24">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="label text-graphite">Project record</p>
              <dl className="mt-4">
                <Spec k="Location" v={location.replace(", Madhya Pradesh", "")} />
                <Spec k="Type" v={p.segment === "home" ? "Residential" : "Commercial"} />
                <Spec k="Structure" v={p.structure.split(" on ")[0].split(" over ")[0]} />
                {p.capacityKw ? <Spec k="Capacity" v={`${p.capacityKw} kW`} /> : null}
                {p.modules ? <Spec k="Modules" v={p.modules} /> : null}
                {p.inverter ? <Spec k="Inverter" v={p.inverter} /> : null}
                {p.completed ? <Spec k="Completed" v={formatMonth(p.completed)!} /> : null}
                <Spec k="Photos" v={String(p.gallery.length)} />
              </dl>
              <div className="mt-8 flex flex-col gap-2">
                <ButtonLink href={whatsappLink(`Hi Genius Solar, I saw your project "${p.title}". I'd like something similar.`)} variant="sun" icon="WhatsApp">
                  I want this for my roof
                </ButtonLink>
                {area ? (
                  <Link href={`/solar-installation/${area.slug}`} className="mt-2 inline-flex items-center gap-2 text-sm font-medium underline decoration-sun decoration-2 underline-offset-4">
                    Solar in {area.name} <Icon.ArrowRight size={16} />
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="text-h3 font-semibold">The story</h2>
            <div className="prose-solar mt-6">
              {p.story.map((s) => (
                <p key={s.slice(0, 20)}>{s}</p>
              ))}
            </div>
            <h2 className="mt-14 text-h3 font-semibold">Highlights</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-3 rounded-2xl bg-white p-5 ring-1 ring-line">
                  <Icon.Check size={20} className="mt-0.5 shrink-0 text-sun-ink" />
                  {h}
                </li>
              ))}
            </ul>
            <h2 className="mt-14 text-h3 font-semibold">Photographs</h2>
            <div className="mt-6">
              <PortfolioGallery items={gallery} />
            </div>
          </div>
        </div>
      </section>

      <section aria-label="More projects" className="mb-24">
        <div className="container-x">
          <p className="label text-graphite">More rooftops</p>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/projects/${o.slug}`} className="group relative flex min-h-[24rem] items-end overflow-hidden rounded-panel bg-ink p-6 text-white">
                  <Image src={photos[o.cover].src} alt={photos[o.cover].alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                  <span className="relative">
                    <span className="label text-sun">{o.locality ?? o.city}</span>
                    <span className="mt-2 block text-xl font-semibold leading-tight tracking-[-0.02em]">{o.title}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RelatedLinks paths={["/services/elevated-solar-structure-indore", "/residential-solar-indore", "/solar-subsidy-mp", "/solar-calculator"]} />
      <CtaQuote title="Want a rooftop like *this*?" source={`Project: ${p.slug}`} />
      <JsonLd
        data={graph(
          webPageSchema({
            path: page.path,
            title: page.title,
            description: page.description,
            about: { "@type": "Place", name: location },
          }),
          breadcrumbSchema(page.path, [
            { name: "Projects", path: "/projects" },
            { name: p.title, path: page.path },
          ]),
          p.gallery.map((k) => imageSchema(photos[k], { location, date: p.completed })),
        )}
      />
    </>
  );
}
