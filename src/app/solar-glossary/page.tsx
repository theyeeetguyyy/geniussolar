import type { Metadata } from "next";
import Link from "next/link";
import { staticPages } from "@/content/registry";
import { glossary } from "@/content/glossary";
import { slugify } from "@/lib/utils";
import { PageHero } from "@/components/sections/page-hero";
import { RelatedLinks } from "@/components/sections/related";
import { CtaQuote } from "@/components/sections/cta-quote";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/icons";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";

const P = staticPages.glossary;
export const metadata: Metadata = pageMetadata({ ...P, markdown: "/solar-glossary.md" });

export default function GlossaryPage() {
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
  const letters = Array.from(new Set(sorted.map((t) => t.term[0].toUpperCase())));
  return (
    <>
      <PageHero
        crumbs={[{ name: "Solar glossary", path: P.path }]}
        eyebrow={`${glossary.length} terms`}
        title="Solar, in *plain* words."
        lead="The terms you'll meet in quotes, datasheets and DISCOM forms — explained in a sentence or two."
      />
      <nav aria-label="Letters" className="sticky top-24 z-20 mb-10">
        <div className="container-x">
          <ul className="no-scrollbar flex gap-1 overflow-x-auto rounded-full bg-white/85 p-1.5 shadow-soft ring-1 ring-line backdrop-blur">
            {letters.map((l) => (
              <li key={l}>
                <a href={`#letter-${l}`} className="grid size-9 place-items-center rounded-full text-sm font-medium hover:bg-sun-soft">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="container-x pb-24">
        {letters.map((l) => (
          <section key={l} id={`letter-${l}`} aria-label={l} className="grid scroll-mt-40 gap-6 border-t border-line py-10 lg:grid-cols-12">
            <p className="text-5xl font-semibold tracking-[-0.05em] text-sun-ink lg:col-span-2">{l}</p>
            <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-10">
              {sorted
                .filter((t) => t.term[0].toUpperCase() === l)
                .map((t) => (
                  <div key={t.term} id={slugify(t.term)} className="scroll-mt-40">
                    <dt className="text-lg font-semibold tracking-[-0.02em]">
                      {t.term}
                      {t.aka ? <span className="ml-2 text-sm font-normal text-graphite">({t.aka})</span> : null}
                    </dt>
                    <dd className="mt-2 text-graphite">
                      {t.def}
                      {t.link ? (
                        <Link href={t.link} className="ml-1 inline-flex items-center gap-1 font-medium text-ink underline decoration-sun decoration-2 underline-offset-4">
                          Learn more <Icon.ArrowRight size={14} />
                        </Link>
                      ) : null}
                    </dd>
                  </div>
                ))}
            </dl>
          </section>
        ))}
      </div>
      <RelatedLinks paths={["/learn", "/faq", "/learn/solar-panel-types-mono-perc-topcon-bifacial", "/net-metering-indore"]} />
      <CtaQuote source="Glossary" />
      <JsonLd
        data={graph(
          webPageSchema({ path: P.path, title: P.title, description: P.description }),
          breadcrumbSchema(P.path, [{ name: "Solar glossary", path: P.path }]),
          {
            "@type": "DefinedTermSet",
            "@id": `${absoluteUrl(P.path)}#terms`,
            name: "Rooftop solar glossary",
            hasDefinedTerm: sorted.map((t) => ({
              "@type": "DefinedTerm",
              name: t.term,
              ...(t.aka ? { alternateName: t.aka } : {}),
              description: t.def,
              url: `${absoluteUrl(P.path)}#${slugify(t.term)}`,
              inDefinedTermSet: `${absoluteUrl(P.path)}#terms`,
            })),
          },
        )}
      />
    </>
  );
}
