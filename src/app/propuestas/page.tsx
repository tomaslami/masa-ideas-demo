"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore, useHydrated } from "@/lib/store";
import { byId } from "@/lib/selectors";
import { calcTotales } from "@/lib/calc";
import { formatARS, formatARSCompact, formatDate, cn } from "@/lib/utils";
import type { Propuesta, PropuestaEstado } from "@/lib/types";

import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Input, Select } from "@/components/ui/Field";
import { PropuestaBadge } from "@/components/ui/StatusBadge";
import { MockupView, CartelPhoto } from "@/components/cartel/CartelPhoto";
import { useToast } from "@/components/ui/toast";
import {
  Plus,
  Search,
  FileText,
  MoreVertical,
  Pencil,
  Trash2,
  MapPin,
  Loader2,
  Send,
  CheckCircle2,
  Wallet,
} from "lucide-react";

const ESTADOS: PropuestaEstado[] = ["borrador", "enviada", "aceptada", "rechazada"];

export default function PropuestasPage() {
  const hydrated = useHydrated();
  const router = useRouter();
  const propuestas = useStore((s) => s.propuestas);
  const clientes = useStore((s) => s.clientes);
  const carteles = useStore((s) => s.carteles);
  const deletePropuesta = useStore((s) => s.deletePropuesta);
  const toast = useToast((s) => s.push);

  const clienteMap = useMemo(() => byId(clientes), [clientes]);
  const cartelMap = useMemo(() => byId(carteles), [carteles]);

  const [q, setQ] = useState("");
  const [estado, setEstado] = useState<"todos" | PropuestaEstado>("todos");
  const [clienteId, setClienteId] = useState<"todos" | string>("todos");

  const filtradas = useMemo(() => {
    const query = q.trim().toLowerCase();
    return propuestas.filter((p) => {
      if (estado !== "todos" && p.estado !== estado) return false;
      if (clienteId !== "todos" && p.clienteId !== clienteId) return false;
      if (query) {
        const hay =
          p.codigo.toLowerCase().includes(query) ||
          p.nombreCampaña.toLowerCase().includes(query) ||
          (clienteMap.get(p.clienteId)?.razonSocial ?? "")
            .toLowerCase()
            .includes(query);
        if (!hay) return false;
      }
      return true;
    });
  }, [propuestas, estado, clienteId, q, clienteMap]);

  const kpis = useMemo(() => {
    const enviadas = propuestas.filter((p) => p.estado === "enviada").length;
    const aceptadas = propuestas.filter((p) => p.estado === "aceptada").length;
    const abiertas = propuestas.filter(
      (p) => p.estado === "borrador" || p.estado === "enviada",
    );
    const montoAbierto = abiertas.reduce(
      (s, p) => s + calcTotales(p.items).total,
      0,
    );
    return { total: propuestas.length, enviadas, aceptadas, montoAbierto };
  }, [propuestas]);

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
        title="Propuestas"
        subtitle="De los carteles a un PDF profesional, en minutos."
      >
        <Button onClick={() => router.push("/propuestas/nueva")}>
          <Plus className="size-4" />
          Nueva propuesta
        </Button>
      </PageHeader>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        <Kpi
          icon={<FileText className="size-5" />}
          label="Propuestas totales"
          value={String(kpis.total)}
          tone="ink"
        />
        <Kpi
          icon={<Send className="size-5" />}
          label="Enviadas"
          value={String(kpis.enviadas)}
          tone="sky"
        />
        <Kpi
          icon={<CheckCircle2 className="size-5" />}
          label="Aceptadas"
          value={String(kpis.aceptadas)}
          tone="emerald"
        />
        <Kpi
          icon={<Wallet className="size-5" />}
          label="En propuestas abiertas"
          value={formatARSCompact(kpis.montoAbierto)}
          tone="brand"
        />
      </div>

      {/* Filtros */}
      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por código, campaña o cliente…"
            className="pl-9"
          />
        </div>
        <Select
          value={estado}
          onChange={(e) => setEstado(e.target.value as typeof estado)}
          className="sm:w-44"
        >
          <option value="todos">Todos los estados</option>
          {ESTADOS.map((e) => (
            <option key={e} value={e}>
              {e[0].toUpperCase() + e.slice(1)}
            </option>
          ))}
        </Select>
        <Select
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
          className="sm:w-56"
        >
          <option value="todos">Todos los clientes</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.razonSocial}
            </option>
          ))}
        </Select>
      </div>

      {/* Grid */}
      {filtradas.length === 0 ? (
        <EmptyState
          hasAny={propuestas.length > 0}
          onNueva={() => router.push("/propuestas/nueva")}
        />
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtradas.map((p) => (
            <PropuestaCard
              key={p.id}
              propuesta={p}
              clienteMap={clienteMap}
              cartelMap={cartelMap}
              onDelete={() => {
                deletePropuesta(p.id);
                toast("Propuesta eliminada", "info");
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Kpi({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "ink" | "sky" | "emerald" | "brand";
}) {
  const tones = {
    ink: "bg-neutral-100 text-ink-700",
    sky: "bg-sky-50 text-sky-600",
    emerald: "bg-emerald-50 text-emerald-600",
    brand: "bg-brand-50 text-brand-600",
  };
  return (
    <Card className="flex items-center gap-3.5 p-4">
      <span className={cn("grid size-11 place-items-center rounded-xl", tones[tone])}>
        {icon}
      </span>
      <div className="min-w-0">
        <p className="truncate text-xl font-bold tracking-tight text-ink-900">
          {value}
        </p>
        <p className="truncate text-xs text-[var(--muted)]">{label}</p>
      </div>
    </Card>
  );
}

function PropuestaCard({
  propuesta,
  clienteMap,
  cartelMap,
  onDelete,
}: {
  propuesta: Propuesta;
  clienteMap: Map<string, import("@/lib/types").Cliente>;
  cartelMap: Map<string, import("@/lib/types").Cartel>;
  onDelete: () => void;
}) {
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const cliente = clienteMap.get(propuesta.clienteId);
  const totales = calcTotales(propuesta.items);

  const primerMockup = propuesta.mockups.find((m) => m.artUrl);
  const cartelThumb =
    cartelMap.get(primerMockup?.cartelId ?? propuesta.items[0]?.cartelId ?? "") ??
    null;

  return (
    <Card className="group relative overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <Link href={`/propuestas/${propuesta.id}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
          {cartelThumb ? (
            primerMockup ? (
              <MockupView
                cartel={cartelThumb}
                mockup={primerMockup}
                className="size-full"
              />
            ) : (
              <CartelPhoto cartel={cartelThumb} className="size-full" />
            )
          ) : (
            <div className="grid size-full place-items-center text-neutral-300">
              <FileText className="size-10" />
            </div>
          )}
          <div className="absolute left-2.5 top-2.5">
            <span className="rounded-md bg-ink-950/70 px-2 py-1 font-mono text-[11px] font-medium text-white backdrop-blur">
              {propuesta.codigo}
            </span>
          </div>
          <div className="absolute right-2.5 top-2.5">
            <PropuestaBadge estado={propuesta.estado} />
          </div>
        </div>

        <div className="p-4">
          <h3 className="line-clamp-1 text-[15px] font-semibold text-ink-900">
            {propuesta.nombreCampaña}
          </h3>
          <div className="mt-2 flex items-center gap-2">
            {cliente ? (
              <>
                <Avatar
                  name={cliente.razonSocial}
                  color={cliente.color}
                  size="xs"
                />
                <span className="line-clamp-1 text-[13px] text-[var(--muted)]">
                  {cliente.razonSocial}
                </span>
              </>
            ) : (
              <span className="text-[13px] text-[var(--muted)]">Sin cliente</span>
            )}
          </div>

          <div className="mt-3.5 flex items-end justify-between border-t border-[var(--border)] pt-3">
            <div>
              <p className="flex items-center gap-1 text-xs text-[var(--muted)]">
                <MapPin className="size-3.5" />
                {totales.cantidad}{" "}
                {totales.cantidad === 1 ? "cartel" : "carteles"}
              </p>
              <p className="mt-0.5 text-[11px] text-neutral-400">
                {formatDate(propuesta.creadaEl)}
              </p>
            </div>
            <p className="text-base font-bold text-ink-900">
              {formatARS(totales.total)}
            </p>
          </div>
        </div>
      </Link>

      {/* menú */}
      <div className="absolute bottom-3 right-3">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setMenu((v) => !v);
          }}
          className="grid size-8 place-items-center rounded-lg text-neutral-400 opacity-0 transition hover:bg-black/5 hover:text-ink-700 focus-visible:opacity-100 group-hover:opacity-100"
          aria-label="Acciones"
        >
          <MoreVertical className="size-4" />
        </button>
        {menu && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setMenu(false)} />
            <div className="absolute bottom-9 right-0 z-20 w-40 overflow-hidden rounded-xl border border-[var(--border)] bg-white py-1 shadow-[var(--shadow-lift)] animate-scale-in">
              <button
                type="button"
                onClick={() => router.push(`/propuestas/${propuesta.id}/editar`)}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-ink-800 hover:bg-neutral-50"
              >
                <Pencil className="size-4" />
                Editar
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenu(false);
                  onDelete();
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="size-4" />
                Eliminar
              </button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}

function EmptyState({
  hasAny,
  onNueva,
}: {
  hasAny: boolean;
  onNueva: () => void;
}) {
  return (
    <div className="mt-6 grid place-items-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center animate-fade-in">
      <span className="mb-4 grid size-14 place-items-center rounded-2xl bg-brand-50 text-brand-500">
        <FileText className="size-7" />
      </span>
      <p className="text-base font-semibold text-ink-900">
        {hasAny ? "No hay propuestas que coincidan" : "Todavía no hay propuestas"}
      </p>
      <p className="mt-1 max-w-sm text-sm text-[var(--muted)]">
        {hasAny
          ? "Probá ajustar la búsqueda o los filtros."
          : "Armá tu primera propuesta: elegí carteles, posicioná el arte y exportá un PDF de agencia."}
      </p>
      {!hasAny && (
        <Button className="mt-5" onClick={onNueva}>
          <Plus className="size-4" />
          Nueva propuesta
        </Button>
      )}
    </div>
  );
}
