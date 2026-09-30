import { site, whatsappLink } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/motion";
import { SplitText } from "@/components/ui/section";
import { Icon } from "@/components/icons";
import { HeroExperience } from "./hero-experience";
import { HeroPoster } from "./hero-poster";

export function Hero() {
  const promises = [
    `${site.promises.panelWarrantyYears}-yr panel warranty`,
    `${site.promises.inverterWarrantyYears}-yr inverter warranty`,
    `${site.promises.freeServiceYears} yrs free service`,
  ];
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden lg:min-h-[max(100svh,780px)]"
      style={{
        background:
          "linear-gradient(180deg, var(--sky-top, rgb(214 229 241)) 0%, var(--sky-mid, rgb(236 243 247)) 42%, #fbfaf7 82%)",
      }}
    >
      <div className="pointer-events-none relative z-10 lg:absolute lg:inset-0 lg:flex lg:items-center">
        <div className="container-x pt-32 sm:pt-36 lg:pt-10">
          <div className="max-w-[40rem] xl:max-w-[46rem]">
            <h1 id="hero-title">
              <span className="label load-fade flex items-center gap-3 text-graphite" style={{ ["--d" as string]: "60ms" }}>
                <span className="h-px w-8 bg-ink/25" aria-hidden="true" />
                Solar panel company in Indore
              </span>
              <SplitText
                as="span"
                mode="load"
                text="Let the *sun* pay your bills."
                className="mt-6 block text-display-xl font-semibold text-ink"
                accentClassName="serif-accent text-sun-ink"
              />
            </h1>
            <p className="load-fade mt-7 max-w-xl text-lead text-graphite" style={{ ["--d" as string]: "520ms" }}>
              Precision-built rooftop solar for homes, housing societies and industry across Indore. We design it, install it, get
              your net meter, file your <strong className="font-medium text-ink">PM Surya Ghar subsidy of up to ₹78,000</strong> —
              and look after it free for five years.
            </p>
            <div className="load-fade pointer-events-auto mt-9 flex flex-wrap items-center gap-3" style={{ ["--d" as string]: "680ms" }}>
              <Magnetic>
                <ButtonLink href="/solar-calculator" variant="sun" size="lg">
                  Calculate my savings
                </ButtonLink>
              </Magnetic>
              <ButtonLink href={whatsappLink("Hi Genius Solar, here is my electricity bill. Please suggest a solar system.")} variant="ghost" size="lg" icon="WhatsApp">
                WhatsApp your bill
              </ButtonLink>
            </div>
            <ul className="load-fade mt-10 flex flex-wrap gap-x-5 gap-y-2" style={{ ["--d" as string]: "820ms" }}>
              {promises.map((p) => (
                <li key={p} className="label flex items-center gap-2 text-ink-2">
                  <Icon.Check size={14} className="text-sun-ink" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="relative h-[68svh] min-h-[440px] lg:absolute lg:inset-0 lg:h-auto">
        <HeroPoster />
        <HeroExperience sectionId="hero" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-[60%] bg-gradient-to-r from-paper via-paper/75 to-transparent lg:block"
        />
      </div>

      <a
        href="#bill-story"
        className="label absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 text-graphite transition-colors hover:text-ink lg:left-[max(3rem,calc((100vw-88rem)/2+3rem))] lg:flex lg:translate-x-0"
      >
        <span className="relative h-10 w-px overflow-hidden bg-ink/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_2.2s_var(--ease-swift)_infinite] bg-ink" />
        </span>
        Scroll · see how the sun pays
      </a>
    </section>
  );
}
