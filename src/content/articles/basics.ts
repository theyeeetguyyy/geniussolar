import type { Article } from "./types";
import { ANNUAL_YIELD_PER_KW, AVG_MONTHLY_YIELD_PER_KW, MONTHLY_YIELD_PER_KW, MONTHS, estimate, formatINR, formatLakh } from "@/lib/solar";

const e3 = estimate({ kw: 3, monthlyUnits: 380 });
const e5 = estimate({ kw: 5, monthlyUnits: 620 });
const yields: number[] = [...MONTHLY_YIELD_PER_KW];
const bestMonth = MONTHS[yields.indexOf(Math.max(...yields))];
const worstMonth = MONTHS[yields.indexOf(Math.min(...yields))];

export const basics: Article[] = [
  {
    slug: "on-grid-vs-off-grid-vs-hybrid-solar",
    title: "On-grid vs off-grid vs hybrid solar: which is right for Indore?",
    seoTitle: "On-Grid vs Off-Grid vs Hybrid Solar in Indore",
    description:
      "A clear comparison of on-grid, off-grid and hybrid solar systems for Indore homes and businesses — cost, savings, backup, subsidy eligibility and when each makes sense.",
    cluster: "Basics",
    published: "2026-09-18",
    updated: "2026-09-29",
    summary:
      "On-grid (grid-tied) solar is the best choice for most homes and businesses in Indore: it has the lowest cost per kW, the highest savings, uses net metering with MP West Discom and qualifies for the PM Surya Ghar subsidy. It does not work during power cuts. Hybrid systems add a battery and a hybrid inverter for backup, typically adding ₹60,000–₹1.5 lakh for a home. Off-grid systems run only on panels and batteries with no grid connection, and suit farms or sites without reliable supply.",
    keyFacts: [
      { k: "Best for most", v: "On-grid" },
      { k: "Backup in outages", v: "Hybrid / off-grid" },
      { k: "Subsidy eligible", v: "On-grid (net-metered)" },
      { k: "Battery life", v: "5–10 years" },
    ],
    body: `
## The short answer

If your home or business has a normal electricity connection in Indore, **choose on-grid** unless power cuts are a real problem for you. On-grid gives you the most savings per rupee and is the only type that works with net metering and the central subsidy.

## Side-by-side comparison

| | On-grid | Hybrid | Off-grid |
|---|---|---|---|
| Connected to grid | Yes | Yes | No |
| Battery | No | Yes | Yes (essential) |
| Works during power cut | No (shuts down for safety) | Yes, from battery | Yes |
| Net metering | Yes | Yes | No |
| PM Surya Ghar subsidy | Yes, with DCR modules | Generally tied to the grid-connected rooftop system | No |
| Relative cost | Lowest | Medium–high | Highest |
| Maintenance | Very low | Battery care | Battery care |
| Best for | Most homes and businesses | Homes with frequent outages, clinics, home offices | Farms, remote sites |

## How an on-grid system works

1. Panels turn sunlight into DC electricity.
2. The inverter converts DC to AC and synchronises with the grid.
3. Your home uses solar power first.
4. Surplus flows out through a **bi-directional net meter** and is credited.
5. At night you draw power from the grid against those credits.

The grid effectively acts as a free, infinitely large battery. That is why on-grid systems pay back fastest — see [net metering in Indore](/net-metering-indore).

## Why on-grid shuts down in a power cut

On-grid inverters are required to stop exporting when the grid fails — this is called **anti-islanding**. It protects linemen repairing what they believe is a dead line. So a pure on-grid system will not power your home during an outage, even on a sunny day.

## When a hybrid system makes sense

- You face frequent or long power cuts and currently rely on an inverter-battery.
- You run a clinic, home office or equipment that must not stop.
- You want to use more of your own solar in the evening.

A hybrid inverter charges a battery from solar and still exports surplus to the grid. Lithium (LFP) batteries last longer and are more compact than lead-acid, but cost more. We size the battery to the loads you actually need during an outage — usually lights, fans, Wi-Fi, a refrigerator — not the whole house.

## When off-grid makes sense

Only where there is no reliable grid: farmhouses, remote pump houses or sites awaiting a connection. Off-grid systems need oversized panels and batteries for cloudy monsoon weeks, which makes them the most expensive per unit of energy.

## Our recommendation for Indore

| Your situation | Recommended system |
|---|---|
| City home, occasional short outages | On-grid |
| Home with daily outages or a home office | Hybrid with 3–5 kWh battery |
| Housing society | On-grid for common areas |
| Factory or office | On-grid, sized to daytime load |
| Farmhouse without reliable grid | Off-grid or hybrid |

Not sure? Use the [savings calculator](/solar-calculator) and ask us to price both on-grid and hybrid options side by side.
`,
    faqs: [
      {
        q: "Can I add a battery to my on-grid system later?",
        a: "Yes, but it usually means replacing the on-grid inverter with a hybrid inverter or adding a separate battery inverter. If you think you will want backup, choosing a hybrid-ready inverter at the start is cheaper.",
      },
      {
        q: "Does a hybrid system get the PM Surya Ghar subsidy?",
        a: "The subsidy is for grid-connected rooftop systems with DCR modules. Check current MNRE guidelines at the time of application; we confirm eligibility for your specific configuration before you commit.",
      },
    ],
    related: ["/net-metering-indore", "/services/hybrid-off-grid-solar-indore", "/learn/solar-inverter-guide", "/solar-calculator"],
  },
  {
    slug: "how-much-solar-do-i-need",
    title: "How much solar do I need? Sizing a system from your electricity bill",
    seoTitle: "How Much Solar Do I Need? Sizing Guide for Indore",
    description:
      "Work out the right solar system size for your Indore home or business from your electricity bill: units per month, kW needed, roof area, panels and savings — with worked examples.",
    cluster: "Planning",
    published: "2026-09-18",
    updated: "2026-09-29",
    summary: `In Indore, 1 kW of rooftop solar generates about ${Math.round(AVG_MONTHLY_YIELD_PER_KW)} units a month (≈4 units a day, ≈${ANNUAL_YIELD_PER_KW.toLocaleString("en-IN")} units a year). To size a system, divide your average monthly consumption in units by ${Math.round(AVG_MONTHLY_YIELD_PER_KW)} and round to the nearest standard size. A home using 360 units a month needs about 3 kW; 600 units needs about 5 kW. Each kW needs roughly 80–100 sq ft of shadow-free roof and two modern 540–580 W panels. Your sanctioned load may limit the size under net-metering rules.`,
    keyFacts: [
      { k: "Units per kW / month", v: `≈${Math.round(AVG_MONTHLY_YIELD_PER_KW)}` },
      { k: "Units per kW / year", v: `≈${ANNUAL_YIELD_PER_KW.toLocaleString("en-IN")}` },
      { k: "Roof per kW", v: "80–100 sq ft" },
      { k: "Panels per kW", v: "≈2 × 545 W" },
    ],
    body: `
## Step 1: Find your units, not your rupees

Your bill shows **units consumed** (kWh) for the billing month. Rupee amounts include fixed charges, duty and slab rates, so they are a poor guide. Look at 6–12 months if you can — summer bills with ACs are much higher than winter ones. See [how to read your MP electricity bill](/learn/how-to-read-mp-electricity-bill).

## Step 2: Divide by what 1 kW produces in Indore

A south-facing array in Indore produces about **${Math.round(AVG_MONTHLY_YIELD_PER_KW)} units per kW per month** on average across the year.

> System size (kW) ≈ average monthly units ÷ ${Math.round(AVG_MONTHLY_YIELD_PER_KW)}

## Quick sizing table

| Average monthly units | Suggested size | Roof needed | Panels (545 W) |
|---|---|---|---|
| 100–150 | 1 kW | ~90 sq ft | 2 |
| 150–250 | 2 kW | ~180 sq ft | 4 |
| 250–400 | 3 kW | ~270 sq ft | 6 |
| 400–520 | 4 kW | ~360 sq ft | 8 |
| 520–700 | 5 kW | ~450 sq ft | 10 |
| 700–850 | 6 kW | ~540 sq ft | 11 |
| 850–1,100 | 8 kW | ~720 sq ft | 15 |
| 1,100–1,400 | 10 kW | ~900 sq ft | 19 |

## Worked example: a 3BHK in Indore

A family averages **380 units a month** (higher in May, lower in January).

- 380 ÷ ${Math.round(AVG_MONTHLY_YIELD_PER_KW)} = ${(380 / AVG_MONTHLY_YIELD_PER_KW).toFixed(1)} kW → **3 kW**
- Generation: about ${e3.annualUnits.toLocaleString("en-IN")} units a year
- Estimated savings: about **${formatINR(e3.monthlySavings)} a month** at ₹7.5/unit
- Price after ₹78,000 subsidy: around **${formatLakh(e3.netCost)}**
- Payback: about **${e3.paybackYears} years**

## Worked example: a large home

A duplex averages **620 units a month** with three ACs.

- 620 ÷ ${Math.round(AVG_MONTHLY_YIELD_PER_KW)} = ${(620 / AVG_MONTHLY_YIELD_PER_KW).toFixed(1)} kW → **5 kW**
- Savings: about **${formatINR(e5.monthlySavings)} a month**
- 25-year savings: about **${formatLakh(e5.lifetimeSavings)}**

## Should you size bigger than your use?

Usually not. Under net metering, surplus units beyond what you consume over the settlement period are credited at a much lower rate than you pay to buy power. Sizing to 90–100% of your annual consumption gives the best return. The exception is when you are about to add load — an EV, another AC, a home office — in which case size for next year's bill.

## Things that can limit your size

- **Roof area** after removing tanks, stair headroom and shaded zones.
- **Sanctioned load**: net-metered capacity is generally linked to it; a load enhancement can be applied for.
- **Phase**: larger systems may need a three-phase connection.
- **Budget**: the subsidy caps at 3 kW for homes, so the step from 3 to 4 kW is paid fully by you — but still pays back.

The fastest way to get this right is to [upload your bill to our calculator](/solar-calculator), which reads the units and does the maths on your device.
`,
    faqs: [
      {
        q: "How many units does a 1 kW solar system generate per day in Indore?",
        a: "About 4 units a day on average over the year — roughly 4.5–5 units on clear March–May days and 2.5–3.5 units on overcast monsoon days.",
      },
    ],
    related: ["/solar-calculator", "/solar-systems", "/learn/3kw-vs-5kw-solar-system", "/learn/how-to-read-mp-electricity-bill"],
  },
  {
    slug: "solar-generation-indore-month-by-month",
    title: "Solar generation in Indore, month by month",
    seoTitle: "Solar Generation in Indore by Month (per kW)",
    description:
      "How many units a solar system generates in Indore each month — a month-by-month table per kW, the monsoon dip, summer heat, and what it means for your savings.",
    cluster: "Care & performance",
    published: "2026-09-20",
    updated: "2026-09-29",
    summary: `A well-installed, south-facing rooftop solar system in Indore generates about ${ANNUAL_YIELD_PER_KW.toLocaleString("en-IN")} units per kW per year — roughly 4 units per kW per day. Output peaks in March–May (about ${Math.max(...MONTHLY_YIELD_PER_KW)} units per kW per month) and dips in July–August during the monsoon (about ${Math.min(...MONTHLY_YIELD_PER_KW)} units per kW). Summer heat trims output slightly despite strong sun. These figures are modelled estimates after typical losses; actual generation depends on shading, tilt, dust and equipment.`,
    keyFacts: [
      { k: "Annual per kW", v: `≈${ANNUAL_YIELD_PER_KW.toLocaleString("en-IN")} units` },
      { k: "Best month", v: bestMonth },
      { k: "Weakest month", v: worstMonth },
      { k: "Latitude", v: "22.7° N" },
    ],
    body: `
## Monthly generation per kW in Indore

Modelled AC output for a south-facing array tilted about 20°, after typical system losses (heat, dust, wiring, inverter).

| Month | Units per kW | Units per kW per day | 3 kW system | 5 kW system |
|---|---|---|---|---|
${MONTHLY_YIELD_PER_KW.map((u, i) => {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][i];
  return `| ${MONTHS[i]} | ${u} | ${(u / days).toFixed(1)} | ${u * 3} | ${u * 5} |`;
}).join("\n")}
| **Year** | **${ANNUAL_YIELD_PER_KW.toLocaleString("en-IN")}** | **${(ANNUAL_YIELD_PER_KW / 365).toFixed(1)}** | **${(ANNUAL_YIELD_PER_KW * 3).toLocaleString("en-IN")}** | **${(ANNUAL_YIELD_PER_KW * 5).toLocaleString("en-IN")}** |

## Why March–May is the best season

Clear skies, long days and a high sun give the most energy. Output would be even higher if not for heat: module efficiency drops about 0.3–0.4% for every degree the cells run above 25°C, and cells on an Indore roof can reach 60–65°C in May. Elevated structures help because air flows freely under the modules.

## The monsoon dip

From late June to September, cloud cover cuts output to roughly 60–70% of the spring peak. Solar still works on cloudy days — diffuse light still reaches the cells — and rain washes off the dust. Under net metering, surplus credit from sunny months offsets the monsoon shortfall.

## Winter: good sun, lower angle

October to February brings clear skies but a lower sun. A tilt close to Indore's latitude (about 20–23°) balances summer and winter. Watch for **winter shading**: a low sun casts much longer shadows from tanks, parapets and neighbouring buildings than it does in May.

## What reduces real-world generation

| Factor | Typical impact |
|---|---|
| Dust between cleanings | 3–15% |
| Partial shading | 5–30%+ depending on layout |
| High cell temperature (summer) | 8–15% |
| Poor tilt or east/west orientation | 5–12% |
| Inverter and cable losses | 3–5% |

See [solar panel cleaning in Indore](/learn/solar-panel-cleaning-maintenance-indore) and [roof orientation and shading](/learn/roof-orientation-shading-guide) for how to minimise these.

## Methodology

Figures are modelled from typical plane-of-array irradiance for Indore (22.7° N, 75.9° E) with a performance ratio of about 0.74–0.79 depending on season, then rounded. They are planning estimates, not a guarantee; your quote includes a site-specific estimate.
`,
    related: ["/learn/solar-panels-indore-weather-monsoon-summer", "/learn/how-much-solar-do-i-need", "/solar-calculator", "/solar-systems"],
  },
  {
    slug: "3kw-vs-5kw-solar-system",
    title: "3 kW vs 5 kW solar system: which should you choose?",
    seoTitle: "3kW vs 5kW Solar System: Cost, Savings, Subsidy",
    description:
      "Compare a 3 kW and 5 kW rooftop solar system in Indore — generation, price, PM Surya Ghar subsidy, savings, payback, roof space and who each suits.",
    cluster: "Planning",
    published: "2026-09-21",
    updated: "2026-09-29",
    summary: `A 3 kW system suits Indore homes using about 250–400 units a month; a 5 kW system suits homes using about 520–700 units. 3 kW generates around ${e3.annualUnits.toLocaleString("en-IN")} units a year and receives the maximum ₹78,000 PM Surya Ghar subsidy. 5 kW generates around ${e5.annualUnits.toLocaleString("en-IN")} units a year but gets the same ₹78,000, so the extra 2 kW is paid in full. Both typically pay back in about 3–5 years when sized to consumption.`,
    keyFacts: [
      { k: "3 kW generation", v: `${e3.annualUnits.toLocaleString("en-IN")} units/yr` },
      { k: "5 kW generation", v: `${e5.annualUnits.toLocaleString("en-IN")} units/yr` },
      { k: "Subsidy (both)", v: "₹78,000" },
      { k: "Roof", v: "270 vs 450 sq ft" },
    ],
    body: `
## Comparison table

| | 3 kW | 5 kW |
|---|---|---|
| Suits monthly use of | 250–400 units | 520–700 units |
| Annual generation | ~${e3.annualUnits.toLocaleString("en-IN")} units | ~${e5.annualUnits.toLocaleString("en-IN")} units |
| Daily average | ~${e3.dailyUnits} units | ~${e5.dailyUnits} units |
| Panels (545 W) | 6 | 10 |
| Roof area | ~270 sq ft | ~450 sq ft |
| Typical price before subsidy | ${formatLakh(e3.price.low)} – ${formatLakh(e3.price.high)} | ${formatLakh(e5.price.low)} – ${formatLakh(e5.price.high)} |
| PM Surya Ghar subsidy | ₹78,000 | ₹78,000 |
| Estimated monthly savings | ~${formatINR(e3.monthlySavings)} | ~${formatINR(e5.monthlySavings)} |
| Payback (if fully used) | ~${e3.paybackYears} years | ~${e5.paybackYears} years |
| Subsidised loan (≤3 kW) | Eligible | Standard solar loan |

Prices are indicative for DCR modules and a standard structure; elevated structures cost more.

## Choose 3 kW if…

- Your average bill is roughly ₹2,000–₹3,500 a month.
- Roof space is limited.
- You want the collateral-free, low-interest PM Surya Ghar loan (up to 3 kW).

## Choose 5 kW if…

- You run two or three ACs through summer.
- You plan to add an EV or a home office soon.
- You have 450+ sq ft of shadow-free roof and a suitable sanctioned load.

## The mistake to avoid

Buying 5 kW for a home that only uses 300 units. Under net metering, the surplus beyond your consumption earns far less than the units you replace, so the extra 2 kW barely pays back. Size to your real consumption — our [calculator](/solar-calculator) does this from your bill.
`,
    related: ["/solar-systems/3kw-solar-system-indore", "/solar-systems/5kw-solar-system-indore", "/learn/how-much-solar-do-i-need", "/solar-subsidy-mp"],
  },
];
