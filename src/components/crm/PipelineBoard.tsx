"use client";

import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  closestCorners,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  PIPELINE_COLUMNS,
  type Cliente,
  type Contrato,
  type PipelineEstado,
  type Propuesta,
} from "@/lib/types";
import { cn, formatARSCompact } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/toast";
import { ClienteCard } from "./ClienteCard";
import { Inbox } from "lucide-react";

const columnTone: Record<
  PipelineEstado,
  { bar: string; chip: string; ring: string }
> = {
  prospecto: {
    bar: "bg-neutral-300",
    chip: "bg-neutral-100 text-neutral-600",
    ring: "ring-neutral-300 bg-neutral-50/70",
  },
  propuesta: {
    bar: "bg-sky-400",
    chip: "bg-sky-50 text-sky-700",
    ring: "ring-sky-300 bg-sky-50/70",
  },
  negociando: {
    bar: "bg-amber-400",
    chip: "bg-amber-50 text-amber-600",
    ring: "ring-amber-300 bg-amber-50/70",
  },
  activo: {
    bar: "bg-emerald-400",
    chip: "bg-emerald-50 text-emerald-700",
    ring: "ring-emerald-300 bg-emerald-50/70",
  },
  vencido: {
    bar: "bg-red-400",
    chip: "bg-red-50 text-red-600",
    ring: "ring-red-300 bg-red-50/70",
  },
};

export function PipelineBoard({
  clientes,
  propuestas,
  contratos,
  onAbrirCliente,
}: {
  clientes: Cliente[];
  propuestas: Propuesta[];
  contratos: Contrato[];
  onAbrirCliente: (clienteId: string) => void;
}) {
  const moveCliente = useStore((s) => s.moveCliente);
  const push = useToast((s) => s.push);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [overCol, setOverCol] = useState<PipelineEstado | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Evita que un click dispare drag: requiere arrastrar ~8px.
      activationConstraint: { distance: 8 },
    }),
  );

  const porEstado = useMemo(() => {
    const map = new Map<PipelineEstado, Cliente[]>();
    for (const col of PIPELINE_COLUMNS) map.set(col.estado, []);
    for (const c of clientes) map.get(c.estado)?.push(c);
    return map;
  }, [clientes]);

  const activeCliente = activeId
    ? clientes.find((c) => c.id === activeId) ?? null
    : null;

  function handleDragStart(e: DragStartEvent) {
    setActiveId(String(e.active.id));
  }

  function handleDragOver(estado: PipelineEstado | null) {
    setOverCol(estado);
  }

  function handleDragEnd(e: DragEndEvent) {
    const id = String(e.active.id);
    const dest = e.over?.id ? (String(e.over.id) as PipelineEstado) : null;
    const cliente = clientes.find((c) => c.id === id);
    setActiveId(null);
    setOverCol(null);
    if (!cliente || !dest || dest === cliente.estado) return;
    if (!PIPELINE_COLUMNS.some((col) => col.estado === dest)) return;
    moveCliente(id, dest);
    const label = PIPELINE_COLUMNS.find((c) => c.estado === dest)?.label ?? dest;
    push(`${cliente.razonSocial} → ${label}`, "success");
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={(e) =>
        handleDragOver(
          e.over?.id ? (String(e.over.id) as PipelineEstado) : null,
        )
      }
      onDragEnd={handleDragEnd}
      onDragCancel={() => {
        setActiveId(null);
        setOverCol(null);
      }}
    >
      <div className="-mx-1 flex snap-x gap-3.5 overflow-x-auto px-1 pb-3">
        {PIPELINE_COLUMNS.map((col) => {
          const items = porEstado.get(col.estado) ?? [];
          const valor = items.reduce((s, c) => s + c.valorEstimado, 0);
          return (
            <Column
              key={col.estado}
              estado={col.estado}
              label={col.label}
              hint={col.hint}
              count={items.length}
              valor={valor}
              isOver={overCol === col.estado}
              isDragging={activeId !== null}
            >
              {items.map((c) => (
                <DraggableCard
                  key={c.id}
                  cliente={c}
                  propuestas={propuestas}
                  contratos={contratos}
                  onOpen={() => onAbrirCliente(c.id)}
                />
              ))}
            </Column>
          );
        })}
      </div>

      <DragOverlay dropAnimation={{ duration: 180, easing: "cubic-bezier(0.2, 0, 0, 1)" }}>
        {activeCliente ? (
          <div className="w-[252px]">
            <ClienteCard
              cliente={activeCliente}
              propuestas={propuestas}
              contratos={contratos}
              overlay
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function Column({
  estado,
  label,
  hint,
  count,
  valor,
  isOver,
  isDragging,
  children,
}: {
  estado: PipelineEstado;
  label: string;
  hint: string;
  count: number;
  valor: number;
  isOver: boolean;
  isDragging: boolean;
  children: React.ReactNode;
}) {
  const { setNodeRef } = useDroppable({ id: estado });
  const tone = columnTone[estado];

  return (
    <div className="flex w-[272px] shrink-0 snap-start flex-col">
      <div className="mb-2.5 flex items-start gap-2 px-1">
        <span className={cn("mt-1 h-3.5 w-1 shrink-0 rounded-full", tone.bar)} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-ink-900">
              {label}
            </h3>
            <span
              className={cn(
                "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold",
                tone.chip,
              )}
            >
              {count}
            </span>
          </div>
          <p className="truncate text-[11px] text-[var(--muted)]">{hint}</p>
        </div>
        <span className="mt-0.5 shrink-0 text-xs font-semibold text-ink-700 tabular-nums">
          {formatARSCompact(valor)}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          "flex max-h-[64vh] min-h-[120px] flex-1 flex-col gap-2.5 overflow-y-auto rounded-2xl border p-2 transition-colors",
          isOver
            ? cn("ring-2 ring-inset border-transparent", tone.ring)
            : "border-[var(--border)] bg-[var(--background)]/40",
        )}
      >
        {children}
        {count === 0 && (
          <div
            className={cn(
              "grid flex-1 place-items-center rounded-xl border border-dashed px-3 py-8 text-center transition-colors",
              isOver ? "border-transparent" : "border-[var(--border)]",
            )}
          >
            <div className="flex flex-col items-center gap-1.5 text-[var(--muted)]">
              <Inbox className="size-5 opacity-60" />
              <p className="text-xs">
                {isDragging ? "Soltá acá" : "Sin oportunidades"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DraggableCard({
  cliente,
  propuestas,
  contratos,
  onOpen,
}: {
  cliente: Cliente;
  propuestas: Propuesta[];
  contratos: Contrato[];
  onOpen: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: cliente.id });

  return (
    <button
      ref={setNodeRef}
      type="button"
      onClick={onOpen}
      style={{
        transform: CSS.Translate.toString(transform),
      }}
      className="block w-full touch-none text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:rounded-2xl"
      {...attributes}
      {...listeners}
    >
      <ClienteCard
        cliente={cliente}
        propuestas={propuestas}
        contratos={contratos}
        dragging={isDragging}
      />
    </button>
  );
}
