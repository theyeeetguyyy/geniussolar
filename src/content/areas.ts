import { site } from "@/content/site";

/**
 * Service-area pages (/solar-installation/[slug]). Each locality carries its
 * own housing character, roof typology and questions so the pages are useful
 * on their own — not the same text with a different place name.
 */
export interface Area {
  slug: string;
  name: string;
  kind: "locality" | "township" | "city";
  lat: number;
  lng: number;
  character: string;
  roofs: string;
  recommendation: string;
  landmarks: string[];
  typicalSizes: string;
  faqs: { q: string; a: string }[];
  projectSlugs?: string[];
}

export const areas: Area[] = [
  {
    slug: "vijay-nagar-indore",
    name: "Vijay Nagar",
    kind: "locality",
    lat: 22.7533,
    lng: 75.8937,
    character:
      "Vijay Nagar is our home base — the office is in Scheme No. 114. The area mixes independent houses in the older schemes (54, 74, 114) with apartments, offices and retail along AB Road.",
    roofs:
      "Most independent houses here have flat RCC roofs with a water tank, a stair headroom (mumty) and sometimes a dish antenna — all of which cast shadows that have to be designed around.",
    recommendation:
      "For independent houses we usually recommend 3–5 kW on an elevated structure so the terrace stays usable. Offices and showrooms on AB Road suit 10–25 kW systems that match their daytime load.",
    landmarks: ["AB Road", "Scheme No. 54, 74 and 114", "Meghdoot Garden", "Vijay Nagar Square"],
    typicalSizes: "3–5 kW homes · 10–25 kW commercial",
    faqs: [
      {
        q: "Do you install rooftop solar in Vijay Nagar, Indore?",
        a: "Yes. Our office is in Scheme No. 114, Vijay Nagar, so surveys and service visits in Vijay Nagar and the surrounding schemes are the quickest we do.",
      },
      {
        q: "Can I install solar on an apartment in Vijay Nagar?",
        a: "Individual flat owners usually cannot use the shared roof without the society's consent. The better route is a housing-society system for common areas, which gets ₹18,000 per kW subsidy under PM Surya Ghar.",
      },
    ],
  },
  {
    slug: "mukherjee-nagar-indore",
    name: "Mukherjee Nagar",
    kind: "locality",
    lat: 22.7488,
    lng: 75.8511,
    character:
      "A dense, established residential locality with closely spaced independent houses, many of them two or three storeys high.",
    roofs:
      "Neighbouring buildings are close and often taller, so the key question here is shading from adjacent walls and water tanks, especially in the low winter sun.",
    recommendation:
      "Raising the array on an elevated structure lifts the modules above neighbouring parapets and keeps morning and evening shade off the panels. See our Mukherjee Nagar project below.",
    landmarks: ["Indore 452006 PIN area", "Close to central Indore"],
    typicalSizes: "2–5 kW homes",
    projectSlugs: ["elevated-rooftop-solar-mukherjee-nagar-indore"],
    faqs: [
      {
        q: "My neighbour's building is taller. Can I still install solar?",
        a: "Usually yes. We measure the shadow path across the year and either place modules outside the shaded zone or raise the structure. Even 2–3 feet of extra height can remove winter-morning shading.",
      },
    ],
  },
  {
    slug: "chota-bangarda-road-indore",
    name: "Chota Bangarda Road & Airport Road",
    kind: "locality",
    lat: 22.7365,
    lng: 75.8218,
    character:
      "A growing belt of independent houses and new colonies between Airport Road and the western ring, with plenty of open terraces.",
    roofs:
      "Newer houses here often have large, unobstructed terraces — ideal for south-facing arrays with little shading.",
    recommendation:
      "3–5 kW elevated systems are popular because families also use the terrace for drying, gatherings and plants.",
    landmarks: ["Devi Ahilyabai Holkar Airport", "Kalani Nagar", "Bada Bangarda"],
    typicalSizes: "3–6 kW homes",
    projectSlugs: ["elevated-solar-chota-bangarda-road-indore"],
    faqs: [
      {
        q: "Is being near the airport a problem for rooftop solar?",
        a: "Standard rooftop systems on homes are not restricted near Indore airport. Modern modules have anti-reflective glass, and residential arrays sit well below any height limits. Very large or unusually tall structures are checked case by case.",
      },
    ],
  },
  {
    slug: "nipania-indore",
    name: "Nipania",
    kind: "locality",
    lat: 22.763,
    lng: 75.918,
    character:
      "One of Indore's fastest-growing residential areas, with new independent houses, row houses and gated townships off the Ring Road.",
    roofs:
      "New construction means sound, recently waterproofed roofs — the best time to add solar is before the terrace is tiled or finished.",
    recommendation:
      "Row houses suit 3 kW systems; larger independent homes often go to 5 kW. Townships benefit from a society-level system for lifts, pumps and common lighting.",
    landmarks: ["Ring Road", "Indore Bypass", "Vijay Nagar"],
    typicalSizes: "3–5 kW homes · 20–100 kW townships",
    faqs: [
      {
        q: "Should I install solar before or after finishing my new house in Nipania?",
        a: "Plan it before the final terrace finish. Structure anchors and conduit routes can be placed cleanly, and waterproofing is done once around the anchors.",
      },
    ],
  },
  {
    slug: "mahalaxmi-nagar-indore",
    name: "Mahalaxmi Nagar",
    kind: "locality",
    lat: 22.764,
    lng: 75.906,
    character: "A settled residential area of independent houses and duplexes near the Ring Road.",
    roofs: "Mostly flat RCC roofs with good southern exposure; many homes already have a solar water heater that needs to be worked around.",
    recommendation:
      "We lay out the PV array around existing solar water heaters and water tanks, or raise it above them on an elevated frame.",
    landmarks: ["Ring Road", "Bombay Hospital", "Scheme No. 114 border"],
    typicalSizes: "3–6 kW homes",
    faqs: [
      {
        q: "Can solar panels and a solar water heater share the same roof?",
        a: "Yes. They serve different needs — the heater makes hot water, the PV system makes electricity. We position the PV modules so the water heater does not shade them, or mount the PV above it.",
      },
    ],
  },
  {
    slug: "bicholi-mardana-indore",
    name: "Bicholi Mardana",
    kind: "locality",
    lat: 22.7,
    lng: 75.93,
    character: "An expanding area on Indore's eastern edge near the Bypass, with new colonies, farmhouses and institutions.",
    roofs: "Open plots and low surrounding buildings mean excellent sun access; farmhouses often have space for ground-mounted arrays.",
    recommendation:
      "Beyond rooftop systems, we design ground-mounted or carport arrays where there is open land, and hybrid systems where grid supply is less reliable.",
    landmarks: ["Indore Bypass", "Kanadia Road", "Bicholi Hapsi"],
    typicalSizes: "3–10 kW homes and farmhouses",
    faqs: [
      {
        q: "Can I install solar on the ground instead of the roof?",
        a: "Yes, if you have open, shadow-free land. Ground mounts are easier to clean and service. For subsidy under PM Surya Ghar the system must be installed at the residential premises with a valid connection.",
      },
    ],
  },
  {
    slug: "bengali-square-kanadia-road-indore",
    name: "Bengali Square & Kanadia Road",
    kind: "locality",
    lat: 22.719,
    lng: 75.901,
    character: "A busy mixed-use belt with independent houses, apartments and street-front shops and clinics.",
    roofs: "Shop-cum-residence buildings often have a usable roof with commercial load below — a good fit for daytime-heavy solar use.",
    recommendation:
      "For mixed buildings we check which connection the solar will feed — the domestic or the commercial meter — because tariffs and subsidy eligibility differ.",
    landmarks: ["Bengali Square", "Kanadia Road", "Scheme No. 140"],
    typicalSizes: "3–10 kW",
    faqs: [
      {
        q: "I have a shop downstairs and my home upstairs. Which meter should the solar connect to?",
        a: "Usually the commercial meter gives faster payback because commercial tariffs are higher, but only the domestic connection is eligible for PM Surya Ghar subsidy. We compare both for your actual bills.",
      },
    ],
  },
  {
    slug: "scheme-140-pipliyahana-indore",
    name: "Scheme No. 140 & Pipliyahana",
    kind: "locality",
    lat: 22.709,
    lng: 75.905,
    character: "A planned IDA scheme with independent plots, apartments and townships, close to Pipliyahana and the Ring Road.",
    roofs: "Uniform plot sizes and planned roads mean predictable roofs with fewer tall neighbours.",
    recommendation: "3–5 kW for independent houses; society systems for apartment blocks.",
    landmarks: ["Pipliyahana Square", "Ring Road", "Bengali Square"],
    typicalSizes: "3–5 kW homes",
    faqs: [
      {
        q: "Do IDA scheme houses need any permission to install rooftop solar?",
        a: "No separate building permission is normally required for a rooftop solar system on your own house. The DISCOM application for net metering is the key approval, and we file it for you.",
      },
    ],
  },
  {
    slug: "palasia-indore",
    name: "Old & New Palasia",
    kind: "locality",
    lat: 22.724,
    lng: 75.885,
    character: "Central Indore's established neighbourhood of older bungalows, clinics and offices.",
    roofs: "Older roofs deserve a structural check before adding load; trees in these leafy streets are the main shading factor.",
    recommendation:
      "We inspect roof condition and slab strength first, then use ballast-free anchored structures sized to the slab. Tree shading is mapped month by month.",
    landmarks: ["Palasia Square", "56 Dukan", "AB Road"],
    typicalSizes: "3–10 kW",
    faqs: [
      {
        q: "My house is 40 years old. Can the roof take solar panels?",
        a: "Most RCC roofs carry a solar array comfortably — modules and structure add roughly 15–20 kg per square metre. We inspect for cracks, seepage and slab thickness before designing the structure.",
      },
    ],
  },
  {
    slug: "saket-nagar-indore",
    name: "Saket Nagar & Race Course Road",
    kind: "locality",
    lat: 22.728,
    lng: 75.893,
    character: "A premium residential pocket of large independent homes close to the city centre.",
    roofs: "Large terraces, often with landscaping or terrace gardens that owners want to keep.",
    recommendation:
      "Two-level and elevated structures let the array sit above existing gardens or pergolas. See our terrace-garden project for how this works.",
    landmarks: ["Saket Square", "Race Course Road", "Palasia"],
    typicalSizes: "5–10 kW homes",
    projectSlugs: ["two-level-solar-structure-terrace-garden-indore"],
    faqs: [
      {
        q: "Will solar panels ruin my terrace garden?",
        a: "Not if the structure is designed for it. An elevated frame lifts the array high enough for plants to get light from the sides, and the partial shade often helps plants through Indore's May heat.",
      },
    ],
  },
  {
    slug: "sudama-nagar-annapurna-indore",
    name: "Sudama Nagar & Annapurna",
    kind: "locality",
    lat: 22.698,
    lng: 75.835,
    character: "Large, dense residential areas in south-west Indore, with a mix of old and newly rebuilt houses.",
    roofs: "Plenty of independent houses with moderate roof sizes, where a 2–3 kW system fits well.",
    recommendation: "3 kW is the most common choice here because it maximises the ₹78,000 subsidy on a typical roof.",
    landmarks: ["Annapurna Temple", "Sudama Nagar", "Usha Nagar"],
    typicalSizes: "2–3 kW homes",
    faqs: [
      {
        q: "What size solar system is best for a house in Sudama Nagar?",
        a: "For a typical family using 250–400 units a month, a 3 kW system is the best fit. It uses about 270 sq ft of roof and receives the maximum ₹78,000 subsidy.",
      },
    ],
  },
  {
    slug: "rajendra-nagar-indore",
    name: "Rajendra Nagar",
    kind: "locality",
    lat: 22.676,
    lng: 75.833,
    character: "A residential area on the Indore–Rau corridor with independent houses and new colonies.",
    roofs: "Open surroundings and good solar access; dust from nearby construction makes a regular cleaning plan important.",
    recommendation: "3–5 kW systems with a cleaning schedule every two to three weeks in the dry months.",
    landmarks: ["AB Road (Rau side)", "Rau", "Bijalpur"],
    typicalSizes: "3–5 kW homes",
    faqs: [
      {
        q: "How often should I clean solar panels in Rajendra Nagar?",
        a: "Every two to three weeks from February to June, when dust is heaviest; monsoon rain does much of the work from July to September. Use soft water and a soft brush — never abrasive powders.",
      },
    ],
  },
  {
    slug: "silicon-city-indore",
    name: "Silicon City",
    kind: "township",
    lat: 22.654,
    lng: 75.835,
    character: "A planned township on the Indore–Rau side with independent houses and gated communities.",
    roofs: "Consistent, modern roofs and wide spacing between houses make it one of the easiest areas for rooftop solar.",
    recommendation: "3–5 kW for houses; township-level systems for street lighting, pumps and clubhouses.",
    landmarks: ["Rau", "Rajendra Nagar", "IIM Indore road"],
    typicalSizes: "3–5 kW homes",
    faqs: [
      {
        q: "Can our township install solar for street lights and water pumps?",
        a: "Yes. A society or township can install a system on common buildings for common loads. Registered housing societies/RWAs are eligible for ₹18,000 per kW subsidy under PM Surya Ghar for common facilities.",
      },
    ],
  },
  {
    slug: "super-corridor-indore",
    name: "Super Corridor",
    kind: "locality",
    lat: 22.77,
    lng: 75.81,
    character: "Indore's IT and institutional corridor near the airport, with new townships, campuses and commercial plots.",
    roofs: "Large flat roofs on campuses and new buildings — well suited to high-capacity arrays.",
    recommendation: "25–100 kW commercial systems for campuses and offices; standard residential systems for the townships nearby.",
    landmarks: ["TCS and Infosys campuses", "Airport", "Lavkush Square"],
    typicalSizes: "25–100 kW commercial",
    faqs: [
      {
        q: "Do you install solar for offices and campuses on the Super Corridor?",
        a: "Yes. We design and install commercial rooftop and carport systems with remote monitoring, from 10 kW up to several hundred kW.",
      },
    ],
  },
  {
    slug: "rau-indore",
    name: "Rau",
    kind: "township",
    lat: 22.634,
    lng: 75.811,
    character: "A fast-growing town on Indore's southern edge, with residential colonies, institutions and industry heading towards Pithampur.",
    roofs: "Mixed — from new independent houses to industrial sheds; open surroundings give good sun access.",
    recommendation: "Residential 3–5 kW systems and industrial metal-roof systems for units along the Rau–Pithampur road.",
    landmarks: ["Rau Circle", "IIM Indore", "Rau–Pithampur Road"],
    typicalSizes: "3–5 kW homes · 25–200 kW industrial",
    faqs: [
      {
        q: "Is Rau covered by the same DISCOM as Indore city?",
        a: "Yes. Rau falls under MP Paschim Kshetra Vidyut Vitaran Company (West Discom), headquartered in Indore, so the net-metering process is the same.",
      },
    ],
  },
  {
    slug: "pithampur",
    name: "Pithampur",
    kind: "city",
    lat: 22.61,
    lng: 75.68,
    character:
      "One of Madhya Pradesh's largest industrial areas, with automobile, pharmaceutical, packaging and engineering units across its sectors and SEZ.",
    roofs: "Large industrial sheds with metal or asbestos-cement roofing, plus RCC office blocks.",
    recommendation:
      "Industrial rooftop systems of 50 kW and above, designed around roof strength, purlin spacing and daytime load. Asbestos roofs usually need a separate structure rather than direct mounting.",
    landmarks: ["Sector 1, 2 and 3", "Pithampur SEZ", "Sagore"],
    typicalSizes: "50–500 kW industrial",
    faqs: [
      {
        q: "Can solar be installed on an asbestos roof in Pithampur?",
        a: "Drilling into asbestos-cement sheets is not advisable. We design an independent steel structure that spans over the sheet and bears on the building's columns or ground, keeping the roof untouched.",
      },
      {
        q: "What returns can a Pithampur factory expect from rooftop solar?",
        a: "With industrial tariffs and strong daytime consumption, typical payback is 3–4 years. Accelerated depreciation on solar assets can shorten this further for profitable businesses.",
      },
    ],
  },
  {
    slug: "mhow",
    name: "Mhow (Dr. Ambedkar Nagar)",
    kind: "city",
    lat: 22.553,
    lng: 75.757,
    character: "A cantonment town south-west of Indore with independent homes, institutions and hospitality businesses.",
    roofs: "Older bungalows and new houses; many hotels and resorts on the way to Patalpani and Janapav have large roofs.",
    recommendation: "Residential systems for homes and 20–50 kW systems for hotels and institutions with daytime load.",
    landmarks: ["Mhow Cantonment", "Patalpani", "Simrol road"],
    typicalSizes: "3–5 kW homes · 20–50 kW hospitality",
    faqs: [
      {
        q: "Do you install solar in Mhow?",
        a: "Yes, Mhow is within our regular service area. Survey and service visits are scheduled along with our Rau and Rajendra Nagar route.",
      },
    ],
  },
  {
    slug: "dewas",
    name: "Dewas",
    kind: "city",
    lat: 22.966,
    lng: 76.053,
    character: "An industrial city north-east of Indore with residential areas and a large industrial estate.",
    roofs: "Industrial sheds in the industrial area and RCC roofs in residential colonies.",
    recommendation: "Industrial rooftop systems and 3–5 kW home systems.",
    landmarks: ["Dewas Industrial Area", "AB Road", "Mata Tekri"],
    typicalSizes: "3–5 kW homes · 50 kW+ industrial",
    faqs: [
      {
        q: "Does Dewas come under the same net-metering process as Indore?",
        a: "Yes. Dewas is served by MP West Discom, the same distribution company as Indore, so the application, inspection and net-meter process are the same.",
      },
    ],
  },
  {
    slug: "ujjain",
    name: "Ujjain",
    kind: "city",
    lat: 23.179,
    lng: 75.785,
    character: "A major city north of Indore with a large number of homes, hotels and dharmshalas serving pilgrims.",
    roofs: "Flat RCC roofs dominate; hospitality buildings have large daytime loads from ACs and lighting.",
    recommendation: "Home systems with subsidy and 20–100 kW systems for hotels and institutions.",
    landmarks: ["Mahakaleshwar", "Freeganj", "Nanakheda"],
    typicalSizes: "3–5 kW homes · 20–100 kW hospitality",
    faqs: [
      {
        q: "Do you install rooftop solar in Ujjain?",
        a: "Yes. Ujjain is within our service area, and it falls under the same MP West Discom net-metering process as Indore.",
      },
    ],
  },
];

export const areaBySlug = (slug: string) => areas.find((a) => a.slug === slug);

/** Approximate road distance from the Vijay Nagar office (haversine × 1.3 road factor). */
export function distanceFromOffice(a: Pick<Area, "lat" | "lng">) {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(a.lat - site.geo.lat);
  const dLng = toRad(a.lng - site.geo.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(site.geo.lat)) * Math.cos(toRad(a.lat)) * Math.sin(dLng / 2) ** 2;
  const km = 2 * R * Math.asin(Math.sqrt(h)) * 1.3;
  return Math.max(1, Math.round(km));
}
