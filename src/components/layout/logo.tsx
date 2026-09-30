import Image from "next/image";
import Link from "next/link";
import mark from "@/assets/brand/genius-solar-mark.png";
import { cn } from "@/lib/utils";

export function Logo({ className, tone = "ink" }: { className?: string; tone?: "ink" | "white" }) {
  return (
    <Link href="/" className={cn("group/logo flex items-center gap-2.5", className)}>
      <span className="relative block size-9 shrink-0 transition-transform duration-700 ease-[var(--ease-sun)] group-hover/logo:-rotate-6 group-hover/logo:scale-105">
        <Image src={mark} alt="" fill sizes="36px" className="object-contain" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("text-[1.075rem] font-semibold tracking-[-0.035em]", tone === "white" ? "text-white" : "text-ink")}>
          Genius Solar
        </span>
        <span className={cn("label mt-1 text-[0.58rem]", tone === "white" ? "text-white/60" : "text-graphite")}>Services · Indore</span>
      </span>
    </Link>
  );
}
