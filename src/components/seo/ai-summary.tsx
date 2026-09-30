import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * "In short" block: an 80–150 word factual summary placed near the top of a
 * page. Marked as speakable in the WebPage schema (.ai-summary) so assistants
 * and answer engines can quote it directly.
 */
export function AiSummary({
  children,
  facts,
  className,
  title = "In short",
}: {
  children: ReactNode;
  facts?: { k: string; v: string }[];
  className?: string;
  title?: string;
}) {
  return (
    <aside aria-label={title} className={cn("rounded-panel bg-white p-6 ring-1 ring-line sm:p-8", className)}>
      <p className="label flex items-center gap-2 text-sun-ink">
        <span className="size-1.5 rounded-full bg-sun" aria-hidden="true" />
        {title}
      </p>
      <div className="ai-summary mt-4 text-[1.05rem] leading-relaxed text-ink-2">{children}</div>
      {facts?.length ? (
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 sm:grid-cols-4">
          {facts.map((f) => (
            <div key={f.k}>
              <dt className="label text-graphite">{f.k}</dt>
              <dd className="mt-1.5 font-semibold tabular text-ink">{f.v}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </aside>
  );
}
