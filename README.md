# Genius Solar Services — geniussolarservices.com

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS 4 · Motion · React Three Fiber · TypeScript. Fully static — every route is prerendered at build time.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run lint
npm run typecheck
```

## Deploy on Vercel

1. Import the GitHub repo in Vercel (framework preset: Next.js, no settings needed).
2. Add the domain `geniussolarservices.com` (and `www`) under Project → Domains, then point DNS as Vercel instructs. The old GitHub Pages `CNAME` file was removed.
3. After the first deploy: submit `https://geniussolarservices.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Where to edit content

| What | File |
|---|---|
| Phone, address, hours, email, social links, stats, promises | `src/content/site.ts` |
| Prices, tariffs, subsidy rules, generation per kW | `src/lib/solar.ts` |
| Projects / case studies (each = a new page) | `src/content/projects.ts` + photos in `src/content/photos.ts` |
| Guides | `src/content/articles/*.ts` |
| FAQs | `src/content/faqs.ts` |
| Service areas | `src/content/areas.ts` |
| System sizes | `src/content/systems.ts` |
| Services / industries | `src/content/services.ts`, `src/content/industries.ts` |
| Page titles & descriptions | `src/content/registry.ts` |

### Adding a project

1. Put the original photos in `media-originals/…` and add them to the list in `scripts/process-images.mjs` with a descriptive, hyphenated file name (e.g. `5kw-elevated-solar-nipania-indore`).
2. Run `npm run images` — photos are resized, EXIF/GPS stripped and saved to `src/assets/photos/`.
3. Register them in `src/content/photos.ts` (alt text + caption), then add an entry to `src/content/projects.ts`.

The page, Open Graph card, sitemap entry, image schema and Markdown mirror are generated automatically.

## SEO & AI-search features

- Per-page metadata, canonical, hreflang (`en-IN`), unique Open Graph images (`opengraph-image.tsx` per route).
- JSON-LD graph: Organization, LocalBusiness, WebSite, WebPage (+ speakable), BreadcrumbList, FAQPage, Service, Product/AggregateOffer, Article, HowTo, ImageObject, DefinedTermSet, WebApplication, ItemList.
- `sitemap.xml` with image extensions, `robots.txt` open to search and AI crawlers.
- `/llms.txt`, `/llms-full.txt`, and a Markdown mirror of every page at `<url>.md` (e.g. `/solar-subsidy-mp.md`, `/index.md`).
- "In short" factual summaries on every major page; Q → A → table → example content structure.
- 301/308 redirects from the old static URLs (`/hrefs/*.html`).

See `docs/seo/keyword-map.md`, `docs/DESIGN_SYSTEM.md` and `docs/BUSINESS_FACTS_TO_VERIFY.md`.

## Enquiries

There is no backend. The quote form composes a WhatsApp message (or email) in the visitor's own app. The bill scanner in the calculator runs entirely in the browser (PDF.js for PDFs, Tesseract.js OCR for photos, both loaded on demand from jsDelivr).
