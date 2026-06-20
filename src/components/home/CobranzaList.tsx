"use client";

import { Receipt, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { PagoBadge } from "@/components/ui/StatusBadge";
import { SectionHeader } from "./SectionHeader";
import { cn, formatARS, formatDate } from "@/lib/utils";
import { byId, cobranzaPendiente } from "@/lib/selectors";
import type { Cliente, Contrato } from "@/lib/types";

export function CobranzaList({
  clientes,
  contratos,
}: {
  clientes: Cliente[];
  contratos: Contrato[];
}) {
  const clientesById = byId(clientes);
  // cobranzaPendiente ya ordena por vencimiento; subimos los vencidos arriba.
  const pendientes = cobranzaPendiente(contratos)
    .slice()
    .sort((a, b) => {
      const av = a.estado === "vencido" ? 0 : 1;
      const bv = b.estado === "vencido" ? 0 : 1;
      if (av !== bv) return av - bv;
      return +new Date(a.vencimiento) - +new Date(b.vencimiento);
    })
    .slice(0, 6);

  return (
    <Card className="overflow-hidden">
      <SectionHeader
        icon={Receipt}
        title="Cobranza — recordatorios"
        hint="Pagos pendientes y vencidos"
        href="/crm"
        linkLabel="Ver en pipeline"
      />

      {pendientes.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-5 py-12 text-center">
          <span className="inline-flex size-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="size-6" />
          </span>
          <p className="text-sm font-semibold text-ink-800">Todo al día</p>
          <p className="max-w-xs text-xs text-[var(--muted)]">
            No hay pagos pendientes ni vencidos. Excelente gestión de cobranza.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-[var(--border)]">
          {pendientes.map((p) => {
            const cliente = clientesById.get(p.clienteId);
            const vencido = p.estado === "vencido";
            return (
              <li
                key={p.id}
                className={cn(
                  "flex items-center gap-3 px-5 py-3 transition-colors hover:bg-neutral-50/70",
                  vencido && "bg-red-50/40",
                )}
              >
                <Avatar
                  name={cliente?.razonSocial ?? "—"}
                  color={cliente?.color ?? "#a3a3a3"}
                  size="sm"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink-900">
                    {cliente?.razonSocial ?? "Cliente"}
                  </p>
                  <p className="truncate text-xs text-[var(--muted)]">
                    {p.contratoCodigo} · período {p.periodo} · vence {formatDate(p.vencimiento)}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span
                    className={cn(
                      "text-sm font-bold tabular-nums",
                      vencido ? "text-red-600" : "text-ink-900",
                    )}
                  >
                    {formatARS(p.monto)}
                  </span>
                  <PagoBadge estado={p.estado} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
