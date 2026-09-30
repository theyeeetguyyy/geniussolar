import type { IconName } from "@/components/icons";
import type { PhotoKey } from "@/content/photos";

export interface Service {
  slug: string;
  name: string;
  seoTitle: string;
  description: string;
  icon: IconName;
  photo: PhotoKey;
  serviceType: string;
  summary: string;
  lead: string;
  includes: { t: string; b: string }[];
  steps?: { t: string; b: string }[];
  body: string;
  faqs: { q: string; a: string }[];
  related: string[];
}

export const services: Service[] = [
  {
    slug: "rooftop-solar-installation-indore",
    name: "Rooftop solar installation",
    seoTitle: "Rooftop Solar Installation in Indore | Genius Solar",
    description:
      "Turnkey rooftop solar installation in Indore: survey, design, DCR modules, inverter, structure, earthing, net metering and PM Surya Ghar subsidy — with 5 years free service.",
    icon: "Panel",
    photo: "teamRooftop",
    serviceType: "Rooftop solar power system installation",
    summary:
      "Genius Solar Services provides turnkey rooftop solar installation across Indore for homes, housing societies and businesses. The service covers a free site survey and shadow study, system design, supply of DCR or non-DCR modules and inverters from brands such as Adani, Vikram Solar, Havells and Luminous, galvanised mounting structures (standard or elevated), DC/AC distribution boxes, earthing and lightning protection, installation and testing, MP West Discom net-metering paperwork, PM Surya Ghar subsidy filing, and five years of free service.",
    lead: "Everything from the first site survey to the day your net meter is fitted — designed, installed and documented by one team.",
    includes: [
      { t: "Site survey & shadow study", b: "Roof strength, orientation, seasonal shading, cable routes, earthing points and sanctioned load." },
      { t: "Design & itemised quote", b: "Layout, structure height, module and inverter options with a generation estimate." },
      { t: "Supply", b: "DCR modules for subsidy, string or hybrid inverters, solar DC cable, DCDB/ACDB, MC4 connectors." },
      { t: "Structure", b: "Galvanised standard or elevated structures on pedestals or anchors, braced for wind." },
      { t: "Protection", b: "Separate earthing, lightning arrester, surge protection devices and isolators." },
      { t: "Paperwork", b: "PM Surya Ghar registration, DISCOM feasibility, inspection, net meter and subsidy claim." },
      { t: "Commissioning", b: "Testing, monitoring setup, handover walkthrough and documentation." },
      { t: "Aftercare", b: "Five years of free service visits; AMC available afterwards." },
    ],
    body: `
## What a Genius Solar installation includes

A rooftop solar system is only as good as its weakest part. Our installations are specified end to end — not just modules and an inverter, but the structure, cabling, protection and paperwork that decide how the system performs in year 15.

## Typical timeline

| Stage | Typical duration |
|---|---|
| Survey and quote | 1–5 days |
| Portal registration and DISCOM feasibility | 1–2 weeks |
| Installation on site | 1–3 days |
| DISCOM inspection and net meter | usually 2–4 weeks |
| Subsidy credit | after commissioning, typically about 30 days |

## Brands we install

Modules from Adani Solar, Vikram Solar and Luminous; inverters from Havells, Luminous and Polycab, among others. You choose — we explain the trade-offs in plain language.
`,
    faqs: [
      {
        q: "How long does rooftop solar installation take in Indore?",
        a: "Installation on site takes 1–3 days for most homes. Including survey, approvals and net metering, the full process usually takes three to six weeks.",
      },
      {
        q: "Do you install solar on rented properties?",
        a: "Yes, with the property owner's written consent. For subsidy, the application is made on the electricity connection, usually held by the owner.",
      },
    ],
    related: ["/residential-solar-indore", "/solar-subsidy-mp", "/net-metering-indore", "/solar-panel-price-indore"],
  },
  {
    slug: "elevated-solar-structure-indore",
    name: "Elevated solar structures",
    seoTitle: "Elevated Solar Structure in Indore | Raised Rooftop Solar",
    description:
      "Elevated (raised) solar mounting structures for Indore terraces — galvanised columns, 2–3 m clear height, concrete pedestals and bracing. Keep your terrace usable and avoid shading.",
    icon: "Hammer",
    photo: "elevated2025",
    serviceType: "Elevated solar mounting structure fabrication and installation",
    summary:
      "An elevated solar structure raises the solar array on tall galvanised steel columns, typically giving 2–3 metres of clear height above the terrace. Genius Solar designs and installs elevated structures across Indore on concrete pedestals with rafters, purlins and diagonal bracing. They keep the terrace usable, lift modules above shadows from tanks, stair headrooms and parapets, improve airflow for cooler modules and suit bifacial panels. They typically add ₹8,000–₹15,000 per kW over a standard structure.",
    lead: "Tall, braced, galvanised frames that put your panels above the shadows — and give your terrace back.",
    includes: [
      { t: "Structural layout", b: "Column grid planned around tanks, headroom, plants and walkways." },
      { t: "Galvanised steel", b: "Rust-resistant columns, rafters and purlins sized to the span." },
      { t: "Concrete pedestals", b: "Footings that spread load and protect roof waterproofing." },
      { t: "Bracing", b: "Diagonal and knee bracing for pre-monsoon winds." },
      { t: "Clear height", b: "Typically 2–3 m, set to your terrace use and shading." },
      { t: "Cable routing", b: "Cables run along the structure in conduit down to the inverter." },
    ],
    body: `
## Why elevated structures are common in Indore

Indore's houses typically have flat RCC terraces with water tanks, a stair headroom and parapets — and families actually use their terraces. A low array either gets shaded or takes over the roof. Raising it solves both.

## Elevated vs standard

| | Standard | Elevated |
|---|---|---|
| Terrace use | Lost under array | Kept |
| Shading from tanks/parapets | Frequent | Usually avoided |
| Module cooling | Moderate | Better |
| Cost | Base | +₹8,000–₹15,000/kW typical |

Read the full comparison: [elevated vs standard structures](/learn/elevated-vs-standard-solar-structure).

## See them built

Our [projects](/projects) show elevated arrays in Mukherjee Nagar, near Chota Bangarda Road and above a terrace garden.
`,
    faqs: [
      {
        q: "How high is an elevated solar structure?",
        a: "Usually 2–3 metres of clear height at the lower edge, set according to how you use the terrace and what needs to be cleared for shading.",
      },
      {
        q: "Is an elevated structure safe in strong winds?",
        a: "When designed properly, yes. It needs heavier columns, bracing and well-anchored footings. We design for Indore's pre-monsoon storms and check fasteners during service visits.",
      },
      {
        q: "Does an elevated structure need drilling into the roof?",
        a: "We generally use concrete pedestals that sit on the slab and spread the load, which protects the waterproofing. The approach is confirmed after checking your roof.",
      },
    ],
    related: ["/learn/elevated-vs-standard-solar-structure", "/projects", "/residential-solar-indore", "/learn/roof-orientation-shading-guide"],
  },
  {
    slug: "hybrid-off-grid-solar-indore",
    name: "Hybrid & off-grid solar (battery backup)",
    seoTitle: "Hybrid Solar with Battery Backup in Indore",
    description:
      "Hybrid solar systems with battery backup and off-grid solar for Indore homes, clinics, offices and farmhouses — keep essentials running during power cuts.",
    icon: "Battery",
    photo: "havellsInverter",
    serviceType: "Hybrid and off-grid solar power systems with battery storage",
    summary:
      "Hybrid solar systems combine rooftop panels, a hybrid inverter and a battery so essential loads keep running during power cuts, while still exporting surplus to the grid under net metering. Off-grid systems run entirely on panels and batteries without a grid connection. Genius Solar designs both for Indore homes, clinics, home offices and farmhouses, sizing the battery to the loads that genuinely need backup rather than the whole building.",
    lead: "Solar that keeps the lights, fans, Wi-Fi and fridge on when the grid goes down.",
    includes: [
      { t: "Backup load study", b: "We list what must run in an outage and for how long." },
      { t: "Hybrid inverter", b: "Manages solar, battery and grid automatically." },
      { t: "Battery sizing", b: "Lithium (LFP) or lead-acid, sized to backup needs." },
      { t: "Separate backup circuit", b: "Essential loads wired to a dedicated backup board." },
      { t: "Net metering", b: "Hybrid systems still export surplus where applicable." },
      { t: "Off-grid design", b: "For sites without reliable grid supply." },
    ],
    body: `
## Who needs a battery?

Most Indore homes don't — net metering makes on-grid solar the best value. A battery makes sense when outages are frequent or long, or when equipment must not stop (clinics, home offices, cold storage).

## Sizing backup the smart way

| Backup need | Typical load | Battery (usable) |
|---|---|---|
| Lights, fans, Wi-Fi for 4 h | ~400 W | ~2 kWh |
| Plus refrigerator and TV | ~700 W | ~3–4 kWh |
| Home office with 2 laptops, printer | ~900 W | ~4–5 kWh |

We wire only these circuits to the backup board, which keeps the battery small and affordable.

## On-grid vs hybrid vs off-grid

See the full comparison: [on-grid vs off-grid vs hybrid](/learn/on-grid-vs-off-grid-vs-hybrid-solar).
`,
    faqs: [
      {
        q: "Can a hybrid solar system run an AC during a power cut?",
        a: "It can, but running ACs from a battery needs a large, expensive battery bank. Most customers back up lights, fans, Wi-Fi and the refrigerator, and let ACs wait for the grid.",
      },
      {
        q: "How long do solar batteries last?",
        a: "Lithium iron phosphate (LFP) batteries typically last 6–10 years or several thousand cycles; lead-acid batteries 3–5 years with maintenance.",
      },
    ],
    related: ["/learn/on-grid-vs-off-grid-vs-hybrid-solar", "/learn/solar-inverter-guide", "/residential-solar-indore"],
  },
  {
    slug: "solar-panel-cleaning-maintenance-indore",
    name: "Cleaning & maintenance (AMC)",
    seoTitle: "Solar Panel Cleaning & Maintenance (AMC) in Indore",
    description:
      "Solar panel cleaning and annual maintenance in Indore: safe cleaning, health checks of structure, cables, earthing and inverter, and performance reviews. Free for 5 years for our customers.",
    icon: "Drop",
    photo: "moduleRows",
    serviceType: "Solar panel cleaning and operation & maintenance",
    summary:
      "Genius Solar provides solar panel cleaning and preventive maintenance in Indore. Every Genius Solar installation includes five years of free service visits. Service covers safe module cleaning, checks of structure bolts and clamps, cables, MC4 connectors, earthing, lightning arrester, distribution boxes and inverter logs, and a comparison of generation against expected output. Annual maintenance contracts (AMC) are available after the free period and for systems installed by others.",
    lead: "Keep every panel producing like day one — safe cleaning, proper checks and a clear report.",
    includes: [
      { t: "Safe cleaning", b: "Soft water, soft brushes, no detergents or high-pressure jets." },
      { t: "Structure check", b: "Bolts, clamps, bracing, rust touch-up." },
      { t: "Electrical check", b: "Connectors, cables, DCDB/ACDB, SPDs and isolators." },
      { t: "Earthing test", b: "Continuity of earthing and lightning arrester." },
      { t: "Inverter review", b: "Error logs, firmware and generation trends." },
      { t: "Report", b: "Findings and generation vs expected output." },
    ],
    body: `
## Why maintenance matters in Indore

Dust in the dry months can cut output by 5–15%, hard borewell water leaves scale, and pre-monsoon storms test every bolt. A short visit a few times a year keeps the system — and your savings — on track.

## Visit frequency

| Plan | Cleaning | Health check |
|---|---|---|
| Genius Solar customers (first 5 years) | As per service schedule | Periodic, free |
| AMC | Monthly / fortnightly options | Twice a year |
| One-time service | On request | On request |

For DIY cleaning tips, see our [cleaning guide](/learn/solar-panel-cleaning-maintenance-indore).
`,
    faqs: [
      {
        q: "Do you service solar systems installed by other companies?",
        a: "Yes. We inspect the system first, fix safety issues if any, and then offer cleaning or an AMC.",
      },
      {
        q: "How much does solar panel cleaning cost in Indore?",
        a: "It depends on system size, access and frequency. Ask for an AMC quote — for Genius Solar customers, service visits are free for the first five years.",
      },
    ],
    related: ["/learn/solar-panel-cleaning-maintenance-indore", "/learn/solar-panel-lifespan-degradation-warranty", "/contact"],
  },
  {
    slug: "solar-epc-contractor-indore",
    name: "Commercial & industrial EPC",
    seoTitle: "Solar EPC Contractor in Indore | Commercial & Industrial",
    description:
      "Solar EPC for factories, warehouses, offices, schools and hospitals in Indore, Pithampur and Dewas — load study, design, procurement, installation, approvals and O&M.",
    icon: "Factory",
    photo: "wideArray",
    serviceType: "Solar engineering, procurement and construction (EPC)",
    summary:
      "Genius Solar Services delivers engineering, procurement and construction (EPC) for commercial and industrial rooftop solar in Indore and nearby industrial areas including Pithampur, Sanwer Road and Dewas. Projects start with a load and tariff study, roof structural assessment and yield simulation, followed by detailed design, procurement of modules, inverters and balance of system, installation, DISCOM approvals and net metering, commissioning with monitoring, and ongoing operation and maintenance.",
    lead: "From load study to commissioning — rooftop plants engineered around your roof and your daytime load.",
    includes: [
      { t: "Load & tariff study", b: "Daytime consumption profile and tariff to size for self-consumption." },
      { t: "Roof assessment", b: "RCC, metal-sheet or asbestos: purlins, spans and load capacity." },
      { t: "Yield simulation", b: "Monthly generation and savings forecast." },
      { t: "Design & procurement", b: "Modules, inverters, structures, cables and protection." },
      { t: "Installation & safety", b: "Safe work at height, walkways and lifelines where needed." },
      { t: "Approvals", b: "DISCOM applications, inspection and net metering." },
      { t: "Monitoring & O&M", b: "Remote monitoring, cleaning schedules and preventive maintenance." },
    ],
    body: `
## Why commercial solar pays back fast

Commercial and industrial tariffs are higher than domestic ones, and most businesses consume power during daylight — exactly when solar produces. Every unit is used on site, so payback of 3–4 years is typical even without subsidy.

## Roof types we handle

| Roof | Approach |
|---|---|
| RCC flat | Ballast or anchored structures, walkways |
| Metal sheet | Rail clamps or short tilt legs fixed to purlins |
| Asbestos cement | Independent structure — no drilling into sheets |
| Open land / parking | Ground mount or carport structures |

See [commercial solar in Indore](/commercial-solar-indore) for industries and ROI examples.
`,
    faqs: [
      {
        q: "What size commercial solar projects do you take on?",
        a: "From about 10 kW for shops and clinics to 100 kW and above for factories and campuses. Large projects start with a load study.",
      },
    ],
    related: ["/commercial-solar-indore", "/solar-installation/pithampur", "/solar-systems/50kw-solar-system-indore", "/solar-systems/100kw-solar-system-indore"],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
