"use client";

import { useRef, useState } from "react";
import { StreetMockupView } from "./StreetMockupView";
import { StreetExplorer } from "./StreetExplorer";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  CORNERS,
  scaleQuad,
  setCorner,
  translateQuad,
} from "@/lib/perspective";
import type { Cartel, Mockup, Quad } from "@/lib/types";
import {
  Maximize2,
  Minimize2,
  RotateCcw,
  Moon,
  Sun,
  Compass,
  Move,
} from "lucide-react";

type DragKey = keyof Quad | "move";

/**
 * Editor interactivo del cartel sobre la calle real. Se arrastran las 4
 * esquinas para calzar el banner en la cara, con día/noche y un explorador
 * 3D navegable. El quad vive en mockup.streetQuad.
 */
export function StreetMockupEditor({
  cartel,
  mockup,
  onChange,
  onPersistVista,
}: {
  cartel: Cartel;
  mockup: Mockup;
  onChange: (patch: Partial<Mockup>) => void;
  /** persiste el quad actual como placement2D del cartel (para preparar la demo) */
  onPersistVista?: (quad: Quad) => void;
}) {
  const vista = cartel.vistaCalle;
  const boxRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    key: DragKey;
    startQuad: Quad;
    startX: number;
    startY: number;
  } | null>(null);
  const [explorar, setExplorar] = useState(false);

  const quad = mockup.streetQuad ?? vista?.placement2D;
  const hasArt = !!mockup.artUrl;

  function startDrag(key: DragKey, e: React.PointerEvent) {
    if (!quad) return;
    e.preventDefault();
    boxRef.current?.setPointerCapture(e.pointerId);
    dragRef.current = {
      key,
      startQuad: quad,
      startX: e.clientX,
      startY: e.clientY,
    };
  }

  function onPointerMove(e: React.PointerEvent) {
    const d = dragRef.current;
    const box = boxRef.current;
    if (!d || !box) return;
    const rect = box.getBoundingClientRect();
    const dx = (e.clientX - d.startX) / rect.width;
    const dy = (e.clientY - d.startY) / rect.height;
    const next =
      d.key === "move"
        ? translateQuad(d.startQuad, dx, dy)
        : setCorner(d.startQuad, d.key, {
            x: d.startQuad[d.key].x + dx,
            y: d.startQuad[d.key].y + dy,
          });
    onChange({ streetQuad: next });
  }

  function endDrag(e: React.PointerEvent) {
    if (dragRef.current) {
      boxRef.current?.releasePointerCapture(e.pointerId);
      dragRef.current = null;
    }
  }

  if (!vista || !quad) {
    return (
      <div className="grid aspect-[16/10] w-full place-items-center rounded-xl border border-[var(--border)] bg-neutral-100 text-sm text-[var(--muted)]">
        Este cartel no tiene vista de calle.
      </div>
    );
  }

  const center = {
    x: (quad.tl.x + quad.tr.x + quad.br.x + quad.bl.x) / 4,
    y: (quad.tl.y + quad.tr.y + quad.br.y + quad.bl.y) / 4,
  };

  return (
    <div>
      <div
        ref={boxRef}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-xl border border-[var(--border)]"
        style={{ touchAction: "none" }}
      >
        <StreetMockupView
          cartel={cartel}
          mockup={mockup}
          quad={quad}
          className="size-full"
        />

        {/* overlay de edición (solo si hay arte) */}
        {hasArt && (
          <>
            {/* contorno del quad */}
            <svg
              className="pointer-events-none absolute inset-0 size-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <polygon
                points={`${quad.tl.x * 100},${quad.tl.y * 100} ${
                  quad.tr.x * 100
                },${quad.tr.y * 100} ${quad.br.x * 100},${quad.br.y * 100} ${
                  quad.bl.x * 100
                },${quad.bl.y * 100}`}
                fill="none"
                stroke="rgba(233,93,15,0.9)"
                strokeWidth="0.4"
                vectorEffect="non-scaling-stroke"
                strokeDasharray="2 1.5"
              />
            </svg>

            {/* asa de mover (centro) */}
            <button
              type="button"
              onPointerDown={(e) => startDrag("move", e)}
              className="absolute grid size-8 -translate-x-1/2 -translate-y-1/2 cursor-move place-items-center rounded-full bg-ink-950/55 text-white backdrop-blur transition hover:bg-ink-950/75"
              style={{ left: `${center.x * 100}%`, top: `${center.y * 100}%` }}
              aria-label="Mover banner"
            >
              <Move className="size-4" />
            </button>

            {/* asas de esquina */}
            {CORNERS.map((key) => (
              <button
                key={key}
                type="button"
                onPointerDown={(e) => startDrag(key, e)}
                className="absolute size-4 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-white bg-brand-500 shadow-[0_1px_6px_rgba(0,0,0,0.5)] transition hover:scale-125 active:cursor-grabbing"
                style={{
                  left: `${quad[key].x * 100}%`,
                  top: `${quad[key].y * 100}%`,
                }}
                aria-label={`Esquina ${key}`}
              />
            ))}
          </>
        )}

        {!hasArt && (
          <div className="absolute inset-0 grid place-items-center">
            <div className="rounded-xl bg-ink-950/55 px-4 py-2.5 text-sm font-medium text-white backdrop-blur">
              Subí el arte o usá el de la marca para calzarlo en la calle
            </div>
          </div>
        )}
      </div>

      {/* toolbar */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant="secondary"
          disabled={!hasArt}
          onClick={() => onChange({ streetQuad: scaleQuad(quad, 1.08) })}
        >
          <Maximize2 className="size-4" />
          Más grande
        </Button>
        <Button
          size="sm"
          variant="secondary"
          disabled={!hasArt}
          onClick={() => onChange({ streetQuad: scaleQuad(quad, 0.93) })}
        >
          <Minimize2 className="size-4" />
          Más chico
        </Button>
        <Button
          size="sm"
          variant="ghost"
          disabled={!hasArt}
          onClick={() => onChange({ streetQuad: vista.placement2D })}
        >
          <RotateCcw className="size-4" />
          Reset
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onChange({ nocturno: !mockup.nocturno })}
          className={cn(mockup.nocturno && "text-indigo-600")}
        >
          {mockup.nocturno ? (
            <Moon className="size-4" />
          ) : (
            <Sun className="size-4" />
          )}
          {mockup.nocturno ? "Noche" : "Día"}
        </Button>

        <div className="ml-auto flex items-center gap-2">
          {onPersistVista && (
            <Button
              size="sm"
              variant="ghost"
              disabled={!hasArt}
              onClick={() => onPersistVista(quad)}
            >
              Guardar encuadre
            </Button>
          )}
          <Button size="sm" onClick={() => setExplorar(true)}>
            <Compass className="size-4" />
            Explorar en la calle
          </Button>
        </div>
      </div>

      {explorar && (
        <StreetExplorer
          cartel={cartel}
          mockup={mockup}
          onClose={() => setExplorar(false)}
        />
      )}
    </div>
  );
}
