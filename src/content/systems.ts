import type { Segment } from "@/lib/solar";

/**
 * Programmatic system-size pages (/solar-systems/[slug]). The numbers on each
 * page are computed from lib/solar.ts; the copy here is what makes each size
 * genuinely different — who it suits, what it runs, what to watch out for.
 */
export interface SystemSize {
  kw: number;
  slug: string;
  segment: Segment;
  suits: string;
  runs: string[];
  consumption: [number, number];
  notes: string[];
  faqs: { q: string; a: string }[];
}

const s = (kw: number, data: Omit<SystemSize, "kw" | "slug">): SystemSize => ({
  kw,
  slug: `${kw}kw-solar-system-indore`,
  ...data,
});

export const systemSizes: SystemSize[] = [
  s(1, {
    segment: "home",
    consumption: [80, 150],
    suits: "Small flats and independent homes with a monthly bill under about ₹1,000, or anyone who wants to start small and expand later.",
    runs: ["Lights and fans for a 2BHK", "One refrigerator", "TV, Wi-Fi router and phone charging", "A water purifier and mixer"],
    notes: [
      "A 1 kW system uses two modern 540–580 W modules and needs roughly 90 sq ft of shadow-free roof.",
      "It qualifies for ₹30,000 central subsidy under PM Surya Ghar — the highest subsidy per kW of any size.",
      "Choose an inverter one size up (2 kW or 3 kW) if you already know you will expand; it avoids replacing the inverter later.",
    ],
    faqs: [
      {
        q: "Is 1 kW solar enough for a home in Indore?",
        a: "A 1 kW system generates about 120 units a month in Indore — enough for a home that uses 100–150 units, typically a 1BHK or 2BHK without air-conditioning. Homes with an AC or a large family usually need 3 kW or more.",
      },
      {
        q: "Can a 1 kW system run an AC?",
        a: "Not reliably. A 1.5-ton inverter AC draws 1.2–1.8 kW while running. On an on-grid system it will still work because the grid supplies the shortfall, but the solar will only offset a part of the AC's consumption.",
      },
    ],
  }),
  s(2, {
    segment: "home",
    consumption: [150, 250],
    suits: "2BHK and 3BHK homes with bills of roughly ₹1,200–₹2,000, with a refrigerator, washing machine and occasional cooler use.",
    runs: ["Refrigerator, washing machine, TV", "3–4 fans and LED lighting", "A desert cooler through summer", "A 1-ton AC for a few hours on sunny days"],
    notes: [
      "Four modules, about 180 sq ft of roof.",
      "Subsidy: ₹60,000 — the full ₹30,000 per kW for the first 2 kW.",
      "The most common size for households using 150–300 units a month.",
    ],
    faqs: [
      {
        q: "How many units does a 2 kW solar system generate in Indore?",
        a: "About 8 units a day on average, or roughly 240 units a month and 2,900 units a year. Output is highest in March–May and lowest in July–August during the monsoon.",
      },
      {
        q: "What is the price of a 2 kW solar system in Indore after subsidy?",
        a: "Turnkey on-grid systems with DCR modules typically cost ₹1.36–1.56 lakh before subsidy. After the ₹60,000 PM Surya Ghar subsidy, the effective cost is roughly ₹0.76–0.96 lakh. Elevated structures cost extra.",
      },
    ],
  }),
  s(3, {
    segment: "home",
    consumption: [250, 400],
    suits: "The sweet spot for most Indore families: 3BHK homes with one or two ACs and bills of ₹2,000–₹3,500.",
    runs: ["One 1.5-ton AC through most of the day", "Refrigerator, washing machine, geyser (daytime)", "Water pump, lighting and fans", "Home office equipment"],
    notes: [
      "Six modules, about 270 sq ft of roof.",
      "Unlocks the maximum ₹78,000 residential subsidy (₹30,000 × 2 kW + ₹18,000 for the 3rd kW).",
      "Collateral-free PM Surya Ghar loans at subsidised interest are available up to 3 kW.",
    ],
    faqs: [
      {
        q: "Why is 3 kW the most popular solar system size?",
        a: "3 kW is where the PM Surya Ghar subsidy tops out at ₹78,000, and it is also the upper limit for the subsidised, collateral-free solar loan. For a typical Indore home using 300–400 units a month it cuts the bill by 80–100%.",
      },
      {
        q: "How much does a 3 kW solar system save per month in Indore?",
        a: "It generates about 360 units a month. At an effective tariff of around ₹7.5 per unit, that is roughly ₹2,700 a month, or ₹32,000–₹33,000 in the first year, rising as tariffs increase.",
      },
    ],
  }),
  s(4, {
    segment: "home",
    consumption: [400, 520],
    suits: "Larger homes running two ACs in summer, or families that work from home, with bills of ₹3,500–₹4,500.",
    runs: ["Two ACs with staggered use", "Refrigerator, washing machine, induction cooking", "Borewell pump", "EV charging for a scooter"],
    notes: [
      "Eight modules, about 360 sq ft of roof.",
      "Subsidy remains capped at ₹78,000 above 3 kW.",
      "A good size to plan around a future electric car: daytime charging absorbs surplus summer generation.",
    ],
    faqs: [
      {
        q: "How many solar panels are needed for 4 kW?",
        a: "With 545 W modules, a 4 kW system uses eight panels (4.36 kWp). With older 440 W modules it would need ten. Fewer, larger modules mean less roof space and fewer connections.",
      },
    ],
  }),
  s(5, {
    segment: "home",
    consumption: [520, 700],
    suits: "Independent houses and duplexes with bills of ₹4,500–₹6,000 — two or three ACs, a large family, or a home clinic or office.",
    runs: ["Two to three ACs", "All household appliances", "Daytime EV charging", "A small home business"],
    notes: [
      "Nine or ten modules, about 450 sq ft of roof.",
      "Often built on an elevated structure so the terrace remains usable underneath.",
      "A three-phase connection is common at this size; the inverter is chosen to match your phase.",
    ],
    faqs: [
      {
        q: "How many units does a 5 kW solar system generate per day in Indore?",
        a: "About 20 units a day averaged over the year — 22–24 units on clear March–May days and 12–15 units on overcast monsoon days. That is roughly 7,300 units a year.",
      },
      {
        q: "Do I need a three-phase connection for 5 kW solar?",
        a: "Not always. Single-phase 5 kW inverters exist, but many DISCOM connections of this size are already three-phase. We check your sanctioned load and phase during the survey and specify the inverter to match.",
      },
    ],
  }),
  s(6, {
    segment: "home",
    consumption: [650, 850],
    suits: "Large homes and joint families using 650–850 units a month.",
    runs: ["Three or more ACs", "Home lift or large pumps", "EV charging", "Everything else in a large home"],
    notes: [
      "Eleven modules, about 540 sq ft of roof.",
      "Sanctioned load may need to be enhanced with the DISCOM to match the system size; we handle the application.",
    ],
    faqs: [
      {
        q: "Does the solar system size depend on my sanctioned load?",
        a: "Yes. Under net-metering rules in Madhya Pradesh the solar capacity is generally tied to your sanctioned or contracted load. If you want a larger system, the load can be enhanced through the DISCOM, which we apply for as part of the project.",
      },
    ],
  }),
  s(8, {
    segment: "home",
    consumption: [850, 1100],
    suits: "Bungalows, farmhouses and homes with a clinic or office on the ground floor.",
    runs: ["Four or more ACs", "Home office or clinic equipment", "Swimming pool or large pumps", "Two EVs"],
    notes: ["About fifteen modules and 720 sq ft of roof.", "Split across two inverter MPPT inputs when the roof has two orientations."],
    faqs: [
      {
        q: "What is the payback period of an 8 kW solar system in Indore?",
        a: "For a home that consumes most of what it generates, payback is typically 4–5 years after the ₹78,000 subsidy. The system then produces free electricity for another 20 years or more.",
      },
    ],
  }),
  s(10, {
    segment: "home",
    consumption: [1100, 1400],
    suits: "Large residences, small showrooms, clinics and offices using around 1,200 units a month.",
    runs: ["Five or more ACs", "Commercial kitchen equipment", "Office floor with computers", "Multiple EVs"],
    notes: [
      "About nineteen modules and 900 sq ft of roof.",
      "For businesses, accelerated depreciation on solar assets can improve returns — speak to your CA.",
    ],
    faqs: [
      {
        q: "How much does a 10 kW solar system cost in Indore?",
        a: "For a home with DCR modules, typically ₹5.2–6 lakh before subsidy (₹78,000 subsidy applies). For a business using non-DCR modules, typically ₹4.2–5 lakh with no subsidy. Structure type and roof height change the final price.",
      },
      {
        q: "How much roof space does a 10 kW solar system need?",
        a: "Around 900–1,000 sq ft of shadow-free roof, including walkways for cleaning. Elevated structures can use the same area while keeping the terrace free below.",
      },
    ],
  }),
  s(15, {
    segment: "business",
    consumption: [1600, 2100],
    suits: "Showrooms, schools, small hotels, nursing homes and offices.",
    runs: ["Central or multiple split ACs", "Lighting for large floor plates", "Cold rooms and kitchens", "Lifts and pumps"],
    notes: ["About 28 modules and 1,350 sq ft of roof.", "Usually a three-phase string inverter with remote monitoring."],
    faqs: [
      {
        q: "Is solar worth it for a commercial building in Indore?",
        a: "Commercial tariffs are higher than domestic ones, so every solar unit saves more. Most daytime-heavy businesses see payback in 3–4 years, and the savings are not dependent on any subsidy.",
      },
    ],
  }),
  s(20, {
    segment: "business",
    consumption: [2100, 2800],
    suits: "Mid-size offices, hospitals, coaching institutes and light-manufacturing units.",
    runs: ["Office floors and server rooms", "Diagnostic equipment", "Machine shops on a single shift", "Water treatment"],
    notes: ["About 37 modules and 1,800 sq ft of roof.", "Can be split across two roofs or a roof and a carport."],
    faqs: [
      {
        q: "How many units does a 20 kW solar plant generate?",
        a: "About 80 units a day on average in Indore, or roughly 29,000 units a year.",
      },
    ],
  }),
  s(25, {
    segment: "business",
    consumption: [2800, 3500],
    suits: "Factories and warehouses with daytime operations on a single shift.",
    runs: ["Motors, compressors and machining", "Warehouse lighting and fans", "Cold storage", "Office block"],
    notes: ["About 46 modules and 2,250 sq ft of roof.", "Metal-sheet roofs are mounted with rail clamps or short tilt legs."],
    faqs: [
      {
        q: "Can solar panels be installed on a factory metal-sheet roof?",
        a: "Yes. Modules are fixed to the sheet profile with purpose-made clamps or on short tilt legs, keeping the load well within what a standard industrial shed carries. We check the purlin spacing and sheet condition first.",
      },
    ],
  }),
  s(50, {
    segment: "industry",
    consumption: [5500, 7000],
    suits: "Industrial units in Pithampur, Sanwer Road, Palda and Rau with significant daytime load.",
    runs: ["Production lines on day shift", "Compressed air", "HVAC for large floors", "Utility loads"],
    notes: ["About 92 modules and 4,500 sq ft of roof.", "Remote monitoring and periodic performance reports come standard at this size."],
    faqs: [
      {
        q: "What is the ROI of a 50 kW solar plant for a factory in Indore?",
        a: "At industrial tariffs, a 50 kW plant producing about 73,000 units a year typically pays back in 3–4 years, often faster when accelerated depreciation is claimed. Returns depend on how much of the generation is consumed on site.",
      },
    ],
  }),
  s(100, {
    segment: "industry",
    consumption: [11000, 14000],
    suits: "Large factories, cold chains, hospitals and campuses.",
    runs: ["Multi-shift production (daytime share)", "Chillers and cold rooms", "Campus buildings", "Water and effluent treatment"],
    notes: ["About 184 modules and 9,000 sq ft of roof.", "Needs an electrical load study and DISCOM approvals planned at the start."],
    faqs: [
      {
        q: "How much space is needed for a 100 kW rooftop solar plant?",
        a: "Around 9,000–10,000 sq ft of usable, shadow-free roof, or an equivalent split across multiple buildings. Ground-mount or carport structures can make up any shortfall.",
      },
    ],
  }),
];

export const systemBySlug = (slug: string) => systemSizes.find((x) => x.slug === slug);
