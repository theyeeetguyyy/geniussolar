"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav, type NavGroup } from "@/content/nav";
import { primaryPhone, site, telLink, whatsappLink } from "@/content/site";
import { Icon } from "@/components/icons";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [menu, setMenu] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const menuRef = useRef(menu);
  useEffect(() => {
    menuRef.current = menu;
  }, [menu]);

  // Scroll state with a rAF-throttled passive listener (no animation library needed).
  useEffect(() => {
    let prev = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        setHidden(y > 480 && y > prev && !menuRef.current);
        prev = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close menus whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenu(null);
    setMobile(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobile]);

  const openMenu = (label: string | null) => {
    clearTimeout(closeTimer.current);
    setMenu(label);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 140);
  };

  const active = mainNav.find((g) => g.label === menu);
  const isActive = (g: NavGroup) =>
    (g.href && pathname.startsWith(g.href)) || g.columns?.some((c) => c.links.some((l) => l.href !== "/" && pathname.startsWith(l.href)));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 pt-3 transition-transform duration-500 ease-[var(--ease-sun)] sm:pt-4",
          hidden && "-translate-y-[110px]",
        )}
        onPointerLeave={scheduleClose}
      >
        <div className="container-x">
          <div
            className={cn(
              "relative flex h-16 items-center justify-between gap-4 rounded-full pl-4 pr-2 transition-[background-color,box-shadow,backdrop-filter] duration-500 sm:pl-5",
              scrolled || menu
                ? "bg-white/80 shadow-[0_1px_0_rgb(255_255_255/0.8)_inset,0_12px_40px_-20px_rgb(17_19_21/0.25)] ring-1 ring-line backdrop-blur-xl backdrop-saturate-150"
                : "bg-transparent",
            )}
          >
            <Logo />

            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {mainNav.map((g) => (
                  <li key={g.label} onPointerEnter={() => openMenu(g.columns ? g.label : null)}>
                    {g.columns ? (
                      <button
                        type="button"
                        aria-expanded={menu === g.label}
                        aria-controls="mega-menu"
                        onClick={() => openMenu(menu === g.label ? null : g.label)}
                        className={cn(
                          "flex h-10 items-center gap-1 rounded-full px-4 text-[0.95rem] font-medium tracking-[-0.01em] transition-colors",
                          menu === g.label ? "bg-stone-100 text-ink" : "text-ink-2 hover:text-ink",
                        )}
                      >
                        {g.label}
                        <Icon.ChevronDown
                          size={16}
                          className={cn("transition-transform duration-300", menu === g.label && "rotate-180")}
                        />
                        {isActive(g) ? <span className="sr-only">(current section)</span> : null}
                      </button>
                    ) : (
                      <Link
                        href={g.href!}
                        aria-current={isActive(g) ? "page" : undefined}
                        className={cn(
                          "relative flex h-10 items-center rounded-full px-4 text-[0.95rem] font-medium tracking-[-0.01em] transition-colors hover:text-ink",
                          isActive(g) ? "text-ink" : "text-ink-2",
                        )}
                      >
                        {g.label}
                        {isActive(g) ? <span className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-sun" /> : null}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-1.5">
              <a
                href={telLink()}
                className="hidden h-11 items-center gap-2 rounded-full px-4 text-[0.95rem] font-medium tabular text-ink-2 transition-colors hover:bg-stone-100 hover:text-ink xl:flex"
              >
                <Icon.Phone size={17} />
                {primaryPhone.display}
              </a>
              <Link
                href="/contact"
                className="group/cta hidden h-11 items-center gap-2 rounded-full bg-ink pl-5 pr-1.5 text-[0.95rem] font-medium text-white transition-colors hover:bg-ink-2 sm:flex"
              >
                Free quote
                <span className="grid size-8 place-items-center rounded-full bg-sun text-ink transition-transform duration-500 ease-[var(--ease-sun)] group-hover/cta:-rotate-45">
                  <Icon.ArrowRight size={16} />
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setMobile(true)}
                aria-label="Open menu"
                aria-expanded={mobile}
                className="grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-stone-100 lg:hidden"
              >
                <Icon.Menu size={22} />
              </button>
            </div>

            {active?.columns ? (
              <div
                id="mega-menu"
                key={active.label}
                onPointerEnter={() => openMenu(active.label)}
                className="menu-in absolute inset-x-0 top-[calc(100%+10px)] hidden origin-top lg:block"
              >
                <MegaPanel group={active} />
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {mobile ? <MobileMenu onClose={() => setMobile(false)} /> : null}
    </>
  );
}

function MegaPanel({ group }: { group: NavGroup }) {
  return (
    <div className="grid grid-cols-12 gap-2 rounded-[1.75rem] bg-white/95 p-2 shadow-lift ring-1 ring-line backdrop-blur-xl">
      <div className={cn("grid gap-8 p-6", group.feature ? "col-span-8" : "col-span-12", group.columns!.length > 1 ? "grid-cols-2" : "grid-cols-1")}>
        {group.columns!.map((col, ci) => (
          <div key={col.title}>
            <p className="label text-graphite">{col.title}</p>
            <ul className={cn("mt-4 grid gap-1", col.links.length > 4 && group.columns!.length === 1 && "grid-cols-2")}>
              {col.links.map((l, i) => {
                const I = l.icon ? Icon[l.icon] : null;
                return (
                  <li key={l.href} className="item-in" style={{ ["--d" as string]: `${40 * (i + ci * 2)}ms` }}>
                    <Link href={l.href} className="group/ml flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-stone-50">
                      {I ? (
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-stone-100 text-ink transition-colors group-hover/ml:bg-sun-soft">
                          <I size={20} />
                        </span>
                      ) : null}
                      <span className="flex flex-col">
                        <span className="font-medium tracking-[-0.01em] text-ink">{l.label}</span>
                        {l.description ? <span className="mt-0.5 text-sm text-graphite">{l.description}</span> : null}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      {group.feature ? (
        <Link
          href={group.feature.href}
          className="group/f relative col-span-4 flex min-h-64 flex-col justify-end overflow-hidden rounded-[1.4rem] p-6 sun-gradient"
        >
          <span aria-hidden="true" className="absolute -right-10 -top-10 size-48 rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.55),transparent_70%)] transition-transform duration-700 group-hover/f:scale-125" />
          <Icon.Sun size={40} className="absolute right-6 top-6 text-ink/80 animate-spin-slow" />
          <p className="relative text-2xl font-semibold tracking-[-0.03em] text-ink">{group.feature.title}</p>
          <p className="relative mt-2 text-[0.95rem] text-ink/75">{group.feature.body}</p>
          <span className="relative mt-5 inline-flex items-center gap-2 font-medium text-ink">
            {group.feature.cta}
            <Icon.ArrowRight size={18} className="transition-transform group-hover/f:translate-x-1" />
          </span>
        </Link>
      ) : null}
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const items = mainNav.flatMap((g) => (g.href ? [{ label: g.label, href: g.href }] : g.columns!.flatMap((c) => c.links)));
  const primary = [
    { label: "Homes", href: "/residential-solar-indore" },
    { label: "Business", href: "/commercial-solar-indore" },
    { label: "Projects", href: "/projects" },
    { label: "Calculator", href: "/solar-calculator" },
    { label: "Subsidy", href: "/solar-subsidy-mp" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];
  const secondary = items.filter((i) => !primary.some((p) => p.href === i.href) && i.label !== "Projects" && i.label !== "About");
  return (
    <div role="dialog" aria-modal="true" aria-label="Menu" className="menu-reveal fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-paper lg:hidden" data-lenis-prevent>
      <div className="container-x flex h-[76px] shrink-0 items-center justify-between pt-3">
        <Logo />
        <button type="button" onClick={onClose} aria-label="Close menu" className="grid size-11 place-items-center rounded-full bg-stone-100 text-ink">
          <Icon.Close size={22} />
        </button>
      </div>
      <nav aria-label="Mobile" className="container-x mt-6 flex-1">
        <ul>
          {primary.map((l, i) => (
            <li key={l.href} className="item-in border-b border-line" style={{ ["--d" as string]: `${120 + i * 45}ms` }}>
              <Link href={l.href} className="flex items-center justify-between py-3.5 text-[2.1rem] font-semibold leading-none tracking-[-0.04em] text-ink">
                {l.label}
                <Icon.ArrowUpRight size={22} className="text-graphite" />
              </Link>
            </li>
          ))}
        </ul>
        <ul className="item-in mt-8 flex flex-wrap gap-2" style={{ ["--d" as string]: "500ms" }}>
          {secondary.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-flex h-10 items-center rounded-full bg-white px-4 text-sm font-medium text-ink-2 ring-1 ring-line">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="container-x sticky bottom-0 grid grid-cols-2 gap-2 bg-gradient-to-t from-paper via-paper to-transparent pb-6 pt-8">
        <a href={telLink()} className="flex h-14 items-center justify-center gap-2 rounded-full bg-white font-medium text-ink ring-1 ring-line">
          <Icon.Phone size={18} /> Call
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener"
          className="flex h-14 items-center justify-center gap-2 rounded-full bg-ink font-medium text-white"
        >
          <Icon.WhatsApp size={18} /> WhatsApp
        </a>
        <p className="label col-span-2 mt-3 text-center text-graphite">{site.hoursLabel}</p>
      </div>
    </div>
  );
}
