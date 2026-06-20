"use client";

import { cn, formatARS, formatNumber } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { CartelEstadoBadge } from "@/components/ui/StatusBadge";
import { CartelPhoto } from "@/components/cartel/CartelPhoto";
import type { Cartel } from "@/lib/types";
import { Lightbulb, LightbulbOff, Maximize2, Layers, Activity } from "lucide-react";

export function CartelCard({
  cartel,
  selected,
  onClick,
}: {
  cartel: Cartel;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group block w-full text-left transition-all duration-200 outline-none",
        "hover:-translate-y-0.5 focus-visible:-translate-y-0.5",
      )}
    >
      <Card
        className={cn(
          "overflow-hidden transition-all duration-200",
          "group-hover:shadow-[var(--shadow-lift)]",
          selected
            ? "ring-2 ring-brand-400 border-brand-300 shadow-[var(--shadow-lift)]"
            : "ring-0",
        )}
      >
        <CartelPhoto cartel={cartel} className="aspect-[3/2]">
          <div className="absolute left-2.5 top-2.5">
            <span className="rounded-full bg-white/90 shadow-sm backdrop-blur">
              <CartelEstadoBadge estado={cartel.estado} />
            </span>
          </div>
          <span className="absolute right-2.5 top-2.5 rounded-full bg-ink-900/80 px-2.5 py-1 font-mono text-[11px] font-semibold text-white shadow-sm backdrop-blur">
            {cartel.codigo}
          </span>
        </CartelPhoto>

        <div className="p-3.5">
          <p className="truncate text-[15px] font-bold leading-tight text-ink-900">
            {cartel.direccion}
          </p>
          <p className="mt-0.5 text-xs text-[var(--muted)]">
            {cartel.zona} · {cartel.tipo}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <Chip icon={<Maximize2 className="size-3" />}>
              {cartel.anchoM}×{cartel.altoM} m
            </Chip>
            <Chip icon={<Layers className="size-3" />}>
              {cartel.caras} {cartel.caras === 1 ? "cara" : "caras"}
            </Chip>
            <Chip
              icon={
                cartel.iluminado ? (
                  <Lightbulb className="size-3 text-amber-500" />
                ) : (
                  <LightbulbOff className="size-3" />
                )
              }
            >
              {cartel.iluminado ? "Iluminado" : "Sin luz"}
            </Chip>
          </div>

          <div className="mt-3 flex items-end justify-between gap-2 border-t border-[var(--border)] pt-3">
            <span className="inline-flex items-center gap-1 text-xs text-[var(--muted)]">
              <Activity className="size-3.5 text-brand-400" />
              {formatNumber(cartel.traficoDiario)} impactos/día
            </span>
            <span className="text-[15px] font-bold text-brand-600">
              {formatARS(cartel.precioMensual)}
              <span className="ml-0.5 text-[11px] font-medium text-[var(--muted)]">
                /mes
              </span>
            </span>
          </div>
        </div>
      </Card>
    </button>
  );
}

function Chip({
  icon,
  children,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-lg bg-neutral-100 px-2 py-1 text-[11px] font-medium text-ink-700">
      {icon}
      {children}
    </span>
  );
}
