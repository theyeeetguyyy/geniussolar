"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { PhotoTag } from "@/content/photos";
import { Lightbox, type LightboxItem } from "./lightbox";
import { cn } from "@/lib/utils";

const FILTERS: { id: PhotoTag | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "elevated", label: "Elevated structures" },
  { id: "residential", label: "Homes" },
  { id: "commercial", label: "Commercial" },
  { id: "structure", label: "Structure work" },
  { id: "inverter", label: "Inverters" },
  { id: "handover", label: "Handovers" },
  { id: "team", label: "Team" },
];

/** Architectural-portfolio style masonry with category filters and a fullscreen viewer. */
export function PortfolioGallery({ items }: { items: LightboxItem[] }) {
  const [filter, setFilter] = useState<PhotoTag | "all">("all");
  const [open, setOpen] = useState<number | null>(null);
  const shown = useMemo(() => (filter === "all" ? items : items.filter((i) => i.photo.tags.includes(filter))), [filter, items]);
  const counts = useMemo(
    () => Object.fromEntries(FILTERS.map((f) => [f.id, f.id === "all" ? items.length : items.filter((i) => i.photo.tags.includes(f.id as PhotoTag)).length])),
    [items],
  );

  return (
    <div>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="toolbar" aria-label="Filter photos">
        {FILTERS.filter((f) => counts[f.id] > 0).map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-5 text-sm font-medium ring-1 transition-colors",
              filter === f.id ? "bg-ink text-white ring-ink" : "bg-white text-ink-2 ring-line hover:ring-ink/25",
            )}
          >
            {f.label}
            <span className={cn("label tabular", filter === f.id ? "text-sun" : "text-mute")}>{counts[f.id]}</span>
          </button>
        ))}
      </div>

      <motion.ul layout className="mt-10 columns-2 gap-3 sm:gap-4 md:columns-3 xl:columns-4">
        <AnimatePresence mode="popLayout">
          {shown.map((it, i) => (
            <motion.li
              key={it.photo.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: Math.min(i, 12) * 0.03 }}
              className="mb-3 break-inside-avoid sm:mb-4"
            >
              <figure>
                <button
                  type="button"
                  onClick={() => setOpen(shown.indexOf(it))}
                  className="group relative block w-full overflow-hidden rounded-card bg-stone-100 text-left"
                  aria-label={`Open photo: ${it.photo.caption}`}
                >
                  <Image
                    src={it.photo.src}
                    alt={it.photo.alt}
                    sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 48vw"
                    className="h-auto w-full transition-transform duration-[1.2s] ease-[var(--ease-sun)] group-hover:scale-[1.04]"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 text-sm text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {it.photo.caption}
                    {it.project ? <span className="label mt-1 block text-sun">{it.project.title}</span> : null}
                  </figcaption>
                </button>
              </figure>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Lightbox items={shown} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </div>
  );
}
