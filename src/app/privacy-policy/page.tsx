import type { Metadata } from "next";
import { staticPages } from "@/content/registry";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/page-hero";
import { renderMarkdown } from "@/lib/markdown";
import { pageMetadata } from "@/lib/seo";

const P = staticPages.privacy;
export const metadata: Metadata = pageMetadata(P);

const body = `
_Last updated: 29 September 2026_

## What this website collects

This website does not have user accounts and does not store enquiries on a server. When you use the enquiry form, it prepares a message that opens in **your** WhatsApp or email app; nothing is sent until you press send there.

The **solar calculator's bill scan** runs entirely in your browser. Your bill file is not uploaded to ${site.name} or any third party. To read photos, the browser downloads an open-source text-recognition engine (Tesseract) and, for PDFs, a PDF reader (PDF.js) from a public content delivery network; your file itself stays on your device.

## Information you share with us

If you contact us by WhatsApp, phone or email, we receive the details you choose to share — typically your name, phone number, locality, electricity bill details and property information. We use them only to respond, survey your property, prepare a quotation, install and service your system, and to file subsidy and net-metering applications you ask us to file.

## Sharing

We share your details only as needed to deliver your project: with MP West Discom and the national PM Surya Ghar portal for approvals and subsidy, with your chosen bank for finance, and with equipment manufacturers for warranty claims. We do not sell your information.

## Cookies and analytics

This site does not use advertising cookies. It may store small preferences in your browser. If we add privacy-friendly analytics in future, this page will be updated.

## Embedded content

The contact page embeds a Google Map, which is governed by Google's privacy policy.

## Your choices

You can ask us to update or delete the information you have shared with us by writing to ${site.email} or calling ${site.phones[0].display}.

## Contact

${site.name}, ${site.address.line1}, ${site.address.line2}, ${site.address.city} ${site.address.postalCode}.
`;

export default function PrivacyPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Privacy", path: P.path }]} title="Privacy policy" />
      <div className="container-x pb-28">
        <article className="prose-solar max-w-3xl" dangerouslySetInnerHTML={{ __html: renderMarkdown(body) }} />
      </div>
    </>
  );
}
