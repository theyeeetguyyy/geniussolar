"use client";

import { useState } from "react";
import { formatINR, formatLakh, priceRange, subsidyFor } from "@/lib/solar";
import { LiveNumber } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

const fmtINR = (n: number) => formatINR(n);
const fmtLakh = (n: number) => formatLakh(n);

export function SubsidyEstimator() {
  const [type, setType] = useState<"home" | "society">("home");
  const [kw, setKw] = useState(3);
  const max = type === "home" ? 10 : 100;
  const k = Math.min(kw, max);
  const subsidy = subsidyFor(k, type);
  const price = priceRange(k, type);
  const pct = ((k - 1) / (max - 1)) * 100;

  return (
    <div className="container-x">
      <div className="grid overflow-hidden rounded-hero bg-white shadow-lift ring-1 ring-line lg:grid-cols-2">
        <div className="p-6 sm:p-10">
          <p className="label text-graphite">Subsidy estimator</p>
          <div className="mt-6 inline-flex rounded-full bg-stone-100 p-1" role="radiogroup" aria-label="Applicant type">
            {(["home", "society"] as const).map((t) => (
              <button
                key={t}
                role="radio"
                aria-checked={type === t}
                onClick={() => {
                  setType(t);
                  setKw(t === "home" ? 3 : 20);
                }}
                className={cn("h-10 rounded-full px-5 text-sm font-medium transition-all", type === t ? "bg-white shadow-soft" : "text-graphite")}
              >
                {t === "home" ? "Home" : "Housing society / RWA"}
              </button>
            ))}
          </div>
          <label htmlFor="se-kw" className="mt-10 block label text-graphite">
            System size
          </label>
          <p className="mt-2 text-6xl font-semibold tracking-[-0.05em] tabular">
            {k} <span className="text-2xl font-medium text-graphite">kW</span>
          </p>
          <input
            id="se-kw"
            type="range"
            min={1}
            max={max}
            step={1}
            value={k}
            onChange={(e) => setKw(Number(e.target.value))}
            className="range mt-6 w-full"
            style={{ ["--p" as string]: `${pct}%` }}
          />
          <p className="mt-4 text-sm text-graphite">
            {type === "home"
              ? "₹30,000/kW for the first 2 kW, ₹18,000 for the 3rd kW, capped at ₹78,000."
              : "₹18,000 per kW for common facilities, up to 500 kW."}
          </p>
        </div>
        <div className="flex flex-col justify-between gap-8 bg-ink p-6 text-white sm:p-10">
          <div>
            <p className="label text-sun">Central subsidy</p>
            <p className="mt-3 text-[clamp(3rem,6vw,5rem)] font-semibold leading-none tracking-[-0.055em] text-sun">
              <LiveNumber value={subsidy} format={fmtINR} />
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
            <div>
              <dt className="label text-white/50">Typical price</dt>
              <dd className="mt-2 text-2xl font-semibold tabular">
                <LiveNumber value={price.mid} format={fmtLakh} />
              </dd>
            </div>
            <div>
              <dt className="label text-white/50">You pay (approx.)</dt>
              <dd className="mt-2 text-2xl font-semibold tabular">
                <LiveNumber value={Math.max(0, price.mid - subsidy)} format={fmtLakh} />
              </dd>
            </div>
          </dl>
          <p className="text-xs text-white/60">Indicative prices for DCR modules and a standard structure. Final quote after survey.</p>
        </div>
      </div>
    </div>
  );
}
