"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { whatsappLink } from "@/content/site";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  score: number;
  tip?: string;
}
interface Question {
  id: string;
  q: string;
  help: string;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    id: "roof",
    q: "What kind of roof do you have?",
    help: "Most Indore homes have a flat RCC (concrete) terrace.",
    options: [
      { label: "Flat RCC / concrete", score: 3 },
      { label: "Metal sheet", score: 2.5, tip: "Metal roofs are mounted on the purlins with rails or short tilt legs." },
      { label: "Asbestos sheet", score: 1.5, tip: "Asbestos sheets can't be drilled — an independent structure is needed." },
      { label: "Sloped tiles", score: 2, tip: "Tiled roofs need hooks under the tiles; we check the rafters first." },
    ],
  },
  {
    id: "area",
    q: "Roughly how much open roof space is there?",
    help: "Leave out tanks, stairs and walkways. 1 kW needs about 90 sq ft.",
    options: [
      { label: "Under 100 sq ft", score: 0.5, tip: "Small roofs can still host 1 kW — or an elevated frame can use space above tanks." },
      { label: "100–300 sq ft", score: 2 },
      { label: "300–600 sq ft", score: 3 },
      { label: "More than 600 sq ft", score: 3 },
    ],
  },
  {
    id: "shade",
    q: "Does anything shade the roof between 9 am and 4 pm?",
    help: "Think of tanks, the stair headroom, trees and taller neighbours — especially in winter.",
    options: [
      { label: "No, it's open all day", score: 3 },
      { label: "A little — tank or parapet", score: 2.2, tip: "Small obstacles are usually solved by layout or a raised structure." },
      { label: "Yes — trees or a taller building", score: 1, tip: "Heavy shade needs a proper shadow study; raising the array often helps." },
      { label: "Not sure", score: 2, tip: "Our free survey maps shade across the seasons." },
    ],
  },
  {
    id: "direction",
    q: "Which side of the roof is open to the sky?",
    help: "In Indore, south-facing panels produce the most over a year.",
    options: [
      { label: "South is open", score: 3 },
      { label: "East or west", score: 2.4, tip: "East–west layouts give ~5–12% less but spread output across the day." },
      { label: "Only north is open", score: 1.2, tip: "North-facing tilts lose significantly; a flatter tilt or raised frame may help." },
      { label: "Not sure", score: 2.2 },
    ],
  },
  {
    id: "connection",
    q: "Whose name is the electricity connection in?",
    help: "Subsidy and net metering are applied on the connection.",
    options: [
      { label: "Mine, and I own the house", score: 3 },
      { label: "A family member's", score: 2.4, tip: "The connection holder applies, or the name can be transferred first." },
      { label: "I'm renting", score: 1.5, tip: "The owner's written consent is needed; the owner usually applies." },
      { label: "It's a business connection", score: 2.6, tip: "No PM Surya Ghar subsidy, but commercial tariffs mean fast payback." },
    ],
  },
];

export function RoofQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Option>>({});
  const done = step >= QUESTIONS.length;
  const total = Object.values(answers).reduce((s, o) => s + o.score, 0);
  const pct = total / (QUESTIONS.length * 3);
  const verdict = pct >= 0.85 ? "Excellent" : pct >= 0.65 ? "Good" : "Needs inspection";
  const tips = Object.values(answers)
    .map((a) => a.tip)
    .filter(Boolean) as string[];

  const pick = (q: Question, o: Option) => {
    setAnswers((a) => ({ ...a, [q.id]: o }));
    setTimeout(() => setStep((s) => s + 1), 180);
  };

  const wa = `Hi Genius Solar, I did your roof suitability check.\nResult: ${verdict} (${Math.round(pct * 100)}%)\n${QUESTIONS.map((q) => `${q.q} → ${answers[q.id]?.label ?? "—"}`).join("\n")}\nPlease book a free survey.`;

  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-hero bg-white shadow-lift ring-1 ring-line">
      <div className="h-1.5 bg-stone-100">
        <motion.div className="h-full bg-sun" animate={{ width: `${(Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100}%` }} transition={{ duration: 0.5 }} />
      </div>
      <div className="p-6 sm:p-12">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.fieldset
              key={QUESTIONS[step].id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <legend className="label text-graphite">
                Question {step + 1} of {QUESTIONS.length}
              </legend>
              <p className="mt-4 text-[clamp(1.6rem,3vw,2.3rem)] font-semibold leading-tight tracking-[-0.03em]">{QUESTIONS[step].q}</p>
              <p className="mt-2 text-graphite">{QUESTIONS[step].help}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {QUESTIONS[step].options.map((o) => {
                  const selected = answers[QUESTIONS[step].id]?.label === o.label;
                  return (
                    <button
                      key={o.label}
                      type="button"
                      onClick={() => pick(QUESTIONS[step], o)}
                      aria-pressed={selected}
                      className={cn(
                        "group flex min-h-16 items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left font-medium ring-1 transition-all",
                        selected ? "bg-ink text-white ring-ink" : "bg-white ring-line hover:-translate-y-0.5 hover:ring-ink/30",
                      )}
                    >
                      {o.label}
                      <Icon.ArrowRight size={18} className="shrink-0 opacity-40 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                    </button>
                  );
                })}
              </div>
              {step > 0 ? (
                <button type="button" onClick={() => setStep((s) => s - 1)} className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-graphite hover:text-ink">
                  <Icon.ChevronLeft size={16} /> Back
                </button>
              ) : null}
            </motion.fieldset>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} aria-live="polite">
              <p className="label text-graphite">Your roof</p>
              <div className="mt-6 flex flex-wrap items-center gap-8">
                <div className="relative size-40">
                  <svg viewBox="0 0 120 120" className="size-full -rotate-90">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-stone-200)" strokeWidth="10" />
                    <motion.circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="var(--color-sun)"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 52}
                      initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - pct) }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </svg>
                  <span className="absolute inset-0 grid place-items-center text-4xl font-semibold tabular tracking-[-0.04em]">{Math.round(pct * 100)}</span>
                </div>
                <div>
                  <p className={cn("text-5xl font-semibold tracking-[-0.045em]", verdict === "Needs inspection" ? "text-ink" : "text-sun-ink")}>{verdict}</p>
                  <p className="mt-2 max-w-sm text-graphite">
                    {verdict === "Excellent"
                      ? "Your roof looks ideal for rooftop solar. A survey will confirm the exact size."
                      : verdict === "Good"
                        ? "Solar should work well. A few details need a closer look during the survey."
                        : "Solar may still work — it needs an engineer's eye on site. The survey is free."}
                  </p>
                </div>
              </div>
              {tips.length ? (
                <ul className="mt-8 space-y-3 border-t border-line pt-8">
                  {tips.map((t) => (
                    <li key={t} className="flex gap-3 text-ink-2">
                      <Icon.Spark size={18} className="mt-0.5 shrink-0 text-sun-ink" />
                      {t}
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="mt-10 flex flex-wrap gap-3">
                <a href={whatsappLink(wa)} target="_blank" rel="noopener" className="inline-flex h-12 items-center gap-2 rounded-full bg-sun px-6 font-semibold text-ink shadow-sun">
                  <Icon.WhatsApp size={18} /> Send result & book survey
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setAnswers({});
                    setStep(0);
                  }}
                  className="inline-flex h-12 items-center gap-2 rounded-full px-6 font-medium ring-1 ring-line-strong"
                >
                  Start again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
