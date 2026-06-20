"use client";

import Link from "next/link";
import { Plus, Map, Info } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { useStore, DEMO_NOW } from "@/lib/store";
import { KpiCards } from "@/components/home/KpiCards";
import { CobranzaList } from "@/components/home/CobranzaList";
import { ActividadReciente } from "@/components/home/ActividadReciente";
import { EmbudoComercial } from "@/components/home/EmbudoComercial";
import { OcupacionPorZona } from "@/components/home/OcupacionPorZona";
import { CartelesDestacados } from "@/components/home/CartelesDestacados";

function subtituloFecha(): string {
  const fecha = DEMO_NOW.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  // Capitaliza la primera letra (es-AR devuelve "viernes 20 de junio").
  const cap = fecha.charAt(0).toUpperCase() + fecha.slice(1);
  return `${cap} · Resumen de tu operación`;
}

export default function Home() {
  const carteles = useStore((s) => s.carteles);
  const clientes = useStore((s) => s.clientes);
  const contratos = useStore((s) => s.contratos);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Hola, equipo Masa Ideas 👋" subtitle={subtituloFecha()}>
        <Link href="/inventario">
          <Button variant="secondary" size="md">
            <Map className="size-4" />
            Ver inventario
          </Button>
        </Link>
        <Link href="/propuestas">
          <Button variant="primary" size="md">
            <Plus className="size-4" />
            Nueva propuesta
          </Button>
        </Link>
      </PageHeader>

      <KpiCards carteles={carteles} clientes={clientes} contratos={contratos} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Columna izquierda (más ancha) */}
        <div
          className="flex flex-col gap-6 animate-fade-in lg:col-span-2"
          style={{ animationDelay: "100ms" }}
        >
          <CobranzaList clientes={clientes} contratos={contratos} />
          <ActividadReciente clientes={clientes} />
        </div>

        {/* Columna derecha */}
        <div
          className="flex flex-col gap-6 animate-fade-in"
          style={{ animationDelay: "160ms" }}
        >
          <EmbudoComercial clientes={clientes} />
          <OcupacionPorZona carteles={carteles} />
          <CartelesDestacados carteles={carteles} />
        </div>
      </div>

      {/* Banner de demo */}
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)]/60 px-4 py-3 text-center text-xs text-[var(--muted)]">
        <Info className="size-4 shrink-0 text-brand-500" />
        <span>
          Datos de demostración — los cambios se guardan en este dispositivo.
        </span>
      </div>
    </div>
  );
}
