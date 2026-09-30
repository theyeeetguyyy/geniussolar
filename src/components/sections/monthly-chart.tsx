import { MONTHLY_YIELD_PER_KW, MONTHS } from "@/lib/solar";

/** Server-rendered monthly generation bars for a system size (crawlable numbers in the SVG text). */
export function MonthlyChart({ kw, className }: { kw: number; className?: string }) {
  const values = MONTHLY_YIELD_PER_KW.map((v) => Math.round(v * kw));
  const max = Math.max(...values) * 1.12;
  const W = 720;
  const H = 240;
  const gap = 10;
  const bw = (W - gap * 11) / 12;
  return (
    <figure className={className}>
      <svg viewBox={`0 0 ${W} ${H + 40}`} className="w-full" role="img" aria-label={`Estimated monthly generation of a ${kw} kW solar system in Indore`}>
        {values.map((v, i) => {
          const h = (v / max) * H;
          const x = i * (bw + gap);
          const monsoon = i >= 5 && i <= 8;
          return (
            <g key={MONTHS[i]}>
              <rect x={x} y={H - h} width={bw} height={h} rx={6} className={monsoon ? "fill-stone-300" : "fill-sun"} />
              <text x={x + bw / 2} y={H - h - 8} textAnchor="middle" className="fill-ink font-mono text-[11px]">
                {v.toLocaleString("en-IN")}
              </text>
              <text x={x + bw / 2} y={H + 22} textAnchor="middle" className="fill-graphite font-mono text-[11px] uppercase">
                {MONTHS[i]}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 flex flex-wrap gap-5 text-sm text-graphite">
        <span className="flex items-center gap-2">
          <span className="size-3 rounded bg-sun" /> Units per month
        </span>
        <span className="flex items-center gap-2">
          <span className="size-3 rounded bg-stone-300" /> Monsoon months
        </span>
      </figcaption>
    </figure>
  );
}
