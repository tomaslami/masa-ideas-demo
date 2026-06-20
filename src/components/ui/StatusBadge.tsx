import { Badge } from "./Badge";
import type {
  CartelEstado,
  PagoEstado,
  Permiso,
  PipelineEstado,
  PropuestaEstado,
} from "@/lib/types";

const cartel: Record<CartelEstado, { label: string; cls: string; dot: string }> = {
  libre: { label: "Libre", cls: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  ocupado: { label: "Ocupado", cls: "bg-brand-50 text-brand-700", dot: "bg-brand-500" },
  reservado: { label: "Reservado", cls: "bg-amber-50 text-amber-600", dot: "bg-amber-500" },
  mantenimiento: { label: "Mantenimiento", cls: "bg-neutral-100 text-neutral-600", dot: "bg-neutral-400" },
};

const permiso: Record<Permiso, { label: string; cls: string; dot: string }> = {
  vigente: { label: "Permiso vigente", cls: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  "en trámite": { label: "Permiso en trámite", cls: "bg-amber-50 text-amber-600", dot: "bg-amber-500" },
  vencido: { label: "Permiso vencido", cls: "bg-red-50 text-red-600", dot: "bg-red-500" },
};

const pipeline: Record<PipelineEstado, { label: string; cls: string; dot: string }> = {
  prospecto: { label: "Prospecto", cls: "bg-neutral-100 text-neutral-600", dot: "bg-neutral-400" },
  propuesta: { label: "Propuesta enviada", cls: "bg-sky-50 text-sky-700", dot: "bg-sky-500" },
  negociando: { label: "Negociando", cls: "bg-amber-50 text-amber-600", dot: "bg-amber-500" },
  activo: { label: "Activo", cls: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  vencido: { label: "Vencido", cls: "bg-red-50 text-red-600", dot: "bg-red-500" },
};

const pago: Record<PagoEstado, { label: string; cls: string; dot: string }> = {
  pagado: { label: "Pagado", cls: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  pendiente: { label: "Pendiente", cls: "bg-amber-50 text-amber-600", dot: "bg-amber-500" },
  vencido: { label: "Vencido", cls: "bg-red-50 text-red-600", dot: "bg-red-500" },
};

const propuesta: Record<PropuestaEstado, { label: string; cls: string; dot: string }> = {
  borrador: { label: "Borrador", cls: "bg-neutral-100 text-neutral-600", dot: "bg-neutral-400" },
  enviada: { label: "Enviada", cls: "bg-sky-50 text-sky-700", dot: "bg-sky-500" },
  aceptada: { label: "Aceptada", cls: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  rechazada: { label: "Rechazada", cls: "bg-red-50 text-red-600", dot: "bg-red-500" },
};

export function CartelEstadoBadge({ estado }: { estado: CartelEstado }) {
  const c = cartel[estado];
  return <Badge className={c.cls} dot={c.dot}>{c.label}</Badge>;
}
export function PermisoBadge({ permiso: p }: { permiso: Permiso }) {
  const c = permiso[p];
  return <Badge className={c.cls} dot={c.dot}>{c.label}</Badge>;
}
export function PipelineBadge({ estado }: { estado: PipelineEstado }) {
  const c = pipeline[estado];
  return <Badge className={c.cls} dot={c.dot}>{c.label}</Badge>;
}
export function PagoBadge({ estado }: { estado: PagoEstado }) {
  const c = pago[estado];
  return <Badge className={c.cls} dot={c.dot}>{c.label}</Badge>;
}
export function PropuestaBadge({ estado }: { estado: PropuestaEstado }) {
  const c = propuesta[estado];
  return <Badge className={c.cls} dot={c.dot}>{c.label}</Badge>;
}
