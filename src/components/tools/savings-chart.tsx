"use client";

import { motion, useReducedMotion } from "motion/react";
import { formatLakh } from "@/lib/solar";

/** 25 bars of cumulative savings against the net system cost. Bars turn gold after payback. */
export function SavingsChart({
  projection,
  netCost,
  className,
}: {
  projection: { year: number; cumulative: number }[];
  netCost: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const max = Math.max(...projection.map((p) => p.cumulative), netCost) * 1.05;
  const W = 500;
  const H = 180;
  const gap = 4;
  const bw = (W - gap * (projection.length - 1)) / projection.length;
  const costY = H - (netCost / max) * H;
  return (
    <figure className={className}>
      <svg viewBox={`0 0 ${W} ${H + 22}`} className="w-full overflow-visible" role="img" aria-label="Cumulative savings over 25 years compared with system cost">
        {projection.map((p, i) => {
          const h = (p.cumulative / max) * H;
          const paid = p.cumulative >= netCost;
          return (
            <motion.rect
              key={p.year}
              x={i * (bw + gap)}
              width={bw}
              rx={Math.min(3, bw / 2)}
              initial={false}
              animate={{ y: H - h, height: h }}
              transition={reduce ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.012 }}
              className={paid ? "fill-sun" : "fill-stone-300"}
            />
          );
        })}
        <line x1={0} x2={W} y1={costY} y2={costY} className="stroke-ink" strokeDasharray="4 4" strokeWidth={1} />
        <text x={0} y={costY - 8} textAnchor="start" className="fill-ink font-mono text-[10px] uppercase tracking-wider">
          Net cost {formatLakh(netCost)}
        </text>
        {[1, 5, 10, 15, 20, 25].map((y) => (
          <text key={y} x={(y - 1) * (bw + gap) + bw / 2} y={H + 16} textAnchor="middle" className="fill-mute font-mono text-[10px]">
            {y === 1 ? "Yr 1" : y}
          </text>
        ))}
      </svg>
      <figcaption className="sr-only">Grey bars are before payback; gold bars are years after the system has paid for itself.</figcaption>
    </figure>
  );
}
