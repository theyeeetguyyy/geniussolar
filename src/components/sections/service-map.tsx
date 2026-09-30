import Link from "next/link";
import { areas, distanceFromOffice } from "@/content/areas";
import { site } from "@/content/site";
import { SectionHeader } from "@/components/ui/section";

/**
 * Stylised, server-rendered map of the areas we serve. Radial "fisheye"
 * projection around our office (distance → √distance) spreads out the dense
 * city core while keeping true bearings. Every dot is a crawlable link.
 */
const W = 640;
const H = 520;
const CX = W / 2 + 20;
const CY = 96;
const K = 62;
const radius = (km: number) => K * Math.sqrt(km);

function project(lat: number, lng: number) {
  const dx = (lng - site.geo.lng) * 102.6;
  const dy = (site.geo.lat - lat) * 110.9;
  const r = Math.hypot(dx, dy);
  if (r === 0) return { x: CX, y: CY, km: 0 };
  const rp = radius(r);
  return { x: CX + (dx / r) * rp, y: CY + (dy / r) * rp, km: r };
}

/** Greedy label de-collision: keeps labels on each side at least 15px apart vertically. */
function placeLabels(points: { slug: string; x: number; y: number }[]) {
  const placed = points.map((p) => ({ ...p, right: p.x < 120 || p.x >= CX - 30, ly: p.y + 4 }));
  for (const side of [true, false]) {
    const group = placed.filter((p) => p.right === side).sort((a, b) => a.ly - b.ly);
    for (let i = 1; i < group.length; i++) {
      const prev = group[i - 1];
      if (group[i].ly - prev.ly < 15 && Math.abs(group[i].x - prev.x) < 150) group[i].ly = prev.ly + 15;
    }
  }
  return placed;
}

export function ServiceMap({ index = "10" }: { index?: string }) {
  const onMap = areas.filter((a) => {
    const p = project(a.lat, a.lng);
    return p.y > 24 && p.y < H - 20 && p.x > 10 && p.x < W - 10;
  });
  const beyond = areas.filter((a) => !onMap.includes(a));
  const labels = placeLabels(onMap.map((a) => ({ slug: a.slug, ...project(a.lat, a.lng) })));

  return (
    <section aria-label="Service area" className="section-y bg-stone-50">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader
            index={index}
            eyebrow="Service area"
            title="Across Indore, from *Vijay Nagar* outward."
            lead={`Our office is in Scheme No. 114, Vijay Nagar. Surveys and service visits cover every Indore locality, plus ${site.serviceArea
              .slice(1)
              .join(", ")}.`}
          />
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/solar-installation/${a.slug}`}
                  className="group flex items-baseline justify-between gap-3 border-b border-line py-2.5 transition-colors hover:text-ink"
                >
                  <span className="text-ink-2 group-hover:text-ink">{a.name}</span>
                  <span className="label shrink-0 text-mute">{distanceFromOffice(a)} km</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-hero bg-white p-4 shadow-soft ring-1 ring-line">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-labelledby="map-title map-desc">
              <title id="map-title">Genius Solar service area map of Indore</title>
              <desc id="map-desc">Localities we serve around our Vijay Nagar office. Distances are compressed so the city centre stays readable; rings mark 2, 5, 10, 20 and 40 km on a square-root scale.</desc>
              <defs>
                <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgb(17 19 21 / 0.05)" strokeWidth="1" />
                </pattern>
                <radialGradient id="sunglow">
                  <stop offset="0" stopColor="#ffb81c" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#ffb81c" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width={W} height={H} fill="url(#grid)" />
              <circle cx={CX} cy={CY} r={radius(20)} fill="url(#sunglow)" />
              {[2, 5, 10, 20, 40].map((km) => (
                <g key={km}>
                  <circle cx={CX} cy={CY} r={radius(km)} fill="none" stroke="rgb(17 19 21 / 0.13)" strokeDasharray="3 6" />
                  <text x={CX + 4} y={CY - radius(km) - 5} className="fill-mute font-mono text-[10px]">
                    {km} km
                  </text>
                </g>
              ))}
              {onMap.map((a, i) => {
                const { x, y } = project(a.lat, a.lng);
                const { right, ly } = labels[i];
                return (
                  <a key={a.slug} href={`/solar-installation/${a.slug}`} className="group">
                    <line x1={CX} y1={CY} x2={x} y2={y} stroke="rgb(17 19 21 / 0.07)" />
                    <circle cx={x} cy={y} r={11} className="fill-sun/0 transition-all group-hover:fill-sun/25" />
                    <circle cx={x} cy={y} r={4.5} className="fill-ink transition-colors group-hover:fill-sun" />
                    {Math.abs(ly - 4 - y) > 2 ? <line x1={x} y1={y} x2={right ? x + 8 : x - 8} y2={ly - 4} stroke="rgb(17 19 21 / 0.25)" /> : null}
                    <text
                      x={right ? x + 10 : x - 10}
                      y={ly}
                      textAnchor={right ? "start" : "end"}
                      className="fill-ink-2 text-[12px] font-medium transition-colors group-hover:fill-ink"
                    >
                      {a.name.startsWith("Old & New") ? "Palasia" : a.name.split(" & ")[0].replace(" (Dr. Ambedkar Nagar)", "")}
                    </text>
                  </a>
                );
              })}
              <g>
                <circle cx={CX} cy={CY} r={16} className="fill-sun" opacity={0.25}>
                  <animate attributeName="r" values="12;24;12" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.35;0;0.35" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx={CX} cy={CY} r={8} className="fill-sun" stroke="#111315" strokeWidth={2} />
                <text x={CX + 16} y={CY - 12} textAnchor="start" className="fill-ink font-mono text-[11px] font-semibold uppercase tracking-wider">
                  Genius Solar HQ
                </text>
              </g>
            </svg>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-2 pt-4">
              <p className="label text-graphite">Beyond Indore</p>
              <ul className="flex flex-wrap gap-2">
                {beyond.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/solar-installation/${a.slug}`}
                      className="inline-flex h-8 items-center gap-2 rounded-full bg-stone-100 px-3 text-sm text-ink-2 transition-colors hover:bg-sun-soft"
                    >
                      {a.name} <span className="label text-mute">{distanceFromOffice(a)} km</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
