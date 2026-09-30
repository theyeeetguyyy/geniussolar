import Image from "next/image";
import Link from "next/link";
import { photos } from "@/content/photos";
import { site } from "@/content/site";
import { SectionHeader } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/motion";
import { Icon } from "@/components/icons";

export function WhyGenius() {
  return (
    <section aria-labelledby="why-title" className="section-y">
      <div className="container-x">
        <SectionHeader
          index="04"
          eyebrow="Why Genius"
          title="Engineered for Indore roofs, *not* copied from a brochure."
          align="split"
          lead="Most rooftop problems — rust, leaks, shading, lost terraces, stuck subsidies — are decided before the first panel goes up. That is where we spend our time."
        />

        <div className="mt-16 grid gap-4 lg:mt-24 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
          {/* Elevated structures — hero card */}
          <SpotlightCard className="reveal-scale rounded-panel bg-ink text-white lg:col-span-7 lg:row-span-2" tilt={false}>
            <div className="relative h-full min-h-[34rem]">
              <Image
                src={photos.elevated2025.src}
                alt={photos.elevated2025.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover opacity-80 transition-transform duration-[1.6s] ease-[var(--ease-sun)] group-hover/card:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
                <p className="label text-sun">Signature</p>
                <h3 className="mt-4 max-w-lg text-[clamp(1.8rem,3vw,2.75rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
                  Elevated structures that give your terrace back.
                </h3>
                <p className="mt-4 max-w-md text-white/75">
                  Tall galvanised columns on concrete pedestals lift the array above tanks, parapets and neighbours&apos; shadows — and
                  leave a shaded, usable terrace underneath.
                </p>
                <Link
                  href="/services/elevated-solar-structure-indore"
                  className="mt-6 inline-flex items-center gap-2 font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-sun"
                >
                  How we build them <Icon.ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </SpotlightCard>

          {/* Subsidy */}
          <SpotlightCard className="reveal-scale rounded-panel bg-white p-7 ring-1 ring-line sm:p-9 lg:col-span-5">
            <Icon.Stamp size={32} className="text-sun-ink" />
            <h3 className="mt-6 text-h3 font-semibold">₹78,000 subsidy — filed, tracked and followed up by us.</h3>
            <p className="mt-3 text-graphite">
              Portal registration, DISCOM feasibility, inspection, net meter and subsidy claim under PM Surya Ghar. You sign; we chase.
            </p>
            <Link href="/solar-subsidy-mp" className="mt-5 inline-flex items-center gap-2 font-medium underline decoration-sun decoration-2 underline-offset-4">
              Subsidy guide <Icon.ArrowRight size={18} />
            </Link>
          </SpotlightCard>

          {/* Warranties */}
          <SpotlightCard className="reveal-scale rounded-panel bg-sun-wash p-7 ring-1 ring-sun/20 sm:p-9 lg:col-span-5">
            <div className="grid grid-cols-3 gap-4">
              {[
                [site.promises.panelWarrantyYears, "yr panel warranty"],
                [site.promises.inverterWarrantyYears, "yr inverter warranty"],
                [site.promises.freeServiceYears, "yr free service"],
              ].map(([n, l]) => (
                <div key={l as string}>
                  <p className="text-[clamp(2.4rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.05em] tabular">{n}</p>
                  <p className="mt-2 text-sm text-ink/70">{l}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 border-t border-ink/10 pt-5 text-sm text-ink/75">
              Manufacturer warranties on modules and inverters, plus our own free service visits for the first five years.
            </p>
          </SpotlightCard>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: "Shield" as const,
              t: "Rust-resistant, braced frames",
              b: "Galvanised steel, cross-bracing and anchored pedestals, built for Indore's pre-monsoon storms.",
            },
            {
              icon: "Layers" as const,
              t: "Your choice of brand",
              b: "Adani, Vikram Solar, Luminous modules; Havells, Luminous and Polycab inverters. We explain the trade-offs, you choose.",
            },
            {
              icon: "Rupee" as const,
              t: "Bank finance & EMI",
              b: "Help with PM Surya Ghar collateral-free loans and finance from public and private banks.",
            },
          ].map((f) => {
            const I = Icon[f.icon];
            return (
              <SpotlightCard key={f.t} className="reveal rounded-panel bg-white p-7 ring-1 ring-line sm:p-8">
                <span className="grid size-12 place-items-center rounded-2xl bg-stone-100 text-ink transition-colors duration-500 group-hover/card:bg-sun">
                  <I size={24} />
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.025em]">{f.t}</h3>
                <p className="mt-2 text-graphite">{f.b}</p>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
