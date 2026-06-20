"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Map, KanbanSquare, FileText } from "lucide-react";

const nav = [
  { href: "/", label: "Inicio", icon: LayoutDashboard },
  { href: "/inventario", label: "Inventario", icon: Map },
  { href: "/crm", label: "Pipeline", icon: KanbanSquare },
  { href: "/propuestas", label: "Propuestas", icon: FileText },
];

export function MobileTopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-center border-b border-[var(--border)] bg-white/90 backdrop-blur lg:hidden">
      <Image src="/logo_masa_ideas.png" alt="Masa Ideas" width={130} height={28} className="h-6 w-auto" priority />
    </header>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex border-t border-[var(--border)] bg-white/95 backdrop-blur lg:hidden">
      {nav.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition",
              active ? "text-brand-600" : "text-neutral-500",
            )}
          >
            <Icon className="size-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
