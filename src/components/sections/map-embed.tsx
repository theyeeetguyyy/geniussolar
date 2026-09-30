"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { Icon } from "@/components/icons";
import { useNearViewport } from "@/lib/use-near-viewport";

/** Google Maps iframe that loads only when scrolled near, with a static fallback card. */
export function MapEmbed() {
  const [ref, near] = useNearViewport<HTMLDivElement>("300px");
  const [loaded, setLoaded] = useState(false);
  return (
    <div ref={ref} className="relative h-full min-h-[24rem] overflow-hidden rounded-hero bg-stone-100 ring-1 ring-line">
      {!loaded ? (
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_45%,#fff3d6,transparent_60%)]">
          <div className="text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-sun text-ink shadow-sun">
              <Icon.Pin size={26} />
            </span>
            <p className="mt-4 font-semibold">Swarna Palace, Vijay Nagar</p>
            <p className="text-sm text-graphite">Loading map…</p>
          </div>
        </div>
      ) : null}
      {near ? (
        <iframe
          title="Genius Solar Services on Google Maps"
          src={site.maps.embed}
          className="absolute inset-0 size-full border-0 grayscale-[35%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoaded(true)}
        />
      ) : null}
    </div>
  );
}
