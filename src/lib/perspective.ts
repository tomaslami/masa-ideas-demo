// ============================================================
// Perspectiva: mapea un rectángulo de origen a un cuadrilátero
// (4 esquinas) y produce el `matrix3d` de CSS correspondiente.
// Es una transformación proyectiva 2D (homografía) clásica.
// ============================================================

import type { Quad, Point } from "./types";

type Mat3 = number[]; // 9 elementos, fila-mayor

function multmm(a: Mat3, b: Mat3): Mat3 {
  const r = new Array(9).fill(0);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let s = 0;
      for (let k = 0; k < 3; k++) s += a[3 * i + k] * b[3 * k + j];
      r[3 * i + j] = s;
    }
  }
  return r;
}

function multmv(m: Mat3, v: number[]): number[] {
  return [
    m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
    m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
    m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
  ];
}

function adj(m: Mat3): Mat3 {
  return [
    m[4] * m[8] - m[5] * m[7],
    m[2] * m[7] - m[1] * m[8],
    m[1] * m[5] - m[2] * m[4],
    m[5] * m[6] - m[3] * m[8],
    m[0] * m[8] - m[2] * m[6],
    m[2] * m[3] - m[0] * m[5],
    m[3] * m[7] - m[4] * m[6],
    m[1] * m[6] - m[0] * m[7],
    m[0] * m[4] - m[1] * m[3],
  ];
}

function basisToPoints(pts: number[]): Mat3 {
  const [x1, y1, x2, y2, x3, y3, x4, y4] = pts;
  const m: Mat3 = [x1, x2, x3, y1, y2, y3, 1, 1, 1];
  const v = multmv(adj(m), [x4, y4, 1]);
  return multmm(m, [v[0], 0, 0, 0, v[1], 0, 0, 0, v[2]]);
}

/** Homografía 3x3 que mapea el rect `from` (8 nums) al quad `to` (8 nums). */
function general2DProjection(from: number[], to: number[]): Mat3 {
  const s = basisToPoints(from);
  const d = basisToPoints(to);
  return multmm(d, adj(s));
}

/**
 * Devuelve una función que proyecta (u, v) en [0,1]² (espacio del arte) a
 * píxeles dentro del lienzo `w`×`h`, según el quad destino (0..1). Sirve para
 * deformar el arte en canvas con warp proyectivo.
 */
export function quadProjector(
  quad: Quad,
  w: number,
  h: number,
): (u: number, v: number) => [number, number] {
  const from = [0, 0, 1, 0, 1, 1, 0, 1];
  const to = [
    quad.tl.x * w,
    quad.tl.y * h,
    quad.tr.x * w,
    quad.tr.y * h,
    quad.br.x * w,
    quad.br.y * h,
    quad.bl.x * w,
    quad.bl.y * h,
  ];
  const H = general2DProjection(from, to);
  return (u: number, v: number) => {
    const x = H[0] * u + H[1] * v + H[2];
    const y = H[3] * u + H[4] * v + H[5];
    const wgt = H[6] * u + H[7] * v + H[8];
    return [x / wgt, y / wgt];
  };
}

/**
 * Devuelve el string `matrix3d(...)` que deforma un elemento de tamaño
 * `w`×`h` (con transform-origin 0 0) para que sus esquinas caigan en `quad`.
 * `quad` está en 0..1; lo escalamos por el tamaño del contenedor (w, h).
 */
export function quadToMatrix3d(quad: Quad, w: number, h: number): string {
  const from = [0, 0, w, 0, w, h, 0, h];
  const to = [
    quad.tl.x * w,
    quad.tl.y * h,
    quad.tr.x * w,
    quad.tr.y * h,
    quad.br.x * w,
    quad.br.y * h,
    quad.bl.x * w,
    quad.bl.y * h,
  ];
  const H = general2DProjection(from, to);
  // normalizamos por H[8] para estabilidad numérica
  for (let i = 0; i < 9; i++) H[i] = H[i] / H[8];
  // matrix3d es column-major; insertamos la fila/col Z identidad
  const m = [
    H[0], H[3], 0, H[6],
    H[1], H[4], 0, H[7],
    0, 0, 1, 0,
    H[2], H[5], 0, H[8],
  ];
  return `matrix3d(${m.map((x) => x.toFixed(6)).join(",")})`;
}

/** Centro del quad (0..1). */
export function quadCenter(q: Quad): Point {
  return {
    x: (q.tl.x + q.tr.x + q.br.x + q.bl.x) / 4,
    y: (q.tl.y + q.tr.y + q.br.y + q.bl.y) / 4,
  };
}

/** Mueve todas las esquinas del quad por (dx, dy) en 0..1, con clamp suave. */
export function translateQuad(q: Quad, dx: number, dy: number): Quad {
  const mv = (p: Point): Point => ({
    x: Math.min(1.4, Math.max(-0.4, p.x + dx)),
    y: Math.min(1.4, Math.max(-0.4, p.y + dy)),
  });
  return { tl: mv(q.tl), tr: mv(q.tr), br: mv(q.br), bl: mv(q.bl) };
}

/** Escala el quad respecto de su centro por el factor `f`. */
export function scaleQuad(q: Quad, f: number): Quad {
  const c = quadCenter(q);
  const sc = (p: Point): Point => ({
    x: c.x + (p.x - c.x) * f,
    y: c.y + (p.y - c.y) * f,
  });
  return { tl: sc(q.tl), tr: sc(q.tr), br: sc(q.br), bl: sc(q.bl) };
}

const CORNERS: (keyof Quad)[] = ["tl", "tr", "br", "bl"];

/** Reemplaza una esquina por una posición nueva (0..1), con clamp suave. */
export function setCorner(q: Quad, key: keyof Quad, p: Point): Quad {
  const cl = (n: number) => Math.min(1.4, Math.max(-0.4, n));
  return { ...q, [key]: { x: cl(p.x), y: cl(p.y) } };
}

export { CORNERS };

/** Quad por defecto: rectángulo centrado en el tercio superior, leve perspectiva. */
export function defaultQuad(): Quad {
  return {
    tl: { x: 0.32, y: 0.2 },
    tr: { x: 0.68, y: 0.18 },
    br: { x: 0.69, y: 0.4 },
    bl: { x: 0.31, y: 0.42 },
  };
}
