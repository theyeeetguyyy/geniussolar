import type { Article } from "./types";
import { LOAN, emi, estimate, formatINR, formatLakh, priceRange } from "@/lib/solar";

const p3 = priceRange(3, "home");
const e3 = estimate({ kw: 3, monthlyUnits: 380 });
const emi3_5 = Math.round(emi(p3.mid, LOAN.subsidisedRate, 5));
const emi3_7 = Math.round(emi(p3.mid, LOAN.subsidisedRate, 7));
const emi3_10 = Math.round(emi(p3.mid, LOAN.subsidisedRate, 10));
const p5 = priceRange(5, "home");
const emi5_7 = Math.round(emi(p5.mid, LOAN.standardRate, 7));
const e5 = estimate({ kw: 5, monthlyUnits: 620 });

export const careFinance: Article[] = [
  {
    slug: "solar-loan-emi-guide",
    title: "Solar loans and EMI: how to finance rooftop solar in Indore",
    seoTitle: "Solar Loan & EMI Guide for Indore Homes",
    description:
      "How PM Surya Ghar collateral-free solar loans work, typical interest rates and EMIs for 3 kW and 5 kW systems, documents needed, and whether a loan or cash is better.",
    cluster: "Costs & finance",
    published: "2026-09-22",
    updated: "2026-09-29",
    summary: `Under PM Surya Ghar, public-sector banks offer collateral-free loans for residential rooftop solar up to 3 kW at concessional interest of around 7% a year, with longer tenures available. Systems above 3 kW can be financed with regular solar or personal loans at higher rates. For a 3 kW system priced around ${formatLakh(p3.mid)}, an EMI at 7% is roughly ${formatINR(emi3_5)} over 5 years or ${formatINR(emi3_10)} over 10 years, against estimated savings of about ${formatINR(e3.monthlySavings)} a month. The subsidy is credited to your account after commissioning and can be used to prepay the loan.`,
    keyFacts: [
      { k: "≤3 kW loan rate", v: "≈7% p.a." },
      { k: "Collateral", v: "Not required (≤3 kW scheme)" },
      { k: "3 kW EMI (10 yr)", v: `≈${formatINR(emi3_10)}` },
      { k: "3 kW savings", v: `≈${formatINR(e3.monthlySavings)}/mo` },
    ],
    body: `
## How the scheme loan works

1. Register on the PM Surya Ghar portal and choose a registered vendor.
2. Apply for a loan through the portal or directly with a participating public-sector bank.
3. The bank disburses to the vendor as per its process.
4. After installation, inspection and net metering, the **subsidy is credited to your bank account** — you can use it to prepay part of the loan.

Rates and terms are set by the bank and can change; we'll help you compare offers at the time you apply.

## Example EMIs

| System | Assumed price | Rate | Tenure | Approx. EMI | Est. monthly savings |
|---|---|---|---|---|---|
| 3 kW | ${formatLakh(p3.mid)} | ${(LOAN.subsidisedRate * 100).toFixed(0)}% | 5 years | ${formatINR(emi3_5)} | ${formatINR(e3.monthlySavings)} |
| 3 kW | ${formatLakh(p3.mid)} | ${(LOAN.subsidisedRate * 100).toFixed(0)}% | 7 years | ${formatINR(emi3_7)} | ${formatINR(e3.monthlySavings)} |
| 3 kW | ${formatLakh(p3.mid)} | ${(LOAN.subsidisedRate * 100).toFixed(0)}% | 10 years | ${formatINR(emi3_10)} | ${formatINR(e3.monthlySavings)} |
| 5 kW | ${formatLakh(p5.mid)} | ${(LOAN.standardRate * 100).toFixed(1)}% | 7 years | ${formatINR(emi5_7)} | ${formatINR(e5.monthlySavings)} |

EMIs are calculated on the full system price before subsidy; prepaying the subsidy when it arrives reduces the remaining EMI or tenure.

## Loan or cash?

- **Cash** gives the highest lifetime return — no interest.
- **Loan** makes sense when the EMI is close to or below your monthly savings, so solar pays for itself from month one.
- Keep an emergency fund; don't drain savings for solar when a 7% loan is available.

## Documents usually needed

- Aadhaar and PAN of the applicant
- Latest electricity bill (connection in applicant's name)
- Property ownership proof or tax receipt
- Bank statements / income proof as the bank requires
- Quotation or proforma invoice from the vendor

## Businesses

Commercial and industrial solar is financed through term loans or equipment finance. Profitable businesses may also benefit from accelerated depreciation on solar assets — ask your CA. See [commercial solar in Indore](/commercial-solar-indore).
`,
    related: ["/solar-subsidy-mp", "/solar-panel-price-indore", "/solar-calculator", "/residential-solar-indore"],
  },
  {
    slug: "how-to-read-mp-electricity-bill",
    title: "How to read your MP electricity bill (and what solar changes)",
    seoTitle: "How to Read Your MP Electricity Bill for Solar",
    description:
      "Find units consumed, sanctioned load, connection type and charges on an MP West Discom (MPPKVVCL) electricity bill — and use them to size a solar system.",
    cluster: "Planning",
    published: "2026-09-23",
    updated: "2026-09-29",
    summary:
      "To plan solar, the four numbers that matter on your MP West Discom bill are: units consumed (kWh) for the billing period, your sanctioned or connected load (kW), your tariff category (domestic, non-domestic, industrial) and your consumer/IVRS number. Units consumed decide the system size; sanctioned load can cap it; the tariff category decides savings and subsidy eligibility; the consumer number is needed for the PM Surya Ghar application. Fixed charges and duty remain after solar, so bills rarely drop to exactly zero.",
    keyFacts: [
      { k: "Sizing input", v: "Units consumed" },
      { k: "Cap", v: "Sanctioned load" },
      { k: "Subsidy input", v: "Consumer number" },
      { k: "Stays after solar", v: "Fixed charges" },
    ],
    body: `
## The fields to look for

Bill layouts change from time to time, but these fields are always present in some form:

| Field | Where it helps | Notes |
|---|---|---|
| Consumer / IVRS number | Subsidy and net-metering application | Needed on the PM Surya Ghar portal |
| Tariff category | Savings rate and subsidy eligibility | Domestic (LV-1) is subsidy-eligible |
| Sanctioned / connected load (kW) | Maximum solar size | Can be enhanced by application |
| Previous & current meter reading | Check units | Difference = units consumed |
| Units consumed (kWh) | **System sizing** | Use an average over several months |
| Energy charges | What solar mostly removes | Depends on slabs |
| Fixed charges | Stays after solar | Based on connection/load |
| Electricity duty, FCA, other | Partly reduces with solar | Varies |

## Using the numbers

1. Take units consumed from your last 6–12 bills and average them.
2. Divide by about 120 to get kW — see [how much solar do I need](/learn/how-much-solar-do-i-need).
3. Check your sanctioned load isn't below the size you want.
4. Note your consumer number for the application.

## What your bill looks like after solar

With a net meter, your bill shows **import** and **export** readings. You are charged energy for net imported units; surplus exported units are credited as per MPERC net-metering rules. Fixed charges remain. See [net metering in Indore](/net-metering-indore).

## Let the calculator read it for you

Our [solar calculator](/solar-calculator) can read a PDF bill or a clear photo on your device, find the units and amount, and let you confirm them before estimating savings. Nothing is uploaded.
`,
    related: ["/solar-calculator", "/learn/how-much-solar-do-i-need", "/net-metering-indore", "/solar-subsidy-mp"],
  },
  {
    slug: "solar-panel-cleaning-maintenance-indore",
    title: "Solar panel cleaning and maintenance in Indore",
    seoTitle: "Solar Panel Cleaning & Maintenance in Indore",
    description:
      "How often to clean solar panels in Indore's dust, the right way to do it, what to avoid, and a simple yearly maintenance checklist to keep generation high.",
    cluster: "Care & performance",
    published: "2026-09-21",
    updated: "2026-09-29",
    summary:
      "In Indore, clean solar panels every two to three weeks from February to June when dust is heaviest, and as needed during winter; monsoon rain does much of the work from July to September. Dust can reduce output by 5–15%. Clean early in the morning with soft water and a soft brush or microfibre mop — no detergents, abrasive powders or high-pressure jets, and never on hot glass. Beyond cleaning, check the monitoring app monthly and get connections, earthing and structure fasteners inspected once a year.",
    keyFacts: [
      { k: "Dry season", v: "Every 2–3 weeks" },
      { k: "Dust loss", v: "5–15%" },
      { k: "Best time", v: "Early morning" },
      { k: "Avoid", v: "Detergent, jets, hot glass" },
    ],
    body: `
## Cleaning frequency by season

| Season | Months | Suggested frequency |
|---|---|---|
| Summer / dry | Feb – Jun | Every 2–3 weeks |
| Monsoon | Jul – Sep | Only if visibly dirty (bird droppings) |
| Post-monsoon & winter | Oct – Jan | Every 3–4 weeks |

Near construction sites, main roads or industrial areas, clean more often.

## How to clean — step by step

1. **Morning only.** Hot glass + cold water can stress the glass; afternoon cleaning also leaves water spots.
2. **Isolate if advised** by your installer (DC isolator), especially for hose use near connectors.
3. **Rinse** with low-pressure water to loosen dust.
4. **Wipe** with a soft brush or microfibre mop on a pole.
5. **Rinse again** and let dry. In hard-water areas, a final wipe prevents scale.

## Never do this

- Detergents, soap, surf or abrasive powders
- High-pressure jets on the glass or into junction boxes
- Walking or standing on modules
- Metal scrapers on bird droppings — soak and wipe instead

## Hard borewell water

Indore borewell water is often hard. Repeated use leaves white scale that cuts light. Use softer water if available, or wipe dry after rinsing.

## Yearly maintenance checklist

- Tightness of structure bolts and module clamps
- Rust touch-up on any cut or scratched steel
- Cable condition, conduit and ties (UV damage, rodents)
- MC4 connectors — no discolouration or heat marks
- Earthing continuity and lightning arrester
- Inverter error log and generation vs last year

Our [cleaning and maintenance service](/services/solar-panel-cleaning-maintenance-indore) covers this, and the first five years of service visits are free for Genius Solar customers.
`,
    related: ["/services/solar-panel-cleaning-maintenance-indore", "/learn/solar-generation-indore-month-by-month", "/learn/solar-panel-lifespan-degradation-warranty"],
  },
  {
    slug: "solar-panels-indore-weather-monsoon-summer",
    title: "Solar panels in Indore's weather: summer heat, monsoon and winter",
    seoTitle: "Solar in Indore Weather: Monsoon, Heat & Winter",
    description:
      "How Indore's hot summers, monsoon clouds, storms and winter sun affect rooftop solar output and durability — and how to design for each season.",
    cluster: "Care & performance",
    published: "2026-09-22",
    updated: "2026-09-29",
    summary:
      "Indore's climate suits solar well: strong sun for most of the year gives about 4 units per kW per day on average. Summer (March–May) has the best sunshine, though heat trims module efficiency by roughly 0.3–0.4% per °C above 25°C. The monsoon (late June–September) reduces output to roughly 60–70% of the spring peak but cleans the panels. Winter brings clear skies with a lower sun, making shading from tanks and neighbouring buildings more important. Pre-monsoon storms make structure bracing and lightning protection essential.",
    keyFacts: [
      { k: "Summer", v: "Best sun, some heat loss" },
      { k: "Monsoon", v: "≈60–70% of peak" },
      { k: "Winter", v: "Longer shadows" },
      { k: "Storms", v: "Bracing + arrester" },
    ],
    body: `
## Season by season

| Season | What happens | Design response |
|---|---|---|
| Summer (Mar–May) | Highest sunshine; cells run 60–65°C | Airflow under modules, good temperature coefficient (TOPCon) |
| Pre-monsoon (May–Jun) | Dust storms, strong gusts, lightning | Braced galvanised structure, anchored pedestals, lightning arrester, SPDs |
| Monsoon (Jul–Sep) | Cloud cover, rain, humidity | Sealed junction boxes, proper connectors, drainage around pedestals |
| Winter (Nov–Feb) | Clear skies, low sun, morning haze | Layout that avoids long winter shadows; tilt near latitude |

## Heat: why the sunniest months aren't proportionally better

Solar cells lose efficiency as they heat up. A module rated 550 W at 25°C may deliver 12–14% less when its cells reach 60°C+. Two things help: **airflow** (elevated structures and adequate gap under modules) and **better temperature coefficients** (TOPCon modules). See [solar panel types](/learn/solar-panel-types-mono-perc-topcon-bifacial).

## Monsoon: less sun, but not zero

Clouds scatter sunlight; panels still produce from diffuse light. Monthly generation in July–August falls to roughly 85–90 units per kW compared with about 140–150 in March–May. See the [month-by-month table](/learn/solar-generation-indore-month-by-month).

## Storms and wind

The panel is rarely the weak point — the **structure** is. Loose clamps, thin steel, unbraced tall frames and poor anchoring fail first. We use galvanised steel, cross-bracing and concrete pedestals, and check fasteners during service visits.

## Lightning

A roof-mounted lightning arrester with its own earth and surge protection on both DC and AC sides protect the inverter. See [solar safety](/learn/solar-safety-earthing-lightning-protection).
`,
    related: ["/learn/solar-generation-indore-month-by-month", "/learn/solar-safety-earthing-lightning-protection", "/learn/elevated-vs-standard-solar-structure"],
  },
  {
    slug: "roof-orientation-shading-guide",
    title: "Roof orientation, tilt and shading: getting the most from your roof",
    seoTitle: "Solar Roof Orientation, Tilt & Shading Guide",
    description:
      "Best direction and tilt for solar panels in Indore, how much east–west layouts lose, and how to find and avoid shading from tanks, parapets, trees and neighbouring buildings.",
    cluster: "Planning",
    published: "2026-09-24",
    updated: "2026-09-29",
    summary:
      "In Indore (22.7° N), solar panels produce the most energy over a year when they face due south at a tilt of roughly 15–23°. Facing south-east or south-west loses only a few percent; a split east–west layout loses about 5–12% annually but spreads output across the day. Shading is the bigger risk: water tanks, stair headrooms, parapets, trees and taller neighbours cast long shadows in winter mornings and evenings. Keeping modules clear of shade between about 9 am and 4 pm year-round matters more than a perfect angle.",
    keyFacts: [
      { k: "Best direction", v: "Due south" },
      { k: "Best tilt", v: "≈15–23°" },
      { k: "East–west loss", v: "≈5–12%" },
      { k: "Shade-free window", v: "≈9 am – 4 pm" },
    ],
    body: `
## Direction

| Orientation | Approx. annual output vs south |
|---|---|
| South | 100% |
| South-east / south-west | ~95–98% |
| East or west (single) | ~85–90% |
| East–west split | ~88–95% |
| North-facing tilt | Avoid |

## Tilt

A tilt close to Indore's latitude (about 20–23°) maximises annual output; 10–15° is common for elevated structures to reduce wind load with only a small loss. Flat (0°) modules collect dust and lose several percent — always give some tilt.

## Finding shade

Walk your roof at 9 am, noon and 4 pm, ideally in December when shadows are longest. Note shadows from:

- Water tanks and stair headroom (mumty)
- Parapet walls, especially on the south side
- Trees, poles, dish antennas
- Taller neighbouring buildings to the south, east or west

A rule of thumb: an obstacle casts a winter shadow roughly **1.5–2 times its height** to the north around mid-morning and mid-afternoon in Indore.

## Fixing shade

1. **Move the array** to the unshaded part of the roof.
2. **Raise it** above the obstacle with an elevated structure — often the cleanest fix.
3. **Split strings** across two MPPT inputs so a shaded string doesn't drag down the other.
4. **Trim trees** where you're allowed to.

Use our [roof suitability check](/roof-suitability-check) for a quick verdict, then book a free survey for a proper shadow study.
`,
    related: ["/roof-suitability-check", "/learn/elevated-vs-standard-solar-structure", "/learn/how-much-solar-do-i-need"],
  },
  {
    slug: "how-to-choose-solar-installer-indore",
    title: "How to choose a solar installer in Indore: a 12-point checklist",
    seoTitle: "How to Choose a Solar Installer in Indore",
    description:
      "A practical checklist to compare rooftop solar companies in Indore — registration, itemised quotes, structure, earthing, paperwork, warranties and after-sales service.",
    cluster: "Planning",
    published: "2026-09-25",
    updated: "2026-09-29",
    summary:
      "Choose a solar installer on the quality of the whole system and service, not just the price per kW. Check that they are registered on the PM Surya Ghar portal (for subsidy), give an itemised quote with module and inverter models, specify structure steel and height, include earthing, lightning protection and distribution boxes, handle DISCOM and subsidy paperwork, provide a generation estimate, and offer local after-sales service. Ask to see completed local projects and speak to past customers.",
    keyFacts: [
      { k: "Must have", v: "Itemised quote" },
      { k: "For subsidy", v: "Portal-registered vendor" },
      { k: "Often skipped", v: "Earthing & SPDs" },
      { k: "Ask for", v: "Local references" },
    ],
    body: `
## The checklist

| # | Check | Why it matters |
|---|---|---|
| 1 | Registered vendor on the PM Surya Ghar portal | Required for subsidy |
| 2 | Itemised quote with module and inverter **make and model** | Lets you compare like with like |
| 3 | DCR modules for subsidised home systems | Subsidy condition |
| 4 | Structure material, thickness, height and finish | Structure is the #1 failure point |
| 5 | Earthing, lightning arrester, DCDB/ACDB with SPDs | Safety and inverter protection |
| 6 | Cable brand, size and conduit | Losses and fire safety |
| 7 | Site survey and shadow study before the quote | Accurate size and yield |
| 8 | Generation estimate in units/year | Sets expectations |
| 9 | Net metering and subsidy paperwork included | Saves weeks of running around |
| 10 | Warranties in writing (module, inverter, workmanship) | Clarity later |
| 11 | Local service team and response process | Inverters do need service |
| 12 | Completed local projects and references | Proof, not promises |

## Red flags

- A price per kW with no brands or models listed.
- "Subsidy guaranteed" before checking your connection and eligibility.
- No site visit before quoting.
- Pressure to pay in full before installation.
- Vague answers on earthing and structure.

## How we answer the checklist

Every Genius Solar quote is itemised, includes the paperwork, earthing and protection, and comes after a free survey. Customers get five years of free service. See [how we work](/about) and [our projects](/projects).
`,
    related: ["/about", "/projects", "/solar-panel-price-indore", "/learn/solar-safety-earthing-lightning-protection"],
  },
];
