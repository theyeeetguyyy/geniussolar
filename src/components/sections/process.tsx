import { processSteps } from "@/content/process";
import { SectionHeader } from "@/components/ui/section";
import { Icon } from "@/components/icons";

export function Process({ index = "05" }: { index?: string }) {
  return (
    <section aria-labelledby="process-title" className="section-y">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeader
              index={index}
              eyebrow="The process"
              title="Seven steps. *One* team. Zero chasing."
              lead="From your first WhatsApp to the day the subsidy lands in your account, one Genius Solar team owns every step — including the paperwork most installers leave to you."
            />
          </div>
        </div>
        <ol className="relative lg:col-span-7">
          <span aria-hidden="true" className="absolute left-[27px] top-2 bottom-2 w-px bg-line-strong" />
          <span aria-hidden="true" className="spine-fill absolute left-[27px] top-2 bottom-2 w-px bg-sun" />
          {processSteps.map((s, i) => {
            const I = Icon[s.icon];
            return (
              <li key={s.title} className="reveal relative grid grid-cols-[56px_1fr] gap-6 pb-14 last:pb-0">
                <span className="relative z-10 grid size-14 place-items-center rounded-2xl bg-white text-ink shadow-soft ring-1 ring-line">
                  <I size={24} />
                </span>
                <div className="pt-1">
                  <p className="label flex items-center gap-3 text-graphite">
                    <span className="text-sun-ink">{String(i + 1).padStart(2, "0")}</span>
                    <span className="h-px w-6 bg-line-strong" />
                    {s.time}
                  </p>
                  <h3 className="mt-3 text-h3 font-semibold">{s.title}</h3>
                  <p className="mt-2 max-w-lg text-graphite">{s.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
