/**
 * Text generated from structured data — shared by the pages themselves and
 * by the Markdown mirrors / llms-full.txt, so humans and machines read the
 * same facts.
 */
import { estimate, formatINR, formatLakh, MONTHLY_YIELD_PER_KW, MONTHS } from "@/lib/solar";
import type { SystemSize } from "@/content/systems";
import type { Area } from "@/content/areas";
import { distanceFromOffice } from "@/content/areas";
import type { Project } from "@/content/projects";
import { formatMonth } from "@/content/projects";
import { site } from "@/content/site";

export function systemEstimate(s: SystemSize) {
  const mid = Math.round((s.consumption[0] + s.consumption[1]) / 2);
  return estimate({ kw: s.kw, monthlyUnits: mid, segment: s.segment });
}

export function systemSummary(s: SystemSize) {
  const e = systemEstimate(s);
  const subsidy = e.subsidy
    ? `It qualifies for ${formatINR(e.subsidy)} PM Surya Ghar subsidy, bringing a typical price of ${formatLakh(e.price.low)}–${formatLakh(e.price.high)} down to about ${formatLakh(e.price.low - e.subsidy)}–${formatLakh(e.price.high - e.subsidy)}.`
    : `Typical turnkey price is ${formatLakh(e.price.low)}–${formatLakh(e.price.high)}; business systems do not receive PM Surya Ghar subsidy.`;
  return `A ${s.kw} kW rooftop solar system in Indore generates about ${e.dailyUnits} units a day, ${Math.round(e.annualUnits / 12).toLocaleString("en-IN")} units a month and ${e.annualUnits.toLocaleString("en-IN")} units a year. It uses about ${e.panels} panels of 545 W and needs roughly ${e.roofSqft.toLocaleString("en-IN")} sq ft of shadow-free roof. ${subsidy} For a property using ${s.consumption[0].toLocaleString("en-IN")}–${s.consumption[1].toLocaleString("en-IN")} units a month, it saves around ${formatINR(e.monthlySavings)} a month and pays back in about ${e.paybackYears} years.`;
}

export function systemMarkdown(s: SystemSize) {
  const e = systemEstimate(s);
  return `# ${s.kw} kW solar system in Indore

${systemSummary(s)}

## Specifications

| Item | Value |
|---|---|
| Panels (545 W) | ${e.panels} |
| Roof area | ~${e.roofSqft} sq ft |
| Generation / day | ~${e.dailyUnits} units |
| Generation / year | ~${e.annualUnits.toLocaleString("en-IN")} units |
| Price before subsidy | ${formatLakh(e.price.low)} – ${formatLakh(e.price.high)} |
| Subsidy | ${e.subsidy ? formatINR(e.subsidy) : "Not applicable"} |
| Monthly savings | ~${formatINR(e.monthlySavings)} |
| Payback | ~${e.paybackYears} years |
| 25-year savings | ~${formatLakh(e.lifetimeSavings)} |
| CO₂ avoided / year | ~${e.co2TonnesPerYear} t |

## Monthly generation

| Month | Units |
|---|---|
${MONTHLY_YIELD_PER_KW.map((v, i) => `| ${MONTHS[i]} | ${Math.round(v * s.kw)} |`).join("\n")}

## Who it suits

${s.suits}

## What it can run

${s.runs.map((r) => `- ${r}`).join("\n")}

## Notes

${s.notes.map((n) => `- ${n}`).join("\n")}

## FAQ

${s.faqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}
`;
}

export function areaSummary(a: Area) {
  const place = a.kind === "city" ? a.name : `${a.name}, Indore`;
  return `Genius Solar Services installs rooftop solar in ${place}, about ${distanceFromOffice(a)} km from our office in Scheme No. 114, Vijay Nagar. ${a.character} Typical systems here are ${a.typicalSizes}. We handle the site survey, design, installation, MP West Discom net metering and PM Surya Ghar subsidy (up to ₹78,000 for homes), and provide five years of free service.`;
}

export function areaMarkdown(a: Area) {
  return `# Solar panel installation in ${a.name}${a.kind === "city" ? "" : ", Indore"}

${areaSummary(a)}

## Homes and roofs here

${a.roofs}

## What we recommend

${a.recommendation}

## Nearby landmarks

${a.landmarks.map((l) => `- ${l}`).join("\n")}

## FAQ

${a.faqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}

Contact: ${site.phones[0].display} · ${site.email}
`;
}

export function projectMarkdown(p: Project) {
  return `# ${p.title}

${p.summary}

| Detail | Value |
|---|---|
| Location | ${p.locality ? `${p.locality}, ` : ""}${p.city} |
| Type | ${p.segment === "home" ? "Residential" : "Commercial"} |
| Structure | ${p.structure} |
${p.capacityKw ? `| Capacity | ${p.capacityKw} kW |\n` : ""}${p.completed ? `| Completed | ${formatMonth(p.completed)} |\n` : ""}${p.inverter ? `| Inverter | ${p.inverter} |\n` : ""}
## The story

${p.story.join("\n\n")}

## Highlights

${p.highlights.map((h) => `- ${h}`).join("\n")}
`;
}
