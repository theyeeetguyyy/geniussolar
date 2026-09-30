import type { Faq } from "@/content/faqs";
import { cn } from "@/lib/utils";

/** Zero-JS accordion built on <details>, so every answer is in the HTML for crawlers. */
export function FaqList({ faqs, className, openFirst = false }: { faqs: Pick<Faq, "q" | "a">[]; className?: string; openFirst?: boolean }) {
  return (
    <div className={cn("border-t border-line", className)}>
      {faqs.map((f, i) => (
        <details key={f.q} className="faq group border-b border-line" open={openFirst && i === 0}>
          <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 text-left">
            <h3 className="text-lg font-medium tracking-[-0.015em] text-ink transition-colors group-hover:text-ink-2 sm:text-xl">{f.q}</h3>
            <span
              aria-hidden="true"
              className="faq-icon relative mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-stone-100 text-ink transition-[transform,background-color] duration-500 ease-[var(--ease-sun)]"
            >
              <span className="absolute h-[1.5px] w-3.5 rounded bg-current" />
              <span className="absolute h-3.5 w-[1.5px] rounded bg-current" />
            </span>
          </summary>
          <p className="max-w-3xl pb-7 pr-12 text-graphite">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
