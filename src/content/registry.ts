import { articles } from "@/content/articles";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { projects } from "@/content/projects";
import { systemSizes } from "@/content/systems";
import { areas } from "@/content/areas";

/**
 * Every indexable page, in one place. Drives the sitemap, llms.txt, related
 * links, the 404 search and internal-link checks. Page files import their
 * title/description from here so metadata never drifts.
 */
export type Section =
  | "Home"
  | "Solutions"
  | "Services"
  | "Industries"
  | "Projects"
  | "Tools"
  | "Guides"
  | "System sizes"
  | "Areas"
  | "Company"
  | "Reference";

export interface PageEntry {
  path: string;
  title: string;
  description: string;
  section: Section;
  priority: number;
  updated: string;
  changeFrequency?: "weekly" | "monthly" | "yearly";
}

const U = "2026-09-29";

export const staticPages = {
  home: {
    path: "/",
    title: "Solar Panel Company in Indore | Rooftop Solar Installation — Genius Solar",
    description:
      "Genius Solar Services installs rooftop solar in Indore for homes, housing societies and businesses. ₹78,000 PM Surya Ghar subsidy, net metering, elevated structures and 5 years free service.",
  },
  about: {
    path: "/about",
    title: "About Genius Solar Services | Solar Company in Vijay Nagar, Indore",
    description:
      "Genius Solar Services is a rooftop solar company in Vijay Nagar, Indore, led by proprietor Dhirendra Bandil. Our engineering approach, promises, partners and recognition.",
  },
  residential: {
    path: "/residential-solar-indore",
    title: "Residential Rooftop Solar in Indore | Home Solar with ₹78,000 Subsidy",
    description:
      "Home solar systems in Indore from 1 kW to 15 kW with PM Surya Ghar subsidy up to ₹78,000, net metering, elevated structures, EMI and 5 years free service.",
  },
  society: {
    path: "/housing-society-solar-indore",
    title: "Housing Society Solar in Indore | ₹18,000/kW RWA Subsidy",
    description:
      "Rooftop solar for housing societies, apartments and RWAs in Indore. ₹18,000 per kW PM Surya Ghar subsidy for common facilities — lifts, pumps, lighting and EV charging.",
  },
  commercial: {
    path: "/commercial-solar-indore",
    title: "Commercial & Industrial Solar in Indore | Factory, Office, School",
    description:
      "Commercial and industrial rooftop solar in Indore, Pithampur and Dewas — factories, warehouses, offices, schools, hospitals and hotels. Typical 3–4 year payback.",
  },
  services: {
    path: "/services",
    title: "Solar Services in Indore | Installation, Structures, Battery, AMC",
    description:
      "All Genius Solar services in Indore: rooftop installation, elevated structures, hybrid battery backup, cleaning and maintenance, commercial EPC, subsidy and net metering.",
  },
  projects: {
    path: "/projects",
    title: "Solar Projects in Indore | Rooftop Installation Portfolio",
    description:
      "Real rooftop solar installations by Genius Solar across Indore — elevated structures, family homes, metal-sheet roofs and handovers, with locations and details.",
  },
  calculator: {
    path: "/solar-calculator",
    title: "Solar Savings Calculator Indore | Upload Your Electricity Bill",
    description:
      "Upload your MP electricity bill or enter your monthly units to get the right solar size, cost after subsidy, monthly savings, payback, EMI and CO₂ saved — for Indore.",
  },
  roofCheck: {
    path: "/roof-suitability-check",
    title: "Is My Roof Suitable for Solar? Free 5-Question Check (Indore)",
    description:
      "Answer five quick questions about your roof — space, shade, direction, condition and connection — and get an instant solar suitability verdict for your Indore property.",
  },
  subsidy: {
    path: "/solar-subsidy-mp",
    title: "PM Surya Ghar Solar Subsidy in MP (2026) | Up to ₹78,000",
    description:
      "Complete guide to PM Surya Ghar: Muft Bijli Yojana in Madhya Pradesh — subsidy amounts, eligibility, documents, step-by-step application in Indore and timelines.",
  },
  netMetering: {
    path: "/net-metering-indore",
    title: "Net Metering in Indore (MP West Discom) | Process & Documents",
    description:
      "How net metering works in Indore with MP West Discom (MPPKVVCL): eligibility, process, documents, timeline, billing and an interactive energy-flow visualiser.",
  },
  price: {
    path: "/solar-panel-price-indore",
    title: "Solar Panel Price in Indore (2026) | 1 kW to 10 kW After Subsidy",
    description:
      "Rooftop solar system prices in Indore for 1–100 kW: cost before and after PM Surya Ghar subsidy, what's included, elevated structure cost and how to compare quotes.",
  },
  systems: {
    path: "/solar-systems",
    title: "Solar Systems by Size | 1 kW to 100 kW in Indore",
    description:
      "Compare rooftop solar systems from 1 kW to 100 kW in Indore — generation, roof space, panels, price after subsidy, savings and payback for each size.",
  },
  areasHub: {
    path: "/solar-installation",
    title: "Solar Installation Across Indore | Areas We Serve",
    description:
      "Rooftop solar installation in every Indore locality — Vijay Nagar, Nipania, Palasia, Rau, Silicon City and more — plus Pithampur, Mhow, Dewas and Ujjain.",
  },
  learn: {
    path: "/learn",
    title: "Solar Guides for Indore | Costs, Subsidy, Technology, Care",
    description:
      "Plain-language solar guides for Indore homeowners and businesses: sizing, panel types, inverters, net metering, subsidy, loans, cleaning, weather and safety.",
  },
  faq: {
    path: "/faq",
    title: "Rooftop Solar FAQ Indore | Cost, Subsidy, Net Metering, Care",
    description:
      "Answers to the most common questions about rooftop solar in Indore — prices, PM Surya Ghar subsidy, net metering, sizing, maintenance, weather, loans and warranties.",
  },
  glossary: {
    path: "/solar-glossary",
    title: "Solar Glossary | Rooftop Solar Terms Explained Simply",
    description:
      "Plain-English definitions of rooftop solar terms — kWp, net metering, DCR, MPPT, TOPCon, anti-islanding, sanctioned load and more.",
  },
  contact: {
    path: "/contact",
    title: "Contact Genius Solar Services | Vijay Nagar, Indore",
    description:
      "Call +91 98267 12299, WhatsApp your bill or visit Genius Solar Services at Swarna Palace, Scheme 114, Vijay Nagar, Indore for a free rooftop solar survey.",
  },
  privacy: {
    path: "/privacy-policy",
    title: "Privacy Policy | Genius Solar Services",
    description: "How Genius Solar Services handles information you share with us through this website, WhatsApp, phone and email.",
  },
  terms: {
    path: "/terms",
    title: "Terms of Use | Genius Solar Services",
    description: "Terms for using the Genius Solar Services website, calculators and estimates.",
  },
} as const;

type StaticKey = keyof typeof staticPages;

const staticSections: Record<StaticKey, { section: Section; priority: number }> = {
  home: { section: "Home", priority: 1 },
  about: { section: "Company", priority: 0.7 },
  residential: { section: "Solutions", priority: 0.95 },
  society: { section: "Solutions", priority: 0.85 },
  commercial: { section: "Solutions", priority: 0.9 },
  services: { section: "Services", priority: 0.8 },
  projects: { section: "Projects", priority: 0.85 },
  calculator: { section: "Tools", priority: 0.9 },
  roofCheck: { section: "Tools", priority: 0.7 },
  subsidy: { section: "Guides", priority: 0.95 },
  netMetering: { section: "Guides", priority: 0.9 },
  price: { section: "Guides", priority: 0.95 },
  systems: { section: "System sizes", priority: 0.8 },
  areasHub: { section: "Areas", priority: 0.75 },
  learn: { section: "Guides", priority: 0.75 },
  faq: { section: "Reference", priority: 0.75 },
  glossary: { section: "Reference", priority: 0.6 },
  contact: { section: "Company", priority: 0.8 },
  privacy: { section: "Company", priority: 0.2 },
  terms: { section: "Company", priority: 0.2 },
};

export function allPages(): PageEntry[] {
  const s: PageEntry[] = (Object.keys(staticPages) as StaticKey[]).map((k) => ({
    ...staticPages[k],
    ...staticSections[k],
    updated: U,
  }));
  return [
    ...s,
    ...services.map((x) => ({ path: `/services/${x.slug}`, title: x.seoTitle, description: x.description, section: "Services" as const, priority: 0.8, updated: U })),
    ...industries.map((x) => ({
      path: `/commercial-solar-indore/${x.slug}`,
      title: x.seoTitle,
      description: x.description,
      section: "Industries" as const,
      priority: 0.7,
      updated: U,
    })),
    ...projects.map((x) => ({
      path: `/projects/${x.slug}`,
      title: `${x.title}${x.locality ? ` — ${x.locality}` : ""}, Indore | Solar Project`,
      description: x.summary.slice(0, 158),
      section: "Projects" as const,
      priority: 0.65,
      updated: U,
    })),
    ...systemSizes.map((x) => ({
      path: `/solar-systems/${x.slug}`,
      title: `${x.kw} kW Solar System Price in Indore | Units, Subsidy, Savings`,
      description: `${x.kw} kW rooftop solar in Indore: generation, roof area, panels, price before and after subsidy, monthly savings and payback. ${x.suits}`.slice(0, 158),
      section: "System sizes" as const,
      priority: [3, 5].includes(x.kw) ? 0.85 : 0.7,
      updated: U,
    })),
    ...areas.map((x) => ({
      path: `/solar-installation/${x.slug}`,
      title: `Solar Panel Installation in ${x.name}${x.kind === "city" ? "" : ", Indore"} | Genius Solar`,
      description: `Rooftop solar installation in ${x.name}${x.kind === "city" ? "" : ", Indore"}: ${x.typicalSizes}. Subsidy, net metering and local service from our Vijay Nagar office.`.slice(0, 158),
      section: "Areas" as const,
      priority: 0.65,
      updated: U,
    })),
    ...articles.map((x) => ({ path: `/learn/${x.slug}`, title: x.seoTitle, description: x.description, section: "Guides" as const, priority: 0.7, updated: x.updated })),
  ];
}

export function pageByPath(path: string) {
  return allPages().find((p) => p.path === path);
}

/** Short display name for internal links (strips the brand suffix). */
export function linkLabel(p: PageEntry) {
  return p.title.split(" | ")[0].replace(/ — Genius Solar$/, "");
}
