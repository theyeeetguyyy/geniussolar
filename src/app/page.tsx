import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { BillStory } from "@/components/home/bill-story";
import { WhyGenius } from "@/components/home/why-genius";
import { PanelAnatomy } from "@/components/home/panel-anatomy";
import { ProjectsReel } from "@/components/home/projects-reel";
import { SubsidyBlock } from "@/components/home/subsidy-block";
import { Segments } from "@/components/home/segments";
import { Voices } from "@/components/home/voices";
import { Process } from "@/components/sections/process";
import { FaqList } from "@/components/sections/faq-list";
import { ServiceMap } from "@/components/sections/service-map";
import { CtaQuote } from "@/components/sections/cta-quote";
import { QuickCalculator } from "@/components/tools/quick-calculator";
import { NetMeterVisualizer } from "@/components/tools/net-meter-visualizer";
import { SectionHeader } from "@/components/ui/section";
import { InkText } from "@/components/ui/ink-text";
import { ArrowLink } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { homeFaqs } from "@/content/faqs";
import { processSteps } from "@/content/process";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, howToSchema, webPageSchema } from "@/lib/schema";

const title = "Solar Panel Company in Indore | Rooftop Solar Installation — Genius Solar";
const description =
  "Genius Solar Services installs rooftop solar in Indore for homes, housing societies and businesses. ₹78,000 PM Surya Ghar subsidy, net metering, elevated structures and 5 years free service. Free site survey.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/",
  keywords: [
    "solar panel company in Indore",
    "rooftop solar Indore",
    "solar installation Indore",
    "solar panels Indore",
    "PM Surya Ghar subsidy Indore",
    "net metering Indore",
    "solar company Vijay Nagar",
  ],
  markdown: "/index.md",
});

const intro =
  "Genius Solar Services is a rooftop solar company based in Vijay Nagar, Indore. We design and install on-grid, hybrid and elevated solar systems for homes, housing societies, shops, schools and factories across Indore, Rau, Mhow, Pithampur, Dewas and Ujjain — and handle the PM Surya Ghar subsidy, MP West Discom net metering and five years of free service.";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />

      <section aria-label="About Genius Solar" className="section-y">
        <div className="container-x">
          <p className="label text-graphite">
            <span className="text-sun-ink">01</span> — In short
          </p>
          <InkText text={intro} className="ai-summary mt-8 max-w-6xl text-[clamp(1.75rem,3.6vw,3.4rem)] font-medium leading-[1.12] tracking-[-0.035em]" />
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            <ArrowLink href="/about">Our story</ArrowLink>
            <ArrowLink href="/projects">See our rooftops</ArrowLink>
            <ArrowLink href="/solar-panel-price-indore">Prices in Indore</ArrowLink>
          </div>
        </div>
      </section>

      <BillStory />

      <section id="calculator" aria-labelledby="calc-title" className="section-y bg-stone-50">
        <div className="container-x">
          <SectionHeader
            index="03"
            eyebrow="Savings calculator"
            title="What would *your* roof earn?"
            align="split"
            lead="Move the slider to your average monthly bill. Numbers update live using Indore's sunshine, current subsidy and real installation prices."
          />
          <div className="mt-14">
            <QuickCalculator />
          </div>
        </div>
      </section>

      <WhyGenius />
      <PanelAnatomy />

      <section aria-labelledby="flow-title" className="section-y">
        <div className="container-x">
          <SectionHeader
            index="06"
            eyebrow="Net metering, visualised"
            title="Sun to panel to home to grid — and *back*."
            align="split"
            lead="Tap through a day on an Indore rooftop. By day you export surplus and earn credit; by night you draw it back. One bi-directional meter keeps score."
          >
            <ArrowLink href="/net-metering-indore">Net metering in Indore, explained</ArrowLink>
          </SectionHeader>
          <NetMeterVisualizer className="mt-14" />
        </div>
      </section>

      <Process index="07" />
      <ProjectsReel />
      <SubsidyBlock />
      <Segments />
      <Voices />

      <section aria-labelledby="faq-title" className="section-y bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader index="12" eyebrow="Questions" title="Straight *answers*." />
            <p className="mt-6 text-graphite">The questions Indore homeowners ask us most. There are many more in our FAQ.</p>
            <ArrowLink href="/faq" className="mt-6">
              All questions
            </ArrowLink>
          </div>
          <FaqList faqs={homeFaqs} className="lg:col-span-8" openFirst />
        </div>
      </section>

      <ServiceMap index="13" />
      <CtaQuote />

      <JsonLd
        data={graph(
          webPageSchema({ path: "/", title, description }),
          breadcrumbSchema("/", []),
          faqSchema(homeFaqs, "/"),
          howToSchema({
            name: "How to install rooftop solar with PM Surya Ghar subsidy in Indore",
            path: "/",
            steps: processSteps.map((s) => ({ name: s.title, text: s.body })),
          }),
        )}
      />
    </>
  );
}
