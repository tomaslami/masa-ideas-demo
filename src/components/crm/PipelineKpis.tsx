"use client";

import { Card } from "@/components/ui/Card";
import { cn, formatARS } from "@/lib/utils";
import {
  cobranzaPendiente,
  valorEnJuego,
} from "@/lib/selectors";
import type { Cliente, Contrato } from "@/lib/types";
import { DEMO_NOW } from "@/lib/store";
import { Layers, TrendingUp, FileCheck2, Wallet } from "lucide-react";

export function PipelineKpis({
  clientes,
  contratos,
}: {
  clientes: Cliente[];
  contratos: Contrato[];
}) {
  const totalOportunidades = clientes.length;
  const enJuego = valorEnJuego(clientes);
  const activos = clientes.filter((c) => c.estado === "activo").length;

  const pendientes = cobranzaPendiente(contratos);
  const vencidos = pendientes.filter(
    (p) => p.estado === "vencido" || new Date(p.vencimiento) < DEMO_NOW,
  );
  const montoPendiente = pendientes.reduce((s, p) => s + p.monto, 0);
  const hayVencidos = vencidos.length > 0;

  const items: {
    label: string;
    value: string;
    sub?: string;
    icon: React.ReactNode;
    tone: "brand" | "amber" | "emerald" | "red" | "neutral";
  }[] = [
    {
      label: "Oportunidades",
      value: String(totalOportunidades),
      sub: "en el pipeline",
      icon: <Layers className="size-4" />,
      tone: "brand",
    },
    {
      label: "Valor en juego",
      value: formatARS(enJuego),
      sub: "negociaciones abiertas",
      icon: <TrendingUp className="size-4" />,
      tone: "amber",
    },
    {
      label: "Contratos activos",
      value: String(activos),
      sub: "campañas en marcha",
      icon: <FileCheck2 className="size-4" />,
      tone: "emerald",
    },
    {
      label: "Cobranza pendiente",
      value: formatARS(montoPendiente),
      sub: hayVencidos
        ? `${vencidos.length} ${vencidos.length === 1 ? "cobro vencido" : "cobros vencidos"}`
        : `${pendientes.length} ${pendientes.length === 1 ? "pago" : "pagos"} por cobrar`,
      icon: <Wallet className="size-4" />,
      tone: hayVencidos ? "red" : "neutral",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((it, i) => (
        <Card
          key={it.label}
          className="animate-scale-in p-3.5 sm:p-4"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "grid size-7 place-items-center rounded-lg",
                it.tone === "brand" && "bg-brand-50 text-brand-600",
                it.tone === "amber" && "bg-amber-50 text-amber-600",
                it.tone === "emerald" && "bg-emerald-50 text-emerald-700",
                it.tone === "red" && "bg-red-50 text-red-600",
                it.tone === "neutral" && "bg-neutral-100 text-neutral-500",
              )}
            >
              {it.icon}
            </span>
            <span className="text-[13px] font-medium text-[var(--muted)]">
              {it.label}
            </span>
          </div>
          <p
            className={cn(
              "mt-2.5 text-xl font-bold tracking-tight tabular-nums sm:text-2xl",
              it.tone === "red" ? "text-red-600" : "text-ink-900",
            )}
          >
            {it.value}
          </p>
          {it.sub && (
            <p
              className={cn(
                "mt-0.5 text-xs",
                it.tone === "red"
                  ? "font-medium text-red-500"
                  : "text-[var(--muted)]",
              )}
            >
              {it.sub}
            </p>
          )}
        </Card>
      ))}
    </div>
  );
}
