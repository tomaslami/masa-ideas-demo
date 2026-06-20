// ============================================================
// Generador de PDF profesional de propuestas comerciales.
// jsPDF (landscape A4, pt). Entregable real para el anunciante.
// ============================================================

import { jsPDF } from "jspdf";
import type { Cartel, Cliente, Propuesta } from "./types";
import { calcTotales, itemTotal } from "./calc";
import { formatARS, formatDate, formatNumber } from "./utils";

// Paleta de marca
const BRAND: [number, number, number] = [233, 93, 15]; // #E95D0F
const BRAND_DARK: [number, number, number] = [209, 78, 10]; // #D14E0A
const INK: [number, number, number] = [29, 26, 23];
const INK_SOFT: [number, number, number] = [120, 112, 106];
const LINE: [number, number, number] = [236, 232, 227];
const SURFACE_SOFT: [number, number, number] = [250, 248, 245];

const PAGE_W = 842; // A4 landscape pt
const PAGE_H = 595;
const MARGIN = 40;

/** Lo que el caller arma para cada cartel: la foto+arte ya capturada como dataURL. */
export interface CartelExport {
  cartel: Cartel;
  mensaje?: string;
  precioMensual: number;
  meses: number;
  descuentoPct: number;
  /** JPEG/PNG dataURL del mockup (foto del cartel con el arte aplicado) */
  mockupDataUrl: string | null;
}

export interface ExportarPropuestaArgs {
  propuesta: Propuesta;
  cliente?: Cliente;
  carteles: CartelExport[];
}

async function fetchLogoDataUrl(): Promise<string | null> {
  try {
    const r = await fetch("/logo_masa_ideas.png");
    if (!r.ok) return null;
    const blob = await r.blob();
    return await new Promise<string>((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result as string);
      fr.onerror = reject;
      fr.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function imgSize(dataUrl: string): Promise<{ w: number; h: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => resolve({ w: 1, h: 1 });
    img.src = dataUrl;
  });
}

export async function exportarPropuestaPDF(args: ExportarPropuestaArgs): Promise<void> {
  const { propuesta, cliente, carteles } = args;
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });

  const totales = calcTotales(propuesta.items);
  const logo = await fetchLogoDataUrl();
  const logoSize = logo ? await imgSize(logo) : null;
  const razonSocial = cliente?.razonSocial ?? "Sin cliente asignado";

  // helper de pie de página + numeración (se aplica al final a todas las páginas)
  const drawFooter = (pageNo: number, totalPages: number) => {
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.8);
    doc.line(MARGIN, PAGE_H - 30, PAGE_W - MARGIN, PAGE_H - 30);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...INK_SOFT);
    doc.text(
      "Masa Ideas · Publicidad en vía pública · CABA",
      MARGIN,
      PAGE_H - 18,
    );
    doc.text(
      `${propuesta.codigo}  ·  Página ${pageNo} de ${totalPages}`,
      PAGE_W - MARGIN,
      PAGE_H - 18,
      { align: "right" },
    );
  };

  // ============================================================
  // PORTADA
  // ============================================================
  // banda superior naranja
  doc.setFillColor(...BRAND);
  doc.rect(0, 0, PAGE_W, 86, "F");
  doc.setFillColor(...BRAND_DARK);
  doc.rect(0, 86, PAGE_W, 4, "F");

  // logo
  if (logo && logoSize) {
    const lh = 46;
    const lw = (logoSize.w / logoSize.h) * lh;
    try {
      doc.addImage(logo, "PNG", MARGIN, 20, lw, lh);
    } catch {
      /* noop */
    }
  } else {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text("Masa Ideas", MARGIN, 54);
  }

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text("Publicidad en vía pública · CABA", PAGE_W - MARGIN, 50, {
    align: "right",
  });

  // título
  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.setTextColor(...INK_SOFT);
  doc.text("PROPUESTA COMERCIAL", MARGIN, 150);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.setTextColor(...INK);
  const campaña = doc.splitTextToSize(propuesta.nombreCampaña, PAGE_W - MARGIN * 2);
  doc.text(campaña, MARGIN, 184);

  let yMeta = 184 + campaña.length * 30 + 6;

  // sub-línea cliente + fechas
  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.setTextColor(...BRAND_DARK);
  doc.text(`Preparada para  ${razonSocial}`, MARGIN, yMeta);
  yMeta += 26;

  doc.setFontSize(10.5);
  doc.setTextColor(...INK_SOFT);
  const fechaTxt = `Emisión: ${formatDate(propuesta.creadaEl)}`;
  const vigTxt = `Inicio de campaña: ${formatDate(propuesta.vigenciaDesde)}`;
  const validezTxt = `Validez de la oferta: ${propuesta.validezDias} días`;
  doc.text(`${fechaTxt}      ${vigTxt}      ${validezTxt}`, MARGIN, yMeta);

  // tarjetas resumen
  const cardY = 360;
  const cardH = 120;
  const gap = 18;
  const cardW = (PAGE_W - MARGIN * 2 - gap * 2) / 3;
  const resumenCards: { label: string; value: string }[] = [
    { label: "Carteles en la campaña", value: formatNumber(totales.cantidad) },
    { label: "Inversión mensual", value: formatARS(totales.mensualConDescuento) },
    { label: "Total de la campaña", value: formatARS(totales.total) },
  ];
  resumenCards.forEach((c, i) => {
    const x = MARGIN + i * (cardW + gap);
    const highlight = i === 2;
    if (highlight) {
      doc.setFillColor(...BRAND);
      doc.roundedRect(x, cardY, cardW, cardH, 12, 12, "F");
    } else {
      doc.setFillColor(...SURFACE_SOFT);
      doc.roundedRect(x, cardY, cardW, cardH, 12, 12, "F");
      doc.setDrawColor(...LINE);
      doc.setLineWidth(1);
      doc.roundedRect(x, cardY, cardW, cardH, 12, 12, "S");
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const labelColor: [number, number, number] = highlight
      ? [255, 235, 220]
      : INK_SOFT;
    const valueColor: [number, number, number] = highlight
      ? [255, 255, 255]
      : INK;
    doc.setTextColor(...labelColor);
    doc.text(c.label.toUpperCase(), x + 20, cardY + 34);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(...valueColor);
    doc.text(c.value, x + 20, cardY + 76);
  });

  // ============================================================
  // UNA PÁGINA POR CARTEL
  // ============================================================
  for (let i = 0; i < carteles.length; i++) {
    const ce = carteles[i];
    doc.addPage();
    await renderCartelPage(doc, ce, i + 1, carteles.length, logo, logoSize);
  }

  // ============================================================
  // PÁGINA FINAL — RESUMEN + TOTALES
  // ============================================================
  const cartelMap = new Map(carteles.map((ce) => [ce.cartel.id, ce.cartel]));
  doc.addPage();
  renderResumenPage(doc, propuesta, razonSocial, totales, cartelMap);

  // ============================================================
  // Pie + numeración en todas las páginas
  // ============================================================
  const total = doc.getNumberOfPages();
  for (let p = 1; p <= total; p++) {
    doc.setPage(p);
    drawFooter(p, total);
  }

  const safe = razonSocial.replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "");
  doc.save(`Propuesta-${propuesta.codigo}-${safe}.pdf`);
}

// ------------------------------------------------------------
// Página de cartel
// ------------------------------------------------------------
async function renderCartelPage(
  doc: jsPDF,
  ce: CartelExport,
  index: number,
  totalCarteles: number,
  logo: string | null,
  logoSize: { w: number; h: number } | null,
) {
  const c = ce.cartel;

  // mini header
  doc.setFillColor(...BRAND);
  doc.rect(0, 0, PAGE_W, 6, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...BRAND_DARK);
  doc.text(`UBICACIÓN ${index} DE ${totalCarteles}`, MARGIN, 34);
  if (logo && logoSize) {
    const lh = 18;
    const lw = (logoSize.w / logoSize.h) * lh;
    try {
      doc.addImage(logo, "PNG", PAGE_W - MARGIN - lw, 20, lw, lh);
    } catch {
      /* noop */
    }
  }

  // imagen del mockup (izquierda)
  const imgX = MARGIN;
  const imgY = 52;
  const imgW = 470;
  const imgH = imgW * (625 / 1000); // ratio 16/10 del nodo capturado
  doc.setFillColor(238, 238, 238);
  doc.roundedRect(imgX, imgY, imgW, imgH, 10, 10, "F");
  if (ce.mockupDataUrl) {
    try {
      // recorte redondeado simulado: la imagen va dentro del rect
      doc.addImage(ce.mockupDataUrl, "JPEG", imgX, imgY, imgW, imgH, undefined, "FAST");
    } catch {
      /* noop */
    }
  }
  // borde
  doc.setDrawColor(...LINE);
  doc.setLineWidth(1);
  doc.roundedRect(imgX, imgY, imgW, imgH, 10, 10, "S");

  // ficha (derecha)
  const fx = imgX + imgW + 30;
  const fw = PAGE_W - MARGIN - fx;
  let fy = imgY + 4;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...INK);
  doc.text(c.codigo, fx, fy + 16);
  fy += 36;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...INK_SOFT);
  const dir = doc.splitTextToSize(c.direccion, fw);
  doc.text(dir, fx, fy);
  fy += dir.length * 15 + 4;

  // chips de datos
  const filas: [string, string][] = [
    ["Zona", c.zona],
    ["Tipo", c.tipo],
    ["Medidas", `${c.anchoM} × ${c.altoM} m · ${c.caras} ${c.caras === 1 ? "cara" : "caras"}`],
    ["Tránsito", `${formatNumber(c.traficoDiario)} impactos/día`],
    ["Iluminación", c.iluminado ? "Iluminado" : "Sin iluminación"],
    ["Orientación", c.orientacion],
  ];
  fy += 6;
  doc.setDrawColor(...LINE);
  filas.forEach(([k, v]) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...INK_SOFT);
    doc.text(k.toUpperCase(), fx, fy);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...INK);
    const vLines = doc.splitTextToSize(v, fw - 110);
    doc.text(vLines, fx + 110, fy);
    fy += Math.max(vLines.length * 13, 16) + 6;
    doc.setLineWidth(0.6);
    doc.line(fx, fy - 4, fx + fw, fy - 4);
  });

  // bloque de precio
  const sub = itemTotal({
    cartelId: c.id,
    precioMensual: ce.precioMensual,
    meses: ce.meses,
    descuentoPct: ce.descuentoPct,
  });
  const boxY = imgY + imgH - 96;
  const boxX = fx;
  const boxW = fw;
  doc.setFillColor(...SURFACE_SOFT);
  doc.roundedRect(boxX, boxY, boxW, 96, 10, 10, "F");
  doc.setDrawColor(...LINE);
  doc.roundedRect(boxX, boxY, boxW, 96, 10, 10, "S");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...INK_SOFT);
  doc.text(
    `${formatARS(ce.precioMensual)} / mes  ×  ${ce.meses} ${ce.meses === 1 ? "mes" : "meses"}${
      ce.descuentoPct > 0 ? `   ·   ${ce.descuentoPct}% off` : ""
    }`,
    boxX + 18,
    boxY + 30,
  );
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...INK_SOFT);
  doc.text("Subtotal de la ubicación", boxX + 18, boxY + 66);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...BRAND_DARK);
  doc.text(formatARS(sub), boxX + boxW - 18, boxY + 70, { align: "right" });
}

// ------------------------------------------------------------
// Página resumen final
// ------------------------------------------------------------
function renderResumenPage(
  doc: jsPDF,
  propuesta: Propuesta,
  razonSocial: string,
  totales: ReturnType<typeof calcTotales>,
  cartelMap: Map<string, Cartel>,
) {
  doc.setFillColor(...BRAND);
  doc.rect(0, 0, PAGE_W, 6, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...INK);
  doc.text("Resumen de la propuesta", MARGIN, 56);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...INK_SOFT);
  doc.text(`${razonSocial} · ${propuesta.codigo}`, MARGIN, 76);

  // tabla
  const tableX = MARGIN;
  const tableW = PAGE_W - MARGIN * 2;
  let ty = 110;
  const cols = [
    { key: "codigo", label: "Cartel", w: 0.16, align: "left" as const },
    { key: "ubic", label: "Ubicación", w: 0.34, align: "left" as const },
    { key: "meses", label: "Meses", w: 0.1, align: "center" as const },
    { key: "precio", label: "Precio mensual", w: 0.2, align: "right" as const },
    { key: "sub", label: "Subtotal", w: 0.2, align: "right" as const },
  ];
  const colX = (idx: number) => {
    let x = tableX;
    for (let i = 0; i < idx; i++) x += cols[i].w * tableW;
    return x;
  };
  const cellText = (idx: number, text: string, y: number) => {
    const col = cols[idx];
    const x0 = colX(idx);
    const w = col.w * tableW;
    if (col.align === "right") doc.text(text, x0 + w - 8, y, { align: "right" });
    else if (col.align === "center") doc.text(text, x0 + w / 2, y, { align: "center" });
    else doc.text(text, x0 + 8, y);
  };

  // header de tabla
  doc.setFillColor(...INK);
  doc.roundedRect(tableX, ty, tableW, 26, 6, 6, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(255, 255, 255);
  cols.forEach((_, i) => cellText(i, cols[i].label.toUpperCase(), ty + 17));
  ty += 26;

  // filas
  propuesta.items.forEach((it, i) => {
    const c = cartelMap.get(it.cartelId);
    const sub = itemTotal(it);
    const rowH = 26;
    if (i % 2 === 1) {
      doc.setFillColor(...SURFACE_SOFT);
      doc.rect(tableX, ty, tableW, rowH, "F");
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...INK);
    cellText(0, c?.codigo ?? it.cartelId, ty + 17);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...INK_SOFT);
    cellText(1, c ? `${c.direccion} · ${c.zona}` : "—", ty + 17);
    doc.setTextColor(...INK);
    cellText(2, String(it.meses), ty + 17);
    cellText(
      3,
      `${formatARS(it.precioMensual)}${it.descuentoPct > 0 ? ` (-${it.descuentoPct}%)` : ""}`,
      ty + 17,
    );
    doc.setFont("helvetica", "bold");
    cellText(4, formatARS(sub), ty + 17);
    ty += rowH;
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.5);
    doc.line(tableX, ty, tableX + tableW, ty);
  });

  // totales (derecha)
  ty += 18;
  const totW = 280;
  const totX = PAGE_W - MARGIN - totW;
  const totalRow = (label: string, value: string, bold = false, big = false) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(big ? 14 : 10.5);
    doc.setTextColor(...(bold ? INK : INK_SOFT));
    doc.text(label, totX, ty);
    doc.setTextColor(...(big ? BRAND_DARK : INK));
    doc.text(value, totX + totW, ty, { align: "right" });
    ty += big ? 26 : 19;
  };
  totalRow("Subtotal", formatARS(totales.subtotal));
  if (totales.descuento > 0) totalRow("Descuentos", `– ${formatARS(totales.descuento)}`);
  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.8);
  doc.line(totX, ty - 6, totX + totW, ty - 6);
  ty += 6;
  totalRow("TOTAL DE LA CAMPAÑA", formatARS(totales.total), true, true);

  // nota comercial (izquierda)
  let ny = ty - 64;
  const noteW = totX - MARGIN - 30;
  if (propuesta.notaComercial) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...INK);
    doc.text("Nota del comercial", MARGIN, ny);
    ny += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...INK_SOFT);
    const lines = doc.splitTextToSize(propuesta.notaComercial, noteW);
    doc.text(lines, MARGIN, ny);
  }

  // contacto
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...BRAND_DARK);
  doc.text(
    "Masa Ideas · hola@masaideas.com.ar · +54 11 4000-0000",
    MARGIN,
    PAGE_H - 50,
  );
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...INK_SOFT);
  doc.text(
    `Oferta válida por ${propuesta.validezDias} días desde la fecha de emisión. Precios en pesos argentinos (ARS), sin IVA.`,
    MARGIN,
    PAGE_H - 36,
  );
}
