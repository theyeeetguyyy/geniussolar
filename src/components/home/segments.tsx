import Image from "next/image";
import Link from "next/link";
import { photos } from "@/content/photos";
import { Icon } from "@/components/icons";
import { SectionHeader } from "@/components/ui/section";

const segments = [
  {
    href: "/residential-solar-indore",
    kicker: "Homes",
    title: "1–15 kW for independent houses and duplexes",
    points: ["₹78,000 subsidy on 3 kW+", "Elevated or standard structures", "Bank finance & EMI options"],
    photo: photos.familyNewSystem,
  },
  {
    href: "/housing-society-solar-indore",
    kicker: "Housing societies",
    title: "Common-area solar for lifts, pumps and lighting",
    points: ["₹18,000/kW subsidy for RWAs", "Cuts maintenance charges", "Sized to common meter load"],
    photo: photos.wideArray,
  },
  {
    href: "/commercial-solar-indore",
    kicker: "Business & industry",
    title: "10 kW to 500 kW for factories, offices, schools, hospitals",
    points: ["3–4 year typical payback", "Metal-sheet & RCC roofs", "Remote monitoring & AMC"],
    photo: photos.metalRoof,
  },
];

export function Segments() {
  return (
    <section aria-labelledby="segments-title" className="section-y bg-white">
      <div className="container-x">
        <SectionHeader index="10" eyebrow="Who we build for" title="One engineering standard. *Three* kinds of roof." />
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {segments.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="reveal group relative flex min-h-[34rem] flex-col justify-end overflow-hidden rounded-panel bg-ink p-7 text-white"
            >
              <Image
                src={s.photo.src}
                alt={s.photo.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover opacity-75 transition-transform duration-[1.4s] ease-[var(--ease-sun)] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/5" />
              <div className="relative">
                <p className="label text-sun">{s.kicker}</p>
                <h3 className="mt-3 text-[1.7rem] font-semibold leading-[1.08] tracking-[-0.03em]">{s.title}</h3>
                <ul className="mt-5 space-y-2 text-sm text-white/80">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <Icon.Check size={16} className="text-sun" /> {p}
                    </li>
                  ))}
                </ul>
                <span className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-white/10 pl-4 pr-1.5 text-sm font-medium ring-1 ring-white/20 backdrop-blur transition-colors group-hover:bg-white group-hover:text-ink">
                  Explore
                  <span className="grid size-8 place-items-center rounded-full bg-sun text-ink">
                    <Icon.ArrowRight size={16} />
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
