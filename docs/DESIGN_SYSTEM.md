# Design system — Genius Solar

**Direction:** an architectural studio that happens to build solar. Warm paper, charcoal ink, one solar-gold accent. Engineering precision (mono labels, spec sheets, live data) meets editorial warmth (big type, serif italic accents, real photos of real rooftops).

## Colour (tokens in `src/app/globals.css` → `@theme`)

| Token | Hex | Use |
|---|---|---|
| `paper` | `#fbfaf7` | Page background |
| `white` | `#ffffff` | Cards, surfaces |
| `stone-50…400` | `#f7f5f0 → #b3ac9d` | Quiet surfaces, dividers |
| `ink` / `ink-2` | `#111315` / `#25282c` | Text, dark panels |
| `graphite` | `#585c62` | Secondary text (AA on paper) |
| `mute` | `#7d8187` | Captions, large text only |
| `sun` / `sun-bright` | `#f5a300` / `#ffb81c` | Accent fills, buttons, data |
| `sun-ink` | `#8a5600` | Gold **text** (AA contrast) |
| `sun-soft` / `sun-wash` | `#ffeec7` / `#fff8e8` | Highlights |
| `leaf` | `#2d7a4c` | CO₂ / export only |

Light theme only. No saturated blue.

## Type

- **Geist** — UI and display. Display sizes use tight tracking (−0.045 to −0.05em).
- **Instrument Serif Italic** — one or two accent words per heading, wrapped in `*asterisks*` in copy.
- **Geist Mono** — labels, specs, data (`.label` utility: 0.72rem, 0.12em tracking, uppercase).
- Scale: `text-display-xl`, `text-display`, `text-h2`, `text-h3`, `text-lead` (fluid `clamp()`).

## Space & shape

8px rhythm (Tailwind steps of 2). Sections `section-y` (96px → 160px). Radii: card 20px, panel 28px, hero 36px, pills full. Shadows `shadow-soft`, `shadow-lift`, `shadow-sun`.

## Motion

- Ease `--ease-sun` = cubic-bezier(0.22, 1, 0.36, 1). Durations 0.5–1.2s for reveals, 0.3s for hovers.
- **Zero-JS reveals** via CSS scroll-driven animations (`.reveal`, `.split-view`, `.ink-scroll`, `.spine-fill`); browsers without support just show content.
- **Motion (framer)** for choreography: pinned bill story, horizontal project reel, magnetic buttons, spotlight cards, live numbers, lightbox, menus.
- **3D (React Three Fiber)**: procedural hero rooftop (sun position from real solar geometry for Indore, live kW output HUD, energy particles, engineering callouts) and an exploded 7-layer module. Lazy-loaded after idle, paused off-screen, low-quality tier for phones.
- `prefers-reduced-motion` disables smooth scroll, auto-animation, parallax and pinned sequences.

## Components (`src/components`)

`ui/button` (rolling label + icon bubble), `ui/motion` (Reveal, Counter, LiveNumber, Magnetic, SpotlightCard), `ui/section` (SplitText, Eyebrow, SectionHeader, Spec), `sections/*` (PageHero, GuidePage, Prose, FaqList, Process, ServiceMap, RelatedLinks, CtaQuote, PhotoStrip, MonthlyChart), `tools/*` (QuickCalculator, FullCalculator, BillScanner, RoiCalculator, SubsidyEstimator, RoofQuiz, NetMeterVisualizer, LeadForm), `gallery/*` (PortfolioGallery, Lightbox, SiteFilm), `icons.tsx` (custom 24px outline set).
