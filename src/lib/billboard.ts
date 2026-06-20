// ============================================================
// Generador de escenas de cartel (SVG paramétrico)
// Cada cartel tiene una "foto" determinística por su código.
// Devuelve también el rectángulo de la cara del cartel para que
// el editor de propuestas coloque el arte del anunciante exacto.
// ============================================================

import type { CartelTipo } from "./types";

export const SCENE_W = 1200;
export const SCENE_H = 800;

export interface FaceRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

function seedFrom(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

const SKIES = [
  // día limpio
  { a: "#bfe0f2", b: "#e9f4fa", sun: "#fffefb", haze: "#dceaf2", build: "#c0cdd6" },
  // hora dorada
  { a: "#f6c98a", b: "#fdeccb", sun: "#fff4dc", haze: "#f5dcb8", build: "#b9a48f" },
  // atardecer
  { a: "#9aa7cf", b: "#f0d2c2", sun: "#ffe8d6", haze: "#d8cdd6", build: "#9892a6" },
];

function buildingsSilhouette(seed: number, color: string): string {
  let rects = "";
  let x = -20;
  let i = 0;
  while (x < SCENE_W + 40) {
    const w = 60 + ((seed >> (i % 7)) % 5) * 22;
    const h = 90 + ((seed >> (i % 5)) % 9) * 26;
    const y = 520 - h;
    const op = 0.5 + ((seed >> i) % 4) * 0.08;
    rects += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}" opacity="${op.toFixed(
      2,
    )}"/>`;
    // ventanitas
    if ((seed >> i) % 3 === 0) {
      for (let wy = y + 16; wy < 510; wy += 26) {
        for (let wx = x + 10; wx < x + w - 10; wx += 22) {
          rects += `<rect x="${wx}" y="${wy}" width="8" height="12" fill="#ffffff" opacity="0.10"/>`;
        }
      }
    }
    x += w + 6;
    i++;
  }
  return rects;
}

function idPlate(code: string): string {
  return `<g opacity="0.92">
    <rect x="556" y="612" width="88" height="22" rx="4" fill="#1d1a17"/>
    <text x="600" y="627" text-anchor="middle" font-family="monospace" font-size="12" fill="#f5853f" letter-spacing="1">${code}</text>
  </g>`;
}

/** layout sobre estructura (poste) — frontal, columna, séxtuple, cartelera, LED */
function panelScene(
  seed: number,
  code: string,
  iluminado: boolean,
  digital: boolean,
): { body: string; face: FaceRect } {
  const sky = SKIES[seed % SKIES.length];
  const shift = ((seed >> 3) % 5) * 30 - 60; // corrimiento horizontal
  const face: FaceRect = { x: 320 + shift, y: 150, w: 560, h: 280 };
  const fx = face.x;
  const fy = face.y;
  const fw = face.w;
  const fh = face.h;

  const screen = digital
    ? `<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" fill="#0c0f14"/>
       <rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" fill="url(#scan)" opacity="0.5"/>`
    : `<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" fill="#f3efe9"/>
       <rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" fill="url(#paper)" opacity="0.6"/>`;

  const lights = iluminado
    ? `<g>
        <rect x="${fx - 6}" y="${fy - 30}" width="${fw + 12}" height="10" rx="3" fill="#2a2622"/>
        ${[0.2, 0.5, 0.8]
          .map(
            (p) =>
              `<g><circle cx="${fx + fw * p}" cy="${fy - 24}" r="6" fill="#ffe9b0"/><ellipse cx="${
                fx + fw * p
              }" cy="${fy + 6}" rx="44" ry="${fh * 0.6}" fill="#fff4cf" opacity="0.10"/></g>`,
          )
          .join("")}
      </g>`
    : "";

  const poleColor = "#3a3531";
  const baseY = 760;
  const body = `
    <rect x="0" y="0" width="${SCENE_W}" height="${SCENE_H}" fill="url(#sky)"/>
    <circle cx="${200 + (seed % 600)}" cy="130" r="60" fill="${sky.sun}" opacity="0.55"/>
    ${buildingsSilhouette(seed, sky.build)}
    <rect x="0" y="520" width="${SCENE_W}" height="${SCENE_H - 520}" fill="url(#ground)"/>
    <rect x="0" y="520" width="${SCENE_W}" height="3" fill="#00000010"/>
    <!-- estructura -->
    <rect x="${fx + fw / 2 - 30}" y="${fy + fh}" width="22" height="${baseY - (fy + fh)}" fill="${poleColor}"/>
    <rect x="${fx + fw / 2 + 8}" y="${fy + fh}" width="22" height="${baseY - (fy + fh)}" fill="${poleColor}"/>
    <rect x="${fx + fw / 2 - 40}" y="${baseY}" width="100" height="14" rx="3" fill="#2a2622"/>
    <!-- marco -->
    <rect x="${fx - 14}" y="${fy - 14}" width="${fw + 28}" height="${fh + 28}" rx="6" fill="#262220"/>
    <rect x="${fx - 6}" y="${fy - 6}" width="${fw + 12}" height="${fh + 12}" rx="3" fill="#3d3833"/>
    ${screen}
    <rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" fill="none" stroke="#00000022" stroke-width="2"/>
    ${lights}
    ${idPlate(code)}
    <!-- viñeta -->
    <rect x="0" y="0" width="${SCENE_W}" height="${SCENE_H}" fill="url(#vig)"/>
  `;
  return { body, face };
}

/** layout sobre medianera (pared de edificio) */
function wallScene(
  seed: number,
  code: string,
  iluminado: boolean,
): { body: string; face: FaceRect } {
  const sky = SKIES[seed % SKIES.length];
  const left = (seed >> 2) % 2 === 0;
  const bx = left ? 90 : 560; // edificio
  const bw = 560;
  const face: FaceRect = { x: bx + 70, y: 150, w: bw - 140, h: 320 };
  const lights = iluminado
    ? [0.25, 0.75]
        .map(
          (p) =>
            `<g><rect x="${face.x + face.w * p - 22}" y="${
              face.y + face.h + 6
            }" width="44" height="8" rx="3" fill="#2a2622"/><ellipse cx="${
              face.x + face.w * p
            }" cy="${face.y + face.h * 0.5}" rx="50" ry="${
              face.h * 0.55
            }" fill="#fff4cf" opacity="0.10"/></g>`,
        )
        .join("")
    : "";

  const body = `
    <rect x="0" y="0" width="${SCENE_W}" height="${SCENE_H}" fill="url(#sky)"/>
    <circle cx="${200 + (seed % 600)}" cy="120" r="60" fill="${sky.sun}" opacity="0.5"/>
    ${buildingsSilhouette(seed, sky.build)}
    <!-- edificio medianera -->
    <rect x="${bx}" y="70" width="${bw}" height="${SCENE_H - 70}" fill="#cdbfb2"/>
    <rect x="${bx}" y="70" width="${bw}" height="${SCENE_H - 70}" fill="url(#wall)" opacity="0.5"/>
    <rect x="${bx}" y="70" width="14" height="${SCENE_H - 70}" fill="#00000018"/>
    <rect x="0" y="520" width="${SCENE_W}" height="${SCENE_H - 520}" fill="url(#ground)"/>
    <!-- panel pintado en la pared -->
    <rect x="${face.x - 10}" y="${face.y - 10}" width="${face.w + 20}" height="${
      face.h + 20
    }" rx="4" fill="#1d1a17" opacity="0.9"/>
    <rect x="${face.x}" y="${face.y}" width="${face.w}" height="${face.h}" fill="#f3efe9"/>
    <rect x="${face.x}" y="${face.y}" width="${face.w}" height="${face.h}" fill="url(#paper)" opacity="0.6"/>
    ${lights}
    ${idPlate(code)}
    <rect x="0" y="0" width="${SCENE_W}" height="${SCENE_H}" fill="url(#vig)"/>
  `;
  return { body, face };
}

const DEFS = `
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="SKYA"/>
      <stop offset="100%" stop-color="SKYB"/>
    </linearGradient>
    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#8c857d"/>
      <stop offset="100%" stop-color="#6f6862"/>
    </linearGradient>
    <pattern id="scan" width="4" height="4" patternUnits="userSpaceOnUse">
      <rect width="4" height="2" fill="#ffffff" opacity="0.04"/>
    </pattern>
    <pattern id="paper" width="120" height="120" patternUnits="userSpaceOnUse">
      <rect width="120" height="120" fill="#ffffff"/>
      <rect width="120" height="120" fill="#e7e0d6" opacity="0.25"/>
    </pattern>
    <pattern id="wall" width="40" height="40" patternUnits="userSpaceOnUse">
      <rect width="40" height="40" fill="none"/>
      <rect width="40" height="1" fill="#00000010"/>
      <rect width="1" height="40" fill="#00000010"/>
    </pattern>
    <radialGradient id="vig" cx="50%" cy="42%" r="75%">
      <stop offset="60%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.14"/>
    </radialGradient>
  </defs>
`;

export interface Scene {
  svg: string;
  dataUrl: string;
  face: FaceRect;
}

export function generateScene(
  code: string,
  tipo: CartelTipo,
  iluminado: boolean,
): Scene {
  const seed = seedFrom(code);
  const sky = SKIES[seed % SKIES.length];
  const digital = tipo === "LED / Digital";
  const { body, face } =
    tipo === "Medianera"
      ? wallScene(seed, code, iluminado)
      : panelScene(seed, code, iluminado, digital);

  const defs = DEFS.replace("SKYA", sky.a).replace("SKYB", sky.b);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SCENE_W} ${SCENE_H}" width="${SCENE_W}" height="${SCENE_H}">${defs}${body}</svg>`;
  const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  return { svg, dataUrl, face };
}

/** Cache simple por código para no regenerar */
const cache = new Map<string, Scene>();
export function sceneFor(
  code: string,
  tipo: CartelTipo,
  iluminado: boolean,
): Scene {
  const key = `${code}|${tipo}|${iluminado}`;
  let s = cache.get(key);
  if (!s) {
    s = generateScene(code, tipo, iluminado);
    cache.set(key, s);
  }
  return s;
}
