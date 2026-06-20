"use client";

import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "./SectionHeader";
import { formatARSCompact } from "@/lib/utils";
import { ingresosPorZona } from "@/lib/selectors";
import type { Cartel } from "@/lib/types";

export function OcupacionPorZona({ carteles }: { carteles: Cartel[] }) {
  const zonas = ingresosPorZona(carteles).slice(0, 6);

  return (
    <Card className="overflow-hidden">
      <SectionHeader
        icon={MapPin}
        title="Ocupación por zona"
        hint="Top zonas por facturación"
        href="/inventario"
        linkLabel="Ver mapa"
      />
      <ul className="flex flex-col gap-3.5 px-5 py-4">
        {zonas.map((z) => (
          <li key={z.zona}>
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-semibold text-ink-900">{z.zona}</span>
              <div className="flex shrink-0 items-baseline gap-2 text-xs text-[var(--muted)]">
                <span className="tabular-nums">
                  {z.ocupado}/{z.total}
                </span>
                <span className="font-semibold text-ink-800 tabular-nums">
                  {formatARSCompact(z.ingreso)}
                </span>
              </div>
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-brand-500 transition-[width] duration-500"
                  style={{ width: `${z.pct}%` }}
                />
              </div>
              <span className="w-9 text-right text-xs font-semibold text-brand-600 tabular-nums">
                {z.pct}%
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
