// ============================================================
// Genera un still (dataURL JPEG) de la vista de calle con el arte del
// anunciante deformado en perspectiva. Se usa para el PDF — es
// determinístico (canvas), no depende de timing del DOM ni de WebGL.
// ============================================================

import { getImageThumb } from "./mapillary";
import { quadProjector } from "./perspective";
import type { Cartel, Mockup, Quad } from "./types";

function loadImage(src: string, cors = false): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (cors) img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Dibuja la imagen `img` cubriendo el lienzo (object-fit: cover). */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  W: number,
  H: number,
) {
  const ir = img.width / img.height;
  const cr = W / H;
  let dw = W;
  let dh = H;
  let dx = 0;
  let dy = 0;
  if (ir > cr) {
    dh = H;
    dw = H * ir;
    dx = (W - dw) / 2;
  } else {
    dw = W;
    dh = W / ir;
    dy = (H - dh) / 2;
  }
  ctx.drawImage(img, dx, dy, dw, dh);
}

/** Dibuja un triángulo de textura con mapeo afín (clip + transform). */
function drawTexTriangle(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  s: [number, number][], // 3 puntos en px de la imagen fuente
  d: [number, number][], // 3 puntos destino en px del lienzo
) {
  const [s0, s1, s2] = s;
  const [d0, d1, d2] = d;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(d0[0], d0[1]);
  ctx.lineTo(d1[0], d1[1]);
  ctx.lineTo(d2[0], d2[1]);
  ctx.closePath();
  ctx.clip();

  // resolver la matriz afín que lleva s -> d
  const denom =
    s0[0] * (s2[1] - s1[1]) - s1[0] * s2[1] + s2[0] * s1[1] +
    (s1[0] - s2[0]) * s0[1];
  if (denom === 0) {
    ctx.restore();
    return;
  }
  const a =
    (d0[0] * (s2[1] - s1[1]) - d1[0] * s2[1] + d2[0] * s1[1] +
      (d1[0] - d2[0]) * s0[1]) / denom;
  const b =
    -(d0[0] * (s2[0] - s1[0]) - d1[0] * s2[0] + d2[0] * s1[0] +
      (d1[0] - d2[0]) * s0[0]) / denom;
  const c =
    (d0[1] * (s2[1] - s1[1]) - d1[1] * s2[1] + d2[1] * s1[1] +
      (d1[1] - d2[1]) * s0[1]) / denom;
  const dd =
    -(d0[1] * (s2[0] - s1[0]) - d1[1] * s2[0] + d2[1] * s1[0] +
      (d1[1] - d2[1]) * s0[0]) / denom;
  const e =
    (d0[0] * (s2[0] * s1[1] - s1[0] * s2[1]) +
      s0[0] * (d1[0] * s2[1] - d2[0] * s1[1]) +
      s0[1] * (d2[0] * s1[0] - d1[0] * s2[0])) / denom;
  const f =
    (d0[1] * (s2[0] * s1[1] - s1[0] * s2[1]) +
      s0[0] * (d1[1] * s2[1] - d2[1] * s1[1]) +
      s0[1] * (d2[1] * s1[0] - d1[1] * s2[0])) / denom;

  ctx.transform(a, c, b, dd, e, f);
  ctx.drawImage(img, 0, 0);
  ctx.restore();
}

/** Deforma `art` dentro de `quad` (0..1) sobre el lienzo con warp por grilla. */
function warpArt(
  ctx: CanvasRenderingContext2D,
  art: HTMLImageElement,
  quad: Quad,
  W: number,
  H: number,
) {
  const project = quadProjector(quad, W, H);
  const N = 20; // subdivisión
  const aw = art.width;
  const ah = art.height;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const u0 = i / N;
      const u1 = (i + 1) / N;
      const v0 = j / N;
      const v1 = (j + 1) / N;
      // fuente (px del arte)
      const sa: [number, number] = [u0 * aw, v0 * ah];
      const sb: [number, number] = [u1 * aw, v0 * ah];
      const sc: [number, number] = [u1 * aw, v1 * ah];
      const sd: [number, number] = [u0 * aw, v1 * ah];
      // destino
      const da = project(u0, v0);
      const db = project(u1, v0);
      const dc = project(u1, v1);
      const dd = project(u0, v1);
      drawTexTriangle(ctx, art, [sa, sb, sc], [da, db, dc]);
      drawTexTriangle(ctx, art, [sa, sc, sd], [da, dc, dd]);
    }
  }
}

/**
 * Captura la vista de calle del cartel como JPEG dataURL. Devuelve null si no
 * se pudo (sin token / sin red) y el caller cae al flujo sintético.
 */
export async function captureStreetMockup(
  cartel: Cartel,
  mockup: Mockup | undefined,
  W = 1600,
  H = 1000,
): Promise<string | null> {
  const vista = cartel.vistaCalle;
  if (!vista) return null;

  const thumbUrl = await getImageThumb(vista.mapillaryImageId);
  if (!thumbUrl) return null;

  try {
    const bg = await loadImage(thumbUrl, true);
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.imageSmoothingQuality = "high";
    drawCover(ctx, bg, W, H);

    const nocturno = mockup?.nocturno;
    if (nocturno) {
      // oscurecer + tinte nocturno
      ctx.save();
      ctx.fillStyle = "rgba(10,14,40,0.45)";
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }

    if (mockup?.artUrl) {
      const art = await loadImage(mockup.artUrl, false);
      const quad = mockup.streetQuad ?? vista.placement2D;
      // sombra sutil del banner
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 22;
      ctx.shadowOffsetY = 8;
      warpArt(ctx, art, quad, W, H);
      ctx.restore();
    }

    return canvas.toDataURL("image/jpeg", 0.92);
  } catch (e) {
    console.error("captureStreetMockup:", e);
    return null;
  }
}
