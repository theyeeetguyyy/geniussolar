import type { Metadata } from "next";
import { site } from "@/content/site";

export const absoluteUrl = (path = "/") => (path === "/" ? site.url : `${site.url}${path}`);

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  /** Markdown mirror for LLM crawlers, e.g. "/learn/net-metering.md" */
  markdown?: string;
}

/**
 * Every route builds its metadata through here so titles, canonicals,
 * hreflang and social cards stay consistent. OG images come from the
 * colocated opengraph-image files (file-based metadata wins).
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
  noindex,
  markdown,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: { "en-IN": url, "x-default": url },
      ...(markdown ? { types: { "text/markdown": absoluteUrl(markdown) } } : {}),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
      ...(type === "article" ? { publishedTime, modifiedTime, authors: [site.name] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
