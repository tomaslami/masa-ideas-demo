"use client";

import { use, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toJpeg } from "html-to-image";
import { useStore, useHydrated } from "@/lib/store";
import { byId } from "@/lib/selectors";
import { calcTotales, itemTotal } from "@/lib/calc";
import { formatARS, formatDate, formatNumber, cn } from "@/lib/utils";
import { exportarPropuestaPDF, type CartelExport } from "@/lib/pdf";
import type { PropuestaEstado } from "@/lib/types";

import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { PropuestaBadge, CartelEstadoBadge } from "@/components/ui/StatusBadge";
import { MockupView } from "@/components/cartel/CartelPhoto";
import { MockupCaptureNode } from "@/components/proposals/MockupCaptureNode";
import { useToast } from "@/components/ui/toast";
import {
  ArrowLeft,
  Pencil,
  Download,
  MapPin,
  Sun,
  SunDim,
  Ruler,
  Activity,
  Loader2,
  CalendarClock,
  Clock,
} from "lucide-react";

const ESTADOS: { value: PropuestaEstado; label: string }[] = [
  { value: "borrador", label: "Borrador" },
  { value: "enviada", label: "Enviada" },
  { value: "aceptada", label: "Aceptada" },
  { value: "rechazada", label: "Rechazada" },
];

export default function PropuestaDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const hydrated = useHydrated();
  const router = useRouter();
  const toast = useToast((s) => s.push);

  const propuesta = useStore((s) => s.propuestas.find((p) => p.id === id));
  const clientes = useStore((s) => s.clientes);
  const carteles = useStore((s) => s.carteles);
  const updatePropuesta = useStore((s) => s.updatePropuesta);

  const cliente = propuesta
    ? clientes.find((c) => c.id === propuesta.clienteId)
    : undefined;
  const cartelMap = useMemo(() => byId(carteles), [carteles]);

  const [exporting, setExporting] = useState(false);
  // refs de los nodos de captura, por cartelId
  const captureRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const totales = propuesta ? calcTotales(propuesta.items) : null;

  if (!hydrated) {
    return (
      <div className="grid min-h-[60vh] place-items-center text-[var(--muted)]">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  if (!propuesta || !totales) {
    return (
      <div className="grid min-h-[50vh] place-items-center text-center animate-fade-in">
        <div>
          <p className="text-lg font-semibold text-ink-900">
            No encontramos esta propuesta
          </p>
          <Link
            href="/propuestas"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:underline"
          >
            <ArrowLeft className="size-4" /> Volver a propuestas
          </Link>
        </div>
      </div>
    );
  }

  const mockupDe = (cartelId: string) =>
    propuesta.mockups.find((m) => m.cartelId === cartelId);

  async function handleExport() {
    if (!propuesta || !cliente) {
      // permitimos exportar sin cliente igual
    }
    setExporting(true);
    try {
      // dejamos que React pinte los nodos ocultos
      await new Promise((r) => requestAnimationFrame(() => r(null)));
      await new Promise((r) => setTimeout(r, 60));

      const exportCarteles: CartelExport[] = [];
      for (const item of propuesta!.items) {
        const cartel = cartelMap.get(item.cartelId);
        if (!cartel) continue;
        const node = captureRefs.current[item.cartelId];
        let mockupDataUrl: string | null = null;
        if (node) {
          try {
            mockupDataUrl = await toJpeg(node, {
              quality: 0.92,
              pixelRatio: 2,
              cacheBust: true,
              backgroundColor: "#e5e5e5",
            });
          } catch {
            mockupDataUrl = null;
          }
        }
        exportCarteles.push({
          cartel,
          precioMensual: item.precioMensual,
          meses: item.meses,
          descuentoPct: item.descuentoPct,
          mockupDataUrl,
        });
      }

      await exportarPropuestaPDF({
        propuesta: propuesta!,
        cliente,
        carteles: exportCarteles,
      });
      toast("PDF generado", "success");
    } catch (e) {
      console.error(e);
      toast("No se pudo generar el PDF", "info");
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="animate-fade-in">
      <Link
        href="/propuestas"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted)] transition hover:text-ink-800"
      >
        <ArrowLeft className="size-4" /> Propuestas
      </Link>

      <PageHeader title={propuesta.nombreCampaña}>
        <Button
          variant="secondary"
          onClick={() => router.push(`/propuestas/${propuesta.id}/editar`)}
        >
          <Pencil className="size-4" />
          Editar
        </Button>
        <Button variant="primary" loading={exporting} onClick={handleExport}>
          {!exporting && <Download className="size-4" />}
          Exportar PDF
        </Button>
      </PageHeader>

      {/* Sub-header: meta */}
      <Card className="mb-4 flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
          <span className="font-mono text-sm font-medium text-ink-700">
            {propuesta.codigo}
          </span>
          <PropuestaBadge estado={propuesta.estado} />
          {cliente && (
            <span className="flex items-center gap-2">
              <Avatar name={cliente.razonSocial} color={cliente.color} size="sm" />
              <span className="text-sm font-medium text-ink-800">
                {cliente.razonSocial}
              </span>
            </span>
          )}
          <span className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
            <CalendarClock className="size-3.5" />
            Inicio {formatDate(propuesta.vigenciaDesde)}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
            <Clock className="size-3.5" />
            Validez {propuesta.validezDias} días · creada{" "}
            {formatDate(propuesta.creadaEl)}
          </span>
        </div>

        {/* estado */}
        <div className="flex flex-wrap items-center gap-1.5">
          {ESTADOS.map((e) => (
            <button
              key={e.value}
              type="button"
              onClick={() => {
                updatePropuesta(propuesta.id, { estado: e.value });
                toast(`Marcada como ${e.label.toLowerCase()}`, "success");
              }}
              className={cn(
                "rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition",
                propuesta.estado === e.value
                  ? "bg-brand-500 text-white shadow-sm"
                  : "border border-[var(--border)] bg-white text-ink-700 hover:bg-neutral-50",
              )}
            >
              {e.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Resumen comercial */}
      <div className="mb-5 grid grid-cols-2 gap-3.5 lg:grid-cols-5">
        <Stat label="Total campaña" value={formatARS(totales.total)} highlight />
        <Stat
          label="Inversión mensual"
          value={formatARS(totales.mensualConDescuento)}
        />
        <Stat label="Carteles" value={String(totales.cantidad)} />
        <Stat
          label="Meses"
          value={
            propuesta.items.length
              ? rangoMeses(propuesta.items.map((i) => i.meses))
              : "—"
          }
        />
        <Stat
          label="Descuento total"
          value={
            totales.descuento > 0 ? formatARS(totales.descuento) : "Sin descuento"
          }
        />
      </div>

      {/* Carteles */}
      <div className="space-y-4">
        {propuesta.items.map((item) => {
          const cartel = cartelMap.get(item.cartelId);
          if (!cartel) return null;
          const mockup = mockupDe(item.cartelId);
          return (
            <Card
              key={item.cartelId}
              className="grid gap-0 overflow-hidden lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
            >
              <div className="relative aspect-[16/10] bg-neutral-100">
                <MockupView
                  cartel={cartel}
                  mockup={mockup}
                  className="size-full"
                />
                <div className="absolute left-3 top-3">
                  <span className="rounded-md bg-ink-950/70 px-2 py-1 font-mono text-[11px] font-medium text-white backdrop-blur">
                    {cartel.codigo}
                  </span>
                </div>
              </div>

              <div className="flex flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-ink-900">
                      {cartel.direccion}
                    </h3>
                    <p className="mt-0.5 text-sm text-[var(--muted)]">
                      {cartel.zona} · {cartel.tipo}
                    </p>
                  </div>
                  <CartelEstadoBadge estado={cartel.estado} />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <Ficha
                    icon={<Ruler className="size-4" />}
                    label="Medidas"
                    value={`${cartel.anchoM} × ${cartel.altoM} m`}
                  />
                  <Ficha
                    icon={<Activity className="size-4" />}
                    label="Tránsito"
                    value={`${formatNumber(cartel.traficoDiario)} impactos/día`}
                  />
                  <Ficha
                    icon={
                      cartel.iluminado ? (
                        <Sun className="size-4" />
                      ) : (
                        <SunDim className="size-4" />
                      )
                    }
                    label="Iluminación"
                    value={cartel.iluminado ? "Iluminado" : "Sin iluminación"}
                  />
                  <Ficha
                    icon={<MapPin className="size-4" />}
                    label="Caras"
                    value={`${cartel.caras} ${cartel.caras === 1 ? "cara" : "caras"}`}
                  />
                </div>

                {/* precio */}
                <div className="mt-auto flex items-end justify-between border-t border-[var(--border)] pt-4">
                  <div className="text-sm text-[var(--muted)]">
                    <span className="font-medium text-ink-700">
                      {formatARS(item.precioMensual)}
                    </span>{" "}
                    / mes × {item.meses}{" "}
                    {item.meses === 1 ? "mes" : "meses"}
                    {item.descuentoPct > 0 && (
                      <span className="ml-1.5 rounded-md bg-emerald-50 px-1.5 py-0.5 text-xs font-medium text-emerald-700">
                        –{item.descuentoPct}%
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] uppercase tracking-wide text-neutral-400">
                      Subtotal
                    </p>
                    <p className="text-xl font-bold text-ink-900">
                      {formatARS(itemTotal(item))}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Nota comercial */}
      {propuesta.notaComercial && (
        <Card className="mt-5 border-l-4 border-l-brand-400 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">
            Nota del comercial
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-800">
            {propuesta.notaComercial}
          </p>
        </Card>
      )}

      {/* Branding sutil */}
      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-neutral-400">
        <span className="size-1.5 rounded-full bg-brand-400" />
        Propuesta generada con Masa Ideas · Publicidad en vía pública · CABA
      </div>

      {/* Nodos ocultos para captura del PDF */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          left: -10000,
          top: 0,
          pointerEvents: "none",
          opacity: 0,
        }}
      >
        {propuesta.items.map((item) => {
          const cartel = cartelMap.get(item.cartelId);
          if (!cartel) return null;
          return (
            <MockupCaptureNode
              key={item.cartelId}
              cartel={cartel}
              mockup={mockupDe(item.cartelId)}
              ref={(el) => {
                captureRefs.current[item.cartelId] = el;
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <Card
      className={cn(
        "p-4",
        highlight && "border-brand-200 bg-brand-50/40",
      )}
    >
      <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--muted)]">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-lg font-bold tracking-tight",
          highlight ? "text-brand-700" : "text-ink-900",
        )}
      >
        {value}
      </p>
    </Card>
  );
}

function Ficha({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-neutral-100 text-ink-600">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wide text-neutral-400">
          {label}
        </p>
        <p className="text-[13px] font-medium text-ink-800">{value}</p>
      </div>
    </div>
  );
}

function rangoMeses(meses: number[]): string {
  const min = Math.min(...meses);
  const max = Math.max(...meses);
  return min === max ? `${min}` : `${min}–${max}`;
}
