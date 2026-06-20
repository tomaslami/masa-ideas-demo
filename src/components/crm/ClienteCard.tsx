"use client";

import { Avatar } from "@/components/ui/Avatar";
import { cn, formatARSCompact, relativeTime } from "@/lib/utils";
import { propuestasDeCliente, contratoDeCliente } from "@/lib/selectors";
import type { Cliente, Contrato, Propuesta } from "@/lib/types";
import { DEMO_NOW } from "@/lib/store";
import { FileText, FileSignature, Clock } from "lucide-react";

const prioridadDot: Record<Cliente["prioridad"], { dot: string; label: string }> = {
  alta: { dot: "bg-red-500", label: "Prioridad alta" },
  media: { dot: "bg-amber-500", label: "Prioridad media" },
  baja: { dot: "bg-neutral-300", label: "Prioridad baja" },
};

export function ClienteCard({
  cliente,
  propuestas,
  contratos,
  dragging,
  overlay,
}: {
  cliente: Cliente;
  propuestas: Propuesta[];
  contratos: Contrato[];
  dragging?: boolean;
  overlay?: boolean;
}) {
  const props = propuestasDeCliente(propuestas, cliente.id);
  const contrato = contratoDeCliente(contratos, cliente.id);
  const ultima = cliente.actividades[0];
  const prio = prioridadDot[cliente.prioridad];

  return (
    <div
      className={cn(
        "group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 transition-all",
        overlay
          ? "scale-[1.03] cursor-grabbing shadow-[var(--shadow-lift)] rotate-[1.5deg]"
          : "shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[var(--shadow-lift)]",
        dragging && "opacity-40",
      )}
    >
      <div className="flex items-start gap-2.5">
        <Avatar name={cliente.razonSocial} color={cliente.color} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span
              className={cn("size-2 shrink-0 rounded-full", prio.dot)}
              title={prio.label}
            />
            <p className="truncate text-sm font-semibold text-ink-900">
              {cliente.razonSocial}
            </p>
          </div>
          <p className="truncate text-xs text-[var(--muted)]">{cliente.rubro}</p>
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between">
        <span className="text-[15px] font-bold tracking-tight text-ink-900 tabular-nums">
          {formatARSCompact(cliente.valorEstimado)}
        </span>
        {ultima && (
          <span className="inline-flex items-center gap-1 text-[11px] text-[var(--muted)]">
            <Clock className="size-3" />
            {relativeTime(ultima.fecha, DEMO_NOW)}
          </span>
        )}
      </div>

      {(props.length > 0 || contrato) && (
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {props.length > 0 && (
            <span className="inline-flex items-center gap-1 rounded-md bg-sky-50 px-1.5 py-0.5 text-[11px] font-medium text-sky-700">
              <FileText className="size-3" />
              {props.length}{" "}
              {props.length === 1 ? "propuesta" : "propuestas"}
            </span>
          )}
          {contrato && (
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[11px] font-medium text-emerald-700">
              <FileSignature className="size-3" />
              Contrato
            </span>
          )}
        </div>
      )}
    </div>
  );
}
