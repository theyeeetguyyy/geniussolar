"use client";

import { useRef } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { formatINR } from "@/lib/solar";
import { cn } from "@/lib/utils";

/**
 * Pinned scroll story: an electricity bill that the sun pays off line by line.
 * Illustrative numbers — 600 units/month, 5 kW array in Indore.
 */
const BEFORE = { units: 600, energy: 4050, fixed: 350, duty: 460 };
const AFTER = { units: 0, energy: 0, fixed: 350, duty: 40 };

const chapters = [
  {
    k: "01 · Generate",
    title: "Your roof starts working at sunrise.",
    body: "A 5 kW array in Indore produces about 20 units on an average day — more in March, less in the monsoon. That's roughly 600 units a month, from a roof that was doing nothing.",
  },
  {
    k: "02 · Offset",
    title: "Every solar unit is a unit you don't buy.",
    body: "Your home uses solar power first. The net meter counts what you draw from the grid and what you send back, and your bill is charged only on the difference.",
  },
  {
    k: "03 · Settle",
    title: "What's left is the fixed charge.",
    body: "Surplus summer units are credited against cloudy months. For many Indore homes the monthly bill drops to little more than the fixed charge and duty.",
  },
];

function useLerp(p: MotionValue<number>, from: number, to: number) {
  return useTransform(p, [0.12, 0.78], [from, to], { clamp: true });
}

function Row({ label, value }: { label: string; value: MotionValue<number> }) {
  const ref = useRef<HTMLSpanElement>(null);
  useMotionValueEvent(value, "change", (v) => {
    if (ref.current) ref.current.textContent = formatINR(v);
  });
  return (
    <div className="flex items-baseline justify-between border-b border-dashed border-ink/15 py-3">
      <span className="text-sm text-graphite">{label}</span>
      <span ref={ref} className="font-mono text-sm tabular text-ink">
        {formatINR(value.get())}
      </span>
    </div>
  );
}

export function BillStory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const units = useLerp(scrollYProgress, BEFORE.units, AFTER.units);
  const energy = useLerp(scrollYProgress, BEFORE.energy, AFTER.energy);
  const duty = useLerp(scrollYProgress, BEFORE.duty, AFTER.duty);
  const total = useTransform([energy, duty], ([e, d]: number[]) => e + d + BEFORE.fixed);
  const fixed = useTransform(scrollYProgress, () => BEFORE.fixed);
  const solarCredit = useLerp(scrollYProgress, 0, BEFORE.units);

  const totalRef = useRef<HTMLSpanElement>(null);
  const unitsRef = useRef<HTMLSpanElement>(null);
  const creditRef = useRef<HTMLSpanElement>(null);
  useMotionValueEvent(total, "change", (v) => totalRef.current && (totalRef.current.textContent = formatINR(v)));
  useMotionValueEvent(units, "change", (v) => unitsRef.current && (unitsRef.current.textContent = `${Math.round(v)}`));
  useMotionValueEvent(solarCredit, "change", (v) => creditRef.current && (creditRef.current.textContent = `−${Math.round(v)}`));

  const stampScale = useTransform(scrollYProgress, [0.74, 0.86], [1.8, 1]);
  const stampOpacity = useTransform(scrollYProgress, [0.74, 0.84], [0, 1]);
  const sunY = useTransform(scrollYProgress, [0, 1], ["60%", "-10%"]);
  const sunScale = useTransform(scrollYProgress, [0, 1], [0.7, 1.15]);
  const billRotate = useTransform(scrollYProgress, [0, 1], [-4, 2]);
  const bar = useTransform(scrollYProgress, [0.12, 0.78], [1, 0.08]);

  const [c0, c1, c2] = [
    useTransform(scrollYProgress, [0, 0.3, 0.36], [1, 1, 0.18]),
    useTransform(scrollYProgress, [0.3, 0.36, 0.63, 0.69], [0.18, 1, 1, 0.18]),
    useTransform(scrollYProgress, [0.63, 0.69, 1], [0.18, 1, 1]),
  ];

  return (
    <section id="bill-story" ref={ref} aria-labelledby="bill-story-title" className={cn("relative", reduce ? "" : "h-[320vh]")}>
      <div className={cn("overflow-hidden", reduce ? "" : "sticky top-0 h-svh")}>
        <div className="container-x grid h-full items-center gap-10 py-24 lg:grid-cols-12 lg:gap-16 lg:py-0">
          {/* Chapters */}
          <div className="relative z-10 lg:col-span-6 lg:col-start-7 lg:row-start-1">
            <p className="label text-graphite">
              <span className="text-sun-ink">02</span> — How the sun pays
            </p>
            <h2 id="bill-story-title" className="mt-6 text-h2 font-semibold">
              From <span className="tabular">₹4,860</span> to <span className="serif-accent text-sun-ink">₹390</span>. Every month.
            </h2>
            <ol className="mt-10 space-y-8">
              {chapters.map((c, i) => (
                <li key={c.k} className="relative grid grid-cols-[auto_1fr] gap-5 pl-5">
                  {/* Active-chapter marker: the text itself stays full-contrast */}
                  <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] rounded-full bg-stone-200" />
                  <motion.span
                    aria-hidden="true"
                    style={{ opacity: reduce ? 1 : [c0, c1, c2][i], scaleY: reduce ? 1 : [c0, c1, c2][i] }}
                    className="absolute inset-y-0 left-0 w-[3px] origin-top rounded-full bg-sun"
                  />
                  <span className="label mt-1.5 text-sun-ink">{c.k.split(" · ")[0]}</span>
                  <div>
                    <h3 className="text-h3 font-semibold">{c.title}</h3>
                    <p className="mt-2 max-w-md text-graphite">{c.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-10 max-w-md text-xs text-mute">
              Illustrative bill for a home using 600 units a month with a 5 kW on-grid system in Indore. Fixed charges and duty depend on
              your connection and current MPERC tariff.
            </p>
          </div>

          {/* Bill */}
          <div className="relative lg:col-span-6 lg:row-start-1">
            <motion.div
              aria-hidden="true"
              style={{ y: reduce ? "10%" : sunY, scale: reduce ? 1 : sunScale }}
              className="absolute left-1/2 top-1/2 -z-10 size-[min(90vw,40rem)] -translate-x-1/2 rounded-full sun-gradient opacity-70"
            />
            <motion.div
              style={{ rotate: reduce ? 0 : billRotate }}
              className="relative mx-auto w-full max-w-[25rem] rounded-[6px] bg-white px-7 pb-8 pt-9 shadow-lift [mask-image:radial-gradient(circle_at_8px_0,transparent_6px,black_6.5px)] [mask-position:-8px_0] [mask-size:16px_100%]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="label text-graphite">Electricity bill</p>
                  <p className="mt-2 font-mono text-xs text-graphite">Domestic · LV-1 · Indore</p>
                </div>
                <p className="font-mono text-xs text-graphite">Billing month</p>
              </div>
              <div className="mt-8 flex items-end justify-between border-b border-ink/10 pb-5">
                <div>
                  <p className="label text-graphite">Net units billed</p>
                  <p className="mt-2 text-5xl font-semibold tracking-[-0.05em] tabular">
                    <span ref={unitsRef}>600</span>
                    <span className="ml-1 text-base font-normal text-graphite">kWh</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="label text-leaf">Solar offset</p>
                  <p className="mt-2 font-mono text-lg tabular text-leaf">
                    <span ref={creditRef}>−0</span>
                  </p>
                </div>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-stone-100">
                <motion.div style={{ scaleX: reduce ? 0.08 : bar }} className="h-full origin-left rounded-full bg-ink" />
              </div>
              <div className="mt-4">
                <Row label="Energy charges" value={energy} />
                <Row label="Fixed charges" value={fixed} />
                <Row label="Electricity duty & FCA" value={duty} />
              </div>
              <div className="mt-6 flex items-end justify-between">
                <p className="label text-ink">Amount payable</p>
                <p className="text-4xl font-semibold tracking-[-0.045em] tabular">
                  <span ref={totalRef}>{formatINR(BEFORE.energy + BEFORE.fixed + BEFORE.duty)}</span>
                </p>
              </div>
              <motion.div
                style={{ scale: reduce ? 1 : stampScale, opacity: reduce ? 1 : stampOpacity }}
                className="pointer-events-none absolute right-5 top-28 grid size-36 rotate-[-14deg] place-items-center rounded-full border-[3px] border-sun-ink/80 text-center text-sun-ink"
              >
                <span className="label leading-tight">
                  Paid by
                  <br />
                  <span className="serif-accent text-3xl normal-case tracking-normal">the sun</span>
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
