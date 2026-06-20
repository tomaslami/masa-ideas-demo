"use client";

import Link from "next/link";
import {
  Building2,
  Wallet,
  TrendingUp,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn, formatARS, formatARSCompact } from "@/lib/utils";
import { DEMO_NOW } from "@/lib/store";
import {
  occupancy,
  ingresosMensuales,
  valorEnJuego,
  cobranzaPendiente,
} from "@/lib/selectors";
import type { Cartel, Cliente, Contrato } from "@/lib/types";

function ChipIcon({
  icon: Icon,
  tone = "brand",
}: {
  icon: LucideIcon;
  tone?: "brand" | "red";
}) {
  return (
    <span
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-xl",
        tone === "brand" ? "bg-brand-50 text-brand-600" : "bg-red-50 text-red-600",
      )}
    >
      <Icon className="size-5" strokeWidth={2} />
    </span>
  );
}

function StatCard({
  children,
  href,
  delay,
}: {
  children: React.ReactNode;
  href: string;
  delay: number;
}) {
  return (
    <Link href={href} className="animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
      <Card className="group h-full p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]">
        {children}
      </Card>
    </Link>
  );
}

export function KpiCards({
  carteles,
  clientes,
  contratos,
}: {
  carteles: Cartel[];
  clientes: Cliente[];
  contratos: Contrato[];
}) {
  const occ = occupancy(carteles);
  const facturacion = ingresosMensuales(carteles);
  const pipeline = valorEnJuego(clientes);
  const pendientes = cobranzaPendiente(contratos);

  const cobranzaTotal = pendientes.reduce((s, p) => s + p.monto, 0);
  const vencidos = pendientes.filter((p) => p.estado === "vencido");
  const vencidoTotal = vencidos.reduce((s, p) => s + p.monto, 0);

  const oportunidadesAbiertas = clientes.filter((c) =>
    ["prospecto", "propuesta", "negociando"].includes(c.estado),
  ).length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {/* Ocupación general */}
      <StatCard href="/inventario" delay={0}>
        <div className="flex items-start justify-between">
          <ChipIcon icon={Building2} />
          <span className="text-3xl font-bold tracking-tight text-ink-900 tabular-nums">
            {occ.pct}
            <span className="text-lg font-semibold text-[var(--muted)]">%</span>
          </span>
        </div>
        <p className="mt-4 text-sm font-semibold text-ink-800">Ocupación general</p>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-[width] duration-500"
            style={{ width: `${occ.pct}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-[var(--muted)]">
          {occ.ocupados + occ.reservados} de {occ.total} carteles activos
        </p>
      </StatCard>

      {/* Facturación mensual */}
      <StatCard href="/inventario" delay={60}>
        <div className="flex items-start justify-between">
          <ChipIcon icon={Wallet} />
        </div>
        <p className="mt-4 text-2xl font-bold tracking-tight text-ink-900 tabular-nums">
          {formatARS(facturacion)}
        </p>
        <p className="mt-1 text-sm font-semibold text-ink-800">Facturación mensual</p>
        <p className="mt-2 text-xs text-[var(--muted)]">
          {occ.ocupados + occ.reservados} campañas activas
        </p>
      </StatCard>

      {/* Valor en pipeline */}
      <StatCard href="/crm" delay={120}>
        <div className="flex items-start justify-between">
          <ChipIcon icon={TrendingUp} />
        </div>
        <p className="mt-4 text-2xl font-bold tracking-tight text-ink-900 tabular-nums">
          {formatARSCompact(pipeline)}
        </p>
        <p className="mt-1 text-sm font-semibold text-ink-800">Valor en pipeline</p>
        <p className="mt-2 text-xs text-[var(--muted)]">
          {oportunidadesAbiertas} oportunidades abiertas
        </p>
      </StatCard>

      {/* Cobranza pendiente */}
      <StatCard href="/crm" delay={180}>
        <div className="flex items-start justify-between">
          <ChipIcon icon={AlertCircle} tone={vencidos.length ? "red" : "brand"} />
        </div>
        <p
          className={cn(
            "mt-4 text-2xl font-bold tracking-tight tabular-nums",
            vencidos.length ? "text-red-600" : "text-ink-900",
          )}
        >
          {formatARS(cobranzaTotal)}
        </p>
        <p className="mt-1 text-sm font-semibold text-ink-800">Cobranza pendiente</p>
        <p className="mt-2 text-xs text-[var(--muted)]">
          {pendientes.length} pago{pendientes.length === 1 ? "" : "s"} por cobrar
          {vencidos.length > 0 && (
            <span className="font-semibold text-red-600">
              {" · "}
              {vencidos.length} vencido{vencidos.length === 1 ? "" : "s"} ({formatARSCompact(vencidoTotal)})
            </span>
          )}
        </p>
        <span className="sr-only">{DEMO_NOW.toISOString()}</span>
      </StatCard>
    </div>
  );
}
