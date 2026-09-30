import { dayOfYear, sunPosition } from "@/lib/solar";

/** Indore's coordinates and the modelled demo array shown in the hero. */
export const SITE_LAT = 22.72;
export const ARRAY = { panels: 10, watt: 550, tilt: 18 } as const;
export const ARRAY_KWP = (ARRAY.panels * ARRAY.watt) / 1000;

/**
 * Shared, mutable sun clock. The canvas reads it every frame and the HTML HUD
 * reads it on its own rAF — no React re-render per frame.
 */
export const sun = {
  hour: 10.5,
  auto: true,
  lastTouch: 0,
  elevation: 0,
  azimuth: 0,
  /** 0..1 fraction of array peak output */
  output: 0,
  day: 180,
  callouts: [] as { x: number; y: number; visible: boolean }[],
};

/** 3D anchor points for the engineering callouts shown over the hero scene. */
export const CALLOUTS: { p: [number, number, number]; k: string; v: string; side: "l" | "r" }[] = [
  { p: [0.3, 4.05, -2.0], k: "Modules", v: "10 × 550 W mono · DCR", side: "l" },
  { p: [0, 1.1, 1.55], k: "Headroom", v: "2.4 m clear · terrace stays usable", side: "r" },
];

/** Solar time in Indore right now (IST minus ~27 min longitude correction). */
export function indoreSolarHourNow() {
  const now = new Date();
  const utcH = now.getUTCHours() + now.getUTCMinutes() / 60;
  return (utcH + 5.5 - 0.44 + 24) % 24;
}

export function updateSun(hour: number) {
  sun.hour = hour;
  const p = sunPosition(SITE_LAT, sun.day, hour);
  sun.elevation = p.elevation;
  sun.azimuth = p.azimuth;
  const tilt = (ARRAY.tilt * Math.PI) / 180;
  const el = (p.elevation * Math.PI) / 180;
  const az = (p.azimuth * Math.PI) / 180;
  // World: +z south, +x east, +y up.
  const sx = Math.sin(az) * Math.cos(el);
  const sy = Math.sin(el);
  const sz = -Math.cos(az) * Math.cos(el);
  const cosInc = sy * Math.cos(tilt) + sz * Math.sin(tilt);
  const airMass = el > 0 ? Math.pow(Math.max(0, Math.sin(el)), 0.28) : 0;
  sun.output = Math.max(0, Math.min(1, cosInc * airMass * 0.98));
  return { x: sx, y: sy, z: sz };
}

/** Hour the scene starts at — matches the pre-rendered hero poster so the swap is seamless. */
export const POSTER_HOUR = 10.75;

export function initSun(hour = POSTER_HOUR) {
  sun.day = dayOfYear(new Date(Date.UTC(new Date().getUTCFullYear(), 3, 20)));
  sun.hour = hour;
  updateSun(sun.hour);
}

export const formatClock = (hour: number) => {
  const h = Math.floor(hour);
  const m = Math.floor((hour - h) * 60);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
};
