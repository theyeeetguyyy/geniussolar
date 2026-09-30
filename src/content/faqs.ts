/**
 * FAQ corpus. Answers lead with the direct answer, then the detail — the
 * format search engines and AI assistants quote. Used on /faq (grouped),
 * on topic pages (filtered by tag) and in llms-full.txt.
 */
export type FaqCategory =
  | "Cost & pricing"
  | "Subsidy"
  | "Net metering"
  | "Sizing & roof"
  | "Technology"
  | "Installation"
  | "Maintenance"
  | "Weather"
  | "Finance"
  | "Business & industry"
  | "Warranty & service"
  | "About Genius Solar";

export interface Faq {
  q: string;
  a: string;
  cat: FaqCategory;
  home?: boolean;
  tags?: string[];
}

export const faqs: Faq[] = [
  /* ---------------- Cost & pricing ---------------- */
  {
    cat: "Cost & pricing",
    home: true,
    tags: ["price", "residential"],
    q: "How much does a rooftop solar system cost in Indore?",
    a: "A turnkey on-grid home system with subsidy-eligible (DCR) modules typically costs ₹58,000–₹78,000 per kW before subsidy in 2026, depending on size and structure. A 3 kW system is usually ₹1.75–2.05 lakh before the ₹78,000 PM Surya Ghar subsidy, so roughly ₹0.97–1.27 lakh after it. Elevated structures add about ₹8,000–₹15,000 per kW.",
  },
  {
    cat: "Cost & pricing",
    tags: ["price"],
    q: "What is included in the price of a solar system?",
    a: "Our quotes are turnkey: solar modules, inverter, mounting structure, DC and AC cables, AC and DC distribution boxes, earthing, lightning arrester, installation labour, net-metering and subsidy paperwork, and commissioning. DISCOM fees for the net meter and any load enhancement are shown separately.",
  },
  {
    cat: "Cost & pricing",
    tags: ["price", "elevated"],
    q: "Why does an elevated structure cost more?",
    a: "An elevated structure uses taller, heavier galvanised columns, more bracing and concrete pedestals so the array stands 2–3 metres above the roof. It needs more steel and labour, but keeps the terrace usable and lifts the modules above shadows from tanks and parapets.",
  },
  {
    cat: "Cost & pricing",
    tags: ["price"],
    q: "Why do solar quotes in Indore vary so much?",
    a: "Differences usually come from module type (DCR vs non-DCR, PERC vs TOPCon), inverter brand, structure height and steel thickness, cable quality, earthing and lightning protection, and whether paperwork and after-sales service are included. Compare itemised quotes, not just the per-kW number.",
  },
  {
    cat: "Cost & pricing",
    tags: ["price", "savings"],
    q: "How much can I save with solar in Indore?",
    a: "Each kW of solar in Indore generates about 4 units a day, or roughly 1,450 units a year. At an effective tariff of ₹7–8 per unit, that is ₹10,000–₹11,500 of savings per kW per year. A 3 kW home system typically saves about ₹2,700 a month.",
  },
  {
    cat: "Cost & pricing",
    home: true,
    tags: ["payback", "savings"],
    q: "What is the payback period of solar panels in Indore?",
    a: "For homes that use most of what they generate, payback is typically 3–5 years after the PM Surya Ghar subsidy. For businesses on commercial or industrial tariffs it is often 3–4 years even without subsidy. After payback, the system continues producing for another 20 years or more.",
  },

  /* ---------------- Subsidy ---------------- */
  {
    cat: "Subsidy",
    home: true,
    tags: ["subsidy"],
    q: "How much solar subsidy can I get in Madhya Pradesh?",
    a: "Under PM Surya Ghar: Muft Bijli Yojana, homes get ₹30,000 per kW for the first 2 kW and ₹18,000 for the third kW — ₹30,000 for 1 kW, ₹60,000 for 2 kW and a maximum of ₹78,000 for 3 kW or more. Housing societies and RWAs get ₹18,000 per kW for common facilities.",
  },
  {
    cat: "Subsidy",
    tags: ["subsidy"],
    q: "Who is eligible for the PM Surya Ghar solar subsidy?",
    a: "An Indian household with its own house and roof suitable for solar, a valid domestic electricity connection, and no earlier solar subsidy on that connection. The system must use DCR (domestic content) modules and be installed by a vendor registered on the national portal.",
  },
  {
    cat: "Subsidy",
    tags: ["subsidy", "process"],
    q: "How do I apply for the PM Surya Ghar subsidy in Indore?",
    a: "Register on pmsuryaghar.gov.in with your electricity consumer number, apply for rooftop solar, get feasibility approval from MP West Discom, have a registered vendor install the system, and apply for net metering. After inspection and commissioning, submit bank details and the subsidy is credited to your account. We handle every step.",
  },
  {
    cat: "Subsidy",
    tags: ["subsidy"],
    q: "How long does the solar subsidy take to arrive?",
    a: "The subsidy is released after the DISCOM inspects the system and installs the net meter and the commissioning report is uploaded. It is paid directly into your bank account, typically within about 30 days of a complete claim, though timelines depend on the portal and DISCOM.",
  },
  {
    cat: "Subsidy",
    tags: ["subsidy", "commercial"],
    q: "Do businesses and factories get solar subsidy?",
    a: "No — PM Surya Ghar subsidy is only for residential connections and housing societies. Businesses benefit instead from higher tariffs (so faster payback) and, where applicable, accelerated depreciation on solar assets. Ask your CA how it applies to you.",
  },
  {
    cat: "Subsidy",
    tags: ["subsidy", "dcr"],
    q: "Do I need DCR panels to get the subsidy?",
    a: "Yes. PM Surya Ghar subsidy requires modules made with Indian-manufactured cells (Domestic Content Requirement, DCR). DCR modules cost a little more than non-DCR ones, but the subsidy more than covers the difference.",
  },
  {
    cat: "Subsidy",
    tags: ["subsidy", "free electricity"],
    q: "Does PM Surya Ghar give 300 units of free electricity?",
    a: "The scheme is designed so that a subsidised rooftop system can generate up to 300 units a month for a typical household — the “free electricity” comes from your own solar generation, not a free supply from the DISCOM. A 2–3 kW system in Indore generates about 240–360 units a month.",
  },
  {
    cat: "Subsidy",
    tags: ["subsidy", "rented"],
    q: "Can tenants get the solar subsidy?",
    a: "The subsidy is tied to the electricity connection and the roof, so the connection holder (usually the owner) applies. Tenants can benefit if the owner installs, or with the owner's written consent on the owner's connection.",
  },

  /* ---------------- Net metering ---------------- */
  {
    cat: "Net metering",
    home: true,
    tags: ["net metering"],
    q: "What is net metering and how does it work in Indore?",
    a: "Net metering replaces your normal meter with a bi-directional meter that records both units you import from the grid and units your solar system exports. You are billed only for the net units. In Indore it is provided by MP West Discom (MPPKVVCL) under MPERC net-metering regulations.",
  },
  {
    cat: "Net metering",
    tags: ["net metering", "process"],
    q: "How long does net metering take in Indore?",
    a: "After installation, DISCOM inspection and net meter fitting typically take two to four weeks, depending on the DISCOM's schedule and meter availability. We file the application and coordinate the inspection.",
  },
  {
    cat: "Net metering",
    tags: ["net metering"],
    q: "What happens to extra solar units I don't use?",
    a: "Surplus units exported to the grid are credited against your imports. If you export more than you import in a month, the surplus is carried forward to later bills and settled as per MPERC rules, usually at a lower rate than you pay to buy power. That is why sizing the system to your consumption matters.",
  },
  {
    cat: "Net metering",
    tags: ["net metering", "fixed charges"],
    q: "Will my electricity bill become zero with solar?",
    a: "Your energy charges can drop to near zero, but fixed charges and some duties still apply. Many Indore homes see bills fall from several thousand rupees to a few hundred — mostly fixed charges.",
  },
  {
    cat: "Net metering",
    tags: ["net metering", "load"],
    q: "Do I need to increase my sanctioned load for solar?",
    a: "Sometimes. Net-metered solar capacity is generally linked to your sanctioned or contracted load. If you want a system larger than your current sanctioned load, a load enhancement application is filed with the DISCOM. We check this during the survey.",
  },

  /* ---------------- Sizing & roof ---------------- */
  {
    cat: "Sizing & roof",
    home: true,
    tags: ["sizing"],
    q: "What size solar system do I need for my home?",
    a: "Divide your average monthly units by about 120 (what 1 kW generates per month in Indore). A home using 360 units a month needs about 3 kW; 600 units needs about 5 kW. Our calculator reads your bill and does this for you.",
  },
  {
    cat: "Sizing & roof",
    tags: ["roof", "area"],
    q: "How much roof space does solar need?",
    a: "About 80–100 sq ft of shadow-free roof per kW with modern 540–580 W modules, including space for cleaning access. A 3 kW system needs roughly 270 sq ft; a 5 kW system about 450 sq ft.",
  },
  {
    cat: "Sizing & roof",
    tags: ["roof", "direction"],
    q: "Which direction should solar panels face in Indore?",
    a: "South, tilted at about 15–23°, gives the highest annual output in Indore (latitude 22.7° N). East–west layouts produce 5–12% less in total but spread generation across morning and evening, which can suit some roofs and loads.",
  },
  {
    cat: "Sizing & roof",
    tags: ["roof", "shade"],
    q: "Does shade affect solar panels?",
    a: "Yes, significantly. Even partial shade on a few cells can pull down a whole string. Half-cut modules and bypass diodes reduce the loss, but the best fix is layout and height — placing or raising modules so tanks, parapets, trees and neighbours don't shade them between 9 am and 4 pm.",
  },
  {
    cat: "Sizing & roof",
    tags: ["roof", "structure"],
    q: "Is my roof strong enough for solar panels?",
    a: "Most RCC roofs are. Modules and a standard structure add roughly 15–20 kg per square metre, spread over pedestals or anchors. We inspect slab condition, cracks and seepage during the survey and design the structure accordingly.",
  },
  {
    cat: "Sizing & roof",
    tags: ["roof", "apartment"],
    q: "Can I install solar if I live in an apartment?",
    a: "Individual flats usually can't use the common roof without society approval. The practical route is a society-level system for common loads such as lifts, pumps and lighting, which qualifies for ₹18,000 per kW subsidy under PM Surya Ghar.",
  },
  {
    cat: "Sizing & roof",
    tags: ["roof", "elevated"],
    q: "Will I lose my terrace if I install solar?",
    a: "Not with an elevated structure. Raising the array on tall columns leaves the terrace usable underneath for drying clothes, gatherings or plants — and the shade keeps the roof and top floor cooler in summer.",
  },

  /* ---------------- Technology ---------------- */
  {
    cat: "Technology",
    home: true,
    tags: ["on-grid", "off-grid", "hybrid"],
    q: "Which is better for Indore: on-grid, off-grid or hybrid solar?",
    a: "On-grid is best for most Indore homes and businesses: lowest cost, highest savings, net metering and subsidy. Hybrid adds a battery for backup during power cuts at extra cost. Off-grid suits only sites without reliable grid supply.",
  },
  {
    cat: "Technology",
    tags: ["panels", "types"],
    q: "Which solar panels are best: mono PERC, TOPCon or bifacial?",
    a: "Mono PERC is proven and cost-effective. TOPCon modules have slightly higher efficiency and better heat performance, useful in Indore summers. Bifacial modules also harvest reflected light from the back and gain most on elevated structures over light-coloured roofs. We quote options side by side.",
  },
  {
    cat: "Technology",
    tags: ["inverter"],
    q: "What does a solar inverter do?",
    a: "It converts the DC electricity from the panels into AC electricity for your home, tracks the maximum power point of the array, synchronises with the grid, and shuts down safely during outages. It is also the component most likely to need service within the system's life.",
  },
  {
    cat: "Technology",
    tags: ["power cut", "on-grid"],
    q: "Will my on-grid solar work during a power cut?",
    a: "No. On-grid inverters switch off when the grid fails, by design, so that power isn't fed into lines being repaired (anti-islanding). For backup during outages you need a hybrid inverter with a battery.",
  },
  {
    cat: "Technology",
    tags: ["lifespan"],
    q: "How long do solar panels last?",
    a: "Good-quality modules last 25–30 years or more, typically with a performance warranty guaranteeing around 80–87% of original output at 25–30 years depending on the manufacturer. Inverters usually last 10–15 years.",
  },
  {
    cat: "Technology",
    tags: ["battery"],
    q: "Do I need a battery with rooftop solar?",
    a: "Not for savings. With net metering the grid acts like a free battery: you export by day and import at night. Batteries only make sense if you need backup during power cuts or the grid is unreliable at your site.",
  },
  {
    cat: "Technology",
    tags: ["monitoring"],
    q: "Can I monitor my solar system on my phone?",
    a: "Yes. Most modern string inverters, including the brands we install, have Wi-Fi monitoring apps that show live output and daily, monthly and lifetime generation.",
  },

  /* ---------------- Installation ---------------- */
  {
    cat: "Installation",
    tags: ["timeline"],
    q: "How long does solar installation take?",
    a: "A typical home system takes 1–3 days on site. The full journey — survey, design, paperwork, installation, DISCOM inspection and net meter — usually takes three to six weeks, most of it waiting on DISCOM approvals.",
  },
  {
    cat: "Installation",
    tags: ["leakage", "roof"],
    q: "Will solar installation damage my roof or cause leakage?",
    a: "It shouldn't. We use concrete pedestals or properly sealed anchors and route cables through conduits so the waterproofing isn't compromised. Elevated structures on pedestals avoid drilling into the slab surface altogether.",
  },
  {
    cat: "Installation",
    tags: ["safety", "earthing"],
    q: "What safety equipment is part of a solar installation?",
    a: "A proper installation includes separate DC and AC earthing, a lightning arrester, DC and AC distribution boxes with surge protection and isolators, correctly rated cables, and MC4 connectors. These protect your home, the equipment and service technicians.",
  },
  {
    cat: "Installation",
    tags: ["documents"],
    q: "What documents are needed for a solar installation with subsidy?",
    a: "Typically: a recent electricity bill, Aadhaar card of the connection holder, property ownership proof or tax receipt, a cancelled cheque or bank passbook, and a passport photo. We give you a checklist after the survey.",
  },

  /* ---------------- Maintenance ---------------- */
  {
    cat: "Maintenance",
    home: true,
    tags: ["cleaning"],
    q: "How often should solar panels be cleaned in Indore?",
    a: "Every two to three weeks in the dry, dusty months (February–June), and less often during the monsoon. Dust can cut output by 5–15%. Use soft water and a soft brush or mop early in the morning; avoid detergents, abrasive powders and high-pressure jets.",
  },
  {
    cat: "Maintenance",
    tags: ["maintenance", "amc"],
    q: "What maintenance does a solar system need?",
    a: "Regular cleaning, a periodic check of connections, earthing and structure fasteners, inverter error logs and generation trends. Our five years of free service covers periodic health checks; an AMC is available after that.",
  },
  {
    cat: "Maintenance",
    tags: ["hard water"],
    q: "Can I clean solar panels with borewell water?",
    a: "Hard borewell water can leave white scale on the glass that reduces output over time. Where possible use soft or RO-reject water that is not too salty, wipe dry in hard-water areas, and never clean hot panels in the afternoon sun.",
  },

  /* ---------------- Weather ---------------- */
  {
    cat: "Weather",
    tags: ["monsoon"],
    q: "Do solar panels work during the monsoon?",
    a: "Yes, at reduced output. In Indore, July and August generation is roughly 60–70% of the March–May peak because of cloud cover. Rain also cleans the panels. Annual savings figures already include the monsoon dip.",
  },
  {
    cat: "Weather",
    tags: ["summer", "heat"],
    q: "Does extreme summer heat reduce solar output?",
    a: "Somewhat. Module output falls about 0.3–0.4% for every degree the cells run above 25°C, and cells can reach 60–65°C in May. Good airflow under the modules — which elevated structures provide — and TOPCon modules with better temperature coefficients reduce the loss.",
  },
  {
    cat: "Weather",
    tags: ["storm", "wind"],
    q: "Can solar panels withstand storms and hail?",
    a: "Certified modules are tested for hail impact and wind and snow loads, and tempered glass is tough. The weak point is usually the structure, which is why we use galvanised steel, bracing and anchored pedestals designed for pre-monsoon storms.",
  },
  {
    cat: "Weather",
    tags: ["lightning"],
    q: "Is it safe to have solar panels during lightning?",
    a: "Yes, when the system has a lightning arrester and proper earthing. These provide a safe path for surges and are a standard part of our installations.",
  },

  /* ---------------- Finance ---------------- */
  {
    cat: "Finance",
    home: true,
    tags: ["loan", "emi"],
    q: "Can I buy solar on EMI or with a loan?",
    a: "Yes. Under PM Surya Ghar, public-sector banks offer collateral-free loans for home systems up to 3 kW at concessional interest (around 7%). For larger systems, banks offer solar loans at regular rates. We help with the paperwork.",
  },
  {
    cat: "Finance",
    tags: ["loan", "emi"],
    q: "Is it better to pay cash or take a solar loan?",
    a: "If the EMI is lower than your monthly savings, a loan lets solar pay for itself from day one. Paying cash gives the highest lifetime return. Our calculator shows both the EMI and the monthly savings so you can compare.",
  },

  /* ---------------- Business & industry ---------------- */
  {
    cat: "Business & industry",
    tags: ["commercial"],
    q: "Is rooftop solar worth it for a factory in Indore or Pithampur?",
    a: "Usually, yes. Factories with daytime operations consume most of their solar generation on site, offsetting industrial tariffs. Typical payback is 3–4 years, and accelerated depreciation can improve returns further for profitable businesses.",
  },
  {
    cat: "Business & industry",
    tags: ["commercial", "asbestos"],
    q: "Can solar be installed on metal-sheet or asbestos roofs?",
    a: "Metal-sheet roofs: yes, with clamps or short tilt legs fixed into the purlins. Asbestos-cement roofs should not be drilled; instead we design an independent structure that spans over the roof and bears on the building frame.",
  },
  {
    cat: "Business & industry",
    tags: ["commercial", "open access"],
    q: "What size solar plant do you install for businesses?",
    a: "From 10 kW for shops and clinics to 100 kW and above for factories, hospitals and campuses. Large systems are designed around a load study so that generation matches daytime consumption.",
  },

  /* ---------------- Warranty & service ---------------- */
  {
    cat: "Warranty & service",
    tags: ["warranty"],
    q: "What warranty do I get on a Genius Solar installation?",
    a: "Modules carry the manufacturer's performance warranty of up to 30 years, inverters a manufacturer warranty of up to 10 years depending on model, and every installation gets five years of free service from Genius Solar.",
  },
  {
    cat: "Warranty & service",
    tags: ["service", "complaint"],
    q: "What if my solar system stops working?",
    a: "Call or WhatsApp us. We check the inverter logs remotely where possible and send a technician. Warranty claims with the manufacturer are handled by us on your behalf.",
  },

  /* ---------------- About ---------------- */
  {
    cat: "About Genius Solar",
    tags: ["about"],
    q: "Where is Genius Solar Services located?",
    a: "Our office is at G-1 Swarna Palace, Plot No. 1108, Scheme No. 114 Part 1, Vijay Nagar, Indore 452010, near MP Gramin Bank. We serve Indore and nearby areas including Rau, Mhow, Pithampur, Dewas and Ujjain.",
  },
  {
    cat: "About Genius Solar",
    home: true,
    tags: ["about", "brands"],
    q: "Which solar brands does Genius Solar install?",
    a: "We supply and install modules from Adani Solar, Vikram Solar and Luminous, and inverters from Havells, Luminous and Polycab, among others. You choose the brand; we explain the differences.",
  },
  {
    cat: "About Genius Solar",
    tags: ["about"],
    q: "Is the site survey really free?",
    a: "Yes. The survey, system design and quotation are free and there is no obligation. Call +91 98267 12299 or send your electricity bill on WhatsApp to book.",
  },
];

export const faqCategories = Array.from(new Set(faqs.map((f) => f.cat)));
export const homeFaqs = faqs.filter((f) => f.home);
export const faqsByTag = (...tags: string[]) => faqs.filter((f) => f.tags?.some((t) => tags.includes(t)));
