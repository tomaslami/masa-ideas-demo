"use client";

import { Filter } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { PipelineBadge } from "@/components/ui/StatusBadge";
import { SectionHeader } from "./SectionHeader";
import { formatARSCompact } from "@/lib/utils";
import { pipelineResumen } from "@/lib/selectors";
import type { Cliente } from "@/lib/types";

export function EmbudoComercial({ clientes }: { clientes: Cliente[] }) {
  const resumen = pipelineResumen(clientes);
  const maxValor = Math.max(1, ...resumen.map((r) => r.valor));

  return (
    <Card className="overflow-hidden">
      <SectionHeader
        icon={Filter}
        title="Embudo comercial"
        hint="Distribución del pipeline por etapa"
        href="/crm"
        linkLabel="Abrir pipeline"
      />
      <ul className="flex flex-col gap-3 px-5 py-4">
        {resumen.map((r) => (
          <li key={r.estado}>
            <div className="flex items-center justify-between gap-2">
              <PipelineBadge estado={r.estado} />
              <div className="flex items-baseline gap-2 text-right">
                <span className="text-sm font-bold text-ink-900 tabular-nums">
                  {formatARSCompact(r.valor)}
                </span>
                <span className="w-5 text-xs font-medium text-[var(--muted)] tabular-nums">
                  {r.count}
                </span>
              </div>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-300 to-brand-500 transition-[width] duration-500"
                style={{ width: `${Math.round((r.valor / maxValor) * 100)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
