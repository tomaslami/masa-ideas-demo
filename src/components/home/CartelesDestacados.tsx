"use client";

import Link from "next/link";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "./SectionHeader";
import { formatARS } from "@/lib/utils";
import type { Cartel } from "@/lib/types";

export function CartelesDestacados({ carteles }: { carteles: Cartel[] }) {
  const destacados = carteles
    .filter((c) => c.estado === "libre")
    .sort((a, b) => b.precioMensual - a.precioMensual)
    .slice(0, 3);

  return (
    <Card className="overflow-hidden">
      <SectionHeader
        icon={Sparkles}
        title="Carteles libres destacados"
        hint="Oportunidades de mayor valor"
        href="/inventario"
        linkLabel="Ver inventario"
      />
      {destacados.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-[var(--muted)]">
          No hay carteles libres en este momento. ¡Todo colocado!
        </p>
      ) : (
        <ul className="flex flex-col gap-2 p-3">
          {destacados.map((c) => (
            <li key={c.id}>
              <Link
                href="/inventario"
                className="group flex items-center gap-3 rounded-xl border border-transparent p-2.5 transition-all hover:border-[var(--border)] hover:bg-neutral-50"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-xs font-bold text-emerald-700">
                  Libre
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink-900">
                    {c.codigo} · {c.zona}
                  </p>
                  <p className="truncate text-xs text-[var(--muted)]">
                    {c.tipo} · {c.direccion}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <span className="text-sm font-bold text-ink-900 tabular-nums">
                    {formatARS(c.precioMensual)}
                  </span>
                  <ArrowUpRight className="size-4 text-[var(--muted)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-600" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
