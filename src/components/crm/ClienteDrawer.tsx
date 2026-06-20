"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Drawer } from "@/components/ui/Drawer";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Select, Textarea } from "@/components/ui/Field";
import {
  PipelineBadge,
  PropuestaBadge,
  PagoBadge,
} from "@/components/ui/StatusBadge";
import { useToast } from "@/components/ui/toast";
import { useStore, DEMO_NOW } from "@/lib/store";
import {
  propuestasDeCliente,
  contratoDeCliente,
} from "@/lib/selectors";
import { calcTotales } from "@/lib/calc";
import { cn, formatARS, formatDate, relativeTime } from "@/lib/utils";
import {
  PIPELINE_COLUMNS,
  type ActividadTipo,
  type Cliente,
  type Contrato,
  type Propuesta,
} from "@/lib/types";
import { ActividadIcon, actividadLabel } from "./ActividadIcon";
import {
  Mail,
  Phone,
  Building2,
  Sparkles,
  CalendarDays,
  FileText,
  FileSignature,
  ArrowUpRight,
  Plus,
  CheckCircle2,
} from "lucide-react";

const TIPOS: ActividadTipo[] = [
  "llamada",
  "email",
  "reunion",
  "whatsapp",
  "nota",
  "propuesta",
];

export function ClienteDrawer({
  cliente,
  propuestas,
  contratos,
  open,
  onClose,
}: {
  cliente: Cliente | null;
  propuestas: Propuesta[];
  contratos: Contrato[];
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer open={open} onClose={onClose} width="max-w-2xl">
      {cliente && (
        <ClienteDrawerBody
          cliente={cliente}
          propuestas={propuestas}
          contratos={contratos}
        />
      )}
    </Drawer>
  );
}

function ClienteDrawerBody({
  cliente,
  propuestas,
  contratos,
}: {
  cliente: Cliente;
  propuestas: Propuesta[];
  contratos: Contrato[];
}) {
  const moveCliente = useStore((s) => s.moveCliente);
  const addActividad = useStore((s) => s.addActividad);
  const marcarPagoPagado = useStore((s) => s.marcarPagoPagado);
  const push = useToast((s) => s.push);

  const props = propuestasDeCliente(propuestas, cliente.id);
  const contrato = contratoDeCliente(contratos, cliente.id);

  const actividades = useMemo(
    () =>
      [...cliente.actividades].sort(
        (a, b) => +new Date(b.fecha) - +new Date(a.fecha),
      ),
    [cliente.actividades],
  );

  const [tipo, setTipo] = useState<ActividadTipo>("llamada");
  const [texto, setTexto] = useState("");

  function registrar() {
    const t = texto.trim();
    if (!t) return;
    addActividad(cliente.id, {
      tipo,
      fecha: DEMO_NOW.toISOString(),
      texto: t,
    });
    setTexto("");
    push("Actividad registrada", "success");
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-[var(--border)] px-6 pb-5 pt-6 pr-14">
        <div className="flex items-start gap-3.5">
          <Avatar name={cliente.razonSocial} color={cliente.color} size="lg" />
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-lg font-bold tracking-tight text-ink-900">
              {cliente.razonSocial}
            </h2>
            <p className="text-sm text-[var(--muted)]">{cliente.rubro}</p>
            <div className="mt-2">
              <PipelineBadge estado={cliente.estado} />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-1.5 block text-[13px] font-medium text-ink-700">
            Mover a etapa
          </label>
          <Select
            value={cliente.estado}
            onChange={(e) => {
              moveCliente(cliente.id, e.target.value as Cliente["estado"]);
              const label =
                PIPELINE_COLUMNS.find((c) => c.estado === e.target.value)
                  ?.label ?? "";
              push(`Movido a ${label}`, "success");
            }}
            className="max-w-xs"
          >
            {PIPELINE_COLUMNS.map((col) => (
              <option key={col.estado} value={col.estado}>
                {col.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
        {/* Datos de contacto */}
        <section>
          <SectionTitle>Datos de contacto</SectionTitle>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InfoRow
              icon={<Building2 className="size-4" />}
              label="Contacto"
              value={`${cliente.contactoNombre} · ${cliente.contactoCargo}`}
            />
            <InfoRow
              icon={<Mail className="size-4" />}
              label="Email"
              value={
                <a
                  href={`mailto:${cliente.email}`}
                  className="text-brand-600 hover:underline"
                >
                  {cliente.email}
                </a>
              }
            />
            <InfoRow
              icon={<Phone className="size-4" />}
              label="Teléfono"
              value={cliente.telefono}
            />
            <InfoRow
              icon={<Sparkles className="size-4" />}
              label="Fuente"
              value={cliente.fuente}
            />
            <InfoRow
              icon={<PrioridadDot prioridad={cliente.prioridad} />}
              label="Prioridad"
              value={
                <span className="capitalize">{cliente.prioridad}</span>
              }
            />
            <InfoRow
              icon={<CalendarDays className="size-4" />}
              label="Alta"
              value={formatDate(cliente.creadoEl)}
            />
          </div>
          <div className="mt-3 flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--background)]/50 px-4 py-3">
            <span className="text-[13px] font-medium text-[var(--muted)]">
              Valor estimado
            </span>
            <span className="text-base font-bold text-ink-900 tabular-nums">
              {formatARS(cliente.valorEstimado)}
            </span>
          </div>
        </section>

        {/* Propuestas */}
        <section>
          <SectionTitle>
            Propuestas{props.length > 0 && ` · ${props.length}`}
          </SectionTitle>
          {props.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--background)]/40 px-4 py-6 text-center">
              <p className="text-sm text-[var(--muted)]">
                Todavía no hay propuestas para este cliente.
              </p>
              <Link href="/propuestas" className="mt-3 inline-block">
                <Button variant="secondary" size="sm">
                  <Plus className="size-4" />
                  Crear propuesta
                </Button>
              </Link>
            </div>
          ) : (
            <ul className="space-y-2">
              {props.map((p) => {
                const tot = calcTotales(p.items);
                return (
                  <li key={p.id}>
                    <Link
                      href="/propuestas"
                      className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[var(--shadow-lift)]"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                        <FileText className="size-4.5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-semibold text-ink-900">
                            {p.nombreCampaña}
                          </p>
                          <PropuestaBadge estado={p.estado} />
                        </div>
                        <p className="text-xs text-[var(--muted)]">
                          {p.codigo} · {tot.cantidad}{" "}
                          {tot.cantidad === 1 ? "cartel" : "carteles"}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold text-ink-900 tabular-nums">
                          {formatARS(tot.total)}
                        </p>
                        <span className="inline-flex items-center gap-0.5 text-[11px] text-brand-600">
                          Ver <ArrowUpRight className="size-3" />
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Contrato y cobranza */}
        {contrato && (
          <section>
            <SectionTitle>Contrato y cobranza</SectionTitle>
            <ContratoBloque
              contrato={contrato}
              onMarcar={(pagoId, periodo) => {
                marcarPagoPagado(contrato.id, pagoId);
                push(`Pago ${periodo} marcado como pagado`, "success");
              }}
            />
          </section>
        )}

        {/* Registrar actividad */}
        <section>
          <SectionTitle>Registrar actividad</SectionTitle>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[var(--shadow-soft)]">
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <Select
                value={tipo}
                onChange={(e) => setTipo(e.target.value as ActividadTipo)}
                className="sm:w-40"
              >
                {TIPOS.map((t) => (
                  <option key={t} value={t}>
                    {actividadLabel(t)}
                  </option>
                ))}
              </Select>
              <Textarea
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="¿Qué pasó? Ej: Llamé al contacto, pidió revisar precios…"
                className="min-h-[44px] flex-1"
                rows={1}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                    e.preventDefault();
                    registrar();
                  }
                }}
              />
            </div>
            <div className="mt-2.5 flex justify-end">
              <Button
                size="sm"
                onClick={registrar}
                disabled={!texto.trim()}
              >
                <Plus className="size-4" />
                Registrar
              </Button>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section>
          <SectionTitle>Historial de actividad</SectionTitle>
          <ol className="relative space-y-4 pl-1">
            {actividades.map((a, i) => (
              <li key={a.id} className="relative flex gap-3">
                {i < actividades.length - 1 && (
                  <span className="absolute left-[13px] top-8 h-[calc(100%-4px)] w-px bg-[var(--border)]" />
                )}
                <ActividadIcon tipo={a.tipo} />
                <div className="min-w-0 flex-1 pb-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[13px] font-semibold text-ink-800">
                      {actividadLabel(a.tipo)}
                    </span>
                    <span className="shrink-0 text-[11px] text-[var(--muted)]">
                      {relativeTime(a.fecha, DEMO_NOW)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-ink-700">{a.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}

function ContratoBloque({
  contrato,
  onMarcar,
}: {
  contrato: Contrato;
  onMarcar: (pagoId: string, periodo: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)]">
      <div className="flex items-start gap-3 border-b border-[var(--border)] bg-[var(--background)]/40 px-4 py-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
          <FileSignature className="size-4.5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-ink-900">{contrato.codigo}</p>
          <p className="text-xs text-[var(--muted)]">
            {formatDate(contrato.fechaInicio)} – {formatDate(contrato.fechaFin)}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-bold text-ink-900 tabular-nums">
            {formatARS(contrato.montoMensual)}
          </p>
          <p className="text-[11px] text-[var(--muted)]">por mes</p>
        </div>
      </div>

      <ul className="divide-y divide-[var(--border)]">
        {contrato.pagos.map((pago) => {
          const vencido =
            pago.estado === "vencido" ||
            (pago.estado !== "pagado" &&
              new Date(pago.vencimiento) < DEMO_NOW);
          return (
            <li
              key={pago.id}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5",
                vencido && "bg-red-50/50",
              )}
            >
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-ink-800">
                  {pago.periodo} ·{" "}
                  <span className="tabular-nums">{formatARS(pago.monto)}</span>
                </p>
                <p className="text-[11px] text-[var(--muted)]">
                  Vence {formatDate(pago.vencimiento)}
                </p>
              </div>
              <PagoBadge estado={pago.estado} />
              {pago.estado !== "pagado" ? (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onMarcar(pago.id, pago.periodo)}
                >
                  Marcar pagado
                </Button>
              ) : (
                <CheckCircle2 className="size-5 text-emerald-500" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
      {children}
    </h3>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-neutral-100 text-neutral-500">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[11px] text-[var(--muted)]">{label}</p>
        <p className="truncate text-[13px] font-medium text-ink-800">{value}</p>
      </div>
    </div>
  );
}

function PrioridadDot({
  prioridad,
}: {
  prioridad: Cliente["prioridad"];
}) {
  const cls =
    prioridad === "alta"
      ? "bg-red-500"
      : prioridad === "media"
        ? "bg-amber-500"
        : "bg-neutral-300";
  return <span className={cn("size-2.5 rounded-full", cls)} />;
}
