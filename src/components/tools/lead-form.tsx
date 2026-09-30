"use client";

import { useState, type FormEvent } from "react";
import { primaryPhone, site, telLink, whatsappLink } from "@/content/site";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

const TYPES = ["Home", "Housing society", "Shop / office", "Factory / warehouse", "School / hospital", "Other"];
const BILLS = ["Under ₹1,500", "₹1,500–3,000", "₹3,000–6,000", "₹6,000–15,000", "₹15,000–50,000", "Above ₹50,000"];

/**
 * No backend: the form composes a structured WhatsApp message (or email) and
 * hands off to the visitor's app. Nothing is stored on our side.
 */
export function LeadForm({
  className,
  source = "Website",
  dark = false,
  areaNames = [],
}: {
  className?: string;
  source?: string;
  dark?: boolean;
  areaNames?: string[];
}) {
  const [sent, setSent] = useState<null | "whatsapp" | "email">(null);
  const [error, setError] = useState("");

  const compose = (form: HTMLFormElement) => {
    const d = new FormData(form);
    const name = String(d.get("name") || "").trim();
    const phone = String(d.get("phone") || "").replace(/[^\d+]/g, "");
    if (name.length < 2) return { error: "Please tell us your name." };
    if (phone.replace(/\D/g, "").length < 10) return { error: "Please enter a 10-digit mobile number." };
    const lines = [
      `New solar enquiry (${source})`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Area: ${d.get("area") || "—"}`,
      `Property: ${d.get("type") || "—"}`,
      `Monthly bill: ${d.get("bill") || "—"}`,
      d.get("message") ? `Note: ${d.get("message")}` : "",
    ].filter(Boolean);
    return { text: lines.join("\n"), name };
  };

  const submit = (form: HTMLFormElement | null, via: "whatsapp" | "email") => {
    if (!form) return;
    const r = compose(form);
    if ("error" in r) {
      setError(r.error!);
      return;
    }
    setError("");
    if (via === "whatsapp") window.open(whatsappLink(r.text), "_blank", "noopener");
    else window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Solar enquiry — ${r.name}`)}&body=${encodeURIComponent(r.text)}`;
    setSent(via);
  };

  const field = cn(
    "peer h-14 w-full rounded-2xl px-4 pt-5 text-[0.98rem] outline-none ring-1 transition-shadow placeholder:text-transparent focus:ring-2",
    dark ? "bg-white/5 text-white ring-white/15 focus:ring-sun" : "bg-white text-ink ring-line focus:ring-ink",
  );
  const lbl = cn(
    "pointer-events-none absolute left-4 top-4 origin-left text-[0.98rem] transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs",
    dark ? "text-white/55" : "text-graphite",
  );
  const select = cn(
    "h-14 w-full appearance-none rounded-2xl px-4 text-[0.98rem] outline-none ring-1 focus:ring-2",
    dark ? "bg-white/5 text-white ring-white/15 focus:ring-sun [&>option]:text-ink" : "bg-white text-ink ring-line focus:ring-ink",
  );

  return (
    <div className={className}>
      {sent ? (
          <div
            key="done"
            className={cn("menu-in rounded-panel p-8 text-center", dark ? "bg-white/5 ring-1 ring-white/10" : "bg-sun-wash ring-1 ring-sun/20")}
          >
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-sun text-ink">
              <Icon.Check size={30} />
            </span>
            <p className="mt-6 text-2xl font-semibold tracking-[-0.03em]">
              {sent === "whatsapp" ? "WhatsApp is ready — just press send." : "Your email is ready — just press send."}
            </p>
            <p className={cn("mt-2", dark ? "text-white/70" : "text-graphite")}>
              We reply within working hours ({site.hoursLabel}). In a hurry? Call{" "}
              <a href={telLink()} className="font-medium underline decoration-sun underline-offset-4">
                {primaryPhone.display}
              </a>
              .
            </p>
            <button type="button" onClick={() => setSent(null)} className="mt-6 text-sm font-medium underline underline-offset-4">
              Edit details
            </button>
          </div>
        ) : (
          <form key="form" noValidate onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              submit(e.currentTarget, "whatsapp");
            }} className="grid gap-3 sm:grid-cols-2">
            <div className="relative">
              <input id="lf-name" name="name" autoComplete="name" placeholder="Name" className={field} required />
              <label htmlFor="lf-name" className={lbl}>
                Your name
              </label>
            </div>
            <div className="relative">
              <input id="lf-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Phone" className={field} required />
              <label htmlFor="lf-phone" className={lbl}>
                Mobile number
              </label>
            </div>
            <div className="relative">
              <input id="lf-area" name="area" list="lf-areas" placeholder="Area" className={field} />
              <label htmlFor="lf-area" className={lbl}>
                Area / locality
              </label>
              <datalist id="lf-areas">
                {areaNames.map((n) => (
                  <option key={n} value={n} />
                ))}
              </datalist>
            </div>
            <div className="relative">
              <label htmlFor="lf-type" className="sr-only">
                Property type
              </label>
              <select id="lf-type" name="type" className={select} defaultValue="">
                <option value="" disabled>
                  Property type
                </option>
                {TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <Icon.ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 opacity-60" />
            </div>
            <div className="relative sm:col-span-2">
              <label htmlFor="lf-bill" className="sr-only">
                Average monthly bill
              </label>
              <select id="lf-bill" name="bill" className={select} defaultValue="">
                <option value="" disabled>
                  Average monthly electricity bill
                </option>
                {BILLS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <Icon.ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 opacity-60" />
            </div>
            <div className="relative sm:col-span-2">
              <textarea id="lf-msg" name="message" rows={3} placeholder="Message" className={cn(field, "h-auto resize-none pt-7")} />
              <label htmlFor="lf-msg" className={lbl}>
                Anything we should know? (optional)
              </label>
            </div>
            {error ? (
              <p role="alert" className="text-sm font-medium text-[#b42318] sm:col-span-2">
                {error}
              </p>
            ) : null}
            <div className="mt-2 flex flex-wrap items-center gap-3 sm:col-span-2">
              <button
                type="submit"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-sun pl-6 pr-2 font-semibold text-ink shadow-sun transition-colors hover:bg-sun-bright"
              >
                Send on WhatsApp
                <span className="grid size-10 place-items-center rounded-full bg-ink text-white transition-transform group-hover:scale-110">
                  <Icon.WhatsApp size={20} />
                </span>
              </button>
              <button
                type="button"
                onClick={(e) => submit(e.currentTarget.form, "email")}
                className={cn(
                  "inline-flex h-14 items-center gap-2 rounded-full px-6 font-medium ring-1 transition-colors",
                  dark ? "text-white ring-white/20 hover:bg-white/5" : "text-ink ring-line-strong hover:bg-stone-50",
                )}
              >
                <Icon.Mail size={18} /> Email instead
              </button>
            </div>
            <p className={cn("text-xs sm:col-span-2", dark ? "text-white/60" : "text-mute")}>
              Opens WhatsApp or your email app with your details filled in. Nothing is stored on this website.
            </p>
          </form>
        )}
    </div>
  );
}
