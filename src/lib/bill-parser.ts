/**
 * Heuristic extraction of the numbers that matter from electricity-bill text
 * (from a PDF text layer or OCR). Designed for MP West Discom (MPPKVVCL)
 * bills in English and Hindi, but tolerant of other layouts. Every value is
 * shown to the user for confirmation — nothing is trusted blindly.
 */
export interface ParsedBill {
  units?: number;
  amount?: number;
  sanctionedLoad?: number;
  consumerNo?: string;
  category?: string;
  confidence: { units: number; amount: number };
  rawLines: number;
}

const UNIT_KEYS = /(units?\s*(consumed|billed|consumption)?|net\s*units|consumption|total\s*kwh|kwh\s*consumed|billed\s*units|खपत|यूनिट|उपभोग)/i;
const AMOUNT_KEYS = /(net\s*payable|amount\s*payable|payable\s*amount|total\s*amount|bill\s*amount|current\s*bill|amount\s*due|कुल\s*देय|देय\s*राशि|भुगतान\s*योग्य)/i;
const LOAD_KEYS = /(sanction(ed)?\s*load|connected\s*load|contract\s*demand|स्वीकृत\s*भार)/i;
const CONSUMER_KEYS = /(ivrs|consumer\s*(no|number|id)|account\s*(no|number)|उपभोक्ता\s*क्र)/i;

const numbersIn = (line: string) =>
  Array.from(line.replace(/(\d),(\d)/g, "$1$2").matchAll(/(\d+(?:\.\d{1,2})?)/g)).map((m) => Number(m[1]));

/** Normalise common OCR confusions inside numeric runs. */
function normalise(text: string) {
  return text
    .replace(/[|]/g, " ")
    .replace(/(?<=\d)[oO](?=[\d\s.,]|$)/gm, "0")
    .replace(/(?<=\d)[lI](?=[\d.,])/g, "1")
    .replace(/₹|\bRs\.?(?=\s|\d)|\bINR\b/g, " ₹ ")
    .replace(/[ \t]+/g, " ");
}

export function parseBill(text: string): ParsedBill {
  const lines = normalise(text)
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const result: ParsedBill = { confidence: { units: 0, amount: 0 }, rawLines: lines.length };

  const unitCandidates: { v: number; score: number }[] = [];
  const amountCandidates: { v: number; score: number }[] = [];

  lines.forEach((line, i) => {
    const window = [line, lines[i + 1] ?? ""].join(" ");

    if (UNIT_KEYS.test(line)) {
      const nums = numbersIn(window).filter((n) => Number.isInteger(n) && n >= 5 && n <= 50000);
      nums.forEach((v, k) => unitCandidates.push({ v, score: (/(consumed|billed|net)/i.test(line) ? 3 : 2) - k * 0.3 }));
    }
    if (AMOUNT_KEYS.test(line)) {
      const nums = numbersIn(window).filter((n) => n >= 50 && n <= 2_000_000);
      nums.forEach((v, k) => amountCandidates.push({ v, score: (/(payable|देय)/i.test(line) ? 3 : 2) - k * 0.3 }));
    }
    if (!result.sanctionedLoad && LOAD_KEYS.test(line)) {
      const n = numbersIn(window).find((x) => x > 0 && x <= 2000);
      if (n) result.sanctionedLoad = n;
    }
    if (!result.consumerNo && CONSUMER_KEYS.test(line)) {
      const m = window.replace(/\s/g, "").match(/\d{8,14}/);
      if (m) result.consumerNo = m[0];
    }
    if (!result.category) {
      const c = line.match(/\b(LV\s*-?\s*\d(?:\.\d)?|HV\s*-?\s*\d(?:\.\d)?)\b/i);
      if (c) result.category = c[1].replace(/\s/g, "").toUpperCase();
      else if (/non[-\s]?domestic/i.test(line)) result.category = "Non-domestic";
      else if (/\bdomestic\b|घरेलू/i.test(line)) result.category = "Domestic";
      else if (/industrial|औद्योगिक/i.test(line)) result.category = "Industrial";
    }
  });

  // Fallback: meter readings "previous 12345 current 12745" → difference
  if (!unitCandidates.length) {
    const prev = lines.find((l) => /(previous|prev\.?|पिछली)\s*(reading|रीडिंग)?/i.test(l));
    const curr = lines.find((l) => /(present|current)\s*(reading)?|वर्तमान/i.test(l));
    const p = prev ? numbersIn(prev).find((n) => n > 10) : undefined;
    const c = curr ? numbersIn(curr).find((n) => n > 10) : undefined;
    if (p && c && c > p && c - p < 50000) unitCandidates.push({ v: Math.round(c - p), score: 1.5 });
  }

  const best = (arr: { v: number; score: number }[]) => arr.sort((a, b) => b.score - a.score)[0];
  const u = best(unitCandidates);
  const a = best(amountCandidates);
  if (u) {
    result.units = u.v;
    result.confidence.units = Math.min(1, u.score / 3);
  }
  if (a) {
    result.amount = Math.round(a.v);
    result.confidence.amount = Math.min(1, a.score / 3);
  }
  return result;
}
