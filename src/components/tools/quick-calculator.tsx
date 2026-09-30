"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { estimate, formatINR, formatLakh, recommendSize, unitsFromBill, type Segment } from "@/lib/solar";
import { whatsappLink } from "@/content/site";
import { LiveNumber } from "@/components/ui/motion";
import { Icon } from "@/components/icons";
import { SavingsChart } from "./savings-chart";
import { cn } from "@/lib/utils";

const SEGMENTS: { id: Segment; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "society", label: "Society" },
  { id: "business", label: "Business" },
  { id: "industry", label: "Factory" },
];

const PRESETS: Record<Segment, number[]> = {
  home: [1500, 3000, 5000, 8000],
  society: [15000, 30000, 60000, 100000],
  business: [10000, 25000, 50000, 100000],
  industry: [50000, 100000, 250000, 500000],
};

const RANGE: Record<Segment, [number, number, number]> = {
  home: [500, 20000, 100],
  society: [5000, 300000, 1000],
  business: [3000, 300000, 500],
  industry: [20000, 1500000, 5000],
};

const fmtINR = (n: number) => formatINR(n);
const fmtLakh = (n: number) => formatLakh(n);
const fmt1 = (n: number) => n.toFixed(1);
const fmt0 = (n: number) => Math.round(n).toLocaleString("en-IN");

export function QuickCalculator({ compact = false }: { compact?: boolean }) {
  const [segment, setSegment] = useState<Segment>("home");
  const [bill, setBill] = useState(3000);
  const [elevated, setElevated] = useState(false);

  const [min, max, step] = RANGE[segment];
  const units = unitsFromBill(bill, segment);
  const rec = recommendSize(units);
  const est = useMemo(() => estimate({ kw: rec.kw, monthlyUnits: units, segment, elevated }), [rec.kw, units, segment, elevated]);
  const pct = ((bill - min) / (max - min)) * 100;

  const waText = `Hi Genius Solar, I used your calculator.\nMonthly bill: ${formatINR(bill)} (${segment})\nSuggested: ${est.kw} kW${elevated ? " (elevated structure)" : ""}\nEstimated savings: ${formatINR(est.monthlySavings)}/month\nPlease share an exact quote.`;

  return (
    <div className="grid overflow-hidden rounded-hero bg-white shadow-lift ring-1 ring-line lg:grid-cols-12">
      {/* Inputs */}
      <div className="relative p-6 sm:p-10 lg:col-span-5 lg:border-r lg:border-line">
        <div className="flex flex-wrap gap-1 rounded-full bg-stone-100 p-1" role="radiogroup" aria-label="Property type">
          {SEGMENTS.map((s) => (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={segment === s.id}
              onClick={() => {
                setSegment(s.id);
                setBill(PRESETS[s.id][1]);
              }}
              className={cn(
                "h-10 flex-1 rounded-full px-4 text-sm font-medium transition-all duration-300",
                segment === s.id ? "bg-white text-ink shadow-soft" : "text-graphite hover:text-ink",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <label htmlFor="qc-bill" className="mt-10 block label text-graphite">
          Your average monthly bill
        </label>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-4xl font-semibold text-graphite">₹</span>
          <input
            id="qc-bill"
            type="number"
            inputMode="numeric"
            min={min}
            max={max}
            value={bill}
            onChange={(e) => setBill(Math.max(0, Number(e.target.value) || 0))}
            className="w-full bg-transparent text-[clamp(3rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.05em] tabular outline-none"
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={Math.min(max, Math.max(min, bill))}
          onChange={(e) => setBill(Number(e.target.value))}
          aria-label="Monthly bill slider"
          className="range mt-6 w-full"
          style={{ ["--p" as string]: `${Math.min(100, Math.max(0, pct))}%` }}
        />
        <div className="mt-5 flex flex-wrap gap-2">
          {PRESETS[segment].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setBill(v)}
              className={cn(
                "h-9 rounded-full px-4 text-sm tabular ring-1 transition-colors",
                bill === v ? "bg-ink text-white ring-ink" : "bg-white text-ink-2 ring-line hover:ring-ink/30",
              )}
            >
              {formatINR(v)}
            </button>
          ))}
        </div>

        <label className="mt-8 flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-stone-50 p-4 ring-1 ring-line">
          <span>
            <span className="block font-medium">Elevated structure</span>
            <span className="block text-sm text-graphite">Keep the terrace usable underneath</span>
          </span>
          <input type="checkbox" checked={elevated} onChange={(e) => setElevated(e.target.checked)} className="peer sr-only" />
          <span className="relative h-7 w-12 shrink-0 rounded-full bg-stone-300 transition-colors peer-checked:bg-ink peer-focus-visible:ring-2 peer-focus-visible:ring-ink peer-focus-visible:ring-offset-2 after:absolute after:left-1 after:top-1 after:size-5 after:rounded-full after:bg-white after:transition-transform after:duration-300 peer-checked:after:translate-x-5" />
        </label>

        <p className="mt-6 text-sm text-graphite">
          ≈ <span className="tabular text-ink">{units.toLocaleString("en-IN")}</span> units/month at{" "}
          {segment === "home" || segment === "society" ? "₹7.5" : segment === "business" ? "₹9" : "₹8"} per unit.
        </p>
      </div>

      {/* Outputs */}
      <div className="p-6 sm:p-10 lg:col-span-7" aria-live="polite">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <p className="label text-graphite">Recommended system</p>
            <p className="mt-3 flex items-baseline gap-3">
              <span className="text-[clamp(3.5rem,7vw,6rem)] font-semibold leading-none tracking-[-0.06em]">
                <LiveNumber value={est.kw} format={fmt0} />
              </span>
              <span className="text-2xl font-medium text-graphite">kW</span>
              <span className="ml-2 text-sm text-graphite">
                {est.panels} panels · ~{est.roofSqft.toLocaleString("en-IN")} sq ft roof
              </span>
            </p>
          </div>
          <Stat label="You save every month" value={est.monthlySavings} format={fmtINR} accent />
          <Stat label="Payback period" value={est.paybackYears} format={fmt1} suffix="years" />
          <Stat
            label={est.subsidy ? `Cost after ${formatLakh(est.subsidy)} subsidy` : "Estimated system cost"}
            value={est.netCost}
            format={fmtLakh}
          />
          <Stat label="Savings over 25 years" value={est.lifetimeSavings} format={fmtLakh} />
        </div>

        {!compact ? <SavingsChart projection={est.projection} netCost={est.netCost} className="mt-10" /> : null}

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-graphite">
          <span className="flex items-center gap-2">
            <Icon.Leaf size={16} className="text-leaf" /> {est.co2TonnesPerYear} t CO₂ avoided / year
          </span>
          <span className="flex items-center gap-2">
            <Icon.Tree size={16} className="text-leaf" /> like planting {est.treesEquivalent.toLocaleString("en-IN")} trees
          </span>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-8">
          <Link
            href={`/solar-calculator?bill=${bill}&type=${segment}`}
            className="group inline-flex h-12 items-center gap-3 rounded-full bg-ink pl-5 pr-1.5 font-medium text-white"
          >
            Upload bill for exact numbers
            <span className="grid size-9 place-items-center rounded-full bg-sun text-ink transition-transform group-hover:-rotate-45">
              <Icon.ArrowRight size={18} />
            </span>
          </Link>
          <a
            href={whatsappLink(waText)}
            target="_blank"
            rel="noopener"
            className="inline-flex h-12 items-center gap-2 rounded-full px-5 font-medium text-ink ring-1 ring-line-strong transition-colors hover:bg-stone-50"
          >
            <Icon.WhatsApp size={18} /> Send this estimate
          </a>
        </div>
        <p className="mt-5 text-xs text-mute">
          Estimates use Indore&apos;s average generation (~4 units/kW/day), current PM Surya Ghar subsidy and indicative prices. Your
          quote is based on a free site survey.
        </p>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  format,
  suffix,
  accent,
}: {
  label: string;
  value: number;
  format: (n: number) => string;
  suffix?: string;
  accent?: boolean;
}) {
  return (
    <div className="border-t border-line pt-4">
      <p className="text-sm text-graphite">{label}</p>
      <p className={cn("mt-2 text-[2rem] font-semibold leading-none tracking-[-0.04em]", accent && "text-sun-ink")}>
        <LiveNumber value={value} format={format} />
        {suffix ? <span className="ml-1.5 text-base font-medium tracking-normal text-graphite">{suffix}</span> : null}
      </p>
    </div>
  );
}
