import type { ActividadTipo } from "@/lib/types";
import {
  Phone,
  Mail,
  Users,
  MessageCircle,
  StickyNote,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

const map: Record<
  ActividadTipo,
  { icon: React.ReactNode; cls: string; label: string }
> = {
  llamada: {
    icon: <Phone className="size-3.5" />,
    cls: "bg-sky-50 text-sky-600",
    label: "Llamada",
  },
  email: {
    icon: <Mail className="size-3.5" />,
    cls: "bg-violet-50 text-violet-600",
    label: "Email",
  },
  reunion: {
    icon: <Users className="size-3.5" />,
    cls: "bg-amber-50 text-amber-600",
    label: "Reunión",
  },
  whatsapp: {
    icon: <MessageCircle className="size-3.5" />,
    cls: "bg-emerald-50 text-emerald-600",
    label: "WhatsApp",
  },
  nota: {
    icon: <StickyNote className="size-3.5" />,
    cls: "bg-neutral-100 text-neutral-500",
    label: "Nota",
  },
  propuesta: {
    icon: <FileText className="size-3.5" />,
    cls: "bg-brand-50 text-brand-600",
    label: "Propuesta",
  },
};

export function actividadLabel(tipo: ActividadTipo): string {
  return map[tipo].label;
}

export function ActividadIcon({
  tipo,
  className,
}: {
  tipo: ActividadTipo;
  className?: string;
}) {
  const m = map[tipo];
  return (
    <span
      className={cn(
        "grid size-7 shrink-0 place-items-center rounded-full",
        m.cls,
        className,
      )}
    >
      {m.icon}
    </span>
  );
}
