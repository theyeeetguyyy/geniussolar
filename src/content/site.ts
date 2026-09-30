/**
 * Single source of truth for business facts. Everything that renders NAP
 * (name, address, phone), schema.org data, llms.txt and the footer reads from here.
 *
 * Values marked VERIFY came from the old site / marketing posters and should be
 * confirmed by the owner before launch. Values set to `null` are hidden on the
 * site until filled in — never publish invented numbers.
 */
export const site = {
  name: "Genius Solar Services",
  shortName: "Genius Solar",
  tagline: "Let the Sun pay your Bills!",
  url: "https://geniussolarservices.com",
  locale: "en_IN",
  language: "en-IN",
  foundingYear: null as number | null, // VERIFY: year the solar business started
  legacyYears: 20, // "20 साल का कस्टमर सर्विस का अनुभव" (poster). Old site said 25+ in water purifiers.
  founder: {
    name: "Dhirendra Bandil",
    role: "Proprietor",
  },
  email: "geniussolarservices@gmail.com",
  phones: [
    { label: "Mobile", display: "+91 98267 12299", e164: "+919826712299" },
    { label: "Mobile", display: "+91 78288 12299", e164: "+917828812299" },
    { label: "Landline", display: "0731 400 4499", e164: "+917314004499" },
  ],
  whatsapp: "919826712299",
  address: {
    line1: "G-1, Swarna Palace, Plot No. 1108",
    line2: "Scheme No. 114, Part 1, Vijay Nagar",
    landmark: "Near MP Gramin Bank",
    locality: "Vijay Nagar",
    city: "Indore",
    region: "Madhya Pradesh",
    regionCode: "MP",
    postalCode: "452010",
    country: "IN",
  },
  geo: { lat: 22.768016, lng: 75.896563 },
  maps: {
    url: "https://maps.google.com/?cid=7477678490696461002",
    embed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d919.7333743786323!2d75.89592842847983!3d22.767849135310925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396303744bf03fcd%3A0x67c60cf8068aaaca!2sGenius%20solar%20services%20Best%20solar%20plant%20company!5e0!3m2!1sen!2sin!4v1733283096317!5m2!1sen!2sin",
  },
  // VERIFY: business hours were not listed anywhere on the old site.
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "19:00" },
  ],
  hoursLabel: "Mon – Sat · 10:00 am – 7:00 pm",
  social: {
    // VERIFY: add real profile URLs; empty values are skipped everywhere.
    googleBusiness: "https://maps.google.com/?cid=7477678490696461002",
    instagram: "",
    facebook: "",
    youtube: "",
    linkedin: "",
  },
  partners: [
    { name: "Adani Solar", kind: "Modules" },
    { name: "Vikram Solar", kind: "Modules" },
    { name: "Havells", kind: "Inverters" },
    { name: "Luminous", kind: "Inverters & modules" },
    { name: "Polycab", kind: "Cables & inverters" },
  ],
  promises: {
    panelWarrantyYears: 30,
    inverterWarrantyYears: 10,
    freeServiceYears: 5,
  },
  /** Leave null until real, countable numbers are available. */
  stats: {
    installationsCompleted: null as number | null,
    kWInstalled: null as number | null,
    googleRating: null as number | null,
    googleReviewCount: null as number | null,
  },
  award: {
    title: "Madhya Pradesh Annual Solar Awards 2025",
    event: "Global Solar Expo, Indore",
    venue: "Sheraton Grand Palace, Indore",
    date: "2025-12-17",
  },
  serviceArea: [
    "Indore",
    "Mhow (Dr. Ambedkar Nagar)",
    "Rau",
    "Pithampur",
    "Sanwer",
    "Dewas",
    "Ujjain",
    "Dhar",
  ],
} as const;

export const primaryPhone = site.phones[0];

export function whatsappLink(message?: string) {
  const text = message ?? "Hi Genius Solar, I'd like a free solar quote for my property in Indore.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const telLink = (e164: string = primaryPhone.e164) => `tel:${e164}`;

export const fullAddress = [
  site.address.line1,
  site.address.line2,
  site.address.landmark,
  `${site.address.city}, ${site.address.region} ${site.address.postalCode}`,
].join(", ");
