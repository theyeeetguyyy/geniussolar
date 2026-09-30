import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { JsonLd } from "@/components/seo/json-ld";
import { graph, organizationSchema, localBusinessSchema, websiteSchema, founderSchema } from "@/lib/schema";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Solar Panel Company in Indore | Genius Solar Services",
    template: "%s | Genius Solar Services",
  },
  description:
    "Rooftop solar installation in Indore for homes, housing societies and businesses. PM Surya Ghar subsidy up to ₹78,000, net metering, elevated structures and 5 years free service.",
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Solar energy",
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: { siteName: site.name, locale: site.locale, type: "website" },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  other: {
    "geo.region": "IN-MP",
    "geo.placename": "Indore",
    "geo.position": `${site.geo.lat};${site.geo.lng}`,
    ICBM: `${site.geo.lat}, ${site.geo.lng}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#fbfaf7",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`} data-scroll-behavior="smooth">
      <body className="min-h-dvh overflow-x-clip bg-paper">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingActions />
        <JsonLd data={graph(organizationSchema(), localBusinessSchema(), websiteSchema(), founderSchema())} />
      </body>
    </html>
  );
}
