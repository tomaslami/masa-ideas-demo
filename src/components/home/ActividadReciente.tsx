"use client";

import {
  Activity,
  Phone,
  Mail,
  Users,
  MessageCircle,
  StickyNote,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { SectionHeader } from "./SectionHeader";
import { cn, relativeTime } from "@/lib/utils";
import { DEMO_NOW } from "@/lib/store";
import type { ActividadTipo, Cliente } from "@/lib/types";

const ICONS: Record<ActividadTipo, { icon: LucideIcon; cls: string }> = {
  llamada: { icon: Phone, cls: "bg-sky-50 text-sky-600" },
  email: { icon: Mail, cls: "bg-violet-50 text-violet-600" },
  reunion: { icon: Users, cls: "bg-amber-50 text-amber-600" },
  whatsapp: { icon: MessageCircle, cls: "bg-emerald-50 text-emerald-600" },
  nota: { icon: StickyNote, cls: "bg-neutral-100 text-neutral-600" },
  propuesta: { icon: FileText, cls: "bg-brand-50 text-brand-600" },
};

export function ActividadReciente({ clientes }: { clientes: Cliente[] }) {
  const items = clientes
    .flatMap((c) =>
      c.actividades.map((a) => ({
        ...a,
        clienteNombre: c.razonSocial,
        clienteColor: c.color,
      })),
    )
    .sort((a, b) => +new Date(b.fecha) - +new Date(a.fecha))
    .slice(0, 8);

  return (
    <Card className="overflow-hidden">
      <SectionHeader
        icon={Activity}
        title="Actividad reciente"
        hint="Lo último que pasó en tus cuentas"
        href="/crm"
        linkLabel="Ir al CRM"
      />
      <ol className="relative px-5 py-4">
        {/* línea vertical del timeline */}
        <span
          className="absolute left-[2.05rem] top-6 bottom-6 w-px bg-[var(--border)]"
          aria-hidden
        />
        {items.map((a) => {
          const { icon: Icon, cls } = ICONS[a.tipo];
          return (
            <li key={a.id} className="relative flex gap-3 py-2.5">
              <span
                className={cn(
                  "relative z-10 inline-flex size-7 shrink-0 items-center justify-center rounded-full ring-4 ring-[var(--surface)]",
                  cls,
                )}
              >
                <Icon className="size-3.5" strokeWidth={2.2} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-snug text-ink-800">{a.texto}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-[var(--muted)]">
                  <Avatar name={a.clienteNombre} color={a.clienteColor} size="xs" />
                  <span className="truncate font-medium text-ink-700">
                    {a.clienteNombre}
                  </span>
                  <span aria-hidden>·</span>
                  <span className="shrink-0">{relativeTime(a.fecha, DEMO_NOW)}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}
