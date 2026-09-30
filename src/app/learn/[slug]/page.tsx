import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articleBySlug, articles, readingMinutes } from "@/content/articles";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/page-hero";
import { Prose } from "@/components/sections/prose";
import { FaqList } from "@/components/sections/faq-list";
import { RelatedLinks } from "@/components/sections/related";
import { CtaQuote } from "@/components/sections/cta-quote";
import { AsideCta } from "@/components/sections/aside-cta";
import { AiSummary } from "@/components/seo/ai-summary";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) return {};
  return pageMetadata({
    title: a.seoTitle,
    description: a.description,
    path: `/learn/${a.slug}`,
    type: "article",
    publishedTime: a.published,
    modifiedTime: a.updated,
    markdown: `/learn/${a.slug}.md`,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) notFound();
  const path = `/learn/${a.slug}`;
  const updated = new Date(a.updated).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Learn", path: "/learn" },
          { name: a.title.split(":")[0], path },
        ]}
        eyebrow={`${a.cluster} · ${readingMinutes(a)} min read`}
        title={a.title}
        lead={
          <p className="text-base text-graphite">
            By the {site.name} engineering team · Reviewed by {site.founder.name} · Updated <time dateTime={a.updated}>{updated}</time>
          </p>
        }
      />
      <div className="container-x -mt-4 mb-16 grid lg:grid-cols-12">
        <AiSummary facts={a.keyFacts} className="lg:col-span-8 lg:col-start-5">
          <p>{a.summary}</p>
        </AiSummary>
      </div>
      <Prose markdown={a.body} aside={<AsideCta />} />
      {a.faqs?.length ? (
        <section aria-label="Questions" className="section-y">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <h2 className="text-h3 font-semibold lg:col-span-3">Questions about this topic</h2>
            <FaqList faqs={a.faqs} className="lg:col-span-8 lg:col-start-5" />
          </div>
        </section>
      ) : (
        <div className="h-24" />
      )}
      <RelatedLinks paths={a.related} title="Related guides & tools" />
      <CtaQuote source={`Guide: ${a.slug}`} />
      <JsonLd
        data={graph(
          webPageSchema({ path, title: a.seoTitle, description: a.description, dateModified: a.updated }),
          breadcrumbSchema(path, [
            { name: "Learn", path: "/learn" },
            { name: a.title, path },
          ]),
          articleSchema({
            path,
            title: a.title,
            description: a.description,
            published: a.published,
            modified: a.updated,
            image: absoluteUrl(`${path}/opengraph-image`),
            section: a.cluster,
          }),
          a.faqs?.length ? faqSchema(a.faqs, path) : null,
        )}
      />
    </>
  );
}
