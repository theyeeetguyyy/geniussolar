import type { Metadata } from "next";
import { staticPages } from "@/content/registry";
import { faqsByTag } from "@/content/faqs";
import { GuidePage } from "@/components/sections/guide-page";
import { RoofQuiz } from "@/components/tools/roof-quiz";
import { pageMetadata } from "@/lib/seo";

const P = staticPages.roofCheck;
export const metadata: Metadata = pageMetadata({
  ...P,
  keywords: ["is my roof suitable for solar", "roof solar check Indore", "solar roof requirements", "shadow free roof solar"],
  markdown: "/roof-suitability-check.md",
});

const body = `
## What makes a roof good for solar

| Factor | Ideal | Workable | Needs a closer look |
|---|---|---|---|
| Roof type | Flat RCC | Metal sheet, tiles | Asbestos, damaged slab |
| Open area | 300+ sq ft | 100–300 sq ft | Under 100 sq ft |
| Shade (9 am–4 pm) | None | Small tank/parapet | Trees, taller buildings |
| Open direction | South | East/west | North only |
| Connection | Own house, own name | Family member's name | Rented, owner consent needed |

## Quick self-checks you can do today

1. **Measure** the open terrace with your steps (one long step ≈ 2.5 ft).
2. **Watch the shadows** at 9 am, noon and 4 pm — winter shadows are the longest.
3. **Look for cracks and seepage** on the top-floor ceiling.
4. **Check your bill** for the sanctioned load and whose name the connection is in.

Then book the free survey — an engineer confirms roof strength, shading across the year, cable routes and earthing points. See the [roof orientation and shading guide](/learn/roof-orientation-shading-guide).
`;

export default function RoofCheckPage() {
  return (
    <GuidePage
      path={P.path}
      title={P.title}
      description={P.description}
      crumbs={[{ name: "Roof suitability check", path: P.path }]}
      eyebrow="Free tool · 5 questions · 30 seconds"
      h1="Is your roof *ready* for solar?"
      lead="Five quick questions about your roof, shade, direction and connection. Get an instant verdict and practical tips — then send it to us for a free survey."
      summary="A roof suits rooftop solar in Indore when it has shadow-free space (about 90 sq ft per kW), minimal shade between 9 am and 4 pm, an open southern side, a sound structure and an electricity connection in the owner's name. Flat RCC roofs are easiest; metal-sheet roofs work with rail mounting; asbestos roofs need an independent structure. Shade from tanks or parapets is often solved by an elevated structure. A free site survey confirms structural strength and seasonal shading."
      facts={[
        { k: "Space per kW", v: "≈90 sq ft" },
        { k: "Shade-free", v: "9 am – 4 pm" },
        { k: "Best side", v: "South" },
        { k: "Survey", v: "Free" },
      ]}
      tool={
        <div className="container-x">
          <RoofQuiz />
        </div>
      }
      markdown={body}
      faqs={faqsByTag("roof", "shade", "direction")}
      related={["/learn/roof-orientation-shading-guide", "/services/elevated-solar-structure-indore", "/solar-calculator", "/learn/how-much-solar-do-i-need"]}
      source="Roof check"
    />
  );
}
