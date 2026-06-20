"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Map,
  KanbanSquare,
  FileText,
  Truck,
  BarChart3,
  Lock,
  RotateCcw,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/toast";

const nav = [
  { href: "/", label: "Inicio", icon: LayoutDashboard },
  { href: "/inventario", label: "Inventario + Mapa", icon: Map },
  { href: "/crm", label: "Pipeline comercial", icon: KanbanSquare },
  { href: "/propuestas", label: "Propuestas", icon: FileText },
];

const soon = [
  { label: "Operaciones / Instalación", icon: Truck },
  { label: "Tablero del dueño", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();
  const reset = useStore((s) => s.resetDemo);
  const push = useToast((s) => s.push);

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-ink-900 text-neutral-300 lg:flex">
      <div className="flex h-16 items-center gap-2 px-5">
        <Image
          src="/logo_masa_ideas.png"
          alt="Masa Ideas"
          width={150}
          height={32}
          className="h-7 w-auto"
          priority
        />
      </div>

      <div className="px-4 pb-2 pt-3">
        <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
          Sistema
        </p>
      </div>
      <nav className="flex flex-col gap-1 px-3">
        {nav.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-brand-500 text-white shadow-[var(--shadow-soft)]"
                  : "text-neutral-400 hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon className="size-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 pb-2 pt-6">
        <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
          Fase 2 · Roadmap
        </p>
      </div>
      <div className="flex flex-col gap-1 px-3">
        {soon.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium text-neutral-600"
              title="Disponible en la siguiente fase"
            >
              <Icon className="size-[18px]" />
              <span className="flex-1">{item.label}</span>
              <Lock className="size-3.5" />
            </div>
          );
        })}
      </div>

      <div className="mt-auto p-4">
        <button
          onClick={() => {
            reset();
            push("Demo reiniciada con los datos de ejemplo", "info");
          }}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-3 py-2.5 text-[13px] font-medium text-neutral-400 transition hover:bg-white/5 hover:text-white"
        >
          <RotateCcw className="size-4" />
          Reiniciar demo
        </button>
        <div className="mt-3 flex items-center gap-3 rounded-[20px] bg-white/5 px-3 py-2.5">
          <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-bold text-white">
            MI
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-white">Masa Ideas</p>
            <p className="truncate text-xs text-neutral-500">Equipo comercial</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
