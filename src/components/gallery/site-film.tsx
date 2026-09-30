"use client";

import { useEffect, useRef, useState } from "react";
import type { StaticImageData } from "next/image";
import { Icon } from "@/components/icons";

/** Muted site walkthrough that only loads and plays while on screen. */
export function SiteFilm({ src, poster, caption }: { src: string; poster: StaticImageData; caption: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoad(true);
          if (!reduce) v.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {});
    else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <figure className="relative overflow-hidden rounded-hero bg-ink">
      <video
        ref={ref}
        className="aspect-video w-full object-cover"
        poster={poster.src}
        muted
        loop
        playsInline
        preload="none"
        aria-label={caption}
      >
        {load ? <source src={src} type="video/mp4" /> : null}
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute bottom-5 right-5 grid size-12 place-items-center rounded-full bg-white/85 text-ink backdrop-blur transition-transform hover:scale-105"
      >
        {playing ? (
          <span className="flex gap-1">
            <span className="h-4 w-1 rounded bg-ink" />
            <span className="h-4 w-1 rounded bg-ink" />
          </span>
        ) : (
          <Icon.Play size={20} />
        )}
      </button>
      <figcaption className="label absolute left-5 top-5 rounded-full bg-black/40 px-3 py-1.5 text-white backdrop-blur">{caption}</figcaption>
    </figure>
  );
}
