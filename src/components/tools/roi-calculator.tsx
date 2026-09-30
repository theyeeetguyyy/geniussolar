"use client";

import { useMemo, useState } from "react";
import { estimate, formatINR, formatLakh, recommendSize, type Segment } from "@/lib/solar";
import { LiveNumber } from "@/components/ui/motion";
import { SavingsChart } from "./savings-chart";
import { cn } from "@/lib/utils";

const fmtLakh = (n: number) => formatLakh(n);
const fmtINR = (n: number) => formatINR(n);
const fmt1 = (n: number) => n.toFixed(1);
const fmt0 = (n: number) => Math.round(n).toLocaleString("en-IN");

/** Commercial ROI: daytime units + tariff → size, capex, savings, payback. */
export function RoiCalculator() {
  const [units, setUnits] = useState(12000);
  const [tariff, setTariff] = useState(9);
  const [seg, setSeg] = useState<Segment>("business");
  const size = recommendSize(units).kw;
  const e = useMemo(() => estimate({ kw: size, monthlyUnits: units, segment: seg, tariff }), [size, units, seg, tariff]);
  return (
    <div className="container-x">
      <div className="grid overflow-hidden rounded-hero bg-white shadow-lift ring-1 ring-line lg:grid-cols-12">
        <div className="space-y-8 p-6 sm:p-10 lg:col-span-5 lg:border-r lg:border-line">
          <p className="label text-graphite">Commercial ROI</p>
          <div className="inline-flex rounded-full bg-stone-100 p-1">
            {(["business", "industry"] as const).map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={seg === s}
                onClick={() => {
                  setSeg(s);
                  setTariff(s === "business" ? 9 : 8);
                }}
                className={cn("h-10 rounded-full px-5 text-sm font-medium", seg === s ? "bg-white shadow-soft" : "text-graphite")}
              >
                {s === "business" ? "Commercial" : "Industrial"}
              </button>
            ))}
          </div>
          <div>
            <label htmlFor="roi-units" className="label text-graphite">
              Daytime units per month
            </label>
            <p className="mt-2 text-5xl font-semibold tracking-[-0.05em] tabular">{units.toLocaleString("en-IN")}</p>
            <input
              id="roi-units"
              type="range"
              min={1000}
              max={120000}
              step={500}
              value={units}
              onChange={(e) => setUnits(Number(e.target.value))}
              className="range mt-4 w-full"
              style={{ ["--p" as string]: `${((units - 1000) / 119000) * 100}%` }}
            />
          </div>
          <div>
            <label htmlFor="roi-tariff" className="label text-graphite">
              Energy rate (₹/unit)
            </label>
            <p className="mt-2 text-3xl font-semibold tabular">₹{tariff.toFixed(1)}</p>
            <input
              id="roi-tariff"
              type="range"
              min={6}
              max={12}
              step={0.1}
              value={tariff}
              onChange={(e) => setTariff(Number(e.target.value))}
              className="range mt-4 w-full"
              style={{ ["--p" as string]: `${((tariff - 6) / 6) * 100}%` }}
            />
          </div>
        </div>
        <div className="p-6 sm:p-10 lg:col-span-7">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <p className="label text-graphite">Suggested plant</p>
              <p className="mt-2 text-[clamp(3rem,6vw,5rem)] font-semibold leading-none tracking-[-0.055em]">
                <LiveNumber value={size} format={fmt0} /> <span className="text-2xl text-graphite">kW</span>
              </p>
            </div>
            <Stat k="Investment" v={e.price.mid} f={fmtLakh} />
            <Stat k="Savings, year 1" v={e.annualSavings} f={fmtLakh} accent />
            <Stat k="Payback" v={e.paybackYears} f={fmt1} suffix="years" />
            <Stat k="25-year savings" v={e.lifetimeSavings} f={fmtLakh} />
            <Stat k="Monthly savings" v={e.monthlySavings} f={fmtINR} />
            <Stat k="CO₂ avoided / year" v={e.co2TonnesPerYear} f={fmt1} suffix="t" />
          </div>
          <SavingsChart projection={e.projection} netCost={e.netCost} className="mt-10" />
          <p className="mt-4 text-xs text-mute">
            Before accelerated depreciation and financing. Assumes the plant is sized to daytime consumption; 3% annual tariff escalation.
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ k, v, f, suffix, accent }: { k: string; v: number; f: (n: number) => string; suffix?: string; accent?: boolean }) {
  return (
    <div className="border-t border-line pt-4">
      <p className="text-sm text-graphite">{k}</p>
      <p className={cn("mt-2 text-3xl font-semibold tracking-[-0.04em]", accent && "text-sun-ink")}>
        <LiveNumber value={v} format={f} />
        {suffix ? <span className="ml-1 text-base font-medium text-graphite">{suffix}</span> : null}
      </p>
    </div>
  );
}
