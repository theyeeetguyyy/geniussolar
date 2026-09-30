// Converts the raw site photos in media-originals/ into web-ready, SEO-named
// files under src/assets/photos. EXIF (incl. GPS) is stripped, orientation is
// baked in, and the GPS-camera overlays that expose customer addresses are
// cropped off. Run with: npm run images
import sharp from "sharp";
import { mkdir, stat, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = (p) => join(root, "media-originals", p);
const outDir = join(root, "src", "assets", "photos");
const brandDir = join(root, "src", "assets", "brand");

/** [source, output name, options] — crop is a fraction of height to keep from the top. */
const photos = [
  ["assets/gallery/3.jpg", "mono-half-cut-solar-modules-elevated-structure-indore"],
  ["assets/gallery/4.jpg", "hot-dip-galvanised-solar-structure-column-indore"],
  ["assets/gallery/5.jpg", "genius-solar-installation-team-rooftop-indore"],
  ["assets/gallery/6.jpg", "genius-solar-team-under-completed-array-indore"],
  ["assets/gallery/7.jpg", "elevated-rooftop-solar-mukherjee-nagar-indore", { keepTop: 0.815 }],
  ["assets/gallery/8.jpg", "rooftop-solar-structure-terrace-indore"],
  ["assets/gallery/9.jpg", "homeowners-under-elevated-solar-array-indore"],
  ["assets/gallery/10.jpg", "havells-enviro-solar-inverter-installation-indore"],
  ["assets/gallery/11.jpg", "family-with-new-rooftop-solar-system-indore"],
  ["assets/gallery/12.jpg", "customer-with-genius-solar-engineer-indore"],
  ["assets/gallery/13.jpg", "elevated-solar-array-chota-bangarda-road-indore", { keepTop: 0.79 }],
  ["assets/gallery/14.jpg", "customer-and-engineer-under-solar-panels-indore"],
  ["assets/gallery/15.jpg", "terrace-shade-under-elevated-solar-panels-indore"],
  ["assets/gallery/16.jpg", "family-handover-rooftop-solar-indore"],
  ["assets/gallery/17.jpg", "wall-mounted-solar-inverter-genius-solar-indore"],
  ["assets/gallery/18.jpg", "solar-module-rows-rooftop-indore"],
  ["assets/gallery/19.jpg", "technician-fastening-solar-structure-indore"],
  ["assets/gallery/20.jpg", "technician-bolting-galvanised-column-indore"],
  ["assets/gallery/21.jpg", "genius-solar-engineers-under-array-indore"],
  ["assets/gallery/22.jpg", "genius-solar-crew-rooftop-project-indore"],
  ["assets/gallery/24.jpg", "tilted-solar-panels-rooftop-indore"],
  ["assets/gallery/29.jfif", "wide-elevated-solar-array-indore"],
  ["images/IMG-20251115-WA0055.jpg", "elevated-solar-structure-terrace-indore-2025"],
  ["images/IMG-20251115-WA0057.jpg", "homeowner-under-elevated-solar-structure-indore"],
  ["images/IMG-20251115-WA0058.jpg", "elevated-solar-structure-owner-indore-2025"],
  ["images/1000302820.jpg", "solar-project-handover-ceremony-indore"],
  ["images/1000302824.jpg", "homeowner-under-two-level-solar-structure-indore"],
  ["images/1000302775.jpg", "solar-panels-on-metal-sheet-roof-indore"],
  ["images/1000302863.jpg", "mp-annual-solar-awards-2025-genius-solar"],
  ["assets/dh.png", "dhirendra-bandil-proprietor-genius-solar", { maxEdge: 900 }],
];

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function processPhoto([from, name, opts = {}]) {
  const out = join(outDir, `${name}.jpg`);
  const force = process.argv.includes("--force");
  if (!force && (await exists(out))) return `skip ${name}`;

  let img = sharp(src(from)).rotate(); // bake EXIF orientation, then metadata is dropped on output
  if (opts.keepTop) {
    const meta = await sharp(src(from)).rotate().toBuffer({ resolveWithObject: true });
    const { width, height } = meta.info;
    img = sharp(meta.data).extract({ left: 0, top: 0, width, height: Math.round(height * opts.keepTop) });
  }
  const maxEdge = opts.maxEdge ?? 2000;
  await img
    .resize({ width: maxEdge, height: maxEdge, fit: "inside", withoutEnlargement: true })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(out);
  return `ok   ${name}`;
}

/** Recolour the white wordmark of the transparent logo to charcoal so it works on light backgrounds. */
async function processLogo() {
  const input = src("images/logo nobg tm.png");
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    if (a > 0 && r > 170 && g > 170 && b > 170) {
      data[i] = 21;
      data[i + 1] = 23;
      data[i + 2] = 26;
    }
  }
  const raw = { raw: { width: info.width, height: info.height, channels: 4 } };
  await sharp(data, raw).trim().png({ compressionLevel: 9 }).toFile(join(brandDir, "genius-solar-logo-dark.png"));
  // Mark only (leaf, sun, panel waves) — left block of the lockup.
  const mark = await sharp(data, raw).extract({ left: 20, top: 60, width: 180, height: 200 }).png().toBuffer();
  await sharp(mark).trim().png({ compressionLevel: 9 }).toFile(join(brandDir, "genius-solar-mark.png"));
  // Logo on white for schema.org / Google (needs a non-transparent, >=112px image).
  const trimmed = await sharp(data, raw).trim().png().toBuffer();
  await sharp(trimmed)
    .extend({ top: 60, bottom: 60, left: 60, right: 60, background: "#ffffff" })
    .flatten({ background: "#ffffff" })
    .png({ compressionLevel: 9 })
    .toFile(join(root, "public", "genius-solar-services-logo.png"));
  return "ok   logos";
}

/** App icons: the mark centred on warm paper, plus a multi-size favicon.ico. */
async function processIcons() {
  const markPath = join(brandDir, "genius-solar-mark.png");
  const icon = async (size, pad) => {
    const inner = Math.round(size * (1 - pad * 2));
    const m = await sharp(markPath).resize({ width: inner, height: inner, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
    return sharp({ create: { width: size, height: size, channels: 4, background: "#fbfaf7" } })
      .composite([{ input: m, gravity: "center" }])
      .png({ compressionLevel: 9 })
      .toBuffer();
  };
  const write = async (buf, path) => sharp(buf).toFile(path);
  await write(await icon(192, 0.1), join(root, "public", "icon-192.png"));
  await write(await icon(512, 0.1), join(root, "public", "icon-512.png"));
  await write(await icon(512, 0.2), join(root, "public", "icon-512-maskable.png"));
  await write(await icon(180, 0.12), join(root, "src", "app", "apple-icon.png"));
  await write(await icon(96, 0.06), join(root, "src", "app", "icon.png"));

  // favicon.ico containing 16, 32 and 48 px PNGs (PNG-in-ICO is supported by all modern browsers).
  const sizes = [16, 32, 48];
  const pngs = await Promise.all(sizes.map((s) => icon(s, 0.04)));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = 6 + 16 * sizes.length;
  const entries = sizes.map((s, i) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(s, 0);
    e.writeUInt8(s, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(pngs[i].length, 8);
    e.writeUInt32LE(offset, 12);
    offset += pngs[i].length;
    return e;
  });
  await writeFile(join(root, "src", "app", "favicon.ico"), Buffer.concat([header, ...entries, ...pngs]));
  return "ok   icons";
}

await mkdir(outDir, { recursive: true });
await mkdir(brandDir, { recursive: true });
for (const p of photos) console.log(await processPhoto(p));
console.log(await processLogo());
console.log(await processIcons());
