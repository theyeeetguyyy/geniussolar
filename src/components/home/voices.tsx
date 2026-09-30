"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { testimonials } from "@/content/testimonials";
import { photos } from "@/content/photos";
import { site } from "@/content/site";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function Voices() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const t = testimonials[i];

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % testimonials.length), 7000);
    return () => clearInterval(id);
  }, [paused, reduce]);

  return (
    <section aria-labelledby="voices-title" className="section-y">
      <div className="container-x grid gap-6 lg:grid-cols-12">
        <div
          className="relative flex min-h-[28rem] flex-col justify-between overflow-hidden rounded-hero bg-white p-8 ring-1 ring-line sm:p-12 lg:col-span-8"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          <div className="flex items-center justify-between">
            <p className="label text-graphite">
              <span className="text-sun-ink">11</span> — In their words
            </p>
            <Icon.Quote size={40} className="text-sun" />
          </div>
          <h2 id="voices-title" className="sr-only">
            What our customers say
          </h2>
          <div className="relative mt-10 min-h-[12rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote className="text-[clamp(1.6rem,3vw,2.6rem)] font-medium leading-[1.15] tracking-[-0.03em] text-ink">
                  “{t.body}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-full bg-sun-soft text-lg font-semibold text-sun-ink">
                    {t.name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s*/, "").charAt(0)}
                  </span>
                  <span>
                    <span className="block font-semibold">{t.name}</span>
                    <span className="block text-sm text-graphite">{t.title}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="mt-10 flex items-center gap-2">
            {testimonials.map((x, k) => (
              <button
                key={x.name}
                type="button"
                aria-label={`Show testimonial from ${x.name}`}
                aria-pressed={k === i}
                onClick={() => setI(k)}
                className="group relative h-10 w-12"
              >
                <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-stone-200">
                  <span
                    className={cn("block h-full origin-left rounded-full bg-ink", k === i ? "scale-x-100" : "scale-x-0")}
                    style={k === i && !paused && !reduce ? { animation: "grow 7s linear" } : undefined}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>

        <figure className="group relative min-h-[28rem] overflow-hidden rounded-hero bg-ink text-white lg:col-span-4">
          <Image
            src={photos.award2025.src}
            alt={photos.award2025.alt}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover object-top opacity-85 transition-transform duration-[1.4s] ease-[var(--ease-sun)] group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 p-7">
            <p className="label text-sun">Recognition · December 2025</p>
            <p className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.03em]">{site.award.title}</p>
            <p className="mt-2 text-sm text-white/70">Presented at {site.award.event}.</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
