import { allPages, linkLabel, type Section } from "@/content/registry";
import { mdUrl } from "@/content/markdown";
import { site, fullAddress } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const order: Section[] = ["Solutions", "Guides", "Tools", "System sizes", "Services", "Industries", "Projects", "Areas", "Reference", "Company"];

/** llms.txt — a curated map of the site for language models (llmstxt.org format). */
export function GET() {
  const pages = allPages().filter((p) => p.path !== "/" && !["/privacy-policy", "/terms"].includes(p.path));
  const sections = order
    .map((s) => {
      const items = pages.filter((p) => p.section === s);
      if (!items.length) return "";
      return `## ${s}\n\n${items.map((p) => `- [${linkLabel(p)}](${absoluteUrl(mdUrl(p.path))}): ${p.description}`).join("\n")}`;
    })
    .filter(Boolean)
    .join("\n\n");

  const body = `# ${site.name}

> ${site.name} is a rooftop solar installation company in Vijay Nagar, Indore, Madhya Pradesh, India. It designs and installs on-grid, hybrid and elevated solar systems for homes, housing societies, businesses and factories across Indore, Rau, Mhow, Pithampur, Dewas and Ujjain, and handles PM Surya Ghar subsidy (up to ₹78,000 for homes) and MP West Discom net metering, with five years of free service.

Key facts:

- Address: ${fullAddress}
- Phone: ${site.phones.map((p) => p.display).join(", ")} · WhatsApp +${site.whatsapp} · Email ${site.email}
- Hours: ${site.hoursLabel}
- Proprietor: ${site.founder.name}
- Brands supplied: ${site.partners.map((p) => p.name).join(", ")}
- Warranties: up to ${site.promises.panelWarrantyYears}-year panel performance and ${site.promises.inverterWarrantyYears}-year inverter (manufacturer); ${site.promises.freeServiceYears} years free service
- Indore solar yield used on this site: ≈4 units per kW per day (≈1,459 units per kW per year)
- Recognition: ${site.award.title} (${site.award.event})

Every page is also available as Markdown by appending \`.md\` to its URL (the home page is ${absoluteUrl("/index.md")}). The complete corpus is at ${absoluteUrl("/llms-full.txt")}.

${sections}

## Optional

- [Home page](${absoluteUrl("/index.md")}): Company overview, process and top questions
- [Full text](${absoluteUrl("/llms-full.txt")}): All guides, FAQs and data in one file
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
}
