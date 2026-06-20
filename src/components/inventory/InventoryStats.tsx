"use client";

import { cn, formatARSCompact } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { occupancy, ingresosMensuales } from "@/lib/selectors";
import type { Cartel } from "@/lib/types";
import { LayoutGrid, CircleCheck, MapPin, Gauge, Wallet } from "lucide-react";

export function InventoryStats({ carteles }: { carteles: Cartel[] }) {
  const occ = occupancy(carteles);
  const ingreso = ingresosMensuales(carteles);

  const stats: {
    label: string;
    value: string;
    icon: React.ReactNode;
    tint: string;
  }[] = [
    {
      label: "Total carteles",
      value: String(occ.total),
      icon: <LayoutGrid className="size-4" />,
      tint: "text-ink-700 bg-neutral-100",
    },
    {
      label: "Libres",
      value: String(occ.libres),
      icon: <CircleCheck className="size-4" />,
      tint: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Ocupados",
      value: String(occ.ocupados),
      icon: <MapPin className="size-4" />,
      tint: "text-brand-600 bg-brand-50",
    },
    {
      label: "Ocupación",
      value: `${occ.pct}%`,
      icon: <Gauge className="size-4" />,
      tint: "text-amber-600 bg-amber-50",
    },
    {
      label: "Ingreso mensual",
      value: formatARSCompact(ingreso),
      icon: <Wallet className="size-4" />,
      tint: "text-ink-800 bg-neutral-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
      {stats.map((s) => (
        <Card key={s.label} className="flex items-center gap-3 p-3 animate-fade-in">
          <span
            className={cn(
              "grid size-9 flex-none place-items-center rounded-xl",
              s.tint,
            )}
          >
            {s.icon}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-medium uppercase tracking-wide text-[var(--muted)]">
              {s.label}
            </p>
            <p className="text-lg font-bold leading-tight text-ink-900">
              {s.value}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
