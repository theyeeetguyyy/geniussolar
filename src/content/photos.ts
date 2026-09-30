import type { StaticImageData } from "next/image";

import monoHalfCut from "@/assets/photos/mono-half-cut-solar-modules-elevated-structure-indore.jpg";
import giColumn from "@/assets/photos/hot-dip-galvanised-solar-structure-column-indore.jpg";
import teamRooftop from "@/assets/photos/genius-solar-installation-team-rooftop-indore.jpg";
import teamUnderArray from "@/assets/photos/genius-solar-team-under-completed-array-indore.jpg";
import mukherjeeNagar from "@/assets/photos/elevated-rooftop-solar-mukherjee-nagar-indore.jpg";
import terraceStructure from "@/assets/photos/rooftop-solar-structure-terrace-indore.jpg";
import homeownersUnder from "@/assets/photos/homeowners-under-elevated-solar-array-indore.jpg";
import havellsInverter from "@/assets/photos/havells-enviro-solar-inverter-installation-indore.jpg";
import familyNewSystem from "@/assets/photos/family-with-new-rooftop-solar-system-indore.jpg";
import customerEngineer from "@/assets/photos/customer-with-genius-solar-engineer-indore.jpg";
import chotaBangarda from "@/assets/photos/elevated-solar-array-chota-bangarda-road-indore.jpg";
import customerEngineer2 from "@/assets/photos/customer-and-engineer-under-solar-panels-indore.jpg";
import terraceShade from "@/assets/photos/terrace-shade-under-elevated-solar-panels-indore.jpg";
import familyHandover from "@/assets/photos/family-handover-rooftop-solar-indore.jpg";
import wallInverter from "@/assets/photos/wall-mounted-solar-inverter-genius-solar-indore.jpg";
import moduleRows from "@/assets/photos/solar-module-rows-rooftop-indore.jpg";
import techFastening from "@/assets/photos/technician-fastening-solar-structure-indore.jpg";
import techBolting from "@/assets/photos/technician-bolting-galvanised-column-indore.jpg";
import engineersUnder from "@/assets/photos/genius-solar-engineers-under-array-indore.jpg";
import crewRooftop from "@/assets/photos/genius-solar-crew-rooftop-project-indore.jpg";
import tiltedPanels from "@/assets/photos/tilted-solar-panels-rooftop-indore.jpg";
import wideArray from "@/assets/photos/wide-elevated-solar-array-indore.jpg";
import elevated2025 from "@/assets/photos/elevated-solar-structure-terrace-indore-2025.jpg";
import homeownerElevated from "@/assets/photos/homeowner-under-elevated-solar-structure-indore.jpg";
import elevatedOwner2025 from "@/assets/photos/elevated-solar-structure-owner-indore-2025.jpg";
import handoverCeremony from "@/assets/photos/solar-project-handover-ceremony-indore.jpg";
import twoLevel from "@/assets/photos/homeowner-under-two-level-solar-structure-indore.jpg";
import metalRoof from "@/assets/photos/solar-panels-on-metal-sheet-roof-indore.jpg";
import award2025 from "@/assets/photos/mp-annual-solar-awards-2025-genius-solar.jpg";
import founder from "@/assets/photos/dhirendra-bandil-proprietor-genius-solar.jpg";
import walkthroughPoster from "@/assets/photos/rooftop-solar-array-walkthrough-poster.jpg";

export type PhotoTag = "elevated" | "residential" | "commercial" | "inverter" | "team" | "structure" | "handover" | "detail";

export interface Photo {
  id: string;
  src: StaticImageData;
  /** Path relative to the repo root — used by OG image generation. */
  file: string;
  alt: string;
  caption: string;
  tags: PhotoTag[];
}

const p = (id: string, src: StaticImageData, alt: string, caption: string, tags: PhotoTag[]): Photo => ({
  id,
  src,
  file: `src/assets/photos/${id}.jpg`,
  alt,
  caption,
  tags,
});

export const photos = {
  monoHalfCut: p(
    "mono-half-cut-solar-modules-elevated-structure-indore",
    monoHalfCut,
    "Close-up of mono half-cut solar modules clamped to an elevated galvanised structure on an Indore rooftop",
    "Half-cut monocrystalline modules, clamped rail-to-rail on a raised frame.",
    ["detail", "elevated"],
  ),
  giColumn: p(
    "hot-dip-galvanised-solar-structure-column-indore",
    giColumn,
    "Hot-dip galvanised steel column and bracing of a raised solar structure with Genius Solar tag, Indore",
    "Galvanised column, bolted bracing and a Genius Solar asset tag for service tracking.",
    ["structure", "detail"],
  ),
  teamRooftop: p(
    "genius-solar-installation-team-rooftop-indore",
    teamRooftop,
    "Genius Solar installation team standing under a newly completed rooftop solar array in Indore",
    "The crew after handover.",
    ["team", "elevated"],
  ),
  teamUnderArray: p(
    "genius-solar-team-under-completed-array-indore",
    teamUnderArray,
    "Genius Solar team selfie under a completed elevated solar array in an Indore residential colony",
    "Another roof finished — team photo under the array.",
    ["team", "elevated"],
  ),
  mukherjeeNagar: p(
    "elevated-rooftop-solar-mukherjee-nagar-indore",
    mukherjeeNagar,
    "Homeowner standing under an elevated rooftop solar system installed by Genius Solar in Mukherjee Nagar, Indore",
    "Mukherjee Nagar — the terrace stays usable under a raised array.",
    ["residential", "elevated"],
  ),
  terraceStructure: p(
    "rooftop-solar-structure-terrace-indore",
    terraceStructure,
    "Elevated solar mounting structure spanning an Indore terrace with clear headroom below",
    "Full-height headroom: the roof below stays open for everyday use.",
    ["structure", "elevated", "residential"],
  ),
  homeownersUnder: p(
    "homeowners-under-elevated-solar-array-indore",
    homeownersUnder,
    "Husband and wife homeowners under their new elevated rooftop solar array in Indore",
    "Handover day for a family rooftop in Indore.",
    ["residential", "handover", "elevated"],
  ),
  havellsInverter: p(
    "havells-enviro-solar-inverter-installation-indore",
    havellsInverter,
    "Havells Enviro grid-tied solar inverter wall-mounted with DC and AC cabling, installed by Genius Solar, Indore",
    "Havells Enviro string inverter with neatly routed DC and AC cabling.",
    ["inverter", "detail"],
  ),
  familyNewSystem: p(
    "family-with-new-rooftop-solar-system-indore",
    familyNewSystem,
    "Indore couple standing on their terrace below a newly installed raised solar panel system",
    "A family rooftop, handed over and generating.",
    ["residential", "handover"],
  ),
  customerEngineer: p(
    "customer-with-genius-solar-engineer-indore",
    customerEngineer,
    "Customer and Genius Solar engineer selfie under rooftop solar panels in Indore",
    "Customers meet the engineer who designed their system.",
    ["residential", "team"],
  ),
  chotaBangarda: p(
    "elevated-solar-array-chota-bangarda-road-indore",
    chotaBangarda,
    "Elevated rooftop solar array installed on a house near Chota Bangarda Road, Indore",
    "Chota Bangarda Road — a raised array with a clean cable path.",
    ["residential", "elevated"],
  ),
  customerEngineer2: p(
    "customer-and-engineer-under-solar-panels-indore",
    customerEngineer2,
    "Customer with Genius Solar engineer beneath the mono solar modules of his new rooftop system, Indore",
    "Final walkthrough with the owner.",
    ["residential", "team"],
  ),
  terraceShade: p(
    "terrace-shade-under-elevated-solar-panels-indore",
    terraceShade,
    "Shaded terrace floor under a raised solar panel array on an Indore house",
    "Bonus: a cooler, shaded terrace in Indore's summer.",
    ["elevated", "structure"],
  ),
  familyHandover: p(
    "family-handover-rooftop-solar-indore",
    familyHandover,
    "Family with Genius Solar representative at the handover of their rooftop solar system, Indore",
    "Handover day with the family.",
    ["handover", "residential"],
  ),
  wallInverter: p(
    "wall-mounted-solar-inverter-genius-solar-indore",
    wallInverter,
    "Genius Solar team member beside a wall-mounted solar inverter and AC distribution box in Indore",
    "Inverter, ACDB and DCDB mounted at eye level for easy service.",
    ["inverter", "team"],
  ),
  moduleRows: p(
    "solar-module-rows-rooftop-indore",
    moduleRows,
    "Rows of monocrystalline solar modules on a rooftop array in Indore under clear sky",
    "Uniform rows, uniform tilt — no module shades another.",
    ["detail", "commercial"],
  ),
  techFastening: p(
    "technician-fastening-solar-structure-indore",
    techFastening,
    "Genius Solar technician fastening a galvanised solar structure member on an Indore rooftop",
    "Structure work — the part that decides how long a system lasts.",
    ["team", "structure"],
  ),
  techBolting: p(
    "technician-bolting-galvanised-column-indore",
    techBolting,
    "Technician bolting the top bracket of a galvanised solar column on a residential roof in Indore",
    "Structure first. The panels are the easy part.",
    ["team", "structure"],
  ),
  engineersUnder: p(
    "genius-solar-engineers-under-array-indore",
    engineersUnder,
    "Two Genius Solar engineers under a newly installed elevated solar array in Indore",
    "Site engineers after commissioning.",
    ["team", "elevated"],
  ),
  crewRooftop: p(
    "genius-solar-crew-rooftop-project-indore",
    crewRooftop,
    "Genius Solar crew of four on a rooftop solar project in Indore",
    "The Genius Solar crew on site.",
    ["team"],
  ),
  tiltedPanels: p(
    "tilted-solar-panels-rooftop-indore",
    tiltedPanels,
    "South-facing tilted solar panels on a rooftop in Indore with trees in the background",
    "Tilted south to Indore's latitude for maximum annual yield.",
    ["detail", "residential"],
  ),
  wideArray: p(
    "wide-elevated-solar-array-indore",
    wideArray,
    "Wide view of a large elevated solar panel array under an overcast sky in Indore",
    "A larger raised array — the same engineering, scaled up.",
    ["elevated", "commercial"],
  ),
  elevated2025: p(
    "elevated-solar-structure-terrace-indore-2025",
    elevated2025,
    "Raised galvanised solar structure on a white terrace in Indore, photographed November 2025",
    "Tall columns on concrete pedestals keep the whole terrace free.",
    ["elevated", "structure", "residential"],
  ),
  homeownerElevated: p(
    "homeowner-under-elevated-solar-structure-indore",
    homeownerElevated,
    "Homeowner standing under his elevated rooftop solar structure in Indore",
    "Raised array, open terrace, zero shading on the modules.",
    ["elevated", "residential"],
  ),
  elevatedOwner2025: p(
    "elevated-solar-structure-owner-indore-2025",
    elevatedOwner2025,
    "Owner under a tilted elevated solar array on an Indore terrace, November 2025",
    "Commissioned November 2025.",
    ["elevated", "residential"],
  ),
  handoverCeremony: p(
    "solar-project-handover-ceremony-indore",
    handoverCeremony,
    "Genius Solar handing over a memento to a customer under a two-level rooftop solar structure in Indore",
    "A thank-you at handover — under a two-level structure built around a terrace garden.",
    ["handover", "elevated", "residential"],
  ),
  twoLevel: p(
    "homeowner-under-two-level-solar-structure-indore",
    twoLevel,
    "Homeowner under a tall galvanised solar structure above a terrace garden in Indore",
    "Engineered around an existing terrace garden and shade frame.",
    ["elevated", "structure", "residential"],
  ),
  metalRoof: p(
    "solar-panels-on-metal-sheet-roof-indore",
    metalRoof,
    "Genius Solar team member beside solar panels mounted on a metal sheet roof in Indore",
    "Modules on a metal-sheet roof, set on short tilt legs.",
    ["commercial", "structure"],
  ),
  award2025: p(
    "mp-annual-solar-awards-2025-genius-solar",
    award2025,
    "Genius Solar Services receiving recognition at the Madhya Pradesh Annual Solar Awards 2025, Global Solar Expo Indore",
    "Madhya Pradesh Annual Solar Awards 2025 — Global Solar Expo, Indore.",
    ["team"],
  ),
  founder: p(
    "dhirendra-bandil-proprietor-genius-solar",
    founder,
    "Portrait of Dhirendra Bandil, proprietor of Genius Solar Services, Indore",
    "Dhirendra Bandil, Proprietor.",
    ["team"],
  ),
  walkthroughPoster: p(
    "rooftop-solar-array-walkthrough-poster",
    walkthroughPoster,
    "Walk-through of a completed rooftop solar array in Indore",
    "Site walk-through of a completed rooftop array.",
    ["detail"],
  ),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

export const allPhotos: Photo[] = Object.values(photos);

/** Photos suitable for the public portfolio (excludes portraits and awards). */
export const portfolioPhotos = allPhotos.filter(
  (ph) => !["founder", "award2025", "walkthroughPoster"].some((k) => photos[k as PhotoKey].id === ph.id),
);
