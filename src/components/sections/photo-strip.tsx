import Image from "next/image";
import Link from "next/link";
import type { Photo } from "@/content/photos";
import { Icon } from "@/components/icons";

/** Editorial strip of real installation photos, linking into the portfolio. */
export function PhotoStrip({ photos, title = "From our rooftops", href = "/projects" }: { photos: Photo[]; title?: string; href?: string }) {
  return (
    <section aria-label={title} className="mb-24 overflow-hidden">
      <div className="container-x flex items-end justify-between gap-6">
        <p className="label text-graphite">{title}</p>
        <Link href={href} className="inline-flex items-center gap-2 text-sm font-medium underline decoration-sun decoration-2 underline-offset-4">
          Full portfolio <Icon.ArrowRight size={16} />
        </Link>
      </div>
      <ul className="no-scrollbar mt-6 flex snap-x gap-3 overflow-x-auto px-5 sm:px-8 lg:px-12">
        {photos.map((p, i) => (
          <li key={p.id} className={`relative shrink-0 snap-start overflow-hidden rounded-card bg-stone-100 ${i % 3 === 0 ? "h-80 w-64" : "h-80 w-52"}`}>
            <Image src={p.src} alt={p.alt} fill sizes="260px" className="object-cover transition-transform duration-700 hover:scale-105" />
          </li>
        ))}
      </ul>
    </section>
  );
}
