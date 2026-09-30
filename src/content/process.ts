import type { IconName } from "@/components/icons";

/** The installation journey. Durations are typical; DISCOM steps depend on their schedule. */
export const processSteps: { title: string; time: string; body: string; icon: IconName }[] = [
  {
    title: "Share your bill",
    time: "Day 0",
    body: "WhatsApp a photo of your last electricity bill or use the calculator. We size a system from your real consumption, not a guess.",
    icon: "Document",
  },
  {
    title: "Free site survey",
    time: "Day 1–3",
    body: "An engineer checks roof strength, orientation, shading across the seasons, cable routes, earthing points and your sanctioned load.",
    icon: "Compass",
  },
  {
    title: "Design & transparent quote",
    time: "Day 3–5",
    body: "Layout, structure height, module and inverter options, generation estimate and an itemised price. No surprises later.",
    icon: "Ruler",
  },
  {
    title: "Subsidy & DISCOM paperwork",
    time: "Week 1–2",
    body: "Registration on the PM Surya Ghar portal, feasibility approval from MP West Discom, and loan paperwork if you choose finance.",
    icon: "Stamp",
  },
  {
    title: "Installation",
    time: "1–3 days on site",
    body: "Structure, modules, inverter, AC/DC distribution boxes, earthing and lightning protection — installed and tested by our crew.",
    icon: "Hammer",
  },
  {
    title: "Inspection & net meter",
    time: "Usually 2–4 weeks",
    body: "DISCOM inspection and bi-directional net meter installation. We coordinate the visit with the DISCOM.",
    icon: "Meter",
  },
  {
    title: "Commissioning & subsidy",
    time: "After net meter",
    body: "System goes live, inverter monitoring is set up, and the subsidy claim is submitted. Then five years of free service visits.",
    icon: "Sun",
  },
];
