"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

type ModeId = "morning" | "noon" | "evening" | "night" | "cloudy" | "outage";

interface Mode {
  id: ModeId;
  label: string;
  time: string;
  gen: number;
  load: number;
  note: string;
  gridDown?: boolean;
}

const MODES: Mode[] = [
  { id: "morning", label: "Morning", time: "8:30 am", gen: 1.9, load: 1.4, note: "Panels wake up. The house runs on solar and a little surplus starts flowing out." },
  { id: "noon", label: "Noon", time: "12:30 pm", gen: 4.9, load: 1.6, note: "Peak sun. Most of the power leaves through the net meter as export credit — the meter effectively runs backwards." },
  { id: "cloudy", label: "Cloudy", time: "2:00 pm", gen: 1.5, load: 1.7, note: "Clouds cut output. Solar still covers most of the load; the grid tops up the difference seamlessly." },
  { id: "evening", label: "Evening", time: "7:30 pm", gen: 0.1, load: 2.6, note: "Sun's gone, ACs are on. You import from the grid — paid for by the credit you exported at noon." },
  { id: "night", label: "Night", time: "11:00 pm", gen: 0, load: 1.1, note: "All from the grid, counted by the import register of the same net meter." },
  {
    id: "outage",
    label: "Power cut",
    time: "any time",
    gen: 0,
    load: 0,
    gridDown: true,
    note: "On-grid inverters switch off during a grid outage (anti-islanding) so line workers stay safe. Want backup? Add a battery with a hybrid inverter.",
  },
];

function Flow({ d, amount, reverse, color = "var(--color-sun)" }: { d: string; amount: number; reverse?: boolean; color?: string }) {
  const on = amount > 0.05;
  const dur = on ? Math.max(0.35, 2.2 - amount * 0.35) : 0;
  return (
    <g>
      <path d={d} fill="none" stroke="var(--color-stone-200)" strokeWidth={10} strokeLinecap="round" />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={on ? 4 + Math.min(amount, 5) * 0.7 : 0}
        strokeLinecap="round"
        strokeDasharray="1 16"
        className="transition-[stroke-width,opacity] duration-500"
        style={{
          opacity: on ? 1 : 0,
          animation: on ? `flow ${dur}s linear infinite${reverse ? " reverse" : ""}` : "none",
        }}
      />
    </g>
  );
}

function Node({
  cx,
  cy,
  icon,
  title,
  value,
  tone = "white",
}: {
  cx: number;
  cy: number;
  icon: keyof typeof Icon;
  title: string;
  value: string;
  tone?: "white" | "sun" | "ink" | "off";
}) {
  const I = Icon[icon];
  return (
    <foreignObject x={cx - 90} y={cy - 32} width={180} height={112}>
      <div className="flex flex-col items-center text-center">
        <div
          className={cn(
            "grid size-16 place-items-center rounded-2xl shadow-soft ring-1 transition-colors duration-500",
            tone === "sun" && "bg-sun text-ink ring-sun",
            tone === "ink" && "bg-ink text-white ring-ink",
            tone === "white" && "bg-white text-ink ring-line",
            tone === "off" && "bg-stone-100 text-mute ring-line",
          )}
        >
          <I size={26} />
        </div>
        <p className="label mt-2 text-graphite">{title}</p>
        <p className="mt-1 text-sm font-semibold tabular text-ink">{value}</p>
      </div>
    </foreignObject>
  );
}

export function NetMeterVisualizer({ className }: { className?: string }) {
  const [id, setId] = useState<ModeId>("noon");
  const m = MODES.find((x) => x.id === id)!;
  const self = Math.min(m.gen, m.load);
  const exportKw = Math.max(0, m.gen - m.load);
  const importKw = Math.max(0, m.load - m.gen);

  return (
    <div className={cn("overflow-hidden rounded-hero bg-white ring-1 ring-line", className)}>
      <div className="flex flex-wrap gap-1 border-b border-line p-3" role="tablist" aria-label="Time of day">
        {MODES.map((x) => (
          <button
            key={x.id}
            role="tab"
            aria-selected={id === x.id}
            onClick={() => setId(x.id)}
            className={cn(
              "h-10 rounded-full px-4 text-sm font-medium transition-colors",
              id === x.id ? "bg-ink text-white" : "text-graphite hover:bg-stone-100 hover:text-ink",
            )}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-12">
        <div className="relative lg:col-span-8">
          <svg viewBox="0 0 900 430" className="w-full" role="img" aria-label={`Energy flow at ${m.label.toLowerCase()}: ${m.note}`}>
            {/* sun */}
            <g className={cn("transition-opacity duration-700", m.gen > 0.05 ? "opacity-100" : "opacity-15")}>
              <circle cx={96} cy={72} r={30} fill="var(--color-sun)" />
              <circle cx={96} cy={72} r={48} fill="var(--color-sun)" opacity={0.18} />
            </g>
            <Flow d="M 112 100 L 140 182" amount={m.gen} />
            <Flow d="M 184 214 L 346 214" amount={m.gen} />
            <Flow d="M 414 214 C 500 214, 520 110, 606 110" amount={self + exportKw} />
            <Flow
              d="M 640 192 L 640 296"
              amount={Math.max(exportKw, importKw)}
              reverse={importKw > exportKw}
              color={importKw > exportKw ? "var(--color-ink)" : "var(--color-leaf)"}
            />
            <Flow
              d="M 674 330 L 786 330"
              amount={Math.max(exportKw, importKw)}
              reverse={importKw > exportKw}
              color={importKw > exportKw ? "var(--color-ink)" : "var(--color-leaf)"}
            />

            <Node cx={156} cy={214} icon="Panel" title="Panels" value={`${m.gen.toFixed(1)} kW`} tone={m.gen > 0.05 ? "sun" : "off"} />
            <Node cx={380} cy={214} icon="Inverter" title="Inverter" value={m.gridDown ? "Off (safety)" : m.gen > 0.05 ? "DC → AC" : "Standby"} tone={m.gridDown ? "off" : "white"} />
            <Node cx={640} cy={110} icon="Home" title="Your home" value={m.gridDown ? "No supply" : `${m.load.toFixed(1)} kW`} tone="white" />
            <Node
              cx={640}
              cy={330}
              icon="Meter"
              title="Net meter"
              value={exportKw > importKw ? `Export ${exportKw.toFixed(1)}` : importKw > 0 ? `Import ${importKw.toFixed(1)}` : "Idle"}
              tone={exportKw > importKw ? "sun" : "white"}
            />
            <Node cx={820} cy={330} icon="Grid" title="Grid" value={m.gridDown ? "Down" : "Live"} tone={m.gridDown ? "off" : "ink"} />
          </svg>
        </div>

        <div className="flex flex-col justify-between gap-8 border-t border-line p-6 sm:p-8 lg:col-span-4 lg:border-l lg:border-t-0">
          <AnimatePresence mode="wait">
            <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35 }}>
              <p className="label text-graphite">{m.time}</p>
              <p className="mt-3 text-xl font-semibold tracking-[-0.02em]">{m.label}</p>
              <p className="mt-2 text-graphite">{m.note}</p>
            </motion.div>
          </AnimatePresence>
          <dl className="grid grid-cols-3 gap-3 border-t border-line pt-6">
            <div>
              <dt className="label text-graphite">Solar</dt>
              <dd className="mt-2 text-2xl font-semibold tabular">{m.gen.toFixed(1)}</dd>
            </div>
            <div>
              <dt className="label text-leaf">Export</dt>
              <dd className="mt-2 text-2xl font-semibold tabular text-leaf">{exportKw.toFixed(1)}</dd>
            </div>
            <div>
              <dt className="label text-graphite">Import</dt>
              <dd className="mt-2 text-2xl font-semibold tabular">{importKw.toFixed(1)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
