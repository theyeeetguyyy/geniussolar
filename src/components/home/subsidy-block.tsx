import { SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Counter } from "@/components/ui/motion";

const tiers = [
  { kw: "1 kW", amount: 30000, note: "₹30,000 per kW" },
  { kw: "2 kW", amount: 60000, note: "₹30,000 × 2" },
  { kw: "3 kW +", amount: 78000, note: "₹60,000 + ₹18,000 — the maximum", max: true },
];

export function SubsidyBlock({ index = "09" }: { index?: string }) {
  return (
    <section aria-labelledby="subsidy-title" className="section-y relative overflow-hidden">
      <div aria-hidden="true" className="absolute -right-40 top-10 size-[36rem] rounded-full sun-glow opacity-70" />
      <div className="container-x relative">
        <SectionHeader
          index={index}
          eyebrow="PM Surya Ghar: Muft Bijli Yojana"
          title="The government pays up to *₹78,000* of your system."
          align="split"
          lead="Central financial assistance is credited straight to your bank account after commissioning. We register you on the national portal, get DISCOM approval, and file the claim."
        >
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/solar-subsidy-mp" variant="ink">
              Full subsidy guide
            </ButtonLink>
            <ButtonLink href="/housing-society-solar-indore" variant="ghost" icon={false}>
              Societies: ₹18,000/kW
            </ButtonLink>
          </div>
        </SectionHeader>

        <ol className="mt-16 grid gap-4 md:grid-cols-3">
          {tiers.map((t) => (
            <li
              key={t.kw}
              className={`reveal relative overflow-hidden rounded-panel p-8 ring-1 ${t.max ? "sun-gradient ring-sun/40" : "bg-white ring-line"}`}
            >
              <p className="label text-ink/70">Home system · {t.kw}</p>
              <p className="mt-8 text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-none tracking-[-0.055em]">
                <Counter value={t.amount} prefix="₹" />
              </p>
              <p className="mt-4 text-sm text-ink/70">{t.note}</p>
              {t.max ? <span className="label absolute right-6 top-6 rounded-full bg-ink px-3 py-1.5 text-white">Maximum</span> : null}
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-3xl text-sm text-graphite">
          Eligibility: residential connection in your name, own roof, DCR modules, vendor registered on the national portal. Subsidy
          amounts as notified by MNRE; we confirm current rules at the time of your application.
        </p>
      </div>
    </section>
  );
}
