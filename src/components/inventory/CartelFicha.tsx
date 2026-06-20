"use client";

import Link from "next/link";
import { cn, formatARS, formatNumber } from "@/lib/utils";
import { Drawer } from "@/components/ui/Drawer";
import { CartelEstadoBadge, PermisoBadge } from "@/components/ui/StatusBadge";
import { CartelPhoto } from "@/components/cartel/CartelPhoto";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/toast";
import type { Cartel, CartelEstado } from "@/lib/types";
import {
  Ruler,
  Layers,
  Lightbulb,
  Compass,
  Activity,
  Tag,
  MapPinned,
  FileBadge,
  Building2,
  FilePlus2,
} from "lucide-react";

const ESTADOS: { value: CartelEstado; label: string }[] = [
  { value: "libre", label: "Libre" },
  { value: "ocupado", label: "Ocupado" },
  { value: "reservado", label: "Reservado" },
  { value: "mantenimiento", label: "Mantenimiento" },
];

export function CartelFicha({
  cartel,
  open,
  onClose,
}: {
  cartel: Cartel | null;
  open: boolean;
  onClose: () => void;
}) {
  const setCartelEstado = useStore((s) => s.setCartelEstado);
  const pushToast = useToast((s) => s.push);

  return (
    <Drawer open={open} onClose={onClose} width="max-w-xl">
      {cartel && (
        <div className="flex h-full flex-col">
          <div className="overflow-y-auto">
            <CartelPhoto cartel={cartel} className="aspect-[16/10]">
              <div className="absolute left-3.5 top-3.5 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/90 shadow-sm backdrop-blur">
                  <CartelEstadoBadge estado={cartel.estado} />
                </span>
                <span className="rounded-full bg-white/90 shadow-sm backdrop-blur">
                  <PermisoBadge permiso={cartel.permiso} />
                </span>
              </div>
            </CartelPhoto>

            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-ink-700">
                  {cartel.codigo}
                </span>
              </div>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-ink-900">
                {cartel.direccion}
              </h2>
              <p className="mt-0.5 text-sm text-[var(--muted)]">
                {cartel.zona} · {cartel.tipo}
              </p>

              <dl className="mt-5 grid grid-cols-2 gap-3">
                <Spec icon={<Tag className="size-4" />} label="Tipo">
                  {cartel.tipo}
                </Spec>
                <Spec icon={<Building2 className="size-4" />} label="Zona">
                  {cartel.zona}
                </Spec>
                <Spec icon={<Ruler className="size-4" />} label="Medidas">
                  {cartel.anchoM}×{cartel.altoM} m
                </Spec>
                <Spec icon={<Layers className="size-4" />} label="Caras">
                  {cartel.caras}
                </Spec>
                <Spec icon={<Lightbulb className="size-4" />} label="Iluminación">
                  {cartel.iluminado ? "Sí" : "No"}
                </Spec>
                <Spec icon={<Compass className="size-4" />} label="Orientación">
                  {cartel.orientacion}
                </Spec>
                <Spec icon={<Activity className="size-4" />} label="Tránsito diario">
                  {formatNumber(cartel.traficoDiario)} impactos/día
                </Spec>
                <Spec icon={<FileBadge className="size-4" />} label="Permiso">
                  <span className="capitalize">{cartel.permiso}</span>
                </Spec>
              </dl>

              <div className="mt-5 rounded-xl bg-brand-50 px-4 py-3.5">
                <p className="text-[11px] font-medium uppercase tracking-wide text-brand-700/80">
                  Precio de lista mensual
                </p>
                <p className="text-2xl font-bold text-brand-700">
                  {formatARS(cartel.precioMensual)}
                </p>
              </div>

              {cartel.notas && (
                <div className="mt-4 rounded-xl border border-[var(--border)] bg-neutral-50 px-4 py-3">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--muted)]">
                    Notas
                  </p>
                  <p className="mt-1 text-sm text-ink-800">{cartel.notas}</p>
                </div>
              )}

              <div className="mt-5">
                <p className="mb-2 text-[13px] font-semibold text-ink-800">
                  Cambiar estado
                </p>
                <div className="flex flex-wrap gap-2">
                  {ESTADOS.map((e) => {
                    const active = cartel.estado === e.value;
                    return (
                      <button
                        key={e.value}
                        type="button"
                        onClick={() => {
                          if (active) return;
                          setCartelEstado(cartel.id, e.value);
                          pushToast(
                            `${cartel.codigo} → ${e.label}`,
                            "success",
                          );
                        }}
                        className={cn(
                          "rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand-200",
                          active
                            ? "border-brand-400 bg-brand-500 text-white shadow-sm"
                            : "border-[var(--border)] bg-white text-ink-700 hover:bg-neutral-50",
                        )}
                      >
                        {e.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 flex items-center gap-1.5 text-xs text-[var(--muted)]">
                <MapPinned className="size-3.5" />
                <span className="font-mono">
                  {cartel.lat.toFixed(5)}, {cartel.lng.toFixed(5)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-auto border-t border-[var(--border)] bg-[var(--surface)] p-4">
            <Link
              href="/propuestas"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 text-[15px] font-medium text-white shadow-sm outline-none transition-all hover:bg-brand-600 active:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-300"
            >
              <FilePlus2 className="size-4.5" />
              Crear propuesta con este cartel
            </Link>
          </div>
        </div>
      )}
    </Drawer>
  );
}

function Spec({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-white px-3 py-2.5">
      <dt className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-[var(--muted)]">
        <span className="text-brand-400">{icon}</span>
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold text-ink-900">{children}</dd>
    </div>
  );
}
