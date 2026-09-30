import { primaryPhone, site, telLink, whatsappLink } from "@/content/site";
import { Icon } from "@/components/icons";
import { SplitText } from "@/components/ui/section";
import { LeadForm } from "@/components/tools/lead-form";
import { areas } from "@/content/areas";

export function CtaQuote({
  title = "Your roof is already earning. *Start collecting.*",
  source = "Website",
  id = "quote",
}: {
  title?: string;
  source?: string;
  id?: string;
}) {
  return (
    <section id={id} aria-label="Get a free solar quote" className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="relative overflow-hidden rounded-hero bg-ink text-white">
        <div aria-hidden="true" className="absolute -left-40 -top-56 size-[42rem] rounded-full sun-glow" />
        <div className="container-x relative grid gap-14 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-5">
            <p className="label text-sun">Free survey · No obligation</p>
            <SplitText as="h2" text={title} className="mt-6 text-h2 font-semibold" accentClassName="serif-accent text-sun" />
            <p className="mt-6 max-w-md text-lead text-white/70">
              Tell us a little about your property. An engineer calls back, books a free site survey and sends a clear, itemised quote.
            </p>
            <ul className="mt-10 space-y-4">
              <li>
                <a href={telLink()} className="group flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/10 transition-colors group-hover:bg-sun group-hover:text-ink">
                    <Icon.Phone size={20} />
                  </span>
                  <span>
                    <span className="label block text-white/50">Call</span>
                    <span className="text-lg font-medium tabular">{primaryPhone.display}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener" className="group flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/10 transition-colors group-hover:bg-sun group-hover:text-ink">
                    <Icon.WhatsApp size={20} />
                  </span>
                  <span>
                    <span className="label block text-white/50">WhatsApp your bill</span>
                    <span className="text-lg font-medium">Chat with an engineer</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={site.maps.url} target="_blank" rel="noopener" className="group flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/10 transition-colors group-hover:bg-sun group-hover:text-ink">
                    <Icon.Pin size={20} />
                  </span>
                  <span>
                    <span className="label block text-white/50">Visit · {site.hoursLabel}</span>
                    <span className="text-lg font-medium">Swarna Palace, Vijay Nagar</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="rounded-panel bg-white/[0.04] p-5 ring-1 ring-white/10 backdrop-blur sm:p-8">
              <LeadForm dark source={source} areaNames={areas.map((a) => a.name)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
