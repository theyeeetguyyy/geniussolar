/* eslint-disable @next/next/no-img-element -- Satori (next/og) renders plain <img> only */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

/**
 * Shared Open Graph card renderer. Every route gets a unique 1200×630 card:
 * brand mark, eyebrow, title (with *accent* words), key facts and — where
 * available — a real installation photo. Rendered at build time.
 */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const root = process.cwd();
const asset = (p: string) => join(root, p);

let fontCache: Promise<{ name: string; data: Buffer; weight: 400 | 500 | 600; style: "normal" | "italic" }[]> | null = null;
function fonts() {
  fontCache ??= Promise.all([
    readFile(asset("src/assets/fonts/Geist-SemiBold.ttf")).then((data) => ({ name: "Geist", data, weight: 600 as const, style: "normal" as const })),
    readFile(asset("src/assets/fonts/Geist-Medium.ttf")).then((data) => ({ name: "Geist", data, weight: 500 as const, style: "normal" as const })),
    readFile(asset("src/assets/fonts/GeistMono-Regular.ttf")).then((data) => ({ name: "GeistMono", data, weight: 400 as const, style: "normal" as const })),
    readFile(asset("src/assets/fonts/InstrumentSerif-Italic.woff")).then((data) => ({ name: "Instrument", data, weight: 400 as const, style: "italic" as const })),
  ]);
  return fontCache;
}

async function dataUrl(file: string, width: number) {
  const buf = await sharp(asset(file)).resize({ width, withoutEnlargement: true }).jpeg({ quality: 78 }).toBuffer();
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

let markCache: Promise<string> | null = null;
function mark() {
  markCache ??= readFile(asset("src/assets/brand/genius-solar-mark.png")).then((b) => `data:image/png;base64,${b.toString("base64")}`);
  return markCache;
}

export interface OgInput {
  title: string;
  eyebrow?: string;
  facts?: { k: string; v: string }[];
  /** repo-relative path to a photo, e.g. photos.x.file */
  photo?: string;
}

export async function renderOg({ title, eyebrow = "Genius Solar Services · Indore", facts = [], photo }: OgInput) {
  const [logo, img] = await Promise.all([mark(), photo ? dataUrl(photo, 760) : Promise.resolve(null)]);
  const words = title.split(/(\*[^*]+\*)/g).filter(Boolean);
  const long = title.replace(/\*/g, "").length > 48;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#fbfaf7", fontFamily: "Geist", position: "relative" }}>
        {/* sun */}
        <div
          style={{
            position: "absolute",
            right: img ? 300 : -120,
            bottom: -260,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "radial-gradient(circle at 50% 30%, #fff4d6 0%, #ffd27a 40%, #f5a300 100%)",
            opacity: 0.55,
            display: "flex",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 64px", width: img ? 760 : 1200, position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img src={logo} width={46} height={48} alt="" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 26, fontWeight: 600, color: "#111315", letterSpacing: -0.8 }}>Genius Solar</span>
              <span style={{ fontFamily: "GeistMono", fontSize: 13, color: "#585c62", letterSpacing: 2, textTransform: "uppercase" }}>Services · Indore</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: "GeistMono", fontSize: 18, color: "#8a5600", letterSpacing: 2.5, textTransform: "uppercase" }}>{eyebrow}</span>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginTop: 18,
                fontSize: long ? 58 : 72,
                lineHeight: 1.02,
                fontWeight: 600,
                color: "#111315",
                letterSpacing: long ? -2 : -2.8,
              }}
            >
              {words.map((w, i) =>
                w.startsWith("*") ? (
                  <span key={i} style={{ fontFamily: "Instrument", fontStyle: "italic", fontWeight: 400, color: "#8a5600", marginRight: 14 }}>
                    {w.slice(1, -1)}
                  </span>
                ) : (
                  w
                    .trim()
                    .split(" ")
                    .filter(Boolean)
                    .map((x, j) => (
                      <span key={`${i}-${j}`} style={{ marginRight: 14 }}>
                        {x}
                      </span>
                    ))
                ),
              )}
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {facts.slice(0, 3).map((x) => (
              <div
                key={x.k}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "12px 18px",
                  borderRadius: 18,
                  background: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(17,19,21,0.09)",
                }}
              >
                <span style={{ fontFamily: "GeistMono", fontSize: 13, color: "#585c62", letterSpacing: 1.5, textTransform: "uppercase" }}>{x.k}</span>
                <span style={{ fontSize: 26, fontWeight: 600, color: "#111315", marginTop: 2 }}>{x.v}</span>
              </div>
            ))}
          </div>
        </div>
        {img ? (
          <div style={{ display: "flex", padding: "28px 28px 28px 0", width: 440 }}>
            <img src={img} alt="" width={412} height={574} style={{ objectFit: "cover", borderRadius: 32, width: 412, height: 574 }} />
          </div>
        ) : null}
      </div>
    ),
    { ...ogSize, fonts: await fonts() },
  );
}
