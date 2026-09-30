import type { ReactNode } from "react";
import type { Photo } from "@/content/photos";
import { PageHero, type Crumb } from "@/components/sections/page-hero";
import { Prose } from "@/components/sections/prose";
import { FaqList } from "@/components/sections/faq-list";
import { RelatedLinks } from "@/components/sections/related";
import { CtaQuote } from "@/components/sections/cta-quote";
import { AsideCta } from "@/components/sections/aside-cta";
import { AiSummary } from "@/components/seo/ai-summary";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/schema";

/**
 * Shared layout for pillar and landing pages:
 * hero → "In short" → interactive tool → long-form body → FAQs → related → CTA.
 * Content order follows Question → Answer → Table → Example for retrieval.
 */
export function GuidePage({
  path,
  title,
  description,
  crumbs,
  eyebrow,
  h1,
  lead,
  actions,
  photo,
  media,
  summary,
  facts,
  tool,
  markdown,
  faqs,
  related,
  extraSchema = [],
  children,
  source,
}: {
  path: string;
  title: string;
  description: string;
  crumbs: Crumb[];
  eyebrow: string;
  h1: string;
  lead: ReactNode;
  actions?: ReactNode;
  photo?: Photo;
  media?: ReactNode;
  summary: string;
  facts?: { k: string; v: string }[];
  tool?: ReactNode;
  markdown?: string;
  faqs?: { q: string; a: string }[];
  related?: string[];
  extraSchema?: Record<string, unknown>[];
  children?: ReactNode;
  source: string;
}) {
  return (
    <>
      <PageHero crumbs={crumbs} eyebrow={eyebrow} title={h1} lead={lead} photo={photo} media={media} tone="sun">
        {actions}
      </PageHero>
      <div className="container-x mb-16">
        <AiSummary facts={facts}>
          <p>{summary}</p>
        </AiSummary>
      </div>
      {tool ? <div className="mb-24">{tool}</div> : null}
      {children}
      {markdown ? <Prose markdown={markdown} aside={<AsideCta />} className="mb-24" /> : null}
      {faqs?.length ? (
        <section aria-label="Frequently asked questions" className="section-y bg-white">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="label text-graphite">FAQ</p>
              <h2 className="mt-4 text-h3 font-semibold">Questions people ask us</h2>
            </div>
            <FaqList faqs={faqs} className="lg:col-span-8" />
          </div>
        </section>
      ) : null}
      {related?.length ? <RelatedLinks paths={related} className="pt-24" /> : null}
      <CtaQuote source={source} />
      <JsonLd
        data={graph(
          webPageSchema({ path, title, description }),
          breadcrumbSchema(path, crumbs),
          faqs?.length ? faqSchema(faqs, path) : null,
          ...extraSchema,
        )}
      />
    </>
  );
}
