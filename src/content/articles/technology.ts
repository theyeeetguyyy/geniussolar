import type { Article } from "./types";

export const technology: Article[] = [
  {
    slug: "solar-panel-types-mono-perc-topcon-bifacial",
    title: "Solar panel types explained: mono PERC, TOPCon, bifacial and polycrystalline",
    seoTitle: "Solar Panel Types: Mono PERC vs TOPCon vs Bifacial",
    description:
      "Which solar panel technology is best for an Indore roof? Mono PERC, TOPCon, bifacial and polycrystalline compared on efficiency, heat performance, degradation and price.",
    cluster: "Technology",
    published: "2026-09-19",
    updated: "2026-09-29",
    summary:
      "Most rooftop systems in India now use monocrystalline modules. Mono PERC is the proven, cost-effective standard (about 20.5–21.5% module efficiency). TOPCon is the newer n-type technology with higher efficiency (about 21.5–23%), a better temperature coefficient for hot Indore summers and lower first-year degradation. Bifacial modules also capture light reflected onto their back and gain most on elevated structures over light-coloured roofs. Polycrystalline modules are largely obsolete for new rooftops.",
    keyFacts: [
      { k: "Mono PERC eff.", v: "≈20.5–21.5%" },
      { k: "TOPCon eff.", v: "≈21.5–23%" },
      { k: "Bifacial gain", v: "≈5–15% (site-dependent)" },
      { k: "Typical size", v: "540–590 W" },
    ],
    body: `
## The quick comparison

| | Polycrystalline | Mono PERC | TOPCon (n-type) | Bifacial (PERC or TOPCon) |
|---|---|---|---|---|
| Module efficiency | ~16–18% | ~20.5–21.5% | ~21.5–23% | Same front + rear gain |
| Temperature coefficient | ~-0.40%/°C | ~-0.35%/°C | ~-0.30%/°C | Depends on cell |
| First-year degradation | ~2.5% | ~1.5–2% | ~1% | Depends on cell |
| Look | Blue, speckled | Uniform black-blue | Uniform black-blue | Often glass-glass |
| Best for | Budget legacy | Most rooftops | Hot climates, max output per roof | Elevated structures |

Figures are typical ranges from manufacturer datasheets; always check the specific module's datasheet.

## Why "half-cut" matters

Most modern modules use **half-cut cells**: each cell is laser-cut in two, so each half carries half the current. Resistive losses fall, hotspots run cooler, and a shaded corner affects a smaller part of the module. The 144-cell modules you see on Indore roofs are 72 full cells cut in half.

## PERC vs TOPCon in Indore's heat

Cells on a rooftop in May can hit 60–65°C. With a temperature coefficient of -0.35%/°C, a PERC module loses about 12–14% of its rated power at that temperature; a TOPCon module at -0.30%/°C loses about 10–12%. Over a summer, that difference adds up — which is why TOPCon is increasingly popular for Indian rooftops.

## Bifacial modules and elevated structures

Bifacial modules have a transparent back (glass or clear backsheet) and generate from light reflected off the surface below. The gain depends on height and how reflective the roof is:

| Setup | Typical rear-side gain |
|---|---|
| Flush on dark roof | ~0–3% |
| Low tilt on grey concrete | ~3–6% |
| Elevated 2 m+ over white/light roof | ~6–12% |

Our [elevated structures](/services/elevated-solar-structure-indore) are a natural fit for bifacial modules.

## DCR vs non-DCR

This is about where the cells are made, not the technology. Subsidised home systems under PM Surya Ghar must use **DCR (Domestic Content Requirement)** modules with Indian-made cells. See [DCR vs non-DCR panels](/learn/dcr-vs-non-dcr-solar-panels).

## What we recommend

- **Homes with subsidy:** DCR mono PERC or DCR TOPCon, 540–580 W class.
- **Elevated structures:** consider bifacial DCR modules.
- **Businesses without subsidy:** non-DCR TOPCon usually gives the best cost per unit generated.
`,
    related: ["/learn/dcr-vs-non-dcr-solar-panels", "/learn/solar-panel-lifespan-degradation-warranty", "/services/elevated-solar-structure-indore", "/learn/solar-inverter-guide"],
  },
  {
    slug: "solar-inverter-guide",
    title: "Solar inverter guide: string, micro and hybrid inverters",
    seoTitle: "Solar Inverter Guide: String vs Micro vs Hybrid",
    description:
      "What a solar inverter does, the difference between string, micro and hybrid inverters, how to size one, and what to look for on the datasheet — for Indore homes and businesses.",
    cluster: "Technology",
    published: "2026-09-19",
    updated: "2026-09-29",
    summary:
      "A solar inverter converts DC power from the panels into AC for your home and the grid, tracks the array's maximum power point (MPPT) and shuts down during grid outages for safety. String inverters are the standard for Indian rooftops: one inverter handles a string of panels, offering the best cost and simple service. Microinverters sit under each panel and help on heavily shaded or multi-direction roofs but cost more. Hybrid inverters add a battery for backup. Inverters typically last 10–15 years with 5–10 year warranties.",
    keyFacts: [
      { k: "Standard choice", v: "String inverter" },
      { k: "Typical life", v: "10–15 years" },
      { k: "Warranty", v: "5–10 years" },
      { k: "Efficiency", v: "≈97–98.5%" },
    ],
    body: `
## What the inverter does

1. **Converts** DC to grid-quality AC.
2. **Tracks** the maximum power point (MPPT) as sunlight changes.
3. **Synchronises** with the grid's voltage and frequency.
4. **Protects**: shuts down during outages (anti-islanding) and on faults.
5. **Reports**: most models log generation and send it to a phone app.

## String vs micro vs hybrid

| | String inverter | Microinverters | Hybrid inverter |
|---|---|---|---|
| Where | Wall-mounted, one per system | One behind each panel (or pair) | Wall-mounted with battery |
| Cost | Lowest | Highest | Medium–high |
| Shading tolerance | Good with multiple MPPTs | Best | Good |
| Backup in outage | No | No | Yes (with battery) |
| Service access | Easy, at eye level | On the roof | Easy |
| Best for | Most homes and businesses | Complex, shaded, multi-angle roofs | Outage-prone sites |

## Sizing the inverter

The inverter is normally rated close to the array size — a 3 kW array with a 3 kW inverter. A **DC:AC ratio** slightly above 1 (e.g. 3.3 kWp of panels on a 3 kW inverter) is common and improves morning and evening output with minimal clipping at noon. If you plan to expand, an inverter one size larger saves replacing it later.

## Single-phase or three-phase

Your inverter must match your connection. Homes up to about 5 kW are often single-phase; larger homes and businesses are usually three-phase. We check your sanctioned load and phase during the survey.

## Datasheet checklist

- Max efficiency and European/weighted efficiency (≥97%)
- Number of MPPT inputs (two helps split roofs)
- IP65 or better for outdoor/semi-outdoor mounting
- Built-in DC switch, surge protection (SPD) and anti-islanding
- Wi-Fi monitoring and a local service network
- Warranty length and how claims are handled

## Where it goes

We mount inverters at eye level, in shade where possible, with ventilation around them — inverters derate when hot. In the photos on our [projects page](/projects) you'll see them on stair-headroom walls with the AC and DC distribution boxes beside them.
`,
    related: ["/learn/on-grid-vs-off-grid-vs-hybrid-solar", "/learn/solar-safety-earthing-lightning-protection", "/services/hybrid-off-grid-solar-indore", "/projects"],
  },
  {
    slug: "dcr-vs-non-dcr-solar-panels",
    title: "DCR vs non-DCR solar panels: what's the difference?",
    seoTitle: "DCR vs Non-DCR Solar Panels: Subsidy & Price",
    description:
      "DCR (Domestic Content Requirement) panels use Indian-made cells and are mandatory for PM Surya Ghar subsidy. Here's how they compare with non-DCR panels on price, performance and when each makes sense.",
    cluster: "Technology",
    published: "2026-09-20",
    updated: "2026-09-29",
    summary:
      "DCR (Domestic Content Requirement) solar modules are made with solar cells manufactured in India; non-DCR modules use imported cells, even if assembled in India. PM Surya Ghar subsidy for homes and housing societies requires DCR modules. DCR modules usually cost more per watt, but for a home the ₹30,000–₹78,000 subsidy more than covers the difference. Businesses that don't receive subsidy often choose non-DCR modules for a lower cost per watt.",
    keyFacts: [
      { k: "DCR", v: "Indian-made cells" },
      { k: "Needed for", v: "PM Surya Ghar subsidy" },
      { k: "Price", v: "DCR costs more per watt" },
      { k: "Performance", v: "Depends on cell tech, not origin" },
    ],
    body: `
## The one-line difference

**DCR** = the cells inside were made in India. **Non-DCR** = the cells were imported (the module may still be assembled in India).

## When you must use DCR

| Project type | DCR required? |
|---|---|
| Home system with PM Surya Ghar subsidy | Yes |
| Housing society / RWA with subsidy | Yes |
| Home system without subsidy | No |
| Commercial or industrial rooftop | No |

## Price and value

DCR modules carry a price premium per watt because domestic cell capacity is still growing. For a home, the subsidy (₹30,000 per kW for the first 2 kW, ₹18,000 for the third) outweighs the premium many times over, so DCR is the obvious choice. For a factory without subsidy, non-DCR modules usually give a lower cost per kWh.

## Does DCR perform differently?

Performance depends on the **cell technology** (PERC, TOPCon, bifacial), not the country of manufacture. Compare datasheets: efficiency, temperature coefficient, degradation and warranty. See [solar panel types](/learn/solar-panel-types-mono-perc-topcon-bifacial).

## How to verify DCR modules

- The module should be listed by the manufacturer as DCR and on the ALMM list.
- Your invoice and the subsidy documentation will show module serial numbers.
- We share serial numbers and DCR certificates with every subsidised installation.
`,
    related: ["/solar-subsidy-mp", "/learn/solar-panel-types-mono-perc-topcon-bifacial", "/solar-panel-price-indore"],
  },
  {
    slug: "solar-panel-lifespan-degradation-warranty",
    title: "How long do solar panels last? Lifespan, degradation and warranties",
    seoTitle: "Solar Panel Lifespan, Degradation & Warranty",
    description:
      "Solar panels last 25–30+ years. Understand degradation rates, performance vs product warranties, inverter lifespan and how to keep a system producing for decades.",
    cluster: "Care & performance",
    published: "2026-09-20",
    updated: "2026-09-29",
    summary:
      "Quality solar modules last 25–30 years or more. They lose a small amount of output each year — typically 1–2% in the first year and 0.4–0.55% per year after that, depending on technology. Manufacturers give two warranties: a product (materials) warranty of about 10–15 years and a linear performance warranty of 25–30 years that typically guarantees about 80–87% of original output at the end. Inverters usually last 10–15 years and may need one replacement over the system's life.",
    keyFacts: [
      { k: "Module life", v: "25–30+ years" },
      { k: "Annual degradation", v: "≈0.4–0.55%" },
      { k: "Performance warranty", v: "Up to 30 years" },
      { k: "Inverter life", v: "10–15 years" },
    ],
    body: `
## Two warranties, two different things

| Warranty | What it covers | Typical term |
|---|---|---|
| Product warranty | Manufacturing defects in materials and workmanship | 10–15 years |
| Performance warranty | Minimum power output over time | 25–30 years |
| Inverter warranty | Inverter defects | 5–10 years |
| Installer workmanship | Structure, wiring, installation quality | Varies — ask |

With Genius Solar you also get **five years of free service** on top of the manufacturer warranties.

## What degradation looks like

A module rated 550 W with 2% first-year and 0.55% annual degradation after that produces roughly:

| Year | Output vs new |
|---|---|
| 1 | ~98% |
| 10 | ~93% |
| 20 | ~88% |
| 25 | ~85% |
| 30 | ~82% |

TOPCon and other n-type modules usually degrade more slowly than PERC.

## What shortens a system's life

- Poor structure: rust, loose clamps, inadequate bracing.
- Water ingress at junction boxes or badly crimped connectors.
- Hot-spots from long-term shading or cracked cells.
- Harsh cleaning: abrasive powders, high-pressure jets, walking on modules.
- No surge or lightning protection.

## How to make it last

1. Use galvanised, well-braced structures.
2. Keep cables in conduit and connectors properly crimped.
3. Clean gently and regularly — see our [cleaning guide](/learn/solar-panel-cleaning-maintenance-indore).
4. Watch the monitoring app for sudden drops.
5. Get a yearly health check of connections, earthing and inverter logs.
`,
    related: ["/learn/solar-panel-cleaning-maintenance-indore", "/services/solar-panel-cleaning-maintenance-indore", "/learn/solar-safety-earthing-lightning-protection"],
  },
  {
    slug: "elevated-vs-standard-solar-structure",
    title: "Elevated vs standard solar structures: which is right for your roof?",
    seoTitle: "Elevated vs Standard Solar Structure: Pros & Cost",
    description:
      "Compare elevated (raised) and standard low-height solar mounting structures for Indore rooftops — terrace use, shading, cost, wind, cooling and bifacial gain.",
    cluster: "Planning",
    published: "2026-09-22",
    updated: "2026-09-29",
    summary:
      "A standard structure mounts modules low (about 0.3–1 m) on the roof at a fixed tilt; it is the cheapest option but occupies the terrace. An elevated structure raises the array on tall galvanised columns (typically 2–3 m clear height), so the terrace stays usable and modules sit above shadows from tanks and parapets. Elevated structures cost roughly ₹8,000–₹15,000 more per kW, need stronger bracing for wind, and run cooler thanks to airflow. They also suit bifacial modules.",
    keyFacts: [
      { k: "Clear height", v: "≈2–3 m" },
      { k: "Extra cost", v: "≈₹8–15k per kW" },
      { k: "Terrace", v: "Stays usable" },
      { k: "Shading", v: "Usually reduced" },
    ],
    body: `
## Comparison

| | Standard (low) structure | Elevated structure |
|---|---|---|
| Height | ~0.3–1 m | ~2–3 m clear |
| Terrace use | Mostly lost under array | Fully usable underneath |
| Shading from tanks/parapets | Common problem | Usually avoided |
| Cooling / airflow | Moderate | Excellent |
| Bifacial gain | Low | Higher |
| Wind design | Simpler | Needs bracing and good anchoring |
| Cost | Base | +₹8,000–₹15,000 per kW (typical) |
| Cleaning access | Easy | Needs a safe ladder or walkway |

## When elevated is worth it

- You use the terrace for drying clothes, gatherings, plants or kids' play.
- Tanks, stair headroom, parapets or neighbours would shade a low array.
- You want a shaded, cooler terrace and top floor in summer.
- You're considering bifacial modules.

## How we build them

Galvanised steel columns stand on concrete pedestals rather than being cut into the slab, protecting waterproofing. Rafters and purlins carry the modules at a fixed south tilt, and diagonal bracing ties the front and back rows together against pre-monsoon storms. See examples on our [projects page](/projects) and [the elevated structures service](/services/elevated-solar-structure-indore).

## When standard is fine

- Open roofs with no terrace use.
- Industrial and metal-sheet roofs.
- Tight budgets where every rupee should go into generation.
`,
    related: ["/services/elevated-solar-structure-indore", "/projects", "/learn/roof-orientation-shading-guide", "/learn/solar-panel-types-mono-perc-topcon-bifacial"],
  },
  {
    slug: "solar-safety-earthing-lightning-protection",
    title: "Solar safety: earthing, lightning protection and surge devices",
    seoTitle: "Solar Earthing, Lightning Arrester & Safety",
    description:
      "The safety equipment every rooftop solar system in Indore needs — DC and AC earthing, lightning arresters, SPDs, isolators, cables and connectors — and why shortcuts are dangerous.",
    cluster: "Technology",
    published: "2026-09-23",
    updated: "2026-09-29",
    summary:
      "A safe rooftop solar system needs proper earthing (separate earth pits or a designed earthing system for module frames/structure, the inverter and the lightning arrester), a lightning arrester on the roof, surge protection devices (SPDs) and isolators in the DC and AC distribution boxes, correctly rated solar DC cables in conduit, and genuine MC4 connectors. These protect people, the building and the equipment from faults, surges and lightning. Missing or poor-quality protection is one of the most common shortcuts in low-cost installations.",
    keyFacts: [
      { k: "Earthing", v: "Frames, inverter, arrester" },
      { k: "Lightning", v: "Arrester + SPDs" },
      { k: "Isolation", v: "DC & AC isolators" },
      { k: "Cables", v: "Solar-rated, in conduit" },
    ],
    body: `
## The safety checklist

| Component | Why it matters |
|---|---|
| Structure and module-frame earthing | Keeps exposed metal at earth potential if insulation fails |
| Inverter / AC earthing | Protects the house wiring and equipment |
| Lightning arrester with its own earth | Gives lightning a controlled path to ground |
| DC distribution box (DCDB) | Fuses, surge protection and an isolator on the DC side |
| AC distribution box (ACDB) | MCB/RCCB, surge protection and an isolator on the AC side |
| Solar DC cable | UV- and heat-resistant, correctly sized to limit losses |
| MC4 connectors | Weatherproof, polarity-safe joints; must be properly crimped |
| Conduit and trays | Protect cables from UV, rodents and abrasion |

## Why DC is different

DC arcs don't self-extinguish the way AC arcs do, and panels produce voltage whenever there's light — you can't "switch off the sun". That's why DC isolators, correct fuses and good connectors matter more than on normal house wiring.

## Lightning and pre-monsoon storms

Indore sees intense thunderstorms before and during the monsoon. A roof-mounted lightning arrester with a dedicated earth, plus surge protection devices on both DC and AC sides, protects the inverter — the component most vulnerable to surges.

## What to ask any installer

1. How many earth pits or what earthing design, and for what?
2. Which DCDB/ACDB components and SPD ratings?
3. Which cable brand and size?
4. Are connectors crimped with the proper tool?
5. Will you give me a single-line diagram of my system?

We document all of this in your handover file. See also the [inverter guide](/learn/solar-inverter-guide).
`,
    related: ["/learn/solar-inverter-guide", "/learn/how-to-choose-solar-installer-indore", "/services/rooftop-solar-installation-indore"],
  },
];
