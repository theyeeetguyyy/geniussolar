import type { Metadata } from "next";
import { staticPages } from "@/content/registry";
import { pillars } from "@/content/pillars";
import { GuidePage } from "@/components/sections/guide-page";
import { NetMeterVisualizer } from "@/components/tools/net-meter-visualizer";
import { ButtonLink } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";

const P = staticPages.netMetering;
export const metadata: Metadata = pageMetadata({
  ...P,
  keywords: ["net metering Indore", "net metering MP", "MPPKVVCL net metering", "bi-directional meter Indore", "solar net meter process"],
  markdown: "/net-metering-indore.md",
});

export default function NetMeteringPage() {
  const d = pillars.netMetering;
  return (
    <GuidePage
      path={P.path}
      title={P.title}
      description={P.description}
      crumbs={[{ name: "Net metering in Indore", path: P.path }]}
      eyebrow="MP West Discom · MPPKVVCL"
      h1="Net metering in Indore: your meter, *running backwards*."
      lead="How the bi-directional meter works, what your bill looks like after solar, and how long approval takes with MP West Discom."
      actions={
        <ButtonLink href="/solar-calculator" variant="sun" size="lg">
          Estimate my savings
        </ButtonLink>
      }
      summary={d.summary}
      facts={d.facts}
      tool={
        <div className="container-x">
          <NetMeterVisualizer />
        </div>
      }
      markdown={d.body}
      faqs={d.faqs}
      related={["/solar-subsidy-mp", "/learn/how-to-read-mp-electricity-bill", "/learn/on-grid-vs-off-grid-vs-hybrid-solar", "/learn/how-much-solar-do-i-need"]}
      source="Net metering guide"
    />
  );
}
