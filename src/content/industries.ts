import type { IconName } from "@/components/icons";

/** Commercial sub-pages: /commercial-solar-indore/[slug] */
export interface Industry {
  slug: string;
  name: string;
  seoTitle: string;
  description: string;
  icon: IconName;
  typicalKw: [number, number];
  tariff: "business" | "industry";
  loadProfile: string;
  summary: string;
  angles: { t: string; b: string }[];
  faqs: { q: string; a: string }[];
}

export const industries: Industry[] = [
  {
    slug: "factory-solar-indore",
    name: "Factories & manufacturing",
    seoTitle: "Rooftop Solar for Factories in Indore & Pithampur",
    description:
      "Rooftop solar for factories and manufacturing units in Indore, Pithampur, Sanwer Road and Dewas — cut industrial power costs with 3–4 year typical payback.",
    icon: "Factory",
    typicalKw: [50, 500],
    tariff: "industry",
    loadProfile: "Heavy daytime load from motors, compressors, HVAC and lighting — ideal for self-consumption.",
    summary:
      "Factories are the strongest case for rooftop solar in the Indore region: large roofs, high daytime consumption and industrial tariffs. A factory rooftop plant of 50–500 kW in Indore, Pithampur, Sanwer Road or Dewas typically pays back in about 3–4 years, with accelerated depreciation potentially improving returns for profitable businesses. Design depends on roof type (metal sheet, RCC or asbestos), shift pattern and contract demand.",
    angles: [
      { t: "Sized to your shifts", b: "Generation matched to day-shift load so almost every unit is self-consumed." },
      { t: "Metal & asbestos roofs", b: "Purlin-mounted rails on sheet roofs; independent structures over asbestos." },
      { t: "Contract demand", b: "Solar reduces energy charges; demand charges depend on your peak load." },
      { t: "Accelerated depreciation", b: "Solar assets may qualify — speak to your CA." },
    ],
    faqs: [
      {
        q: "How much can a factory in Pithampur save with rooftop solar?",
        a: "A 100 kW plant generates roughly 1.45 lakh units a year in this region. At an industrial energy rate of around ₹8 per unit, that is about ₹11–12 lakh of annual savings, depending on how much is consumed on site.",
      },
    ],
  },
  {
    slug: "warehouse-solar-indore",
    name: "Warehouses & logistics",
    seoTitle: "Warehouse Rooftop Solar in Indore",
    description:
      "Rooftop solar for warehouses, cold storage and logistics parks around Indore — use large metal roofs to cut power costs for lighting, cooling and material handling.",
    icon: "Warehouse",
    typicalKw: [30, 300],
    tariff: "industry",
    loadProfile: "Lighting, fans, dock equipment and — for cold storage — continuous refrigeration.",
    summary:
      "Warehouses in and around Indore have large, unshaded metal roofs that suit rooftop solar well. Where the site's own daytime load is modest, the system is sized to consumption rather than roof area to avoid exporting surplus at low value. Cold storage and temperature-controlled warehouses have steady daytime loads and see the fastest payback.",
    angles: [
      { t: "Big, clean roofs", b: "Wide spans with few obstructions — efficient layouts." },
      { t: "Cold chain", b: "Refrigeration loads peak with daytime heat, matching solar output." },
      { t: "Light-weight mounting", b: "Rail systems fixed to purlins keep added load low." },
      { t: "Right-sized", b: "Designed around consumption, not just available roof." },
    ],
    faqs: [
      {
        q: "Can my warehouse roof take the weight of solar panels?",
        a: "Most modern metal roofs can: modules and rails add roughly 12–15 kg per square metre. We check purlin spacing, sheet condition and structural drawings before designing.",
      },
    ],
  },
  {
    slug: "school-college-solar-indore",
    name: "Schools & colleges",
    seoTitle: "Solar for Schools & Colleges in Indore",
    description:
      "Rooftop solar for schools, colleges and coaching institutes in Indore — daytime load match, lower fees pressure, and a live teaching tool for students.",
    icon: "School",
    typicalKw: [20, 150],
    tariff: "business",
    loadProfile: "Classes, labs, computer rooms and fans run in daylight hours — a close match to solar.",
    summary:
      "Schools and colleges use most of their electricity during daylight, which makes rooftop solar a strong fit. A 20–150 kW system on classroom blocks can offset a large share of the bill, and a generation display turns the system into a hands-on lesson in physics and sustainability. Vacation months produce surplus, which net metering credits against the rest of the year.",
    angles: [
      { t: "Daytime use", b: "Class hours line up with peak solar generation." },
      { t: "Vacation surplus", b: "Net metering credits summer-break generation." },
      { t: "Safe for campuses", b: "Access-controlled roofs, guarded cable runs." },
      { t: "Learning tool", b: "Live generation display for students." },
    ],
    faqs: [
      {
        q: "Is solar worth it for a school that closes in summer?",
        a: "Yes. With net metering, units generated during vacations are credited and used later in the year, so the system keeps earning even when classrooms are empty.",
      },
    ],
  },
  {
    slug: "hospital-solar-indore",
    name: "Hospitals & clinics",
    seoTitle: "Rooftop Solar for Hospitals & Clinics in Indore",
    description:
      "Rooftop solar for hospitals, nursing homes, diagnostic centres and clinics in Indore — cut round-the-clock power costs and add backup for critical loads.",
    icon: "Hospital",
    typicalKw: [10, 200],
    tariff: "business",
    loadProfile: "24×7 load with a daytime peak from OPDs, diagnostics and HVAC.",
    summary:
      "Hospitals and clinics run around the clock with a pronounced daytime peak from OPDs, diagnostics and air-conditioning. Rooftop solar offsets that daytime peak, and a hybrid design can add battery backup for critical circuits alongside existing generators and UPS systems. Clean, earthed installations with surge protection are especially important around medical equipment.",
    angles: [
      { t: "Daytime peak", b: "OPD and diagnostic hours align with solar output." },
      { t: "Hybrid option", b: "Battery backup for selected critical circuits." },
      { t: "Power quality", b: "Earthing and surge protection designed with your electrical team." },
      { t: "Low disruption", b: "Installation planned around patient areas." },
    ],
    faqs: [
      {
        q: "Can solar replace a hospital's generator?",
        a: "No — critical backup should stay with generators and UPS. Solar reduces the daytime electricity bill, and a hybrid system can add a battery for selected loads.",
      },
    ],
  },
  {
    slug: "hotel-restaurant-solar-indore",
    name: "Hotels & restaurants",
    seoTitle: "Solar for Hotels & Restaurants in Indore",
    description:
      "Rooftop solar for hotels, restaurants, banquet halls and resorts in Indore, Mhow and Ujjain — offset AC, kitchen and lighting costs.",
    icon: "Hotel",
    typicalKw: [15, 150],
    tariff: "business",
    loadProfile: "Air-conditioning, kitchens, laundry and lighting with strong afternoon demand.",
    summary:
      "Hotels, restaurants and banquet halls in Indore carry heavy air-conditioning and kitchen loads through the afternoon, when solar output is strongest. Rooftop and car-park structures can host 15–150 kW, and elevated structures keep rooftop terraces usable for guests. Commercial tariffs mean fast payback without depending on subsidy.",
    angles: [
      { t: "AC offset", b: "Afternoon cooling load matches peak generation." },
      { t: "Terrace-friendly", b: "Elevated structures keep rooftop dining or events possible." },
      { t: "Car-park solar", b: "Shade for guests' cars, power for the building." },
      { t: "Brand value", b: "A visible sustainability story for guests." },
    ],
    faqs: [
      {
        q: "Can we keep our rooftop restaurant and still install solar?",
        a: "Yes. An elevated structure can double as a shade canopy over a rooftop seating area, generating power while keeping the space usable.",
      },
    ],
  },
  {
    slug: "office-showroom-solar-indore",
    name: "Offices, shops & showrooms",
    seoTitle: "Solar for Offices, Shops & Showrooms in Indore",
    description:
      "Rooftop solar for offices, showrooms, shops and commercial complexes in Indore — cut commercial electricity bills with a 3–4 year typical payback.",
    icon: "Building",
    typicalKw: [10, 100],
    tariff: "business",
    loadProfile: "Office hours load: ACs, lighting, computers and lifts.",
    summary:
      "Offices, shops and showrooms along Indore's commercial corridors — AB Road, Vijay Nagar, MG Road, Super Corridor — use electricity mostly during business hours, which matches solar generation. Systems of 10–100 kW are typical. Because commercial tariffs are higher than domestic ones, each solar unit saves more, and payback is usually about 3–4 years.",
    angles: [
      { t: "Business-hours match", b: "Consumption peaks when the sun does." },
      { t: "Higher tariff, faster payback", b: "Each unit replaced is worth more than at home." },
      { t: "Shared buildings", b: "Solutions for common meters in commercial complexes." },
      { t: "Minimal disruption", b: "Installation scheduled around opening hours." },
    ],
    faqs: [
      {
        q: "I rent my office. Can I still install solar?",
        a: "Yes, with the owner's consent for roof use. We can also design a system on a common roof that feeds the building's common meter.",
      },
    ],
  },
];

export const industryBySlug = (slug: string) => industries.find((i) => i.slug === slug);
