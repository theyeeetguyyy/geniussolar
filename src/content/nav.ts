import type { IconName } from "@/components/icons";

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  icon?: IconName;
}

export interface NavGroup {
  label: string;
  href?: string;
  columns?: { title: string; links: NavLink[] }[];
  feature?: { title: string; body: string; href: string; cta: string };
}

export const mainNav: NavGroup[] = [
  {
    label: "Solutions",
    columns: [
      {
        title: "Who it's for",
        links: [
          { label: "Homes", href: "/residential-solar-indore", description: "1–15 kW rooftop systems with ₹78,000 subsidy", icon: "Home" },
          { label: "Housing societies", href: "/housing-society-solar-indore", description: "Common-area solar with ₹18,000/kW subsidy", icon: "Society" },
          { label: "Business & industry", href: "/commercial-solar-indore", description: "Factories, offices, schools, hospitals", icon: "Factory" },
        ],
      },
      {
        title: "Services",
        links: [
          { label: "Rooftop installation", href: "/services/rooftop-solar-installation-indore", icon: "Panel" },
          { label: "Elevated structures", href: "/services/elevated-solar-structure-indore", icon: "Hammer" },
          { label: "Battery backup (hybrid)", href: "/services/hybrid-off-grid-solar-indore", icon: "Battery" },
          { label: "Cleaning & maintenance", href: "/services/solar-panel-cleaning-maintenance-indore", icon: "Drop" },
          { label: "All services", href: "/services", icon: "ArrowRight" },
        ],
      },
    ],
    feature: {
      title: "PM Surya Ghar subsidy",
      body: "Up to ₹78,000 back on a home system. We file the paperwork end to end.",
      href: "/solar-subsidy-mp",
      cta: "Read the guide",
    },
  },
  {
    label: "Tools",
    columns: [
      {
        title: "Plan your system",
        links: [
          { label: "Savings calculator", href: "/solar-calculator", description: "Upload your bill, get a system size and payback", icon: "Scan" },
          { label: "Roof suitability check", href: "/roof-suitability-check", description: "Five questions, instant verdict", icon: "Compass" },
          { label: "Price by system size", href: "/solar-systems", description: "1 kW to 100 kW, after subsidy", icon: "Rupee" },
          { label: "Net metering, visualised", href: "/net-metering-indore", description: "How your meter runs backwards", icon: "Meter" },
        ],
      },
    ],
    feature: {
      title: "Your bill, decoded",
      body: "Drop a photo or PDF of your MPPKVVCL bill. It is read on your device — never uploaded.",
      href: "/solar-calculator",
      cta: "Try it",
    },
  },
  { label: "Projects", href: "/projects" },
  {
    label: "Learn",
    columns: [
      {
        title: "Guides",
        links: [
          { label: "Solar panel price in Indore", href: "/solar-panel-price-indore" },
          { label: "PM Surya Ghar subsidy (MP)", href: "/solar-subsidy-mp" },
          { label: "Net metering in Indore", href: "/net-metering-indore" },
          { label: "On-grid vs off-grid vs hybrid", href: "/learn/on-grid-vs-off-grid-vs-hybrid-solar" },
          { label: "How much solar do I need?", href: "/learn/how-much-solar-do-i-need" },
          { label: "All guides", href: "/learn" },
        ],
      },
      {
        title: "Reference",
        links: [
          { label: "FAQ", href: "/faq" },
          { label: "Solar glossary", href: "/solar-glossary" },
          { label: "Areas we serve", href: "/solar-installation" },
        ],
      },
    ],
  },
  { label: "About", href: "/about" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Solutions",
    links: [
      { label: "Residential solar", href: "/residential-solar-indore" },
      { label: "Housing society solar", href: "/housing-society-solar-indore" },
      { label: "Commercial & industrial", href: "/commercial-solar-indore" },
      { label: "All services", href: "/services" },
      { label: "Projects", href: "/projects" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "Savings calculator", href: "/solar-calculator" },
      { label: "Roof suitability check", href: "/roof-suitability-check" },
      { label: "System sizes & prices", href: "/solar-systems" },
      { label: "Net metering visualiser", href: "/net-metering-indore" },
    ],
  },
  {
    title: "Guides",
    links: [
      { label: "Solar panel price in Indore", href: "/solar-panel-price-indore" },
      { label: "PM Surya Ghar subsidy", href: "/solar-subsidy-mp" },
      { label: "All guides", href: "/learn" },
      { label: "FAQ", href: "/faq" },
      { label: "Glossary", href: "/solar-glossary" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Areas we serve", href: "/solar-installation" },
      { label: "Privacy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];
