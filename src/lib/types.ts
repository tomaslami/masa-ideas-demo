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

export interface Mockup {
  cartelId: string;
  /** dataURL del arte subido por el comercial */
  artUrl: string | null;
  transform: MockupTransform;
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
