import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceBySlug, services } from "@/content/services";
import { photos } from "@/content/photos";
import { whatsappLink } from "@/content/site";
import { GuidePage } from "@/components/sections/guide-page";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/icons";
import { pageMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return pageMetadata({ title: s.seoTitle, description: s.description, path: `/services/${s.slug}`, markdown: `/services/${s.slug}.md` });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();
  const path = `/services/${s.slug}`;
  return (
    <GuidePage
      path={path}
      title={s.seoTitle}
      description={s.description}
      crumbs={[
        { name: "Services", path: "/services" },
        { name: s.name, path },
      ]}
      eyebrow="Service · Indore"
      h1={s.name}
      lead={s.lead}
      photo={photos[s.photo]}
      actions={
        <ButtonLink href={whatsappLink(`Hi Genius Solar, I'm interested in: ${s.name}.`)} variant="sun" size="lg" icon="WhatsApp">
          Enquire on WhatsApp
        </ButtonLink>
      }
      summary={s.summary}
      tool={
        <section aria-label="What's included" className="container-x">
          <p className="label text-graphite">What&apos;s included</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {s.includes.map((x, i) => (
              <li key={x.t} className="reveal rounded-card bg-white p-6 ring-1 ring-line">
                <span className="label text-sun-ink">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 flex items-center gap-2 text-lg font-semibold tracking-[-0.02em]">
                  <Icon.Check size={18} className="text-sun-ink" /> {x.t}
                </p>
                <p className="mt-2 text-sm text-graphite">{x.b}</p>
              </li>
            ))}
          </ul>
        </section>
      }
      markdown={s.body}
      faqs={s.faqs}
      related={s.related}
      source={`Service: ${s.slug}`}
      extraSchema={[serviceSchema({ name: s.name, description: s.summary, path, serviceType: s.serviceType })]}
    />
  );
}
