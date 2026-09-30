import type { Metadata } from "next";
import { staticPages } from "@/content/registry";
import { pillars } from "@/content/pillars";
import { photos } from "@/content/photos";
import { GuidePage } from "@/components/sections/guide-page";
import { SubsidyEstimator } from "@/components/tools/subsidy-estimator";
import { ButtonLink } from "@/components/ui/button";
import { whatsappLink } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { howToSchema } from "@/lib/schema";

const P = staticPages.subsidy;
export const metadata: Metadata = pageMetadata({
  ...P,
  keywords: ["PM Surya Ghar subsidy MP", "solar subsidy Indore", "solar subsidy Madhya Pradesh", "PM Surya Ghar Yojana Indore", "rooftop solar subsidy 2026"],
  markdown: "/solar-subsidy-mp.md",
});

export default function SubsidyPage() {
  const d = pillars.subsidy;
  return (
    <GuidePage
      path={P.path}
      title={P.title}
      description={P.description}
      crumbs={[{ name: "PM Surya Ghar subsidy (MP)", path: P.path }]}
      eyebrow="PM Surya Ghar: Muft Bijli Yojana · Madhya Pradesh"
      h1="Solar subsidy in MP: up to *₹78,000* back on your roof."
      lead="How much you get, who qualifies, the documents, and every step of the application in Indore — plus a calculator for your exact amount."
      actions={
        <>
          <ButtonLink href={whatsappLink("Hi Genius Solar, please help me apply for the PM Surya Ghar subsidy.")} variant="sun" size="lg" icon="WhatsApp">
            Apply with us
          </ButtonLink>
          <ButtonLink href="/solar-calculator" variant="ghost" size="lg">
            Estimate savings
          </ButtonLink>
        </>
      }
      photo={photos.familyHandover}
      summary={d.summary}
      facts={d.facts}
      tool={<SubsidyEstimator />}
      markdown={d.body}
      faqs={d.faqs}
      related={["/net-metering-indore", "/solar-panel-price-indore", "/learn/dcr-vs-non-dcr-solar-panels", "/learn/solar-loan-emi-guide"]}
      source="Subsidy guide"
      extraSchema={[
        howToSchema({
          name: "How to apply for the PM Surya Ghar solar subsidy in Indore, Madhya Pradesh",
          path: P.path,
          totalTime: "P6W",
          steps: [
            { name: "Register on the national portal", text: "Register on pmsuryaghar.gov.in with state Madhya Pradesh, DISCOM MP West Discom, your consumer number and mobile number." },
            { name: "Apply and choose a vendor", text: "Submit the rooftop solar application and select a registered vendor." },
            { name: "Get feasibility approval", text: "MP West Discom approves technical feasibility for your connection and capacity." },
            { name: "Install the system", text: "The vendor installs the system using DCR modules." },
            { name: "Net metering and inspection", text: "Apply for net metering; the DISCOM inspects and installs a bi-directional meter." },
            { name: "Commissioning", text: "The commissioning report is generated on the portal." },
            { name: "Receive the subsidy", text: "Submit bank details; the subsidy is credited to your bank account." },
          ],
        }),
      ]}
    />
  );
}
