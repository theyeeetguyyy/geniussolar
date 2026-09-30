import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // OG images read photos/fonts from disk at build time; keep raw originals and tooling out of server bundles.
  outputFileTracingExcludes: {
    "*": ["media-originals/**", "docs/**", "scripts/**", ".playwright-mcp/**", "public/media/**"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920, 2400],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: ["@react-three/drei", "motion"],
  },
  async redirects() {
    // Old static-site URLs → new pages (permanent, so link equity carries over).
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/hrefs/ongrid.html", destination: "/learn/on-grid-vs-off-grid-vs-hybrid-solar", permanent: true },
      { source: "/hrefs/offgrid.html", destination: "/services/hybrid-off-grid-solar-indore", permanent: true },
      { source: "/hrefs/Gallery.html", destination: "/projects", permanent: true },
      { source: "/hrefs/gallery.html", destination: "/projects", permanent: true },
      { source: "/gallery", destination: "/projects", permanent: true },
      { source: "/subsidy", destination: "/solar-subsidy-mp", permanent: true },
      { source: "/pm-surya-ghar", destination: "/solar-subsidy-mp", permanent: true },
      { source: "/calculator", destination: "/solar-calculator", permanent: true },
      { source: "/price", destination: "/solar-panel-price-indore", permanent: true },
      { source: "/blog", destination: "/learn", permanent: true },
      { source: "/blog/:slug", destination: "/learn/:slug", permanent: true },
    ];
  },
  async rewrites() {
    // Markdown mirrors for AI assistants: /learn/x.md → /md/learn/x
    return {
      beforeFiles: [
        { source: "/index.md", destination: "/md" },
        { source: "/:path(.*)\\.md", destination: "/md/:path" },
      ],
    };
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/(llms.txt|llms-full.txt)",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
