# Facts to verify before launch

Everything the site states about the business lives in `src/content/site.ts`, prices and maths in `src/lib/solar.ts`, and projects in `src/content/projects.ts`. Please confirm or correct each item.

## Business details (`src/content/site.ts`)

- [ ] **Business hours** — currently "Mon–Sat, 10:00 am – 7:00 pm" (not on the old site; assumed).
- [ ] **Years of experience** — site says "20+ years" (poster says 20 yrs customer service; old site said 25+ yrs in water purifiers).
- [ ] **Founding year** of the solar business (`foundingYear`, currently hidden).
- [ ] **Stats** — installations completed, total kW installed, Google rating and review count. Hidden until filled; never publish estimates.
- [ ] **Social profiles** — Instagram, Facebook, YouTube, LinkedIn URLs (empty = hidden).
- [ ] **Service area** — Indore, Mhow, Rau, Pithampur, Sanwer, Dewas, Ujjain, Dhar. Remove any you don't serve.
- [ ] **Brands** — Adani Solar, Vikram Solar, Havells, Luminous, Polycab.
- [ ] **Award** — "Madhya Pradesh Annual Solar Awards 2025, Global Solar Expo Indore (17–18 Dec 2025)". Add the award category name if you have it.

## Prices and assumptions (`src/lib/solar.ts`)

- [ ] Per-kW price bands for home (DCR), society, business and industry.
- [ ] Elevated structure premium (₹8,000–₹15,000 per kW).
- [ ] Default tariffs used for savings (₹7.5 home, ₹9 business, ₹8 industry).
- [ ] Loan rates (7% up to 3 kW, 9.5% otherwise).

## Promises the copy makes — confirm you're happy to stand behind them

- [ ] 5 years free service; periodic service visits.
- [ ] Warranty claims handled on the customer's behalf.
- [ ] DISCOM inspection coordinated by you; subsidy filed and followed up by you.
- [ ] Complaint / service phone line.
- [ ] Hot-dip / galvanised structures on concrete pedestals with bracing as standard for elevated arrays.

## Projects (`src/content/projects.ts`)

- [ ] Capacity (kW), panel and inverter models for each project (currently hidden where unknown).
- [ ] Customer permission to show their photos (most were on the old site).
- [ ] Locality for projects listed as just "Indore".

## Testimonials (`src/content/testimonials.ts`)

- [ ] The three quotes are copied from the old site (Dr. Anil Malviya, Mr. Hemant Agrawal, Mr. Vivek Mandil). Add more real ones with permission — Google reviews are best.
