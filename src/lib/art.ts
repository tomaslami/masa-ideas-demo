// Generador de "arte" del anunciante (aviso simulado) como SVG dataURL.
// Sirve para prellenar propuestas del demo y como atajo "arte de marca"
// dentro del editor de propuestas.

export interface AdSpec {
  brand: string;
  tagline?: string;
  bg: string;
  fg: string;
  accent?: string;
}

export const AD_W = 1000;
export const AD_H = 520;

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function generateAdArt(spec: AdSpec): string {
  const { brand, tagline = "", bg, fg, accent = "#ffffff" } = spec;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${AD_W} ${AD_H}" width="${AD_W}" height="${AD_H}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bg}"/>
        <stop offset="100%" stop-color="${shade(bg, -18)}"/>
      </linearGradient>
    </defs>
    <rect width="${AD_W}" height="${AD_H}" fill="url(#g)"/>
    <circle cx="${AD_W - 120}" cy="120" r="200" fill="${accent}" opacity="0.10"/>
    <circle cx="120" cy="${AD_H - 80}" r="150" fill="${accent}" opacity="0.08"/>
    <rect x="70" y="${AD_H / 2 - 70}" width="64" height="10" rx="5" fill="${accent}"/>
    <text x="70" y="${AD_H / 2 + 6}" font-family="Geist, Arial, sans-serif" font-size="84" font-weight="800" fill="${fg}" letter-spacing="-2">${esc(
      brand,
    )}</text>
    ${
      tagline
        ? `<text x="72" y="${AD_H / 2 + 64}" font-family="Geist, Arial, sans-serif" font-size="32" font-weight="500" fill="${fg}" opacity="0.85">${esc(
            tagline,
          )}</text>`
        : ""
    }
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function shade(hex: string, pct: number): string {
  const n = hex.replace("#", "");
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  const f = (c: number) =>
    Math.max(0, Math.min(255, Math.round(c + (c * pct) / 100)));
  return `#${[f(r), f(g), f(b)]
    .map((c) => c.toString(16).padStart(2, "0"))
    .join("")}`;
}
