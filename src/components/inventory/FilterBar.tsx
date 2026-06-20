"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import type { CartelEstado, CartelTipo, Zona } from "@/lib/types";
import { Search, Lightbulb, CircleCheck, X } from "lucide-react";

export interface Filtros {
  q: string;
  zona: Zona | "todas";
  tipo: CartelTipo | "todos";
  estado: CartelEstado | "todos";
  soloIluminados: boolean;
  soloDisponibles: boolean;
}

export const FILTROS_INICIALES: Filtros = {
  q: "",
  zona: "todas",
  tipo: "todos",
  estado: "todos",
  soloIluminados: false,
  soloDisponibles: false,
};

const TIPOS: CartelTipo[] = [
  "Frontal",
  "Medianera",
  "LED / Digital",
  "Columna",
  "Séxtuple",
  "Cartelera",
];

const ESTADOS: CartelEstado[] = ["libre", "ocupado", "reservado", "mantenimiento"];
const ESTADO_LABEL: Record<CartelEstado, string> = {
  libre: "Libre",
  ocupado: "Ocupado",
  reservado: "Reservado",
  mantenimiento: "Mantenimiento",
};

export function hayFiltrosActivos(f: Filtros): boolean {
  return (
    f.q.trim() !== "" ||
    f.zona !== "todas" ||
    f.tipo !== "todos" ||
    f.estado !== "todos" ||
    f.soloIluminados ||
    f.soloDisponibles
  );
}

export function FilterBar({
  filtros,
  onChange,
  onReset,
  zonas,
}: {
  filtros: Filtros;
  onChange: (patch: Partial<Filtros>) => void;
  onReset: () => void;
  zonas: Zona[];
}) {
  const activos = hayFiltrosActivos(filtros);
  return (
    <Card className="p-3.5 animate-fade-in">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1 lg:min-w-[220px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
          <Input
            value={filtros.q}
            onChange={(e) => onChange({ q: e.target.value })}
            placeholder="Buscar por código, dirección o zona…"
            className="pl-9"
            aria-label="Buscar carteles"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:flex-none">
          <Select
            value={filtros.zona}
            onChange={(e) => onChange({ zona: e.target.value as Filtros["zona"] })}
            aria-label="Zona"
            className="lg:w-[150px]"
          >
            <option value="todas">Todas las zonas</option>
            {zonas.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </Select>

          <Select
            value={filtros.tipo}
            onChange={(e) => onChange({ tipo: e.target.value as Filtros["tipo"] })}
            aria-label="Tipo"
            className="lg:w-[150px]"
          >
            <option value="todos">Todos los tipos</option>
            {TIPOS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>

          <Select
            value={filtros.estado}
            onChange={(e) => onChange({ estado: e.target.value as Filtros["estado"] })}
            aria-label="Estado"
            className="lg:w-[150px]"
          >
            <option value="todos">Todos los estados</option>
            {ESTADOS.map((e) => (
              <option key={e} value={e}>
                {ESTADO_LABEL[e]}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Toggle
          active={filtros.soloIluminados}
          onClick={() => onChange({ soloIluminados: !filtros.soloIluminados })}
          icon={<Lightbulb className="size-3.5" />}
        >
          Solo iluminados
        </Toggle>
        <Toggle
          active={filtros.soloDisponibles}
          onClick={() => onChange({ soloDisponibles: !filtros.soloDisponibles })}
          icon={<CircleCheck className="size-3.5" />}
        >
          Solo disponibles
        </Toggle>

        {activos && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="ml-auto text-[var(--muted)]"
          >
            <X className="size-3.5" />
            Limpiar filtros
          </Button>
        )}
      </div>
    </Card>
  );
}

function Toggle({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand-200",
        active
          ? "border-brand-300 bg-brand-50 text-brand-700"
          : "border-[var(--border)] bg-white text-ink-700 hover:bg-neutral-50",
      )}
    >
      {icon}
      {children}
    </button>
  );
}
