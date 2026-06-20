// ============================================================
// Modelo de dominio — Masa Ideas
// El negocio es naturalmente relacional:
//   Cliente → Propuestas → Contrato → Carteles ocupados → Pagos
// ============================================================

export type Zona =
  | "Palermo"
  | "Recoleta"
  | "Belgrano"
  | "Núñez"
  | "Caballito"
  | "Villa Crespo"
  | "Almagro"
  | "Flores"
  | "Puerto Madero"
  | "Microcentro"
  | "Barracas"
  | "Villa Urquiza"
  | "Liniers / Gral. Paz"
  | "Saavedra";

export type CartelTipo =
  | "Frontal"
  | "Medianera"
  | "LED / Digital"
  | "Columna"
  | "Séxtuple"
  | "Cartelera";

export type CartelEstado = "libre" | "ocupado" | "reservado" | "mantenimiento";

export type Permiso = "vigente" | "en trámite" | "vencido";

export interface Cartel {
  id: string;
  codigo: string; // ej. "MI-PAL-012"
  lat: number;
  lng: number;
  direccion: string;
  zona: Zona;
  tipo: CartelTipo;
  anchoM: number;
  altoM: number;
  caras: number;
  iluminado: boolean;
  permiso: Permiso;
  /** Impactos diarios estimados (tránsito) */
  traficoDiario: number;
  orientacion: string; // ej. "Sentido al centro"
  foto: string;
  estado: CartelEstado;
  /** Precio de lista mensual en ARS */
  precioMensual: number;
  notas?: string;
  /** Vista en calle real (solo carteles hero curados) */
  vistaCalle?: VistaCalle;
}

export type PipelineEstado =
  | "prospecto"
  | "propuesta"
  | "negociando"
  | "activo"
  | "vencido";

export type ActividadTipo =
  | "llamada"
  | "email"
  | "reunion"
  | "whatsapp"
  | "nota"
  | "propuesta";

export interface Actividad {
  id: string;
  tipo: ActividadTipo;
  fecha: string; // ISO
  texto: string;
}

export interface Cliente {
  id: string;
  razonSocial: string;
  rubro: string;
  contactoNombre: string;
  contactoCargo: string;
  email: string;
  telefono: string;
  estado: PipelineEstado;
  /** Valor estimado del negocio en ARS (mensual) */
  valorEstimado: number;
  fuente: string; // ej. "Referido", "Inbound web"
  prioridad: "alta" | "media" | "baja";
  /** Color/inicial para el avatar de marca */
  color: string;
  creadoEl: string; // ISO
  actividades: Actividad[];
}

export interface MockupTransform {
  /** posición y tamaño relativos al área de la foto (0..1) */
  xPct: number;
  yPct: number;
  wPct: number;
  rotation: number;
  opacity: number;
}

/** Esquina en coordenadas relativas (0..1) del frame. */
export interface Point {
  x: number;
  y: number;
}

/** Cuadrilátero de 4 esquinas (0..1), orden TL, TR, BR, BL. */
export interface Quad {
  tl: Point;
  tr: Point;
  br: Point;
  bl: Point;
}

/**
 * Vista en calle real (Mapillary) de un cartel: el frame canónico + dónde
 * va el banner. Solo la tienen los carteles "hero" curados; el resto cae a
 * la escena sintética.
 */
export interface VistaCalle {
  /** id del frame canónico de Mapillary (estable). El thumb se resuelve en runtime. */
  mapillaryImageId: string;
  /** la imagen es panorámica (360°) — habilita el explorador 3D */
  esPano: boolean;
  /** rumbo de captura en grados (computed_compass_angle) */
  compass: number;
  /** colocación 2D por defecto del banner sobre el frame — Modo B */
  placement2D: Quad;
  /** geo-anclaje 3D opcional — Modo A (clímax interactivo) */
  placement3D?: {
    lng: number;
    lat: number;
    alt: number;
    /** rotación del plano [x, y, z] en radianes */
    rotation: [number, number, number];
    anchoM: number;
    altoM: number;
  };
}

export interface Mockup {
  cartelId: string;
  /** dataURL del arte subido por el comercial */
  artUrl: string | null;
  transform: MockupTransform;
  /** colocación del banner sobre la vista de calle (pisa vistaCalle.placement2D) */
  streetQuad?: Quad;
  /** mostrar la escena de noche (atardecer + cartel iluminado) */
  nocturno?: boolean;
}

export interface PropuestaItem {
  cartelId: string;
  precioMensual: number;
  meses: number;
  descuentoPct: number;
}

export type PropuestaEstado =
  | "borrador"
  | "enviada"
  | "aceptada"
  | "rechazada";

export interface Propuesta {
  id: string;
  codigo: string; // ej. "PROP-2026-014"
  clienteId: string;
  nombreCampaña: string;
  items: PropuestaItem[];
  mockups: Mockup[];
  estado: PropuestaEstado;
  creadaEl: string; // ISO
  validezDias: number;
  vigenciaDesde: string; // ISO (inicio de campaña propuesto)
  notaComercial?: string;
}

export type PagoEstado = "pagado" | "pendiente" | "vencido";

export interface Pago {
  id: string;
  periodo: string; // ej. "2026-06"
  monto: number;
  vencimiento: string; // ISO
  estado: PagoEstado;
}

export interface Contrato {
  id: string;
  codigo: string; // ej. "CTR-2026-008"
  clienteId: string;
  propuestaId?: string;
  cartelIds: string[];
  fechaInicio: string; // ISO
  fechaFin: string; // ISO
  montoMensual: number;
  pagos: Pago[];
  condiciones: string;
}

export const PIPELINE_COLUMNS: {
  estado: PipelineEstado;
  label: string;
  hint: string;
}[] = [
  { estado: "prospecto", label: "Prospecto", hint: "Oportunidad sin contactar a fondo" },
  { estado: "propuesta", label: "Propuesta enviada", hint: "Esperando respuesta" },
  { estado: "negociando", label: "Negociando", hint: "En conversación de precio / fechas" },
  { estado: "activo", label: "Contrato activo", hint: "Campaña en marcha" },
  { estado: "vencido", label: "Vencido / Renovación", hint: "Para reactivar" },
];
