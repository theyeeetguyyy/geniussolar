import * as THREE from "three";

/**
 * Procedural 144 half-cut monocrystalline module face: 6 × 24 half-cells,
 * multi-busbar fingers, white backsheet gaps and the central split — drawn
 * on a canvas so no image download is needed.
 */
export function createCellTexture(size = 1024) {
  const w = size / 2;
  const h = size;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  // Backsheet (visible in the gaps)
  ctx.fillStyle = "#7f8b9b";
  ctx.fillRect(0, 0, w, h);

  const cols = 6;
  const rows = 24;
  const margin = w * 0.022;
  const gap = w * 0.008;
  const midGap = h * 0.012;
  const cellW = (w - margin * 2 - gap * (cols - 1)) / cols;
  const cellH = (h - margin * 2 - midGap - gap * (rows - 2)) / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = margin + c * (cellW + gap);
      const y = margin + r * (cellH + gap) + (r >= rows / 2 ? midGap - gap : 0);
      const g = ctx.createLinearGradient(x, y, x + cellW, y + cellH);
      const tint = (r * 7 + c * 13) % 5;
      g.addColorStop(0, `rgb(${16 + tint} ${30 + tint} ${62 + tint * 2})`);
      g.addColorStop(1, `rgb(${9 + tint} ${17 + tint} ${38 + tint})`);
      ctx.fillStyle = g;
      ctx.fillRect(x, y, cellW, cellH);

      // Multi-busbar: fine vertical lines
      ctx.strokeStyle = "rgba(120,140,175,0.35)";
      ctx.lineWidth = Math.max(0.6, w / 900);
      const bars = 8;
      for (let b = 1; b <= bars; b++) {
        const bx = x + (cellW * b) / (bars + 1);
        ctx.beginPath();
        ctx.moveTo(bx, y + 1);
        ctx.lineTo(bx, y + cellH - 1);
        ctx.stroke();
      }
      // Faint horizontal fingers
      ctx.strokeStyle = "rgba(90,110,150,0.12)";
      ctx.lineWidth = 0.5;
      for (let f = 1; f < 6; f++) {
        const fy = y + (cellH * f) / 6;
        ctx.beginPath();
        ctx.moveTo(x, fy);
        ctx.lineTo(x + cellW, fy);
        ctx.stroke();
      }
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  return tex;
}

/** Soft radial sprite used for the sun halo and energy glow. */
export function createGlowTexture(inner = "rgba(255,214,120,1)", outer = "rgba(255,184,28,0)") {
  const s = 256;
  const canvas = document.createElement("canvas");
  canvas.width = s;
  canvas.height = s;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, inner);
  g.addColorStop(0.25, "rgba(255,200,90,0.55)");
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
