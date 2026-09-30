"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Photo } from "@/content/photos";
import { Icon } from "@/components/icons";

export interface LightboxItem {
  photo: Photo;
  project?: { slug: string; title: string };
}

/** Fullscreen viewer: keyboard (← → Esc), swipe, focus management, scroll lock. */
export function Lightbox({ items, index, onClose, onIndex }: { items: LightboxItem[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const start = useRef<number | null>(null);
  const [dir, setDir] = useState(0);
  const open = index !== null;

  const go = useCallback(
    (d: number) => {
      if (index === null) return;
      setDir(d);
      onIndex((index + d + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      prevFocus?.focus();
    };
  }, [open, go, onClose]);

  const onDown = (e: PointerEvent) => {
    start.current = e.clientX;
  };
  const onUp = (e: PointerEvent) => {
    if (start.current === null) return;
    const dx = e.clientX - start.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    start.current = null;
  };

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex flex-col bg-[#0b0c0d]/95 text-white backdrop-blur-xl"
          data-lenis-prevent
        >
          <div className="flex items-center justify-between gap-4 p-4 sm:p-6">
            <p className="label tabular text-white/60">
              {String(index! + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Close viewer" className="grid size-11 place-items-center rounded-full bg-white/10 hover:bg-white/20">
              <Icon.Close size={22} />
            </button>
          </div>

          <div className="relative flex-1 touch-pan-y select-none" onPointerDown={onDown} onPointerUp={onUp}>
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={item.photo.id}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: dir * -60, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 mx-4 sm:mx-20"
              >
                <Image src={item.photo.src} alt={item.photo.alt} fill sizes="100vw" className="object-contain" loading="eager" />
              </motion.div>
            </AnimatePresence>
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:grid">
              <Icon.ChevronLeft size={24} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className="absolute right-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:grid">
              <Icon.ChevronRight size={24} />
            </button>
          </div>

          <div className="container-x flex flex-col gap-3 py-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-lg font-medium">{item.photo.caption}</p>
              <p className="mt-1 text-sm text-white/55">{item.photo.alt}</p>
            </div>
            {item.project ? (
              <Link
                href={`/projects/${item.project.slug}`}
                onClick={onClose}
                className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-sun px-5 text-sm font-semibold text-ink"
              >
                View project <Icon.ArrowRight size={16} />
              </Link>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
