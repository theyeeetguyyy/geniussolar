import type { Metadata } from "next";
import { allPages } from "@/content/registry";
import { primaryPhone, telLink } from "@/content/site";
import { SiteSearch } from "@/components/sections/site-search";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Genius Solar Services" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const items = allPages().map(({ path, title, description, section }) => ({ path, title, description, section }));
  return (
    <section className="relative overflow-hidden pb-28 pt-36">
      <div aria-hidden="true" className="absolute left-1/2 top-0 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full sun-glow" />
      <div className="container-x relative max-w-3xl">
        <p className="label text-graphite">Error 404</p>
        <h1 className="mt-6 text-display font-semibold">
          This page is in the <span className="serif-accent text-sun-ink">shade</span>.
        </h1>
        <p className="mt-6 text-lead text-graphite">The link may be old or mistyped. Search everything we&apos;ve published:</p>
        <div className="mt-10">
          <SiteSearch items={items} />
        </div>
        <a href={telLink()} className="mt-10 inline-flex items-center gap-2 font-medium">
          <Icon.Phone size={18} className="text-sun-ink" /> Or call {primaryPhone.display}
        </a>
      </div>
    </section>
  );
}
