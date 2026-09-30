"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useNearViewport } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

const PanelExplode = dynamic(() => import("@/components/three/panel-explode"), { ssr: false });

const layers = [
  {
    name: "Tempered glass",
    spec: "3.2 mm · low-iron · anti-reflective",
    body: "Lets through more than 90% of sunlight while taking hail, dust storms and years of cleaning. The AR coating reduces the glare you'd otherwise lose as reflection.",
  },
  {
    name: "Front encapsulant",
    spec: "EVA / POE film",
    body: "Bonds the glass to the cells and seals them from moisture — the main cause of long-term degradation in humid monsoon months.",
  },
  {
    name: "Solar cells",
    spec: "144 half-cut mono cells · 21–22.5%",
    body: "Monocrystalline PERC or TOPCon cells, cut in half so each carries half the current. Lower resistive loss, and a shaded corner hurts less of the panel.",
  },
  {
    name: "Rear encapsulant",
    spec: "EVA / POE film",
    body: "The second seal. Together the two layers lock the cells in place against thermal expansion through Indore's 10°C winters and 44°C summers.",
  },
  {
    name: "Backsheet or rear glass",
    spec: "Insulating · UV-stable",
    body: "Electrically insulates and protects the back. In bifacial glass-glass modules a second pane lets reflected light from the roof reach the cells too.",
  },
  {
    name: "Aluminium frame",
    spec: "Anodised · earthed",
    body: "Gives the laminate its stiffness, the clamping points for the structure, and a path to earth — frames are bonded to the system earthing.",
  },
  {
    name: "Junction box",
    spec: "IP68 · bypass diodes · MC4",
    body: "Bypass diodes let current route around a shaded or damaged cell string instead of stalling the panel. MC4 connectors make weatherproof, polarity-safe joints.",
  },
];

export function PanelAnatomy() {
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const [nearRef, near] = useNearViewport<HTMLDivElement>("600px");
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const t = Math.min(0.999, Math.max(0, (p - 0.14) / 0.82));
    setActive(Math.floor(t * layers.length));
  });

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={section} aria-labelledby="anatomy-title" className={cn("relative bg-stone-50", reduce ? "" : "h-[340vh]")}>
      <div className={cn(reduce ? "py-24" : "sticky top-0 flex h-svh items-center overflow-hidden")}>
        <div className="container-x grid w-full items-center gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="label text-graphite">
              <span className="text-sun-ink">05</span> — Anatomy of a module
            </p>
            <h2 id="anatomy-title" className="mt-5 text-[clamp(2rem,3.6vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
              Seven layers. <span className="serif-accent">Twenty-five years</span> on your roof.
            </h2>
            <ol className="mt-8 hidden space-y-1 lg:block">
              {layers.map((l, i) => (
                <li
                  key={l.name}
                  className={cn(
                    "rounded-2xl px-4 py-3 transition-all duration-500",
                    i === active ? "bg-white shadow-soft ring-1 ring-line" : "opacity-45",
                  )}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-medium">
                      <span className="label mr-3 text-sun-ink">{String(i + 1).padStart(2, "0")}</span>
                      {l.name}
                    </p>
                    <p className="label hidden text-graphite xl:block">{l.spec}</p>
                  </div>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-500 ease-[var(--ease-sun)]",
                      i === active ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <p className="overflow-hidden text-sm text-graphite">
                      <span className="block pt-2">{l.body}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div ref={nearRef} className="relative h-[46svh] lg:col-span-7 lg:h-[78svh]">
            {near ? <PanelExplode progress={scrollYProgress} reduced={reduce} active={inView} /> : null}
          </div>

          {/* Mobile: current layer card */}
          <div className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-line lg:hidden" aria-live="polite">
            <p className="label text-sun-ink">
              {String(active + 1).padStart(2, "0")} / 07 · {layers[active].spec}
            </p>
            <p className="mt-2 text-lg font-semibold tracking-[-0.02em]">{layers[active].name}</p>
            <p className="mt-1 text-sm text-graphite">{layers[active].body}</p>
          </div>
        </div>
      </div>
      {/* Crawlable, complete list for search engines and screen readers */}
      <div className="sr-only">
        <h3>The seven layers of a solar module</h3>
        <ol>
          {layers.map((l) => (
            <li key={l.name}>
              {l.name} ({l.spec}): {l.body}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
