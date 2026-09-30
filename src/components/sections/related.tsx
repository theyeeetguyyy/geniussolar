import Link from "next/link";
import { linkLabel, pageByPath } from "@/content/registry";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

/** Semantic internal links: every page strengthens its neighbours. */
export function RelatedLinks({
  paths,
  title = "Keep reading",
  className,
}: {
  paths: string[];
  title?: string;
  className?: string;
}) {
  const pages = paths.map(pageByPath).filter((p): p is NonNullable<typeof p> => Boolean(p));
  if (!pages.length) return null;
  return (
    <section aria-label={title} className={cn("section-y pt-0", className)}>
      <div className="container-x">
        <p className="label text-graphite">{title}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pages.map((p) => (
            <li key={p.path}>
              <Link
                href={p.path}
                className="group flex h-full flex-col justify-between gap-6 rounded-card bg-white p-6 ring-1 ring-line transition-all duration-500 hover:-translate-y-1 hover:shadow-soft hover:ring-ink/15"
              >
                <span>
                  <span className="label text-sun-ink">{p.section}</span>
                  <span className="mt-3 block text-lg font-semibold leading-snug tracking-[-0.02em]">{linkLabel(p)}</span>
                  <span className="mt-2 line-clamp-2 block text-sm text-graphite">{p.description}</span>
                </span>
                <Icon.ArrowUpRight size={20} className="text-graphite transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
