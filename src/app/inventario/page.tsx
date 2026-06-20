"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useStore, useHydrated } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { Cartel, Zona } from "@/lib/types";

import { PageHeader } from "@/components/layout/PageHeader";
import { InventoryStats } from "@/components/inventory/InventoryStats";
import {
  FilterBar,
  FILTROS_INICIALES,
  type Filtros,
} from "@/components/inventory/FilterBar";
import { CartelCard } from "@/components/inventory/CartelCard";
import { CartelFicha } from "@/components/inventory/CartelFicha";
import { Map, LayoutGrid, MapPinOff, Loader2 } from "lucide-react";

const CartelMap = dynamic(() => import("@/components/map/CartelMap"), {
  ssr: false,
  loading: () => (
    <div className="grid size-full place-items-center bg-[#e8eef0] text-[var(--muted)]">
      <span className="inline-flex items-center gap-2 text-sm">
        <Loader2 className="size-4 animate-spin" />
        Cargando mapa…
      </span>
    </div>
  ),
});

type Vista = "mapa" | "grilla";

export default function InventarioPage() {
  const hydrated = useHydrated();
  const carteles = useStore((s) => s.carteles);

  const [filtros, setFiltros] = useState<Filtros>(FILTROS_INICIALES);
  const [vista, setVista] = useState<Vista>("grilla");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const zonas = useMemo<Zona[]>(() => {
    const set = new Set<Zona>();
    for (const c of carteles) set.add(c.zona);
    return [...set].sort((a, b) => a.localeCompare(b, "es"));
  }, [carteles]);

  const filtrados = useMemo(() => {
    const q = filtros.q.trim().toLowerCase();
    return carteles.filter((c) => {
      if (q) {
        const hay =
          c.codigo.toLowerCase().includes(q) ||
          c.direccion.toLowerCase().includes(q) ||
          c.zona.toLowerCase().includes(q);
        if (!hay) return false;
      }
      if (filtros.zona !== "todas" && c.zona !== filtros.zona) return false;
      if (filtros.tipo !== "todos" && c.tipo !== filtros.tipo) return false;
      if (filtros.estado !== "todos" && c.estado !== filtros.estado) return false;
      if (filtros.soloIluminados && !c.iluminado) return false;
      if (filtros.soloDisponibles && c.estado !== "libre") return false;
      return true;
    });
  }, [carteles, filtros]);

  const selected = useMemo(
    () => carteles.find((c) => c.id === selectedId) ?? null,
    [carteles, selectedId],
  );

  function abrirFicha(c: Cartel) {
    setSelectedId(c.id);
    setFocusId(c.id);
    setDrawerOpen(true);
  }

  const patchFiltros = (patch: Partial<Filtros>) =>
    setFiltros((f) => ({ ...f, ...patch }));

  if (!hydrated) {
    return (
      <div className="grid min-h-[60vh] place-items-center text-[var(--muted)]">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Inventario + Mapa"
        subtitle="Tus 250 carteles, geolocalizados y al día."
      >
        <span className="hidden rounded-full bg-neutral-100 px-3 py-1.5 text-[13px] font-medium text-ink-700 sm:inline-flex">
          {filtrados.length}{" "}
          {filtrados.length === 1 ? "resultado" : "resultados"}
        </span>
        <ViewToggle vista={vista} onChange={setVista} />
      </PageHeader>

      <div className="space-y-3.5">
        <InventoryStats carteles={carteles} />
        <FilterBar
          filtros={filtros}
          onChange={patchFiltros}
          onReset={() => setFiltros(FILTROS_INICIALES)}
          zonas={zonas}
        />
      </div>

      {/* Desktop: ambos paneles. Mobile/tablet: según vista (tabs). */}
      <div className="mt-3.5 grid gap-3.5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* MAPA */}
        <div
          className={cn(
            "lg:sticky lg:top-4 lg:block",
            vista === "mapa" ? "block" : "hidden",
          )}
        >
          <div className="h-[60vh] overflow-hidden rounded-2xl border border-[var(--border)] shadow-[var(--shadow-soft)] lg:h-[70vh]">
            <CartelMap
              carteles={filtrados}
              selectedId={selectedId}
              focusId={focusId}
              onSelect={abrirFicha}
            />
          </div>
        </div>

        {/* LISTA / GRILLA */}
        <div
          className={cn(
            "lg:block",
            vista === "grilla" ? "block" : "hidden",
          )}
        >
          {filtrados.length === 0 ? (
            <EmptyState onReset={() => setFiltros(FILTROS_INICIALES)} />
          ) : (
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:max-h-[70vh] lg:overflow-y-auto lg:pr-1 xl:grid-cols-2">
              {filtrados.map((c) => (
                <div key={c.id} className="animate-scale-in">
                  <CartelCard
                    cartel={c}
                    selected={c.id === selectedId}
                    onClick={() => abrirFicha(c)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CartelFicha
        cartel={selected}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}

function ViewToggle({
  vista,
  onChange,
}: {
  vista: Vista;
  onChange: (v: Vista) => void;
}) {
  const opts: { value: Vista; label: string; icon: React.ReactNode }[] = [
    { value: "mapa", label: "Mapa", icon: <Map className="size-4" /> },
    { value: "grilla", label: "Grilla", icon: <LayoutGrid className="size-4" /> },
  ];
  return (
    <div className="inline-flex rounded-xl border border-[var(--border)] bg-white p-0.5 shadow-sm lg:rounded-xl">
      {opts.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={vista === o.value}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand-200",
            vista === o.value
              ? "bg-brand-500 text-white shadow-sm"
              : "text-ink-700 hover:bg-neutral-50",
          )}
        >
          {o.icon}
          {o.label}
        </button>
      ))}
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center animate-fade-in lg:min-h-[50vh]">
      <span className="mb-4 grid size-14 place-items-center rounded-2xl bg-neutral-100 text-neutral-400">
        <MapPinOff className="size-7" />
      </span>
      <p className="text-base font-semibold text-ink-900">
        No hay carteles que coincidan
      </p>
      <p className="mt-1 max-w-sm text-sm text-[var(--muted)]">
        Probá ajustar la búsqueda o quitar algún filtro para ver más resultados.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-600"
      >
        Limpiar filtros
      </button>
    </div>
  );
}
