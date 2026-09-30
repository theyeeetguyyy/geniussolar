/**
 * Plain-Markdown versions of every page, served at `<page>.md` and stitched
 * into /llms-full.txt. Clean text with tables and Q&A blocks is the easiest
 * format for AI assistants and answer engines to retrieve and quote.
 */
import { site, fullAddress } from "@/content/site";
import { allPages, staticPages, linkLabel } from "@/content/registry";
import { articles, articleBySlug } from "@/content/articles";
import { services, serviceBySlug } from "@/content/services";
import { industries, industryBySlug } from "@/content/industries";
import { projects, projectBySlug } from "@/content/projects";
import { systemSizes, systemBySlug } from "@/content/systems";
import { areas, areaBySlug } from "@/content/areas";
import { faqs, faqCategories, homeFaqs, faqsByTag } from "@/content/faqs";
import { glossary } from "@/content/glossary";
import { pillars } from "@/content/pillars";
import { processSteps } from "@/content/process";
import { areaMarkdown, projectMarkdown, systemMarkdown, systemSummary } from "@/content/generated";
import { absoluteUrl } from "@/lib/seo";

const qa = (list: { q: string; a: string }[]) => list.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n");
const facts = (list: { k: string; v: string }[]) => list.map((f) => `- **${f.k}:** ${f.v}`).join("\n");

const footer = () => `
---

**${site.name}** · ${fullAddress} · Phone ${site.phones.map((p) => p.display).join(", ")} · ${site.email} · ${site.hoursLabel}
Source: ${site.url}
`;

const businessFacts = () => `
## About ${site.name}

- Rooftop solar company based in Vijay Nagar, Indore, Madhya Pradesh. Proprietor: ${site.founder.name}.
- Installs on-grid, hybrid and elevated rooftop solar for homes, housing societies, businesses and industry.
- Handles PM Surya Ghar subsidy (up to ₹78,000 for homes) and MP West Discom net metering.
- Warranties: up to ${site.promises.panelWarrantyYears}-year panel performance (manufacturer), up to ${site.promises.inverterWarrantyYears}-year inverter (manufacturer), ${site.promises.freeServiceYears} years free service.
- Brands supplied: ${site.partners.map((p) => p.name).join(", ")}.
- Recognition: ${site.award.title}, ${site.award.event}.
- Service area: ${site.serviceArea.join(", ")}.
`;

function withTitle(path: string, body: string) {
  const page = allPages().find((p) => p.path === path);
  const head = page ? `# ${linkLabel(page)}\n\n> ${page.description}\n\nCanonical: ${absoluteUrl(path)}\n` : "";
  return `${head}\n${body.trim()}\n${footer()}`;
}

const listOf = (items: { name: string; path: string; note?: string }[]) =>
  items.map((i) => `- [${i.name}](${absoluteUrl(i.path)})${i.note ? `: ${i.note}` : ""}`).join("\n");

export function markdownFor(path: string): string | null {
  const [, a, b] = path.split("/");

  switch (path) {
    case "/":
      return withTitle(
        "/",
        `
${businessFacts()}

## How it works

${processSteps.map((s, i) => `${i + 1}. **${s.title}** (${s.time}) — ${s.body}`).join("\n")}

## Frequently asked

${qa(homeFaqs)}
`,
      );
    case "/about":
      return withTitle("/about", businessFacts());
    case "/solar-subsidy-mp":
      return withTitle(path, `${pillars.subsidy.summary}\n\n${facts(pillars.subsidy.facts)}\n\n${pillars.subsidy.body}\n\n## FAQ\n\n${qa(pillars.subsidy.faqs)}`);
    case "/net-metering-indore":
      return withTitle(path, `${pillars.netMetering.summary}\n\n${facts(pillars.netMetering.facts)}\n\n${pillars.netMetering.body}\n\n## FAQ\n\n${qa(pillars.netMetering.faqs)}`);
    case "/solar-panel-price-indore":
      return withTitle(path, `${pillars.price.summary}\n\n${facts(pillars.price.facts)}\n\n${pillars.price.body}\n\n## FAQ\n\n${qa(pillars.price.faqs)}`);
    case "/residential-solar-indore":
      return withTitle(
        path,
        `## Home system sizes\n\n${systemSizes
          .filter((s) => s.segment === "home")
          .map((s) => `- **${s.kw} kW** — ${systemSummary(s)}`)
          .join("\n")}\n\n## FAQ\n\n${qa(faqsByTag("residential", "sizing", "roof", "loan"))}`,
      );
    case "/housing-society-solar-indore":
      return withTitle(path, `Registered group housing societies and RWAs receive ₹18,000 per kW PM Surya Ghar subsidy for rooftop systems serving common facilities (lifts, pumps, lighting, EV charging), up to 500 kW. Systems feed the common meter under MP West Discom net metering.`);
    case "/commercial-solar-indore":
      return withTitle(
        path,
        `## Industries\n\n${industries.map((i) => `- **${i.name}** (${i.typicalKw[0]}–${i.typicalKw[1]} kW): ${i.summary}`).join("\n")}\n\n## FAQ\n\n${qa(faqsByTag("commercial"))}`,
      );
    case "/services":
      return withTitle(path, listOf(services.map((s) => ({ name: s.name, path: `/services/${s.slug}`, note: s.lead }))));
    case "/projects":
      return withTitle(path, projects.map((p) => projectMarkdown(p).replace(/^# /, "## ")).join("\n\n"));
    case "/solar-systems":
      return withTitle(path, systemSizes.map((s) => `## ${s.kw} kW\n\n${systemSummary(s)}`).join("\n\n"));
    case "/solar-installation":
      return withTitle(path, listOf(areas.map((x) => ({ name: `Solar installation in ${x.name}`, path: `/solar-installation/${x.slug}`, note: x.typicalSizes }))));
    case "/learn":
      return withTitle(path, listOf(articles.map((x) => ({ name: x.title, path: `/learn/${x.slug}`, note: x.description }))));
    case "/faq":
      return withTitle(path, faqCategories.map((c) => `## ${c}\n\n${qa(faqs.filter((f) => f.cat === c))}`).join("\n\n"));
    case "/solar-glossary":
      return withTitle(path, glossary.map((t) => `- **${t.term}**${t.aka ? ` (${t.aka})` : ""}: ${t.def}`).join("\n"));
    case "/solar-calculator":
      return withTitle(
        path,
        `Interactive calculator. Method: system size (kW) ≈ monthly units ÷ 122; yearly generation ≈ kW × 1,459 units in Indore; savings value self-consumed units at the tariff (default ₹7.5 home, ₹9 business, ₹8 industry) and surplus at ₹3; 3% yearly tariff escalation; 0.5% yearly degradation; PM Surya Ghar subsidy ₹30,000/kW for 2 kW + ₹18,000 for the 3rd kW. Bill scanning runs on-device.`,
      );
    case "/roof-suitability-check":
      return withTitle(path, `A roof suits solar with ~90 sq ft shadow-free area per kW, little shade 9 am–4 pm, an open southern side, sound structure and a connection in the owner's name.\n\n## FAQ\n\n${qa(faqsByTag("roof", "shade", "direction"))}`);
    case "/contact":
      return withTitle(path, `- Address: ${fullAddress}\n- Phone: ${site.phones.map((p) => `${p.display} (${p.label})`).join(", ")}\n- WhatsApp: +${site.whatsapp}\n- Email: ${site.email}\n- Hours: ${site.hoursLabel}\n- Map: ${site.maps.url}`);
  }

  if (a === "learn" && b) {
    const x = articleBySlug(b);
    if (!x) return null;
    return withTitle(path, `${x.summary}\n\n${facts(x.keyFacts)}\n\n${x.body}${x.faqs?.length ? `\n\n## FAQ\n\n${qa(x.faqs)}` : ""}\n\nUpdated: ${x.updated}`);
  }
  if (a === "services" && b) {
    const x = serviceBySlug(b);
    if (!x) return null;
    return withTitle(path, `${x.summary}\n\n## Included\n\n${x.includes.map((i) => `- **${i.t}:** ${i.b}`).join("\n")}\n\n${x.body}\n\n## FAQ\n\n${qa(x.faqs)}`);
  }
  if (a === "commercial-solar-indore" && b) {
    const x = industryBySlug(b);
    if (!x) return null;
    return withTitle(path, `${x.summary}\n\n${x.angles.map((i) => `- **${i.t}:** ${i.b}`).join("\n")}\n\n## FAQ\n\n${qa(x.faqs)}`);
  }
  if (a === "projects" && b) {
    const x = projectBySlug(b);
    return x ? withTitle(path, projectMarkdown(x).replace(/^# .*\n/, "")) : null;
  }
  if (a === "solar-systems" && b) {
    const x = systemBySlug(b);
    return x ? withTitle(path, systemMarkdown(x).replace(/^# .*\n/, "")) : null;
  }
  if (a === "solar-installation" && b) {
    const x = areaBySlug(b);
    return x ? withTitle(path, areaMarkdown(x).replace(/^# .*\n/, "")) : null;
  }
  return null;
}

/** Every path that has a Markdown mirror. */
export function markdownPaths() {
  return allPages()
    .map((p) => p.path)
    .filter((p) => ![staticPages.privacy.path, staticPages.terms.path].includes(p as "/privacy-policy" | "/terms"));
}

export const mdUrl = (path: string) => (path === "/" ? "/index.md" : `${path}.md`);
