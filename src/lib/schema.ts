/**
 * schema.org builders. Every node gets a stable @id so pages can reference the
 * same Organization / LocalBusiness entity instead of redefining it — this is
 * what lets search engines and LLMs resolve "Genius Solar Services" as one entity.
 */
import { site, fullAddress } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";
import type { Photo } from "@/content/photos";

type Json = Record<string, unknown>;

export const ids = {
  org: `${site.url}/#organization`,
  business: `${site.url}/#localbusiness`,
  website: `${site.url}/#website`,
  founder: `${site.url}/about#founder`,
  logo: `${site.url}/#logo`,
};

const sameAs = Object.values(site.social).filter(Boolean);

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: `${site.address.line1}, ${site.address.line2}, ${site.address.landmark}`,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

export function organizationSchema(): Json {
  return {
    "@type": "Organization",
    "@id": ids.org,
    name: site.name,
    alternateName: [site.shortName, "Genius Solar Indore"],
    url: site.url,
    slogan: site.tagline,
    email: site.email,
    telephone: site.phones[0].e164,
    logo: {
      "@type": "ImageObject",
      "@id": ids.logo,
      url: absoluteUrl("/genius-solar-services-logo.png"),
      caption: site.name,
    },
    founder: { "@id": ids.founder },
    address: postalAddress,
    sameAs,
    award: `${site.award.title} (${site.award.event})`,
    knowsAbout: [
      "Rooftop solar power systems",
      "On-grid solar systems",
      "Hybrid and off-grid solar systems",
      "Net metering in Madhya Pradesh",
      "PM Surya Ghar: Muft Bijli Yojana",
      "Elevated solar mounting structures",
      "Solar inverter installation",
      "Solar panel cleaning and maintenance",
      "Commercial and industrial solar EPC",
    ],
  };
}

export function founderSchema(): Json {
  return {
    "@type": "Person",
    "@id": ids.founder,
    name: site.founder.name,
    jobTitle: site.founder.role,
    worksFor: { "@id": ids.org },
    image: absoluteUrl("/about/opengraph-image"),
  };
}

export function localBusinessSchema(): Json {
  const { stats } = site;
  return {
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": ids.business,
    name: site.name,
    description:
      "Rooftop solar installation company in Indore, Madhya Pradesh. Residential, housing society, commercial and industrial on-grid solar systems with PM Surya Ghar subsidy and net-metering support.",
    url: site.url,
    parentOrganization: { "@id": ids.org },
    image: [absoluteUrl("/opengraph-image"), absoluteUrl("/genius-solar-services-logo.png")],
    logo: { "@id": ids.logo },
    telephone: site.phones[0].e164,
    email: site.email,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Bank transfer, Bank finance",
    address: postalAddress,
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.maps.url,
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: site.serviceArea.map((name) => ({ "@type": "City", name })),
    founder: { "@id": ids.founder },
    sameAs,
    ...(stats.googleRating && stats.googleReviewCount
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: stats.googleRating,
            reviewCount: stats.googleReviewCount,
            bestRating: 5,
          },
        }
      : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Solar services",
      itemListElement: [
        "Residential rooftop solar installation",
        "Housing society solar",
        "Commercial and industrial solar EPC",
        "Elevated solar structures",
        "Net metering application",
        "PM Surya Ghar subsidy assistance",
        "Solar panel cleaning",
        "Solar maintenance (AMC)",
      ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
    knowsLanguage: ["en", "hi"],
  };
}

export function websiteSchema(): Json {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: site.url,
    name: site.name,
    inLanguage: site.language,
    publisher: { "@id": ids.org },
  };
}

export function webPageSchema({
  path,
  title,
  description,
  type = "WebPage",
  image,
  dateModified,
  about,
}: {
  path: string;
  title: string;
  description: string;
  type?: string;
  image?: string;
  dateModified?: string;
  about?: Json | Json[];
}): Json {
  const url = absoluteUrl(path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: site.language,
    isPartOf: { "@id": ids.website },
    publisher: { "@id": ids.org },
    ...(image ? { primaryImageOfPage: { "@type": "ImageObject", url: image } } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(about ? { about } : { about: { "@id": ids.business } }),
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".ai-summary", "h1"] },
    breadcrumb: { "@id": `${url}#breadcrumb` },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(path: string, crumbs: Crumb[]): Json {
  const url = absoluteUrl(path);
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[], path: string): Json {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema({
  name,
  description,
  path,
  serviceType,
  areaServed = site.serviceArea as readonly string[],
  offers,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  areaServed?: readonly string[];
  offers?: { low: number; high: number };
}): Json {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    description,
    serviceType,
    url: absoluteUrl(path),
    provider: { "@id": ids.business },
    areaServed: areaServed.map((n) => ({ "@type": "City", name: n })),
    ...(offers
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "INR",
            lowPrice: offers.low,
            highPrice: offers.high,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

export function productSchema({
  name,
  description,
  path,
  image,
  low,
  high,
  sku,
}: {
  name: string;
  description: string;
  path: string;
  image: string;
  low: number;
  high: number;
  sku: string;
}): Json {
  return {
    "@type": "Product",
    "@id": `${absoluteUrl(path)}#product`,
    name,
    description,
    sku,
    image,
    brand: { "@type": "Brand", name: site.name },
    category: "Rooftop solar power system",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: low,
      highPrice: high,
      offerCount: 1,
      availability: "https://schema.org/InStock",
      seller: { "@id": ids.business },
      areaServed: { "@type": "City", name: "Indore" },
    },
  };
}

export function imageSchema(photo: Photo, extra?: { location?: string; date?: string }): Json {
  return {
    "@type": "ImageObject",
    "@id": `${site.url}/images/${photo.id}`,
    contentUrl: absoluteUrl(photo.src.src),
    url: absoluteUrl(photo.src.src),
    width: photo.src.width,
    height: photo.src.height,
    caption: photo.caption,
    description: photo.alt,
    creator: { "@id": ids.org },
    copyrightHolder: { "@id": ids.org },
    creditText: site.name,
    copyrightNotice: `© ${site.name}`,
    acquireLicensePage: absoluteUrl("/contact"),
    ...(extra?.location
      ? { contentLocation: { "@type": "Place", name: extra.location, address: { "@type": "PostalAddress", addressLocality: "Indore", addressRegion: "Madhya Pradesh", addressCountry: "IN" } } }
      : {}),
    ...(extra?.date ? { dateCreated: extra.date } : {}),
  };
}

export function articleSchema({
  path,
  title,
  description,
  published,
  modified,
  image,
  section,
}: {
  path: string;
  title: string;
  description: string;
  published: string;
  modified: string;
  image: string;
  section: string;
}): Json {
  const url = absoluteUrl(path);
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    datePublished: published,
    dateModified: modified,
    image,
    articleSection: section,
    inLanguage: site.language,
    author: { "@id": ids.org },
    reviewedBy: { "@id": ids.founder },
    publisher: { "@id": ids.org },
  };
}

export function howToSchema({ name, path, steps, totalTime }: { name: string; path: string; steps: { name: string; text: string }[]; totalTime?: string }): Json {
  return {
    "@type": "HowTo",
    "@id": `${absoluteUrl(path)}#howto`,
    name,
    ...(totalTime ? { totalTime } : {}),
    step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name, text: s.text })),
  };
}

export function itemListSchema(path: string, items: { name: string; path: string }[], name: string): Json {
  return {
    "@type": "ItemList",
    "@id": `${absoluteUrl(path)}#list`,
    name,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absoluteUrl(it.path) })),
  };
}

export function graph(...nodes: (Json | Json[] | null | undefined | false)[]): Json {
  return { "@context": "https://schema.org", "@graph": nodes.flat().filter(Boolean) };
}

export { fullAddress };
