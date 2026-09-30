import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Photo } from "@/content/photos";
import { SplitText } from "@/components/ui/section";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="label flex flex-wrap items-center gap-2 text-graphite">
        {all.map((c, i) => (
          <li key={c.path} className="flex items-center gap-2">
            {i > 0 ? <Icon.ChevronRight size={12} className="opacity-50" /> : null}
            {i === all.length - 1 ? (
              <span aria-current="page" className="text-ink">
                {c.name}
              </span>
            ) : (
              <Link href={c.path} className="transition-colors hover:text-ink">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Standard inner-page hero: breadcrumbs, eyebrow, split-reveal H1, lead,
 * actions and an optional photo or custom media slot.
 */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
  photo,
  media,
  className,
  tone = "paper",
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
  photo?: Photo;
  media?: ReactNode;
  className?: string;
  tone?: "paper" | "sun";
}) {
  const hasMedia = Boolean(photo || media);
  return (
    <section
      className={cn(
        "relative overflow-hidden pb-16 pt-32 sm:pt-36 lg:pb-24 lg:pt-40",
        tone === "sun" && "bg-[radial-gradient(90%_70%_at_85%_0%,#ffe9b8_0%,#fff6e0_35%,transparent_70%)]",
        className,
      )}
    >
      <div className="container-x">
        <Breadcrumbs items={crumbs} />
        <div className={cn("mt-10 grid gap-12", hasMedia && "lg:grid-cols-12 lg:items-end")}>
          <div className={hasMedia ? "lg:col-span-7" : "max-w-5xl"}>
            {eyebrow ? (
              <p className="label load-fade flex items-center gap-3 text-graphite">
                <span className="size-1.5 rounded-full bg-sun" aria-hidden="true" />
                {eyebrow}
              </p>
            ) : null}
            <SplitText as="h1" mode="load" text={title} className="mt-6 text-display font-semibold" accentClassName="serif-accent text-sun-ink" />
            {lead ? (
              <div className="load-fade mt-7 max-w-2xl text-lead text-graphite" style={{ ["--d" as string]: "420ms" }}>
                {lead}
              </div>
            ) : null}
            {children ? (
              <div className="load-fade mt-9 flex flex-wrap items-center gap-3" style={{ ["--d" as string]: "560ms" }}>
                {children}
              </div>
            ) : null}
          </div>
          {photo ? (
            <div className="load-fade lg:col-span-5" style={{ ["--d" as string]: "300ms" }}>
              <figure className="relative aspect-[4/5] overflow-hidden rounded-hero bg-stone-100 shadow-lift">
                <Image src={photo.src} alt={photo.alt} fill preload sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/80 px-4 py-3 text-sm text-ink-2 backdrop-blur-xl">
                  {photo.caption}
                </figcaption>
              </figure>
            </div>
          ) : media ? (
            <div className="load-fade lg:col-span-5" style={{ ["--d" as string]: "300ms" }}>
              {media}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
