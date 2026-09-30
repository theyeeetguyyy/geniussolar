import Link from "next/link";
import { whatsappLink } from "@/content/site";
import { Icon } from "@/components/icons";

export function AsideCta() {
  return (
    <div className="rounded-card bg-ink p-6 text-white">
      <Icon.Sun size={28} className="text-sun" />
      <p className="mt-4 text-lg font-semibold leading-snug tracking-[-0.02em]">Get numbers for your own roof.</p>
      <p className="mt-2 text-sm text-white/65">Free survey, itemised quote, subsidy handled.</p>
      <div className="mt-5 flex flex-col gap-2">
        <Link href="/solar-calculator" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-sun text-sm font-semibold text-ink">
          Savings calculator
        </Link>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full text-sm font-medium ring-1 ring-white/20"
        >
          <Icon.WhatsApp size={16} /> WhatsApp us
        </a>
      </div>
    </div>
  );
}
