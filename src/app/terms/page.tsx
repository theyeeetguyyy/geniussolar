import type { Metadata } from "next";
import { staticPages } from "@/content/registry";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/page-hero";
import { renderMarkdown } from "@/lib/markdown";
import { pageMetadata } from "@/lib/seo";

const P = staticPages.terms;
export const metadata: Metadata = pageMetadata(P);

const body = `
_Last updated: 29 September 2026_

## Estimates are guidance, not quotations

Prices, savings, payback periods, generation figures, EMIs and subsidy amounts shown on this website and in its calculators are **estimates** based on typical conditions in Indore, indicative prices and government rules as we understand them at the time of writing. Your actual quotation follows a site survey. Actual generation depends on weather, shading, orientation, equipment and maintenance.

## Government schemes

Subsidy amounts, eligibility and processes under PM Surya Ghar: Muft Bijli Yojana and net-metering rules are set by the Government of India, MNRE, MPERC and MP West Discom and can change. We will confirm the rules that apply at the time of your application; we cannot guarantee approval or timelines controlled by these bodies.

## Trademarks

Adani Solar, Vikram Solar, Havells, Luminous, Polycab and other brand names are trademarks of their respective owners. They are mentioned only to identify products we supply and install.

## Content

Guides on this site are provided for general information and may be quoted with a link back to the source page. Photographs are of installations by ${site.name} and may not be reused without permission.

## Contact

Questions about these terms: ${site.email}.
`;

export default function TermsPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Terms", path: P.path }]} title="Terms of use" />
      <div className="container-x pb-28">
        <article className="prose-solar max-w-3xl" dangerouslySetInnerHTML={{ __html: renderMarkdown(body) }} />
      </div>
    </>
  );
}
