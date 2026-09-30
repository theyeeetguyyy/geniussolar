import { site } from "@/content/site";
import { Counter } from "@/components/ui/motion";
import { Icon } from "@/components/icons";

/** Partner marquee + four verifiable promises. No invented stats. */
export function TrustStrip() {
  const names = [...site.partners.map((p) => p.name), "DCR modules for subsidy", "Net metering with MP West Discom"];
  const facts = [
    { value: 78000, prefix: "₹", label: "Max. home subsidy under PM Surya Ghar", suffix: "" },
    { value: site.promises.panelWarrantyYears, label: "Panel performance warranty", suffix: " yr" },
    { value: site.promises.freeServiceYears, label: "Free service after installation", suffix: " yr" },
    { value: site.legacyYears, label: "Serving customers in Indore", suffix: "+ yr" },
  ];
  return (
    <section aria-label="Partners and promises" className="relative border-y border-line bg-white">
      <div className="relative overflow-hidden py-7 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <ul className="flex w-max animate-marquee items-center gap-12 pr-12 [--marquee-duration:48s]">
          {[...names, ...names].map((n, i) => (
            <li key={`${n}-${i}`} className="flex items-center gap-12 whitespace-nowrap text-[1.35rem] font-medium tracking-[-0.03em] text-ink/70">
              {n}
              <Icon.Sun size={18} className="text-sun" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
      <div className="container-x">
        <dl className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {facts.map((f, i) => (
            <div key={f.label} className={`flex flex-col py-10 pr-6 ${i > 0 ? "lg:border-l lg:border-line lg:pl-8" : ""} ${i % 2 === 1 ? "border-l border-line pl-6 lg:pl-8" : ""}`}>
              <dt className="order-2 mt-3 max-w-[16rem] text-sm text-graphite">{f.label}</dt>
              <dd className="text-[clamp(2.2rem,4vw,3.4rem)] font-semibold leading-none tracking-[-0.045em] text-ink">
                <Counter value={f.value} prefix={f.prefix ?? ""} suffix={f.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
