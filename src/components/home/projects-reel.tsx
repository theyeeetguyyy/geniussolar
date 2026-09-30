"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { projects, formatMonth } from "@/content/projects";
import { photos } from "@/content/photos";
import { Icon } from "@/components/icons";

export function ProjectsReel() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const measure = () => {
      setDesktop(mq.matches);
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth + 48));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    mq.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const raw = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);
  const x = useSpring(raw, { stiffness: 120, damping: 28, mass: 0.3 });
  const pinned = desktop && !reduce;

  const cards = projects.map((p) => ({ ...p, photo: photos[p.cover] }));

  return (
    <section
      ref={section}
      aria-labelledby="projects-title"
      className="relative bg-ink text-white"
      style={{ height: pinned ? `calc(100svh + ${distance}px)` : undefined }}
    >
      <div className={pinned ? "sticky top-0 flex h-svh flex-col justify-center overflow-hidden" : "py-24"}>
        <div className="container-x flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-white/60">
              <span className="text-sun">08</span> — Recent rooftops
            </p>
            <h2 id="projects-title" className="mt-5 text-h2 font-semibold">
              Real roofs. <span className="serif-accent text-sun">Real</span> Indore.
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex h-12 items-center gap-3 rounded-full bg-white/10 pl-5 pr-1.5 font-medium ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/15"
          >
            All projects
            <span className="grid size-9 place-items-center rounded-full bg-sun text-ink transition-transform group-hover:-rotate-45">
              <Icon.ArrowRight size={18} />
            </span>
          </Link>
        </div>

        <motion.div
          ref={track}
          style={pinned ? { x } : undefined}
          className={
            pinned
              ? "mt-12 flex w-max gap-5 pl-[max(1.25rem,calc((100vw-88rem)/2+3rem))] pr-12"
              : "no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8"
          }
        >
          {cards.map((p, i) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group relative block h-[62svh] max-h-[40rem] min-h-[26rem] w-[78vw] shrink-0 snap-start overflow-hidden rounded-panel bg-ink-2 sm:w-[22rem] lg:w-[26rem]"
            >
              <Image
                src={p.photo.src}
                alt={p.photo.alt}
                fill
                sizes="(min-width: 1024px) 26rem, 78vw"
                className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-sun)] group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute left-5 top-5 flex gap-2">
                <span className="label rounded-full bg-white/15 px-3 py-1.5 text-white backdrop-blur">{String(i + 1).padStart(2, "0")}</span>
                {p.completed ? <span className="label rounded-full bg-white/15 px-3 py-1.5 text-white backdrop-blur">{formatMonth(p.completed)}</span> : null}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="label text-sun">{p.locality ? `${p.locality}, ${p.city}` : p.city}</p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.03em]">{p.title}</h3>
                <p className="mt-2 text-sm text-white/70">{p.structure}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/90">
                  Case study <Icon.ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
          <Link
            href="/projects"
            className="group relative flex h-[62svh] max-h-[40rem] min-h-[26rem] w-[78vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-panel p-8 text-ink sun-gradient sm:w-[22rem] lg:w-[26rem]"
          >
            <Icon.Sun size={48} className="animate-spin-slow" />
            <div>
              <p className="text-[2.4rem] font-semibold leading-[0.95] tracking-[-0.045em]">See every rooftop in the portfolio</p>
              <span className="mt-6 inline-flex items-center gap-2 font-medium">
                Open portfolio <Icon.ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
