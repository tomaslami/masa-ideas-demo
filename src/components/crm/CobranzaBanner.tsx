"use client";

import { cobranzaPendiente, byId } from "@/lib/selectors";
import type { Cliente, Contrato } from "@/lib/types";
import { DEMO_NOW } from "@/lib/store";
import { formatARS } from "@/lib/utils";
import { AlertTriangle, ArrowRight } from "lucide-react";

export function CobranzaBanner({
  clientes,
  contratos,
  onAbrirCliente,
}: {
  clientes: Cliente[];
  contratos: Contrato[];
  onAbrirCliente: (clienteId: string) => void;
}) {
  const pendientes = cobranzaPendiente(contratos);
  const vencidos = pendientes.filter(
    (p) => p.estado === "vencido" || new Date(p.vencimiento) < DEMO_NOW,
  );

  if (vencidos.length === 0) return null;

  const total = vencidos.reduce((s, p) => s + p.monto, 0);
  const clientesMap = byId(clientes);
  // Cliente del cobro vencido más antiguo (la lista ya viene ordenada por vencimiento asc).
  const primero = vencidos[0];
  const clienteNombre =
    clientesMap.get(primero.clienteId)?.razonSocial ?? "el cliente";

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-red-200 bg-gradient-to-r from-red-50 to-amber-50 px-4 py-3.5 shadow-[var(--shadow-soft)] animate-fade-in sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-red-100 text-red-600">
          <AlertTriangle className="size-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-ink-900">
            Tenés {vencidos.length}{" "}
            {vencidos.length === 1 ? "cobro vencido" : "cobros vencidos"} por{" "}
            {formatARS(total)}
          </p>
          <p className="mt-0.5 text-xs text-ink-700">
            El más atrasado es de{" "}
            <span className="font-medium">{clienteNombre}</span>. Revisalo y
            registrá el pago.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onAbrirCliente(primero.clienteId)}
        className="inline-flex shrink-0 items-center justify-center gap-1.5 self-start rounded-xl bg-red-600 px-3.5 py-2 text-[13px] font-medium text-white shadow-sm transition hover:bg-red-700 sm:self-auto"
      >
        Ver cobranza
        <ArrowRight className="size-4" />
      </button>
    </div>
  );
}
