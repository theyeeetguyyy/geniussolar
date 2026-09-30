"use client";

import { useCallback, useRef, useState, type DragEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { parseBill, type ParsedBill } from "@/lib/bill-parser";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

type Stage = "idle" | "reading" | "ocr" | "parsing" | "done" | "error";

const PDFJS_VERSION = "6.3.289";

async function textFromPdf(file: File, onProgress: (p: number) => void) {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const pages = Math.min(doc.numPages, 2);
  let out = "";
  for (let i = 1; i <= pages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    // Rebuild lines from text items by their y position.
    const rows = new Map<number, { x: number; s: string }[]>();
    for (const item of content.items as { str: string; transform: number[] }[]) {
      if (!("str" in item)) continue;
      const y = Math.round(item.transform[5]);
      const key = [...rows.keys()].find((k) => Math.abs(k - y) < 3) ?? y;
      rows.set(key, [...(rows.get(key) ?? []), { x: item.transform[4], s: item.str }]);
    }
    out += [...rows.entries()]
      .sort((a, b) => b[0] - a[0])
      .map(([, r]) => r.sort((a, b) => a.x - b.x).map((t) => t.s).join(" "))
      .join("\n");
    onProgress(i / pages);
  }
  return out;
}

async function textFromImage(file: File, onProgress: (p: number) => void) {
  const { createWorker } = await import("tesseract.js");
  const worker = await createWorker("eng", 1, {
    logger: (m) => {
      if (m.status === "recognizing text") onProgress(m.progress);
    },
  });
  try {
    const { data } = await worker.recognize(file);
    return data.text;
  } finally {
    await worker.terminate();
  }
}

/**
 * Drop a bill (PDF or photo). Text is extracted entirely in the browser — the
 * file never leaves the device — then parsed for units, amount and load.
 */
export function BillScanner({ onResult }: { onResult: (r: ParsedBill) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [drag, setDrag] = useState(false);
  const [message, setMessage] = useState("");

  const handle = useCallback(
    async (file?: File) => {
      if (!file) return;
      setFileName(file.name);
      setProgress(0);
      setMessage("");
      try {
        setStage("reading");
        let text = "";
        if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
          text = await textFromPdf(file, setProgress);
        } else if (file.type.startsWith("image/")) {
          setStage("ocr");
          text = await textFromImage(file, setProgress);
        } else {
          throw new Error("Please use a PDF or a photo (JPG/PNG).");
        }
        setStage("parsing");
        const parsed = parseBill(text);
        setStage("done");
        if (!parsed.units && !parsed.amount) setMessage("We couldn't find the units clearly. Enter them below — it takes 10 seconds.");
        else setMessage("Found it. Check the numbers below and adjust if needed.");
        onResult(parsed);
      } catch (err) {
        setStage("error");
        setMessage(err instanceof Error && err.message.startsWith("Please") ? err.message : "Couldn't read that file. Try a clearer photo or enter the units manually.");
      }
    },
    [onResult],
  );

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
    handle(e.dataTransfer.files?.[0]);
  };

  const busy = stage === "reading" || stage === "ocr" || stage === "parsing";
  const label = stage === "ocr" ? "Reading your photo" : stage === "reading" ? "Opening your bill" : stage === "parsing" ? "Finding the numbers" : "";

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        className={cn(
          "relative overflow-hidden rounded-panel border-2 border-dashed p-8 text-center transition-colors sm:p-12",
          drag ? "border-sun bg-sun-wash" : "border-line-strong bg-white",
        )}
      >
        <input
          ref={input}
          type="file"
          accept="application/pdf,image/*"
          className="sr-only"
          id="bill-file"
          onChange={(e) => handle(e.target.files?.[0] ?? undefined)}
        />
        <AnimatePresence mode="wait">
          {busy ? (
            <motion.div key="busy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
              <span className="relative grid size-20 place-items-center">
                <svg viewBox="0 0 80 80" className="absolute inset-0 -rotate-90">
                  <circle cx="40" cy="40" r="36" fill="none" stroke="var(--color-stone-200)" strokeWidth="4" />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    fill="none"
                    stroke="var(--color-sun)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 36}
                    strokeDashoffset={2 * Math.PI * 36 * (1 - Math.max(0.05, progress))}
                    className="transition-[stroke-dashoffset] duration-300"
                  />
                </svg>
                <Icon.Scan size={28} className="text-ink" />
              </span>
              <p className="mt-5 text-lg font-semibold">{label}…</p>
              <p className="mt-1 text-sm text-graphite">
                {fileName} · {Math.round(progress * 100)}%
              </p>
              {stage === "ocr" ? <p className="mt-3 max-w-sm text-xs text-mute">The first scan downloads the text-recognition engine once (a few MB). Everything runs on your device.</p> : null}
            </motion.div>
          ) : (
            <motion.label key="idle" htmlFor="bill-file" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex cursor-pointer flex-col items-center">
              <span className="grid size-16 place-items-center rounded-2xl bg-sun text-ink shadow-sun">
                <Icon.Upload size={28} />
              </span>
              <span className="mt-5 text-xl font-semibold tracking-[-0.02em]">Drop your electricity bill here</span>
              <span className="mt-1 text-graphite">PDF from the MP West Discom portal, or a clear photo</span>
              <span className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 font-medium text-white">
                <Icon.Document size={18} /> Choose file
              </span>
              <span className="label mt-6 flex items-center gap-2 text-leaf">
                <Icon.Shield size={14} /> Read on your device · never uploaded
              </span>
            </motion.label>
          )}
        </AnimatePresence>
      </div>
      {message ? (
        <p role="status" className={cn("mt-4 text-sm", stage === "error" ? "text-[#b42318]" : "text-ink-2")}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
