/**
 * Solar maths for Indore. Pure functions shared by server-rendered pages
 * (system-size pages, tables) and the client calculators, so the numbers a
 * crawler reads are the same numbers a visitor sees.
 *
 * Assumptions are deliberately conservative and documented in ASSUMPTIONS.
 */

export type Segment = "home" | "society" | "business" | "industry";

/**
 * Modelled AC output per kWp installed, per month, for a south-facing array
 * tilted ~20° in Indore (22.7° N), after typical Indian system losses (heat,
 * dust, wiring, inverter). Sums to ~1,459 kWh/kWp/year ≈ 4.0 units/kW/day.
 */
export const MONTHLY_YIELD_PER_KW = [127, 127, 148, 139, 142, 113, 88, 85, 109, 131, 126, 124] as const;
export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;
export const ANNUAL_YIELD_PER_KW = MONTHLY_YIELD_PER_KW.reduce((a, b) => a + b, 0);
export const DAILY_YIELD_PER_KW = ANNUAL_YIELD_PER_KW / 365;
export const AVG_MONTHLY_YIELD_PER_KW = ANNUAL_YIELD_PER_KW / 12;

export const ASSUMPTIONS = {
  tariff: { home: 7.5, society: 7.5, business: 9, industry: 8 } as Record<Segment, number>,
  /** Value of surplus units exported to the grid (₹/unit). Conservative. */
  exportRate: 3,
  tariffEscalation: 0.03,
  degradationPerYear: 0.005,
  years: 25,
  /** CEA CO₂ baseline database, weighted average grid emission factor (kg CO₂/kWh), rounded. */
  gridEmissionFactor: 0.71,
  /** Commonly cited annual CO₂ uptake of one mature tree (kg). */
  co2PerTreePerYear: 21,
  /** Shadow-free roof area needed per kW including walkway spacing (sq ft). */
  roofSqftPerKw: 90,
  moduleWatt: 545,
  fixedChargeHome: 150,
} as const;

/** Indicative turnkey price bands (₹ per kW) before subsidy. VERIFY with current price list. */
export const PRICE_PER_KW: Record<Segment, { low: number; high: number }[]> = {
  // DCR modules (mandatory for PM Surya Ghar subsidy), standard GI structure, net meter support.
  home: [
    { low: 68000, high: 78000 }, // up to 2 kW
    { low: 58000, high: 68000 }, // 3–5 kW
    { low: 52000, high: 60000 }, // 6–10 kW
    { low: 48000, high: 56000 }, // > 10 kW
  ],
  society: [
    { low: 58000, high: 68000 },
    { low: 52000, high: 60000 },
    { low: 48000, high: 56000 },
    { low: 45000, high: 52000 },
  ],
  business: [
    { low: 52000, high: 60000 },
    { low: 46000, high: 54000 },
    { low: 42000, high: 50000 },
    { low: 36000, high: 44000 },
  ],
  industry: [
    { low: 50000, high: 58000 },
    { low: 44000, high: 52000 },
    { low: 40000, high: 48000 },
    { low: 34000, high: 42000 },
  ],
};

/** Extra for a raised (elevated) structure that keeps the terrace usable. ₹ per kW. */
export const ELEVATED_STRUCTURE_PER_KW = { low: 8000, high: 15000 };

export const LOAN = {
  /** Collateral-free PM Surya Ghar loans for up to 3 kW are offered around repo + 0.5%. */
  subsidisedRate: 0.07,
  standardRate: 0.095,
  maxTenureYears: 10,
};

const priceBand = (kw: number) => (kw <= 2 ? 0 : kw <= 5 ? 1 : kw <= 10 ? 2 : 3);

export function priceRange(kw: number, segment: Segment = "home", elevated = false) {
  const band = PRICE_PER_KW[segment][priceBand(kw)];
  const extra = elevated ? ELEVATED_STRUCTURE_PER_KW : { low: 0, high: 0 };
  const low = Math.round(((band.low + extra.low) * kw) / 1000) * 1000;
  const high = Math.round(((band.high + extra.high) * kw) / 1000) * 1000;
  return { low, high, mid: Math.round((low + high) / 2 / 1000) * 1000 };
}

/** PM Surya Ghar: Muft Bijli Yojana central financial assistance. */
export function subsidyFor(kw: number, segment: Segment = "home") {
  if (segment === "home") {
    const firstTwo = Math.min(kw, 2) * 30000;
    const third = Math.max(0, Math.min(kw - 2, 1)) * 18000;
    return Math.min(78000, Math.round(firstTwo + third));
  }
  if (segment === "society") {
    // Group housing / RWA common facilities: ₹18,000 per kW up to 500 kW.
    return Math.round(Math.min(kw, 500) * 18000);
  }
  return 0;
}

export const STANDARD_SIZES = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20, 25, 30, 40, 50, 75, 100];

export function recommendSize(monthlyUnits: number, maxRoofSqft?: number) {
  const exact = monthlyUnits / AVG_MONTHLY_YIELD_PER_KW;
  let kw = STANDARD_SIZES.find((s) => s >= exact - 0.25) ?? Math.ceil(exact / 5) * 5;
  if (exact > 100) kw = Math.ceil(exact / 5) * 5;
  kw = Math.max(1, kw);
  if (maxRoofSqft && maxRoofSqft > 0) {
    const roofCap = Math.floor(maxRoofSqft / ASSUMPTIONS.roofSqftPerKw);
    if (roofCap >= 1 && roofCap < kw) return { kw: roofCap, exact, limitedByRoof: true };
  }
  return { kw, exact, limitedByRoof: false };
}

export function unitsFromBill(billRupees: number, segment: Segment = "home") {
  const fixed = segment === "home" ? ASSUMPTIONS.fixedChargeHome : 400;
  return Math.max(0, Math.round((billRupees - fixed) / ASSUMPTIONS.tariff[segment]));
}

export function emi(principal: number, annualRate: number, years: number) {
  const n = years * 12;
  const r = annualRate / 12;
  if (principal <= 0) return 0;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export interface Estimate {
  kw: number;
  panels: number;
  roofSqft: number;
  annualUnits: number;
  monthlyUnits: number[];
  dailyUnits: number;
  price: { low: number; high: number; mid: number };
  subsidy: number;
  netCost: number;
  monthlySavings: number;
  annualSavings: number;
  lifetimeSavings: number;
  paybackYears: number;
  co2TonnesPerYear: number;
  co2TonnesLifetime: number;
  treesEquivalent: number;
  billCoverage: number;
  emiMonthly: number;
  emiRate: number;
  projection: { year: number; savings: number; cumulative: number }[];
}

export interface EstimateInput {
  kw: number;
  monthlyUnits: number;
  segment?: Segment;
  tariff?: number;
  elevated?: boolean;
  loanYears?: number;
}

export function estimate({ kw, monthlyUnits, segment = "home", tariff, elevated = false, loanYears = 5 }: EstimateInput): Estimate {
  const a = ASSUMPTIONS;
  const rate = tariff ?? a.tariff[segment];
  const monthly = MONTHLY_YIELD_PER_KW.map((m) => Math.round(m * kw));
  const annualUnits = Math.round(ANNUAL_YIELD_PER_KW * kw);
  const annualConsumption = monthlyUnits * 12;

  const yearSavings = (year: number) => {
    const gen = annualUnits * Math.pow(1 - a.degradationPerYear, year - 1);
    const t = rate * Math.pow(1 + a.tariffEscalation, year - 1);
    const self = Math.min(gen, annualConsumption);
    const surplus = Math.max(0, gen - annualConsumption);
    return self * t + surplus * a.exportRate;
  };

  const price = priceRange(kw, segment, elevated);
  const subsidy = subsidyFor(kw, segment);
  const netCost = Math.max(0, price.mid - subsidy);

  const projection: Estimate["projection"] = [];
  let cumulative = 0;
  let paybackYears = 0;
  for (let y = 1; y <= a.years; y++) {
    const s = yearSavings(y);
    const before = cumulative;
    cumulative += s;
    if (!paybackYears && cumulative >= netCost) paybackYears = y - 1 + (netCost - before) / s;
    projection.push({ year: y, savings: Math.round(s), cumulative: Math.round(cumulative) });
  }

  const annualSavings = Math.round(yearSavings(1));
  const lifetimeUnits = projection.reduce((sum, _, i) => sum + annualUnits * Math.pow(1 - a.degradationPerYear, i), 0);
  const co2PerYear = (annualUnits * a.gridEmissionFactor) / 1000;
  const emiRate = segment === "home" && kw <= 3 ? LOAN.subsidisedRate : LOAN.standardRate;

  return {
    kw,
    panels: Math.ceil((kw * 1000) / a.moduleWatt),
    roofSqft: Math.round(kw * a.roofSqftPerKw),
    annualUnits,
    monthlyUnits: monthly,
    dailyUnits: +(annualUnits / 365).toFixed(1),
    price,
    subsidy,
    netCost,
    monthlySavings: Math.round(annualSavings / 12),
    annualSavings,
    lifetimeSavings: Math.round(cumulative),
    paybackYears: paybackYears ? +paybackYears.toFixed(1) : a.years,
    co2TonnesPerYear: +co2PerYear.toFixed(2),
    co2TonnesLifetime: +((lifetimeUnits * a.gridEmissionFactor) / 1000).toFixed(1),
    treesEquivalent: Math.round((co2PerYear * 1000) / a.co2PerTreePerYear),
    billCoverage: annualConsumption > 0 ? Math.min(1, annualUnits / annualConsumption) : 1,
    emiMonthly: Math.round(emi(price.mid, emiRate, loanYears)),
    emiRate,
    projection,
  };
}

/* ---------- Formatting ---------- */

const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

export const formatINR = (n: number) => `₹${inr.format(Math.round(n))}`;
export const formatNumber = (n: number) => inr.format(Math.round(n));

/** ₹1.85 lakh / ₹2.1 crore style, the way Indian customers read prices. */
export function formatLakh(n: number) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(n >= 1e8 ? 0 : 2).replace(/\.?0+$/, "")} crore`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2).replace(/\.?0+$/, "")} lakh`;
  return formatINR(n);
}

/* ---------- Sun position (for the hero scene HUD) ---------- */

const rad = Math.PI / 180;

/** Approximate solar elevation/azimuth (degrees) for a latitude, day-of-year and local solar hour. */
export function sunPosition(latDeg: number, dayOfYear: number, solarHour: number) {
  const decl = 23.44 * Math.sin(((360 / 365) * (dayOfYear - 81)) * rad);
  const hourAngle = (solarHour - 12) * 15;
  const lat = latDeg * rad;
  const d = decl * rad;
  const h = hourAngle * rad;
  const sinEl = Math.sin(lat) * Math.sin(d) + Math.cos(lat) * Math.cos(d) * Math.cos(h);
  const el = Math.asin(sinEl);
  const cosAz = (Math.sin(d) - Math.sin(el) * Math.sin(lat)) / (Math.cos(el) * Math.cos(lat));
  let az = Math.acos(Math.min(1, Math.max(-1, cosAz))) / rad;
  if (hourAngle > 0) az = 360 - az;
  return { elevation: el / rad, azimuth: az };
}

export function dayOfYear(date = new Date()) {
  const start = Date.UTC(date.getFullYear(), 0, 0);
  return Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - start) / 86400000);
}
