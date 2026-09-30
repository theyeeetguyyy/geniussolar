"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  ASSUMPTIONS,
  STANDARD_SIZES,
  estimate,
  formatINR,
  formatLakh,
  recommendSize,
  unitsFromBill,
  type Segment,
} from "@/lib/solar";
import type { ParsedBill } from "@/lib/bill-parser";
import { whatsappLink } from "@/content/site";
import { BillScanner } from "./bill-scanner";
import { SavingsChart } from "./savings-chart";
import { MonthlyChart } from "@/components/sections/monthly-chart";
import { LiveNumber } from "@/components/ui/motion";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

const SEGMENTS: { id: Segment; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "society", label: "Housing society" },
  { id: "business", label: "Shop / office" },
  { id: "industry", label: "Factory" },
];

const fmtINR = (n: number) => formatINR(n);
const fmtLakh = (n: number) => formatLakh(n);
const fmt1 = (n: number) => n.toFixed(1);
const fmt0 = (n: number) => Math.round(n).toLocaleString("en-IN");

export function FullCalculator() {
  const sp = useSearchParams();
  const initialSeg = (SEGMENTS.find((s) => s.id === sp.get("type"))?.id ?? "home") as Segment;
  const initialBill = Number(sp.get("bill")) || 0;

  const [segment, setSegment] = useState<Segment>(initialSeg);
  const [mode, setMode] = useState<"units" | "bill">(initialBill ? "bill" : "units");
  const [units, setUnits] = useState(initialBill ? unitsFromBill(initialBill, initialSeg) : 350);
  const [bill, setBill] = useState(initialBill || 3000);
  const [tariff, setTariff] = useState<number>(ASSUMPTIONS.tariff[initialSeg]);
  const [roof, setRoof] = useState<number>(0);
  const [elevated, setElevated] = useState(false);
  const [override, setOverride] = useState<number | null>(null);
  const [loanYears, setLoanYears] = useState(5);
  const [scan, setScan] = useState<ParsedBill | null>(null);

  const monthlyUnits = mode === "units" ? units : unitsFromBill(bill, segment);
  const rec = recommendSize(monthlyUnits, roof || undefined);
  const kw = override ?? rec.kw;
  const e = useMemo(
    () => estimate({ kw, monthlyUnits, segment, tariff, elevated, loanYears }),
    [kw, monthlyUnits, segment, tariff, elevated, loanYears],
  );

  const onScan = useCallback((r: ParsedBill) => {
    setScan(r);
    if (r.units) {
      setMode("units");
      setUnits(r.units);
    } else if (r.amount) {
      setMode("bill");
      setBill(r.amount);
    }
    if (r.category && /non|LV2|LV-2/i.test(r.category)) setSegment("business");
    setOverride(null);
  }, []);

  const summary = [
    `Hi Genius Solar, here is my solar estimate from your website:`,
    `Property: ${SEGMENTS.find((s) => s.id === segment)?.label}`,
    `Monthly consumption: ${monthlyUnits} units`,
    scan?.consumerNo ? `Consumer no.: ${scan.consumerNo}` : "",
    scan?.sanctionedLoad ? `Sanctioned load: ${scan.sanctionedLoad} kW` : "",
    `Suggested system: ${kw} kW${elevated ? " (elevated structure)" : ""}`,
    `Estimated savings: ${formatINR(e.monthlySavings)}/month, payback ~${e.paybackYears} years`,
    `Please share an exact quote and survey slot.`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Inputs */}
      <div className="space-y-6 lg:col-span-5">
        <div>
          <p className="label mb-3 flex items-center gap-2 text-graphite">
            <span className="grid size-6 place-items-center rounded-full bg-ink text-[0.65rem] text-white">1</span> Scan your bill (optional)
          </p>
          <BillScanner onResult={onScan} />
          <AnimatePresence>
            {scan && (scan.units || scan.amount) ? (
              <motion.dl
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 grid grid-cols-2 gap-3 overflow-hidden rounded-2xl bg-sun-wash p-4 text-sm ring-1 ring-sun/20"
              >
                {scan.units ? (
                  <div>
                    <dt className="label text-graphite">Units found</dt>
                    <dd className="mt-1 text-lg font-semibold tabular">{scan.units}</dd>
                  </div>
                ) : null}
                {scan.amount ? (
                  <div>
                    <dt className="label text-graphite">Amount found</dt>
                    <dd className="mt-1 text-lg font-semibold tabular">{formatINR(scan.amount)}</dd>
                  </div>
                ) : null}
                {scan.sanctionedLoad ? (
                  <div>
                    <dt className="label text-graphite">Sanctioned load</dt>
                    <dd className="mt-1 font-semibold tabular">{scan.sanctionedLoad} kW</dd>
                  </div>
                ) : null}
                {scan.category ? (
                  <div>
                    <dt className="label text-graphite">Category</dt>
                    <dd className="mt-1 font-semibold">{scan.category}</dd>
                  </div>
                ) : null}
              </motion.dl>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="rounded-panel bg-white p-6 ring-1 ring-line sm:p-8">
          <p className="label mb-5 flex items-center gap-2 text-graphite">
            <span className="grid size-6 place-items-center rounded-full bg-ink text-[0.65rem] text-white">2</span> Confirm the details
          </p>

          <fieldset>
            <legend className="sr-only">Property type</legend>
            <div className="grid grid-cols-2 gap-2">
              {SEGMENTS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={segment === s.id}
                  onClick={() => {
                    setSegment(s.id);
                    setTariff(ASSUMPTIONS.tariff[s.id]);
                    setOverride(null);
                  }}
                  className={cn(
                    "h-11 rounded-xl text-sm font-medium ring-1 transition-colors",
                    segment === s.id ? "bg-ink text-white ring-ink" : "bg-white text-ink-2 ring-line hover:ring-ink/25",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-8 flex rounded-full bg-stone-100 p-1 text-sm">
            {(["units", "bill"] as const).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
                className={cn("h-9 flex-1 rounded-full font-medium transition-all", mode === m ? "bg-white shadow-soft" : "text-graphite")}
              >
                {m === "units" ? "I know my units" : "I know my bill amount"}
              </button>
            ))}
          </div>

          {mode === "units" ? (
            <Field label="Average units per month" suffix="kWh" value={units} onChange={setUnits} min={30} max={segment === "industry" ? 200000 : 20000} />
          ) : (
            <Field label="Average monthly bill" prefix="₹" value={bill} onChange={setBill} min={300} max={2000000} />
          )}

          <details className="mt-6 group">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-ink-2">
              Fine-tune (tariff, roof, loan)
              <Icon.ChevronDown size={16} className="transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-4 space-y-5">
              <Field label="Energy rate" prefix="₹" suffix="/unit" value={tariff} onChange={setTariff} min={3} max={15} step={0.1} />
              <Field label="Shadow-free roof area (optional)" suffix="sq ft" value={roof} onChange={setRoof} min={0} max={200000} />
              <label className="block">
                <span className="label text-graphite">Loan tenure</span>
                <select
                  value={loanYears}
                  onChange={(ev) => setLoanYears(Number(ev.target.value))}
                  className="mt-2 h-12 w-full rounded-xl bg-white px-3 ring-1 ring-line"
                >
                  {[3, 5, 7, 10].map((y) => (
                    <option key={y} value={y}>
                      {y} years
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </details>

          <label className="mt-6 flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-stone-50 p-4 ring-1 ring-line">
            <span>
              <span className="block font-medium">Elevated structure</span>
              <span className="block text-sm text-graphite">Keeps the terrace usable (+₹8–15k/kW)</span>
            </span>
            <input type="checkbox" checked={elevated} onChange={(ev) => setElevated(ev.target.checked)} className="peer sr-only" />
            <span className="relative h-7 w-12 shrink-0 rounded-full bg-stone-300 transition-colors peer-checked:bg-ink peer-focus-visible:ring-2 peer-focus-visible:ring-ink after:absolute after:left-1 after:top-1 after:size-5 after:rounded-full after:bg-white after:transition-transform after:duration-300 peer-checked:after:translate-x-5" />
          </label>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-7" aria-live="polite">
        <div className="sticky top-24 overflow-hidden rounded-hero bg-ink text-white shadow-lift">
          <div className="relative p-6 sm:p-10">
            <div aria-hidden="true" className="absolute -right-24 -top-24 size-72 rounded-full sun-glow" />
            <p className="label relative flex items-center gap-2 text-white/60">
              <span className="grid size-6 place-items-center rounded-full bg-sun text-[0.65rem] text-ink">3</span> Your solar plan
            </p>
            <div className="relative mt-6 flex flex-wrap items-end gap-x-6 gap-y-3">
              <p className="text-[clamp(4rem,9vw,7rem)] font-semibold leading-none tracking-[-0.06em]">
                <LiveNumber value={kw} format={fmt0} />
                <span className="ml-2 text-3xl font-medium text-white/60">kW</span>
              </p>
              <div className="pb-3 text-sm text-white/70">
                <p>
                  {e.panels} panels · ~{e.roofSqft.toLocaleString("en-IN")} sq ft
                </p>
                <p>~{e.dailyUnits} units/day · {e.annualUnits.toLocaleString("en-IN")} units/year</p>
                {rec.limitedByRoof ? <p className="text-sun">Limited by roof area</p> : null}
              </div>
            </div>
            <div className="relative mt-6 flex flex-wrap items-center gap-2">
              <span className="label text-white/50">Try another size</span>
              {STANDARD_SIZES.filter((s) => Math.abs(s - rec.kw) <= (rec.kw > 20 ? 20 : 2) && s > 0)
                .slice(0, 6)
                .map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setOverride(s === rec.kw ? null : s)}
                    className={cn(
                      "h-8 rounded-full px-3 text-sm tabular ring-1 transition-colors",
                      s === kw ? "bg-sun text-ink ring-sun" : "text-white/80 ring-white/20 hover:bg-white/10",
                    )}
                  >
                    {s} kW
                  </button>
                ))}
            </div>
          </div>

          <dl className="grid grid-cols-2 border-t border-white/10 sm:grid-cols-3">
            <Out k="Saves per month" v={e.monthlySavings} f={fmtINR} accent />
            <Out k="Payback" v={e.paybackYears} f={fmt1} suffix="yrs" />
            <Out k="25-year savings" v={e.lifetimeSavings} f={fmtLakh} />
            <Out k="System price" v={e.price.mid} f={fmtLakh} />
            <Out k={e.subsidy ? "Subsidy" : "Subsidy (n/a)"} v={e.subsidy} f={fmtINR} />
            <Out k="You pay" v={e.netCost} f={fmtLakh} />
            <Out k={`EMI · ${(e.emiRate * 100).toFixed(1)}% · ${loanYears} yrs`} v={e.emiMonthly} f={fmtINR} />
            <Out k="CO₂ avoided / yr" v={e.co2TonnesPerYear} f={fmt1} suffix="t" />
            <Out k="Trees equivalent" v={e.treesEquivalent} f={fmt0} />
          </dl>

          <div className="border-t border-white/10 bg-white p-6 text-ink sm:p-10">
            <p className="label text-graphite">Cumulative savings vs cost</p>
            <SavingsChart projection={e.projection} netCost={e.netCost} className="mt-4" />
            <p className="label mt-10 text-graphite">Monthly generation in Indore</p>
            <MonthlyChart kw={kw} className="mt-4" />
            <p className="mt-6 text-sm text-graphite">
              Covers about <strong className="text-ink">{Math.round(e.billCoverage * 100)}%</strong> of your yearly consumption. EMI is on the full
              price; the subsidy arrives after commissioning and can prepay the loan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappLink(summary)}
                target="_blank"
                rel="noopener"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-sun px-6 font-semibold text-ink shadow-sun"
              >
                <Icon.WhatsApp size={18} /> Send this plan on WhatsApp
              </a>
              <Link href="/contact" className="inline-flex h-12 items-center gap-2 rounded-full px-6 font-medium ring-1 ring-line-strong">
                Book a free survey <Icon.ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="mt-6 block">
      <span className="label text-graphite">{label}</span>
      <span className="mt-2 flex items-center gap-2 rounded-xl bg-white px-4 ring-1 ring-line focus-within:ring-2 focus-within:ring-ink">
        {prefix ? <span className="text-graphite">{prefix}</span> : null}
        <input
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(ev) => onChange(Math.min(max, Math.max(0, Number(ev.target.value) || 0)))}
          className="h-14 w-full bg-transparent text-2xl font-semibold tabular outline-none"
        />
        {suffix ? <span className="shrink-0 text-sm text-graphite">{suffix}</span> : null}
      </span>
    </label>
  );
}

function Out({ k, v, f, suffix, accent }: { k: string; v: number; f: (n: number) => string; suffix?: string; accent?: boolean }) {
  return (
    <div className="border-b border-r border-white/10 p-5 sm:p-6">
      <dt className="text-xs text-white/55">{k}</dt>
      <dd className={cn("mt-2 text-2xl font-semibold tracking-[-0.03em]", accent && "text-sun")}>
        <LiveNumber value={v} format={f} />
        {suffix ? <span className="ml-1 text-sm font-medium text-white/60">{suffix}</span> : null}
      </dd>
    </div>
  );
}
