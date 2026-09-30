"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components/icons";

export interface SearchItem {
  path: string;
  title: string;
  description: string;
  section: string;
}

/** Small client-side search over every indexable page (used on the 404 page). */
export function SiteSearch({ items }: { items: SearchItem[] }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return items.filter((i) => ["Solutions", "Tools", "Guides"].includes(i.section)).slice(0, 8);
    return items
      .map((i) => {
        const hay = `${i.title} ${i.description} ${i.path}`.toLowerCase();
        const score = terms.reduce((s, t) => s + (hay.includes(t) ? (i.title.toLowerCase().includes(t) ? 3 : 1) : 0), 0);
        return { i, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((r) => r.i);
  }, [q, items]);

  return (
    <div>
      <label className="flex h-16 items-center gap-3 rounded-2xl bg-white px-5 shadow-soft ring-1 ring-line focus-within:ring-2 focus-within:ring-ink">
        <Icon.Search size={22} className="text-graphite" />
        <span className="sr-only">Search the site</span>
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try “3 kW price”, “subsidy”, “Rau”, “net metering”…"
          className="h-full w-full bg-transparent text-lg outline-none placeholder:text-mute"
        />
      </label>
      <ul className="mt-6 divide-y divide-line overflow-hidden rounded-2xl bg-white ring-1 ring-line">
        {results.map((r) => (
          <li key={r.path}>
            <Link href={r.path} className="flex items-start justify-between gap-6 p-5 hover:bg-stone-50">
              <span>
                <span className="label block text-sun-ink">{r.section}</span>
                <span className="mt-1 block font-semibold">{r.title.split(" | ")[0]}</span>
                <span className="mt-1 line-clamp-1 block text-sm text-graphite">{r.description}</span>
              </span>
              <Icon.ArrowUpRight size={18} className="mt-1 shrink-0 text-graphite" />
            </Link>
          </li>
        ))}
        {!results.length ? <li className="p-5 text-graphite">No matches. Try a simpler word, or call us.</li> : null}
      </ul>
    </div>
  );
}
