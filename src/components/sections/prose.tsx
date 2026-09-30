import type { ReactNode } from "react";
import { extractToc, renderMarkdown } from "@/lib/markdown";
import { cn } from "@/lib/utils";

/** Long-form body with a sticky table of contents on large screens. */
export function Prose({ markdown, aside, className }: { markdown: string; aside?: ReactNode; className?: string }) {
  const toc = extractToc(markdown);
  return (
    <div className={cn("container-x grid gap-12 lg:grid-cols-12", className)}>
      <aside className="hidden lg:col-span-3 lg:block">
        <div className="sticky top-28 space-y-8">
          {toc.length > 2 ? (
            <nav aria-label="On this page">
              <p className="label text-graphite">On this page</p>
              <ol className="mt-4 space-y-2.5 border-l border-line">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-graphite transition-colors hover:border-sun hover:text-ink">
                      {t.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          {aside}
        </div>
      </aside>
      <article className="prose-solar min-w-0 lg:col-span-8 lg:col-start-5" dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }} />
    </div>
  );
}
