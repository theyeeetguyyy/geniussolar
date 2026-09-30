import Link from "next/link";
import { footerNav } from "@/content/nav";
import { areas } from "@/content/areas";
import { systemSizes } from "@/content/systems";
import { site, telLink, whatsappLink } from "@/content/site";
import { Icon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { SplitText } from "@/components/ui/section";
import { Logo } from "./logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      {/* Sun horizon */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[42rem] w-[72rem] -translate-x-1/2 -translate-y-[62%] rounded-full sun-gradient opacity-90" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[26rem] bg-gradient-to-b from-transparent via-ink/60 to-ink" />

      <div className="container-x relative pt-44 sm:pt-56">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="label text-sun">Ready when the sun is</p>
            <SplitText as="p" text="Let the *sun* pay your bills." className="mt-6 text-display font-semibold text-white" />
          </div>
          <div className="flex flex-col justify-end gap-3 lg:col-span-4 lg:items-end">
            <ButtonLink href="/solar-calculator" variant="sun" size="lg">
              Calculate my savings
            </ButtonLink>
            <ButtonLink href={whatsappLink()} variant="white" size="lg" icon="WhatsApp">
              WhatsApp us
            </ButtonLink>
          </div>
        </div>

        <div className="mt-24 grid gap-12 border-t border-white/10 pt-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="white" />
            <address className="mt-8 space-y-5 not-italic text-white/75">
              <p className="flex gap-3">
                <Icon.Pin size={20} className="mt-0.5 shrink-0 text-sun" />
                <span>
                  {site.address.line1},<br />
                  {site.address.line2},<br />
                  {site.address.landmark}, {site.address.city} {site.address.postalCode}
                </span>
              </p>
              <p className="flex gap-3">
                <Icon.Phone size={20} className="mt-0.5 shrink-0 text-sun" />
                <span className="flex flex-col gap-1 tabular">
                  {site.phones.map((p) => (
                    <a key={p.e164} href={telLink(p.e164)} className="hover:text-white">
                      {p.display} <span className="text-white/60">· {p.label}</span>
                    </a>
                  ))}
                </span>
              </p>
              <p className="flex gap-3">
                <Icon.Mail size={20} className="mt-0.5 shrink-0 text-sun" />
                <a href={`mailto:${site.email}`} className="break-all hover:text-white">
                  {site.email}
                </a>
              </p>
              <p className="flex gap-3">
                <Icon.Clock size={20} className="mt-0.5 shrink-0 text-sun" />
                <span>{site.hoursLabel}</span>
              </p>
            </address>
            <a
              href={site.maps.url}
              target="_blank"
              rel="noopener"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-sun"
            >
              Open in Google Maps <Icon.ArrowUpRight size={16} />
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            {footerNav.map((col) => (
              <div key={col.title}>
                <p className="label text-white/50">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[0.95rem] text-white/80 transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-2">
          <div>
            <p className="label text-white/50">Solar installation across Indore</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/solar-installation/${a.slug}`}
                    className="inline-flex h-8 items-center rounded-full bg-white/5 px-3 text-[0.8rem] text-white/70 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label text-white/50">Solar systems by size</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {systemSizes.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/solar-systems/${s.slug}`}
                    className="inline-flex h-8 items-center rounded-full bg-white/5 px-3 text-[0.8rem] tabular text-white/70 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {s.kw} kW solar system
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 py-8 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}, Indore. Proprietor: {site.founder.name}.
          </p>
          <p className="label text-white/60">Made in Indore · 22.75° N 75.89° E</p>
        </div>
        <p className="pb-28 text-xs leading-relaxed text-white/60 sm:pb-10">
          Brand names such as Adani Solar, Vikram Solar, Havells, Luminous and Polycab are trademarks of their respective owners and are
          mentioned only to identify products we supply and install. Savings, prices and subsidy figures on this site are estimates for
          guidance; your quotation is based on a site survey and current government rules.
        </p>
      </div>
    </footer>
  );
}
