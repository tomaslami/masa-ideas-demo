import type { Mockup, Propuesta, PropuestaItem } from "../types";
import { cartelesSeed } from "./carteles";
import { marcaArte } from "./clientes";
import { generateAdArt } from "../art";
import { sceneFor } from "../billboard";

// Propuestas de ejemplo, con mockups pre-armados (arte de marca sobre la cara del cartel).

const cartelById = new Map(cartelesSeed.map((c) => [c.id, c]));

function art(clienteId: string, brand: string): string {
  const m = marcaArte[clienteId];
  if (!m) return generateAdArt({ brand, bg: "#e95d0f", fg: "#ffffff" });
  return generateAdArt({ brand, tagline: m.tagline, bg: m.bg, fg: m.fg, accent: m.accent });
}

/** mockup con el arte colocado sobre la cara real del cartel */
function mockupOn(cartelId: string, artUrl: string): Mockup {
  const c = cartelById.get(cartelId)!;
  const { face } = sceneFor(c.codigo, c.tipo, c.iluminado);
  // face está en coords 1200x800 → lo paso a 0..1 sobre el área de la foto
  return {
    cartelId,
    artUrl,
    transform: {
      xPct: face.x / 1200,
      yPct: face.y / 800,
      wPct: face.w / 1200,
      rotation: 0,
      opacity: 1,
    },
  };
}

function items(
  ids: string[],
  meses: number,
  descuentoPct = 0,
): PropuestaItem[] {
  return ids.map((id) => ({
    cartelId: id,
    precioMensual: cartelById.get(id)!.precioMensual,
    meses,
    descuentoPct,
  }));
}

function build(
  id: string,
  codigo: string,
  clienteId: string,
  brand: string,
  nombreCampaña: string,
  ids: string[],
  meses: number,
  estado: Propuesta["estado"],
  creadaEl: string,
  vigenciaDesde: string,
  descuentoPct = 0,
  notaComercial?: string,
): Propuesta {
  const artUrl = art(clienteId, brand);
  return {
    id,
    codigo,
    clienteId,
    nombreCampaña,
    items: items(ids, meses, descuentoPct),
    mockups: ids.map((cid) => mockupOn(cid, artUrl)),
    estado,
    creadaEl,
    validezDias: 15,
    vigenciaDesde,
    notaComercial,
  };
}

export const propuestasSeed: Propuesta[] = [
  build(
    "prop-telco",
    "PROP-2026-018",
    "cli-telco",
    "Conecta",
    "Lanzamiento 5G — Cobertura CABA",
    ["mi-bel-001", "mi-mic-002", "mi-alm-001", "mi-nun-002", "mi-pal-002"],
    3,
    "enviada",
    "2026-06-13T16:00:00",
    "2026-07-01T00:00:00",
    5,
    "Pack premium de alto impacto. Mix de LED y frontales en los corredores de mayor tránsito.",
  ),
  build(
    "prop-super",
    "PROP-2026-019",
    "cli-super-estrella",
    "La Estrella",
    "Aniversario 70 años",
    ["mi-flo-001", "mi-cab-003", "mi-vur-002"],
    2,
    "enviada",
    "2026-06-15T11:30:00",
    "2026-07-01T00:00:00",
    0,
    "Foco en barrios residenciales con presencia de sucursales.",
  ),
  build(
    "prop-indumentaria",
    "PROP-2026-020",
    "cli-indumentaria",
    "Andes",
    "Colección Invierno '26",
    ["mi-pal-003"],
    2,
    "enviada",
    "2026-06-17T12:00:00",
    "2026-07-01T00:00:00",
    0,
    "Medianera de alto impacto visual en el corazón de Palermo.",
  ),
  build(
    "prop-automotores",
    "PROP-2026-017",
    "cli-automotores",
    "Pampa 0km",
    "Lanzamiento modelo 0km",
    ["mi-lgp-001", "mi-bel-001"],
    4,
    "enviada",
    "2026-05-29T15:00:00",
    "2026-07-01T00:00:00",
    8,
    "Máximo tránsito vehicular: acceso a CABA + corredor Cabildo. Descuento por 4 meses.",
  ),
  build(
    "prop-universidad",
    "PROP-2026-021",
    "cli-universidad",
    "U. del Río",
    "Inscripciones 2º cuatrimestre",
    ["mi-cab-002", "mi-alm-002"],
    2,
    "borrador",
    "2026-06-16T10:00:00",
    "2026-07-01T00:00:00",
    0,
    "Recotizando: el cliente pidió sumar una tercera ubicación.",
  ),
];
