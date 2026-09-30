import { photos, type PhotoKey } from "@/content/photos";
import type { Segment } from "@/lib/solar";

/**
 * Every completed installation can become an indexed case-study page at
 * /projects/[slug]. To publish a new one, add an entry here and its photos to
 * content/photos.ts. Leave unknown facts undefined — the page hides them.
 */
export interface Project {
  slug: string;
  title: string;
  locality?: string;
  city: string;
  segment: Segment;
  structure: string;
  /** VERIFY with site records before publishing a number. */
  capacityKw?: number;
  modules?: string;
  inverter?: string;
  /** ISO month, e.g. "2024-11" */
  completed?: string;
  cover: PhotoKey;
  gallery: PhotoKey[];
  summary: string;
  story: string[];
  highlights: string[];
  areaSlug?: string;
  quote?: { text: string; name: string };
}

export const projects: Project[] = [
  {
    slug: "two-level-solar-structure-terrace-garden-indore",
    title: "A raised array above a terrace garden",
    city: "Indore",
    segment: "home",
    structure: "Tall elevated GI structure over an existing shade frame",
    cover: "handoverCeremony",
    gallery: ["handoverCeremony", "twoLevel"],
    summary:
      "An elevated solar array built on tall galvanised columns above an existing terrace garden and shade frame, so the family kept both their plants and their terrace.",
    story: [
      "This terrace already had potted plants, a green corner and a separate steel shade frame. A conventional low-level array would have displaced them.",
      "Instead the array stands on tall galvanised columns, clear above the existing frame. The modules get open sky; the garden keeps light from the sides and gains some afternoon shade.",
      "Handover included the documentation and a walkthrough of the inverter — and a memento to mark the day.",
    ],
    highlights: ["Array raised above an existing shade frame", "Garden and terrace left in place", "Galvanised columns and bracing", "Handover with full documentation"],
    areaSlug: "saket-nagar-indore",
  },
  {
    slug: "raised-solar-array-open-terrace-indore-2025",
    title: "Clean single-slope array on an open terrace",
    city: "Indore",
    segment: "home",
    structure: "Elevated GI structure on concrete pedestals",
    completed: "2025-11",
    cover: "elevated2025",
    gallery: ["elevated2025", "homeownerElevated", "elevatedOwner2025"],
    summary:
      "A single-slope elevated array on concrete pedestals, commissioned in November 2025, leaving the whole terrace — including the water-tank area — free to use.",
    story: [
      "This terrace has a tank enclosure and a flag mast. Lifting the array onto tall columns means nothing on the roof shades the modules, and nothing on the roof had to move.",
      "Columns sit on cast concrete pedestals rather than being drilled into the slab, which protects the waterproofing. Diagonal bracing ties the front and back rows together against wind.",
    ],
    highlights: ["Commissioned November 2025", "Pedestal footings protect waterproofing", "Full-height clearance under the array", "Cable run kept along the structure"],
  },
  {
    slug: "elevated-rooftop-solar-mukherjee-nagar-indore",
    title: "Elevated rooftop system in Mukherjee Nagar",
    locality: "Mukherjee Nagar",
    city: "Indore",
    segment: "home",
    structure: "Elevated GI structure",
    completed: "2024-11",
    cover: "mukherjeeNagar",
    gallery: ["mukherjeeNagar", "terraceShade"],
    summary:
      "A raised rooftop solar system for a family home in Mukherjee Nagar, Indore (PIN 452006), completed in November 2024, lifting the modules clear of neighbouring buildings.",
    story: [
      "Mukherjee Nagar is closely built, so the first question was shade from neighbouring walls and tanks. Raising the array lifted the modules above them and left the terrace — plants, dish antenna and all — usable underneath.",
    ],
    highlights: ["Completed November 2024", "Modules raised above neighbouring parapets", "Terrace remains usable", "Dense-locality shading solved with height"],
    areaSlug: "mukherjee-nagar-indore",
  },
  {
    slug: "elevated-solar-chota-bangarda-road-indore",
    title: "Raised array near Chota Bangarda Road",
    locality: "Chota Bangarda Road",
    city: "Indore",
    segment: "home",
    structure: "Elevated GI structure",
    completed: "2024-11",
    cover: "chotaBangarda",
    gallery: ["chotaBangarda", "customerEngineer2"],
    summary:
      "A raised rooftop array for a home near Chota Bangarda Road, Indore, completed in November 2024, built over an open terrace with a clean south-facing tilt.",
    story: [
      "Homes along the airport side of Indore tend to have open terraces with few tall neighbours — ideal for an unshaded south-facing array. The elevated frame keeps the terrace free for the family.",
    ],
    highlights: ["Completed November 2024", "South-facing tilt", "Open terrace preserved", "Walkthrough with the owner at handover"],
    areaSlug: "chota-bangarda-road-indore",
  },
  {
    slug: "solar-on-metal-sheet-roof-indore",
    title: "Solar on a metal-sheet roof",
    city: "Indore",
    segment: "home",
    structure: "Tilt-leg mounting on metal sheet roofing",
    cover: "metalRoof",
    gallery: ["metalRoof"],
    summary:
      "Solar modules mounted on short tilt legs over a metal-sheet roof in Indore — the same approach we use for sheds, warehouses and factory roofs.",
    story: [
      "Metal-sheet roofs need a different approach from RCC slabs: the load has to go into the purlins, and every fixing has to stay watertight. Short tilt legs give the modules a better angle than lying flat on the sheet, and keep an air gap underneath for cooling.",
    ],
    highlights: ["Load taken into roof purlins", "Tilted for better yield than flush mounting", "Air gap keeps modules cooler", "Approach scales to sheds and factories"],
  },
  {
    slug: "family-rooftop-solar-handover-indore",
    title: "Family home, handed over",
    city: "Indore",
    segment: "home",
    structure: "Elevated GI structure",
    cover: "homeownersUnder",
    gallery: ["homeownersUnder", "familyNewSystem", "familyHandover"],
    summary: "Handover moments from family homes across Indore — elevated arrays over everyday terraces.",
    story: [
      "Handover is where we walk the family through the system: where the isolators are, what the inverter display means, how to clean the modules safely and who to call. Then the five years of free service begin.",
    ],
    highlights: ["Walkthrough of inverter and isolators", "Cleaning guidance", "Documentation for warranty and subsidy", "Five years of free service"],
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const projectPhoto = (p: Project) => photos[p.cover];

export const formatMonth = (iso?: string) =>
  iso ? new Date(`${iso}-01T00:00:00`).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : undefined;
