import { estimate, formatINR, formatLakh, priceRange, subsidyFor, ELEVATED_STRUCTURE_PER_KW, PRICE_PER_KW } from "@/lib/solar";
import { faqsByTag } from "@/content/faqs";

/** Long-form bodies for the three pillar pages. Pages add interactive tools around them. */

const homeSizes = [1, 2, 3, 4, 5, 6, 8, 10];
const bizSizes = [10, 15, 20, 25, 50, 100];

const priceRows = homeSizes
  .map((kw) => {
    const p = priceRange(kw, "home");
    const s = subsidyFor(kw, "home");
    const e = estimate({ kw, monthlyUnits: kw * 120 });
    return `| ${kw} kW | ${formatLakh(p.low)} – ${formatLakh(p.high)} | ${formatINR(s)} | ${formatLakh(Math.max(0, p.low - s))} – ${formatLakh(Math.max(0, p.high - s))} | ${formatINR(e.monthlySavings)} | ~${e.paybackYears} yrs |`;
  })
  .join("\n");

const bizRows = bizSizes
  .map((kw) => {
    const p = priceRange(kw, "business");
    const e = estimate({ kw, monthlyUnits: kw * 120, segment: "business" });
    return `| ${kw} kW | ${formatLakh(p.low)} – ${formatLakh(p.high)} | ${e.annualUnits.toLocaleString("en-IN")} | ${formatLakh(e.annualSavings)} | ~${e.paybackYears} yrs |`;
  })
  .join("\n");

export const pillars = {
  subsidy: {
    summary:
      "PM Surya Ghar: Muft Bijli Yojana is the central government scheme for residential rooftop solar, launched in February 2024. In Madhya Pradesh — including Indore — households receive central financial assistance of ₹30,000 per kW for the first 2 kW and ₹18,000 for the third kW: ₹30,000 for 1 kW, ₹60,000 for 2 kW and a maximum of ₹78,000 for systems of 3 kW or more. Housing societies and RWAs receive ₹18,000 per kW for common facilities. Systems must use DCR modules, be installed by a registered vendor and be net-metered with MP West Discom. The subsidy is credited to the applicant's bank account after commissioning.",
    facts: [
      { k: "1 kW", v: "₹30,000" },
      { k: "2 kW", v: "₹60,000" },
      { k: "3 kW +", v: "₹78,000 (max)" },
      { k: "Societies", v: "₹18,000/kW" },
    ],
    body: `
## Subsidy amounts

| System size (home) | Central subsidy |
|---|---|
| 1 kW | ₹30,000 |
| 2 kW | ₹60,000 |
| 3 kW | ₹78,000 |
| Above 3 kW | ₹78,000 (capped) |
| Housing society / RWA (common facilities) | ₹18,000 per kW |

The scheme's guidance links typical monthly consumption to system size: roughly 0–150 units → 1–2 kW, 150–300 units → 2–3 kW, and above 300 units → 3 kW or more.

## Who is eligible

- An Indian household with its own house and a roof suitable for solar.
- A valid **domestic** electricity connection in the applicant's name.
- The household has not availed another solar subsidy on that connection.
- The system uses **DCR** (made-in-India cell) modules and is installed by a **vendor registered** on the national portal.

Commercial and industrial connections are not eligible — see [commercial solar](/commercial-solar-indore) for how businesses get their return instead.

## Documents you'll typically need

| Document | Why |
|---|---|
| Latest electricity bill | Consumer number and connection details |
| Aadhaar card | Identity of the connection holder |
| Property ownership proof / tax receipt | Roof ownership |
| Cancelled cheque or passbook | Subsidy credit |
| Passport-size photo | Application |
| Loan documents (if financing) | Bank process |

## Step-by-step: applying in Indore

1. **Register** on pmsuryaghar.gov.in with your state (Madhya Pradesh), DISCOM (MP West Discom / MPPKVVCL), consumer number and mobile.
2. **Apply** for rooftop solar and select a registered vendor.
3. **Feasibility approval** from the DISCOM for your connection and the proposed capacity.
4. **Installation** by the vendor with DCR modules.
5. **Net-metering application**; DISCOM **inspects** and installs the bi-directional meter.
6. **Commissioning report** is generated on the portal.
7. **Submit bank details**; the subsidy is credited directly to your account.

Genius Solar handles steps 1–7 for you. See the [full installation process](/services/rooftop-solar-installation-indore).

## Timeline

| Stage | Typical time |
|---|---|
| Registration and feasibility | 1–2 weeks |
| Installation | 1–3 days |
| Inspection and net meter | usually 2–4 weeks |
| Subsidy credit after complete claim | about 30 days |

Timelines depend on the portal and DISCOM workload.

## Low-interest loans

Public-sector banks offer collateral-free loans for residential systems up to 3 kW at concessional interest (around 7%). See the [solar loan and EMI guide](/learn/solar-loan-emi-guide).

## Worked example: 3 kW home in Indore

| Item | Amount |
|---|---|
| Typical system price (DCR, standard structure) | ${formatLakh(priceRange(3).low)} – ${formatLakh(priceRange(3).high)} |
| PM Surya Ghar subsidy | ₹78,000 |
| Effective cost | ${formatLakh(priceRange(3).low - 78000)} – ${formatLakh(priceRange(3).high - 78000)} |
| Generation | ~${estimate({ kw: 3, monthlyUnits: 360 }).annualUnits.toLocaleString("en-IN")} units/year |
| Estimated savings | ~${formatINR(estimate({ kw: 3, monthlyUnits: 360 }).monthlySavings)}/month |

## Common reasons applications get delayed

- Name on the electricity bill doesn't match the applicant (e.g., deceased or previous owner).
- Sanctioned load lower than the proposed system.
- Non-DCR modules installed.
- Bank details not matching the applicant.

We check all of these before we start.
`,
    faqs: faqsByTag("subsidy"),
  },
  netMetering: {
    summary:
      "Net metering lets a rooftop solar system in Indore export surplus electricity to the grid and offset it against electricity imported later. MP West Discom (MPPKVVCL) replaces the existing meter with a bi-directional net meter that records imports and exports separately; the consumer pays for net units, while fixed charges continue. Net metering in Madhya Pradesh operates under MPERC regulations, is applied for through the DISCOM (and via the PM Surya Ghar portal for residential systems), and requires inspection before commissioning. Capacity is generally linked to the consumer's sanctioned load.",
    facts: [
      { k: "DISCOM", v: "MP West Discom" },
      { k: "Meter", v: "Bi-directional" },
      { k: "Typical time", v: "2–4 weeks" },
      { k: "Fixed charges", v: "Still apply" },
    ],
    body: `
## How net metering works

1. Your panels generate electricity during the day.
2. Your home uses it first — lights, fans, ACs, fridge.
3. Surplus flows to the grid and the net meter records it as **export**.
4. At night, or when solar isn't enough, you draw from the grid — recorded as **import**.
5. Your bill charges energy for **import minus export** (net units), plus fixed charges.

## A month on an Indore net-metered bill

| Reading | Units |
|---|---|
| Imported from grid | 320 |
| Exported to grid | 290 |
| **Net billed** | **30** |

Energy charges apply to 30 units instead of the ~600 the home actually consumed that month.

## Eligibility and capacity

- Consumers with a valid connection from MP West Discom.
- Solar capacity is generally limited in relation to your sanctioned/contract load; a load enhancement can be applied for if needed.
- Equipment must meet technical standards (inverter anti-islanding, protection, earthing).

## Process in Indore

| Step | Who | Typical time |
|---|---|---|
| Application (with solar application / portal) | Consumer / vendor | Day 1 |
| Technical feasibility | DISCOM | 1–2 weeks |
| Installation | Vendor | 1–3 days |
| Installation report & request for inspection | Vendor | After install |
| Inspection & net meter fitting | DISCOM | usually 2–4 weeks |
| Commissioning | DISCOM / portal | After meter |

## What happens to surplus units?

When exports exceed imports, the surplus is carried forward against future bills and settled as per MPERC's net-metering regulations, usually at a lower rate than you pay to buy power. That's why the best return comes from sizing solar close to your own consumption — see [how much solar do I need](/learn/how-much-solar-do-i-need).

## Net metering vs gross metering

| | Net metering | Gross metering |
|---|---|---|
| What's measured | Import and export on one meter | All generation sold, all consumption bought |
| Common for | Homes, small businesses | Some large/utility-style projects |
| Value of solar unit | Your full tariff (for self-used units) | Feed-in rate |

## Documents

Usually the same as for the subsidy application: electricity bill, ID, property proof, and the installer's technical documents (single-line diagram, equipment details, test reports).
`,
    faqs: faqsByTag("net metering"),
  },
  price: {
    summary: `Rooftop solar in Indore typically costs ₹58,000–₹78,000 per kW for a turnkey home system with subsidy-eligible DCR modules and a standard structure (2026). A 3 kW home system is usually ${formatLakh(priceRange(3).low)} – ${formatLakh(priceRange(3).high)} before the ₹78,000 PM Surya Ghar subsidy. Commercial systems with non-DCR modules cost less per kW at larger sizes — around ₹36,000–₹44,000 per kW above 10 kW. Elevated structures add about ₹${ELEVATED_STRUCTURE_PER_KW.low.toLocaleString("en-IN")}–₹${ELEVATED_STRUCTURE_PER_KW.high.toLocaleString("en-IN")} per kW. Prices depend on module and inverter brand, structure height, cable runs and roof type.`,
    facts: [
      { k: "Home, per kW", v: "₹58k–₹78k" },
      { k: "3 kW before subsidy", v: `${formatLakh(priceRange(3).low)}–${formatLakh(priceRange(3).high)}` },
      { k: "Subsidy (3 kW+)", v: "₹78,000" },
      { k: "Elevated extra", v: "₹8k–₹15k/kW" },
    ],
    body: `
## Home solar prices in Indore (2026)

Turnkey on-grid systems with DCR modules, string inverter, standard galvanised structure, cabling, protection, installation and paperwork. Savings assume the system is sized to your consumption at ~₹7.5/unit.

| Size | Price before subsidy | Subsidy | Price after subsidy | Est. savings / month | Payback |
|---|---|---|---|---|---|
${priceRows}

## Business and industrial prices

Non-DCR modules, three-phase string inverters, no subsidy. Savings at ~₹9/unit commercial tariff.

| Size | Typical price | Units / year | Savings / year | Payback |
|---|---|---|---|---|
${bizRows}

## What changes the price

| Factor | Effect on price |
|---|---|
| DCR vs non-DCR modules | DCR costs more per watt; required for subsidy |
| Module technology (PERC, TOPCon, bifacial) | TOPCon/bifacial cost a little more, produce more |
| Inverter brand and type | Hybrid inverters and premium brands cost more |
| Elevated structure | +₹${ELEVATED_STRUCTURE_PER_KW.low.toLocaleString("en-IN")}–₹${ELEVATED_STRUCTURE_PER_KW.high.toLocaleString("en-IN")} per kW typical |
| Roof height and cable length | Longer runs need thicker, costlier cable |
| Battery backup | Adds battery and hybrid inverter cost |
| DISCOM charges | Net meter and any load enhancement fees |

## Per-kW price bands we use for estimates

| Size band | Home (DCR) | Business | Industry |
|---|---|---|---|
| Up to 2 kW | ₹${PRICE_PER_KW.home[0].low.toLocaleString("en-IN")}–${PRICE_PER_KW.home[0].high.toLocaleString("en-IN")} | ₹${PRICE_PER_KW.business[0].low.toLocaleString("en-IN")}–${PRICE_PER_KW.business[0].high.toLocaleString("en-IN")} | ₹${PRICE_PER_KW.industry[0].low.toLocaleString("en-IN")}–${PRICE_PER_KW.industry[0].high.toLocaleString("en-IN")} |
| 3–5 kW | ₹${PRICE_PER_KW.home[1].low.toLocaleString("en-IN")}–${PRICE_PER_KW.home[1].high.toLocaleString("en-IN")} | ₹${PRICE_PER_KW.business[1].low.toLocaleString("en-IN")}–${PRICE_PER_KW.business[1].high.toLocaleString("en-IN")} | ₹${PRICE_PER_KW.industry[1].low.toLocaleString("en-IN")}–${PRICE_PER_KW.industry[1].high.toLocaleString("en-IN")} |
| 6–10 kW | ₹${PRICE_PER_KW.home[2].low.toLocaleString("en-IN")}–${PRICE_PER_KW.home[2].high.toLocaleString("en-IN")} | ₹${PRICE_PER_KW.business[2].low.toLocaleString("en-IN")}–${PRICE_PER_KW.business[2].high.toLocaleString("en-IN")} | ₹${PRICE_PER_KW.industry[2].low.toLocaleString("en-IN")}–${PRICE_PER_KW.industry[2].high.toLocaleString("en-IN")} |
| Above 10 kW | ₹${PRICE_PER_KW.home[3].low.toLocaleString("en-IN")}–${PRICE_PER_KW.home[3].high.toLocaleString("en-IN")} | ₹${PRICE_PER_KW.business[3].low.toLocaleString("en-IN")}–${PRICE_PER_KW.business[3].high.toLocaleString("en-IN")} | ₹${PRICE_PER_KW.industry[3].low.toLocaleString("en-IN")}–${PRICE_PER_KW.industry[3].high.toLocaleString("en-IN")} |

## How to compare quotes

Ask every installer for an itemised quote listing module and inverter **make and model**, structure specification, cable brand and size, earthing and protection, and exactly which paperwork is included. A lower per-kW price often means a thinner structure, no lightning protection or no paperwork. See [how to choose a solar installer](/learn/how-to-choose-solar-installer-indore).

Prices are indicative and change with module prices and government rules; your quote follows a free site survey.
`,
    faqs: faqsByTag("price", "payback"),
  },
};
