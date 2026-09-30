"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { telLink, whatsappLink } from "@/content/site";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

/** WhatsApp bubble on desktop; a thumb-reach action bar on phones once the visitor scrolls. */
export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setShow(window.scrollY > 520));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener"
        aria-label="Chat with Genius Solar on WhatsApp"
        className="group fixed bottom-6 right-6 z-40 hidden size-14 place-items-center rounded-full bg-[#1f9e55] text-white shadow-[0_18px_40px_-14px_rgb(31_158_85/0.7)] transition-transform duration-500 ease-[var(--ease-sun)] hover:scale-105 sm:grid"
      >
        <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[#1f9e55] animate-pulse-ring" />
        <Icon.WhatsApp size={26} className="relative" />
        <span className="pointer-events-none absolute right-[calc(100%+12px)] whitespace-nowrap rounded-full bg-ink px-4 py-2 text-sm font-medium text-white opacity-0 shadow-soft transition-all duration-300 group-hover:opacity-100">
          Send us your bill on WhatsApp
        </span>
      </a>

      <nav
        aria-label="Quick actions"
        aria-hidden={!show}
        className={cn(
          "fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-1 rounded-full bg-ink p-1.5 shadow-lift transition-[transform,opacity] duration-500 ease-[var(--ease-sun)] sm:hidden",
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[120%] opacity-0",
        )}
        style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }}
      >
        <a href={telLink()} tabIndex={show ? 0 : -1} className="flex h-12 items-center justify-center gap-2 rounded-full text-sm font-medium text-white">
          <Icon.Phone size={18} /> Call
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener"
          tabIndex={show ? 0 : -1}
          className="flex h-12 items-center justify-center gap-2 rounded-full text-sm font-medium text-white"
        >
          <Icon.WhatsApp size={18} /> Chat
        </a>
        <Link href="/solar-calculator" tabIndex={show ? 0 : -1} className="flex h-12 items-center justify-center gap-2 rounded-full bg-sun text-sm font-semibold text-ink">
          <Icon.Sun size={18} /> Savings
        </Link>
      </nav>
    </>
  );
}
