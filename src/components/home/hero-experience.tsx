"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useReducedMotion, useScroll } from "motion/react";
import { ARRAY, ARRAY_KWP, CALLOUTS, formatClock, initSun, sun } from "@/components/three/sun-state";
import type { Quality } from "@/components/three/hero-scene";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

const HeroCanvas = dynamic(() => import("@/components/three/hero-scene"), { ssr: false });

/** Sky gradient stops keyed by sun elevation (deg). */
function skyFor(el: number) {
  const k = Math.max(0, Math.min(1, el / 45));
  const mix = (a: number[], b: number[]) => a.map((v, i) => Math.round(v + (b[i] - v) * k));
  const top = mix([214, 214, 226], [214, 230, 242]);
  const mid = mix([252, 226, 196], [236, 243, 247]);
  return { top: `rgb(${top.join(" ")})`, mid: `rgb(${mid.join(" ")})` };
}

export function HeroExperience({ sectionId }: { sectionId: string }) {
  const reduced = useReducedMotion() ?? false;
  const pointer = useRef({ x: 0, y: 0 });
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(true);
  const [quality, setQuality] = useState<Quality>("high");
  const [layout, setLayout] = useState<"desktop" | "mobile">("desktop");
  const root = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end start"] });

  // HUD refs (updated on rAF, not React state)
  const timeRef = useRef<HTMLSpanElement>(null);
  const altRef = useRef<HTMLSpanElement>(null);
  const azRef = useRef<HTMLSpanElement>(null);
  const kwRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const dialRef = useRef<HTMLInputElement>(null);
  const calloutEls = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    section.current = document.getElementById(sectionId);
    const still = new URLSearchParams(window.location.search).get("still");
    initSun(still ? Number(still) || undefined : undefined);
    if (still) sun.auto = false;
    // The WebGL bundle loads on the visitor's first interaction. Until then the
    // pre-rendered poster (identical framing) is shown, so first paint stays fast.
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      events.forEach((ev) => window.removeEventListener(ev, start));
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;
      const cores = navigator.hardwareConcurrency ?? 8;
      const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
      setLayout(isMobile ? "mobile" : "desktop");
      setQuality(isMobile || cores <= 4 || mem <= 4 ? "low" : "high");
      setMount(true);
    };
    const events = ["pointermove", "pointerdown", "touchstart", "wheel", "keydown", "scroll"] as const;
    if (still) start();
    else events.forEach((ev) => window.addEventListener(ev, start, { passive: true, once: true }));

    const onMove = (e: globalThis.PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      events.forEach((ev) => window.removeEventListener(ev, start));
    };
  }, [sectionId]);

  // Pause rendering when the hero is off-screen.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "80px" });
    io.observe(el);
    return () => io.disconnect();
  }, [mount]);

  // HUD + sky loop
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const el = sun.elevation;
      if (timeRef.current) timeRef.current.textContent = formatClock(sun.hour);
      if (altRef.current) altRef.current.textContent = `${Math.max(0, el).toFixed(1)}°`;
      if (azRef.current) azRef.current.textContent = `${sun.azimuth.toFixed(0)}°`;
      if (kwRef.current) kwRef.current.textContent = (ARRAY_KWP * sun.output).toFixed(2);
      if (barRef.current) barRef.current.style.transform = `scaleX(${sun.output.toFixed(3)})`;
      if (dialRef.current && document.activeElement !== dialRef.current) dialRef.current.value = String(sun.hour);
      calloutEls.current.forEach((node, i) => {
        const c = sun.callouts[i];
        if (!node || !c) return;
        node.style.transform = `translate3d(${c.x.toFixed(1)}px, ${c.y.toFixed(1)}px, 0)`;
        node.style.visibility = c.visible ? "visible" : "hidden";
      });
      const sky = skyFor(el);
      section.current?.style.setProperty("--sky-top", sky.top);
      section.current?.style.setProperty("--sky-mid", sky.mid);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Drag anywhere on the scene to move the sun.
  const drag = useRef<{ x: number; hour: number } | null>(null);
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    drag.current = { x: e.clientX, hour: sun.hour };
    sun.lastTouch = performance.now();
  };
  const onMoveDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    sun.hour = Math.min(18.4, Math.max(6.1, drag.current.hour + dx / 60));
    sun.lastTouch = performance.now();
  };
  const onUp = () => {
    drag.current = null;
  };

  return (
    <div ref={root} className="absolute inset-0">
      <div
        className={cn(
          "absolute inset-0 cursor-grab transition-opacity duration-[1600ms] ease-[var(--ease-sun)] active:cursor-grabbing",
          ready ? "opacity-100" : "opacity-0",
        )}
        onPointerDown={onDown}
        onPointerMove={onMoveDrag}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerLeave={onUp}
        aria-hidden="true"
      >
        {mount ? (
          <HeroCanvas
            progress={scrollYProgress}
            pointer={pointer}
            quality={quality}
            reduced={reduced}
            layout={layout}
            active={active}
            onReady={() => setTimeout(() => setReady(true), 120)}
          />
        ) : null}
      </div>

      {/* Engineering callouts, positioned from the 3D scene each frame */}
      {layout === "desktop" && ready ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {CALLOUTS.map((c, i) => (
            <div
              key={c.k}
              ref={(n) => {
                calloutEls.current[i] = n;
              }}
              className="absolute left-0 top-0"
              style={{ visibility: "hidden" }}
            >
              <div className={`hero-callout hero-callout-${c.side}`}>
                <span className="hero-callout-dot" />
                <span className="hero-callout-line" />
                <span className="hero-callout-card">
                  <span className="label">{c.k}</span>
                  <span className="hero-callout-v">{c.v}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* Engineering HUD */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
        <div className="container-x pb-5 lg:pb-8">
          <div className="pointer-events-auto ml-auto w-full max-w-[26rem] rounded-2xl bg-white/90 p-3.5 shadow-soft ring-1 ring-line sm:bg-white/70 sm:p-4 sm:backdrop-blur-xl lg:p-5">
            <div className="flex items-center justify-between gap-4">
              <p className="label flex items-center gap-2 text-graphite">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-sun opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-sun" />
                </span>
                Live model · Indore rooftop
              </p>
              <p className="label text-ink">
                <span ref={timeRef} className="tabular">
                  10:30 am
                </span>
              </p>
            </div>
            <div className="mt-4 flex items-end justify-between gap-4">
              <p>
                <span ref={kwRef} className="text-4xl font-semibold tracking-[-0.04em] tabular">
                  4.10
                </span>
                <span className="ml-1.5 text-sm text-graphite">kW now</span>
              </p>
              <dl className="hidden grid-cols-2 gap-x-4 gap-y-1 text-right sm:grid">
                <dt className="label text-graphite">Sun alt</dt>
                <dd ref={altRef} className="label tabular text-ink">
                  48.0°
                </dd>
                <dt className="label text-graphite">Azimuth</dt>
                <dd ref={azRef} className="label tabular text-ink">
                  120°
                </dd>
              </dl>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-stone-200">
              <span ref={barRef} className="block h-full origin-left rounded-full bg-gradient-to-r from-sun to-sun-bright" style={{ transform: "scaleX(0.7)" }} />
            </div>
            <label className="mt-4 flex items-center gap-3">
              <Icon.SunRise size={18} className="shrink-0 text-graphite" />
              <span className="sr-only">Time of day</span>
              <input
                ref={dialRef}
                type="range"
                min={6.1}
                max={18.4}
                step={0.05}
                defaultValue={10.5}
                onInput={(e) => {
                  sun.hour = Number((e.target as HTMLInputElement).value);
                  sun.lastTouch = performance.now();
                }}
                className="h-1 w-full cursor-pointer"
              />
              <Icon.Sun size={18} className="shrink-0 text-graphite" />
            </label>
            <p className="mt-3 hidden text-xs text-graphite sm:block">
              {ARRAY.panels} × {ARRAY.watt} W modules · {ARRAY_KWP} kWp · {ARRAY.tilt}° tilt, south. Drag the scene to move the sun.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
